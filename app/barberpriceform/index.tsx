import React, { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, HelperText, Icon, TextInput } from 'react-native-paper';
import { useForm } from '@/hooks/use-form';
import { StyledView, StyledContainer, StyleText, StyledBlurView, StyledDivider } from '../../components/shared/SharedStyles';
import { NativeSyntheticEvent, TextInputChangeEventData, useColorScheme, ScrollView } from 'react-native';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';
import { SafeAreaView } from 'react-native-safe-area-context';


const BasePriceForm = () => {
const [isLoading, setIsLoading] = React.useState<boolean>(false);
const { currentBasePrice } = useLocalSearchParams();
const colorScheme = useColorScheme();
const [ formState, inputHandler, setFormData ] = useForm({
    price: { value: currentBasePrice, isValid: false }
}, false);

useEffect(() => {
    if(formState.inputs.price.value && formState.isValid) {
            setFormData({
                price: { value: formState.inputs.price.value, isValid: true }
            }, true)
        }
} , [ 
    formState.inputs.price.value, 
    formState.isValid]);

    const { price } = formState.inputs;

    const handleInputs = (id: string, text: string, isValid: boolean) => {
        inputHandler(id, text, isValid);
    };

    const handleUpdatePrice = async () => {
        // simulate loading sequence
        setIsLoading(true)
        setTimeout(() => {
            setFormData({
                price: { value: "", isValid: false }
            }, false)
            setIsLoading(false);
            router.push({ pathname: "/" })
        }, 2000);
    }

    return (
        <ScrollView>
        <StyledContainer>
            <GoBackArrow />
            <StyledView direction="row" align="center" gap={10}>
            <StyleText style={{ fontSize: 20, fontWeight: 700 }}>Edit Base Price</StyleText>
            <Icon source="plus-circle" size={20} />
            </StyledView>
            
            <StyledView style={{ flex: 1 }}>

            <Alert colorScheme={colorScheme} alertType='info' fontSize={12} iconSize={15} message="Add a Base price for a complete service with no add-ons." />
            </StyledView>
            
            <StyledView>
                <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Update price</StyleText>
            <TextInput
            placeholder='Enter a price...'
            style={{ height: 50 }}
            left={ <TextInput.Icon icon="currency-usd" />}
            mode="outlined"
            value={String(price.value)}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputs("price", e.nativeEvent.text, Number(e.nativeEvent.text) > 1)}
             />
            </StyledView>

            <StyledDivider orientation="horizontal" marginVertical={5} />

            <Button
            icon="plus"
            onPress={handleUpdatePrice}
            disabled={!formState.isValid} 
            mode="contained">{isLoading ? "Loading..." : "Update Price"}</Button>
        </StyledContainer>
        </ScrollView>
    )

};

export default BasePriceForm;