// app/about/page.tsx
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 text-glow">
            About <span className="text-white">Flowers</span><span className="text-neon-pink">Bench</span>
          </h1>
        </div>

        {/* Mission Section */}
        <div className="glass rounded-2xl p-8 mb-12 soft-glow">
          <h2 className="text-3xl font-semibold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-white/80 font-light leading-relaxed mb-6">
            FlowersBench represents the most ethical approach to AI model evaluation, 
            providing transparent, unbiased rankings based on comprehensive testing 
            across performance, safety, and innovation metrics.
          </p>
          <p className="text-lg text-white/70 font-light leading-relaxed">
            This platform serves as a dictatorial reflection of{' '}
            <a 
              href="https://x.com/flowersslop" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neon-purple hover:text-neon-pink transition-colors duration-300 inline-flex items-center gap-1"
            >
              @flowersslop
              <ExternalLink className="h-4 w-4" />
            </a>
            &apos;s views on the current state of AI models, emphasizing ethical considerations 
            and real-world applicability.
          </p>
        </div>

        {/* Team Credits Section */}
        <div className="glass rounded-2xl p-8 mb-12 soft-glow">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* flowersslop */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/flowers.jpg"
                  alt="flowersslop profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">flowersslop</h3>
              <p className="text-white/70 mb-4">AI Godmother</p>
              <a 
                href="https://x.com/flowersslop" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neon-purple hover:text-neon-pink transition-colors duration-300 inline-flex items-center gap-1"
              >
                @flowersslop
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* JasonBotterill3 */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/jason.jpg"
                  alt="JasonBotterill3 profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Jason Botterill</h3>
              <p className="text-white/70 mb-4">Vibe Coder</p>
              <a 
                href="https://x.com/JasonBotterill3" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neon-cyan hover:text-neon-purple transition-colors duration-300 inline-flex items-center gap-1"
              >
                @JasonBotterill3
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

          </div>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-4">
          <Link href="/" className="neon-button text-black font-semibold">
            Back to Home
          </Link>
          <Link href="/leaderboard" className="neon-button-secondary text-black font-semibold">
            View Leaderboard
          </Link>
        </div>

        {/* Attributions */}
        <div className="mt-16 glass rounded-2xl p-6 soft-glow">
          <h3 className="text-lg font-semibold text-white mb-4">Attributions</h3>
          <p className="text-white/70 text-sm">
            Cherry Blossom icon provided by{' '}
            <a 
              href="https://www.svgrepo.com/svg/395999/cherry-blossom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:text-neon-purple transition-colors duration-300 inline-flex items-center gap-1"
            >
              SVG Repo
              <ExternalLink className="h-3 w-3" />
            </a>
            {' '}under the Apache License.
          </p>
        </div>

      </div>
    </div>
  )
}