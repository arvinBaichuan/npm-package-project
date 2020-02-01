/**
 * 状态管理：WebSocket
 * @author arvin 2018-07-26
 */

import { KeyValueDTO } from "@ytd/fe-core";

type IHandlerConfig = KeyValueDTO<number, IHandlerCallback>;

/**
 * 回调函数
 */
interface IHandlerCallback {
  (...args: Array<any>): void; // tslint:disable-line:callable-types no-any
}

/**
 * 回调函数对象
 * 每一个订阅的回调对象是一个数组，其中每个元素是一个回调函数，依次执行
 */
interface IHandlerObj {
  [code: number]: Array<IHandlerCallback>;
}

interface IStoreModuleWebSocketState {
  /** WS实例 */
  socket: WebSocket | null;
  /** 订阅频道列表 */
  subscriptions: Set<string>;
  /** 回调 */
  handler: IHandlerObj;
}

export {
  IStoreModuleWebSocketState,
  IHandlerObj,
  IHandlerCallback,
  IHandlerConfig
};
