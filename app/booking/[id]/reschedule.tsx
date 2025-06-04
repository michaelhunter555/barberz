import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';

const reasonList = [
    "I am currently unavailable",
    "Can't reach in time/too far",
]

const RescheduleBooking = () => {
    const [reason, setReason] = useState<string>("");
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView>
            <GoBackArrow />
        <ScrollView>


        </ScrollView>
        </SafeAreaView>
    )
};

export default RescheduleBooking;