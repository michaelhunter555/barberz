import React from 'react';
import { StyledView, StyleText, StyledBlurView } from '../SharedStyles';
import { Dialog, Portal, Button, IconButton, Icon } from 'react-native-paper';

interface IModal {
 children: React.ReactNode;
 isOpen: boolean;
 onClose: () => void;
 text: string;
 header?: string;
}

const Modal = ({ children, isOpen, onClose, text, header }: IModal) => {
    return (
        <Portal>
        <Dialog visible={isOpen} onDismiss={onClose}>
            <StyledView direction="row" align="center" justify="space-between">
            {header && <Dialog.Title>{header}</Dialog.Title>}
            <IconButton icon={() => <Icon source="close-circle" size={12} />} onPress={onClose} />
            </StyledView>
            <Dialog.Content>
                <StyleText>
                  {text}
                </StyleText>
            </Dialog.Content>
            <Dialog.Content>
               {children}
            </Dialog.Content>
           
        </Dialog>
    </Portal>
    )
};

export default Modal;