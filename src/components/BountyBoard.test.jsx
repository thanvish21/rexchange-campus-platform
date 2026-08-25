import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BountyBoard } from './BountyBoard.jsx'

describe('BountyBoard Component Suite', () => {
  it('renders section header, subtitle, and initial favor bounties feed', () => {
    render(<BountyBoard />)

    expect(screen.getByText(/CAMPUS FAVOR BOUNTIES/i)).toBeInTheDocument()
    expect(screen.getByText(/Need a Quick Favor or Late-Night Snack Trade\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Post small bounties for coffee, pizza slices/i)).toBeInTheDocument()
    expect(screen.getByText(/Need electric kettle in Block B for 1 hour/i)).toBeInTheDocument()
    expect(screen.getByText(/Borrowing graphing calculator for 9 AM exam/i)).toBeInTheDocument()
  })

  it('renders karma points and instant claim action buttons', () => {
    render(<BountyBoard />)

    const claimButtons = screen.getAllByRole('button', { name: /Claim Bounty/i })
    expect(claimButtons.length).toBeGreaterThan(0)
    expect(screen.getByText(/15 Karma/i)).toBeInTheDocument()
    expect(screen.getByText(/20 Karma/i)).toBeInTheDocument()
  })

  it('allows user to claim a bounty and shows claim confirmation message', () => {
    render(<BountyBoard />)

    const claimButtons = screen.getAllByRole('button', { name: /Claim Bounty/i })
    fireEvent.click(claimButtons[0])

    expect(screen.getByText(/🎉 Claimed! \+15 Karma Points Earned!/i)).toBeInTheDocument()
  })

  it('allows user to fill out and submit a new campus favor bounty', () => {
    render(<BountyBoard />)

    const titleInput = screen.getByPlaceholderText(/e\.g\. Need umbrella for 20 mins/i)
    const rewardInput = screen.getByPlaceholderText(/e\.g\. 🍕 Slice of Pizza/i)
    const submitBtn = screen.getByRole('button', { name: /Post Bounty to Campus/i })

    fireEvent.change(titleInput, { target: { value: 'Need lab coat size L for Chemistry lab' } })
    fireEvent.change(rewardInput, { target: { value: '☕ Cold Coffee' } })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/✓ Bounty live on campus feed!/i)).toBeInTheDocument()
    expect(screen.getByText(/Need lab coat size L for Chemistry lab/i)).toBeInTheDocument()
    expect(screen.getByText(/☕ Cold Coffee/i)).toBeInTheDocument()
  })

  it('prevents posting empty bounties when form is submitted without inputs', () => {
    render(<BountyBoard />)

    const submitBtn = screen.getByRole('button', { name: /Post Bounty to Campus/i })
    fireEvent.click(submitBtn)

    expect(screen.queryByText(/✓ Bounty live on campus feed!/i)).not.toBeInTheDocument()
  })

  it('resets form input fields after successful bounty posting', () => {
    render(<BountyBoard />)

    const titleInput = screen.getByPlaceholderText(/e\.g\. Need umbrella for 20 mins/i)
    const rewardInput = screen.getByPlaceholderText(/e\.g\. 🍕 Slice of Pizza/i)
    const submitBtn = screen.getByRole('button', { name: /Post Bounty to Campus/i })

    fireEvent.change(titleInput, { target: { value: 'Need scientific calculator' } })
    fireEvent.change(rewardInput, { target: { value: '🍕 Pizza slice' } })
    fireEvent.click(submitBtn)

    expect(titleInput.value).toBe('')
    expect(rewardInput.value).toBe('')
  })
})
