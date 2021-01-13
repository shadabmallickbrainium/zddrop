import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, BackHandler } from 'react-native';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      searchItems: [],
    }
  }

  componentDidMount() {
    this.setState({searchItems:this.props.searchItems})
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    // BackHandler.exitApp();
    this.props.navigation.navigate(this.props.backpath)
    return true;
  }

  render() {
    const searchItems = this.props.searchItems;
    return (
        <View style={{padding:10}}>
          {
            searchItems.length === 0 ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>OOP's</Text>
                <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>No products under this category</Text>
              </View>
            ) :
              searchItems.map(item => {
                  return (
                    <TouchableOpacity key={item.product_id} style={styles.prod_itm} activeOpacity={0.9} delayPressIn={4} onPress={() => {
                      this.props.navigation.navigate('CustomerProductDetails', {
                        productId: item.product_id
                      })
                    }} >
                      <View style={styles.prod_img}>
                        <Image style={styles.prod_pic1}
                          source={{ uri: item.images[0] }} />
                      </View>
                      <View style={styles.prod_desc}>
                        <Text style={styles.prod_title}>{item.name}</Text>
                        <Text style={styles.prod_prc}>${item.price ? parseInt(item.price).toFixed(2) : 'No Price Yet'}</Text>
                      </View>

                      <View style={styles.prod_def_btn}>
                        <TouchableOpacity onPress={() => {
                          this.props.navigation.navigate("CustomerCheckout", {
                            itemData: item
                          })
                        }}>
                          <View style={styles.def_btn_wrap} >
                            <Text style={styles.def_btn}>
                              Add to Cart
                                      </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  )
              })
          }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  prod_itm: {
    marginTop: 15,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 5,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    color: '#afafaf',
    marginBottom: 20,
    marginTop: 2,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  prod_img: {
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    elevation: 2,
    padding: 5,
    borderRadius: 50,
    borderBottomColor: '#eeeeee',
    // borderBottomWidth: 1,
  },
  prod_pic1: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  prod_desc: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'left'
  },
  prod_title: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#2a2a2a',
  },
  prod_prc: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    color: '#038711',

  },
  def_btn: {
    marginLeft: 0,
    color: '#FFF',
    backgroundColor: "#000",
    padding: 8,
    width: 115,
    fontSize: 14,

    textAlign: 'center',
    borderRadius: 60 / 2,
    // fontFamily: 'Lato-Bold', 
    borderColor: 'black',
    borderWidth: 2

  },
})