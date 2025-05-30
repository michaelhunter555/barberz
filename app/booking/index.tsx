import { useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { StyledView, StyleText } from "@/components/shared/SharedStyles";
import AppointmentCard from "@/components/BarberAppointments/AppointmentCard";
import { tempData } from '@/lib/dummyDataCards';
import { IconButton } from 'react-native-paper';
import { SearchBar } from '@/components/shared/SearchBar/SearchBar';

const tempImgPath = "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww";
//get status, price, customer name, img, date and type + booking id
const BookingsPage = () => {
    const colorScheme = useColorScheme();
    const [search, setSearch] = useState<string>("");
    // TODO: onLoad retreive all bookings for barber
    return(
        <StyledView style={{ flex: 1, padding: 5 }}>

            {/* Go back */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
        <StyledView direction="row" align="center" style={{ marginBottom: 10}}>
                <IconButton icon="arrow-left" size={15} />
                <StyleText>Go back</StyleText>
            </StyledView>
            </TouchableOpacity>

                    {/* SearchBar */}
                    <StyledView style={{ marginBottom: 10}}>
                    <SearchBar placeholder='Browse bookings...' colorScheme={colorScheme} searchValue={search} onSearchSubmit={setSearch}/>
                    </StyledView>
            <StyleText style={{ fontWeight: 700, fontSize: 15 }}>My Bookings</StyleText>
                    {/* Scroll Container */}
                <ScrollView>
        <StyledView style={{ flex: 1 }}>
            {tempData.length > 0 ? tempData.map((booking, i) => (
                <AppointmentCard
                id={booking.id}
                key={booking.id}
                date={booking.date} 
                status={booking.status}
                value={booking.price}
                type={booking.type}
                addOns={booking.addOns}
                customerName={booking.customerName} 
                customerImg={tempImgPath} />
            )): <StyleText>No Bookings</StyleText>}
        </StyledView>
        </ScrollView>
        </StyledView>
    )
}

export default BookingsPage;