import * as dgram from 'dgram';
import {
  isStunMessage,
  createStunMessage,
  parseStunMessage,
  Header,
  Body,
  SoftwareAttribute,
  STUN_MESSAGE_TYPE,
} from '../src';

const socket = dgram.createSocket({ type: 'udp4' });

socket.on('message', (msg: Buffer) => {
  if (!isStunMessage(msg)) {
    console.log('not a stun packet', msg.toString('hex'));
    socket.close();
    return;
  }

  const stunMsg = parseStunMessage(msg);

  const { type } = stunMsg.header.toJSON();
  switch (type) {
    case STUN_MESSAGE_TYPE.BINDING_RESPONSE_SUCCESS:
      console.log('BINDING_RESPONSE_SUCCESS');
      console.log(stunMsg.body);
      break;
    case STUN_MESSAGE_TYPE.BINDING_RESPONSE_ERROR:
      console.log('BINDING_RESPONSE_ERROR');
      break;
  }

  socket.close();
});

const header = new Header(STUN_MESSAGE_TYPE.BINDING_REQUEST);
const body = new Body([new SoftwareAttribute('webrtc-stack-study')]);

const packet = createStunMessage({ header, body });
// socket.send(packet, 3478, 'stun.webrtc.ecl.ntt.com');
socket.send(packet, 19302, 'stun.l.google.com');
