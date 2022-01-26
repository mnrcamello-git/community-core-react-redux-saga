import io from 'socket.io-client';
import env from '../../config/env';

export const socket = io(env.SOCKET_TRANSFER_SERVER(), {
  transports: ['websocket'],
});
