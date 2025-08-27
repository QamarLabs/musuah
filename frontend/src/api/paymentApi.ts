import axios from "axios";
// import { PaginatedResult } from "../models/common";
import { axiosResponseBody } from "./agent";
import { CapturePaymentInfo, PaymentSession, SetupCustomerPaymentInfo, SubmitCustomerPaymentInfo } from "../models/payment";

export const paymentApi = {
    initializeSession: (values: SetupCustomerPaymentInfo): Promise<PaymentSession> => 
        axios.post(`/payment/initializeCustomerSession`, { values }).then(axiosResponseBody),
    submitPayment: (values: SubmitCustomerPaymentInfo) => 
        axios.post(`/payment/submitPayment`, { values }).then(axiosResponseBody),
    capturePayment: (values: CapturePaymentInfo) => 
        axios.post<any>(`/payment/capturePayment`, { values }).then(axiosResponseBody)
}