import * as React from 'react';
import useAuth from '@/context/auth/use-auth';
import { View, Text, ColorSchemeName, TouchableOpacity } from 'react-native';
import { Button, Chip, Icon, Divider, IconButton, SegmentedButtons } from "react-native-paper";
import styled from 'styled-components/native';
import { StyledText, StyledBlurItem, StyleText, StyledBlurView, StyledView, StyledDivider } from '../shared/SharedStyles';
import { BlurView } from 'expo-blur';
import { router, Link } from 'expo-router';
import colorWheel from '@/lib/colorWheel';
import { setColorType } from '@/lib/helpers';
import { IDaySlot, IScheduleByDay, Services } from '@/types';
import { formatToAMPM } from '@/lib/convertDateToSlot';


interface IDayOfWeekChips {
    day?: string;
    value?: number;
    onPress: () => void;
    colorScheme: ColorSchemeName
    goBack: () => void;
    name: string;
    id?: number | string;
    image?: string;
    services?: Services[];
    timeSlots?: IDaySlot[]
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


const DayOfWeekChips = ({ id, day, value, onPress, colorScheme, goBack, name, services, timeSlots, image }: IDayOfWeekChips) => {
    const auth = useAuth();
    const [price, setPrice] = React.useState<number>(Number(auth?.userAuth?.startingPrice));
    const [dayIndex, setDayIndex] = React.useState<number | null>(null);
    const [booking, setBooking] = React.useState<boolean>(false);
    const [bookingItems, setBookingItems] = React.useState<{ time: any, cost: string, }>({ time: "", cost: "50" })
    const blurType = colorScheme === 'light' ? "dark" : "light";
    const blurIntensity = colorScheme === 'light' ? 35 : 50;
    const [serviceLocationType, setServiceLocationType] = React.useState<"shop" | "home">("shop");
    const [totalAddOns, setTotalAddOns] = React.useState<Services[]>([]);
    const { text: textColor } = setColorType("info", colorScheme);

    console.log("services: ", services?.map((service,i) => service.name));
    console.log("timeSlots: ", timeSlots);

    const handleServiceLocation = () => {
        setServiceLocationType((prev) => {
          setPrice(prevPrice => prev === 'shop' ? prevPrice + 150 : prevPrice - 150);
            return prev === 'shop' ? 'home' : 'shop'
        });
        
    }

    const handleSetIndex = (index: number) => {
        setDayIndex((prev) => prev === index ? null : index)
    }

    const handleCreateBooking = (bookingTime: string) => {
        setBooking((prev) => !prev);
        setBookingItems({ time: bookingTime, cost: String(price) })
    }

   const handleAddService = (addOn: Services, price: number) => {
    setTotalAddOns((prev) => {
        const selectedService = prev.find((service) => service._id === addOn._id);
        setPrice((prev) => !selectedService ? prev + price : prev - price);
        return !selectedService ? [...prev, addOn] : prev.filter((service) => service._id !== addOn._id);
    })
   }

    return (
        <StyledView style={{ flex: 1 }} gap={5} direction="column">

            {!booking && <IconButton onPress={() => {
                goBack();
            }} icon="arrow-left" />}
            {!booking && timeSlots?.map((slot, j) => (
                <React.Fragment key={`${slot.startTime.hour}-${slot.endTime.minute}-${j}`}>
                    <View style={{ padding: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15, justifyContent: 'center' }}>
                        <View>
                            <StyledText colorScheme={colorScheme}>{formatToAMPM(slot.startTime.hour, slot.startTime.minute)}-{formatToAMPM(slot.endTime.hour, slot.endTime.minute)}</StyledText>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                handleCreateBooking(`${formatToAMPM(slot.startTime.hour, slot.startTime.minute)}-${formatToAMPM(slot.endTime.hour, slot.endTime.minute)}`)
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
                    <IconButton icon={() => <Icon size={15} source="arrow-left" />} onPress={() => setBooking(false)} />
                    {/* Price Card */}
                    <StyledBlurView direction="column" isPaper style={{ flex: 1, padding: 10 }}>
                          {/* Preview  */}
                          <View>
                                    <StyledView direction="column" gap={5}>
                                        <StyledView direction="row" align="center" gap={3}>
                                            <StyleText style={{ fontWeight: 700, fontSize: 18 }}>Booking Preview</StyleText>  
                                        </StyledView>
                                        
                                    </StyledView>
                                </View>
                    <View style={{ marginVertical: 10 }}>
                        {/* Service Type */}
                        <StyleText style={{ marginBottom: 3, fontWeight: 600 }}>Service Type*: </StyleText>
                        <SegmentedButtons
                            density='high'
                            value={serviceLocationType}
                            onValueChange={handleServiceLocation}
                            buttons={[{
                                ...(serviceLocationType === 'shop' && {
                                    style: { backgroundColor: colorScheme === 'light' ? '#ddd' : 'white' },
                                }),
                                icon: 'store', value: "shop", label: 'Shop visit'
                            }, {
                                ...(serviceLocationType === 'home' && {
                                    style: { backgroundColor: colorScheme === 'light' ? '#ddd' : 'white' },

                                }),
                                icon: 'walk', value: 'home', label: 'House-call ($150)'
                            },]}
                        />
                    </View>
                        {/* Booking Details Row */}
                        <StyledView direction="row" align="center" justify="space-between">
                            <StyledView direction="row" gap={10}>
                        
                               
                                  {/* Service Type & Location */}
                                  <StyledView direction="row" align="center" gap={4} style={{ marginTop: 5}}>
                                    <StyledBlurView direction="row" gap={4} style={{ padding: 3}}>
                                    <StyledView direction="row" align="center" gap={2}>
                                        <Icon color={textColor} source={serviceLocationType === 'home' ? 'walk' : 'store'} size={15} />
                                        <StyleText style={{ fontSize: 15, color: textColor }}>{serviceLocationType === 'home' ? 'House call' : 'Shop Visit'}</StyleText>
                                    </StyledView>
                                    <StyledView direction="row" align="center" gap={3}>

                                        <StyleText style={{ fontWeight: 600, color: textColor }}>@{bookingItems.time}</StyleText>
                                    </StyledView>
                                    </StyledBlurView>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                                {/* Add on items */}
                                <StyledView direction="row" align="center" gap={5} style={{ marginVertical: 10, flexWrap: 'wrap', }}>
                                    <StyleText style={{ fontWeight: 700 }}>Add ons:</StyleText>
                                    {totalAddOns 
                                    && totalAddOns.length > 0 ? 
                                    totalAddOns.map((addOn, i) => <StyledBlurView align="center" key={i} style={{ backgroundColor: colorWheel(i), padding: 3 }}>
                                        <StyleText style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
                                            {addOn.name}
                                            </StyleText>
                                            </StyledBlurView>) 
                                    : <StyleText>None</StyleText>}
                                </StyledView>
                                <StyledView style={{ marginBottom: 10 }}>

                    {/* <StyleText style={{ fontSize: 15 }}>Location:</StyleText> */}
                    { serviceLocationType === 'home' &&  <StyledView direction="row" gap={3}>
                        <Icon color={textColor} source="information-outline" size={13} />
                    <StyleText style={{ color: textColor }}>{name.split(" ")[0]} will come to your listed address.</StyleText>
                    </StyledView>}

                    <StyledView direction="row" align="center" style={{ marginTop: 8 }}>
                        <Icon source="map-marker" size={13} />
                        {/* <Button onPress={() => router.push({ pathname: "/explore" })} textColor='#007AFF' mode="text">{serviceLocationType === 'home' ? "4340 shakespear rd. Baltimore, MD, 21245" : "St Drury Ln, Baltimore, Maryland 21232"} </Button> */}
                    <StyleText> {serviceLocationType === 'home' ? "4340 shakespear rd. Baltimore, MD, 21245" : "St Drury Ln, Baltimore, Maryland 21232"} </StyleText>
                    </StyledView>


                                </StyledView>
                        {/* Total Price */}
                        <View style={{ display: 'flex', flexDirection: 'column', }}>
                            <StyledView direction="row" gap={2}>
                                <StyleText style={{ fontSize: 10, }}>Total:</StyleText>
                                <StyledText style={{ fontSize: 20, fontWeight: 600 }} colorScheme={colorScheme}>${(price).toFixed(2)}</StyledText>
                            </StyledView>
                            {/* Go to checkout button */}
                            <StyledDivider orientation="horizontal" marginVertical={5} />
                            <StyledBlurView 
                            direction="row" 
                            justify="center" 
                            align="center" 
                            gap={3} 
                            style={{ backgroundColor: '#007AFF', padding: 10 }} 
                            clickable 
                            onClick={() => router.push({ pathname: '/checkout/[id]', params: { id: String(id), image: String(image),  price: String(price), time: bookingItems.time, name: String(name), addOns: JSON.stringify(totalAddOns), timeSlot: String() } })}>
                                <StyledText style={{ fontWeight: 700, fontSize: 17, color: 'white' }}>Go to Checkout</StyledText>
                                <Icon color="white" source="arrow-right" size={17} />
                            </StyledBlurView>
                        </View>
                    </StyledBlurView>
                  
                    <Divider style={{ width: '100%', marginVertical: 5 }} />
                    {/* Start of Add on Options */}
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <StyledText style={{ fontWeight: 700 }} colorScheme={colorScheme}>Availableadd ons:</StyledText>
                        {services && services.length > 0 && services.map((service, i) => {
                            const isSelected = totalAddOns.some(s => s._id === service._id);
                            return(
                                (
                                    <React.Fragment key={service?._id}>
                                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() =>
                                        handleAddService(service, service.price)
                                    }>
                                        <StyledBlurItem style={{ width: 120, backgroundColor: isSelected ? '#007AFF' : 'white' }} intensity={blurIntensity} tint={blurType}>
                                            <StyledText style={{ fontWeight: 700, color: isSelected ? 'white' : 'black' }}>{service.name}</StyledText>
                                        </StyledBlurItem>
                                    </TouchableOpacity>
                                    <StyledText colorScheme={colorScheme}>${service.price}</StyledText>
                                    <Divider style={{ height: 10, width: 1 }} />
                                    <StyledText style={{ flex: 1 }} colorScheme={colorScheme}>{service.description}</StyledText>
                                </View>
                                {i !== services.length - 1 && <Divider style={{ width: '100%', marginVertical: 5 }} />}
                                    </React.Fragment>
                                )
                            )
                        })}
                    </View>
                </>
            )}

        </StyledView>

    )

}



export default DayOfWeekChips;