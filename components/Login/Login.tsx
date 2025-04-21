import { useState } from 'react';
import { ColorSchemeName } from "react-native";
import { StyledText, StyledView, StyledBlurItem } from "../shared/SharedStyles";
import styled from "styled-components/native";
import { Button, TouchableRipple, FAB } from "react-native-paper";
import { appFeatures } from "./appFeatures";

interface ILogin {
    colorScheme: ColorSchemeName;
    authLogin: () => void;
}
export default function Login({ colorScheme, authLogin }: ILogin){
    const [pressedIndex, setPressedIndex] = useState<number | null>(null);
    const lightImg = require("../../assets/images/background-a.png");
    const darkImg = require("../../assets/images/background.png");
    const selectedImg = colorScheme === 'light' ? lightImg : darkImg;
  
    return (
        <StyledImageBackground
        source={selectedImg}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.2, width: '100%' }}
        >
            <StyledView style={{ flex: 1 }} direction="column" gap={10} align="center" justify="center">
                <StyledView direction="column" align="center" justify="center">

                <StyledText style={{ fontSize: 20 }} colorScheme={colorScheme}>"Feeling fresh is half the battle."</StyledText>
                <StyledText colorScheme={colorScheme}>-Michael Jordan</StyledText>
                </StyledView>
                <StyledView direction="row" justify="center" align="center" gap={10} style={{ flexWrap: 'wrap' }}>

                {appFeatures.map((feature, i) => (
                    <StyledView key={i} direction="column" align="center" gap={2}>
                        <StyledView>
                    <FAB style={{ ...(i === pressedIndex && { backgroundColor: '#999'})}} size="small" icon={feature.icon} onPress={() => setPressedIndex(i)} />
                        </StyledView>
                        <StyledView>
                            <StyledText colorScheme={colorScheme}>{feature.text}</StyledText>
                        </StyledView>
                    </StyledView>
                ))}
                </StyledView>
               {pressedIndex !== null &&  <StyledView direction="column">
                    <StyledBlurItem intensity={55} tint="light" style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: 250, height: 50}}>
                        <StyledText colorScheme={colorScheme}>
                            {appFeatures[pressedIndex].explanation}
                        </StyledText>
                    </StyledBlurItem>
                </StyledView>}
            </StyledView>
            <StyledView direction="column" align="center" justify="center">
                <StyledText colorScheme={colorScheme}>Login</StyledText>
            </StyledView>  
            <Button onPress={authLogin} icon="google" mode="contained">Login with Google</Button>
        </StyledImageBackground>
    )
}

const StyledImageBackground = styled.ImageBackground`
flex: 1;
justify-content: 'center';
display: flex;
flex-direction: column;
gap: 15px;
padding: 15px;
`;