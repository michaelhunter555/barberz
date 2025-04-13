import styled from "styled-components/native";
import { ColorSchemeName } from "react-native";
import { BlurView } from "expo-blur";

export const StyledText = styled.Text`
font-size: 12px;
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222' : "#f1f1f1"};
`

export const StyledView = styled.View`
align-items: center;
justify-content: center;
display: flex;
`;

export const StyledViewContainer = styled.View`
flex: 1;
justify-content: 'center';
display: flex;
flex-direction: column;
gap: 15px;
padding: 15px;
`

export const StyledGrid = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
`;

export const StyledBlurGridItem = styled(BlurView)`
width: 48%;
margin-bottom: 10px;
justify-content: center;
align-items: center;
border-radius: 10px;
padding: 10px;
overflow: hidden;
`;

export const StyledBlurCard = styled(BlurView)`
overflow: hidden;
border-radius: 10px;
text-wrap: wrap;
padding: 10px;
`;