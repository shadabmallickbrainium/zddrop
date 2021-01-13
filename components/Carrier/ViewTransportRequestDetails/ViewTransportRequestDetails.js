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

const {width, height} = Dimensions.get('window');
export default class ViewTransportRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
      inputEquipment: '',
      rate: 0,
      tax: 0,
      total: 0,
      taxPercentage: '',
      rateFromApi: '',
      totalFromApi: '',
      taxFromApi: '',
      noOfEquipmentFromApi: '',
      amountPerEquipmentFromApi: '',
      name: '',
      businessName: '',
    };
  }

  componentDidMount() {
    this.getBookingDetails();
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
            taxPercentage: res.data.tax_percentage,
          });

          if (res.data.amount_per_eqiupment) {
            // var amtPerEquipment = res.data.amount_per_eqiupment;
            // var totalAmt = res.data.bid_amount;
            // var taxPer = res.data.tax_percentage;
            // var noOfEquip = res.data.no_of_eqiupment;

            //   tax:
            //   value * this.state.inputBiddingPrice -
            //   (value *
            //     this.state.inputBiddingPrice *
            //     parseInt(this.state.taxPercentage)) /
            //     100,
            // rate:
            //   (value *
            //     this.state.inputBiddingPrice *
            //     parseInt(this.state.taxPercentage)) /
            //   100,

            // var tax = parseInt(res.data.no_of_eqiupment) * parseInt(res.data.amount_per_eqiupment) -   (parseInt(res.data.no_of_eqiupment) *
            //   parseInt(res.data.amount_per_eqiupment)*
            //   parseInt(res.data.tax_percentage)) /
            //   100,

            //   var rate =  (parseInt(res.data.no_of_eqiupment) *
            //   parseInt(res.data.amount_per_eqiupment) *
            //     parseInt(res.data.tax_percentage)) /
            //   100,

            this.setState({
              totalFromApi: res.data.bid_amount,
              noOfEquipmentFromApi: res.data.no_of_eqiupment,
              amountPerEquipmentFromApi: res.data.amount_per_eqiupment,
              rateFromApi:
                parseInt(res.data.no_of_eqiupment) *
                  parseInt(res.data.amount_per_eqiupment) -
                (parseInt(res.data.no_of_eqiupment) *
                  parseInt(res.data.amount_per_eqiupment) *
                  parseInt(res.data.tax_percentage)) /
                  100,
              taxFromApi:
                (parseInt(res.data.no_of_eqiupment) *
                  parseInt(res.data.amount_per_eqiupment) *
                  parseInt(res.data.tax_percentage)) /
                100,
            });
          }
          if (res.data.name) {
            this.setState({
              name: res.data.name,
            });
          } else {
            this.setState({
              name: res.data.business_name,
            });
          }
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
      CommonToast.showToast('Please enter amount', 'error');
      return;
    }
    if (this.state.inputEquipment.trim() == '') {
      CommonToast.showToast('Please enter no of Equipment', 'error');
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
      bid_amount: this.state.total,
      amount_per_eqiupment: this.state.inputBiddingPrice,
      no_of_eqiupment: this.state.inputEquipment,
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

  onChangeEquipment(value) {
    console.warn(
      'ff',
      (this.state.inputEquipment * value * parseInt(this.state.taxPercentage)) /
        100,
    );
    if (value < parseInt(this.state.truckQuantity)) {
      this.setState({
        inputEquipment: value,
        total: value * this.state.inputBiddingPrice,
        rate:
          value * this.state.inputBiddingPrice -
          (value *
            this.state.inputBiddingPrice *
            parseInt(this.state.taxPercentage)) /
            100,
        tax:
          (value *
            this.state.inputBiddingPrice *
            parseInt(this.state.taxPercentage)) /
          100,
      });
    } else {
      CommonToast.showToast('Error', 'error');
      this.setState({
        inputEquipment: '',
        total: 0,
      });
    }
  }
  onChangeBiidingPrice(value) {
    var t = this.state.taxPercentage + 10;

    this.setState({
      inputBiddingPrice: value,
      total: this.state.inputEquipment * value,
      rate:
        this.state.inputEquipment * value -
        (this.state.inputEquipment *
          value *
          parseInt(this.state.taxPercentage)) /
          100,
      tax:
        (value *
          this.state.inputEquipment *
          parseInt(this.state.taxPercentage)) /
        100,
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
              {this.state.bidAmount != '' && this.state.bidAmount != 'null' ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontFamily: 'Roboto-Bold', fontSize: 15}}>
                    {'Amount per Equipment is  ' +
                      this.state.amountPerEquipmentFromApi +
                      ' KES'}
                  </Text>
                  <Text style={{fontFamily: 'Roboto-Bold', fontSize: 15}}>
                    {'No. of  Equipment is  ' + this.state.noOfEquipmentFromApi}
                  </Text>
                </View>
              ) : (
                <View
                  style={{paddingLeft: 13, paddingRight: 13, marginTop: 10}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: '#ddd',
                    }}>
                    <TextInput
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        paddingLeft: 13,
                        height: 40,
                        fontFamily: 'Roboto-Regular',
                        fontSize: 15,
                      }}
                      onChangeText={inputBiddingPrice =>
                        this.onChangeBiidingPrice(inputBiddingPrice)
                      }
                      placeholder={'Amount per Equipment in KES'}
                      keyboardType={'number-pad'}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: '#ddd',
                      marginTop: 10,
                    }}>
                    <TextInput
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        paddingLeft: 13,
                        height: 40,
                        fontFamily: 'Roboto-Regular',
                        fontSize: 15,
                      }}
                      onChangeText={inputEquipment =>
                        this.onChangeEquipment(inputEquipment)
                      }
                      value={this.state.inputEquipment}
                      placeholder={'No. of Equipment'}
                      keyboardType={'number-pad'}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: '#ddd',
                      marginTop: 10,
                      marginBottom: 10,
                      paddingTop: 7,
                      borderRadius: 5,
                      paddingBottom: 7,
                    }}>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => this.submitBidding()}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{fontFamily: 'Roboto-Regular', fontSize: 15}}>
                          BID
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View>
                <View style={styles.viewBackground}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Roboto-Regular',
                    }}>
                    Shipper
                  </Text>
                </View>
                <Text style={styles.textStyle}>{this.state.name}</Text>
              </View>

              <View>
                {this.state.bidAmount != '' &&
                this.state.bidAmount != 'null' ? (
                  <View>
                    <View style={styles.viewBackground}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 14,
                          fontFamily: 'Roboto-Regular',
                        }}>
                        Amount Breakup
                      </Text>
                    </View>

                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Rate : </Text>
                        <Text style={[styles.textStyle, {paddingLeft: 0}]}>
                          {this.state.rateFromApi}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Tax : </Text>
                        <Text style={[styles.textStyle, {paddingLeft: 0}]}>
                          {this.state.taxFromApi}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Total : </Text>
                        <Text style={[styles.textStyle, {paddingLeft: 0}]}>
                          {this.state.totalFromApi}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={styles.viewBackground}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 14,
                          fontFamily: 'Roboto-Regular',
                        }}>
                        Amount Breakup
                      </Text>
                    </View>

                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Rate : </Text>
                        <Text style={[styles.textStyle, {paddingLeft: 0}]}>
                          {this.state.rate}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Tax : </Text>
                        <Text style={[styles.textStyle, {paddingLeft: 0}]}>
                          {this.state.tax}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Total : </Text>
                        <Text style={[styles.textStyle, {paddingLeft: 0}]}>
                          {this.state.total}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>

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
                    Required No of vehicle
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

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <CarrierHeaderBack
              navProps={this.props.navigation}
              title={'Transport Details'}
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
