import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Shadow from 'react-native-simple-shadow-view';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');

export default function Button(props) {
  return (
    <View>
      <TouchableOpacity onPress={() => props.onClick()}>
        <Shadow
          style={{
            // height: height / 13,
            // shadowColor: '#e13b5a',
            // shadowOpacity: 0.9,
            // shadowRadius: 6,
            // shadowOffset: {width: 5, height: 10},
            // backgroundColor: 'rgba(255,255,255,0.6)',
            // borderRadius: 10,
            height: height / 13,
               backgroundColor: '#000',
               borderRadius: 30,
          }}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#000', '#000']}
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              justifyContent: 'center',
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,

              height: height / 13,
            }}>
            <Text style={styles.btnTextStyle}>{props.title}</Text>
          </LinearGradient>
        </Shadow>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnTextStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
