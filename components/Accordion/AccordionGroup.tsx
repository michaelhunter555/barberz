import React, { useState } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { StyledView, StyleText, StyledBlurItem } from "../shared/SharedStyles";
import { Icon } from 'react-native-paper';

interface IAccordionGroup {
    arr: Array<TAccordionProps>;
    hasComponent?: boolean;
}

type TAccordionProps = {
    id: number;
    isOpen: boolean;
    questionText: string;
    explanationText: string;
    Component?: React.ReactNode;
}

const AccordionGroup = ({ arr, hasComponent }: IAccordionGroup) => {
    const [accordion, setAccordion] = useState<Array<TAccordionProps>>(arr);
    const colorScheme = useColorScheme();

    const handleTabClick = (id: number) => {
        setAccordion((prev) => {
            return prev.map((accordion, index) => {
                if (id === accordion.id) {
                    return { ...accordion, isOpen: !accordion.isOpen }
                }
                return { ...accordion, isOpen: false };
            })
        })
    }

    return accordion.map((item) => (
        <StyledView key={item.id} direction="column" style={{ width: '100%', marginBottom: 5 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleTabClick(item.id)}>
                <View style={{ borderRadius: 10, backgroundColor: '#222', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 15, minHeight: 35 }}  >
                    <View style={{ width: '90%' }}>
                        <StyleText style={{ flexWrap: 'wrap', fontWeight: 700, color: 'white'  }}>{item.questionText}</StyleText>
                    </View>

                    <View style={{ width: '10%' }}>
                        <Icon color="white" source={item.isOpen ? 'arrow-down' : 'arrow-up'} size={15} />
                    </View>
                </View>
            </TouchableOpacity>

            {item.isOpen && (
                <StyledView style={{ paddingLeft: 15 }}>
                    <StyleText>{item.explanationText}</StyleText>
                    {hasComponent && item.Component}
                </StyledView>
            )}

        </StyledView>
    ))

}

export default AccordionGroup;