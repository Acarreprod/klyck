'use client'

import UploadFiles from './UploadFiles' // ✅ adapte si le fichier est ailleurs
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Project = {
  id: number
  title: string
  client_name: string
  client_email: string
  description: string
  created_at: string
}

export default function CreateProjectForm() {
  const [title, setTitle] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [projects, setProjects] = useState<Project[]>([])

  // Charger les projets dès le début
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setProjects(data)
    if (error) console.error('Erreur chargement projets', error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('projects').insert([
      {
        title,
        client_name: clientName,
        client_email: clientEmail,
        description,
      },
    ])

    if (error) {
      setMessage('❌ Erreur: ' + error.message)
    } else {
      setMessage('✅ Projet créé avec succès !')
      setTitle('')
      setClientName('')
      setClientEmail('')
      setDescription('')
      fetchProjects() // recharger la liste
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-6 bg-white rounded shadow"
      >
        <h2 className="text-xl font-bold">Créer un projet</h2>
        <input
          className="w-full border p-2 rounded"
          placeholder="Nom du projet"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Nom du client"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Email du client"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          required
          type="email"
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'En cours...' : 'Créer'}
        </button>
        {message && <p className="text-sm">{message}</p>}
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">📋 Projets enregistrés :</h3>
        <ul className="space-y-2">
       

{projects.map((p) => (
  <li key={p.id} className="border p-4 rounded bg-gray-50 space-y-3">
    <div>
      <strong>{p.title}</strong> — {p.client_name} ({p.client_email})
      <p className="text-sm text-gray-600">{p.description}</p>
      <p className="text-xs text-gray-400">
        {new Date(p.created_at).toLocaleString()}
      </p>
    </div>

    {/* 🔥 Ajout du module d'upload lié à ce projet */}
    <UploadFiles projectId={p.id} />
  </li>
))}
        </ul>
      </div>
    </div>
  )
}