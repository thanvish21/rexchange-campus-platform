import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Profile from './Profile.jsx'

describe('Profile Page Integration Suite', () => {
  it('renders student identity card and verified status', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )

    expect(screen.getByText(/Student Trade Passport & Profile/i)).toBeInTheDocument()
    expect(screen.getByText(/Save Student Profile & Update Passport/i)).toBeInTheDocument()
  })
})
