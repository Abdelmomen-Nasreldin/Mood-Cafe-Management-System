export const PAGES = {
  MENU : 'menu',
  ORDERS : 'orders',
  TRACKING : 'tracking',
  EDIT : 'edit',
 } as const;

 export const TRACKING_PERIODS = {
  FROM_1ST_OF_MONTH : "fromFirstDayOfMonth",
  LAST_30_DAYS : "from30Days",
  LAST_7_DAYS : "from7Days",
  CUSTOM_DAY : "formSelectedDay",
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
];
