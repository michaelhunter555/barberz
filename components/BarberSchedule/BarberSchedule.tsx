import React, { useState, useEffect } from 'react';
import { StyleText, StyledView, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import { Icon, IconButton, Checkbox, Button } from 'react-native-paper';
import { TouchableOpacity, View, LayoutAnimation } from 'react-native';
import { IScheduleByDay, IDaySlot } from '@/types';
import Modal from '../shared/Modals/Modal';
import SelectTimePicker from '../shared/Picker/SelectPicker';
import { toDate } from '@/lib/helpers';

const dummySchedule =
{
    "Monday": [
        { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 }, isBooked: false, price: 50, isChecked: false },
        { startTime: { value: 10, hour: 10, minute: 30 }, endTime: { value: 11, hour: 11, minute: 30 }, isBooked: true, price: 50, isChecked: false },
        { startTime: { value: 11, hour: 11, minute: 30 }, endTime: { value: 1, hour: 1, minute: 0 }, isBooked: false, price: 50, isChecked: false },
    ],
    "Tuesday": [
        { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 }, isBooked: false, price: 50, isChecked: false },
    ],

    "Wednesday": [
        { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 }, isBooked: false, price: 50, isChecked: false },
    ],
    "Thursday": [
        { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 }, isBooked: false, price: 50, isChecked: false },
    ],
    "Friday": [
        { startTime: { value: 8, hour: 8, minute: 30 }, endTime: { value: 10, hour: 10, minute: 0 }, isBooked: true, price: 50, isChecked: false },
    ]
};

const initialSchedule =
{
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": []
};

const BarberSchedule = () => {
    const [schedule, setSchedule] = useState<IScheduleByDay>(dummySchedule);
    const [toggle, setToggle] = useState<boolean>(false);
    const [currentKey, setCurrentKey] = useState<string>("");
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [isOpenSelectTime, setIsOpenSelectTime] = useState<boolean>(false);
    const [editing, setIsEditing] = useState<{ day: string; index: number } | null>(null);
    const [openClearSchedule, setOpenClearSchedule] = useState<boolean>(false);

    const handleTimeToggle = (key: string) => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                500, // duration in ms (you can change this)
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.opacity
            )
        );
        setCurrentKey(key);
        setToggle((prev) => !prev);
    }

    useEffect(() => {
        setSchedule(dummySchedule); // force update if you change dummySchedule
    }, []);

    const handleCheck = (day: string, index: number) => {
        setSchedule((prev) => {
            const currentSchedule = { ...prev };
            const newSchedule = currentSchedule[day].map((slot, i) => {
                if (i === index) {
                    return { ...slot, isChecked: !slot.isChecked }
                }
                return slot;
            });
            currentSchedule[day] = newSchedule;
            return currentSchedule;
        })
    };

    // remove slots
    const handleRemoveSlots = (day: string) => {
        setSchedule((prev) => {
            const currentSchedule = { ...prev };
            const newSchedule = currentSchedule[day].filter((slot, i) => !slot.isChecked);
            currentSchedule[day] = newSchedule;
            return currentSchedule;
        })
        setConfirmDelete(false);
    }

    // flag to determine if we any items have been selected for removal
    const canDelete = schedule[currentKey]?.some((key, i) => key.isChecked);

    // Add new time slot
    const handleAddNewSlots = (day: string, startTime: Date, endTime: Date) => {
        console.log(startTime, "-", endTime);
        const newStartTime = startTime.toLocaleTimeString();
        const newEndTime = endTime.toLocaleTimeString();
        const startValue = newStartTime.split(":");
        const endValue = newEndTime.split(":");
        const start = { value: Number(startValue[0]), hour: Number(startValue[0]), minute: Number(startValue[1]) };
        const end = { value: Number(endValue[0]), hour: Number(endValue[0]), minute: Number(endValue[1]) };

        const newSlot: IDaySlot = { isBooked: false, price: 50, startTime: start, endTime: end };

        setSchedule((prev) => {
            const curr = { ...prev };
            curr[day] = [...curr[day], newSlot];
            return curr;
        })
    }

    // Edit time slots
    const handleEditSlot = (
        day: string,
        index: number,
        start: Date,
        end: Date
    ) => {
        setSchedule((prev) => {
            const updated = { ...prev };

            const updatedSlot = {
                ...updated[day][index],
                startTime: {
                    value: start.getHours(),
                    hour: start.getHours(),
                    minute: start.getMinutes(),
                },
                endTime: {
                    value: end.getHours(),
                    hour: end.getHours(),
                    minute: end.getMinutes(),
                },
            };

            updated[day][index] = updatedSlot;
            return updated;
        });

        setIsEditing(null);
    };

    const handleClearSchedule = () => {
        setSchedule(initialSchedule);
        setOpenClearSchedule(false);
    }


    const handleConfirmDelete = () => {
        setConfirmDelete(prev => !prev);
    }

    const handleSelectTimeModal = () => {
        setIsOpenSelectTime(prev => !prev);
    }

    return (
        <StyledView gap={5} style={{ marginTop: 20 }}>
            {/* Editing Time Slots */}
            {editing && schedule[editing.day]?.[editing.index] && <SelectTimePicker
                isOpen={!!editing}
                onClose={() => setIsEditing(null)}
                initialStartTime={toDate(
                    schedule[editing?.day as keyof IScheduleByDay][editing?.index as number].startTime.hour,
                    schedule[editing?.day as keyof IScheduleByDay][editing?.index as number].startTime.minute
                )}
                initialEndTime={toDate(
                    schedule[editing?.day as keyof IScheduleByDay][editing?.index as number].endTime.hour,
                    schedule[editing?.day as keyof IScheduleByDay][editing?.index as number].endTime.minute
                )}
                onAddSlot={(start, end) => handleEditSlot(editing!.day, editing!.index, start, end)}
                submitLabel="Save Changes"
            />}

            {/* Adding New Time Slot */}
            <SelectTimePicker
                onAddSlot={
                    (startTime: Date, endTime: Date) => handleAddNewSlots(currentKey, startTime, endTime)
                } isOpen={isOpenSelectTime}
                onClose={handleSelectTimeModal}
            />
            {/* Confirm Modal for delete */}
            <Modal header="Confirm Delete" text="You are about delete schedule slot(s). Please confirm." isOpen={confirmDelete} onClose={handleConfirmDelete}>
                <Button buttonColor='red' textColor='white' onPress={() => handleRemoveSlots(currentKey)}>Confirm Delete</Button>
            </Modal>
            {/* Clear Schedule Modal */}
            <Modal header="Confirm Delete" text="You are about to delete your entire schedule. This action cannot be undone. Please confirm." isOpen={openClearSchedule} onClose={() => setOpenClearSchedule(false)}>
                <Button buttonColor='red' textColor='white' onPress={handleClearSchedule}>Confirm Delete</Button>
            </Modal>
            <StyleText style={{ fontWeight: 700, fontSize: 15 }}>Schedule</StyleText>
            <StyledView direction="row" justify="flex-end">
                <Button icon="delete-empty" mode="outlined" onPress={() => setOpenClearSchedule(true)}>Clear Schedule</Button>
            </StyledView>
            {Object.entries(schedule).map(([key, value]) => (
                <StyledView key={key}>
                    <StyledBlurView isPaper direction="row" align="center" justify="space-between" clickable onClick={() => handleTimeToggle(key)} style={{ padding: 5 }}>
                        <StyledView>
                            <StyleText style={{ paddingLeft: 10, fontSize: 14, fontWeight: 600 }}>{key}</StyleText>
                        </StyledView>
                        <StyledView direction="row">
                            {canDelete && currentKey === key && <IconButton icon="close" iconColor='red' size={15} onPress={handleConfirmDelete} />}
                            <IconButton icon="eye" size={15} onPress={() => console.log("edit time slots")} />
                        </StyledView>
                    </StyledBlurView>
                    {toggle && key === currentKey && value.map((slots, j) => {
                        const startHour = slots.startTime.hour;
                        const startMinute = slots.startTime.minute;
                        const endHour = slots.endTime.hour;
                        const endMinute = slots.endTime.minute;
                        return (
                            <View key={j}>
                                <StyledView direction="row" justify="space-evenly" alignItems="center" gap={10} style={{ padding: 5 }}>
                                    <StyledView direction="row" alignItems="center" gap={10}>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => handleCheck(currentKey, j)}>
                                            <Icon source="minus-circle" size={20} color={!slots.isChecked ? "#333" : 'red'} />
                                        </TouchableOpacity>

                                        <StyledView direction="row" align="center">

                                            <StyleText style={{ fontSize: 13, fontWeight: 600 }}>{startHour}:{startMinute === 0 ? "00" : startMinute}</StyleText>
                                            <StyleText style={{ fontSize: 13, fontWeight: 600 }}> to </StyleText>
                                            <StyleText style={{ fontSize: 13, fontWeight: 600 }}>{endHour}:{endMinute === 0 ? "00" : endMinute}</StyleText>
                                        </StyledView>
                                    </StyledView>
                                    <StyledView>
                                        <StyleText style={{ fontSize: 13, fontWeight: 600 }}>${slots.price}</StyleText>
                                    </StyledView>

                                    <StyledView>
                                        <StyledBlurView
                                            isButton
                                            clickable
                                            direction='row'
                                            align='center'
                                            justify='center'
                                            gap={5}
                                            style={{ width: 60, padding: 5 }}
                                            borderRadius={20}
                                            onClick={() => setIsEditing({ day: currentKey, index: j })}>
                                            <StyleText>
                                                Edit
                                            </StyleText>
                                            <Icon source="pencil-outline" size={13} />
                                        </StyledBlurView>
                                    </StyledView>

                                </StyledView>
                                <StyledDivider orientation="horizontal" marginVertical={5} />
                            </View>
                        )
                    })}
                    {toggle && key === currentKey && (
                        <StyledView direction="row" align="center" justify="center">
                            <StyleText>Add New slot</StyleText>
                            <IconButton iconColor='#007AFF' icon="plus-circle" size={20} onPress={handleSelectTimeModal} />
                        </StyledView>
                    )}
                </StyledView>
            ))}
        </StyledView>
    )

}

export default BarberSchedule;