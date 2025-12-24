import { Handler } from '@netlify/functions';
import { verifyTurnstile } from './utils/verify';

export const handler: Handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const data = JSON.parse(event.body || '{}');
        const token = data['cf-turnstile-response'];
        const secretKey = process.env.TURNSTILE_SECRET_KEY;

        // 1. Check if token exists
        if (!token) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing Turnstile token' }),
            };
        }

        // 2. Check if secret key is configured
        if (!secretKey) {
            console.error('TURNSTILE_SECRET_KEY not configured');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server configuration error' }),
            };
        }

        // 3. Verify with Cloudflare
        const isValid = await verifyTurnstile(token, secretKey);
        if (!isValid) {
            return {
                statusCode: 403,
                body: JSON.stringify({ error: 'Invalid Turnstile token' }),
            };
        }

        // 4. Process the form submission
        // TODO: Add your form processing logic here
        // For example: save to database, send email, etc.

        console.log('Form submission data:', {
            pestType: data.pestType,
            urgency: data.urgency,
            zipCode: data.zipCode,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
        });

        // 5. Return success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Quote request submitted successfully',
                success: true
            }),
        };
    } catch (error) {
        console.error('Error processing quote submission:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
