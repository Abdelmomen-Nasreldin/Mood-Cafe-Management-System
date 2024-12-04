import { IOrderStatus } from "../models/order";

export const PAGES = {
  MENU : 'menu',
  ORDERS : 'orders',
  TRACKING : 'tracking',
  EDIT : 'edit',
  PAID : 'paid',
  POSTPONED : 'postponed',
  CANCELLED : 'cancelled',
 } as const;

 export const TRACKING_PERIODS = {
  FROM_1ST_OF_MONTH : "fromFirstDayOfMonth",
  LAST_30_DAYS : "from30Days",
  LAST_7_DAYS : "from7Days",
  CUSTOM_DAY : "formSelectedDay",
  FROM_CUSTOM_DATE_TO_DATE : "formSelectedDateToDate",
 } as const;

 export const TRACKING_TIME : { text: string; value: string }[] = [
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
}

export const OrderStatusTranslations : { [key: string]: { en: IOrderStatus; ar: string }} = {
  [OrderStatus.PENDING]: { en: OrderStatus.PENDING, ar: 'قيد الانتظار' },
  [OrderStatus.PAID]: { en: OrderStatus.PAID, ar: 'مدفوع' },
  [OrderStatus.POSTPONED]: { en: OrderStatus.POSTPONED, ar: 'تم تأجيله' },
  [OrderStatus.CANCELLED]: { en: OrderStatus.CANCELLED, ar: 'ملغى' }
} as const;
