import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoadScript } from '@react-google-maps/api'

export const Index = () => {
  <LoadScript googleMapsApiKey="AIzaSyB3onHLCwZh-KqYWzPXIWurWTYVhsUsu0E">
    {/* Aquí puedes agregar tu componente de mapa o cualquier otro componente que necesite el script de Google Maps */}
    {/* <MyGoogleMap /> */}
  </LoadScript>
  const router = useRouter()

  useEffect(() => {
    router.replace('/login')
  }, [router])
  return null
}

export default Index;