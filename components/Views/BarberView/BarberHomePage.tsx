import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Switch } from 'react-native';
import useAuth from '@/context/auth/use-auth';
import { StyleText, StyledView, StyledDivider } from '@/components/shared/SharedStyles';
import UserInfoSection from '@/components/Settings/UserInfoSection';
import BarberDataCard from '@/components/BarberDataCard/BarberDataCard';
import BarberAppointments from '@/components/BarberAppointments/Appointments';
import BarberServices from '@/components/BarberServices/BarberServices';
import BarberSchedule from '@/components/BarberSchedule/BarberSchedule';
import TabContainer from '@/components/shared/TabContainer/TabContainer';
import { Button } from 'react-native-paper';
import { tempData } from '@/lib/dummyDataCards';


const tempImgPath = "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww";

const tempValue = 62.34;
const tempUnconfirmed = 5;

const BarberHomeDashboard = () => {
    const auth = useAuth();
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isPublic, setIsPublic] = useState<boolean>(false);

    const handleVisibility = (value: boolean) => setIsPublic(value);

    // Get latest data
    // TODO: get status, price, customer name, img, date and type + booking id

    return (
        <StyledView>
            {/* user info */}
            <StyleText>Home Dashboard</StyleText>
            <UserInfoSection 
            userImgPath={String(auth?.userAuth?.image)} 
            name={String(auth?.userAuth?.name)} />

            <StyledDivider orientation="horizontal" marginVertical={10} />

            {/* Data Cards (i.e. stats) */}
            <StyleText>Your performance today:</StyleText>
            <BarberDataCard />

            {/* View Appointments & View unconfirmed */}
            <StyledView 
            style={{ marginTop: 20}} 
            direction="row" 
            align="center" 
            justify="center" 
            gap={10}>
                <Button onPress={() => router.push({ pathname: '/booking' })} icon="check-circle-outline" compact mode="contained">Bookings</Button>
                <Button onPress={() => router.push({ pathname: '/booking' })} mode="outlined">{tempUnconfirmed} need confirmation!</Button>
            </StyledView>

            {/* Appointments */}
            <BarberAppointments
            value={tempData[0].price}
            imgPath={tempData[0].imgPath}
            status={tempData[0].status}
            id={tempData[0].id as number}
            type={tempData[0].type}
            customerName={tempData[0].customerName}
            date={tempData[0].date}
            addOns={tempData[0].addOns}
            headerText="Recently Confirmed"

            />

            {/* Awaiting Confirmation */}
            <BarberAppointments
            value={tempData[tempData.length - 1].price}
            imgPath={tempData[tempData.length - 1].imgPath}
            status={tempData[tempData.length - 1].status}
            id={tempData[tempData.length - 1].id as number}
            type={tempData[tempData.length - 1].type}
            customerName={tempData[tempData.length - 1].customerName}
            date={tempData[tempData.length - 1].date}
            addOns={tempData[tempData.length - 1].addOns}
            headerText="Awaiting Your Response"
            />

            {/* Profile Visibility */}
            <StyledView style={{ marginTop: 20 }}>
                <StyleText style={{ fontWeight: 700, fontSize: 15 }}>Profile Visibility</StyleText>
                <StyledView direction="row" align="center" gap={3}>
                <Switch value={isPublic} onValueChange={(v: boolean) => handleVisibility(v)} />
                <StyleText style={{ fontSize: 13 }}>{isPublic ? "Public":"Hidden"}</StyleText>
                </StyledView>
            </StyledView>

            {/* Schedule, Services & Coupons & Create */}
            <TabContainer 
            tabIndex={tabIndex} 
            onSelect={(i: number) => setTabIndex(i)} />

        </StyledView>
    )
}

export default BarberHomeDashboard;