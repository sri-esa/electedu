import { render, screen } from '@testing-library/react';
import { LoadingDots } from '../components/common/LoadingDots';

describe('LoadingDots', () => {
  it('renders three dots', () => {
    render(<LoadingDots />)
    const dots = document.querySelectorAll('[data-testid="dot"]')
    expect(dots).toHaveLength(3)
  })

  it('has role="status" for accessibility', () => {
    render(<LoadingDots />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has aria-label for screen readers', () => {
    render(<LoadingDots />)
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  })
})
