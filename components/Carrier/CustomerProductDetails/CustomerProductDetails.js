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
  ActivityIndicator,
  Alert
} from 'react-native';

import Apis from '../../../Services/apis';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import Swiper from 'react-native-swiper';
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
import Icon from 'react-native-vector-icons/Ionicons';
import SearchItemScreen from '../SearchScreen/SearchScreen';
import Hud from '../../../views/hud';
import axios from 'axios'
export default class CustomerProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: this.props.route.params.productId,
      isLoading: false,
      isFavLoading: false,
      productData: [],
      favoritesList: [],
      searchItems: [],
      search: '',
      isReserving: false,
      productImages: [],
      isUser: '',
      quantity: 1,
      totalPrice:null,
      qty:1,
      quoteId:0,
      token:''
    }
    this.doAuthentication()
  }

  async componentDidMount() {
    const cartQuote= await AsyncStorage.getItem(CART_QUOTE);
    const token = await AsyncStorage.getItem(USER_TOKEN);
   this.setState({quoteId:cartQuote,token:token})
   // alert(this.props.route.params.productId)
    this.getProductDetailsById()
    this.getFavourites()
    this.setState({ customer_id: AsyncStorage.getItem(USER_ID) })
  }

  async doAuthentication() {
    const userid = await AsyncStorage.getItem(USER_ID);
    const usertype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    const firstname = await AsyncStorage.getItem(FIRST_NAME);
    const lastname = await AsyncStorage.getItem(LAST_NAME);
    if (usertype == '1') {
      this.setState({
        isUser: "1",
      });
    }

    if (usertype == '2') {
      this.setState({
        isUser: "2",
      });
    }

    if (usertype == '3') {
      this.setState({
        isUser: "3",
      });
    }

    if (usertype == '' || usertype == null) {
      this.setState({
        isUser: "",
      });
    }
  }

  getProductDetailsById = async () => {
    this.setState({ isLoading: true })
    await Apis.getProductDataById(this.state.productId)
      .then(async res => {
        //alert(JSON.stringify(res[0].data))
        if (res[0].success === true) {
          await this.setState({ productData: res[0].data })
          await this.setState({ productImages: res[0].data.images })
          await this.setState({totalPrice:res[0].data.price})
          // await console.log("Product Data : " + JSON.stringify(res[0].data))
        }
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.setState({ isLoading: false })
      });
  }

  searchProductsList = async (searchString) => {
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

  addToWishList = async (productId) => {
    this.setState({ isFavLoading: true })
    const userId = await AsyncStorage.getItem(USER_ID);
    await Apis.addFavorites(productId, userId)
      .then(async res => {
        if (res[0].success === true) {
          Alert.alert("Success", res[0].message, [{ text: 'Okay' }])
        }
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.setState({ isFavLoading: false })
      });
  }

  getFavourites = async () => {
    const userid = await AsyncStorage.getItem(USER_ID);
    await Apis.getFavouriteList(userid)
      .then(res => {
        this.setState({ favoritesList: res })
      }).catch(error => {
        console.error(error);
      }).finally(() => {
      });
  }


  reserveAnItem = async (productId) => {
    this.setState({ isReserving: true })
    const userid = await AsyncStorage.getItem(USER_ID);
    const data = {
      productId: productId,
      customerId: userid
    }
    await Apis.addItemToReservedList(data)
      .then(res => {
        if (res[0].success === true) {
          Alert.alert("Success", res[0].message, [{ text: 'Okay' }])
        }
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.setState({ isReserving: false })
      });
  }

  // async removeFromWishList(productId) {
  //   this.setState({isFavLoading: true})
  //   const userid = await AsyncStorage.getItem(USER_ID);
  //   await Apis.removeFavorite(productId, userid)
  //     .then(res => {
  //         if(res[0].success === true) {
  //           Alert.alert("Success", res.message, [{text:'Okay'}])
  //         }
  //     }).catch(error => {
  //       console.error(error);
  //     }).then(() => {
  //       this.setState({isFavLoading: false})
  //     });
  // }

  // matchFavorites(productId) {
  //  if(this.state.favoritesList.length === 0) {
  //    return false
  //  } else {
  //   const index = this.state.favoritesList.findIndex(item => item.product_id === productId)
  //   if(index === -1) {
  //     return false
  //   } else {
  //     return true
  //   }
  //  }
  // }

   increaseQty() {
    this.setState({ qty: this.state.qty+1 })
   
  }

   decreaseQty() {
     if(this.state.qty>=2)
    this.setState({ qty: this.state.qty-1 })
  }
  addToCart=async(sku)=>{
    //alert(this.state.token)
    const data={
      "cartItem": {
      "sku": sku,
      "qty": this.state.qty,
      "quote_id": this.state.quoteId
      }
    };
  
   
   var header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.state.token}`,
  };
  var config = {
    method: "post",
    url: base_url+"rest/V1/carts/mine/items",
    headers: header,
    data:data
  };
  console.log(config);
  this.setState({isLoading:true})
  await axios(config)
    .then((response) => {
   //   alert('Product add to cart')
     this.setState({isLoading:false})
      console.log(response);
      //alert(JSON.stringify(response))
      this.props.navigation.navigate("CustomerCheckout")
     
  
    //alert(response.data)
    })
    .catch((error) => {
      this.setState({isLoading:false})
      console.log(error);
    //  alert(JSON.stringify(error))
    });
  
  }

  render() {
    // console.log("Details:" + JSON.stringify(this.state.productData.images))
    console.log("Products:" + JSON.stringify(this.state.productData))
    return (
      <ImageBackground
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <CarrierHeader navProps={this.props.navigation} title={'Profile'} />
            <View style={{ backgroundColor: '#059d14', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
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
                  }}> Customer Product Details
                        </Text>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 10,
                  backgroundColor: '#50b169', padding: 10,
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
                  //keyboardType="search_opt"
                  autoCapitalize="none"
                  placeholderTextColor={'#fff'}
                  ref={input => {
                    this.email_input = input;
                  }}
                  onChangeText={email => this.setState({ email })}
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

            {this.state.isLoading ? <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size='large' color='green' />
            </View> : this.state.searchItems.length === 0 ? (
              <ScrollView
                contentcontainerstyle={{ paddingBottom: 20 }}
                keyboardShouldPersistTaps="handled">
                <View style={styles.dropshadow}>
                  <View style={styles.banner}>
                    <Swiper style={styles.swiper} height={320} autoplay
                      dot={<View style={{ backgroundColor: 'rgba(181,181,181,.8)', width: 10, height: 10, borderRadius: 7, marginLeft: 3, marginRight: 3 }} />}
                      activeDot={<View style={{ backgroundColor: '#038711', width: 10, height: 10, borderRadius: 7, marginLeft: 3, marginRight: 3 }} />}
                      paginationStyle={{ bottom: 10 }}
                      loop={false}>

                      <View style={styles.slide}>
                        {this.state.productImages.length === 0 ? (
                          <ImageBackground resizeMode='contain' source={{ uri: base_url + '/pub/static/version1605756492/frontend/Magento/luma/en_US/Magento_Catalog/images/product/placeholder/image.jpg' }} style={styles.image}>
                            {this.state.isUser !== '' ?
                             <TouchableOpacity style={styles.text2} onPress={this.addToWishList.bind(this, this.state.productId)} >
                             {this.state.isFavLoading ? <ActivityIndicator size='small' color='green' /> : <Icon name='ios-heart' color='green' size={30} />}
                           </TouchableOpacity> : null}
                          </ImageBackground>

                        ) : (this.state.productImages.map(item => {
                          return (
                            <ImageBackground resizeMode='contain' source={{ uri: item }} style={styles.image}>
                             {this.state.isUser !== '' ?
                             <TouchableOpacity style={styles.text2} onPress={this.addToWishList.bind(this, this.state.productId)} >
                             {this.state.isFavLoading ? <ActivityIndicator size='small' color='green' /> : <Icon name='ios-heart' color='green' size={30} />}
                           </TouchableOpacity> : null}
                            </ImageBackground>
                          )
                        }))
                        }
                      </View>
                    </Swiper>
                  </View>
                </View>

                <View style={styles.dropshadow}>
                  <View style={styles.prod_des_area}>
                    <View style={styles.prod_des}>
                      <Text style={styles.prod_heading}>{this.state.productData.name}
                      </Text>
                      <View style={styles.reating_opt}>
                        <View style={styles.reating_img}>
                          <Image
                            source={require('../../../assets/reating.png')}
                            style={{ width: 90, height: 15 }}
                          />
                        </View>
                        <Text style={styles.rev_info}>24 reviews</Text>
                      </View>
                      <View style={styles.prod_price}>
                        <Text style={styles.prod_price_rec}>${this.state.totalPrice}.00</Text>
                        <Text style={styles.prod_price_old}>$450.00</Text>
                      </View>
                    </View>
                    <View style={styles.share_opt}>
                      <Image
                        source={require('../../../assets/share.png')}
                        style={{ width: 22, height: 23 }} />
                    </View>
                  </View>
                  <View style={styles.availability_content}>
                    <View style={styles.availability_info}>
                      <Text style={styles.availability_text}>Availability</Text>
                      <Text style={styles.availability_stock}>In Stock</Text>
                    </View>
                    <View style={styles.availability_cunt}>
                      <Text style={styles.availability_text2}>Qty :</Text>
                      <TouchableOpacity onPress={() => {
                      this.decreaseQty()
                    }}>
                      <Image
                        source={require('../../../assets/min.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                      <View style={styles.availability_countopt}>
                      <Text style={{color:'#6d6b6c'}}>{this.state.qty}</Text>
                      </View>
                      <TouchableOpacity onPress={() => {
                      this.increaseQty(this.state.productData.sku,this.state.qty,this.state.productData.product_id)
                    }}>
                      <Image
                        source={require('../../../assets/pls.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    {this.state.isUser !== "" ? (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>this.addToCart(this.state.productData.sku)}>
                      <View style={styles.def_btn_wrap2} >
                        <Text style={styles.def_btn2}>
                          Add to Cart
                            </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.reserveAnItem.bind(this, this.state.productId)}>
                      <View style={styles.def_btn_wrap2} >
                        {this.state.isReserving ? <ActivityIndicator size='small' color='white' /> : <Text style={styles.def_btn2}>
                          Reserve
                            </Text>}
                      </View>
                    </TouchableOpacity>
                      </View>
                    ) :  <TouchableOpacity onPress={() => {this.props.navigation.navigate("CarrierLogin")}}>
                    <View style={styles.def_btn_wrap2} >
                      {this.state.isReserving ? <ActivityIndicator size='small' color='white' /> : <Text style={styles.def_btn2}>
                        Login To Buy
                          </Text>}
                    </View>
                  </TouchableOpacity>}
                  </View>
                </View>

                <View style={styles.dropshadow}>
                  <Text style={styles.text_heading}>Description
                        </Text>
                  <Text style={styles.text_info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                  ultrices gravida.Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </Text>
                </View>

                <View style={styles.dropshadow}>
                  <Text style={styles.text_heading}>Product Details
                        </Text>
                  <View style={styles.prod_infowrap}>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Color
                              </Text>
                      <Text style={styles.text_info2}>Dark Blue
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Fabric
                              </Text>
                      <Text style={styles.text_info2}>Polycotton
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Pattern
                              </Text>
                      <Text style={styles.text_info2}>Solid
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Style Code
                              </Text>
                      <Text style={styles.text_info2}>VROBJF-NB
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Ideal For
                              </Text>
                      <Text style={styles.text_info2}>Men
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Sleeve
                              </Text>
                      <Text style={styles.text_info2}>Full Sleeve
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Closure
                              </Text>
                      <Text style={styles.text_info2}>Zipper
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Sales Package
                              </Text>
                      <Text style={styles.text_info2}>1 Jacket
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Pack of
                              </Text>
                      <Text style={styles.text_info2}>1
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Suitable For
                              </Text>
                      <Text style={styles.text_info2}>Western Wear
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Reversible
                              </Text>
                      <Text style={styles.text_info2}>No
                              </Text>
                    </View>
                    <View style={styles.prod_cont}>
                      <Text style={styles.text_heading2}>Hooded
                              </Text>
                      <Text style={styles.text_info2}>Yes
                              </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity>
                  <View style={styles.def_btn_wrap} >
                    <Text style={styles.def_btn}>
                      Message Seller
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            ) : (
                  <SearchItemScreen searchItems={this.state.searchItems} navigation={this.props.navigation} backpath='CustomerProductDetails' />
                )}
          </View>
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
    borderRadius: 8
  },

  text_heading: {
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    paddingBottom: 5,
    marginBottom: 5,
    color: '#afafaf',
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1
  },

  text_info: {
    lineHeight: 20,
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: '#afafaf'
  },

  prod_cont: {
    flexDirection: 'row',
    color: '#afafaf',
    marginBottom: 2,
    marginTop: 2,
    justifyContent: 'space-between',
  },

  text_heading2: {
    color: '#afafaf',
  },

  def_btn_wrap: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#6d6b6c',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 60,
  },

  def_btn: {
    marginLeft: 0,
    color: '#000',
    backgroundColor: "white",
    padding: 10,
    width: 180,
    fontSize: 15,
    textAlign: 'center',
    borderRadius: 60 / 2,
    fontFamily: 'Roboto-Bold',
    borderColor: 'black',
    borderWidth: 2
  },

  def_btn_wrap2: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#6d6b6c',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: 10
  },

  def_btn2: {
    marginLeft: 0,
    color: '#FFF',
    backgroundColor: "#000",
    padding: 10,
    width: 160,
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 60 / 2,
    fontFamily: 'Roboto-Bold',
    borderColor: 'black',
    borderWidth: 2
  },

  prod_des_area: {
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
    marginBottom: 5,
  },

  prod_des: {
    flex: 2
  },

  prod_heading: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    paddingBottom: 5,
  },

  reating_opt: {
    // justifyContent:'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
  },

  rev_info: {
    paddingLeft: 10,
  },

  availability_text2: {
    paddingRight: 5,
    color: "#afafaf",
    fontSize: 16,
  },

  prod_price: {
    flexDirection: 'row',
    paddingBottom: 5,
  },

  prod_price_rec: {
    color: "#038711",
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    paddingRight: 5,
  },

  prod_price_old: {
    color: "#afafaf",
    fontSize: 16,
    textDecorationLine: "line-through"
  },

  availability_info: {
    color: "#afafaf",
    fontSize: 16,
    flexDirection: 'row',
  },

  availability_text: {
    color: "#afafaf",
    fontSize: 16,
  },

  availability_stock: {
    color: "#038711",
    fontSize: 16,
    paddingLeft: 5,
  },

  availability_cunt: {
    color: "#afafaf",
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  availability_countopt: {
    paddingLeft: 5,
    paddingRight: 5
  },

  availability_content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
  },

  banner: {},
  slide: {
    flexDirection: "column",
  },

  image: {
    resizeMode: "cover",
    justifyContent: "center",
    height: 300,
  },

  text2: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
    position: 'absolute',
    right: 0,
    top: 0,
  }
});