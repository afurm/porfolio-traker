Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    namespace :v1 do
      # Authentication routes
      post '/auth/oauth_callback', to: 'auth#oauth_callback'
      post '/auth/login', to: 'auth#login'
      post '/auth/register', to: 'auth#register'
      post '/auth/request_verification', to: 'auth#request_verification'
      post '/auth/verify_email', to: 'auth#verify_email'
      post '/auth/validate_token', to: 'auth#validate_token'
      post '/auth/request_password_reset', to: 'auth#request_password_reset'
      post '/auth/reset_password', to: 'auth#reset_password'
      
      # User routes
      get '/me', to: 'users#me'
      patch '/users', to: 'users#update'
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
