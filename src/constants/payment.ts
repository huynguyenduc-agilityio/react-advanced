import {
  AmericanExpressIcon,
  MasterCardIcon,
  VisaIcon,
} from '@/components/Icons';

export const PAYMENT_METHODS = [
  {
    title: 'VISA **** 8092',
    content: 'Expires on 12/26',
    value: 'visa',
    icon: VisaIcon,
  },
  {
    title: 'Mastercard **** 8092',
    content: 'Expires on 12/26',
    value: 'mastercard',
    icon: MasterCardIcon,
  },
  {
    title: 'American Express **** 8092',
    content: 'Expires on 12/26',
    value: 'american-express',
    icon: AmericanExpressIcon,
  },
];
