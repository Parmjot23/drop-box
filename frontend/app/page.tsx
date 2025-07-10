'use client'

import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import FileCard from '../components/FileCard'
import Upload from '../components/Upload'
import { useAuth } from './auth'
import { useRouter } from 'next/navigation'

const fetchFiles = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
  const { data } = await axios.get(`${baseUrl}/api/files/`)
  return data.results
}

export default function Home() {
  const { token } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])
  const { data } = useQuery({ queryKey: ['files'], queryFn: fetchFiles })
  return (
    <div className="flex flex-col gap-4">
      <Upload />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map((f: any) => (
          <FileCard key={f.id} file={f} />
        ))}
      </div>
    </div>
  )
}
