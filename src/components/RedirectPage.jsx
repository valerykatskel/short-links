import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOriginalUrl } from '../lib/supabase'

const RedirectPage = () => {
  const { shortCode } = useParams()
  const [status, setStatus] = useState('loading') // loading, redirecting, error, not-found

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortCode) {
        setStatus('error')
        return
      }

      try {
        const result = await getOriginalUrl(shortCode)
        
        if (result.success && result.originalUrl) {
          setStatus('redirecting')
          // Small delay to show the redirect message
          setTimeout(() => {
            window.location.href = result.originalUrl
          }, 1000)
        } else {
          setStatus('not-found')
        }
      } catch (error) {
        console.error('Redirect error:', error)
        setStatus('error')
      }
    }

    handleRedirect()
  }, [shortCode])

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-black mb-2 font-inter">Loading...</h2>
            <p className="text-gray font-inter">Finding your destination</p>
          </div>
        )
      
      case 'redirecting':
        return (
          <div className="text-center">
            <div className="animate-pulse">
              <div className="text-4xl mb-4">🚀</div>
            </div>
            <h2 className="text-2xl font-bold text-black mb-2 font-inter">Redirecting...</h2>
            <p className="text-gray font-inter">Taking you to your destination</p>
          </div>
        )
      
      case 'not-found':
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-3xl font-bold text-black mb-4 font-inter">Link Not Found</h2>
            <p className="text-gray mb-6 font-inter">
              The short link you're looking for doesn't exist or has expired.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors font-inter"
            >
              Create New Link
            </a>
          </div>
        )
      
      case 'error':
      default:
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-3xl font-bold text-black mb-4 font-inter">Something Went Wrong</h2>
            <p className="text-gray mb-6 font-inter">
              We encountered an error while processing your request.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 border-2 border-black text-black text-lg font-medium rounded-lg hover:bg-black hover:text-white transition-all font-inter"
              >
                Try Again
              </button>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors font-inter"
              >
                Go Home
              </a>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {/* Header */}
      <header className="pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="container mx-auto px-4 text-center">
          <a href="/" className="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-inter hover:text-gray-800 transition-colors">
            bitl.pro
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          {renderContent()}
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

export default RedirectPage