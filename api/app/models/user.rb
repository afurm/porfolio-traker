class User < ApplicationRecord
  has_secure_password validations: false
  
  has_many :transactions, dependent: :destroy
  
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }, if: :password_required?
  
  # Find or create a user from OAuth provider data
  def self.from_oauth(auth)
    user = find_or_initialize_by(provider: auth[:provider], provider_id: auth[:provider_id])
    
    user.assign_attributes({
      name: auth[:name],
      email: auth[:email],
      image: auth[:image],
      password: SecureRandom.hex(10), # Generate a random password for OAuth users
      verified: true # OAuth users are considered verified
    })
    
    user.save!
    user
  end
  
  # Generate a verification code for email verification
  def generate_verification_code
    self.verification_code = SecureRandom.random_number(100000..999999).to_s
    self.verification_sent_at = Time.current
    save(validate: false)
    self.verification_code
  end
  
  # Verify the user's email with the provided code
  def verify_email(code)
    return false if verification_code.blank? || code.blank?
    return false if verification_sent_at < 1.hour.ago # Code expires after 1 hour
    
    if verification_code == code
      update(verified: true, verification_code: nil)
      true
    else
      false
    end
  end
  
  # Check if the verification code is valid
  def valid_verification_code?(code)
    return false if verification_code.blank? || code.blank?
    return false if verification_sent_at < 1.hour.ago # Code expires after 1 hour
    
    verification_code == code
  end
  
  private
  
  def password_required?
    password_digest.nil? || !password.nil?
  end
end
