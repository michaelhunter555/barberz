import React, { useEffect } from 'react';
import { Button, HelperText, Icon, TextInput } from 'react-native-paper';
import { useForm } from '@/hooks/use-form';
import { StyledView, StyledContainer, StyleText, StyledBlurView, StyledDivider } from '../../components/shared/SharedStyles';
import { NativeSyntheticEvent, TextInputChangeEventData, useColorScheme, ScrollView } from 'react-native';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';
import { SafeAreaView } from 'react-native-safe-area-context';

const ServiceForm = () => {
const colorScheme = useColorScheme();
const [ formState, inputHandler, setFormData ] = useForm({
    name: { value: "", isValid: false },
    description: { value: "", isValid: false},
    price: { value: "", isValid: false }
}, false);

useEffect(() => {
    if(formState.inputs.name.value, 
        formState.inputs.description.value, 
        formState.inputs.price.value, 
        formState.isValid) {
            setFormData({
                name: { value: formState.inputs.name.value, isValid: true },
                description: { value: formState.inputs.description.value, isValid: true},
                price: { value: formState.inputs.price.value, isValid: true }
            }, true)
        }
} , [
    formState.inputs.name.value, 
    formState.inputs.description.value, 
    formState.inputs.price.value, 
    formState.isValid]);

    const { name, description, price } = formState.inputs;

    const handleInputs = (id: string, text: string, isValid: boolean) => {
        inputHandler(id, text, isValid);
    };

    const handleCreateNewService = async () => {
        setFormData({
            name: { value: "", isValid: false },
            description: { value: "", isValid: false},
            price: { value: "", isValid: false }
        }, false)
    }

    return (
        <SafeAreaView>
        <ScrollView>

        <StyledContainer>
            <GoBackArrow />
            <StyledView direction="row" align="center" gap={10}>
            <StyleText style={{ fontSize: 20, fontWeight: 700 }}>Create add-on</StyleText>
            <Icon source="plus-circle" size={20} />
            </StyledView>
            
            <Alert colorScheme={colorScheme} alertType='info' fontSize={12} iconSize={15} message="Keep add-on name short (recommended)" />
            <StyledView>
                <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Add-On Name</StyleText>
            <TextInput
            placeholder='Enter a service...'
            style={{ height: 50 }}
            mode="outlined"
            value={String(name.value)}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputs("name", e.nativeEvent.text, e.nativeEvent.text !== "" && e.nativeEvent.text.length < 20)}
             />
                <HelperText type="info">i.e. beard trim, hair dye, fade, etc.</HelperText>
            </StyledView>

            <StyledView>
                <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Add-on Price</StyleText>
            <TextInput
            placeholder='Enter a price...'
            style={{ height: 50 }}
            left={ <TextInput.Icon icon="currency-usd" />}
            mode="outlined"
            value={String(price.value)}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputs("price", e.nativeEvent.text, Number(e.nativeEvent.text) > 1)}
             />
            </StyledView>

            <StyledView>
                <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Add-on Description</StyleText>
            <TextInput
            placeholder='Enter the service description...'
            mode="outlined"
            value={String(description.value)}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputs("description", e.nativeEvent.text, e.nativeEvent.text !== "" && e.nativeEvent.text.length < 100)}
            multiline
            numberOfLines={5}
            style={{ height: 200 }}
             />
            </StyledView>

            <StyledDivider orientation="horizontal" marginVertical={5} />

            <Button
            icon="plus"
            onPress={handleCreateNewService}
            disabled={!formState.isValid} 
            mode="contained">Create Add-on</Button>
        </StyledContainer>
        </ScrollView>
        </SafeAreaView>
    )

};

export default ServiceForm