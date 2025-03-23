import { useState } from 'react';
import { ColorSchemeName, View, TouchableOpacity } from 'react-native';
import { Chip, Icon } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native';

const filterOptions = [
    { icon: "triangle", text: 'near' },
    { icon: "square", text: 'deals' },
    { icon: "cards-diamond", text: 'best' }
]

interface IBarberChips {
    colorScheme: ColorSchemeName;
}

export const FilterBarberChips = ({ colorScheme }: IBarberChips) => {
    const [isSelected, setIsSelected] = useState<number>(0);
    const colors = colorScheme === 'light';
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            {filterOptions.map(({ text, icon }, i) => (
                <TouchableOpacity key={text} onPress={() => setIsSelected(i)}>
                <StyledBlurChip selected={i === isSelected} intensity={40} tint="light">
                    <Icon source={icon} color="#563586" size={15} />
                    <StyledText color={colors ? "#444" : "#f1f1f1"}>
                        {text}
                    </StyledText>
                </StyledBlurChip>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const StyledBlurChip = styled(BlurView)`
padding: 5px 10px;
display: flex;
flex-direction: row;
align-items: center;
gap: 2px;
border-radius: 50px;
overflow: hidden;
border: ${(props: { selected: boolean}) => props.selected ? '1px solid #563586': '1px solid transparent'}
`;

const StyledText = styled.Text`
color: ${(props: { color: string }) => props.color};
fontSize: 12px;
`;