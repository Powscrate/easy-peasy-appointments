
import React from 'react';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("w-full py-6 px-4 sm:px-8 flex justify-between items-center", className)}>
      <div className="flex items-center space-x-2">
        <CalendarDays className="h-8 w-8 text-primary animate-pulse" />
        <h1 className="text-2xl font-medium">RéserveSimple</h1>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          À propos
        </a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Services
        </a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Aide
        </a>
      </div>
    </header>
  );
}

export default Header;
