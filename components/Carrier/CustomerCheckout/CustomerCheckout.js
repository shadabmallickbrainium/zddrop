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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
// import Icon from 'react-native-vector-icons/FontAwesome';
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
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';

export default class CustomerCheckout extends Component {
  constructor(props) {
    super(props);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: '',
      password: '',
      isApiCalling: false,
      eyeIcon: 'off',
      passwordVisible: true,
      eyeImg: require('../../../assets/visibility_off.png'),
      rememberMe: true,
      isAuthenticating: true,
      checkList: [],
      quoteId:'',
      token:'',
      totalPrice:0
    }
  }

 async componentDidMount() {
    // this.state.checkList.push(this.state.route.params.itemData)
    // const data = this.props.route.params.itemData;
    // this.setState({checkList: [...this.state.checkList, data]})
    const token = await AsyncStorage.getItem(USER_TOKEN);
    const cartQuote= await AsyncStorage.getItem(CART_QUOTE);
  
    
   this.setState({quoteId:cartQuote,token:token})
   this.getCartData();

  }
getCartData=async()=>{
   var header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.state.token}`,
  };
  var config = {
    method: "get",
    url: base_url+"rest/V1/carts/mine",
    headers: header,
  };
  console.log(config);
  this.setState({isLoading:true})
  await axios(config)
    .then((response) => {
      this.setState({isLoading:false})
    //  const carData=response.data.items;
      this.setState({checkList:response.data.items})
    //alert('Product add to cart'+JSON.stringify(response.data.items))
     this.calculateTotalPrice(response.data.items)
      console.log(response);
     // alert(JSON.stringify(response))
    
    //alert(response.data)
    })
    .catch((error) => {
      this.setState({isLoading:false})
      console.log(error);
     // alert(JSON.stringify(error.message))
      
    });
  }

calculateTotalPrice=(data)=>{
  var n=data.length;
  var totalPrice=0;
  for(var i=0;i<n;i++){
    totalPrice=totalPrice+data[i].price*data[i].qty
  }
  this.setState({totalPrice:totalPrice})
  //alert(totalPrice)
 // alert(JSON.stringify(data))
}
incrementQuantity=async(sku,qty,itemId)=>{
//alert(this.state.token+"**"+this.state.quoteId)
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
    this.getCartData()
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
      this.getCartData()
      //alert(JSON.stringify(response))
    })
    .catch((error) => {
      this.setState({isLoading:false})
      console.log(error);
    //  alert(JSON.stringify(error))
    });
  
  }
  
onCheckoutBtnPress=()=>{
  this.props.navigation.navigate('CustomerAddress')
}
  render() {
    console.log("Item Data : " + JSON.stringify(this.state.checkList));
    return (
      <ImageBackground
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <CarrierHeader navProps={this.props.navigation} title={'Profile'} />
          <View style={{
            backgroundColor: '#059d14', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20}}>

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
                }}> Customer Checkout
                        </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: '#60b169', padding: 10,
                borderRadius: 40}}>
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
                onChangeText={email => this.setState({ email })}
              />
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  marginRight: 5,
                  // paddingBottom: 8,
                }}>
                <Image
                  source={require('../../../assets/searcopt.png')}
                  style={{ width: 22, height: 22 }}
                />
              </View>
            </View>
          </View>

          <ScrollView
            style={{ backgroundColor: "#fff", }}
            contentcontainerstyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled">

            <View style={styles.tabs_content}>
              <View style={styles.tab_content_area}>
                <View style={styles.content_block}>

{ 
  this.state.checkList.map((item,key)=>(
                  <View style={styles.prod_block}>
                    <View style={styles.prod_itm}>
                      <View style={styles.prod_img}>
                        <Image style={styles.prod_pic1}
                          source={require('../../../assets/prod1.png')}
                        />
                      </View>
                      <View style={styles.prod_desc}>
                        <Text style={styles.prod_title}>{item.name}   </Text>
                        <Text style={styles.prod_prc}>${item.price}</Text>
                        {/* <Text style={styles.prod_date}>Date : 12.06.2020</Text> */}

                      </View>
                      <View style={styles.prod_def_btn}>
                        <View style={styles.availability_cunt}>
                          <TouchableOpacity  onPress={()=>this.incrementQuantity(item.sku,item.qty-1,item.item_id)} >
                            <Image
                              source={require('../../../assets/min.png')}
                              style={{ width: 30, height: 30 }}
                            />
                          </TouchableOpacity>
                          <View style={styles.availability_countopt}>
                            <Text style={{color:'#6d6b6c'}}>{item.qty}</Text>
                            {/* <TextInput
                              style={styles.inpText_bon} placeholder={'1'} placeholderTextColor={'#6d6b6c'}
                              value={1}
                            /> */}
                          </View>
                          <TouchableOpacity  onPress={()=>this.incrementQuantity(item.sku,item.qty+1,item.item_id)}>
                            <Image
                              source={require('../../../assets/pls.png')}
                              style={{ width: 30, height: 30 }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
  ))
}
                </View>


                <View style={styles.total_pric}>
                  <Text style={styles.total_cap}>Total </Text>
                  <Text style={styles.total_cap_pric}>${this.state.totalPrice} </Text>
                </View>

                <TouchableOpacity   onPress={this.onCheckoutBtnPress} >
                  <View style={styles.def_btn_wrap} >
                    <Text style={styles.def_btn}>Checkout</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
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

  availability_cunt: {
    color: "#afafaf",
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingTop: 10,
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
    fontSize: 15,
    color: '#2a2a2a',
  },

  prod_prc: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#038711',
  },

  def_btn: {
    marginLeft: 0,
    color: '#FFF',
    backgroundColor: "#000",
    padding: 10,
    width: 180,
    fontSize: 16,
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

  def_btn_wrap: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#6d6b6c',
    alignSelf: 'center',
    marginTop: 20
  },

  prod_arrow: {
    width: 10,
    height: 15,
    marginLeft: 10
  },
  inpText_bon: {
    width: '90%',
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    paddingBottom: 8,
    textAlign: 'center',
    color: '#6d6b6c',
  },

  total_pric: {
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

  total_cap: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#2a2a2a',
  },

  total_cap_pric: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#038711',
  },
});
