"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message sent successfully!")
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 py-12">
      <div className="max-w-3xl w-full text-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/Logo/LogoTransparent.png"
            alt="Construction Kinetics"
            width={100}
            height={100}
            className="mx-auto rounded-lg shadow-lg"
          />
        </Link>

        <h2 className="text-4xl font-bold mt-6">Contact Us</h2>
        <p className="text-gray-400 mt-2">
          Have a question? Feel free to reach out to us.
        </p>

        {/* Contact Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
            onChange={handleChange}></textarea>
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-bold">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 space-y-3">
          <a
            href="tel:+923204300002"
            className="block text-lg hover:text-gray-400">
            📞 +92 320 430 0002
          </a>
          <a
            href="https://realtormfi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg hover:text-gray-400">
            🌍 RealtorMfi.com
          </a>
        </div>

        {/* Optional: Google Map */}
        <div className="mt-8">
          <iframe
            className="w-full h-64 rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509325!2d144.96305761531656!3d-37.81627917975162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f2a5d1%3A0x15d1a5e67f5e5e35!2sConstruction%20Kinetics!5e0!3m2!1sen!2sus!4v1617939787831!5m2!1sen!2sus"
            loading="lazy"></iframe>
        </div>
      </div>
    </section>
  )
}
