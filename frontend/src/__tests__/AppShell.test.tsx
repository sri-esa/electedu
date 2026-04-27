import { render, screen } from '@testing-library/react'
import { AppShell } from '../components/layout/AppShell'

describe('AppShell', () => {
    it('renders without crashing', () => {
        render(
            <AppShell>
                <div>Test content</div>
            </AppShell>
        )
        expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('renders skip to main content link', () => {
        render(
            <AppShell>
                <div>Test</div>
            </AppShell>
        )
        expect(
            screen.getByText(/skip/i) ||
            document.querySelector('a[href="#main-content"]')
        ).toBeTruthy()
    })

    it('renders ElectEdu brand name', () => {
        render(
            <AppShell>
                <div>Test</div>
            </AppShell>
        )
        const elements = screen.getAllByText(/ElectEdu/i)
        expect(elements.length).toBeGreaterThan(0)
        expect(elements[0]).toBeInTheDocument()
    })
})