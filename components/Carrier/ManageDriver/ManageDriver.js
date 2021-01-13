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
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {StackActions, NavigationActions} from '@react-navigation/stack';

import Apis from '../../../Services/apis';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
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
import CarrierHeaderBack from '../../CarrierNavigation/CarrierHeaderBack';
import SingleDriverItem from './SingleDriverItem';

export default class ManageDriver extends Component {
  constructor(props) {
    super(props);
    //console.warn('jj',this.props.route.params.item)
    this.state = {
      addVehicleShown: false,
      driverList: [],
      search_txt: '',
      fetching_from_server: true,
    };
    this.page = 0;
  }

  componentDidMount() {
    this.getAllDriverList();
  }

  async getAllDriverList() {
    this.page = 0;
    Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    var url = '';
    if (this.state.search_txt != '') {
      url =
        '/getDriverList/carrier_id/' +
        userid +
        '/search_text/' +
        this.state.search_txt +
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
              driverList: [],
              driverList: res.data,
            });
          }
        } else {
          this.setState({
            driverList: [],
          });
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  addVehicleClicked() {
    this.props.navigation.navigate('AddDriver', {
      fetchVehi: this.testMethod,
    });
  }

  testMethod = async () => {
    //console.warn('hhh','back')
    this.getAllDriverList();
  };

  testMethodTwo = async () => {
    //console.warn('hhh','back')
    this.getAllDriverList();
  };

  onDelete = async driverid => {
    //console.warn('res','refres')
    Alert.alert(
      //title
      'Delete',
      //body
      'Are you sure want to delete ?',
      [
        {text: 'Yes', onPress: () => this.doDeleteFromServer(driverid)},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  onEdit = async driverid => {
    //this.props.navigation.popToTop();

    this.props.navigation.navigate('EditDriver', {
      driver_id: driverid,
      fetchVehiEdit: this.testMethodTwo,
    });
  };

  onRefresh = async () => {
    this.getAllDriverList();
  };
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

  async doDeleteFromServer(driverid) {
    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    console.warn('driverid idd ' + driverid);
    const data = {
      driver_id: driverid,
    };
    await Apis.deleteDriver(data)
      .then(async res => {
        console.warn('Rwes', res);
        if (res.status == '1') {
          Hud.hideHud();
          this.getAllDriverList();
          //CommonToast.showToast(res.msg,'success')
        } else {
          Hud.hideHud();
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  onSearchClick() {
    if (this.state.search_txt != '') {
      this.getAllDriverList();
    }
  }
  onPressSearchCross() {
    this.setState({
      search_txt: '',
    });
    this.search_input.clear();
    this.getAllDriverList();
  }

  async onLoadMoreDrivers() {
    this.page = this.page + 10;
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    var url = '';
    if (this.state.search_txt != '') {
      url =
        '/getDriverList/carrier_id/' +
        userid +
        '/search_text/' +
        this.state.search_txt +
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
              driverList: [...this.state.driverList, ...res.data],
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

  render() {
    //const { item } = AddDriverManager.params;

    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <CarrierHeaderBack
              navProps={this.props.navigation}
              title={'Driver Manager'}
              onRefreshPress={this.onRefresh}
              isRefreshVisible={true}
            />

            <View style={{flex: 1, backgroundColor: 'white'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: height / 16,
                  marginTop: 10,
                  flex: 1,
                }}>
                {this.state.driverList != null &&
                this.state.driverList.length > 0 ? (
                  <View
                    style={{
                      height: height / 14,
                      borderRadius: height / 7,
                      borderColor: '#ddd',
                      borderWidth: 1,
                      flexDirection: 'row',
                    }}>
                    <TextInput
                      placeholder={'Search'}
                      style={{paddingLeft: 10, flex: 1}}
                      ref={input => {
                        this.search_input = input;
                      }}
                      onChangeText={search_txt => this.setState({search_txt})}
                    />
                    <View
                      style={{
                        width: 30,
                        marginRight: width / 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {this.state.search_txt != '' ? (
                        <TouchableOpacity
                          onPress={() => this.onPressSearchCross()}>
                          <Image
                            source={require('../../../assets/cross.png')}
                            style={{
                              width: 23,
                              height: 23,
                              tintColor: 'black',
                              marginRight: 5,
                            }}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>

                    <View
                      style={{
                        position: 'absolute',
                        width: '100%',
                        borderRadius: height / 7,
                        height: height / 14,
                      }}>
                      <View
                        style={{alignItems: 'flex-end', height: height / -14}}>
                        <TouchableOpacity onPress={() => this.onSearchClick()}>
                          <Shadow
                            style={{
                              height: height / 14,
                              width: width / 8,
                              shadowColor: '#e13b5a',
                              shadowOpacity: 0.9,
                              shadowRadius: 6,
                              shadowOffset: {width: 5, height: 8},
                              backgroundColor: 'rgba(255,255,255,0.6)',
                              borderRadius: height / 7,
                            }}>
                            <LinearGradient
                              start={{x: 0, y: 1}}
                              end={{x: 1, y: 0}}
                              colors={['#e13b5a', '#96177f']}
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: height / 7,
                                height: height / 14,
                                width: width / 8,
                              }}>
                              <Image
                                source={require('../../../assets/search.png')}
                                style={{
                                  width: 18,
                                  height: 18,
                                  tintColor: 'white',
                                }}
                              />
                            </LinearGradient>
                          </Shadow>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : null}

                <View
                  style={{
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: 'white',
                    elevation: 3,
                    padding: 10,
                    flex: 1,
                    marginTop: 20,
                  }}>
                  <View style={{flexDirection: 'row', height: 30}}>
                    <View style={{flex: 4, flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: 15,
                            color: '#6d6b6c',
                          }}
                          numberOfLines={1}>
                          Name
                        </Text>
                      </View>
                      <View style={{flex: 1, marginLeft: 5}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: 15,
                            color: '#6d6b6c',
                          }}
                          numberOfLines={1}>
                          Email
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: 15,
                            color: '#6d6b6c',
                          }}
                          numberOfLines={1}>
                          Action
                        </Text>
                      </View>
                    </View>
                  </View>

                  {this.state.driverList != null &&
                  this.state.driverList.length > 0 ? (
                    <FlatList
                      data={this.state.driverList}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => 'key' + index}
                      renderItem={({item, index}) => {
                        return (
                          <SingleDriverItem
                            item={item}
                            index={index}
                            onDeletePress={this.onDelete}
                            onEditPress={this.onEdit}
                          />
                        );
                      }}
                      ListFooterComponent={this.renderFooter.bind(this)}
                      onEndReachedThreshold={0.5}
                      onEndReached={({distanceFromEnd}) => {
                        console.warn('on end reached ', distanceFromEnd);
                        this.onLoadMoreDrivers();
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Regular',
                          fontSize: 15,
                          color: '#6d6b6c',
                          marginLeft: 30,
                          marginRight: 30,
                          textAlign: 'center',
                        }}>
                        Drivers will appear here once they are added
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{marginTop: 15}}>
                  <TouchableOpacity onPress={() => this.addVehicleClicked()}>
                    <Shadow
                      style={{
                        height: height / 13,
                        shadowColor: '#e13b5a',
                        shadowOpacity: 0.9,
                        shadowRadius: 6,
                        shadowOffset: {width: 5, height: 10},
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        borderRadius: 10,
                      }}>
                      <LinearGradient
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={['#e13b5a', '#96177f']}
                        style={{
                          borderTopLeftRadius: 10,

                          justifyContent: 'center',
                          borderBottomRightRadius: 10,
                          height: height / 13,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: 16,
                            color: 'white',
                            textAlign: 'center',
                          }}>
                          Add Driver
                        </Text>
                      </LinearGradient>
                    </Shadow>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
