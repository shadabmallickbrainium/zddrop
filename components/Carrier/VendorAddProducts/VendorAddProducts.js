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
import { Dropdown } from 'react-native-material-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import { BoxShadow } from 'react-native-shadow';
import Hud from '../../../views/hud';
import Button from '../../Reusables/Button';

import CarrierHeader from '../../CarrierNavigation/CarrierHeader';

import Shadow from 'react-native-simple-shadow-view';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  FCM_TOKEN,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
} from '../../../Services/constant';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAvoidingView } from 'react-native';

var Spinner = require('react-native-spinkit');

const { width, height } = Dimensions.get('window');

export default class VendorAddProducts extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      isApiCalling: false,
      eyeIcon: 'off',
      passwordVisible: true,
      rememberMe: true,
      isAuthenticating: true,
      categorydata: [],
      defaultcategory: '',
      product_name: '',
      description: '',
      price: '',
      attribute: 'default',
      filePath: '',
      dataImage: '',
      source: null,
      imgFromApi: '',
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
    this.getcategories();
  }

  async getcategories() {
    Hud.showHud();
    //const userid = await AsyncStorage.getItem(USER_ID);
    const data = {
    };
    console.warn('dataaaa', data);
    await Apis.getcategories(data)
      .then(async res => {
        console.warn('Rwescattt', res);
        if (res.message.children_data.length > 0) {
          Hud.hideHud();

          console.warn('bbbbbb');
          const sweeterArraychoose = [{ label: 'Choose Category', value: 'choose', }]
          const sweeterArray = res.message.children_data.map(sweetItem => {
            //let price = parseFloat(sweetItem.price).toFixed(2);
            return {
              label: sweetItem.name,
              value: sweetItem.id,
            };
          });
          const newarry = sweeterArraychoose.concat(sweeterArray);
          //console.warn('arr ', sweeterArray);
          this.setState({
            categorydata: newarry,
            defaultcategory: 'choose',
          });

        } else {
          console.warn('cccccccccc');
          Hud.hideHud();
          //CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        console.error(error);
      });
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

  doTermsCheck() {
    this.setState({
      rememberMe: !this.state.rememberMe,
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
        let source = { uri: response.uri };
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
    form.append('users_id', userid);
    form.append('profile_pic', {
      uri: this.state.filePath.uri,
      name: this.state.filePath.fileName,
      type: this.state.filePath.type,
    });
    //formdata.append('profile_pic' , this.state.source)

    console.warn('form===>' + JSON.stringify(form));

    fetch(
      'http://dev.mydevmagento.com/zdropp/restApi/catalog/product_image.php',
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

  async addProduct() {
    //Hud.showHud()
    const userid = await AsyncStorage.getItem(USER_ID);
    console.warn("product name", this.state.product_name);
    if (this.state.product_name.trim() == '') {
      //this.email_input.focus();
      CommonToast.showToast('Please enter product name', 'error');
      return;
    }

    if (this.state.defaultcategory.trim() == '') {
      //this.email_input.focus();
      CommonToast.showToast('Please select category', 'error');
      return;
    }

    if (this.state.description.trim() == '') {
      //this.password_input.focus();
      CommonToast.showToast('Please enter short description', 'error');
      return;
    }

    if (this.state.price.trim() == '') {
      //this.password_input.focus();
      CommonToast.showToast('Please enter price', 'error');
      return;
    }

    const category_id = [];
    category_id.push(this.state.defaultcategory);
    Hud.showHud();
    Keyboard.dismiss();
    const data = {
      sku: "test-product" + new Date().getUTCMilliseconds(),
      name: this.state.product_name,
      desc: this.state.description,
      price: this.state.price,
      category_id: category_id,
      customer_id: userid,
    };
    await Apis.addProducts(data)
      .then(async res => {
        console.warn('Rwesaddproduct', res);
        if (res.status == true) {

          Hud.hideHud();
          //this.props.navigation.replace('MyDrawer');
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

  onButtonClick = () => {
    this.addProduct();
  };


  render() {
    let categorydata = [{
      label: 'Select Attribute',
      value: 'select',
    }, {
      label: 'Default',
      value: 'default',
    }];
    let selectAttributeData = [{
      value: 'Default',
    }];

    return (
      <ImageBackground
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <CarrierHeader navProps={this.props.navigation} title={'Profile'} />
            <View style={{
              backgroundColor: '#059d14', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 25,
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
                  }}> Vendor Add Products
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
              keyboardShouldPersistTaps="handled" style={{ backgroundColor: '#fff' }} >
              <View style={{ width: '100%', color: '#2a2a2a', flexDirection: 'row', marginLeft: 5, marginTop: 20, position: 'relative' }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity >
                    <Image
                      source={require('../../../assets/addpic.png')}
                      style={{ width: 120, height: 120, borderRadius: 100 / 2 }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 2, marginTop: 15, marginRight: 30 }}>
                  <ScrollView horizontal={true} >
                    <View style={{ marginRight: 5 }} >
                      <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
                        <Image
                          source={require('../../../assets/image_add.png')}
                          style={{ width: 80, height: 90, borderRadius: 50 / 2 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 5 }} >
                      <TouchableOpacity >
                        <Image
                          source={require('../../../assets/image_add.png')}
                          style={{ width: 80, height: 90, borderRadius: 50 / 2 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 5 }} >
                      <TouchableOpacity >
                        <Image
                          source={require('../../../assets/image_add.png')}
                          style={{ width: 80, height: 90, borderRadius: 50 / 2 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 5 }} >
                      <TouchableOpacity >
                        <Image
                          source={require('../../../assets/image_add.png')}
                          style={{ width: 80, height: 90, borderRadius: 50 / 2 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 5 }} >
                      <TouchableOpacity >
                        <Image
                          source={require('../../../assets/image_add.png')}
                          style={{ width: 80, height: 90, borderRadius: 50 / 2 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 5 }} >
                      <TouchableOpacity >
                        <Image
                          source={require('../../../assets/image_add.png')}
                          style={{ width: 80, height: 90, borderRadius: 50 / 2 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 5 }} >
                      <TouchableOpacity >
                        <Image
                          source={require('../../../assets/image_add.png')}
                          style={{ width: 80, height: 90, borderRadius: 50 / 2 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 5 }} >
                      <TouchableOpacity >
                        <Image
                          source={require('../../../assets/image_add.png')}
                          style={{ width: 80, height: 90, borderRadius: 50 / 2 }}
                        />
                      </TouchableOpacity>
                    </View>

                  </ScrollView>
                </View>
              </View>

              <View style={{ paddingLeft: 20, paddingBottom: 15, paddingTop: 15 }}>
                <Text style={{
                  fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                  paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                }}> Seller Products</Text>
              </View>

              <View style={{ marginTop: 20, marginBottom: 30, marginLeft: 25, marginRight: 25, paddingLeft: 20, paddingRight: 20, paddingBottom: 15, borderRadius: 8, backgroundColor: "white", shadowColor: '#b9b9b9', shadowOpacity: 0.1, elevation: 15 }}>
                <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} >
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 20,
                      borderBottomWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#dedede',
                    }}>
                    <TextInput
                      style={{
                        width: '90%',
                        // fontFamily: 'Roboto-Light',
                        fontSize: 14,
                        paddingBottom: 8,
                        paddingTop: 0,
                        paddingLeft: 17,
                        color: '#000',

                      }}
                      placeholder={'Product Name'}
                      keyboardType="default"
                      autoCapitalize="none"
                      placeholderTextColor={'#000'}
                      ref={input => {
                        this.prod_name_input = input;
                      }}

                      onChangeText={item => this.setState({
                        product_name: item.value
                      })}
                    />
                  </View>

                  <DropDownPicker style={{ fontFamily: 'Roboto-Light', fontSize: 14, padding: 0, margin: 0, color: '#6d6b6c', border: 0, borderColor: '#fff' }}
                    items={this.state.categorydata}
                    defaultValue={this.state.defaultcategory}
                    //defaultValue='2'
                    containerStyle={{ height: 40 }}
                    style={{ fontFamily: 'Roboto-Light', fontSize: 14, padding: 0, margin: 0, color: '#6d6b6c', borderColor: '#fff' }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      padding: 0, margin: 0,
                    }}
                    // dropDownStyle={{backgroundColor: '#fafafa'}}
                    // dropDownStyle={{fontFamily: 'Roboto-Light',fontSize: 14,padding:0,margin:0, color: '#6d6b6c', borderColor:'#fff'}}
                    onChangeItem={item => this.setState({
                      defaultcategory: item.value
                    })}
                  //onChangeItem={item => console.warn("getcatttt",item)}
                  />

                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#dedede',
                      flexDirection: 'row',
                      marginBottom: 0,
                      padding: 0, margin: 0, left: 0, right: 0, borderBottomWidth: 1, borderStyle: 'solid', borderColor: '#dedede',
                    }}
                  />

                  <DropDownPicker style={{ fontFamily: 'Roboto-Light', fontSize: 14, padding: 0, margin: 0, color: '#6d6b6c' }}
                    items={categorydata}
                    defaultValue='select'
                    containerStyle={{ height: 40 }}
                    style={{ fontFamily: 'Roboto-Light', fontSize: 14, padding: 0, margin: 0, color: '#6d6b6c', borderColor: '#fff' }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      padding: 0, margin: 0,
                    }}

                  //onChangeItem={item => console.warn("getcatttt",item)}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#dedede',
                      flexDirection: 'row',
                      marginBottom: 0,
                      padding: 0, margin: 0, left: 0, right: 0, borderBottomWidth: 1, borderStyle: 'solid', borderColor: '#dedede',
                    }}
                  />

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#dedede',
                    }}>
                    <TextInput
                      style={{
                        width: '100%',
                        // fontFamily: 'Roboto-Light',
                        fontSize: 14,
                        paddingBottom: 8,
                        paddingTop: 5,
                        paddingLeft: 17,
                        color: '#000',
                      }}
                      placeholder={'Short Description'}
                      keyboardType="default"
                      autoCapitalize="none"
                      placeholderTextColor={'#000'}
                      ref={input => {
                        this.short_description = input;
                      }}
                      onChangeText={item => this.setState({
                        description: item.value
                      })}
                    />
                  </View>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 5,
                      borderBottomWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#dedede',
                    }}>
                    <TextInput
                      style={{
                        width: '100%',
                        // fontFamily: 'Roboto-Light',
                        fontSize: 14,
                        paddingBottom: 8,
                        paddingTop: 0,
                        paddingLeft: 17,
                        color: '#000',
                      }}
                      placeholder={'Price'}
                      keyboardType="default"
                      autoCapitalize="none"
                      placeholderTextColor={'#000'}
                      ref={input => {
                        this.price_input = input;
                      }}
                      onChangeText={item => this.setState({
                        price: item.value
                      })}
                    />
                  </View>

                  <View style={{ marginTop: 20, padding: 10, fontSize: 16, color: '#6d6b6c', alignSelf: 'center', width: 200 }}>
                    <Button title="Save" onClick={this.onButtonClick} />
                  </View>

                </KeyboardAvoidingView>
              </View>
            </ScrollView>
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
  product_item_img: {
    width: 90,
    height: 90,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderColor: '#e0e2e4',
    borderWidth: 1,
    borderRadius: 60,

  },
  prod_item: {
    paddingTop: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 8,
    padding: 10,
    paddingLeft: 5,
    marginBottom: 25,
    borderRadius: 8,
    color: '#2a2a2a',
  },
  text_info: {
    textAlign: 'center'
  },
  text_info_add: {
    position: 'relative',
    height: 50,
    width: 1,
    backgroundColor: '#efefef'
  }
});
