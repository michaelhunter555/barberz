import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from 'react-native';
import styled from "styled-components/native";
import ReviewList from "@/components/ReviewsList/ReviewList";

export default function BarberProfile() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView>
            <ReviewList />
        </ScrollView>
    )
    
}