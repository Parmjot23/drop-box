'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import FileCard from '../components/FileCard'

const fetchFiles = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/files/`)
  return data.results
}

export default function Home() {
  const { data } = useQuery({ queryKey: ['files'], queryFn: fetchFiles })
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.map((f: any) => (
        <FileCard key={f.id} file={f} />
      ))}
    </div>
  )
}
