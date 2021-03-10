import openSocket from 'socket.io-client';
import { SOCKET_URL } from 'src/constants/config';
const socket = openSocket(SOCKET_URL, {
    forceNew: true,
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10
});

export { socket as default, socket };
