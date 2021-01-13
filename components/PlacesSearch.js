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
  BackHandler,
} from 'react-native';
import PlacesInput from 'react-native-places-input';
import CustomPlacesSearch from './CustomPlacesSearch';

export default class PlacesSearch extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    //console.warn('jj',this.props.route.params.name)
  }
  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack();

    // this.props.navigation.navigate('Dashboard')

    return true;
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.MainContainer}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.4)'}}>
            <View style={{marginTop: 10}}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      source={require('../assets/arrow_back.png')}
                      style={{width: 28, height: 28, tintColor: '#6d6b6c'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{width: '100%'}}>
                <CustomPlacesSearch
                  googleApiKey={'AIzaSyDVMngcBH4hhCNSg6xGczB1bL4jN4KwSso'}
                  placeHolder={'Search'}
                  language={'en-US'}
                  onSelect={place => {
                    //console.warn('resss',place)
                    //const result1=place;
                    //console.warn('hhi',result1)
                    //console.warn('hh',result1.result.geometry.location.lat)
                    if (place != null) {
                      this.props.navigation.goBack();
                      this.props.route.params.backFunc(place);
                    } else {
                      Alert('Error');
                    }

                    //this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
                  }}
                  //iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
                />
              </View>
            </View>
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
});
