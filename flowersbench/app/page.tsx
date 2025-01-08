// app/page.tsx
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to FlowersBench
        </h1>
        <p className="text-lg text-gray-600 mb-8">
        The most ethical benchmarking of AI models under evaluation.
        </p>
        
        {/* Add your main content sections here */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Example cards or sections can go here */}
        </div>
      </div>
    </div>
  )
}