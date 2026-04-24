

interface SuggestionChipsProps {
  chips: string[];
  onChipSelect: (text: string) => void;
  disabled?: boolean;
}

export function SuggestionChips({ chips, onChipSelect, disabled }: SuggestionChipsProps) {
  if (!chips || chips.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-4 mb-2 flex space-x-2">
      {chips.map((chip, idx) => (
        <button
          key={idx}
          onClick={() => onChipSelect(chip)}
          disabled={disabled}
          className="whitespace-nowrap px-4 py-2 min-h-[44px] bg-civic-elevated text-sm text-gray-200 rounded-full border border-transparent hover:border-civic-accent hover:bg-civic-card transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent disabled:opacity-50 flex-shrink-0"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
