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
const [openSchedule, setOpenSchedule] = React.useState();
const [dayIndex, setDayIndex] = React.useState<number | null>(null);
const [booking, setBooking] = React.useState<boolean>(false);
const [bookingItems, setBookingItems] = React.useState<{time: any, cost: string, }>({time: "", cost: "50"})
const dummySchedule = generateGroupedSchedule();
const textColor = colorScheme === 'light' ? "#222" : "#999";
const blurType = colorScheme === 'light' ? "dark" : "light"
const iconColor = colorScheme === 'light' ? "#444" : "#f1f1f1"
const blurIntensity = colorScheme === 'light' ? 35 : 50;

const handleSetIndex = (index: number) => {
    setDayIndex((prev) => prev === index ? null: index)
}

const handleCreateBooking = (bookingTime: string) => {
    setBooking((prev) => !prev);
    setBookingItems({ time: bookingTime, cost: "50" })

}

return (
    <StyledView>
        {!booking && dummySchedule.map(({ day, slots}, i) => {          
            return (
                    <View key={i}>
                        <Chip textStyle={{ color: slots[i].value === dayIndex ? 'black':'white'}} style={{ backgroundColor: slots[i].value === dayIndex ? 'white':'#222', marginBottom: 5 }} icon={() => <Icon color={slots[i].value === dayIndex ? "white":"white"} source="eye" size={20} />} onPress={() => handleSetIndex(slots[i].value)}>
                            {day} - {slots[0].hour}:{slots[0].minute} to {slots[slots.length -1].hour}:{slots[slots.length -1].minute}
                        </Chip>
                        {slots[i].value === dayIndex && slots.map((slot, j) => (
                            <React.Fragment key={`${slot.hour}-${slot.minute}-${j}`}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, width: "90%", justifyContent: 'space-between' }}>
                                    <View>
                                <StyledText colorScheme={colorScheme}>{slot.hour}:{slot.minute}-{slot.hour + 2}:00</StyledText>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column'}}>
                                       <TouchableOpacity activeOpacity={0.7}  onPress={() => {
                                        handleCreateBooking(`${slot.hour}:${slot.minute}-${slot.hour + 2}:00`)
                                        console.log(`pressed ${dummySchedule[i].day} - ${slot.hour}:${slot.minute}`)
                                        }}>
                                       <StyledBlurItem  style={{ width: 80, ...(j % 3 === 0 && { backgroundColor: '#007AFF' })}} intensity={blurIntensity} tint={blurType}>
                                        <StyledText style={{ fontWeight: 700 }}>{j % 3 === 0 ? "Book": "Taken"}</StyledText>
                                       </StyledBlurItem>
                                       </TouchableOpacity>
                                    </View>

                                    <View>
                                        <StyledText colorScheme={colorScheme}>$50.00 + (extras & tax)</StyledText>
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
            <View style={{ display: 'flex', flexDirection: 'row',justifyContent: "space-between", alignItems: 'flex-end'}}>
                <View>
                <IconButton icon={() => <Icon size={15} source="arrow-left" />} onPress={() => setBooking(false)} />
                <StyledText colorScheme={colorScheme}>Book [name] for ${bookingItems.cost}.00 at {bookingItems.time}?</StyledText>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StyledText style={{ fontSize: 20, fontWeight: 600 }} colorScheme={colorScheme}>${bookingItems.cost}.00</StyledText>
                <TouchableOpacity activeOpacity={0.7}  onPress={() => 
                                        console.log(`pressed checkout proceed`)
                                    }>
                                       <StyledBlurItem  style={{ width: 120,  backgroundColor: '#007AFF'}} intensity={blurIntensity} tint={blurType}>
                                        <StyledText style={{ fontWeight: 700 }}>Go to Checkout</StyledText>
                                       </StyledBlurItem>
                                       </TouchableOpacity>
                </View>
            </View>
        )}
        <Divider style={{ width: '100%', marginVertical: 5 }} />
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