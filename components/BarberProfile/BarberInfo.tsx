import { ColorSchemeName, TouchableOpacity, View, } from 'react-native';
import { Avatar, Icon, IconButton} from 'react-native-paper';
import { StyleText, StyledBlurView } from '../shared/SharedStyles';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native';
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
            gap: 45,
            marginTop: 20,
        }}>
            <View>
             <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()} style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Icon source="arrow-left" size={15} />
                    <StyleText style={{ fontSize: 13 }}>Go back</StyleText>
                </TouchableOpacity>
                <View><StyleText style={{ fontSize: 20 }}>{name}</StyleText></View>
                <Avatar.Image style={{ marginVertical: 5 }} size={70} source={{ uri: userImgPath }} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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
                </View>
            </View>
          
        </View>
    )
}

export default BarberInfoSection;