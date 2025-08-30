
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { retry } from '../../src/async/retry';

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return result on first successful attempt', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    
    const result = retry(mockFn, 3, 1000);
    
    await expect(result).resolves.toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should retry failed attempts and eventually succeed', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error('Failed'))
      .mockRejectedValueOnce(new Error('Failed'))
      .mockResolvedValue('success');
    
    const result = retry(mockFn, 3, 1000);
    
    // Fast-forward time to trigger retries
    vi.advanceTimersByTime(1000);
    vi.advanceTimersByTime(2000);
    
    await expect(result).resolves.toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should reject after all retry attempts fail', async () => {
    const error = new Error('Persistent failure');
    const mockFn = vi.fn().mockRejectedValue(error);
    
    const result = retry(mockFn, 2, 1000);
    
    // Fast-forward time to trigger retries
    vi.advanceTimersByTime(1000);
    
    await expect(result).rejects.toThrow('Persistent failure');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should use default values', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    
    const result = retry(mockFn);
    
    await expect(result).resolves.toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle immediate success', async () => {
    const mockFn = vi.fn().mockResolvedValue('immediate');
    
    const result = retry(mockFn, 1, 1000);
    
    await expect(result).resolves.toBe('immediate');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
