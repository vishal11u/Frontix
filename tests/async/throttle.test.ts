import { describe, it, expect, vi, beforeEach } from 'vitest';
import { throttle } from '../../src/async/throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should call function immediately on first call', () => {
    const mockFn = vi.fn();
    const throttled = throttle(mockFn, 1000);
    
    throttled();
    
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should throttle subsequent calls within the time window', () => {
    const mockFn = vi.fn();
    const throttled = throttle(mockFn, 1000);
    
    // First call - should execute immediately
    throttled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    // Second call within 1000ms - should be throttled
    throttled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    // Third call within 1000ms - should be throttled
    throttled();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should execute function after time window expires', () => {
    const mockFn = vi.fn();
    const throttled = throttle(mockFn, 1000);
    
    // First call
    throttled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    // Second call - throttled
    throttled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    // Advance time past the throttle window
    vi.advanceTimersByTime(1000);
    
    // Should execute now
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should handle multiple rapid calls correctly', () => {
    const mockFn = vi.fn();
    const throttled = throttle(mockFn, 1000);
    
    // Multiple rapid calls
    throttled();
    throttled();
    throttled();
    throttled();
    throttled();
    
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    // Advance time
    vi.advanceTimersByTime(1000);
    
    // Should execute the last call
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments correctly', () => {
    const mockFn = vi.fn();
    const throttled = throttle(mockFn, 1000);
    
    throttled('arg1', 'arg2');
    
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should handle edge case of 0ms throttle', () => {
    const mockFn = vi.fn();
    const throttled = throttle(mockFn, 0);
    
    throttled();
    throttled();
    throttled();
    
    // With 0ms throttle, all calls should execute immediately
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});
