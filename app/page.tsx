import React from "react";
import Map from "./components/Map";
import { hardcodedNodes } from "./nodes";
import SlidersComponent from "./SidersComponent";

const MapPage = () => {
  return (
    <div className="flex flex-col px-5">
      <div className="md:flex">
        <div className="flex-grow bg-slate-100 shadow-xl rounded-lg overflow-hidden border border-green-600 mb-4 md:mb-0 md:mr-10">
          <div className="map-container p-4">
            <h2 className="text-2xl text-center font-semibold text-green-700 mb-4">
              Map
            </h2>
            <Map nodes={hardcodedNodes} />
          </div>
        </div>

        <div className="md:w-1/4">
          {/* Input Box */}
          <div className="bg-slate-100 shadow-xl overflow-hidden p-4 mb-4 border border-green-600 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Input Parameters
            </h2>
            <div className="w-full max-w-md mx-auto px-4 py-2 bg-white rounded-lg shadow-inner">
              <SlidersComponent />
            </div>
          </div>

          {/* Output Box */}
          <div className="text-center bg-slate-100 shadow-xl overflow-hidden p-4 border border-green-600 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Output
            </h2>
            {/* Output content goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
