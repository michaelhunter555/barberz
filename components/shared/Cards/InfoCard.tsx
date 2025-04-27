import { View, Image, ColorSchemeName, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { StyledView, StyledText, StyledBlurCard } from "../../Settings/SettingStyles";
import { BlurView } from 'expo-blur';

interface ICardProps {
    colorScheme: ColorSchemeName;
    blurIntensity: number;
    blurType: 'light' | 'dark';
    imgPath: string;
    onRightButtonClick: () => void;
    buttonRightText: string;
    label: string;
    description?: string;
    onLeftButtonClick?: () => void;
    buttonLeftText?: string;
}

const Card = ({
    colorScheme,
    blurIntensity,
    blurType,
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
                <StyledText colorSchme={colorScheme} style={{ textAlign: 'left', fontSize: 15, fontWeight: 700 }}>
                   {label}
                </StyledText>
            </View>
            <StyledBlurCard
                intensity={blurIntensity}
                tint={blurType}
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    borderRadius: 8,
                    gap: 10,
                    marginVertical: 5
                }}>
                <Image source={{ uri: imgPath }} style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden' }} />
                <View style={{ flex: 1 }}>
                    <StyledText style={{ flex: 1 }} colorScheme={colorScheme}>{description}</StyledText>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={onLeftButtonClick}>

                            <StyledText colorScheme={colorScheme} style={{ color: '#007AFF' }}>{buttonLeftText}</StyledText>

                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={onRightButtonClick}>
                            <BlurView
                                intensity={blurIntensity}
                                tint={blurType}
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: 8,
                                    padding: 4,
                                    backgroundColor: '#007AFF'
                                }}>
                                <StyledText colorScheme={colorScheme}>{buttonRightText}</StyledText>
                            </BlurView>
                        </TouchableOpacity>
                    </View>
                </View>
            </StyledBlurCard>
        </StyledView>
    )
}

export default Card;