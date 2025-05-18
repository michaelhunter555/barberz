import { ColorSchemeName, View, } from 'react-native';
import { Avatar, Icon } from 'react-native-paper';
import { StyledText } from './SettingStyles';
import { StyleText, StyledBlurView } from '../shared/SharedStyles';
import { BlurView } from 'expo-blur';

interface IUserInfoSettings {
    name: string;
    userImgPath: string;
}

const UserInfoSection = ({ name, userImgPath }: IUserInfoSettings) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center', gap: 90
        }}>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View><StyleText style={{ fontSize: 30 }}>{name}</StyleText></View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <StyledBlurView direction="row" borderRadius={5} gap={2} style={{ padding: 5 }}>
                        <Icon source="star" size={15} /> 
                    <StyleText>5.0</StyleText>
                    </StyledBlurView>
                    <StyledBlurView borderRadius={5} style={{  padding: 5 }}> 
                        <StyleText>Verified</StyleText>
                        </StyledBlurView>
                </View>
            </View>
            <View>
                <Avatar.Image style={{ marginVertical: 5 }} size={50} source={{ uri: userImgPath }} />
            </View>
        </View>
    )
}

export default UserInfoSection;