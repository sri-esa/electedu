import { useState } from 'react';
import { 
  MessageSquare, 
  GitBranch, 
  BookOpen, 
  CheckSquare, 
  Info, 
  Vote, 
  Globe 
} from 'lucide-react';
import { useSettingsStore } from '../../store/settings.store';
import { Header } from './Header';
import { PlainLanguageToggle } from '../common/PlainLanguageToggle';
import type { AppState, Country } from '../../types';

interface AppShellProps {
  children: React.ReactNode;
}

const COUNTRIES = [
  { code: 'india', label: 'India', flag: '🇮🇳' },
  { code: 'usa', label: 'USA', flag: '🇺🇸' },
  { code: 'uk', label: 'UK', flag: '🇬🇧' },
  { code: 'eu', label: 'EU', flag: '🇪🇺' },
] as const;

export function AppShell({ children }: AppShellProps) {
  const { appState, setAppState, country, setCountry } = useSettingsStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems: Array<{ state: AppState; label: string; icon: React.ReactNode }> = [
    { state: 'FREE_QUESTION', label: 'Home', icon: <MessageSquare className="w-5 h-5" /> },
    { state: 'TIMELINE_EXPLORATION', label: 'Timeline', icon: <GitBranch className="w-5 h-5" /> },
    { state: 'GUIDED_FLOW', label: 'Learn', icon: <BookOpen className="w-5 h-5" /> },
    { state: 'QUIZ_IN_PROGRESS', label: 'Quiz', icon: <CheckSquare className="w-5 h-5" /> },
    { state: 'ONBOARDING', label: 'About', icon: <Info className="w-5 h-5" /> }, // Fallback state for About
  ];

  const handleNavClick = (state: AppState) => {
    setAppState(state);
    setIsDrawerOpen(false);
  };

  const handleCountryChange = () => {
    const currentIndex = COUNTRIES.findIndex(c => c.code === country);
    const nextIndex = (currentIndex + 1) % COUNTRIES.length;
    setCountry(COUNTRIES[nextIndex].code as Country);
  };

  const activeCountry = COUNTRIES.find(c => c.code === country) || COUNTRIES[0];

  return (
    <div className="flex h-screen bg-civic-navy text-white overflow-hidden font-sans">
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-civic-accent focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-civic-card border-r border-civic-border">
        {/* Top Section */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-saffron rounded-lg">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">ElectEdu</h1>
          </div>
          <p className="text-sm text-gray-400">Understand your vote</p>
        </div>

        {/* Navigation Middle */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            // Treat QUIZ_COMPLETE as QUIZ_IN_PROGRESS for nav highlighting
            const isActive = appState === item.state || 
                             (item.state === 'QUIZ_IN_PROGRESS' && appState === 'QUIZ_COMPLETE');
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.state)}
                className={`w-full flex items-center space-x-3 px-4 py-3 min-h-[44px] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent focus:ring-offset-2 focus:ring-offset-civic-card ${
                  isActive 
                    ? 'bg-civic-accent text-white border-l-4 border-l-saffron font-medium' 
                    : 'text-gray-300 hover:bg-civic-elevated hover:text-white border-l-4 border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
                role="menuitem"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Country Selector */}
        <div className="px-6 py-4 border-t border-civic-border">
          <button
            onClick={handleCountryChange}
            className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] bg-civic-elevated hover:bg-civic-border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent"
            aria-label={`Switch country. Current: ${activeCountry.label}`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{activeCountry.flag}</span>
              <span className="font-medium text-sm">{activeCountry.label}</span>
            </div>
          </button>
        </div>

        {/* Settings Row Bottom */}
        <div className="px-6 py-4 border-t border-civic-border space-y-4">
          <PlainLanguageToggle />
          <button className="flex items-center space-x-3 text-sm text-gray-400 hover:text-white transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-civic-accent rounded-lg p-2 -ml-2">
            <Globe className="w-5 h-5" />
            <span>Language: English</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onOpenDrawer={() => setIsDrawerOpen(true)} 
          countryLabel={activeCountry.label}
          countryFlag={activeCountry.flag}
          onCountryChange={handleCountryChange}
        />
        
        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="absolute top-0 right-0 bottom-0 w-[260px] bg-civic-card shadow-xl p-6 flex flex-col animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-lg">Menu</span>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-civic-accent"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <PlainLanguageToggle />
            </div>
          </div>
        )}

        {children}

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden flex bg-civic-card border-t border-civic-border shrink-0">
          {navItems.map((item) => {
            const isActive = appState === item.state || 
                             (item.state === 'QUIZ_IN_PROGRESS' && appState === 'QUIZ_COMPLETE');
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.state)}
                className={`flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] focus:outline-none focus:ring-2 focus:ring-civic-accent inset-0 ${
                  isActive ? 'text-saffron' : 'text-gray-400 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon}
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  );
}
