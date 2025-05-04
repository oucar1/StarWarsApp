import React from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PlanetsScreen from './screens/PlanetsScreen';
import PlanetDetails from './screens/PlanetDetails';
import FilmsScreen from './screens/FilmsScreen';
import FilmDetails from './screens/FilmDetails';
import SpaceshipsScreen from './screens/SpaceshipsScreen';
import SpaceshipDetails from './screens/SpaceshipDetails';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="PlanetsTab" component={PlanetsScreen} options={{ title: 'Planets' }} />
      <Tab.Screen name="FilmsTab" component={FilmsScreen} options={{ title: 'Films' }} />
      <Tab.Screen name="SpaceshipsTab" component={SpaceshipsScreen} options={{ title: 'Spaceships' }} />
    </Tab.Navigator>
  );
}

function Drawers() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="PlanetsDrawer" component={PlanetsScreen} options={{ title: 'Planets' }} />
      <Drawer.Screen name="FilmsDrawer" component={FilmsScreen} options={{ title: 'Films' }} />
      <Drawer.Screen name="SpaceshipsDrawer" component={SpaceshipsScreen} options={{ title: 'Spaceships' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const MainNavigator = Platform.OS === 'ios' ? Tabs : Drawers;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlanetDetails"
            component={PlanetDetails}
            options={{ title: 'Planet Details' }}
          />
          <Stack.Screen
            name="FilmDetails"
            component={FilmDetails}
            options={{ title: 'Film Details' }}
          />
          <Stack.Screen
            name="SpaceshipDetails"
            component={SpaceshipDetails}
            options={{ title: 'Spaceship Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
