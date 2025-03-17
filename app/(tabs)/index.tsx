import * as React from 'react';
import { View, Text, StyleSheet, Button as NativeButton, ImageBackground, ScrollView} from 'react-native';
import { Button, Avatar, Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { UserCard } from '@/components/shared/UserList';
import { dummyUsers } from '@/components/home/DummyData';
import { StyledView } from '@/components/shared/UIComponents';

export default function HomeScreen() {
  return (
    <ImageBackground 
    style={styles.imageBackground} 
    source={require("../../assets/images/background-a.png")}
    resizeMode="repeat"
    imageStyle={{ opacity: 0.2, width: '100%' }}
    >

<View style={{ flex:1, display: 'flex', justifyContent: 'center', gap: 10, padding: 20 }}>
  <View>
    <StyledText style={{ textAlign: 'center', marginBottom: 5 }} fontWeight={700} fontSize={20}>A Barber that fits your needs</StyledText>
    </View>
  <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent:'center' }}>
    <Card style={{ width: '100%', height: 250, backgroundColor: 'transparent' }}>
    <Card.Cover  source={require("../../assets/images/homeImg.png")}  />
      <Button style={{ marginTop: 10}} mode="contained" buttonColor="#000" onPress={() => console.log("learning more...")}>
        Learn More
      </Button>
    
    </Card>
    
  {/* <StyledAvatar size={100} source={require("../../assets/images/clippers.png")} /> */}
    <HomeFeatures />
  </View>

    <UserCard userData={dummyUsers} />
  
  <View style={{ justifyContent: 'flex-end', alignItems: 'center', padding: 20, marginBottom: 10 }}>
  
  <Button 
  onPress={() => console.log("authenticate with google")} 
  icon="google" 
  buttonColor="#000" 
  mode="contained">login with google</Button>
  <StyledButton title="Manual Login" />
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
