import { Eye, EyeOff } from 'lucide-react';
import { useSettingsStore } from '../../store/settings.store';

export function PlainLanguageToggle() {
  const { plainLanguageMode, togglePlainLanguage } = useSettingsStore();

  return (
    <button
      onClick={togglePlainLanguage}
      className="w-full flex items-center justify-between min-h-[44px] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent p-2 -ml-2 hover:bg-civic-elevated group"
      aria-pressed={plainLanguageMode}
      role="switch"
      aria-label="Toggle plain language mode"
    >
      <div className="flex items-center space-x-3 text-sm text-gray-400 group-hover:text-white transition-colors">
        {plainLanguageMode ? (
          <Eye className="w-5 h-5 text-saffron" />
        ) : (
          <EyeOff className="w-5 h-5" />
        )}
        <div className="flex flex-col items-start">
          <span className={plainLanguageMode ? 'text-white' : ''}>Simple Language</span>
          <span className="text-[10px] text-gray-500">Easier words for everyone</span>
        </div>
      </div>
      
      {/* Toggle switch visual */}
      <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${plainLanguageMode ? 'bg-civic-accent' : 'bg-civic-elevated'}`}>
        <span 
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${plainLanguageMode ? 'translate-x-4' : 'translate-x-1'}`}
        />
      </div>
    </button>
  );
}
