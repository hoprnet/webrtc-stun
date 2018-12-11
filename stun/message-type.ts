import { numberToStringWithRadixAndPadding } from './utils';

const MESSAGE_CLASS = {
  REQUEST: 0b00,
  // INDICATION: 0b01,
  RESPONSE_SUCCESS: 0b10,
  RESPONSE_ERROR: 0b11,
};

const MESSAGE_METHOD = {
  BINDING: 0b000000000001,
};

export const BINDING_REQUEST = calcMessageType(MESSAGE_METHOD.BINDING, MESSAGE_CLASS.REQUEST);
// BINDING_INDICATION: calcMessageType(MESSAGE_METHOD.BINDING, MESSAGE_CLASS.INDICATION);
export const BINDING_RESPONSE_SUCCESS = calcMessageType(MESSAGE_METHOD.BINDING, MESSAGE_CLASS.RESPONSE_SUCCESS);
export const BINDING_RESPONSE_ERROR = calcMessageType(MESSAGE_METHOD.BINDING, MESSAGE_CLASS.RESPONSE_ERROR);

/**
 *  0                 1
 *  2  3  4 5 6 7 8 9 0 1 2 3 4 5
 * +--+--+-+-+-+-+-+-+-+-+-+-+-+-+
 * |M |M |M|M|M|C|M|M|M|C|M|M|M|M|
 * |11|10|9|8|7|1|6|5|4|0|3|2|1|0|
 * +--+--+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * M = Method / C = Class
 *   12bit Method is split into 5, 3, 4bit
 *   2bit Class is split into 1, 1bit
 * and combined together as 14bit string,
 * and append first 2bit as `00`.
 *
 * Thus STUN Message Type becomes 16bit,
 * and finally it is returned as number.
 *
 * BINDING_REQUEST: 0x0001 = 1
 * BINDING_INDICATION: 0x0011 = 17
 * BINDING_RESPONSE_SUCCESS: 0x0101 = 257
 * BINDING_RESPONSE_ERROR: 0x0111 = 273
 */
function calcMessageType(method: number, klass: number): number {
  const methodStr = numberToStringWithRadixAndPadding(method, 2, 12);
  const classStr = numberToStringWithRadixAndPadding(klass, 2, 2);

  const m1 = methodStr.slice(0, 5);
  const m2 = methodStr.slice(5, 8);
  const m3 = methodStr.slice(8, 12)
  const c1 = classStr.slice(0, 1);
  const c2 = classStr.slice(1, 2);

  // 16bit string
  const binStr = `00${m1}${c1}${m2}${c2}${m3}`;
  return parseInt(binStr, 2);
}
