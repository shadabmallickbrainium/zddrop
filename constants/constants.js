import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';

const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;

export const calcH=(heightInPixel)=>{
    
    return screenHeight*heightInPixel;
}

export const calcW=(widthInPixel)=>{
    
    return screenWidth*widthInPixel;
}