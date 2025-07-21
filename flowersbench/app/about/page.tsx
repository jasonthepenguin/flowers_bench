// app/about/page.tsx
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 text-glow">
            About <span className="text-neon-cyan">FlowersBench</span>
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

        {/* Evaluation Criteria */}
        <div className="glass rounded-2xl p-8 mb-12 soft-glow">
          <h2 className="text-3xl font-semibold text-white mb-8">Evaluation Criteria</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 glass rounded-2xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-neon-cyan mb-3">Performance</h3>
              <p className="text-white/70 font-light">
                Speed, accuracy, and capability across diverse tasks and domains
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 glass rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-neon-purple mb-3">Safety</h3>
              <p className="text-white/70 font-light">
                Bias mitigation, harmful content prevention, and responsible AI practices
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 glass rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-neon-pink mb-3">Innovation</h3>
              <p className="text-white/70 font-light">
                Novel capabilities, architectural improvements, and future potential
              </p>
            </div>
          </div>
        </div>

        {/* Development Story */}
        <div className="glass rounded-2xl p-8 mb-12 soft-glow">
          <h2 className="text-3xl font-semibold text-white mb-6">Development Story</h2>
          <p className="text-lg text-white/80 font-light leading-relaxed mb-6">
            FlowersBench is being built by{' '}
            <span className="text-neon-cyan font-medium">Jason Botterill</span>{' '}
            as a comprehensive exploration in full-stack development, combining 
            modern web technologies with AI evaluation methodologies.
          </p>
          <p className="text-lg text-white/70 font-light leading-relaxed">
            This project serves dual purposes: creating a valuable resource for 
            the AI community while providing hands-on learning experience in 
            React, Next.js, TypeScript, Supabase, and modern web design principles.
          </p>
        </div>

        {/* Technical Stack */}
        <div className="glass rounded-2xl p-8 mb-12 soft-glow">
          <h2 className="text-3xl font-semibold text-white mb-6">Technical Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Next.js 15', color: 'text-neon-cyan' },
              { name: 'TypeScript', color: 'text-neon-blue' },
              { name: 'Supabase', color: 'text-neon-purple' },
              { name: 'Tailwind CSS', color: 'text-neon-pink' },
              { name: 'React 19', color: 'text-neon-cyan' },
              { name: 'Vercel AI SDK', color: 'text-neon-blue' },
              { name: 'OpenRouter', color: 'text-neon-purple' },
              { name: 'Glassmorphism', color: 'text-neon-pink' }
            ].map((tech, index) => (
              <div key={index} className="glass-hover rounded-xl p-4 text-center">
                <span className={`${tech.color} font-medium`}>{tech.name}</span>
              </div>
            ))}
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