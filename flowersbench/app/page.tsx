// app/page.tsx

import { Tweet } from "react-tweet";
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Home() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('featured_tweets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (error) throw error
    const currentTweet = data?.[0] || null

    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-light text-white mb-8 text-glow">
              Flowers<span className="text-neon-cyan">Bench</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 font-light mb-4 leading-relaxed">
              The most ethical benchmarking of AI models under evaluation
            </p>
            
            <p className="text-lg text-white/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              A dictatorial reflection of{' '}
              <a 
                href="https://x.com/flowersslop" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neon-pink hover:text-neon-purple transition-colors duration-300"
              >
                @flowersslop
              </a>
              &apos;s current views and evaluation of the latest AI models
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/leaderboard" className="neon-button text-black font-semibold no-underline">
                View Leaderboard
              </Link>
              <Link href="/about" className="neon-button-secondary text-black font-semibold no-underline">
                Learn More
              </Link>
            </div>
          </div>

          {/* Featured Tweet Section */}
          {currentTweet && (
            <div className="mb-16">
              <h2 className="text-2xl font-medium text-white text-center mb-8 text-glow">
                Featured Insight
              </h2>
              <div className="flex justify-center">
                <div className="glass rounded-2xl p-6 soft-glow max-w-lg">
                  <Tweet id={currentTweet.tweet_id} />
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="glass glass-hover rounded-2xl p-8 text-center soft-glow">
              <div className="text-3xl font-bold text-neon-cyan mb-2">20+</div>
              <div className="text-white/80 font-medium">Models Evaluated</div>
            </div>
            <div className="glass glass-hover rounded-2xl p-8 text-center soft-glow">
              <div className="text-3xl font-bold text-neon-purple mb-2">100%</div>
              <div className="text-white/80 font-medium">Ethical Standards</div>
            </div>
            <div className="glass glass-hover rounded-2xl p-8 text-center soft-glow">
              <div className="text-3xl font-bold text-neon-pink mb-2">∞</div>
              <div className="text-white/80 font-medium">Learning Potential</div>
            </div>
          </div>

          {/* Development Note */}
          <div className="glass rounded-2xl p-8 text-center soft-glow">
            <h3 className="text-xl font-semibold text-white mb-4">
              🚧 Work in Progress
            </h3>
            <p className="text-white/70 font-light leading-relaxed">
              This platform is being built by{' '}
              <span className="text-neon-cyan font-medium">Jason Botterill</span>{' '}
              as an exploration in full-stack development and AI model evaluation.
              Stay tuned for more features and insights!
            </p>
          </div>

        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching tweet:', error)
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Unable to load content
          </h2>
          <p className="text-white/70">Please try refreshing the page</p>
        </div>
      </div>
    )
  }
}