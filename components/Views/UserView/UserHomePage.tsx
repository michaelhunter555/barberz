import React from 'react';
import useAuth from '@/context/auth/use-auth';
import { View, useColorScheme } from 'react-native';
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

interface IUserHomePage {
searchValue: string;
onSearchSubmit: (query: string) => void;
}
const UserHomePage = ({ searchValue, onSearchSubmit}: IUserHomePage) => {
    const auth = useAuth();
    const colorScheme = useColorScheme();
    return (
        <StyledView gap={10} style={{ marginTop: 10 }}>
          <SearchBar 
      colorScheme={colorScheme}
      searchValue={searchValue}
      onSearchSubmit={onSearchSubmit}/>
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
          <UserCard userData={dummyUsers} colorScheme={colorScheme} />
            <Button icon="eye" mode="outlined">View all Barbers</Button>
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