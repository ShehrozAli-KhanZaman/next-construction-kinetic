import Hero from "../components/Hero"
import Services from "../components/Services"
import How from "../components/How"
import Projects from "../components/Projects"
import Why from "@/components/Why"
import ConstructionProcess from "@/components/ConstructionProcess"
import GreyStructure from "@/components/GreyStructure"
import Finishing from "@/components/Finishing"
import Costing from "@/components/Costing"
import CostCalculator from "@/components/CostCalculator"
import HouseLayouts from "@/components/HouseLayouts"
import SectionWrapper from "@/components/SectionWrapper"

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectionWrapper id="why-section" animation="bounce">
        <Why />
      </SectionWrapper>

      <SectionWrapper id="how-section" alt={true} animation="slideLeft">
        <How />
      </SectionWrapper>

      <HouseLayouts />

      <SectionWrapper
        id="construction-process"
        animation="slideUp"
        bgImage="/images/Background/bg2.jpg">
        <ConstructionProcess />
      </SectionWrapper>

      <SectionWrapper id="grey-structure" alt={true} animation="slideRight">
        <GreyStructure />
      </SectionWrapper>

      <SectionWrapper id="finishing" animation="scale">
        <Finishing />
      </SectionWrapper>

      <SectionWrapper id="costing" alt={true} animation="slideDown">
        <Costing />
      </SectionWrapper>

      <CostCalculator />
    </>
  )
}
