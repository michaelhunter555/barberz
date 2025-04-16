import styled from "styled-components/native";
import { ColorSchemeName } from "react-native";
import { BlurView } from "expo-blur";

export const StyledText = styled.Text`
font-size: 12px;
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222' : "#f1f1f1"};
`;

export const StyledBlurItem = styled(BlurView)`
justify-content: center;
align-items: center;
border-radius: 10px;
padding: 5px;
overflow: hidden;
`;