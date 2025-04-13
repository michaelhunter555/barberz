import { View, Image, ColorSchemeName, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { StyledView, StyledText, StyledBlurCard } from "./SettingStyles";
import { BlurView } from 'expo-blur';

interface IUserOffers {
    colorScheme: ColorSchemeName;
    blurIntensity: number;
    blurType: 'light' | 'dark';
    imgPath: ImageSourcePropType;
    isActive: boolean;
    onActivateOffer: () => void;
    onOpenTerms: () => void;
}

const UserOffers = ({
    colorScheme,
    blurIntensity,
    blurType,
    imgPath,
    isActive,
    onActivateOffer,
    onOpenTerms
}: IUserOffers) => {
    return (
        <StyledView style={{ width: '100%' }}>
            <View style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                <StyledText colorSchme={colorScheme} style={{ textAlign: 'left', fontSize: 15, fontWeight: 700 }}>
                    My Offers
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
                <Image source={imgPath} style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden' }} />
                <View style={{ flex: 1 }}>
                    <StyledText style={{ flex: 1 }} colorScheme={colorScheme}>Get $10 off your next hair cut. Stay fresh for less.</StyledText>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={onOpenTerms}>

                            <StyledText colorScheme={colorScheme} style={{ color: '#007AFF' }}>Terms & Conditions</StyledText>

                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={onActivateOffer}>
                            <BlurView
                                intensity={blurIntensity}
                                tint={blurType}
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: 8,
                                    padding: 4,
                                    ...(!isActive && { backgroundColor: '#007AFF' })
                                }}>
                                <StyledText colorScheme={colorScheme}>{isActive ? 'Activated' : 'Activate'}</StyledText>
                            </BlurView>
                        </TouchableOpacity>
                    </View>
                </View>
            </StyledBlurCard>

            <StyledBlurCard
                intensity={blurIntensity}
                tint={blurType}
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    borderRadius: 8,
                    gap: 10,
                }}>
                <Image source={imgPath} style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden' }} />
                <StyledText style={{ flex: 1 }} colorScheme={colorScheme}>Get 20% off on-demand barbers. Get up to 20% off on on demand barber cuts.</StyledText>
            </StyledBlurCard>
        </StyledView>
    )
}

export default UserOffers;