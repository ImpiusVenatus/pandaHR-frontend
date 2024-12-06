"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Settings = () => {
  const [appearance, setAppearance] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [mobileNotifications, setMobileNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <div className="container mx-auto p-4 border border-[#A2A1A816] rounded-md font-dmSans">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      {/* Appearance Setting */}
      <div className="mb-4 border-b border-[#A2A1A816] pb-4 flex justify-between">
        <div>
          <h3 className="font-semibold">Appearance</h3>
          <p className="text-sm text-gray-600">Customize how your theme looks on your device</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-[#7152F3] text-white">{appearance} <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setAppearance("Light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAppearance("Dark")}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Language Setting */}
      <div className="mb-4 border-b border-[#A2A1A816] pb-4 flex justify-between">
        <div>
          <h3 className="font-semibold">Language</h3>
          <p className="text-sm text-gray-600">Select your language</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-[#7152F3] text-white">{language} <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage("English")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("Spanish")}>Spanish</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("French")}>French</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("German")}>German</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Two-Factor Authentication Setting */}
      <div className="mb-4 border-b border-[#A2A1A816] pb-4 flex justify-between">
        <div>
          <h3 className="font-semibold">Two-factor Authentication</h3>
          <p className="text-sm text-gray-600">Keep your account secure by enabling 2FA via mail</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Switch className="data-[state=checked]:bg-[#7152F3]" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
        </div>
      </div>

      {/* Mobile Push Notifications */}
      <div className="mb-4 border-b border-[#A2A1A816] pb-4 flex justify-between">
        <div>
          <h3 className="font-semibold">Mobile Push Notifications</h3>
          <p className="text-sm text-gray-600">Receive push notifications</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Switch className="data-[state=checked]:bg-[#7152F3]" checked={mobileNotifications} onCheckedChange={setMobileNotifications} />
        </div>
      </div>

      {/* Desktop Notifications */}
      <div className="mb-4 border-b border-[#A2A1A816] pb-4 flex justify-between">
        <div>
          <h3 className="font-semibold">Desktop Notifications</h3>
          <p className="text-sm text-gray-600">Receive push notifications in desktop</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Switch className="data-[state=checked]:bg-[#7152F3]" checked={desktopNotifications} onCheckedChange={setDesktopNotifications} />
        </div>
      </div>

      {/* Email Notifications */}
      <div className="mb-4 flex justify-between">
        <div>
          <h3 className="font-semibold">Email Notifications</h3>
          <p className="text-sm text-gray-600">Receive email notifications</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Switch className="data-[state=checked]:bg-[#7152F3]" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
