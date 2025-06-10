import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import useAuth from '@/context/auth/use-auth';
import { Button, HelperText, Icon, TextInput } from 'react-native-paper';
import { useForm } from '@/hooks/use-form';
import { useQuery } from '@tanstack/react-query';
import { StyledView, StyledContainer, StyleText, StyledBlurView, StyledDivider } from '../../components/shared/SharedStyles';
import { NativeSyntheticEvent, TextInputChangeEventData, useColorScheme, ScrollView, Switch } from 'react-native';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';
import { SafeAreaView } from 'react-native-safe-area-context';
import { type TCoupon } from '@/types';
import { useBarber } from '@/hooks/barber-hooks';
import { router } from 'expo-router';
import { ManySkeletonTextLines, SkeletonButton, SkeletonCard } from '@/components/shared/LoadingSkeleton/Skeletons';
import { useInvalidateQuery } from '@/hooks/invalidate-query';

const CouponForm = () => {
const auth = useAuth();
const { selectedCoupon } = useLocalSearchParams();
let editCoupon: TCoupon | null = null;
if(selectedCoupon) {
    editCoupon = JSON.parse(decodeURIComponent(String(selectedCoupon)))
}
console.log("isEditCoupon: ",!!editCoupon)
const { createCoupon, updateCoupon, deleteCoupon, isLoading: isCreatingCoupon } = useBarber();
const { invalidateQuery } = useInvalidateQuery();
const barber = auth?.userAuth;
const colorScheme = useColorScheme();
const [ formState, inputHandler, setFormData ] = useForm({
    name: { value: editCoupon?.name ?? "", isValid: !!editCoupon},
  ownerId: { value: editCoupon?.ownerId ?? "", isValid: !!editCoupon },
  isPublic: { value: editCoupon?.isPublic ?? true, isValid: true },
  isActive: { value: editCoupon?.isActive ?? true, isValid: true },
  amount: { value: editCoupon?.amount ?? 1, isValid: true },
  terms: { value: editCoupon?.terms ?? "", isValid: !!editCoupon },
  minPriceActivation: { value: editCoupon?.minPriceActivation ?? 1, isValid: true },
  expirationDate: { value: editCoupon?.expirationDate ?? "", isValid: !!editCoupon },
  onlyForUsers: { value: editCoupon?.onlyForUsers as Array<string> ?? [], isValid: true },
}, false);
const { name, amount, terms, expirationDate, minPriceActivation, isPublic, isActive } = formState.inputs;

// const { data: clients, isLoading: isLoadingClients } = useQuery({
//     queryKey: [barber?.id, "createCoupon"],
//     queryFn: () => void console.log("d"),
//     enabled: Boolean(isPublic.value)
// });

useEffect(() => {
    if (
      name.isValid &&
      amount.value &&
      terms.value &&
      expirationDate.isValid &&
      minPriceActivation.isValid
    ) {
        setFormData({
            name,
            ownerId: formState.inputs.ownerId,
            isPublic: formState.inputs.isPublic,
            isActive: formState.inputs.isActive,
            amount,
            terms,
            minPriceActivation,
            expirationDate,
            onlyForUsers: formState.inputs.onlyForUsers,
        }, true);
    }
}, [
    formState.inputs.name,
    formState.inputs.amount,
    formState.inputs.terms,
    formState.inputs.expirationDate,
    formState.inputs.minPriceActivation,
])

console.log("FormState: ", formState.inputs)

    const resetData = () => {
        setFormData({
            name: { value: "", isValid: false },
            ownerId: { value: undefined, isValid: false},
            isPublic: { value: true, isValid: true,},
            isActive: { value: true, isValid: true, },
            amount: { value: 1, isValid: true,},
            terms: { value: "", isValid: false,},
            minPriceActivation: { value: 1, isValid: false},
            expirationDate: { value: "", isValid: false,},
            onlyForUsers: { value: [], isValid: false},
        }, false);
    };

    const handleSubmitCoupon = async () => {
        const coupon: TCoupon = {
           ...(editCoupon?._id && { _id: editCoupon._id}),
            name: String(name.value),
            ownerId: String(barber?.id),
            amount: Number(amount.value),
            terms: String(terms.value),
            minPriceActivation: Number(minPriceActivation.value),
            expirationDate: String(expirationDate.value),
            isActive: Boolean(isActive.value),
            isPublic: Boolean(isPublic.value),
        }
        console.log(coupon)
        if(editCoupon?._id) {
            await updateCoupon(coupon);
            invalidateQuery("barberCoupons");
        }
        else {
            await createCoupon(coupon);
        }
        resetData();
        router.push("/");
    }

    const handleDeleteCoupon = async () => {
        if(editCoupon?._id) {
           await deleteCoupon(String(editCoupon?._id));
           invalidateQuery("barberCoupons");
        }
        router.push("/");
    }

    return (
        <SafeAreaView>
        <ScrollView>
 {!isCreatingCoupon && <StyledContainer>
    <GoBackArrow />
    <StyledView direction="row" align="center" gap={10}>
      <StyleText style={{ fontSize: 20, fontWeight: 700 }}>Create Coupon</StyleText>
      <Icon source="plus-circle" size={20} />
    </StyledView>

    <Alert hideIcon alertType='info' colorScheme={colorScheme} iconSize={14} fontSize={13} message="Coupons are available to the public unless you have prior transactions. If you have you have previous transactions, you can make coupons private and offer previous customers discounts. You may only have four public coupons at any given time. " />

    <StyledView>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Coupon Name</StyleText>
      <TextInput
        placeholder="Enter coupon name..."
        style={{ height: 50 }}
        mode="outlined"
        value={String(formState.inputs.name.value)}
        onChange={(e) =>
          inputHandler("name", e.nativeEvent.text, e.nativeEvent.text.length > 0)
        }
      />
    </StyledView>

    <StyledView>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Discount Amount</StyleText>
      <HelperText type="info">The amount deducted from the total price</HelperText>
      <TextInput
      left={ <TextInput.Icon icon="currency-usd" size={17}/>}
        placeholder="Enter discount amount..."
        style={{ height: 50 }}
        mode="outlined"
        keyboardType="numeric"
        value={String(formState.inputs.amount.value)}
        onChange={(e) =>
          inputHandler("amount", e.nativeEvent.text, Number(e.nativeEvent.text) > 0)
        }
      />
    </StyledView>

    <StyledView>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Short Description</StyleText>
      <HelperText type="info">Clearly state any details you want customers to know.</HelperText>
      <TextInput
        placeholder="Enter short description..."
        mode="outlined"
        multiline
        numberOfLines={4}
        style={{ height: 100 }}
        value={String(formState.inputs.terms.value)}
        onChange={(e) =>
          inputHandler("terms", e.nativeEvent.text, e.nativeEvent.text.length > 5)
        }
      />
    </StyledView>

    <StyledView>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Minimum Price</StyleText>
      <HelperText type="info">The minimum amount to apply your offer.</HelperText>
      <TextInput
        left={ <TextInput.Icon icon="currency-usd" size={17}/>}
        placeholder="Enter minimum order price..."
        style={{ height: 50 }}
        mode="outlined"
        keyboardType="numeric"
        value={String(formState.inputs.minPriceActivation.value)}
        onChange={(e) =>
          inputHandler("minPriceActivation", e.nativeEvent.text, Number(e.nativeEvent.text) > 0)
        }
      />
    </StyledView>

    <StyledView>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Expiration Date</StyleText>
      <TextInput
        placeholder="YYYY-MM-DD"
        style={{ height: 50 }}
        mode="outlined"
        value={String(formState.inputs.expirationDate.value)}
        onChange={(e) =>
          inputHandler("expirationDate", e.nativeEvent.text, e.nativeEvent.text.length >= 10)
        }
      />
    </StyledView>

    <StyledView direction="row" align="center" gap={10}>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Public?</StyleText>
      <Switch
        value={Boolean(formState.inputs.isPublic.value)}
        onValueChange={(value) => inputHandler("isPublic", value, true)}
      />
      <HelperText type='info'>{isPublic.value ? "Visible on your profile" : "Not visible to customers"}</HelperText>
    </StyledView>

    <StyledView direction="row" align="center" gap={10}>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Active?</StyleText>
      <Switch
        value={Boolean(formState.inputs.isActive.value)}
        onValueChange={(value) => inputHandler("isActive", value, true)}
      />
      <StyledView direction="row" align="center">
       <HelperText type='info'>{isActive.value ? "Coupon is live" : "Coupon is Inactive"}</HelperText>
       <StyledView style={{ borderRadius: 50, backgroundColor: isActive.value ? 'green' : 'grey', height: 10, width: 10, }} />
      </StyledView>
    </StyledView>

    {/* Optional: Add "onlyForUsers" if you're selecting users 
    <StyledView>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Only For Users (IDs)</StyleText>
      <TextInput
        placeholder="Comma-separated user IDs..."
        mode="outlined"
        value={formState.inputs.onlyForUsers.value.join(', ')}
        onChange={(e) =>
          inputHandler(
            "onlyForUsers",
            e.nativeEvent.text.split(',').map((id) => id.trim()),
            true
          )
        }
      />
    </StyledView>*/}

    <StyledDivider orientation="horizontal" marginVertical={5} />
    <Button
      icon={editCoupon?._id ? "pencil":"plus"}
      onPress={handleSubmitCoupon}
      disabled={!formState.isValid || isCreatingCoupon}
      mode="contained"
    >
     {editCoupon?._id ? "Edit Coupon": "Create Coupon"}
    </Button>
    {editCoupon?._id && (
        <Button 
        mode="text" 
        textColor="red" 
        icon="trash-can-outline"
        onPress={handleDeleteCoupon}
        >
            Delete Coupon
        </Button>
    )}
  </StyledContainer>}
  {isCreatingCoupon && (
    <StyledView gap={10}>
    <SkeletonCard />
    <SkeletonButton />
    </StyledView>

  )}
</ScrollView>
        </SafeAreaView>

    )

};

export default CouponForm;