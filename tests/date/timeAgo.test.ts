import { describe, it, expect, vi, beforeEach } from 'vitest';
import { timeAgo } from '../../src/date/timeAgo';

describe('timeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set a fixed date for consistent testing
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  it('should return "just now" for very recent times', () => {
    const recent = new Date('2024-01-15T11:59:30Z'); // 30 seconds ago
    
    expect(timeAgo(recent)).toBe('just now');
  });

  it('should handle minutes correctly', () => {
    const fiveMinutesAgo = new Date('2024-01-15T11:55:00Z');
    const oneMinuteAgo = new Date('2024-01-15T11:59:00Z');
    
    expect(timeAgo(fiveMinutesAgo)).toBe('5 minutes ago');
    expect(timeAgo(oneMinuteAgo)).toBe('1 minute ago');
  });

  it('should handle hours correctly', () => {
    const twoHoursAgo = new Date('2024-01-15T10:00:00Z');
    const oneHourAgo = new Date('2024-01-15T11:00:00Z');
    
    expect(timeAgo(twoHoursAgo)).toBe('2 hours ago');
    expect(timeAgo(oneHourAgo)).toBe('1 hour ago');
  });

  it('should handle days correctly', () => {
    const twoDaysAgo = new Date('2024-01-13T12:00:00Z');
    const oneDayAgo = new Date('2024-01-14T12:00:00Z');
    
    expect(timeAgo(twoDaysAgo)).toBe('2 days ago');
    expect(timeAgo(oneDayAgo)).toBe('1 day ago');
  });

  it('should handle weeks correctly', () => {
    const twoWeeksAgo = new Date('2024-01-01T12:00:00Z');
    const oneWeekAgo = new Date('2024-01-08T12:00:00Z');
    
    expect(timeAgo(twoWeeksAgo)).toBe('2 weeks ago');
    expect(timeAgo(oneWeekAgo)).toBe('1 week ago');
  });

  it('should handle months correctly', () => {
    const twoMonthsAgo = new Date('2023-11-15T12:00:00Z');
    const oneMonthAgo = new Date('2023-12-15T12:00:00Z');
    
    expect(timeAgo(twoMonthsAgo)).toBe('2 months ago');
    expect(timeAgo(oneMonthAgo)).toBe('1 month ago');
  });

  it('should handle years correctly', () => {
    const twoYearsAgo = new Date('2022-01-15T12:00:00Z');
    const oneYearAgo = new Date('2023-01-15T12:00:00Z');
    
    expect(timeAgo(twoYearsAgo)).toBe('2 years ago');
    expect(timeAgo(oneYearAgo)).toBe('1 year ago');
  });

  it('should handle future dates', () => {
    const fiveMinutesFromNow = new Date('2024-01-15T12:05:00Z');
    const oneHourFromNow = new Date('2024-01-15T13:00:00Z');
    const oneDayFromNow = new Date('2024-01-16T12:00:00Z');
    
    expect(timeAgo(fiveMinutesFromNow)).toBe('in 5 minutes');
    expect(timeAgo(oneHourFromNow)).toBe('in 1 hour');
    expect(timeAgo(oneDayFromNow)).toBe('in 1 day');
  });

  it('should handle custom reference time', () => {
    const customNow = new Date('2024-01-15T15:00:00Z');
    const oneHourAgo = new Date('2024-01-15T14:00:00Z');
    
    expect(timeAgo(oneHourAgo, customNow)).toBe('1 hour ago');
  });

  it('should handle edge cases', () => {
    const sameTime = new Date('2024-01-15T12:00:00Z');
    const almostSameTime = new Date('2024-01-15T11:59:59Z');
    
    expect(timeAgo(sameTime)).toBe('just now');
    expect(timeAgo(almostSameTime)).toBe('just now');
  });

  it('should handle different time units correctly', () => {
    const thirtySecondsAgo = new Date('2024-01-15T11:59:30Z');
    const ninetySecondsAgo = new Date('2024-01-15T11:58:30Z');
    
    expect(timeAgo(thirtySecondsAgo)).toBe('just now');
    expect(timeAgo(ninetySecondsAgo)).toBe('1 minute ago');
  });
});
