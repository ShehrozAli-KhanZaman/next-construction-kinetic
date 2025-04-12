"use client"

import { useEffect } from "react"

export default function Background({ type = "GLOBE", color = 0x3f51b5 }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const vantaScript = document.createElement("script")
      vantaScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
      vantaScript.async = true
      document.body.appendChild(vantaScript)

      vantaScript.onload = () => {
        const effectScript = document.createElement("script")
        effectScript.src = `https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.${type.toLowerCase()}.min.js`
        effectScript.async = true
        document.body.appendChild(effectScript)

        effectScript.onload = () => {
          const effect = window.VANTA[type]({
            el: "#vanta-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x0,
            color: color,
            size: 1.0,
          })

          return () => {
            if (effect) effect.destroy()
          }
        }
      }
    }
  }, [type, color])

  return <div id="vanta-background" className="absolute inset-0 z-0" />
}
