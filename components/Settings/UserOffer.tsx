import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { StyledBlurView, StyleText, StyledView } from '../shared/SharedStyles';

interface IUserOffers {
    imgPath: ImageSourcePropType;
    isActive: boolean;
    onActivateOffer: () => void;
    onOpenTerms: () => void;
    isCouponPage?: boolean;
}

const UserOffers = ({
    imgPath,
    isActive,
    onActivateOffer,
    onOpenTerms,
    isCouponPage,
}: IUserOffers) => {
    return (
        <StyledView style={{ width: '100%' }}>
            {!isCouponPage && <View style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                <StyleText style={{ textAlign: 'left', fontSize: 15, fontWeight: 700 }}>
                    My Offers
                </StyleText>
            </View>}
            <StyledBlurView
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    gap: 10,
                    marginVertical: 5,
                    padding: 10,
                }}>
                <Image source={imgPath} style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden' }} />
                <View style={{ flex: 1 }}>
                    <StyleText style={{ flex: 1 }}>Get $10 off your next hair cut. Stay fresh for less.</StyleText>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={onOpenTerms}>
                            <StyleText style={{ color: '#007AFF' }}>Terms & Conditions</StyleText>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={onActivateOffer}>
                            <StyledBlurView isButton={!isActive} style={{ padding: 4 }}>
                                <StyleText>{isActive ? 'Activated' : 'Activate'}</StyleText>
                            </StyledBlurView>
                        </TouchableOpacity>
                    </View>
                </View>
            </StyledBlurView>
        </StyledView>
    )
}

export default UserOffers;