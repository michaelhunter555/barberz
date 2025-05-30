import React, { useState } from 'react';
import { StyleText, StyledView, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import { Icon, IconButton } from 'react-native-paper';
import { View } from 'react-native';

const dummySchedule =
    {
        "Monday": [
            { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 } },
            { startTime: { value: 10, hour: 10, minute: 30 }, endTime: { value: 11, hour: 11, minute: 30 } },
            { startTime: { value: 11, hour: 11, minute: 30 }, endTime: { value: 1, hour: 1, minute: 0 } },
        ],
        "Tuesday": [
            { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 } },
        ],

        "Wednesday": [
            { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 } },
        ],
        "Thursday": [
            { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 } },
        ],
        "Friday": [
            { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 } },
        ]
    };

const BarberSchedule = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    const [currentKey, setCurrentKey] = useState<string>("");

    const handleTimeToggle = (key: string) => {
        setCurrentKey(key);
        setToggle((prev) => !prev);
    }

    return (
        <StyledView gap={5} style={{ marginTop: 20 }}>
            <StyleText style={{ fontWeight: 700, fontSize: 15 }}>Schedule</StyleText>
        {Object.entries(dummySchedule).map(([key, value]) => (
            <StyledView key={key}>
            <StyledBlurView isPaper direction="row" align="center" justify="space-between" clickable onClick={() => handleTimeToggle(key)} style={{ padding: 5 }}>
               <StyleText style={{ paddingLeft: 10, fontSize: 14, fontWeight: 600 }}>{key}</StyleText>
               <IconButton icon="eye" size={15} onPress={() => console.log("edit time slots")} />
            </StyledBlurView>
            {toggle && key === currentKey && value.map((slots, j) => {
                const startHour = slots.startTime.hour;
                const startMinute = slots.startTime.minute;
                const endHour = slots.endTime.hour;
                const endMinute = slots.endTime.minute;
                return (
                    <View key={j}>                
                    <StyledView direction="row" alignItems="center" gap={10} style={{ padding: 5, }}>
                        <StyledView direction="row" alignItems="center">
                    <StyleText style={{ fontSize: 13 }}>{startHour}:{startMinute === 0 ? "00": startMinute}</StyleText>
                    <StyleText style={{ fontSize: 13 }}> to </StyleText>
                    <StyleText style={{ fontSize: 13 }}>{endHour}:{endMinute === 0 ? "00": endMinute}</StyleText>
                        </StyledView>
                    <IconButton size={12} icon={() => <Icon color="red" source="pencil-outline" size={13} />} onPress={() => console.log("edit time slot")} />
                </StyledView>
            {j !== value.length - 1 && <StyledDivider orientation="horizontal" marginVertical={5} /> }
            </View>
                )
            })}
            </StyledView>
        ))}
        </StyledView>
    )

}

export default BarberSchedule;