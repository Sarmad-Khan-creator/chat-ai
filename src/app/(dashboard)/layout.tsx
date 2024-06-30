import Infobar from '@/components/infobar/infobar';
import Sidebar from '@/components/sidebar/sidebar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col gap-10 w-full">
        <Infobar />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
