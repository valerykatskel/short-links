import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ShortLinkPage from './components/ShortLinkPage'
import RedirectPage from './components/RedirectPage'

function App() {
  const [shortLinkResult, setShortLinkResult] = useState(null)
  const [currentView, setCurrentView] = useState('home') // 'home' or 'result'

  const handleUrlShortened = (result) => {
    setShortLinkResult(result)
    setCurrentView('result')
  }

  const handleBackToHome = () => {
    setShortLinkResult(null)
    setCurrentView('home')
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main app route */}
          <Route 
            path="/" 
            element={
              currentView === 'home' ? (
                <HomePage onUrlShortened={handleUrlShortened} />
              ) : (
                <ShortLinkPage 
                  result={shortLinkResult} 
                  onBackToHome={handleBackToHome} 
                />
              )
            } 
          />
          
          {/* Redirect route for short links */}
          <Route path="/:shortCode" element={<RedirectPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
