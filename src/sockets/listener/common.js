import { socket } from 'src/sockets/socket';

// Default listen

export const onConnect = cb => {
    socket.on('connect', cb);
};

export const onConnectError = cb => {
    socket.on('connect_error', cb);
};

export const onConnectTimeout = cb => {
    socket.on('connect_timeout', cb);
};

export const onError = cb => {
    socket.on('error', cb);
};

export const onDisconnect = cb => {
    socket.on('disconnect', cb);
};

export const onReconnect = cb => {
    socket.on('reconnect', cb);
};

export const onReconnectAttempt = cb => {
    socket.on('reconnect_attempt', cb);
};

export const onReconnecting = cb => {
    socket.on('reconnecting', cb);
};
export const onReconnectError = cb => {
    socket.on('reconnect_error', cb);
};

export const onReconnectFail = cb => {
    socket.on('reconnect_failed', cb);
};

export const onPing = cb => {
    socket.on('ping', cb);
};

export const onPong = cb => {
    socket.on('pong', cb);
};
