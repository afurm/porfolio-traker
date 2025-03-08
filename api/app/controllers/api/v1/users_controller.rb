module Api
  module V1
    class UsersController < ApplicationController
      # Get current user profile
      def me
        render json: {
          user: {
            id: current_user.id,
            name: current_user.name,
            email: current_user.email,
            image: current_user.image
          }
        }
      end
      
      # Update user profile
      def update
        if current_user.update(user_params)
          render json: {
            user: {
              id: current_user.id,
              name: current_user.name,
              email: current_user.email,
              image: current_user.image
            }
          }
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      private
      
      def user_params
        params.require(:user).permit(:name, :email, :image)
      end
    end
  end
end 