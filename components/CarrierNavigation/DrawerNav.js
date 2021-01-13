import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MyBottomTabs from './BottomTabNavigation';
import CustomDrawer from './CustomDrawer';
import { BackHandler, Alert } from 'react-native';
import EditVehicle from '../Carrier/EditVehicle/EditVehicle'

const Drawer = createDrawerNavigator();

const MyDrawer = props => {

  function backButtonHandler() {
    //console.warn('back')
    //BackHandler.exitApp()
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, [backButtonHandler]);

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{ width: '75%' }} initialRouteName='MyBottomTabs'>
      <Drawer.Screen name="MyBottomTabs" component={MyBottomTabs} />
      {/* <Drawer.Screen name="EditVehicle" component={EditVehicle} /> */}
    </Drawer.Navigator>
  );
}

export default MyDrawer;