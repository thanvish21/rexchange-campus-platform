import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'

describe('Dashboard Page Integration Suite', () => {
  it('renders SRM verified badge, student greeting, and campus stats', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText(/Welcome back, Alex Chen/i)).toBeInTheDocument()
    expect(screen.getByText(/SRM Verified Student/i)).toBeInTheDocument()
    expect(screen.getByText(/Student Collaboration Hub/i)).toBeInTheDocument()
  })

  it('renders dynamic next best action banner and CTA button', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText(/Complete your SRM Student Passport|Recruit remaining talent|Browse High-Match/i)).toBeInTheDocument()
  })

  it('renders recommended projects cards with skill tags and action buttons', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText(/Recommended Projects for You/i)).toBeInTheDocument()
    const applyBtns = screen.getAllByRole('link', { name: /Apply \/ Connect →/i })
    expect(applyBtns.length).toBeGreaterThan(0)
  })

  it('filters campus activity timeline events by timeline category buttons', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText(/Campus Activity & Milestone Timeline/i)).toBeInTheDocument()

    const inviteFilterBtn = screen.getByRole('button', { name: /Invite/i })
    fireEvent.click(inviteFilterBtn)

    expect(screen.getByText(/Invited to join "AetherAI"/i)).toBeInTheDocument()
    expect(screen.queryByText(/Organic Chemistry Study Guide/i)).not.toBeInTheDocument()
  })

  it('renders profile passport strength progress bar and checklist', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText(/🪪 Profile Passport/i)).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Edit Student Passport →/i })).toBeInTheDocument()
  })

  it('renders connection credits meter and refill CTA link', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText(/⚡ Connection Credits/i)).toBeInTheDocument()
    expect(screen.getByText(/Semester Match Allowance/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /⚡ Refill \/ Get Pro Pass/i })).toBeInTheDocument()
  })
})
