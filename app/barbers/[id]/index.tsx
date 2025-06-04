import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, useColorScheme, ColorSchemeName, TouchableOpacity, ScrollView } from 'react-native';
import styled from "styled-components/native";
import { Avatar, Divider, Button, Icon } from 'react-native-paper';
import BarberInfoSection from "@/components/BarberProfile/BarberInfo";
import DayOfWeekChips from "@/components/BarberAvailability/DayOfWeekChips";
import AppointmentCalendar from "@/components/Calendar/Calendar";
import { StyledBlurItem, StyledText as SText, StyledView as Div, StyledContainer, StyledBlurView, StyleText } from "@/components/shared/SharedStyles";
import UserReview from "@/components/ReviewsList/UserReview";
import ShowCaseGallery from "@/components/BarberProfile/ShowCaseGallery";
import ImageChanger from "@/components/shared/ImageChanger/ImageChanger";
import { dummyImgArr } from "@/components/BarberProfile/ShowCaseGallery";
import BarberBasePrice from "@/components/BarberServices/BarberBasePrice";
import { SafeAreaView } from 'react-native-safe-area-context';

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

  
export default function BarberProfile() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [openBookings, setOpenBookings] = useState<boolean>(false);
    const { id, name, location, price, image } = useLocalSearchParams();
    const colorScheme = useColorScheme();
        const [currentIndex, setCurrentIndex] = useState<number>(0);
        const [open, setOpen] = useState<boolean>(false);
        const [path, setImgPath] = useState<string>("");
        const shopImg = require("../../../assets/images/homeImg.png")
    
        const handleImageDialog = (path: string, index: number) => {
            setImgPath(path);
            setOpen(prev => !prev);
            setCurrentIndex(index);
        };

    const barber = { id, name, location, price, image };

    const handleDateSelection = (date: string) => {
        setSelectedDate(date);
    }

    const handleNextImageClick = (isNext: boolean) => {
        setCurrentIndex((prev) => {
            if(isNext && currentIndex !== dummyImgArr.length - 1) {
                return prev + 1;
            }
            if(!isNext && currentIndex > 0) {
                return prev - 1;
            }
            return prev;
        })
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

        <StyledView style={{ flex: 1 }}>
            <ImageChanger onNextClick={handleNextImageClick} onClose={() => setOpen(false)} path={dummyImgArr[currentIndex].imgPath} isOpen={open} />
            <ScrollView 
             keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ display: 'flex', padding: 15 }} >
               
            <BarberInfoSection 
            name={String(name)} 
            userImgPath={String(barber.image)} />
            <Divider bold style={{ width: '100%', marginVertical: 10 }}/>
            
                {/* Chat button */}
            <Button icon="chat" mode="contained" onPress={() => router.push({ pathname: '/messages/[id]/message', params: { id: String(barber.id), userImage: String(barber.image) } })}>Send {name} a message</Button>
           
           {/* User Bio */}
            <StyleText style={{ fontWeight: 700, fontSize: 15, marginTop: 15}}>About {String(name).split(" ")[0]}:</StyleText>
            <StyleText>
                I've been cutting hair for the last 10 years at Woogie Woogie Barber shop on 11th ave. I've don't mess around and politic like some of these other barbers do and with
                you know if you choose me you're getting top quality, no-nonsense service. I can come to you or you can visit my personal studio.
            </StyleText>
            
            <Divider bold style={{ width: '100%', marginVertical: 5}}/>
            {/* Showcase */}
            { !selectedDate && <View>
            <StyleText  style={{ fontWeight: 700, fontSize: 15, marginTop: 5}}>Showcase:</StyleText>
            <ShowCaseGallery onImgSelect={(path: string, index: number) => handleImageDialog(path, index)}/>
            <Divider bold style={{ width: '100%', marginVertical: 5}}/>
            
            {/* Reviews */}
            <StyleText style={{ fontWeight: 700, fontSize: 15 }}>Reviews:</StyleText>
            <UserReview
            shouldLink={true}
            userName={"Jacobi K."}
            userImage={userImg}
            reviewRating={4.0}
            reviewDate="6/25/2025"
            reviewText="Great haircut I loved this place."/>
            <Divider bold style={{ width: '100%', marginBottom: 10, marginTop: 2 }}/></View>}
           <Div direction="row" align="flex-end" gap={5}>
            <StyleText style={{ fontWeight: 700, fontSize: 15, marginTop: 5}}>Availablity:</StyleText>
            {selectedDate && <StyleText style={{ fontWeight: 600 }} >{formatDateString(selectedDate)}</StyleText>}
           </Div>
           
        
          
           {!selectedDate && (
            <>
            <StyledBlurView isPaper direction="row" align="center" justify="center" gap={10} style={{ padding: 10, marginBottom: 10,}}>
            <Div>
                <Icon source="calendar" size={25} />
            </Div>
            <Div>
            <StyleText>Select Date</StyleText>
            </Div>
           </StyledBlurView>
            <AppointmentCalendar 
            selectedDate={selectedDate}
            onSelectedDate={(date: string) => handleDateSelection(date)} 
            colorScheme={colorScheme} />
            </>
            )}
                {selectedDate && (
                <DayOfWeekChips 
                id={Number(id)} 
                name={String(name)} 
                goBack={() => setSelectedDate("")} 
                colorScheme={colorScheme} 
                onPress={() => console.log("nothing")} />
                )}
               
        
            </ScrollView>
        </StyledView>
        </SafeAreaView>
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