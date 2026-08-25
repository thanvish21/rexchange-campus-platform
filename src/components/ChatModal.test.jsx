import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ChatModal from './ChatModal.jsx'

describe('ChatModal Component Suite', () => {
  const mockSeller = {
    id: 'user-1',
    name: 'Sarah Chen',
    avatar: '👩‍🎓',
    hostel: 'Block A Hostel',
    phone: '+91 98765 43210',
  }

  it('renders chat header with seller details, verified badge, and safe drop-zone pills when open', () => {
    render(
      <ChatModal
        isOpen={true}
        onClose={vi.fn()}
        seller={mockSeller}
        itemTitle="Organic Chemistry Textbook"
      />
    )

    expect(screen.getByText(/Sarah Chen/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Organic Chemistry Textbook/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Central Library Foyer/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Hostel Block A Lobby Desk/i).length).toBeGreaterThan(0)
  })

  it('does not render anything when isOpen is false or seller is null', () => {
    const { container } = render(
      <ChatModal isOpen={false} onClose={vi.fn()} seller={mockSeller} itemTitle="Textbook" />
    )
    expect(container.firstChild).toBeNull()
  })

  it('allows sending a text message and appends it to the conversation thread', () => {
    render(
      <ChatModal
        isOpen={true}
        onClose={vi.fn()}
        seller={mockSeller}
        itemTitle="Organic Chemistry Textbook"
      />
    )

    const input = screen.getByPlaceholderText(/Type message or click a safe zone/i)
    const sendBtn = screen.getByRole('button', { name: /Send 💬/i })

    fireEvent.change(input, { target: { value: 'Is the book still available?' } })
    fireEvent.click(sendBtn)

    expect(screen.getByText('Is the book still available?')).toBeInTheDocument()
    expect(input.value).toBe('')
  })

  it('proposes campus safe meetup zone when a drop-zone chip is clicked', () => {
    render(
      <ChatModal
        isOpen={true}
        onClose={vi.fn()}
        seller={mockSeller}
        itemTitle="Calculus Notes"
      />
    )

    const libraryZoneBtn = screen.getAllByRole('button', { name: /Central Library Foyer/i })[0]
    fireEvent.click(libraryZoneBtn)

    expect(
      screen.getByText(/📍 Proposing Campus Safe Meetup: Central Library Foyer/i)
    ).toBeInTheDocument()
  })

  it('switches quick reply categories and sends quick reply when clicked', () => {
    render(
      <ChatModal
        isOpen={true}
        onClose={vi.fn()}
        seller={mockSeller}
        itemTitle="Calculus Notes"
      />
    )

    const timingCategoryBtn = screen.getByRole('button', { name: /⏰ Schedule/i })
    fireEvent.click(timingCategoryBtn)

    const quickReplyBtn = screen.getByRole('button', { name: /🕒 Free today around 4:30 PM\?/i })
    fireEvent.click(quickReplyBtn)

    expect(screen.getAllByText('🕒 Free today around 4:30 PM?').length).toBeGreaterThan(0)
  })

  it('calls onClose callback when the close button is clicked', () => {
    const handleClose = vi.fn()
    render(
      <ChatModal
        isOpen={true}
        onClose={handleClose}
        seller={mockSeller}
        itemTitle="Engineering Physics"
      />
    )

    const closeBtn = screen.getByRole('button', { name: /Close chat/i })
    fireEvent.click(closeBtn)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
