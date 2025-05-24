import React from 'react';
import { StyleText, StyledView, StyledBlurView } from '../shared/SharedStyles';
import { IconButton } from 'react-native-paper';

const currentCoupons = [
    {name: "Get $10 off", isPublic: true, isActive: true, amount: 10, minPriceActivation: 60, expirationDate: "-", transactions: 1, onlyForUsers: []},
    {name: "Get $20 off", isPublic: true, isActive: true, amount: 20, minPriceActivation: 100, expirationDate: "-", transactions: 0, onlyForUsers: []},
    {name: "Get $30 off", isPublic: true, isActive: true, amount: 30, minPriceActivation: 150, expirationDate: "-", transactions: 3, onlyForUsers: []},
    {name: "Get $40 off", isPublic: true, isActive: true, amount: 30, minPriceActivation: 150, expirationDate: "-", transactions: 1, onlyForUsers: []}
]

const BarberCoupons = () => {
    
    return (
        <StyledView style={{ marginTop: 20, flexWrap: 'wrap' }} direction="row" align="center" gap={5}>
            <StyleText>You can have up to 4 coupons at any given time. The number inside the parenthesis represents total transactions.</StyleText>
            { currentCoupons.map((coupon, i) => (
                <StyledBlurView style={{ padding: 10 }}key={coupon.name} clickable onClick={() => console.log("Open modal")}>
                    <StyleText>{coupon.name} ({coupon.transactions})</StyleText>
                </StyledBlurView>
            ))}
            <StyledView direction="column" align="center">
        <IconButton disabled={currentCoupons.length > 3} onPress={() => console.log("add new service")} size={12} style={{ backgroundColor: "#007AFF" }} icon="plus" />
        </StyledView>
        </StyledView>
    )
}

export default BarberCoupons;