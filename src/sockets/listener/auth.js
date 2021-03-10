import { socket } from 'src/sockets/socket';

export const subscribeOnLogin = cb => {
    socket.on('login', data => cb(null, data));
};

export const onAthentication = cb => {
    socket.on('authentication', cb);
};
