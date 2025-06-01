import React from 'react';
import { router } from 'expo-router';
import { StyledView, StyleText, StyledBlurView, StyledContainer, StyledDivider } from '../../components/shared/SharedStyles';
import { Icon } from 'react-native-paper';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';
import { useColorScheme } from 'react-native';
import { setColorType } from '@/lib/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';

const Create = () => {
    const colorScheme = useColorScheme();
    const color = setColorType("info", colorScheme);

    return (
        <SafeAreaView 
        style={{ flex: 1,}}>
        <StyledContainer style={{ padding: 10 }}>
            <GoBackArrow /> 
            <StyleText style={{ fontSize: 20, fontWeight: 700 }}>Create a service or promotion</StyleText>
            <StyledView gap={20}>
                <Alert fontSize={12} alertType='warning' iconSize={20} colorScheme={colorScheme} message="If you need to increase your limits, please upgrade." />
            <StyleText style={{ fontSize: 15 }}>What would you like to create?</StyleText>
                <StyledView
                direction="column"
                gap={5}
                > 
                <StyleText style={{ fontSize: 18 }}>Create Coupon</StyleText>
                <StyleText>Create a coupon to help users select you in their search</StyleText>
                <StyleText style={{ fontSize: 10, fontWeight: 600 }}>Max: 4</StyleText>
                <StyledBlurView 
                clickable
                onClick={() => router.push({ pathname: '/couponform' })}
                direction="column" 
                align="center" 
                gap={2} 
                justify="center"
                borderRadius={20} 
                style={{ padding: 10, }}>
                    <StyledView direction="row" align="center" gap={10} justify="center">
                        <StyleText style={{ fontSize: 16, }}>Create a coupon</StyleText>
                        <Icon source="plus" size={20} />
                    </StyledView>
                </StyledBlurView>
                </StyledView>
                
                <StyledView>
                <StyleText style={{ fontSize: 18 }}>Create a Service Add-on</StyleText>
                <StyleText>Create add-ons to let to allow customers to select options before providing the haircut. This also helps establish what's included and not included.</StyleText>
                <StyleText style={{ fontSize: 10, marginBottom: 5 }}>Max: 6</StyleText>
                <StyledBlurView 
                clickable 
                onClick={() => router.push({ pathname: '/serviceForm' })} 
                direction="column" 
                align="center" 
                gap={2} 
                justify="center"
                borderRadius={20}
                style={{ padding: 10,  }}>
                    <StyledView direction="row" align="center" gap={10} justify="center">
                        <StyleText style={{ fontSize: 16,}}>Create a Service Add-on</StyleText>
                        <Icon source="plus" size={20} />
                    </StyledView>
                </StyledBlurView>
                </StyledView>

            </StyledView>
        </StyledContainer>
</SafeAreaView>
    )
};

export default Create;