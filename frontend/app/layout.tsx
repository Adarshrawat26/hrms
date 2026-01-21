'use client';

import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !isLoggedIn && typeof window !== 'undefined' && window.location.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
