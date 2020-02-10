'use strict';











/**
 * Event object passed to the `onopen`, `onclose`, `onmessage`, `onerror`
 * callbacks of `WebSocket`.
 *
 * The `type` property is "open", "close", "message", "error" respectively.
 *
 * In case of "message", the `data` property contains the incoming data.
 */
class WebSocketEvent {

  constructor(type, eventInitDict) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}

export default WebSocketEvent;;
