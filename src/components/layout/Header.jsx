
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
// Import the logo from assets
import logo from '@/assets/Logo.png';

const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-white flex items-center justify-between px-6 shadow-sm relative z-10">
      <div className="flex items-center w-1/3">
      <Link to="/">
        <div className="flex items-center mr-4">
          <img
            src={logo}
            alt="Griwa International"
            className="h-10 w-auto max-w-[180px] object-contain transition-all duration-300 hover:scale-105"
          />
        </div>
      </Link>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-8 bg-muted/50 border-none w-full rounded-lg transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-accent/10 transition-all duration-300">
          <Bell className="h-5 w-5 text-gray-600 transition-transform duration-300 hover:scale-110" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">3</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:shadow-md transition-transform hover:scale-105">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/Admin.jpg" alt="User" />
                <AvatarFallback className="bg-gray-300 text-gray-600 font-bold">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-lg font-semibold text-gray-700 px-4 py-2">
              My Account
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild className="transition-all duration-300 hover:bg-accent/10 hover:text-accent rounded-lg">
              <Link to="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="transition-all duration-300 hover:bg-accent/10 hover:text-accent rounded-lg">
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem className="transition-all duration-300 hover:bg-accent/10 hover:text-accent rounded-lg">
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="transition-all duration-300 hover:bg-red-500 hover:text-white rounded-lg">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
