import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'

describe('Navbar Component', () => {
  it('renders logo and navigation links cleanly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

    expect(screen.getByText(/RExchange/i)).toBeInTheDocument()
    expect(screen.getByText(/Discover/i)).toBeInTheDocument()
    expect(screen.getByText(/AI Teammates/i)).toBeInTheDocument()
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
  })

  it('renders command palette trigger search button', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

    expect(screen.getByText(/Search/i)).toBeInTheDocument()
    expect(screen.getByText(/⌘K/i)).toBeInTheDocument()
  })
})
