import React, { useState, useEffect, } from 'react';
import { Modal, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button, Checkbox, RadioButton } from 'react-native-paper';
import { StyledView, StyleText, StyledBlurView, StyledDivider } from '../SharedStyles';
import { DaysOfWeek, IDaySlot } from '@/types';
import { scheduleConflictCheck } from '@/lib/scheduleConflict';

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSlot: (start: Date, end: Date) => Promise<void>;
  initialStartTime?: Date;
  initialEndTime?: Date;   
 submitLabel?: string;
 isBulkUpdate?: boolean;
 bulkDays?: string[];
 onAddDay?: (day: string) => void;
 existingSlots?: IDaySlot[]; 
editingSlotId?: string;
isLoading?:boolean;
}

const TimeSlotModal = ({ 
    isOpen, 
    onClose, 
    onAddSlot,
    initialEndTime,
    initialStartTime,
    submitLabel,
    isBulkUpdate,
    bulkDays,
    onAddDay,
    existingSlots,
    editingSlotId,
    isLoading,
}: TimeSlotModalProps) => {
  const [startTime, setStartTime] = useState<Date>( initialStartTime ?? new Date());
  const [endTime, setEndTime] = useState<Date>(initialEndTime ?? new Date());
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);
  const [displayBulkDays, setDisplayBulkDays] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setStartTime(initialStartTime ?? new Date());
      setEndTime(initialEndTime ?? new Date());
    }
  },[isOpen, initialStartTime, initialEndTime]);

  const [liveError, setLiveError] = useState<string | null>(null);

useEffect(() => {
  if (!isOpen) return;

  const newStart = startTime.getHours() * 60 + startTime.getMinutes();
  const newEnd = endTime.getHours() * 60 + endTime.getMinutes();

  if (newEnd <= newStart) {
    setLiveError("❌ End time must be after start time");
    return;
  }

  if (newEnd - newStart < 60) {
    setLiveError("❌ Slot must be at least 1 hour");
    return;
  }
  if(!existingSlots) {
    return;
  }

  for (let slot of existingSlots) {
    if (editingSlotId && slot._id === editingSlotId) continue;
    const existingStart = slot.startTime.hour * 60 + slot.startTime.minute;
    const existingEnd = slot.endTime.hour * 60 + slot.endTime.minute;

    const isOverlap = !(newEnd <= existingStart || newStart >= existingEnd);
    if (isOverlap) {
      setLiveError(
        `❌ Overlaps with ${slot.startTime.hour}:${String(slot.startTime.minute).padStart(2, "0")} - ${slot.endTime.hour}:${String(slot.endTime.minute).padStart(2, "0")}`
      );
      return;
    }
  }

  setLiveError(null); // all good
}, [startTime, endTime, isOpen, existingSlots]);


  const handleStartChange = (_: DateTimePickerEvent, selected?: Date) => {
    if (selected) setStartTime(selected);
  };

  const handleEndChange = (_: DateTimePickerEvent, selected?: Date) => {
    if (selected) setEndTime(selected);
  };

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleShowStartTime = () =>{
    if(showEndPicker) {
        setShowEndPicker(false);
    }
    setShowStartPicker(prev => !prev);
  };

  const handleShowEndTime = () =>{
    if(showStartPicker) {
        setShowStartPicker(false);
    }
    setShowEndPicker(prev => !prev);
  }

  const handleSubmit = () => {
    if (liveError) {
        return;
      }
      onAddSlot(startTime, endTime).then(() => {
        if(!isLoading) {
            onClose();
        }
      });
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>
            <ScrollView>
        <StyledBlurView style={{ padding: 20, flex: 1, width: '100%' }} justify="center" align="center">
      <StyledView style={{ width: '100%'}}>
        <StyledView direction="column" gap={10}>
          <StyleText style={{ color: 'white' }}>Add Time Slot</StyleText>

          <StyledBlurView clickable onClick={handleShowStartTime} style={{ padding: 10 }}>
            <StyleText style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>Start Time: {formatTime(startTime)}</StyleText>
            </StyledBlurView>

          {showStartPicker && (
          <StyledView>
            <DateTimePicker
              mode="time"
              value={startTime}
              is24Hour
              minuteInterval={15}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleStartChange}
              
            />
          <StyledView align="center">
            <StyledBlurView borderRadius={20} align='center' isButton clickable onClick={() => setShowStartPicker(false)} style={{ padding: 8, }}>
                <StyleText style={{ fontWeight: 600, }}>Set Start Time</StyleText>
            </StyledBlurView>
          </StyledView>
        </StyledView>
          )}


<StyledBlurView clickable onClick={handleShowEndTime} style={{ padding: 10 }}>
            <StyleText style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>End Time: {formatTime(endTime)}</StyleText>
          </StyledBlurView>
          {showEndPicker && (
        <StyledView>  
            <DateTimePicker
              mode="time"
              value={endTime}
              is24Hour
              minuteInterval={15}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleEndChange}
            />
        
          <StyledView align="center">
            <StyledBlurView borderRadius={20} align='center' isButton clickable onClick={() => setShowEndPicker(false)} style={{ padding: 8, }}>
                <StyleText style={{ fontWeight: 600 }}>Set End Time</StyleText>
            </StyledBlurView>
          </StyledView>
          </StyledView>
          )}

         {isBulkUpdate &&  <StyledView justify="center">   
            {Object.entries(DaysOfWeek).filter(([key, value]) => isNaN(Number(key))).map(([key, value], i) => (
                <Checkbox.Item label={key} key={key} status={bulkDays?.indexOf(key) === -1  ? "unchecked": "checked"} onPress={() => onAddDay?.(key) } />
            ))}
          </StyledView>}
          {liveError && (
  <StyledView>
    <StyleText style={{ fontSize: 11, color: 'red' }}>{liveError}</StyleText>
  </StyledView>
)}

            <StyledDivider orientation="horizontal" bold />
          <StyledView direction="column" justify="center"  gap={25}>
            <Button
            disabled={!!liveError}
              mode="contained"
              onPress={handleSubmit}
            >
              {submitLabel ? submitLabel : isLoading ? "Loading..." : "Add Slot +"}
            </Button>
            <Button mode="text" textColor='red' onPress={onClose}>
              Close
            </Button>
          </StyledView>
        </StyledView>
      </StyledView>
        </StyledBlurView>
            </ScrollView>
        </SafeAreaView>
    </Modal>
  );
};

export default TimeSlotModal;
