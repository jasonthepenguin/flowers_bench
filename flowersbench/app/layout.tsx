// app/layout.tsx
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import './globals.css'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FlowersBench',
  description: 'Compare AI-generated UI code'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} dark:bg-black dark:text-white`}>
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}