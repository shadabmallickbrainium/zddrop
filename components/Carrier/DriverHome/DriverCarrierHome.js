import React, { Component } from 'react';
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
  StatusBar,
} from 'react-native';
import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CommonToast from '../../../views/common-toast';
import { BoxShadow } from 'react-native-shadow';
import Hud from '../../../views/hud';
import Button from '../../Reusables/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import Shadow from 'react-native-simple-shadow-view';


export default class VendorManageDriver extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <CarrierHeader navProps={this.props.navProps} title={'Profile'} />
            <View style={{ backgroundColor: '#059d14', marginTop: 0, marginLeft: 0, marginRight: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10, padding: 15, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: "center"
                }}>
                <View style={{ flex: 2 }}>
                  <Text style={{
                    fontWeight: 'bold', fontFamily: 'Lato-Medium', fontSize: 17, paddingBottom: 0,
                    paddingTop: 0, paddingLeft: 0, color: '#fff',
                  }}> Driver Carrier Home
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
                    fontFamily: 'Lato-Medium',
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
                  <Image
                    source={require('../../../assets/searcopt.png')}
                    style={{ width: 22, height: 22 }}
                  />
                </View>
              </View>
            </View>
            <ScrollView
              style={{}}
              contentcontainerstyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled">

              <View style={styles.pric_details}>
                <View style={styles.pric_opt}>
                  <View>
                    <Image
                      source={require('../../../assets/dolore_pic.png')}
                      style={{ width: 50, height: 50, alignSelf: 'center' }}
                    />
                  </View>
                  <Text style={styles.price_head}> Total Delivery</Text>
                  <Text style={styles.price_text}> 350</Text>
                </View>
                <View style={styles.pric_opt}>
                  <View>
                    <Image 
                    source = {require('../../../assets/product.png') }
                    style = {{ width: 50, height: 50, alignSelf: 'center' }}
                    />
                  </View>
                  <Text style={styles.price_head}> Total Sale</Text>
                  <Text style={styles.price_text}> $1000000000000.00</Text>
                </View>
              </View>

              <View style={styles.dropshadow5}>
                <View style={styles.user_heading}>
                  <Text style={styles.user_num}> Number</Text>
                  <Text style={styles.user_pick}> Pickup</Text>
                  <Text style={styles.user_pick}> Delivery</Text>
                </View>
                <View style={styles.user_info_details}>
                  <View style={styles.user_info_item}>
                    <Text numberOfLines={1} style={styles.user_item_num}> #119</Text>
                    <Text numberOfLines={1} style={styles.user_item_pick}> 729  Timber 729  Timber 729  Timber 729  Timber</Text>
                    <Text numberOfLines={1} style={styles.user_item_del}> 729  Timber 729  Timber 729  Timber 729  Timber</Text>
                  </View>

                  <View style={styles.user_info_item}>
                    <Text numberOfLines={1} style={styles.user_item_num}> #119</Text>
                    <Text numberOfLines={1} style={styles.user_item_pick}> 729  Timber 729  Timber 729  Timber 729  Timber</Text>
                    <Text numberOfLines={1} style={styles.user_item_del}> 729  Timber 729  Timber 729  Timber 729  Timber</Text>
                  </View>

                  <View style={styles.user_info_item}>
                    <Text numberOfLines={1} style={styles.user_item_num}> #119</Text>
                    <Text numberOfLines={1} style={styles.user_item_pick}> 729  Timber 729  Timber 729  Timber 729  Timber</Text>
                    <Text numberOfLines={1} style={styles.user_item_del}> 729  Timber 729  Timber 729  Timber 729  Timber</Text>
                  </View>
                </View>

                <View style={styles.pagination}>
                </View>
              </View>
            </ScrollView>
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

  filter_opt: {
    position: 'absolute',
    right: 20, top: 5, width: 45, height: 45, padding: 10, borderColor: '#e0e2e4',
    borderWidth: 1, borderRadius: 10,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  dropshadow5: {
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 5,

    borderColor: '#e7e7e7',
    borderWidth: 1,
    // padding:15,
    marginBottom: 10,
    borderRadius: 8
  },
  user_heading: {
    backgroundColor: '#f3f3f3',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  user_num: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#afafaf',
    width: '25%',
    fontSize: 15,
    fontFamily: 'Lato-Medium',


  },
  user_pick: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#afafaf',
    fontSize: 15,
    width: '35%',
    fontFamily: 'Lato-Medium',

  },
  user_del: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#afafaf',
    fontSize: 15,
    width: '35%',

    fontFamily: 'Lato-Medium',

  },

  user_info_item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8
  },
  user_item_num: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000',
    fontSize: 14,
    // flex:1,
    width: '25%',

    fontFamily: 'Lato-Medium',
  },
  user_item_pick: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000',
    // flex:2,
    fontSize: 14,
    width: '35%',
    fontFamily: 'Lato-Medium',

  },
  user_item_del: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000',
    // flex:2,
    fontSize: 14,
    width: '35%',
    fontFamily: 'Lato-Medium',
  },
  pric_details: {
    padding: 25,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"

  },
  pric_opt: {
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 5,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    // padding:15,
    marginBottom: 10,
    borderRadius: 8,
    textAlign: 'center',
    padding: 15,
    width: '45%'


  },
  price_head: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 16
  },
  price_text: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold'
  }


});