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
  SafeAreaView,
  Keyboard,
  ScrollView,
  BackHandler,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import {BoxShadow} from 'react-native-shadow';
import Hud from '../../../views/hud';
import Button from '../../Reusables/Button';

import CarrierHeader from '../../CarrierNavigation/CarrierHeader';

import Shadow from 'react-native-simple-shadow-view';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  FCM_TOKEN,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
} from '../../../Services/constant';
import DeviceInfo from 'react-native-device-info';

var Spinner = require('react-native-spinkit');

const {width, height} = Dimensions.get('window');
import { Dropdown } from 'react-native-material-dropdown';

export default class VendorManageProducts extends Component {
    constructor(props) {
      super(props);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
        isApiCalling: false,
        eyeIcon: 'off',
        passwordVisible: true,
        rememberMe: true,
        isAuthenticating: true,
        productList: [],
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
      this.getProductData();
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
    }

    async getProductData() {
      Hud.showHud();
      const userid = await AsyncStorage.getItem(USER_ID);
      const data = {
        //email: this.state.email,
        //password: this.state.password,
        //device_id: DeviceInfo.getUniqueId(),
        //device_token: fcm_token != null && fcm_token != '' ? fcm_token : '',
        //device_type: deviceType,
        customer_id: userid
      };
      console.warn('dataaaa', data);
      await Apis.getProductDatas(data)
      .then(async res => {
        console.warn('Rwes', res);
        if (res.status == true) {
          Hud.hideHud();
          console.warn('aaaaaaa');
          if (res.data != null && res.data.length > 0) {
            console.warn('bbbbbb');
            const sweeterArray = res.data.map(sweetItem => {
              let price = parseFloat(sweetItem.price).toFixed(2);
              return {
                value: sweetItem.name,
                id: sweetItem.entity_id,
                price: price,
              };
            });

            console.warn('arr ', sweeterArray);
            this.setState({
              productList: sweeterArray,
              
            });
          }
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
    onButtonClick = () => {
      //this.doLogin();
    };

    deleteProduct(id) {
    console.warn("del", id);
    Alert.alert(
      //title
      'Delete',
      //body
      'Are you sure want to remove the product?',
      [
        {text: 'Yes', onPress: () => this.processdelete(id)},
        {text: 'No', onPress: () => console.warn('No Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
    }

    async processdelete(id) {
      console.warn("processdel", id);
      Hud.showHud();
      const data = {
        //email: this.state.email,
        //password: this.state.password,
        //device_id: DeviceInfo.getUniqueId(),
        //device_token: fcm_token != null && fcm_token != '' ? fcm_token : '',
        //device_type: deviceType,
        product_id: id,
      };
      await Apis.deleteProduct(data)
        .then(async res => {
          console.warn('Rwes', res);
            if (res.status == true) {
            
              Hud.hideHud();

              CommonToast.showToast('Product deleted successfully', 'error');
              this.getProductData();
              //this.props.navigation.replace('MyDrawer');
            } else {
              Hud.hideHud();
              //CommonToast.showToast(res.message, 'error');
            }
        })
        .catch(error => {
          Hud.hideHud();
          console.error(error);
        });
    }

    render() {
      return (
        <ImageBackground
          style={styles.MainContainer}>
          <SafeAreaView style={{flex: 1}}>
           
              <View style={{flex: 1, backgroundColor: '#fff'}}>

      <CarrierHeader navProps={this.props.navigation} title={'Profile'} />
          <View style={{backgroundColor:'#059d14', marginTop: 0, marginLeft: 0, marginRight: 0,shadowColor: '#000',shadowOffset: {width: 0, height: 2 },  shadowOpacity: 0.25,shadowRadius: 3.84,  elevation: 50,padding:15,      borderBottomLeftRadius: 30, 
        borderBottomRightRadius: 30,  }}>                
                  <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems:"center"
                      }}>

                      <View  style={{flex:2}}> 
                          <Text style={{fontWeight:'bold',  fontFamily: 'Roboto-Light',fontSize: 17,paddingBottom: 0,
                          paddingTop: 0,paddingLeft: 0,color: '#fff',
                        }}> Vendor Manage Products 
                        </Text>
                      </View>
                      </View>

                      <View
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
                        // paddingBottom: 8,

                      }}>
                      <Image
                        source={require('../../../assets/searcopt.png')}
                        style={{width: 22, height: 22 }}
                      />
                    </View>
                  </View>
                </View>
                <ScrollView
                  style={{}}
                  contentcontainerstyle={{paddingBottom: 20}}
                  keyboardShouldPersistTaps="handled" style={{backgroundColor:'#fff'}} >               
                <View style={{width: '100%',color:'#2a2a2a', marginTop: 20,position:'relative'}}>
                    <TouchableOpacity 
                    style={{position:'relative', marginLeft:'auto',marginRight:'auto'}}
                    onPress={() =>
                      this.props.navigation.navigate('VendorAddProducts')
                    }>
                      <Image
                            source={require('../../../assets/addto.png')}
                            style={{width: 150, height: 60,borderRadius: 100/2,alignSelf: 'center' }}
                          />
                    </TouchableOpacity>
                    <TouchableOpacity style={{position:'absolute',right:20,top:5,width:45,height:45,padding:10,borderColor: '#e0e2e4',
                  borderWidth: 1,borderRadius:10,}}>
                        <Image
                            source={require('../../../assets/filter.png')}
                            style={{width: 25, height: 25,alignSelf: 'center' }}
                          />
                      </TouchableOpacity>

                  </View>
                  <View style={{padding:15,}}> 
                          <Text style={{fontWeight:'bold',  fontFamily: 'Roboto-Light',fontSize: 17,paddingBottom: 0,
                          paddingTop: 0,paddingLeft: 0,color: '#2a2a2a',
                        }}> Seller Products
                        </Text>
                      </View>

                <View style={{ }}>
                       
                          {/* loop opt item */}
                          <FlatList
                      data={this.state.productList}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => 'key' + index}
                      // ListFooterComponent={this.renderFooter.bind(this)}
                      renderItem={({item, index}) => {
                        return (
                          <View >
                          <View style={styles.prod_item} >
                          <View style={{marginTop: 10, flexDirection:'row',  position:'relative', color:'#2a2a2a',}}>
                            <View style={{flex:1}}>
                              <TouchableOpacity style={{position:'relative',marginLeft:'auto',marginRight:'auto'}}>
                                  <View style={styles.product_item_img}>
                                    <Image
                                      source={require('../../../assets/prod1.png')}
                                      style={{width: 70, height: 70,borderRadius:60}}
                                    />
                                    </View>
                              </TouchableOpacity>
                              </View>
                              <View style={{flex:2,position:'relative',paddingTop:10,paddingBottom:10,paddingLeft:5}}>
                                <View style={{position:'absolute', width:60, flexDirection:'row', justifyContent:'space-between', right:5, top:0, width:80, zIndex: 1}}>
                                <TouchableOpacity>
                                  <View >
                                    <Image
                                      source={require('../../../assets/edit_icon.png')}
                                      style={{width: 35, height: 35,borderRadius:60}}
                                    />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteProduct(item.id)}>
                                  <View >
                                    <Image
                                      source={require('../../../assets/deleteicon.png')}
                                      style={{width: 35, height: 35,borderRadius:60}}
                                    />
                                    </View>
                                </TouchableOpacity>
                                </View>

                                <Text style={{fontWeight:'bold', paddingRight:80, position:'relative', fontFamily: 'Roboto-Light',fontSize: 16,paddingBottom: 0,
                                paddingTop: 0,paddingLeft: 0,color: '#2a2a2a',
                              }}>{item.value}                           
                              </Text>
                              <Text style={{  fontWeight:'bold',fontFamily: 'Roboto-Light',fontSize: 16,paddingBottom: 0,
                                paddingTop: 0,paddingLeft: 0,color: '#038711',
                              }}>${item.price}
                              </Text>
                              <Text style={{ fontFamily: 'Roboto-Light',fontSize: 16,paddingBottom: 0,
                                paddingTop: 0,paddingLeft: 0,color: '#afafaf',
                              }}>Earned Amount: <Text style={{ fontFamily: 'Roboto-Bold',fontWeight:'bold',color: '#2a2a2a',}}>$2760.00</Text>
                              </Text>
                              <TouchableOpacity style={{position:'relative',width:100 }}>
                                <View style={{ width:100}}>
                                      <Text style={{fontWeight:'bold',fontFamily: 'Roboto-Light',fontSize: 15,borderRadius:60,marginTop:10
                                  ,color: '#fff',backgroundColor:'#000',paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,width:130       
                                    }}>More Info 
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexWrap:'wrap',paddingLeft:15, paddingRight:15, flex:1, flexDirection:'row', justifyContent:'space-between' }} >
                                  <View style={styles.text_info} >
                                     <Text style={{textAlign:'center',fontWeight:'bold',fontFamily: 'Roboto-Light',fontSize: 15,color:'#000'}}> 6
                                    </Text>
                                    <Text style={{textAlign:'center',fontFamily: 'Roboto-Light',fontSize: 15,marginTop:0}}>Qty Confirmed
                                  </Text>
                                  </View>
                                  <View style={styles.text_info_add} >
                                  </View>
                                  <View style={styles.text_info} >
                                     <Text style={{textAlign:'center',fontWeight:'bold',fontFamily: 'Roboto-Light',fontSize: 15,color:'#000'}}> 10
                                    </Text>
                                    <Text style={{textAlign:'center',fontFamily: 'Roboto-Light',fontSize: 15,marginTop:0}}>Qty Pending
                                  </Text>
                                  </View>
                                  <View style={styles.text_info_add} >
                                  </View>
                                  <View style={styles.text_info} >
                                     <Text style={{textAlign:'center',fontWeight:'bold',fontFamily: 'Roboto-Light',fontSize: 15,color:'#000'}}> 16
                                    </Text>
                                    <Text style={{textAlign:'center',fontFamily: 'Roboto-Light',fontSize: 15,marginTop:0}}>Qty Sold
                                  </Text>
                                  </View>
                                 
                            </View>
                          </View>  
                          </View>                   
                        );
                      }}
                   
                    />



                          
                       


                        {/* end */}

                     
                    
                    
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
    product_item_img:{
        width:90,
        height:90,
        marginLeft:'auto',
        marginRight:'auto',
        padding:10,
        borderColor: '#e0e2e4',
        borderWidth: 1,
        borderRadius:60,
  
    },
    prod_item:{
      paddingTop: 10,
      marginLeft:15, 
      marginRight: 15,
      backgroundColor : "white",
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2 },  
      shadowOpacity: 0.25,  
      elevation: 8,
      padding:10, 
      paddingLeft:5, 
      marginBottom:25, 
      borderRadius:8 , 
      color:'#2a2a2a', 
    },
    text_info:{
      textAlign:'center'
    },
    text_info_add:{
      position:'relative',
      height:50,
      width:1,
      backgroundColor:'#efefef'
    }
  });