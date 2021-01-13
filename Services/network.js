import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {base_url} from './constant';
import AsyncStorage from '@react-native-community/async-storage';

//THIS CODE IS FOR DEBUGGIN NETWORK CALLES IN CHROME DEVTOOLS
//REMOVE THIS ON PRODUCTION BUILD
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

//Main method for network calls using axios
export const Network = (method, endpoint, token, data = {}) => {
  return new Promise((resolve, reject) => {
    //cheking network connection
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        //console.warn('MY TOKEN ... '+endpoint+' END TOEKN'+token+" and "+JSON.stringify(data))
        axios({
          method,
          url: `${base_url}${endpoint}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          data: method == 'GET' ? '' : JSON.stringify(data),
        }).then(response => {
          // console.log("RESLUT", response);

          if (response.status === 200) {
            //console.warn('OKAY TOKEN : '+token)
            resolve(response.data);
          } else {
            Hud.hideHud();
            //console.warn('OKAY TOKEN : '+token)
            reject('something went wrong');
          }
        });
      }
    });
  });
};
