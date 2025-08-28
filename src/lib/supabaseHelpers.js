import { supabase } from './supabase'

// Check if short code already exists
export const checkShortCodeExists = async (shortCode) => {
  try {
    const { data, error } = await supabase
      .from('urls')
      .select('id')
      .eq('short_code', shortCode)
      .single()
    
    if (error && error.code === 'PGRST116') {
      // No rows returned, short code doesn't exist
      return false
    }
    
    if (error) {
      throw error
    }
    
    return true
  } catch (error) {
    console.error('Error checking short code:', error)
    return false
  }
}

// Generate unique short code
export const generateUniqueShortCode = async (maxAttempts = 10) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shortCode = generateRandomCode()
    const exists = await checkShortCodeExists(shortCode)
    
    if (!exists) {
      return shortCode
    }
  }
  
  throw new Error('Unable to generate unique short code after maximum attempts')
}

// Generate random code using Base62 encoding
const generateRandomCode = (length = 6) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

// Get URL statistics (for future use)
export const getUrlStats = async (shortCode) => {
  try {
    const { data, error } = await supabase
      .from('urls')
      .select('*')
      .eq('short_code', shortCode)
      .single()
    
    if (error) throw error
    
    return {
      success: true,
      data: {
        originalUrl: data.original_url,
        shortCode: data.short_code,
        createdAt: data.created_at,
        expiresAt: data.expires_at
      }
    }
  } catch (error) {
    console.error('Error getting URL stats:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Clean up expired URLs (utility function)
export const cleanupExpiredUrls = async () => {
  try {
    const { error } = await supabase
      .from('urls')
      .delete()
      .lt('expires_at', new Date().toISOString())
    
    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Error cleaning up expired URLs:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Test database connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('urls')
      .select('count(*)')
      .limit(1)
    
    if (error) throw error
    
    return {
      success: true,
      message: 'Database connection successful'
    }
  } catch (error) {
    console.error('Database connection failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Validate environment variables
export const validateSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      isValid: false,
      message: 'Missing Supabase configuration. Please check your environment variables.'
    }
  }
  
  if (!supabaseUrl.includes('supabase.co')) {
    return {
      isValid: false,
      message: 'Invalid Supabase URL format.'
    }
  }
  
  return {
    isValid: true,
    message: 'Supabase configuration is valid.'
  }
}