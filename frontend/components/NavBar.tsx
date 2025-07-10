'use client'
import React from 'react'
import { useAuth } from '../app/auth'

export default function NavBar() {
  const { token, logout } = useAuth()
  return (
    <nav className="p-4 bg-white shadow flex justify-between items-center">
      <span className="font-semibold text-lg truncate">LocalBox</span>
      {token && (
        <button
          onClick={logout}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Logout
        </button>
      )}
    </nav>
  )
}
