"use client";
import React, { useState, useEffect } from "react";

const SlidersComponent = () => {
  const [a, setA] = useState(0.5);
  const [b, setB] = useState(0.5);

  useEffect(() => {
    setB(1 - a);
  }, [a]);

  useEffect(() => {
    setA(1 - b);
  }, [b]);

  const handleAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setA(parseFloat(event.target.value));
  };

  const handleBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setB(parseFloat(event.target.value));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          A: {a.toFixed(2)}
          <input
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={a}
            onChange={handleAChange}
          />
        </label>
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          B: {b.toFixed(2)}
          <input
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={b}
            onChange={handleBChange}
          />
        </label>
      </div>
    </div>
  );
};

export default SlidersComponent;
