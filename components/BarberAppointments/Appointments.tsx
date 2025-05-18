import React from 'react';
import { StyledView } from '../shared/SharedStyles';
import { router } from 'expo-router';
import Card from '../shared/Cards/InfoCard';

const tempImgPath = "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww";

const BarberAppointments = () => {

    return (
        <StyledView style={{ marginTop: 20 }}>
            <Card
            imgPath={tempImgPath}
            label="Upcoming"
            buttonRightText='View Booking'
            onRightButtonClick={() => router.push({ pathname: '/Faqs'})}
            buttonLeftText='Reschedule'
            onLeftButtonClick={() => console.log("reschedule")}
            description='3:00pm - Tim McAllister - Confirmed*'
            />
        </StyledView>
    )
}

export default BarberAppointments;