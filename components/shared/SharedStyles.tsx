import styled from "styled-components/native";
import { View } from "react-native";
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

type FlexDirection = 'row' | 'column';
type Align = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type Justify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';


export const StyledView = styled.View`
  display: flex;
  ${(props: { direction: FlexDirection}) => props.direction && `flex-direction: ${props.direction};`}
  ${(props: { gap: number }) => props?.gap !== undefined && `gap: ${props.gap}px;`}
  ${(props: { align: Align }) => props.align && `align-items: ${props.align};`}
  ${(props: { justify: Justify}) => props.justify && `justify-content: ${props.justify};`}
`;

export const StyledContainer = styled.View`
flex: 1;
justify-content: 'center';
display: flex;
flex-direction: column;
gap: 15px;
padding: 15px;
`
export const getBlurType = (colorScheme: ColorSchemeName) => colorScheme === 'dark' ? 'light' : 'dark';
export const getIntensity = (colorScheme: ColorSchemeName) => colorScheme === 'dark' ? 55 : 35;

export const StyledBlurSearch = styled(BlurView)`
overflow: hidden;
border-radius: 50px;
height: 40px;
gap: 10px;
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
`;