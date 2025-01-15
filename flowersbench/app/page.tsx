// app/page.tsx
"use client";

import Script from "next/script";

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-4xl font-bold mb-6">Welcome to FlowersBench</h1>
          <p className="text-lg text-gray-600 mb-4">
            The most ethical benchmarking of AI models under evaluation.
          </p>

          <p className="text-md text-gray-500 italic mb-8">
            Currently a work in progress. This site aims to be a dictatorial reflection of @flowersslop&#39;s current views and evaluation of the latest models. Being built by me @JasonBotterill03, as a fun way to learn full-stack development.
          </p>

          {/* Embedded Tweet */}
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Imagine being born in 2025
              <br />
              <br />
              You will have absolutely no memories of the old world. You will
              literally only know it from stories.
            </p>
            &mdash; Flowers (@flowersslop)&nbsp;
            <a href="https://twitter.com/flowersslop/status/1874058976184459478?ref_src=twsrc%5Etfw">
              December 31, 2024
            </a>
          </blockquote>
        </div>
      </div>

      {/* Twitter script */}
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </>
  );
}