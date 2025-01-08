// app/about/page.tsx
export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">About FlowersBench</h1>
      
      {/* Your main about content goes here */}
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-12">
          {/* Add your site description here */}
        </p>
      </div>

      {/* Attributions section */}
      <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Attributions</h2>
        <div className="text-gray-600">
          <p>
            Cherry Blossom icon provided by{' '}
            <a 
              href="https://www.svgrepo.com/svg/395999/cherry-blossom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              SVG Repo
            </a>
            {' '}under the Apache License.
          </p>
        </div>
      </div>
    </div>
  )
}