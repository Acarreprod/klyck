'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'photographer' | 'client'>('photographer')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async () => {
    setError('')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return setError(error.message)

    // Insère le rôle dans la table profiles
    await supabase.from('profiles').insert({
      id: data.user?.id,
      role,
    })

    router.push(role === 'photographer' ? '/dashboard' : '/gallery')
  }

  const handleLogin = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return setError(error.message)

    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', (await supabase.auth.getUser()).data.user?.id)
      .single()

    if (data?.role === 'photographer') {
      router.push('/dashboard')
    } else {
      router.push('/gallery')
    }
  }

  return (
    <div className="max-w-sm mx-auto py-10 space-y-4">
      <h1 className="text-xl font-bold">Se connecter ou créer un compte</h1>
      <input
        className="w-full border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
      >
        <option value="photographer">Photographe</option>
        <option value="client">Client</option>
      </select>

      {error && <p className="text-red-600">{error}</p>}

      <button className="bg-black text-white px-4 py-2 rounded w-full" onClick={handleLogin}>
        Se connecter
      </button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded w-full" onClick={handleSignup}>
        S’inscrire
      </button>
    </div>
  )
}