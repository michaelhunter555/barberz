import React, { useState, useEffect } from 'react';
import useAuth from '@/context/auth/use-auth';
import { useMutation } from '@tanstack/react-query';
import { useBarber } from '@/hooks/barber-hooks';
import { StyleText, StyledView, StyledBlurView, StyledDivider } from '../shared/SharedStyles';
import { Icon, IconButton, Checkbox, Button } from 'react-native-paper';
import { TouchableOpacity, View, LayoutAnimation } from 'react-native';
import { IScheduleByDay, IDaySlot, IHours, DaysOfWeek } from '@/types';
import Modal from '../shared/Modals/Modal';
import SelectTimePicker from '../shared/Picker/SelectPicker';
import { setColorType, toDate } from '@/lib/helpers';
import { useDesign } from '@/hooks/design-hooks';
import { scheduleConflictCheck } from '@/lib/scheduleConflict';
import { ManySkeletonTextLines } from '../shared/LoadingSkeleton/Skeletons';
import { useInvalidateQuery } from '@/hooks/invalidate-query';
import { formatToAMPM } from '@/lib/convertDateToSlot';

interface IBarberSchedule {
    barberSchedule?: IScheduleByDay;
    isScheduleLoading?: boolean;
    isPostLoading?: boolean;
    onAddNewTimeSlot: (slot: IDaySlot, day: string, bulkDays?: string[]) => Promise<void>;
    onEditTimeSlot: (slot: IDaySlot, day: string, timeSlotId: string) => Promise<void>;
    onDeleteTimeSlot: (timeSlotIds: string[], day: string) => Promise<void>;
    onClearSchedule: () => Promise<void>;
}

const BarberSchedule = ({ 
    barberSchedule, 
    isScheduleLoading, 
    isPostLoading, 
    onAddNewTimeSlot,
    onEditTimeSlot,
    onDeleteTimeSlot,
    onClearSchedule,
}: IBarberSchedule) => {
    const auth = useAuth();
    const barber = auth?.userAuth;
    const [schedule, setSchedule] = useState<IScheduleByDay | undefined>(barberSchedule && barberSchedule);
    const [currentKey, setCurrentKey] = useState<string | null>("");
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [isOpenSelectTime, setIsOpenSelectTime] = useState<boolean>(false);
    const [editing, setIsEditing] = useState<{ day: string; index: number } | null>(null);
    const [openClearSchedule, setOpenClearSchedule] = useState<boolean>(false);
    const { colorType } = useDesign();
    const { background, text } = colorType('error');
    const [isBulkUpdate, setIsBulkUpdate] = useState<boolean>(false);
    const [bulkDays, setBulkDays] = useState<string[]>([]);
    
    useEffect(() => {
        if (barberSchedule && !isScheduleLoading) {
          setSchedule(barberSchedule);
        }
      }, [barberSchedule, isScheduleLoading]);

    const handleTimeToggle = (key: string) => {
        setCurrentKey((prev) => prev === key ? null : key);
    }

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
    const handleRemoveSlots = async (day: string) => {
       const slotIds = schedule && 
       schedule[day].filter(
        (slot) => slot.isChecked).map((slot) => slot._id);

       if(slotIds && slotIds.length > 0) {
           await onDeleteTimeSlot(slotIds as string[], day)
       }
        setConfirmDelete(false);
    }

    // flag to determine if we any items have been selected for removal
    const canDelete = schedule?.[String(currentKey)]?.some((key, i) => key?.isChecked);

    // Add new time slot
    const handleAddNewSlots = async (day: string, startTime: Date, endTime: Date) => {
        const start = {
            value: startTime.getHours(), // Optional: you can drop `value` entirely
            hour: startTime.getHours(),
            minute: startTime.getMinutes(),
          };
        
          const end = {
            value: endTime.getHours(),
            hour: endTime.getHours(),
            minute: endTime.getMinutes(),
          };
        
          const newSlot: IDaySlot = {
            isBooked: false,
            price: Number(barber?.startingPrice),
            startTime: start,
            endTime: end,
            isChecked: false,
          };
          await onAddNewTimeSlot(newSlot, day, bulkDays);
    }

    // Edit time slots
    const handleEditSlot = async (
        day: string,
        index: number,
        start: Date,
        end: Date,
    ) => {
        const updatedSlot = {
            ...schedule?.[day][index],
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
        }
        await onEditTimeSlot(updatedSlot, day, String(updatedSlot?._id))
        setIsEditing(null);
    };

    const handleClearSchedule = async () => {
       await onClearSchedule();
        setOpenClearSchedule(false);
    }


    const handleConfirmDelete = () => {
        setConfirmDelete(prev => !prev);
    }

    const handleSelectTimeModal = () => {
        setIsOpenSelectTime(prev => !prev);
        if(isBulkUpdate){
            setIsBulkUpdate(false);
        }
    }

    const handleBulkUpdate = () => {
        setIsBulkUpdate(true)
        setIsOpenSelectTime(true);
    }

    const handleBulkDays = (day: string) => {
        console.log("Added: ", day)
        setBulkDays((prev) => prev.includes(day) ? 
        prev.filter(d => d !== day) 
        : [...prev, day]);
      }

      const getDefaultStart = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        const nextQuarter = Math.ceil(minutes / 15) * 15;
      
        if (nextQuarter === 60) {
          now.setHours(now.getHours() + 1);
          now.setMinutes(0, 0, 0);
        } else {
          now.setMinutes(nextQuarter, 0, 0);
        }
      
        return now;
      };
      const defaultStartTime = getDefaultStart();
      const defaultEndTime = getDefaultStart().getTime() + 60 * 60 * 1000;

      console.log("who cares" ,defaultEndTime,defaultStartTime)

      if(isScheduleLoading) {
        return (
            <StyledView gap={5} justify="center" align="center" style={{ marginTop: 20, flex: 1,  width: '100%'}}>
                <ManySkeletonTextLines  width={200} />
                <ManySkeletonTextLines  width={150} />
                <ManySkeletonTextLines  width={150} />
            </StyledView>
        )
      }

    return  (
        <StyledView gap={5} style={{ marginTop: 20 }}>
            
            {/* Editing Time Slots */}
            {editing && schedule?.[editing.day]?.[editing.index] && <SelectTimePicker
                isOpen={!!editing}
                onClose={() => setIsEditing(null)}
                existingSlots={schedule?.[currentKey as string] || []}
                initialStartTime={toDate(
                    schedule?.[editing?.day as keyof IScheduleByDay][editing?.index as number].startTime.hour,
                    schedule?.[editing?.day as keyof IScheduleByDay][editing?.index as number].startTime.minute
                )}
                initialEndTime={toDate(
                    schedule?.[editing?.day as keyof IScheduleByDay][editing?.index as number].endTime.hour,
                    schedule?.[editing?.day as keyof IScheduleByDay][editing?.index as number].endTime.minute
                )}
                onAddSlot={(start, end) => handleEditSlot(editing!.day, editing!.index, start, end )}
                editingSlotId={schedule?.[editing?.day as keyof IScheduleByDay][editing?.index as number]._id}
                submitLabel="Save Changes"
                />}

            {/* Adding New Time Slot */}
            <SelectTimePicker
                isBulkUpdate={isBulkUpdate}
                onAddSlot={
                    (startTime: Date, endTime: Date) => handleAddNewSlots(String(currentKey), startTime, endTime)
                } 
                isOpen={isOpenSelectTime}
                onClose={handleSelectTimeModal}
                bulkDays={bulkDays}
                schedule={schedule}
                initialStartTime={defaultStartTime}
                initialEndTime={new Date(defaultEndTime)}
                onAddDay={(day: string) => handleBulkDays(day)}
                existingSlots={schedule?.[currentKey as string] || []}
                isLoading={isPostLoading}
            />
            {/* Confirm Modal for delete */}
            <Modal header="Confirm Delete" text="You are about delete schedule slot(s). Please confirm." isOpen={confirmDelete} onClose={handleConfirmDelete}>
                <Button buttonColor='red' textColor='white' onPress={() => handleRemoveSlots(String(currentKey))}>Confirm Delete</Button>
            </Modal>
            {/* Clear Schedule Modal */}
            <Modal header="Confirm Delete" text="You are about to delete your entire schedule. This action cannot be undone. Please confirm." isOpen={openClearSchedule} onClose={() => setOpenClearSchedule(false)}>
                <Button buttonColor='red' textColor='white' onPress={handleClearSchedule}>Confirm Delete</Button>
            </Modal>
            <StyleText style={{ fontWeight: 700, fontSize: 15 }}>Schedule</StyleText>
            <StyledView direction="row" justify="flex-end" gap={10}>
                  <StyledView justify="center" gap={3}>
                           <StyledView align="center" justify="center">
                           <StyledBlurView direction="row" align="center" gap={3} clickable style={{ padding: 8 }} onClick={handleBulkUpdate}>
                            <Icon source="update" size={12} />
                               <StyleText>Bulk Update</StyleText>
                               </StyledBlurView>
                           </StyledView>
                         </StyledView>
                <StyledBlurView
                clickable
                onClick={() => setOpenClearSchedule(true)} 
                direction="row" 
                align="center" 
                gap={3} 
                style={{ padding: 8, backgroundColor: background,}}>
                    <Icon color={text} source="delete-empty" size={12} />
                    <StyleText style={{ color: text }}>Clear Schedule</StyleText>
                </StyledBlurView>
            </StyledView>
            {schedule && Object.entries(schedule).map(([key, value]) => (
                <StyledView key={key}>
                    <StyledBlurView isPaper direction="row" align="center" justify="space-between" clickable onClick={() => handleTimeToggle(key)} style={{ padding: 5 }}>
                        <StyledView>
                            <StyleText style={{ paddingLeft: 10, fontSize: 14, fontWeight: 600 }}>{key.toUpperCase()}</StyleText>
                        </StyledView>
                        <StyledView direction="row">
                            {canDelete && currentKey === key && <IconButton icon="close" iconColor='red' size={15} onPress={handleConfirmDelete} />}
                            <IconButton icon={currentKey === key ? "eye":"eye-off"} size={15} onPress={() => console.log("edit time slots")} />
                        </StyledView>
                    </StyledBlurView>
                    {key === currentKey && value?.map((slots, j) => {
                        const startHour = slots?.startTime.hour;
                        const startMinute = slots?.startTime.minute;
                        const endHour = slots?.endTime.hour;
                        const endMinute = slots?.endTime.minute;
                        return (
                            <View key={j}>
                                <StyledView direction="row" justify="space-evenly" alignItems="center" gap={10} style={{ padding: 5 }}>
                                    <StyledView direction="row" alignItems="center" gap={10}>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => handleCheck(currentKey, j)}>
                                            <Icon source="minus-circle" size={20} color={!slots?.isChecked ? "#333" : 'red'} />
                                        </TouchableOpacity>

                                        <StyledView direction="row" align="center">
                                            <StyleText style={{ fontSize: 13, fontWeight: 600 }}>{formatToAMPM(startHour, startMinute)}</StyleText>
                                            <StyleText style={{ fontSize: 13, fontWeight: 600 }}> to </StyleText>
                                            <StyleText style={{ fontSize: 13, fontWeight: 600 }}>{formatToAMPM(endHour, endMinute)}</StyleText>
                                        </StyledView>
                                    </StyledView>
                                    <StyledView>
                                        <StyleText style={{ fontSize: 13, fontWeight: 600 }}>${slots?.price}</StyleText>
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
                    {key === currentKey && (
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