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

const BarberDataCard = () => {

    return (
        <StyledView direction="row" align="center" gap={20}>
            <StyledBlurView direction="column" align="center" style={{ padding: 5,}}>
                <StyleText style={{ }}>Bookings:</StyleText>
                <StyleText style={{ fontSize: 15, fontWeight: 600}}>{dummyDataCard.bookings}</StyleText>
            </StyledBlurView>

            <StyledBlurView direction="column" align="center" style={{ padding: 5}}>
                <StyleText style={{ }}>Requested:</StyleText>
                <StyleText style={{ fontSize: 15, fontWeight: 600}}>{dummyDataCard.requestedBookings}</StyleText>
            </StyledBlurView>

            <StyledBlurView direction="column" align="center" style={{ padding: 5, minWidth: 120}}>
                <StyleText style={{ fontSize: 15 }}>Total Earnings</StyleText>
                <StyleText style={{ fontSize: 20, fontWeight: 600}}>${(dummyDataCard.earnings).toFixed(2)}</StyleText>
            </StyledBlurView>
          
        </StyledView>
    )
};

export default BarberDataCard;