import { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  // Keep focus on input unless on mobile to prevent keyboard popping constantly
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile && !disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  return (
    <div className="bg-civic-card border-t border-civic-border p-3 md:p-4 shrink-0">
      <form 
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex items-center bg-civic-navy rounded-full border border-civic-border p-1 focus-within:ring-2 focus-within:ring-civic-accent focus-within:border-transparent transition-all"
      >
        <button
          type="button"
          className="p-3 text-gray-400 hover:text-white rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-civic-accent"
          aria-label="Voice input (coming soon)"
          disabled={true}
        >
          <Mic className="w-5 h-5" />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Ask about elections..."
          className="flex-1 bg-transparent border-none text-white focus:outline-none px-2 min-h-[44px] disabled:opacity-50 text-[15px]"
          aria-label="Message input"
        />
        
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="p-3 bg-civic-accent text-white rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-50 disabled:bg-civic-elevated disabled:text-gray-500 hover:bg-civic-accent-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-civic-navy focus:ring-civic-accent mr-1"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
