/**
 * 状态管理：WebSocket
 * @author arvin 2018-07-26
 */

import _ from "lodash";
import { AuthService, DTOUtil, PubSubDTO, PubsubService } from "@ytd/fe-core";
import {
  IHandlerConfig,
  IStoreModuleWebSocketState
} from "./StoreModuleWebSocketState";
import { ActionContext, Module } from "vuex";

class StoreModuleWebSocket {
  private authService: AuthService;
  private pubsubService: PubsubService;
  /** 是否是生产环境 */
  private readonly isProduction: boolean = false;
  /** 连接URL */
  private websocketConnectBaseUrl: string = "";
  /** 心跳计时器 */
  private heartbeatInterval: number | null = null;
  /** 断线重连计时器 */
  private reconnectTimer: number | null = null;
  /** 断线重连锁，避免重复连接 */
  private reconnectLock: boolean = false;

  constructor(
    authService: AuthService,
    pubsubService: PubsubService,
    isProduction: boolean = false,
    websocketConnectBaseUrl: string = ""
  ) {
    this.authService = authService;
    this.pubsubService = pubsubService;
    this.isProduction = isProduction;
    this.websocketConnectBaseUrl = websocketConnectBaseUrl;
  }

  /**
   * 获取模块实例
   */
  public getModule(): Module<IStoreModuleWebSocketState, {}> {
    return {
      state: {
        socket: null,
        subscriptions: new Set(),
        handler: {}
      },
      mutations: {
        _WS_OPEN: (state: IStoreModuleWebSocketState) => {
          if (!state.socket) {
            this.connect(state);
          }
        },
        _WS_CLOSE: (state: IStoreModuleWebSocketState) => {
          if (state.socket) {
            state.socket.close(1000, "离开页面");
            state.socket = null;
          }
        },
        _WS_SUB_ADD: (
          state: IStoreModuleWebSocketState,
          subscription: string
        ) => {
          state.subscriptions.add(subscription);
        },
        _WS_SUB_REMOVE: (
          state: IStoreModuleWebSocketState,
          subscription: string
        ) => {
          state.subscriptions.delete(subscription);
        },
        _WS_HANDLER_ADD: (
          state: IStoreModuleWebSocketState,
          config: IHandlerConfig
        ) => {
          if (!state.handler[config.k]) {
            state.handler[config.k] = [];
          }

          if (!state.handler[config.k].includes(config.v)) {
            state.handler[config.k].push(config.v);
          }
        },
        _WS_HANDLER_REMOVE: (
          state: IStoreModuleWebSocketState,
          config: IHandlerConfig
        ) => {
          if (!state.handler[config.k]) {
            return;
          }

          state.handler[config.k] = _.without(
            state.handler[config.k],
            config.v
          );
        }
      },
      actions: {
        /**
         * 打开连接
         * @param commit
         */
        WS_OPEN: ({
          commit
        }: ActionContext<IStoreModuleWebSocketState, {}>) => {
          commit("_WS_OPEN");
        },
        /**
         * 关闭连接
         * @param commit
         */
        WS_CLOSE: ({
          commit
        }: ActionContext<IStoreModuleWebSocketState, {}>) => {
          commit("_WS_CLOSE");
        },
        /**
         * 添加订阅
         * @param state
         * @param commit
         * @param subscription 订阅ID
         */
        WS_SUB_ADD: (
          { state, commit }: ActionContext<IStoreModuleWebSocketState, {}>,
          subscription: string
        ) => {
          if (!state.subscriptions.has(subscription)) {
            this.pubsubService.subscribe(subscription);
            commit("_WS_SUB_ADD", subscription);
          }
        },
        /**
         * 移除订阅
         * @param state
         * @param commit
         * @param subscription 订阅ID
         */
        WS_SUB_REMOVE: (
          { state, commit }: ActionContext<IStoreModuleWebSocketState, {}>,
          subscription: string
        ) => {
          if (state.subscriptions.has(subscription)) {
            this.pubsubService.unsubscribe(subscription);
            commit("_WS_SUB_REMOVE", subscription);
          }
        },
        /**
         * 添加处理函数
         * @deprecated
         * @param commit
         * @param config
         */
        WS_HANDLER_REGISTER: (
          { commit }: ActionContext<IStoreModuleWebSocketState, {}>,
          config: IHandlerConfig
        ) => {
          console.warn(
            "[DEPRECATED]: WS_HANDLER_REGISTER() 已弃用，请使用 WS_HANDLER_ADD()"
          );

          commit("_WS_HANDLER_ADD", config);
        },
        /**
         * 添加处理函数
         * @param commit
         * @param config
         */
        WS_HANDLER_ADD: (
          { commit }: ActionContext<IStoreModuleWebSocketState, {}>,
          config: IHandlerConfig
        ) => {
          commit("_WS_HANDLER_ADD", config);
        },
        /**
         * 移除处理函数
         * @param commit
         * @param config
         */
        WS_HANDLER_REMOVE: (
          { commit }: ActionContext<IStoreModuleWebSocketState, {}>,
          config: IHandlerConfig
        ) => {
          commit("_WS_HANDLER_REMOVE", config);
        }
      }
    };
  }

  /**
   * 连接
   */
  private connect(state: IStoreModuleWebSocketState) {
    const token: string = this.authService.getToken();
    if (!token) {
      throw new Error("无法创建WS连接：token 为空");
    }

    try {
      const websocketConnectBaseUrl =
        this.websocketConnectBaseUrl ||
        `ws://${
          this.isProduction
            ? window.location.host
            : `${window.location.hostname}:42747`
        }/api/pubsub/1.0/connect`;
      state.socket = new WebSocket(`${websocketConnectBaseUrl}/${token}`);
      this.initSocket(state);
    } catch (e) {
      this.reconnect(state);
    }
  }

  /**
   * 重连
   */
  private reconnect(state: IStoreModuleWebSocketState) {
    if (this.reconnectLock) {
      return;
    }

    this.reconnectLock = true;
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
    }
    this.reconnectTimer = window.setTimeout(() => {
      this.connect(state);
      this.reconnectLock = false;
    }, 5000);
  }

  /**
   * 设置 socket 事件
   * @param state
   */
  private initSocket(state: IStoreModuleWebSocketState) {
    if (!state.socket) {
      return;
    }

    /**
     *
     * @param e
     */
    state.socket.onopen = (e: Event) => {
      // tslint:disable-next-line:no-console
      console.log(`[${this.authService.appCode.toUpperCase()}] WS连接成功`);

      /*
       * 每隔一段时间，发送一个心跳数据
       */
      if (this.heartbeatInterval) {
        window.clearInterval(this.heartbeatInterval);
      }
      this.heartbeatInterval = window.setInterval(() => {
        if (state.socket) {
          state.socket.send(JSON.stringify({ directive: "ping" }));
        }
      }, 1000 * 30);
    };

    /**
     *
     * @param e
     */
    state.socket.onclose = (e: CloseEvent) => {
      console.error(`[${this.authService.appCode.toUpperCase()}] WS连接断开`);

      if (this.heartbeatInterval) {
        window.clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
      state.socket = null;

      /* 取消所有订阅 */
      state.subscriptions.forEach((id: string) => {
        this.pubsubService.unsubscribe(id);
      });

      this.reconnect(state);
    };

    /**
     *
     * @param e
     */
    state.socket.onerror = (e: Event) => {
      console.error(
        `[${this.authService.appCode.toUpperCase()}] WS连接出错`,
        e
      );

      if (this.heartbeatInterval) {
        window.clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
      state.socket = null;

      this.reconnect(state);
    };

    /**
     *
     * @param e
     */
    state.socket.onmessage = (e: MessageEvent) => {
      if (e.data) {
        const pubSubDTO = DTOUtil.from(PubSubDTO, JSON.parse(e.data));
        _.forEach(state.handler[pubSubDTO.type], fn => {
          if (_.isFunction(fn)) {
            fn(pubSubDTO.data);
          }
        });
      }
    };
  }
}

export { StoreModuleWebSocket };
