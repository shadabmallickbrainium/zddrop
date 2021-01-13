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
  Keyboard,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CarrierHeaderBack from '../../CarrierNavigation/CarrierHeaderBack';
import Apis from '../../../Services/apis';
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

// bg color - #F4F8FF
// stroke color - #e4e4ee
// white - #FFFFFF
// green - #00d9aa
//<color name="menu_text_color">#3e4958</color>
//<color name="gray_txt_color">#acb1bc</color>

const {width, height} = Dimensions.get('window');
export default class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: false,
    };
  }
  removeExtraCharsFromDot() {
    let x = this.props.item.subscription_title;
    //console.warn('dd','have')
    let y = x.split(' ');
    //console.warn('dd',y[0])
    return y[0].trim();
  }

  returnImage() {
    if (this.props.item.subscription_id == '1') {
      return (
        <Image
          resizeMode="center"
          source={require('../../../assets/basic_blue.png')}
          style={{width: 52, height: 52, tintColor: 'white'}}
        />
      );
    } else if (this.props.item.subscription_id == '2') {
      return (
        <Image
          resizeMode="center"
          source={require('../../../assets/stander_blue.png')}
          style={{width: 52, height: 52, tintColor: 'white'}}
        />
      );
    } else if (this.props.item.subscription_id == '3') {
      return (
        <Image
          source={require('../../../assets/pro_blue.png')}
          resizeMode="center"
          style={{width: 52, height: 52, tintColor: 'white'}}
        />
      );
    } else if (this.props.item.subscription_id == '4') {
      return (
        <Image
          resizeMode="center"
          source={require('../../../assets/stander_blue.png')}
          style={{width: 52, height: 52, tintColor: 'white'}}
        />
      );
    } else {
      return (
        <Image
          resizeMode="center"
          source={require('../../../assets/stander_blue.png')}
          style={{width: 52, height: 52, tintColor: 'white'}}
        />
      );
    }
  }
  returnImage2() {
    if (this.props.item.subscription_id == '1') {
      return (
        <Image
          resizeMode="center"
          source={require('../../../assets/basic_blue.png')}
          style={{width: 52, height: 52, tintColor: '#e13b5a'}}
        />
      );
    } else if (this.props.item.subscription_id == '2') {
      return (
        <Image
          resizeMode="center"
          source={require('../../../assets/stander_blue.png')}
          style={{width: 52, height: 52, tintColor: '#e13b5a'}}
        />
      );
    } else if (this.props.item.subscription_id == '3') {
      return (
        <Image
          source={require('../../../assets/pro_blue.png')}
          resizeMode="center"
          style={{width: 52, height: 52, tintColor: '#e13b5a'}}
        />
      );
    } else if (this.props.item.subscription_id == '4') {
      return (
        <Image
          resizeMode="center"
          source={require('../../../assets/star_d.png')}
          style={{width: 52, height: 52, tintColor: '#e13b5a'}}
        />
      );
    } else {
      return (
        <Image
          resizeMode="center"
          source={require('../../../assets/stander_blue.png')}
          style={{width: 52, height: 52, tintColor: '#e13b5a'}}
        />
      );
    }
  }
  returnDays() {
    if (this.props.item.subscription_duration == '30') {
      return 'Monthly Subscription';
    } else if (this.props.item.subscription_duration == '90') {
      return '3 Months Subscription';
    } else if (this.props.item.subscription_duration == '180') {
      return '6 Months Subscription';
    } else {
      return 'Yearly Subscription';
    }
  }

  showSubscriptionSelection() {
    if (
      this.props.isSubscribedProps &&
      this.props.subsInfo.subscription_id == this.props.item.subscription_id
    ) {
      return (
        <View
          style={{
            marginLeft: 13,
            marginRight: 13,
            marginTop: 10,
            marginBottom: 3,
            flex: 1,
            backgroundColor: '#00d9aa',
            borderRadius: 6,
            borderWidth: 1.1,
            borderColor: '#e4e4ee',
          }}>
          <View
            style={{
              marginLeft: 15,
              marginRight: 15,
              marginTop: 15,
              marginBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>{this.returnImage()}</View>
            <View style={{marginLeft: 15}}>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 16,
                    }}>
                    {this.removeExtraCharsFromDot()}
                  </Text>
                  {this.props.item.subscription_id == '4' ? (
                    <View
                      style={{
                        marginLeft: 7,
                        backgroundColor: '#3e4958',
                        borderRadius: 15,
                        paddingLeft: 13,
                        paddingRight: 13,
                        paddingTop: 4,
                        paddingBottom: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Light',
                          fontSize: 10,
                          color: 'white',
                        }}>
                        BEST VALUE
                      </Text>
                    </View>
                  ) : null}
                </View>

                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 13,
                  }}>
                  {this.returnDays()}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 17,
                }}>
                {'Active'}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginLeft: 13,
            marginRight: 13,
            marginTop: 10,
            marginBottom: 3,
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 6,
            borderWidth: 1.1,
            borderColor: '#e4e4ee',
          }}>
          <View
            style={{
              //marginLeft: 15,
              //marginRight: 15,
              //marginTop: 15,
              // marginBottom: 15,
              flexDirection: 'row',
              //alignItems: 'center',
            }}>
            <View style={{marginLeft: 15, marginTop: 15, marginBottom: 15}}>
              {this.returnImage2()}
            </View>
            <View
              style={{
                marginLeft: 15,
                marginTop: 15,
                marginBottom: 15,
                marginRight: 5,
              }}>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#3e4958',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 16,
                    }}>
                    {this.removeExtraCharsFromDot()}
                  </Text>
                  {this.props.item.subscription_id == '4' ? (
                    <View
                      style={{
                        marginLeft: 7,
                        backgroundColor: '#3e4958',
                        borderRadius: 15,
                        paddingLeft: 13,
                        paddingRight: 13,
                        paddingTop: 4,
                        paddingBottom: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Light',
                          fontSize: 10,
                          color: 'white',
                        }}>
                        BEST VALUE
                      </Text>
                    </View>
                  ) : null}
                </View>

                <Text
                  style={{
                    color: '#3e4958',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 13,
                  }}>
                  {this.returnDays()}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
                //backgroundColor: 'red',
                // marginLeft: 3,
                paddingRight: 8,
              }}>
              <Text
                style={{
                  color: '#e13b5a',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {this.props.item.subscription_amount_kes + ' KES'}
              </Text>
              <Text
                style={{
                  color: '#e13b5a',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 14,
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                {'$' + this.props.item.subscription_amount_dollar}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.onItemClick(this.props.item, this.props.isSubscribedProps)
        }>
        {this.showSubscriptionSelection()}

        {/* <View
          style={{
            marginLeft: 13,
            marginRight: 13,
            marginTop: 10,
            marginBottom: 3,
          }}>
          <View
            style={{
              backgroundColor: 'white',

              elevation: 2,
              borderRadius: 5,
            }}>
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    color: 'black',
                    fontSize: 14,
                  }}>
                  Price :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: 'black',
                    padding: 0,
                    flex: 1,
                    marginLeft: 5,
                  }}
                  numberOfLines={2}>
                  {this.props.item.subscription_amount}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    color: 'black',
                    fontSize: 14,
                  }}>
                  Subscription Plan :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: 'black',
                    padding: 0,
                    flex: 1,
                    marginLeft: 10,
                  }}
                  numberOfLines={2}>
                  {this.removeExtraCharsFromDot()}
                </Text>
              </View>
            </View>
            <View style={{height: 1, backgroundColor: '#ddd'}} />
          </View>
        </View> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnTextStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
