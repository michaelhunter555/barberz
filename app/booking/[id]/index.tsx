import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleText, StyledView, StyledBlurView } from '../../../components/shared/SharedStyles';
import { ScrollView } from 'react-native';
import BookingConfirmationCard from '@/components/BookingConfirmationCard/BookingConfirmationCard';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookingConfirmation = () => {
    const { id, user } = useLocalSearchParams();
    const customer = JSON.parse(user as string);
    return (
        <SafeAreaView>
        <ScrollView
        showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false} 
        style={{ padding: 10 }}>
            <StyledView style={{ marginBottom: 10}}>
            <GoBackArrow />
            </StyledView>

            <StyledBlurView align="center" justify="center" borderRadius={10} style={{ padding: 3, marginBottom: 10 }}>
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
        </SafeAreaView>
    )
};

export default BookingConfirmation;