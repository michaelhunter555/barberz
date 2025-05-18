import * as React from 'react';
import useAuth from '@/context/auth/use-auth';
import { View, Text, ScrollView, useColorScheme, ColorSchemeName, Button} from 'react-native';
import { router } from 'expo-router';
import { Divider } from 'react-native-paper';
import styled from 'styled-components/native';
import { HomeFeatures } from '@/components/home/HomeFeatures/HomeFeatures';
import UserCard from '@/components/shared/UserList/UserList';
import { dummyUsers } from '@/components/home/DummyData';
import { IconOptionsList } from '@/components/home/IconList/IconList';
import { FilterBarberChips } from '@/components/home/FilterChips/FitlerChips';
import { backgroundGradients } from '@/theme/gradients';
import { SearchBar } from '@/components/shared/SearchBar/SearchBar';
import { FeaturedShop } from '@/components/home/Featured/FeaturedShop';
import withAuthGuard from '@/context/auth-middleware';
import UserHomePage from '@/components/Views/UserView/UserHomePage';
import BarberHomeDashboard from '@/components/Views/BarberView/BarberHomePage';


const HomeScreen = () => {
  const auth = useAuth();
  const colorScheme = useColorScheme();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const gradient = backgroundGradients.find((g) => g.key === "creamWhite") || { colors: ["#f7f6f1 ", "#f7f6f1"]};
  const gradientColors: readonly [string, string, ...string[]] = [gradient.colors[0], gradient.colors[1], ...gradient.colors]
  const isDarkTheme: readonly [string, string, ...string[]] = ["#000","#000"]
  const setGradient = colorScheme === 'light' ? gradientColors : isDarkTheme;

  return (
    <StyledContainer>
      <ScrollView contentContainerStyle={{ display: 'flex', gap: 15}}>
        {auth?.userAuth?.accountType === "user" ? (
        <UserHomePage searchValue={searchValue} onSearchSubmit={setSearchValue} />
        ): (
          <BarberHomeDashboard />
        )}
      
      <View />
      <View />
      <View />
      <View />
      </ScrollView>
      </StyledContainer>
   
  );
}


const StyledContainer = styled.View`
flex: 1;
justify-content: 'center';
display: flex;
flex-direction: column;
gap: 15px;
padding: 15px;
`

const StyledText = styled(Text)`
font-size: ${(props: { fontSize: string | number }) => props.fontSize}px;
font-weight: ${(props: { fontWeight: number }) => props.fontWeight};
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222': "#f1f1f1"};
${(props: any) => props.center ? "text-align:center;":""}
`;
export default withAuthGuard(HomeScreen);