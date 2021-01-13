import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Keyboard,
  BackHandler,
  Image,
  StyleSheet,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import moment from 'moment';
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
import SingleItem from './SingleItem';
export default class CarrierSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      isModalOpen: false,
      userid: '',
      subscriptionId: '',
      visible: true,
      isSubscribed: false,
      subscribedInfo: null,
    };
  }
  componentDidMount() {
    this.getMySubscription();
    ///this.getSubscriptionInfo();
  }

  async getMySubscription() {
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    // http://mydevfactory.com/~shreya/ugavi_africa/Api/getCarrierSubscription/carrier_id/52
    var url = '/mySubscription/carrier_id/' + userid;

    //http://mydevfactory.com/~shreya/ugavi_africa/Api/getBookingList/carrier_id/10/pagination/0

    await Apis.getMySubscription(url, '')
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          this.setState({
            isSubscribed: true,
            subscribedInfo: res.data,
          });

          this.getSubscriptionInfo(res);
        } else {
          this.getSubscriptionInfo(res);
        }
      })
      .catch(error => {
        Hud.hideHud();

        console.error(error);
      });
  }
  Show_Custom_Alert(visible, check) {
    this.setState({
      isModalOpen: visible,
    });
  }
  async getSubscriptionInfo(subscriptionStatus) {
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    // http://mydevfactory.com/~shreya/ugavi_africa/Api/getCarrierSubscription/carrier_id/52
    var url = '/getCarrierSubscription/carrier_id/' + userid;

    //http://mydevfactory.com/~shreya/ugavi_africa/Api/getBookingList/carrier_id/10/pagination/0

    await Apis.getSubscriptionInfo(url, '')
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          //CommonToast.showToast(res.msg,'success')
          if (res.data != null && res.data.length > 0) {
            this.setState({
              data: [],
              data: res.data,
              isLoading: false,
              userid: userid,
            });
          }
        } else {
          this.setState({
            isLoading: false,
            userid: userid,
          });
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        this.setState({
          isLoading: false,
          userid: userid,
        });
        console.error(error);
      });
  }

  onItemClick = async (item, ch) => {
    console.warn('item', item);
    if (ch) {
      // this.setState({
      //   isModalOpen: true,
      //   subscriptionId: item.subscription_id,
      // });
      console.warn('item', item);
    } else {
      this.setState({
        isModalOpen: true,
        subscriptionId: item.subscription_id,
      });
    }
  };

  returnActivatedText() {
    if (this.state.isSubscribed) {
      if (this.state.subscribedInfo) {
        return this.state.subscribedInfo.subscription_title + ' Activated';
      }
    } else {
      return 'Please Select A Plan';
    }
  }

  returnValidityText() {
    if (this.state.isSubscribed) {
      if (this.state.subscribedInfo) {
        var dd = moment().format('YYYY-MM-DD');
        console.warn('cdate', dd);
        var now = moment(dd); //todays date
        var end = moment(this.state.subscribedInfo.subscription_end_date); // another date
        var duration = moment.duration(end.diff(now));
        var days = duration.asDays();
        console.warn('days', days);
        if (days != null && days > 0) {
          return days + ' days remaining';
        } else {
          return 'No Plan Is Activated';
        }
      }
    } else {
      return 'No Plan Is Activated';
    }
  }

  renderViewAsPerCondition() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            animating={true}
            color="#e13b5a"
            size="large"
            style={{}}
          />
        </View>
      );
    } else if (this.state.data != null && this.state.data.length > 0) {
      return (
        <View style={{flex: 1, backgroundColor: '#F4F8FF'}}>
          <View style={{backgroundColor: '#e13b5a'}}>
            <View
              style={{
                marginTop: 10,
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                paddingLeft: 25,
                paddingRight: 25,
                paddingBottom: 10,
                paddingTop: 10,
              }}>
              <Text
                style={{
                  color: '#3e4958',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                }}>
                {this.returnValidityText()}
              </Text>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 12,
                fontSize: 14,
              }}>
              {this.returnActivatedText()}
            </Text>
          </View>

          <Text
            style={{
              color: '#acb1bc',
              marginLeft: 13,
              marginTop: 10,
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 15,
            }}>
            {!this.state.isSubscribed
              ? 'Select a Plan'
              : 'Plan has been activated'}
          </Text>
          <FlatList
            data={this.state.data}
            contentContainerStyle={{paddingBottom: 15}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item, index}) => {
              return (
                <SingleItem
                  item={item}
                  index={index}
                  onItemClick={this.onItemClick}
                  subsInfo={this.state.subscribedInfo}
                  isSubscribedProps={this.state.isSubscribed}
                />
              );
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 15,
              marginRight: 15,
              fontFamily: 'Roboto-Regular',
              textAlign: 'center',
            }}>
            Subscription is not added yet by Admin and will appear here once
            they are added
          </Text>
        </View>
      );
    }
  }
  handleResponse = data => {
    console.warn('resss', data);
    console.warn('resss_OOOO', data.title);
    if (data.title == 'Payment Success') {
      //this.Show_Custom_Alert(false);
      this.setState({
        isLoading: true,
        isModalOpen: false,
        data: [],
      });
      this.getMySubscription();
    } else if (data.title == 'Payment Cancel') {
      this.setState({
        isModalOpen: false,
      });
    } else {
      //this.Show_Custom_Alert(false);
      return;
    }
  };
  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="#e13b5a"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
  showSpinner() {
    console.log('Show Spinner');
    this.setState({visible: true});
  }

  hideSpinner() {
    console.log('Hide Spinner');
    this.setState({visible: false});
  }

  showPaymentWebview() {
    //http://mydevfactory.com/~shreya/ugavi_africa/subscription/payment_subscription_webview/0/52
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri:
              'http://mydevfactory.com/~shreya/ugavi_africa/subscription/payment_subscription_webview/' +
              this.state.subscriptionId +
              '/' +
              this.state.userid,
          }}
          renderLoading={this.ActivityIndicatorLoadingView}
          //Want to show the view or not
          startInLoadingState={true}
          // onLoadStart={() => this.showSpinner()}
          // onLoad={() => this.hideSpinner()}
          onNavigationStateChange={data => this.handleResponse(data)}
          injectedJavaScript={`document.f1.submit()`}
        />
        {/* {this.state.visible && (
          <ActivityIndicator
            color="#e13b5a"
            style={{
              flex: 1,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size="large"
          />
        )} */}
      </View>
    );
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Modal
              visible={this.state.isModalOpen}
              transparent={true}
              animationType={'fade'}
              onRequestClose={() => {
                this.Show_Custom_Alert(!this.state.isModalOpen);
              }}>
              {this.showPaymentWebview()}
            </Modal>
            {/* <CarrierHeaderBack
              navProps={this.props.navigation}
              title={'View Subscription'}
            /> */}
            <View style={{backgroundColor: '#e13b5a'}}>
              <View
                style={{
                  width: '100%',

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
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      source={require('../../../assets/arrow_back.png')}
                      style={{width: 28, height: 28, tintColor: 'white'}}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Subscription
                  </Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </View>
              </View>
            </View>
            {this.renderViewAsPerCondition()}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleNew: {
    flex: 1,
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
