import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import { StyledView, StyledText } from '../../components/shared/SharedStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const ActivityAndTransactions = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GoBackArrow />
        <StyledView>
            <StyledText>
                Hello jkhjk
            </StyledText>
        </StyledView>
        </SafeAreaView>
    )
}

export default ActivityAndTransactions;