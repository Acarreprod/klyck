'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function UploadFiles({ projectId }: { projectId: number }) {
  // ✅ on désactive le check TypeScript ici temporairement
  // @ts-ignore
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const fetchFiles = async () => {
    const { data: list, error } = await supabase.storage
      .from('projects')
      .list(`${projectId}`, { limit: 100 })

    if (!error && list) {
      setFiles(list)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    setUploading(true)

    for (const file of fileList) {
      const filePath = `${projectId}/${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Erreur upload :', uploadError.message)
      }
    }

    setUploading(false)
    fetchFiles()
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm text-gray-700">📁 Ajouter des fichiers :</span>
        <input
          type="file"
          multiple
          onChange={handleUpload}
          className="mt-2 block w-full"
        />
      </label>

      <div className="grid grid-cols-3 gap-2">
        {files.map((f: any) => (
          <div key={f.name} className="border p-2 rounded text-xs">
            <p>{f.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}