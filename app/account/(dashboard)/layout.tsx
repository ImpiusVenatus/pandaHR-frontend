import Navbar from '@/components/dashboard/Navbar';
import TopBar from '@/components/dashboard/TopBar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#16151C]">
      {/* Sidebar */}
      <Navbar />
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />
        {/* Content */}
        <div className="p-6 flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
