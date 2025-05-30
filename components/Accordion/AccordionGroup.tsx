import { useState } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { StyledView, StyledText, StyledBlurItem } from "../shared/SharedStyles";
import { Icon } from 'react-native-paper';

interface IAccordionGroup {
    arr: Array<TAccordionProps>;
}

type TAccordionProps = {
    id: number;
    isOpen: boolean;
    questionText: string;
    explanationText: string;
}

const AccordionGroup = ({ arr }: IAccordionGroup) => {
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
                        <StyledText style={{ flexWrap: 'wrap', fontWeight: 700  }} colorScheme={colorScheme}>{item.questionText}</StyledText>
                    </View>

                    <View style={{ width: '10%' }}>
                        <Icon source={item.isOpen ? 'arrow-down' : 'arrow-up'} size={15} />
                    </View>
                </View>
            </TouchableOpacity>

            {item.isOpen && (
                <StyledView style={{ paddingLeft: 15 }}>
                    <StyledText colorScheme={colorScheme}>{item.explanationText}</StyledText>
                </StyledView>
            )}

        </StyledView>
    ))

}

export default AccordionGroup;