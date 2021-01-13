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
  BackHandler,
  Platform,
  ActivityIndicator
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Apis from '../../../Services/apis';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import SearchItemScreen from '../SearchScreen/SearchScreen';
import axios from 'axios'
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


export default class CustomerStoreProductList extends Component {
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
      productsList: [],
      searchItems: [],
      isLoading: false,
      categoryId: 2,
      limit: 10,
      offset: 1,
      search: '',
      isUser: '',
      quoteId: '',
      token: '',
      productData:[]
    }
    this.doAuthentication()
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

    if (usertype == '' || usertype == null) {
      this.setState({
        isUser: "",
      });
    }
  }

  async getProducts() {
    this.setState({ isLoading: true })
    const data = {
      categoryId: 2,
      limit: 10,
      offset: 1
    };

    await Apis.getProductDatas(data)
      .then(async res => {
        if (res[0].success === true) {
          // await this.setState({ productsList: res[0].data })
          //alert(JSON.stringify(res[0].data))
          this.setState({productData:res[0].data})
          await this.getCartData()
         
          //   this.getId(res[0].data)
          await console.log("Products : " + JSON.stringify(res[0].data))
        }
      }).catch(error => {
        console.error(error);
      }).then(() => {
        this.setState({ isLoading: false })
      });
  }
  getId = (data) => {

    const newData = [];
    for (var i = 0; i < data.length; i++) {
      newData.push(data[i].sku)
    }
    // alert(JSON.stringify(newData))
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

  componentDidMount() {
    this.setState({ categoryId: this.props.route.params.catId })

  }
  getCartData = async () => {
    const data=this.state.productData
    //  alert(JSON.stringify(data))
    var header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.state.token}`,
    };
    var config = {
      method: "get",
      url: base_url + "rest/V1/carts/mine",
      headers: header,
    };
    console.log(config);
    this.setState({ isLoading: true })
    await axios(config)
      .then((response) => {
        this.setState({ isLoading: false })
        //alert('yes')
        this.validateCartdata(data, response.data.items)
      
        console.log(response);
        // alert(JSON.stringify(response))

        //alert(response.data)
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error);
        // alert(JSON.stringify(error.message))

      });
  }
  validateCartdata = (productList, cartdata) => {
   // alert("ok"+JSON.stringify(cartdata))
    var newData = productList;
    var data2=[];
    if(cartdata.length>0){
    for (var i = 0; i < productList.length; i++) {
      // newData.push(data[i].sku)
      var flag=false;
      var qty=1;
      var itemId=0
      for (var j = 0; j < cartdata.length; j++) {
        if (productList[i].sku === cartdata[j].sku) {
          flag=true
          qty=cartdata[j].qty
          itemId=cartdata[j].item_id
          data2.push(cartdata[j].sku)
        }
      }
      if(flag){
        newData[i].isCart = true
        newData[i].qty = qty
        newData[i].itemId = itemId
      }
      else {
        newData[i].itemId = itemId
      }
    }
  }
    //alert(JSON.stringify(newData))
    this.setState({ productsList: newData })

  }
  
  async componentDidMount() {
    const cartQuote = await AsyncStorage.getItem(CART_QUOTE);
    const token = await AsyncStorage.getItem(USER_TOKEN);
    this.setState({ quoteId: cartQuote, token: token })
    this.getProducts()
  // this.getCartData();
    // this.getCartData()
    // this.setState({ productsList: products })
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
    // BackHandler.exitApp();
    this.props.navigation.navigate('CarrierDashboard')
    return true;
  }
  // item => item.categoryId === this.props.route.params.catId

  ratingCompleted(rating) {
    console.log("Select a Rating: " + rating)
  }
  addToCart = async (sku) => {
    //alert(this.state.token)
    const data = {
      "cartItem": {
        "sku": sku,
        "qty": 1,
        "quote_id": this.state.quoteId
      }
    };


    var header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.state.token}`,
    };
    var config = {
      method: "post",
      url: base_url + "rest/V1/carts/mine/items",
      headers: header,
      data: data
    };
    console.log(config);
    this.setState({ isLoading: true })
    await axios(config)
      .then((response) => {
        //   alert('Product add to cart')
        this.setState({ isLoading: false })
        console.log(response);
        this.getCartData();
        //alert(JSON.stringify(response))
       // this.props.navigation.navigate("CustomerCheckout")
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error);
        //  alert(JSON.stringify(error))
      });
  }

  incrementQuantity=async(sku,qty,itemId)=>{
    //alert(sku+"**"+qty+"**"+itemId)
    if(qty===0){
      this.deleteItem(itemId)
    }
    else if(qty>5){
      alert("Maximum 5 quantity allowed in shopping cart")
    }
    else{
      const data={
        "cartItem": {
        "sku": sku,
        "qty": qty,
        "quote_id": this.state.quoteId
        }
      };
     var header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.state.token}`,
    };
    var config = {
      method: "put",
      url: base_url+"rest/V1/carts/mine/items/"+itemId,
      headers: header,
      data:data
    };
    console.log(config);
    this.setState({isLoading:true})
    await axios(config)
      .then((response) => {
       this.setState({isLoading:false})
        console.log(response);
        this.getCartData();
       // this.getCartData()
        //alert(JSON.stringify(response))
      })
      .catch((error) => {
        this.setState({isLoading:false})
        console.log(error);
      //  alert(JSON.stringify(error))
      });
    }
  }
  deleteItem=async(itemId)=>{
    //alert(this.state.token+"**"+this.state.quoteId)
   
     var header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.state.token}`,
    };
    var config = {
      method: "delete",
      url: base_url+"rest/V1/carts/mine/items/"+itemId,
      headers: header
      // data:data
    };
    console.log(config);
    this.setState({isLoading:true})
    await axios(config)
      .then((response) => {
       this.setState({isLoading:false})
        console.log(response);
        this.getProducts()
     //   this.getCartData()
        //alert(JSON.stringify(response))
      })
      .catch((error) => {
        this.setState({isLoading:false})
        console.log(error);
      //  alert(JSON.stringify(error))
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
                  fontWeight: 'bold', fontFamily: 'Lato-Regular', fontSize: 17, paddingBottom: 0,
                  paddingTop: 0, paddingLeft: 0, color: '#fff',
                }}> Store </Text>
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
                  fontFamily: 'Lato-Regular',
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
                    <Icon2 name='ios-close-circle' color='white' size={25} />
                  </TouchableOpacity>}
              </View>
            </View>
          </View>

          {
            this.state.isLoading ? <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size='large' color='green' />
            </View> : this.state.searchItems.length === 0 ? (
              <ScrollView
                style={{ backgroundColor: "#fff", }}
                contentcontainerstyle={{ paddingBottom: 20 }}
                keyboardShouldPersistTaps="handled">


                <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 25, marginRight: 25, }}>

                  <View style={{ width: 'auto', marginTop: 10, position: 'relative', color: '#2a2a2a', alignSelf: 'center' }}>
                    <Image
                      source={require('../../../assets/banner.png')}
                      style={{ maxWidth: '100%', maxHeight: 250, borderRadius: 60 / 2 }}
                    />
                    <View style={{
                      width: '100%', color: '#2a2a2a', marginTop: 10, position: 'absolute', left: 15,
                      bottom: 15
                    }}>
                      <View style={{ position: 'absolute', right: 30, top: 10 }} >
                        <Image
                          source={require('../../../assets/star_fill.png')}
                          style={{ width: 15, height: 15, position: 'absolute', left: 0, top: 0, }}
                        />
                        <Text style={{ fontFamily: 'Lato-Regular', paddingLeft: 20, position: 'relative', fontSize: 14, color: '#fff' }}>
                          4.6
                              </Text>
                      </View>
                      <Text
                        style={{ fontWeight: "bold", fontFamily: 'Lato-Regular', fontSize: 18, color: '#fff', paddingBottom: 5 }}>
                        LeBeau Nob
                              </Text>
                      <View style={{ position: 'relative' }} >
                        <Image
                          source={require('../../../assets/location2.png')}
                          style={{ width: 15, height: 20, position: 'absolute', left: 0, top: 0, }}
                        />
                        <Text style={{ fontFamily: 'Lato-Regular', paddingLeft: 20, position: 'relative', fontSize: 14, color: '#fff' }}>

                          729 Timber Oak Drive, Los Angeles, CA
                                </Text>
                      </View>
                      <View style={{ position: 'relative', flexDirection: 'row', flex: 1, paddingTop: 12, paddingBottom: 5 }} >
                        <Icon name="facebook" size={20} color="#fff"
                          style={{ borderRadius: 5, borderColor: '#fff', marginRight: 5, borderWidth: 1, padding: 5, width: 28, height: 28, textAlign: 'center' }} />
                        <Icon name="twitter" size={20} color="#fff"
                          style={{ borderRadius: 5, borderColor: '#fff', marginRight: 5, borderWidth: 1, padding: 5, width: 28, height: 28, textAlign: 'center' }} />
                        <Icon name="instagram" size={20} color="#fff"
                          style={{ borderRadius: 5, borderColor: '#fff', marginRight: 5, borderWidth: 1, padding: 5, width: 28, height: 28, textAlign: 'center' }} />
                        <Icon name="youtube" size={20} color="#fff"
                          style={{ borderRadius: 5, borderColor: '#fff', marginRight: 5, borderWidth: 1, padding: 5, width: 28, height: 28, textAlign: 'center' }} />
                      </View>

                    </View>
                  </View>
                </View>

                <View style={styles.dropshadow}>
                  <View style={styles.prod_rev}>

                    <View style={styles.prod_rev_inp}>
                      <Text style={styles.prod_rev_inp_text}> 32
                        </Text>
                      <Text style={styles.prod_rev_inp_text_info}> Product
                        </Text>
                    </View>

                    <View style={styles.prod_rev_inp, styles.prod_rev_inp2}>
                      <Text style={styles.prod_rev_inp_text}> 6
                        </Text>
                      <Text style={styles.prod_rev_inp_text_info}> Review
                        </Text>
                    </View>

                    <View style={styles.prod_rev_inp}>
                      <Text style={styles.prod_rev_inp_text}> 38
                        </Text>
                      <Text style={styles.prod_rev_inp_text_info}> Orders
                        </Text>
                    </View>

                  </View>
                </View>

                <View style={styles.tabs_content}>
                  {this.state.isUser === "" ? null : <View style={styles.tabs_heading}>
                    <View style={styles.tabs_heading_text}>
                      <Text style={styles.tabs_heading_info_active}>Product List
                        </Text>
                    </View>
                    <View style={styles.tabs_heading_text}>
                      <Text style={styles.tabs_heading_info}>Review
                        </Text>
                    </View>
                    <View style={styles.tabs_heading_text}>
                      <Text style={styles.tabs_heading_info}>Chat
                        </Text>
                    </View>
                    <View style={styles.tabs_heading_text}>
                      <Text style={styles.tabs_heading_info}>Details
                        </Text>
                    </View>
                  </View>}

                  <View style={styles.tab_content_area}>
                    {/*  product_list */}
                    <View style={styles.content_block}>
                      <View style={styles.filter_block}>
                        <View style={styles.filter_pic}>
                          <TouchableOpacity  >
                            <Image style={styles.filter_opt}
                              source={require('../../../assets/filter3.png')}
                            />
                          </TouchableOpacity >
                        </View>
                        <View style={styles.filter_pic}>
                          <TouchableOpacity  >
                            <Image style={styles.filter_opt}
                              source={require('../../../assets/filter2.png')}
                            />
                          </TouchableOpacity >
                        </View>
                      </View>

                      {this.state.isLoading ? <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' color='green' />
                      </View> :
                        <View style={styles.prod_block}>
                          {
                            this.state.productsList.map(item => {
                              if (item.category_ids === this.props.route.params.catId) {
                                return (
                                  <TouchableOpacity key={item.product_id} style={styles.prod_itm} activeOpacity={0.9} delayPressIn={4} onPress={() => {
                                    this.props.navigation.navigate('CustomerProductDetails', {
                                      productId: item.product_id
                                    })
                                  }} >
                                    <View style={styles.prod_img}>
                                      <Image style={styles.prod_pic1}
                                        source={{ uri: item.images[0] }} />
                                    </View>
                                    <View style={styles.prod_desc}>
                                      <Text style={styles.prod_title}>{item.name}</Text>
                                      <Text style={styles.prod_prc}>${item.price ? parseInt(item.price).toFixed(2) : 'No Price Yet'}</Text>
                                    </View>
                                  
                                    <View style={styles.prod_def_btn}>
                                    { !item.isCart?
                                      <TouchableOpacity onPress={() => {
                                        this.addToCart(item.sku)
                                        {/* this.props.navigation.navigate("CustomerCheckout", {
                                          itemData: item
                                        }) */}
                                      }}>
                                        <View style={styles.def_btn_wrap} >
                                          <Text style={styles.def_btn}>
                                            Add to Cart
                                           </Text>
                                        </View>
                                      </TouchableOpacity>
                                      
                                    :  <View style={styles.availability_cunt}>
                                        <TouchableOpacity   onPress={()=>this.incrementQuantity(item.sku,item.qty-1,item.itemId)}>
                                          <Image
                                            source={require('../../../assets/min.png')}
                                            style={{ width: 30, height: 30 }}
                                          />
                                        </TouchableOpacity>
                                        <View style={styles.availability_countopt}>
                                          <Text style={{ color: '#6d6b6c' }}>{item.qty}</Text>
                                          {/* <TextInput
                              style={styles.inpText_bon} placeholder={'1'} placeholderTextColor={'#6d6b6c'}
                              value={1}
                            /> */}
                                        </View>
                                        <TouchableOpacity onPress={()=>this.incrementQuantity(item.sku,item.qty+1,item.itemId)} >
                                          <Image
                                            source={require('../../../assets/pls.png')}
                                            style={{ width: 30, height: 30 }}
                                          />
                                        </TouchableOpacity>

                                      </View>
                                    }
                                    </View>
                                  
                                  </TouchableOpacity>
                                )
                              } else {
                                <View>
                                  <Text>No Products Under this category</Text>
                                </View>
                              }
                            })
                          }
                        </View>}
                    </View>
                    {/*  product_list end */}


                    {/*  product_review */}
                    {/* <View style={styles.product_review_area}>
                  <View style={styles.dropshadow2}>
                    <View style={styles.inp_wrap}>
                      <TextInput
                        style={styles.inp_text}
                        placeholder={'Write a Review'}
                        keyboardType=""
                        placeholderTextColor={'#afafaf'}
                      />
                    </View>

                    <View style={styles.select_reating}>

                      <Text style={styles.reating_text}>Select a Rate</Text>
                    </View>
                    <View style={styles.select_reating}>
                      <Rating
                        type='custom'
                        // ratingImage={WATER_IMAGE}
                        ratingColor='#ffc107'
                        ratingBackgroundColor='#dddddd'
                        ratingCount={5}
                        imageSize={25}
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingVertical: 10 }}
                      />
                    </View>
                  </View>
                  <View style={styles.review_content}>
                    <View style={styles.review_heading}>
                      <Text style={styles.reating_textinfo}>Reviews</Text>
                      <View style={styles.reating_box}>
                        <Rating
                          type='custom'
                          //ratingImage={WATER_IMAGE}
                          ratingColor='#ffc107'
                          ratingBackgroundColor='#dddddd'
                          ratingCount={5}
                          imageSize={20}
                          onFinishRating={this.ratingCompleted}
                          style={{ paddingVertical: 10, }}
                        />
                        <Text style={styles.reating_text2}>24 reviews</Text>
                      </View>
                    </View>
                    <View style={styles.dropshadow2}>
                      <View style={styles.review_item}>
                        <View style={styles.review_reating_content}>

                          <View style={styles.reating_box}>
                            <Rating
                              type='custom'
                              //ratingImage={WATER_IMAGE}
                              ratingColor='#ffc107'
                              ratingBackgroundColor='#dddddd'
                              ratingCount={5}
                              imageSize={20}
                              onFinishRating={this.ratingCompleted}
                              style={{ paddingVertical: 10, }}
                            />
                            <Text style={styles.reating_text2}>4.5</Text>
                          </View>

                          <Text style={styles.reating_textinfo2}>5 days ago</Text>
                        </View>
                        < Text style={styles.textinfo_heading}>Good quality,in low price</Text>
                        < Text style={styles.textinfo_peg}>Certified Buyer, Jsw Steel Plant Township</Text>
                      </View>
                      <View style={styles.review_item}>
                        <View style={styles.review_reating_content}>

                          <View style={styles.reating_box}>
                            <Rating
                              type='custom'
                              //ratingImage={WATER_IMAGE}
                              ratingColor='#ffc107'
                              ratingBackgroundColor='#dddddd'
                              ratingCount={5}
                              imageSize={20}
                              onFinishRating={this.ratingCompleted}
                              style={{ paddingVertical: 10, }}
                            />
                            <Text style={styles.reating_text2}>4.5</Text>
                          </View>

                          <Text style={styles.reating_textinfo2}>5 days ago</Text>
                        </View>
                        < Text style={styles.textinfo_heading}>Awesome jocket.. Good quality</Text>
                        < Text style={styles.textinfo_peg}>Certified Buyer, Jsw Steel Plant Township</Text>
                      </View>
                      <View style={styles.review_item}>
                        <View style={styles.review_reating_content}>

                          <View style={styles.reating_box}>
                            <Rating
                              type='custom'
                              //ratingImage={WATER_IMAGE}
                              ratingColor='#ffc107'
                              ratingBackgroundColor='#dddddd'
                              ratingCount={5}
                              imageSize={20}
                              onFinishRating={this.ratingCompleted}
                              style={{ paddingVertical: 10, }}
                            />
                            <Text style={styles.reating_text2}>4.5</Text>
                          </View>

                          <Text style={styles.reating_textinfo2}>5 days ago</Text>
                        </View>
                        < Text style={styles.textinfo_heading}>Awesome jocket.. Good quality</Text>
                        < Text style={styles.textinfo_peg}>Certified Buyer, Jsw Steel Plant Township</Text>
                      </View>



                    </View>
                  </View>
                </View> */}
                    {/*  product_review end*/}

                    {/*  product details */}
                    {/* <View style={styles.details_content}>
                  <View style={styles.dropshadow3}>
                    <ImageBackground
                      source={require('../../../assets/map2.png')}
                      style={{
                        height: 200,
                        borderRadius: 50,
                        margin: '1%',
                        width: '100%',
                        resizeMode: 'cover', // or 'stretch'
                      }}
                      imageStyle={{
                        borderRadius: 15, width: '100%',
                      }}
                    >
                    </ImageBackground >
                  </View>

                  <View style={styles.dropshadow2}>
                    <Text style={styles.text_heading}>Timing
                              </Text>
                    <View style={styles.prod_infowrap}>
                      <View style={styles.prod_cont}>
                        <Text style={styles.text_heading2}>Monday
                                      </Text>
                        <Text style={styles.text_info2}>8 am to 10 pm
                                      </Text>
                      </View>
                      <View style={styles.prod_cont}>
                        <Text style={styles.text_heading2}>Tuesday
                                      </Text>
                        <Text style={styles.text_info2}>8 am to 10 pm
                                      </Text>
                      </View>
                      <View style={styles.prod_cont}>
                        <Text style={styles.text_heading2}>Wednesday
                                      </Text>
                        <Text style={styles.text_info2}>8 am to 10 pm
                                      </Text>
                      </View>
                      <View style={styles.prod_cont}>
                        <Text style={styles.text_heading2}>Thursday
                                      </Text>
                        <Text style={styles.text_info2}>8 am to 10 pm
                                      </Text>
                      </View>
                      <View style={styles.prod_cont}>
                        <Text style={styles.text_heading2}>Friday
                                      </Text>
                        <Text style={styles.text_info2}>8 am to 10 pm
                                      </Text>
                      </View>

                    </View>
                  </View>

                  <View style={styles.dropshadow2}>
                    <View style={styles.prod_infowrap}>
                      <View style={styles.prod_cont}>
                        <Text style={styles.text_heading2}>Phone Number :
                                      </Text>
                        <Text numberOfLines={1} style={styles.text_link}>+1 123 456 9870
                                      </Text>
                      </View>
                      <View style={styles.prod_cont} >
                        <Text style={styles.text_heading2}>Address :
                                      </Text>
                        <Text numberOfLines={1} style={styles.text_info4}>
                          729  Timber Oak Drive, Los Angeles, C..
                                      </Text>
                      </View>
                    </View>
                  </View>
                </View> */}

                    {/*  product details */}
                  </View>
                </View>
              </ScrollView>
            ) : (
                  <SearchItemScreen searchItems={this.state.searchItems} navigation={this.props.navigation} backpath='CustomerProductDetails' />
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
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },


  // 
  text_heading: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    paddingBottom: 5,
    marginBottom: 5,
    color: '#afafaf',
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1
  },

  text_heading2: {
    color: '#afafaf',
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
    borderRadius: 12
  },
  dropshadow2: {
    marginTop: 10,
    // marginLeft: 25, 
    // marginRight: 25,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 5,
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
  },

  dropshadow3: {
    marginTop: 10,
    // marginLeft: 25, 
    // marginRight: 25,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 4,
    marginBottom: 20,
    borderRadius: 12,
  },
  prod_rev: {
    flexDirection: 'row',
    color: '#afafaf',
    marginBottom: 2,
    marginTop: 2,

    justifyContent: 'space-between',
  },
  review_reating_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'

  },



  review_heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
  reating_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'

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
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#2a2a2a',
    textAlign: 'center',

    // borderBottomColor: '#e7e7e7',
    // borderBottomWidth: 1
  },
  inp_text: {
    fontSize: 15,
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
    padding: 0,
  },
  select_reating: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  reating_text: {
    fontSize: 15,
    color: '#afafaf',
    flexDirection: 'column'

  },
  reating_text2: {
    fontSize: 15,
    color: '#afafaf',
    flexDirection: 'column',
    paddingLeft: 8,
  },
  reating_textinfo: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  textinfo_heading: {
    fontSize: 15,
    fontFamily: 'Lato-Bold',
    color: '#000'
  },
  textinfo_heading: {
    fontSize: 15,
    fontFamily: 'Lato-Bold',
    color: '#000'
  },

  textinfo_peg: {
    fontSize: 15,
    color: '#afafaf',
  },
  reating_textinfo2: {
    fontSize: 14,
    color: '#afafaf',
  },

  prod_rev_inp_text_info: {
    lineHeight: 18,
    fontFamily: 'Lato-Regular',
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
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    lineHeight: 24,
    color: '#afafaf',
    textAlign: 'center',
    borderBottomColor: 'transparent',
    borderBottomWidth: 1
  },
  tabs_heading_info_active: {
    fontFamily: 'Lato-Bold',
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
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#2a2a2a',
  },
  prod_prc: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    color: '#038711',

  },
  def_btn: {
    marginLeft: 0,
    color: '#FFF',
    backgroundColor: "#000",
    padding: 8,
    width: 115,
    fontSize: 14,

    textAlign: 'center',
    borderRadius: 60 / 2,
    // fontFamily: 'Lato-Bold', 
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
    paddingBottom: 50
  },
  text_link: {
    paddingLeft: 5,
    paddingRight: 30,
    color: '#afafaf',
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#038711',
    flexShrink: 1,
    flex: 2,

  },
  availability_cunt: {
    color: "#afafaf",
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 30
  },

  text_info4: {
    paddingLeft: 5,
    // paddingRight:30,
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    flexShrink: 1,
    flex: 2,
    // whiteSpace:
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textoverflow: 'ellipsis',
  },

  prod_cont2: {
    flexDirection: 'row',
  },
  review_item: {
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 10
  }

});
