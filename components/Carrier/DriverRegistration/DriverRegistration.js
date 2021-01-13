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
  ScrollView,
  ToastAndroid,
  Dimensions,
  Platform,
  Keyboard,
  SafeAreaView,
  BackHandler,
} from 'react-native';

import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import CommonToast from '../../../views/common-toast';
import Hud from '../../../views/hud';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import Button from '../../Reusables/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  FCM_TOKEN,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
} from '../../../Services/constant';
const { width, height } = Dimensions.get('window');
const shadowOpt = {
  width: width - 20,
  height: height / 10,
  color: '#e13b5a',
  border: 6,
  marginRight: 20,
  overflow: 'hidden',
  opacity: 0.1,
  x: 0,
  y: 6,
  style: { justifyContent: 'center' },
};

export default class CarrierRegistration extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      isDriver: true,
      isFleet: false,
      radio_checked_img: require('../../../assets/radio_checked.png'),
      radio_unchecked_img: require('../../../assets/radio_unchecked.png'),
      isTermsCheck: false,
      name: '',
      email: '',
      vehicleType: "Bike",
      vehicleNumber: "",
      vehicleRegistrationNumber: "",
      password: ""
    };
  }

  businessRadioClikced() {
    this.setState({
      isDriver: false,
      isFleet: true,
    });
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('CarrierLogin');
    return true;
  }

  individualRadioClicked() {
    this.setState({
      isDriver: true,
      isFleet: false,
    });
  }

  doNavigateToPlaceSearch() {
    this.props.navigation.navigate('PlacesSearch', {
      backFunc: this.updateLatLong,
    });
  }
  onButtonClick = () => {
    this.doRegister();
  };

  async doRegister() {
    //Hud.showHud()
    const fcm_token = await AsyncStorage.getItem(FCM_TOKEN);
    const deviceType = Platform.OS.substr(0, 1).toUpperCase();
    // console.warn('devicetype', deviceType);

    if (this.state.isDriver) {
      if (this.state.name.trim() == '') {
        this.name_input.focus();
        CommonToast.showToast('Please enter name', 'error');
        return;
      }
     
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

      if (this.state.vehicleNumber.trim() == '') {
        this.vehicle_number.focus();
        CommonToast.showToast('Please enter Vehicle Number', 'error');
        return;
      }
      if (this.state.vehicleRegistrationNumber.trim() == '') {
        this.vehicle_regNumber.focus();
        CommonToast.showToast('Please enter registration number', 'error');
        return;
      }
      
      if (!this.state.isTermsCheck) {
        CommonToast.showToast('Please accept terms and condition', 'error');
        return;
      }
    }

    const data = {
      name: this.state.name,
      email: this.state.email,
      vehicle_type: this.state.vehicleType,
      vehicle_number: this.state.vehicleNumber,
      vehicle_registration_number: this.state.vehicleRegistrationNumber,
      password: this.state.password
    };

    console.log(JSON.stringify(data))

    Hud.showHud();
    Keyboard.dismiss();
    await Apis.createDriver(this.state.isDriver ? data : null)
      .then(async res => {
        if (res[0].success == true) {
          Hud.hideHud();
          this.props.navigation.navigate('CarrierLogin');
        }
        else {
          Hud.hideHud();
          CommonToast.showToast(res[0].message, 'error');
          // console.log(res)
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

  doTermsCheck() {
    this.setState({
      isTermsCheck: !this.state.isTermsCheck,
    });
  }

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/bg1.jpg')}
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <CarrierHeader
            navProps={this.props.navigation}
            title={'Registration'}
          />
          {this.state.isAddressClicked ? (
            <View style={{ flex: 1 }}>

            </View>
          ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
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
                  <View
                    style={{
                      marginTop: height / 11,
                      marginLeft: 25,
                      marginRight: 25,
                      marginTop: 20, borderRadius: 20, padding: 15, backgroundColor: "white", marginBottom: 30
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: '50%', flexDirection: 'row' }}>
                        <TouchableOpacity
                          style={{ width: '100%', alignItems: 'center' }}
                          onPress={() => this.individualRadioClicked()}>
                          <View style={{ width: '50%', flexDirection: 'row' }}>
                            {this.state.isDriver ? (
                              <Image
                                source={this.state.radio_checked_img}
                                style={{
                                  width: 25,
                                  height: 25,
                                  tintColor: '#058812',
                                }}
                              />
                            ) : (
                                <Image
                                  source={this.state.radio_unchecked_img}
                                  style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: '#058812',
                                  }}
                                />
                              )}

                            <Text
                              style={{
                                alignSelf: 'center',
                                marginLeft: 5,
                                fontSize: 15,
                                fontFamily: 'Roboto-Regular',
                                color: '#363636',
                              }}>
                              Driver
                          </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{ width: '50%', flexDirection: 'row' }}>
                        <TouchableOpacity
                          style={{ width: '100%', alignItems: 'center' }}
                          onPress={() => this.businessRadioClikced()}>
                          <View style={{ width: '50%', flexDirection: 'row' }}>
                            {this.state.isFleet ? (
                              <Image
                                source={this.state.radio_checked_img}
                                style={{
                                  width: 25,
                                  height: 25,
                                  tintColor: '#058812',
                                }}
                              />
                            ) : (
                                <Image
                                  source={this.state.radio_unchecked_img}
                                  style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: '#058812',
                                  }}
                                />
                              )}

                            <Text
                              style={{
                                alignSelf: 'center',
                                marginLeft: 5,
                                fontSize: 15,
                                fontFamily: 'Roboto-Regular',
                                color: '#363636',
                              }}>
                              Fleet
                          </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {this.state.isDriver ? (
                      <View>
                        <View style={{ width: '100%' }}>
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
                              placeholder={'Name'}
                              placeholderTextColor={'#6d6b6c'}
                              ref={input => {
                                this.name_input = input;
                              }}
                              onChangeText={name => this.setState({ name })}
                            />
                          </View>

                          <View
                            style={{
                              width: '100%',
                              height: 0.5,
                              backgroundColor: '#6d6b6c',
                            }}
                          />

                        </View>

                        <View style={{ width: '100%' }}>
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
                              placeholderTextColor={'#6d6b6c'}
                              ref={input => {
                                this.email_input = input;
                              }}
                              onChangeText={email => this.setState({ email })}
                            />

                          </View>
                          <View
                            style={{
                              width: '100%',
                              height: 0.5,
                              backgroundColor: '#6d6b6c',
                            }}
                          />
                        </View>

                        <View style={{ width: '100%' }}>
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
                              ref={input => {
                                this.password_input = input;
                              }}
                              onChangeText={password => this.setState({ password })}
                            />

                          </View>
                          <View
                            style={{
                              width: '100%',
                              height: 0.5,
                              backgroundColor: '#6d6b6c',
                            }}
                          />
                        </View>

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            marginTop: 20,
                          }}>
                          {/* <TextInput
                            style={{
                              width: '90%',
                              fontFamily: 'Roboto-Light',
                              fontSize: 16,
                              paddingBottom: 8,
                              paddingTop: 0,
                              paddingLeft: 0,
                              color: '#6d6b6c',
                            }}
                            placeholder={'Vehicle Type'}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor={'#6d6b6c'}
                            ref={input => {
                              this.email_input = input;
                            }}
                            onChangeText={vehicleType => this.setState({ vehicleType })}
                          /> */}
                          {/* <View
                            style={{
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              width: '10%',
                              paddingBottom: 8,
                            }}>
                            <Image
                              source={require('../../../assets/arrow_dropdown.png')}
                              style={{ width: 22, height: 22, tintColor: '#6d6b6c' }}
                            />
                          </View> */}
                          <DropDownPicker
                            items={[
                              { label: 'Bike', value: 'Bike' },
                              { label: 'Car', value: 'Car'  },
                              { label: 'Bus', value: 'Bus' },
                            ]}
                            defaultValue={this.state.vehicleType}
                            containerStyle={{ height: 40, width:'100%' }}
                            style={{ backgroundColor: '#fff', borderColor:'#fff', paddingHorizontal:0 }}
                            itemStyle={{
                              paddingHorizontal:0,
                              marginHorizontal:0
                               
                            }}
                            labelStyle={{
                              fontSize:16,
                              fontFamily:'Roboto-Light',
                              color:'#6d6b6c',
                      
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa', borderRadius:6 }}
                            onChangeItem={item => this.setState({
                              vehicleType: item.value
                            })}
                          />
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
                            placeholder={'Vehicle Number'}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor={'#6d6b6c'}
                            ref={input => {
                              this.vehicle_number = input;
                            }}
                            onChangeText={vehicleNumber => this.setState({ vehicleNumber })}
                          />

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
                            placeholder={'Vehicle Registration Number'}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor={'#6d6b6c'}
                            ref={input => {
                              this.vehicle_regNumber = input;
                            }}
                            onChangeText={vehicleRegistrationNumber => this.setState({ vehicleRegistrationNumber })}
                          />
                        </View>

                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            backgroundColor: '#6d6b6c',
                          }}
                        />
                      </View>
                    ) : null}

                    {/* <View style={{width:'100%',height:1,backgroundColor:'grey'}}/> */}

                    <View
                      style={{
                        width: '100%',
                        height: 0.5,
                        backgroundColor: '#6d6b6c',
                      }}
                    />

                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => this.doTermsCheck()}>
                        <View style={{ flexDirection: 'row' }}>
                          {this.state.isTermsCheck ? (
                            <Image
                              source={require('../../../assets/check.png')}
                              style={{
                                width: 22,
                                height: 22,
                                tintColor: '#6d6b6c',
                              }}
                            />
                          ) : (
                              <Image
                                source={require('../../../assets/uncheck.png')}
                                style={{
                                  width: 22,
                                  height: 22,
                                  tintColor: '#6d6b6c',
                                }}
                              />
                            )}
                          <Text
                            style={{
                              alignSelf: 'center',
                              marginLeft: 8,
                              fontFamily: 'Roboto-Regular',
                              color: '#6d6b6c',
                            }}>
                            I agree to theTerms and Condition</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 20, fontSize: 16, color: '#6d6b6c', alignSelf: 'center', width: 200 }}>
                      <Button title="Signup for Free" onClick={this.onButtonClick} />
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
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
