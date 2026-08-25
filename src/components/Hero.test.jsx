import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Hero from './Hero.jsx'

describe('Hero Component', () => {
  it('renders hero headline and main CTA buttons', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )

    expect(screen.getByText(/Everything your campus already has/i)).toBeInTheDocument()
    expect(screen.getByText(/Explore RExchange →/i)).toBeInTheDocument()
    expect(screen.getByText(/Find a Teammate/i)).toBeInTheDocument()
  })

  it('renders popular category shortcut chips', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )

    expect(screen.getByText(/Textbooks/i)).toBeInTheDocument()
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument()
    expect(screen.getByText(/Notes/i)).toBeInTheDocument()
  })
})
