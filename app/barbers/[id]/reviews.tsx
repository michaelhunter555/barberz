import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from 'react-native';
import { StyleText, StyledView } from '@/components/shared/SharedStyles';
import styled from "styled-components/native";
import ReviewList from "@/components/ReviewsList/ReviewList";
import GoBackArrow from "@/components/shared/BackArrow/GoBackArrow";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BarberProfile() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView style={{ padding: 10 }}>
            <StyledView style={{ marginVertical: 10 }}>
           <GoBackArrow />
            </StyledView>
            <ReviewList />
        </ScrollView>
           
    )
    
}