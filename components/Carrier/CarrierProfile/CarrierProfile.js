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
  Dimensions,
  SafeAreaView,
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import Apis from '../../../Services/apis';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Button from '../../Reusables/Button';

import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
} from '../../../Services/constant';
import CommonToast from '../../../views/common-toast';
import {BoxShadow} from 'react-native-shadow';
import Hud from '../../../views/hud';
import Shadow from 'react-native-simple-shadow-view';
import {CountryArray} from '../../../models/countrylist';

const {width, height} = Dimensions.get('window');

export default class CarrierProfile extends Component {
  constructor(props) {
    super(props);
    //console.warn('li',CountryArray)
    this.state = {
      name: '',
      email: '',
      mobile: '',
      address: '',
      lat: '',
      long: '',
      isIndividual: true,
      business_name: '',
      contact_person_name: '',
      isApiCalling: true,
      filePath: '',
      dataImage: '',
      source: null,
      imgFromApi: '',
      countryImg: require('../../../assets/kenya.png'),
      countryName: 'KE',
      countryCode: '+254',
      isoCode: 'KE',
      paypalEmailId: '',
      mPesaMobileNo: '',
    };
  }
  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('profile_pic', {
      name: this.state.filePath.fileName,
      type: this.state.filePath.type,
      uri:
        Platform.OS === 'android'
          ? this.state.filePath.uri
          : this.state.filePath.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    console.warn('oka data ===> ' + JSON.stringify(data));

    return data;
  };

  componentDidMount() {
    this.getProfileData();
  }
  onButtonClick = () => {
    this.updateProfile();
  };
  async getProfileData() {
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    await Apis.getProfileDetails('', userid)
      .then(async res => {
        console.warn('Rwes', res);
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          if (userbusinesstype != null && userbusinesstype == '1') {
            if (res.data.mobile_no.indexOf('+') > -1) {
              //console.warn('ii','ll')
              let c_code = res.data.mobile_no.split('-');
              const d_data = CountryArray.find(item => {
                return item.code == c_code[0];
              });
              console.warn('ii', d_data);
              this.setState({
                isIndividual: true,
                email: res.data.email,
                mobile: c_code[1],
                address: res.data.address,
                name: res.data.name,
                isApiCalling: false,
                imgFromApi: res.data.profile_pic,
                countryImg: d_data.img,
                countryName: d_data.name,
                countryCode: d_data.code,
                isoCode: d_data.iso,
                paypalEmailId: res.data.paypal_email_id,
                mPesaMobileNo: res.data.mpesa_mobile_no,
              });
            } else {
              this.setState({
                isIndividual: true,
                email: res.data.email,
                mobile: res.data.mobile_no,
                address: res.data.address,
                name: res.data.name,
                isApiCalling: false,
                imgFromApi: res.data.profile_pic,
                paypalEmailId: res.data.paypal_email_id,
                mPesaMobileNo: res.data.mpesa_mobile_no,
              });
            }
          } else {
            if (res.data.mobile_no.indexOf('+') > -1) {
              //console.warn('ii','ll')
              let c_code = res.data.mobile_no.split('-');
              const d_data = CountryArray.find(item => {
                return item.code == c_code[0];
              });
              console.warn('ii', d_data);
              this.setState({
                isIndividual: false,
                imgFromApi: res.data.profile_pic,
                email: res.data.email,
                mobile: c_code[1],
                address: res.data.address,
                business_name: res.data.business_name,
                contact_person_name: res.data.contact_person_name,
                isApiCalling: false,
                countryImg: d_data.img,
                countryName: d_data.name,
                countryCode: d_data.code,
                isoCode: d_data.iso,
                paypalEmailId: res.data.paypal_email_id,
                mPesaMobileNo: res.data.mpesa_mobile_no,
              });
            } else {
              this.setState({
                isIndividual: false,
                imgFromApi: res.data.profile_pic,
                email: res.data.email,
                mobile: res.data.mobile_no,
                address: res.data.address,
                business_name: res.data.business_name,
                contact_person_name: res.data.contact_person_name,
                isApiCalling: false,
                paypalEmailId: res.data.paypal_email_id,
                mPesaMobileNo: res.data.mpesa_mobile_no,
              });
            }
          }
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  async updateProfile() {
    if (this.state.isIndividual) {
      if (this.state.name.trim() == '') {
        this.name_input.focus();
        CommonToast.showToast('Please enter name', 'error');

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
    }
    if (this.state.mobile.trim() == '') {
      this.mobile_input.focus();
      CommonToast.showToast('Please enter phone number', 'error');
      return;
    }
    // if (!this.validatePhoneNumber()) {
    //   this.mobile_input.focus();
    //   CommonToast.showToast('Please enter a valid phone number', 'error');

    //   return;
    // }
    if (this.state.address.trim() == '') {
      this.address_input.focus();
      CommonToast.showToast('Please enter address', 'error');
      return;
    }

    if (
      this.state.paypalEmailId.trim() == '' &&
      this.state.mPesaMobileNo.trim() == ''
    ) {
      // this.address_input.focus();
      CommonToast.showToast(
        'Please enter paypal email id or mpesa mobile no',
        'error',
      );
      return;
    }

    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    const data = {
      users_id: userid,
      email: this.state.email,
      mobile_no: this.state.countryCode + '-' + this.state.mobile,
      address: this.state.address,
      name: this.state.name,
      lat: this.state.lat,
      lon: this.state.long,
      paypal_email_id: this.state.paypalEmailId,
      mpesa_mobile_no: this.state.mPesaMobileNo,
    };

    const data1 = {
      business_name: this.state.business_name,
      contact_person_name: this.state.contact_person_name,
      users_id: userid,
      email: this.state.email,
      mobile_no: this.state.countryCode + '-' + this.state.mobile,
      address: this.state.address,
      lat: this.state.lat,
      lon: this.state.long,
      paypal_email_id: this.state.paypalEmailId,
      mpesa_mobile_no: this.state.mPesaMobileNo,
    };
    Hud.showHud();
    Keyboard.dismiss();
    console.warn('userdid ', userid);
    await Apis.updateProfile(this.state.isIndividual ? data : data1)
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        console.warn('dataaaa  ', response.data);

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: response,
          dataImage: response.data,
          source: source,
        });
        console.warn('pathhh', response.uri);
        console.warn('pathhh4444', response);
        //console.warn('555',response.type)

        this.uploadImageToServer();
      }
    });
  }

  async uploadImageToServer() {
    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    console.log('filename', this.state.filePath.fileName);

    var form = new FormData();
    //let formdata = new FormData();
    form.append('users_id', userid);
    form.append('profile_pic', {
      uri: this.state.filePath.uri,
      name: this.state.filePath.fileName,
      type: this.state.filePath.type,
    });
    //formdata.append('profile_pic' , this.state.source)

    console.warn('form===>' + JSON.stringify(form));

    fetch(
      'http://mydevfactory.com/~shreya/ugavi_africa/Api/uploadProfileImage',
      {
        method: 'post',
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: form,
      },
    )
      .then(res => res.json())
      .then(res => {
        console.warn('resss', res);
        Hud.hideHud();
        if (res.status == '1') {
          CommonToast.showToast('Photo has been uploaded', 'success');
          this.setState({
            filePath: '',
            imgFromApi: res.data,
          });
        }
      })
      .catch(err => {
        console.error('error uploading images: ', err);
      });
  }

  validatePhoneNumber = () => {
    //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    var regexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return regexp.test(this.state.mobile);
  };
  validateEmail = () => {
    var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexp.test(this.state.email);
  };

  navigateToCountry() {
    this.props.navigation.navigate('ChooseCountryCode', {
      callBackFromCountry: this.updateCountry,
    });
  }

  updateCountry = async (image, name, code, iso) => {
    console.warn('gg', image + 'and' + name + 'and' + code);
    this.setState({
      countryImg: image,
      countryName: name,
      countryCode: code,
      isoCode: iso,
    });
  };
  doNavigateToPlaceSearch() {
    this.props.navigation.navigate('PlacesSearch', {
      backFunc: this.updateLatLong,
    });
  }

  updateLatLong = places => {
    console.warn('back here', places);
    this.setState({
      lat: places.result.geometry.location.lat,
      long: places.result.geometry.location.lng,
      address: places.result.formatted_address,
    });
  };

  render() {
    // if(this.state.isApiCalling){
    //     return(
    //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

    //             <ActivityIndicator
    //                animating = {true}
    //                color = '#e13b5a'
    //                size = "large"
    //                style={{}}
    //                />

    //         </View>
    //     )
    // }
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <CarrierHeader
            navProps={this.props.navigation}
            title={'Profile Management'}
          />
          <View
            style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            {this.state.isApiCalling ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator
                  animating={true}
                  color="#e13b5a"
                  size="large"
                  style={{}}
                />
              </View>
            ) : (
              <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.4)'}}>
                <ScrollView
                  style={{flex: 1}}
                  contentcontainerstyle={{paddingBottom: 20}}
                  keyboardShouldPersistTaps="handled">
                  <View
                    style={{marginTop: 20, marginLeft: 25, marginRight: 25}}>
                    <View
                      style={{
                        width: 115,
                        height: 110,
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        borderTopLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        elevation: 3,
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        shadowOffset: {height: 0, width: 0},
                      }}>
                      <TouchableOpacity
                        style={{width: 115, height: 110}}
                        onPress={() => this.selectPhotoTapped()}>
                        {this.state.imgFromApi != null &&
                        this.state.imgFromApi != '' &&
                        this.state.imgFromApi != 'null' ? (
                          <View style={{width: 115, height: 110}}>
                            <Image
                              source={{
                                uri:
                                  this.state.filePath != null &&
                                  this.state.filePath != ''
                                    ? this.state.filePath.uri
                                    : this.state.imgFromApi,
                              }}
                              style={{
                                width: 115,
                                height: 110,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                              }}
                            />
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 115,
                              height: 110,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../../../assets/user2.png')}
                              style={{
                                width: 50,
                                height: 50,
                                alignSelf: 'center',
                              }}
                              resizeMode={'contain'}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                width: 115,
                                height: 110,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor: 'white',
                                  borderRadius: 15,
                                  marginTop: height / 12,
                                  elevation: 0,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../../assets/plus.png')}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    alignSelf: 'center',
                                  }}
                                  resizeMode={'contain'}
                                />
                              </View>
                            </View>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>

                    {this.state.isIndividual ? (
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
                            placeholder={'Name'}
                            placeholderTextColor={'#6d6b6c'}
                            ref={input => {
                              this.name_input = input;
                            }}
                            onChangeText={name => this.setState({name})}
                            value={this.state.name}
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
                            value={this.state.business_name}
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
                            placeholder={'Contact Person Name'}
                            placeholderTextColor={'#6d6b6c'}
                            value={this.state.contact_person_name}
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
                      </View>
                    )}

                    {/* <View style={{width:'100%',height:0.5,backgroundColor:'#6d6b6c'}}/> */}
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
                        editable={false}
                        value={this.state.email}
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
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingBottom: 8,
                        }}>
                        <View style={{flexDirection: 'row'}}>
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
                        </View>

                        <View style={{width: '60%'}}>
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
                            placeholder={'Mobile'}
                            placeholderTextColor={'#6d6b6c'}
                            value={this.state.mobile}
                            ref={input => {
                              this.mobile_input = input;
                            }}
                            onChangeText={mobile => this.setState({mobile})}
                          />
                        </View>
                      </View>
                      {/* <TextInput
                            style={{width:'90%',fontFamily:'Roboto-Light',fontSize:16,paddingBottom:8,paddingTop:0,paddingLeft:0,color:'#6d6b6c'}}
                            placeholder={'Mobile'}
                            placeholderTextColor={'#6d6b6c'}
                            value={this.state.mobile}
                            ref={input=>{this.mobile_input=input}}
                            onChangeText={(mobile)=>this.setState({mobile})}
                        />
                        <View style={{alignItems:'flex-end',justifyContent:'center',width:'10%',paddingBottom:8}}>
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
                            editable={false}
                            value={this.state.address}
                            selection={{start: 0}}
                            placeholderTextColor={'#6d6b6c'}
                            ref={input => {
                              this.address_input = input;
                            }}
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
                      {/* <TextInput
                        style={{width:'90%',fontFamily:'Roboto-Light',fontSize:16,paddingBottom:8,paddingTop:0,paddingLeft:0,color:'#6d6b6c'}}
                        placeholder={'Address'}
                        placeholderTextColor={'#6d6b6c'}
                        value={this.state.address}
                        selection={{start:0}}
                        ref={input=>{this.address_input=input}}
                        onChangeText={(address)=>this.setState({address})}
                    />
                    <View style={{alignItems:'flex-end',justifyContent:'center',width:'10%',paddingBottom:8}}>
                    <Image source={require('../../../assets/location.png')} style={{width:22,height:22,tintColor:'#6d6b6c'}}/>

                    </View> */}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 0.5,
                        backgroundColor: '#6d6b6c',
                      }}
                    />
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
                          autoCapitalize="none"
                          keyboardType="email-address"
                          placeholder={'Paypal Email-Id'}
                          placeholderTextColor={'#6d6b6c'}
                          // ref={input => {
                          //   this.name_input = input;
                          // }}
                          onChangeText={paypalEmailId =>
                            this.setState({paypalEmailId})
                          }
                          value={this.state.paypalEmailId}
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          {/* <Image
                            source={require('../../../assets/user1.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
                          /> */}
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
                          placeholder={'Mpesa Mobile No'}
                          placeholderTextColor={'#6d6b6c'}
                          keyboardType="number-pad"
                          // ref={input => {
                          //   this.name_input = input;
                          // }}
                          onChangeText={mPesaMobileNo =>
                            this.setState({mPesaMobileNo})
                          }
                          value={this.state.mPesaMobileNo}
                        />
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '10%',
                            paddingBottom: 8,
                          }}>
                          {/* <Image
                            source={require('../../../assets/user1.png')}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: '#6d6b6c',
                            }}
                          /> */}
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

                    <View style={{marginTop: height / 14}}>
                      <Button title="SAVE" onClick={this.onButtonClick} />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        marginTop: 20,
                        marginBottom: height / 10,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.jumpTo('ChangePassword')
                        }>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: 16,
                            color: '#6d6b6c',
                            alignSelf: 'center',
                            textDecorationLine: 'underline',
                          }}>
                          Change Password
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnTextStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
