import { useEffect } from 'react';
import { useAuth } from '@/context/auth/use-auth';
import { useUser } from '@/hooks/user-hooks';
import { AppleMaps } from 'expo-maps';
import { useQuery } from '@tanstack/react-query';


export default function TabTwoScreen() {
  const auth = useAuth();
  const { handleCoords } = useUser();
  const defaultCoords = {
    longitude: -98.5795, 
    latitude: 39.8283
  };
  const longitude = auth?.userAuth?.geoLocation?.coordinates[0] ?? defaultCoords.longitude;
  const latitude = auth?.userAuth?.geoLocation?.coordinates[1] ?? defaultCoords.latitude;
  const coords = auth?.userAuth?.geoLocation?.coordinates;

  console.log("Coords: ", coords);
  console.log("Auth: ", auth?.userAuth)
  
  useEffect(() => {
    if(!Array.isArray(coords) || coords.length !== 2) {
      handleCoords();
    }
  }, [])


  return <AppleMaps.View 
  style={{ flex: 1 }}
  cameraPosition={{
    coordinates: { longitude, latitude },
    zoom: 13,
  }}
  />
}

 {/* User Marker */}
 //<AppleMaps.Marker
//  coordinates={{ longitude: lng, latitude: lat }}
//  title="You"
//  subtitle="Your location"
// />

// {/* Nearby Barbers */}
// {barbers.map((barber, i) => (
//  <AppleMaps.Marker
//    key={i}
//    coordinates={{
//      longitude: barber.geoLocation.coordinates[0],
//      latitude: barber.geoLocation.coordinates[1],
//    }}
//    title={barber.name}
//    subtitle="Barber nearby"
//  />
// ))}