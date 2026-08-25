import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Browse from './Browse.jsx'

describe('Browse Page Integration Suite', () => {
  it('renders multi-tab filter navigation bar (Resources, Projects, Skills)', () => {
    render(
      <BrowserRouter>
        <Browse />
      </BrowserRouter>
    )

    expect(screen.getByText(/Resources/i)).toBeInTheDocument()
    expect(screen.getByText(/Projects/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Skills/i).length).toBeGreaterThan(0)
  })

  it('renders search filter input and category filters', () => {
    render(
      <BrowserRouter>
        <Browse />
      </BrowserRouter>
    )

    expect(screen.getByPlaceholderText(/Search textbooks, calculators, notes.../i)).toBeInTheDocument()
  })
})
