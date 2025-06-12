import { useColorScheme } from "react-native";
import { setColorType } from "@/lib/helpers";

export const useDesign = () => {
    const colorScheme = useColorScheme();
    const colorType = (colorType: "info" | "warning" | "error" | "success") => setColorType(colorType, colorScheme);

    return {
        colorType,
    }
}