/**
 * Converts a date to a human-readable relative time string.
 * Shows time differences like "5 minutes ago", "2 hours ago", etc.
 *
 * @param date - The date to convert
 * @param now - Reference date (defaults to current time)
 * @returns Human-readable relative time string
 *
 * @example
 * ```typescript
 * timeAgo(new Date('2023-01-01T10:00:00Z')); // "2 years ago"
 * timeAgo(Date.now() - 300000);               // "5 minutes ago"
 * timeAgo(Date.now() + 86400000);             // "in 1 day"
 * ```
 */
export function timeAgo(date: Date | number, now: Date | number = Date.now()): string {
  const targetDate = new Date(date);
  const currentDate = new Date(now);
  
  const diffInMs = currentDate.getTime() - targetDate.getTime();
  const diffInSeconds = Math.floor(Math.abs(diffInMs) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  
  const isPast = diffInMs > 0;
  const prefix = isPast ? '' : 'in ';
  const suffix = isPast ? ' ago' : '';
  
  // Handle "just now" case for very recent times (within 1 minute)
  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    const unit = diffInMinutes === 1 ? 'minute' : 'minutes';
    return `${prefix}${diffInMinutes} ${unit}${suffix}`;
  } else if (diffInHours < 24) {
    const unit = diffInHours === 1 ? 'hour' : 'hours';
    return `${prefix}${diffInHours} ${unit}${suffix}`;
  } else if (diffInDays < 7) {
    const unit = diffInDays === 1 ? 'day' : 'days';
    return `${prefix}${diffInDays} ${unit}${suffix}`;
  } else if (diffInWeeks < 4) {
    const unit = diffInWeeks === 1 ? 'week' : 'weeks';
    return `${prefix}${diffInWeeks} ${unit}${suffix}`;
  } else if (diffInMonths < 12) {
    const unit = diffInMonths === 1 ? 'month' : 'months';
    return `${prefix}${diffInMonths} ${unit}${suffix}`;
  } else {
    const unit = diffInYears === 1 ? 'year' : 'years';
    return `${prefix}${diffInYears} ${unit}${suffix}`;
  }
}
