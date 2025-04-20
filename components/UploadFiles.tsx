'use client'

import { useRef, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

type Props = {
  projectId: number
}

export default function UploadFiles({ projectId }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
// @ts-ignore
const [files, setFiles] = useState([])

  const bucket = 'project_files'

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    for (const file of files) {
      const filePath = `${projectId}/${Date.now()}-${file.name}`

      const { error: uploadError } = await supabase.storage...
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        console.error('Erreur upload:', uploadError)
        continue
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      const { error: dbError } = await supabase.from('project_files').insert([
        {
          project_id: projectId,
          file_url: publicUrlData.publicUrl,
          filename: file.name,
        },
      ])

      if (dbError) {
        console.error('Erreur DB:', dbError)
      }
    }

    await fetchFiles()
    setUploading(false)
  }

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from('project_files')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur fetch files:', error)
    } else {
      setFiles(data)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [projectId])

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <div className="border-dashed border-2 p-6 rounded text-center bg-gray-50">
        <p className="mb-2">📂 Glisse des fichiers ou clique pour uploader</p>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {uploading ? 'Upload en cours...' : 'Choisir des fichiers'}
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">🖼️ Fichiers uploadés</h3>
        <div className="grid grid-cols-2 gap-4">
          {files.map((file) => (
            <div key={file.id} className="border rounded overflow-hidden">
              <img src={file.file_url} alt={file.filename} className="w-full object-cover" />
              <div className="p-2 text-sm text-center">{file.filename}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}