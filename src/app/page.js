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

      <SectionWrapper
        id="how-section"
        alt={true}
        animation="bounce"
        disableAnimations={true}
        bgImage="/images/Background/bg3.jpg">
        <How />
        {/* slideLeft */}
      </SectionWrapper>

      <HouseLayouts />

      <SectionWrapper
        id="construction-process"
        animation="bounce"
        bgImage="/images/Background/bg4.jpg"
        disableAnimations={true}>
        <ConstructionProcess />
        {/* slideLeft */}
      </SectionWrapper>

      <SectionWrapper id="grey-structure" alt={true} animation="slideRight">
        <GreyStructure />
        {/* slideLeft */}
      </SectionWrapper>

      <SectionWrapper
        id="finishing"
        animation="bounce"
        bgImage="/images/Background/bg6.jpg"
        disableAnimations={true}>
        <Finishing />
        {/* slideLeft */}
      </SectionWrapper>
      <CostCalculator />
      <SectionWrapper
        id="costing"
        alt={true}
        animation="bounce"
        bgImage="/images/Background/bg5.jpg">
        <Costing />
        {/* slideLeft */}
      </SectionWrapper>
    </>
  )
}
