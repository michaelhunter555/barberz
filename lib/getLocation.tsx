import * as Location from 'expo-location';

export const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
        console.warn("Permission access denied");
        return null;
    }
    const location = await Location.getCurrentPositionAsync({});
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    }
}

