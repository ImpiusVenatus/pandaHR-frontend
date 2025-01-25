"use client";
import React from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FiChevronDown, FiBell, FiSearch } from "react-icons/fi";
import { useGetUserData } from "@/lib/hooks/user/useGetUserData";

const TopBar = () => {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { userData, loading } = useGetUserData(userId);

  return (
    <header className="p-4">
      <div className="flex justify-between items-center font-dmSans">
        {/* Left Side */}
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <h1 className="text-xl font-semibold flex items-center">
              Hello {userData?.fullName} 👋
            </h1>
          )}
          <p className="text-sm text-gray-400">Good morning</p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Input
              className="w-32 lg:w-64 border border-gray-300 rounded-md pl-10 pr-4 py-2"
              placeholder="Search..."
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#16151C] dark:text-white" />
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <FiBell className="h-5 w-5 text-[#16151C] dark:text-white cursor-pointer" />
          </div>

          {/* Profile Avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="rounded-md">
                  <AvatarImage
                    src="/dashboard/avatar.png"
                    alt="Profile"
                    className="!rounded-md"
                  />
                  <AvatarFallback>Sadman</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <h2 className="py-0 my-0">{userData?.fullName}</h2>
                  <span className="font-semibold text-[10px] text-gray-400">
                    {userData?.role}
                  </span>
                </div>
                <FiChevronDown className="h-5 w-5 text-gray-600" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#16151C] text-white">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
