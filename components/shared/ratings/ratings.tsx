import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, IconButton } from 'react-native-paper';
import styled from 'styled-components/native';

interface IStarRatingProps {
    // current rating of the user
    userRating: number;
    // allows the user to add a new rating for barber
    isReview: boolean;
    // size of the stars
    size: number;
    // color of the starts
    color: string;
}

export const StarRatings = ({ 
    userRating, 
    isReview, 
    size, 
    color
}: IStarRatingProps) => {
    const [rating, setRating] = useState<number>(userRating ?? 0);
    //icons for star ratings
    const FullStar = "star";
    const HalfStar = "star-half";
    const EmptyStar = "star-outline";

    const handleRatingPress = (index: number) => {
        // check if index + 5 is less than the current rating then we can add a half star
        if(index + 0.5 <= rating) {
            setRating(index + 0.5);
        } else {
            setRating(index);
        }
    }

    return (
        <StyledView >
            {Array.from({ length: 5 }).map((_, i) => {
                const isHalf = (rating > i && rating < i + 1);
                let starIcon = EmptyStar;

                // determine whether we need to add a half star or full star
                if(rating >= i + 1) {
                    starIcon = FullStar;
                } else if(isHalf) {
                    starIcon = HalfStar;
                }

                return (
                    <TouchableOpacity disabled={!isReview} onPress={() => handleRatingPress(i)} key={`${i}-starRating`}>
                        <Icon
                        source={starIcon} 
                        size={size} />
                    </TouchableOpacity>
                )
            })}
        </StyledView>
    )
}

const StyledView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
padding: 0;
margin: 0;
gap: ${(props: { gap?: number}) => props?.gap ?? 2}px;
`;