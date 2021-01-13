import React, { Component } from 'react';

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
  BackHandler,
} from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate("MyDrawer");
    }, 9000);
  }
  
  render() {
    return (
      <View style={styles.screen}>
        <Image
        source={require('../../../assets/splashscreen.png')}
        style={styles.MainContainer} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

  MainContainer: {
    width:'100%',
    height:'100%'
  }
});
