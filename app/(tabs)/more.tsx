import React from 'react';
import useAuth from '@/context/auth/use-auth';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import { StyledBlurView, StyledView, StyleText } from '@/components/shared/SharedStyles';
import { Icon, Surface } from 'react-native-paper';

type RoutePaths =
  | '/booking'
  | '/settings'
  | '/schedule/[id]'
  | '/messages/[id]'
  | '/barbers/[id]/reviews'
  | '/Faqs';

const otherPages: {pageUrl: RoutePaths, text: string, icon: string }[] = [
    {pageUrl: '/booking', text: 'Bookings', icon: "notebook-check" },
    {pageUrl: '/settings', text:'Settings', icon: "cog" },
    {pageUrl: '/schedule/[id]', text: 'Schedule', icon: "calendar-week" },
    {pageUrl: '/messages/[id]', text: 'Messages', icon: "message" },
    {pageUrl: '/barbers/[id]/reviews', text: 'Reviews', icon: "account-star-outline" },
    {pageUrl: '/Faqs', text: 'Support', icon: "help" },
]

const MorePages = () => {
    const auth = useAuth();
    const barber = auth?.userAuth;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GoBackArrow />
            <ScrollView contentContainerStyle={{ marginVertical: 10, padding: 5 }}>
                <StyleText style={{ fontSize: 15, fontWeight: 600 }}>View More Pages</StyleText>
                <StyledView direction="row" justify="center" align="center" style={{ flexWrap: 'wrap', marginVertical: 10 }} gap={20}>
                {otherPages.map((page,i) => (
                    <StyledBlurView
                    clickable
                    onClick={() => router.push({ pathname: `${page.pageUrl}`, params: { id: String(barber?.id)}})}
                     key={i} 
                     align="center" 
                     style={{ padding: 10, width: 90, height: 90  }}>
                        <Icon source={page.icon} size={60} />
                        <StyleText>{page.text}</StyleText>
                    </StyledBlurView>
                ))}
                </StyledView>
            </ScrollView>
        </SafeAreaView>
    )

};

export default MorePages;