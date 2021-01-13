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
  FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ChooseCountryCode extends Component {
  close() {
    this.props.navigation.goBack();
  }

  selectCountry(image, name, code, iso) {
    //console.warn('gg', image + 'and' + name + 'and' + code);
    this.props.navigation.goBack();
    this.props.route.params.callBackFromCountry(image, name, code, iso);
  }
  render() {
    const countryArray = [
      {
        img: require('../assets/kenya.png'),
        name: 'Kenya',
        code: '+254',
        iso: 'KE',
      },
      {
        img: require('../assets/uganda.png'),
        name: 'Uganda',
        code: '+256',
        iso: 'UG',
      },
      {
        img: require('../assets/tanzania.png'),
        name: 'Tanzania',
        code: '+255',
        iso: 'TZ',
      },
      {
        img: require('../assets/rwanda.png'),
        name: 'Rwanda',
        code: '+250',
        iso: 'RW',
      },
      {
        img: require('../assets/sudaan.png'),
        name: 'Sudaan',
        code: '+211',
        iso: 'SD',
      },
      {
        img: require('../assets/ethiopia.png'),
        name: 'Ethiopia',
        code: '+251',
        iso: 'ET',
      },
      {
        img: require('../assets/burundi.png'),
        name: 'Burundi',
        code: '+257',
        iso: 'BI',
      },
    ];
    return (
      <View
        style={{
          flex: 1,

          backgroundColor: 'white',
        }}>
        <View
          style={{
            height: 60,
            width: '100%',
            backgroundColor: '#e13b5a',
            flexDirection: 'row',
          }}>
          <View style={{width: 60, height: 60}}>
            {/* <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                paddingLeft: 13,
              }}
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={require('../assets/menu.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity> */}
          </View>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={styles.textStyle}>Choose Country</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.close()}>
                <Image
                  source={require('../assets/cross.png')}
                  style={{
                    width: 23,
                    height: 23,
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 10}}>
          <FlatList
            data={countryArray}
            //contentContainerStyle={{paddingBottom: height / 10}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{flex: 1, flexDirection: 'row'}}
                    onPress={() =>
                      this.selectCountry(
                        item.img,
                        item.name,
                        item.code,
                        item.iso,
                      )
                    }>
                    <Image source={item.img} style={{width: 30, height: 30}} />
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginLeft: 20,
                        fontFamily: 'Roboto-Regular',
                        fontSize: 15,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
});
