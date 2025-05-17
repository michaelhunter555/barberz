import React, { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { StyledView, StyledBlurView } from '../../components/shared/SharedStyles';
import ImageChanger from '../shared/ImageChanger/ImageChanger';

/**
 *  @name - ShowCaseGallery 
 *  @description - Shows up to 5 photos of past haircut from barber.
 */

interface IShowCaseGallery {
images?: string[];
onImgSelect: (path: string, index: number) => void;
}

export const dummyImgArr = [
    { imgPath: "https://images.unsplash.com/photo-1653758265969-b048bb0b328a?q=80&w=2857&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", id: 0 }, 
    { imgPath: "https://plus.unsplash.com/premium_photo-1670998587139-174136b029e8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", id: 1 }, 
    { imgPath: "https://plus.unsplash.com/premium_photo-1670998587139-174136b029e8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", id: 2 }, 
    { imgPath: "https://images.unsplash.com/photo-1545921772-ec7d64bc0bba?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", id: 4 },
    { imgPath: "https://images.unsplash.com/photo-1653758265969-b048bb0b328a?q=80&w=2857&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", id: 5 }, 
]

const ShowCaseGallery = ({ onImgSelect }: IShowCaseGallery) => {
    const handleImageSelect = (currentPath: string, index: number) => {
       onImgSelect(currentPath, index);
    };
return (
    <ScrollView horizontal>
        {/* should replace with images string[] */}
        <StyledView direction="row" align="center" gap={15}>
        {dummyImgArr?.map((path, i) => (
            <StyledBlurView clickable key={path.id} onClick={() => handleImageSelect(path.imgPath, i)}>
        <StyledView direction="row" align="center">
            <Image height={70} width={70} source={{ uri: path.imgPath }} alt={`${i}--${path.id}+showCase`}/>
        </StyledView>
            </StyledBlurView>
        ))}
        </StyledView>
    </ScrollView>
)
};

export default ShowCaseGallery;