import { ScrollView, useColorScheme, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAuth } from "@/context/auth/use-auth";
import Message from '@/components/Messages/Message';
import { Divider } from "react-native-paper";

type TUserMessage = { id: string; userName: string, date: string, imagePath: string, messageText: string};

const tempImg = "https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const dummyMessages: TUserMessage[] = [
    {id: '192dsj', userName: 'Devin Booker', date: "5/12/25", imagePath: tempImg, messageText: "Yeah that could work out..."},
    {id: '84jsd2k', userName: 'Timothy James', date: "5/02/25", imagePath: tempImg, messageText: "My lowest is $75 and Im free..."},
    {id: '43833jkd', userName: 'William Curtis', date: "5/01/25", imagePath: tempImg, messageText: "I'm free, just confirm..."}
]

const Messages = () => {
    const auth = useAuth();
    const colorScheme = useColorScheme();

    return (
        <ScrollView>
            {dummyMessages.map((message, i) => (
                <View key={i} >
                <Message  
                message={message} 
                colorScheme={colorScheme} 
                onClick={() => router.push({ pathname: '/messages/[id]/message', params: {id: message.id }})} />
                <Divider style={{ width: '100%', marginVertical: 5, }} bold />
                </View>
            ))}
        </ScrollView>
    )

}

export default Messages;