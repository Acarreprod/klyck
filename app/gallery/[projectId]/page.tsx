'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function GalleryByProject() {
  const { projectId } = useParams()
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .storage
        .from('project-files')
        .list(`${projectId}/`, {
          limit: 100,
          sortBy: { column: 'name', order: 'asc' },
        })

      if (error) {
        console.error('Erreur fetch fichiers :', error)
      } else {
        setFiles(data || [])
      }
    }

    if (projectId) fetchFiles()
  }, [projectId])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Galerie du projet {projectId}</h1>

      {files.length === 0 ? (
        <p className="text-gray-600">Aucun fichier trouvé pour ce projet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.name} className="border rounded overflow-hidden">
              <Image
                src={`https://mqxsojexmfnuenvfdbfp.supabase.co/storage/v1/object/public/project-files/${projectId}/${file.name}`}
                alt={file.name}
                width={300}
                height={300}
                className="object-cover"
              />
              <div className="p-2 text-sm truncate">{file.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
