import { ColorSchemeName, TouchableOpacity, View, } from 'react-native';
import { Avatar, Icon, IconButton} from 'react-native-paper';
import { StyleText, StyledBlurView } from '../shared/SharedStyles';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native';

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
            alignItems: 'flex-end', gap: 45
        }}>
            <View>
                <Avatar.Image style={{ marginVertical: 5 }} size={50} source={{ uri: userImgPath }} />
                <View><StyleText style={{ fontSize: 20 }}>{name}</StyleText></View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <TouchableOpacity activeOpacity={0.7}>
                    <StyleText style={{ color: '#007AFF' }}>15 Reviews</StyleText>
                    </TouchableOpacity>
                    <StyledBlurView style={{ overflow: 'hidden', borderRadius: 5, padding: 5, flexDirection: 'row', gap: 2 }}>
                        <Icon color="white" source="star" size={15} /> 
                    <StyleText>5.0</StyleText>
                    </StyledBlurView>
                    <StyledBlurView style={{ overflow: 'hidden', borderRadius: 5, padding: 5 }}> 
                        <StyleText>Verified</StyleText>
                        </StyledBlurView>
                </View>
            </View>
          
        </View>
    )
}

export const StyledText = styled.Text`
font-size: 12px;
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222' : "#f1f1f1"};
`

export default BarberInfoSection;