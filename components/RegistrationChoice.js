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
  BackHandler,
} from 'react-native';
import {USER_ID, USER_TYPE, USER_BUSINESS_TYPE} from '../Services/constant';
import Shadow from 'react-native-simple-shadow-view';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

export default class RegistrationChoice extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      isAuthenticating: true,
    };

    this.doAuthentication();
  }
  async doAuthentication() {
    const userid = await AsyncStorage.getItem(USER_ID);
    if (userid != null && userid != '') {
      // redirect to my drawer
      this.props.navigation.replace('MyDrawer');
    } else {
      this.setState({
        isAuthenticating: false,
      });
    }
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
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
  }

  render() {
    return (
      <ImageBackground
        source={require('../../src/assets/bg.png')}
        style={styles.MainContainer}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: height / 6,
          }}>
          <Image
            source={require('../../src/assets/ugavi_logo.png')}
            style={{width: 130, height: 130, marginBottom: height / 11}}
          />
          {this.state.isAuthenticating ? (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Roboto-Light',
                  color: '#6d6b6c',
                }}>
                Just a sec...
              </Text>
            </View>
          ) : (
            <View style={{width: '100%', alignItems: 'center'}}>
              {/* <View style={{width:'45%'}}>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CarrierRegistration')}>
                                        <View style={styles.btnStyle}>
                                        
                                        <Text style={styles.btnTextStyle}>
                                            I am a Carrier
                                        </Text>
                                
                                        </View>
                                    </TouchableOpacity>
                            
                                    </View> */}
              <View style={styles.shipper}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.replace('CarrierRegistration')
                  }>
                  <View style={styles.button}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: 'black',
                      }}>
                      {' '}
                      I am a Carrier{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* <View style={{marginTop:20,width:'45%'}}>
                                    <TouchableOpacity>
                                        <View style={styles.btnStyle}>
                                        
                                        <Text style={styles.btnTextStyle}>
                                            I am a Shipper
                                        </Text>
                                
                                        </View>
                                    </TouchableOpacity>
                            
                                </View> */}

              <View style={[styles.carrier, {marginTop: 20}]}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.replace('ShipperRegistration')
                  }>
                  <Shadow
                    style={{
                      width: 207,
                      height: 40,
                      shadowColor: '#e13b5a',
                      shadowOpacity: 0.9,
                      shadowRadius: 6,
                      shadowOffset: {width: 5, height: 10},
                      backgroundColor: 'rgba(255,255,255,0.6)',
                    }}>
                    <LinearGradient
                      start={{x: 0.0, y: 0.7}}
                      end={{x: 0.8, y: 1.0}}
                      locations={[0.5, 0.9]}
                      colors={['#e13b5a', '#96177f']}
                      style={styles.linearGradient}>
                      <View style={styles.button1}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: 'Roboto',
                            color: 'white',
                            fontWeight: 'bold',
                          }}>
                          {' '}
                          I am a Shipper
                        </Text>
                      </View>
                    </LinearGradient>
                  </Shadow>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
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
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  carrier: {
    top: 50,
    height: '20%',
    width: '85%',
    borderWidth: 0,
    alignItems: 'center',
    borderColor: 'black',
  },
  linearGradient: {
    padding: 11,
    paddingLeft: 55,
    paddingRight: 55,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: 213,
    //shadowColor:'#e13b5a',
    //elevation:5
  },
  button1: {
    backgroundColor: 'transparent',
  },
  shipper: {
    top: 50,
    height: '20%',
    width: '85%',
    borderWidth: 0,
    alignItems: 'center',
    borderColor: 'black',
  },
  button: {
    padding: 10,
    paddingLeft: 55,
    paddingRight: 55,
    backgroundColor: 'transparent',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'grey',

    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
