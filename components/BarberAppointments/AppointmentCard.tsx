import React, { useState } from 'react';
import useAuth from '@/context/auth/use-auth';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { StyledView, StyleText, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import { Icon, Chip, Avatar} from 'react-native-paper';
import colorWheel from '@/lib/colorWheel';

interface IAppointmentCard {
    value: number;
    customerImg: string;
    id?: number | string;
    customerName?: string;
    status?: string;
    date?: string;
    type?: string;
    addOns?: string[]
};

const AppointmentCard = ({
    id, 
    value, 
    customerImg, 
    type, 
    addOns, 
    status, 
    customerName,
    date
}: IAppointmentCard) => {
    const auth = useAuth();
    const isBarber = auth?.userAuth?.accountType === 'barber';

    const user = {
    id, 
    value, 
    customerImg, 
    type, 
    addOns, 
    status, 
    customerName,
    date
};

    return (
        <StyledView style={{ width: '100%' }}>
        <StyledBlurView
        isPaper
        direction="row"
        borderRadius={8}
        gap={10}
            style={{
                width: '100%',
                marginVertical: 5,
                padding: 10,
            }}>
                <StyledView direction="column" align="center">
                    <StyleText style={{ color: '#888'}}>booking #2948</StyleText>
            {isBarber && <StyledView direction="row" align="center" gap={3}>
                <Icon color={value > 0 ? "green":"red"} size={12} source={value > 0 ? "plus-circle" : "minus-circle"} />
            <StyleText style={{  fontSize: 25, fontWeight: 700 }}>${value}</StyleText>
            </StyledView>}
            <Chip mode="flat" icon={() => <Icon source="information" size={15} color={type === "premium" ? "gold":"white"} />} theme={{ roundness: 10 }} textStyle={{ color: type === "premium" ? "gold" : 'white' }}>
                {type}
            </Chip>
                </StyledView>
                <StyledDivider orientation="vertical" />
            <View style={{ flex: 1 }}>

                {/* customer image and name */}
                <StyledView direction="row" align="center" gap={5}>
                    <Avatar.Image source={{ uri: customerImg }} size={15} />
                <StyleText style={{ flex: 1, fontSize: 15, fontWeight: 700 }}>{customerName}</StyleText>
                </StyledView>

                {/* Date */}
                <StyleText style={{ flex: 1, color: "#888" }}>{date}</StyleText>

                {/* add ons */}
                <StyledView direction="row" align="flex-start">
               <StyledView direction="column" gap={5} style={{ ...(addOns && addOns?.length > 0 && { marginBottom: 10})}}>
                { addOns && addOns?.length > 0 && <StyleText>Add Ons:</StyleText>}
                {addOns && addOns?.length > 0 ? addOns.map((addOn,i) => (
                    <StyledBlurView key={i} style={{ padding: 3, backgroundColor: colorWheel(i) }}>
                        <StyleText style={{ flex: 1, fontWeight: 600, marginLeft: 5, color: 'white'}}>{addOn}</StyleText>
                    </StyledBlurView>
                    ))
                    : (
                        <StyledView direction="row" gap={2} align="center">
                             <StyleText>Add On: </StyleText>
                    <StyleText style={{ color: "#888"}}>None</StyleText>
                    </StyledView>
                    )}
               </StyledView>
                </StyledView>
                
               {/* Buttons */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => void router.push({ pathname: '/booking/[id]/reschedule', params: { id: String(id) }})}>
                        <StyleText style={{ color: '#007AFF' }}>Reschedule</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => void router.push({ pathname: '/booking/[id]', params: { id: String(id), user: JSON.stringify(user) }})}>
                        <StyledBlurView
                        isButton
                        borderRadius={8}
                        direction='row'
                        gap={3}
                        style={{ padding: 4 }}>
                            <StyleText style={{ fontWeight: 600, }}>{status === "unconfirmed" ? "Confirm":"View"}</StyleText>
                            <Icon source="eye" size={15} />
                        </StyledBlurView>
                    </TouchableOpacity>
                </View>
            </View>
        </StyledBlurView>
    </StyledView>
    )
}

export default AppointmentCard;