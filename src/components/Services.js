export default function Services() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gray-200 bg-[url('/your-image.jpg')] bg-cover bg-center bg-no-repeat"
      id="services">
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl font-bold text-white">Our Services</h2>
        <p className="mt-3 text-lg text-gray-200 max-w-2xl">
          We provide top-notch construction solutions, ensuring high-quality
          craftsmanship and exceptional service for all our clients.
        </p>
      </div>
    </section>
  )
}
