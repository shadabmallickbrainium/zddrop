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
  Dimensions,
  SafeAreaView,
  Keyboard,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CarrierHeaderBack from '../../CarrierNavigation/CarrierHeaderBack';
import Apis from '../../../Services/apis'
import ImagePicker from 'react-native-image-picker';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { USER_ID,USER_TYPE,USER_BUSINESS_TYPE}  from '../../../Services/constant'
import CommonToast from '../../../views/common-toast'
import {BoxShadow} from 'react-native-shadow'
import Hud from '../../../views/hud'
import Shadow from 'react-native-simple-shadow-view';

const { width, height } = Dimensions.get('window')

export default class CarrierDetails extends Component {

    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            mobile:'',
            address:'',
            business_name:'',
            contact_person_name:'',
            isApiCalling:true,
            imgFromApi:'',
            isIndividual:true,
            descriptionValue:'',
            isFav:'',
            VehicleTypeArray:[],
            isFavPressed:false

        }
    }

    async addToWishList(){
      this.setState({
        isFavPressed:true
      })
      if(this.state.isFav==0){
        // add favourite
        Hud.showHud()
        console.warn('gg','okk')
        const userid =await AsyncStorage.getItem(USER_ID);
        const userbusinesstype=await AsyncStorage.getItem(USER_BUSINESS_TYPE);
        console.warn('userdid ',userid)
        const data={
          carrier_id:this.props.route.params.carrier_id,
          shipper_id:userid
        }
        await Apis.addToFavourite(data)
        .then(async (res) => {
          Hud.hideHud()
          console.warn('Rwes', res);
          if (res.status == '1') {
            //CommonToast.showToast(res.msg,'success')
            this.getCarrierProfileData(this.props.route.params.carrier_id)
   
          }
          else {
          
            
            CommonToast.showToast(res.msg,'error')
          }
        }).catch((error) => {
          Hud.hideHud()
          console.error(error);
        });
      }
      else{
        // remove favourite
        Hud.showHud()
       
        const userid =await AsyncStorage.getItem(USER_ID);
        const userbusinesstype=await AsyncStorage.getItem(USER_BUSINESS_TYPE);
        console.warn('userdid ',userid)
        const data={
          carrier_id:this.props.route.params.carrier_id,
          shipper_id:userid
        }
        await Apis.removeFromFavourite(data)
        .then(async (res) => {
          Hud.hideHud()
          console.warn('Rwes', res);
          if (res.status == '1') {
            //CommonToast.showToast(res.msg,'success')
            this.getCarrierProfileData(this.props.route.params.carrier_id)
           
   
          }
          else {
          
            
            CommonToast.showToast(res.msg,'error')
          }
        }).catch((error) => {
          Hud.hideHud()
          console.error(error);
        });
      }
    }
    createFormData = (photo, body) => {
      const data = new FormData();
    
      data.append("profile_pic", {
        name: this.state.filePath.fileName,
        type: this.state.filePath.type,
        uri:
          Platform.OS === "android" ? this.state.filePath.uri : this.state.filePath.uri.replace("file://", "")
      });
    
      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });

      console.warn('oka data ===> '+JSON.stringify(data))
    
      return data;
    };

    componentDidMount(){

        this.getCarrierProfileData(this.props.route.params.carrier_id)
    }

    async getCarrierProfileData(c_id){

        const userid =await AsyncStorage.getItem(USER_ID);
        const userbusinesstype=await AsyncStorage.getItem(USER_BUSINESS_TYPE);
        console.warn('userdid ',userid)
        await Apis.getCarrierDetailsById('',this.props.route.params.carrier_id,userid)
        .then(async (res) => {
            
          console.warn('Rwes', res);
          if (res.status == '1') {
            //CommonToast.showToast(res.msg,'success')
            if(res.data.user_business_type!=null && res.data.user_business_type=='1'){
                this.setState({
                    isIndividual:true,
                    email:res.data.email,
                    mobile:res.data.mobile_no,
                    address:res.data.address,
                    name:res.data.name,
                    isApiCalling:false,
                    imgFromApi:res.data.profile_pic,
                    VehicleTypeArray:res.vehicle_types,
                    isFav:res.data.is_favourite


                })
            }
            else{
                this.setState({
                    isIndividual:false,
                    imgFromApi:res.data.profile_pic,
                    email:res.data.email,
                    mobile:res.data.mobile_no,
                    address:res.data.address,
                    business_name:res.data.business_name,
                    contact_person_name:res.data.contact_person_name,
                    isApiCalling:false,
                    VehicleTypeArray:res.vehicle_types,
                    isFav:res.data.is_favourite

                })
            }

            console.warn('vee',this.state.isFav)
            
          }
          else {
            
            CommonToast.showToast(res.msg,'error')
          }
        }).catch((error) => {
          
          console.error(error);
        });
    }

    async updateProfile(){
        if(this.state.isIndividual){
            if(this.state.name.trim()==''){
                this.name_input.focus()
                CommonToast.showToast('Please enter name','error')
                
                return
            }
           
        }

        if(!this.state.isIndividual){
            if(this.state.business_name.trim()==''){
                this.business_name_input.focus()
                CommonToast.showToast('Please enter buisness name','error')
               
                return
            }
            if(this.state.contact_person_name.trim()==''){
                this.contact_person_input.focus()
                CommonToast.showToast('Please enter contact person name','error')
                return
            }
        }
        if(this.state.mobile.trim()==''){
            this.mobile_input.focus()
            CommonToast.showToast('Please enter phone number','error')
            return
        }
        if(!this.validatePhoneNumber()){
            this.mobile_input.focus()
            CommonToast.showToast('Please enter a valid phone number','error')
 
            return
         }
         if(this.state.address.trim()==''){
            this.address_input.focus()
            CommonToast.showToast('Please enter address','error')
            return
        }

    
        const userid =await AsyncStorage.getItem(USER_ID);
        const userbusinesstype=await AsyncStorage.getItem(USER_BUSINESS_TYPE);
        const data={
            users_id:userid,
            email:this.state.email,
            mobile_no:this.state.mobile,
            address:this.state.address,
            name:this.state.name
           
            }
    
            const data1={
                business_name:this.state.business_name,
                contact_person_name:this.state.contact_person_name,
                users_id:userid,
                email:this.state.email,
                mobile_no:this.state.mobile,
                address:this.state.address,
             }
        Hud.showHud();
        Keyboard.dismiss()
        console.warn('userdid ',userid)
        await Apis.updateProfile(this.state.isIndividual ? data : data1)
        .then(async (res) => {
            
          console.warn('Rwes', res);
          Hud.hideHud();
          if (res.status == '1') {
            CommonToast.showToast(res.msg,'success')
          
            
          }
          else {
            
            CommonToast.showToast(res.msg,'error')
          }
        }).catch((error) => {
            Hud.hideHud();
          console.error(error);
        });
       



    }
    

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
     
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
            console.warn('dataaaa  ',response.data)

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
            filePath: response,
            dataImage:response.data,
            source:source
            });
            console.warn('pathhh',response.uri)
            console.warn('pathhh4444',response)
            //console.warn('555',response.type)

            this.uploadImageToServer()
          }
        });
      }

 async uploadImageToServer () {
  Hud.showHud()
  const userid =await AsyncStorage.getItem(USER_ID);
  console.log("filename",this.state.filePath.fileName)
  
  var form = new FormData();
   //let formdata = new FormData();
      form.append("users_id",userid)
      form.append("profile_pic",{ uri: this.state.filePath.uri, name: this.state.filePath.fileName, type: this.state.filePath.type})
      //formdata.append('profile_pic' , this.state.source)

      console.warn("form===>" + JSON.stringify(form))


      fetch("http://mydevfactory.com/~shreya/ugavi_africa/Api/uploadProfileImage", {
       method: "post",
       headers: {
         //'Accept': 'application/json',
         'Content-Type': 'multipart/form-data',
       },
       body: form,
     }).then(res => res.json())
       .then(res => {
         console.warn('resss',res)
         Hud.hideHud()
         if(res.status=='1'){

           CommonToast.showToast('Photo has been uploaded','success')
           this.setState({
             filePath:'',
             imgFromApi:res.data
           })
         }
       })
       .catch(err => {
         console.error("error uploading images: ", err);
       });
 
  }

    validatePhoneNumber = () => {
        //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        var regexp=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        return regexp.test(this.state.mobile)
      }
      validateEmail=()=>{
        var regexp=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        return regexp.test(this.state.email)
      }

      onBackPress(){

        if(this.props.route.params.isFromHome){
          if(this.state.isFavPressed){
            this.props.navigation.goBack()
            this.props.route.params.refreshFromBack()
  
          }
          else{
            this.props.navigation.goBack()
  
          }
        }
        else{
          this.props.navigation.goBack()
        }
       
      }

    render() {
        // if(this.state.isApiCalling){
        //     return(
        //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

        //             <ActivityIndicator
        //                animating = {true}
        //                color = '#e13b5a'
        //                size = "large"
        //                style={{}}
        //                />
                    
        //         </View>
        //     )
        // }
        return (
            <View style={{flex:1}}>
                <SafeAreaView style={{flex:1}}>
                 
                {/* <CarrierHeaderBack navProps={this.props.navigation} title={'Details'}/> */}
                <View style={{height:60,width:'100%',backgroundColor:'#e13b5a',flexDirection:'row'}}>
                {/* <TouchableOpacity style={{backgroundColor:'black'}}>
                    <Image source={require('../../../src/assets/menu.png')} style={{width:24,height:24,marginLeft:13}}/>

                </TouchableOpacity> */}


                <View style={{width:60,height:60}}>
                    <TouchableOpacity style={{width:60,height:60,justifyContent:'center',paddingLeft:13}} onPress={()=>this.onBackPress()}>

                    <Image source={require('../../../assets/arrow_back.png')} style={{width:28,height:28,tintColor:'white'}}/>

                    </TouchableOpacity>

                    
                </View>
                <View style={{justifyContent:'center'}}>
                <Text style={styles.textStyle}>
                       Details
                 </Text>
                </View>

            </View>

                <View style={{flex:1,backgroundColor:'white'}}>
                {

                    this.state.isApiCalling ?
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                    <ActivityIndicator
                       animating = {true}
                       color = '#e13b5a'
                       size = "large"
                       style={{}}
                       />
                    
                </View>
                    :

                    <View style={{flex:1,backgroundColor:'rgba(255,255,255,0.4)'}}>
                    <ScrollView style={{flex:1}}
                        contentcontainerstyle={{paddingBottom:20}}
                        keyboardShouldPersistTaps='handled'
                    >


                <View style={{marginTop:20,marginLeft:15,marginRight:15}}>

                    <View style={{width:115,height:110,backgroundColor:'white',alignSelf:'center',borderTopLeftRadius:10,borderBottomRightRadius:10,elevation:3,shadowOpacity: 0.3,shadowRadius: 3,shadowOffset: { height: 0,width: 0}}}>
                        <TouchableOpacity style={{width:115,height:110}} onPress={()=>''}>
                            {
                              this.state.imgFromApi !=null && this.state.imgFromApi!='' && this.state.imgFromApi!='null' ?
                              <View style={{width:115,height:110}}>
                                 <Image source={{uri : this.state.imgFromApi}} style={{width:115,height:110,borderTopLeftRadius:10,borderBottomRightRadius:10}} />


                              </View>
                              :
                              
                              <View style={{width:115,height:110,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:17,fontFamily:'Roboto-Bold',color:'black'}}>
                                    </Text>

                              </View>
                            }
                            

                          
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:15,flexDirection:'row'}}>

                      <View style={{flex:1}}>

                        <Text style={{fontFamily:'Roboto-Regular',fontSize:16}}>
                         {
                           this.state.isIndividual ? this.state.name

                           :

                           this.state.contact_person_name

                         
                         }
                        </Text>

                      </View>
                      <View style={{flex:1,marginLeft:10}}>

                        {/* <Text>
                          Carrier2
                        </Text> */}

                      </View>

                    </View>

                    <View style={{marginTop:16,flexDirection:'row'}}>

                      <View style={{flex:1}}>
                      <TouchableOpacity onPress={()=>this.addToWishList()}>
                            
                           
                                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                                        
                                        colors={['#e13b5a', '#96177f',]}
                                        style={{borderTopLeftRadius:10,
                                            
                                            justifyContent:'center',
                                            borderBottomRightRadius:10,
                                        height:height/13}}
                                        >
                                            <Text style={{fontFamily:'Roboto-Regular',fontSize:15,color:'white',textAlign:'center'}}>
                                              {
                                                this.state.isFav!=null && this.state.isFav==0 ?
                                                'Add to wishlist'
                                                :
                                                'Added to wishlist'
                                              }
                                            </Text>

                                        </LinearGradient>              
                                                
                                                
                            
                        </ TouchableOpacity>  

                      </View>

                      <View style={{flex:1,marginLeft:15}}>
                      <TouchableOpacity onPress={()=>''}>
                    
                           
                                    
                                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                                        
                                        colors={['#e13b5a', '#96177f',]}
                                        style={{borderTopLeftRadius:10,
                                            
                                            justifyContent:'center',
                                            borderBottomRightRadius:10,
                                        height:height/13}}
                                        >
                                            <Text style={{fontFamily:'Roboto-Regular',fontSize:15,color:'white',textAlign:'center'}}>Book Now</Text>

                                        </LinearGradient>              
                                                
                                                
                            
                    </ TouchableOpacity>  

                      </View>

                    </View>

                    {
                      this.state.descriptionValue!='' ?
                      <View style={{marginTop:15}}>
                      <Text style={{fontFamily:'Roboto-Bold',fontSize:15}}>
                        Description

                      </Text>
                      <Text style={{fontFamily:'Roboto-Regular',fontSize:14,marginTop:5}}>

                      </Text>

                    </View>
                    :
                    null

                    }

                  

                    <View style={{marginTop:15}}>
                      <Text style={{fontFamily:'Roboto-Bold',fontSize:15}}>
                        Address

                      </Text>
                      <Text style={{fontFamily:'Roboto-Regular',fontSize:14,marginTop:5}}>
                        {
                          this.state.address
                        }

                      </Text>

                    </View>
                    <View style={{marginTop:15}}>
                      <Text style={{fontFamily:'Roboto-Bold',fontSize:15}}>
                        Email

                      </Text>
                      <Text style={{fontFamily:'Roboto-Regular',fontSize:14,marginTop:5}}>
                        {
                          this.state.email
                        }

                      </Text>

                    </View>

                    <View style={{marginTop:15}}>
                      <Text style={{fontFamily:'Roboto-Bold',fontSize:15}}>
                        Contact 

                      </Text>
                      <Text style={{fontFamily:'Roboto-Regular',fontSize:14,marginTop:5}}>
                        {
                          this.state.mobile
                        }

                      </Text>

                    </View>

                    <View style={{marginTop:15}}>
                      <Text style={{fontFamily:'Roboto-Bold',fontSize:15}}>
                        Carrier Type 

                      </Text>
                      <Text style={{fontFamily:'Roboto-Regular',fontSize:14,marginTop:5}}>
                      {
                           this.state.isIndividual ? 'Individual'

                           :

                           'Business'

                         
                         }

                      </Text>

                    </View>


                    {
                      this.state.VehicleTypeArray!=null && this.state.VehicleTypeArray.length >0 ? 
                      <View style={{marginTop:15,marginBottom:20}}>
                      <Text style={{fontFamily:'Roboto-Bold',fontSize:15}}>
                        Vehicle Types

                      </Text>
                      
                      <View style={{marginTop:10}}>

                        {
                          this.state.VehicleTypeArray!=null && this.state.VehicleTypeArray.length >0 ?

                          // this.state.VehicleTypeArray.map((item)=>{
                          //   return(
                          //   <View style={{borderRadius:20,borderColor:'#ddd',borderWidth:1,padding:10,alignSelf:'flex-start',flexDirection:'row',flex:1}}>
                          //     <Text>
                          //       {
                          //         item.vehicle_type
                          //       }

                          //     </Text>

                          //   </View>  
                          //   )
                          // })
                          <FlatList
                          data={this.state.VehicleTypeArray}  
                          numColumns={2}
                          contentContainerStyle={{paddingBottom:height/10}}
                          showsHorizontalScrollIndicator={false}
                          showsVerticalScrollIndicator={false}
                          keyExtractor={(item, index) => 'key'+index}
                          renderItem={({item,index}) =>  
                          {
                            return(
                                <View style={{borderRadius:20,borderColor:'#ddd',borderWidth:1,padding:10,alignSelf:'flex-start',flexDirection:'row',flex:1,justifyContent:'center',margin:5}}>
                              <Text style={{}}>
                                {
                                  item.vehicle_type
                                }

                              </Text>

                            </View> 
                            )
                          }
        
                          }
                          
        
                          />

                          :
                          null
                        }

                      </View>

                    </View>
                    :
                    null

                    }

                    




                        
                    </View>

        
                    </ScrollView>
               </View>

                     

                }
                




                </View>



                
                </SafeAreaView>  
            </View>
    
        )
    }

}

const styles = StyleSheet.create({
   
    btnTextStyle:{
        fontFamily:'Roboto-Bold',
        fontSize:16,
        color:'white',
        textAlign:'center'
    },
    textStyle:{
      fontSize:19,
      fontFamily:'Roboto-Bold',
      color:'white'
  }

}); 
