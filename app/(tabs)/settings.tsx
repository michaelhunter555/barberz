import * as React from 'react';
import useAuth from '@/context/auth/use-auth';
import { router } from 'expo-router';
import { View, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Icon, Divider, List, Badge } from 'react-native-paper';
import TermsDialog from '@/components/Settings/TermsDialog';
import UserInfoSection from '@/components/Settings/UserInfoSection';
import UserOffers from '@/components/Settings/UserOffer';
import AccountLocationGrid from '@/components/Settings/AccountLocationGrid';
import { StyledText, StyledViewContainer } from '@/components/Settings/SettingStyles';
import { userSettings, otherSettings } from '@/components/Settings/menus';
import Card from '@/components/shared/Cards/InfoCard';
import { StyleText, StyledBlurView, StyledDivider, StyledView,} from '@/components/shared/SharedStyles';
import BarberBasePrice from '@/components/BarberServices/BarberBasePrice';
import { SafeAreaView } from 'react-native-safe-area-context';

const tempImgPath = "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww";

export default function UserSettings() {
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const shopImg = require("../../assets/images/homeImg.png");
    const auth = useAuth();
    const isBarber = auth?.userAuth?.accountType === 'barber';
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'light' ? "#222" : "#999";
    const blurType = colorScheme === 'light' ? "dark" : "light"
    const iconColor = colorScheme === 'light' ? "#444" : "#f1f1f1"
    const blurIntensity = colorScheme === 'light' ? 35 : 50;

    return (
        <SafeAreaView style={{ flex: 1}}>

        <StyledViewContainer style={{ marginVertical: 5, }}>
            <TermsDialog openDialog={openDialog} onOpenDialog={() => setOpenDialog((prev) => !prev)} colorScheme={colorScheme} />
            <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ display: 'flex', gap: 15 }}>
                <StyledText colorScheme={colorScheme}>Settings</StyledText>
                <UserInfoSection
                    name={String(auth?.userAuth?.name)}
                    userImgPath={String(auth?.userAuth?.image)}
                />

                <Divider bold={true} style={{ width: '100%' }} />

                {isBarber && (
                    <BarberBasePrice basePrice={50}/>
                )}

                <AccountLocationGrid />

                <StyledView style={{ display: 'flex', flexDirection: 'row', gap: 20, }}>
                    {userSettings.map((setting, i) => (
                        <TouchableOpacity activeOpacity={0.7} key={i} onPress={() => router.push({ pathname: setting.link as any })}>
                            <StyledBlurView
                                isPaper
                               style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    minWidth: 100,
                                    gap: 5,
                                    padding: 10,
                                    overflow: 'hidden',
                                    borderRadius: 8
                                }}>
                                <Icon size={28} source={setting.icon} />
                                <StyledText style={{ fontWeight: 700 }} colorScheme={colorScheme}>{setting.text}</StyledText>
                            </StyledBlurView>
                        </TouchableOpacity>
                    ))}
                </StyledView>

                <Card
                imgPath={tempImgPath}
                label="Recent"
                buttonRightText='Need Help?'
                onRightButtonClick={() => router.push({ pathname: '/Faqs'})}
                buttonLeftText='Reschedule'
                onLeftButtonClick={() => console.log("reschedule")}
                description='3:00pm - Haircut appointment with [shop/person] - Confirmed*'
                />
                <UserOffers
                    imgPath={shopImg}
                    isActive={isActive}
                    onActivateOffer={() => setIsActive(true)}
                    onOpenTerms={() => setOpenDialog(true)} />

                <Divider style={{ width: '100%' }} bold={true} />

                <View style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <StyledText colorSchme={colorScheme} style={{ textAlign: 'left', fontSize: 15, fontWeight: 700 }}>
                        More Settings
                    </StyledText>
                </View>
                <List.Section style={{ marginVertical: 0 }}>
                    {otherSettings.map((settings, i) => (
                        <List.Item 
                        key={i} 
                        title={
                            i === 1 ? 
                            <StyledView direction="row" align="center" gap={15}>
                                <StyleText style={{ fontSize: 15 }}>{settings.text}</StyleText>
                                <Badge>{10}</Badge>
                            </StyledView> : settings.text
                        } 
                        left={() => <Icon size={20} source={settings.icon} />}
                        onPress={() => router.push({ pathname: settings.link as any })}
                        />
                    ))}
                    <List.Item left={() => <Icon size={20} source="cellphone-information" />} title="Sign Out" onPress={auth?.signOut} />
                </List.Section>
            </ScrollView>
            <View />
            <View />
        </StyledViewContainer>
        </SafeAreaView>
    )

}