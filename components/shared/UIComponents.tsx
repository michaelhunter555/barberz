import { Surface } from "react-native-paper";
import { View, Text, } from 'react-native';
import styled from "styled-components/native";;

type TJustifyContent = "center" | "flex-end" | "flex-start" | "stretch" | "normal" | "space-between" | "space-around";
type TAlignItems = "center" | "end" | "start" | "stretch" | "normal" | "flex-end" | "flex-start";
type TDirection = "row" | "column";

const StyledSurface = styled(Surface)`

`;

/**
 * @name StyledView
 * @description: prepared with flex out of the box and customizable for most used cases
 * @flexSpace - flex: number => default = 0;
 * @spacing - gap: number => default = 0;
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
gap: ${(props: { spacing: number }) => props.spacing ?? 0};
`;

export const StyledText = styled(Text)`
color: ${(props: { theme: 'light' | 'dark'}) => props.theme}
`