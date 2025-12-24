export async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
    if (!token || !secret) {
        console.error('Turnstile verification failed: Missing token or secret.');
        return false;
    }

    try {
        const formData = new FormData();
        formData.append('secret', secret);
        formData.append('response', token);

        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Turnstile API error:', response.status);
            return false;
        }

        if (!data.success) {
            console.error('Turnstile validation failed:', data['error-codes']);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Turnstile verification network error:', error);
        return false;
    }
}
