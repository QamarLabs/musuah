import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CapturePaymentInfo, SetupCustomerPaymentInfo, SubmitCustomerPaymentInfo } from 'src/models/payment';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService) { }

    @Post('initializeCustomerSession')
    async initializeCustomerSession(
        @Body() { values: customerPaymentInfo }: { values: SetupCustomerPaymentInfo }) {
        const paymentSession = await this.paymentService.initializeCustomerSession(customerPaymentInfo);

        if (!paymentSession)
            throw new HttpException('Invalid payment info', HttpStatus.BAD_REQUEST);

        return paymentSession;
    }

    @Post('submitPayment')
    async submitPayment(
        @Body() { values: customerPaymentInfo }: { values: SubmitCustomerPaymentInfo }) {
        const paymentSession = await this.paymentService.submitPayment(customerPaymentInfo);

        if (!paymentSession)
            throw new HttpException('Invalid payment info', HttpStatus.BAD_REQUEST);

        return paymentSession;
    }

    @Post('capturePayment')
    async capturePayment(
        @Body() { values: capturePaymentInfo }: { values: CapturePaymentInfo }) {
        try {

            await this.paymentService.capturePayment(capturePaymentInfo);
        } catch {

            throw new HttpException('Invalid capture payment info', HttpStatus.BAD_REQUEST);
        }

        return "Captured";
    }
}
