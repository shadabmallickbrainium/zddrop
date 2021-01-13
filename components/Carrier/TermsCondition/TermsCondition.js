import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';

import Apis from '../../../Services/apis';
import Hud from '../../../views/hud';

import CarrierHeader from '../../CarrierNavigation/CarrierHeader';

const { height } = Dimensions.get('window');

export default class TermsCondition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      termscontent: '',
    }
  }

  componentDidMount() {
    this.getTermsData();
  }

  async getTermsData() {
    Hud.showHud();
    await Apis.termsCondition()
      .then(async res => {
        console.warn('Rwestermssss', res);
        if (res.status == 'true') {
          Hud.hideHud();
          if (res.data != null && res.data.length > 0) {
            this.setState({
              termscontent: res.data[0].termscondition
            });
          }
        } else {
          //CommonToast.showToast(res.msg,'error')
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <ImageBackground
        style={styles.MainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          {this.state.isAuthenticating ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: height / 6,

              }}>

            </View>
          ) : (
              <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView
                  contentcontainerstyle={{ paddingBottom: 20 }}
                  keyboardShouldPersistTaps="handled">

                  <CarrierHeader navProps={this.props.navigation} title={'Profile'} />

                  <View style={{
                    backgroundColor: '#059d14', padding: 15, borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30
                  }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: "center"
                      }}>

                      <View style={{ flex: 2 }}>
                        <Text style={{
                          fontWeight: 'bold', fontFamily: 'Roboto-Light', fontSize: 17, paddingBottom: 0,
                          paddingTop: 0, paddingLeft: 0, color: '#fff',
                        }}> Terms & Conditions
                      </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ marginTop: 20, marginBottom: 30, marginLeft: 25, marginRight: 25, padding: 5, paddingBottom: 15, borderRadius: 8, backgroundColor: "white", shadowColor: '#b9b9b9', shadowOpacity: 0.1, elevation: 15 }}>
                    <View style={{ padding: 15 }}>
                      <Text style={{
                        position: 'relative', fontFamily: 'Roboto-Light', fontSize: 16, paddingBottom: 0,
                        paddingTop: 0, paddingLeft: 0, color: '#2a2a2a',
                      }}>{this.state.termscontent.replace(/(<([^>]+)>)/ig, '').replace(/(&nbsp;)/ig, '')}</Text>
                    </View>
                  </View>

                </ScrollView>
              </View>
            )}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    ...Platform.select({
      ios: {},
      android: {},
    }),
    width: null,
    height: null,
  },
  btnStyle: {
    paddingTop: 10,
    paddingBottom: 10,

    borderWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnTextStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});