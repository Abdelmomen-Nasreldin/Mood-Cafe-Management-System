import { IOrderStatus } from "../models/order";

export const PAGES = {
  MENU : 'menu',
  ORDERS : 'orders',
  TRACKING : 'tracking',
  EDIT : 'edit',
  PAID : 'paid',
  POSTPONED : 'postponed',
  CANCELLED : 'cancelled',
  LOGIN : 'login',
  CONTROLLING : 'controlling',
 } as const;

 export const ASIDE_PAGES = [
  {
    name: 'المنيو',
    path: PAGES.MENU,
  },
  {
    name: 'طلبات اليوم',
    path: PAGES.ORDERS,
  },
  {
    name: 'المدفوعات',
    path: PAGES.PAID,
  },
  {
    name: 'temp',
    path: PAGES.POSTPONED,
  },
  {
    name: 'الملغية',
    path: PAGES.CANCELLED,
  },
  {
    name: 'tracking',
    path: PAGES.TRACKING,
  },
  {
    name: 'controlling',
    path: PAGES.CONTROLLING,
  },
];

 export const TRACKING_PERIODS = {
  TODAY : "today",
  FROM_1ST_OF_MONTH : "fromFirstDayOfMonth",
  LAST_30_DAYS : "from30Days",
  LAST_7_DAYS : "from7Days",
  CUSTOM_DAY : "formSelectedDay",
  FROM_CUSTOM_DATE_TO_DATE : "formSelectedDateToDate",
 } as const;

 export const TRACKING_TIME : { text: string; value: string }[] = [
  {
    text: ' اليوم',
    value: TRACKING_PERIODS.TODAY,
  },
  {
    text: 'من أول الشهر',
    value: TRACKING_PERIODS.FROM_1ST_OF_MONTH,
  },
  {
    text: ' أخر 30 يوم',
    value: TRACKING_PERIODS.LAST_30_DAYS,
  },
  {
    text: ' أخر 7 أيام',
    value: TRACKING_PERIODS.LAST_7_DAYS,
  },
  {
    text: 'تاربخ معين',
    value: TRACKING_PERIODS.CUSTOM_DAY,
  },
  {
    text: ' من تاربخ معين لتاريخ معين',
    value: TRACKING_PERIODS.FROM_CUSTOM_DATE_TO_DATE,
  },
];

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  POSTPONED = 'postponed',
  CANCELLED = 'cancelled',
  PAID_POSTPONED = 'paid-postponed'
}

export const OrderStatusTranslations : { [key: string]: { en: IOrderStatus; ar: string }} = {
  [OrderStatus.PENDING]: { en: OrderStatus.PENDING, ar: 'قيد الانتظار' },
  [OrderStatus.PAID]: { en: OrderStatus.PAID, ar: 'مدفوع' },
  [OrderStatus.POSTPONED]: { en: OrderStatus.POSTPONED, ar: 'تم تأجيله' },
  [OrderStatus.CANCELLED]: { en: OrderStatus.CANCELLED, ar: 'ملغى' },
} as const;

export enum ENGLISH_CATEGORIES  {
  ALL = 'all',
  HOT = 'hot',
  COLD = 'cold',
  SWEETS = 'sweets',
  OTHERS = 'others'
}

export const CATEGORIES : { en: ENGLISH_CATEGORIES; ar: string }[] = [{
  en: ENGLISH_CATEGORIES.ALL,
  ar: 'الجميع'
},
{
  en: ENGLISH_CATEGORIES.HOT,
  ar: 'مشروبات ساخنه'
},
{
  en: ENGLISH_CATEGORIES.COLD,
  ar: 'مشروبات بارده'
},
{
  en: ENGLISH_CATEGORIES.SWEETS,
  ar: 'حلويات'
},
{
  en: ENGLISH_CATEGORIES.OTHERS,
  ar: 'أخرى'
}
] as const;

export const ROLES = {
  ADMIN : 'admin',
  OWNER : 'owner',
  CASHIER : 'cashier',
  READ_ONLY : 'read-only',
  MANAGER : 'manager',
} as const;

export type Roles = typeof ROLES[keyof typeof ROLES];

export const DEBOUNCE_TIME = 800; // milliseconds
