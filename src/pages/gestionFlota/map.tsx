import { useState } from "react";
import  MyGoogleMap from "@/components/map/googlemap";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Map() {

const vehiculos = [
  { id: "v1", nombre: "Camioneta Ford", lat: 4.60971, lng: -74.08175 },
  { id: "v2", nombre: "Toyota Hilux", lat: 6.25184, lng: -75.56359 },
  { id: "v3", nombre: "Chevrolet N300", lat: 10.96854, lng: -74.78132 },
];


  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(vehiculos[0]);


  const handleVehiculoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vehiculo = vehiculos.find(v => v.id === e.target.value);
    if (vehiculo) {
    setVehiculoSeleccionado(vehiculo);
    const puntos = generarRecorridoAleatorio(vehiculo);
    setRecorrido(puntos);
    animarRecorrido(puntos);
  }
  };

//Objetos unicamente usados para simular la ubicación de los vehículos
const [recorrido, setRecorrido] = useState<{ lat: number; lng: number }[]>([]);
const [puntoActual, setPuntoActual] = useState(vehiculos[0]);

function generarRecorridoAleatorio(vehiculo: { id: string; nombre: string; lat: number; lng: number },  
  cantidad: number = 20
): {  id: string; nombre: string; lat: number; lng: number  }[] {
  const puntos: { id: string; nombre: string; lat: number; lng: number  }[] = [];
  for (let i = 0; i < cantidad; i++) {
    const offsetLat = (Math.random() - 0.5) * 0.002;
    const offsetLng = (Math.random() - 0.5) * 0.002;
    puntos.push({
      id: vehiculo.id,
      nombre: vehiculo.nombre,
      lat: vehiculo.lat + offsetLat,
      lng: vehiculo.lng + offsetLng,
    });
  }
  return puntos;
}

const animarRecorrido = (puntos: { id: string; nombre: string; lat: number; lng: number }[]) => {
  let i = 0;
  const intervalo = setInterval(() => {
    if (i >= puntos.length) {
      clearInterval(intervalo);
      return;
    }
    setPuntoActual(puntos[i]);
    i++;
  }, 500); // 500ms entre puntos
};



  
  return (
    <div>
      <div className="flex justify-center items-center mb-8">
        <Card className="w-full max-w-3xl bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Welcome a Fleet Manager
            </CardTitle>
            <CardDescription className="text-white/80">
              Sistema de gestión de flota para optimizar sus operaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Utilice el menú lateral para navegar entre las diferentes secciones del sistema.
            </p>
            <div className="mt-4">
              <label className="block text-white font-semibold mb-1">Seleccione un vehículo:</label>
              <select
                value={vehiculoSeleccionado.id}
                onChange={handleVehiculoChange}
                className="text-black w-full p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#457B9D] focus:border-transparent"
              >
                {vehiculos.map((vehiculo) => (
                  <option key={vehiculo.id} value={vehiculo.id}>
                    {vehiculo.nombre}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
      <MyGoogleMap
        location={{ lat: vehiculoSeleccionado.lat, lng: vehiculoSeleccionado.lng }}
        vehicle={{id: vehiculoSeleccionado.id,nombre: vehiculoSeleccionado.nombre}} />
    </div>
  );
}