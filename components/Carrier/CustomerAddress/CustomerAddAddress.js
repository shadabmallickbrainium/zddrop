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
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import {BoxShadow} from 'react-native-shadow';
import Hud from '../../../views/hud';
import Button from '../../Reusables/Button';
import DropDownPicker from 'react-native-dropdown-picker';
 


import CarrierHeader from '../../CarrierNavigation/CarrierHeader';

import Shadow from 'react-native-simple-shadow-view';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  FCM_TOKEN,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
  USER_TOKEN,
  base_url
} from '../../../Services/constant';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios'

var Spinner = require('react-native-spinkit');

import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window')


export default class CustomerOrderHistoryDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: 'uk',
      defaultBilling:false,
      defaultShipping:false,
      firstName:"",
      lastName:"",
      phoneNumber:"",
      fax:"",
      streetAdress:"",
      city:"",
      state:"",
      uk:"",
      token:"",
      isLoading:false
  }
  }
  async componentDidMount() {
    
    const token = await AsyncStorage.getItem(USER_TOKEN);
    this.setState({  token: token })
    

  }
  addAddressInformation=async()=>{
   // CommonToast.showToast('Please enter email id', 'error');
    //alert(this.state.token+"**"+this.state.quoteId)
    if (this.state.firstName.trim() == '') {
      this.firstName_input.focus();
      CommonToast.showToast('Please enter first name', 'error');
      return;
    }
    if (this.state.lastName.trim() == '') {
     // this.firstName_input.focus();
      CommonToast.showToast('Please enter last name', 'error');
      return;
    }
    if (this.state.phoneNumber.trim() == '') {
      // this.firstName_input.focus();
       CommonToast.showToast('Please enter phone number', 'error');
       return;
     }
     if (this.state.streetAdress.trim() == '') {
      // this.firstName_input.focus();
       CommonToast.showToast('Please enter street address', 'error');
       return;
     }
     if (this.state.city.trim() == '') {
      // this.firstName_input.focus();
       CommonToast.showToast('Please enter city', 'error');
       return;
     }
     if (this.state.state.trim() == '') {
      // this.firstName_input.focus();
       CommonToast.showToast('Please enter state', 'error');
       return;
     }
     if (this.state.country.trim() == '') {
      // this.firstName_input.focus();
       CommonToast.showToast('Please enter country', 'error');
       return;
     }
     this.props.navigation.navigate('CustomerPaymentScreen');
     
    //  var header = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.state.token}`,
    // };
    // var data={
      
    //     "addressInformation": {
    //       "shipping_address": {
    //         "region": this.state.country,
    //         "region_id": 43,
    //         "region_code": "",
    //         "country_id": "",
    //         "street": [
    //           this.state.streetAdress
    //         ],
    //         "postcode": "",
    //         "city": this.state.city,
    //         "firstname": this.state.firstName,
    //         "lastname": this.state.lastName,
    //         "email": "",
    //         "telephone": this.state.phoneNumber
    //       },
    //       "billing_address": {
    //         "region": "",
    //         "region_id": 43,
    //         "region_code": "",
    //         "country_id": "",
    //         "street": [
    //           ""
    //         ],
    //         "postcode": "",
    //         "city": "",
    //         "firstname": "",
    //         "lastname": "",
    //         "email": "",
    //         "telephone": "512-555-1111"
    //       },
    //       "shipping_carrier_code": "flatrate",
    //       "shipping_method_code": "flatrate"
    //     }
    //   }
    
    // var config = {
    //   method: "post",
    //   url: base_url+"rest/V1/carts/mine/shipping-information",
    //   headers: header,
    //    data:data
    // };
    // console.log(config);
    // this.setState({isLoading:true})
    // alert(JSON.stringify(config))
    // await axios(config)
    //   .then((response) => {
    //    this.setState({isLoading:false})
    //     console.log(response);
    //    // this.getCartData()
    //     alert(JSON.stringify(response))
    //   })
    //   .catch((error) => {
    //     this.setState({isLoading:false})
    //     console.warn(error);
    //   //  alert(JSON.stringify(error))
    //   });
    }
    render() {
   
     
      return (
        <ImageBackground
          style={styles.MainContainer}>
          <SafeAreaView style={{flex: 1}}>

              <View style={{flex: 1, backgroundColor: '#fff'}}>
     
                <CarrierHeader navProps={this.props.navigation} title={'Profile'} />
                <View style={{backgroundColor:'#059d14', marginTop: 0, marginLeft: 0, marginRight: 0,shadowColor: '#000',shadowOffset: {width: 0, height: 2 },  shadowOpacity: 0.25,shadowRadius: 3.84,  elevation: 10,padding:15,     borderBottomLeftRadius: 20, borderBottomRightRadius: 20,  }}>
                  <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems:"center"
                      }}>

                      <View  style={{flex:2}}>
                          <Text style={{fontWeight:'bold',  fontFamily: 'Roboto-Light',fontSize: 17,paddingBottom: 0,
                          paddingTop: 0,paddingLeft: 0,color: '#fff',
                        }}> Add Address
                        </Text>
                      </View>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 10,
                      backgroundColor:'#50b169',padding:10,
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
                      //keyboardType="search_opt"
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
                  keyboardShouldPersistTaps="handled">

              
             
                  <View style={styles.dropshadow}>
                      <View style={styles.inp_wrap}>
                        <TextInput
                            value={this.state.firstName}
                            onChangeText={(text)=>this.setState({firstName:text})}
                            style={styles.inp_text}
                            placeholder={'First Name'}
                            keyboardType=""
                            placeholderTextColor={'#000'}
                            ref={input => {
                            this.firstName_input = input;
                          }}
                          />
                      </View>
                      <View style={styles.inp_wrap}>
                        <TextInput
                            value={this.state.lastName}
                            onChangeText={(text)=>this.setState({lastName:text})}
                            style={styles.inp_text}
                            placeholder={'Last Name'}
                            keyboardType=""
                            placeholderTextColor={'#000'}
                          />
                      </View>
                      <View style={styles.inp_wrap}>
                        <TextInput
                            value={this.state.phoneNumber}
                            onChangeText={(text)=>this.setState({phoneNumber:text})}
                            style={styles.inp_text}
                            placeholder={'Phone Number'}
                            keyboardType="phone-pad"
                            placeholderTextColor={'#000'}
                          />
                      </View>
                      <View style={styles.inp_wrap}>
                        <TextInput
                           value={this.state.fax}
                            onChangeText={(text)=>this.setState({fax:text})}
                            style={styles.inp_text}
                            placeholder={'Fax'}
                            keyboardType="phone-pad"
                            placeholderTextColor={'#000'}
                          />
                      </View>
                      <View style={styles.inp_wrap}>
                        <TextInput
                           value={this.state.streetAdress}
                            onChangeText={(text)=>this.setState({streetAdress:text})}
                            style={styles.inp_text}
                            placeholder={'Street Address'}
                            keyboardType=""
                            placeholderTextColor={'#000'}
                          />
                      </View>
                      <View style={styles.inp_wrap}>
                        <TextInput
                        value={this.state.city}
                            onChangeText={(text)=>this.setState({city:text})}
                            style={styles.inp_text}
                            placeholder={'City'}
                            keyboardType=""
                            placeholderTextColor={'#000'}
                          />
                      </View>
                      <View style={styles.inp_wrap}>
                        <TextInput
                        onChangeText={(text)=>this.setState({state:text})}
                            style={styles.inp_text}
                            placeholder={'State'}
                            keyboardType=""
                            placeholderTextColor={'#000'}
                          />
                      </View>
                      <View  style={{...(Platform.OS !== 'android' && {zIndex: 10,})}} >
                     
                          <DropDownPicker style={{fontFamily: 'Roboto-Light',fontSize: 15, padding:0,margin:0, color: '#6d6b6c',border:0,borderColor:'#fff'}}
                              items={[
                                  {label: 'USA', value: 'usa', hidden: true},
                                  {label: 'UK', value: 'uk'},
                                  {label: 'France', value: 'france'},
                              ]} 

                              labelStyle={{
                                fontSize: 15,
                                textAlign: 'left',
                                color: '#000',
                                padding:0,margin:0,left:0, fontFamily: 'Roboto-Light',
                            }}
                          
                            activeLabelStyle={{color: 'red'}}

                              defaultValue={this.state.country}
                              containerStyle={{height: 40}}
                              itemStyle={{
                                  justifyContent: 'flex-start',
                                  padding:0,margin:0,
                              }}
                              dropDownStyle={{backgroundColor: '#fafafa'}}
                              onChangeItem={item => this.setState({
                                  country: item.value
                              })}
                          />
                                                </View>

                        <View style={styles.inp_wrap2}>
                            
                             <View style={styles.inp_checkbox}>
                                  <CheckBox
                                    value={this.state.defaultBilling}
                                    onValueChange={() => this.setState({ defaultBilling: !this.state.defaultBilling })}
                                  />
                                  <Text style={styles.checkbox_text} >
                                    Default Billing
                                  </Text>
                              </View>
                              <View style={styles.inp_checkbox}>
                                  <CheckBox
                                    value={this.state.defaultShipping}
                                    onValueChange={() => this.setState({ defaultShipping: !this.state.defaultShipping })}
                                  />
                                  <Text style={styles.checkbox_text} >
                                  Default Shipping
                                  </Text>
                              </View>
                      </View>


                      <View style={{marginTop: 20, marginBottom:15, fontSize: 16,color: '#6d6b6c',alignSelf: 'center',width:200,
                      position:'relative',
                      flexDirection:'column'
                    }}>
                      <Button title="Save" onClick={this.addAddressInformation} />
                    </View>

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
    dropshadow:{
      marginTop: 25,
      marginLeft: 25, 
      marginRight: 25,
      // backgroundColor : "white",
      // shadowColor: '#000',
      // shadowOffset: {width: 0, height: 1 },  
      // shadowOpacity: 0.25,  
      // elevation: 5,

      borderColor: '#e7e7e7',
      borderWidth: 1,
      padding:15,
      marginBottom:60, 
      borderRadius:8 
    },
    dropshadow2:{
      marginTop: 0,
      marginLeft: 10, 
      marginRight: 10, 
      // backgroundColor : "white",
      // shadowColor: '#000',
      // shadowOffset: {width: 0, height: 5 },  
      // shadowOpacity: 0.30,  
      // elevation: 10,
      // borderColor: '#e7e7e7',
      // borderWidth: 1,
      padding:15,
      borderRadius:8,
    },
    dropdown_list:{
      paddingTop:10,
     


    },
    text_heading:{
      fontWeight:'bold', 
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
      paddingBottom:5,
      marginBottom:5,  
      color: '#afafaf',
      borderBottomColor: '#e7e7e7',
      borderBottomWidth: 1
    },
    text_info:{
      lineHeight:20,
      fontFamily: 'Roboto-Light',
      fontSize: 14,
      color: '#afafaf'
    },
    prod_cont2:{
      flexDirection: 'row',
    },
    prod_cont3:{
      justifyContent:'space-between',
      flexDirection: 'row',

    },
    text_info2:{
      paddingLeft:5,
      // paddingRight:30,
      lineHeight:20,
      fontFamily: 'Roboto-Light',
      fontSize: 14,
      flexShrink: 1,
      flex:2,
      // whiteSpace:
      // whiteSpace: 'nowrap',
      // overflow: 'hidden',
      // textoverflow: 'ellipsis',
    },
    text_link:{
      paddingLeft:5,
      paddingRight:30,
      color: '#afafaf',
      lineHeight:20,
      fontFamily: 'Roboto-Light',
      fontSize: 14,
      color: '#038711',
      flexShrink: 1,
      flex:2,

    },
    prod_cont:{
      flexDirection:'row',
      color: '#afafaf',
      marginBottom:2,
      marginTop:2,
      // justifyContent:'space-between',
    },
    text_heading2:{
      color: '#afafaf',
    },
    def_btn_wrap:{
      fontFamily: 'Roboto-Regular', 
      fontSize: 15,
      color: '#6d6b6c',
      alignSelf: 'center',
       marginTop:20,
       marginBottom:60,
    },
    def_btn:{
      marginLeft: 0,
      color:'#000',
      backgroundColor:"white",
      padding:10,
      width:180,
      fontSize: 15,
      textAlign:'center',
      borderRadius: 60/2,  
      fontFamily: 'Roboto-Bold', 
      borderColor: 'black',
      borderWidth: 2

    },
    text_heading_opt:{
      fontFamily: 'Roboto-Bold', 
      color:'#000',
      fontSize: 16,
      paddingTop:15,
      paddingLeft:25,
      paddingRight:15,
    },
    text_heading3:{
      fontFamily: 'Roboto-Bold', 
      color:'#000',
      fontSize: 16,
    },
    def_btn_wrap2:{
      fontFamily: 'Roboto-Regular', 
      fontSize: 20,
      color: '#6d6b6c',
      alignSelf: 'center',
       marginTop:0,
       marginBottom:0,
    },
    def_btn2:{
      marginLeft: 0,
      color:'#FFF',
      backgroundColor:"#000",
      padding:10,
      width:180,
      fontSize: 16,
 
      textAlign:'center',
      borderRadius: 60/2,  
      fontFamily: 'Roboto-Bold', 
      borderColor: 'black',
      borderWidth: 2

    },
    prod_des_area:{
      borderBottomColor: '#e7e7e7',
      borderBottomWidth: 1,
      justifyContent:'space-between',
      flexDirection:'row',
      paddingBottom:5,
      marginBottom:5,
    },
    prod_des:{
      flex:2,

    },
    prod_heading: {
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
      paddingBottom:5,

    },
    reating_opt:{
      // justifyContent:'space-between',
      flexDirection:'row',
      paddingBottom:5,
      alignItems:'center',
    },
    rev_info:{
      paddingLeft:10,
    },
    availability_text2:{
      paddingRight:5,
      color:"#afafaf",
      fontSize: 16,

    },
    prod_price:{
      flexDirection:'row',
      paddingBottom:5,
    },
    prod_price_rec:{
      color:"#038711",
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
      paddingRight:5,

    },
    prod_price_old:{
      color:"#afafaf",
      fontSize: 16,
      textDecorationLine:"line-through"
    },
    availability_info:{
      color:"#afafaf",
      fontSize: 16,
      flexDirection:'row',

    },
    availability_text:{
      color:"#afafaf",
      fontSize: 16,
    },
    availability_stock:{
      color:"#038711",
      fontSize: 16,
      paddingLeft:5,
    },
    availability_cunt:{
      color:"#afafaf",
      fontSize: 16,
      flexDirection:'row',
      alignItems:'center',
    },
    availability_countopt:{
      paddingLeft:5,
      paddingRight:5

    },
    availability_content:{
      justifyContent:'space-between',
      flexDirection:'row',
      paddingBottom:10,
      alignItems:'center',
    },
    banner:{

    },
    slide: {
      flexDirection: "column",


    },
    image: {
      resizeMode: "cover",
      justifyContent: "center",
      height:300,
    },
    text2: {
      color: "grey",
      fontSize: 30,
      fontWeight: "bold",
      position:'absolute',
      right:0,
      top:0,
    },
    prod_infowrap3:{
      position:'relative',
    },
    inp_wrap:{
      // dedede
   borderBottomColor:'#e7e7e7',
   borderBottomWidth: 1,
      paddingTop:10,
      paddingBottom:10,
      margin:0,

    },
    inp_wrap2:{
      // dedede
   borderTopColor:'#e7e7e7',
   borderTopWidth: 1,
      paddingTop:20,
      paddingBottom:0,
      margin:0,
      flexDirection:'row',
      justifyContent:'center'

    },
    inp_checkbox:{
      flexDirection:'row',
      marginRight:10,
      alignContent:'center',
    },
    checkbox_text:{
      paddingTop:6
    },
    inp_text:{
      flex: 1,
      paddingTop: 0,
      paddingLeft: 15,
      fontSize: 15,
      textAlign: 'left',
      color: '#000',
      fontFamily: 'Roboto-Light',
      marginLeft:0,
      paddingBottom: 0,
      paddingRight: 0,
    },
    card_opt:{
      marginLeft: 15,
      marginRight: 25,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',

    },
    card_img:{
      // color:"#afafaf",
      // fontSize: 16,
      // flexDirection:'row',
 
      backgroundColor : "white",
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1 },  
      shadowOpacity: 0.25,  
      elevation: 5,
      borderRadius:12 ,
      padding:5,
      paddingTop:15,
      paddingBottom:15,
      marginTop:10,
      marginLeft:10 


  
    },
    card_img_pic:{
      width:65,
      height:30,
      
    },
  
    total_pric:{
      // color:"#afafaf",
      // fontSize: 16,
      // flexDirection:'row',
      // alignItems:'center',
      // justifyContent:'space-between',

      margin: 25,
      backgroundColor : "white",
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1 },  
      shadowOpacity: 0.25,  
      elevation: 5,
      padding:15,
      borderRadius:12 ,
      flexDirection:'row',
      color: '#afafaf',
      marginTop:10,
      marginBottom:15,
      justifyContent:'space-between',
      alignItems:'center'
    },
    total_cap:{
      fontFamily: 'Roboto-Bold',
      fontSize: 18,
      color: '#038711',
    },
    total_cap_pric:{
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
      color: '#038711',
    },
    edit_img:{
      width:40,
      height:40,
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
      color: '#038711'
    },
  

  });