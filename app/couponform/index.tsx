import React, { useEffect } from 'react';
import { Button, HelperText, Icon, TextInput } from 'react-native-paper';
import { useForm } from '@/hooks/use-form';
import { StyledView, StyledContainer, StyleText, StyledBlurView, StyledDivider } from '../../components/shared/SharedStyles';
import { NativeSyntheticEvent, TextInputChangeEventData, useColorScheme, ScrollView, Switch } from 'react-native';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';

const CouponForm = () => {
const colorScheme = useColorScheme();
const [ formState, inputHandler, setFormData ] = useForm({
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
const { name, amount, terms, expirationDate, minPriceActivation } = formState.inputs;

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
  ]);

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
    }

    return (
        <ScrollView>
  <StyledContainer>
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
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Amount</StyleText>
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
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Terms</StyleText>
      <TextInput
        placeholder="Enter terms..."
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
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Min Price Activation</StyleText>
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
    </StyledView>

    <StyledView direction="row" align="center" gap={10}>
      <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Active?</StyleText>
      <Switch
        value={Boolean(formState.inputs.isActive.value)}
        onValueChange={(value) => inputHandler("isActive", value, true)}
      />
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
      icon="plus"
      onPress={resetData}
      disabled={!formState.isValid}
      mode="contained"
    >
      Create Coupon
    </Button>
  </StyledContainer>
</ScrollView>

    )

};

export default CouponForm;