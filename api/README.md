# Crypto Portfolio Tracker API

This is the Rails API backend for the Crypto Portfolio Tracker application.

## Setup

1. **Clone the repository**

2. **Install dependencies**

   ```bash
   bundle install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.sample .env.local
   ```

   Then edit `.env.local` with your actual values.

4. **Set up database configuration**

   ```bash
   cp config/database.yml.sample config/database.yml
   ```

   Then edit `config/database.yml` with your database credentials if needed.

5. **Create and migrate the database**

   ```bash
   rails db:create
   rails db:migrate
   ```

6. **Start the server**
   ```bash
   rails server -p 3001
   ```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login with email and password
- `POST /api/v1/auth/oauth_callback` - Handle OAuth callback from NextAuth.js
- `POST /api/v1/auth/request_verification` - Request email verification code
- `POST /api/v1/auth/verify_email` - Verify email with OTP code
- `POST /api/v1/auth/validate_token` - Validate JWT token
- `POST /api/v1/auth/request_password_reset` - Request password reset
- `POST /api/v1/auth/reset_password` - Reset password with OTP code

### User

- `GET /api/v1/me` - Get current user profile
- `PATCH /api/v1/users` - Update user profile

## Development

### Email Delivery

In development, emails are delivered using Letter Opener, which opens emails in your browser instead of sending them. You can find the emails in `tmp/letter_opener/`.

If you want to use real email delivery, you can configure SMTP in `config/environments/development.rb`.

### Authentication

The API uses JWT for authentication. The JWT token is generated when a user logs in or registers, and is included in the `Authorization` header of subsequent requests.

The token is validated using the `authenticate_user` method in the `ApplicationController`.

## Testing

```bash
rails test
```
