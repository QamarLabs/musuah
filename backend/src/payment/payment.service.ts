import { Inject, Injectable } from '@nestjs/common';
import Stripe from "stripe";
import { CapturePaymentInfo, PaymentSession, SetupCustomerPaymentInfo, SubmitCustomerPaymentInfo } from 'src/models/payment';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
  ) { }

  async initializeCustomerSession(paymentInfo: SetupCustomerPaymentInfo): Promise<PaymentSession> {
    let customer;
    let customerSession;
    let paymentIntent;
    let setupIntentId;
    try {
      if (!paymentInfo.customerId) {
        if (paymentInfo.email)
          customer = await this.stripe.customers.create({
            email: paymentInfo.email,
            tax_exempt: 'exempt'
          })
        else
          customer = await this.stripe.customers.create({
            tax_exempt: 'exempt'
          })

      }

      paymentIntent = await this.stripe.setupIntents.create({
        usage: 'on_session',
        customer: customer?.id ?? paymentInfo.customerId,
      })

      customerSession = await this.stripe.customerSessions.create({
        customer: customer?.id ?? paymentInfo.customerId!,
        components: {
          payment_element: {
            enabled: true,
            features: {
              payment_method_redisplay: 'enabled',
              payment_method_save: 'enabled',
              payment_method_save_usage: 'off_session',
              payment_method_remove: 'enabled'
            }
          }
        }
      });

    } catch (err) {
      console.log("Error post payment intent!", err);
      throw "Error posting donation, contact support if you still want to donate."
    } finally {

      if (paymentIntent)
        return {
          customerId: customer?.id ?? paymentInfo.customerId!,
          clientSecret: paymentIntent.client_secret,
          customerSessionClientSecret: customerSession?.client_secret
        };
    }

  }

  async submitPayment(paymentInfo: SubmitCustomerPaymentInfo): Promise<PaymentSession> {
    let customer;
    let customerSession;
    let paymentIntent;
    console.log("paymentInfo:", paymentInfo)
    try {

      if(!paymentInfo.paymentMethodId)
        throw new Error("Payment method required!!!");

      paymentIntent = await this.stripe.paymentIntents.create({
        amount: paymentInfo.amount,
        currency: 'usd',
        metadata: {
          amount: paymentInfo.amount,
          message: paymentInfo.paymentMessage,
          ipAddress: paymentInfo.ipAddress,
        },
        payment_method: paymentInfo.paymentMethodId,
        payment_method_configuration: process.env.STRIPE_PAYMENT_CONFIGURATION!,
        customer: customer?.id ?? paymentInfo.customerId!,
        confirmation_method: 'automatic',
        off_session: true,
        confirm: true,
        capture_method: 'manual'
      });
      
    } catch (err) {
      console.log("SUBMIT PAYMENT ERROR:", err);
    } finally {
       if (paymentIntent)
        return {
          customerId: customer?.id ?? paymentInfo.customerId!,
          clientSecret: paymentIntent.client_secret,
          customerSessionClientSecret: customerSession?.client_secret
        };
    }

  }

  async capturePayment(
    capturePaymentRequest: CapturePaymentInfo
  ) {
    let payment;
    const {
      paymentIntentClientSecret,
      paymentIntentId,
      // customerSessionId,
      // customerId
    } = capturePaymentRequest
    
    try {

      // if(!customerId)
      //     throw new Error("customer identifier is required to capturing a payment");

      if (!paymentIntentClientSecret)
        throw new Error("payment secret is required when capturing a payment.")

      payment = await this.stripe.paymentIntents.retrieve(paymentIntentId!);

      if (!payment)
        throw new Error("A valid payment is required when capturing a payment.")

      payment = await this.stripe.paymentIntents.capture(payment.id);

    } catch (err) {
      console.log("Error capture payment intent!", err);
      return Response.error();
    } finally {
      return {}
    }
  }

}
