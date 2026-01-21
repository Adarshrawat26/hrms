'use client';

import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const adminMenuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Employees', href: '/employees', icon: '👥' },
    { label: 'Attendance', href: '/attendance', icon: '⏱️' },
    { label: 'Reports', href: '/reports', icon: '📈' },
  ];

  const managerMenuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Team Attendance', href: '/attendance', icon: '⏱️' },
    { label: 'Reports', href: '/reports', icon: '📈' },
  ];

  const employeeMenuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'My Attendance', href: '/my-attendance', icon: '⏱️' },
  ];

  let menuItems = [];
  if (user?.role === 'ADMIN') {
    menuItems = adminMenuItems;
  } else if (user?.role === 'MANAGER') {
    menuItems = managerMenuItems;
  } else {
    menuItems = employeeMenuItems;
  }

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } bg-gray-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
    >
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">HRMS</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-400">HRMS v1.0</p>
      </div>
    </aside>
  );
}
