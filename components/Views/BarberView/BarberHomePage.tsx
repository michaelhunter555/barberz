import React from 'react';
import useAuth from '@/context/auth/use-auth';
import { StyleText, StyledView, StyledDivider } from '@/components/shared/SharedStyles';
import UserInfoSection from '@/components/Settings/UserInfoSection';
import BarberDataCard from '@/components/BarberDataCard/BarberDataCard';
import BarberAppointments from '@/components/BarberAppointments/Appointments';
import BarberServices from '@/components/BarberServices/BarberServices';
import BarberSchedule from '@/components/BarberSchedule/BarberSchedule';

const BarberHomeDashboard = () => {
    const auth = useAuth();

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

            {/* Appointments */}
            <BarberAppointments />

            {/* Services */}
            <BarberServices />

            {/* Schedule */}
            <BarberSchedule />

        </StyledView>
    )
}

export default BarberHomeDashboard;