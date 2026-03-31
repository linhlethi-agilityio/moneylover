import { type ReactNode } from 'react';

// Layouts
import { Header, Sidebar } from '@/layouts';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  </div>
);

export default DashboardLayout;
