import { ColorSchemeName, View, } from 'react-native';
import { Avatar, Icon } from 'react-native-paper';
import { StyledText } from './SettingStyles';
import { BlurView } from 'expo-blur';

interface IUserInfoSettings {
    colorScheme: ColorSchemeName;
    name: string;
    userImgPath: string;
    blurIntensity: number;
    blurType: 'light' | 'dark'
    ;
}

const UserInfoSection = ({ colorScheme, name, userImgPath, blurIntensity, blurType }: IUserInfoSettings) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center', gap: 90
        }}>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View><StyledText style={{ fontSize: 30 }} colorScheme={colorScheme}>{name}</StyledText></View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <BlurView intensity={blurIntensity} tint={blurType} style={{ overflow: 'hidden', borderRadius: 5, padding: 5, flexDirection: 'row', gap: 2 }}><Icon source="star" size={15} /> <StyledText colorScheme={colorScheme}>5.0</StyledText></BlurView>
                    <BlurView intensity={blurIntensity} tint={blurType} style={{ overflow: 'hidden', borderRadius: 5, padding: 5 }}> <StyledText colorScheme={colorScheme}>Verified</StyledText></BlurView>
                </View>
            </View>
            <View>
                <Avatar.Image style={{ marginVertical: 5 }} size={50} source={{ uri: userImgPath }} />
            </View>
        </View>
    )
}

export default UserInfoSection;