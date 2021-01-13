import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyDrawer from './DrawerNav';
import RegistrationChoice from '../RegistrationChoice';
import CarrierRegistration from '../Carrier/CarrierRegistration/CarrierRegistration';
import CarrierLogin from '../Carrier/CarrierLogin/CarrierLogin';
import ForgetPassword from '../Carrier/ForgetPassword/ForgetPassword';
import ChangePassword from '../Carrier/ChangePassword/ChangePassword';
import MyProfile from '../Carrier/MyProfile/MyProfile';
import CustomerHelp from '../Carrier/CustomerHelp/CustomerHelp';
import CustomerFaq from '../Carrier/CustomerFaq/CustomerFaq';
import CustomerStoreProductList from '../Carrier/CustomerStoreProductList/CustomerStoreProductList';
import CustomerProductDetails from '../Carrier/CustomerProductDetails/CustomerProductDetails';
import CustomerCheckout from '../Carrier/CustomerCheckout/CustomerCheckout';
import CustomerMyFavorites from '../Carrier/CustomerMyFavorites/CustomerMyFavorites'
import DriverLogin from '../Carrier/DriverLogin/DriverLogin';
import DriverRegistration from '../Carrier/DriverRegistration/DriverRegistration';
import CustomerPaymentScreen from '../Carrier/CustomerPayment/CustomerPaymentScreen'

import VendorHome from '../Carrier/VendorHome/VendorHome';
import VendorManageProducts from '../Carrier/VendorManageProducts/VendorManageProducts';
import SplashScreen from '../Carrier/SplashScreen/SplashScreen';
import VendorAddProducts from '../Carrier/VendorAddProducts/VendorAddProducts';
import EditProfile from '../Carrier/EditProfile/EditProfile';
import PrivacyPolicy from '../Carrier/PrivacyPolicy/PrivacyPolicy';
import TermsCondition from '../Carrier/TermsCondition/TermsCondition';

import EditVehicle from '../Carrier/EditVehicle/EditVehicle';
import AddVehicle from '../Carrier/AddVehicle/AddVehicle';
import PlacesSearch from '../PlacesSearch';
import AddDriver from '../Carrier/AddDriver/AddDriver';
import EditDriver from '../Carrier/EditDriver/EditDriver';
import CarrierDetails from '../Carrier/CarrierDetails/CarrierDetails';
import ChooseCountryCode from '../ChooseCountryCode';

import ViewTransportRequest from '../Carrier/ViewTransportRequest/ViewTransportRequest';
import ViewTransportRequestDetails from '../Carrier/ViewTransportRequestDetails/ViewTransportRequestDetails';
import ViewConfirmedBooking from '../Carrier/ViewConfirmedBooking/index';
import ViewConfirmedBookingDetails from '../Carrier/ViewConfirmedBookingDetails';
import Chat from '../Chat/index';
import ViewSubscription from '../Carrier/CarrierSubscription/CarrierSubscription';
import CustomerAddress from '../Carrier/CustomerAddress/CustomerAddAddress';
//import PushController from '../../components/PushController';
//import Registration from '../Screens/Authorization/Registration/Registration';
const Stack = createStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyDrawer"
          component={MyDrawer}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CarrierLogin"
          component={CarrierLogin}
        />
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="CarrierRegistration"
          component={CarrierRegistration}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="EditVehicle"
          component={EditVehicle}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddVehicle"
          component={AddVehicle}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PlacesSearch"
          component={PlacesSearch}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ChooseCountryCode"
          component={ChooseCountryCode}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DriverLogin"
          component={DriverLogin}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="DriverRegistration"
          component={DriverRegistration}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AddDriver"
          component={AddDriver}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditDriver"
          component={EditDriver}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CarrierDetails"
          component={CarrierDetails}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ViewTransportRequest"
          component={ViewTransportRequest}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ViewTransportRequestDetails"
          component={ViewTransportRequestDetails}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ViewConfirmedBooking"
          component={ViewConfirmedBooking}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ViewConfirmedBookingDetails"
          component={ViewConfirmedBookingDetails}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ViewSubscription"
          component={ViewSubscription}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgetPassword"
          component={ForgetPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyProfile"
          component={MyProfile}
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
          name="CustomerProductDetails"
          component={CustomerProductDetails}
        />
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerCheckout"
          component={CustomerCheckout}
        /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerMyFavorites"
          component={CustomerMyFavorites}
        />
       
        <Stack.Screen
          options={{ headerShown: false }}
          name="VendorHome"
          component={VendorHome}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VendorManageProducts"
          component={VendorManageProducts}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ChangePassword"
          component={ChangePassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VendorAddProducts"
          component={VendorAddProducts}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerAddress"
          component={CustomerAddress}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerPaymentScreen"
          component={CustomerPaymentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
