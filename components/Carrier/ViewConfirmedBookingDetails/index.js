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
  ActivityIndicator,
  Dimensions,
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
import RBSheet from 'react-native-raw-bottom-sheet';

const {width, height} = Dimensions.get('window');
export default class ViewConfirmedBookingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      driverArray: [],
      driver_search_txt: '',
      vehcile_search_txt: '',
      fetching_from_server: true,
      vehicleArray: [],
      dropAddress: '',
      pickAddress: '',
      truckQuantity: '',
      equipmentType: '',
      length: '',
      height: '',
      width: '',
      load: '',
      isDangerous: '',
      description: '',
      pickUpDate: '',
      bidAmount: '',
      inputBiddingPrice: '',
      dimension: 0,
      isDriverAssigned: '',
      isVehicleAssigned: '',
      fullResponse: '',
    };
    this.page = 0;
    this.page1 = 0;
  }

  componentDidMount() {
    this.getBookingDetails();
  }

  openDriverSheet() {
    if (this.state.isDriverAssigned == '0') {
      this.RBSheet.open();
      this.getAllDriverList();
    } else {
      this.RBSheetViewDriver.open();
    }
  }

  openVehicleSheet() {
    if (this.state.isVehicleAssigned == '0') {
      this.RBSheet1.open();
      this.getAllVehicleList();
    } else {
      this.RBSheetViewVehicle.open();
    }
  }
  async onLoadMoreDrivers() {
    this.page = this.page + 10;
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    var url = '';
    if (this.state.driver_search_txt != '') {
      url =
        '/getDriverList/carrier_id/' +
        userid +
        '/search_text/' +
        this.state.driver_search_txt +
        '/pagination/' +
        this.page;
    } else {
      url =
        '/getDriverList/carrier_id/' +
        userid +
        '/search_text/none/pagination/' +
        this.page;
    }
    await Apis.getAllDriverList(url, '')
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          //CommonToast.showToast(res.msg,'success')
          if (res.data != null && res.data.length > 0) {
            this.setState({
              driverArray: [...this.state.driverArray, ...res.data],
              fetching_from_server: false,
            });
          }
        } else {
          this.setState({
            fetching_from_server: false,
          });
          //CommonToast.showToast(res.msg,'error')
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  async getAllDriverList() {
    this.page = 0;
    //Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    var url = '';
    if (this.state.driver_search_txt != '') {
      url =
        '/getDriverList/carrier_id/' +
        userid +
        '/search_text/' +
        this.state.driver_search_txt +
        '/pagination/' +
        this.page;
    } else {
      url =
        '/getDriverList/carrier_id/' +
        userid +
        '/search_text/none/pagination/' +
        this.page;
    }
    await Apis.getAllDriverList(url, '')
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          //CommonToast.showToast(res.msg,'success')
          if (res.data != null && res.data.length > 0) {
            this.setState({
              driverArray: [],
              driverArray: res.data,
            });
          }
        } else {
          this.setState({
            driverArray: [],
          });
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  async getAllVehicleList() {
    this.page1 = 0;
    //Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    var url = '';
    if (this.state.vehcile_search_txt != '') {
      url =
        '/vehicleList/carrier_id/' +
        userid +
        '/search_text/' +
        this.state.vehcile_search_txt +
        '/pagination/' +
        this.page1;
    } else {
      url =
        '/vehicleList/carrier_id/' +
        userid +
        '/search_text/none/pagination/' +
        this.page1;
    }
    await Apis.getVehicleList(url, '')
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          //CommonToast.showToast(res.msg,'success')
          if (res.data != null && res.data.length > 0) {
            this.setState({
              vehicleArray: [],
              vehicleArray: res.data,
            });
          }
        } else {
          this.setState({
            vehicleArray: [],
          });
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  async onLoadMorevehicle() {
    //   setTimeout(()=>{
    //  this.setState({
    //       fetching_from_server:true
    //   })
    //   },500)
    console.warn('loaaaaa', 'loadinggg');
    this.page1 = this.page1 + 10;

    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    var url = '';
    if (this.state.vehcile_search_txt != '') {
      url =
        '/vehicleList/carrier_id/' +
        userid +
        '/search_text/' +
        this.state.vehcile_search_txt +
        '/pagination/' +
        this.page1;
    } else {
      url =
        '/vehicleList/carrier_id/' +
        userid +
        '/search_text/none/pagination/' +
        this.page1;
    }
    await Apis.getVehicleList(url, '')
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          //CommonToast.showToast(res.msg,'success')
          if (res.data != null && res.data.length > 0) {
            this.setState({
              vehicleArray: [...this.state.vehicleArray, ...res.data],
              //fetching_from_server: false,
            });
          }
        } else {
          // this.setState({
          //   fetching_from_server: false,
          // });
          //CommonToast.showToast(res.msg,'error')
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  async getBookingDetails() {
    //  Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);

    await Apis.getCarrierBookingDetails(
      this.props.route.params.bookingid,
      userid,
      '',
    )
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');

          this.setState({
            isLoading: false,
            pickAddress: res.data.pickup_address,
            dropAddress: res.data.dropoff_address,
            truckQuantity: res.data.required_vehicle_no,
            equipmentType: res.data.vehicle_type,
            length: res.data.length,
            width: res.data.width,
            height: res.data.height,
            isDangerous: res.data.is_dangerous,
            load: res.data.load,
            description: res.data.description,
            pickUpDate: res.data.pickup_date,
            bidAmount: res.data.bid_amount,
            dimension: res.data.dimension,
            isDriverAssigned: res.data.assign_driver_status,
            isVehicleAssigned: res.data.assign_vehicle_status,
            fullResponse: res.data,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
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

  async submitBidding() {
    if (this.state.inputBiddingPrice.trim() == '') {
      CommonToast.showToast('Please enter price', 'error');
      return;
    }
    Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    const data = {
      booking_id: this.props.route.params.bookingid,
      carrier_id: userid,
      bid_amount: this.state.inputBiddingPrice,
    };

    await Apis.submitBidding(data)
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          this.props.navigation.goBack();
          this.props.route.params.refresh();
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        console.error(error);
      });
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
    } else {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              height: height / 13,

              borderTopWidth: 0.5,
              borderRadius: 0,
              borderColor: '#ddd',
              overflow: 'hidden',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontFamily: 'Roboto-Bold', fontSize: 15}}>
                {'Your bidding price is $' + this.state.bidAmount}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <TouchableOpacity
              style={{flex: 0.5, flexDirection: 'row'}}
              onPress={() => this.openDriverSheet()}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#e13b5a',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginRight: 5,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../../../assets/user3.png')}
                  style={{
                    tintColor: 'white',
                    alignSelf: 'center',
                    width: 23,
                    height: 23,
                    marginRight: 7,
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: 'Roboto-Regular',
                  }}>
                  {this.state.isDriverAssigned == '0'
                    ? 'Assign Driver'
                    : 'View Driver'}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flex: 0.5, flexDirection: 'row'}}
              onPress={() => this.openVehicleSheet()}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#e13b5a',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: 10,
                  marginLeft: 5,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../../../assets/delivery.png')}
                  style={{
                    tintColor: 'white',
                    alignSelf: 'center',
                    width: 23,
                    height: 23,
                    marginRight: 7,
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: 'Roboto-Regular',
                  }}>
                  {this.state.isVehicleAssigned == '0'
                    ? 'Assign Vehicle'
                    : 'View Vehicle'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{flex: 1}}
            contentcontainerstyle={{paddingBottom: 20}}
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
              }}>
              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Pick Up Location
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.pickAddress}</Text>
              </View>
              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Drop Off Location
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.dropAddress}</Text>
              </View>
              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Truck Quantity
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.truckQuantity}</Text>
              </View>

              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Equipment Type
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.equipmentType}</Text>
              </View>
              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Length in cm
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.length}</Text>
              </View>

              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Width in cm
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.width}</Text>
              </View>
              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Height in cm
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.height}</Text>
              </View>
              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Truck Maximum Load in kg
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.load}</Text>
              </View>
              {this.state.dimension != null && this.state.dimension != 0 ? (
                <View>
                  <View style={styles.viewBackground}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular',
                      }}>
                      Dimension
                    </Text>
                  </View>
                  <Text style={styles.textStyle}>{this.state.dimension}</Text>
                </View>
              ) : null}
              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Does the item(s) contain dangerous goods (according to ADR)?
                  </Text>
                </View>
                <Text style={styles.textStyle}>
                  {this.state.isDangerous == '1' ? 'Yes' : 'No'}
                </Text>
              </View>
              {this.state.description != '' ? (
                <View>
                  <View style={styles.viewBackground}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular',
                      }}>
                      Descriptions
                    </Text>
                  </View>
                  <Text style={styles.textStyle}>{this.state.description}</Text>
                </View>
              ) : null}
              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Pick Up Date
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.pickUpDate}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
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

  onSelectDriver(item) {
    this.assignDriver(item);
  }
  async assignDriver(item) {
    this.RBSheet.close();
    Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    const data = {
      booking_id: this.props.route.params.bookingid,
      driver_id: item.driver_id,
    };

    await Apis.assignDriver(data)
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        this.getBookingDetails();

        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
    //this.RBSheet.close()
  }

  async assignVehicle(item) {
    this.RBSheet1.close();
    Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    const data = {
      booking_id: this.props.route.params.bookingid,
      vehicle_id: item.vehicle_id,
    };

    await Apis.assignVehicle(data)
      .then(async res => {
        console.warn('Rwes', res);
        Hud.hideHud();
        this.getBookingDetails();

        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
    //this.RBSheet.close()
  }

  onSelectVehicle(item) {
    this.assignVehicle(item);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={height}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
              container: {
                backgroundColor: 'transparent',
              },
            }}>
            <View
              style={{
                flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: 'white',
                marginTop: height / 11,
              }}>
              <View
                style={{
                  height: height / 13,

                  borderRadius: 0,
                  borderBottomWidth: 0.5,
                  borderColor: '#ddd',
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, paddingLeft: 13}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16,
                      }}>
                      Select Driver
                    </Text>
                  </View>
                  <View style={{width: 45, height: '100%'}}>
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => this.RBSheet.close()}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          flex: 1,
                          paddingRight: 13,
                        }}>
                        <Image
                          source={require('../../../assets/cancel.png')}
                          style={{width: 25, height: 25, tintColor: 'gray'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                <FlatList
                  data={this.state.driverArray}
                  contentContainerStyle={{paddingBottom: height / 13}}
                  // ListFooterComponent={this.renderFooter.bind(this)}
                  onEndReachedThreshold={0.5}
                  onEndReached={({distanceFromEnd}) => {
                    console.warn('on end reached ', distanceFromEnd);
                    this.onLoadMoreDrivers();
                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          paddingLeft: 13,
                          paddingRight: 13,

                          paddingTop: 14,
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                          style={{flexDirection: 'row', flex: 1}}
                          onPress={() => this.onSelectDriver(item)}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#ddd',
                              }}>
                              <Image
                                source={{uri: item.profile_pic}}
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 30,
                                }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              alignSelf: 'center',
                              marginLeft: 10,
                              flexDirection: 'column',
                            }}>
                            <Text
                              numberOfLines={2}
                              style={{
                                fontSize: 15,
                                fontFamily: 'Montserrat-SemiBold',
                              }}>
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 13,
                              }}>
                              {item.email}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 13,
                              }}>
                              {item.mobile_no}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </RBSheet>
          <RBSheet
            ref={ref => {
              this.RBSheet1 = ref;
            }}
            height={height}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
              container: {
                backgroundColor: 'transparent',
              },
            }}>
            <View
              style={{
                flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: 'white',
                marginTop: height / 11,
              }}>
              <View
                style={{
                  height: height / 13,

                  borderRadius: 0,
                  borderBottomWidth: 0.5,
                  borderColor: '#ddd',
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, paddingLeft: 13}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16,
                      }}>
                      Select Vehicle
                    </Text>
                  </View>
                  <View style={{width: 45, height: '100%'}}>
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => this.RBSheet1.close()}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          flex: 1,
                          paddingRight: 13,
                        }}>
                        <Image
                          source={require('../../../assets/cancel.png')}
                          style={{width: 25, height: 25, tintColor: 'gray'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                <FlatList
                  data={this.state.vehicleArray}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom: height / 13}}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          paddingLeft: 13,
                          paddingRight: 13,

                          paddingTop: 14,
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                          style={{flexDirection: 'row', flex: 1}}
                          onPress={() => this.onSelectVehicle(item)}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#ddd',
                              }}>
                              <Image
                                source={{uri: item.vehicle_image}}
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 30,
                                }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              alignSelf: 'center',
                              marginLeft: 10,
                              flexDirection: 'column',
                            }}>
                            <Text
                              numberOfLines={2}
                              style={{
                                fontFamily: 'Montserrat-SemiBold',
                                fontSize: 15,
                              }}>
                              {item.vehicle_type}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 13,
                              }}>
                              {item.vehicle_number}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 13,
                              }}>
                              {item.vehicle_reg_number}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  //ListFooterComponent={this.renderFooter.bind(this)}
                  onEndReachedThreshold={0.5}
                  onEndReached={({distanceFromEnd}) => {
                    console.warn('on end reached ', distanceFromEnd);
                    this.onLoadMorevehicle();
                  }}
                />
              </View>
            </View>
          </RBSheet>

          <RBSheet
            ref={ref => {
              this.RBSheetViewDriver = ref;
            }}
            height={height / 1.5}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
              container: {
                backgroundColor: 'transparent',
              },
            }}>
            <View
              style={{
                flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: 'white',
                //marginTop: height / 11,
              }}>
              <View
                style={{
                  height: height / 13,

                  borderRadius: 0,
                  borderBottomWidth: 0.5,
                  borderColor: '#ddd',
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, paddingLeft: 13}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16,
                      }}>
                      Selected Driver
                    </Text>
                  </View>
                  <View style={{width: 45, height: '100%'}}>
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => this.RBSheetViewDriver.close()}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          flex: 1,
                          paddingRight: 13,
                        }}>
                        <Image
                          source={require('../../../assets/cancel.png')}
                          style={{width: 25, height: 25, tintColor: 'gray'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                <ScrollView
                  contentContainerStyle={{paddingBottom: height / 13}}>
                  <View
                    style={{
                      paddingLeft: 13,
                      paddingRight: 13,
                      paddingBottom: 13,
                      paddingTop: 13,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: '#ddd',
                      }}>
                      <Image
                        source={{uri: this.state.fullResponse.profile_pic}}
                        style={{width: 80, height: 80, borderRadius: 40}}
                        resizeMode="cover"
                      />
                    </View>

                    <View
                      style={{
                        marginTop: 13,
                        flexDirection: 'row',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 28,
                        width: '90%',

                        alignItems: 'center',
                        paddingLeft: 13,
                        paddingRight: 13,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 14,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {this.state.fullResponse.driver_name}
                        </Text>
                      </View>

                      <Image
                        source={require('../../../assets/user.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 10,
                          tintColor: '#6d6b6c',
                        }}
                      />
                    </View>

                    <View
                      style={{
                        marginTop: 13,
                        flexDirection: 'row',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 28,
                        width: '90%',

                        alignItems: 'center',
                        paddingLeft: 13,
                        paddingRight: 13,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 14,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {this.state.fullResponse.email}
                        </Text>
                      </View>

                      <Image
                        source={require('../../../assets/email.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 10,
                          tintColor: '#6d6b6c',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: 13,
                        flexDirection: 'row',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 28,
                        width: '90%',

                        alignItems: 'center',
                        paddingLeft: 13,
                        paddingRight: 13,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 14,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {this.state.fullResponse.mobile_no}
                        </Text>
                      </View>

                      <Image
                        source={require('../../../assets/phone.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 10,
                          tintColor: '#6d6b6c',
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </RBSheet>

          <RBSheet
            ref={ref => {
              this.RBSheetViewVehicle = ref;
            }}
            height={height / 1.5}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
              container: {
                backgroundColor: 'transparent',
              },
            }}>
            <View
              style={{
                flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: 'white',
                //marginTop: height / 11,
              }}>
              <View
                style={{
                  height: height / 13,

                  borderRadius: 0,
                  borderBottomWidth: 0.5,
                  borderColor: '#ddd',
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, paddingLeft: 13}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16,
                      }}>
                      Selected Vehicle
                    </Text>
                  </View>
                  <View style={{width: 45, height: '100%'}}>
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => this.RBSheetViewVehicle.close()}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          flex: 1,
                          paddingRight: 13,
                        }}>
                        <Image
                          source={require('../../../assets/cancel.png')}
                          style={{width: 25, height: 25, tintColor: 'gray'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                <ScrollView
                  contentContainerStyle={{paddingBottom: height / 13}}>
                  <View
                    style={{
                      paddingLeft: 13,
                      paddingRight: 13,
                      paddingBottom: 13,
                      paddingTop: 13,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: '#ddd',
                      }}>
                      <Image
                        source={{uri: this.state.fullResponse.vehicle_image}}
                        style={{width: 80, height: 80, borderRadius: 40}}
                        resizeMode="cover"
                      />
                    </View>

                    <View
                      style={{
                        marginTop: 13,
                        flexDirection: 'row',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 28,
                        width: '95%',
                        overflow: 'hidden',

                        alignItems: 'center',
                        paddingLeft: 13,
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontSize: 14,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {this.state.fullResponse.vehicle_type}
                        </Text>
                      </View>

                      {/* <Image
                        source={require('../../../assets/delivery.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 10,
                          tintColor: '#6d6b6c',
                        }}
                      /> */}
                      <View
                        style={{
                          backgroundColor: '#e7edf8',
                          height: '100%',
                          width: 120,
                        }}>
                        <View
                          style={{
                            flex: 1,

                            justifyContent: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Vehicle Type
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 13,
                        flexDirection: 'row',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 28,
                        width: '95%',
                        overflow: 'hidden',

                        alignItems: 'center',
                        paddingLeft: 13,
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontSize: 14,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {this.state.fullResponse.vehicle_number}
                        </Text>
                      </View>

                      {/* <Image
                        source={require('../../../assets/delivery.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 10,
                          tintColor: '#6d6b6c',
                        }}
                      /> */}
                      <View
                        style={{
                          backgroundColor: '#e7edf8',
                          height: '100%',
                          width: 120,
                        }}>
                        <View
                          style={{
                            flex: 1,

                            justifyContent: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Vehicle No
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 13,
                        flexDirection: 'row',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 28,
                        width: '95%',
                        overflow: 'hidden',

                        alignItems: 'center',
                        paddingLeft: 13,
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontSize: 14,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {this.state.fullResponse.vehicle_reg_number}
                        </Text>
                      </View>

                      {/* <Image
                        source={require('../../../assets/delivery.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 10,
                          tintColor: '#6d6b6c',
                        }}
                      /> */}
                      <View
                        style={{
                          backgroundColor: '#e7edf8',
                          height: '100%',
                          width: 120,
                        }}>
                        <View
                          style={{
                            flex: 1,

                            justifyContent: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Vehicle Reg No
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </RBSheet>

          <View style={{flex: 1}}>
            <CarrierHeaderBack
              navProps={this.props.navigation}
              title={'Confirmed Booking Details'}
            />
            {this.renderViewAsPerCondition()}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
// #CBD3DA
const styles = StyleSheet.create({
  btnTextStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  textStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'black',
    paddingLeft: 13,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  viewBackground: {
    backgroundColor: '#e7edf8',
    paddingLeft: 13,
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 13,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
});
