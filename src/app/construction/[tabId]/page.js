"use client"
import { useRouter } from "next/navigation"

const tabDetails = {
  why: {
    title: "Why Construction Kinetics?",
    content:
      "Full details about why construction kinetics is a great choice...",
  },
  how: {
    title: "How We Work",
    content:
      "We work by understanding your needs and creating custom solutions...",
  },
  "grey-structure": {
    title: "Grey Structure",
    content:
      "Our grey structure process covers foundation, roofing, and blockwork...",
  },
  finishing: {
    title: "Finishing",
    content:
      "We provide high-quality electrical, plumbing, and interior woodworks...",
  },
}

export default function TabDetail({ params }) {
  const { tabId } = params // Get the tabId from params

  const tab = tabDetails[tabId]

  if (!tab) {
    return <div>Tab not found</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white text-black rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{tab.title}</h1>
      <p>{tab.content}</p>
    </div>
  )
}
