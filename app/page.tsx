'use client'

import { useState, useEffect } from 'react';
import { onAuthChange } from '../firebase/authUtils'; // Import from your auth file
import { useRouter } from 'next/navigation' // Import useRouter

import Auth from '../components/Auth' // Assuming Auth component exists

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter() // Initialize router

  useEffect(() => {
    const unsubscribe = onAuthChange((user: any) => { // TODO: Address 'any' type
      setUser(user)
      setLoading(false)
      if (user) {
        // Redirect to the checkin page if user is authenticated
        router.push('/checkin/page_checkin')
      }
    })
    return () => unsubscribe(); // Clean up the listener
  }, [router]); // Add router to the dependency array

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // If not loading and no user, show the Auth component
  if (!user) {
    return <Auth />
  }

  // If loading is false and user is true, the redirection in useEffect will handle it
  // This return will likely not be reached in a typical flow but is kept as a fallback
  return null;
}
