import React, { useState } from 'react';
import { router } from 'expo-router';
import { StyledView, StyleText, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import { Avatar, Icon, Button, IconButton } from 'react-native-paper';
import UserInfoSection from '../Settings/UserInfoSection';
import BookingDetails from './BookingDetails';
import AccordionGroup from '../Accordion/AccordionGroup';
import Modal from '../shared/Modals/Modal';

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
        const [isStarted, setIsStarted] = useState<boolean>(false);
        const [isComplete, setIsComplete] = useState<boolean>(false);
        const [isOpen, setIsOpen] = useState<boolean>(false);

        const handleBookingAction = () => {
            if(!isStarted) {
                setIsStarted(true);
            } else if(isStarted && !isComplete){
                setIsOpen(prev => !prev);
            }
        }
       

    const supportArr = [
        {id: 0, isOpen: false, questionText: "Report a problem?", explanationText: "If there is something wrong with the booking, or you are unable to get in contact with the customer please follow the steps below.", Component:  ( 
        <StyledView direction="row" justify="center" style={{ marginTop: 10}}>
            <Button mode="contained" onPress={() => void console.log("report problem")}>Report a Problem</Button>
       </StyledView>) },
        {id: 1, isOpen: false, questionText: "Need to cancel?", explanationText: "Canceling an appointment after confirming is disappointing for all sides. However, we understand life happens. I", Component: (
            <StyledView direction="row" justify="center" style={{ marginTop: 10}}>
             <Button onPress={() => void console.log("cancel modal")} textColor='red' mode="text">Cancel Booking</Button>
       </StyledView>)
        }
    ];

    return (
        <StyledView style={{ flex: 1 }}>
        {/* Confirm completion Modal */}
        <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        text="Please confirm that the appointment is complete."
        header="Confirm Completion"
        >
            <Button mode="contained" onPress={() => {
                setIsComplete(true);
                setIsOpen(false);
                }}>I confirm</Button>
        </Modal>

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
            {!isComplete && <StyledView direction="row" align="center" gap={10}>
            <IconButton onPress={() => void console.log("phone call")} size={15} mode="contained" icon="phone" />
            <IconButton onPress={() => void console.log("send message")} size={15} mode="contained" icon="message" />
            </StyledView>}
            <StyledView direction="row" align="center" gap={10}>
            {!isStarted && <StyledBlurView style={{ padding: 7 }} clickable onClick={() => void console.log("reschedule")}>
                <StyleText style={{ fontWeight: 600 }}>Reschedule?</StyleText>
            </StyledBlurView>}

            {/* Servicer has not accepted booking yet */}
            {status === 'unconfirmed' && (
                <>
                  <StyledBlurView style={{ padding: 7,  backgroundColor: 'green'}} clickable onClick={() => void console.log("Accept")}>
                <StyleText style={{ fontWeight: 600, color: 'white' }}>Accept</StyleText>
            </StyledBlurView>
            <StyledBlurView style={{ backgroundColor: 'red', padding: 7}} clickable onClick={() => void console.log("Rejected")}>
                <StyleText style={{ fontWeight: 600, color: 'white' }}>Reject</StyleText>
            </StyledBlurView>
                </>
            )}
            </StyledView>
        </StyledView>

        {/* Booking Details */}
        <BookingDetails
        onBookingAction={handleBookingAction}
        isComplete={isComplete}
        isStarted={isStarted}
        status={String(status)}
        date={String(date)}
        price={Number(price)}
        addOns={addOns as string[]}
        />

        {/* a booking can only be canceled before it starts. Otherwise the user should report a problem. */}
        {status === "confirmed" && (         
            <StyledView style={{ marginTop: 30 }}>
                <AccordionGroup hasComponent arr={supportArr} />
            </StyledView>
        )}

       </StyledView>
    )
};

export default BookingConfirmationCard;