import { socket } from 'src/sockets/socket';

export const subscribeOnTalk = cb => {
    socket.on('onTalk', cb);
};
