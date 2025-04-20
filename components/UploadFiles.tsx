'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type FileObject = {
  name: string
  id?: string
}

export default function UploadFiles({ projectId }: { projectId: number }) {
  const [files, setFiles] = useState<FileObject[]>([])
  const [uploading, setUploading] = useState(false)

  const fetchFiles = async () => {
    const { data: list, error } = await supabase.storage
      .from('projects')
      .list(`${projectId}`, { limit: 100 })

    if (!error && list) {
      setFiles(list as FileObject[])
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [projectId])

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
        {files.map((f) => (
          <div key={f.name} className="border p-2 rounded text-xs">
            <p>{f.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
