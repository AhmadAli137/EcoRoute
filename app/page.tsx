"use client";
// MapPage.tsx
import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import { hardcodedNodes } from "./nodes";
import SlidersComponent from "./SidersComponent";

interface MapNode {
  id: number;
  latLng: { lat: number; lng: number };
  type: string;
  amount: number;
  risk: number;
}

interface PlasticStats {
  totalProduced: number;
  totalLost: number;
  totalInOcean: number;
}

const MapPage = () => {
  // State to store the calculated values
  const [totalDistance, setTotalDistance] = useState(0);
  const [plasticStats, setPlasticStats] = useState<PlasticStats>({
    totalProduced: 0,
    totalLost: 0,
    totalInOcean: 0,
  });

  // Function to update stats from Map component
  const updateStats = (distance: number, stats: PlasticStats) => {
    setTotalDistance(distance);
    setPlasticStats(stats);
  };

  return (
    <div className="flex flex-col px-5">
      <div className="md:flex">
        {/* Map Container */}
        <div className="flex-grow bg-slate-100 shadow-xl rounded-lg overflow-hidden border border-green-600 mb-4 md:mb-0 md:mr-10">
          <div className="map-container p-4">
            <h2 className="text-2xl text-center font-semibold text-green-700 mb-4">Map</h2>
            <Map nodes={hardcodedNodes} onStatsCalculated={updateStats} />
          </div>
        </div>

        {/* Side Panel */}
        <div className="md:w-1/4">
          {/* Input Box */}
          <div className="bg-slate-100 shadow-xl overflow-hidden p-4 mb-4 border border-green-600 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Input Parameters</h2>
            <div className="w-full max-w-md mx-auto px-4 py-2 bg-white rounded-lg shadow-inner">
              <SlidersComponent />
            </div>
          </div>

          {/* Output Box */}
          <div className="text-center bg-slate-100 shadow-xl overflow-hidden p-4 border border-green-600 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Output</h2>
            <p>Total Distance: {totalDistance.toFixed(2)} km</p>
            <p>Total Plastic Produced: {plasticStats.totalProduced} units</p>
            <p>Plastic Lost: {plasticStats.totalLost.toFixed(2)} units</p>
            <p>Plastic Ended Up in Ocean: {plasticStats.totalInOcean.toFixed(2)} units</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;

