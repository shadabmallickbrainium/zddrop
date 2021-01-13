import React from 'react';
import AdminChat from '../AdminChat/index';
import BusinessChat from '../BusinessChat/index';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

export default function ChatTab() {
  const options = {
    activeTintColor: '#fff',
    inactiveTintColor: '#4b4b4b',
    style: {
      backgroundColor: 'black',
      borderColor: '#363636',
      borderWidth: 0.3,
      height: 50,
      justifyContent: 'center',
    },
    indicatorStyle: {
      backgroundColor: '#fff',
    },
    labelStyle: {
      letterSpacing: 1,
      fontSize: 14,
    },
  };

  return (
    <Tab.Navigator tabBarOptions={options} initialRouteName={'SHIPPER'}>
      <Tab.Screen name="SHIPPER" component={AdminChat} />
      <Tab.Screen name="CUSTOMER" component={BusinessChat} />
    </Tab.Navigator>
  );
}
