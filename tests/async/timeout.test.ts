import { describe, it, expect, vi, beforeEach } from 'vitest';
import { timeout } from '../../src/async/timeout';

describe('timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should resolve when function completes before timeout', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    
    const result = timeout(mockFn, 5000);
    
    // Fast-forward time to simulate function completion
    vi.advanceTimersByTime(1000);
    
    await expect(result).resolves.toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should reject when function times out', async () => {
    const mockFn = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 10000))
    );
    
    const result = timeout(mockFn, 5000);
    
    // Fast-forward time to trigger timeout
    vi.advanceTimersByTime(5000);
    
    await expect(result).rejects.toThrow('Operation timed out after 5000ms');
  });

  it('should handle function errors', async () => {
    const error = new Error('Function failed');
    const mockFn = vi.fn().mockRejectedValue(error);
    
    const result = timeout(mockFn, 5000);
    
    // Fast-forward time to simulate function completion
    vi.advanceTimersByTime(1000);
    
    await expect(result).rejects.toThrow('Function failed');
  });

  it('should clear timeout when function completes successfully', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const result = timeout(mockFn, 5000);
    
    // Fast-forward time to simulate function completion
    vi.advanceTimersByTime(1000);
    
    await expect(result).resolves.toBe('success');
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should clear timeout when function fails', async () => {
    const error = new Error('Function failed');
    const mockFn = vi.fn().mockRejectedValue(error);
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const result = timeout(mockFn, 5000);
    
    // Fast-forward time to simulate function completion
    vi.advanceTimersByTime(1000);
    
    await expect(result).rejects.toThrow('Function failed');
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
