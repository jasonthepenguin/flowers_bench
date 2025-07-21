'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import FlowersBenchLogo from './icons/FlowersBenchLogo'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBenchesOpen, setIsBenchesOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-4 right-4 glass rounded-2xl z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Icon Section */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group no-underline">
              <div className="rounded-xl p-2 transition-all duration-300 hover:scale-105">
                <FlowersBenchLogo />
              </div>
              <span className="text-xl font-semibold text-white text-glow">FlowersBench</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass-hover p-3 rounded-xl text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className="glass-hover px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white transition-all duration-300"
            >
              Home
            </Link>

            <Link
              href="/leaderboard"
              className="glass-hover px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white transition-all duration-300"
            >
              Leaderboard
            </Link>

            {/* Benches Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsBenchesOpen(!isBenchesOpen)}
                className="glass-hover px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white transition-all duration-300 flex items-center space-x-1"
              >
                <span>Benches</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isBenchesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isBenchesOpen && (
                <div className="absolute top-full mt-2 w-48 glass rounded-xl py-2 shadow-lg">
                  <Link
                    href="/benches/jump-game-clone"
                    className="block px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                    onClick={() => setIsBenchesOpen(false)}
                  >
                    Jump Game Clone
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              href="/about"
              className="glass-hover px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white transition-all duration-300"
            >
              About
            </Link>
            
            <Link
              href="/login"
              className="neon-button text-black font-medium text-sm px-3 py-1.5 ml-4"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 mt-4">
            <div className="px-2 pt-4 pb-6 space-y-2">
              <Link
                href="/"
                className="block glass-hover px-4 py-3 rounded-xl text-base font-medium text-white/90 hover:text-white transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/leaderboard"
                className="block glass-hover px-4 py-3 rounded-xl text-base font-medium text-white/90 hover:text-white transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>

              <div className="px-4 py-3">
                <div className="text-base font-medium text-white/90 mb-2">Benches</div>
                <Link
                  href="/benches/jump-game-clone"
                  className="block glass-hover px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white transition-all duration-300 ml-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jump Game Clone
                </Link>
              </div>
              
              <Link
                href="/about"
                className="block glass-hover px-4 py-3 rounded-xl text-base font-medium text-white/90 hover:text-white transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link 
                href="/login"
                className="block neon-button text-black font-medium text-sm px-3 py-1.5 mt-4 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar