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
  BackHandler,
} from 'react-native';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
// modules
const {height, width} = Dimensions.get('window');
import Shadow from 'react-native-simple-shadow-view';
import LinearGradient from 'react-native-linear-gradient';

export default class SingleOrderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 20,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15}}>
              {this.props.item.orderid}
            </Text>
          </View>
          <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15}}>
              {this.props.item.pickup}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15}}>
              {this.props.item.delivery}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'black',
  },
  textStyle1: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'grey',
  },
});
