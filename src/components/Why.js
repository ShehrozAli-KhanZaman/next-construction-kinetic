export default function Why() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gray-200 bg-[url('/images/Background/bg2.jpg')] bg-cover bg-center bg-no-repeat py-20"
      id="Why">
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl font-bold text-white">
          Why Construction Kinetics?
        </h2>
        <p className="mt-3 text-lg text-gray-200 max-w-2xl">
          Construc on Kine cs is a trusted name in the housing construc on
          industry, commi ed to delivering excellence through transparency,
          quality, and mely project execu on. Under the leadership of Mr. Farhan
          Ilyas, a dis nguished graduate of LUMS, the company has built a reputa
          on for priori zing client needs and requirements at every step. At
          Construc on Kine cs, we ensure that clients are fully onboarded and
          involved in all decisions and execu on phases, guaranteeing alignment
          with their expecta ons and budgets. With a professional team boas ng
          vast experience, we bring exper se and innova on to every project,
          crea ng homes that embody trust and excellence.
        </p>
      </div>
    </section>
  )
}
