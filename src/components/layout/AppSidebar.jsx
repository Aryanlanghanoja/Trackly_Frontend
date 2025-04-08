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
  LogOut
} from 'lucide-react';

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Leads", url: "/leads", icon: UserPlus },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Calendar", url: "/calendar", icon: Calendar },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Log out", url: "/help", icon: LogOut },
];

// ... imports remain the same ...

const AppSidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-[#003B7A] text-gray-200 shadow-lg w-64 flex flex-col h-screen">
      {/* Header */}
      <div className="py-8 px-6 border-b border-[#002d5d] text-center">
        <span className="relative text-2xl font-extrabold uppercase bg-orange-500 bg-clip-text text-transparent tracking-wider">
          Griwa International
        </span>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 py-6 overflow-y-auto">
        {/* Main Menu */}
        <div className="px-6 mb-4 text-gray-300 uppercase tracking-wide text-xs font-semibold">Main Menu</div>
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                location.pathname === item.url
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'hover:bg-[#004c99] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Support Section */}
        <div className="px-6 mt-8 mb-4 text-gray-300 uppercase tracking-wide text-xs font-semibold">Support</div>
        <nav className="space-y-1 px-3">
          {settingsItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                location.pathname === item.url
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'hover:bg-[#004c99] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="bg-[#003366] py-4 px-6 border-t border-[#002d5d] text-center text-xs text-gray-300 font-bold mt-auto">
        Griwa International © {new Date().getFullYear()}
      </div>
    </div>
  );
};

// ... export remains the same ...

export default AppSidebar;