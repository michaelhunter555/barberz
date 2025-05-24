import React from 'react';
import { StyleText, StyledView, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import colorWheel from '@/lib/colorWheel';
import { Icon } from 'react-native-paper';

interface IBookingDetails {
date: string;
price: number;
addOns: string[];
};

const BookingDetails = ({ date, price, addOns}: IBookingDetails) => {
return (
    <StyledView style={{ flex: 1, marginTop: 10 }}>
        <StyleText style={{ fontWeight: 700, fontSize: 20 }}>Booking Details</StyleText>
        <StyledView gap={5} style={{ marginTop: 10 }}>

            <StyledView direction="row" align="center" gap={10}>
                <StyleText>Location:</StyleText>
            {/* Reverse customer coordinates unless barber shop */}
            <StyleText style={{ color: '#007AFF'}}>3432 RamsLane Rd., Laurel, Md 20203</StyleText>
            </StyledView>
            <StyledView direction="row" align="center" gap={5}>
                <StyleText>Date: </StyleText>
                <StyleText style={{ fontSize: 15 }}>{ date }</StyleText>
            </StyledView>

            <StyledView direction="row" align="center" gap={5}>
                <StyleText>Total: </StyleText>
                <StyleText style={{ fontSize: 15 }}>${ price }</StyleText>
            </StyledView>
            
            <StyleText style={{ fontWeight: 700 }}>Add ons:</StyleText>
        <StyledView direction="row" gap={10}>
            {addOns && addOns.length > 0 ? addOns.map((addOn, i) => <StyledBlurView key={i} style={{ backgroundColor: colorWheel(i), padding: 5 }}><StyleText>{addOn}</StyleText></StyledBlurView>): <StyleText>None</StyleText>}
        </StyledView>
        
            <StyledView direction="row" align="center" gap={5}>
                <StyleText>Tip: </StyleText>
                <StyleText style={{ fontSize: 15 }}>$5.00</StyleText>
            </StyledView>

            <StyledView direction="row" align="center" gap={5}>
                <StyleText>Discount: </StyleText>
                <StyleText style={{ fontSize: 15 }}>$0.00</StyleText>
            </StyledView>

            <StyledView direction="row" align="center" gap={5}>
                <StyleText>Fees (10%) <Icon source="information"size={10} />: </StyleText>
                <StyleText style={{ fontSize: 15 }}>$10.54</StyleText>
            </StyledView>
            
            
            
            
        </StyledView>
    </StyledView>
)
};

export default BookingDetails;