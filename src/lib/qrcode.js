import QRCode from 'qrcode'

// Generate QR code as data URL
export const generateQRCode = async (text, options = {}) => {
  try {
    const defaultOptions = {
      width: 256,
      height: 256,
      color: {
        dark: '#000000',  // Black foreground
        light: '#FFFFFF'  // White background
      },
      errorCorrectionLevel: 'M',
      margin: 1,
      ...options
    }

    const dataUrl = await QRCode.toDataURL(text, defaultOptions)
    return dataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}

// Generate QR code as SVG string
export const generateQRCodeSVG = async (text, options = {}) => {
  try {
    const defaultOptions = {
      width: 256,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M',
      margin: 1,
      ...options
    }

    const svgString = await QRCode.toString(text, {
      type: 'svg',
      ...defaultOptions
    })
    return svgString
  } catch (error) {
    console.error('Error generating QR code SVG:', error)
    throw error
  }
}

// Generate QR code as canvas element
export const generateQRCodeCanvas = async (text, canvasElement, options = {}) => {
  try {
    const defaultOptions = {
      width: 256,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M',
      margin: 1,
      ...options
    }

    await QRCode.toCanvas(canvasElement, text, defaultOptions)
    return canvasElement
  } catch (error) {
    console.error('Error generating QR code on canvas:', error)
    throw error
  }
}

// Validate QR code content
export const validateQRCodeContent = (content) => {
  if (!content || typeof content !== 'string') {
    return false
  }
  
  // QR codes have a maximum capacity
  // For error correction level M, it's around 2953 characters
  if (content.length > 2900) {
    return false
  }
  
  return true
}

// Get QR code download blob
export const getQRCodeBlob = async (text, options = {}) => {
  try {
    const canvas = document.createElement('canvas')
    await generateQRCodeCanvas(text, canvas, options)
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png')
    })
  } catch (error) {
    console.error('Error creating QR code blob:', error)
    throw error
  }
}

// Download QR code as PNG file
export const downloadQRCode = async (text, filename = 'qrcode.png', options = {}) => {
  try {
    const blob = await getQRCodeBlob(text, options)
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading QR code:', error)
    throw error
  }
}