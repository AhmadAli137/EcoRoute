"use client";
import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useLoadScript, Polyline } from "@react-google-maps/api";
import MarkerComponent from "./MarkerComponent"; // Adjust the import path as needed

// Interface for MapNode
interface MapNode {
  id: number;
  latLng: { lat: number; lng: number };
  type: string;
  amount: number;
  risk: number;
}

// Interface for the Map component's props
interface MapProps {
  nodes: MapNode[];
}

const mapContainerStyle = {
  position: "relative" as const,
  width: "100%",
  height: "600px",
  margin: "auto",
  borderRadius: "8px",
};

const mapOptions = {
  scrollwheel: true,
  mapTypeControl: false, // This disables the map/satellite toggle control
};

const Map: React.FC<MapProps> = ({ nodes }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Ensure the API key is stored in your environment variables
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  // Function to create path segments between each pair of nodes
  const createPathSegments = () => {
    return nodes.slice(0, -1).map((node, index) => {
      return [node.latLng, nodes[index + 1].latLng];
    });
  };

  const fitBoundsToNodes = useCallback(() => {
    if (!map) return;
    const bounds = new google.maps.LatLngBounds();
    nodes.forEach((node) => bounds.extend(node.latLng));
    map.fitBounds(bounds);
  }, [map, nodes]); // Dependencies of fitBoundsToNodes

  useEffect(() => {
    fitBoundsToNodes();
  }, [fitBoundsToNodes]); // fitBoundsToNodes is now memoized

  const handleMapClick = () => {
    setActiveNodeId(null); // Close any open info windows when the map is clicked
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div style={mapContainerStyle}>
      <button
        className="btn absolute top-2.5 left-2.5 z-50 shadow-md"
        onClick={fitBoundsToNodes}
      >
        {/*
        SVG ICON:Refresh Ccw Alt 2
        COLLECTION: Dazzle Line Icons
        LICENSE: CC Attribution License
        URL: https://www.svgrepo.com/svg/533697/refresh-ccw-alt-2
        AUTHOR: Dazzle UI*/}
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2L11 3.99545L11.0592 4.05474M11 18.0001L13 19.9108L12.9703 19.9417M11.0592 4.05474L13 6M11.0592 4.05474C11.3677 4.01859 11.6817 4 12 4C16.4183 4 20 7.58172 20 12C20 14.5264 18.8289 16.7793 17 18.2454M7 5.75463C5.17107 7.22075 4 9.47362 4 12C4 16.4183 7.58172 20 12 20C12.3284 20 12.6523 19.9802 12.9703 19.9417M11 22.0001L12.9703 19.9417"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
        onLoad={setMap}
        onClick={handleMapClick}
      >
        {nodes.map((node, index) => (
          <MarkerComponent
            key={node.id}
            node={node}
            isActive={node.id === activeNodeId}
            onClick={() => setActiveNodeId(node.id)}
            isStartOrEndPoint={index === 0 || index === nodes.length - 1}
          />
        ))}
        {/* Render a polyline between each pair of nodes */}
        {createPathSegments().map((pathSegment, index) => (
          <Polyline
            key={index}
            path={pathSegment}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.5,
              strokeWeight: 3,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1,
              icons: [
                {
                  icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                  offset: "50%", // Arrow in the middle of the line
                },
              ],
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;