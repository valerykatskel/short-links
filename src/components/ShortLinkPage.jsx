import React, { useState, useEffect } from 'react'
import { generateQRCode } from '../lib/qrcode'
import { copyToClipboard } from '../lib/utils'

const ShortLinkPage = ({ result, onBackToHome }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    if (result?.shortUrl) {
      generateQRCode(result.shortUrl)
        .then(dataUrl => setQrCodeDataUrl(dataUrl))
        .catch(err => console.error('Failed to generate QR code:', err))
    }
  }, [result?.shortUrl])

  const handleCopy = async () => {
    if (result?.shortUrl) {
      const success = await copyToClipboard(result.shortUrl)
      if (success) {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      }
    }
  }

  const handleNewLink = () => {
    onBackToHome()
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">No link data available</h2>
          <button
            onClick={handleNewLink}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Create New Link
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {/* Header with Logo */}
      <header className="pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="container mx-auto px-4 text-center">
          <button
            onClick={handleNewLink}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-inter hover:text-gray-800 transition-colors"
          >
            bitl.pro
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center space-y-6 md:space-y-8">
          {/* Success Message */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 font-inter">
              Your short link is ready!
            </h2>
            <p className="text-gray text-base md:text-lg font-inter">
              Share it anywhere or scan the QR code
            </p>
          </div>

          {/* Short Link Display */}
          <div className="bg-white border-2 border-gray rounded-lg p-4 md:p-6 lg:p-8 shadow-sm">
            <div className="break-all text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-4 md:mb-6 font-inter leading-tight">
              {result.shortUrl}
            </div>
            
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto px-6 md:px-8 py-3 text-base md:text-lg font-medium rounded-lg transition-all font-inter min-h-[44px] ${
                copySuccess
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300'
              }`}
            >
              {copySuccess ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-black font-inter">
              QR Code
            </h3>
            {qrCodeDataUrl ? (
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-2 border-gray">
                <img 
                  src={qrCodeDataUrl} 
                  alt="QR Code" 
                  className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64"
                />
              </div>
            ) : (
              <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray text-sm md:text-base">Generating QR code...</span>
              </div>
            )}
          </div>

          {/* Original URL Display */}
          <div className="text-xs sm:text-sm text-gray font-inter px-4">
            <p>Original URL:</p>
            <p className="break-all mt-1">{result.originalUrl}</p>
          </div>

          {/* Create New Link Button */}
          <div className="pt-6 md:pt-8">
            <button
              onClick={handleNewLink}
              className="w-full sm:w-auto px-6 py-3 border-2 border-black text-black text-base md:text-lg font-medium rounded-lg hover:bg-black hover:text-white transition-all font-inter min-h-[44px]"
            >
              Create Another Link
            </button>
          </div>
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

export default ShortLinkPage