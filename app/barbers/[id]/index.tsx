import { useLocalSearchParams } from "expo-router";
import { View, Text, useColorScheme, ColorSchemeName, TouchableOpacity, ScrollView } from 'react-native';
import styled from "styled-components/native";
import { dummyUsers } from "@/components/home/DummyData";
import { useQuery } from '@tanstack/react-query';
import { Avatar, Divider, Button, Icon } from 'react-native-paper';
import BarberInfoSection from "@/components/BarberProfile/BarberInfo";
import DayOfWeekChips from "@/components/BarberAvailability/DayOfWeekChips";


export default function BarberProfile() {
    const { id, name, location, price, image } = useLocalSearchParams();
    const colorScheme = useColorScheme();
        const shopImg = require("../../../assets/images/homeImg.png")
        const textColor = colorScheme === 'light' ? "#222" : "#999";
        const blurType = colorScheme === 'light' ? "dark" : "light"
        const iconColor = colorScheme === 'light' ? "#444" : "#f1f1f1"
        const blurIntensity = colorScheme === 'light' ? 35 : 50;

    // const { data, isLoading: barberIsLoading, } = useQuery({
    //     queryFn: () => {},
    //     queryKey: ["barber[id]"]
    // })

    const barber = { id, name, location, price, image };

    return (
        <StyledView style={{ flex: 1 }}>
            <ScrollView>

            <BarberInfoSection 
            colorScheme={colorScheme} 
            blurIntensity={blurIntensity} 
            blurType={blurType} 
            name={String(name)} 
            userImgPath={shopImg} />
            <Divider bold style={{ width: '100%', marginVertical: 10 }}/>
                {/* chat bubble and status */}
                <View style={{ display: 'flex', flexDirection: 'row',justifyContent:"center", alignItems: 'center', gap: 5, marginBottom: 5 }}>
                    <TouchableOpacity activeOpacity={0.7}>
                    <Icon source="chat" size={20} />
                    </TouchableOpacity>
                    <Divider style={{ height: 10, width: 1 }}/>
                    <View style={{ overflow: 'hidden', borderRadius: 5, padding: 5, flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                        <Icon color="green" source="checkbox-blank-circle" size={10} /> 
                    <StyledText colorScheme={colorScheme} style={{ color: 'green'}}>Live</StyledText>
                    </View>
                    
                </View>
            <Button icon="calendar-clock-outline" buttonColor="white" textColor="black" mode="contained" onPress={() => console.log("hello")}>Book with {name}</Button>
            <StyledText colorScheme={colorScheme} style={{ fontWeight: 700, fontSize: 15, marginTop: 15}}>About {String(name).split(" ")[0]}:</StyledText>
            <StyledText colorScheme={colorScheme}>
                I've been cutting hair for the last 10 years at Woogie Woogie Barber shop on 11th ave. I've don't mess around and politic like some of these other barbers do and with
                you know if you choose me you're getting top quality, no-nonsense service. I can come to you or you can visit my personal studio.
            </StyledText>
            <Divider bold style={{ width: '100%', marginVertical: 10 }}/>
            <StyledText colorScheme={colorScheme} style={{ fontWeight: 700, fontSize: 15, marginTop: 5}}>Availablity:</StyledText>
               
                <DayOfWeekChips colorScheme={colorScheme} onPress={() => console.log("nothing")} />
                <View />
                <View />
            </ScrollView>
        </StyledView>
    )
    
}

const StyledView = styled.View`
flex: 1;
display: flex;
padding: 1rem;
gap: 2rem;
`;

export const StyledText = styled.Text`
font-size: 12px;
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222' : "#f1f1f1"};
`