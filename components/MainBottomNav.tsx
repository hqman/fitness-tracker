
import React from 'react';
import { Home, ClipboardList, BarChart3, UserCircle, type LucideIcon } from 'lucide-react'; // Changed Compass to BarChart3

type TabName = 'Home' | 'Record' | 'Stats' | 'My'; // Changed 'Discover' to 'Stats'

interface TabItem {
  name: TabName;
  icon: LucideIcon;
}

interface MainBottomNavProps {
  activeTab: TabName;
  onTabChange: (tabName: TabName) => void;
}

const tabItems: TabItem[] = [
  { name: 'Home', icon: Home },
  { name: 'Record', icon: ClipboardList },
  { name: 'Stats', icon: BarChart3 }, // Changed 'Discover' to 'Stats', Compass to BarChart3
  { name: 'My', icon: UserCircle },
];

const MainBottomNav: React.FC<MainBottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-zinc-800/80 backdrop-blur-md border-t border-zinc-700 grid grid-cols-4 fixed bottom-0 left-0 right-0 w-[375px] mx-auto h-16 rounded-b-lg z-20">
      {tabItems.map((item) => {
        const isActive = item.name === activeTab;
        return (
          <button
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={`flex flex-col items-center justify-center p-2 transition-colors duration-150 ease-in-out group ${isActive ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'}`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.name}
          >
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-xs mt-0.5 ${isActive ? 'font-semibold' : 'font-normal'}`}>{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MainBottomNav;