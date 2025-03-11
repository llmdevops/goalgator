
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  CalendarDays, 
  CheckSquare, 
  Target, 
  BarChart, 
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TimeMaster</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" label="Dashboard" />
          <NavLink to="/goals" label="Goals" icon={<Target className="h-4 w-4" />} />
          <NavLink to="/tasks" label="Tasks" icon={<CheckSquare className="h-4 w-4" />} />
          <NavLink to="/schedule" label="Schedule" icon={<CalendarDays className="h-4 w-4" />} />
          <NavLink to="/analytics" label="Analytics" icon={<BarChart className="h-4 w-4" />} />
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t py-4">
          <div className="container flex flex-col gap-4">
            <MobileNavLink to="/" label="Dashboard" onClick={toggleMobileMenu} />
            <MobileNavLink to="/goals" label="Goals" onClick={toggleMobileMenu} />
            <MobileNavLink to="/tasks" label="Tasks" onClick={toggleMobileMenu} />
            <MobileNavLink to="/schedule" label="Schedule" onClick={toggleMobileMenu} />
            <MobileNavLink to="/analytics" label="Analytics" onClick={toggleMobileMenu} />
            
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

function NavLink({ to, label, icon, className }: NavLinkProps) {
  return (
    <Link 
      to={to} 
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
        className
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileNavLink({ to, label, onClick }: MobileNavLinkProps) {
  return (
    <Link 
      to={to} 
      className="flex items-center py-2 text-base font-medium transition-colors hover:text-primary"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
