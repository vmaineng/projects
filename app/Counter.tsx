"use client";

import { useState } from "react";

export type CounterProps = {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
};

export default function Counter({
  initialValue = 0,
  min = 0,
  max = 10,
  onChange,
}: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  function updateCount(newValue: number) {
    setCount(newValue);
    onChange?.(newValue);
  }

  function increment() {
    updateCount(count + 1);
  }

  function decrement() {
    updateCount(count - 1);
  }

  function reset() {
    updateCount(initialValue);
  }

  const isMaxed = count >= max;
  const isMin = count <= min;

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={increment} disabled={isMaxed}>
        +
      </button>
      <button type="button" onClick={decrement} disabled={isMin}>
        -
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      {isMaxed && <p>Maximum value reached</p>}
      {isMin && <p>Minimum value reached</p>}
    </div>
  );
}
