import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NexTrack - Financial Management',
  description: 'Track your income, expenses, and get AI-powered budget suggestions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
} 