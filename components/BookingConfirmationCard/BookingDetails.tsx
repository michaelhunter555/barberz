import React from 'react';
import { useColorScheme } from 'react-native';
import { StyleText, StyledView, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import colorWheel from '@/lib/colorWheel';
import { Icon, Card } from 'react-native-paper';

interface IBookingDetails {
date: string;
price: number;
addOns: string[];
status: string;
isStarted?: boolean;
isComplete?: boolean;
onBookingAction?: () => void;
};

const BookingDetails = ({ date, price, addOns, status, isStarted, isComplete, onBookingAction}: IBookingDetails) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
return (
    <StyledView style={{ flex: 1, marginTop: 10 }}>
        <StyleText style={{ fontWeight: 700, fontSize: 20 }}>Booking Details</StyleText>
        <Card mode="elevated" style={{ padding: 10}}>
            <StyleText style={{ opacity: 0.5 }}>Booking #1778</StyleText>
        <StyledView gap={5} style={{ marginTop: 10 }}>

            <StyledView direction="row" align="center" gap={10}>
                <StyleText>Location:</StyleText>
            {/* Reverse customer coordinates unless barber shop */}
            <StyleText style={{ fontSize: 15, color: '#007AFF'}}>3432 RamsLane Rd., Laurel, Md 20203</StyleText>
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
                <StyleText style={{ fontSize: 15 }}>${ (price * 0.10).toFixed(2) }</StyleText>
            </StyledView>
            
            <StyledDivider orientation="horizontal" style={{ width: '90%'}} />

            <StyledView style={{ flex: 1, flexWrap: 'wrap'}} direction="row" align="center" gap={5}>
                <StyleText>&bull; After completion, you will be receive</StyleText>
                <StyleText style={{ fontSize: 15, color: isDark ? 'lightgreen' : 'green', fontWeight: 700, }}>${(price - (price * 0.10) + 5).toFixed(2)}</StyleText>
            </StyledView>
            
            <StyledView style={{ flex: 1, flexWrap: 'wrap'}} direction="row" align="center" gap={5}>
                <StyleText>&bull; You received a tip of </StyleText>
                <StyleText style={{ fontSize: 15, color: isDark ? 'lightgreen': 'green', fontWeight: 700, }}>$5.00</StyleText>
            </StyledView>

            <StyledView style={{ flex: 1, flexWrap: 'wrap'}} direction="row" align="center" gap={5}>
                <StyleText>&bull; A platform fee of </StyleText>
                <StyleText style={{ fontSize: 15, color: isDark ? 'lightcoral': "red", fontWeight: 700, }}>${(price * 0.10).toFixed(2)}</StyleText>
                <StyleText>will be deducted.</StyleText>
            </StyledView>

            {/* 
            Completed Service Button - Important! Only shown when a booking is confirmed  and:
            A. a certain amount of time has passed (time slot is reaching end)
            B. The user marked the service complete before time has ended.

            TESTING: using status
            */}

            {status === 'confirmed' && (
                <>
            <StyledDivider orientation="horizontal" marginVertical={5}/>
            <StyledView gap={10}>
                <StyledBlurView 
                clickable
                onClick={onBookingAction} 
                isButton={!isStarted} 
                isDisabled={isComplete} 
                direction="row" 
                gap={10} 
                justify="center" 
                align='center' 
                borderRadius={20} 
                style={{ padding: 8, backgroundColor: !isComplete ? 'green': "" }}>
                    <StyleText style={{ fontWeight: 700, fontSize: 15 }}>{isStarted  && !isComplete ? "Mark as Completed" : isStarted  && isComplete ? "Completed" :"Mark as Started"}</StyleText>
                    <Icon source="check-circle" size={20} />
                </StyledBlurView>
            </StyledView>
                </>
            )}
            
        </StyledView>
        </Card>
    </StyledView>
)
};

export default BookingDetails;