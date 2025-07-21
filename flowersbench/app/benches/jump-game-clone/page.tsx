import Image from 'next/image'

export default function JumpGameClone() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 text-glow">
            Jump Game Clone
          </h1>
          <p className="text-xl text-white/70 font-light">
            Below shows how we evaluated the models on recreating a Doodle Jump Game using PyGame, and the rubric we used.
          </p>
        </div>

        {/* Model Result */}
        <div className="mb-16">
          <h2 className="text-3xl font-light text-white mb-8 text-center">
            Sonnet 4 Non-Thinking
          </h2>
          
          {/* Images */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-xl overflow-hidden soft-glow">
              <Image
                src="/doodle/s4_nonthink_1.jpg"
                alt="Sonnet 4 Non-Thinking Game Screenshot 1"
                width={600}
                height={800}
                className="w-full h-auto"
              />
            </div>
            <div className="glass rounded-xl overflow-hidden soft-glow">
              <Image
                src="/doodle/s4_nonthink_2.jpg"
                alt="Sonnet 4 Non-Thinking Game Screenshot 2"
                width={600}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Scoring Rubric */}
          <div className="glass rounded-2xl p-8 soft-glow">
            <h3 className="text-2xl font-semibold text-white mb-6">Doodle Jump Clone Scoring Rubric</h3>
            
            <div className="space-y-6">
              {/* Platforms */}
              <div>
                <h4 className="text-lg font-medium text-neon-cyan mb-2">Platforms (4/7 points)</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Basic platforms exist (1 point)</li>
                  <li>• Random generation at different heights (1 point)</li>
                  <li>• Visual variety (colors, sizes, or types) (2 points)</li>
                  <li className="text-white/50">• Special platform types (moving, breakable, etc.) (0/2 points)</li>
                </ul>
              </div>

              {/* Player Character */}
              <div>
                <h4 className="text-lg font-medium text-neon-cyan mb-2">Player Character (5/7 points)</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Player renders on screen (1 point)</li>
                  <li>• Left/right movement controls work (1 point)</li>
                  <li>• Automatic jumping when landing on platforms (1 point)</li>
                  <li>• Proper collision with platforms (1 point)</li>
                  <li>• Good visual design/clear player representation (1/3 points)</li>
                </ul>
              </div>

              {/* Physics & Movement */}
              <div>
                <h4 className="text-lg font-medium text-neon-cyan mb-2">Physics & Movement (4/5 points)</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Basic gravity system (1 point)</li>
                  <li>• Smooth player movement (1 point)</li>
                  <li>• Realistic jump physics (1 point)</li>
                  <li>• Proper velocity/acceleration handling (1/2 points)</li>
                </ul>
              </div>

              {/* Camera System */}
              <div>
                <h4 className="text-lg font-medium text-neon-cyan mb-2">Camera System (3/3 points)</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Camera follows player upward (2 points)</li>
                  <li>• Smooth camera movement (1 point)</li>
                </ul>
              </div>

              {/* Score System */}
              <div>
                <h4 className="text-lg font-medium text-neon-cyan mb-2">Score System (4/5 points)</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Score display visible (1 point)</li>
                  <li>• Score increases with height (1 point)</li>
                  <li>• Score positioning and readability (1 point)</li>
                  <li>• Styled Nicely (1/2 points)</li>
                </ul>
              </div>

              {/* Game Over & Restart */}
              <div>
                <h4 className="text-lg font-medium text-neon-cyan mb-2">Game Over & Restart (4/6 points)</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Game over when player falls below screen (1 point)</li>
                  <li>• Clear game over indication (1 point)</li>
                  <li>• Restart functionality (1 point)</li>
                  <li>• Styled Nicely (1/3 points)</li>
                </ul>
              </div>

              {/* Code Quality */}
              <div>
                <h4 className="text-lg font-medium text-neon-cyan mb-2">Code Quality (1/1 point)</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Code runs without errors (1 point)</li>
                </ul>
              </div>

              {/* Bonus Features */}
              <div>
                <h4 className="text-lg font-medium text-neon-cyan mb-2">Bonus Features (0/2 points)</h4>
                <ul className="space-y-1 text-white/50 text-sm">
                  <li>• Sound effects (0/1 point)</li>
                  <li>• Enhanced visuals/animations (0/1 point)</li>
                </ul>
              </div>

              {/* Total Score */}
              <div className="pt-6 border-t border-white/20">
                <div className="text-2xl font-bold text-neon-pink text-center">
                  Total Score: 25/34
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}