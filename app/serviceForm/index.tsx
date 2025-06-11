import React, { useEffect } from 'react';
import useAuth from '@/context/auth/use-auth';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { Button, HelperText, Icon, TextInput } from 'react-native-paper';
import { useBarber } from '@/hooks/barber-hooks';
import { useInvalidateQuery } from '@/hooks/invalidate-query';
import { useForm } from '@/hooks/use-form';
import { StyledView, StyledContainer, StyleText, StyledBlurView, StyledDivider } from '../../components/shared/SharedStyles';
import { NativeSyntheticEvent, TextInputChangeEventData, useColorScheme, ScrollView } from 'react-native';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import Alert from '@/components/shared/Alert/Alert';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TService } from '@/types';
import { SkeletonButton, SkeletonCard } from '@/components/shared/LoadingSkeleton/Skeletons';

const ServiceForm = () => {
    const colorScheme = useColorScheme();
    const auth = useAuth();
    const barber = auth?.userAuth;
    const { createAddOn, updateAddOn, deleteAddOn, isLoading } = useBarber();
    const { invalidateQuery } = useInvalidateQuery();
    const { selectedService } = useLocalSearchParams();
    let editService: TService | null = null;
    if (selectedService) {
        editService = JSON.parse(decodeURIComponent(String(selectedService)))
    }

    const [formState, inputHandler, setFormData] = useForm({
        name: { value: editService?.name ?? "", isValid: !!selectedService },
        description: { value: editService?.description ?? "", isValid: !!selectedService },
        price: { value: editService?.price ?? "", isValid: !!selectedService }
    }, !!selectedService);

    useEffect(() => {
        if (formState.inputs.name.value,
            formState.inputs.description.value,
            formState.inputs.price.value,
            formState.isValid) {
            setFormData({
                name: { value: formState.inputs.name.value, isValid: true },
                description: { value: formState.inputs.description.value, isValid: true },
                price: { value: formState.inputs.price.value, isValid: true }
            }, true)
        }
    }, [
        formState.inputs.name.value,
        formState.inputs.description.value,
        formState.inputs.price.value,
        formState.isValid]);

    const { name, description, price } = formState.inputs;

    console.log(formState.inputs)

    const handleInputs = (id: string, text: string, isValid: boolean) => {
        inputHandler(id, text, isValid);
    };


    const newService = useMutation({
        mutationKey: ["create-service", barber?.id],
        mutationFn: async (newServiceForm: TService) => {
            return await createAddOn(newServiceForm, String(barber?.id))
        }
    });

    const updateService = useMutation({
        mutationKey: ["update-service", barber?.id],
        mutationFn: async (updateServiceForm: TService) => {
            return await updateAddOn(updateServiceForm, String(editService?._id))
        }
    });

    const deleteService = useMutation({
        mutationKey: ["delete-service", barber?.id],
        mutationFn: async (id: string) => {
            return await deleteAddOn(String(editService?._id))
        }
    })

    const handleReset = async () => {
        await invalidateQuery("create-service");
        setFormData(
            {
                name: { value: "", isValid: false },
                description: { value: "", isValid: false },
                price: { value: "", isValid: false },
            },
            false
        );
        router.push("/");
    }

    const handleCreateNewService = async () => {  
        // service data
        const serviceForm: TService = {
            ...(editService?._id && { _id: editService._id }),
            name: formState?.inputs?.name?.value as string,
            description: formState?.inputs?.description?.value as string,
            price: formState?.inputs?.price?.value as number,
        }

        if(editService?._id) {
            // edit service
            updateService.mutate(serviceForm, {
                onSuccess:handleReset,
                onError: (err) => {
                    console.log(err);
                }
            })
        } else {
            // add new service
            newService.mutate(serviceForm, {
                onSuccess: handleReset,
                onError: (err) => {
                    console.log(err);
                }
            });
        }
       
    };

    const handleDeleteService = () => {
        if(editService?._id) {
            deleteService.mutate(
                String(editService._id), 
                { onSuccess: handleReset, onError: (err) => console.log(err) });
        }
    }


    return (
        <SafeAreaView>
            <ScrollView>
                {!newService.isPending &&
                    <StyledContainer>
                        <GoBackArrow />
                        <StyledView direction="row" align="center" gap={10}>
                            <StyleText style={{ fontSize: 20, fontWeight: 700 }}>Create add-on</StyleText>
                            <Icon source="plus-circle" size={20} />
                        </StyledView>

                        <Alert colorScheme={colorScheme} alertType='info' fontSize={12} iconSize={15} message="Keep add-on name short (recommended)" />
                        <StyledView>
                            <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Add-On Name</StyleText>
                            <TextInput
                                placeholder='Enter a service...'
                                style={{ height: 50 }}
                                mode="outlined"
                                value={String(name.value)}
                                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputs("name", e.nativeEvent.text, e.nativeEvent.text !== "" && e.nativeEvent.text.length < 30)}
                            />
                            <HelperText type="info">i.e. beard trim, hair dye, fade, etc.</HelperText>
                        </StyledView>

                        <StyledView>
                            <StyleText style={{ fontSize: 14, fontWeight: 600 }}>Add-on Price</StyleText>
                            <TextInput
                                placeholder='Enter a price...'
                                style={{ height: 50 }}
                                left={<TextInput.Icon icon="currency-usd" />}
                                mode="outlined"
                                value={String(price.value)}
                                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputs("price", e.nativeEvent.text, Number(e.nativeEvent.text) > 1)}
                            />
                        </StyledView>

                        <StyledView>
                            <StyleText style={{ ...(String(description.value).length > 50 && { color: 'red' }), fontSize: 14, fontWeight: 600 }}>Add-on Description (max words: 50)</StyleText>
                            <TextInput
                                placeholder='Enter the service description...'
                                mode="outlined"
                                value={String(description.value)}
                                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputs("description", e.nativeEvent.text, e.nativeEvent.text !== "" && e.nativeEvent.text.length < 50)}
                                multiline
                                numberOfLines={5}
                                style={{ height: 200 }}
                            />
                        </StyledView>

                        <StyledDivider orientation="horizontal" marginVertical={5} />

                        <Button
                            icon={editService?._id ? "pencil":"plus"}
                            onPress={handleCreateNewService}
                            disabled={!formState.isValid}
                            mode="contained">{editService?._id ? "Edit Coupon" : "Create Add-on"}</Button>
                             
                             {editService?._id && <Button
                            icon="trash-can-outline"
                            textColor='red'
                            onPress={handleDeleteService}
                            mode="text">
                                Delete
                        </Button>}
                    </StyledContainer>}

                {newService.isPending && (
                    <StyledView gap={10}>
                        <SkeletonCard />
                        <SkeletonButton />
                    </StyledView>
                )}

            </ScrollView>
        </SafeAreaView>
    )

};

export default ServiceForm