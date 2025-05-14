import { format } from 'date-fns';

export class DateUtil {
  static formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'dd/MM/yyyy HH:mm:ss');
  }

  static formatDate(date: Date): string {
    return format(date, 'dd/MM/yyyy');
  }

  static formatTime(date: Date): string {
    return format(date, 'HH:mm:ss');
  }
}
