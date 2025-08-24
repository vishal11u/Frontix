import { describe, it, expect, vi, beforeEach } from "vitest";
import { debounce } from "../../src/misc/debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should debounce function calls", async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    // Call multiple times rapidly
    debouncedFn("first");
    debouncedFn("second");
    debouncedFn("third");

    // Function should not be called yet
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time
    vi.advanceTimersByTime(100);

    // Function should be called once with last arguments
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("third");
  });

  it("should reset timer on each call", async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn("first");
    
    // Advance time but not enough to trigger
    vi.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();

    // Call again, should reset timer
    debouncedFn("second");
    vi.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();

    // Advance remaining time
    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("second");
  });

  it("should handle different wait times", async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn("test");
    vi.advanceTimersByTime(250);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(250);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should pass arguments correctly", async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn("arg1", "arg2", 123);
    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2", 123);
  });

  it("should handle multiple debounced functions independently", async () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();
    
    const debouncedFn1 = debounce(mockFn1, 100);
    const debouncedFn2 = debounce(mockFn2, 200);

    debouncedFn1("first");
    debouncedFn2("second");

    vi.advanceTimersByTime(100);
    expect(mockFn1).toHaveBeenCalledWith("first");
    expect(mockFn2).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(mockFn2).toHaveBeenCalledWith("second");
  });
});
