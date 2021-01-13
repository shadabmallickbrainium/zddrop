import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Shadow from 'react-native-simple-shadow-view';

import {USER_ID, USER_TYPE, USER_BUSINESS_TYPE} from '../../Services/constant';

const {height, width} = Dimensions.get('window');
// #e13b5a', '#96177f
const bottomTab = ({state, descriptors, navigation}) => {
  const [activeRoute, setRouteState] = useState(0);
  const [usertype, setUsertype] = useState('');
  const setRoute = (pageName, index) => {
    // const isFocused = state.index === index;
    //console.warn('iss',isFocused)
    // if(isFocused){
    //     // navigation.dispatch(
    //     //     NavigationActions.navigate({ routeName: pageName })
    //     //   );
    //     navigation.jumpTo(pageName);

    // }
    // else{
    //     navigation.jumpTo(pageName);
    // }

    //props.navigation.jumpTo(pageName);
    navigation.navigate(pageName);
    setRouteState(index);
     console.warn('active',activeRoute)
    //onPress()
  };

  // useEffect(() => {
  //     getUserid()
  //     console.warn(navigation.sta)
  //     // if(props.state.index==0){
  //     //     setRouteState(props.state.index);
  //     // }
  //     // else if(props.state.index==1){
  //     //     setRouteState(props.state.index);
  //     // }
  //     // else if(props.state.index==2){
  //     //     setRouteState(props.state.index);
  //     // }
  //     // else{
  //     //     setRouteState(props.state.index);
  //     // }
  //   });

  useEffect(() => {
    getUserid();
    console.warn("aaaaaaaaaaaabottommmmmm",state.index);
    if (state.index == 0) {
      console.warn(state.index)
      setRouteState(state.index);
    } else if (state.index == 1) {
      console.warn(state.index)
      setRouteState(state.index);
    } else if (state.index == 2) {
      console.warn(state.index)
      setRouteState(state.index);
    } else {
      console.warn(state.index)
      setRouteState(state.index);
    }
  });
  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      //target: route.key,
      canPreventDefault: true,
    });
    console.warn('press', 'press');

    // if (!isFocused && !event.defaultPrevented) {
    //   navigation.navigate(route.name);
    // }
  };
  const shadowOpt = {
    width: width,
    height: height / 10,
    color: '#000',
    border: 6,

    opacity: 0.1,
    x: 0,
    y: 2.5,
    style: {justifyContent: 'center'},
  };
  const getUserid = async () => {
    let vv = await AsyncStorage.getItem(USER_TYPE);
    setUsertype(vv);

    //return vv;
    //console.warn('warn',vv)
  };

  const returnView = () => {
    return (
      <View style={{backgroundColor: '#fff', minHeight:20, flex:1, flexDirection: 'row'}}>

        {usertype != null && usertype != '' ? (
        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setRoute('CarrierDashboard', 0)}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../src/assets/home-run.png')}
                style={[
                  styles.imageStyle,
                  {tintColor: activeRoute == 0 ? '#049012' : '#7c7c7c'},
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>
   <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setRoute('CarrierChat', 1)}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../src/assets/email_icon.png')}
                style={[
                  styles.imageStyle,
                  {tintColor: activeRoute == 2 ? '#049012' : '#7c7c7c'},
                ]}
              />

            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setRoute('MyProfile', 2)}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../src/assets/profile_icon.png')}
                style={[
                  styles.imageStyle,
                  {tintColor: (activeRoute == 9 || activeRoute == 8) ? '#049012' : '#7c7c7c'},
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setRoute('CarrierNotification', 3)}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../src/assets/setting_icon.png')}
                style={[
                  styles.imageStyle,
                  {tintColor: activeRoute == 3 ? '#049012' : '#7c7c7c'},
                ]}
              />

            </View>
          </TouchableOpacity>
        </View>

        </View>
        ) : (
          <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setRoute('CarrierDashboard', 0)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../src/assets/home-run.png')}
                  style={[
                    styles.imageStyle,
                    {tintColor: activeRoute == 0 ? '#049012' : '#7c7c7c'},
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
     <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setRoute('CarrierLogin', 1)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../src/assets/email_icon.png')}
                  style={[
                    styles.imageStyle,
                    {tintColor: activeRoute == 2 ? '#049012' : '#7c7c7c'},
                  ]}
                />

              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setRoute('CarrierLogin', 2)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../src/assets/profile_icon.png')}
                  style={[
                    styles.imageStyle,
                    {tintColor: (activeRoute == 9 || activeRoute == 8) ? '#049012' : '#7c7c7c'},
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setRoute('CarrierLogin', 3)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../src/assets/setting_icon.png')}
                  style={[
                    styles.imageStyle,
                    {tintColor: activeRoute == 3 ? '#049012' : '#7c7c7c'},
                  ]}
                />

              </View>
            </TouchableOpacity>
          </View>

          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.viewStyle}>
      <BoxShadow setting={shadowOpt}>{returnView()}</BoxShadow>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#fff',
    height: height / 10,
  },
  inputStyle: {
    backgroundColor: '#fff',
    borderRadius: 50,

    height: 50,
    justifyContent: 'center',
  },
  imageStyle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 12,
    marginTop: 2,
    color: '#000',
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
  },
});
// function bottomTab({ state, descriptors, navigation }) {
//     return (
//       <View style={{ flexDirection: 'row' }}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//               ? options.title
//               : route.name;

//           const isFocused = state.index === index;

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name);
//             }
//           };

//           const onLongPress = () => {
//             navigation.emit({
//               type: 'tabLongPress',
//               target: route.key,
//             });
//           };

//           return (
//             <View style={{backgroundColor:'white',flex:4,flexDirection:'row'}}>
//                              <View style={{flex:1,flexDirection:'column'}}>

//                                  <TouchableOpacity style={{flex:1}} onPress={() => setRoute('ShipperDashboard', 0)}>
//                                      <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
//                                   <Image source={require('../../../src/assets/home-run.png')} style={[styles.imageStyle,{tintColor:isFocused? '#e13b5a': '#000'}]}/>
//                                      <Text style={[styles.textStyle,{color:isFocused ? '#e13b5a' : '#000'}]}>Home</Text>

//                                     </View>

//                                </TouchableOpacity>

//                         </View>

//                              <View style={{flex:1,flexDirection:'column'}}>

//                                 <TouchableOpacity style={{flex:1}} onPress={() => setRoute('CarrierProfile', 1)}>
//                                      <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
//                                          <Image source={require('../../../src/assets/user.png')} style={[styles.imageStyle,{tintColor:isFocused ? '#e13b5a': '#000'}]}/>
//                                      <Text style={[styles.textStyle,{color:isFocused ? '#e13b5a' : '#000'}]}>Profile</Text>

//                                      </View>

//                                  </TouchableOpacity>

//                              </View>
//                                          <View style={{marginTop:-height/32}}>
//                                                <TouchableOpacity onPress={()=>''}>

//                                                 <Shadow
//                                                     style={{
//                                                          height:height/8.3,
//                                                          width:width/4.7,
//                                                          shadowColor: '#b51c89',
//                                                         shadowOpacity:0.6,
//                                                         shadowRadius: 5,
//                                                         shadowOffset: { height: 9.5},
//                                                         backgroundColor:'rgba(255,255,255,0.6)',
//                                                         borderRadius:42
//                                                         }}
//                                                         >
//                                                         <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}}

//                                                             colors={['#e13b5a','#b51c89',]}
//                                                             style={{
//                                                                 borderRadius:42,

//                                                                 justifyContent:'center',
//                                                                 alignItems:'center',

//                                                             height:height/8.3,width:width/4.7}}
//                                                             >
//                                                                 <View>
//                                                                     <Image  source={require('../../assets/heart1.png')} style={{width:22,height:22,tintColor:'white',alignSelf:'center'}}/>
//                                                                     <Text style={{fontSize:11, color:'white', fontFamily:'Roboto-Light',alignSelf:'center'}}>
//                                                                         Favourite
//                                                                     </Text>

//                                                                 </View>

//                                                         </LinearGradient>

//                                                     </Shadow>
//                                                 </TouchableOpacity>
//                                     </View>

//                             <View style={{flex:1,flexDirection:'column'}} >

//                             <TouchableOpacity style={{flex:1}} onPress={() => setRoute('CarrierChat', 2)}>
//                                 <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
//                                     <Image source={require('../../../src/assets/chat.png')} style={[styles.imageStyle,{tintColor:isFocused? '#e13b5a': '#000'}]}/>
//                                 <Text style={[styles.textStyle,{color:isFocused ? '#e13b5a' : '#000'}]}>Chat</Text>

//                                 </View>

//                             </TouchableOpacity>

//                             </View>

//                             <View style={{flex:1,flexDirection:'column'}}>

//                             <TouchableOpacity style={{flex:1}}  onPress={() => setRoute('CarrierNotification', 3)}>
//                                 <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
//                                     <Image source={require('../../../src/assets/notification.png')} style={[styles.imageStyle,{tintColor:isFocused ? '#e13b5a': '#000'}]}/>
//                                 <Text style={[styles.textStyle,{color:isFocused ? '#e13b5a' : '#000'}]}>Notification</Text>

//                                 </View>

//                             </TouchableOpacity>

//                             </View>

//                         </View>
//           );
//         })}
//       </View>
//     );
//   }

export default bottomTab;
