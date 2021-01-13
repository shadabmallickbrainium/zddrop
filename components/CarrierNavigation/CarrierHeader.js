import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import MyProfile from '../Carrier/MyProfile/MyProfile';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
  FCM_TOKEN,
  USER_STATUS,
  SUBSCRIPTION_STATUS,
} from '../../Services/constant';
const Stack = createStackNavigator();
export default class CarrierHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: '',
    };
    this.doAuthentication();
  }

  async doAuthentication() {
    let vv = await AsyncStorage.getItem(USER_TYPE);
    if (vv == '1') {
      this.setState({isUser:'1'})
    }
    if (vv == '2') {
      this.setState({isUser:'2'})
    }
    if (vv == '3') {
      this.setState({isUser:'3'})
    }
    if (vv == '' || vv == null) {
      this.setState({isUser:''})
    }
  }

  render() {
    const loginview = <View style={{ height: 60, width: '100%', backgroundColor: '#059d14', flexDirection: 'row' }}>
      <View style={{ width: 60, height: 60 }}>
        <TouchableOpacity style={{ width: 60, height: 60, justifyContent: 'center', paddingLeft: 13 }} onPress={() => this.props.navProps.openDrawer()}>
          <Image source={require('../../../src/assets/menu.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center', flex: 2 }}>
        <ImageBackground
          source={require('../../../src/assets/location2.png')}
          style={{ width: 15, height: 15 }}
          imageStyle={{ width: '100%' }}>
          <View style={{ width: 250, alignItems: 'flex-start', justifyContent: 'center', paddingBottom: 10, borderRadius: 10, }}>
            <Text numberOfLines={1} style={{ color: "#fff", paddingLeft: 5, display: "flex", flexDirection: 'row', textAlign: 'center', }}>   W49 LA, First Lane.. </Text>
          </View>
        </ImageBackground>
      </View>
      
      <View style={{
        justifyContent: 'center', alignItems: 'flex-end',
      }}>
        <TouchableOpacity style={{ position: 'relative', width: 40, marginLeft: 'auto', marginRight: 10 }}
          onPress={() => this.props.navProps.navigate('MyProfile')}>
          <Image source={require('../../../src/assets/profile_pic.png')} style={{ width: 40, height: 40 }}/>
          {/* <Image
                  source={require('../../../src/assets/notf.png')}
                  style={{width: 25, height: 30}}
                />

<Text style={{backgroundColor:'#fff',width: 25, height: 22,borderRadius: 40/2, position:"absolute",left:10,top:-3,textAlign:'center', borderColor: '#059d14',borderWidth: 2, fontSize:13}}>
        2
       </Text> */}
        </TouchableOpacity>
      </View>
    </View>;

    const notloginview = <View style={{ height: 60, width: '100%', backgroundColor: '#059d14', flexDirection: 'row' }}>
      <View style={{ width: 60, height: 60 }}>
        <TouchableOpacity style={{ width: 60, height: 60, justifyContent: 'center', paddingLeft: 13 }} onPress={() => this.props.navProps.openDrawer()}>
          <Image source={require('../../../src/assets/menu.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center', flex: 2 }}>
        <Text style={styles.textStyle}>
          {/* {this.props.title} */}
          <Text>
          </Text>
        </Text>
      </View>

      <View style={{
        justifyContent: 'center', alignItems: 'flex-end',
      }}>
        <TouchableOpacity style={{ position: 'relative', width: 40, marginLeft: 'auto', marginRight: 10 }} onPress={() => this.props.navProps.navigate('CarrierLogin')}>
          <Image
            source={require('../../../src/assets/profile_pic.png')}
            style={{ width: 40, height: 40 }}
          />
          {/* <Image
                  source={require('../../../src/assets/notf.png')}
                  style={{width: 25, height: 30}}
                />

<Text style={{backgroundColor:'#fff',width: 25, height: 22,borderRadius: 40/2, position:"absolute",left:10,top:-3,textAlign:'center', borderColor: '#059d14',borderWidth: 2, fontSize:13}}>
        2
       </Text> */}

        </TouchableOpacity>
      </View>
    </View>;

    let message;
    if (this.state.isUser == '' || this.state.isUser == null) {
      message = notloginview
    }
    else {
      message = loginview
    }

    return (
      <View>
        {message}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Light',
    color: '#fff',
    position: 'relative',
  }
}); 
