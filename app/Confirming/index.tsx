import ConfirmingAppointment from "@/components/ConfirmAppointment/Confirming";
import { useLocalSearchParams, } from "expo-router";

const ConfirmingPage = () => {
    const { barberImgPath } = useLocalSearchParams()
return (
<ConfirmingAppointment barberImgPath={String(barberImgPath)}/>
)
};

export default ConfirmingPage;