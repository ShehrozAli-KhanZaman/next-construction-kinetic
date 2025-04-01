export default function ConstructionProcess() {
  return (
    <section
      className="relative min-h-[60vh] flex flex-col items-center justify-center text-center bg-gray-200 bg-[url('/images/Background/bg4.jpg')] bg-cover bg-center bg-no-repeat min-h-[650px]"
      id="construction-process">
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-3xl">
        <h2 className="text-4xl font-bold text-white">
          Understanding the Construction Process
        </h2>
        <p className="mt-3 text-lg text-gray-200">
          Embarking on any construction project requires more than just a
          vision—it demands a clear understanding of the process and the steps
          ahead.
        </p>
        <p className="mt-3 text-gray-300">
          Proper planning helps anticipate challenges, align expectations, and
          ensure smooth execution. From initial design to final delivery,
          knowing each phase empowers you to make informed decisions, avoid
          delays, and optimize resources.
        </p>
        <p className="mt-3 text-gray-300">
          At Construction Kinetics, we prioritize transparency and guide you
          every step of the way, turning your ideas into reality with confidence
          and precision.
        </p>
      </div>
    </section>
  )
}
