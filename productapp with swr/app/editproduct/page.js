'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function page() {
    const router = useRouter()
    router.push(`/editproduct/123`)
  return(<>Loading</>);
}
