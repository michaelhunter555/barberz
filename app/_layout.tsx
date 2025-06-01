import React, { useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider,} from '@react-navigation/native';
import { lightTheme, darkTheme } from '@/theme/theme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SafeAreaView, Button } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { AuthProvider } from '@/context/auth/use-auth';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession()
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? lightTheme : darkTheme;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> 
        <AuthProvider>
      <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      </PaperProvider>
        </AuthProvider>
    </ThemeProvider>
  );
}
