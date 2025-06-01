import ConfirmingAppointment from "@/components/ConfirmAppointment/Confirming";
import { useLocalSearchParams, } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ConfirmingPage = () => {
    const { barberImgPath } = useLocalSearchParams()
return (
    <SafeAreaView>
<ConfirmingAppointment barberImgPath={String(barberImgPath)}/>
    </SafeAreaView>
)
};

export default ConfirmingPage;