import { describe, it, expect } from 'vitest'
import { rankCandidates, scoreCandidate } from './matchingAlgorithm.js'

describe('4-Vector Teammate Matching Algorithm', () => {
  const mockCandidate = {
    id: 'user-1',
    name: 'Sarah Chen',
    skills: [{ name: 'React & Next.js' }, { name: 'Python' }, { name: 'PyTorch & ML' }],
    interests: ['AI / Machine Learning', 'Web SaaS'],
    availability: '10–15 hrs/week',
    goal: 'Win a Hackathon',
    verified: true,
  }

  const userPreferences = {
    selectedSkills: ['React & Next.js'],
    selectedDomains: ['AI / Machine Learning'],
    selectedTime: '10–15 hrs/week',
  }

  it('should calculate compatibility score for complementary skill alignment', () => {
    const score = scoreCandidate(mockCandidate, userPreferences)
    expect(score).toBeGreaterThanOrEqual(70)
    expect(score).toBeLessThanOrEqual(98)
  })

  it('should rank candidates in descending order of compatibility score', () => {
    const candidateList = [
      mockCandidate,
      {
        id: 'user-2',
        name: 'David Wang',
        skills: [{ name: 'C++' }],
        interests: ['Robotics'],
        availability: '5–10 hrs/week',
        goal: 'Course / Lab Project',
        verified: false,
      },
    ]

    const ranked = rankCandidates(candidateList, userPreferences)
    expect(ranked[0].id).toBe('user-1')
    expect(ranked[0].matchScore).toBeGreaterThan(ranked[1].matchScore)
  })
})
