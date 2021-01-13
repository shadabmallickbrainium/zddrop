import React, {Component} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import {BoxShadow} from 'react-native-shadow';
import Hud from '../../../views/hud';
import Shadow from 'react-native-simple-shadow-view';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import PlacesInput from 'react-native-places-input';
import DeviceInfo from 'react-native-device-info';
import Button from '../../Reusables/Button';

import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  FCM_TOKEN,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
} from '../../../Services/constant';
const {width, height} = Dimensions.get('window');
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
  style: {justifyContent: 'center'},
};

export default class CarrierRegistration extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      isIndividual: true,
      isBusiness: false,
      radio_checked_img: require('../../../assets/radio_checked.png'),
      radio_unchecked_img: require('../../../assets/radio_unchecked.png'),
      isTermsCheck: false,
      name: '',
      last_name: '',
      email: '',
      password: '',
      confirmpassword: '',
      mobile: '',
      address: '',
      contact_person_name: '',
      contact_person_last_name: '',
      business_name: '',
      isAddressClicked: false,
      lat: '',
      long: '',
      price: '',
      countryImg: require('../../../assets/kenya.png'),
      countryName: 'KE',
      countryCode: '+254',
      isoCode: 'KE',
    };
  }

  businessRadioClikced() {
    this.setState({
      isIndividual: false,
      isBusiness: true,
    });
  }
  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress
    // console.warn('deviceid', DeviceInfo.getUniqueId());
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
    this.props.navigation.navigate('CarrierLogin');

    // this.props.navigation.navigate('Dashboard')

    return true;
  }

  individualRadioClicked() {
    this.setState({
      isIndividual: true,
      isBusiness: false,
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

  updateLatLong = places => {
    //console.warn('back here',places)
    this.setState({
      lat: places.result.geometry.location.lat,
      long: places.result.geometry.location.lng,
      address: places.result.formatted_address,
    });
  };

  async doRegister() {
    //Hud.showHud()
    const fcm_token = await AsyncStorage.getItem(FCM_TOKEN);
    const deviceType = Platform.OS.substr(0, 1).toUpperCase();
    // console.warn('devicetype', deviceType);

    if (this.state.isIndividual) {
      if (this.state.name.trim() == '') {
        this.name_input.focus();
        CommonToast.showToast('Please enter name', 'error');

        return;
      }
      if (this.state.last_name.trim() == '') {
        this.name_input.focus();
        CommonToast.showToast('Please enter last name', 'error');

        return;
      }
    }

    if (!this.state.isIndividual) {
      if (this.state.business_name.trim() == '') {
        this.business_name_input.focus();
        CommonToast.showToast('Please enter buisness name', 'error');

        return;
      }
      if (this.state.contact_person_name.trim() == '') {
        this.contact_person_input.focus();
        CommonToast.showToast('Please enter contact person name', 'error');
        return;
      }
      if (this.state.contact_person_last_name.trim() == '') {
        this.contact_person_input.focus();
        CommonToast.showToast('Please enter contact person last name', 'error');
        return;
      }
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
    if (this.state.confirmpassword.trim() == '') {
      this.cpassword_input.focus();
      CommonToast.showToast('Please enter confirm password', 'error');
      return;
    }

    if (this.state.password != this.state.confirmpassword) {
      this.cpassword_input.focus();
      CommonToast.showToast('Password did not match', 'error');
      return;
    }
    if (this.state.mobile.trim() == '') {
      this.mobile_input.focus();
      CommonToast.showToast('Please enter phone number', 'error');
      return;
    }
    // if(!this.validatePhoneNumber()){
    //     this.mobile_input.focus()
    //     CommonToast.showToast('Please enter a valid phone number','error')

    //     return
    //  }
    //  if(this.state.price==''){
    //     this.price_input.focus()
    //     CommonToast.showToast('Please enter a price','error')

    //     return
    //  }
    /*if (this.state.address.trim() == '') {
      this.address_input.focus();
      CommonToast.showToast('Please enter address', 'error');
      return;
    }*/

    if (!this.state.isTermsCheck) {
      CommonToast.showToast('Please accept terms and condition', 'error');
      return;
    }

    /*const data = {
      //user_type: '2',
      //name: this.state.name,
      //email: this.state.email,
      //password: this.state.password,
      //mobile_no: this.state.countryCode + '-' + this.state.mobile,
      //address: this.state.address,
      //user_business_type: '1',
      //price: this.state.price,
      //lat: this.state.lat,
      //lon: this.state.long,
      //device_id: DeviceInfo.getUniqueId(),
      //device_token: fcm_token != null && fcm_token != '' ? fcm_token : '',
      //device_type: deviceType,
    };

    const data1 = {
      user_type: '2',
      business_name: this.state.business_name,
      contact_person_name: this.state.contact_person_name,
      email: this.state.email,
      password: this.state.password,
      mobile_no: this.state.countryCode + '-' + this.state.mobile,
      address: this.state.address,
      user_business_type: '2',
      price: this.state.price,
      lat: this.state.lat,
      lon: this.state.long,
      device_id: DeviceInfo.getUniqueId(),
      device_token: fcm_token != null && fcm_token != '' ? fcm_token : '',
      device_type: deviceType,
    };*/
    const data = {
      firstname: this.state.name,
      lastname: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      device_id: DeviceInfo.getUniqueId(),
      device_token: fcm_token != null && fcm_token != '' ? fcm_token : '',
      device_type: deviceType,
      mobile_no: this.state.mobile,
      address: this.state.address,
      user_business_type:"1",
      shop_url:"",
      shop_title: ""
    };

    const data1 = {
      firstname: this.state.contact_person_name,
      lastname: this.state.contact_person_last_name,
      email: this.state.email,
      password: this.state.password,
      device_id: DeviceInfo.getUniqueId(),
      device_token: fcm_token != null && fcm_token != '' ? fcm_token : '',
      device_type: deviceType,
      mobile_no: this.state.mobile,
      address: this.state.address,
      user_business_type:"2",
      shop_url:"myshop",
      shop_title: this.state.business_name
    };

    // console.warn('data1data1', data);
    Hud.showHud();
    Keyboard.dismiss();
    await Apis.registration(this.state.isIndividual ? data : data1)
    //await Apis.registration(data)
      .then(async res => {
        // console.warn('registrationuser', res);
        if (res.status == true) {
          Hud.hideHud();
          this.props.navigation.navigate('CarrierLogin');
        }
        else {
          Hud.hideHud();
          CommonToast.showToast(res.message, 'error');
        }
        /*if (res.status == '1') {
          console.warn('id', 'kk');
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

  validatePhoneNumber = () => {
    let ch = false;
    let value = this.state.countryCode + this.state.mobile;
    // console.warn('jj', this.state.countryCode + this.state.mobile);
    if (value.length >= 13) {
      ch = true;
    } else {
      ch = false;
    }
    return ch;
    //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    // var regexp=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    // return regexp.test(this.state.countryCode+this.state.mobile)
  };
  validateEmail = () => {
    var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexp.test(this.state.email);
  };
  doTermsCheck() {
    this.setState({
      isTermsCheck: !this.state.isTermsCheck,
    });
  }

  navigateToCountry() {
    this.props.navigation.navigate('ChooseCountryCode', {
      callBackFromCountry: this.updateCountry,
    });
  }

  updateCountry = async (image, name, code, iso) => {
    // console.warn('gg', image + 'and' + name + 'and' + code);
    this.setState({
      countryImg: image,
      countryName: name,
      countryCode: code,
      isoCode: iso,
    });
  };

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/bg1.jpg')}
        style={styles.MainContainer}>
        <SafeAreaView style={{flex: 1}}>
        <CarrierHeader
              navProps={this.props.navigation}
              title={'Registration'}
            />
          {this.state.isAddressClicked ? (
            <View style={{flex: 1}}>
              <View style={{width: '100%'}}>
                {/* <PlacesInput
                                    googleApiKey={'AIzaSyDe6XZ8YcsHoos4g8ce4d4VDA7WU8B_wd8'}
                                    placeHolder={"Search"}
                                    language={"en-US"}
                                    onSelect={place => {
                                        //console.warn('resss',place)
                                        const result1=place;
                                        console.warn('hhi',result1)
                                        console.warn('hh',result1.result.geometry.location.lat)
                                        //this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
                                    }}
                                    //iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
                                /> */}
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                // backgroundColor: 'rgba(255,255,255,0.4)',
                alignItems: 'center',
              }}>
              {/* <Image source={require('../../../assets/ugavi_logo.png')} style={{width:130,height:130,marginTop:10}} /> */}
              {/* <CarrierHeader navProps={this.props.navigation} title={'Dashboard'}/> */}

              <ScrollView
                style={{}}
                contentcontainerstyle={{paddingBottom: 20}}
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
                    marginTop: 20,borderRadius:20,padding:15,backgroundColor : "white",marginBottom:30
                  }}>
                  <View style={{flexDirection: 'row' }}>
                    <View style={{width: '50%', flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() => this.individualRadioClicked()}>
                        <View style={{width: '50%', flexDirection: 'row'}}>
                          {this.state.isIndividual ? (
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
                            Customer
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={{width: '50%', flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() => this.businessRadioClikced()}>
                        <View style={{width: '50%', flexDirection: 'row'}}>
                          {this.state.isBusiness ? (
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
                            Business
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {this.state.isIndividual ? (
                    <View>
                    <View style={{width: '100%'}}>
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
                          placeholder={'First Name'}
                          placeholderTextColor={'#6d6b6c'}
                          ref={input => {
                            this.name_input = input;
                          }}
                          onChangeText={name => this.setState({name})}
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/user1.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
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
                    </View>

                    <View style={{width: '100%'}}>
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
                          placeholder={'Last Name'}
                          placeholderTextColor={'#6d6b6c'}
                          ref={input => {
                            this.name_input = input;
                          }}
                          onChangeText={last_name => this.setState({last_name})}
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/user1.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
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
                    </View>
                    </View>
                    
                  ) : (
                    <View style={{width: '100%'}}>
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
                          placeholder={'Business Name'}
                          placeholderTextColor={'#6d6b6c'}
                          ref={input => {
                            this.business_name_input = input;
                          }}
                          onChangeText={business_name =>
                            this.setState({business_name})
                          }
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/work.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
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
                          placeholder={'Contact Person First Name'}
                          placeholderTextColor={'#6d6b6c'}
                          ref={input => {
                            this.contact_person_input = input;
                          }}
                          onChangeText={contact_person_name =>
                            this.setState({contact_person_name})
                          }
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/user1.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
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
                          placeholder={'Contact Person Last Name'}
                          placeholderTextColor={'#6d6b6c'}
                          ref={input => {
                            this.contact_person_input = input;
                          }}
                          onChangeText={contact_person_last_name =>
                            this.setState({contact_person_last_name})
                          }
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/user1.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
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
                    </View>
                  )}

                  {/* <View style={{width:'100%',height:1,backgroundColor:'grey'}}/> */}

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
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholderTextColor={'#6d6b6c'}
                      ref={input => {
                        this.email_input = input;
                      }}
                      onChangeText={email => this.setState({email})}
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
                        style={{width: 22, height: 22, tintColor: '#6d6b6c'}}
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
                      secureTextEntry={true}
                      ref={input => {
                        this.password_input = input;
                      }}
                      onChangeText={password => this.setState({password})}
                    />
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        width: '10%',
                        paddingBottom: 8,
                      }}>
                      <Image
                        source={require('../../../assets/unlock.png')}
                        style={{width: 22, height: 22, tintColor: '#6d6b6c'}}
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
                      placeholder={'Confirm password'}
                      secureTextEntry={true}
                      placeholderTextColor={'#6d6b6c'}
                      ref={input => {
                        this.cpassword_input = input;
                      }}
                      onChangeText={confirmpassword =>
                        this.setState({confirmpassword})
                      }
                    />
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        width: '10%',
                        paddingBottom: 8,
                      }}>
                      <Image
                        source={require('../../../assets/unlock.png')}
                        style={{width: 22, height: 22, tintColor: '#6d6b6c'}}
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
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 8,
                      }}>
                      {/* <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={() => this.navigateToCountry()}>
                          <Image
                            source={this.state.countryImg}
                            style={{width: 26, height: 20}}
                          />
                          <Image
                            source={require('../../../assets/arrow_dropdown.png')}
                            style={{width: 20, height: 20}}
                          />
                          <Text
                            style={{
                              fontFamily: 'Roboto-Regular',
                              fontSize: 16,
                              color: 'black',
                            }}>
                            {this.state.isoCode}
                          </Text>

                          <Text
                            style={{
                              fontFamily: 'Roboto-Regular',
                              fontSize: 16,
                              color: 'black',
                              marginLeft: 5,
                            }}>
                            {this.state.countryCode}
                          </Text>
                        </TouchableOpacity>
                      </View> */}

                      <View style={{width: '100%', flexDirection: 'row'}}>
                        <TextInput
                          style={{
                            flex: 1,
                            fontFamily: 'Roboto-Light',
                            fontSize: 16,
                            paddingTop: 0,
                            paddingLeft: 0,
                            color: '#6d6b6c',
                            marginLeft: 5,
                            paddingBottom: 0,
                            paddingRight: 0,
                          }}
                          placeholder={'Mobile Number'}
                          keyboardType="number-pad"
                          placeholderTextColor={'#6d6b6c'}
                          ref={input => {
                            this.mobile_input = input;
                          }}
                          onChangeText={mobile => this.setState({mobile})}
                        />


                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/phone.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
                          />
                        </View>
                      </View>
                    </View>
                    {/* <TextInput
                            style={{fontFamily:'Roboto-Light',fontSize:16,paddingBottom:8,paddingTop:0,paddingLeft:0,color:'#6d6b6c'}}
                            placeholder={'Mobile'}
                            placeholderTextColor={'#6d6b6c'}
                            ref={input=>{this.mobile_input=input}}
                            onChangeText={(mobile)=>this.setState({mobile})}
                        /> */}
                    {/* <View style={{alignItems:'flex-end',justifyContent:'center',width:'10%',paddingBottom:8}}>
                        <Image source={require('../../../assets/phone.png')} style={{width:22,height:22,tintColor:'#6d6b6c'}}/>

                        </View> */}
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      backgroundColor: '#6d6b6c',
                    }}
                  />

                  {/* <View style={{width:'100%',flexDirection:'row',marginTop:20}}>
                        <TextInput
                            style={{width:'90%',fontFamily:'Roboto-Light',fontSize:16,paddingBottom:8,paddingTop:0,paddingLeft:0,color:'#6d6b6c'}}
                            placeholder={'Price per hour in dollar'}
                            placeholderTextColor={'#6d6b6c'}
                            ref={input=>{this.price_input=input}}
                            onChangeText={(price)=>this.setState({price})}
                        />
                        <View style={{alignItems:'flex-end',justifyContent:'center',width:'10%',paddingBottom:8}}>
                        <Image source={require('../../../assets/sale.png')} style={{width:22,height:22,tintColor:'#6d6b6c'}}/>

                        </View>
                     </View>

                     <View style={{width:'100%',height:0.5,backgroundColor:'#6d6b6c'}}/> */}

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.doNavigateToPlaceSearch()}>
                      <View style={{width: '100%', flexDirection: 'row'}}>
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
                          placeholder={'Address'}
                          placeholderTextColor={'#6d6b6c'}
                          ref={input => {
                            this.address_input = input;
                          }}
                          editable={false}
                          selection={{start: 0}}
                          value={this.state.address}
                          onChangeText={address => this.setState({address})}
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/location.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      backgroundColor: '#6d6b6c',
                    }}
                  />

                  <View style={{marginTop: 20, flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => this.doTermsCheck()}>
                      <View style={{flexDirection: 'row'}}>
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
                          I agree to theTerms and Condition
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: 20,fontSize: 16,color: '#6d6b6c',alignSelf: 'center',width:200}}>
                    <Button title="Sign Up" onClick={this.onButtonClick} />
                  </View>

                  <View style={{width: '100%',color:'#2a2a2a', marginTop: 20}}>
                      <Text
                        style={{fontFamily: 'Roboto-Regular', fontSize: 22,color: '#6d6b6c',alignSelf: 'center'}}>
                        Or
                      </Text>
                  </View>
                  <View style={{width: '100%',color:'#2a2a2a', marginTop: 20}}>
                      <Text
                        style={{fontFamily: 'Roboto-Regular',fontWeight: 'bold', fontSize: 16,color: '#000',alignSelf: 'center'}}>
                        Sign With
                      </Text>
                  </View>

                  <View style={{width: '100%',alignSelf: 'center',  color:'#2a2a2a', marginTop: 20,   justifyContent: 'center',
                      flexDirection: 'row',}}>
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
                        this.props.navigation.navigate('DriverRegistration')
                      }>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#6d6b6c', fontSize:16, color:'green'}}>
                          Register as a Driver
                        </Text>
                      </View>
                    </TouchableOpacity>
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
                        this.props.navigation.navigate('CarrierLogin')
                      }>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#6d6b6c'}}>
                          Already a carrier?
                        </Text>
                        <Text
                          style={{marginLeft: 5, fontFamily: 'Roboto-Bold'}}>
                          Sign In
                        </Text>
                      </View>
                    </TouchableOpacity>
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
