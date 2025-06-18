import React, { useState } from 'react';
import useAuth from '@/context/auth/use-auth';
import { View, useColorScheme } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks/user-hooks';
import { StyleText, StyledDivider, StyledView } from '@/components/shared/SharedStyles';
import { SearchBar } from '@/components/shared/SearchBar/SearchBar';
import { Button, Divider } from 'react-native-paper';
import { dummyUsers } from '@/components/home/DummyData';
import { HomeFeatures } from '@/components/home/HomeFeatures/HomeFeatures';
import { FeaturedShop } from '@/components/home/Featured/FeaturedShop';
import { IconOptionsList } from '@/components/home/IconList/IconList';
import { FilterBarberChips } from '@/components/home/FilterChips/FitlerChips';
import UserCard from '@/components/shared/UserList/UserList';
import ResourceItem from '@/components/shared/Resources/ResourceItem';
import { dummyImgArr } from '@/components/BarberProfile/ShowCaseGallery';
import { IBarber } from '@/types';


const UserHomePage = () => {
    const auth = useAuth();
    const user = auth?.userAuth;
    const colorScheme = useColorScheme();
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [radius, setRadius] = React.useState<string>("10");
    const { getBarbers } = useUser();

    const { data: barberList, isLoading: barbersIsLoading } = useQuery({
      queryKey: ["barbers-list", user?.id, radius],
      queryFn: () => getBarbers(radius),
      enabled: Boolean(user?.id),
    })

    return (
        <StyledView gap={10} style={{ marginTop: 10 }}>
          <SearchBar 
      colorScheme={colorScheme}
      searchValue={searchValue}
      onSearchSubmit={setSearchValue}/>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <StyleText style={{ fontWeight: 700, fontSize: 20, }}>A Barber that fits your needs.</StyleText>
      {auth?.userAuth !== null  && <StyleText style={{ fontWeight: 400, fontSize: 15,  }}>Welcome back {auth?.userAuth?.name?.split(" ")[0]}!</StyleText>}
      </View>
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Divider style={{ width: '100%', marginVertical: 5  }} />
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
        
        <StyledView gap={10} style={{ maxHeight: 350,  }}>
          {!barbersIsLoading && barberList && barberList.length > 0 && (
          <UserCard userData={barberList as IBarber[]} colorScheme={colorScheme} />
          )}
            <Button onPress={() => console.log("Barbers")} icon="eye" mode="outlined">Search Barbers</Button>
        </StyledView>

        <StyledDivider orientation="horizontal" marginVertical={10} />
        <View>
        <StyleText style={{ fontWeight: 600, fontSize: 15 }}>Knowledge Base</StyleText>
          <ResourceItem
          image={dummyImgArr[0].imgPath}
          imageArr={dummyImgArr.map((img, i) => img.imgPath) as string[]}
          header='Make the Most of Your Experience'
          content='In this post, we cover how to use the barber app, best practices and a quiz to earn you $1.'
          onViewPress={() => console.log("learn more")}
          />
        </View>
      </View>
      
        </StyledView>
    )
};

export default UserHomePage;