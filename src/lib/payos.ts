// Simulate PayOS API Interaction

export interface PaymentData {
    orderCode: number;
    amount: number;
    description: string;
    cancelUrl: string;
    returnUrl: string;
}

export interface PaymentResponse {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: string;
    checkoutUrl: string; // The URL to the payment page (or QR)
    qrCode: string; // Base64 or URL to QR
}

// Mock function to "create" a payment link
export const createPaymentLink = async (data: PaymentData): Promise<PaymentResponse> => {
    console.log("Creating Payment Link for:", data);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        bin: "970422", // MB Bank example
        accountNumber: "123456789",
        accountName: "VIRALOGIC AI",
        amount: data.amount,
        description: data.description,
        orderCode: data.orderCode,
        currency: "VND",
        paymentLinkId: `payos_${Date.now()}`,
        status: "PENDING",
        checkoutUrl: "https://pay.payos.vn/mock-checkout",
        qrCode: "mock-qr-code-string"
    };
};

export const checkPaymentStatus = async (orderCode: number): Promise<string> => {
    console.log("Checking status for:", orderCode);
    // Mock check
    return "PAID";
}
