import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
  button,
  TextInput,
  FlatList,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import CarrierHeaderBack from './../CarrierNavigation/CarrierHeaderBack';
import Apis from './../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
} from './../../Services/constant';
import CommonToast from './../../views/common-toast';
import {BoxShadow} from 'react-native-shadow';
import Hud from './../../views/hud';
import Shadow from 'react-native-simple-shadow-view';
import SingleItem from './SingleItem';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      chatArray: [],
      chatMessage: '',
      userType: '',
      isInitialized: false,

      isSendingMessage: true,
    };
    this.getUserType();
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getAllChat();
    }, 2000);
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    console.warn('ff', 'jj');
    this.props.navigation.goBack();
    clearInterval(this.interval);
    return true;
  }
  async getAllChat() {
    if (!this.state.isInitialized) {
      Hud.showHud();
    }
    const userid = await AsyncStorage.getItem(USER_ID);
    const usertype = await AsyncStorage.getItem(USER_TYPE);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    //console.warn('userdid ', userid + ' and ' + usertype);
    var url = '';
    if (usertype == '1') {
      // shipper
      //http://mydevfactory.com/~shreya/ugavi_africa/Api/getShipperChat/shipper_id/11/booking_id/4/carrier_id/10
      url =
        '/getShipperChat/shipper_id/' +
        this.props.route.params.singleitem.shipper_id +
        '/booking_id/' +
        this.props.route.params.singleitem.booking_id +
        '/carrier_id/' +
        this.props.route.params.singleitem.carrier_id;
    } else if (usertype == '2') {
      // carrier
      url =
        '/getCarrierChat/carrier_id/' +
        this.props.route.params.singleitem.carrier_id +
        '/booking_id/' +
        this.props.route.params.singleitem.booking_id +
        '/shipper_id/' +
        this.props.route.params.singleitem.shipper_id;
    }

    await Apis.getAllChat(url, '')
      .then(async res => {
        Hud.hideHud();
        //console.warn('Rwes', res);
        if (res.status == '1') {
          this.setState({
            chatArray: res.data.reverse(),
            isInitialized: true,
          });
          //CommonToast.showToast(res.msg, 'success');
        } else {
          CommonToast.showToast(res.msg, 'error');
          this.setState({
            isInitialized: true,
          });
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  async getUserType() {
    const usertype = await AsyncStorage.getItem(USER_TYPE);
    this.setState({
      userType: usertype,
    });
  }

  onChangeInput = text => {
    if (text == '') {
      this.setState({isSendingMessage: true});
    } else {
      this.setState({isSendingMessage: false});
    }
    this.setState({chatMessage: text});
  };

  async sendChat() {
    //Hud.showHud();

    const userid = await AsyncStorage.getItem(USER_ID);
    const usertype = await AsyncStorage.getItem(USER_TYPE);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid + ' and ' + usertype);
    var url = '';
    var chatObj = {
      carrier_id: '',
      booking_id: '',
      shipper_id: '',
      content: '',
    };
    if (usertype == '1') {
      // shipper
      url = '/saveShipperChat';
      chatObj.shipper_id = userid;
      chatObj.carrier_id = this.props.route.params.singleitem.carrier_id;
      chatObj.booking_id = this.props.route.params.singleitem.booking_id;
      chatObj.content = this.state.chatMessage;
    } else if (usertype == '2') {
      // carrier
      url = '/saveCarrierChat';
      chatObj.carrier_id = userid;
      chatObj.shipper_id = this.props.route.params.singleitem.shipper_id;
      chatObj.booking_id = this.props.route.params.singleitem.booking_id;
      chatObj.content = this.state.chatMessage;
    }

    this.setState({
      isSendingMessage: true,
    });

    // carrier_id
    // booking_id
    // shipper_id
    // content
    console.warn('dd', chatObj);
    await Apis.saveChat(url, chatObj)
      .then(async res => {
        Hud.hideHud();
        console.warn('Rwes', res);
        if (res.status == '1') {
          this.textInput.clear();
          this.setState({
            chatMessage: '',
          });
          //this.getAllChat()
          //CommonToast.showToast(res.msg, 'success');
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View
              style={{
                height: 60,
                width: '100%',
                backgroundColor: '#e13b5a',
                flexDirection: 'row',
              }}>
              {/* <TouchableOpacity style={{backgroundColor:'black'}}>
                    <Image source={require('../../../src/assets/menu.png')} style={{width:24,height:24,marginLeft:13}}/>

                </TouchableOpacity> */}

              <View style={{width: 60, height: 60}}>
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    paddingLeft: 13,
                  }}
                  onPress={() => this.handleBackButtonClick()}>
                  <Image
                    source={require('../../../src/assets/arrow_back.png')}
                    style={{width: 28, height: 28, tintColor: 'white'}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.textStyle}>Chat</Text>
              </View>
            </View>
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <FlatList
                data={this.state.chatArray}
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}
                inverted={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item, index}) => {
                  return (
                    <SingleItem
                      item={item}
                      index={index}
                      usertype={this.state.userType}
                    />
                  );
                }}
              />
            </View>
            <View style={{backgroundColor: 'white'}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 13,
                  marginRight: 13,
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: '#e7edf8',
                  borderRadius: 5,
                }}>
                <View style={{flex: 1}}>
                  <TextInput
                    style={{
                      paddingBottom: 10,
                      paddingTop: 10,
                      paddingRight: 10,
                      paddingLeft: 10,

                      fontFamily: 'Roboto-Regular',
                      fontSize: 15,
                      color: 'black',
                    }}
                    ref={input => {
                      this.textInput = input;
                    }}
                    onChangeText={this.onChangeInput}
                    //onChangeText={vlength => this.setState({vlength})}
                    placeholder={'Type your message'}
                    placeholderTextColor={'#555455'}
                  />
                </View>
                <View style={{width: 50, height: '100%'}}>
                  {this.state.isSendingMessage ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../assets/send.png')}
                        style={{
                          width: 25,
                          height: 25,
                          tintColor: '#e13b5a',
                          opacity: 0.5,
                        }}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => this.sendChat()}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../assets/send.png')}
                          style={{width: 25, height: 25, tintColor: '#e13b5a'}}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 19,
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
});
export default Chat;
