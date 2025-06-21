import { Tabs } from 'expo-router';
import React from 'react';
import useAuth from '@/context/auth/use-auth';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const auth = useAuth();
  const isBarber = auth?.userAuth?.accountType === 'barber';
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={"house.fill"} color={color} />,
        }}
      />
      
    <Tabs.Screen
        name="explore"
        options={{
          href: isBarber ? null : undefined,
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    <Tabs.Screen
        name="coupon"
        options={{
          href: isBarber ? null : undefined,
          title: 'Coupon',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tag.fill" color={color} />,
        }}
      />

       <Tabs.Screen
        name="create"
        options={{
          href: !isBarber ? null : undefined,
          title: 'Create',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />

<Tabs.Screen
        name="profile"
        options={{
          href: !isBarber ? null : undefined,
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />


      <Tabs.Screen
        name="upgrades"
        options={{
          href: null,
          title: 'Upgrade',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.line.uptrend.xyaxis" color={color} />,
        }}
      />

      <Tabs.Screen 
      name="more"
      options={{
        href: isBarber ? undefined : null,
        title: 'More',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="line.3.horizontal" color={color} />
      }}
       />


       <Tabs.Screen
        name="settings"
        options={{
          href: isBarber ? null : undefined,
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
