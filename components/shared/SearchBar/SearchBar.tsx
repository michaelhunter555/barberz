import React, { useState } from 'react';
import { View, Text, TextInput, ColorSchemeName, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Icon } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import styled
 from 'styled-components';
interface ISearchBar {
    searchValue: string;
    onSearchSubmit: (query: string) => void;
    colorScheme: ColorSchemeName;
}

export const SearchBar = ({searchValue, onSearchSubmit, colorScheme}: ISearchBar) => {
    const tint = colorScheme === 'light' ? 'dark':'light';
    const intensity = colorScheme === 'light' ? 35:70;
return (
    <StyledBlurSearch intensity={intensity} tint={tint} >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 10}}>
            <Icon size={30} source="search-web" />
        </View>
        <View>
            <StyledTextInput 
            maxLength={70} 
            value={searchValue}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => onSearchSubmit(e.nativeEvent.text) }
            inputMode="search"
            textAlign="left"
            textContentType="location"
            placeholder="Browse a location..."
            placeholderTextColor={colorScheme === "light" ? "#444":"#f1f1f1"}
            />
        </View>
    </StyledBlurSearch>
)
}

const StyledTextInput = styled(TextInput)`
`;

const StyledBlurSearch = styled(BlurView)`
overflow: hidden;
border-radius: 50px;
height: 40px;
gap: 10px;
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
`;
