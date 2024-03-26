'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      window.location.href = '/login'
    } else {
      window.location.href = '/home'
    }
  }, [])
  return <main className="ml-[300px] flex justify-center"></main>
}
