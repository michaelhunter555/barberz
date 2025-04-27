import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth/use-auth';
import { useColorScheme } from 'react-native';
import { StyledView, StyledText, StyledBlurItem, getBlurType, getIntensity } from "@/components/shared/SharedStyles";
import { useForm } from "@/hooks/use-form";

const AboutMe = () => {
    const auth = useAuth();
    const colorScheme = useColorScheme();
    const [formState, inputHandler, setFormData] = useForm({
        name: { value: "", isValid: false },
        location: { value: "", isValid: false },
    }, false);
    const blurIntensity = getIntensity(colorScheme);
    const blurType = getBlurType(colorScheme);

    useEffect(() => {
        if(formState.isValid && formState.inputs.name.value && formState.inputs.location.value){
            setFormData({
                name: {value: formState.inputs.name.value as string, isValid: true},
                location: {value: formState.inputs.location.value, isValid: true,},
            }, true)
        }
    }, []);

    const handleNameChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        inputHandler(id, event.target.value, event.target.value !== "");
    }

    return (
        <StyledView>
            <StyledBlurItem intensity={blurIntensity} tint={blurType}>
                <StyledText colorScheme={colorScheme}>Hello World</StyledText>
            </StyledBlurItem>

        </StyledView>
    )
}

export default AboutMe;