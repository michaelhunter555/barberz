import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity, useColorScheme, Button } from 'react-native';
import useAuth from '@/context/auth/use-auth';
import { ProgressBar, Avatar, Divider } from "react-native-paper";
import { StyledText, StyledBlurItem, StyledView, StyledBlurView, StyleText } from "../shared/SharedStyles";
import AlertMessage from '../../components/shared/Alert/Alert';

interface IConfirmAppointment {
barberImgPath: string;
};

const supportItems = [{ text: 'Privacy Policy', link: '/settings'}, { text: 'Terms Of Service', link: '/settings'}, { text: 'View My Account', link: '/settings'}]

const ConfirmingAppointment = ( { barberImgPath }: IConfirmAppointment) => {
    const auth = useAuth();
    const colorScheme = useColorScheme();
    const { price, name } = useLocalSearchParams();
    const [progress, SetProgress] = useState<number>(0);
    const [time, setTime] = useState<number>(10);

    useEffect(() => {
      const interval = setInterval(() => {
        SetProgress((prev) => {
           const next = prev + 0.01;
           return next > 1 ? 0 : next;
        })
      }, 50);

      if(time > 0) {
        setTimeout(() => {
            setTime((prev) => prev - 1);
        }, 1000)
      }

      return () => clearInterval(interval);
    }, [time])

    return (
        <StyledView justify="center" align="center" direction="column" gap={10} style={{ marginTop: 20 }}>
            <StyledText style={{ fontSize: 20 }} colorScheme={colorScheme}>Your Appointment is almost ready!</StyledText>
            <ProgressBar style={{ height: 10, width: 100 }} progress={progress} />
            <StyledView direction="row" align="center" gap={100}>
                <Avatar.Image source={{ uri: auth?.userAuth?.image }}/>
                <Avatar.Image source={{ uri: barberImgPath }}/>
            </StyledView>
            <Button disabled={time < 1} color="red" title={`(${time}) Cancel?`} onPress={() => router.push({ pathname: "/"})} />
            <Divider style={{ width: '100%' }} />
            <AlertMessage
            iconSize={15}
            alertType="info"
            message="You will be notified once accepted"
            colorScheme={colorScheme}
            fontSize={15}
             />
            <StyledText colorScheme={colorScheme}>
               &bull; You will get a notifcation once the appointment is accepted.
            </StyledText>
            <StyledText colorScheme={colorScheme}>
               &bull; You will be charged ${ price } after the appointment is accepted.
            </StyledText>
            <StyledText colorScheme={colorScheme}>
               &bull;You and { String(name).split(" ")[0] } will both confirm when the service is completed.
            </StyledText>
            <StyledView direction="row" align="center" gap={10} style={{ marginTop: 10 }}>
                {supportItems.map((item, i) => (
                    <TouchableOpacity key={item.text} activeOpacity={0.8} onPress={() => router.push({ pathname: '/settings'})}>
                        <StyledBlurView isPaper style={{ padding: 5}}>
                            <StyleText>{item.text}</StyleText>
                        </StyledBlurView>
                    </TouchableOpacity>
                ))}
            </StyledView>
        </StyledView>
    )
};

export default ConfirmingAppointment;