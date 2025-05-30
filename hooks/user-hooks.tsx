import { AuthContext } from '@/context/auth/use-auth';
import { getUserLocation } from '@/lib/getLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useContext } from 'react';

export const useUser = () => {
    const auth = useContext(AuthContext);

    const checkDbUser = async (name: string, imagePath: string, email: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/user/get-user-account`,
                {
                    method: 'POST',
                    body: JSON.stringify({ email, name, imagePath }),
                    headers: { "Content-Type": "application/json" }
                })
            const data = await response.json();
            if (!data.ok) {
                throw new Error(data.error);
            }
            auth?.updateUser(data.userData);
            AsyncStorage.setItem("@user", JSON.stringify(data.userData));
            return data.userData;
        } catch (err) {
            console.log("There was an error trying to retreive user data." + err)
        }
    };

    const updateUserCoords = useCallback(async (lng: number, lat: number, email: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/user/update-coordinates`, {
                method: 'POST',
                body: JSON.stringify({ lng, lat, email }),
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();

            if (!data.ok) {
                throw new Error(data.error);
            }

            const updatedUser = {
                ...auth?.userAuth,
                geoLocation: {
                    type: "Point" as const,
                    coordinates: [lng, lat] as [number, number]
                }
            }
            auth?.updateUser(updatedUser);

            AsyncStorage.setItem("@user", JSON.stringify(updatedUser))
        } catch (err) {
            console.log("There was an error updating your coordinates", err)
        }
    }, [auth]);

    const handleCoords = async () => {
        const coords = await getUserLocation();
        if (coords) {
            await updateUserCoords(coords.longitude, coords.latitude, String(auth?.userAuth?.email));
        } else {
            return;
        }
    }

    type TBarberApp = { name: string; location: string; licensed: boolean; termsApproved: boolean; onDemand: boolean}
    const submitBarberApplication = useCallback(async (application: TBarberApp) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/user/join-as-barber`, 
                { 
                    method: 'POST',
                    body: JSON.stringify({ email: auth?.userAuth?.email, application }),
                    headers: { "Content-Type": "application/json"}
                 }
            )
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            const newAuth = { ...data.user }
            auth?.updateUser(newAuth);
            AsyncStorage.setItem("@user", JSON.stringify(newAuth));
        } catch(err) {
            console.log("Error submitting barber application ", err)
        }

    }, [auth])

    return { checkDbUser, updateUserCoords, handleCoords, submitBarberApplication }
}