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
    StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import RadioButtonRN from 'radio-buttons-react-native';
import {Icon} from 'native-base'
import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import { BoxShadow } from 'react-native-shadow';
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


export default class CustomerPaymentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 'uk',
            defaultBilling: false,
            defaultShipping: false,
            firstName: "",
            lastName: "",
            phoneNumber: "",
            fax: "",
            streetAdress: "",
            city: "",
            state: "",
            uk: "",
            token: "",
            isLoading: false,
            isCashOnDelivery:false,
            expiryFormOpen:false
          
        }
      
    }
    async componentDidMount() {

        const token = await AsyncStorage.getItem(USER_TOKEN);
        this.setState({ token: token })


    }
    addAddressInformation = async () => {
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
                <SafeAreaView style={{ flex: 1 }}>

                    <View style={{ flex: 1, backgroundColor: '#fff' }}>

                        <CarrierHeader navProps={this.props.navigation} title={'Profile'} />
                        <View style={{ backgroundColor: '#059d14', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
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
                                    }}> Payment
                        </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    backgroundColor: '#50b169', padding: 10,
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
                                    //keyboardType="search_opt"
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



                            <View style={styles.dropshadow}>
                               

                                <View style={styles.topContainer}>
                                    <Text style={styles.topTxt}>Pay with Credit and Debit Card </Text>
                                    {
                                       !this.state.isCashOnDelivery?
                                    <TouchableOpacity onPress={()=>this.setState({isCashOnDelivery:!this.state.isCashOnDelivery})}>
                                   <Icon type="MaterialIcons" name="radio-button-on" style={styles.checkStyle}/>
                                   </TouchableOpacity >
                                   : <TouchableOpacity onPress={()=>this.setState({isCashOnDelivery:!this.state.isCashOnDelivery})}>
                                   <Icon type="MaterialIcons" name="radio-button-unchecked" style={styles.checkStyle}/>
                                   </TouchableOpacity>
                                   }
                                </View>
                                <View style={styles.topContainer}>
                                    <Text style={styles.topTxt}>Cash on delivery </Text>
                                   {
                                       this.state.isCashOnDelivery?
                                    <TouchableOpacity onPress={()=>this.setState({isCashOnDelivery:!this.state.isCashOnDelivery})}>
                                   <Icon type="MaterialIcons" name="radio-button-on" style={styles.checkStyle}/>
                                   </TouchableOpacity>
                                   : <TouchableOpacity onPress={()=>this.setState({isCashOnDelivery:!this.state.isCashOnDelivery})}>
                                   <Icon type="MaterialIcons" name="radio-button-unchecked" style={styles.checkStyle}/>
                                   </TouchableOpacity>
                                   }
                                </View>
                                 
                                 { !this.state.isCashOnDelivery?
                                <View style={styles.imgContainer}>
                                    
                                    <TouchableOpacity style={styles.imgSubContainer}>
                                  <Image source={require('../../../assets/card_pic1.png')} style={styles.cardImg}/>
                                  </TouchableOpacity>

                                  <TouchableOpacity style={styles.imgSubContainer}>
                                  <Image source={require('../../../assets/card_pic2.png')} style={styles.cardImg}/>
                                  </TouchableOpacity>

                                  <TouchableOpacity style={styles.imgSubContainer}>
                                  <Image source={require('../../../assets/card_pic3.png')} style={styles.cardImg}/>
                                  </TouchableOpacity>

                                  <TouchableOpacity style={styles.imgSubContainer}>
                                  <Image source={require('../../../assets/card_pic4.png')} style={styles.cardImg}/>
                                  </TouchableOpacity>
                                
                                </View>
                                :null
                                 }

                                 <Text style={styles.paymentTxt}>Payment amount </Text>

                                 <View style={styles.amountContainer}>
                                     <Text style={styles.paymentTxt2}>$456</Text>

                                     <TouchableOpacity>
                                         <Icon name="edit" type="Entypo" style={styles.editImg}/>
                                     </TouchableOpacity>
                                 </View>
                                 { !this.state.isCashOnDelivery?
                                 <View style={styles.formContainer}>
                                      <View style={styles.inputContainer}>
                                            <TextInput 
                                            placeholder="Name On Card"
                                             style={styles.inputStyle}/>
                                      </View>

                                      <View style={styles.inputContainer}>
                                            <TextInput 
                                            placeholder="Card number"
                                             style={styles.inputStyle}/>
                                      </View>
                                      <View style={styles.inputContainer}>
                                          <TouchableOpacity style={styles.expiryRow} onPress={()=>this.setState({expiryFormOpen:!this.state.expiryFormOpen})}>
                                            <Text style={styles.expiryTxt}>Expiry Date</Text>
                                            </TouchableOpacity>
                                      </View>
                                     { 
                                         this.state.expiryFormOpen?
                                      <View style={styles.expireContainer}>
                                      <TextInput 
                                            placeholder="MM"
                                             style={styles.inputStyle2}
                                             keyboardType="number-pad"
                                             />

                                             <TextInput 
                                            placeholder="YYYY"
                                            keyboardType="number-pad"
                                             style={styles.inputStyle3}/>
                                      </View>
                                      :null
                                     }

                                      <View style={styles.inputContainer}>
                                            <TextInput 
                                            placeholder="Security Code"
                                             style={styles.inputStyle}/>
                                      </View>

                                      <View style={styles.inputContainer}>
                                            <TextInput 
                                            placeholder="Zip/Postal Code"
                                             style={styles.inputStyle}/>
                                      </View>

                                 </View>
                                 :null
                                 }

                                 <View style={styles.btnContainer}>
                                         <TouchableOpacity style={styles.btnSubContainer}>
                                             <Text style={styles.btnTxt}>Pay $456</Text>
                                         </TouchableOpacity>
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
    dropshadow: {
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
        padding: 15,
        marginBottom: 60,
        borderRadius: 8
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:20
    },
    topTxt: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '500'
    },
    checkStyle:{
        color:'green',
        fontSize:20
    },
    imgContainer:{
        flexDirection:'row',
        marginTop:10,
    },
    cardImg:{
        width:70,
        height:45,
        resizeMode:'contain'
    },
    imgSubContainer:{
        width:70,
        height:45,
        elevation:3,
        marginRight:15,
        backgroundColor:'#ffffff'
    },
    paymentTxt:{
        fontSize: 15,
        color: '#000000',
        fontWeight: '500',
        paddingTop:20
    },
    amountContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#ffffff',
        elevation:3,
        marginTop:10,
        height:40,
        alignItems:'center'
    },
    paymentTxt2:{
        fontSize: 17,
        color: '#059d14',
        fontWeight: '700',
        paddingLeft:20
    },
    editImg:{
        fontSize: 17,
        color: '#059d14',
        fontWeight: '700',
        paddingRight:20
    },
    formContainer:{
        marginTop:20
    },
    inputContainer:{
       // marginHorizontal:20,
    },
    inputStyle:{
        height:60,
        borderBottomColor:'#a4a4a4',
        borderBottomWidth:1
    },
    expireContainer:{
        flexDirection:'row'
    },
    inputStyle2:{
        height:60,
        width:40,
        borderBottomColor:'#a4a4a4',
        borderBottomWidth:1,
        
    },
    inputStyle3:{
        height:60,
        width:80,
        borderBottomColor:'#a4a4a4',
        borderBottomWidth:1,
        marginLeft:40
        
    },
    expiryRow:{
        height:60,
        borderBottomColor:'#a4a4a4',
        borderBottomWidth:1,
        justifyContent:'center'
    },
    expiryTxt:{
        fontSize:15,
        color:"#a3a3a3"
    },
    btnContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    btnSubContainer:{
        width:150,
        height:60,
        borderRadius:30,
        backgroundColor:'#000000',
        justifyContent:'center',
        alignItems:'center',
    },
    btnTxt:{
        color:"#ffffff",
        fontWeight:'700',
        fontSize:17
    }




});