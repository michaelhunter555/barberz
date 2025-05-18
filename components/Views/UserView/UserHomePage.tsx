import React from 'react';
import useAuth from '@/context/auth/use-auth';
import { View, useColorScheme } from 'react-native';
import { StyleText, StyledView } from '@/components/shared/SharedStyles';
import { SearchBar } from '@/components/shared/SearchBar/SearchBar';
import { Divider } from 'react-native-paper';
import { dummyUsers } from '@/components/home/DummyData';
import { HomeFeatures } from '@/components/home/HomeFeatures/HomeFeatures';
import { FeaturedShop } from '@/components/home/Featured/FeaturedShop';
import { IconOptionsList } from '@/components/home/IconList/IconList';
import { FilterBarberChips } from '@/components/home/FilterChips/FitlerChips';
import UserCard from '@/components/shared/UserList/UserList';

interface IUserHomePage {
searchValue: string;
onSearchSubmit: (query: string) => void;
}
const UserHomePage = ({ searchValue, onSearchSubmit}: IUserHomePage) => {
    const auth = useAuth();
    const colorScheme = useColorScheme();
    return (
        <>
          <SearchBar 
      colorScheme={colorScheme}
      searchValue={searchValue}
      onSearchSubmit={onSearchSubmit}/>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <StyleText style={{ fontWeight: 700, fontSize: 20, }}>A Barber that fits your needs.</StyleText>
      {auth?.userAuth !== null  && <StyleText style={{ fontWeight: 400, fontSize: 15,  }}>Welcome back {auth?.userAuth?.name?.split(" ")[0]}!</StyleText>}
      </View>
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Divider style={{ width: '100%' }} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 10}}>
        <IconOptionsList colorScheme={colorScheme} />
        <HomeFeatures colorScheme={colorScheme}/>
      </View>
      <View>
      <StyleText style={{ fontWeight: 600, fontSize: 15 }}>Featured:</StyleText>
        <FeaturedShop colorScheme={colorScheme}/>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <View>
          <StyleText style={{ fontWeight: 600, fontSize: 15 }}>Near [location]</StyleText>
          <FilterBarberChips colorScheme={colorScheme} />
        </View>
        
        <View style={{ maxHeight: 270 }}>
          <UserCard userData={dummyUsers} colorScheme={colorScheme} />
        </View>
      </View>
      
        </>
    )
};

export default UserHomePage;