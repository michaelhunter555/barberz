import React from 'react';
import { LinearGradient} from 'expo-linear-gradient';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import styled from 'styled-components/native';

const GradientWrapper = styled.TouchableOpacity`
border-radius: 8px;
padding: 10px 20px;
align-items: center;
justify-content: center;
`;

interface IButtonGradient {
    text: string;
}

const GradientText = styled.Text`
        color: 'white';
        font-size: 12px;
        font-weight: bold;
`

export const GradientButton = ({ text }: IButtonGradient) => {
return (
    <TouchableOpacity activeOpacity={0.8} style={styles.buttonWrapper}>

    <LinearGradient
    colors={['#3f87a6', 'rgb(187, 194, 196)']}
    start={{ x: 0, y: 0}}
    end={{ x: 1, y: 1}}
    style={styles.linearGradient}
    >
        <Icon source="head-lightbulb" size={16} />
        <GradientText>{text}</GradientText>
    </LinearGradient>
    </TouchableOpacity>


)
}

const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 20,
        height: 50,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems: 'center' // Ensure gradient doesn't overflow the border
      },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    },
    linearGradient: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    }
})