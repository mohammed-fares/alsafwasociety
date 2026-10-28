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
  unitDescription?: string;
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
  intention: string;
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

export interface BeneficiaryRequest {
  id: string;
  serviceId: string;
  serviceTitle: string;
  applicantName: string;
  applicantPhone: string;
  nationalId?: string;
  address: string;
  details: string;
  urgency: 'عاجل جداً (خلال 24 ساعة)' | 'متوسط' | 'عادي';
  status: 'قيد المراجعة' | 'تم القبول' | 'تم التنفيذ';
  createdAt: string;
}

export interface SocietySocialLinks {
  facebookPage: string;
  facebookGroup: string;
  youtube: string;
  whatsappGroup?: string;
  telegram?: string;
}

export interface SocietyArticle {
  number: string;
  title: string;
  content: string;
}

export interface SiteContentData {
  name: string;
  nameEn: string;
  slogan: string;
  subSlogan: string;
  establishedYear: string;
  registrationNumber: string;
  registrationYear: string;
  governorate: string;
  administration: string;
  bylawApprovalDate: string;
  address: string;
  phone: string;
  whatsapp: string;
  whatsappUrl?: string;
  email: string;
  website: string;
  workHours: string;
  logoUrl: string;
  bannerUrl: string;
  bannerSecondaryUrl: string;
  bylawsDocUrl: string;
  socialLinks: SocietySocialLinks;
  articles: SocietyArticle[];
  paymentGateways?: {
    instaPay: {
      id: string;
      phone: string;
      name: string;
    };
    vodafoneCash: {
      numbers: string[];
      name: string;
    };
    bankAccounts: Array<{
      bankName: string;
      accountNumber: string;
      iban?: string;
      swift?: string;
      beneficiary: string;
    }>;
  };
}

export interface WordPressSyncConfig {
  wpUrl: string;
  apiKey?: string;
  webhookUrl?: string;
  syncEnabled: boolean;
  lastSyncedAt?: string;
}
