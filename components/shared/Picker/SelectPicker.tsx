import React from 'react';
import {Picker} from '@react-native-picker/picker';
import Modal from '../Modals/Modal';
import { Button } from 'react-native-paper';

const times = [];

interface IPicker {
    arr: Array<string>;
    onClose: () => void;
    isOpen: boolean;
    onAddSlot: () => void;
}

const SelectPicker = ({ arr, onClose, isOpen, onAddSlot }: IPicker) => {
    return (
        <Modal header="add time slot" text="select time slot" onClose={onClose} isOpen={isOpen}>
            {arr.map((item,i) => (
                <Picker key={i}>
                    <Picker.Item label={item} value={item} />
                </Picker>
            ))}
            <Button onPress={onAddSlot}>Add slot +</Button>
        </Modal>
    )
}

export default SelectPicker;