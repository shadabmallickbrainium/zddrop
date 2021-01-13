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
  USER_STATUS,
  SUBSCRIPTION_STATUS,
  USER_TOKEN,
  FIRST_NAME,
  LAST_NAME,
  EMAIL_ADDRESS,
  CREATED_AT,
} from '../../../Services/constant';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

var Spinner = require('react-native-spinkit');

const { width, height } = Dimensions.get('window');

export default class MyProfile extends Component {
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
      isUser: '',
      nameuser: '',
      datecreated: '',
      filePath: '',
      dataImage: '',
      source: null,
      imgFromApi: '',
    };
    this.doAuthentication();
  }

  async doAuthentication() {
    const userid = await AsyncStorage.getItem(USER_ID);
    const usertype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    const firstname = await AsyncStorage.getItem(FIRST_NAME);
    const lastname = await AsyncStorage.getItem(LAST_NAME);
    const created_at = await AsyncStorage.getItem(CREATED_AT);
    const datecreate = created_at.split(" ")[0];
    const name = firstname + " " + lastname;
    // console.warn("storageeeee 123", firstname, lastname);
    if (usertype == '1') {
      // redirect to my drawer
      //this.props.navigation.replace('MyProfile');
      this.setState({
        isUser: "1",
        nameuser: name,
        datecreated: datecreate,
      });
    }
    if (usertype == '2') {
      this.setState({
        isUser: "2",
        nameuser: name,
        datecreated: datecreate,
      });
    }
    if (usertype == '3') {
      this.setState({
        isUser: "3",
        nameuser: name,
        datecreated: datecreate,
      });
    }
  }

  componentDidMount() {
    this.doAuthentication()
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
    // BackHandler.exitApp();
    this.props.navigation.navigate('CarrierDashboard')
    return true;
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
        let source = { uri: response.uri };
        // console.warn('dataaaa  ', response.data);

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: response,
          dataImage: response.data,
          source: source,
        });
        // console.warn('pathhh', response.uri);
        // console.warn('pathhh4444', response);
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
    form.append('customer_image', {
      uri: this.state.filePath.uri,
      name: this.state.filePath.fileName,
      type: this.state.filePath.type,
    });
    //formdata.append('profile_pic' , this.state.source)

    // console.warn('form===>' + JSON.stringify(form));

    fetch(
      'http://dev.mydevmagento.com/zdropp/customer/Customerimage/index?customer_id=' + userid,
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
        // console.warn('resss', res);
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


  async processLogout() {
    // console.warn('logout');
    await AsyncStorage.removeItem(USER_ID)
    // await AsyncStorage.setItem(USER_TYPE, '');
    await AsyncStorage.removeItem(USER_TYPE);
    // await AsyncStorage.setItem(USER_BUSINESS_TYPE, '');
    await AsyncStorage.removeItem(USER_BUSINESS_TYPE);
    // await AsyncStorage.setItem(USER_STATUS, '');
    await AsyncStorage.removeItem(USER_STATUS);
    // await AsyncStorage.setItem(SUBSCRIPTION_STATUS, '');
    await AsyncStorage.removeItem(SUBSCRIPTION_STATUS);
    // await AsyncStorage.setItem(USER_TOKEN, '');
    await AsyncStorage.removeItem(USER_TOKEN);
    // await AsyncStorage.setItem(FIRST_NAME, '');
    await AsyncStorage.removeItem(FIRST_NAME);
    // await AsyncStorage.setItem(LAST_NAME, '');
    await AsyncStorage.removeItem(LAST_NAME);
    // await AsyncStorage.setItem(EMAIL_ADDRESS, '');
    await AsyncStorage.removeItem(EMAIL_ADDRESS);
    // await AsyncStorage.setItem(CREATED_AT, '');
    await AsyncStorage.removeItem(CREATED_AT);
    this.props.navigation.jumpTo('CarrierLogin');
  };

  /*async doLogout() {
    Alert.alert(
      //title
      'Logout',
      //body
      'Are you sure want to logout ?',
      [
        {text: 'Yes', onPress: this.processLogout},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  }*/
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
    this.processLogout();
  };

  render() {
    return (
      <ImageBackground
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, }}>
            <CarrierHeader
              navProps={this.props.navigation}
              title={'My Account'}
            />
            {this.state.isUser == '1' ? (
              <View style={{ flex: 1 }}>

                <View style={{
                  backgroundColor: '#', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}>


                  {/* <View
                     style={{
                       width: '100%',
                       flexDirection: 'row',
                       alignItems:"center"
                     }}>

                     <View  style={{flex:2}}>
                         <Text style={{fontWeight:'bold',  fontFamily: 'Roboto-Light',fontSize: 17,paddingBottom: 0,
                         paddingTop: 0,paddingLeft: 0,color: '#fff',
                       }}> My Account
                       </Text>
                     </View>
                     </View> */}

                  {/* <View
                   style={{
                     width: '100%',
                     flexDirection: 'row',
                     marginTop: 10,
                     backgroundColor:'#60b169',padding:10,
                     borderRadius:40
                   }}>
                   <TextInput
                     style={{
                      flex:2,
                       fontFamily: 'Roboto-Light',
                       fontSize: 16,
                       paddingBottom: 8,
                       paddingTop: 6,
                       paddingLeft: 10,
                       color: '#fff',
                     }}
                     placeholder={'Search'}
                     keyboardType="search_opt"
                     autoCapitalize="none"
                     placeholderTextColor={'#fff'}
                     ref={input => {
                       this.email_input = input;
                     }}
                     onChangeText={email => this.setState({email})}
                   />
                   <View
                     style={{
                       alignItems: 'flex-end',
                       justifyContent: 'center',
                       marginRight:5,
                     }}>
                     <Image
                       source={require('../../../assets/searcopt.png')}
                       style={{width: 22, height: 22 }}
                     />
                   </View>
                 </View> */}
                </View>

                <ScrollView
                  contentcontainerstyle={{ paddingBottom: 20 }}
                  keyboardShouldPersistTaps="handled">
                  <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 25, marginRight: 25, backgroundColor: "white", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderRadius: 8 }}>

                    <View style={{ width: 100, marginTop: 10, position: 'relative', color: '#2a2a2a', marginLeft: 'auto', alignSelf: 'center', marginRight: 'auto' }}>
                      <TouchableOpacity style={{ position: 'relative', width: 100, marginLeft: 'auto', marginRight: 'auto', zIndex: 1 }}>
                        <Image
                          source={require('../../../assets/profile_pic.png')}
                          style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                        />

                        <Image
                          source={require('../../../assets/edit.png')}
                          style={{ width: 50, height: 50, borderRadius: 40 / 2, position: "absolute", left: 68, top: 45 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', color: '#2a2a2a', marginTop: 10 }}>
                      <Text
                        style={{ fontWeight: "bold", fontFamily: 'Roboto-Regular', fontSize: 18, color: '#2a2a2a', alignSelf: 'center' }}>
                        {this.state.nameuser}
                      </Text>
                    </View>

                  </View>

                  <View style={{ marginTop: 12, marginBottom: 10, marginLeft: 25, marginRight: 25, backgroundColor: "white", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderRadius: 8 }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: "center"
                      }}>

                      <View style={{ flex: 2 }}>
                        <Text style={{
                          fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}> {this.state.datecreated}
                        </Text>
                        <Text style={{
                          fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}> Member Since
                       </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingBottom: 8,
                        }}>
                        <Image
                          source={require('../../../assets/member_login.png')}
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{
                    marginTop: 12, marginLeft: 25, marginBottom: 30, marginRight: 25, backgroundColor: "white",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 10,
                    padding: 15, borderRadius: 8
                  }}>

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/buying.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Buying
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/product.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>My Product</Text>

                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }} onPress={() => { this.props.navigation.navigate('CustomerMyFavorites') }} >

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/like.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          My Likes
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/helpcenter.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Help Center
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/recently_viewed.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Recently Viewed
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/setting.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Settings
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/setting.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Address Book
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* <View style={{width: '100%', marginTop: 20}}>
                     <TouchableOpacity>
                       <Text
                         style={{
                           fontFamily: 'Roboto-Regular',
                           fontSize: 16,
                           color: '#6d6b6c',
                           alignSelf: 'center',
                         }}>
                         Forgot Password
                       </Text>
                     </TouchableOpacity>
                   </View> */}

                    <View style={{ marginTop: 20 }}>
                      {this.state.isApiCalling ? (
                        <View
                          style={{
                            borderTopLeftRadius: 10,

                            borderBottomRightRadius: 10,
                            paddingTop: 13,
                            paddingBottom: 13,
                            backgroundColor: '#b0979c',
                          }}>
                          <Spinner
                            style={{ alignSelf: 'center' }}
                            isVisible={true}
                            size={30}
                            type={'ThreeBounce'}
                            color={'#e13b5a'}
                          />
                        </View>
                      ) : (
                          <View>
                            {/* <Button title="Change Password" style={{width: '100%', marginBottom: 20}}   /> */}
                            {/* <Button title="Logout" onClick={this.onButtonClick} /> */}
                          </View>

                        )}


                      <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', textAlign: 'center', width: 250, marginTop: 20 }} >
                        {/* <Button title="Change Password" style={{width: '100%', marginBottom: 20,     backgroundColor: '#fff',}}   /> */}

                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('ChangePassword')
                          }>
                          <View style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'center' }}>
                            <Text
                              style={{
                                marginLeft: 5, color: '#000', backgroundColor: "white", padding: 17, width: 250, textAlign: 'center', borderRadius: 60 / 2, fontFamily: 'Roboto-Bold', borderColor: 'black',
                                borderWidth: 2
                              }}>
                              Change Password
                         </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', width: 250, marginTop: 20 }} >
                        <Button title="Logout" onClick={this.onButtonClick} />
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            ) : this.state.isUser == '2' ? (
              <View style={{ flex: 1 }}>

                <View style={{
                  backgroundColor: '#', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30}}>
                </View>

                <ScrollView
                  contentcontainerstyle={{ paddingBottom: 20 }}
                  keyboardShouldPersistTaps="handled">
                  <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 25, marginRight: 25, backgroundColor: "white", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderRadius: 8 }}>
                    <View style={{ width: 100, marginTop: 10, position: 'relative', color: '#2a2a2a', marginLeft: 'auto', alignSelf: 'center', marginRight: 'auto' }}>
                      <TouchableOpacity style={{ position: 'relative', width: 100, marginLeft: 'auto', marginRight: 'auto', zIndex: 1 }}>
                        <Image
                          source={require('../../../assets/profile_pic.png')}
                          style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                        />
                        <Image
                          source={require('../../../assets/edit.png')}
                          style={{ width: 50, height: 50, borderRadius: 40 / 2, position: "absolute", left: 68, top: 45 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', color: '#2a2a2a', marginTop: 10 }}>
                      <Text
                        style={{ fontWeight: "bold", fontFamily: 'Roboto-Regular', fontSize: 18, color: '#2a2a2a', alignSelf: 'center' }}>
                        {this.state.nameuser}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection:'row', marginTop: 12, marginBottom: 10, marginLeft: 25, marginRight: 25, borderRadius: 8 }}>
                    <View
                      style={{
                        width: '48%',
                        flexDirection: 'row',
                        alignItems: "center",
                        backgroundColor:'white',
                        marginRight:'2%',
                        borderRadius: 8,
                        padding:10,shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10}}>

                      <View style={{ flex: 2 }}>
                        <Text style={{
                          fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}> No.1
                        </Text>
                        <Text style={{
                          fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>Seller Level</Text>
                      </View>

                      <View
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingBottom: 8,
                        }}>
                        <Image
                          source={require('../../../assets/member_login.png')}
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: '48%',
                        flexDirection: 'row',
                        alignItems: "center",
                        padding:10,
                        borderRadius: 8,
                        marginLeft:'2%',
                        backgroundColor:'white',
                        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10
                      }}>

                      <View style={{ flex: 2 }}>
                        <Text style={{
                          fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}> {this.state.datecreated}
                        </Text>
                        <Text style={{
                          fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}> Member Since
                       </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingBottom: 8,
                        }}>
                        <Image
                          source={require('../../../assets/badge.png')}
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{
                    marginTop: 12, marginLeft: 25, marginBottom: 30, marginRight: 25, backgroundColor: "white",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 10,
                    padding: 15, borderRadius: 8
                  }}>

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/buying.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Buying
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/product.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>My Product</Text>

                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }} onPress={() => { this.props.navigation.navigate('CustomerMyFavorites') }} >

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/like.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          My Likes
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/helpcenter.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Help Center
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/setting.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Settings
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    

                    {/* <View style={{width: '100%', marginTop: 20}}>
                     <TouchableOpacity>
                       <Text
                         style={{
                           fontFamily: 'Roboto-Regular',
                           fontSize: 16,
                           color: '#6d6b6c',
                           alignSelf: 'center',
                         }}>
                         Forgot Password
                       </Text>
                     </TouchableOpacity>
                   </View> */}

                    <View style={{ marginTop: 20 }}>
                      {this.state.isApiCalling ? (
                        <View
                          style={{
                            borderTopLeftRadius: 10,

                            borderBottomRightRadius: 10,
                            paddingTop: 13,
                            paddingBottom: 13,
                            backgroundColor: '#b0979c',
                          }}>
                          <Spinner
                            style={{ alignSelf: 'center' }}
                            isVisible={true}
                            size={30}
                            type={'ThreeBounce'}
                            color={'#e13b5a'}
                          />
                        </View>
                      ) : (
                          <View>
                            {/* <Button title="Change Password" style={{width: '100%', marginBottom: 20}}   /> */}
                            {/* <Button title="Logout" onClick={this.onButtonClick} /> */}
                          </View>

                        )}


                      <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', textAlign: 'center', width: 250, marginTop: 20 }} >
                        {/* <Button title="Change Password" style={{width: '100%', marginBottom: 20,     backgroundColor: '#fff',}}   /> */}

                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('ChangePassword')
                          }>
                          <View style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'center' }}>
                            <Text
                              style={{
                                marginLeft: 5, color: '#000', backgroundColor: "white", padding: 17, width: 250, textAlign: 'center', borderRadius: 60 / 2, fontFamily: 'Roboto-Bold', borderColor: 'black',
                                borderWidth: 2
                              }}>
                              Change Password
                         </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', width: 250, marginTop: 20 }} >
                        <Button title="Logout" onClick={this.onButtonClick} />
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            ) : this.state.isUser === '3' ? (
              <View style={{ flex: 1 }}>

                <View style={{
                  backgroundColor: '#', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30}}>
                </View>

                <ScrollView
                  contentcontainerstyle={{ paddingBottom: 20 }}
                  keyboardShouldPersistTaps="handled">
                  <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 25, marginRight: 25, backgroundColor: "white", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderRadius: 8 }}>
                    <View style={{ width: 100, marginTop: 10, position: 'relative', color: '#2a2a2a', marginLeft: 'auto', alignSelf: 'center', marginRight: 'auto' }}>
                      <TouchableOpacity style={{ position: 'relative', width: 100, marginLeft: 'auto', marginRight: 'auto', zIndex: 1 }}>
                        <Image
                          source={require('../../../assets/profile_pic.png')}
                          style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                        />
                        <Image
                          source={require('../../../assets/edit.png')}
                          style={{ width: 50, height: 50, borderRadius: 40 / 2, position: "absolute", left: 68, top: 45 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', color: '#2a2a2a', marginTop: 10 }}>
                      <Text
                        style={{ fontWeight: "bold", fontFamily: 'Roboto-Regular', fontSize: 18, color: '#2a2a2a', alignSelf: 'center' }}>
                        {this.state.nameuser}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection:'row', marginTop: 12, marginBottom: 10, marginLeft: 25, marginRight: 25, borderRadius: 8 }}>
                    <View
                      style={{
                        width: '48%',
                        flexDirection: 'row',
                        alignItems: "center",
                        backgroundColor:'white',
                        marginRight:'2%',
                        borderRadius: 8,
                        padding:10,shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10}}>

                      <View style={{ flex: 2 }}>
                        <Text style={{
                          fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}> No.1
                        </Text>
                        <Text style={{
                          fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>Driver Level</Text>
                      </View>

                      <View
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingBottom: 8,
                        }}>
                         <Image
                          source={require('../../../assets/member_login.png')}
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: '48%',
                        flexDirection: 'row',
                        alignItems: "center",
                        padding:10,
                        borderRadius: 8,
                        marginLeft:'2%',
                        backgroundColor:'white',
                        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10
                      }}>

                      <View style={{ flex: 2 }}>
                        <Text style={{
                          fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}> {this.state.datecreated}
                        </Text>
                        <Text style={{
                          fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}> Member Since
                       </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingBottom: 8,
                        }}>
                        <Image
                          source={require('../../../assets/badge.png')}
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{
                    marginTop: 12, marginLeft: 25, marginBottom: 30, marginRight: 25, backgroundColor: "white",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 10,
                    padding: 15, borderRadius: 8
                  }}>

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/buying.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Buying
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/product.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>My Deliveries</Text>

                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }} onPress={() => { this.props.navigation.navigate('CustomerMyFavorites') }} >

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/like.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          My Likes
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/helpcenter.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Help Center
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
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
                        marginTop: 12,
                        alignItems: "center"
                      }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/setting.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                          />
                        </View>

                        <Text style={{
                          flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                          paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                        }}>
                          Settings
                       </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                          }}>
                          <Image
                            source={require('../../../assets/arrow2.png')}
                            style={{ width: 8, height: 14 }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={{ marginTop: 20 }}>
                      {this.state.isApiCalling ? (
                        <View
                          style={{
                            borderTopLeftRadius: 10,

                            borderBottomRightRadius: 10,
                            paddingTop: 13,
                            paddingBottom: 13,
                            backgroundColor: '#b0979c',
                          }}>
                          <Spinner
                            style={{ alignSelf: 'center' }}
                            isVisible={true}
                            size={30}
                            type={'ThreeBounce'}
                            color={'#e13b5a'}
                          />
                        </View>
                      ) : (
                          <View>
                            {/* <Button title="Change Password" style={{width: '100%', marginBottom: 20}}   /> */}
                            {/* <Button title="Logout" onClick={this.onButtonClick} /> */}
                          </View>
                        )}


                      <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', textAlign: 'center', width: 250, marginTop: 20 }} >
                        {/* <Button title="Change Password" style={{width: '100%', marginBottom: 20,     backgroundColor: '#fff',}}   /> */}

                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('ChangePassword')
                          }>
                          <View style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'center' }}>
                            <Text
                              style={{
                                marginLeft: 5, color: '#000', backgroundColor: "white", padding: 17, width: 250, textAlign: 'center', borderRadius: 60 / 2, fontFamily: 'Roboto-Bold', borderColor: 'black',
                                borderWidth: 2
                              }}>
                              Change Password
                         </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', width: 250, marginTop: 20 }} >
                        <Button title="Logout" onClick={this.onButtonClick} />
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            ) : (
                  <View style={{ flex: 1 }}>
                    {/* <Image
                    source={require('../../../assets/ugavi_logo.png')}
                    style={{
                      width: 130,
                      height: 130,
                      alignSelf: 'center',
                      marginTop: height / 8,
                    }}
                  /> */}
                    <View style={{
                      backgroundColor: '#059d14',
                      marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 25,
                      borderBottomRightRadius: 25,
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
                          }}> My Account
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

                    <ScrollView
                      style={{}}
                      contentcontainerstyle={{ paddingBottom: 20 }}
                      keyboardShouldPersistTaps="handled">
                      <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 25, marginRight: 25, backgroundColor: "white", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderRadius: 8 }}>
                        <View style={{ width: 100, marginTop: 10, position: 'relative', color: '#2a2a2a', marginLeft: 'auto', alignSelf: 'center', marginRight: 'auto' }}>
                          <TouchableOpacity style={{ position: 'relative', width: 100, marginLeft: 'auto', marginRight: 'auto', zIndex: 1 }}>
                            <Image
                              source={require('../../../assets/profile_pic.png')}
                              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                            />
                            <Image
                              source={require('../../../assets/edit.png')}
                              style={{ width: 50, height: 50, borderRadius: 40 / 2, position: "absolute", left: 68, top: 45 }}
                            />
                          </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', color: '#2a2a2a', marginTop: 10 }}>
                          <Text
                            style={{ fontWeight: "bold", fontFamily: 'Roboto-Regular', fontSize: 18, color: '#2a2a2a', alignSelf: 'center' }}>
                            {this.state.nameuser}
                          </Text>
                        </View>
                      </View>

                      <View style={{ marginTop: 12, marginBottom: 10, marginLeft: 25, marginRight: 25, backgroundColor: "white", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderRadius: 8 }}>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: "center"
                          }}>

                          <View style={{ flex: 2 }}>
                            <Text style={{
                              fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                              paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                            }}> {this.state.datecreated}
                            </Text>
                            <Text style={{
                              fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                              paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                            }}> Member Since</Text>
                          </View>

                          <View
                            style={{
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              paddingBottom: 8,
                            }}>
                            <Image
                              source={require('../../../assets/member_login.png')}
                              style={{ width: 45, height: 45 }}
                            />
                          </View>

                        </View>
                      </View>

                      <View style={{
                        marginTop: 12, marginLeft: 25, marginBottom: 30, marginRight: 25, backgroundColor: "white",
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 10,
                        padding: 15, borderRadius: 8
                      }}>

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            marginTop: 12,
                            alignItems: "center"
                          }}>
                          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                            <View
                              style={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/buying.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                              />
                            </View>

                            <Text style={{
                              flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                              paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                            }}>Selling</Text>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/arrow2.png')}
                                style={{ width: 8, height: 14 }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            backgroundColor: '#6d6b6c'
                          }} />

                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            backgroundColor: '#6d6b6c'
                          }} />

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            marginTop: 12,
                            alignItems: "center"
                          }}>

                          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/product.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                              />
                            </View>

                            <Text style={{
                              flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                              paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                            }}>My Product</Text>

                            <View
                              style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/arrow2.png')}
                                style={{ width: 8, height: 14 }}
                              />
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
                            marginTop: 12,
                            alignItems: "center"
                          }}>
                          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/like.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                              />
                            </View>

                            <Text style={{
                              flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                              paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                            }}>My Likes</Text>

                            <View
                              style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/arrow2.png')}
                                style={{ width: 8, height: 14 }}
                              />
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
                            marginTop: 12,
                            alignItems: "center"
                          }}>
                          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                            <View
                              style={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/helpcenter.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                              />
                            </View>

                            <Text style={{
                              flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                              paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                            }}>
                              Help Center
                        </Text>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/arrow2.png')}
                                style={{ width: 8, height: 14 }}
                              />
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
                            marginTop: 12,
                            alignItems: "center"
                          }}>
                          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: "center" }}>

                            <View
                              style={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/setting.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                              />
                            </View>

                            <Text style={{
                              flex: 2, fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 8,
                              paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                            }}>
                              Settings
                        </Text>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                paddingBottom: 8,
                              }}>
                              <Image
                                source={require('../../../assets/arrow2.png')}
                                style={{ width: 8, height: 14 }}
                              />
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

                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            backgroundColor: '#6d6b6c',
                          }}
                        />






                        {/* <View style={{width: '100%', marginTop: 20}}>
                      <TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: 16,
                            color: '#6d6b6c',
                            alignSelf: 'center',
                          }}>
                          Forgot Password
                        </Text>
                      </TouchableOpacity>
                    </View> */}

                        <View style={{ marginTop: 20 }}>
                          {this.state.isApiCalling ? (
                            <View
                              style={{
                                borderTopLeftRadius: 10,

                                borderBottomRightRadius: 10,
                                paddingTop: 13,
                                paddingBottom: 13,
                                backgroundColor: '#b0979c',
                              }}>
                              <Spinner
                                style={{ alignSelf: 'center' }}
                                isVisible={true}
                                size={30}
                                type={'ThreeBounce'}
                                color={'#e13b5a'}
                              />
                            </View>
                          ) : (
                              <View>
                                {/* <Button title="Change Password" style={{width: '100%', marginBottom: 20}}   /> */}
                                {/* <Button title="Logout" onClick={this.onButtonClick} /> */}
                              </View>

                            )}


                          <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', textAlign: 'center', width: 250, marginTop: 20 }} >
                            {/* <Button title="Change Password" style={{width: '100%', marginBottom: 20,     backgroundColor: '#fff',}}   /> */}

                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate('ChangePassword')
                              }>
                              <View style={{ flexDirection: 'row', alignSelf: 'center', textAlign: 'center' }}>
                                <Text
                                  style={{
                                    marginLeft: 5, color: '#000', backgroundColor: "white", padding: 17, width: 250, textAlign: 'center', borderRadius: 60 / 2, fontFamily: 'Roboto-Bold', borderColor: 'black',
                                    borderWidth: 2
                                  }}>
                                  Change Password
                          </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6b6c', alignSelf: 'center', width: 250, marginTop: 20 }} >
                            <Button title="Logout" onClick={this.onButtonClick} />
                          </View>
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
