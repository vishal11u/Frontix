import { describe, it, expect } from 'vitest';
import { isToday, isYesterday, isThisWeek, isThisMonth, isThisYear } from '../../src/date/comparison';

describe('Date Comparison Functions', () => {
  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('should return false for other days', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      expect(isToday(yesterday)).toBe(false);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe('isYesterday', () => {
    it('should return true for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isYesterday(yesterday)).toBe(true);
    });

    it('should return false for other days', () => {
      const today = new Date();
      const dayBeforeYesterday = new Date();
      dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
      
      expect(isYesterday(today)).toBe(false);
      expect(isYesterday(dayBeforeYesterday)).toBe(false);
    });
  });

  describe('isThisWeek', () => {
    it('should return true for dates in current week', () => {
      const today = new Date();
      expect(isThisWeek(today)).toBe(true);
      
      // Test a few days around today
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      expect(isThisWeek(yesterday)).toBe(true);
      
      // Only test tomorrow if it's actually in the current week
      // (e.g., if today is Saturday, tomorrow is Sunday which starts next week)
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      // Check if tomorrow is in the same week as today
      const todayWeekStart = new Date(today);
      const dayOfWeek = today.getDay();
      todayWeekStart.setDate(today.getDate() - dayOfWeek);
      todayWeekStart.setHours(0, 0, 0, 0);
      
      const tomorrowWeekStart = new Date(tomorrow);
      const tomorrowDayOfWeek = tomorrow.getDay();
      tomorrowWeekStart.setDate(tomorrow.getDate() - tomorrowDayOfWeek);
      tomorrowWeekStart.setHours(0, 0, 0, 0);
      
      if (todayWeekStart.getTime() === tomorrowWeekStart.getTime()) {
        expect(isThisWeek(tomorrow)).toBe(true);
      } else {
        expect(isThisWeek(tomorrow)).toBe(false);
      }
    });

    it('should return false for dates outside current week', () => {
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      expect(isThisWeek(lastWeek)).toBe(false);
      expect(isThisWeek(nextWeek)).toBe(false);
    });
  });

  describe('isThisMonth', () => {
    it('should return true for dates in current month', () => {
      const today = new Date();
      expect(isThisMonth(today)).toBe(true);
      
      // Test first and last day of month
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      expect(isThisMonth(firstOfMonth)).toBe(true);
      expect(isThisMonth(lastOfMonth)).toBe(true);
    });

    it('should return false for dates outside current month', () => {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 15);
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);
      
      expect(isThisMonth(lastMonth)).toBe(false);
      expect(isThisMonth(nextMonth)).toBe(false);
    });
  });

  describe('isThisYear', () => {
    it('should return true for dates in current year', () => {
      const today = new Date();
      expect(isThisYear(today)).toBe(true);
      
      // Test beginning and end of year
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      
      expect(isThisYear(startOfYear)).toBe(true);
      expect(isThisYear(endOfYear)).toBe(true);
    });

    it('should return false for dates outside current year', () => {
      const today = new Date();
      const lastYear = new Date(today.getFullYear() - 1, 6, 15);
      const nextYear = new Date(today.getFullYear() + 1, 6, 15);
      
      expect(isThisYear(lastYear)).toBe(false);
      expect(isThisYear(nextYear)).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle different time components', () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      
      expect(isToday(midnight)).toBe(true);
      expect(isToday(endOfDay)).toBe(true);
    });

    it('should handle year boundaries', () => {
      const currentYear = new Date().getFullYear();
      const lastDayOfYear = new Date(currentYear, 11, 31);
      const firstDayOfYear = new Date(currentYear, 0, 1);
      
      expect(isThisYear(lastDayOfYear)).toBe(true);
      expect(isThisYear(firstDayOfYear)).toBe(true);
    });

    it('should handle month boundaries', () => {
      const today = new Date();
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      expect(isThisMonth(lastDayOfMonth)).toBe(true);
      expect(isThisMonth(firstDayOfMonth)).toBe(true);
    });
  });
});
