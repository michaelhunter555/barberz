import * as React from 'react';
import { View, Text, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import styled from 'styled-components/native';
import { StyledText, StyledBlurItem } from '@/components/shared/SharedStyles';
import { Button, Avatar, Divider, TextInput, Icon  } from 'react-native-paper';

const tipChips = [5,10,15,20,25]

const CheckoutPage = () => {
    const [note, setNote] = React.useState<string>("");
    const [tip, setTip] = React.useState<number | null>(null);
    const [tipIndex, setTipIndex] = React.useState<number | null>(null);
    const [color, setColor] = React.useState<string>("#222")
    const { id, slotId, name, price } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const blurType = colorScheme === 'dark' ? 'light' : 'dark';
    const intensity = colorScheme === 'dark' ? 55 : 35;

    const handleRemoveColor = () => {
        setColor(() => tip === null ? "#222": "#fff")
    }
    
    return (
        <StyledViewContainer>
            <StyledViewContent style={{ paddingVertical: 5 }}>
            <StyledText style={{ fontWeight: 700, fontSize: 30 }} colorScheme={colorScheme}>Confirm With Barber</StyledText>
            <StyledText colorScheme={colorScheme}>Your booking with {name} is almost set! Please review the price with any add-ons. Once the barber accepts, your card will be charged. </StyledText>
            <StyledView direction="row" gap={10} style={{ marginVertical: 10}}>
            <StyledView direction="column" gap={3}>
                <Avatar.Text label="B" />
            <StyledText colorScheme={colorScheme}>{name}</StyledText>
            </StyledView>
            <StyledView direction="column" gap={2}>
            <StyledText style={{ fontWeight: 700, fontSize: 17 }} colorScheme={colorScheme}>Summary:</StyledText>
            <StyledText colorScheme={colorScheme}>1 x Standard cut- ${price}</StyledText>
            
            <StyledText style={{ fontWeight: 700, fontSize: 17 }} colorScheme={colorScheme}>Payment method:</StyledText>
            <StyledText colorScheme={colorScheme}>Card ending in 3453</StyledText>
            </StyledView>
            <StyledText style={{ fontSize: 50}} colorScheme={colorScheme}>${price}</StyledText>
            </StyledView>
            <Divider style={{ width: '100%', marginBottom: 10 }} bold />
          
            <StyledText style={{ fontWeight: 700 }} colorScheme={colorScheme}>Tip:</StyledText>
            <StyledView direction="row" style={{ alignItems: 'center', }} gap={3}>
            {tipChips.map((tip, i) => (
                  <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => {
                    setTipIndex(i);
                    setTip(tip)
                }}>
                  <StyledBlurItem style={{ width: 50, ...(tipIndex === i && { backgroundColor: 'white'}) }} blurIntensity={intensity} tint={blurType}>
                  <StyledText style={{ ...(tipIndex === i && { color: 'black'}) }}colorScheme={colorScheme}>{tip}%</StyledText> 
                  </StyledBlurItem>
              </TouchableOpacity>
            ))}
             <TouchableOpacity disabled={tip === null} activeOpacity={0.7} onPress={() => {
                    setTipIndex(null);
                    setTip(0)
                }}>
                  <Text style={{ marginLeft: 10, fontSize: 10, color: tip !== null ? '#fff':'#222' }}>Remove</Text> 
              </TouchableOpacity>
            </StyledView>
            <StyledView style={{ marginVertical: 10}}>
                <StyledText>Tip your barber? - No worries if you're not ready yet. You will have the opportunity to tip after the service is complete as well.</StyledText>
            </StyledView>
            <StyledView>
                <TextInput
                mode="outlined"
                label="notes" 
                value={note}
                multiline={true}
                onChangeText={(text) => setNote(text)} />
            </StyledView>
            <StyledView direction="row" gap={5} style={{marginVertical: 5, alignItems: "center", justifyContent: 'flex-end'}}>
                <StyledText style={{ fontSize: 17, fontWeight: 700 }} colorScheme={colorScheme}>
                    Subtotal:
                </StyledText>
                <StyledText style={{ fontSize: 20,}} colorScheme={colorScheme}>
                   ${ price }.00
                </StyledText>
            </StyledView>
            <StyledView direction="row" gap={5} style={{marginVertical: 5, alignItems: "center", justifyContent: 'flex-end'}}>
                <StyledText style={{ fontSize: 17, fontWeight: 700 }} colorScheme={colorScheme}>
                    Tax:
                </StyledText>
                <StyledText style={{ fontSize: 20,}} colorScheme={colorScheme}>
                   ${ (Number(price) * 0.06).toFixed(2) }
                </StyledText>
            </StyledView>
            <StyledView direction="row" gap={5} style={{marginVertical: 5, alignItems: "center", justifyContent: 'flex-end'}}>
                <StyledText style={{ fontSize: 17, fontWeight: 700 }} colorScheme={colorScheme}>
                    Discount:
                </StyledText>
                <StyledText style={{ fontSize: 15,}} colorScheme={colorScheme}>
                   -$10
                </StyledText>
            </StyledView>
            <StyledView direction="row" gap={5} style={{marginVertical: 5, alignItems: "center", justifyContent: 'flex-end'}}>
                <StyledText style={{ fontSize: 17, fontWeight: 700 }} colorScheme={colorScheme}>
                    Total:
                </StyledText>
                <StyledText style={{ fontSize: 15,}} colorScheme={colorScheme}>
                  ${tip === null ? (((Number(price) * 0.06) + Number(price)) - 10 ).toFixed(2)
                  : (((Number(price) * 0.06) + Number(price) + ((tip /100) * Number(price))) - 10).toFixed(2)
                } 
                </StyledText>
            </StyledView>
            <View style={{height: 90 }}/>
            <View style={{ marginBottom: 10,}}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({ pathname: '/Confirming', })}>
                    <StyledView direction="row" gap={5} style={{ backgroundColor: '#ffffff', width: '100%', height: 40, overflow: 'hidden', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <StyledText style={{ fontSize: 17, color: 'black' }} colorScheme={colorScheme}>
                            Send Confirmation
                        </StyledText>
                        <Icon color='black' source="send" size={20} />
                    </StyledView>
                </TouchableOpacity>
            </View>
            </StyledViewContent>
           
        </StyledViewContainer>
    )
}

const StyledViewContainer = styled.View`
display: flex;
flex-direction: column;
height: 100%;
`;

const StyledViewContent = styled.View`
display: flex;
flex: 1;
`;

const StyledView = styled.View`
display: flex;
flex-direction: ${(props: { direction: 'row' | 'column'}) => props.direction ?? 'column'};
gap: ${(props: { gap: number }) => props.gap ?? 0}px;
`;

export default CheckoutPage;