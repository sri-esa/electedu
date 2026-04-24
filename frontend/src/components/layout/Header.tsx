import { Menu } from 'lucide-react';

interface HeaderProps {
  onOpenDrawer: () => void;
  countryLabel: string;
  countryFlag: string;
  onCountryChange: () => void;
}

export function Header({ onOpenDrawer, countryLabel, countryFlag, onCountryChange }: HeaderProps) {
  return (
    <header className="md:hidden flex items-center justify-between h-16 px-4 bg-civic-card border-b border-civic-border shrink-0">
      <button
        onClick={onCountryChange}
        className="flex items-center space-x-2 min-h-[44px] px-2 rounded-lg hover:bg-civic-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent"
        aria-label={`Switch country. Current: ${countryLabel}`}
      >
        <span className="text-xl" aria-hidden="true">{countryFlag}</span>
      </button>

      <h1 className="text-lg font-bold text-white">ElectEdu</h1>

      <button
        onClick={onOpenDrawer}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-civic-elevated text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}
