// app/components/Navbar.tsx

'use client'


import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import CherryBlossom from './icons/CherryBlossom'

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