import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { useRef, useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

type vehicledata = {
  id: string;
  nombre: string;
};

type vehiclelocation = {
  lat: number;
  lng: number;
};

type MyGoogleMapProps = {
  location: vehiclelocation;
  vehicle: vehicledata;
};

function MyGoogleMap({ vehicle, location }: MyGoogleMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [puntos, setPuntos] = useState<vehiclelocation[]>([]);
  const [posicionActual, setPosicionActual] = useState<vehiclelocation>(location);

  // Al cargar el mapa
  const handleOnLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleOnUnmount = () => {
    mapRef.current = null;
  };

  // Generar ruta aleatoria cerca de la ubicación base
  const generarRecorrido = (inicio: vehiclelocation, cantidad = 2): vehiclelocation[] => {
    const recorrido: vehiclelocation[] = [];
    for (let i = 0; i < cantidad; i++) {
      const offsetLat = (Math.random() - 0.5) * 0.0002;
      const offsetLng = (Math.random() - 0.5) * 0.0002
      recorrido.push({
        lat: inicio.lat + offsetLat,
        lng: inicio.lng + offsetLng,
      });
    }
    return recorrido;
  };

  // Animar recorrido punto por punto
  const iniciarAnimacion = (rutas: vehiclelocation[]) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= rutas.length) {
        clearInterval(interval);
        return;
      }
      setPosicionActual(rutas[i]);
      i++;
    }, 500); // cambia cada 500ms
  };

  // Cada vez que cambia el vehículo
  useEffect(() => {
    const nuevosPuntos = generarRecorrido(location);
    setPuntos(nuevosPuntos);
    iniciarAnimacion(nuevosPuntos);
  }, [vehicle]);

  // Mover el mapa al centro actual
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(posicionActual);
      mapRef.current.setZoom(20);
    }
  }, [posicionActual]);

  return (
    <GoogleMap
      id="example-map"
      mapTypeId="roadmap"
      options={{ disableDefaultUI: true, zoomControl: true }}
      mapContainerStyle={containerStyle}
      center={posicionActual}
      onLoad={handleOnLoad}
      onUnmount={handleOnUnmount}
      zoom={20}
    >
      <Marker
        position={posicionActual}
        label={{
          text: vehicle.nombre,
          color: 'black',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        icon={{
          url: '/car-icon.png',
          scaledSize: new window.google.maps.Size(80, 80),
          labelOrigin: new window.google.maps.Point(30, -10),
        }}
      />

      {/* Línea del recorrido */}
      {puntos.length > 1 && (
        <Polyline
          path={[location, ...puntos]}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 0.7,
            strokeWeight: 3,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default MyGoogleMap;
