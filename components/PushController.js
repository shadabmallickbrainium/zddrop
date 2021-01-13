// import React, {Component, Fragment, useEffect, useState} from 'react';
// import PushNotification from 'react-native-push-notification';
// import * as RootNavigation from './CarrierNavigation/RootNavigation';
// import {useNavigation} from '@react-navigation/native';
//
// import AsyncStorage from '@react-native-community/async-storage';
// import {
//   USER_ID,
//   USER_TYPE,
//   USER_BUSINESS_TYPE,
//   FCM_TOKEN,
// } from '../Services/constant';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   FlatList,
//   Platform,
// } from 'react-native';
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// const PushController = props => {
//   useEffect(() => {
//     pushConfigure();
//   }, []);
//   const pushConfigure = async () => {
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
//               console.warn('clicked', 'cclick');
//               // RootNavigation.navigate('ViewConfirmedBookingDetails', {
//               //   userName: 'Lucy',
//               // });
//             } else if (notification.foreground == false) {
//               console.warn('clicked', 'cclick');
//               // RootNavigation.navigate('ViewConfirmedBookingDetails', {
//               //   userName: 'Lucy',
//               // });
//             } else {
//               console.warn('recc', 'recc');
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
//         senderID: '781196354482',
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
//   };
//   //const navigation = useNavigation();
//   return null;
// };
// export default PushController;
// // export default class PushController extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       pushData: [],
// //     };
// //   }
// //   componentDidMount() {
// //     this.pushConfigure();
// //   }
//
// //   async pushConfigure() {
// //     if (Platform.OS === 'android') {
// //       console.warn('android');
// //       let self = this;
// //       PushNotification.configure({
// //         // (optional) Called when Token is generated (iOS and Android)
// //         onRegister: function(token) {
// //           console.warn('TOKEN:000000', token.token);
// //           AsyncStorage.setItem(FCM_TOKEN, token.token);
// //         },
//
// //         // (required) Called when a remote or local notification is opened or received
// //         onNotification: function(notification) {
// //           console.log('NOTIFICATION:', notification);
//
// //           // process the notification
// //           //self._addDataToList(notification);
// //           // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
// //           // notification.finish(PushNotificationIOS.FetchResult.NoData);
// //         },
//
// //         // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
// //         senderID: '191758964054',
//
// //         // IOS ONLY (optional): default: all - Permissions to register.
// //         permissions: {
// //           alert: true,
// //           badge: true,
// //           sound: true,
// //         },
//
// //         // Should the initial notification be popped automatically
// //         // default: true
// //         popInitialNotification: true,
//
// //         /**
// //          * (optional) default: true
// //          * - Specified if permissions (ios) and token (android and ios) will requested or not,
// //          * - if not, you must call PushNotificationsHandler.requestPermissions() later
// //          */
// //         requestPermissions: true,
// //       });
// //     }
// //   }
//
// //   _renderItem = ({item}) => (
// //     <View key={item.title}>
// //       <Text style={styles.title}>{item.custom_title}</Text>
// //       <Text style={styles.message}>{item.custom_message}</Text>
// //     </View>
// //   );
//
// //   _addDataToList(data) {
// //     let array = this.state.pushData;
// //     array.push(data);
// //     this.setState({
// //       pushData: array,
// //     });
// //     console.log(this.state);
// //   }
//
// //   render() {
// //     return null;
// //   }
// // }
//
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   listHeader: {
//     backgroundColor: '#eee',
//     color: '#222',
//     height: 44,
//     padding: 12,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     paddingTop: 10,
//   },
//   noData: {
//     paddingVertical: 50,
//   },
//   noDataText: {
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   message: {
//     fontSize: 14,
//     paddingBottom: 15,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
