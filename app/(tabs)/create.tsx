import React from 'react';
import { router } from 'expo-router';
import { StyledView, StyleText, StyledBlurView, StyledContainer, StyledDivider } from '../../components/shared/SharedStyles';
import { Icon } from 'react-native-paper';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';
import { useColorScheme } from 'react-native';

const Create = () => {
    const colorScheme = useColorScheme();

    return (
        <StyledContainer>
            <GoBackArrow /> 
            <StyleText style={{ fontSize: 20, fontWeight: 700 }}>Create a service or promotion</StyleText>
            <StyleText style={{ fontSize: 15 }}>What would you like to create?</StyleText>
            <StyledView gap={20}>
                <Alert fontSize={12} alertType='info' iconSize={20} colorScheme={colorScheme} message="If you need to increase your limits, please upgrade." />
                <StyledBlurView 
                clickable
                onClick={() => router.push({ pathname: '/serviceForm' })}
                direction="column" 
                align="center" 
                gap={2} 
                justify="center" 
                style={{ padding: 10 }}>
                    <StyledView direction="row" align="center" gap={10} justify="center">
                        <StyleText style={{ fontSize: 16 }}>Create a coupon</StyleText>
                        <Icon source="plus" size={20} />
                    </StyledView>
                    <StyleText style={{ fontSize: 10 }}>Max: 4</StyleText>
                </StyledBlurView>
                <StyledBlurView 
                clickable 
                onClick={() => router.push({ pathname: '/serviceForm' })} 
                direction="column" 
                align="center" 
                gap={2} 
                justify="center" 
                style={{ padding: 10 }}>
                    <StyledView direction="row" align="center" gap={10} justify="center">
                        <StyleText style={{ fontSize: 16 }}>Create a Service Add-on</StyleText>
                        <Icon source="plus" size={20} />
                    </StyledView>
                    <StyleText style={{ fontSize: 10 }}>Max: 6</StyleText>
                </StyledBlurView>

            </StyledView>
        </StyledContainer>
    )
};

export default Create;