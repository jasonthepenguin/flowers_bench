import { login } from './actions'
import CherryBlossom from '../components/icons/CherryBlossom'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="glass rounded-2xl p-4 soft-glow-pink">
              <CherryBlossom />
            </div>
          </div>
          <h1 className="text-4xl font-light text-white mb-4 text-glow">
            Admin <span className="text-neon-pink">Access</span>
          </h1>
          <p className="text-white/70 font-light">
            Restricted to authorized users only
          </p>
        </div>

        {/* Login Form */}
        <div className="glass rounded-2xl p-8 soft-glow">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>
            
            <button
              formAction={login}
              className="w-full neon-button-secondary text-black font-semibold"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-white/60 text-sm">
              Not an admin?{' '}
              <Link href="/" className="text-neon-cyan hover:text-neon-purple transition-colors duration-300">
                Return to homepage
              </Link>
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 glass rounded-2xl p-6 text-center soft-glow">
          <h3 className="text-lg font-semibold text-white mb-2">
            🌸 Flowers & Jason Only
          </h3>
          <p className="text-white/70 text-sm font-light">
            This admin panel is restricted to authorized users for managing 
            leaderboard entries and featured content.
          </p>
        </div>

      </div>
    </div>
  )
}