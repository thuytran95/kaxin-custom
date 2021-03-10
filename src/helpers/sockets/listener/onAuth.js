import { socket } from '../index';

const onAuth = cb => {
    socket.on('authentication', cb);
};

export { onAuth };
export default onAuth;
