import { ColorSchemeName } from "react-native";
import { StyledView, StyledText } from "../SharedStyles";
import { Icon } from "react-native-paper";

interface IAlert {
    iconSize: number;
    message: string;
    colorScheme: ColorSchemeName;
    fontSize: number;
    alertType: 'info' | 'warning' | 'error' | 'success'
}

const getColors = (alertType: IAlert['alertType'], scheme: ColorSchemeName) => {
    const isDark = scheme === 'dark';
  
    const colors = {
      info: {
        background: isDark ? '#003366' : '#cce5ff',
        text: isDark ? '#b3d7ff' : '#004085',
        icon: 'information',
      },
      warning: {
        background: isDark ? '#665c00' : '#fff3cd',
        text: isDark ? '#ffecb5' : '#856404',
        icon: 'alert',
      },
      error: {
        background: isDark ? '#661f1f' : '#f8d7da',
        text: isDark ? '#f5b5b5' : '#721c24',
        icon: 'alert-circle',
      },
      success: {
        background: isDark ? '#0f3d2e' : '#d4edda',
        text: isDark ? '#b7f5cb' : '#155724',
        icon: 'check-circle',
      },
    };
  
    return colors[alertType];
  };
  
const Alert = ({ iconSize, message, colorScheme, alertType, fontSize }: IAlert) => {
    const { background, text, icon } = getColors(alertType, colorScheme);
   
    return (
        <StyledView direction="row" align="center" gap={3} style={{ backgroundColor: background, borderRadius: 10, padding: 5 }}>
            <StyledView><Icon color={text} source={icon} size={iconSize}/></StyledView>
            <StyledView>
                <StyledText style={{ fontSize, color: text }} colorScheme={colorScheme}>{message}</StyledText>
            </StyledView>
        </StyledView>
    )
};

export default Alert;