import io from 'socket.io-client';
import AUTH_TOKEN from './authToken';

const socket = io({
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': 'Bearer ' + AUTH_TOKEN
      }
    }
  }
})


export default socket