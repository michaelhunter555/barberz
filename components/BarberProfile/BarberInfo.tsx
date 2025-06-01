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
                
                <StyledView align="flex-end" gap={5}>
                    <StyledView
                    style={{ overflow: 'hidden', borderRadius: 5, padding: 2, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon color="green" source="checkbox-blank-circle" size={10} /> 
                    <StyleText style={{ color: 'green'}}>Live</StyleText>
                    </StyledView>
                    <StyledView direction="row" align="center" justify="flex-end">
                    <StyleText style={{ fontSize: 16, fontWeight: 600 }}>Starting Price:</StyleText>
                    <StyleText style={{ fontSize: 20, fontWeight: 700 }}>$50</StyleText>
                    </StyledView>
                <StyledView direction="row" align="center" gap={5}>
                    <TouchableOpacity activeOpacity={0.7}>
                    <StyleText style={{ color: '#007AFF' }}>15 Reviews</StyleText>
                    </TouchableOpacity>
                    <StyledBlurView isPaper style={{ overflow: 'hidden', borderRadius: 5, padding: 5, flexDirection: 'row', gap: 2 }}>
                        <Icon source="star" size={15} /> 
                    <StyleText>5.0</StyleText>
                    </StyledBlurView>
                    <StyledBlurView isPaper direction="row" gap={5} align="center" borderRadius={5} style={{ padding: 5, }}> 
                    <Icon source="check-circle" size={15} /> 
                        <StyleText>Verified</StyleText>
                        </StyledBlurView>
                </StyledView>
                </StyledView>
                </StyledView>
            </View>
          
        </View>
    )
}

export default BarberInfoSection;