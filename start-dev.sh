#!/bin/bash

# Start the Next.js frontend
echo "Starting Next.js frontend..."
npm run dev &
NEXT_PID=$!

# Start the Rails API
echo "Starting Rails API..."
cd api && rails server -p 3001 &
RAILS_PID=$!

# Function to handle script termination
function cleanup {
  echo "Shutting down servers..."
  kill $NEXT_PID
  kill $RAILS_PID
  exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Keep the script running
echo "Development servers are running. Press Ctrl+C to stop."
wait 