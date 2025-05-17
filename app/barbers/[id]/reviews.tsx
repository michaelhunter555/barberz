import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from 'react-native';
import { StyleText, StyledView } from '@/components/shared/SharedStyles';
import styled from "styled-components/native";
import ReviewList from "@/components/ReviewsList/ReviewList";
import GoBackArrow from "@/components/shared/BackArrow/GoBackArrow";

export default function BarberProfile() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView>
            <StyledView style={{ marginVertical: 10 }}>
           <GoBackArrow />
            </StyledView>
            <ReviewList />
        </ScrollView>
    )
    
}