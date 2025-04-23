import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, useColorScheme, ColorSchemeName, TouchableOpacity, ScrollView } from 'react-native';
import styled from "styled-components/native";
import { dummyUsers } from "@/components/home/DummyData";
import { useQuery } from '@tanstack/react-query';
import { Avatar, Divider, Button, Icon } from 'react-native-paper';
import BarberInfoSection from "@/components/BarberProfile/BarberInfo";
import DayOfWeekChips from "@/components/BarberAvailability/DayOfWeekChips";
import AppointmentCalendar from "@/components/Calendar/Calendar";
import { StyledBlurItem, StyledText as SText, StyledView as Div } from "@/components/shared/SharedStyles";
import UserReview from "@/components/ReviewsList/UserReview";

const userImg = "https://images.unsplash.com/photo-1641318175316-795cd2db99f8?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const formatDateString = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
  
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return `${n}th`;
      switch (n % 10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
      }
    };
  
    return `on ${months[month - 1]} ${getOrdinal(day)}, ${year}`;
  };
  
  console.log(formatDateString("2025-04-23"));
  // → "on April 23rd, 2025"

  
export default function BarberProfile() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [openBookings, setOpenBookings] = useState<boolean>(false);
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

    const handleDateSelection = (date: string) => {
        console.log("selectedDate: ",date)
        setSelectedDate(date);
    }

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
            <Button icon="chat" buttonColor="white" textColor="black" mode="contained" onPress={() => console.log("hello")}>Send {name} a message</Button>
            <StyledText colorScheme={colorScheme} style={{ fontWeight: 700, fontSize: 15, marginTop: 15}}>About {String(name).split(" ")[0]}:</StyledText>
            <StyledText colorScheme={colorScheme}>
                I've been cutting hair for the last 10 years at Woogie Woogie Barber shop on 11th ave. I've don't mess around and politic like some of these other barbers do and with
                you know if you choose me you're getting top quality, no-nonsense service. I can come to you or you can visit my personal studio.
            </StyledText>
            <Divider bold style={{ width: '100%', marginVertical: 5}}/>
            { !selectedDate && <>
            <StyledText style={{ fontWeight: 700, fontSize: 15 }} colorScheme={colorScheme}>Reviews:</StyledText>
            <UserReview
            shouldLink={true}
            userName={"Jacobi K."}
            userImage={userImg}
            reviewRating={4.0}
             reviewDate="6/25/2025"
            reviewText="Great haircut I loved this place."/>
            <Divider bold style={{ width: '100%', marginBottom: 10, marginTop: 2 }}/></>}
           <Div direction="row" align="flex-end" gap={5}>
            <StyledText colorScheme={colorScheme} style={{ fontWeight: 700, fontSize: 15, marginTop: 5}}>Availablity:</StyledText>
            {selectedDate && <StyledText style={{ fontWeight: 600 }} colorScheme={colorScheme}>{formatDateString(selectedDate)}</StyledText>}
           </Div>
           
        
          
           {!selectedDate && (
            <>
            <StyledBlurItem intensity={55} tint="light" style={{ marginBottom: 10, flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Div>
                <Icon source="calendar" size={25} />
            </Div>
            <Div>
            <SText colorScheme={colorScheme}>Select Date</SText>
            </Div>
           </StyledBlurItem>
            <AppointmentCalendar 
            selectedDate={selectedDate}
            onSelectedDate={(date: string) => handleDateSelection(date)} 
            colorScheme={colorScheme} />
            </>
            )}
                {selectedDate && (
                <DayOfWeekChips goBack={() => setSelectedDate("")} colorScheme={colorScheme} onPress={() => console.log("nothing")} />
                )}
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