import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useBarber } from '@/hooks/barber-hooks';
import { Switch, View, useColorScheme } from 'react-native';
import useAuth from '@/context/auth/use-auth';
import { StyleText, StyledView, StyledDivider } from '@/components/shared/SharedStyles';
import UserInfoSection from '@/components/Settings/UserInfoSection';
import BarberDataCard from '@/components/BarberDataCard/BarberDataCard';
import BarberAppointments from '@/components/BarberAppointments/Appointments';
import BarberServices from '@/components/BarberServices/BarberServices';
import BarberSchedule from '@/components/BarberSchedule/BarberSchedule';
import TabContainer from '@/components/shared/TabContainer/TabContainer';
import { Button } from 'react-native-paper';
import { tempData } from '@/lib/dummyDataCards';
import { BarChart } from 'react-native-gifted-charts';
import { dummyChartData } from '@/lib/dummyChartData';
import BarberBasePrice from '@/components/BarberServices/BarberBasePrice';
import ResourceItem from '@/components/shared/Resources/ResourceItem';
import { dummyImgArr } from '@/components/BarberProfile/ShowCaseGallery';


const tempImgPath = "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww";

const tempValue = 62.34;
const tempUnconfirmed = 5;
const unconfirmed = tempData.find((b) => b.status === "unconfirmed");

const BarberHomeDashboard = () => {
    const auth = useAuth();
    const { updateVisibility } = useBarber()
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const barber = auth?.userAuth;
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isPublic, setIsPublic] = useState<boolean>(false);

    const mutateVisibility = useMutation({
        mutationKey: ["update-visibility"],
        mutationFn: async () => await updateVisibility(),
    })

    const handleVisibility = (value: boolean) => {
        mutateVisibility.mutate(undefined, {
            onSuccess: (data) => {
                auth?.updateUser({ isVisible: data })
            },
            onError: (err) => console.log(err),
        })
    };

    // Get latest data
    // TODO: get status, price, customer name, img, date and type + booking id
    return (
        <StyledView>
            {/* user info */}
            <StyleText>Home Dashboard</StyleText>
            <UserInfoSection
                isDashboard
                userImgPath={String(auth?.userAuth?.image)}
                name={String(auth?.userAuth?.name)} />

            <StyledDivider orientation="horizontal" marginVertical={10} />

            {/* Data Cards & Chart (i.e. stats) */}
            <StyleText>Your performance this week:</StyleText>
            <StyledView direction="column" align="center" justify="center" style={{ alignContent: 'center', padding: 5, flex: 1, width: '100%', marginVertical: 10}}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <BarChart
            yAxisLabelPrefix='$'
                height={100}
                barWidth={15}
                noOfSections={3}
                barBorderRadius={4}
                xAxisLabelTextStyle={{ color: isDarkMode ? 'white': 'black' }}
                yAxisTextStyle={{ color: isDarkMode ? 'white': 'black' }}
                frontColor='#177AD5'
                data={dummyChartData}
                renderTooltip={(item: any, index: number) => {
                    return (
                      <View
                        style={{
                          marginBottom: -30,
                          marginLeft: 10,
                          backgroundColor: isDarkMode ? '#333' : 'lightgray',
                          paddingHorizontal: 6,
                          paddingVertical: 4,
                          borderRadius: 4,
                        }}>
                        <StyleText>${item.value}</StyleText>
                      </View>
                    );
                  }}
                yAxisThickness={0}
                xAxisThickness={0}
                initialSpacing={10}
                isAnimated
            />
                </View>
            </StyledView>
            {/* Base Price set by barber */}
            <BarberBasePrice basePrice={Number(barber?.startingPrice ?? 0)} />

            {/* Appointment related stats and funds earned */}
            <BarberDataCard 
            bookings={Number(barber?.customerBookings?.length)}
            requestedBookings={Number(barber?.requestedBooking)}
            earnings={0} />

            {/* View Appointments & View unconfirmed */}
            <StyledView
                style={{ marginTop: 10 }}
                direction="row"
                align="center"
                justify="center"
                gap={10}>
                <Button onPress={() => router.push({ pathname: '/booking' })} icon="check-circle-outline" compact mode="contained">Bookings</Button>
                <Button onPress={() => router.push({ pathname: '/booking' })} mode="outlined">{tempUnconfirmed} need confirmation!</Button>
            </StyledView>

            {/* Appointments */}
            <BarberAppointments
                value={tempData[0].price}
                imgPath={tempData[0].imgPath}
                status={tempData[0].status}
                id={tempData[0].id as number}
                type={tempData[0].type}
                customerName={tempData[0].customerName}
                date={tempData[0].date}
                addOns={tempData[0].addOns}
                headerText="Recently Confirmed"

            />

            {/* Awaiting Confirmation */}
            {unconfirmed && (
                <BarberAppointments
                    value={unconfirmed.price}
                    imgPath={unconfirmed.imgPath}
                    status={unconfirmed.status}
                    id={unconfirmed.id as number}
                    type={unconfirmed.type}
                    customerName={unconfirmed.customerName}
                    date={unconfirmed.date}
                    addOns={unconfirmed.addOns}
                    headerText="Awaiting Your Response"
                />
            )}

            {/* Profile Visibility */}
            <StyledView style={{ marginTop: 20 }}>
                <StyleText style={{ fontWeight: 700, fontSize: 15 }}>Profile Visibility</StyleText>
                <StyleText style={{ marginBottom: 10 }}>Determines whether users can view your profile or not.</StyleText>
                <StyledView direction="row" align="center" gap={3}>
                    <Switch value={auth?.userAuth?.isVisible} onValueChange={(v: boolean) => handleVisibility(v)} />
                    <StyleText style={{ fontSize: 13 }}>{auth?.userAuth?.isVisible ? "Public" : "Hidden"}</StyleText>
                </StyledView>
            </StyledView>

            {/* Schedule, Services & Coupons & Create */}
            <TabContainer
            tabIndex={tabIndex}
            onSelect={(i: number) => setTabIndex(i)} />

                <StyledDivider orientation="horizontal" marginVertical={10} />

            <ResourceItem
            isRow
            image={dummyImgArr[0].imgPath}
            header='Optimizing your work flow'
            content="You now have access to thousands of users, but how to maximize your gains?"
            actionText='Read More'
            onViewPress={() => console.log("View article")}
            />

        </StyledView>
    )
}

export default BarberHomeDashboard;