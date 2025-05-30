import React, { useState } from 'react';
import { StyleText, StyledView, StyledBlurView } from '../SharedStyles';
import BarberSchedule from '@/components/BarberSchedule/BarberSchedule';
import BarberServices from '@/components/BarberServices/BarberServices';
import BarberCoupons from '@/components/BarberServices/BarberCoupons';

interface ITabContainer {
    tabIndex: number;
    onSelect: (i: number) => void;
};

const tabs = {
    0: "Schedule",
    1: "Services",
    2: "Coupons"
}

const Tabs = ({ tabIndex, onSelect }: ITabContainer) => {
   return <StyledView direction="row" justify="flex-start" gap={10} style={{ marginTop: 20, paddingLeft: 10 }}>
            {Object.entries(tabs).map(([key, value]) => (
            <StyledBlurView  
            key={key}
            isPaper
            style={{ ...(tabIndex === Number(key) && { backgroundColor: "#007AFF" }), borderTopLeftRadius: 8, borderTopRightRadius: 8, height: 30, padding: 5}} 
            clickable 
            onClick={() => onSelect(Number(key))}
            borderRadius={1}
            >
            <StyleText style={{ fontSize: 13, fontWeight: tabIndex === Number(key) ? 700: 400  }}>{value}</StyleText>
            </StyledBlurView>
        ))}
        </StyledView>
}

const TabContainer = ({ tabIndex, onSelect,}: ITabContainer) => {

    return (
        <StyledView style={{ flex: 1, }}>
            <Tabs onSelect={onSelect} tabIndex={tabIndex} />
            <StyledView style={{ borderTopWidth: 1, borderColor: 'white', borderRadius: 8 }}>

            {tabIndex === 0 && <BarberSchedule />}
            {tabIndex === 1 && <BarberServices />}
            {tabIndex === 2 && <BarberCoupons />}
            </StyledView>
        </StyledView>
    )
}

export default TabContainer;