import * as React from 'react';
import { View, Text, StyleSheet, Button as NativeButton, SafeAreaView, ImageBackground, ScrollView, useColorScheme, ColorSchemeName} from 'react-native';
import { Button, Avatar, Card, Divider, Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { UserCard } from '@/components/shared/UserList/UserList';
import { dummyUsers } from '@/components/home/DummyData';
import { StyledView } from '@/components/shared/UserList/UserListStyles';
import { IconOptionsList } from '@/components/home/IconList/IconList';
import { FilterBarberChips } from '@/components/home/FilterChips/FitlerChips';
import MD3Theme, { useTheme } from 'react-native-paper';
import { backgroundGradients } from '@/theme/gradients';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const gradient = backgroundGradients.find((g) => g.key === "creamWhite") || { colors: ["#f7f6f1 ", "#f7f6f1"]};
  const gradientColors: readonly [string, string, ...string[]] = [gradient.colors[0], gradient.colors[1], ...gradient.colors]
  const isDarkTheme: readonly [string, string, ...string[]] = ["#000","#000"]
  const setGradient = colorScheme === 'light' ? gradientColors : isDarkTheme;
  
  return (
    
    <StyledImageBackground 
    source={require("../../assets/images/background-a.png")}
    resizeMode="repeat"
    imageStyle={{ opacity: 0.2, width: '100%' }}
    >

      <Searchbar
      elevation={4} 
      showDivider={true}
      placeholderTextColor={colorScheme === 'light'? "#f1f1f1": "#fff"}
      style={{ paddingVertical: 0, backgroundColor:colorScheme === 'light'? '#222': '#222'}} 
      onChangeText={setSearchValue} value={searchValue} 
      placeholder="Enter a location..." />
      <View>
        <StyledText colorScheme={colorScheme} fontWeight={700} fontSize={20}>A Barber that fits your needs.</StyledText>
      </View>
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Divider style={{ width: '100%' }} />
      </View>
      <View>
        <IconOptionsList colorScheme={colorScheme} />
        <HomeFeatures colorScheme={colorScheme}/>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <View>
          <FilterBarberChips colorScheme={colorScheme} />
        </View>
        <View style={{ maxHeight: 250 }}>
          <UserCard userData={dummyUsers} colorScheme={colorScheme} />
        </View>
      </View>
      </StyledImageBackground>
   
  );
}

const StyledImageBackground = styled.ImageBackground`
flex: 1;
  justify-content: 'center';
display: flex;
flex-direction: column;
justify-content: center;
gap: 10px;
padding: 15px;
`;

const StyledText = styled(Text)`
font-size: ${(props: { fontSize: string | number }) => props.fontSize}px;
font-weight: ${(props: { fontWeight: number }) => props.fontWeight};
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222': "#f1f1f1"};
text-align: center;
margin-bottom: 2px;
`;


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  }
});
