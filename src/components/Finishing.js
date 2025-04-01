export default function Finishing() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gray-200 bg-[url('/images/Background/bg6.jpg')] bg-cover bg-center bg-no-repeat py-40"
      id="finishing">
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-3xl">
        <h2 className="text-4xl font-bold text-white">Finishing</h2>

        {/* Description */}
        <p className="mt-4 text-gray-300">
          The finishing phase of house construction is a meticulous process that
          transforms the grey structure into a functional, aesthetically
          refined, and habitable space.
        </p>
        <p className="mt-4 text-gray-300">
          This stage includes detailed plastering, precise flooring
          installation, painting, and the addition of fixtures and fittings.
          Smooth plastering and surface leveling prepare walls and ceilings for
          final treatments, ensuring a flawless foundation for paint, wallpaper,
          or textured finishes.
        </p>
        <p className="mt-4 text-gray-300">
          Premium flooring materials such as marble, granite, tiles, or hardwood
          are installed with precision, enhancing both durability and visual
          appeal. Electrical and plumbing systems are completed with
          high-quality fixtures, including switches, outlets, lighting systems,
          and sanitary ware.
        </p>
        <p className="mt-4 text-gray-300">
          Doors, windows, and cabinetry are installed with a focus on alignment,
          durability, and aesthetic coherence. Decorative moldings, skirting,
          and customized finishes bring a cohesive and elegant look to the
          interiors. This phase demands exceptional craftsmanship, adherence to
          design specifications, and superior materials to ensure a seamless
          blend of form and function, delivering a space that is both beautiful
          and efficient.
        </p>

        {/* Process Steps */}
        <div className="mt-8 text-left text-gray-300">
          <h3 className="text-2xl font-semibold text-white">
            Key Finishing Steps:
          </h3>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>False Ceiling</li>
            <li>Floor Tiles / Marble</li>
            <li>Washroom Tiles / Marble</li>
            <li>Interior Moulding / Design Work</li>
            <li>Elevation Tiles</li>
            <li>Lights Installations</li>
            <li>Wardrobes</li>
            <li>Doors</li>
            <li>Kitchen Cabinets and Accessories</li>
            <li>Exterior Paint / Rock Shield</li>
            <li>Paint & Polish</li>
          </ul>
        </div>

        {/* Quality Assurance */}
        <div className="mt-8 text-gray-300 text-center">
          <h3 className="text-2xl font-semibold text-white">
            Quality Assurance & Handover
          </h3>
          <p className="mt-3">
            Before final delivery, we conduct rigorous quality checks to ensure
            everything meets our high standards and your satisfaction.
          </p>
        </div>
      </div>
    </section>
  )
}
