import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import useAuth from '@/context/auth/use-auth';
import { useUser } from '@/hooks/user-hooks';
import { TouchableOpacity, View } from 'react-native';
import { StyledView, StyleText, StyledBlurView } from "@/components/shared/SharedStyles";
import { useForm } from "@/hooks/use-form";
import { Button, Icon } from 'react-native-paper';

const AboutMe = () => {
    const auth = useAuth();
    const { getLocation, isLoading,location, handleCoords } = useUser();
    const [formState, inputHandler, setFormData] = useForm({
        name: { value: auth?.userAuth?.name, isValid: true },
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
                <StyledView style={{ marginTop: 50 }} align="center">
                <StyleText>Change Locations Recently?</StyleText>
                <Button icon="map-marker-account-outline" onPress={ () => console.log("Location Change")}>Update Location</Button>
                </StyledView>
        </StyledView>
    )
}

export default AboutMe;