import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Browse from './pages/Browse.jsx'
import Matching from './pages/Matching.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ListItem from './pages/ListItem.jsx'
import Exchanges from './pages/Exchanges.jsx'
import Profile from './pages/Profile.jsx'
import Onboard from './pages/Onboard.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<ListItem />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
