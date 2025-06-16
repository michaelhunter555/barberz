import React from 'react';
import useAuth from '@/context/auth/use-auth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useInvalidateQuery } from '@/hooks/invalidate-query';
import { useBarber } from '@/hooks/barber-hooks';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from "expo-router";
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import BarberSchedule from '@/components/BarberSchedule/BarberSchedule';
import { StyledView, StyleText, } from '@/components/shared/SharedStyles';
import { IDaySlot } from '@/types';
import { convertDateToSlot } from '@/lib/convertDateToSlot';

const SchedulePage = () => {
    const { id } = useLocalSearchParams();
    const { addTimeSlot, getSchedule, editTimeSlot, deleteTimeSlot, clearSchedule } = useBarber();
    const { invalidateQuery } = useInvalidateQuery();

    // Get schedule
     const { data: schedule, isLoading: isScheduleLoading } = useQuery({
            queryKey: ["get-schedule", id],
            queryFn: () => getSchedule(),
            enabled: Boolean(id),
        });

    // mutate schedule for adding time slot
    const mutateTimeSlot = useMutation({
            mutationKey: ["add-time-slot"],
            mutationFn: async (payload: {slot: IDaySlot, day: string, bulkDays?: string[]}) => {
                return await addTimeSlot(payload.slot, payload.day, payload.bulkDays);
            }
    });

    // mutate handler
    const handleAddNewSlots = async (slot: IDaySlot, day: string, bulkDays?: string[]) => {
        mutateTimeSlot.mutate({ slot, day, bulkDays }, {
            onSuccess: async () => {
                await invalidateQuery("get-schedule");
            },
            onError: (err) => {
                console.log(err);
            }
        })
    }

    // mutate schedule update
    const mutateEditSchedule = useMutation({
        mutationKey:["edit-time-slot"],
        mutationFn: async (payload: {slot: IDaySlot, day: string, timeSlotId: string}) =>{
            return await editTimeSlot(payload.day, payload.slot, payload.timeSlotId)
        }
    });

    // mutate edit schedule handler
    const handleEditSchedule = async (slot: IDaySlot, day: string, timeSlotId: string) => {
        mutateEditSchedule.mutate({slot, day, timeSlotId}, {
            onSuccess: async () => {
                await invalidateQuery("get-schedule")
            },
            onError: (err) => console.log(err),
        })
    };

    // mutate delete time slot 
    const mutateDeleteTimeSlot = useMutation({
        mutationKey: ["delete-time-slot"],
        mutationFn: async (payload: {timeSlotIds: string[], day: string}) => {
            return await deleteTimeSlot(payload.timeSlotIds, payload.day);
        }
    });

    const handleDeleteTimeSlot = async (timeSlotIds: string[], day: string) => {
        mutateDeleteTimeSlot.mutate({ timeSlotIds, day }, {
            onSuccess: async () => {
                await invalidateQuery("get-schedule");
            },
            onError: (err) => console.log(err),
        })
    };

    const mutateClearSchedule = useMutation({
        mutationKey: ["clear-schedule"],
        mutationFn: async () => {
            return await clearSchedule()
        }
    });

    const handleClearSchedule = async () => {
        mutateClearSchedule.mutate(undefined, {
            onSuccess: async () => {
                await invalidateQuery("get-schedule");
            },
            onError: (err) => console.log(err),
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <GoBackArrow />
            <ScrollView>
            <BarberSchedule 
            barberSchedule={schedule && schedule} 
            isScheduleLoading={isScheduleLoading}
            onAddNewTimeSlot={handleAddNewSlots}
            onEditTimeSlot={handleEditSchedule}
            onDeleteTimeSlot={handleDeleteTimeSlot}
            onClearSchedule={handleClearSchedule}
            isPostLoading={mutateTimeSlot.isPending}
            />
            </ScrollView>
        </SafeAreaView>
    )
};

export default SchedulePage;