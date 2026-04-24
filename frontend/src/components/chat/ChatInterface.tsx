import { useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestionChips } from './SuggestionChips';
import { StaticFAQCards } from '../common/StaticFAQCards';
import { useSettingsStore } from '../../store/settings.store';

const DEFAULT_SUGGESTIONS = [
  "What ID do I need to vote?",
  "How do I check my name on the voter list?",
  "Explain how EVMs work simply"
];

export function ChatInterface() {
  const { messages, sendMessage, isLoading, error } = useChat();
  const { appState } = useSettingsStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // If we've hit a hard fallback state via the store (offline handling)
  if (appState === 'OFFLINE_FALLBACK') {
    return (
      <div className="flex-1 overflow-auto bg-civic-navy p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-lg">
            I'm having trouble connecting right now. Showing you our most common election questions instead.
          </div>
          <StaticFAQCards />
        </div>
      </div>
    );
  }

  const handleSend = (text: string) => {
    sendMessage(text);
  };

  // Determine which chips to show
  let currentChips: string[] = [];
  if (messages.length === 0) {
    currentChips = DEFAULT_SUGGESTIONS;
  } else {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === 'assistant' && lastMsg.chips && lastMsg.chips.length > 0) {
      currentChips = lastMsg.chips;
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-civic-navy relative">
      <div 
        className="flex-1 overflow-y-auto p-4 flex flex-col"
        role="log"
        aria-label="Chat history"
      >
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-end">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in my-auto">
              <div className="text-6xl mb-6">🗳️</div>
              <h2 className="text-2xl font-bold text-white mb-2">Ask me anything about elections</h2>
              <p className="text-gray-400 mb-8 max-w-md">
                I can explain procedures, help you find polling information, and clarify how voting works.
              </p>
              
              <div className="w-full max-w-lg space-y-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Try asking:</p>
                {DEFAULT_SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sug)}
                    className="w-full text-left px-4 py-3 min-h-[44px] bg-civic-card hover:bg-civic-elevated text-gray-300 rounded-lg border border-civic-border transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 bg-civic-navy max-w-4xl mx-auto w-full">
        {messages.length > 0 && currentChips.length > 0 && !isLoading && (
          <SuggestionChips 
            chips={currentChips} 
            onChipSelect={handleSend}
            disabled={isLoading} 
          />
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={isLoading} />
      
      {error && (
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg text-sm z-50 animate-fade-in"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
    </div>
  );
}
