import React from 'react';
import { router } from 'expo-router';
import useAuth from '@/context/auth/use-auth';
import { useQuery } from '@tanstack/react-query';
import { useBarber } from '@/hooks/barber-hooks';
import { StyleText, StyledView, StyledBlurView } from '../shared/SharedStyles';
import { IconButton } from 'react-native-paper';
import { View } from 'react-native';
import { ManySkeletonTextLines } from '../shared/LoadingSkeleton/Skeletons';

// const services = [
//     { name: 'Standard cut', description: 'Haircut, lineup and clean-up.', price: 50 },
//     { name: 'Beard & Mustache', description: 'Trim for your beard and mustache on top of haircut.', price: 20 },
//     { name: 'Enhancements', description: 'Adds fullness to thinning areas, especially the corners', price: 24 },
//     { name: 'Hair dye', description: 'Please select a color in advance. Fee includes cost of materials', price: 150 },
//     { name: 'Custom Design', description: 'Custom shapes and symbols and patterns', price: 220 },
// ]

const BarberServices = () => {
    const auth = useAuth();
    const barber = auth?.userAuth;
    const { getAddOns } = useBarber();

    const { data: services , isLoading: servicesIsLoading } = useQuery({
        queryKey: ["getServices", barber?.id],
        queryFn: () => getAddOns(String(barber?.id)),
        enabled: Boolean(barber?.id),
    });

return (
    <View style={{ marginTop: 10 }}>
        <StyleText style={{ fontSize: 15, fontWeight: 700 }}>Services</StyleText>
        {servicesIsLoading && (
          <StyledView style={{ width: '100%' }}>
            <ManySkeletonTextLines width={200} />
        </StyledView>
        )}
   {!servicesIsLoading &&  
   <StyledView direction="row" align="flex-start" gap={10} style={{ flexWrap: 'wrap'}}>
        {services && services?.length > 0 && services?.map((service, i) => (
            <StyledBlurView clickable onClick={() => router.push({ pathname: "/serviceForm", params: { selectedService: JSON.stringify(service)}})} key={i} style={{ padding: 10 }}>
              <StyleText>{service.name}</StyleText>
            </StyledBlurView>
        ))}
        {services && services.length === 0 && ( <StyleText>No Services Found. Create one?</StyleText>)}
        <StyledView direction="column" align="center">
        <IconButton onPress={() => router.push("/serviceForm")} size={12} style={{ backgroundColor: "#007AFF" }} icon="plus" />
        </StyledView>
    </StyledView>
        }
    </View>
)
}

export default BarberServices;