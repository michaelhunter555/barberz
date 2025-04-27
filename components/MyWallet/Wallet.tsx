import { ColorSchemeName, TouchableOpacity } from "react-native";
import { StyledView, StyledText, StyledBlurItem } from "../shared/SharedStyles";
import { Icon, Divider, Button } from 'react-native-paper';

interface IWallet {
    colorScheme: ColorSchemeName;
    balance: number;
    addBalance: () => void;
}

const Wallet = ({ colorScheme, balance, addBalance }: IWallet) => {
    return (
        <StyledView direction="column">
        <StyledView direction="row" gap={10} justify="center" align="center">
          <StyledText style={{ fontSize: 40}} colorScheme={colorScheme}>${(balance).toFixed(2)}</StyledText> 
          <Icon source="wallet" size={40} />
        </StyledView>
        <TouchableOpacity activeOpacity={0.8} onPress={addBalance}>
        <StyledBlurItem intensity={55} tint="light" style={{ height: 40 }}>
            <StyledText style={{ fontWeight: 700 }} colorScheme={colorScheme}>Add Balance</StyledText>
        </StyledBlurItem>
        </TouchableOpacity>
        <Divider style={{ width: '100%', marginVertical: 10 }} bold />

    </StyledView>
    )
}

export default Wallet;