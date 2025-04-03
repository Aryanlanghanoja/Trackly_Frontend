
import logo from '@/assets/Logo.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  Calendar, 
  MessageSquare, 
  UserPlus, 
  Layers, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const SidebarLink = ({ icon: Icon, label, to, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-300 hover:bg-sidebar-accent hover:text-white",
        isActive ? "bg-sidebar-accent text-white shadow-lg" : "text-gray-300",
        "group"
      )}
    >
      <Icon size={22} className="transition-transform group-hover:scale-110" />
      {!isCollapsed && (
        <span className="text-md font-medium transition-opacity duration-200">
          {label}
        </span>
      )}
      {isCollapsed && (
        <span className="absolute left-full ml-2 rounded bg-sidebar-accent px-3 py-1 text-xs text-white invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all">
          {label}
        </span>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "bg-gradient-to-b from-sidebar to-sidebar/90 h-screen flex flex-col transition-all duration-500 border-r border-sidebar-border shadow-lg",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center p-4 h-20 border-b border-sidebar-border/50">
        {!collapsed ? (
          <div className="w-full flex justify-center">
            <img 
              src={logo} 
              alt="Griwa International" 
              className="h-12 max-w-full object-contain transition-transform hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center text-white font-bold shadow-lg">
              O
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-500">
        <div className="space-y-1">
          <SidebarLink icon={BarChart3} label="Dashboard" to="/dashboard" isCollapsed={collapsed} />
          <SidebarLink icon={Layers} label="Products" to="/products" isCollapsed={collapsed} />
          <SidebarLink icon={UserPlus} label="Leads" to="/leads" isCollapsed={collapsed} />
          <SidebarLink icon={Users} label="Customers" to="/customers" isCollapsed={collapsed} />
          <SidebarLink icon={MessageSquare} label="Messages" to="/messages" isCollapsed={collapsed} />
          <SidebarLink icon={Calendar} label="Calendar" to="/calendar" isCollapsed={collapsed} />
        </div>

        {/* Settings and Help */}
        <div className="pt-6 mt-6 border-t border-sidebar-border/50 space-y-1">
          <SidebarLink icon={Settings} label="Settings" to="/settings" isCollapsed={collapsed} />
          <SidebarLink icon={HelpCircle} label="Help" to="/help" isCollapsed={collapsed} />
        </div>
      </nav>
      
      {/* Collapse/Expand Button */}
      <Button 
        onClick={() => setCollapsed(!collapsed)} 
        size="sm" 
        variant="ghost" 
        className="absolute -right-4 top-24 rounded-full bg-white shadow-lg h-8 w-8 p-0 flex items-center justify-center border border-gray-300 transition-transform transform hover:scale-110"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </Button>
    </div>
  );
};

export default Sidebar;
