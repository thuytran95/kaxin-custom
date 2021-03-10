import io from 'socket.io-client';
import { SOCKETS_URL } from 'src/constants/config';
import * as Cookie from 'src/helpers/Cookie';

const socket = Cookie.getToken() ? io(`${SOCKETS_URL}?accessToken=${Cookie.getToken()}`) : io(`${SOCKETS_URL}`);

socket.on('connect', function() {
    //console.log('Client has connected to the server!');
});
// socket.on('authentication', function(data) {
//     console.log('authentication', data);
// });
// socket.on('onHasNotify', function(data) {
//     console.log('onHasNotify', data);
// });

export { socket as default, socket };
