"use client";
import { TextField } from "@radix-ui/themes";
import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import Map from "../components/Map";
import { hardcodedNodes } from "../map/nodes";

const SearchPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-4">
        <div className="max-w-6xl mx-auto bg-white ">
          <TextField.Root radius="full" className="p-3 mb-5">
            <TextField.Slot>
              <IoSearchSharp />
            </TextField.Slot>
            <TextField.Input placeholder="Search a location…" />
          </TextField.Root>
          <Map nodes={hardcodedNodes} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
