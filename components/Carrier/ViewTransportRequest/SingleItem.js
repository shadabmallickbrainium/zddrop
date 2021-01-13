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
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    alignSelf: 'center',
                    backgroundColor: 'green',
                  }}
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
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                  }}
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
            </View>
            <View style={{height: 1, backgroundColor: '#ddd'}} />
            {this.props.item.status == 'Bid now' ? (
              <View
                style={
                  {
                    //   paddingLeft: 10,
                    //   paddingRight: 10,
                    //   paddingBottom: 10,
                    //   paddingTop: 10,
                  }
                }>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.props.onBiddingClick(this.props.item)}
                    style={{flex: 1}}>
                    <View
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingTop: 10,
                        alignItems: 'center',
                      }}>
                      <Text>Start Bidding</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
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
                {/* <View
              style={{
                width: 1,
                height: 'auto',
                backgroundColor: '#ddd',
              }}></View>
            <View style={{flex: 0.5}}>
              <TouchableOpacity onPress={() => this.props.onChatClick()}>
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
            </View> */}
              </View>
            )}
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
