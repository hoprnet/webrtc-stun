import { methodAndClassToMessageType } from './utils';

const MESSAGE_METHOD = {
  BINDING: 0b000000000001,
};

const MESSAGE_CLASS = {
  REQUEST: 0b00,
  // INDICATION: 0b01,
  RESPONSE_SUCCESS: 0b10,
  RESPONSE_ERROR: 0b11,
};

export const STUN_MESSAGE_TYPE = {
  BINDING_REQUEST: methodAndClassToMessageType([
    MESSAGE_METHOD.BINDING,
    MESSAGE_CLASS.REQUEST,
  ]),
  // const BINDING_INDICATION: calcMessageType(MESSAGE_METHOD.BINDING, MESSAGE_CLASS.INDICATION),
  BINDING_RESPONSE_SUCCESS: methodAndClassToMessageType([
    MESSAGE_METHOD.BINDING,
    MESSAGE_CLASS.RESPONSE_SUCCESS,
  ]),
  BINDING_RESPONSE_ERROR: methodAndClassToMessageType([
    MESSAGE_METHOD.BINDING,
    MESSAGE_CLASS.RESPONSE_ERROR,
  ]),
};

export const STUN_ATTRIBUTE_TYPE = {
  // RFC 5389 Required types
  MAPPED_ADDRESS: 0x0001,
  USERNAME: 0x0006,
  MESSAGE_INTEGRITY: 0x0008,
  // ERROR_CODE: 0x0009,
  // UNKNOWN_ATTRIBUTES: 0x000a,
  // REALM: 0x0014,
  // NONCE: 0x0015,
  XOR_MAPPED_ADDRESS: 0x0020,

  // RFC 5389 Optional types
  SOFTWARE: 0x8022,
  // ALTERNATE_SERVER: 0x8023,
  FINGERPRINT: 0x8028,
};
