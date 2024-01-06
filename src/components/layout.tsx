import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import { Inter } from 'next/font/google'
import {Header} from './Header'

const inter = Inter({ subsets: ['latin'] })


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <ClerkProvider>
        <main className="container mx-auto px-4 md:px-6 lg:px-8">
          {children}
        </main>
      </ClerkProvider>


  )
}
