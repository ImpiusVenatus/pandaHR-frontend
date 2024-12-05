"use client"
import React, { useState } from 'react';
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

  const [hovered, setHovered] = useState<number | null>(null); // Track hover state
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
        <Image 
          src="/logos/logo-black.png"
          alt='Logo'
          width={150}
          height={150}
        />
      </div>
      <div className="flex flex-col">
        {items.map((item) => {
          const isActive = pathname === item.route;

          return (
            <Link
              key={item.id}
              href={item.route}
              className={`flex items-center gap-2 p-3 font-lexend font-light text-black mb-4 rounded-md transition-all ${
                isActive 
                  ? 'bg-[#7152F308] !text-[#7152F3] !font-semibold border-l-4 border-[#7152F3]'
                  : 'hover:bg-white hover:text-[#7152F3]'
              }`}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {React.cloneElement(item.icon, {
                strokeColor: isActive || hovered === item.id ? '#7152F3' : '#000',
                className: 'transition-all'
              })}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
