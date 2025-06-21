import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyledView, StyleText, StyledBlurView, StyledDivider } from '../SharedStyles';
import Modal from './Modal';
import { type ICoupon } from '@/types';
import { Divider, Icon } from 'react-native-paper';

interface ISelectCouponModal {
    isOpen: boolean;
    onClose: () => void;
    barberCoupons: ICoupon[];
    onSelectCoupon: (coupon: ICoupon) => void;
}

const SelectCouponModal = ({ isOpen, onClose, barberCoupons, onSelectCoupon }: ISelectCouponModal) => {
    const [openCouponData, setOpenCouponData] = useState<ICoupon | null>(null);

    const handleOpenCoupon = (coupon: ICoupon) => {
        setOpenCouponData((prev) => prev?._id !== coupon._id ? coupon : null);
    };

    const handleSelectCoupon = (coupon: ICoupon) => {
        onSelectCoupon(coupon);
        onClose();
    }

    return (
        <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        header='View available coupons' 
        text="terms and conditions apply">
            <ScrollView>
            <StyledView style={{ height: 300 }}>
                {barberCoupons && barberCoupons.map((coupon,i) => (
                    <StyledBlurView direction='row' gap={8} clickable onClick={() => handleOpenCoupon(coupon)} key={coupon._id} style={{ padding: 4}}>
                        <StyledView direction='row' align='center' >
                            <Icon source="currency-usd" size={15} />
                        <StyleText style={{ fontSize: 15 }}>{coupon.amount} Off</StyleText>
                        </StyledView>
                        <StyledDivider orientation="vertical" />
                        <StyledView direction='row' align="center" gap={5}>
                            <Icon source="information" size={13} />
                        <StyleText>When you spend at least ${coupon.minPriceActivation}</StyleText>
                        </StyledView>
                    </StyledBlurView>
                ))}
               { openCouponData && <StyledView gap={10} style={{ padding: 3 }}>
               <StyleText>{openCouponData?.terms}</StyleText>
               <StyledBlurView onClick={() => handleSelectCoupon(openCouponData)}align="center" borderRadius={20} isButton clickable style={{ padding: 8}}>
                <StyleText style={{ fontWeight: 600 }}>Apply {openCouponData?.name}?</StyleText>
               </StyledBlurView>
                </StyledView>}
            </StyledView>
            </ScrollView>
        </Modal>
    )
};

export default SelectCouponModal;