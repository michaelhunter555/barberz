import React, { useState, useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { StyledView, StyledBlurView, StyleText, StyledDivider } from '../SharedStyles';

interface IResourceItem {
itemId?: number;
image?: string;
imageArr?: string[]
header?: string;
content?: string;
onViewPress?: () => void;
actionText?: string;
isRow?: boolean;
isOffer?: boolean;
};

const ResourceItem = ({ 
    itemId, 
    image, 
    imageArr, 
    header, 
    content,
    actionText,
    isRow,
    onViewPress,
    isOffer
}:IResourceItem) => {
    const [imagePath, setImagePath] = useState<string | string[]>(image ?? "");
    const [index, setIndex] = useState<number>(0)

    useEffect(() =>  {
        if(imageArr) {
            setImagePath(imageArr[index])
        }
    }, [index]);

    const handleUpdateImageIndex = (i: number, imgPath: string) => {
        setIndex(i);
        setImagePath(imagePath)
    }

    return (
        <StyledBlurView direction={isRow ? "row": "column"} isPaper style={{ ...(isRow && { alignItems: 'center' }), padding: 10, flex: 1 }} gap={5}>
            <StyledView direction={"column"} align={isRow ? "normal": "center"}>
            <Image style={{ borderRadius: 10 }} width={isRow? 100: 300} height={isRow ? 100 : 115} source={{ uri: String(imagePath )}} alt={`${header}--image`} />
            </StyledView>
            <StyledView direction="column" style={{ ...(isRow && { width: 220 }) }}>

          <StyleText style={{ fontSize: 16, fontWeight: 700 }}>{header}</StyleText>
            <ScrollView horizontal style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            {imageArr && imageArr?.length > 1 && imageArr?.map((img, i) => (
                <TouchableOpacity style={{ marginLeft: 10, }} key={itemId ?? i} activeOpacity={0.8} onPress={() => handleUpdateImageIndex(i, img)}>
                    <Image style={{ borderRadius: 10 }} width={30} height={30} source={{ uri: img }} alt={`${i}--post`} />
                </TouchableOpacity>
            ))}
            </ScrollView>
            <StyledView>
                <StyleText style={{ flex: 1,}}>{content}</StyleText>
                {!isOffer && <StyleText style={{ marginTop: 2}}>by Barber App team</StyleText>}
            </StyledView>
            <StyledDivider orientation="horizontal" marginVertical={5} />
            <StyledView style={{ ...(isRow && {  
                flexDirection: 'row', 
                justifyContent: 'flex-end',})
                }}>
            <StyledBlurView 
            style={{ 
                ...(isRow &&
                 { 
                    width: 100
                }),
                padding: 5,
                    }} 
                    align='center' 
                    clickable 
                    isButton
                    onClick={onViewPress} 
                    borderRadius={50}>
                <StyleText style={{ fontSize: 15, fontWeight: 600 }}>{actionText ?? 'Learn More'}</StyleText>
            </StyledBlurView>
            </StyledView>
            </StyledView>

        </StyledBlurView>
    )
};

export default ResourceItem;