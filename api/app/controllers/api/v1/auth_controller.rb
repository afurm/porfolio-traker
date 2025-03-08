module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_user, only: [
        :oauth_callback, :login, :register, 
        :request_verification, :verify_email,
        :request_password_reset, :reset_password,
        :validate_token
      ]
      
      # Handle OAuth callback from NextAuth.js
      def oauth_callback
        # Validate the request
        unless valid_oauth_request?
          return render json: { error: 'Invalid authentication request' }, status: :unauthorized
        end
        
        # Find or create user from OAuth data
        user = User.from_oauth(oauth_params)
        
        # Generate JWT token
        token = JwtService.encode({ user_id: user.id })
        
        # Return user data and token
        render json: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
          },
          token: token
        }
      end
      
      # Login with email and password
      def login
        user = User.find_by(email: params[:email].downcase)
        
        if user&.authenticate(params[:password])
          # Check if user is verified
          unless user.verified
            return render json: { error: 'Email not verified', email: user.email }, status: :unauthorized
          end
          
          # Generate JWT token
          token = JwtService.encode({ user_id: user.id })
          
          # Return user data and token
          render json: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image
            },
            token: token
          }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
      
      # Register a new user
      def register
        user = User.new(user_params)
        user.email = user.email.downcase
        user.verified = false
        
        if user.save
          # Generate verification code and send email
          code = user.generate_verification_code
          UserMailer.verification_code(user).deliver_later
          
          render json: { 
            message: 'User registered successfully. Please verify your email.',
            email: user.email
          }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      # Request email verification code
      def request_verification
        user = User.find_by(email: params[:email].downcase)
        
        if user
          # Generate verification code and send email
          code = user.generate_verification_code
          UserMailer.verification_code(user).deliver_later
          
          render json: { 
            message: 'Verification code sent to your email.',
            email: user.email
          }
        else
          render json: { error: 'User not found' }, status: :not_found
        end
      end
      
      # Verify email with OTP code
      def verify_email
        user = User.find_by(email: params[:email].downcase)
        
        if user && user.verify_email(params[:code])
          # Generate JWT token
          token = JwtService.encode({ user_id: user.id })
          
          # Return user data and token
          render json: {
            message: 'Email verified successfully',
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image
            },
            token: token
          }
        else
          render json: { error: 'Invalid or expired verification code' }, status: :unprocessable_entity
        end
      end
      
      # Validate token
      def validate_token
        # Extract token from Authorization header
        token = extract_token_from_request
        
        if token.present?
          payload = JwtService.decode(token)
          
          if payload.present? && payload[:user_id].present?
            user = User.find_by(id: payload[:user_id])
            
            if user
              render json: {
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  image: user.image
                }
              }
              return
            end
          end
        end
        
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
      
      # Request password reset
      def request_password_reset
        user = User.find_by(email: params[:email].downcase)
        
        if user
          # Generate verification code and send email
          code = user.generate_verification_code
          UserMailer.password_reset(user).deliver_later
          
          render json: { 
            message: 'Password reset code sent to your email.',
            email: user.email
          }
        else
          render json: { error: 'User not found' }, status: :not_found
        end
      end
      
      # Reset password with OTP code
      def reset_password
        user = User.find_by(email: params[:email].downcase)
        
        if user && user.valid_verification_code?(params[:code])
          if params[:password] == params[:password_confirmation] && !params[:password].blank?
            user.password = params[:password]
            user.verification_code = nil
            
            if user.save
              # Generate JWT token
              token = JwtService.encode({ user_id: user.id })
              
              # Return user data and token
              render json: {
                message: 'Password reset successfully',
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  image: user.image
                },
                token: token
              }
            else
              render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            end
          else
            render json: { error: 'Passwords do not match or are empty' }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Invalid or expired verification code' }, status: :unprocessable_entity
        end
      end
      
      private
      
      def oauth_params
        {
          provider: params[:provider],
          provider_id: params[:provider_id],
          name: params[:name],
          email: params[:email],
          image: params[:image]
        }
      end
      
      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
      end
      
      def valid_oauth_request?
        # Verify the request is coming from our NextAuth.js frontend
        # In a production environment, you would want to add more security checks
        request.headers['X-NextAuth-Token'] == ENV['NEXTAUTH_SECRET']
      end
      
      def extract_token_from_request
        # Extract token from Authorization header
        auth_header = request.headers['Authorization']
        return nil unless auth_header.present?
        
        # Format should be "Bearer <token>"
        auth_header.split(' ').last
      end
    end
  end
end 