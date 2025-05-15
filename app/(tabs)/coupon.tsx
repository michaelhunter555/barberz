import React, { useState } from 'react';
import { ScrollView, useColorScheme } from 'react-native';
import { useAuth } from '@/context/auth/use-auth';
import { StyledView, StyleText, StyledBlurView } from '../../components/shared/SharedStyles';
import UserOffers from '@/components/Settings/UserOffer';
import TermsDialog from '@/components/Settings/TermsDialog';

export default function TabThreeScreen() {
  const auth = useAuth();
  const colorScheme = useColorScheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [offer, setOffer] = useState< { offerId: string, isActive: boolean }[]>([])
  const shopImg = require("../../assets/images/homeImg.png");
   
  const handleOpenTerms = (i: number): void => {

  };

  const handleActivateOffer = (id: string | number): void => {
   setOffer((prev) => {
    return prev.map((offers, i) => {
      if(offers.offerId === id && !offers.isActive) {
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
        <StyleText>
          Your offers
        </StyleText>
        {Array.from({ length: 4 }).map((_, i) => (
          <UserOffers isCouponPage onActivateOffer={() => handleActivateOffer(i)} onOpenTerms={() => setOpenDialog(true)} isActive={false} imgPath={shopImg} key={i} />
        ))}
      </StyledView>
    </ScrollView>
  );
}
