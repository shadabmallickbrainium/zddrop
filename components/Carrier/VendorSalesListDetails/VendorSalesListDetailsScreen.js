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
import { Icon } from 'native-base'
import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import { BoxShadow } from 'react-native-shadow';
import Hud from '../../../views/hud';
import Button from '../../Reusables/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import {calcH,calcW} from '../../../constants/constants'


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


export default class VendorSalesListDetailsScreen extends Component {
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
            isMsgTab: true
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
        this.props.navigation.navigate('CustomerPaymentScreen');

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
                                    }}> Sales List
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
                            <View style={styles.topContainer}>
                        <View style={styles.topSubContainer}>
                            <View style={{ flexDirection: 'row', marginVertical: calcH(0.02), marginHorizontal: calcW(0.04) }}>
                                <View style={styles.tableLeft}>
                                    <Text style={styles.headTxt}>#1002516</Text>
                                    <Text style={styles.headTxt2}>Order Date: 12.06.2020</Text>
                                </View>

                                <View style={styles.tableMiddle}>
                                    <Text style={styles.headTxt}>$234.00</Text>
                                    <Text style={styles.headTxt2}>Item count:<Text style={{ color: '#000000' }}> 2</Text></Text>
                                </View>

                                <View style={styles.tableRight}>
                                    <Text style={styles.timeTxt}>07:02 AM</Text>
                                    <Text style={styles.pendingTxt}>Pendding</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={styles.middleCotainer}>
                        <View style={styles.middleSubContainer}>
                            <TouchableOpacity style={styles.tabHeadLeft} onPress={() => this.setState({ isMsgTab: true })}>
                                <Text style={styles.tabActiveTxt}>Messages</Text>
                                {this.state.isMsgTab ?
                                    <View style={styles.activeLine}></View>
                                    : null
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tabHeadRight} onPress={() => this.setState({ isMsgTab: false })}>
                                <Text style={styles.tabInActive}>Order Error</Text>
                                {!this.state.isMsgTab ?
                                    <View style={styles.activeLine}></View>
                                    : null}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.tabSubContiner}>
                        {
                            this.state.isMsgTab ?
                                <View style={styles.msgContainer}>
                                    {/* Customer Details */}
                                    <TouchableOpacity style={styles.msgTableContainer}>
                                        <View style={{ marginVertical: calcH(0.02) }}>
                                            <Text style={styles.msgTablehead}>Customer Details</Text>
                                            <View style={styles.linerBoder}></View>

                                            <View style={[styles.tableRow, { marginTop: calcH(0.02) }]}>
                                                <Text style={styles.tableLeftTxt}>Name:</Text>
                                                <Text style={styles.tableRighttxt}>John Doe</Text>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableLeftTxt}>Email:</Text>
                                                <Text style={styles.tableRigtActive}>john@gmail.com</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>

                                    {/* Sold to */}
                                    <TouchableOpacity style={styles.msgTableContainer}>
                                        <View style={{ marginVertical: calcH(0.03) }}>
                                            <Text style={styles.msgTablehead}>Sold To</Text>
                                            <View style={styles.linerBoder}></View>

                                            <View style={[styles.tableRow, { marginTop: calcH(0.02) }]}>
                                                <Text style={styles.tableLeftTxt}>Name:</Text>
                                                <Text style={styles.tableRighttxt}>John Doe</Text>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableLeftTxt}>Phone:</Text>
                                                <Text style={styles.tableRigtActive}>+1 123 456 9870</Text>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableLeftTxt}>Address:</Text>
                                                <Text style={styles.tableRighttxt}>729 Timber Oak Drive, Los Angeles,c...</Text>
                                            </View>


                                        </View>
                                    </TouchableOpacity>

                                    {/* Ship to */}
                                    <TouchableOpacity style={styles.msgTableContainer}>
                                        <View style={{ marginVertical: calcH(0.03) }}>
                                            <Text style={styles.msgTablehead}>Ship To</Text>
                                            <View style={styles.linerBoder}></View>

                                            <View style={[styles.tableRow, { marginTop: calcH(0.02) }]}>
                                                <Text style={styles.tableLeftTxt}>Name:</Text>
                                                <Text style={styles.tableRighttxt}>John Doe</Text>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableLeftTxt}>Phone:</Text>
                                                <Text style={styles.tableRigtActive}>+1 123 456 9870</Text>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableLeftTxt}>Address:</Text>
                                                <Text style={styles.tableRighttxt}>729 Timber Oak Drive, Los Angeles,c...</Text>
                                            </View>


                                        </View>
                                    </TouchableOpacity>

                                    {/* Billing info */}
                                    <TouchableOpacity style={styles.msgTableContainer}>
                                        <View style={{ marginVertical: calcH(0.03) }}>
                                            <Text style={styles.msgTablehead}>Billing info</Text>
                                            <View style={styles.linerBoder}></View>

                                            <View style={[styles.tableRow, { marginTop: calcH(0.02) }]}>
                                                <Text style={styles.tableLeftTxt}>Shipping Cost:</Text>
                                                <Text style={styles.tableRighttxt}>$23.00</Text>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableLeftTxt}>Payment Method:</Text>
                                                <Text style={styles.tableRighttxt}>Money Order</Text>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableLeftTxt}>Item Count:</Text>
                                                <Text style={styles.tableRighttxt}>2</Text>

                                            </View>

                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableLeftTxt}>Sub Total:</Text>
                                                <Text style={styles.tableRighttxt}>$50.00</Text>
                                            </View>


                                        </View>
                                    </TouchableOpacity>

                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity style={styles.btnSubContainer}>
                                            <Text style={styles.btnTxt}>Print Invoice</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.btnSubContainer2}>
                                            <Text style={styles.btnTxt2}>Customer Review</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                : <View style={styles.msgContainer}>
                                    <Text>Order Error</Text>
                                </View>
                        }
                    </View>

                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}


export const TableComponent = ({ saleStatus }) => {
    return (
        <TouchableOpacity style={styles.msgTableContainer}>

            <Text style={styles.msgTablehead}>Customer Details</Text>

            <View style={[styles.tableRow, { marginTop: calcH(0.02) }]}>
                <Text style={styles.tableLeftTxt}>Name:</Text>
                <Text style={styles.tableRighttxt}>John Doe</Text>
            </View>

            <View style={styles.tableRow}>
                <Text style={styles.tableLeftTxt}>Email:</Text>
                <Text style={styles.tableRigtActive}>john@gmail.com</Text>
            </View>

            <View style={styles.linerBoder}></View>
        </TouchableOpacity>
    )
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
    topContainer: {
        marginTop: 20,
        marginHorizontal: 20
    },
    topSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterStyle: {
        fontSize: 25,
    },
    topTxt: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '700'
    },
    topTxt2: {
        fontSize: 15,
        color: 'grey',
        fontWeight: '300'
    },
    topTxt3: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '700'
    },
    middleContainer: {
        marginTop: 20,
        marginHorizontal: 20
    },
    tableContainer: {
        // flexDirection:'row',
        marginTop:20
    },
    tableLeft: {
        width: '34%',
        justifyContent: 'center'

    },
    tableRight: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    tableMiddle: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headTxt: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500'
    },
    headTxt2: {
        fontSize: 15,
        color: 'grey',
        fontWeight: '500'
    },
    timeTxt: {
        fontSize: 12,
        color: 'grey',
        fontWeight: '500'
    },
    pendingTxt: {
        fontSize: 15,
        color: 'green',
        fontWeight: '500'
    },
    cancelTxt: {
        fontSize: 15,
        color: 'red',
        fontWeight: '500'
    },
    proccesing: {
        fontSize: 15,
        color: 'yellow',
        fontWeight: '500'
    },
    linerBoder: {
        // marginHorizontal:20,
        borderBottomColor: '#a2a2a2',
        borderBottomWidth: 0.2,
        marginTop: 20
    },
     // ********
     middleCotainer: {

        marginTop: calcH(0.02),
        marginHorizontal: calcW(0.04)
    },
    middleSubContainer: {
        flexDirection: 'row',
    },
    tabHeadLeft: {

    },
    tabHeadRight: {
        marginLeft: calcW(0.1)
    },
    tabActiveTxt: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500',
        paddingLeft: calcW(0.04)
    },
    tabInActive: {
        fontSize: 16,
        color: '#929292',
        fontWeight: '500'
    },
    msgContainer: {
        marginTop: calcH(0.01),
        marginBottom: calcH(0.03)
    },
    notificationContainer: {
        marginTop: calcH(0.02)
    },
    tabSubContiner: {
        marginTop: calcH(0.02),
        marginHorizontal: calcW(0.04)
    },
    msgTablehead: {
        //paddingTop:calcH(0.02),
        color: '#929292',
        fontSize: 15,
        fontWeight: '500',
        paddingLeft: calcW(0.04)
    },
    msgTableContainer: {
        backgroundColor: '#ffffff',
        elevation: 3,
        marginTop: calcH(0.01)
    },
    tableRow: {
        flexDirection: 'row',
        marginHorizontal: calcW(0.04)
    },
    tableLeftTxt: {
        color: '#929292',
        fontSize: 14,
        fontWeight: '500',
    },
    tableRighttxt: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: calcW(0.02)
    },
    tableRigtActive: {
        color: '#059d14',
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: calcW(0.02)
    },
    btnContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:calcH(0.03),
     
    },
    btnSubContainer:{
      justifyContent:'center',
      alignItems:'center',
     
      width:calcW(0.6),
      height:calcH(0.07),
      borderRadius:calcH(0.06),
      borderColor:'#8D8D8D',
      borderWidth:1
  },
  btnTxt:{
      fontSize:15,
      color:'#444242'
  },
  btnSubContainer2:{
      marginTop:calcH(0.03),
      justifyContent:'center',
      alignItems:'center',
     backgroundColor:"#8F3EC9",
      width:calcW(0.6),
      height:calcH(0.07),
      borderRadius:calcH(0.06),
      borderColor:'#8F3EC9',
      borderWidth:1
  },
  btnTxt2:{
      fontSize:15,
      color:'#ffffff'
  }



});