import React, { useEffect } from 'react';
import { 
    NativeSyntheticEvent, 
    TextInputChangeEventData, 
    TextInput,
    Switch,
    TouchableOpacity,
    ScrollView,
    useColorScheme
} from 'react-native';
import { useUser } from '@/hooks/user-hooks';
import { useAuth } from '@/context/auth/use-auth';
import { useForm } from '@/hooks/use-form';
import { StyledView, StyleText, StyledBlurView } from '../../components/shared/SharedStyles';
import { Divider, Button } from 'react-native-paper';
import { TBarberApp } from '@/types';

const Join = () => {
const auth = useAuth();
const colorScheme = useColorScheme();
const { submitBarberApplication } = useUser();
const [formState, inputHandler, setFormData] = useForm({
    name: { value: "", isValid: false },
    location: { value: "", isValid: false, },
    licensed: { value: undefined, isValid: false },
    termsApproved: { value: undefined, isValid: false },
    onDemand: { value: false, isValid: false, },
    signature: { value: "", isValid: false, }
}, false);
const { name, location, licensed, termsApproved, onDemand, signature } = formState.inputs;

useEffect(() => {
    if( 
        formState.isValid && 
        name.value && licensed.value && 
        termsApproved.value && onDemand.value && 
        location.value &&
        signature.value
    ) {
        setFormData({
            name: { value: name.value, isValid: true },
            location: { value: location.value, isValid: true, },
            licensed: { value: licensed.value, isValid: true },
            termsApproved: { value: termsApproved.value, isValid: true },
            onDemand: { value: onDemand.value, isValid: true, },
            signature: { value: signature.value, isValid: true, }
        }, true);
    }
}, [
    formState.isValid, 
    name.value, 
    location.value, 
    licensed.value, 
    termsApproved.value, 
    onDemand.value,
    signature.value,
]);

const handleNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
inputHandler("name", e.nativeEvent.text, e.nativeEvent.text !== "");
};

const handleLocationChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler("location", e.nativeEvent.text, e.nativeEvent.text !== "");
};

const handleLicenseChange = (hasLicense: boolean) => {
    inputHandler("licensed", hasLicense, true);
}

const handleTermsApproval = (isApproved: boolean) => {
    inputHandler("termsApproved", isApproved, true);
}

const handleOnDemandToggle = (isOnDemand: boolean) => {
    inputHandler("onDemand", isOnDemand, true);
}

const handleSignature = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler(
        "signature", 
        e.nativeEvent.text, 
        e.nativeEvent.text.toLowerCase() === String(name.value).toLowerCase());
}

const handleSubmitApplication = async () => {
    if(formState.isValid) {
        const barberApp: TBarberApp = { 
            name: String(name.value), 
            location: String(location.value), 
            licensed: Boolean(licensed.value), 
            termsApproved: Boolean(licensed.value), 
            onDemand: Boolean(onDemand.value)
        };
    await submitBarberApplication(barberApp);
    }
}

return (
    <ScrollView>
    <StyledView direction="column" gap={10} style={{ flex: 1, padding: 10 }}>
        <StyledView>
            <StyleText>
                Earn more income plying your trade by providing hair services on [AppName]. Extend your reach across the greater USA and even the world.
            </StyleText>
        </StyledView>
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Name</StyleText>
        <TextInput
        value={String(name.value)}
        onChange={handleNameChange}
        inputMode="text"
        textContentType="givenName"
        placeholder="Enter name..."
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Location</StyleText>
        <TextInput
        value={String(location.value)}
        onChange={handleLocationChange}
        inputMode="text"
        textContentType="location"
        placeholder="Enter location..."
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>
        <Divider style={{ width: '100%' }} />
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Are you Licensed in the state where you will perform your services?</StyleText>
        <StyledView direction="row" align="center" gap={5}>
       <Switch value={!!licensed.value} onValueChange={(value: boolean) => handleLicenseChange(value)}/>
        <StyleText>{licensed.value ? "I am licensed" : "Not licensed"}</StyleText>
        </StyledView>
        </StyledView>
        <Divider style={{ width: '100%' }} />
        <StyledView direction="column" gap={5} align="flex-start">
        <StyleText style={{ fontWeight: 700 }}>I have read the Terms & Conditions and accept them.</StyleText>
        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("T&C Page")}>
        <StyledBlurView style={{ padding: 5 }} align="center" justify="center">
        <StyleText style={{ fontSize: 12, fontWeight: 500 }}>Terms & Conditions</StyleText>
        </StyledBlurView>
        </TouchableOpacity>
        <StyleText>Confirming and submitting this form means you confirm you have read and agreed to our terms & conditions.</StyleText>
        <StyledView direction="row" align="center" gap={5}>
       <Switch value={!!termsApproved.value} onValueChange={(value: boolean) => handleTermsApproval(value)}/>
        <StyleText>{termsApproved.value ? "I have read and agree to the Terms & Conditions" : "Not Confirmed"}</StyleText>
        </StyledView>
        </StyledView>
        <Divider style={{ width: '100%' }} />
        <StyledView direction="column" gap={5}>
            <StyleText style={{ fontWeight: 700 }}>Participate in On-Demand service pool?</StyleText>
            <StyleText>Not everyone has a go-to, and they not only welcome house visits or on the spot appointments, but they prefer it. Be included for users in your area who wish for a house call on little to short notice. Don't worry, you'll be given plenty of time to arrive based on your own estimation.</StyleText>
            <StyledView direction="row" align="center" gap={5}>
                <Switch value={!!onDemand.value} onValueChange={(value: boolean) => handleOnDemandToggle(value)} />
                    <StyleText>{onDemand.value ? "Include me in On-Demand selection":"Do not include me in On-Demand"}</StyleText>
            </StyledView>
        </StyledView>
        <Divider style={{ width: '100%' }} />
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Signature</StyleText>
        <StyleText>
            By entering your name here, you guarantee that all the information provided above is accurate and correct. If you are in the USA, you must have a state license to provide barber or hair-related services.
        </StyleText>
        <TextInput
        value={String(signature.value)}
        onChange={handleSignature}
        inputMode="text"
        textContentType="name"
        selectionColor={"#fff"}
        placeholder="sign here..."
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>
        <Divider style={{ width: '100%' }} />
        <Button onPress={handleSubmitApplication} disabled={!formState.isValid} textColor="black" style={{ backgroundColor: !formState.isValid ? '#222':'white' }}>Submit Application</Button>
    </StyledView>
    </ScrollView>
)

}

export default Join;

// /<StyledTextInput
//             style={{ color: colorScheme === 'light' ? "#222" : "white" }}
//             maxLength={70} 
//             value={searchValue}
//             onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => onSearchSubmit(e.nativeEvent.text) }
//             inputMode="search"
//             textAlign="left"
//             textContentType="location"
//             placeholder="Browse a location..."
//             placeholderTextColor={colorScheme === "light" ? "#444":"#f1f1f1"}
//             selectionColor={"#fff"}
//             />