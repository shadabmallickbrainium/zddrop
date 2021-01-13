import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  BackHandler,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
  USER_TOKEN,
  FIRST_NAME,
  LAST_NAME,
  EMAIL_ADDRESS,
  CREATED_AT,
  base_url,
  CART_QUOTE
} from '../../../Services/constant';
import AsyncStorage from '@react-native-community/async-storage';
// import CommonToast from '../../../views/common-toast';
import Hud from '../../../views/hud';
import Apis from '../../../Services/apis';
import SearchItemScreen from '../SearchScreen/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import VendorHome from '../VendorHome/VendorHome';
import DriverHome from '../DriverHome/DriverCarrierHome';

const {width, height} = Dimensions.get('window');

export default class CarrierDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      data: [],
      isLoading: false,
      isUser: '',
      searchItems: [],
      search: '',
    };
    this.doAuthentication();
  }

  async doAuthentication() {
    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    const usertype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    const firstname = await AsyncStorage.getItem(FIRST_NAME);
    const lastname = await AsyncStorage.getItem(LAST_NAME);
    const name = firstname + ' ' + lastname;
    // console.warn("storageeeee", firstname, lastname);
    if (usertype == '1') {
      this.setState({
        isUser: '1',
      });
    }

    if (usertype == '2') {
      this.setState({
        isUser: '2',
      });
    }

    if (usertype == '3') {
      this.setState({
        isUser: '3',
      });
    }

    if (usertype == '' || usertype == null) {
      this.setState({
        isUser: '',
      });
    }
console.log("IS User:" + usertype);
    Hud.hideHud();
  }

  async searchProductsList(searchString) {
    console.log("*********4******")
    this.setState({isLoading: true});
    const data = {
      searchData: searchString,
      limit: 10,
      offset: 1,
    };

    await Apis.searchProducts(data)
      .then(async res => {
        if (res[0].success === true) {
          await this.setState({searchItems: res[0].data});
          console.log('Search List : ' + JSON.stringify(res[0].data));
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }
getCartQuote=async()=>{
 const data={};
 
 const token = await AsyncStorage.getItem(USER_TOKEN);
 
 var header = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};
var config = {
  method: "post",
  url: base_url+"rest/V1/carts/mine",
  headers: header,
  data:data
};
console.log(config);
await axios(config)
  .then((response) => {
   // alert('success')
    console.log(response);
     AsyncStorage.setItem(CART_QUOTE, response.data.toString());
  //alert(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
//  alert(token)
  // await Apis.getCartQuote(data,token)
  //     .then(async res => {
  //       alert("success")
  //       // if (res[0].success === true) {
  //       //   await this.setState({searchItems: res[0].data});
  //       //   console.log('Search List : ' + JSON.stringify(res[0].data));
  //       // }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  //     .finally(() => {
  //       this.setState({isLoading: false});
  //     });
}
  async componentDidMount() {
    console.log("*********1******")
   await this.getCategories();
    console.log("*********2******")
  await  this.getCartQuote();
 this.setState({isLoading: false});
    console.log("*********3******")
   // alert('ok')
    // this.props.navigation.addListener('didFocus', () => {this.doAuthentication()});
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
    BackHandler.exitApp();
    // this.props.navigation.navigate('Dashboard')
    return true;
  }

  getCategories() {
    this.setState({isLoading: true});
    fetch('http://dev.mydevmagento.com/zdropp/rest/V1/categorylist?parentId=2')
      .then(response => response.json())
      .then(json => {
        if (json[0].success === true) {
          // console.log("Categories Data : " + JSON.stringify(json[0].data))
          this.setState({data: json[0].data});
        }
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    console.log(this.state.isUser);
    const notloginview = (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <CarrierHeader navProps={this.props.navigation} title={'Dashboard'} />
        <View
          style={{
            backgroundColor: '#059d14',
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 50,
            padding: 15,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 2}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Roboto-Light',
                  fontSize: 17,
                  paddingBottom: 0,
                  paddingTop: 0,
                  paddingLeft: 0,
                  color: '#fff',
                }}>
                {' '}
                Delivery to
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Light',
                  fontSize: 17,
                  paddingBottom: 0,
                  paddingTop: 0,
                  paddingLeft: 0,
                  color: '#fff',
                }}>
                {' '}
                Your Doorstep
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginTop: 10,
              backgroundColor: '#50b169',
              padding: 10,
              borderRadius: 40,
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
              onChangeText={search => this.setState({search})}
            />

            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 5,
                // paddingBottom: 8,
              }}>
              {this.state.searchItems.length === 0 ? (
                <TouchableOpacity
                  onPress={this.searchProductsList.bind(
                    this,
                    this.state.search,
                  )}>
                  <Image
                    source={require('../../../assets/searcopt.png')}
                    style={{width: 22, height: 22}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({searchItems: []});
                  }}>
                  <Icon name="ios-close-circle" color="white" size={25} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {this.state.isLoading ? (
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="green" />
          </View>
        ) : this.state.searchItems.length === 0 ? (
          <ScrollView
            contentcontainerstyle={{paddingBottom: 20}}
            keyboardShouldPersistTaps="handled">
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <SafeAreaView style={styles.container}>
                <View style={{display: 'flex', overflow: 'scroll'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <Image
                      source={require('../../../assets/banner_add1.png')}
                      style={{
                        width: 320,
                        height: 180,
                        borderRadius: 20,
                        marginRight: 15,
                      }}
                    />
                    <Image
                      source={require('../../../assets/banner_add2.png')}
                      style={{
                        width: 320,
                        height: 180,
                        borderRadius: 20,
                        marginRight: 15,
                      }}
                    />
                    <Image
                      source={require('../../../assets/banner_add1.png')}
                      style={{
                        width: 320,
                        height: 180,
                        borderRadius: 20,
                        marginRight: 15,
                      }}
                    />
                  </ScrollView>
                </View>
              </SafeAreaView>
            </View>

            <View style={{paddingTop: 15, paddingBottom: 0, paddingLeft: 20}}>
              <Text style={{fontSize: 16}}> Featured Stores</Text>
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 15,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <ImageBackground
                source={require('../../../assets/prod_pic1.png')}
                style={{
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  width: '31%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{
                  borderRadius: 15,
                  width: '100%',
                }}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    LeBeau Nob
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic2.png')}
                style={{
                  width: '31%',

                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    Dress Shop
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic3.png')}
                style={{
                  width: '31%',
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    Grocery Shop
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic4.png')}
                style={{
                  width: '31%',
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    LeBeau Nob
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic5.png')}
                style={{
                  width: '31%',
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    Fruit Shop
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic6.png')}
                style={{
                  width: '31%',
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    Grocery Shop
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={{paddingTop: 15, paddingBottom: 0, paddingLeft: 20}}>
              <Text style={{fontSize: 16}}> Stores by Categories</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 80,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                flexWrap: 'wrap',
                backgroundColor: 'white',
              }}>
              {this.state.data.map(item => {
                return (
                  <View style={styles.product_item} key={item.product_id}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate(
                          'CustomerStoreProductList',
                          {
                            catId: item.category_id,
                          },
                        );
                      }}>
                      <View style={styles.product_item_img}>
                        <Image
                          source={{uri: item.image}}
                          style={{width: 45, height: 45}}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.product_item_text}>
                        {item.category_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <SearchItemScreen
            searchItems={this.state.searchItems}
            navigation={this.props.navigation}
            backpath="CarrierDashboard"
          />
        )}
      </View>
    );

    //////////////////////////////////////////// customerlogedview /////////////////////////////////////////////

    const customerloginview = (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <CarrierHeader navProps={this.props.navigation} title={'Dashboard'} />
        <View
          style={{
            backgroundColor: '#059d14',
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 50,
            padding: 15,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 2}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Roboto-Light',
                  fontSize: 17,
                  paddingBottom: 0,
                  paddingTop: 0,
                  paddingLeft: 0,
                  color: '#fff',
                }}>
                {' '}
                Customer Home
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginTop: 10,
              backgroundColor: '#50b169',
              padding: 10,
              borderRadius: 40,
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
              onChangeText={search => this.setState({search})}
            />

            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 5,
                // paddingBottom: 8,
              }}>
              {this.state.searchItems.length === 0 ? (
                <TouchableOpacity
                  onPress={this.searchProductsList.bind(
                    this,
                    this.state.search,
                  )}>
                  <Image
                    source={require('../../../assets/searcopt.png')}
                    style={{width: 22, height: 22}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({searchItems: []});
                  }}>
                  <Icon name="ios-close-circle" color="white" size={25} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {this.state.isLoading ? (
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="green" />
          </View>
        ) : this.state.searchItems.length === 0 ? (
          <ScrollView
            contentcontainerstyle={{paddingBottom: 20}}
            keyboardShouldPersistTaps="handled">
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <SafeAreaView style={styles.container}>
                <View style={{display: 'flex', overflow: 'scroll'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <Image
                      source={require('../../../assets/banner_add1.png')}
                      style={{
                        width: 320,
                        height: 180,
                        borderRadius: 20,
                        marginRight: 15,
                      }}
                    />
                    <Image
                      source={require('../../../assets/banner_add2.png')}
                      style={{
                        width: 320,
                        height: 180,
                        borderRadius: 20,
                        marginRight: 15,
                      }}
                    />
                    <Image
                      source={require('../../../assets/banner_add1.png')}
                      style={{
                        width: 320,
                        height: 180,
                        borderRadius: 20,
                        marginRight: 15,
                      }}
                    />
                  </ScrollView>
                </View>
              </SafeAreaView>
            </View>

            <View style={{paddingTop: 15, paddingBottom: 0, paddingLeft: 20}}>
              <Text style={{fontSize: 16}}> Featured Stores</Text>
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 15,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <ImageBackground
                source={require('../../../assets/prod_pic1.png')}
                style={{
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  width: '31%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{
                  borderRadius: 15,
                  width: '100%',
                }}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    LeBeau Nob
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic2.png')}
                style={{
                  width: '31%',

                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    Dress Shop
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic3.png')}
                style={{
                  width: '31%',
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    Grocery Shop
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic4.png')}
                style={{
                  width: '31%',
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    LeBeau Nob
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic5.png')}
                style={{
                  width: '31%',
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    Fruit Shop
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../../assets/prod_pic6.png')}
                style={{
                  width: '31%',
                  height: 100,
                  borderRadius: 60,
                  margin: '1%',
                  resizeMode: 'cover', // or 'stretch'
                }}
                imageStyle={{borderRadius: 15, width: '100%'}}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', padding: 5}}>
                    Grocery Shop
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={{paddingTop: 15, paddingBottom: 0, paddingLeft: 20}}>
              <Text style={{fontSize: 16}}> Stores by Categories</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 80,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                flexWrap: 'wrap',
                backgroundColor: 'white',
              }}>
              {this.state.data.map(item => {
                return (
                  <View style={styles.product_item} key={item.product_id}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(
                        'CustomerStoreProductList',
                        {
                          catId: item.category_id,
                        },
                      );
                    }}>
                    <View style={styles.product_item_img}>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 45, height: 45}}
                      />
                    </View>
                    <Text numberOfLines={1} style={styles.product_item_text}>
                      {item.category_name}
                    </Text>
                  </TouchableOpacity>
                </View>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <SearchItemScreen
            searchItems={this.state.searchItems}
            navigation={this.props.navigation}
            backpath="CarrierDashboard"
          />
        )}
      </View>
    );

    const sellerloginview = (
      <VendorHome navProps={this.props.navigation} />
    );

    const driverloginview =(
      <DriverHome navProps={this.props.navigation} />
    )

    let message;
    if (this.state.isUser === '') {
      message = notloginview;
    } else if (this.state.isUser === '1') {
      message = customerloginview;
    } else if(this.state.isUser === '3') {
      message = driverloginview;
    } else {
      message = sellerloginview;
    }

    return (
      <ImageBackground style={styles.MainContainer}>
        <SafeAreaView style={{flex: 1}}>{message}</SafeAreaView>
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

  product_item: {
    width: '29%',
    height: 150,
    paddingVertical: 15,
    paddingHorizontal: '1%',
    margin: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
   
    backgroundColor: '#fff',
    shadowColor: '#ffffff',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2.15,
    shadowRadius: 2.65,
    elevation: 1,
    borderRadius: 60,
    backgroundColor: '#fff',
    flexShrink:1
  },

  product_item_img: {
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: '#e0e2e4',
    borderWidth: 1,
    borderRadius: 50,
  },

  product_item_text: {
    textAlign: 'center',
    paddingHorizontal: 5,
    marginTop: 10,
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 32,
  },
});
