import React from 'react';
import Modal from './Modal';
import {  type UserLicense } from '@/types';
import { StyledView, StyleText } from '../SharedStyles';

interface IUserLicenseModal {
    isOpen: boolean, 
    onClose: () => void,
    userLicense: UserLicense
}

const configureText = (userName: string, state: string ) => {
    return `${userName} has a valid license to perform the advertised services in ${state}.`;
}

const UserLicenseModal = ({ isOpen, onClose, userLicense }: IUserLicenseModal) => {
const text = configureText(userLicense?.name, userLicense?.state);
    
    return <Modal
    isOpen={isOpen}
    onClose={onClose}
    header="Verified license" 
    text={text} >
        <StyledView>
            <StyleText>{userLicense?.name}</StyleText>
            <StyleText>{userLicense?.state}</StyleText>
            <StyleText>{userLicense?.city}</StyleText>
            <StyleText>{String(userLicense?.expiration)}</StyleText>
            <StyleText>{userLicense?.category}</StyleText>
        </StyledView>
    </Modal>
};

export default UserLicenseModal;