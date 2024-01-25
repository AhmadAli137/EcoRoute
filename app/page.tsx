import React from "react";
import Map from "./components/Map";
import { hardcodedNodes } from "./nodes";
import SlidersComponent from "./SidersComponent";

const MapPage = () => {
  return (
    <div className="flex flex-col  px-5">
      <div className="flex">
        <div className="flex-grow bg-slate-100 shadow-xl rounded-lg overflow-hidden border border-green-600">
          <div className="map-container p-4">
            <h2 className="text-2xl text-center font-semibold text-green-700 mb-4">
              Map
            </h2>
            <Map nodes={hardcodedNodes} />
          </div>
        </div>

        <div className="w-1/4 flex flex-col ml-10">
          {/* Input Box */}
          <div className="bg-slate-100 shadow-xl overflow-hidden p-4 mb-4 flex flex-col items-center justify-center border border-green-600 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Input Parameters
            </h2>
            <div className="w-full max-w-md px-4 py-2 bg-white rounded-lg shadow-inner">
              <SlidersComponent />
            </div>
          </div>
          {/* Output Box */}
          <div className="text-center bg-slate-100 shadow-xl overflow-hidden p-4 flex-grow border border-green-600 rounded">
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
