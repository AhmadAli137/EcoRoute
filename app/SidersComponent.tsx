"use client";
import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

const SlidersComponent = () => {
  const [a, setA] = useState(0.5);
  const [b, setB] = useState(0.5);

  const debouncedSetA = useCallback(debounce(setA, 25), []);
  const debouncedSetB = useCallback(debounce(setB, 25), []);

  useEffect(() => {
    debouncedSetB(1 - a);
  }, [a, debouncedSetB]);

  useEffect(() => {
    debouncedSetA(1 - b);
  }, [b, debouncedSetA]);

  const handleAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetA(parseFloat(event.target.value));
  };

  const handleBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetB(parseFloat(event.target.value));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          A: {a.toFixed(2)}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={a}
            onChange={handleAChange}
            className="range range-primary" // DaisyUI class
          />
        </label>
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          B: {b.toFixed(2)}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={b}
            onChange={handleBChange}
            className="range range-secondary" // DaisyUI class for a different color
          />
        </label>
      </div>
    </div>
  );
};

export default SlidersComponent;
