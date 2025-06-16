import React from 'react';
import { router } from 'expo-router';
import { StyledView, StyleText, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import { StyleProp, ViewProps } from 'react-native';

interface IBarberBasePrice {
   basePrice: number;
};

const BarberBasePrice = ({ basePrice }: IBarberBasePrice) => {
    return (
        <StyledBlurView direction="row" align="center" justify="space-between" isPaper style={{ padding: 10, }}>
            <StyledView style={{ paddingLeft: 10 }} direction="row" align="center" gap={5}>
                <StyleText>Your base price:</StyleText>
                <StyleText style={{ fontWeight: 600 }}>${ basePrice }</StyleText>
            </StyledView>

            <StyledView>
                <StyledBlurView
                    isButton
                    clickable
                    borderRadius={20}
                    align="center"
                    onClick={() => router.push({ pathname: '/barberpriceform', params: { currentBasePrice: basePrice }})}
                    style={{ padding: 5, width: 50 }}
                >
                    <StyleText>Edit</StyleText>
                </StyledBlurView>
            </StyledView>
            
        </StyledBlurView>
    )
}

export default BarberBasePrice;