import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Matching from './Matching.jsx'

describe('Matching Page Integration Suite', () => {
  it('renders 5-step wizard header and title', () => {
    render(
      <BrowserRouter>
        <Matching />
      </BrowserRouter>
    )

    expect(screen.getByText(/AI Teammate Compatibility Engine/i)).toBeInTheDocument()
    expect(screen.getByText(/1. Select Your Core Skills/i)).toBeInTheDocument()
  })

  it('renders step action navigation button', () => {
    render(
      <BrowserRouter>
        <Matching />
      </BrowserRouter>
    )

    expect(screen.getByText(/Next Step →/i)).toBeInTheDocument()
  })
})
