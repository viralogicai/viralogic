export interface PaymentResponse {
    checkoutUrl: string;
    accountNumber: string;
    accountName: string;
    totalAmount: number;
    description: string;
    qrCode: string;
    amount: number;
}

export const generateOrderCode = () => {
    return Number(String(Date.now()).slice(-6));
};

export const createPaymentLink = async (data: {
    orderCode: number;
    amount: number;
    description: string;
    planId: string;
    buyerEmail: string;
}): Promise<PaymentResponse> => {
    const response = await fetch('/api/payos/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment link');
    }

    const result = await response.json();
    return result.data;
};

export const pollPaymentStatus = (
    orderCode: number,
    onSuccess: () => void,
    onError: (error: Error) => void
) => {
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes (5s interval)

    const interval = setInterval(async () => {
        attempts++;
        if (attempts > maxAttempts) {
            clearInterval(interval);
            onError(new Error('Payment timeout'));
            return;
        }

        try {
            const response = await fetch(`/api/payos/check-status?orderCode=${orderCode}`);
            const data = await response.json();

            if (data.success && data.data.status === 'PAID') {
                clearInterval(interval);
                onSuccess();
            } else if (data.success && data.data.status === 'CANCELLED') {
                clearInterval(interval);
                onError(new Error('Payment cancelled'));
            }
        } catch (error) {
            console.error('Polling error:', error);
            // Continue polling even if one request fails
        }
    }, 5000);

    return () => clearInterval(interval);
};
