class ApplicationController < ActionController::API
  before_action :authenticate_user
  
  private
  
  def authenticate_user
    token = extract_token_from_request
    
    if token.present?
      payload = JwtService.decode(token)
      
      if payload.present? && payload[:user_id].present?
        @current_user = User.find_by(id: payload[:user_id])
      end
    end
    
    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
  end
  
  def current_user
    @current_user
  end
  
  def extract_token_from_request
    # Extract token from Authorization header
    auth_header = request.headers['Authorization']
    return nil unless auth_header.present?
    
    # Format should be "Bearer <token>"
    auth_header.split(' ').last
  end
end
