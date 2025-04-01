export default function GreyStructure() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gray-200 bg-[url('/images/Background/bg7.jpg')] bg-cover bg-center bg-no-repeat py-40"
      id="grey-structure">
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-3xl">
        <h2 className="text-4xl font-bold text-white">Grey Structure</h2>

        {/* Contact Details */}
        <p className="mt-2 text-lg text-gray-300">
          <a href="tel:+923204300002" className="hover:text-gray-400">
            Construction Kinetics: 0320 430 0002
          </a>
        </p>
        <p className="text-lg text-gray-300">
          <a
            href="https://realtormfi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400">
            RealtorMfi.com
          </a>
        </p>

        {/* Description */}
        <p className="mt-4 text-gray-300">
          The grey structure construction of a house is the most critical phase
          of the building process, as it establishes the structural integrity
          and durability of the entire project. This stage includes the
          construction of the foundation, walls, columns, beams, slabs,
          staircases, and the roof, using high-quality materials such as
          reinforced concrete, bricks, and cement.
        </p>

        <p className="mt-4 text-gray-300">
          The process begins with detailed planning, site preparation, and
          excavation, followed by laying the foundation with precision to ensure
          load distribution and stability. Walls are erected using standard
          brick masonry, ensuring proper alignment, plumb, and bonding, while
          reinforced concrete is used to construct columns, beams, and slabs for
          structural strength.
        </p>

        <p className="mt-4 text-gray-300">
          Rough plastering is applied to the walls to protect against
          environmental factors and prepare surfaces for future finishes. Proper
          curing is performed throughout to prevent cracking and ensure
          long-term durability. Attention to engineering standards, quality
          control, and skilled execution during this phase ensures the
          structure’s resilience and creates a strong framework for all
          subsequent construction and finishing activities.
        </p>

        {/* Process Steps */}
        <div className="mt-8 text-left text-gray-300">
          <h3 className="text-2xl font-semibold text-white">
            Construction Steps:
          </h3>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>Foundation Digging</li>
            <li>DPC Level and Foundation Filling</li>
            <li>Brick Work & Door Frames</li>
            <li>Slab Pouring</li>
            <li>Electric and Plumbing Works</li>
            <li>Safety Grills & Main Gate</li>
            <li>Plaster</li>
            <li>Moulding Design Work</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
