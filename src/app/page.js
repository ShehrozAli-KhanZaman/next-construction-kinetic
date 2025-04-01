import Hero from "../components/Hero"
import Services from "../components/Services"
import How from "../components/How"
import Projects from "../components/Projects"
import Why from "@/components/Why"
import ConstructionProcess from "@/components/ConstructionProcess"
import GreyStructure from "@/components/GreyStructure"
import Finishing from "@/components/Finishing"
import Costing from "@/components/Costing"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Why />
      <How />
      <ConstructionProcess />
      <GreyStructure />
      <Finishing />
      <Costing />
      {/* <Services />
      <Projects /> */}
    </>
  )
}
