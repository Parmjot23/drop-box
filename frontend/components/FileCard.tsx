'use client'

import React from 'react'

interface Props {
  file: {
    id: string
    file: string
    size: number
    uploaded_at: string
    download_url: string
  }
}

export default function FileCard({ file }: Props) {
  const isImage = file.file.match(/\.(jpg|jpeg|png)$/i)
  return (
    <div className="border rounded p-2 bg-white">
      {isImage ? (
        <img
          src={file.download_url}
          alt={file.file}
          className="mb-2 w-full h-auto object-cover"
        />
      ) : (
        <div className="h-32 flex items-center justify-center bg-gray-100 mb-2">File</div>
      )}
      <div className="text-sm truncate">{file.file}</div>
      <div className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</div>
    </div>
  )
}
