import { Surface } from "react-native-paper";
import { View, Text, ScrollView, ColorSchemeName, } from 'react-native';
import styled from "styled-components/native";
import { BlurView } from "expo-blur";

type TJustifyContent = "center" | "flex-end" | "flex-start" | "stretch" | "normal" | "space-between" | "space-around";
type TAlignItems = "center" | "end" | "start" | "stretch" | "normal" | "flex-end" | "flex-start";
type TDirection = "row" | "column";


const StyledSurface = styled(Surface)`

`;

/**
 * @name StyledView
 * @description: prepared with flex out of the box and customizable for most used cases
 * @flexSpace - flex: number => default = 0;
 * @spacing - gap: string => default = 0;
 * @direction - flexDirection: "row" | "column" => defaualt = column;
 * @justify - justifyContent: "center" | "flex-end" | "flex-start" | "stretch" | "normal" | "space-between" | "space-around" => default = center;
 * @align - alignItems: "center" | "end" | "start" | "stretch" | "normal" | "flex-end" | "flex-start" => default = center;
 */
export const StyledView = styled.View`
display: flex;
flex: ${(props: {flexSpace: number}) => props.flexSpace ?? 0};
flex-direction: ${(props: { direction: TDirection }) => props.direction === "row" ? "row": "column"};
justify-content: ${(props: { justify: TJustifyContent }) => props.justify ?? 'center'};
align-items: ${(props: { align: TAlignItems }) => props.align ?? 'center'};
gap: ${(props: { spacing: string}) => props.spacing ?? '0px'};
height: ${(props: { height: string | number }) => props.height ?? 'auto'};
`;

export const StyledText = styled(Text)`
color: ${(props: { theme: ColorSchemeName }) => props.theme === "light" ? '#222': "#f1f1f1"}
`;

export const StyledScrollView = styled.ScrollView`
display: flex;
flex-direction: column;
`;

export const StyledBlurContainer = styled(BlurView)`
    display: flex;
    flex: 1;
    padding: 5px;
    text-align: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
`;