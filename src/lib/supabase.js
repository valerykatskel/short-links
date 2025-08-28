import { createClient } from '@supabase/supabase-js'
import { normalizeUrl } from './utils'
import { generateUniqueShortCode } from './supabaseHelpers'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database functions
export const shortenUrl = async (originalUrl) => {
  try {
    // Normalize the URL
    const normalizedUrl = normalizeUrl(originalUrl)
    
    // Generate a unique short code
    const shortCode = await generateUniqueShortCode()
    
    // Insert into database
    const { data, error } = await supabase
      .from('urls')
      .insert([
        { 
          original_url: normalizedUrl, 
          short_code: shortCode 
        }
      ])
      .select()
    
    if (error) throw error
    
    return {
      success: true,
      shortCode: data[0].short_code,
      shortUrl: `${window.location.origin}/${data[0].short_code}`,
      originalUrl: data[0].original_url
    }
  } catch (error) {
    console.error('Error shortening URL:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export const getOriginalUrl = async (shortCode) => {
  try {
    const { data, error } = await supabase
      .from('urls')
      .select('original_url')
      .eq('short_code', shortCode)
      .single()
    
    if (error) throw error
    
    return {
      success: true,
      originalUrl: data.original_url
    }
  } catch (error) {
    console.error('Error getting original URL:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
