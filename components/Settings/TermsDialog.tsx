import { ColorSchemeName } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import { StyledText } from './SettingStyles';

interface ITermsDialog {
    openDialog: boolean;
    onOpenDialog: () => void;
    colorScheme: ColorSchemeName;

}

const TermsDialog = ({openDialog, onOpenDialog, colorScheme}: ITermsDialog) => {
    return (
        <Portal>
        <Dialog visible={openDialog} onDismiss={onOpenDialog}>
            <Dialog.Title>Terms & Conditions</Dialog.Title>
            <Dialog.Content>
                <StyledText colorScheme={colorScheme}>
                    This coupon is applicable for $10 off for services exceeding $30 through this app. This coupon can not be combined, shared or exchanged.
                </StyledText>
            </Dialog.Content>
            <Dialog.Actions>
                <Button buttonColor='white' mode="contained" textColor="black" onPress={onOpenDialog}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
    )
};

export default TermsDialog;