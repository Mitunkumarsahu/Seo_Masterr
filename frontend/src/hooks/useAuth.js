// hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react'
import useApi from './useApi'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const { apiCall } = useApi()

  // Check token validity on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setIsAuthenticated(false)
        setUser(null)
        return
      }

      setLoading(true)
      try {
        const userData = await apiCall('/api/verify-token', 'GET', null, {
          Authorization: `Bearer ${token}`,
        })
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('authToken')
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [apiCall])

  // Login
  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const response = await apiCall('/api/login', 'POST', credentials)
      const { user, token } = response
      localStorage.setItem('authToken', token)
      setUser(user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('authToken')
    setUser(null)
    setIsAuthenticated(false)
  }, [])


  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  }
}
