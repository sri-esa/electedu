import { useSettingsStore } from '../store/settings.store';
import type { Country } from '../types';

const COUNTRIES = [
  { code: 'india', label: 'India', flag: '🇮🇳' },
  { code: 'usa', label: 'USA', flag: '🇺🇸' },
  { code: 'uk', label: 'UK', flag: '🇬🇧' },
  { code: 'eu', label: 'EU', flag: '🇪🇺' },
] as const;

export function OnboardingScreen() {
  const { country, setCountry, setAppState, setGuidedFlow } = useSettingsStore();

  return (
    <div 
      className="min-h-full flex flex-col items-center justify-center p-4 md:p-8 bg-civic-navy bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-civic-card via-civic-navy to-civic-navy overflow-y-auto"
      role="main"
      aria-label="Welcome to ElectEdu"
    >
      <div className="max-w-[600px] w-full animate-fade-in space-y-8">
        
        {/* Top Section */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4" aria-hidden="true">🗳️</div>
          <h1 className="text-4xl md:text-[2.5rem] font-bold text-white tracking-tight">
            Understand Your Vote
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto">
            Ask anything about elections in India and around the world — in plain language, with cited sources.
          </p>
        </div>

        {/* Country Chips Row */}
        <div className="flex flex-wrap justify-center gap-3">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => setCountry(c.code as Country)}
              className={`flex items-center space-x-2 px-4 py-2 min-h-[44px] rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-civic-accent ${
                country === c.code 
                  ? 'bg-civic-elevated border-2 border-civic-accent text-white shadow-lg shadow-civic-accent/20' 
                  : 'bg-civic-card border-2 border-transparent text-gray-400 hover:text-white hover:bg-civic-elevated'
              }`}
              aria-pressed={country === c.code}
              role="button"
            >
              <span className="text-lg">{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* What brings you here? */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
            What would you like to learn?
          </h2>
          
          <div className="grid gap-3">
            <CardOption 
              icon="🗳️"
              title="I'm voting for the first time"
              subtitle="Step-by-step guide to casting your vote"
              onClick={() => setGuidedFlow('first_time_voter', 1)}
            />
            
            <CardOption 
              icon="🖥️"
              title="I want to understand EVMs"
              subtitle="How electronic voting machines work"
              onClick={() => setAppState('FREE_QUESTION')} // Pre-fill logic can be added in ChatInterface
            />
            
            <CardOption 
              icon="📊"
              title="How does vote counting work?"
              subtitle="From polling day to results declared"
              onClick={() => setAppState('FREE_QUESTION')}
            />
            
            <CardOption 
              icon="🌍"
              title="Compare India with other countries"
              subtitle="Election systems around the world"
              onClick={() => setAppState('FREE_QUESTION')}
            />
          </div>
        </div>

        {/* Bottom Link */}
        <div className="text-center pt-6">
          <button
            onClick={() => setAppState('FREE_QUESTION')}
            className="text-civic-accent hover:text-civic-accent-light font-medium min-h-[44px] px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-civic-accent transition-colors"
          >
            Or type your own question →
          </button>
        </div>

      </div>
    </div>
  );
}

function CardOption({ icon, title, subtitle, onClick }: { icon: string; title: string; subtitle: string; onClick: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex items-center space-x-4 p-4 min-h-[88px] bg-civic-card rounded-xl border-l-4 border-l-saffron hover:bg-civic-elevated hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-civic-accent active:scale-[0.98]"
      aria-label={`${title}. ${subtitle}`}
    >
      <div className="text-3xl shrink-0" aria-hidden="true">{icon}</div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
        <p className="text-gray-400 text-sm truncate">{subtitle}</p>
      </div>
    </div>
  );
}
