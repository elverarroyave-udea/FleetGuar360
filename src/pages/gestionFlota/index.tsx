"use client"

import { useState } from "react"
import  MyGoogleMap  from "@/components/map/googlemap"
import Map from "./map"
import { Dashboard } from "@/components/dashboard/dashboard"
import { FleetManagementDashboard } from "@/components/tablaFlotas/fleet-managment-dashboar"
import { MainLayout } from "@/components/tablaFlotas/main-laout"

export default function Home() {
  const [activeView, setActiveView] = useState<"dashboard" | "fleet" | "map">("map")

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "fleet":
        return <FleetManagementDashboard />
      case "map":
        return <Map />        
      default:
        // Manejo de caso por defecto si la vista no es reconocida
        // Esto puede ser útil para evitar errores si se agrega una nueva vista
        // y se olvida de manejarla aquí. 
        console.error("Vista no encontrada:", activeView)
        return <div>Vista no encontrada</div>
    }
  }

  return (
    <MainLayout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </MainLayout>
  )
}