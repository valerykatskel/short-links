import React, { useState } from 'react'
import { validateUrl } from '../lib/utils'
import { shortenUrl } from '../lib/supabase'

const HomePage = ({ onUrlShortened }) => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validate URL
    if (!validateUrl(url)) {
      setError('Please enter a valid URL starting with http:// or https://')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await shortenUrl(url)
      
      if (result.success) {
        onUrlShortened(result)
      } else {
        setError(result.error || 'Failed to shorten URL')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {/* Header with Logo */}
      <header className="pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black font-inter">
            bitl.pro
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* URL Input */}
            <div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Paste your long URL here..."
                className="w-full px-4 md:px-6 py-3 md:py-4 text-lg md:text-xl border-2 border-gray rounded-lg focus:outline-none focus:border-black transition-colors bg-white font-inter"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-center font-medium text-sm md:text-base">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-black text-white text-lg md:text-xl font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-inter min-h-[44px]"
              >
                {isLoading ? 'Shortening...' : 'Shorten Link'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray text-sm font-inter">
            © 2024 bitl.pro - Simple and fast link shortener
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage