import { TouchableOpacity, View, } from 'react-native';
import { Avatar, Icon } from 'react-native-paper';
import { StyleText, StyledBlurView, StyledView } from '../shared/SharedStyles';
import GoBackArrow from '../shared/BackArrow/GoBackArrow';
import { router } from 'expo-router';

interface IBarberInfoSection {
    name: string;
    userImgPath: string;
}

const BarberInfoSection = ({ name, userImgPath }: IBarberInfoSection) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end', 
            gap: 15,
            marginTop: 20,
        }}>
            <View style={{ width: '100%', padding: 2 }}>
                <StyledView direction="row" justify="space-between" align="center">
                    <StyleText style={{ fontSize: 20 }}>{name}</StyleText>
                   <GoBackArrow />
                </StyledView>
                <StyledView direction="row" justify="space-between" align="flex-end" gap={10}>
                <Avatar.Image style={{ marginVertical: 5 }} size={70} source={{ uri: userImgPath }} />
                <StyledView direction="row" align="center" gap={5}>

                    <TouchableOpacity activeOpacity={0.7}>
                    <StyleText style={{ color: '#007AFF' }}>15 Reviews</StyleText>
                    </TouchableOpacity>
                    <StyledBlurView style={{ overflow: 'hidden', borderRadius: 5, padding: 5, flexDirection: 'row', gap: 2 }}>
                        <Icon color="white" source="star" size={15} /> 
                    <StyleText>5.0</StyleText>
                    </StyledBlurView>
                    <StyledBlurView direction="row" gap={5} align="center" borderRadius={5} style={{ padding: 5, }}> 
                    <Icon color="white" source="check-circle" size={15} /> 
                        <StyleText>Verified</StyleText>
                        </StyledBlurView>
                </StyledView>
                </StyledView>
            </View>
          
        </View>
    )
}

export default BarberInfoSection;