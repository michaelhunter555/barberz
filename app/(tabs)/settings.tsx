import * as React from 'react';
import { useAuth } from '@/context/auth/use-auth';
import { router } from 'expo-router';
import { View, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Icon, Divider, List } from 'react-native-paper';
import TermsDialog from '@/components/Settings/TermsDialog';
import UserInfoSection from '@/components/Settings/UserInfoSection';
import UserOffers from '@/components/Settings/UserOffer';
import AccountLocationGrid from '@/components/Settings/AccountLocationGrid';
import { StyledText, StyledView, StyledViewContainer } from '@/components/Settings/SettingStyles';
import { userSettings, otherSettings } from '@/components/Settings/menus';
import Card from '@/components/shared/Cards/InfoCard';

const tempImgPath = "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww";

export default function UserSettings() {
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const shopImg = require("../../assets/images/homeImg.png");
    const auth = useAuth();
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'light' ? "#222" : "#999";
    const blurType = colorScheme === 'light' ? "dark" : "light"
    const iconColor = colorScheme === 'light' ? "#444" : "#f1f1f1"
    const blurIntensity = colorScheme === 'light' ? 35 : 50;

    return (
        <StyledViewContainer style={{ marginVertical: 5, }}>
            <TermsDialog openDialog={openDialog} onOpenDialog={() => setOpenDialog((prev) => !prev)} colorScheme={colorScheme} />
            <ScrollView contentContainerStyle={{ display: 'flex', gap: 15 }}>
                <StyledText colorScheme={colorScheme}>Settings</StyledText>
                <UserInfoSection
                    name={String(auth?.userAuth?.name)}
                    userImgPath={String(auth?.userAuth?.image)}
                    blurIntensity={blurIntensity}
                    blurType={blurType}
                    colorScheme={colorScheme}
                />

                <Divider bold={true} style={{ width: '100%' }} />

                <AccountLocationGrid colorScheme={colorScheme} blurIntensity={blurIntensity} blurType={blurType} />

                <StyledView style={{ display: 'flex', flexDirection: 'row', gap: 20, }}>
                    {userSettings.map((setting, i) => (
                        <TouchableOpacity activeOpacity={0.7} key={i} onPress={() => router.push({ pathname: setting.link as any })}>
                            <BlurView
                                intensity={blurIntensity}
                                tint={blurType} style={{
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
                            </BlurView>
                        </TouchableOpacity>
                    ))}
                </StyledView>

                <Card
                colorScheme={colorScheme}
                blurIntensity={blurIntensity}
                blurType={blurType}
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
                        title={settings.text} 
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
    )

}