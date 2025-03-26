import * as React from 'react';
import { View, Text, ScrollView, useColorScheme, ColorSchemeName} from 'react-native';
import { Divider } from 'react-native-paper';
import styled from 'styled-components/native';
import { HomeFeatures } from '@/components/home/HomeFeatures/HomeFeatures';
import { UserCard } from '@/components/shared/UserList/UserList';
import { dummyUsers } from '@/components/home/DummyData';
import { IconOptionsList } from '@/components/home/IconList/IconList';
import { FilterBarberChips } from '@/components/home/FilterChips/FitlerChips';
import { backgroundGradients } from '@/theme/gradients';
import { SearchBar } from '@/components/shared/SearchBar/SearchBar';
import { FeaturedShop } from '@/components/home/Featured/FeaturedShop';


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const gradient = backgroundGradients.find((g) => g.key === "creamWhite") || { colors: ["#f7f6f1 ", "#f7f6f1"]};
  const gradientColors: readonly [string, string, ...string[]] = [gradient.colors[0], gradient.colors[1], ...gradient.colors]
  const isDarkTheme: readonly [string, string, ...string[]] = ["#000","#000"]
  const setGradient = colorScheme === 'light' ? gradientColors : isDarkTheme;

  const lightImg = require("../../assets/images/background-a.png");
  const darkImg = require("../../assets/images/background.png");

  const selectedImg = colorScheme === 'light'?lightImg:darkImg;
  
  return (
    
    <StyledImageBackground 
    source={selectedImg}
    resizeMode="repeat"
    imageStyle={{ opacity: 0.2, width: '100%' }}
    >
      <ScrollView contentContainerStyle={{ display: 'flex', gap: 15}}>
      <SearchBar 
      colorScheme={colorScheme}
      searchValue={searchValue}
      onSearchSubmit={setSearchValue}/>
      <View>
        <StyledText center colorScheme={colorScheme} fontWeight={700} fontSize={20}>A Barber that fits your needs.</StyledText>
      </View>
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Divider style={{ width: '100%' }} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 10}}>
        <IconOptionsList colorScheme={colorScheme} />
        <HomeFeatures colorScheme={colorScheme}/>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <View>
          <StyledText fontWeight={600} fontSize={15} colorScheme={colorScheme}>Near [location]</StyledText>
          <FilterBarberChips colorScheme={colorScheme} />
        </View>
        <View style={{ maxHeight: 270 }}>
          <UserCard userData={dummyUsers} colorScheme={colorScheme} />
        </View>
      </View>
      <View>
        <FeaturedShop colorScheme={colorScheme}/>
      </View>
      <View />
      <View />
      <View />
      <View />
      </ScrollView>
      </StyledImageBackground>
   
  );
}

const StyledImageBackground = styled.ImageBackground`
flex: 1;
justify-content: 'center';
display: flex;
flex-direction: column;
gap: 15px;
padding: 15px;
`;

const StyledText = styled(Text)`
font-size: ${(props: { fontSize: string | number }) => props.fontSize}px;
font-weight: ${(props: { fontWeight: number }) => props.fontWeight};
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222': "#f1f1f1"};
${(props: any) => props.center ? "text-align:center;":""}
`;