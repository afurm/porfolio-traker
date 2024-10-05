# Crypto Portfolio Tracker

This is a cryptocurrency portfolio tracker built with Next.js, TypeScript, and Firebase. The application allows users to add cryptocurrencies to their portfolio, visualize them using charts, and get real-time price updates.

## Features

- User authentication with Google using Firebase.
- Add cryptocurrencies to your portfolio.
- Visualize your portfolio using Recharts.
- Real-time price data from CoinGecko API.
- Component documentation with Storybook.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-portfolio-tracker.git
   ```

2. Install the dependencies:
   ```bash
   cd crypto-portfolio-tracker
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Running the App

- Development mode:
  ```bash
  npm run dev
  ```

- Build for production:
  ```bash
  npm run build
  ```

- Start the production server:
  ```bash
  npm run start
  ```

### Running Storybook

- Start Storybook:
  ```bash
  npm run storybook
  ```

- Build Storybook:
  ```bash
  npm run build-storybook
  ```

## Folder Structure

- `src/api/` - API service to interact with CoinGecko.
- `src/components/` - Reusable components like `AddCryptoForm` and `PortfolioChart`.
- `src/context/` - Authentication context for managing user state.
- `src/firebase/` - Firebase configuration.
- `src/hooks/` - Custom React hooks.
- `src/pages/` - Application pages (`index.tsx`, `dashboard.tsx`, etc.).
- `src/styles/` - Global and component-specific styles.
- `src/utils/` - Utility functions and constants.
- `.storybook/` - Storybook configuration files.

## Technologies Used

- **Next.js** - Framework for server-rendered React applications.
- **TypeScript** - Strongly typed JavaScript.
- **Firebase** - Backend for authentication and data storage.
- **Recharts** - Charting library for visualizing the portfolio.
- **Storybook** - Tool for UI component development and documentation.

## License

This project is licensed under the MIT License.