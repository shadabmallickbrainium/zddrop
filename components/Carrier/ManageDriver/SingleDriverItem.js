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

export default class SingleVehicleItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
        <View style={{flex: 4, flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15}}>
              {this.props.item.name}
            </Text>
          </View>
          <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15}}>
              {this.props.item.email}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.onEditPress(this.props.item.driver_id)
                }>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#e13b5a',
                    elevation: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/edit.png')}
                    style={{width: 18, height: 18, tintColor: 'white'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5, marginLeft: 5}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.onDeletePress(this.props.item.driver_id)
                }>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: 'white',
                    elevation: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/delete.png')}
                    style={{width: 18, height: 18}}
                  />
                </View>
              </TouchableOpacity>
            </View>
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
