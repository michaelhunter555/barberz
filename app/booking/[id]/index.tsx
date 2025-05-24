import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleText, StyledView, StyledBlurView } from '../../../components/shared/SharedStyles';
import { ScrollView } from 'react-native';
import BookingConfirmationCard from '@/components/BookingConfirmationCard/BookingConfirmationCard';


const BookingConfirmation = () => {
    const { id, user } = useLocalSearchParams();
    const customer = JSON.parse(user as string);
    console.log("customer confirmation: ", customer);
    console.log("USER", user)
    console.log("id: ", id)
    return (
        <ScrollView>
            <StyledBlurView align="center" justify="center" borderRadius={1} style={{ padding: 3, marginBottom: 10 }}>
            <StyleText style={{ fontSize: 25, fontWeight: 600 }}>Booking #1778</StyleText>
            </StyledBlurView>
            <BookingConfirmationCard
            customerName={customer.customerName}
            date={customer.date}
            price={customer.value}
            customerImgPath={customer.customerImg}
            addOns={customer.addOns}
            status={customer.status}
            />
            {/* Customer Name and photo, location and phone */}

            {/* Transaction Details - Price, date, time, addOns(if any) */}

            {/* Additional fees (platform fees, processing fees) */}


        </ScrollView>
    )
};

export default BookingConfirmation;