import React, { useState } from 'react';
import { StyleText, StyledView, StyledBlurView, StyledDivider } from '@/components/shared/SharedStyles';
import Alert from '../shared/Alert/Alert';

const dummyDataCard = { 
    bookings: 2,
    requestedBookings: 1,
    status: 'Available',
    reviews: 1,
    transactions: 2,
    coupons: 0,
    earnings: 120
}

interface IBarberDataCard {
    bookings: number;
    requestedBookings: number;
    earnings: number;
}

const BarberDataCard = ({ bookings, requestedBookings, earnings}: IBarberDataCard) => {
    return (
        <StyledView direction="row" align="center" gap={20} style={{ marginVertical: 10 }}>
            <StyledView direction="column" align="center">
            </StyledView>
            <StyledBlurView isPaper direction="column" align="center" style={{ padding: 5,}}>
                <StyleText style={{ }}>Bookings:</StyleText>
                <StyleText style={{ fontSize: 15, fontWeight: 600}}>{bookings}</StyleText>
            </StyledBlurView>

            <StyledBlurView isPaper direction="column" align="center" style={{ padding: 5}}>
                <StyleText style={{ }}>Requested:</StyleText>
                <StyleText style={{ fontSize: 15, fontWeight: 600}}>{requestedBookings}</StyleText>
            </StyledBlurView>

            <StyledBlurView isPaper direction="column" align="center" style={{ padding: 5, minWidth: 120}}>
                <StyleText style={{ fontSize: 15 }}>Total Earnings</StyleText>
                <StyleText style={{ fontSize: 20, fontWeight: 600}}>${(earnings).toFixed(2)}</StyleText>
            </StyledBlurView>
          
        </StyledView>
    )
};

export default BarberDataCard;