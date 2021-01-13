import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
  USER_TOKEN,
  FIRST_NAME,
  LAST_NAME,
  EMAIL_ADDRESS,
  CREATED_AT,
} from '../../Services/constant';

const customDrawer = props => {
  const [usertype, setUsertype] = useState('');
  const [userstatus, setUserStatus] = useState('');
  const [subscriptionstatus, setSubscriptionStatus] = useState('');
  const [isUser, setUserid] = useState('');
  const [nameuser, setUsername] = useState('');

  const openDashboard = () => {
    props.navigation.closeDrawer();
    //if (usertype != null && usertype != '' && usertype == '2') {
    props.navigation.jumpTo('CarrierDashboard');
    //} else {
    //props.navigation.jumpTo('ShipperDashboard');
    //}
  };
  useEffect(() => {
    getUserid();
  });
  const getUserid = async () => {
    let vv = await AsyncStorage.getItem(USER_TYPE);
    let ustatus = await AsyncStorage.getItem(USER_STATUS);
    let substatus = await AsyncStorage.getItem(SUBSCRIPTION_STATUS);
    let userid = await AsyncStorage.getItem(USER_ID);

    let firstname = await AsyncStorage.getItem(FIRST_NAME);
    let lastname = await AsyncStorage.getItem(LAST_NAME);
    let name = firstname + " " + lastname;
    // console.warn('status', ustatus);
    setUsertype(vv);
    setUserStatus(ustatus);
    setSubscriptionStatus(substatus);
    setUsername(name);
    if (vv == '1') {
      setUserid('1');
    }
    if (vv == '2') {
      setUserid('2');
    }
    if (vv == '3') {
      setUserid('3');
    }
    if (vv == '' || vv == null) {
      setUserid('');
    }

    //return vv;
    // console.warn('user id status', isUser);
  };

  const openProfile = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('MyProfile');
  };

  const openVendorHome = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('VendorHome');
  };

  const openVendorManageProducts = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('VendorManageProducts');
  };
  const openCart = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('CustomerCheckout');
  };
  const openCustomerterms = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('TermsCondition');
  };

  const openCustomerpolicy = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('PrivacyPolicy');
  };

  const openCustomerFaq = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('CustomerFaq');
  };

  const openCustomerHelp = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('CustomerHelp');
  };
  const openDemoPage = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('CarrierNotification');
  }; 

  const openCustomerOrderHistoryScreen = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('CustomerOrderHistory');
  }; 
  
  const openVendorOrderHistory = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('VendorSalesListScreen');
  };

  const openReserveAnItem = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('ReserveItemScreen');
  };

  const openEditPage = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('EditProfile');
  };
  const openLogin = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('CarrierLogin');
  };

  const openRegistration = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('CarrierRegistration');
  };

  const openDriverRegistration = () => {
    props.navigation.closeDrawer();
    props.navigation.jumpTo('DriverRegistration');
  };

  const openDriverManager = () => {
    // props.navigation.closeDrawer()
    // props.navigation.jumpTo('AddDriverManager');
    props.navigation.closeDrawer();
    props.navigation.jumpTo('AddVehicleManager');
  };

  const openTransportRequest = () => {
    // props.navigation.closeDrawer()
    // props.navigation.jumpTo('AddDriverManager');
    props.navigation.closeDrawer();
    props.navigation.jumpTo('ViewTransportRequest');
  };
  const openConfirmedeBooking = () => {
    // props.navigation.closeDrawer()
    // props.navigation.jumpTo('AddDriverManager');
    props.navigation.closeDrawer();
    props.navigation.jumpTo('ViewConfirmedBooking');
  };

  const openDriverManager1 = () => {
    // props.navigation.closeDrawer()
    // props.navigation.jumpTo('AddDriverManager');
    props.navigation.closeDrawer();
    props.navigation.jumpTo('ManageDriver');
  };
  const openFeedback = () => {
    // props.navigation.closeDrawer()
    // props.navigation.jumpTo('AddDriverManager');
    props.navigation.closeDrawer();
    props.navigation.jumpTo('FeedbackToAdmin');
  };
  const viewSubscription = () => {
    // props.navigation.closeDrawer()
    // props.navigation.jumpTo('AddDriverManager');
    props.navigation.closeDrawer();
    props.navigation.jumpTo('ViewSubscription');
  };

  const processLogout = async () => {
    // console.warn('logout');

    await AsyncStorage.setItem(USER_ID, '');
    await AsyncStorage.setItem(USER_TYPE, '');
    await AsyncStorage.setItem(USER_BUSINESS_TYPE, '');
    await AsyncStorage.setItem(USER_STATUS, '');
    await AsyncStorage.setItem(SUBSCRIPTION_STATUS, '');

    await AsyncStorage.setItem(USER_TOKEN, '');
    await AsyncStorage.setItem(FIRST_NAME, '');
    await AsyncStorage.setItem(LAST_NAME, '');
    await AsyncStorage.setItem(EMAIL_ADDRESS, '');
    await AsyncStorage.setItem(CREATED_AT, '');

    // props.navigation.closeDrawer();
    props.navigation.jumpTo('CarrierLogin');
  };

  const doLogout = () => {
    props.navigation.closeDrawer();
    Alert.alert(
      //title
      'Logout',
      //body
      'Are you sure want to logout ?',
      [
        { text: 'Yes', onPress: processLogout },
        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
      ],
      { cancelable: false },
      //clicking out side of alert will not cancel
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#049f13', '#075710']}
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 50,
        }}>

        {isUser != null && isUser != '' ? (

          <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 25, marginRight: 25, }}>

            <View style={{ width: 100, marginTop: 10, position: 'relative', color: '#2a2a2a', marginLeft: 'auto', alignSelf: 'center', marginRight: 'auto' }}>
              <TouchableOpacity style={{ position: 'relative', width: 100, marginLeft: 'auto', marginRight: 'auto' }}>
                <Image
                  source={require('../../../src/assets/profile_pic.png')}
                  style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ width: '100%', color: '#2a2a2a', marginTop: 10 }}>
              <Text
                style={{ fontWeight: "bold", fontFamily: 'Roboto-Regular', fontSize: 18, color: '#fff', alignSelf: 'center' }}>
                {nameuser}
              </Text>
            </View>
          </View>
        ) : null}
      </LinearGradient>


      <View style={{ marginTop: 20, flex: 1 }}>
        <ScrollView>
          {isUser == null || isUser == '' ? (
            <View>
              <TouchableOpacity style={styles.textShadow} onPress={openDashboard}>
                <Text style={styles.textStyle}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openLogin}>
                <Text style={styles.textStyle}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openRegistration}>
                <Text style={styles.textStyle}>Registration</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openDriverRegistration}>
                <Text style={styles.textStyle}>Driver Registration</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerpolicy}>
                <Text style={styles.textStyle}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerterms}>
                <Text style={styles.textStyle}>Terms & Conditions</Text>
              </TouchableOpacity>

            </View>
          ) : null}

          {isUser != null && usertype != '' && isUser == '1' ? (
            <View>
              <TouchableOpacity style={styles.textShadow} onPress={openDashboard}>
                <Text style={styles.textStyle}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openEditPage}>
                <Text style={styles.textStyle}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openDemoPage}>
                <Text style={styles.textStyle}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textShadow} onPress={openCart}>
                <Text style={styles.textStyle}>Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textShadow} onPress={openCustomerOrderHistoryScreen}>
                <Text style={styles.textStyle}>Order History</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openReserveAnItem}>
                <Text style={styles.textStyle}>Reserve an Item</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerFaq}>
                <Text style={styles.textStyle}>Faq</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerpolicy}>
                <Text style={styles.textStyle}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerterms}>
                <Text style={styles.textStyle}>Terms & Conditions</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerHelp}>
                <Text style={styles.textStyle}>Help</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={doLogout}>
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {isUser != null && usertype != '' && isUser == '2' ? (
            <View>
              <TouchableOpacity style={styles.textShadow} onPress={openDashboard}>
                <Text style={styles.textStyle}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openEditPage}>
                <Text style={styles.textStyle}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openVendorOrderHistory}>
                <Text style={styles.textStyle}>Order History</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openDemoPage}>
                <Text style={styles.textStyle}>Driver Management</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openVendorManageProducts}>
                <Text style={styles.textStyle}>Products Management</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerFaq}>
                <Text style={styles.textStyle}>Faq</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerpolicy}>
                <Text style={styles.textStyle}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerterms}>
                <Text style={styles.textStyle}>Terms & Conditions</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openCustomerHelp}>
                <Text style={styles.textStyle}>Help</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={doLogout}>
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {isUser != null && usertype != '' && isUser == '3' ? (
            <View>
              <TouchableOpacity style={styles.textShadow} onPress={openDashboard}>
                <Text style={styles.textStyle}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openEditPage}>
                <Text style={styles.textStyle}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openDemoPage}>
                <Text style={styles.textStyle}>Order History</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openDemoPage}>
                <Text style={styles.textStyle}>Sales Report</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openDemoPage}>
                <Text style={styles.textStyle}>Feedback</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={openDemoPage}>
                <Text style={styles.textStyle}>Driver Manager</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.textShadow} onPress={doLogout}>
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
  },

  menuItemView: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: Dimensions.get('window').width / 15,
  },
  menuitemText: {
    color: 'grey',
    //fontFamily: Fonts.QuicksandRegular,
    fontSize: 17,
  },
  textStyle: {
    color: '#afafaf',
    fontFamily: 'Roboto-Bold',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: 'center',
  },

  textShadow: {
    shadowColor: "#000",
    marginBottom: 4,
    marginTop: 4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    backgroundColor: '#fff'
  }
});

export default customDrawer;
