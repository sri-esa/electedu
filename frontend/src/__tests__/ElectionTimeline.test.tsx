import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { ElectionTimeline } from '../components/timeline/ElectionTimeline'

// Mock fetch for timeline data
global.fetch = vi.fn().mockResolvedValue({
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

    it('shows timeline title after loading', async () => {
        render(<ElectionTimeline />)
        const element = await screen.findByText(/Election Timeline/i)
        expect(element).toBeInTheDocument()
    })
})