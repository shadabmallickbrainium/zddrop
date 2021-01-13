import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Platform,
  BackHandler,
  ActivityIndicator,
  Alert
} from 'react-native';

import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Apis from '../../../Services/apis';
import { USER_ID } from '../../../Services/constant';
import AsyncStorage from '@react-native-community/async-storage';
import SearchItemScreen from '../SearchScreen/SearchScreen';


export default class CustomerMyFavorites extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: '',
      password: '',
      isApiCalling: false,
      eyeIcon: 'off',
      passwordVisible: true,
      eyeImg: require('../../../assets/visibility_off.png'),
      rememberMe: true,
      isAuthenticating: true,
      favoritesList: [],
      isLoading: false,
      search: '',
      searchItems: []
    }
  }

  componentDidMount() {
    this.getFavourites()
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
    //BackHandler.exitApp();
    this.props.navigation.navigate('MyDrawer')
    return true;
  }

  async searchProductsList(searchString) {
    this.setState({ isLoading: true })
    const data = {
      searchData: searchString,
      limit: 10,
      offset: 1
    };

    await Apis.searchProducts(data)
      .then(async res => {
        if (res[0].success === true) {
          await this.setState({ searchItems: res[0].data })
        }
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.setState({ isLoading: false })
      });
  }

  async getFavourites() {
    this.setState({ isLoading: true })
    const userid = await AsyncStorage.getItem(USER_ID);
    await Apis.getFavouriteList(userid)
      .then(res => {
        this.setState({ favoritesList: res })
        //  console.log("My Fav : " + JSON.stringify(res))
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.setState({ isLoading: false })
      });
  }

  async removeFavorite(productId) {
    const userid = await AsyncStorage.getItem(USER_ID);
    await Apis.removeFavorite(productId, userid)
      .then(res => {
        if (res[0].success === true) {
          Alert.alert("Success", res.message, [{ text: 'Okay' }])
        }
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.getFavourites()
      });
  }

  render() {
    return (
      <ImageBackground
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <CarrierHeader navProps={this.props.navigation} title={'Profile'} />
          <View style={{
            backgroundColor: '#059d14', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: "center"
              }}>

              <View style={{ flex: 2 }}>
                <Text style={{
                  fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                  paddingTop: 0, paddingLeft: 0, color: '#fff',
                }}> My Favorites</Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: '#60b169', padding: 10,
                borderRadius: 40
              }}>
              <TextInput
                style={{
                  flex: 2,
                  fontFamily: 'Roboto-Light',
                  fontSize: 16,
                  paddingBottom: 8,
                  paddingTop: 6,
                  paddingLeft: 10,
                  color: '#fff',
                }}
                placeholder={'Search'}
                keyboardType="default"
                autoCapitalize="none"
                placeholderTextColor={'#fff'}
                ref={input => {
                  this.email_input = input;
                }}
                onChangeText={search => this.setState({ search })}
              />
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  marginRight: 5,
                  // paddingBottom: 8,
                }}>
                {this.state.searchItems.length === 0 ? <TouchableOpacity onPress={this.searchProductsList.bind(this, this.state.search)}>
                  <Image
                    source={require('../../../assets/searcopt.png')}
                    style={{ width: 22, height: 22 }}
                  />
                </TouchableOpacity> :
                  <TouchableOpacity onPress={() => { this.setState({ searchItems: [] }) }}>
                    <Icon name='ios-close-circle' color='white' size={25} />
                  </TouchableOpacity>}
              </View>
            </View>
          </View>

          {
            this.state.isLoading ? <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size='large' color='green' />
            </View> : this.state.searchItems.length === 0 ? (this.state.favoritesList.length === 0 ? <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>No favorite items</Text>
            </View> : <ScrollView
              style={{ backgroundColor: "#fff", }}
              contentcontainerstyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled">
                <View style={styles.tabs_content}>
                  <View style={styles.tab_content_area}>
                    <View style={styles.content_block}>
                      <View style={styles.filter_block}>
                        <View style={styles.filter_pic}>
                          <TouchableOpacity  >
                            <Image style={styles.filter_opt}
                              source={require('../../../assets/filter2.png')}
                            />
                          </TouchableOpacity >
                        </View>
                      </View>
                      <View style={styles.prod_block}>
                        {this.state.favoritesList.map(item => {
                          return (
                            <View style={styles.prod_itm} key={item.product_id}>
                              <View style={styles.prod_img}>
                                <Image style={styles.prod_pic1}
                                  source={{ uri: item.images[0] ? item.images[0] : null }}
                                />
                              </View>
                              <View style={styles.prod_desc}>
                                <Text style={styles.prod_title}>{item.name}</Text>
                                <Text style={styles.prod_prc}>${item.price}.00</Text>
                                <Text style={styles.prod_date}>Date : 12.06.2020</Text>

                              </View>
                              <View style={styles.prod_def_btn}>
                                <TouchableOpacity onPress={this.removeFavorite.bind(this, item.product_id)}>
                                  <View style={styles.def_btn_wrap2} >
                                    <Icon name='md-heart' color='green' size={25} />
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )
                        })}
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>) : (
                  <SearchItemScreen searchItems={this.state.searchItems} navigation={this.props.navigation} backpath='CustomerMyFavorites' />
                )
          }
        </SafeAreaView>
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
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },


  // 
  dropshadow: {
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 5,
    padding: 15,
    marginBottom: 20,
    borderRadius: 12
  },
  prod_rev: {
    flexDirection: 'row',
    color: '#afafaf',
    marginBottom: 2,
    marginTop: 2,

    justifyContent: 'space-between',
  },
  prod_rev_inp: {
    textAlign: 'center',
  },
  prod_rev_inp2: {
    borderLeftColor: '#d9d9d9',
    borderLeftWidth: 1,
    borderRightColor: '#d9d9d9',
    borderRightWidth: 1,
    flex: 2,
    marginLeft: '15%',
    marginRight: '15%',
  },
  prod_rev_inp_text: {
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#2a2a2a',
    textAlign: 'center',

    // borderBottomColor: '#e7e7e7',
    // borderBottomWidth: 1
  },
  prod_rev_inp_text_info: {
    lineHeight: 18,
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    color: '#afafaf',
    textAlign: 'center',

  },
  prod_cont: {
    flexDirection: 'row',
    color: '#afafaf',
    marginBottom: 2,
    marginTop: 2,
    justifyContent: 'space-between',
  },
  tabs_content: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  tabs_heading: {
    flexDirection: 'row',
    color: '#afafaf',
    marginBottom: 2,
    marginTop: 2,
    justifyContent: 'space-between',
  },

  tabs_heading_info: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    lineHeight: 24,
    color: '#afafaf',
    textAlign: 'center',
    borderBottomColor: 'transparent',
    borderBottomWidth: 1
  },
  tabs_heading_info_active: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'center',
    borderBottomColor: '#038711',
    borderBottomWidth: 1
  },
  prod_itm: {
    marginTop: 15,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 5,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    color: '#afafaf',
    marginBottom: 20,
    marginTop: 2,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  prod_img: {
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    elevation: 2,
    padding: 5,
    borderRadius: 50,
    borderBottomColor: '#eeeeee',
    // borderBottomWidth: 1,

  },
  prod_pic1: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  prod_desc: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'left'
  },
  prod_title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    color: '#2a2a2a',
  },
  prod_prc: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    color: '#038711',

  },
  def_btn: {
    marginLeft: 0,
    color: '#FFF',
    backgroundColor: "#000",
    padding: 8,
    width: 120,
    fontSize: 14,

    textAlign: 'center',
    borderRadius: 60 / 2,
    fontFamily: 'Roboto-Bold',
    borderColor: 'black',
    borderWidth: 2

  },
  filter_block: {
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',


  },
  filter_pic: {
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.10,
    elevation: 3,

    padding: 8,
    borderRadius: 10,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    marginLeft: 12

  },
  filter_opt: {
    width: 30,
    height: 30,
  },
  tab_content_area: {
    paddingBottom: 50,
    paddingTop: 10
  },
  prod_date: {
    color: '#afafaf',
  },
  def_btn_wrap2: {
    flexDirection: 'row',
    color: '#afafaf',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  prod_arrow: {
    width: 10,
    height: 15,
    marginLeft: 10
  }

});
