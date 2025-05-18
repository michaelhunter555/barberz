import React, { useState } from 'react';
import { StyleText, StyledView, StyledBlurView } from '../shared/SharedStyles';
import { IconButton } from 'react-native-paper';

const dummySchedule =
    {
        "Monday": [
            { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 } },
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
        setCurrentKey(key)
        setToggle((prev) => !prev);
    }

    return (
        <StyledView gap={5}>
            <StyleText style={{ fontWeight: 700, fontSize: 15 }}>Schedule</StyleText>
        {Object.entries(dummySchedule).map(([key, value]) => (
            <StyledView key={key}>
            <StyledBlurView direction="row" align="center" justify="space-between" clickable onClick={() => handleTimeToggle(key)} style={{ padding: 5 }}>
               <StyleText style={{ fontSize: 13 }}>{key}</StyleText>
               <IconButton icon="pencil" size={12} onPress={() => console.log("edit time slots")} />
            </StyledBlurView>
            {toggle && key === currentKey && value.map((slots, j) => {
                const startHour = slots.startTime.hour;
                const startMinute = slots.startTime.minute;
                const endHour = slots.endTime.hour;
                const endMinute = slots.endTime.minute;
                return (
                    <StyledView key={j} direction="row" alignItems="center">
                    <StyleText>{startHour}:{startMinute === 0 ? "00": startMinute}</StyleText>
                    <StyleText> to </StyleText>
                    <StyleText>{endHour}:{endMinute === 0 ? "00": endMinute}</StyleText>
                </StyledView>
                )
            })}
            </StyledView>
        ))}
        </StyledView>
    )

}

export default BarberSchedule;