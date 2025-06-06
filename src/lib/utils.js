import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import {
  ShieldCheck,
  Workflow,
  Building2,
  Paintbrush2,
  Clock,
  DollarSign,
} from "lucide-react"
import {
  Hammer,
  Ruler,
  ToyBrick,
  Building,
  Plug,
  Lightbulb,
  Layers3,
  Droplets,
  Paintbrush,
  Sofa,
  DoorOpen,
  ShowerHead,
  Fan,
  CheckCircle,
} from "lucide-react"

export const steps = {
  grey: [
    { title: "Foundation Digging", icon: Hammer },
    { title: "DPC Level and foundation filling", icon: Ruler },
    { title: "Brick Work & Door Frames", icon: ToyBrick },
    { title: "Slab Pouring", icon: Building },
    { title: "Electric and Plumbing Works", icon: Plug },
    { title: "Safety grills & Main Gate", icon: CheckCircle },
    { title: "Plaster", icon: Paintbrush },
    { title: "Moulding Design Work", icon: Layers3 },
  ],
  finishing: [
    { title: "False Ceiling", icon: Layers3 },
    { title: "Floor Tiles / Marble", icon: Ruler },
    // { title: "Washroom Tiles Marble", icon: ShowerHead },
    { title: "Interior Moulding / Design Work", icon: Layers3 },
    // { title: "Elevation Tiles", icon: ToyBrick },
    { title: "Lights Installations", icon: Lightbulb },
    { title: "Doors & Wardrobes", icon: Sofa },
    // { title: "Doors", icon: DoorOpen },
    { title: "Kitchen cabinets and accessories", icon: Droplets },
    { title: "Exterior Paint / Rock Shield", icon: Paintbrush },
    { title: "Paint & Polish", icon: Paintbrush },
  ],
}

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const textSections = [
  {
    id: "duration",
    title: "How Long Will It Take",
    description: {
      headers: ["", "Gray Structure", "Finishing"],
      rows: [
        ["5 Marla", "10 weeks", "12 weeks"],
        ["10 Marla", "16 weeks", "20 weeks"],
        ["1 Kanal", "18 weeks", "24 weeks"],
      ],
    },
    image: "/images/Background/bg1.jpg",
    icon: Clock,
    lotti: "/animations/howWork.json",
  },
  {
    id: "cost",
    title: "What Will Be The Cost",
    description: {
      rates: {
        grayStructure: [
          ["DHA", "Rs 3150/sqft"],
          ["LDA", "Rs 2650/sqft"],
          ["Bahria Town", "Rs 2700/sqft"],
        ],
        finishing: [
          ["Basic", "Rs 2200/sqft"],
          ["Standard", "Rs 2500/sqft"],
          ["Premium", "Rs 3200/sqft"],
        ],
      },
      note: "Details for all work i.e. ceiling, flooring, wood work, electric, windows and glasses, paint polish, electronics and appliances can be shared on request",
    },
    image: "/images/Background/bg4.jpg",
    icon: DollarSign,
    lotti: "/animations/how1.json",
  },
  {
    id: "grey",
    title: "Grey Structure",
    image: "/images/Background/bg7.jpg",
    icon: Building2,
    lotti: "/animations/mobbuild.json",
    description:
      "The grey structure construction of a house is the most critical phase of the building process, as it establishes the structural integrity and durability of the entire project. This stage includes the construction of the foundation, walls, columns, beams, slabs, staircases, and the roof, using high-quality materials such as reinforced concrete, bricks, and cement.\n\nThe process begins with detailed planning, site preparation, and excavation, followed by laying the foundation with precision to ensure load distribution and stability. Walls are erected using standard brick masonry, ensuring proper alignment, plumb, and bonding, while reinforced concrete is used to construct columns, beams, and slabs for structural strength.\n\nRough plastering is applied to the walls to protect against environmental factors and prepare surfaces for future finishes. Proper curing is performed throughout to prevent cracking and ensure long-term durability.\n\nAttention to engineering standards, quality control, and skilled execution during this phase ensures the structure’s resilience and creates a strong framework for all subsequent construction and finishing activities.",
  },
  {
    id: "finishing",
    title: "Finishing",
    image: "/images/Background/bg5.jpg",
    icon: Paintbrush2,
    lotti: "/animations/buildings.json",
    description:
      "The finishing phase of house construction is a highly meticulous process that transforms the grey structure into a functional, aesthetically refined, and habitable space.\n\nThis stage encompasses a wide range of intricate tasks, including detailed plastering, precise flooring installation, painting, and the installation of fixtures and fittings. Smooth plastering and surface leveling prepare walls and ceilings for final treatments, ensuring a flawless foundation for paint, wallpaper, or textured finishes.\n\nPremium flooring materials such as marble, granite, tiles, or hardwood are installed with precision, enhancing both durability and visual appeal. Electrical and plumbing systems are completed with the integration of high-quality fixtures, including switches, outlets, lighting systems, and sanitary ware.\n\nDoors, windows, and cabinetry are installed with a focus on alignment, durability, and aesthetic coherence. Final touches such as decorative moldings, skirting, and customized finishes bring a cohesive and elegant look to the interiors.\n\nThis phase demands exceptional craftsmanship, adherence to design specifications, and the use of superior materials to ensure a seamless blend of form and function, delivering a space that is not only beautiful but also enduring and efficient.",
  },
]

export const layouts = [
  {
    id: 1,
    size: "5 Marla",
    title: "5 Marla Classic Design",
    description: "Traditional 5 marla house layout with family-oriented spaces",
    image: "/images/layouts/5marla.jpg",
    pdf: "/pdfs/5marla.pdf",
    features: [
      "3 Bedrooms",
      "2 Bathrooms",
      "Kitchen with Dining",
      "Drawing Room",
      "Small Courtyard",
    ],
    imagesDHAPdf: [
      "/images/Maps/FiveMarla/DHA/p1.pdf",
      "/images/Maps/FiveMarla/DHA/p2.pdf",
      "/images/Maps/FiveMarla/DHA/p3.pdf",
      "/images/Maps/FiveMarla/DHA/p4.pdf",
      "/images/Maps/FiveMarla/DHA/p5.pdf",
    ],
    imagesLDAPdf: ["/images/Maps/FiveMarla/DHA/p1.pdf"],
  },
  {
    id: 2,
    size: "10 Marla",
    title: "10 Marla Luxury Villa",
    description: "Luxurious 10 marla villa design with premium finishes",
    image: "/images/layouts/10marla.jpg",
    pdf: "/pdfs/10marla.pdf",
    features: [
      "4 Bedrooms",
      "3 Bathrooms",
      "Modern Kitchen",
      "Drawing Room",
      "Dining Area",
      "Garden",
      "Car Parking",
    ],
    imagesDHAPdf: [
      "/images/Maps/TenMarla/DHA/p1.pdf",
      "/images/Maps/TenMarla/DHA/p2.pdf",
      "/images/Maps/TenMarla/DHA/p3.pdf",
      "/images/Maps/TenMarla/DHA/p4.pdf",
      "/images/Maps/TenMarla/DHA/p5.pdf",
      "/images/Maps/TenMarla/DHA/p6.pdf",
    ],
    imagesLDAPdf: [
      "/images/Maps/TenMarla/LDA/p1.pdf",
      "/images/Maps/TenMarla/LDA/p2.pdf",
      "/images/Maps/TenMarla/LDA/p3.pdf",
      "/images/Maps/TenMarla/LDA/p4.pdf",
      "/images/Maps/TenMarla/LDA/p5.pdf",
      "/images/Maps/TenMarla/LDA/p6.pdf",
      "/images/Maps/TenMarla/LDA/p7.pdf",
      "/images/Maps/TenMarla/LDA/p8.pdf",
      "/images/Maps/TenMarla/LDA/p9.pdf",
      "/images/Maps/TenMarla/LDA/p10.pdf",
    ],
  },
  {
    id: 3,
    size: "1 Kanal",
    title: "1 Kanal Modern Design",
    description: "Luxurious 1 kanal villa design with premium finishes",
    image: "/images/layouts/3marla.jpg",
    pdf: "/pdfs/3marla.pdf",
    features: [
      "6 Bedrooms",
      "5 Bathrooms",
      "Modern Kitchen",
      "Drawing Room",
      "Dining Area",
      "Garden",
      "Car Parking",
    ],
    imagesDHAPdf: [
      "/images/Maps/Kanal/DHA/p1.pdf",
      "/images/Maps/Kanal/DHA/p2.pdf",
      "/images/Maps/Kanal/DHA/p3.pdf",
      "/images/Maps/Kanal/DHA/p4.pdf",
      "/images/Maps/Kanal/DHA/p5.pdf",
      "/images/Maps/Kanal/DHA/p6.pdf",
    ],
    imagesLDAPdf: [
      "/images/Maps/Kanal/LDA/p1.pdf",
      "/images/Maps/Kanal/LDA/p2.pdf",
      "/images/Maps/Kanal/LDA/p3.pdf",
      "/images/Maps/Kanal/LDA/p4.pdf",
      "/images/Maps/Kanal/LDA/p5.pdf",
      "/images/Maps/Kanal/LDA/p6.pdf",
      "/images/Maps/Kanal/LDA/p7.pdf",
    ],
  },
]

export const dubaiProjects = [
  {
    name: "Sobha One",
    description:
      "Luxury waterfront residences in the heart of Dubai with panoramic skyline views.",
    image: [
      "/images/Background/bg1.jpg",
      "/images/Background/bg2.jpg",
      "/images/Background/bg3.jpg",
    ],
    bedroomRange: "1, 1.5, 2, 3 and 3.5 Bedroom Apartments",
    location: "Sobha Hartland II, MBR City",
    priceRange: {
      from: "AED 1.64 M* | INR 3.8 CR* | USD 450 K*",
      to: "AED 4.53 M* | INR 10.5 CR* | USD 1.24 M*",
    },
    areaRange: {
      from: "625.6 Sq. Ft. | 58.12 Sq. M.",
      to: "1600.1 Sq. Ft. | 148.65 Sq. M.",
    },
    handoverDate: "March 2029",
    tag: "NEW",
  },
  {
    name: "Hartland Waves",
    description:
      "Contemporary waterfront living with direct access to Dubai's top landmarks.",
    image: ["/images/Background/bg1.jpg"],
    bedroomRange: "1 and 2 Bedroom Apartments",
    location: "Sobha Hartland II, MBR City",
    priceRange: {
      from: "AED 1.50 M* | INR 3.2 CR*",
      to: "AED 3.50 M* | INR 8 CR*",
    },
    areaRange: {
      from: "550.0 Sq. Ft. | 51.1 Sq. M.",
      to: "1400.0 Sq. Ft. | 130.0 Sq. M.",
    },
    handoverDate: "December 2028",
    tag: "OFFER",
  },
  {
    name: "Sobha One",
    description:
      "Luxury waterfront residences in the heart of Dubai with panoramic skyline views.",
    image: [
      "/images/Background/bg7.jpg",
      "/images/Background/bg6.jpg",
      "/images/Background/bg5.jpg",
    ],
    bedroomRange: "1, 1.5, 2, 3 and 3.5 Bedroom Apartments",
    location: "Sobha Hartland II, MBR City",
    priceRange: {
      from: "AED 1.64 M* | INR 3.8 CR* | USD 450 K*",
      to: "AED 4.53 M* | INR 10.5 CR* | USD 1.24 M*",
    },
    areaRange: {
      from: "625.6 Sq. Ft. | 58.12 Sq. M.",
      to: "1600.1 Sq. Ft. | 148.65 Sq. M.",
    },
    handoverDate: "March 2029",
    tag: "NEW",
  },
  {
    name: "Sobha One",
    description:
      "Luxury waterfront residences in the heart of Dubai with panoramic skyline views.",
    image: [
      "/images/Background/bg1.jpg",
      "/images/Background/bg2.jpg",
      "/images/Background/bg3.jpg",
    ],
    bedroomRange: "1, 1.5, 2, 3 and 3.5 Bedroom Apartments",
    location: "Sobha Hartland II, MBR City",
    priceRange: {
      from: "AED 1.64 M* | INR 3.8 CR* | USD 450 K*",
      to: "AED 4.53 M* | INR 10.5 CR* | USD 1.24 M*",
    },
    areaRange: {
      from: "625.6 Sq. Ft. | 58.12 Sq. M.",
      to: "1600.1 Sq. Ft. | 148.65 Sq. M.",
    },
    handoverDate: "March 2029",
    tag: "NEW",
  },
  {
    name: "Hartland Waves",
    description:
      "Contemporary waterfront living with direct access to Dubai's top landmarks.",
    image: ["/images/Background/bg1.jpg"],
    bedroomRange: "1 and 2 Bedroom Apartments",
    location: "Sobha Hartland II, MBR City",
    priceRange: {
      from: "AED 1.50 M* | INR 3.2 CR*",
      to: "AED 3.50 M* | INR 8 CR*",
    },
    areaRange: {
      from: "550.0 Sq. Ft. | 51.1 Sq. M.",
      to: "1400.0 Sq. Ft. | 130.0 Sq. M.",
    },
    handoverDate: "December 2028",
    tag: "OFFER",
  },
  {
    name: "Sobha One",
    description:
      "Luxury waterfront residences in the heart of Dubai with panoramic skyline views.",
    image: [
      "/images/Background/bg7.jpg",
      "/images/Background/bg6.jpg",
      "/images/Background/bg5.jpg",
    ],
    bedroomRange: "1, 1.5, 2, 3 and 3.5 Bedroom Apartments",
    location: "Sobha Hartland II, MBR City",
    priceRange: {
      from: "AED 1.64 M* | INR 3.8 CR* | USD 450 K*",
      to: "AED 4.53 M* | INR 10.5 CR* | USD 1.24 M*",
    },
    areaRange: {
      from: "625.6 Sq. Ft. | 58.12 Sq. M.",
      to: "1600.1 Sq. Ft. | 148.65 Sq. M.",
    },
    handoverDate: "March 2029",
    tag: "NEW",
  },
]
