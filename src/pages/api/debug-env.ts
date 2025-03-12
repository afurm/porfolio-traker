import { NextApiRequest, NextApiResponse } from 'next';

// This endpoint is for debugging only and should not be used in production
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow in development mode
    if (process.env.NODE_ENV !== 'development') {
        return res.status(404).json({ success: false, message: 'Not found' });
    }

    // Return the environment variables
    res.status(200).json({
        success: true,
        env: {
            NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
            NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        },
    });
}

// Disable authentication for this endpoint
export const config = {
    api: {
        bodyParser: true,
        externalResolver: true,
    },
}; 