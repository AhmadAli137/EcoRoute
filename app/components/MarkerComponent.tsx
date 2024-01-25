"use client";
import React, { useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";

// Interface for MapNode
interface MapNode {
  id: number;
  latLng: { lat: number; lng: number };
  type: string; // "Trash", "Local Sorting Facility", "Regional Sorting Facility", "Regional Recycling Facility"
  amount: number;
  risk: number;
}

// Props interface for MarkerComponent
interface MarkerComponentProps {
  node: MapNode;
  isActive: boolean;
  onClick: () => void;
  isStartOrEndPoint: boolean; // Add this prop to indicate start or end point
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({
  node,
  isActive,
  onClick,
  isStartOrEndPoint,
}) => {
  // Function to determine the icon URL based on the node type
  const getIconUrl = () => {
    switch (node.type) {
      case "Waste":
        <a
          href="https://www.flaticon.com/free-icons/trash-bag"
          title="trash bag icons"
        >
          Trash bag icons created by Freepik - Flaticon
        </a>;
        return "/assets/trash-bin.png";
      case "Local Sorting Facility":
        <a
          href="https://www.flaticon.com/free-icons/garbage"
          title="garbage icons"
        >
          Garbage icons created by Freepik - Flaticon
        </a>;
        return "/assets/local-sorting.png";
      case "Regional Sorting Facility":
        <a href="https://www.flaticon.com/free-icons/waste" title="waste icons">
          Waste icons created by Witdhawaty - Flaticon
        </a>;
        return "/assets/regional-sorting.png";
      case "Regional Recycling Facility":
        <a
          href="https://www.flaticon.com/free-icons/recycling-center"
          title="recycling center icons"
        >
          Recycling center icons created by Uniconlabs - Flaticon
        </a>;
        return "/assets/recycling-plant.png";
      default:
        <a
          href="https://www.flaticon.com/free-icons/pointer"
          title="pointer icons"
        >
          Pointer icons created by Alfredo Hernandez - Flaticon
        </a>;
        return "/assets/pointer.png"; // Default icon
    }
  };

  return (
    <div>
      <MarkerF
        label={
          isStartOrEndPoint
            ? {
                text: node.id === 1 ? "Start" : "End",
                color: "blue",
                fontSize: "18px",
                fontWeight: "bold",
              }
            : undefined
        }
        position={node.latLng}
        onClick={onClick}
        icon={{
          url: getIconUrl(),
          scaledSize: new window.google.maps.Size(40, 40),
          labelOrigin: new google.maps.Point(20, 50),
        }}
      />

      {isActive && (
        <InfoWindowF position={node.latLng} onCloseClick={onClick}>
          <div className="flex-col p-1">
            <h3 className="text-base font-bold mb-2">{node.type}</h3>
            <ul>
              <li>id: {node.id}</li>
              <li>latLng: {`${node.latLng.lat}, ${node.latLng.lng}`}</li>
              <li>amount: {node.amount}</li>
              <li>drop risk %: {node.risk}</li>
            </ul>
          </div>
        </InfoWindowF>
      )}
    </div>
  );
};

export default MarkerComponent;
