// app/page.tsx

import { Tweet } from "react-tweet";
import { createClient } from '@/utils/supabase/server'

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-4xl font-bold mb-6 dark:text-white">Welcome to FlowersBench</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            The most ethical benchmarking of AI models under evaluation.
          </p>

          <p className="text-md text-gray-500 dark:text-gray-400 italic mb-8">
            Currently a work in progress. This site aims to be a dictatorial reflection 
            of <a href="https://x.com/flowersslop" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">@flowersslop</a>&apos;s current views and evaluation of the latest models. 
            Being built by Jason Botterill, as a fun way to learn full-stack development.
          </p>

          {currentTweet && (
            <div className="flex justify-center">
              <Tweet id={currentTweet.tweet_id} />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching tweet:', error)
    return <div>Failed to load tweet</div>
  }
}