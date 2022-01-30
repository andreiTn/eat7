import { date } from 'quasar';

export const DATE_STRING = 'DD/MM/YYYY';

export function addDaysToDate(timestamp: number, days: number): number {
  return date.addToDate(timestamp, { days }).getTime();
}

export function formatDate(d: Date): string {
  return date.formatDate(d, DATE_STRING);
}

export function stringToTimestamp(dateString: string): number {
  const [d, m, y] = dateString.split('/');
  return date.buildDate({
    date: parseInt(d, 10),
    month: parseInt(m, 10),
    year: parseInt(y, 10),
  }).getTime();
}
