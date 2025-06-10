import React, { useEffect, useState } from 'react';
import { 
    NativeSyntheticEvent, 
    TextInputChangeEventData, 
    TextInput,
    Switch,
    TouchableOpacity,
    ScrollView,
    useColorScheme
} from 'react-native';
import { router } from 'expo-router';
import { useUser } from '@/hooks/user-hooks';
import useAuth from '@/context/auth/use-auth';
import { useForm } from '@/hooks/use-form';
import { StyledView, StyleText, StyledBlurView } from '../../components/shared/SharedStyles';
import { Divider, Button } from 'react-native-paper';
import { TBarberApp, LicenseInfo } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';
import StatesModal from '@/components/shared/Modals/StateModal';

const ApplicationButton = ({ text, onPress }: { text: string; onPress: () => void; }) => {
return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <StyledBlurView style={{ padding: 5 }} align="center" justify="center">
    <StyleText style={{ fontSize: 12, fontWeight: 500 }}>{text}</StyleText>
    </StyledBlurView>
    </TouchableOpacity>
)
}

const Join = () => {
const auth = useAuth();
const colorScheme = useColorScheme();
const { submitBarberApplication } = useUser();
const [formState, inputHandler, setFormData] = useForm({
    firstName: { value: "", isValid: false },
    lastName: { value: "", isValid: false,},
    city: { value: "", isValid: false,},
    state: { value: "", isValid: false,},
    zip: { value: "", isValid: false },
    expiration: { value: "", isValid: false,},
    category: { value: "", isValid: false },
    registrationNumber: { value: "", isValid: false,},
    licensed: { value: undefined, isValid: false },
    termsApproved: { value: undefined, isValid: false },
    onDemand: { value: false, isValid: false, },
    signature: { value: "", isValid: false, }
}, false);
const [isStateModalOpen, setIsStateModalOpen] = useState<boolean>(false);
const [selectedState, setSelectedState] = useState<string>("");


const { 
    firstName,
    lastName,
    city,
    state,
    zip,
    expiration,
    registrationNumber,
    category, 
    licensed, 
    termsApproved, 
    onDemand, 
    signature
} = formState.inputs;

useEffect(() => {
    if(formState.isValid) {
        setFormData({
            firstName: { value: firstName.value, isValid: true },
            lastName: { value: lastName.value, isValid: true },
            city: { value: city.value, isValid: true,},
            state: { value: state.value, isValid: true},
            zip: { value: zip.value, isValid: true,},
            expiration: { value: expiration.value, isValid: true,},
            category: { value: category.value, isValid: true},
            registrationNumber: { value: registrationNumber.value, isValid: true},
            licensed: { value: licensed.value, isValid: true },
            termsApproved: { value: termsApproved.value, isValid: true },
            onDemand: { value: onDemand.value, isValid: true, },
            signature: { value: signature.value, isValid: true, }
        }, true);
    }
}, [formState.isValid]);

const handleFirstNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
inputHandler("firstName", e.nativeEvent.text, e.nativeEvent.text !== "");
};

const handleLastNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
inputHandler("lastName", e.nativeEvent.text, e.nativeEvent.text !== "");
};

const handleCityChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler("city", e.nativeEvent.text, e.nativeEvent.text !== "");
}

const handleLocationChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler("location", e.nativeEvent.text, e.nativeEvent.text !== "");
};

const handleZipCodeChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler("zip", e.nativeEvent.text, e.nativeEvent.text.length > 4);
};

const handleRegistrationNumber = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler("registrationNumber", e.nativeEvent.text, e.nativeEvent.text !== "")
}

const handleExpiration = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler("expiration", e.nativeEvent.text, e.nativeEvent.text !== "")
}
const handleCategory= (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler("category", e.nativeEvent.text, e.nativeEvent.text !== "")
}

const handleLicenseChange = (hasLicense: boolean) => {
    inputHandler("licensed", hasLicense, true);
}

const handleTermsApproval = (isApproved: boolean) => {
    inputHandler("termsApproved", isApproved, true);
}

const handleOnDemandToggle = (isOnDemand: boolean) => {
    inputHandler("onDemand", isOnDemand, true);
}

const handleInspectorConsent = (isConsent: boolean) => {

}
const handleSignature = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();
    inputHandler(
        "signature", 
        e.nativeEvent.text, 
        String(signature.value) !== ""
    );
}

const handleSelectedState = (state: string) => {
    console.log("SelectedState: ", state)
    setSelectedState(state);
    inputHandler("state", state, state !== "");
}

const handleSubmitApplication = async () => {
    console.log("formValidityChecking")
    if(formState.isValid) {
        console.log("FormIsValid")
        const barberApp: TBarberApp & LicenseInfo = { 
            firstName: String(firstName.value),
            lastName: String(lastName.value),
            city: String(city.value),
            state: String(state.value),
            zip: Number(zip.value),
            expiration: String(expiration.value),
            registrationNumber: Number(registrationNumber.value),
            category: String(category.value), 
            licensed: Boolean(licensed.value), 
            termsApproved: Boolean(termsApproved.value), 
            onDemand: Boolean(onDemand.value), 
            signature: String(signature.value)
        };
    submitBarberApplication(barberApp);
   
    setFormData(
    {
        firstName: { value: "", isValid: false },
        lastName: { value: "", isValid: false,},
        city: { value: "", isValid: false,},
        state: { value: "", isValid: false,},
        zip: { value: "", isValid: false },
        expiration: { value: "", isValid: false,},
        category: { value: "", isValid: false },
        registrationNumber: { value: "", isValid: false,},
        licensed: { value: undefined, isValid: false },
        termsApproved: { value: undefined, isValid: false },
        onDemand: { value: false, isValid: false, },
        signature: { value: "", isValid: false, }
    }, false);
    router.push({ pathname: "/"})
    
    }
}

return (
    <SafeAreaView>
        <GoBackArrow marginVertical={5} />
        <StatesModal isOpen={isStateModalOpen} onClose={() => setIsStateModalOpen(false)} value={selectedState} handleSubmit={handleSelectedState}/>
    <ScrollView>
        <StyledView style={{ marginTop: 10, }}>
        </StyledView>
    <StyledView direction="column" gap={10} style={{ flex: 1, padding: 10, marginBottom: 50 }}>
        <StyledView>
        <StyleText style={{ fontSize: 15, fontWeight: 600 }}>
               Join as a Barber/Stylist
            </StyleText>
            <StyleText>
                Earn more income plying your trade by providing hair services on [AppName]. Extend your reach across the greater USA and even the world.
            </StyleText>
        </StyledView>
        <Alert alertType='warning' iconSize={15}  colorScheme={colorScheme} fontSize={12} message={`You must be licensed in the state ${selectedState ? "(" + selectedState + ")" : "you are applying to"}.`} />

        {/* First Name */}
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Fisrt Name</StyleText>
        <TextInput
        value={String(firstName.value)}
        onChange={handleFirstNameChange}
        inputMode="text"
        textContentType="givenName"
        placeholder="Enter first name..."
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>

        {/* Last Name */}
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Last Name</StyleText>
        <TextInput
        value={String(lastName.value)}
        onChange={handleLastNameChange}
        inputMode="text"
        textContentType="givenName"
        placeholder="Enter last name..."
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>

        {/* State */}
        <StyledView justify="center" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Select State</StyleText>
            {selectedState ? 
            <StyleText onPress={() => setIsStateModalOpen(true)} style={{ fontSize: 15, fontWeight: 600 }}>{selectedState}</StyleText> 
            : <ApplicationButton text="Select State" onPress={() => setIsStateModalOpen(true)}/>}
        </StyledView>

        {/* City */}
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>City</StyleText>
        <TextInput
        value={String(city.value)}
        onChange={handleCityChange}
        inputMode="text"
        textContentType="givenName"
        placeholder="Enter city..."
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>


        {/* Zip */}
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Zip Code</StyleText>
        <TextInput
        value={String(zip.value)}
        onChange={handleZipCodeChange}
        inputMode="text"
        textContentType="postalCode"
        placeholder="Enter zip code..."
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>

        <Divider style={{ width: '100%' }} />

        {/* License Process */}
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Are you Licensed in the state where you will perform your services?</StyleText>
        <StyledView direction="row" align="center" gap={5}>
       <Switch value={!!licensed.value} onValueChange={(value: boolean) => handleLicenseChange(value)}/>
        <StyleText>{licensed.value ? "I am licensed" : "Not licensed"}</StyleText>
        </StyledView>

        {licensed.value && (
            <StyledView gap={10}>
                <StyleText>Please allow 12-36 hours for approval.</StyleText>
                 {/* Registration Number */}
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Registration Number</StyleText>
        <TextInput
        value={String(registrationNumber.value)}
        onChange={handleRegistrationNumber}
        inputMode="text"
        textContentType="givenName"
        placeholder="Enter registration number..."
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>

        {/* Expiration Date of License */}
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Expiration Date</StyleText>
        <TextInput
        value={String(expiration.value)}
        onChange={handleExpiration}
        inputMode="text"
        textContentType="givenName"
        placeholder="Enter expiration date ("
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>

        {/* Category */}
        <StyledView direction="column" gap={5}>
        <StyleText style={{ fontWeight: 700 }}>Category</StyleText>
        <TextInput
        value={String(category.value)}
        onChange={handleCategory}
        inputMode="text"
        textContentType="givenName"
        placeholder="Enter your license category..."
        selectionColor={"#fff"}
        placeholderTextColor={colorScheme === "light" ? "#444":"#555"}
        style={{ color: colorScheme === 'light' ? "#222" : "white" }}
        />
        </StyledView>

            </StyledView>
        )}


        </StyledView>
        <Divider style={{ width: '100%' }} />
        <StyledView direction="column" gap={5} align="flex-start">
        <StyleText style={{ fontWeight: 700 }}>I have read the Terms & Conditions and accept them.</StyleText>
        <ApplicationButton onPress={() => console.log('open modal')} text="Terms & Conditions" />
        <StyleText>Confirming and submitting this form means you confirm you have read and agreed to our terms & conditions.</StyleText>
        <StyledView direction="row" align="center" gap={5}>
       <Switch value={!!termsApproved.value} onValueChange={(value: boolean) => handleTermsApproval(value)}/>
        <StyleText>{termsApproved.value ? "I have read and agree to the Terms & Conditions" : "Not Confirmed"}</StyleText>
        </StyledView>
        </StyledView>
        <Divider style={{ width: '100%' }} />
        <StyledView direction="column" gap={5}>
            <StyleText style={{ fontWeight: 700 }}>Will you offer home visits?</StyleText>
            <StyleText>&bull; You must be a licensed master barber, barber or barber stylist.</StyleText>
            <StyleText>&bull; You must be actively working at a licensed barber shop/salon.</StyleText>
            <StyleText>&bull; You uphold the highest level of sanitation standards.</StyleText>
            <StyleText>&bull; Your shop will act as a sponsor.</StyleText>
            <StyleText>&bull; Maintain a personal record/log of each transaction</StyleText>
            <StyledView direction="row" align="center" gap={5}>
                <Switch value={!!onDemand.value} onValueChange={(value: boolean) => handleOnDemandToggle(value)} />
                    <StyleText>{onDemand.value ? "I am eligible ":"I am not eligible"}</StyleText>
            </StyledView>
            {onDemand.value && (
                        <StyledView direction="column" gap={5}>
                        <Alert
                          alertType='info'
                          hideIcon
                          iconSize={15}
                          colorScheme={colorScheme}
                          fontSize={12}
                          message='Under Maryland law, in-home visits may be subject to inspection by the State Board. By enabling this feature, you confirm that your tools are sanitized, your shop will maintain records, and you agree to allow inspections if required.'
                        />
                        <StyledView direction="row" align="center" gap={5}>
                          <Switch value={!!licensed.value} onValueChange={(value: boolean) => handleInspectorConsent(value)} />
                          <StyleText>{licensed.value ? "I acknowledge possible inspection by the Board" : "Not Acknowledged"}</StyleText>
                        </StyledView>
                      </StyledView>
            )}
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
    </SafeAreaView>
)

}

export default Join;