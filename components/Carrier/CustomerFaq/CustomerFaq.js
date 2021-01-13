import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  SafeAreaView,
  Keyboard,
  ScrollView,
  BackHandler,
  Dimensions,
  Platform,
  LayoutAnimation, UIManager,
} from 'react-native';
import AccordionFaq from '../AccordionFaq/AccordionFaq'

import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import {BoxShadow} from 'react-native-shadow';
import Hud from '../../../views/hud';
import Button from '../../Reusables/Button';

import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import Shadow from 'react-native-simple-shadow-view';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  FCM_TOKEN,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
} from '../../../Services/constant';
import DeviceInfo from 'react-native-device-info';

var Spinner = require('react-native-spinkit');

const {width, height} = Dimensions.get('window');

export default class CustomerFaq extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu :[
        { 
          title: 'Non Veg Biryanis', 
          data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
        },
        { 
          title: 'Pizzas',
          data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
        },
        { 
         title: 'Drinks',
         data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
        },
        { 
          title: 'Deserts',
          data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
        },
      ],
      menufaq: [],
     }
  }

  componentDidMount() {
    this.getFaqData();
  }

  async getFaqData() {
    Hud.showHud();
    const usertype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    
    const data = {
      group: '1',
    }

  
    const data1 = {
      group: '2',
    }
  
    await Apis.faq(usertype == '1' ? data : data1)
      .then(async res => {
        console.warn('Rwesfaqqq', res);
        if (res.status == 'true') {
          Hud.hideHud();
          if (res.data != null && res.data.length > 0) {
            console.warn('bbbbbb');
            const sweeterArray = res.data.map(sweetItem => {
              
              return {
                title: sweetItem.title,
                data: sweetItem.content,
                
              };
            });

            console.warn('arr ', sweeterArray);
            this.setState({
              menufaq: sweeterArray,
              
            });
          }

        } else {
          //CommonToast.showToast(res.msg,'error')
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  /*renderAccordians() {
    const items = [];
    for (item of this.state.menu) {
        items.push(
            <AccordionFaq 
                title = {item.title}
                data = {item.data}
            />
        );
    }
    return items;
}*/

    render() {
      const items = [];
      if(this.state.menufaq.length > 0) {
      for (item of this.state.menufaq) {
          items.push(
              <AccordionFaq 
                  title = {item.title}
                  data = {item.data}
              />
          );
      }
    }
      

      return (
        <ImageBackground
          style={styles.MainContainer}>
          <SafeAreaView style={{flex: 1}}>
            {this.state.isAuthenticating ? (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: height / 6,
                
                }}>
             
              </View>
            ) : (
              <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView
                  style={{}}
                  contentcontainerstyle={{paddingBottom: 20}}
                  keyboardShouldPersistTaps="handled">
      <CarrierHeader navProps={this.props.navigation} title={'Profile'} />
          <View style={{backgroundColor:'#059d14',padding:15,borderBottomLeftRadius: 30, 
          borderBottomRightRadius: 30}}>                
              <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems:"center"
                  }}>

                    <View  style={{flex:2}}> 
                        <Text style={{fontWeight:'bold',  fontFamily: 'Roboto-Light',fontSize: 17,paddingBottom: 0,
                        paddingTop: 0,paddingLeft: 0,color: '#fff',
                      }}> FAQ 
                      </Text>
                    </View>
                  </View>
            </View>

                <View style={{marginTop: 20,marginBottom:30, marginLeft: 25, marginRight: 25,padding:5, paddingBottom:15, borderRadius:8 ,backgroundColor : "white",shadowColor: '#b9b9b9', shadowOpacity: 0.1,   elevation:15 }}>
                 <View style={styles.container}>
                  { items }
                </View>


                </View>     

                </ScrollView>
              </View>
            )}
          </SafeAreaView>
        </ImageBackground>

      );
    }


  }
  
  const styles = StyleSheet.create({
    MainContainer: {
      backgroundColor:'#fff',
      flex: 1,
      flexDirection:'column', 
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
  });