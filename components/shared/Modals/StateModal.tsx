import React, { useState, useEffect } from 'react';
import { Modal, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import { StyledView, StyleText, StyledBlurView, StyledDivider } from '../SharedStyles';
import { US_STATES } from '@/lib/statesAndCites';

interface IStateModal {
    isOpen: boolean;
    value: string;
    onClose: () => void;
    handleSubmit: (state: string) => void;
}

const StatesModal = ({isOpen, value, onClose, handleSubmit}: IStateModal) => {
    const [state, setState] = useState<string>("");
    const handleStateChange = (state: string) => {
        setState(state);
    };

    const handleSubmitState = (state: string) => {
        handleSubmit(state);
        onClose();
    }
    
    return (
        <Modal visible={isOpen} transparent animationType='slide'>
            <StyledBlurView style={{ padding: 20, flex: 1, width: '100%'}}>
            <Picker
            selectedValue={state}
            onValueChange={handleStateChange}
            style={{ marginTop: 100 }}
            >
                {US_STATES.map((state,i) => (
                    <Picker.Item key={i} label={state} value={state} />
                ))}
            </Picker>

              <StyledDivider orientation="horizontal" bold />
                      <StyledView direction="column" justify="center"  gap={25}>
                        <Button
                          mode="contained"
                          onPress={() => handleSubmitState(state)}
                        >
                          Select State
                        </Button>
                        <Button mode="text" textColor='red' onPress={onClose}>
                          Close
                        </Button>
                      </StyledView>
            </StyledBlurView>
        </Modal>
    )
}

export default StatesModal