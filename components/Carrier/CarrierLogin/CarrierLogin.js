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
  Platform
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
  BUSINESS_NAME,
  MOBILE_NUMBER,
  ADDRESS,
} from '../../../Services/constant';
// import DeviceInfo from 'react-native-device-info';

// var Spinner = require('react-native-spinkit');
const { width, height } = Dimensions.get('window');

export default class CarrierLogin extends Component {
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
    const userid = await AsyncStorage.getItem(USER_ID);
    if (userid != null && userid != '') {
      // redirect to my drawer
      this.props.navigation.replace('MyDrawer');
    } else {
      this.setState({
        isAuthenticating: false,
      });
    }
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
    // console.warn('devicetype', deviceType);

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
        // console.warn('Rwes', res);
        if (res.status == true) {
          await AsyncStorage.setItem(USER_ID, res.data.id.toString());
          await AsyncStorage.setItem(USER_TOKEN, res.token.toString());
          //let mobilenumber = res.custom_attributes.filter(name => name.attribute_code.toLowerCase() == 'mobile_no');
          // console.warn('mobilemobile', res.data.custom_attributes[0].value);
          await AsyncStorage.setItem(MOBILE_NUMBER, res.data.custom_attributes[0].value.toString());
          
          if (res.data.id === 50) {
            await AsyncStorage.setItem(USER_TYPE, '3');
          }

          if (res.data.id !==50 && res.seller_details.length > 0) {
            await AsyncStorage.setItem(USER_TYPE, '2');
            await AsyncStorage.setItem(BUSINESS_NAME, res.seller_details[0].shop_title.toString());
            //await AsyncStorage.setItem(MOBILE_NUMBER, res.token.toString());
            await AsyncStorage.setItem(ADDRESS, res.seller_details[0].company_locality.toString());
          }

          if (res.data.id !==50 && res.seller_details.length === 0) {
            await AsyncStorage.setItem(USER_TYPE, '1');
            await AsyncStorage.setItem(BUSINESS_NAME, '');
            //await AsyncStorage.setItem(MOBILE_NUMBER, res.token.toString());
            // await AsyncStorage.setItem(ADDRESS, res.data.custom_attributes[1].value.toString());
          }

          if (res.data.id === 50) {
            await AsyncStorage.setItem(
              USER_BUSINESS_TYPE,
              '3',
            );
          }

          if (res.data.id !== 50 && res.seller_details.length > 0) {
            await AsyncStorage.setItem(
              USER_BUSINESS_TYPE,
              '2',
            );
          }

          if (res.data.id !== 50 && res.seller_details.length === 0) {
            await AsyncStorage.setItem(
              USER_BUSINESS_TYPE,
              '1',
            );
          }

          if (res.data.extension_attributes.is_subscribed) {
            await AsyncStorage.setItem(
              SUBSCRIPTION_STATUS,
              res.data.extension_attributes.is_subscribed.toString(),
            );
          }

          await AsyncStorage.setItem(USER_STATUS, '1');
          await AsyncStorage.setItem(FIRST_NAME, res.data.firstname.toString());
          await AsyncStorage.setItem(LAST_NAME, res.data.lastname.toString());
          await AsyncStorage.setItem(EMAIL_ADDRESS, res.data.email.toString());
          await AsyncStorage.setItem(CREATED_AT, res.data.created_at.toString());
          Hud.hideHud();
          this.props.navigation.replace('MyDrawer');
          console.log(JSON.stringify(res.data))
        } else {
          Hud.hideHud();
          CommonToast.showToast(res.message, 'error');
        }
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
        source={require('../../../assets/bg.png')}
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <CarrierHeader
              navProps={this.props.navigation}
              title={'Login'}
            />
            {this.state.isAuthenticating ? (
              <View
                style={{
                  flex: 1,
                  // backgroundColor: 'rgba(255,255,255,0.4)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: height / 6,
                }}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{ width: 113, height: 70, marginBottom: height / 11 }}
                />

                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Roboto-Light',
                      color: '#6d6b6c',
                    }}>
                    Just a sec...
                </Text>
                </View>
              </View>
            ) : (
                <View style={{
                  flex: 1,
                  // backgroundColor: 'rgba(255,255,255,0.1)'
                }}>
                  <ScrollView
                    style={{}}
                    contentcontainerstyle={{ paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled">
                    <Image
                      source={require('../../../assets/logo.png')}
                      style={{
                        width: 110,
                        height: 72,
                        alignSelf: 'center',
                        marginTop: 30,
                      }}
                    />

                    <View style={{ marginTop: 20, borderRadius: 20, padding: 15, marginLeft: 25, marginRight: 25, backgroundColor: "white", marginBottom: 30 }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginTop: 20,
                        }}>
                        <TextInput
                          style={{
                            width: '90%',
                            fontFamily: 'Roboto-Light',
                            fontSize: 16,
                            paddingBottom: 8,
                            paddingTop: 0,
                            paddingLeft: 0,
                            color: '#6d6b6c',
                          }}
                          placeholder={'Email'}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          placeholderTextColor={'#6d6b6c'}
                          ref={input => {
                            this.email_input = input;
                          }}
                          onChangeText={email => this.setState({ email })}
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/email.png')}
                            style={{ width: 22, height: 22, tintColor: '#6d6b6c' }}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          height: 0.5,
                          backgroundColor: '#6d6b6c',
                        }}
                      />
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginTop: 20,
                        }}>
                        <TextInput
                          style={{
                            width: '90%',
                            fontFamily: 'Roboto-Light',
                            fontSize: 16,
                            paddingBottom: 8,
                            paddingTop: 0,
                            paddingLeft: 0,
                            color: '#6d6b6c',
                          }}
                          placeholder={'Password'}
                          placeholderTextColor={'#6d6b6c'}
                          secureTextEntry={this.state.passwordVisible}
                          ref={input => {
                            this.password_input = input;
                          }}
                          onChangeText={password => this.setState({ password })}
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          {this.state.password.trim() != '' ? (
                            <TouchableOpacity onPress={() => this.showPassword()}>
                              <Image
                                source={this.state.eyeImg}
                                style={{
                                  width: 24,
                                  height: 24,
                                  tintColor: '#6d6b6c',
                                }}
                              />
                            </TouchableOpacity>
                          ) : (
                              <Image
                                source={require('../../../assets/unlock.png')}
                                style={{ width: 22, height: 22, tintColor: '#6d6b6c' }}
                              />
                            )}
                        </View>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          height: 0.5,
                          backgroundColor: '#6d6b6c',
                        }}
                      />
                     
                      <View style={{ width: '100%', color: '#2a2a2a', marginTop: 20 }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('ForgetPassword')
                          }>
                          <Text
                            style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center' }}>
                            Forgot Password</Text>

                        </TouchableOpacity>
                      </View>

                      <View style={{ marginTop: 20 }}>

                        <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', width: 200 }}>
                          <Button title="Login" onClick={this.onButtonClick} />
                        </View>

                      </View>
                      <View style={{ width: '100%', color: '#2a2a2a', marginTop: 20 }}>
                        <Text
                          style={{ fontFamily: 'Roboto-Regular', fontSize: 22, color: '#6d6b6c', alignSelf: 'center' }}>
                          Or
                      </Text>
                      </View>

                      <View style={{
                        width: '100%', alignSelf: 'center', color: '#2a2a2a', marginTop: 20, justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                        <Image
                          source={require('../../../assets/facebook.png')}
                          style={{
                            width: 60,
                            height: 60,
                          }}
                        />
                        <Image
                          source={require('../../../assets/googlaccount.png')}
                          style={{
                            width: 60,
                            height: 60,
                          }}
                        />
                      </View>


                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginTop: 20,
                          marginBottom: 20,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('CarrierRegistration')
                          }>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#6d6b6c' }}>New member?</Text>
                            <Text
                              style={{ marginLeft: 5, fontFamily: 'Roboto-Bold' }}>
                              Sign Up
                        </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'column',
                          marginTop: 20,
                          marginBottom: 20,
                        }}>

                      </View>
                    </View>
                  </ScrollView>
                </View>
              )}
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
