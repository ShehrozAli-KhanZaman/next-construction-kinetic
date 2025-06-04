"use client"

import { useWindowSize } from "react-use"
import MobileHouseLayouts from "./ui/MobileHouseLayouts"
import DesktopHouseLayouts from "./ui/DesktopHouseLayouts"

const HouseLayouts = () => {
  const { width } = useWindowSize()
  const isMobile = width <= 640

  return isMobile ? <MobileHouseLayouts /> : <DesktopHouseLayouts />
}

export default HouseLayouts
