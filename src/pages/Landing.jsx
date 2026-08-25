import { Hero } from '../components/Hero.jsx'
import MarqueeTicker from '../components/MarqueeTicker.jsx'
import { Stats } from '../components/Stats.jsx'
import { HowItWorks } from '../components/HowItWorks.jsx'
import CampusChapters from '../components/CampusChapters.jsx'
import { Features } from '../components/Features.jsx'
import { MysteryBox } from '../components/MysteryBox.jsx'
import { BountyBoard } from '../components/BountyBoard.jsx'
import { CompetitorComparison } from '../components/CompetitorComparison.jsx'

export default function Landing() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <Stats />
      <HowItWorks />
      <CampusChapters />
      <Features />
      <MysteryBox />
      <BountyBoard />
      <CompetitorComparison />
    </>
  )
}
