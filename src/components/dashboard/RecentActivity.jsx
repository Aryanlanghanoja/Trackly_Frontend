
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, AlertCircle, Clock, ShoppingCart, UserPlus, DollarSign } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: { name: "Alex Johnson", avatar: "/placeholder.svg", initials: "AJ" },
    action: "placed a new order",
    target: "#ORD-74513",
    time: "2 hours ago",
    icon: ShoppingCart,
    iconColor: "text-blue-500 bg-blue-100"
  },
  {
    id: 2,
    user: { name: "Sara Wilson", avatar: "/placeholder.svg", initials: "SW" },
    action: "registered a new account",
    time: "4 hours ago",
    icon: UserPlus,
    iconColor: "text-green-500 bg-green-100"
  },
  {
    id: 3,
    user: { name: "Thomas Moore", avatar: "/placeholder.svg", initials: "TM" },
    action: "completed payment",
    target: "$2,340.00",
    time: "6 hours ago",
    icon: DollarSign,
    iconColor: "text-purple-500 bg-purple-100"
  },
  {
    id: 4,
    user: { name: "Robert Chen", avatar: "/placeholder.svg", initials: "RC" },
    action: "cancelled order",
    target: "#ORD-74509",
    time: "1 day ago",
    icon: AlertCircle,
    iconColor: "text-red-500 bg-red-100"
  },
  // {
  //   id: 5,
  //   user: { name: "Emily Davis", avatar: "/placeholder.svg", initials: "ED" },
  //   action: "shipped order",
  //   target: "#ORD-74492",
  //   time: "1 day ago",
  //   icon: CheckCircle2,
  //   iconColor: "text-green-500 bg-green-100"
  // }
];

export function RecentActivity() {
  return (
    <div className="data-card">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="p-4 flex items-start space-x-4">
              <div className={`p-2 rounded-full ${activity.iconColor} shrink-0`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-muted-foreground"> {activity.action}</span>
                    {activity.target && <span className="font-medium"> {activity.target}</span>}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-3 w-3" /> {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
