import { differenceInDays, formatDistance, parseISO } from 'date-fns';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// We want to make this function work for both Date objects and strings (which come from Supabase)
export function subtractDates(dateStr1: Date, dateStr2: Date) {
  return differenceInDays(
    parseISO(String(dateStr1)),
    parseISO(String(dateStr2))
  );
}

export function formatDistanceFromNow(dateStr: string) {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');
}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
type Options = {
  end: boolean;
};
export const getToday = function (options?: Options) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
