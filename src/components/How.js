export default function How() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-no-repeat py-20"
      id="How">
      {/* Dark Overlay for Better Readability */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <h2 className="text-4xl font-bold text-white">How We Work</h2>

        {/* Introduction Paragraph */}
        <p className="mt-3 text-lg text-gray-200 max-w-2xl">
          Construction Kinetics ensures a transparent and client-focused
          approach to every project, prioritizing quality and timely execution.
          Our process is designed to keep you involved and informed at every
          step.
        </p>

        {/* Steps Section */}
        <div className="mt-8 max-w-3xl text-left text-gray-200">
          <h3 className="text-2xl font-semibold text-white">
            1. Initial Consultation
          </h3>
          <p className="mb-4">
            We begin with a detailed discussion to understand your needs,
            preferences, and budget, ensuring that your vision is at the core of
            every decision.
          </p>

          <h3 className="text-2xl font-semibold text-white">
            2. Concept Development
          </h3>
          <p className="mb-4">
            Our team of experts collaborates to create innovative designs and
            practical solutions tailored to your requirements.
          </p>

          <h3 className="text-2xl font-semibold text-white">3. Planning</h3>
          <ul className="list-disc list-inside text-gray-300">
            <li>Maps, Layouts, Working Drawings</li>
            <li>Materials Selection</li>
            <li>Costings</li>
            <li>Timelines</li>
            <li>Cashflows</li>
            <li>Agreement</li>
            <li>Execution</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
