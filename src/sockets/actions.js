import { socket } from './socket';

export const removeOnTalk = cb => {
    socket.removeListener('onTalk', cb);
};

export const connect = cb => {
    if (socket.disconnected) socket.connect(cb);
};

export const disconnect = cb => {
    socket.disconnect(cb);
};
