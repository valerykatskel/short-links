// URL validation function
export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false
  }

  // Basic URL validation
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  
  // Add protocol if missing
  let normalizedUrl = url.trim()
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl
  }

  try {
    new URL(normalizedUrl)
    return urlPattern.test(normalizedUrl)
  } catch {
    return false
  }
}

// Normalize URL by adding protocol if missing
export const normalizeUrl = (url) => {
  if (!url) return ''
  
  let normalizedUrl = url.trim()
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl
  }
  
  return normalizedUrl
}

// Copy to clipboard function
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Use modern clipboard API
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const success = document.execCommand('copy')
      document.body.removeChild(textArea)
      return success
    }
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    return false
  }
}

// Format URL for display
export const formatUrlForDisplay = (url) => {
  if (!url) return ''
  
  try {
    const urlObj = new URL(url)
    return urlObj.href
  } catch {
    return url
  }
}

// Check if URL is accessible (optional validation)
export const checkUrlAccessibility = async (url) => {
  try {
    // Note: This will be blocked by CORS in most cases
    // This is more for server-side validation
    const response = await fetch(url, { 
      method: 'HEAD', 
      mode: 'no-cors' 
    })
    return true
  } catch {
    // If CORS blocks it, we assume it's accessible
    // Real validation would need to be done server-side
    return true
  }
}

// Generate a random ID for debugging/tracking
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}