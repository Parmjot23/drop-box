import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

interface Item {
  id: string
  file: File
  progress: number
  done: boolean
}

export default function Upload() {
  const [items, setItems] = useState<Item[]>([])
  const client = useQueryClient()

  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const upload = (item: Item) => {
    const data = new FormData()
    data.append('file', item.file)
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/files/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const pct = e.total ? (e.loaded / e.total) * 100 : 0
          setItems((list) =>
            list.map((it) => (it.id === item.id ? { ...it, progress: pct } : it))
          )
        },
      })
      .then(() => {
        setItems((list) =>
          list.map((it) => (it.id === item.id ? { ...it, progress: 100, done: true } : it))
        )
        client.invalidateQueries({ queryKey: ['files'] })
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          new Notification(`${item.file.name} uploaded`)
        }
      })
  }

  const onDrop = useCallback((files: File[]) => {
    const newItems = files.map((f) => ({ id: crypto.randomUUID(), file: f, progress: 0, done: false }))
    setItems((prev) => [...prev, ...newItems])
    newItems.forEach(upload)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true })

  return (
    <div>
      <div
        {...getRootProps()}
        className="p-4 mb-4 text-center border-2 border-dashed rounded-md cursor-pointer bg-white"
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag & drop or click to upload</p>}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id}>
            <div className="text-sm">{item.file.name}</div>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
