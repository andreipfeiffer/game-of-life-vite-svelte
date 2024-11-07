export const MIN_LENGTH = 4;
export const DEFAULT_SIZE = 30;

export const LifetimeValues: Record<
  number,
  { value: number; label: string }
> = Object.freeze({
  1: { value: 1, label: "requestAnimationFrame()" },
  2: { value: 100, label: "100ms" },
  3: { value: 500, label: "0.5s" },
});
