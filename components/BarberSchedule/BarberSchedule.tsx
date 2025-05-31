import React, { useState, useEffect } from 'react';
import { StyleText, StyledView, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import { Icon, IconButton, Checkbox, Button } from 'react-native-paper';
import { TouchableOpacity, View, } from 'react-native';
import { IScheduleByDay, IDaySlot } from '@/types';
import Modal from '../shared/Modals/Modal';

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

const BarberSchedule = () => {
    const [schedule, setSchedule] = useState<IScheduleByDay>(dummySchedule);
    const [toggle, setToggle] = useState<boolean>(false);
    const [currentKey, setCurrentKey] = useState<string>("");
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);    

    const handleTimeToggle = (key: string) => {
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
                if(i === index) {
                    return { ...slot, isChecked: !slot.isChecked }
                }
                return slot;
            });
            currentSchedule[day] = newSchedule;
            return currentSchedule;
        })
      };

      const handleRemoveSlots = (day: string) => {
        setSchedule((prev) => {
            const currentSchedule = { ...prev };
            const newSchedule = currentSchedule[day].filter((slot, i) => !slot.isChecked);
            currentSchedule[day] = newSchedule;
            return currentSchedule;
        })
        setConfirmDelete(false);
      }

      const canDelete = schedule[currentKey]?.some((key, i) => key.isChecked);

      const handleAddNewSlots = (day: string, daySlot: IDaySlot) => {
        setSchedule((prev) => {
            const curr = { ...prev };
            curr[day] = [...curr[day], daySlot];
            return curr;
        })
      }

      const handleConfirmDelete = () => {
        setConfirmDelete(prev => !prev);
      }

    return (
        <StyledView gap={5} style={{ marginTop: 20 }}>
            <Modal header="Confirm Delete" text="you are about delete schedule slot(s). Please confirm." isOpen={confirmDelete} onClose={handleConfirmDelete}>
                <Button buttonColor='red' textColor='white' onPress={() => handleRemoveSlots(currentKey)}>Confirm Delete</Button>
            </Modal>
            <StyleText style={{ fontWeight: 700, fontSize: 15 }}>Schedule</StyleText>
        {Object.entries(schedule).map(([key, value]) => (
            <StyledView key={key}>
            <StyledBlurView isPaper direction="row" align="center" justify="space-between" clickable onClick={() => handleTimeToggle(key)} style={{ padding: 5 }}>
               <StyledView>
               <StyleText style={{ paddingLeft: 10, fontSize: 14, fontWeight: 600 }}>{key}</StyleText>
               </StyledView>
               <StyledView direction="row">
                {canDelete && currentKey === key && <IconButton icon="close" iconColor='red' size={15} onPress={handleConfirmDelete} /> }
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
                                <Icon source="minus-circle" size={20} color={!slots.isChecked ? "#333": 'red'} />
                            </TouchableOpacity>
                
                   <StyledView direction="row" align="center">

                    <StyleText style={{ fontSize: 13, fontWeight: 600 }}>{startHour}:{startMinute === 0 ? "00": startMinute}</StyleText>
                    <StyleText style={{ fontSize: 13, fontWeight: 600 }}> to </StyleText>
                    <StyleText style={{ fontSize: 13, fontWeight: 600 }}>{endHour}:{endMinute === 0 ? "00": endMinute}</StyleText>
                   </StyledView>
                        </StyledView>
                        <StyledView>
                        <StyleText style={{ fontSize: 13, fontWeight: 600 }}>${ slots.price }</StyleText>
                        </StyledView>
                        
                        <StyledView>
                        <StyledBlurView 
                        isButton 
                        clickable
                        direction='row'
                        align='center'
                        justify='center'
                        gap={5}
                        style={{  width: 60, padding: 5 }} 
                        borderRadius={20} 
                        onClick={() => console.log("edit")}>
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
                <IconButton iconColor='#007AFF' icon="plus-circle" size={20} onPress={() => console.log("new slot")}/>
            </StyledView>
                )}
            </StyledView>
        ))}
        </StyledView>
    )

}

export default BarberSchedule;