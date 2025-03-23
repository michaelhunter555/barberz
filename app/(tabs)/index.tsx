import * as React from 'react';
import { View, Text, StyleSheet, Button as NativeButton, ImageBackground, ScrollView} from 'react-native';
import { Button, Avatar, Card, Divider, Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { UserCard } from '@/components/shared/UserList/UserList';
import { dummyUsers } from '@/components/home/DummyData';
import { StyledView } from '@/components/shared/UserList/UserListStyles';
import { IconOptionsList } from '@/components/home/IconList/IconList';
import { FilterBarberChips } from '@/components/home/FilterChips/FitlerChips';

export default function HomeScreen() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  return (
    <ImageBackground 
    style={styles.imageBackground} 
    source={require("../../assets/images/background-a.png")}
    resizeMode="repeat"
    imageStyle={{ opacity: 0.2, width: '100%' }}
    >

<View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10, padding: 15 }}>
      <Searchbar elevation={4} showDivider={true} style={{  paddingVertical: 0, backgroundColor: 'white'}} onChangeText={setSearchValue} value={searchValue} placeholder="get started here..." />
  <View>
    <StyledText style={{ textAlign: 'center', marginBottom: 2 }} fontWeight={700} fontSize={20}>A Barber that fits your needs</StyledText>
    </View>
  <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent:'center' }}>
    <Divider style={{ width: '100%' }} />
  </View>

<View>
<IconOptionsList />
    <HomeFeatures />
</View>


    <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <View>
    <FilterBarberChips />
      </View>
    <View style={{ maxHeight: 250 }}>
    <UserCard userData={dummyUsers} />
    </View>
    </View>
  
</View>
    </ImageBackground>
  );
}

const StyledAvatar = styled(Avatar.Image)`

`;

const styledButton = styled(Button)`
background: linear-gradient(0.25turn, #3f87a6,rgb(187, 194, 196))`;

const StyledText = styled(Text)`
font-size: ${(props: { fontSize: string | number} ) => props.fontSize}px;
font-weight: ${(props: { fontWeight: number }) => props.fontWeight}
`

const StyledButton = styled(NativeButton)`
border: 1px solid #000;
`

const styles = StyleSheet.create({
 imageBackground: {
  flex: 1,
  justifyContent: 'center',
  marginTop: 20,
 }
});
