'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import FileCard from '../components/FileCard'
import Upload from '../components/Upload'

const fetchFiles = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/files/`)
  return data.results
}

export default function Home() {
  const { data } = useQuery({ queryKey: ['files'], queryFn: fetchFiles })
  return (
    <div className="flex flex-col gap-4">
      <Upload />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map((f: any) => (
          <FileCard key={f.id} file={f} />
        ))}
      </div>
    </div>
  )
}
