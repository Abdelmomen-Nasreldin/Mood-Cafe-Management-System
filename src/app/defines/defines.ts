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
