import React from 'react';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { StyleText, StyledView, } from '../SharedStyles';
import { Icon } from 'react-native-paper';

interface IGoBackArrow {
    marginVertical?: number;
}

const GoBackArrow = ({ marginVertical }: IGoBackArrow) => {
    return (
        <TouchableOpacity style={{ marginVertical }} activeOpacity={0.8} onPress={() => router.back()}>
        <StyledView direction="row" align="center" gap={10}>
            <Icon source="arrow-left" size={15} />
            <StyleText>Go Back</StyleText>
        </StyledView>
        </TouchableOpacity>
    )
};

export default GoBackArrow;