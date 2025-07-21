// app/page.tsx

import { Tweet } from "react-tweet";
import Link from 'next/link'

import { headers } from 'next/headers';

async function getFeaturedTweet() {
  try {
    // For server-side rendering, we need to construct the full URL
    const host = (await headers()).get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_BASE_URL || '';
    
    const response = await fetch(`${baseUrl}/api/featured-tweets`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured tweet');
    }
    
    const data = await response.json();
    return data.tweet;
  } catch (error) {
    console.error('Error fetching featured tweet:', error);
    return null;
  }
}

export default async function Home() {
  const currentTweet = await getFeaturedTweet();

    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-light text-white mb-8 text-glow">
              Flowers<span className="text-neon-pink">Bench</span>
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
              <Link href="/leaderboard" className="neon-button-secondary text-black font-semibold no-underline">
                View Leaderboard
              </Link>
              <Link href="/about" className="neon-button text-black font-semibold no-underline">
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

        </div>
      </div>
    );
}