"use client";
import React from "react";
import { TextField } from "@radix-ui/themes";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
  return (
    <TextField.Root radius="full" className="p-3 mb-5 border border-green-600 rounded-full">
      <TextField.Slot >
        <IoSearchSharp />
      </TextField.Slot>
      <TextField.Input placeholder="Search a location…" />
    </TextField.Root>
  );
};

export default SearchBar;
