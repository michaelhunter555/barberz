import React from 'react';
import { StyleText, StyledView, StyledBlurView } from '../shared/SharedStyles';
import { IconButton } from 'react-native-paper';
import { View } from 'react-native';

const services = [
    { name: 'Standard cut', description: 'Haircut, lineup and clean-up.', price: 50 },
    { name: 'Beard & Mustache', description: 'Trim for your beard and mustache on top of haircut.', price: 20 },
    { name: 'Enhancements', description: 'Adds fullness to thinning areas, especially the corners', price: 24 },
    { name: 'Hair dye', description: 'Please select a color in advance. Fee includes cost of materials', price: 150 },
    { name: 'Custom Design', description: 'Custom shapes and symbols and patterns', price: 220 },
]

const BarberServices = () => {
return (
    <View style={{ marginTop: 20 }}>
        <StyleText style={{ fontSize: 15, fontWeight: 700 }}>Services</StyleText>
    <StyledView direction="row" align="flex-start" gap={10} style={{ flexWrap: 'wrap'}}>
        {services.map((service, i) => (
            <StyledBlurView clickable onClick={() => console.log(`clicked ${service.name}`)} key={i} style={{ padding: 10 }}>
              <StyleText>{service.name}</StyleText>
            </StyledBlurView>
        ))}
        <StyledView direction="column" align="center">
        <IconButton onPress={() => console.log("add new service")} size={12} style={{ backgroundColor: "#007AFF" }} icon="plus" />
        </StyledView>
    </StyledView>
    </View>
)
}

export default BarberServices;