'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <button onClick={() => signIn('google')} className="bg-blue-500 text-white p-2 rounded">Sign in with Google</button>
      <button onClick={() => signIn('credentials', { email: 'test@koinside.org', password: '1234' })} className="bg-gray-700 text-white p-2 rounded">Sign in with Email (Demo)</button>
    </div>
  )
}