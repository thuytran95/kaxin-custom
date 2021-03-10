import { socket } from './socket';

export const talkTo = (data, cb) => {
    socket.emit('talk', data, cb);
};

export const onLogin = (accessToken, cb) => {
    socket.emit('login', { accessToken }, cb);
};

export const authentication = (accessToken, cb) => {
    socket.emit('authenticate', { accessToken }, cb);
};

export const logout = (accessToken, cb) => {
    socket.emit('logout', { accessToken }, cb);
};
