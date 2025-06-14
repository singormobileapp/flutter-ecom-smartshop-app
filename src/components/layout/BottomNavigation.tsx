
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { getTotalItems } = useCart();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: getTotalItems() },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 h-12 px-2 ${
              activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className="relative">
              <tab.icon className="h-5 w-5" />
              {tab.badge && tab.badge > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {tab.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs">{tab.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
