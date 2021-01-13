import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tab from './CustomBottomTab';
import CarrierProfile from '../Carrier/CarrierProfile/CarrierProfile';
import CarrierLogin from '../Carrier/CarrierLogin/CarrierLogin';
import CarrierRegistration from '../Carrier/CarrierRegistration/CarrierRegistration';
import VendorAddProducts from '../Carrier/VendorAddProducts/VendorAddProducts';
import EditProfile from '../Carrier/EditProfile/EditProfile';
import ForgetPassword from '../Carrier/ForgetPassword/ForgetPassword';
import MyProfile from '../Carrier/MyProfile/MyProfile';
import VendorHome from '../Carrier/VendorHome/VendorHome';
import VendorManageProducts from '../Carrier/VendorManageProducts/VendorManageProducts';
import CustomerHelp from '../Carrier/CustomerHelp/CustomerHelp';
import CustomerFaq from '../Carrier/CustomerFaq/CustomerFaq';
import CustomerStoreProductList from '../Carrier/CustomerStoreProductList/CustomerStoreProductList';
import TermsCondition from '../Carrier/TermsCondition/TermsCondition';
import PrivacyPolicy from '../Carrier/PrivacyPolicy/PrivacyPolicy';
import CustomerCheckout from '../Carrier/CustomerCheckout/CustomerCheckout';
import ReserveItemScreen from '../Carrier/ReserveItemsScreen/ReserveItemScreen';

import CarrierDashboard from '../Carrier/CarrierDashboard/CarrierDashboard';
import CarrierChat from '../Carrier/CarrierChat/CarrierChat';
import CarrierNotification from '../Carrier/CarrierNotification/CarrierNotification';
import ChangePassword from '../Carrier/ChangePassword/ChangePassword';
import AsyncStorage from '@react-native-community/async-storage';
import AddVehicleManager from '../Carrier/AddVehicleManager/AddVehicleManager';
import AddVehicle from '../Carrier/AddVehicle/AddVehicle';
import EditVehicle from '../Carrier/EditVehicle/EditVehicle';
import DriverRegistration from '../Carrier/DriverRegistration/DriverRegistration'
import VendorSalesListScreen from '../Carrier/VendorSalesList/VendorSalesListScreen'
import ManageDriver from '../Carrier/ManageDriver/ManageDriver';
import CustomerOrderHistory from '../Carrier/CustomerOrderHistory/CustomerOrderHistory'
import VendorSalesListDetailsScreen from '../Carrier/VendorSalesListDetails/VendorSalesListDetailsScreen'
//import FeedbackToAdmin from '../FeedbackToAdmin';
import CustomerOrderHistoryDetailsScreen from '../Carrier/CustomerOrderHistoryDetails/CustomerOrderHistoryDetailsScreen'
import ChatTab from '../Carrier/CarrierChat/ChatTab/index';

import { USER_ID, USER_TYPE, USER_BUSINESS_TYPE } from '../../Services/constant';
import { View } from 'react-native';
const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyBottomTabs = () => {
  const [usertype, setUsertype] = useState('');

  useEffect(() => {
    getUserid();
  });
  const getUserid = async () => {
    let vv = await AsyncStorage.getItem(USER_TYPE);
    setUsertype(vv);

    //return vv;
    //console.warn('warn',vv)
  };
  const tabBarOnPress = ({ navigation, defaultHandler }) => {
    const { isFocused, state, goBack } = navigation;
    if (isFocused()) {
      if (state.routes.length > 1) {
        for (let i = 0; i < state.routes.length - 1; i += 1) {
          goBack();
        }
      } else {
        // @TODO SCROLL TO TOP OF EACH TAB IF SCROLLABLE, $CALLBACK().
      }
    } else {
      defaultHandler();
    }
  };
  //const renderView = () => {

  return (
    <View style={{ flex: 1 }}>
      <BottomTabs.Navigator tabBar={props => <Tab {...props} />}>
        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CarrierDashboard"
          component={CarrierDashboard}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CarrierProfile"
          component={CarrierProfile}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CarrierChat"
          component={CarrierChat}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CarrierNotification"
          component={CarrierNotification}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="ChangePassword"
          component={ChangePassword}
        />
        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="AddVehicleManager"
          component={AddVehicleManager}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ManageDriver"
          component={ManageDriver}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CarrierLogin"
          component={CarrierLogin}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="DriverRegistration"
          component={DriverRegistration}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="MyProfile"
          component={MyProfile}
        />
        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="VendorHome"
          component={VendorHome}
        />
        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="VendorManageProducts"
          component={VendorManageProducts}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerHelp"
          component={CustomerHelp}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerFaq"
          component={CustomerFaq}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerStoreProductList"
          component={CustomerStoreProductList}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ReserveItemScreen"
          component={ReserveItemScreen}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CarrierRegistration"
          component={CarrierRegistration}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="ForgetPassword"
          component={ForgetPassword}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="VendorAddProducts"
          component={VendorAddProducts}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="EditProfile"
          component={EditProfile}
        />
        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CustomerCheckout"
          component={CustomerCheckout}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="PrivacyPolicy"
          component={PrivacyPolicy}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="TermsCondition"
          component={TermsCondition}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="VendorSalesListScreen"
          component={VendorSalesListScreen}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CustomerOrderHistory"
          component={CustomerOrderHistory}
        />
        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="VendorSalesListDetailsScreen"
          component={VendorSalesListDetailsScreen}
        />

        <BottomTabs.Screen
          options={{ headerShown: false }}
          name="CustomerOrderHistoryDetailsScreen"
          component={CustomerOrderHistoryDetailsScreen}
        />



      </BottomTabs.Navigator>
    </View>

  );
  //};

  //return renderView();

  // <BottomTabs.Navigator tabBar={props => <Tab {...props} />}>

  //   {
  //     usertype !=null && usertype!='' && usertype=='2' ?
  //     <BottomTabs.Navigator tabBar={props => <Tab {...props} />}>
  //     <BottomTabs.Screen options={{headerShown: false}} name="CarrierDashboard" component={CarrierDashboard} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="CarrierProfile" component={CarrierProfile} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="CarrierChat" component={CarrierChat} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="CarrierNotification" component={CarrierNotification} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="ChangePassword" component={ChangePassword} />
  //     </BottomTabs.Navigator>
  //     :

  //     <BottomTabs.Navigator tabBar={props => <Tab {...props} />}>
  //      <BottomTabs.Screen options={{headerShown: false}} name="CarrierDashboard" component={CarrierDashboard} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="CarrierProfile" component={CarrierProfile} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="CarrierChat" component={CarrierChat} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="CarrierNotification" component={CarrierNotification} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="ChangePassword" component={ChangePassword} />
  //     <BottomTabs.Screen options={{headerShown: false}} name="ShipperDashboard" component={ChangePassword} />
  //     </BottomTabs.Navigator>

  //   }

  // </BottomTabs.Navigator>
};

export default MyBottomTabs;
