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


export default class VendorSalesListScreen extends Component {
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
            isLoading: false
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
                                    <View>
                                        <Text style={styles.topTxt}>Sales</Text>
                                        <Text style={styles.topTxt2}>Date: <Text style={styles.topTxt3}>12/12/2020</Text></Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Icon name="filter" type="AntDesign" style={styles.filterStyle} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.middleContainer}>
                                  <TableComponent 
                                  saleStatus="Pending"
                                  onPress={()=>this.props.navigation.navigate('VendorSalesListDetailsScreen')}
                                  />
                                  <TableComponent 
                                  saleStatus="Cancel"
                                  onPress={()=>this.props.navigation.navigate('VendorSalesListDetailsScreen')}
                                  />
                                  <TableComponent 
                                  saleStatus="Proccessing"
                                  onPress={()=>this.props.navigation.navigate('VendorSalesListDetailsScreen')}
                                  />
                                  <TableComponent 
                                  saleStatus="Pending"
                                  onPress={()=>this.props.navigation.navigate('VendorSalesListDetailsScreen')}
                                  />
                                  <TableComponent 
                                  saleStatus="Cancel"
                                  onPress={()=>this.props.navigation.navigate('VendorSalesListDetailsScreen')}
                                  />
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}


export const TableComponent = ({saleStatus,onPress }) => {
    return (
        <TouchableOpacity style={styles.tableContainer} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.tableLeft}>
                    <Text style={styles.headTxt}>#1002516</Text>
                    <Text style={styles.headTxt2}>Harsh Bajaj</Text>
                </View>

                <View style={styles.tableMiddle}>
                    <Text style={styles.headTxt}>$234.00</Text>
                    <Text style={styles.headTxt2}>Item count:<Text style={{ color: '#000000' }}> 2</Text></Text>
                </View>

                <View style={styles.tableRight}>
                    <Text style={styles.timeTxt}>07:02 AM</Text>
                    <Text style={saleStatus==="Pending"?styles.pendingTxt:saleStatus==="Cancel"?styles.cancelTxt:styles.proccesing}>{saleStatus}</Text>
                </View>
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
    }


});