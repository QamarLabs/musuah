import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from 'src/payment/payment.service';
import Stripe from 'stripe';

@Module({
  imports: [],
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Stripe(configService.get('STRIPE_SECRET_KEY'), {
          apiVersion: '2025-07-30.basil',
          typescript: true,
        });
      },
      inject: [ConfigService],
    },
    PaymentService],
  exports: [PaymentService],
})
export class PaymentsModule {}