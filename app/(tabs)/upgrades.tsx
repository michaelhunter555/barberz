import React from 'react';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledView, StyleText, } from '@/components/shared/SharedStyles';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import { UpgradeMarker, UpgradeServiceLimits, UpgradeToShop, GetAFeature } from '../../components/Upgrades/UpgradeCards';

const Upgrades = () => {
return (
    <SafeAreaView style={{ flex: 1}}>
        <GoBackArrow />
        <ScrollView>
            <StyledView direction="column" gap={10} style={{ padding: 10, marginBottom: 50 }}>

            <StyledView>
                <UpgradeMarker />
            </StyledView>

            <StyledView>
                <UpgradeServiceLimits />
            </StyledView>

            <StyledView>
                <UpgradeToShop />
            </StyledView>

            <StyledView>
                <GetAFeature />
            </StyledView>
            </StyledView>

        </ScrollView>
    </SafeAreaView>
)
};

export default Upgrades;