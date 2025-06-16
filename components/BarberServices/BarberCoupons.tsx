import React from 'react';
import { router } from 'expo-router';
import { StyleText, StyledView, StyledBlurView } from '../shared/SharedStyles';
import { IconButton } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/context/auth/use-auth';
import { useBarber } from '@/hooks/barber-hooks';
import { ManySkeletonTextLines, SkeletonTextLine } from '../shared/LoadingSkeleton/Skeletons';

const currentCoupons = [
    {name: "Get $10 off", isPublic: true, isActive: true, amount: 10, minPriceActivation: 60, expirationDate: "-", transactions: 1, onlyForUsers: []},
    {name: "Get $20 off", isPublic: true, isActive: true, amount: 20, minPriceActivation: 100, expirationDate: "-", transactions: 0, onlyForUsers: []},
    {name: "Get $30 off", isPublic: true, isActive: true, amount: 30, minPriceActivation: 150, expirationDate: "-", transactions: 3, onlyForUsers: []},
    {name: "Get $40 off", isPublic: true, isActive: true, amount: 30, minPriceActivation: 150, expirationDate: "-", transactions: 1, onlyForUsers: []}
]

interface IBarberCoupons {
    startFetch: boolean;
}

const BarberCoupons = () => {
    const auth = useAuth();
    const barber = auth?.userAuth;
    const { getCoupons } = useBarber();

    const { data: coupons , isLoading: couponsIsLoading } = useQuery({
        queryKey: [barber?.id, "barberCoupons"],
        queryFn: () => getCoupons(),
        enabled: Boolean(barber?.id),
    });

    return (
        <StyledView style={{ marginTop: 10, flexWrap: 'wrap' }} direction="row" align="center" gap={5}>
             {couponsIsLoading && (
                <StyledView style={{ width: '100%' }}>
                    <ManySkeletonTextLines width={200} />
                </StyledView>
                
            )}
           {!couponsIsLoading && 
           <>
           <StyleText>You can have up to 4 coupons at any given time. The number inside the parenthesis represents total transactions.</StyleText>
            {coupons &&
             coupons.length && coupons.map((coupon, i) => (
                <StyledBlurView style={{ padding: 10 } }key={coupon?._id} clickable onClick={() => router.push({ pathname: "/couponform", params: { selectedCoupon: JSON.stringify(coupon) }})}>
                    <StyleText>{coupon.name} ({coupon.transactions})</StyleText>
                </StyledBlurView>
            ))}
            {coupons?.length === 0 && <StyleText>No coupons added yet.</StyleText>}
           <StyledView direction="column" align="center">
        <IconButton disabled={coupons && coupons?.length > 3} onPress={() => router.push("/couponform")} size={12} style={{ backgroundColor: "#007AFF" }} icon="plus" />
        </StyledView>
           </>}
           
        </StyledView>
    )
}

export default BarberCoupons;