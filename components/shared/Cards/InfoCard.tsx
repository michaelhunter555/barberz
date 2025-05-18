import { View, Image, TouchableOpacity, } from 'react-native';
import { StyleText, StyledView, StyledBlurView } from '../SharedStyles';

interface ICardProps {
    imgPath: string;
    onRightButtonClick: () => void;
    buttonRightText: string;
    label: string;
    description?: string;
    onLeftButtonClick?: () => void;
    buttonLeftText?: string;
}

const Card = ({
    imgPath,
    label,
    description,
    onRightButtonClick,
    onLeftButtonClick,
    buttonRightText,
    buttonLeftText
}: ICardProps) => {
    return (
        <StyledView style={{ width: '100%' }}>
            <View style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                <StyleText style={{ textAlign: 'left', fontSize: 15, fontWeight: 700 }}>
                   {label}
                </StyleText>
            </View>
            <StyledBlurView
            direction="row"
            borderRadius={8}
            gap={10}
                style={{
                    width: '100%',
                    marginVertical: 5,
                    padding: 10,
                }}>
                <Image source={{ uri: imgPath }} style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden' }} />
                <View style={{ flex: 1 }}>
                    <StyleText style={{ flex: 1 }}>{description}</StyleText>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={onLeftButtonClick}>

                            <StyleText style={{ color: '#007AFF' }}>{buttonLeftText}</StyleText>

                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={onRightButtonClick}>
                            <StyledBlurView
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: 8,
                                    padding: 4,
                                    backgroundColor: '#007AFF'
                                }}>
                                <StyleText>{buttonRightText}</StyleText>
                            </StyledBlurView>
                        </TouchableOpacity>
                    </View>
                </View>
            </StyledBlurView>
        </StyledView>
    )
}

export default Card;