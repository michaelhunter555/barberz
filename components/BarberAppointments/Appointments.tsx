import React, { useState } from 'react';
import { StyledBlurView, StyledDivider, StyledView, StyleText } from '../shared/SharedStyles';
import { router } from 'expo-router';
import Card from '../shared/Cards/InfoCard';
import { View, TouchableOpacity, Image } from 'react-native';
import { Avatar, Chip, Icon } from 'react-native-paper';
import AppointmentCard from './AppointmentCard';

interface IBarberAppointments {
    value: number;
    headerText: string;
    imgPath: string;
    id: string | number; 
    type: string;
    addOns: string[], 
    status: string, 
    customerName: string, 
    date: string;
}

const BarberAppointments = ({ value, headerText, imgPath,  id, type, addOns, status, customerName, date}: IBarberAppointments) => {
    return (
        <StyledView style={{ marginTop: 20 }}>
            <StyledView justify="center" align="flex-start">         
            {/* Confirmed appointment */}
            <StyleText style={{ fontWeight: 700, fontSize: 15 }}>{headerText}</StyleText>
            </StyledView>
            {/* Appointment Card */}
                   <AppointmentCard
                    value={value}
                    customerImg={imgPath}
                    id={id}
                    type={type}
                    addOns={addOns}
                    status={status}
                    customerName={customerName}
                    date={date}
                   />
        </StyledView>
    )
}

export default BarberAppointments;