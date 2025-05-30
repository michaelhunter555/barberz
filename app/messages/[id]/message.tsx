import { useState } from 'react';
import { 
    useColorScheme, 
    FlatList, 
    TextInput, 
    KeyboardAvoidingView, 
    Keyboard,
    Platform, 
    View, 
    StyleSheet, 
    ColorSchemeName,
    NativeSyntheticEvent, 
    TextInputChangeEventData,
    Image
 } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StyledView, StyledText, StyledBlurItem, getBlurType, getIntensity } from "@/components/shared/SharedStyles";
import { IconButton, Avatar } from "react-native-paper";
import styled from "styled-components/native";

const tempImg = "https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
type TMessageBubble = { type: string, text: string, colorScheme: ColorSchemeName };
const MessageBubble = ({ type, text, colorScheme }: TMessageBubble) => (
  <View style={[
    styles.message,
    type === 'sent' ? styles.sent: styles.received,
  ]}>
        <StyledText colorScheme={colorScheme}>{text}</StyledText>
    </View>
);

type TConversation = {
  id: string;
  type: 'sent' | 'received';
  text: string;
  timestamp: number;
}
const conversation: TConversation[] = [
    { id: '1', type: 'sent', text: 'Hey!', timestamp: 12345678 },
    { id: '2', type: 'received', text: 'Hello!', timestamp: 12345679 },
    { id: '3', type: 'sent', text: 'How’s it going?', timestamp: 12345680 },
  ];

const Conversation = () => {
    const { id, userImage } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const [messageText, setMessageText] = useState<string>("");
    const blurIntensity = getIntensity(colorScheme);
    const blurType = getBlurType(colorScheme);
    const [chat, setChat] = useState<TConversation[]>(conversation)

    const handleMessageText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        e.preventDefault();
        setMessageText(e.nativeEvent.text);
    }

    const handleMessageSubmit = async (newId: number) => {
        // do something
        Keyboard.dismiss();
        const date = new Date()
        setChat((prev) => [{ id: String(newId), type:"sent", text: messageText, timestamp: date.getSeconds() } as TConversation, ...prev]);
        setMessageText("");
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80:0}
        >
            <FlatList 
            data={chat} 
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <View style={{...(item.type === 'received' && { display: 'flex', flexDirection: 'row', gap: 5})}}>
              {item.type === 'received' && <Avatar.Image size={40} source={{ uri: String(userImage) }}  />}
              <MessageBubble type={item.type} text={item.text} colorScheme={colorScheme} />
              </View>    
            )}
            contentContainerStyle={styles.messagesContainer}
            inverted
            />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, width: '100%'}}>
            <IconButton icon="camera" size={20} iconColor="#007AFF" onPress={() => console.log("open camera")}/>
           <StyledView 
           justify="space-between" 
           direction="row" 
           style={{ width: 310, backgroundColor: '#222', borderRadius: 15, overflow: 'hidden'}}>

            <StyledTextInput
            placeholder="Type a message..."
            style={{ 
                padding: 12,
                borderColor: '#ccc',
                color: '#fff'
            }}
            placeholderTextColor="#999"
            value={messageText}
            onChange={handleMessageText}
            />
           <IconButton disabled={messageText.length === 0} mode="contained" icon="arrow-right" size={12} iconColor="#007AFF" onPress={ () => handleMessageSubmit(Number(chat[chat.length - 1].id) + 1) }/>
           </StyledView>
            </View>
            
        </KeyboardAvoidingView>
    )

};

export default Conversation;

const StyledTextInput = styled(TextInput)`
`;

const styles = StyleSheet.create({
    container: { flex: 1, },
    messagesContainer: { padding: 10 },
    message: {
      maxWidth: '75%',
      marginVertical: 4,
      padding: 10,
      borderRadius: 10,
    },
    sent: {
      backgroundColor: '#007AFF',
      alignSelf: 'flex-end',
    },
    received: {
      backgroundColor: '#555',
      alignSelf: 'flex-start',
    },
    messageText: {
      color: '#fff',
    },
    input: {
      padding: 12,
      borderColor: '#ccc',
    },
  });