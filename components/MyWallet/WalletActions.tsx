import { ColorSchemeName } from 'react-native';
import { StyledView, StyledText, StyledBlurItem } from '../../components/shared/SharedStyles';
import { Divider } from 'react-native-paper';

interface IWalletActions {
    date: string;
    amount: number;
    colorScheme: ColorSchemeName
}

const WalletActions = ({date, amount, colorScheme}: IWalletActions) => {
    return (
        <StyledView direction="column" gap={10}>
            <StyledView>
              <StyledText style={{ fontSize: 13, color: '#777' }} colorScheme={colorScheme}>{date}</StyledText>
            </StyledView>
            <StyledView>
            <StyledText style={{ fontSize: 15 }} colorScheme={colorScheme}>&bull; Deposit Amount: ${(amount).toFixed(2)}</StyledText>
            </StyledView>
        </StyledView>
    )
};

export default WalletActions;