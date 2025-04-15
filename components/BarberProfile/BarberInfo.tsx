import { ColorSchemeName, TouchableOpacity, View, } from 'react-native';
import { Avatar, Icon, IconButton} from 'react-native-paper';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native';

interface IBarberInfoSection {
    colorScheme: ColorSchemeName;
    name: string;
    userImgPath: string;
    blurIntensity: number;
    blurType: 'light' | 'dark'
    ;
}

const BarberInfoSection = ({ colorScheme, name, userImgPath, blurIntensity, blurType }: IBarberInfoSection) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end', gap: 45
        }}>
            <View>
                <Avatar.Image style={{ marginVertical: 5 }} size={50} source={{ uri: userImgPath }} />
                <View><StyledText style={{ fontSize: 20 }} colorScheme={colorScheme}>{name}</StyledText></View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <TouchableOpacity activeOpacity={0.7}>
                    <StyledText style={{ color: '#007AFF' }}>15 Reviews</StyledText>
                    </TouchableOpacity>
                    <BlurView intensity={blurIntensity} tint={blurType} style={{ overflow: 'hidden', borderRadius: 5, padding: 5, flexDirection: 'row', gap: 2 }}>
                        <Icon color="white" source="star" size={15} /> 
                    <StyledText colorScheme={colorScheme}>5.0</StyledText>
                    </BlurView>
                    <BlurView intensity={blurIntensity} tint={blurType} style={{ overflow: 'hidden', borderRadius: 5, padding: 5 }}> 
                        <StyledText colorScheme={colorScheme}>Verified</StyledText>
                        </BlurView>
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