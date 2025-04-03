
import { UserPlus, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockLeads = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    source: 'Website',
    status: 'new',
    date: '2023-07-15'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@company.co',
    phone: '+1 (555) 987-6543',
    source: 'Referral',
    status: 'contacted',
    date: '2023-07-14'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.b@enterprise.org',
    phone: '+1 (555) 456-7890',
    source: 'LinkedIn',
    status: 'qualified',
    date: '2023-07-12'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@corp.net',
    phone: '+1 (555) 789-0123',
    source: 'Trade Show',
    status: 'proposal',
    date: '2023-07-10'
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'd.wilson@business.com',
    phone: '+1 (555) 234-5678',
    source: 'Cold Call',
    status: 'negotiation',
    date: '2023-07-08'
  },
  {
    id: 6,
    name: 'Jennifer Lopez',
    email: 'jennifer@examplecorp.com',
    phone: '+1 (555) 876-5432',
    source: 'Website',
    status: 'new',
    date: '2023-07-07'
  },
  {
    id: 7,
    name: 'Robert Taylor',
    email: 'robert.t@industryltd.co',
    phone: '+1 (555) 345-6789',
    source: 'Email Campaign',
    status: 'contacted',
    date: '2023-07-05'
  },
  {
    id: 8,
    name: 'Amanda Miller',
    email: 'a.miller@techfirm.io',
    phone: '+1 (555) 654-3210',
    source: 'Conference',
    status: 'qualified',
    date: '2023-07-03'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'new':
      return 'bg-blue-500 text-white';
    case 'contacted':
      return 'bg-yellow-500 text-white';
    case 'qualified':
      return 'bg-green-500 text-white';
    case 'proposal':
      return 'bg-purple-500 text-white';
    case 'negotiation':
      return 'bg-orange-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const RecentLeads = ({ fullPage = false }) => {
  const displayLeads = fullPage ? mockLeads : mockLeads.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Recent Leads</CardTitle>
          {/* <CardDescription>
            {fullPage ? 'Manage all your leads' : 'Recently added leads and their current status'}
          </CardDescription> */}
        </div>
        {!fullPage && (
          <Button variant="outline" size="sm" asChild>
            <a href="/leads">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Contact</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Source</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-2 font-medium text-muted-foreground sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayLeads.map((lead) => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-2">
                    <div className="font-medium">{lead.name}</div>
                    {fullPage && <div className="text-sm text-muted-foreground">{lead.email}</div>}
                  </td>
                  <td className="p-2">
                    {fullPage 
                      ? lead.phone 
                      : <div className="text-sm">{lead.email}</div>
                    }
                  </td>
                  <td className="p-2">{lead.source}</td>
                  <td className="p-2">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-2 text-sm">{lead.date}</td>
                  <td className="p-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {fullPage && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
