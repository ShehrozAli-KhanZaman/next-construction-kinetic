// src/components/Hero.js
// export default function Hero() {
//   return (
//     <section className="bg-gray-100 text-center py-16">
//       <h1 className="text-4xl font-bold text-blue-600">
//         Welcome to Construction Kinetics
//       </h1>
//       <p className="mt-4 text-gray-700">
//         Building the future, one project at a time.
//       </p>
//     </section>
//   )
// }
import Image from "next/image"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative text-white h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Background/bg1.jpg')" }}>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold space-y-2">
          <h1>Residential Building</h1>
          <h1>Construction</h1>
          <h1>Services</h1>
        </div>

        {/* Centered Logo */}
        <div className="my-8 flex justify-center">
          <Image
            src="/images/Logo/logoTransparent.png"
            alt="Logo"
            width={128}
            height={128}
            className="w-32 h-32"
          />
        </div>

        <h2 className="text-3xl font-bold text-purple-600">
          Construction Kinetics
        </h2>
      </div>
    </section>
  )
}

// export default function Hero() {
//   return (
//     <section
//       id="about"
//       className="text-white h-screen bg-black  text-center flex">
//       <h1 className="m-auto font-waterfall text-7xl text-purple-600 font-bold  ">
//         About
//       </h1>
//     </section>
//   )
// }

{
  /* <section id="blog" className=" text-white h-screen bg-purple-900 flex">
<h1 className="m-auto font-waterfall text-7xl text-white font-bold">
  Blog
</h1>
</section>
<section
id="contact"
className="text-white h-screen bg-black  text-center flex"
>
<h1 className="m-auto font-waterfall text-7xl text-purple-600 font-bold">
  Contact{' '}
</h1>
</section>
<section
id="projects"
className=" text-white h-screen bg-purple-900 flex"
>
<h1 className="m-auto font-waterfall text-7xl text-white font-bold">
  Projects
</h1>
</section> */
}
