import React, {useState, useEffect, Component} from 'react';
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
} from 'react-native';

import CarrierHeader from '../../CarrierNavigation/CarrierHeader';
import StarRatingy from '../../../views/StarRating';
import StarRating from 'react-native-star-rating';

//  class CarrierChat extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           starCount: 3.5
//         };
//       }

//       componentDidUpdate(prevProps) {
//         if (prevProps.isFocused !== this.props.isFocused) {
//           // Use the `this.props.isFocused` boolean
//           // Call any action
//           console.warn('foc','hhh')
//         }
//       }

//       onStarRatingPress(rating) {
//         this.setState({
//           starCount: rating
//         });
//       }

//     render() {
//         const ratingObj = {
//             ratings: 4,
//             views: 34000
//           }
//         return (
//             <View style={{flex:1}}>
//                 <CarrierHeader navProps={this.props.navigation} title={'Chat'}/>
//                 <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
//                 <Text style={{color:'#000000',fontSize:24,fontFamily:'Roboto-Light'}}>
//                         Chat
//                 </Text>
//                 </View>

//             </View>

//         )
//     }

// }

const styles = StyleSheet.create({});

const Chat = props => {
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.warn('lo', 'jjrr');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <CarrierHeader navProps={props.navigation} title={'Chat'} />
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
};

export default Chat;
