import React from 'react';
import { router } from 'expo-router';
import { StyledView, StyleText, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import { Avatar, Icon, Button, IconButton } from 'react-native-paper';
import UserInfoSection from '../Settings/UserInfoSection';
import BookingDetails from './BookingDetails';

interface IBookingConfirmationCard {
    customerName: string;
    customerImgPath: string;
    date?: string;
    price?: number;
    addOns?: string[];
    discount?: number;
    fees?: number;
    status?: string;
};

const BookingConfirmationCard = ({
    customerName,
    date,
    price,
    customerImgPath,
    addOns,
    discount,
    fees,
    status
}: IBookingConfirmationCard) => {
    console.log("ADD ONS ", addOns)
    return (
       <StyledView style={{ flex: 1 }}>
        {/* Customer Name */}
         <UserInfoSection
            name={customerName}
            userImgPath={customerImgPath}
                />
        <StyledDivider orientation="horizontal" marginVertical={10} />
        
        {/* Contact & Resolvement */}
        <StyledView 
        direction="row" 
        align="center" 
        justify="space-between" 
        gap={10}>
            <StyledView direction="row" align="center" gap={10}>
            <IconButton onPress={() => void console.log("phone call")} size={15} mode="contained" icon="phone" />
            <IconButton onPress={() => void console.log("send message")} size={15} mode="contained" icon="message" />
            </StyledView>
            <StyledBlurView clickable onClick={() => void console.log("reschedule")} style={{ padding: 7 }}>
                <StyleText>{status === "confirmed" ? "Reschedule?" : "Confirm"}</StyleText>
            </StyledBlurView>
        </StyledView>

        {/* Booking Details */}
        <BookingDetails
        date={String(date)}
        price={Number(price)}
        addOns={addOns as string[]}
        />
        {status === "confirmed" && (
            <Button onPress={() => void console.log("cancel modal")} style={{ marginTop: 75}} textColor='red' mode="text">Cancel Booking</Button>
        )}

       </StyledView>
    )
};

export default BookingConfirmationCard;