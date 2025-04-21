import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { useAuth } from '@/context/auth/use-auth';
import { ProgressBar, Avatar, Divider } from "react-native-paper";
import { StyledText, StyledBlurItem, StyledView } from "../shared/SharedStyles";
import AlertMessage from '../../components/shared/Alert/Alert';

interface IConfirmAppointment {

};

const supportItems = [{ text: 'Privacy Policy', link: '/settings'}, { text: 'Terms Of Service', link: '/settings'}, { text: 'View My Account', link: '/settings'}]

const ConfirmingAppointment = () => {
    const auth = useAuth();
    const colorScheme = useColorScheme();
    const [progress, SetProgress] = useState<number>(0);

    useEffect(() => {
      const interval = setInterval(() => {
        SetProgress((prev) => {
           const next = prev + 0.01;
           return next > 1 ? 0 : next;
        })
      }, 50);

      return () => clearInterval(interval);
    }, [])

    return (
        <StyledView justify="center" align="center" direction="column" gap={10} style={{ marginTop: 20 }}>
            <StyledText style={{ fontSize: 20 }} colorScheme={colorScheme}>Your Appointment is almost ready!</StyledText>
            <ProgressBar style={{ height: 10, width: 100 }} progress={progress} color="white"/>
            <StyledView direction="row" align="center" gap={100}>
                <Avatar.Image source={{ uri: auth?.userAuth?.image }}/>
                <Avatar.Image source={require("../../assets/images/homeImg.png")}/>
            </StyledView>
            <Divider style={{ width: '100%' }} />
            <AlertMessage
            iconSize={15}
            alertType="info"
            message="You will be notified once accepted"
            colorScheme={colorScheme}
            fontSize={15}
             />
            <StyledText colorScheme={colorScheme}>
                You will get a notifcation once the appointment is accepted.
            </StyledText>
            <StyledText colorScheme={colorScheme}>
                You will be charged $[total] after completion.
            </StyledText>
            <StyledText colorScheme={colorScheme}>
                You will get a notifcation once the appointment is accepted.
            </StyledText>
            <StyledView direction="row" align="center" gap={10}>
                {supportItems.map((item, i) => (
                    <TouchableOpacity key={item.text} activeOpacity={0.8} onPress={() => router.push({ pathname: '/settings'})}>
                        <StyledBlurItem intensity={55} tint="light">
                            <StyledText colorScheme={colorScheme}>{item.text}</StyledText>
                        </StyledBlurItem>
                    </TouchableOpacity>
                ))}
            </StyledView>
        </StyledView>
    )
};

export default ConfirmingAppointment;