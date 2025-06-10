import React, { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, HelperText, Icon, TextInput } from 'react-native-paper';
import { useForm } from '@/hooks/use-form';
import { StyledView, StyledContainer, StyleText, StyledBlurView, StyledDivider } from '../../components/shared/SharedStyles';
import { NativeSyntheticEvent, TextInputChangeEventData, useColorScheme, ScrollView } from 'react-native';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonLoading from '@/components/shared/LoadingSkeleton/LoadingSkeleton';
import { SkeletonButton, SkeletonInput } from '@/components/shared/LoadingSkeleton/Skeletons';
import { useBarber } from '@/hooks/barber-hooks';


const BasePriceForm = () => {
const { updateStartingPrice, isLoading: priceIsUpdating } = useBarber();
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
        if(formState.isValid) {
            await updateStartingPrice(Number(price.value));
            setFormData({
                price: { value: Number(price.value), isValid: false }
            }, false);
            router.push("/");
        }
    }


    return (
        <SafeAreaView>
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
            {!priceIsUpdating ? <TextInput
            placeholder='Enter a price...'
            style={{ height: 50 }}
            left={ <TextInput.Icon icon="currency-usd" />}
            mode="outlined"
            value={String(price.value)}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputs("price", e.nativeEvent.text, Number(e.nativeEvent.text) > 1)}
             />:
             <SkeletonInput />}
            </StyledView>

            <StyledDivider orientation="horizontal" marginVertical={5} />

           {!priceIsUpdating ? <Button
            icon="plus"
            onPress={handleUpdatePrice}
            disabled={!formState.isValid} 
            mode="contained">{priceIsUpdating ? "Loading..." : "Update Price"}</Button> : <SkeletonButton />}
        </StyledContainer>
        </ScrollView>
        </SafeAreaView>
    )

};

export default BasePriceForm;