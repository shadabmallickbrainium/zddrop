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
  ScrollView,
  Keyboard,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import Apis from '../../../Services/apis';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../Reusables/Button';

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
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      new_password: '',
    };
  }
  async doChangePass() {
    if (this.state.old_password.trim() == '') {
      this.old_password_input.focus();
      CommonToast.showToast('Please enter old password', 'error');
      return;
    }
    if (this.state.old_password.length < 6) {
      this.old_password_input.focus();
      CommonToast.showToast('Please enter atleast 6 characters', 'error');
      return;
    }

    if (this.state.new_password.trim() == '') {
      this.new_password_input.focus();
      CommonToast.showToast('Please enter new password', 'error');
      return;
    }
    if (this.state.new_password.length < 6) {
      this.new_password_input.focus();
      CommonToast.showToast('Please enter atleast 6 characters', 'error');
      return;
    }
    Hud.showHud();
    Keyboard.dismiss();
    const userid = await AsyncStorage.getItem(USER_ID);
    console.warn('idd ' + userid);
    const data = {
      users_id: userid,
      old_password: this.state.old_password,
      new_password: this.state.new_password,
    };
    await Apis.changePassword('', userid, this.state.old_password, this.state.new_password)
      .then(async res => {
        console.warn('Rwes', res);
        CommonToast.showToast('Password updated successfully', 'success');
        /*if (res.status == '1') {
          Hud.hideHud();
          CommonToast.showToast('Password updated successfully', 'success');
        } else {
          Hud.hideHud();
          CommonToast.showToast(res.msg, 'error');
        }*/
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }
  onButtonClick = () => {
    this.doChangePass();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <CarrierHeader
              navProps={this.props.navigation}  
              title={'Change Password'}
            />
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 25,
                  marginRight: 25,
                  flex: 1,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{width: '100%', flexDirection: 'row', marginTop: 20}}>
                  <TextInput
                    style={{
                      width: '90%',
                      fontFamily: 'Roboto-Light',
                      fontSize: 16,
                      paddingBottom: 8,
                      paddingTop: 0,
                      paddingLeft: 0,
                      color: '#6d6b6c',
                    }}
                    placeholder={'Old Password'}
                    placeholderTextColor={'#6d6b6c'}
                    secureTextEntry={true}
                    ref={input => {
                      this.old_password_input = input;
                    }}
                    onChangeText={old_password => this.setState({old_password})}
                  />
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      width: '10%',
                      paddingBottom: 8,
                    }}>
                    <Image
                      source={require('../../../assets/unlock.png')}
                      style={{width: 22, height: 22, tintColor: '#6d6b6c'}}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 0.5,
                    backgroundColor: '#6d6b6c',
                  }}
                />
                <View
                  style={{width: '100%', flexDirection: 'row', marginTop: 20}}>
                  <TextInput
                    style={{
                      width: '90%',
                      fontFamily: 'Roboto-Light',
                      fontSize: 16,
                      paddingBottom: 8,
                      paddingTop: 0,
                      paddingLeft: 0,
                      color: '#6d6b6c',
                    }}
                    placeholder={'New Password'}
                    placeholderTextColor={'#6d6b6c'}
                    secureTextEntry={true}
                    ref={input => {
                      this.new_password_input = input;
                    }}
                    onChangeText={new_password => this.setState({new_password})}
                  />
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      width: '10%',
                      paddingBottom: 8,
                    }}>
                    <Image
                      source={require('../../../assets/unlock.png')}
                      style={{width: 22, height: 22, tintColor: '#6d6b6c'}}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 0.5,
                    backgroundColor: '#6d6b6c',
                  }}
                />

                <View style={{marginTop: 20}}>
                  <View>
                    <Button title="SAVE" onClick={this.onButtonClick} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnTextStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
