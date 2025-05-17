import React, { useState } from 'react';
import { ScrollView, useColorScheme } from 'react-native';
import useAuth from '@/context/auth/use-auth';
import { StyledView, StyleText, StyledBlurView } from '../../components/shared/SharedStyles';
import UserOffers from '@/components/Settings/UserOffer';
import TermsDialog from '@/components/Settings/TermsDialog';

export default function TabThreeScreen() {
  const auth = useAuth();
  const colorScheme = useColorScheme();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [offer, setOffer] = useState<{ offerId: string, isActive: boolean }[]>([
    { offerId: "2", isActive: false },
    { offerId: "3", isActive: false },
    { offerId: "4", isActive: false }
  ])
  const shopImg = require("../../assets/images/homeImg.png");

  const handleActivateOffer = (index: number): void => {
    console.log("Coupon", index);
    setCurrentIndex(index);
   setOffer((prev) => {
    return prev.map((offers, i) => {
      if(i === index) {
      return {
        ...offers,
        isActive: true,
      }
    } 
    return offers;
    })
   })
  }

  return (
    <ScrollView>
       <TermsDialog openDialog={openDialog} onOpenDialog={() => setOpenDialog((prev) => !prev)} colorScheme={colorScheme} />
      <StyledView style={{ flex: 1 }}>
        <StyleText style={{ fontWeight: 700, fontSize: 20, }}>
          Your offers
        </StyleText>
        <StyleText>Make sure to read the terms and conditions before applying a coupon. You can apply one coupon per transaction.</StyleText>
        {offer.map((o, i) => (
          <UserOffers key={i} isCouponPage onActivateOffer={() => handleActivateOffer(i)} onOpenTerms={() => setOpenDialog(true)} isActive={o.isActive} imgPath={shopImg} />
        ))}
      </StyledView>
    </ScrollView>
  );
}
