
import { Helmet } from 'react-helmet';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentLeads } from '@/components/dashboard/RecentLeads';
import { BarChart3, Users, ShieldCheck, Percent, ShoppingCart, DollarSign } from 'lucide-react';
import { RecentOrders } from '@/components/dashboard/RecentOrders';

const Dashboard = () => {
  return (
    <>
      <div>
        {/* Page Title */}
        <Helmet>
          <title>Dashboard | Griwa International</title>
        </Helmet>

        {/* Main Container */}
        <div className="p-6 space-y-8">
          
          {/* Header Section */}
          <div className="dashboard-header">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500">Welcome back to your dashboard.</p>
          </div>

          {/* Stat Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Revenue" 
              value="$45,231.89" 
              icon={BarChart3}
              change={20.1} 
              trend="up" 
              className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            />
            <StatCard 
              title="New Leads" 
              value="1,234"
              icon={Users} 
              change={12.3} 
              trend="up" 
              className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            />
            <StatCard 
              title="Active Customers" 
              value="573"
              icon={ShieldCheck} 
              change={7.5} 
              trend="up" 
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            />
            <StatCard 
              title="Conversion Rate" 
              value="4.35%"
              icon={Percent} 
              change={-3.2} 
              trend="down" 
              className="bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            />
          </div>

          {/* Leads and Customers Section */}
          <div className="grid grid-cols-1 p-2 gap-6">
            <RecentLeads />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <RecentOrders />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
