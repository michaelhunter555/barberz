import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useColorScheme } from 'react-native';
import useAuth from '@/context/auth/use-auth';
import { useUser } from '@/hooks/user-hooks';
import { TouchableOpacity, View } from 'react-native';
import { StyledView, StyleText, StyledBlurView } from "@/components/shared/SharedStyles";
import { useForm } from "@/hooks/use-form";
import { Button, Icon } from 'react-native-paper';
import Alert from '@/components/shared/Alert/Alert';

const AboutMe = () => {
    const auth = useAuth();
    const isBarber = auth?.userAuth?.accountType === 'barber';
    const colorScheme = useColorScheme();
    const { getLocation, isLoading,location, handleCoords } = useUser();
    const [formState, inputHandler, setFormData] = useForm({
        name: { value: auth?.userAuth?.name, isValid: true },
        ...(isBarber && {
            aboutMe: {value: "", isValid: false,},
            galleryImageOne: { value: undefined, isValid: true,},
            galleryImageTwo: { value: undefined, isValid: true,},
            galleryImageThree: { value: undefined, isValid: true,},
            galleryImageFour: { value: undefined, isValid: true,},
            galleryImageFive: { value: undefined, isValid: true,},
        })
    }, false);

    useEffect(() => {
        if(location.length === 0) {
            getLocation();
        }
    }, [location])

    useEffect(() => {
        if(formState.isValid && formState.inputs.name.value){
            setFormData({
                name: {value: formState.inputs.name.value as string, isValid: true},
            }, true)
        }
    }, []);

    const handleNameChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        inputHandler(id, event.target.value, event.target.value !== "");
    }

    return (
        <StyledView style={{ flex: 1, marginTop: 20,  }} gap={5}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
            <Icon source="arrow-left" size={15} />
            </TouchableOpacity>
            <StyleText style={{ fontSize: 20, fontWeight: 700 }}>About me</StyleText>
            <StyleText>Name:</StyleText>
            <StyledBlurView style={{ padding: 10 }}>
                <StyleText>{auth?.userAuth?.name}</StyleText>
            </StyledBlurView>
                {!isLoading && location ? location.map((details, i) => (
                    <StyledView key={i} direction="column" gap={5}>
                        <StyleText>City:</StyleText>
            <StyledBlurView style={{ padding: 10 }}>
                    <StyleText>{details.city}</StyleText>
            </StyledBlurView>
            <StyleText>Distric:</StyleText>
             <StyledBlurView style={{ padding: 10 }}>
             <StyleText>{details.district}</StyleText>
     </StyledBlurView>
     <StyleText>Postal code:</StyleText>
     <StyledBlurView style={{ padding: 10 }}>
             <StyleText>{details.postalCode}</StyleText>
     </StyledBlurView>

                    </StyledView>
                )): <StyleText>...Fetching</StyleText>}
                <StyledView style={{ marginVertical: 30 }} align="center">
                <StyleText>Change Locations Recently?</StyleText>
                <Alert fontSize={13} colorScheme={colorScheme} alertType="info" iconSize={15} message="Update if you are traveling or changed locations." />
                </StyledView>
                <Button icon="map-marker-account-outline" onPress={ () => console.log("Location Change")}>Update Location</Button>
        </StyledView>
    )
}

export default AboutMe;