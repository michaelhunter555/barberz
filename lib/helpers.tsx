import { ColorSchemeName } from "react-native";

export const setColorType = (colorType: 'info' | 'warning' | 'error' | 'success', scheme: ColorSchemeName) => {
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
  
    return colors[colorType];
  };