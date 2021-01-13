import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  SafeAreaView,
  Keyboard,
  ScrollView,
  BackHandler,
  Dimensions,
  Platform,
} from 'react-native';
import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import { BoxShadow } from 'react-native-shadow';
import Hud from '../../../views/hud';
import Button from '../../Reusables/Button';

import Shadow from 'react-native-simple-shadow-view';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  FCM_TOKEN,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
  USER_TOKEN,
  FIRST_NAME,
  LAST_NAME,
  EMAIL_ADDRESS,
  CREATED_AT,
} from '../../../Services/constant';
import DeviceInfo from 'react-native-device-info';

var Spinner = require('react-native-spinkit');

const { width, height } = Dimensions.get('window');

export default class VendorHome extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      email: '',
      password: '',
      isApiCalling: false,
      eyeIcon: 'off',
      passwordVisible: true,
      eyeImg: require('../../../assets/visibility_off.png'),
      rememberMe: true,
      isAuthenticating: true,
    };

    this.doAuthentication();
  }
  async doAuthentication() {
    /*const userid = await AsyncStorage.getItem(USER_ID);
    if (userid != null && userid != '') {
      // redirect to my drawer
      this.props.navigation.replace('MyDrawer');
    } else {
      this.setState({
        isAuthenticating: false,
      });
    }*/
  }
  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();

    // this.props.navigation.navigate('Dashboard')

    return true;
  }

  async doLogin() {
    //Hud.showHud()
    const fcm_token = await AsyncStorage.getItem(FCM_TOKEN);
    const deviceType = Platform.OS.substr(0, 1).toUpperCase();
    console.warn('devicetype', deviceType);

    if (this.state.email.trim() == '') {
      this.email_input.focus();
      CommonToast.showToast('Please enter email id', 'error');
      return;
    }
    if (!this.validateEmail()) {
      this.email_input.focus();
      CommonToast.showToast('Please enter a valid email id', 'error');
      return;
    }

    if (this.state.password.trim() == '') {
      this.password_input.focus();
      CommonToast.showToast('Please enter password', 'error');
      return;
    }
    if (this.state.password.length < 6) {
      this.password_input.focus();
      CommonToast.showToast('Please enter atleast 6 characters', 'error');
      return;
    }

    Hud.showHud();
    Keyboard.dismiss();
    const data = {
      //email: this.state.email,
      //password: this.state.password,
      //device_id: DeviceInfo.getUniqueId(),
      //device_token: fcm_token != null && fcm_token != '' ? fcm_token : '',
      //device_type: deviceType,
      username: this.state.email,
      password: this.state.password
    };
    await Apis.login(data)
      .then(async res => {
        console.warn('Rwes', res);
        /*if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          console.warn(
            'usersd ' +
              res.data.users_id +
              ' and ' +
              res.data.user_type +
              ' and ' +
              res.data.user_business_type,
          );
          // save user id and user type and user business type
          await AsyncStorage.setItem(USER_ID, res.data.users_id);
          await AsyncStorage.setItem(USER_TYPE, '2');
          await AsyncStorage.setItem(
            USER_BUSINESS_TYPE,
            res.data.user_business_type,
          );
          if (res.data.status) {
            console.warn('have', 'jjj');
            await AsyncStorage.setItem(USER_STATUS, res.data.status);
          }
          if (res.data.subscription_status) {
            await AsyncStorage.setItem(
              SUBSCRIPTION_STATUS,
              res.data.subscription_status,
            );
          }
          Hud.hideHud();
          this.props.navigation.replace('MyDrawer');
        } else {
          Hud.hideHud();
          CommonToast.showToast(res.msg, 'error');
        }*/
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  validateEmail = () => {
    var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexp.test(this.state.email);
  };

  showPassword() {
    if (this.state.eyeIcon == 'off') {
      this.setState({
        eyeIcon: 'on',
        passwordVisible: false,
        eyeImg: require('../../../assets/visibility_on.png'),
      });
    } else {
      this.setState({
        eyeIcon: 'off',
        passwordVisible: true,
        eyeImg: require('../../../assets/visibility_off.png'),
      });
    }
  }

  doTermsCheck() {
    this.setState({
      rememberMe: !this.state.rememberMe,
    });
  }

  onButtonClick = () => {
    this.doLogin();
  };

  render() {
    return (
      <ImageBackground
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <CarrierHeader
              navProps={this.props.navProps}
              title={'Vendor Home'}
            />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <ScrollView
                style={{}}
                contentcontainerstyle={{ paddingBottom: 20 }}
                keyboardShouldPersistTaps="handled">

                <View style={{
                  backgroundColor: '#059d14', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 50, padding: 15, borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: "center"
                    }}>

                    <View style={{ flex: 2 }}>
                      <Text style={{
                        fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                        paddingTop: 0, paddingLeft: 0, color: '#fff',
                      }}> Vendor Home
                        </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 10,
                      backgroundColor: '#60b169', padding: 10,
                      borderRadius: 40
                    }}>
                    <TextInput
                      style={{
                        flex: 2,
                        fontFamily: 'Roboto-Light',
                        fontSize: 16,
                        paddingBottom: 8,
                        paddingTop: 6,
                        paddingLeft: 10,
                        color: '#fff',
                      }}
                      placeholder={'Search'}
                      keyboardType="default"
                      autoCapitalize="none"
                      placeholderTextColor={'#fff'}
                      ref={input => {
                        this.email_input = input;
                      }}
                      onChangeText={email => this.setState({ email })}
                    />
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginRight: 5,
                        // paddingBottom: 8,
                      }}>
                      <Image
                        source={require('../../../assets/searcopt.png')}
                        style={{ width: 22, height: 22 }}
                      />
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 30 }}>
                  <Image source={require('../../../assets/ven_home.png')}
                    style={{ maxWidth: '97%', maxHeight: 560 }}
                  />
                </View>

              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    ...Platform.select({
      ios: {},
      android: {},
    }),
    width: null,
    height: null,
  },
  btnStyle: {
    paddingTop: 10,
    paddingBottom: 10,

    borderWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnTextStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
