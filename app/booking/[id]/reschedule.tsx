import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, } from 'react-native';

const reasonList = [
    "I am currently unavailable",
    "Can't reach in time/too far",
]

const RescheduleBooking = () => {
    const [reason, setReason] = useState<string>("");
    const { id } = useLocalSearchParams();

    return (
        <ScrollView>

        </ScrollView>
    )
};

export default RescheduleBooking;