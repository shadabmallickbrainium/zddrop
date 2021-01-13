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

const {width, height} = Dimensions.get('window');
export default class SingleItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
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
          <TouchableOpacity
            onPress={() => this.props.onBiddingClick(this.props.item)}>
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                {/* <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    alignSelf: 'center',
                    backgroundColor: 'green',
                  }}
                /> */}
                <Image
                  source={require('../../../assets/dot.png')}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: 'green',
                    alignSelf: 'center',
                    backgroundColor: '',
                    padding: 0,
                  }}
                  resizeMode="cover"
                />
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
                  {this.props.item.pickup_address}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 7}}>
                {/* <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                  }}
                /> */}
                <Image
                  source={require('../../../assets/dot.png')}
                  style={{
                    width: 18,
                    height: 18,
                    alignSelf: 'center',
                    tintColor: 'red',
                    backgroundColor: '',
                    padding: 0,
                  }}
                  resizeMode="cover"
                />
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
                  {this.props.item.dropoff_address}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                {this.props.item.assign_driver_status == '0' ? (
                  <Image
                    source={require('../../../assets/error.png')}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: 'grey',
                      alignSelf: 'center',
                      backgroundColor: '',
                      padding: 0,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/tick_outline.png')}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: 'green',
                      alignSelf: 'center',
                      backgroundColor: '',
                      padding: 0,
                    }}
                    resizeMode="cover"
                  />
                )}

                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: 14,
                    color: 'black',
                    padding: 0,
                    flex: 1,
                    marginLeft: 10,
                  }}
                  numberOfLines={2}>
                  {this.props.item.assign_driver_status == '0'
                    ? 'Driver is not assigned yet'
                    : 'Driver is assigned'}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 7}}>
                {this.props.item.assign_vehicle_status == '0' ? (
                  <Image
                    source={require('../../../assets/error.png')}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: 'grey',
                      alignSelf: 'center',
                      backgroundColor: '',
                      padding: 0,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/tick_outline.png')}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: 'green',
                      alignSelf: 'center',
                      backgroundColor: '',
                      padding: 0,
                    }}
                    resizeMode="cover"
                  />
                )}

                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: 14,
                    color: 'black',
                    padding: 0,
                    flex: 1,
                    marginLeft: 10,
                  }}
                  numberOfLines={2}>
                  {this.props.item.assign_vehicle_status == '0'
                    ? 'Vehicle is not assigned yet'
                    : 'Vehicle is assigned'}
                </Text>
              </View>
            </View>
            <View
              style={{marginLeft: 13, marginBottom: 10, flexDirection: 'row'}}>
              <Text style={{fontFamily: 'Roboto-Bold', fontSize: 15}}>
                {'Bid Price : ' + this.props.item.bid_amount + ' KES'}
              </Text>
              {/* <Text style={{fontFamily: 'Roboto-Bold', fontSize: 16}}>
              $20/hr
            </Text> */}
            </View>
            <View style={{height: 1, backgroundColor: '#ddd'}} />
            <View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 0.5,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.props.onBiddingClick(this.props.item)}>
                    <View
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingTop: 10,
                        alignItems: 'center',
                      }}>
                      <Text>View Details</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: 1,
                    height: 'auto',
                    backgroundColor: '#ddd',
                  }}
                />
                <View style={{flex: 0.5}}>
                  <TouchableOpacity
                    onPress={() => this.props.onChatClick(this.props.item)}>
                    <View
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingTop: 10,
                        alignItems: 'center',
                      }}>
                      <Text>Chat Now</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.onBiddingClick(this.props.item.booking_id)
                }
                style={{flex: 1}}>
                <View
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                    alignItems: 'center',
                  }}>
                  <Text> Bidding Confirmed</Text>
                </View>
              </TouchableOpacity>
            </View> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
