import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ListItem from './ListItem.jsx'

describe('ListItem Page Integration Suite', () => {
  it('renders page header, listing form fields, quality meter, and live marketplace preview', () => {
    render(
      <BrowserRouter>
        <ListItem />
      </BrowserRouter>
    )

    expect(screen.getByText(/List a Resource or Skill/i)).toBeInTheDocument()
    expect(screen.getByText(/Listing Quality Meter/i)).toBeInTheDocument()
    expect(screen.getByText(/What are you listing\?/i)).toBeInTheDocument()
    expect(screen.getByText(/👁️ Live Marketplace Preview/i)).toBeInTheDocument()
  })

  it('updates live marketplace preview in real time as user types title and description', () => {
    render(
      <BrowserRouter>
        <ListItem />
      </BrowserRouter>
    )

    const titleInput = screen.getByLabelText(/What are you listing\?/i)
    const descInput = screen.getByLabelText(/Description & Details/i)

    fireEvent.change(titleInput, { target: { value: 'Sony WH-1000XM4 Noise Canceling Headphones' } })
    fireEvent.change(descInput, { target: { value: 'Mint condition headphones with original carrying case.' } })

    expect(screen.getAllByText(/Sony WH-1000XM4 Noise Canceling Headphones/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Mint condition headphones with original carrying case/i).length).toBeGreaterThan(0)
  })

  it('conditionally hides price input field when Give Away exchange model is selected', () => {
    render(
      <BrowserRouter>
        <ListItem />
      </BrowserRouter>
    )

    expect(screen.getByLabelText(/Price \(₹ INR\)/i)).toBeInTheDocument()

    const giveawayBtn = screen.getByRole('button', { name: /🎁 Give Away/i })
    fireEvent.click(giveawayBtn)

    expect(screen.queryByLabelText(/Price \(₹ INR\)/i)).not.toBeInTheDocument()
    expect(screen.getByText(/FREE GIVEAWAY/i)).toBeInTheDocument()
  })

  it('updates category selection when category chip is clicked', () => {
    render(
      <BrowserRouter>
        <ListItem />
      </BrowserRouter>
    )

    const electronicsChip = screen.getByRole('button', { name: /Electronics/i })
    fireEvent.click(electronicsChip)

    const categoryBadges = screen.getAllByText('Electronics')
    expect(categoryBadges.length).toBeGreaterThan(0)
  })

  it('displays post-publish success modal after submitting valid listing', () => {
    render(
      <BrowserRouter>
        <ListItem />
      </BrowserRouter>
    )

    const titleInput = screen.getByLabelText(/What are you listing\?/i)
    const priceInput = screen.getByLabelText(/Price \(₹ INR\)/i)
    const hostelInput = screen.getByLabelText(/Campus Pickup Spot \/ Hostel \*/i)
    const submitBtn = screen.getByRole('button', { name: /Publish Listing to Campus/i })

    fireEvent.change(titleInput, { target: { value: 'TI-84 Plus Calculator' } })
    fireEvent.change(priceInput, { target: { value: '650' } })
    fireEvent.change(hostelInput, { target: { value: 'Block B Lobby' } })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Listing Published Successfully!/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /\+ List Another Item/i })).toBeInTheDocument()
  })
})
