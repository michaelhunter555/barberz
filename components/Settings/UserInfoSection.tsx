import { ColorSchemeName, View, } from 'react-native';
import { Avatar, Icon, IconButton } from 'react-native-paper';
import { StyledText } from './SettingStyles';
import { StyleText, StyledBlurView } from '../shared/SharedStyles';
import { BlurView } from 'expo-blur';
import { useDesign } from '@/hooks/design-hooks';
import { router } from 'expo-router';
import useAuth from '@/context/auth/use-auth';

interface IUserInfoSettings {
    name: string;
    userImgPath: string;
    isDashboard?: boolean;
}

const UserInfoSection = ({ name, userImgPath, isDashboard }: IUserInfoSettings) => {
    const auth = useAuth();
    const barber = auth?.userAuth;
    const { colorType } = useDesign();
    const { background, text } = colorType('info');

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
                    <StyledBlurView onClick={() => router.push({ pathname: '/barbers/[id]/reviews', params: { id: String(barber?.id)}})} clickable isPaper direction="row" borderRadius={5} gap={2} style={{ padding: 5 }}>
                        <Icon source="star" size={15} /> 
                    <StyleText>5.0</StyleText>
                    </StyledBlurView>
                    <StyledBlurView clickable isPaper borderRadius={5} style={{  padding: 5 }}> 
                        <StyleText>Verified</StyleText>
                        </StyledBlurView>
                        { isDashboard && 
                        <StyledBlurView 
                        clickable 
                        isPaper 
                        direction="row" 
                        borderRadius={25} 
                        gap={4} 
                        onClick={ () => router.push({ pathname: "/schedule/[id]", params: { id: String(barber?.id), price: String(barber?.startingPrice) } })} 
                        style={{  padding: 5, }}> 
                        <StyleText style={{ fontWeight: 600 }}>Schedule</StyleText>
                        <Icon source="pencil" size={15} />
                        </StyledBlurView>}
                </View>
            </View>
            <View>
                <Avatar.Image style={{ marginVertical: 5 }} size={50} source={{ uri: userImgPath }} />
            </View>
        </View>
    )
}

export default UserInfoSection;