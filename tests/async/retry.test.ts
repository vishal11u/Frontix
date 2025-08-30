
import { describe, it, expect, vi } from 'vitest';
import { retry } from '../../src/async/retry';

describe('retry', () => {
  it('should return result on first successful attempt', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    
    const result = retry(mockFn, 3, 1000);
    
    await expect(result).resolves.toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle immediate success', async () => {
    const mockFn = vi.fn().mockResolvedValue('immediate');
    
    const result = retry(mockFn, 1, 1000);
    
    await expect(result).resolves.toBe('immediate');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should use default values', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    
    const result = retry(mockFn);
    
    await expect(result).resolves.toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle function errors gracefully', async () => {
    const error = new Error('Test error');
    const mockFn = vi.fn().mockRejectedValue(error);
    
    const result = retry(mockFn, 1, 100);
    
    await expect(result).rejects.toThrow('Test error');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
