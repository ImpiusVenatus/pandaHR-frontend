"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIcon from '../icons/DashboardIcon';
import EmployeesIcon from '../icons/EmployeesIcon';
import DepartmentsIcon from '../icons/DepartmentsIcon';
import AttendanceIcon from '../icons/AttendanceIcon';
import PayrollIcon from '../icons/PayrollIcon';
import JobsIcon from '../icons/JobsIcon';
import CandidatesIcon from '../icons/Candidates';
import LeavesIcon from '../icons/LeavesIcon';
import HolidaysIcon from '../icons/HolidaysIcon';
import SettingsIcon from '../icons/SettingsIcon';

const NavBar = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
      document.documentElement.classList.toggle('dark', savedMode === 'dark');
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const handleToggle = (mode: string) => {
    setIsDarkMode(mode === 'dark');
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  };

  const [hovered, setHovered] = useState<number | null>(null);
  const items = [
    { id: 1, icon: <DashboardIcon />, route: '/account/dashboard', label: 'Dashboard' },
    { id: 2, icon: <EmployeesIcon />, route: '/account/employees', label: 'All Employees' },
    { id: 3, icon: <DepartmentsIcon />, route: '/account/departments', label: 'All Departments' },
    { id: 4, icon: <AttendanceIcon />, route: '/account/attendance', label: 'Attendance' },
    { id: 5, icon: <PayrollIcon />, route: '/account/payroll', label: 'Payroll' },
    { id: 6, icon: <JobsIcon />, route: '/account/jobs', label: 'Jobs' },
    { id: 7, icon: <CandidatesIcon />, route: '/account/candidates', label: 'Candidates' },
    { id: 8, icon: <LeavesIcon />, route: '/account/leaves', label: 'Leaves' },
    { id: 9, icon: <HolidaysIcon />, route: '/account/holidays', label: 'Holidays' },
    { id: 10, icon: <SettingsIcon />, route: '/account/settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-[#A2A1A808] w-64 p-4 min-h-screen">
      <div className="flex items-center justify-center mb-8">
        {isDarkMode ? <Image
          src="/logos/logo-white.png"
          alt='Logo'
          width={150}
          height={150}
        />:
        <Image
          src="/logos/logo-black.png"
          alt='Logo'
          width={150}
          height={150}
        />
}
      </div>
      <div className="flex flex-col">
        {items.map((item) => {
          const isActive = pathname === item.route;

          return (
            <Link
              key={item.id}
              href={item.route}
              className={`flex items-center gap-2 p-3 font-lexend font-light text-black dark:text-white mb-4 rounded-md transition-all ${
                isActive 
                  ? 'bg-[#7152F308] !text-[#7152F3] !font-semibold border-l-4 border-[#7152F3]'
                  : 'hover:text-[#7152F3] dark:hover:text-[#7152F3]'
              }`}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {React.cloneElement(item.icon, {
                strokeColor: isActive || hovered === item.id ? '#7152F3' : isDarkMode ? '#fff' : "#000",
                className: 'transition-all'
              })}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Mode Switch Container */}
      <div className="flex justify-center items-center p-4">
        <div className="relative flex items-center w-64 h-10 bg-[#A2A1A808] rounded-md">
          {/* Active Background (Slider) */}
          <div
            className={`absolute w-[50%] h-full rounded-md transition-all duration-300 ease-in-out ${
              isDarkMode ? 'translate-x-[6rem] bg-[#7152F3]' : 'bg-[#7152F3]'
            }`}
          ></div>

          {/* Light Button */}
          <button
            onClick={() => handleToggle('light')}
            className={`w-1/2 z-10 flex gap-2 justify-center items-center h-full bg-transparent rounded-md text-white text-sm transition-all duration-300 ease-in-out ${
              !isDarkMode ? 'bg-[#7152F3]' : 'bg-transparent'
            }`}
          >
            <Image
              src="/dashboard/IconSun.svg"
              alt='Sun Icon'
              width={20}
              height={20}
              className="invert"
            />
            Light
          </button>

          {/* Dark Button */}
          <button
            onClick={() => handleToggle('dark')}
            className={`w-1/2 z-10 flex gap-2 justify-center items-center h-full bg-transparent rounded-md text-black dark:text-white text-sm transition-all duration-300 ease-in-out ${
              isDarkMode ? 'bg-[#7152F3]' : 'bg-transparent'
            }`}
          >
            <Image
              src="/dashboard/IconMoon.svg"
              alt='Moon Icon'
              width={20}
              height={20}
              className={`${
                isDarkMode ? 'invert' : 'bg-transparent'
              }`}
            />
            Dark
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
