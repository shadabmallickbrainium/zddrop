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
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => this.props.onEditPress(this.props.item.vehicle_id)}>
          <View style={{flex: 4, flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15}}>
                {this.props.item.vehicle_type}
              </Text>
            </View>
            <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15}}>
                {this.props.item.vehicle_number}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.doActivePress(
                    this.props.item.vehicle_id,
                    this.props.item.status,
                  )
                }>
                <View
                  style={[
                    styles.btnBackground,
                    {
                      borderColor:
                        this.props.item.status == '1' ? 'green' : '#e13b5a',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.activetxtColor,
                      {
                        color:
                          this.props.item.status == '1' ? 'green' : '#e13b5a',
                      },
                    ]}>
                    {this.props.item.status == '1' ? 'Active' : 'Inactive'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginTop: 8}}
                onPress={() =>
                  this.props.doActivatePress(
                    this.props.item.vehicle_id,
                    this.props.item.tmp_status,
                  )
                }>
                <View
                  style={[
                    styles.btnBackground,
                    {
                      borderColor:
                        this.props.item.tmp_status == '1' ? 'green' : '#e13b5a',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.activetxtColor,
                      {
                        color:
                          this.props.item.tmp_status == '1'
                            ? 'green'
                            : '#e13b5a',
                      },
                    ]}>
                    {this.props.item.tmp_status == '1'
                      ? 'Activate'
                      : 'Deactivate'}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <View style={{flex:0.5}}>
                             <TouchableOpacity onPress={()=>this.props.onEditPress(this.props.item.vehicle_id)}>

                             
                             <View style={{width:36,height:36,borderRadius:18,backgroundColor:'#e13b5a',elevation:2,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../assets/edit.png')} style={{width:18,height:18,tintColor:'white'}}/>
                             </View>
                             </TouchableOpacity>

                         </View>
                         <View style={{flex:0.5,marginLeft:5}}>
                             <TouchableOpacity onPress={()=>this.props.onDeletePress(this.props.item.vehicle_id)}>

                             <View style={{width:36,height:36,borderRadius:18,backgroundColor:'white',elevation:2,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../assets/delete.png')} style={{width:18,height:18}}/>

                            </View>
                             </TouchableOpacity>
                          

                        </View> */}
            </View>
          </View>
        </TouchableOpacity>
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
  btnBackground: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 1,
    borderColor: '#e13b5a',
    borderRadius: 5,
  },
  activetxtColor: {
    color: '#e13b5a',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    alignSelf: 'center',
  },
});
