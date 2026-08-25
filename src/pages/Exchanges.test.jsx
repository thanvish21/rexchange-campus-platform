import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Exchanges from './Exchanges.jsx'

describe('Exchanges Page Integration Suite', () => {
  it('renders active trade passport title and status tabs', () => {
    render(
      <BrowserRouter>
        <Exchanges />
      </BrowserRouter>
    )

    expect(screen.getByText(/My Exchanges & Connections/i)).toBeInTheDocument()
    expect(screen.getByText(/ACTIVE TRADES & CAMPUS SAFE HANDOFFS/i)).toBeInTheDocument()
    expect(screen.getByText(/All Exchanges/i)).toBeInTheDocument()
    expect(screen.getAllByText(/⚡ Active/i).length).toBeGreaterThan(0)
  })

  it('renders safe drop zone banner and drop zone tags', () => {
    render(
      <BrowserRouter>
        <Exchanges />
      </BrowserRouter>
    )

    expect(screen.getByText(/IITB \/ SRM Verified Safe Meetup Guarantee/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Central Library Foyer/i).length).toBeGreaterThan(0)
  })

  it('filters exchanges feed by status tab selection', () => {
    render(
      <BrowserRouter>
        <Exchanges />
      </BrowserRouter>
    )

    const activeTab = screen.getAllByRole('button', { name: /⚡ Active/i })[0]
    fireEvent.click(activeTab)

    expect(screen.getByText(/Figma Lessons ↔ Video Editing/i)).toBeInTheDocument()
  })

  it('renders partner information and WhatsApp handoff links', () => {
    render(
      <BrowserRouter>
        <Exchanges />
      </BrowserRouter>
    )

    expect(screen.getAllByText(/WhatsApp Handoff/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Sarah Chen/i)).toBeInTheDocument()
  })

  it('opens chat modal when clicking Open Chat button', () => {
    render(
      <BrowserRouter>
        <Exchanges />
      </BrowserRouter>
    )

    const openChatBtns = screen.getAllByRole('button', { name: /💬 Open Chat/i })
    fireEvent.click(openChatBtns[0])

    expect(screen.getByRole('dialog', { name: /Campus Chat & Meetup Coordination/i })).toBeInTheDocument()
  })

  it('opens upgrade payment modal when clicking Upgrade button', () => {
    render(
      <BrowserRouter>
        <Exchanges />
      </BrowserRouter>
    )

    const upgradeBtn = screen.getByRole('button', { name: /Upgrade/i })
    fireEvent.click(upgradeBtn)

    expect(screen.getByText(/Unlock Unlimited Connections/i)).toBeInTheDocument()
  })
})
