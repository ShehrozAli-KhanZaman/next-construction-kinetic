export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center"
      id="notFound">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-400">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white">
        Go Back Home
      </button>
    </div>
  )
}
