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
  Dimensions
} from 'react-native';

export default class CarrierHeader extends Component {



    render() {
        return (
            <View style={{height:60,width:'100%',backgroundColor:'#e13b5a',flexDirection:'row'}}>
                {/* <TouchableOpacity style={{backgroundColor:'black'}}>
                    <Image source={require('../../../src/assets/menu.png')} style={{width:24,height:24,marginLeft:13}}/>

                </TouchableOpacity> */}


                <View style={{width:60,height:60}}>
                    <TouchableOpacity style={{width:60,height:60,justifyContent:'center',paddingLeft:13}} onPress={()=>this.props.navProps.goBack()}>

                    <Image source={require('../../../src/assets/arrow_back.png')} style={{width:28,height:28,tintColor:'white'}}/>

                    </TouchableOpacity>

                    
                </View>
                <View style={{justifyContent:'center'}}>
                <Text style={styles.textStyle}>
                       {this.props.title}
                 </Text>
                </View>

                {
                    this.props.isRefreshVisible!=null && this.props.isRefreshVisible ?

                    <View style={{flex:1,alignItems:"flex-end"}}>

                    <View  style={{width:60,height:60,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={{width:60,height:60,justifyContent:'center',paddingLeft:13}} onPress={()=>this.props.onRefreshPress()}>

                    <Image source={require('../../../src/assets/refresh.png')} style={{width:28,height:28,tintColor:'white'}}/>
                    </TouchableOpacity>


                    </View>


                    </View>

                    :
                    null

                }

              
             

            </View>
    
        )
    }

}

const styles = StyleSheet.create({
   textStyle:{
       fontSize:19,
       fontFamily:'Roboto-Bold',
       color:'white'
   }

}); 
