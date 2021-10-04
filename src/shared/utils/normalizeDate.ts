import { zonedTimeToUtc } from 'date-fns-tz';

export default function normalizeDate(scheduled: string | Date, timezone = 'America/Sao_Paulo'): Date {
  const normalizedDate = zonedTimeToUtc(scheduled, timezone);

  return normalizedDate;
}
