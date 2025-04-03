
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import AppSidebar from './AppSidebar';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-background via-muted/10 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
