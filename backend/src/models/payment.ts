
export interface SetupCustomerPaymentInfo {
    ipAddress: string; 
    email?: string;
    customerId?: string;
}

export interface SubmitCustomerPaymentInfo {
    setupPaymentId: string;
    paymentMethodId: any;
    ipAddress: string; 
    amount: number;
    paymentMessage: string;
    email?: string;
    customerId?: string;
    customerSessionSecret?: string;
}

export interface PaymentSession {
    customerId: string;
    clientSecret: string;
    customerSessionClientSecret: string;
}

export interface CapturePaymentInfo {
    paymentIntentClientSecret: string;
    paymentIntentId: string;
    customerSessionId?: string;
    customerId?: string;
    customerInfo: any;
}

// , customerInfo