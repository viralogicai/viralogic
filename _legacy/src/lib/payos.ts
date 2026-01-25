// PayOS API Integration

export interface PaymentData {
    orderCode: number;
    amount: number;
    description: string;
    planId: string;
    buyerEmail?: string;
}

export interface PaymentResponse {
    checkoutUrl: string;
    qrCode: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    paymentLinkId: string;
}

export interface PaymentStatusResponse {
    orderCode: number;
    status: 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED';
    amount: number;
    amountPaid: number;
    amountRemaining: number;
}

// Create a payment link via our backend API
export const createPaymentLink = async (data: PaymentData): Promise<PaymentResponse> => {
    const response = await fetch('/api/payos/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create payment link');
    }

    return result.data;
};

// Check payment status via our backend API
export const checkPaymentStatus = async (orderCode: number): Promise<PaymentStatusResponse> => {
    const response = await fetch(`/api/payos/check-status?orderCode=${orderCode}`, {
        method: 'GET'
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to check payment status');
    }

    return result.data;
};

// Poll for payment completion
export const pollPaymentStatus = (
    orderCode: number,
    onSuccess: () => void,
    onError: (error: Error) => void,
    intervalMs: number = 3000,
    maxAttempts: number = 60 // 3 minutes max polling
): () => void => {
    let attempts = 0;

    const intervalId = setInterval(async () => {
        attempts++;

        if (attempts > maxAttempts) {
            clearInterval(intervalId);
            onError(new Error('Payment timeout'));
            return;
        }

        try {
            const status = await checkPaymentStatus(orderCode);

            if (status.status === 'PAID') {
                clearInterval(intervalId);
                onSuccess();
            } else if (status.status === 'CANCELLED' || status.status === 'EXPIRED') {
                clearInterval(intervalId);
                onError(new Error(`Payment ${status.status.toLowerCase()}`));
            }
            // If PENDING, continue polling
        } catch (error) {
            console.error('Error checking payment status:', error);
            // Don't stop polling on network errors, just log
        }
    }, intervalMs);

    // Return cleanup function
    return () => clearInterval(intervalId);
};

// Generate a unique order code
export const generateOrderCode = (): number => {
    // Use timestamp + random to ensure uniqueness
    return Math.floor(Date.now() / 1000) * 1000 + Math.floor(Math.random() * 1000);
};
