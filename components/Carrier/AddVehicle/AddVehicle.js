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
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import Apis from '../../../Services/apis';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  USER_ID,
  USER_TYPE,
  USER_BUSINESS_TYPE,
} from '../../../Services/constant';
import CommonToast from '../../../views/common-toast';
import {BoxShadow} from 'react-native-shadow';
import Hud from '../../../views/hud';
import Shadow from 'react-native-simple-shadow-view';
import CarrierHeaderBack from '../../CarrierNavigation/CarrierHeaderBack';
import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import StarRatingy from '../../../views/StarRating';
import StarRating from 'react-native-star-rating';
import {Dropdown} from 'react-native-material-dropdown';

export default class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addVehicleShown: false,
      vehicleType: '',
      vehicleTypeData: [],
      make: '',
      makeData: [],
      model: '',
      modelData: [],
      series: '',
      filePath: '',
      seriesData: [],
      trim: '',
      trimData: [],
      vehicleNumber: '',
      modelId: '',
      vehicleTypeId: '',
      makeId: '',
      seriesId: '',
      trimId: '',
      filePathArray:[],
      vehicleRegistrationNumber: '',
      vehicleObj: {
        value: '',
        id: '',
      },
      
    };
  }

  componentDidMount() {
    this.getVehicleType();
  }

  async onSaveClicked() {
    if (this.state.vehicleTypeId == '') {
      CommonToast.showToast('Vehicle type is required', 'error');
      return;
    }
    if (this.state.makeId == '') {
      CommonToast.showToast('Make is required', 'error');
      return;
    }
    if (this.state.modelId == '') {
      CommonToast.showToast('Model is required', 'error');
      return;
    }
    if (this.state.seriesId == '') {
      CommonToast.showToast('Series is required', 'error');
      return;
    }
    if (this.state.trimId == '') {
      CommonToast.showToast('Trim is required', 'error');
      return;
    }

    if (this.state.vehicleNumber == '') {
      CommonToast.showToast('Vehicle number is required', 'error');
      this.vehicle_input.focus();
      return;
    }
    if (this.state.vehicleRegistrationNumber == '') {
      CommonToast.showToast('Vehicle registration number is required', 'error');
      this.vehicle_reg_input.focus();
      return;
    }
    if (this.state.filePathArray.length !=3) {
      CommonToast.showToast('Vehicle image  is required', 'error');
      return;
    }

    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    console.log('filename', this.state.filePath.fileName);

    var form = new FormData();
    //let formdata = new FormData();
    form.append('carrier_id', userid);
    form.append('vehicle_type_id', this.state.vehicleTypeId);
    form.append('make_id', this.state.makeId);
    form.append('model_id', this.state.modelId);
    form.append('series_id', this.state.seriesId);
    form.append('trim_id', this.state.trimId);
    form.append('vehicle_number', this.state.vehicleNumber);
    form.append('vehicle_reg_number', this.state.vehicleRegistrationNumber);
    form.append('vehicle_image', {
      uri: this.state.filePathArray[0].uri,
      name: this.state.filePathArray[0].fileName,
      type: this.state.filePathArray[0].type,
    });
    form.append('vehicle_image_2', {
      uri: this.state.filePathArray[1].uri,
      name: this.state.filePathArray[1].fileName,
      type: this.state.filePathArray[1].type,
    });
    form.append('vehicle_image_3', {
      uri: this.state.filePathArray[2].uri,
      name: this.state.filePathArray[2].fileName,
      type: this.state.filePathArray[2].type,
    });

    //formdata.append('profile_pic' , this.state.source) vehicle_image_2, vehicle_image_3

    console.warn('form===>' + JSON.stringify(form));

    fetch('http://mydevfactory.com/~shreya/ugavi_africa/Api/saveVehicle', {
      method: 'post',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: form,
    })
      .then(res => res.json())
      .then(res => {
        console.warn('resss', res);
        Hud.hideHud();
        if (res.status == '1') {
          //CommonToast.showToast(res.msg,'success')
          this.props.navigation.goBack();
          this.props.route.params.fetchVehi();
        }
      })
      .catch(err => {
        console.error('error uploading images: ', err);
      });
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
      multiple: true 
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      //Hud.showHud();

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        console.warn('dataaaa  ', response.data);
        Hud.hideHud();

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        let photoArray = []
        photoArray.push(response)
        this.setState({
         // filePath: response,

         filePathArray:[...photoArray,...this.state.filePathArray]

        });
        console.warn('pathhh', response.uri);
        console.warn('pathhh4444', response);
        //console.warn('555',response.type)

        //this.uploadImageToServer()
      }
    });
  }

  async getVehicleType() {
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    await Apis.getVehicleType('')
      .then(async res => {
        console.warn('Rwes', res);
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          if (res.data != null && res.data.length > 0) {
            const sweeterArray = res.data.map(sweetItem => {
              return {
                value: sweetItem.vehicle_type,
                id: sweetItem.vehicle_type_id,
              };
            });

            console.warn('arr ', sweeterArray);
            this.setState({
              vehicleTypeData: sweeterArray,
              vehicleObj: {
                value: '1',
                id: '2',
              },
            });
          }
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  clikedVehicleType(type, id) {
    console.warn('ttt', type);
  }
  onChangeTrim = (value, index, data) => {
    const iid = data[index].id;
    console.warn('id', iid);
    this.setState({
      trimId: iid,
    });
  };
  onChangeText = (value, index, data) => {
    const iid = data[index].id;
    console.warn('id', iid);
    this.setState({
      vehicleTypeId: iid,
    });
    // start api call for next dropdoen
    this.getVehicleMake(iid);
  };
  onChangeMake = (value, index, data) => {
    const iid = data[index].id;
    console.warn('id', iid);
    this.setState({
      makeId: iid,
    });
    // start api call for next dropdoen
    this.getVehicleModels(iid);
  };

  onChangeModel = (value, index, data) => {
    const iid = data[index].id;
    console.warn('id', iid);
    this.setState({
      modelId: iid,
    });
    // start api call for next dropdoen
    this.getVehicleSeries(iid);
  };
  onChangeSeries = (value, index, data) => {
    const iid = data[index].id;
    console.warn('id', iid);
    this.setState({
      seriesId: iid,
    });
    // start api call for next dropdoen
    this.getVehicleTrims(iid);
  };
  async getVehicleTrims(id) {
    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    await Apis.getVehicleTrim('', id)
      .then(async res => {
        Hud.hideHud();
        console.warn('Rwes', res);
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          if (res.data != null && res.data.length > 0) {
            const sweeterArray = res.data.map(sweetItem => {
              return {value: sweetItem.trim, id: sweetItem.trim_id};
            });

            console.warn('arr ', sweeterArray);
            this.setState({
              trimData: sweeterArray,
            });
          }
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  async getVehicleSeries(id) {
    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    await Apis.getVehicleSeries('', id)
      .then(async res => {
        Hud.hideHud();
        console.warn('Rwes', res);
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          if (res.data != null && res.data.length > 0) {
            const sweeterArray = res.data.map(sweetItem => {
              return {value: sweetItem.series, id: sweetItem.series_id};
            });

            console.warn('arr ', sweeterArray);
            this.setState({
              seriesData: sweeterArray,
            });
          }
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  async getVehicleModels(id) {
    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    await Apis.getVehicleModels('', id)
      .then(async res => {
        Hud.hideHud();
        console.warn('Rwes', res);
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          if (res.data != null && res.data.length > 0) {
            const sweeterArray = res.data.map(sweetItem => {
              return {value: sweetItem.model, id: sweetItem.model_id};
            });

            console.warn('arr ', sweeterArray);
            this.setState({
              modelData: sweeterArray,
            });
          }
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }

  async getVehicleMake(id) {
    Hud.showHud();
    const userid = await AsyncStorage.getItem(USER_ID);
    const userbusinesstype = await AsyncStorage.getItem(USER_BUSINESS_TYPE);
    console.warn('userdid ', userid);
    await Apis.getVehicleMake('', id)
      .then(async res => {
        Hud.hideHud();
        console.warn('Rwes', res);
        if (res.status == '1') {
          CommonToast.showToast(res.msg, 'success');
          if (res.data != null && res.data.length > 0) {
            const sweeterArray = res.data.map(sweetItem => {
              return {value: sweetItem.make, id: sweetItem.make_id};
            });

            console.warn('arr ', sweeterArray);
            this.setState({
              makeData: sweeterArray,
            });
          }
        } else {
          CommonToast.showToast(res.msg, 'error');
        }
      })
      .catch(error => {
        Hud.hideHud();
        console.error(error);
      });
  }
  renderFooter() {
    return (
      //Footer View with Load More button
      <View
      style={{
        
        width: 130,
        height: 130,
        backgroundColor: 'white',
        borderWidth:0.5,borderColor:'#ddd',
       
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 3,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {height: 0, width: 0},
      }}>
      <TouchableOpacity
        style={{width: 130, height: 130}}
        onPress={() => this.selectPhotoTapped()}>
     
          <View
            style={{
              width: 130,
              height: 130,
              justifyContent: 'center',
              
            }}>
            <Image
              source={require('../../../assets/truck.png')}
              style={{
                width: 80,
                height: 80,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
            />
            <View
              style={{
                position: 'absolute',
                width: 130,
                height: 130,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  marginTop: height / 12,
                  elevation: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/plus.png')}
                  style={{
                    width: 20,
                    height: 20,
                    alignSelf: 'center',
                  }}
                  resizeMode={'contain'}
                />
              </View>
            </View>
          </View>
        
      </TouchableOpacity>
    </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <CarrierHeaderBack
              navProps={this.props.navigation}
              title={'Add Vehicle'}
            />

            <View style={{flex: 1, backgroundColor: 'white'}}>
              <ScrollView
                style={{flex: 1}}
                contentcontainerstyle={{paddingBottom: 20}}
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{marginLeft: 25, marginRight: 25, marginBottom: 25}}>
                  <Dropdown
                    label="Equipment Type"
                    fontSize={14}
                    data={this.state.vehicleTypeData}
                    value={this.state.vehicleType}
                    onChangeText={this.onChangeText}
                  />

                  <Dropdown
                    label="Make"
                    fontSize={14}
                    data={this.state.makeData}
                    value={this.state.make}
                    onChangeText={this.onChangeMake}
                  />

                  <Dropdown
                    label="Model"
                    fontSize={14}
                    data={this.state.modelData}
                    value={this.state.model}
                    onChangeText={this.onChangeModel}
                    fontFamily="Roboto-Regular"
                  />

                  <Dropdown
                    label="Series"
                    fontSize={14}
                    data={this.state.seriesData}
                    value={this.state.series}
                    onChangeText={this.onChangeSeries}
                  />
                  <Dropdown
                    label="Trim"
                    fontSize={14}
                    data={this.state.trimData}
                    value={this.state.trim}
                    onChangeText={this.onChangeTrim}
                  />
                  <TextInput
                    style={{
                      fontFamily: 'Roboto-Light',
                      fontSize: 14,
                      paddingBottom: 8,
                      paddingTop: 0,
                      paddingLeft: 0,
                      color: '#6d6b6c',
                      marginTop: 15,
                    }}
                    placeholder={'Vehicle Number'}
                    placeholderTextColor={'#6d6b6c'}
                    ref={input => {
                      this.vehicle_input = input;
                    }}
                    onChangeText={vehicleNumber =>
                      this.setState({vehicleNumber})
                    }
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      backgroundColor: '#6d6b6c',
                    }}
                  />
                  <TextInput
                    style={{
                      fontFamily: 'Roboto-Light',
                      fontSize: 14,
                      paddingBottom: 8,
                      paddingTop: 0,
                      paddingLeft: 0,
                      color: '#6d6b6c',
                      marginTop: 15,
                    }}
                    placeholder={'Vehicle Registration Number'}
                    placeholderTextColor={'#6d6b6c'}
                    ref={input => {
                      this.vehicle_reg_input = input;
                    }}
                    onChangeText={vehicleRegistrationNumber =>
                      this.setState({vehicleRegistrationNumber})
                    }
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      backgroundColor: '#6d6b6c',
                    }}
                  />

                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Roboto-Regular',
                        color: '#6d6b6c',
                      }}>
                      Upload Vehicle Image
                    </Text>
                    <View style={{marginTop:10}}>
                    <FlatList
                      data={this.state.filePathArray}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => 'key' + index}
                      // ListFooterComponent={this.renderFooter.bind(this)}
                      renderItem={({item, index}) => {
                        return (
                         <View style={{height:130,width:130,   borderTopLeftRadius: 10,
                          borderBottomRightRadius: 10,marginLeft:7}}>

                            <Image source={{uri:item.uri}}  style={{
                                width: 130,
                                height: 130,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                              }}/>

                         </View>  
                        );
                      }}
                   
                    />
                    </View>


                    {
                      this.state.filePathArray!=null && this.state.filePathArray.length == 3 ?
                     null

                    :
                    <View
                    style={{
                      marginTop: height / 20,
                      width: 130,
                      height: 130,
                      backgroundColor: 'white',
                      alignSelf: 'center',
                      borderTopLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      elevation: 3,
                      shadowOpacity: 0.3,
                      shadowRadius: 3,
                      shadowOffset: {height: 0, width: 0},
                    }}>
                    <TouchableOpacity
                      style={{width: 130, height: 130}}
                      onPress={() => this.selectPhotoTapped()}>
                      {this.state.filePath != null &&
                      this.state.filePath != '' &&
                      this.state.filePath != 'null' ? (
                        <View style={{width: 130, height: 130}}>
                          <Image
                            source={{uri: this.state.filePath.uri}}
                            style={{
                              width: 130,
                              height: 130,
                              borderTopLeftRadius: 10,
                              borderBottomRightRadius: 10,
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            width: 130,
                            height: 130,
                            justifyContent: 'center',
                            
                          }}>
                          <Image
                            source={require('../../../assets/truck.png')}
                            style={{
                              width: 80,
                              height: 80,
                              alignSelf: 'center',
                            }}
                            resizeMode={'contain'}
                          />
                          <View
                            style={{
                              position: 'absolute',
                              width: 130,
                              height: 130,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                marginTop: height / 12,
                                elevation: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={require('../../../assets/plus.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                  alignSelf: 'center',
                                }}
                                resizeMode={'contain'}
                              />
                            </View>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                    }

                    

                    <View
                      style={{
                        marginTop: height / 20,
                        marginBottom: height / 20,
                      }}>
                      <TouchableOpacity onPress={() => this.onSaveClicked()}>
                        <Shadow
                          style={{
                            height: height / 13,
                            shadowColor: '#e13b5a',
                            shadowOpacity: 0.9,
                            shadowRadius: 6,
                            shadowOffset: {width: 5, height: 10},
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            borderRadius: 10,
                          }}>
                          <LinearGradient
                            start={{x: 0, y: 1}}
                            end={{x: 1, y: 0}}
                            colors={['#e13b5a', '#96177f']}
                            style={{
                              borderTopLeftRadius: 10,

                              justifyContent: 'center',
                              borderBottomRightRadius: 10,
                              height: height / 13,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 16,
                                color: 'white',
                                textAlign: 'center',
                              }}>
                              Save
                            </Text>
                          </LinearGradient>
                        </Shadow>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
