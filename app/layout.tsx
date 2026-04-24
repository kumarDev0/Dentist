import type { Metadata } from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TOOTHBOOTH  Dental Clinic | Koregaon Park, Pune',
  description: 'Premium dental care designed around you. From subtle enhancements to complete smile transformations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
