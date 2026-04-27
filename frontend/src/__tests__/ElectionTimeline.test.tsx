import { render, screen } from '@testing-library/react'
import { ElectionTimeline } from '../components/timeline/ElectionTimeline'

// Mock fetch for timeline data
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
        nodes: [
            {
                id: 'node_1',
                label: 'Schedule Announced',
                date: '2024-03-16',
                description: 'ECI announces election schedule',
                expandedContent: 'Full details here',
                icon: '📋',
                color: 'blue',
                position: 1
            }
        ]
    })
})

describe('ElectionTimeline', () => {
    it('renders without crashing', () => {
        render(<ElectionTimeline />)
        expect(document.body).toBeTruthy()
    })

    it('shows timeline title or loading state', () => {
        render(<ElectionTimeline />)
        expect(
            screen.getByText(/timeline/i) ||
            screen.getByText(/election/i) ||
            screen.getByRole('status') ||
            document.querySelector('[aria-label]')
        ).toBeTruthy()
    })
})