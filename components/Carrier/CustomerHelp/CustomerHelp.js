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

export default class CustomerHelp extends Component {
    constructor(props) {
      super(props);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
        isApiCalling: false,
        eyeIcon: 'off',
        passwordVisible: true,
        rememberMe: true,
        isAuthenticating: true,
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
    render() {
      return (
        <ImageBackground
          style={styles.MainContainer}>
          <SafeAreaView style={{flex: 1}}>

              <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView
                  style={{}}
                  contentcontainerstyle={{paddingBottom: 20}}
                  keyboardShouldPersistTaps="handled">
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
                        }}> Help 
                        </Text>
                      </View>
                      </View>
                </View>




                <View style={{marginTop: 20,marginBottom: 10, marginLeft: 25, marginRight: 25,backgroundColor : "white",shadowColor: '#000',shadowOffset: {width: 0, height: 2 },  shadowOpacity: 0.25,  elevation: 20,padding:15, paddingBottom:30, marginBottom:50, borderRadius:8  }}>
                
                    <View style={{width:100,marginTop: 10, position:'relative', color:'#2a2a2a', marginLeft: 'auto', alignSelf: 'center',marginRight:'auto'}}>
                    <TouchableOpacity style={{position:'relative',width:100, marginLeft:'auto',marginRight:'auto'}}>
                          <Image
                            source={require('../../../assets/profile_pic.png')}
                            style={{width: 100, height: 100,borderRadius: 100/2 }}
                          />

                      
                    </TouchableOpacity>
                  </View>
                    
                  <View style={{width: '100%',color:'#2a2a2a', marginTop:10}}>
                      <Text
                        style={{fontWeight:"bold", fontFamily: 'Roboto-Regular', fontSize: 18,color: '#2a2a2a',alignSelf: 'center'}}>
                      Need some helps?
                      </Text>
                      <Text
                        style={{ fontFamily: 'Roboto-Regular',color: '#afafaf',alignSelf: 'center'}}>
                     Get lost? Don't know how to use?
Feel free to get in touch with us.
                      </Text>
                  </View>


                  
                  <View  style={{fontFamily: 'Roboto-Regular', fontSize: 16,color: '#6d6b6c',alignSelf: 'center', textAlign:'center', width:250, marginTop:20}} >

                  <TouchableOpacity>
                  <View style={{flexDirection: 'row',alignSelf: 'center', textAlign:'center'}}>
                    <Text
                      style={{marginLeft: 5,color:'#fff',backgroundColor:"#000",padding:17,width:250,textAlign:'center',borderRadius: 60/2,  fontFamily: 'Roboto-Bold', borderColor: 'black',
                      borderWidth: 2}}>
                      Contact Us
                    </Text>
                  </View>
                  </TouchableOpacity>
                  </View>
                  <TouchableOpacity   onPress={() =>
                        this.props.navigation.navigate('CustomerFaq')
                      }>
                  <View   style={{fontFamily: 'Roboto-Regular', fontSize: 16,color: '#6d6b6c',alignSelf: 'center',width:250, marginTop:20}} >
                  <Text
                      style={{marginLeft: 5,color:'#000',backgroundColor:"white",padding:17,width:250,textAlign:'center',borderRadius: 60/2,  fontFamily: 'Roboto-Bold', borderColor: 'black',
                      borderWidth: 2}}>
                      Frequently Asked Questions
                    </Text>
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity   onPress={() =>
                        this.props.navigation.navigate('VendorManageProducts')
                      }>
                  <View   style={{fontFamily: 'Roboto-Regular', fontSize: 16,color: '#6d6b6c',alignSelf: 'center',width:250, marginTop:20}} >
                  <Text
                      style={{marginLeft: 5,color:'#000',backgroundColor:"white",padding:17,width:250,textAlign:'center',borderRadius: 60/2,  fontFamily: 'Roboto-Bold', borderColor: 'black',
                      borderWidth: 2}}>
                  Customer Store Product List
                    </Text>
                  </View>
                  </TouchableOpacity>
                                    
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
  });