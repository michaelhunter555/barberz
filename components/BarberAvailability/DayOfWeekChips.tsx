import * as React from 'react';
import { View, Text, ColorSchemeName, TouchableOpacity } from 'react-native';
import { Button, Chip, Icon, Divider, IconButton } from "react-native-paper";
import styled from 'styled-components/native';
import { StyledText, StyledBlurItem } from '../shared/SharedStyles';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';


interface IDayOfWeekChips {
    day?: string;
    value?: number;
    onPress: () => void;
    colorScheme: ColorSchemeName
    goBack: () => void;
    name: string;
    id?: number | string;
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generateGroupedSchedule = () => {
    let value = 0;
    const slots = [];

        for (let hour = 8; hour <= 16; hour++) {
            if (hour === 16) {
                slots.push({ value, hour, minute: 30 });
                value++;
                break;
            }

            slots.push({ value, hour, minute: 30 });
            value++;
        }

    return slots;
};


const DayOfWeekChips = ({id, day, value, onPress, colorScheme, goBack, name }: IDayOfWeekChips) => {
    const [price, setPrice] = React.useState<number>(50);
    const [openSchedule, setOpenSchedule] = React.useState();
    const [dayIndex, setDayIndex] = React.useState<number | null>(null);
    const [booking, setBooking] = React.useState<boolean>(false);
    const [bookingItems, setBookingItems] = React.useState<{ time: any, cost: string, }>({ time: "", cost: "50" })
    const dummySchedule = generateGroupedSchedule();
    const textColor = colorScheme === 'light' ? "#222" : "#999";
    const blurType = colorScheme === 'light' ? "dark" : "light"
    const iconColor = colorScheme === 'light' ? "#444" : "#f1f1f1"
    const blurIntensity = colorScheme === 'light' ? 35 : 50;
    const [addOns, setAddOns] = React.useState({
        addOnOne: false,
        addOnTwo: false,
        addOnThree: false,
    })

    const handleSetIndex = (index: number) => {
        setDayIndex((prev) => prev === index ? null : index)
    }

    const handleCreateBooking = (bookingTime: string) => {
        setBooking((prev) => !prev);
        setBookingItems({ time: bookingTime, cost: "50" })
    }

    const handleSelectAddOn = (addOn: string) => {
        if(addOn === 'addOnOne') {
            setPrice((prev) => !addOns.addOnOne ? prev + 25: prev - 25)
        }

        if(addOn === 'addOnTwo') {
            setPrice((prev) => !addOns.addOnTwo ? prev + 20: prev - 20)
        }

        if(addOn === 'addOnThree') {
            setPrice((prev) => !addOns.addOnThree ? prev + 150: prev - 150)
        }
        setAddOns((prev) => ({...prev, [addOn]: !prev[addOn as keyof typeof prev] }))
    }

    return (
        <StyledView direction="column" align="center" justify="center">
          
           {!booking && <IconButton onPress={ () => {
                goBack();
                }} icon="arrow-left"/>}
                {!booking && dummySchedule.map((slot, j) => (
                    <React.Fragment key={`${slot.hour}-${slot.minute}-${j}`}>
                        <View style={{padding: 5,  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15, justifyContent: 'center' }}>
                            <View>
                                <StyledText colorScheme={colorScheme}>{slot.hour}:{slot.minute}-{slot.hour + 2}:00</StyledText>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    handleCreateBooking(`${slot.hour}:${slot.minute}-${slot.hour + 2}:00`)
                                }}>
                                    <StyledBlurItem style={{ width: 80, ...(j % 3 === 0 && { backgroundColor: '#007AFF' }) }} intensity={blurIntensity} tint={blurType}>
                                        <StyledText style={{ fontWeight: 700 }}>{j % 3 === 0 ? "Book" : "Taken"}</StyledText>
                                    </StyledBlurItem>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <StyledText colorScheme={colorScheme}>${price} + (extras & tax)</StyledText>
                            </View>
                        </View>
                        <Divider style={{ width: '100%', marginVertical: 5 }} />
                    </React.Fragment>
                ))}

            {booking && (
                <>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-end' }}>
                    <View>
                        <IconButton icon={() => <Icon size={15} source="arrow-left" />} onPress={() => setBooking(false)} />
                        <StyledText colorScheme={colorScheme}>Book {name.split(" ")[0]} for ${price}.00 at {bookingItems.time}?</StyledText>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <StyledText style={{ fontSize: 20, fontWeight: 600 }} colorScheme={colorScheme}>${price}.00</StyledText>
                        <TouchableOpacity activeOpacity={0.7} onPress={() =>
                            router.push({ pathname: '/checkout/[id]', params: { id: String(id), price: String(price), time: bookingItems.time, name: String(name) } })
                        }>
                            <StyledBlurItem style={{ width: 120, backgroundColor: '#007AFF' }} intensity={blurIntensity} tint={blurType}>
                                <StyledText style={{ fontWeight: 700 }}>Go to Checkout</StyledText>
                            </StyledBlurItem>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider style={{ width: '100%', marginVertical: 5 }} />

                <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
                    <StyledText style={{ fontWeight: 700 }} colorScheme={colorScheme}>Available Add ons:</StyledText>
               <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() =>
                            handleSelectAddOn("addOnOne")
                        }>
                            <StyledBlurItem style={{ width: 120, backgroundColor: addOns.addOnOne ? '#007AFF' : 'white' }} intensity={blurIntensity} tint={blurType}>
                                <StyledText style={{ fontWeight: 700, color: addOns.addOnOne ? 'white': 'black' }}>Enhancements</StyledText>
                            </StyledBlurItem>
                        </TouchableOpacity>
                        <StyledText colorScheme={colorScheme}>$25</StyledText>
                        <Divider style={{ height: 10, width:1 }} />
                        <StyledText style={{ flex: 1}} colorScheme={colorScheme}>If you're thinning, I got you! I use italia crisps hair enhancments for a crispy thick look</StyledText>
               </View>
               <Divider style={{ width: '100%', marginVertical: 5 }} />
               <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>

                        <TouchableOpacity activeOpacity={0.7} onPress={() =>
                            handleSelectAddOn("addOnTwo")
                        }>
                            <StyledBlurItem style={{ width: 120, backgroundColor: addOns.addOnTwo ? '#007AFF' : 'white'  }} intensity={blurIntensity} tint={blurType}>
                                <StyledText style={{ fontWeight: 700, color: addOns.addOnTwo ? 'white': 'black' }}>Beard</StyledText>
                            </StyledBlurItem>
                        </TouchableOpacity>
                        <StyledText colorScheme={colorScheme}>$20</StyledText>
                        <Divider style={{ height: 10, width:1 }} />
                        <StyledText style={{ flex: 1 }} colorScheme={colorScheme}>Include a beard line-up.</StyledText>
               </View>
               <Divider style={{ width: '100%', marginVertical: 5 }} />
               <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>

                        <TouchableOpacity activeOpacity={0.7} onPress={() =>
                            handleSelectAddOn("addOnThree")
                        }>
                            <StyledBlurItem style={{ width: 120, backgroundColor: addOns.addOnThree ? '#007AFF' : 'white'  }} intensity={blurIntensity} tint={blurType}>
                                <StyledText style={{ fontWeight: 700, color: addOns.addOnThree ? 'white': 'black' }}>Scalp exfoliation</StyledText>
                            </StyledBlurItem>
                        </TouchableOpacity>
                        <StyledText colorScheme={colorScheme}>$150</StyledText>
                        <Divider style={{ height: 10, width:1 }} />
                        <StyledText style={{ flex: 1 }} colorScheme={colorScheme}>Deep scalp exfoliation targeting follicticitus issues and hydrating your scalp back to the feel of a new born.</StyledText>
               </View>
                </View>
                </>
            )}

        </StyledView>

    )

}

const StyledView = styled.View`
flex: 1;
display: flex;
flex-direction: column;
gap: 5px;
`

export default DayOfWeekChips;