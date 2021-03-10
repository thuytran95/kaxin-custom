import { socket } from 'src/sockets/socket';

export const onNotibuyerregistration = cb => {
    socket.on('notibuyerregistration', cb);
};
