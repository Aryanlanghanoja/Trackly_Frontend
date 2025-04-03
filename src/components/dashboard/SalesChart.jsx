
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';

// Sample data for the chart
const monthlyData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4000 },
  { name: 'Sep', value: 4500 },
  { name: 'Oct', value: 5200 },
  { name: 'Nov', value: 6000 },
  { name: 'Dec', value: 7000 },
];

const weeklyData = [
  { name: 'Mon', value: 900 },
  { name: 'Tue', value: 1200 },
  { name: 'Wed', value: 1500 },
  { name: 'Thu', value: 1000 },
  { name: 'Fri', value: 1800 },
  { name: 'Sat', value: 2400 },
  { name: 'Sun', value: 1700 },
];

export function SalesChart() {
  const [timeRange, setTimeRange] = useState('month');
  
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>
            {timeRange === 'month' ? 'Monthly sales performance' : 'Weekly sales performance'}
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={timeRange === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={timeRange === 'month' ? monthlyData : weeklyData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value) => [`$${value}`, 'Sales']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
