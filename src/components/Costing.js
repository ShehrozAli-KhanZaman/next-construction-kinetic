export default function Costing() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gray-200 bg-[url('/images/Background/bg5.jpg')] bg-cover bg-center bg-no-repeat"
      id="costing">
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-3xl">
        <h2 className="text-4xl font-bold text-white">Costing</h2>

        {/* Grey Structure Cost */}
        <div className="mt-6 bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-gray-300 w-full">
          <h3 className="text-2xl font-semibold text-white">
            Grey Structure Cost
          </h3>
          <p className="mt-2">
            As per DHA By-laws, the estimated cost for the grey structure starts
            from
            <span className="font-bold text-white"> Rs. 3000/- Per SqFt</span>.
          </p>
          <p className="mt-2">
            The exact costing will be finalized after reviewing the site and
            details of drawings.
          </p>
        </div>

        {/* Finishing Cost */}
        <div className="mt-6 bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-gray-300 w-full">
          <h3 className="text-2xl font-semibold text-white">Finishing Cost</h3>
          <p className="mt-2">
            The estimated cost for finishing starts from
            <span className="font-bold text-white"> Rs. 3000/- Per SqFt</span>.
          </p>
          <p className="mt-2">
            The exact/actual costing of finishing will be finalized based on the
            selection of materials and services required (design, execution, and
            all related aspects).
          </p>
        </div>
      </div>
    </section>
  )
}
