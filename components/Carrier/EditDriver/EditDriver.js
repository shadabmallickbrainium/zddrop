import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Apis from '../../../Services/apis';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
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
import CarrierHeaderBack from '../../CarrierNavigation/CarrierHeaderBack';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import StarRatingy from '../../../views/StarRating';
import StarRating from 'react-native-star-rating';
import {Dropdown} from 'react-native-material-dropdown';

export default class EditVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile_no: '',
      address: '',
      filePath: '',
      driverImgFromApi: '',
    };
  }

  componentDidMount() {
    console.warn('did', this.props.route.params.driver_id);
    const driId = this.props.route.params.driver_id;
    this.getDriverDetailsById(driId);
  }

  async getDriverDetailsById(driId) {
    Hud.showHud();
    console.warn('vid ', driId);
    await Apis.getDriverDetailsById('', driId)
      .then(async res => {
        Hud.hideHud();
        console.warn('Rwes', res);
        if (res.status == '1') {
          this.setState({
            name: res.data.name,
            mobile_no: res.data.mobile_no,
            address: res.data.address,
            email: res.data.email,
            driverImgFromApi: res.data.profile_pic,
          });
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  async onSaveClicked() {
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

    if (this.state.mobile_no.trim() == '') {
      this.mobile_input.focus();
      CommonToast.showToast('Please enter phone number', 'error');
      return;
    }
    if (!this.validatePhoneNumber()) {
      this.mobile_input.focus();
      CommonToast.showToast('Please enter a valid phone number', 'error');

      return;
    }
    if (this.state.address.trim() == '') {
      this.address_input.focus();
      CommonToast.showToast('Please enter address', 'error');
      return;
    }

    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    console.log('filename', this.state.filePath.fileName);

    var form = new FormData();
    //let formdata = new FormData();
    form.append('driver_id', this.props.route.params.driver_id);
    //form.append("carrier_id",userid)
    form.append('name', this.state.name);
    form.append('email', this.state.email);
    form.append('address', this.state.address);
    form.append('mobile_no', this.state.mobile_no);
    if (
      this.state.filePath != null &&
      this.state.filePath != '' &&
      this.state.filePath != 'null'
    ) {
      form.append('profile_pic', {
        uri: this.state.filePath.uri,
        name: this.state.filePath.fileName,
        type: this.state.filePath.type,
      });
    } else {
      console.warn('no', 'img');
      form.append('profile_pic', '');
    }
    //formdata.append('profile_pic' , this.state.source)

    console.warn('form===>' + JSON.stringify(form));

    fetch('http://mydevfactory.com/~shreya/ugavi_africa/Api/updateDriver', {
      method: 'post',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: form,
    })
      .then(res => res.json())
      .then(res => {
        console.warn('resss', res);
        Hud.hideHud();
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          this.props.navigation.goBack();
          this.props.route.params.fetchVehiEdit();
        }
      })
      .catch(err => {
        Hud.hideHud();
        console.error('Something went wrong ', err);
      });
  }
  validatePhoneNumber = () => {
    //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    var regexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return regexp.test(this.state.mobile_no);
  };
  validateEmail = () => {
    var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexp.test(this.state.email);
  };

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
        Hud.hideHud();
        console.log('User cancelled photo picker');
      } else if (response.error) {
        Hud.hideHud();
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        Hud.hideHud();
        console.log('User tapped custom button: ', response.customButton);
      } else {
        Hud.showHud();
        let source = {uri: response.uri};
        console.warn('dataaaa  ', response.data);

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: response,
          driverImgFromApi: '',
        });
        console.warn('pathhh', response.uri);
        console.warn('pathhh4444', response);
        Hud.hideHud();
        //console.warn('555',response.type)

        //this.uploadImageToServer()
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <CarrierHeaderBack
              navProps={this.props.navigation}
              title={'Edit Driver'}
            />

            <View style={{flex: 1, backgroundColor: 'white'}}>
              <ScrollView
                style={{flex: 1}}
                contentcontainerstyle={{paddingBottom: 20}}
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{marginLeft: 25, marginRight: 25, marginBottom: 25}}>
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
                      value={this.state.name}
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
                        source={require('../../../assets/user.png')}
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
                      placeholder={'Email'}
                      editable={false}
                      value={this.state.email}
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
                      placeholder={'Mobile'}
                      value={this.state.mobile_no}
                      placeholderTextColor={'#6d6b6c'}
                      ref={input => {
                        this.mobile_input = input;
                      }}
                      onChangeText={mobile_no => this.setState({mobile_no})}
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
                        value={this.state.address}
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
                          style={{width: 22, height: 22, tintColor: '#6d6b6c'}}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      backgroundColor: '#6d6b6c',
                    }}
                  />

                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Roboto-Regular',
                        color: '#6d6b6c',
                      }}>
                      Upload Driver Image
                    </Text>

                    <View
                      style={{
                        marginTop: height / 20,
                        width: 130,
                        height: 130,
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
                        style={{width: 130, height: 130}}
                        onPress={() => this.selectPhotoTapped()}>
                        {this.state.driverImgFromApi != null &&
                        this.state.driverImgFromApi != '' &&
                        this.state.driverImgFromApi != 'null' ? (
                          <View style={{width: 130, height: 130}}>
                            <Image
                              source={{uri: this.state.driverImgFromApi}}
                              style={{
                                width: 130,
                                height: 130,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                              }}
                            />
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 130,
                              height: 130,
                              justifyContent: 'center',
                            }}>
                            {this.state.filePath != null &&
                            this.state.filePath != '' &&
                            this.state.filePath != 'null' ? (
                              <Image
                                source={{uri: this.state.filePath.uri}}
                                style={{
                                  width: 130,
                                  height: 130,
                                  borderTopLeftRadius: 10,
                                  borderBottomRightRadius: 10,
                                }}
                              />
                            ) : (
                              <View
                                style={{
                                  width: 130,
                                  height: 130,
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  source={require('../../../assets/truck.png')}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    alignSelf: 'center',
                                  }}
                                  resizeMode={'contain'}
                                />
                                <View
                                  style={{
                                    position: 'absolute',
                                    width: 130,
                                    height: 130,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      width: 40,
                                      height: 40,
                                      backgroundColor: 'white',
                                      borderRadius: 20,
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

                            {/* <Image source={{uri : this.state.vehicleImgFromApi}} style={{width:130,height:130,borderTopLeftRadius:10,borderBottomRightRadius:10}} /> */}

                            {/* <Image source={require('../../../assets/truck.png')} style={{width:80,height:80,alignSelf:'center'}} resizeMode={'contain'}/>
                                <View style={{position:'absolute',width:130,height:130,justifyContent:'center',alignItems:"center"}}>

                                    <View style={{width:40,height:40,backgroundColor:'white',borderRadius:20,marginTop:height/12,elevation:0,justifyContent:'center',alignItems:'center'}}>
                                        <Image source={require('../../../assets/plus.png')} style={{width:20,height:20,alignSelf:'center',}} resizeMode={'contain'}/>

                                        
                                    </View>
                                </View> */}
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginTop: height / 20,
                        marginBottom: height / 20,
                      }}>
                      <TouchableOpacity onPress={() => this.onSaveClicked()}>
                        <Shadow
                          style={{
                            height: height / 13,
                            shadowColor: '#e13b5a',
                            shadowOpacity: 0.9,
                            shadowRadius: 6,
                            shadowOffset: {width: 5, height: 10},
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            borderRadius: 10,
                          }}>
                          <LinearGradient
                            start={{x: 0, y: 1}}
                            end={{x: 1, y: 0}}
                            colors={['#e13b5a', '#96177f']}
                            style={{
                              borderTopLeftRadius: 10,

                              justifyContent: 'center',
                              borderBottomRightRadius: 10,
                              height: height / 13,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 16,
                                color: 'white',
                                textAlign: 'center',
                              }}>
                              Save
                            </Text>
                          </LinearGradient>
                        </Shadow>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
