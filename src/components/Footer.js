"use client" // Ensure this runs only on the client

import { useState, useEffect } from "react"

export default function Footer() {
  //   const [year, setYear] = useState("")

  //   useEffect(() => {
  //     setYear(new Date().getFullYear())
  //   }, [])

  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-4">
      <p>&copy; Construction Kinetics. All rights reserved.</p>
    </footer>
  )
}
