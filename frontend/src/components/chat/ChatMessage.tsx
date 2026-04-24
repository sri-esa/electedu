import type { Message } from '../../types';
import { LoadingDots } from '../common/LoadingDots';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end w-full animate-slide-up mb-4 px-4" aria-live="polite">
        <div className="flex flex-col items-end max-w-[75%]">
          <div className="bg-civic-accent text-white rounded-[18px] rounded-br-[4px] px-4 py-3 text-[15px] shadow-sm">
            {message.content}
          </div>
          <span className="text-[11px] text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start w-full animate-slide-up mb-4 px-4" aria-live="polite">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-saffron to-amber-600 flex items-center justify-center text-sm shadow-md mr-3">
        <span aria-hidden="true">🗳️</span>
      </div>
      <div className="flex flex-col items-start max-w-[80%]">
        <div className="bg-civic-card border border-civic-border text-white rounded-[18px] rounded-bl-[4px] px-4 py-3 text-[15px] shadow-sm overflow-hidden">
          {message.isLoading ? (
            <div className="h-6 flex items-center">
              <LoadingDots color="bg-saffron" size="sm" />
            </div>
          ) : (
            <div className="space-y-3 whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          )}
        </div>
        
        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.citations.map((cit, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center bg-civic-elevated text-gray-300 text-[11px] px-2 py-1 rounded-md border border-civic-border"
              >
                <span className="mr-1">📖</span> Source: {cit}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
