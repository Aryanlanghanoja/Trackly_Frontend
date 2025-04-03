
import { Helmet } from 'react-helmet';
import { RecentLeads } from '@/components/dashboard/RecentLeads';
import { ProductCustomers } from '@/components/dashboard/ProductCustomers'; 

const Customers = () => {
  return (
    <>
      <Helmet>
        <title>Customers | Griwa International</title>
      </Helmet>
      <div className="p-6 space-y-8">
        <div className="dashboard-header flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-gray-500">Manage and track all your customers.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 w-full">
          {/* <RecentLeads fullPage /> */}
          <ProductCustomers />
        </div>
      </div>
    </>
  );
};

export default Customers;