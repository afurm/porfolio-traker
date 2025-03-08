# Deployment Guide

This project consists of two parts:

1. Next.js Frontend
2. Rails API Backend

## Deploying the Next.js Frontend to Vercel

### Prerequisites

- A Vercel account
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Connect your repository to Vercel**

   - Go to [Vercel](https://vercel.com) and sign in
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing your Next.js frontend

2. **Configure project settings**

   - Framework Preset: Next.js
   - Root Directory: Leave as is (the project root)
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Set up environment variables**

   - Add the following environment variables in the Vercel dashboard:
     ```
     NEXTAUTH_URL=https://your-vercel-app-url.vercel.app
     NEXTAUTH_SECRET=your-secure-secret-key
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     NEXT_PUBLIC_API_URL=https://your-rails-api-url.com/api/v1
     ```
   - Make sure to replace the placeholder values with your actual values
   - The `NEXT_PUBLIC_API_URL` should point to your deployed Rails API

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your Next.js frontend

## Deploying the Rails API Backend

The Rails API should be deployed to a platform that supports Ruby on Rails applications, such as:

- Heroku
- Render
- Railway
- AWS Elastic Beanstalk
- DigitalOcean App Platform

### Deploying to Heroku (Example)

1. **Prerequisites**

   - A Heroku account
   - Heroku CLI installed

2. **Create a new Heroku app**

   ```bash
   cd api
   heroku create your-app-name
   ```

3. **Add PostgreSQL addon** (if using MySQL, you'll need a different addon or external database)

   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Configure environment variables**

   ```bash
   heroku config:set RAILS_ENV=production
   heroku config:set RAILS_MASTER_KEY=$(cat config/master.key)
   heroku config:set NEXTAUTH_SECRET=your-nextauth-secret-key
   heroku config:set FRONTEND_URL=https://your-vercel-app-url.vercel.app
   ```

5. **Deploy the API**

   ```bash
   git subtree push --prefix api heroku main
   ```

   Note: If your Rails API is in a subdirectory, you'll need to use git subtree.

6. **Run migrations**

   ```bash
   heroku run rails db:migrate
   ```

7. **Update your Next.js frontend**
   - Make sure your `.env.production` file or Vercel environment variables have the correct API URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-heroku-app-name.herokuapp.com/api/v1
   ```

## CORS Configuration

Ensure your Rails API has proper CORS configuration to accept requests from your Vercel-deployed frontend:

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch('FRONTEND_URL', 'https://your-vercel-app-url.vercel.app')

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      expose: ['Authorization']
  end
end
```

## Troubleshooting

### API Connection Issues

- Check that your `NEXT_PUBLIC_API_URL` is correct in your Vercel environment variables
- Ensure your Rails API CORS configuration allows requests from your Vercel domain
- Verify that your Rails API is running and accessible

### Authentication Issues

- Make sure `NEXTAUTH_SECRET` is the same in both your Next.js and Rails environments
- Check that your OAuth credentials (Google, etc.) are correctly configured
- Verify that the callback URLs in your OAuth provider settings are updated to your production URLs
