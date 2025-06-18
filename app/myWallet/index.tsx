import { StyledView, StyledText } from "@/components/shared/SharedStyles";
import { useColorScheme, ScrollView, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Icon } from 'react-native-paper';
import Wallet from "@/components/MyWallet/Wallet";
import WalletActions from "@/components/MyWallet/WalletActions";
import GoBackArrow from "@/components/shared/BackArrow/GoBackArrow";




const MyWallet = () => {
    const colorScheme = useColorScheme()
    return(
        <SafeAreaView style= {{ flex: 1 }}>
            <GoBackArrow />
        <ScrollView style={{ padding: 10 }}>
            {/* Wallet Balance and Add Balance Button */}
            <Wallet balance={0.00} addBalance={() => void console.log("nothing")} colorScheme={colorScheme} />
            
            {/* Wallet history */}
            {Array.from({ length: 5 }).map((_, i) => (
                <View key={i}>
                    <WalletActions key={i} date={String(`7/${20 + i}/2025`)} amount={100} colorScheme={colorScheme} />
                    <Divider style={{ width: '100%', marginVertical: 5 }} bold />
                </View>
            ))}
        </ScrollView>
        </SafeAreaView>
    )
}

export default MyWallet;