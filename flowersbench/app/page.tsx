// app/page.tsx
"use client";

import TweetEmbed from "./components/TweetEmbed";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <h1 className="text-4xl font-bold mb-6 dark:text-white">Welcome to FlowersBench</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          The most ethical benchmarking of AI models under evaluation.
        </p>

        <p className="text-md text-gray-500 dark:text-gray-400 italic mb-8">
          Currently a work in progress. This site aims to be a dictatorial reflection 
          of @flowersslop&apos;s current views and evaluation of the latest models. 
          Being built by me @JasonBotterill03, as a fun way to learn full-stack development.
        </p>

        {/* Embedded Tweet via our dedicated component */}
        <div className="flex justify-center">
          <TweetEmbed tweetUrl="https://twitter.com/flowersslop/status/1874058976184459478?ref_src=twsrc%5Etfw" />
        </div>
        
      </div>
    </div>
  );
}