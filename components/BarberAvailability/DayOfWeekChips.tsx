import * as React from 'react';
import { View, Text, ColorSchemeName, TouchableOpacity } from 'react-native';
import { Button, Chip, Icon, Divider, IconButton } from "react-native-paper";
import styled from 'styled-components/native';
import { StyledText, StyledBlurItem } from '../shared/SharedStyles';
import { BlurView } from 'expo-blur';

interface IDayOfWeekChips {
    day?: string;
    value?: number;
    onPress: () => void;
    colorScheme: ColorSchemeName
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generateGroupedSchedule = () => {
    const schedule = [];
    let value = 0;

    for (const day of days) {
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

        schedule.push({ day, slots });
    }

    return schedule;
};


const DayOfWeekChips = ({ day, value, onPress, colorScheme }: IDayOfWeekChips) => {
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
        <StyledView>
            {!booking && dummySchedule.map(({ day, slots }, i) => {
                return (
                    <View key={i}>
                        <Chip textStyle={{ color: slots[i].value === dayIndex ? 'black' : 'white' }} style={{ backgroundColor: slots[i].value === dayIndex ? 'white' : '#222', marginBottom: 5 }} icon={() => <Icon color={slots[i].value === dayIndex ? "white" : "white"} source="eye" size={20} />} onPress={() => handleSetIndex(slots[i].value)}>
                            {day} - {slots[0].hour}:{slots[0].minute} to {slots[slots.length - 1].hour}:{slots[slots.length - 1].minute}
                        </Chip>
                        {slots[i].value === dayIndex && slots.map((slot, j) => (
                            <React.Fragment key={`${slot.hour}-${slot.minute}-${j}`}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, width: "90%", justifyContent: 'space-between' }}>
                                    <View>
                                        <StyledText colorScheme={colorScheme}>{slot.hour}:{slot.minute}-{slot.hour + 2}:00</StyledText>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                            handleCreateBooking(`${slot.hour}:${slot.minute}-${slot.hour + 2}:00`)
                                            console.log(`pressed ${dummySchedule[i].day} - ${slot.hour}:${slot.minute}`)
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
                        ))
                        }
                    </View>
                )
            })}

            {booking && (
                <>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-end' }}>
                    <View>
                        <IconButton icon={() => <Icon size={15} source="arrow-left" />} onPress={() => setBooking(false)} />
                        <StyledText colorScheme={colorScheme}>Book [name] for ${price}.00 at {bookingItems.time}?</StyledText>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <StyledText style={{ fontSize: 20, fontWeight: 600 }} colorScheme={colorScheme}>${price}.00</StyledText>
                        <TouchableOpacity activeOpacity={0.7} onPress={() =>
                            console.log(`pressed checkout proceed`)
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