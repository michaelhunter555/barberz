import React from 'react';
import { router } from 'expo-router';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { StyleText, StyledView, } from '../SharedStyles';
import { Icon } from 'react-native-paper';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface IGoBackArrow {
    marginVertical?: number;
    style?: StyleProp<ViewStyle>
}

const GoBackArrow = ({ marginVertical, style }: IGoBackArrow) => {
    return (
        <TouchableOpacity style={[{marginVertical}, style]} activeOpacity={0.8} onPress={() => router.back()}>
        <StyledView direction="row" align="center" gap={10}>
            <Icon source="arrow-left" size={15} />
            <StyleText>Go Back</StyleText>
        </StyledView>
        </TouchableOpacity>
    )
};

export default GoBackArrow;