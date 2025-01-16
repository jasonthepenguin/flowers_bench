"use client";

// app/components/TweetEmbed.tsx


import { useEffect } from "react";
import Script from "next/script";

declare global {
    interface Window {
      twttr?: {
        widgets: {
          load: () => void;
          [key: string]: any;
        };
      };
    }
  }



type TweetEmbedProps = {
  tweetUrl: string;
};

const TweetEmbed: React.FC<TweetEmbedProps> = ({ tweetUrl }) => {
  useEffect(() => {
    // Wait until the component is mounted in the browser, then re-initialize
    if (window?.twttr?.widgets) {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <>
      {/* Actual blockquote for the embed */}
      <blockquote className="twitter-tweet">
        <a href={tweetUrl}></a>
      </blockquote>

      {/* Ensure the Twitter script is present. Could load it once globally,
          but this is fine if you just do it here. */}
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </>
  );
};

export default TweetEmbed;