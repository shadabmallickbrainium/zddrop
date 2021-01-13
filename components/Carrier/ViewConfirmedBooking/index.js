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
  ActivityIndicator,
  FlatList,
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
import SingleItem from './SingleItem';

const {width, height} = Dimensions.get('window');
export default class ViewConfirmedBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetching_from_server: true,
      isLoading: true,
    };
    this.page = 0;
  }
  componentDidMount() {
    this.getConfirmedBookingList();
  }

  async getConfirmedBookingList(isLoaderVisible) {
    this.page = 0;
    if (isLoaderVisible != null && isLoaderVisible) {
      Hud.showHud();
    }
    //  Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    var url =
      '/getConfirmedBookingList/carrier_id/' +
      userid +
      '/pagination/' +
      this.page;

    //http://mydevfactory.com/~shreya/ugavi_africa/Api/getBookingList/carrier_id/10/pagination/0

    await Apis.getConfirmedBookingList(url, '')
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
            });
          }
        } else {
          this.setState({
            data: [],
            isLoading: false,
          });
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();

        console.error(error);
      });
  }

  //   async doChangePass() {

  //     await Apis.changePassword(data)
  //       .then(async res => {
  //         console.warn('Rwes', res);
  //         if (res.status == '1') {
  //           Hud.hideHud();
  //           CommonToast.showToast(res.msg, 'success');
  //         } else {
  //           Hud.hideHud();
  //           CommonToast.showToast(res.msg, 'error');
  //         }
  //       })
  //       .catch(error => {
  //         Hud.hideHud();
  //         console.error(error);
  //       });
  //   }

  onBidClick = async item => {
    this.props.navigation.navigate('ViewConfirmedBookingDetails', {
      bookingid: item.booking_id,
      //refresh: this.doRefresh,
    });
  };
  onChatClick = async item => {
    console.warn('gg', 'chat');
    this.props.navigation.navigate('Chat', {
      singleitem: item,
    });
  };

  onPageRefresh = async () => {
    this.getConfirmedBookingList(true);
  };

  async onLoadMoreBookingList() {
    this.page = this.page + 10;
    // Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    var url =
      '/getConfirmedBookingList/carrier_id/' +
      userid +
      '/pagination/' +
      this.page;

    //http://mydevfactory.com/~shreya/ugavi_africa/Api/getBookingList/carrier_id/10/pagination/0

    await Apis.getCarrierBookingList(url, '')
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          //CommonToast.showToast(res.msg,'success')
          if (res.data != null && res.data.length > 0) {
            this.setState({
              data: [...this.state.data, ...res.data],
              fetching_from_server: false,
            });
          } else {
            this.setState({
              fetching_from_server: false,
            });
          }
        } else {
          this.setState({
            fetching_from_server: false,
          });
          //CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  renderFooter() {
    return (
      //Footer View with Load More button
      <View>
        {this.state.fetching_from_server ? (
          <ActivityIndicator
            animating={true}
            color="#e13b5a"
            size="large"
            style={{}}
          />
        ) : null}
      </View>
    );
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
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <FlatList
            data={this.state.data}
            contentContainerStyle={{paddingBottom: 15}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooter.bind(this)}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              console.warn('on end reached ', distanceFromEnd);
              this.onLoadMoreBookingList();
            }}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item, index}) => {
              return (
                <SingleItem
                  item={item}
                  index={index}
                  onBiddingClick={this.onBidClick}
                  onChatClick={this.onChatClick}
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
          <Text style={{fontSize: 16, fontFamily: 'Roboto-Regular'}}>
            No data found.
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <CarrierHeaderBack
              navProps={this.props.navigation}
              title={'All Confirmed Booking'}
              onRefreshPress={this.onPageRefresh}
              isRefreshVisible={true}
            />
            {this.renderViewAsPerCondition()}
          </View>
        </SafeAreaView>
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
