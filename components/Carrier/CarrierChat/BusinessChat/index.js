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
const styles = StyleSheet.create({});

const BusinessChat = props => {
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.warn('lo', 'jj');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
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

export default BusinessChat;
