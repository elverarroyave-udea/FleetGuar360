import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LoadScript } from "@react-google-maps/api";

const fleetData = [
  {
    id: "001",
    plate: "ABC-123",
    model: "Toyota Hilux 2022",
    driver: "Juan Pérez",
    status: "Activo",
    capacity: "1 tonelada",
  },
  {
    id: "002",
    plate: "XYZ-456",
    model: "Ford Ranger 2021",
    driver: "María López",
    status: "En mantenimiento",
    capacity: "1.5 toneladas",
  },
  {
    id: "003",
    plate: "DEF-789",
    model: "Chevrolet S10 2023",
    driver: "Carlos Rodríguez",
    status: "Inactivo",
    capacity: "2 toneladas",
  },
  {
    id: "004",
    plate: "GHI-012",
    model: "Nissan Frontier 2022",
    driver: "Ana Martínez",
    status: "Activo",
    capacity: "1.2 toneladas",
  },
  {
    id: "005",
    plate: "JKL-345",
    model: "Mitsubishi L200 2021",
    driver: "Roberto Sánchez",
    status: "Activo",
    capacity: "2.5 toneladas",
  },
]

export default function App({ Component, pageProps }: AppProps) {
  return <LoadScript googleMapsApiKey="AIzaSyB3onHLCwZh-KqYWzPXIWurWTYVhsUsu0E">
  <Component {...pageProps} />;
  </LoadScript>
}
