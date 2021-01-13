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
  SafeAreaView,
} from 'react-native';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';

export default class CarrierNotification extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <CarrierHeader
              navProps={this.props.navigation}
              title={'Notification'}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 24,
                  fontFamily: 'Roboto-Light',
                }}>
                Coming soon..
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
