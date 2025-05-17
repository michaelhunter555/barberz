import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, useColorScheme, View } from 'react-native';
import useAuth from '@/context/auth/use-auth';
import { useUser } from '@/hooks/user-hooks';
import { AppleMaps } from 'expo-maps';
import { useQuery } from '@tanstack/react-query';
import { IOSbarbers } from '@/lib/dummyMarkers';
import { StyledView, StyledBlurView, StyleText, getBlurType, getIntensity } from '@/components/shared/SharedStyles';
import { Divider, IconButton } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dummyUsers, type TUser } from '@/components/home/DummyData';
import { AppleMapsMapType, AppleMapsMarker } from 'expo-maps/build/apple/AppleMaps.types';
import BarberInfoSection from '@/components/BarberProfile/BarberInfo';

export default function Maps() {
  const auth = useAuth();
  const colorScheme = useColorScheme()
  const { handleCoords } = useUser();
  const [zoom, setZoom] = useState(13);
  const [selectedId, setSelectedId] = useState<string | null>("0");
  const [barber, setBarber] = useState<TUser>(dummyUsers[0]);
  const blurType = getBlurType

  const defaultCoords = {
    longitude: -98.5795, 
    latitude: 39.8283
  };
  const longitude = auth?.userAuth?.geoLocation?.coordinates[0] ?? defaultCoords.longitude;
  const latitude = auth?.userAuth?.geoLocation?.coordinates[1] ?? defaultCoords.latitude;
  const coords = auth?.userAuth?.geoLocation?.coordinates;
  
  useEffect(() => {
    if(!Array.isArray(coords) || coords.length !== 2) {
      handleCoords();
    }
  }, []);
  
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  const paddingBottom =  tabHeight - bottom;
  
  const handleZoom = (value: "+" | "-") => {
    setZoom((prev) => value === "+" ? prev + 1 : prev - 1);
  };
  
  const handleMarkerClick = (marker: AppleMapsMarker) => {
    if(marker.id) {
      setSelectedId(marker.id)
      const barberData = dummyUsers.find((user) => String(user.id) === selectedId);
      setBarber(barberData as TUser);
    }
  }

  return (
    <View style={{ flex: 1 }}>  
    <AppleMaps.View 
    style={StyleSheet.absoluteFill}
    cameraPosition={{
      coordinates: { longitude, latitude },
      zoom
    }}
    properties={{
      mapType: AppleMapsMapType.STANDARD,
      selectionEnabled: true,
    }}
    onMapClick={(e) => console.log(JSON.stringify({ type: "onMapClick", data: e }, null, 2))}
    onMarkerClick={(e: AppleMapsMarker) => handleMarkerClick(e)}
    onCameraMove={(e) => console.log(JSON.stringify({ type: "onCameraMove", data: e }, null, 2))}
    markers={IOSbarbers}
    />
    <SafeAreaView style={{ position: 'absolute', bottom: 200, right: 0, alignItems:'center', paddingBottom: paddingBottom }}>
      <StyledView style={{ flex: 8,}} pointerEvents="none" />
      <StyledBlurView>
        <StyleText style={{ textAlign: "center", fontWeight: 700 }}>Zoom</StyleText>
    <StyledView align="center" direction="column" justify="center" gap={8} pointerEvents="auto">
      <IconButton icon="plus" onPress={() => handleZoom("+")} />
      <Divider style={{ width: '100%' }} />
      <IconButton icon="minus" onPress={() => handleZoom("-")} />
    </StyledView>
      </StyledBlurView>
    </SafeAreaView>
    <SafeAreaView style={{ position: 'absolute', bottom: 0, width: "100%",  paddingBottom: paddingBottom }}>
      <StyledView style={{ flex: 8,}} pointerEvents="none" />
      <StyledBlurView>
        <StyleText style={{ fontWeight: 700 }}>[type]Barber</StyleText>
    {/* <StyledView align="center" direction="column" justify="center" gap={8} pointerEvents="auto">
      <IconButton icon="plus" onPress={() => handleZoom("+")} />
      <Divider style={{ width: '100%' }} />
      <IconButton icon="minus" onPress={() => handleZoom("-")} />
    </StyledView> */}
    <BarberInfoSection name={barber.name} userImgPath={barber.image}  />
      </StyledBlurView>
    </SafeAreaView>
    </View>
  )
}