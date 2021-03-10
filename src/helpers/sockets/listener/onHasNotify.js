import { socket } from '../index';

const onHasNotify = cb => {
    socket.on('onHasNotify', cb);
};

export { onHasNotify };
export default onHasNotify;
