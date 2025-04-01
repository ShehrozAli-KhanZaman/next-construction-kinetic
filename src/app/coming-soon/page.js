export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center bg-[url('/images/Background/coming-soon.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <h1 className="text-5xl font-bold">Coming Soon</h1>
        <p className="mt-3 text-lg text-gray-300">
          We are working on something amazing! Stay tuned.
        </p>
        <p className="mt-1 text-sm text-gray-400">Launching soon...</p>

        <div className="mt-6">
          <p className="text-gray-400">Stay updated:</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 px-4 py-2 rounded-md text-gray-900"
          />
          <button className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  )
}
