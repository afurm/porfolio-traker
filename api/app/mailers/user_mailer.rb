class UserMailer < ApplicationMailer
  default from: 'noreply@cryptoportfolio.com'

  # Send verification code email
  def verification_code(user)
    @user = user
    @verification_code = user.verification_code
    
    mail(
      to: @user.email,
      subject: 'Verify your email address'
    )
  end

  # Send password reset email
  def password_reset(user)
    @user = user
    @verification_code = user.verification_code
    
    mail(
      to: @user.email,
      subject: 'Reset your password'
    )
  end
end
