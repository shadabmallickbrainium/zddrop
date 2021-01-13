import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
  button,
  TextInput,
} from 'react-native';
import moment from 'moment';
class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReplyClicked: false,
    };
  }

  returnView() {
    if (
      this.props.usertype == '1' &&
      this.props.item.direction == 'From shipper to carrier'
    ) {
      // loggedin shipper
      return (
        <View style={{flex: 1, flexDirection: 'row', marginRight: 10}}>
          <View style={{flex: 0.3}} />

          <View style={{flex: 0.7}}>
            <View
              style={{
                backgroundColor: '#e13b5a',
                marginTop: 15,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 13,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 6,
                paddingBottom: 6,
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontFamily: 'Roboto-Regular',
                  }}>
                  {this.props.item.content}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontSize: 11,
                color: 'grey',
                marginTop: 2,
              }}>
              {moment(this.props.item.date_time).format(
                'MMM DD, YYYY hh:mm:ss A',
              )}
            </Text>
          </View>
        </View>
      );
    } else if (
      this.props.usertype == '2' &&
      this.props.item.direction == 'From carrier to shipper'
    ) {
      return (
        <View style={{flex: 1, flexDirection: 'row', marginRight: 10}}>
          <View style={{flex: 0.3}} />

          <View style={{flex: 0.7, flexDirection: 'column'}}>
            <View
              style={{
                backgroundColor: '#e13b5a',
                marginTop: 15,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 13,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 6,
                paddingBottom: 6,
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontFamily: 'Roboto-Regular',
                  }}>
                  {this.props.item.content}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontSize: 11,
                color: 'grey',
                marginTop: 2,
              }}>
              {moment(this.props.item.date_time).format(
                'MMM DD, YYYY hh:mm:ss A',
              )}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
          <View style={{flex: 0.7}}>
            <View
              style={{
                backgroundColor: '#ddd',
                marginTop: 15,
                borderTopLeftRadius: 13,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 6,
                paddingBottom: 6,
                alignSelf: 'flex-start',
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontFamily: 'Roboto-Regular',
                  }}>
                  {this.props.item.content}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'flex-start',
                fontSize: 11,
                color: 'grey',
                marginTop: 2,
              }}>
              {moment(this.props.item.date_time).format(
                'MMM DD, YYYY hh:mm:ss A',
              )}
            </Text>
          </View>

          <View style={{flex: 0.3}} />
        </View>
      );
    }
  }

  render() {
    return <View style={{}}>{this.returnView()}</View>;
  }
}

export default SingleItem;
