import React from 'react';
import { StyledView, StyleText } from '../SharedStyles';
import { Icon } from 'react-native-paper';

interface ICouponSticker {
    price: number;
    isFeatured?: boolean;
}
const CouponSticker = ({ price, isFeatured }: ICouponSticker) => {
    return (
        <StyledView 
        direction="row"
        align="center"
        justify="center"
        gap={3}
        style={{ 
            backgroundColor: isFeatured ? "#049f00": '#222',
            borderRadius: 10, 
            padding: 3,
            }}>
                <Icon source="content-cut" color='#fff' size={10}/>
                <StyleText style={{
                    fontWeight: 600, 
                    fontSize: 10,
                    color: "#fff"
                     }}>Get {price} Off!</StyleText>
        </StyledView>
    )
};

export default CouponSticker;