import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    ColorSchemeName, 
    NativeSyntheticEvent, 
    TextInputChangeEventData,
    TouchableOpacity 
} from 'react-native';
import { Icon, IconButton } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import styled
 from 'styled-components';
interface ISearchBar {
    searchValue: string;
    onSearchSubmit: (query: string) => void;
    colorScheme: ColorSchemeName;
    placeholder?: string;
}

export const SearchBar = ({searchValue, onSearchSubmit, colorScheme, placeholder}: ISearchBar) => {
    const tint = colorScheme === 'light' ? 'dark':'light';
    const intensity = colorScheme === 'light' ? 35:70;
    const textColor = colorScheme === 'light' ? "#222": "white";

    const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        e.preventDefault();
        onSearchSubmit(e.nativeEvent.text);
    }

return (
    <StyledBlurSearch intensity={intensity} tint={tint} >
        <TouchableOpacity activeOpacity={0.9} onPress={() => console.log(searchValue)}>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 10}}>
            <Icon size={30} source="search-web" />
        </View>
        </TouchableOpacity>
        <View style={{ overflow: 'hidden', width: '85%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View>
            <StyledTextInput
            style={{ color: colorScheme === 'light' ? "#222" : "white" }}
            maxLength={70} 
            value={searchValue}
            onChange={handleSearch}
            inputMode="search"
            textAlign="left"
            textContentType="location"
            placeholder={placeholder ? placeholder : "Browse a location..."}
            placeholderTextColor={colorScheme === "light" ? "#444":"#f1f1f1"}
            selectionColor={"#fff"}
            />
        </View>
       {searchValue && searchValue.trim().length > 0 && 
       <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <IconButton size={15} icon="arrow-right" iconColor='black' containerColor='white' onPress={() => console.log("here")} />
        </View>}
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
