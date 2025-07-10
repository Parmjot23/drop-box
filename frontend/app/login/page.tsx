'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { login, token } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (token) {
      router.push('/')
    }
  }, [token, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs mx-auto mt-10 space-y-4"
    >
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  )
}
