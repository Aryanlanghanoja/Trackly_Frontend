
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const customers = [
  {
    id: 1,
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    avatar: '/placeholder.svg',
    status: 'active',
    orderCount: 28,
    totalSpent: '$4,289.00',
    lastOrder: '2 days ago'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    email: 'marcus.c@example.com',
    avatar: '/placeholder.svg',
    status: 'active',
    orderCount: 42,
    totalSpent: '$6,790.00',
    lastOrder: '1 day ago'
  },
  {
    id: 3,
    name: 'Sophia Williams',
    email: 'sophia.w@example.com',
    avatar: '/placeholder.svg',
    status: 'inactive',
    orderCount: 15,
    totalSpent: '$2,345.00',
    lastOrder: '2 weeks ago'
  },
  {
    id: 4,
    name: 'David Rodriguez',
    email: 'david.r@example.com',
    avatar: '/placeholder.svg',
    status: 'active',
    orderCount: 32,
    totalSpent: '$5,670.00',
    lastOrder: '5 days ago'
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    email: 'olivia.m@example.com',
    avatar: '/placeholder.svg',
    status: 'active',
    orderCount: 23,
    totalSpent: '$3,890.00',
    lastOrder: '3 days ago'
  }
];

const getStatusColor = (status) => {
  return status === 'active' 
    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
    : 'bg-gray-100 text-gray-800 hover:bg-gray-200';
};

export function ProductCustomers() {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold">Product Customers</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>{customer.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(customer.status)}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{customer.orderCount}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
