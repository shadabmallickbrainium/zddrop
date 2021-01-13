import { Network } from './network';

//Network will recieve 4 Arguments
// "method(type of request)",
// "endpoint ()",
// "body (if POST method)"
// See the main function at ./network.js

// To generate asset and main.jsbundle file for ios

// sudo npx react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

export default class Apis {
  
  static registration = data => {
    return Network('POST', 'restApi/account/register.php', '', data);
  };

  static login = data => {
    return Network('POST', 'restApi/account/login.php', '', data);
  };

  static changePassword = (data, userid, oldpass, newpass) => {
    return Network('GET', 'restApi/customer/Changepasswordindex?customer_id=' + userid + '&currentPassword=' + newpass + '&newPassword=' + oldpass, '', data);
  };

  static forgetPassword = data => {
    return Network('POST', 'restApi/account/forget_password.php', '', data);
  };

  static faq = data => {
    return Network('POST', '/cms_pages/faq.php', '', data);
  };

  static privacyPolicy = data => {
    return Network('POST', '/restApi/cms_pages/privace_policy.php', '', '');
  };

  static termsCondition = () => {
    return Network('POST', '/restApi/cms_pages/terms_condition.php', '', '');
  };

  static getcategories = data => {
    return Network('POST', '/rest/V1/categorylist?parentId=2', '', data);
  };

  static getProductDatas = data => {
    return Network('POST', 'rest/V1/category/products', '', data);
  };

  static searchProducts = data => {
    return Network('POST', 'rest/V1/search/product', '', data);
  };

  static getProductDataById = productId => {
    return Network('GET', 'rest/V1/productDetails/'+ productId, '', '');
  };

  static deleteProduct = data => {
    return Network('POST', '/catalog/deleteproduct.php', '', data);
  };

  static addProducts = data => {
    return Network('POST', '/catalog/addproduct.php', '', data);
  };

  static addItemToReservedList = data => {
    return Network('POST', '/rest/V1/reserve/add', '', data);
  };

  static removeItemFromReservedList = data => {
    return Network('POST', '/rest/V1/reserve/remove', '', data);
  };

  static getReservedList = data => {
    return Network('POST', '/rest/V1/reserve/list', '', data);
  };

  static editprofile = data => {
    return Network('POST', '/account/update_customer.php', '', data);
  };

  static editbusiness = data => {
    return Network('POST', '/account/update_seller_details.php', '', data);
  };

  static getProfileDetails = (data, userid) => {
    return Network('GET', '/getUserDetails/users_id/' + userid, '', data);
  };

  static updateProfile = data => {
    return Network('POST', '/updateProfile', '', data);
  };

  static getCarrierList = (url, data) => {
    return Network('GET', url, '', data);
  };
  
  static addFavorites = (productId, userid) => {
    return Network('POST', '/rest/V1/wishlist/add/' + productId + '?customer_id=' + userid, '', '');
  };

  static getFavouriteList = (userid) => {
    return Network('GET', '/rest/V1/wishlist/items?customer_id='+userid, '', '');
  };

  static removeFavorite = (productId, userid) => {
    return Network('POST', 'rest/V1/wishlist/remove/' + productId + '?customer_id=' + userid, '', '');
  };

  static getVehicleType = data => {
    return Network('GET', '/getVehicleType', '', data);
  };

  static getVehicleMake = (data, vehicleid) => {
    return Network('GET', '/getMake/vehicle_type_id/' + vehicleid, '', data);
  };

  static getVehicleModels = (data, makeid) => {
    return Network('GET', '/getModel/make_id/' + makeid, '', data);
  };

  static getVehicleSeries = (data, modelid) => {
    return Network('GET', '/getSeries/model_id/' + modelid, '', data);
  };
  static getVehicleTrim = (data, seriesid) => {
    return Network('GET', '/getTrim/series_id/' + seriesid, '', data);
  };

  static getVehicleList = (url, data) => {
    return Network('GET', url, '', data);
  };

  static deleteVehicle = data => {
    return Network('POST', '/deleteVehicle', '', data);
  };

  static createDriver = data => {
    return Network('POST', '/rest/V1/driver/create', '', data);
  };

  static deleteDriver = data => {
    return Network('POST', '/deleteDriver', '', data);
  };

  static getVehcileDetailsById = (data, vehicleid) => {
    return Network(
      'GET',
      '/getVehicleDetails/vehicle_id/' + vehicleid,
      '',
      data,
    );
  };

  static getVehcileDetailsById = (data, vehicleid) => {
    return Network(
      'GET',
      '/getVehicleDetails/vehicle_id/' + vehicleid,
      '',
      data,
    );
  };

  static addToFavourite = (productId, customerId) => {
    return Network('POST', '/rest/V1/wishlist/add/' + productId + "?customer_id=" + customerId, '', null);
  };

  static removeFromFavourite = data => {
    return Network('POST', '/removeFromFavourite', '', data);
  };

  static getAllDriverList = (url, data) => {
    return Network('GET', url, '', data);
  };

  static getDriverDetailsById = (data, driverid) => {
    return Network('GET', '/getDriverDetails/driver_id/' + driverid, '', data);
  };

  static carrierByHighToLow = (data, shipperid, lat, long) => {
    return Network(
      'GET',
      '/carrierList/shipper_id/' +
      shipperid +
      '/price/desc/search_text/none' +
      '/my_lat/' +
      lat +
      '/my_long/' +
      long +
      '/distance_filter/none',
      '',
      data,
    );
  };

  static carrierByLowToHigh = (data, shipperid, lat, long) => {
    return Network(
      'GET',
      '/carrierList/shipper_id/' +
      shipperid +
      '/price/asc/search_text/none' +
      '/my_lat/' +
      lat +
      '/my_long/' +
      long +
      '/distance_filter/none',
      '',
      data,
    );
  };

  static carrierByDistance = (data, shipperid, lat, long) => {
    return Network(
      'GET',
      '/carrierList/shipper_id/' +
      shipperid +
      '/price/none/search_text/none' +
      '/my_lat/' +
      lat +
      '/my_long/' +
      long +
      '/distance_filter/asc',
      '',
      data,
    );
  };

  static carrierSearchWithFilterOrWithout = (url, data) => {
    return Network('GET', url, '', data);
  };

  static getCarrierDetailsById = (data, carrierid, shipper_id) => {
    return Network(
      'GET',
      '/carrierDetails/carrier_id/' + carrierid + '/shipper_id/' + shipper_id,
      '',
      data,
    );
  };

  static doFeedback = (data, carrierid) => {
    return Network('POST', '/feedback', '', data);
  };

  static changeActiveStatus = (vehicleid, status, data) => {
    return Network(
      'GET',
      '/changeStatus/vehicle_id/' + vehicleid + '/status/' + status,
      '',
      data,
    );
  };

  static changeActivateStatus = (vehicleid, status, data) => {
    return Network(
      'GET',
      '/changeTmpStatus/vehicle_id/' + vehicleid + '/tmp_status/' + status,
      '',
      data,
    );
  };

  static saveBooking = data => {
    return Network('POST', '/saveBooking', '', data);
  };

  static getCarrierBookingList = (url, data) => {
    return Network('GET', url, '', data);
  };

  static getConfirmedBookingList = (url, data) => {
    return Network('GET', url, '', data);
  };

  static getCarrierBookingDetails = (bookingid, carrierid, data) => {
    return Network(
      'GET',
      '/getBookingDetails/booking_id/' + bookingid + '/carrier_id/' + carrierid,
      '',
      data,
    );
  };

  static getShipperBookingDetails = (bookingid, carrierid, data) => {
    return Network('GET', '/bookingDetails/booking_id/' + bookingid, '', data);
  };

  static submitBidding = data => {
    return Network('POST', '/bidding', '', data);
  };
  
  static saveChat = (url, data) => {
    return Network('POST', url, '', data);
  };


  static getAllChat = (url, data) => {
    return Network('GET', url, '', data);
  };

  static getShipperBookingList = (url, data) => {
    return Network('GET', url, '', data);
  };

  static getAllBookingList = (url, data) => {
    return Network('GET', url, '', data);
  };
  static acceptBidding = (url, data) => {
    return Network('GET', url, '', data);
  };

  static getSubscriptionInfo = (url, data) => {
    return Network('GET', url, '', data);
  };
  static getMySubscription = (url, data) => {
    return Network('GET', url, '', data);
  };
  //http://mydevfactory.com/~shreya/ugavi_africa/Api/mySubscription/carrier_id/53

  static getVehicleTypeDetails = (vehicleid, data) => {
    return Network(
      'GET',
      '/getVehicleTypeDetails/vehicle_type_id/' + vehicleid,
      '',
      data,
    );
  };
  static assignDriver = data => {
    return Network('POST', '/assignDriver', '', data);
  };
  static assignVehicle = data => {
    return Network('POST', '/assignVehicle', '', data);
  };
  static getCartQuote = (data,token) => {
    return Network('POST', '/rest/V1/carts/mine', token, data);
  };

  // googleApiKey={'AIzaSyDe6XZ8YcsHoos4g8ce4d4VDA7WU8B_wd8'}
  // googleApiKey={'AIzaSyCs5rCE5ZfI8edoiq8Pw1q0DFmI1Ifz0Mg'}
  //http://mydevfactory.com/~shreya/ugavi_africa/Api/getVehicleTypeDetails/vehicle_type_id/1
  //http://mydevfactory.com/~shreya/ugavi_africa/Api/getBookingDetails/booking_id/1/carrier_id/10
  //http://mydevfactory.com/~shreya/ugavi_africa/Api/changeStatus/vehicle_id/1/status/0

  //http://mydevfactory.com/~shreya/ugavi_africa/Api/getVehileDetails/vehicle_id/1

  //http://mydevfactory.com/~shreya/ugavi_africa/Api/getDriverList/carrier_id/11
  //http://mydevfactory.com/~shreya/ugavi_africa/Api/carrierList/shipper_id/1/price/desc/search_text/none
}
