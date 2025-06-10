import React, { useState, useEffect } from 'react';
import { Modal, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import { StyledView, StyleText, StyledBlurView, StyledDivider } from '../SharedStyles';

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSlot: (start: Date, end: Date) => void;
  initialStartTime?: Date;
  initialEndTime?: Date;   
 submitLabel?: string;
}

const TimeSlotModal = ({ 
    isOpen, 
    onClose, 
    onAddSlot,
    initialEndTime,
    initialStartTime,
    submitLabel
}: TimeSlotModalProps) => {
  const [startTime, setStartTime] = useState<Date>( initialStartTime ?? new Date());
  const [endTime, setEndTime] = useState<Date>(initialEndTime ?? new Date());
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setStartTime(initialStartTime ?? new Date());
      setEndTime(initialEndTime ?? new Date());
    }
  },[isOpen, initialStartTime, initialEndTime]);

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
    if (endTime <= startTime) {
        return;
      }
      onAddSlot(startTime, endTime);
      onClose();
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent>
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

            <StyledDivider orientation="horizontal" bold />
          <StyledView direction="column" justify="center"  gap={25}>
            <Button
              mode="contained"
              onPress={handleSubmit}
            >
              {submitLabel ?? "Add Slot +"}
            </Button>
            <Button mode="text" textColor='red' onPress={onClose}>
              Close
            </Button>
          </StyledView>
        </StyledView>
      </StyledView>
        </StyledBlurView>
    </Modal>
  );
};

export default TimeSlotModal;
