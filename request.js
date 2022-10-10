import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';

export default async function request(
  url,
  method = 'GET',
  body = null,
  headers = {},
) {
  if (body) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  CookieManager.clearAll();

  let guestToken = await AsyncStorage.getItem('guestToken');
  let token = await AsyncStorage.getItem('token');
  let authToken = await AsyncStorage.getItem('authToken');

  headers['User-Agent'] =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36';
  headers['Cookie'] = '.Nop.Authentication=' + authToken;
  headers['Cookie'] = headers['Cookie'] + ';' + '.Nop.Customer=' + guestToken;

  // https://dev.seemon.am
  // http://192.168.1.27:5000
  // http://192.168.1.15:59436
  const response = await fetch(`https://dev.seemon.am${url}`, {
    method,
    body,
    headers,
  });

  const data = await response.json();
  const headerData = response.headers;

  return {data, headerData};
}
