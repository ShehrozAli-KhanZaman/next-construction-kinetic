import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const textSections = [
  {
    id: "why",
    title: "Construction Kinetics",
    content:
      "Construction Kinetics is a trusted name in the housing construction industry, committed to delivering excellence through transparency, quality, and timely project execution. Under the leadership of Mr. Muhammad Farhan Ilyas, a distinguished graduate of LUMS, the company has built a reputation for prioritizing client needs and requirements at every step.\n\nAt Construction Kinetics, we ensure that clients are fully onboarded and involved in all decisions and execution phases, guaranteeing alignment with their expectations and budgets. With a professional team boasting vast experience, we bring expertise and innovation to every project, creating homes that embody trust and excellence.",
  },
  {
    id: "how",
    title: "How We Work",
    content:
      "1. Initial Consultation\nWe begin with a detailed discussion to understand your needs, preferences, and budget, ensuring that your vision is at the core of every decision.\n\n2. Concept Development\nOur team of experts collaborates to create innovative designs and practical solutions tailored to your requirements.\n\n3. Planning\n- Maps, Layouts, Working Drawings\n- Materials Selection\n- Costings\n- Timelines\n- Cashflows\n- Agreement\n- Execution",
  },
  {
    title: "Understanding the Construction Process",
    content:
      "Embarking on any construction project requires more than just a vision—it demands a clear understanding of the process and the steps ahead.\n\nProper planning helps anticipate challenges, align expectations, and ensure smooth execution. From initial design to final delivery, knowing each phase empowers you to make informed decisions, avoid delays, and optimize resources. At Construction Kinetics, we prioritize transparency and guide you every step of the way, turning your ideas into reality with confidence and precision.",
  },
  {
    id: "grey-structure",
    title: "Grey Structure",
    content:
      "The grey structure construction of a house is the most critical phase of the building process, as it establishes the structural integrity and durability of the entire project. This stage includes the construction of the foundation, walls, columns, beams, slabs, staircases, and the roof, using high-quality materials such as reinforced concrete, bricks, and cement.\n\nThe process begins with detailed planning, site preparation, and excavation, followed by laying the foundation with precision to ensure load distribution and stability. Walls are erected using standard brick masonry, ensuring proper alignment, plumb, and bonding, while reinforced concrete is used to construct columns, beams, and slabs for structural strength.\n\nRough plastering is applied to the walls to protect against environmental factors and prepare surfaces for future finishes. Proper curing is performed throughout to prevent cracking and ensure long-term durability.\n\nAttention to engineering standards, quality control, and skilled execution during this phase ensures the structure’s resilience and creates a strong framework for all subsequent construction and finishing activities.",
  },
  {
    id: "finishing",
    title: "Finishing",
    content:
      "The finishing phase of house construction is a highly meticulous process that transforms the grey structure into a functional, aesthetically refined, and habitable space.\n\nThis stage encompasses a wide range of intricate tasks, including detailed plastering, precise flooring installation, painting, and the installation of fixtures and fittings. Smooth plastering and surface leveling prepare walls and ceilings for final treatments, ensuring a flawless foundation for paint, wallpaper, or textured finishes.\n\nPremium flooring materials such as marble, granite, tiles, or hardwood are installed with precision, enhancing both durability and visual appeal. Electrical and plumbing systems are completed with the integration of high-quality fixtures, including switches, outlets, lighting systems, and sanitary ware.\n\nDoors, windows, and cabinetry are installed with a focus on alignment, durability, and aesthetic coherence. Final touches such as decorative moldings, skirting, and customized finishes bring a cohesive and elegant look to the interiors.\n\nThis phase demands exceptional craftsmanship, adherence to design specifications, and the use of superior materials to ensure a seamless blend of form and function, delivering a space that is not only beautiful but also enduring and efficient.",
  },
  {
    title: "Quality Assurance & Handover",
    content:
      "Before final delivery, we conduct rigorous quality checks to ensure everything meets our high standards and your satisfaction.",
  },
]
export const steps = {
  grey: [
    "Foundation Digging",
    "DPC Level and foundation filling",
    "Brick Work & Door Frames",
    "Slab Pouring",
    "Electric and Plumbing Works",
    "Safety grills & Main Gate",
    "Plaster",
    "Moulding Design Work",
  ],
  finishing: [
    "False Ceiling",
    "Floor Tiles / Marble",
    "Washroom Tiles Marble",
    "Interior Moulding / Design Work",
    "Elevation Tiles",
    "Lights Installations",
    "Wardrobes",
    "Doors",
    "Kitchen cabinets and accessories",
    "Exterior Paint / Rock Shield",
    "Paint & Polish",
  ],
}
