// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ImageBackground,
//   ScrollView,
//   SafeAreaView,
//   Keyboard,
//   Dimensions,
//   BackHandler,
//   Platform,
// } from 'react-native';
// import PushNotification from 'react-native-push-notification';
//
// // modules
// import CarrierHeader from './CarrierNavigation/CarrierHeader';
// const {height, width} = Dimensions.get('window');
// import Shadow from 'react-native-simple-shadow-view';
// import LinearGradient from 'react-native-linear-gradient';
// import Apis from '../Services/apis';
// import AsyncStorage from '@react-native-community/async-storage';
// import CommonToast from '../views/common-toast';
// import {USER_ID, USER_TYPE, USER_BUSINESS_TYPE} from '../Services/constant';
// import Button from './Reusables/Button';
//
// import Hud from '../views/hud';
// export default class FeedbackToAdmin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       subject: '',
//       feedback: '',
//     };
//   }
//
//   componentDidMount() {
//     //this.pushConfigure();
//   }
//   async pushConfigure() {
//     if (Platform.OS === 'android') {
//       console.warn('android');
//       let self = this;
//       PushNotification.configure({
//         // (optional) Called when Token is generated (iOS and Android)
//         onRegister: function(token) {
//           console.warn('TOKEN:000000', token.token);
//           AsyncStorage.setItem(FCM_TOKEN, token.token);
//         },
//
//         // (required) Called when a remote or local notification is opened or received
//         onNotification: function(notification) {
//           console.log('NOTIFICATION:', notification);
//
//           if (notification != null) {
//             if (
//               notification.foreground == false &&
//               notification.userInteraction == true
//             ) {
//               //
//               console.warn('clickedddd', 'cclick');
//               //   RootNavigation.navigate('ViewConfirmedBookingDetails', {
//               //     userName: 'Lucy',
//               //   });
//             } else if (notification.foreground == false) {
//               console.warn('clickedddd', 'cclick');
//               //   RootNavigation.navigate('ViewConfirmedBookingDetails', {
//               //     userName: 'Lucy',
//               //   });
//             } else {
//               console.warn('reccccc', 'recc');
//             }
//           }
//
//           // process the notification
//           //self._addDataToList(notification);
//           // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
//           // notification.finish(PushNotificationIOS.FetchResult.NoData);
//         },
//
//         // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
//         senderID: '191758964054',
//
//         // IOS ONLY (optional): default: all - Permissions to register.
//         permissions: {
//           alert: true,
//           badge: true,
//           sound: true,
//         },
//
//         // Should the initial notification be popped automatically
//         // default: true
//         popInitialNotification: true,
//
//         /**
//          * (optional) default: true
//          * - Specified if permissions (ios) and token (android and ios) will requested or not,
//          * - if not, you must call PushNotificationsHandler.requestPermissions() later
//          */
//         requestPermissions: true,
//       });
//     }
//   }
//   onButtonClick = () => {
//     this.doFeedback();
//   };
//
//   async doFeedback() {
//     if (this.state.subject.trim() == '') {
//       CommonToast.showToast('Subject can not be blank', 'error');
//       this.subject_input.focus();
//       return;
//     }
//     if (this.state.feedback.trim() == '') {
//       CommonToast.showToast('Feedback can not be blank', 'error');
//       this.feedback_input.focus();
//       return;
//     }
//     const userid = await AsyncStorage.getItem(USER_ID);
//     Hud.showHud();
//     Keyboard.dismiss();
//     const data = {
//       subject: this.state.subject,
//       feedback: this.state.feedback,
//       users_id: userid,
//     };
//     await Apis.doFeedback(data)
//       .then(async res => {
//         console.warn('Rwes', res);
//         if (res.status == '1') {
//           CommonToast.showToast(res.msg, 'success');
//
//           Hud.hideHud();
//           this.subject_input.clear();
//           this.feedback_input.clear();
//           this.setState({
//             subject: '',
//             feedback: '',
//           });
//         } else {
//           Hud.hideHud();
//           CommonToast.showToast(res.msg, 'error');
//         }
//       })
//       .catch(error => {
//         Hud.hideHud();
//         console.error(error);
//       });
//   }
//
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <SafeAreaView style={{flex: 1}}>
//           <View style={{flex: 1}}>
//             <CarrierHeader
//               navProps={this.props.navigation}
//               title={'Feedback'}
//             />
//             <View style={{flex: 1, backgroundColor: 'white'}}>
//               <ScrollView keyboardShouldPersistTaps="handled">
//                 <View style={{marginTop: 20, marginLeft: 25, marginRight: 25}}>
//                   <View
//                     style={{
//                       width: '100%',
//                       flexDirection: 'row',
//                       marginTop: 20,
//                     }}>
//                     <TextInput
//                       style={{
//                         width: '100%',
//                         fontFamily: 'Roboto-Light',
//                         fontSize: 16,
//                         paddingBottom: 8,
//                         paddingTop: 0,
//                         paddingLeft: 0,
//                         color: '#6d6b6c',
//                       }}
//                       placeholder={'Subject'}
//                       placeholderTextColor={'#6d6b6c'}
//                       ref={input => {
//                         this.subject_input = input;
//                       }}
//                       onChangeText={subject => this.setState({subject})}
//                     />
//                     <View
//                       style={{
//                         alignItems: 'flex-end',
//                         justifyContent: 'center',
//                         width: '10%',
//                         paddingBottom: 8,
//                       }}>
//                       {/* <Image source={require('../../../assets/user1.png')} style={{width:22,height:22,tintColor:'#6d6b6c'}}/> */}
//                     </View>
//                   </View>
//
//                   <View
//                     style={{
//                       width: '100%',
//                       height: 0.5,
//                       backgroundColor: '#6d6b6c',
//                     }}
//                   />
//
//                   <View
//                     style={{
//                       width: '100%',
//                       flexDirection: 'row',
//                       marginTop: 20,
//                     }}>
//                     <TextInput
//                       style={{
//                         width: '100%',
//                         fontFamily: 'Roboto-Light',
//                         fontSize: 16,
//                         paddingBottom: 8,
//                         paddingTop: 0,
//                         paddingLeft: 0,
//                         color: '#6d6b6c',
//                         height: 100,
//                         textAlignVertical: 'top',
//                       }}
//                       placeholder={'Feedback'}
//                       placeholderTextColor={'#6d6b6c'}
//                       multiline={true}
//                       ref={input => {
//                         this.feedback_input = input;
//                       }}
//                       onChangeText={feedback => this.setState({feedback})}
//                     />
//                     <View
//                       style={{
//                         alignItems: 'flex-end',
//                         justifyContent: 'center',
//                         width: '10%',
//                         paddingBottom: 8,
//                       }}>
//                       {/* <Image source={require('../../../assets/unlock.png')} style={{width:22,height:22,tintColor:'#6d6b6c'}}/> */}
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       width: '100%',
//                       height: 0.5,
//                       backgroundColor: '#6d6b6c',
//                     }}
//                   />
//
//                   <View style={{marginTop: 20, marginBottom: 20}}>
//                     <Button title="Submit" onClick={this.onButtonClick} />
//                   </View>
//                 </View>
//               </ScrollView>
//             </View>
//           </View>
//         </SafeAreaView>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   textStyle: {
//     fontFamily: 'Roboto-Regular',
//     fontSize: 16,
//     color: 'black',
//   },
//   textStyle1: {
//     fontFamily: 'Roboto-Regular',
//     fontSize: 15,
//     color: 'grey',
//   },
//   btnStyle: {
//     paddingTop: 10,
//     paddingBottom: 10,
//
//     borderWidth: 1,
//     borderColor: 'black',
//     borderTopLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   btnTextStyle: {
//     fontFamily: 'Roboto-Bold',
//
//     fontSize: 16,
//     color: 'white',
//     textAlign: 'center',
//   },
// });
