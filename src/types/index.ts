export interface ActivityProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'كفالات' | 'مساعدات' | 'تعليم وقرآن' | 'صحة' | 'عمارة ومشاريع' | 'مواسم';
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  defaultAmounts: number[];
  unitDescription?: string; // e.g. "500 ج.م شهرياً لكفالة يتيم"
  iconName: string;
  image?: string;
  featured?: boolean;
}

export type PaymentMethodType = 
  | 'instapay'
  | 'vodafone_cash'
  | 'card'
  | 'bank_transfer'
  | 'cash_courier';

export interface DonationCartItem {
  programId: string;
  programTitle: string;
  amount: number;
  isMonthly: boolean;
  intention: string; // صدقة / زكاة / كفالة / إكرام
}

export interface DonorInfo {
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  isAnonymous: boolean;
  notes?: string;
}

export interface DonationReceiptData {
  receiptNumber: string;
  date: string;
  donorName: string;
  phone: string;
  amount: number;
  currency: string;
  programs: { title: string; amount: number; intention: string }[];
  paymentMethod: PaymentMethodType;
  paymentReference?: string;
  status: 'confirmed' | 'pending_verification';
  bylawReference: string;
}
