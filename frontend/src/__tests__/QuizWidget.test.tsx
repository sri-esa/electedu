import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizWidget } from '../components/common/QuizWidget';
import { useSettingsStore } from '../store/settings.store';

describe('QuizWidget', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      appState: 'QUIZ_IN_PROGRESS'
    });
  });

  it('renders first question on mount', () => {
    render(<QuizWidget />)
    expect(screen.getByText(/minimum age to vote/i)).toBeInTheDocument()
  })

  it('shows 4 answer options', () => {
    render(<QuizWidget />)
    const options = screen.getAllByRole('button')
    // Filter to answer options (not navigation buttons)
    expect(options.length).toBeGreaterThanOrEqual(4)
  })

  it('shows correct feedback on right answer', async () => {
    render(<QuizWidget />)
    // Q1: correct answer is "18"
    fireEvent.click(screen.getByText('18'))
    fireEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(screen.getByText(/correct/i)).toBeInTheDocument()
    })
  })

  it('shows explanation after answering', async () => {
    render(<QuizWidget />)
    fireEvent.click(screen.getByText('16'))
    fireEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      // Find the explanation text which is included in the explanation field
      expect(screen.getByText(/voting age was reduced/i)).toBeInTheDocument()
    })
  })

  it('shows progress indicator', () => {
    render(<QuizWidget />)
    expect(screen.getByText(/question 1 of 5/i)).toBeInTheDocument()
  })
})
