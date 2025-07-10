'use client'
import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface Auth {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<Auth>({
  token: null,
  login: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    typeof window === 'undefined' ? null : localStorage.getItem('token')
  )
  const router = useRouter()

  const login = async (username: string, password: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
    const { data } = await axios.post(`${baseUrl}/auth/login/`, {
      username,
      password,
    })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    router.push('/')
  }

  const logout = async () => {
    if (token) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
      try {
        await axios.post(
          `${baseUrl}/auth/logout/`,
          {},
          { headers: { Authorization: `Token ${token}` } }
        )
      } catch {
        // ignore
      }
    }
    localStorage.removeItem('token')
    setToken(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
