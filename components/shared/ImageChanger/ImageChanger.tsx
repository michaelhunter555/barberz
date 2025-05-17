import React, { useState, } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Dialog, Icon, Portal } from 'react-native-paper';
import { StyleText, StyledView, StyledBlurView } from '../SharedStyles';

interface ImageChangerProps {
    path: string;
    onClose: () => void;
    isOpen: boolean;
    onNextClick?: (isNext: boolean) => void;
}


const ImageChanger = ({ path, onClose, isOpen, onNextClick }: ImageChangerProps) => {
return (
    <Portal>
        <Dialog visible={isOpen} onDismiss={onClose}>
           
            <Dialog.Content>
                <StyledView direction="row" align="center" justify="space-between" style={{ width: "100%" }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onNextClick?.(false)}>
                    <Icon source="arrow-left" size={15} />
                    </TouchableOpacity>
                        <StyledView direction="row">
                            <Image style={{ width: 200, height: 200, borderRadius: 8, objectFit: "contain" }} source={{ uri: path }}  alt="showCase" />
                        </StyledView>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onNextClick?.(true)}>
                    <Icon source="arrow-right" size={15} />
                        </TouchableOpacity>
                </StyledView>
            </Dialog.Content>
            <Dialog.Actions>
                <StyledBlurView clickable style={{ padding: 5 }} isButton onClick={onClose}>
                   <StyleText>Close</StyleText> 
                </StyledBlurView>
            </Dialog.Actions>
        </Dialog>
    </Portal>
)
};

export default ImageChanger;