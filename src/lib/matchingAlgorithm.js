// Deterministic Skill Compatibility Scoring Algorithm

export function scoreCandidate(candidate, { selectedSkills, selectedDomains, selectedTime }) {
  let score = 50 // Base score

  // 1. Skill complementarity (up to 30 pts): candidate has skills user doesn't
  const candidateSkillNames = candidate.skills ? candidate.skills.map((s) => s.name.toLowerCase()) : []
  const complementaryCount = candidateSkillNames.filter(
    (cs) => !selectedSkills.some((ss) => ss.toLowerCase().includes(cs.split(' ')[0]))
  ).length
  score += Math.min(30, complementaryCount * 10)

  // 2. Domain interest overlap (up to 15 pts)
  if (candidate.interests) {
    const domainOverlap = candidate.interests.filter((ci) =>
      selectedDomains.some((sd) => sd.toLowerCase().includes(ci.toLowerCase().split(' ')[0]))
    ).length
    score += Math.min(15, domainOverlap * 5)
  }

  // 3. Availability time alignment (up to 10 pts)
  if (candidate.availability && selectedTime) {
    if (candidate.availability === selectedTime) score += 10
    else score += 5
  }

  // 4. Verification bonus (5 pts)
  if (candidate.verified) score += 5

  return Math.min(98, score)
}

export function rankCandidates(users, wizardState) {
  return users
    .map((u) => ({ ...u, matchScore: scoreCandidate(u, wizardState) }))
    .sort((a, b) => b.matchScore - a.matchScore)
}
