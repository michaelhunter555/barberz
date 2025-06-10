import { ReactNode } from "react";
import { ColorSchemeName, useColorScheme, View, StyleProp, TextStyle, ViewStyle, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { Divider } from "react-native-paper";
import { setColorType } from "@/lib/helpers";

export const StyledText = styled.Text`
font-size: 12px;
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222' : "#f1f1f1"};
`;


type FlexDirection = 'row' | 'column';
type Align = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type Justify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export const StyledBlurItem = styled(BlurView)`
justify-content: center;
align-items: center;
border-radius: 10px;
padding: 5px;
overflow: hidden;
`;

export const StyledBlur = styled(BlurView)`
display: flex;
 ${(props: { direction: FlexDirection}) => props.direction && `flex-direction: ${props.direction};`}
  ${(props: { gap: number }) => props?.gap !== undefined && `gap: ${props.gap}px;`}
  ${(props: { align: Align }) => props.align && `align-items: ${props.align};`}
  ${(props: { justify: Justify}) => props.justify && `justify-content: ${props.justify};`}
  overflow: hidden;
  border-radius: ${(props: { borderRadius: number}) => props.borderRadius ? props.borderRadius : 10}px ;
`;
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
padding: 10px;
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

export const StyleText = ({ children, style, onPress, }: { children: ReactNode, style?: StyleProp<TextStyle>, onPress?: () => void }) => {
  const colorScheme = useColorScheme();
  return (
    <StyledText onPress={onPress} colorScheme={colorScheme} style={style}>
      {children}
    </StyledText>
  )
};

interface IStyledBlurComponent {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isButton?: boolean;
  direction?: FlexDirection;
  borderRadius?: number;
  align?: Align;
  justify?: Justify;
  gap?: number;
  onClick?: (value?: any) => void;
  clickable?: boolean;
  isPaper?: boolean;
  isDisabled?: boolean;
}
export const StyledBlurView = ({ children, style, isButton, isDisabled, direction, align, justify, gap, onClick, clickable, borderRadius, isPaper }: IStyledBlurComponent) => {
      const colorScheme = useColorScheme();    
      const blurType = colorScheme === 'dark' ? 'light' : 'dark';
      const intensity = colorScheme === 'dark' ? 55 : 35;
      const buttonStyle: ViewStyle | undefined = isButton ? { backgroundColor: colorScheme === 'dark' ? '#007AFF': '#fff' } : undefined;
      const paperize: ViewStyle | undefined = isPaper && colorScheme === 'light' ? { backgroundColor: '#FFF' } : undefined;

  return clickable ? (
    <TouchableOpacity disabled={isDisabled} activeOpacity={0.8} onPress={onClick}>
    <StyledBlur
    direction={direction}
    align={align}
    justify={justify}
    gap={gap}
    intensity={isPaper && colorScheme === 'light' ? 100 : intensity} 
    tint={isPaper && colorScheme === 'light' ? 'light': blurType}
    borderRadius={borderRadius}
    style={[style, buttonStyle, paperize]}>
      {children}
    </StyledBlur>
    </TouchableOpacity>
  ) : (
    <StyledBlur
    direction={direction}
    align={align}
    justify={justify}
    gap={gap}
    intensity={isPaper && colorScheme === 'light' ? 100 : intensity} 
    tint={ isPaper && colorScheme === 'light' ? 'light': blurType} 
    borderRadius={borderRadius}
    style={[style, buttonStyle, paperize]}>
      {children}
    </StyledBlur>
  )
}


export const StyledDivider = styled(Divider)`
width: ${(props: { orientation: "vertical" | "horizontal"}) => props.orientation === "vertical" ? "1px" : "100%"};
height: ${(props: { orientation: "vertical" | "horizontal", height: number}) => props.orientation === "vertical" ? `${props.height}px` : "1px"};
margin-top: ${(props: { marginVertical: number}) => props.marginVertical ?? 0}px;
margin-bottom: ${(props: { marginVertical: number}) => props.marginVertical ?? 0}px;
`;