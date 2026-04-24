import { render, screen, fireEvent } from '@testing-library/react';
import { SuggestionChips } from '../components/chat/SuggestionChips';
import { vi } from 'vitest';

describe('SuggestionChips', () => {
  const mockOnSelect = vi.fn()
  const chips = [
    'What ID do I need?',
    'How does EVM work?',
    'Where is my booth?'
  ]

  it('renders all chips', () => {
    render(<SuggestionChips chips={chips} onChipSelect={mockOnSelect} />)
    chips.forEach(chip => {
      expect(screen.getByText(chip)).toBeInTheDocument()
    })
  })

  it('calls onSelect with chip text when clicked', () => {
    render(<SuggestionChips chips={chips} onChipSelect={mockOnSelect} />)
    fireEvent.click(screen.getByText('What ID do I need?'))
    expect(mockOnSelect).toHaveBeenCalledWith('What ID do I need?')
  })

  it('renders nothing when chips array is empty', () => {
    const { container } = render(
      <SuggestionChips chips={[]} onChipSelect={mockOnSelect} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('each chip is keyboard accessible', () => {
    render(<SuggestionChips chips={chips} onChipSelect={mockOnSelect} />)
    const firstChip = screen.getByText('What ID do I need?')
    expect(firstChip.closest('button')).toBeInTheDocument()
  })
})
