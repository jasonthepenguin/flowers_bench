// app/components/Navbar.tsx

'use client'


import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

// You can choose to use either the custom SVG or import { Cherry } from 'lucide-react'
// Cherry Blossom icon from SVG Repo
// Source: https://www.svgrepo.com/svg/395999/cherry-blossom
const CherryBlossom = () => (
    <svg 
      viewBox="0 0 128 128" 
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6" // Controls the size in the navbar
      aria-hidden="true"
    >
      <path d="M61.41 14.58s1.8-8.73 3.72-9.24c1.93-.51 10.34 1.31 14.47 3.5c5.77 3.05 9.33 8.14 10.18 14.34c.9 6.64-1.67 12.2-1.67 12.2s6.03-3.59 13.22-2.95c7.19.64 12.58 4.11 14.64 6.68c2.05 2.57 4.88 5.39 4.49 6.68c-.39 1.28-7.83 5.91-7.45 7.06c.39 1.16 9.12.51 10.01 2.05c.9 1.54 2.7 11.43-3.85 18.49c-6.55 7.06-12.97 8.09-12.97 8.09s6.48 6.09 6.82 14.41c.28 6.81-1.55 10.88-5.27 12.3c-3.72 1.41-10.66-3.08-10.66-3.08s6.03 10.78 3.34 12.45c-2.7 1.67-4.03-1.31-5.14-1.03c-.91.23.64 2.44-1.41 4.37c-2.05 1.93-10.91 3.21-18.74-1.03s-10.27-10.91-10.27-10.91s-2.11 8.1-11.74 12.21s-16.64-.92-17.92-1.69s-.77-6.93-.51-7.96c.26-1.03 1.41-3.47.64-3.98s-3.34 3.08-5.14 4.24s-4.11 2.44-6.42.51c-2.31-1.93-7.83-8.35-6.42-16.95c1.41-8.6 6.29-13.48 6.29-13.48s-10.27-.9-15.28-9.63s-4.35-17.46-3.45-18.62s8.6-1.28 8.6-1.28s-7.32-4.24-6.55-7.57c.77-3.34 4.49-.77 5.52-1.8c1.03-1.03-2.62-4.93.26-6.97c2.16-1.53 5.96-4.38 13.22-4.97c7.65-.63 12.97 3.21 12.97 3.21s-3.27-5.53-1.92-11.81c1.07-4.97 4.75-9.24 8.21-11.68s8.09-4.37 10.14-4.37s6.04 8.21 6.04 8.21z" fill="#ffbcd8"/>
      <path d="M79.68 46.37c1.38 1.59 4.29-.58 6.2-3.82c1.46-2.47 3.13-6.69 2.54-7.21c-.59-.52-5.14 3.02-6.68 4.77c-1.53 1.76-3.15 5-2.06 6.26z" fill="#fca2c8"/>
      <path d="M87.42 77.33c-.37 2.36 5.51 4.03 8.64 4.4c2.97.35 10.13.75 10.15-.26c.03-1.01-5.65-4.94-10.15-5.89c-3.95-.83-8.32-.26-8.64 1.75z" fill="#fca2c8"/>
      <path d="M65.26 92.39c-2.01-.12-2.76 4.56-2.39 8.16s1.14 8.3 2 8.39c.86.09 2.35-5.11 2.72-9.98c.23-3.06-.53-6.46-2.33-6.57z" fill="#fca2c8"/>
      <path d="M23.66 81.86c.14.67 7.08.67 10.79-.39c3.71-1.06 6.04-3.23 5.62-4.82c-.42-1.59-5.08-1.14-7.69-.16c-3.39 1.27-8.85 4.71-8.72 5.37z" fill="#fca2c8"/>
      <path d="M39.33 34.6c-.79.58 1.75 5.41 3.45 7.48c1.7 2.07 4.35 4.35 5.67 3.76c1.33-.58.11-4.77-2.81-7.58c-1.41-1.36-5.51-4.24-6.31-3.66z" fill="#fca2c8"/>
      <path d="M78.4 45.99c-1.82-.94-7.53 6.76-14.19 6.49s-13.52-7.33-14.73-6.25s3.65 8.88 1.11 16.5c-2.32 6.97-10.46 11.61-9.58 13.33c.82 1.61 8.71-1.73 15.27 1.58c7.65 3.87 6.19 13.75 8.88 13.82c2.69.07 1.5-8.62 8.14-12.81c6.39-4.04 13.21-.9 13.79-2.96c.67-2.42-8-5.41-9.81-13.68c-2.11-9.55 3.01-15.05 1.12-16.02z" fill="#bf0477"/>
      <path d="M59.73 58.83c-1.37.46-4.92 8.59-4.36 9.59c.56 1 7.85 7.29 9.78 7.29c1.93 0 8.28-6.1 8.34-7.04c.06-.93-3.11-9.22-4.17-9.84c-1.06-.62-8.28-.44-9.59 0z" fill="#f2a159"/>
      <path d="M68.8 54.08c-1.57 1.46-1.72 4.26.18 5.83c2.03 1.67 4.79 1.04 5.96-.59c1.03-1.42 1.13-3.61-.59-5.15c-1.06-.95-3.56-1.94-5.55-.09z" fill="#fdd0b1"/>
      <path d="M71.28 69.71c-.27 2.62 1.94 4.61 4.15 4.56c2.89-.06 3.96-2.47 3.93-4.11c-.05-2.21-1.58-4.11-4.02-4.02s-3.83 1.36-4.06 3.57z" fill="#fdd0b1"/>
      <path d="M65.05 74.4c-1.94.05-3.97 1.35-3.93 4.2c.04 2.62 2.08 3.79 4.11 3.79c2.03 0 3.7-1.45 3.7-3.93c0-2.48-1.8-4.11-3.88-4.06z" fill="#fdd0b1"/>
      <path d="M52.68 65.96c-2.89 0-4.11 1.99-4.11 4.25s1.67 3.9 4.34 3.79c2.3-.09 3.73-2.04 3.52-4.2c-.23-2.35-1.31-3.84-3.75-3.84z" fill="#fdd0b1"/>
      <path d="M54.66 53.54c-1.66 1.61-1.72 4.38.05 5.83c1.38 1.14 3.84 1.54 5.46-.14c1.63-1.67 1.35-4.06-.09-5.46c-1.44-1.41-3.79-1.81-5.42-.23z" fill="#fdd0b1"/>
    </svg>
  )

  const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
    const benchCategories = [
      { name: 'UI Bench', href: '/benches/ui' },
      { name: 'Greentext Bench', href: '/benches/greentext' },
      { name: 'North Korea Bench', href: '/benches/northkorea'},
    ]
  
    return (
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Icon Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-semibold">FlowersBench</span>
              </Link>
              <a 
                href="https://x.com/flowersslop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <CherryBlossom />
              </a>
            </div>
  
            {/* Navigation Links */}
            <div className="flex space-x-8">
              {/* Benches Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => {
                    // Small delay to allow moving to dropdown
                    setTimeout(() => {
                      if (!document.querySelector('.dropdown:hover')) {
                        setIsDropdownOpen(false)
                      }
                    }, 100)
                  }}
                >
                  <span>Benches</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
  
                {isDropdownOpen && (
                  <div
                    className="dropdown absolute left-0 w-48 mt-1 py-2 bg-white rounded-md shadow-lg"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {benchCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
  
              <Link 
                href="/leaderboard" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Leaderboard
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
  
  export default Navbar