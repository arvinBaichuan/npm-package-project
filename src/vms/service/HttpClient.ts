/**
 * @author arvin 2017-12-08
 */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import _ from "lodash";
import { ErrorData, RestResultDTO } from "../dto";
import { DTOUtil } from "../util";
import { AuthService } from "./AuthService";

/** 错误处理函数 */
type IErrorHandler = (statusCode: number, message: string) => void;

/** 请求配置 */
interface IRequestConfig extends AxiosRequestConfig {
  /** 是否阻止提示错误消息 */
  suppressErrorMessage?: boolean;
}

class HttpClient {
  /** 无需授权的地址白名单 */
  public static authWhitelist: Array<RegExp> = [
    /* 查询未授权的动作权限 */
    /^\/api\/iam\/admin\/[\d]\.[\d]\/actionPopedoms\/findDisableAction/
  ];
  public readonly authService: AuthService;
  /** 是否是生产环境 */
  private readonly isProduction: boolean = true;
  /** 认证&授权服务 */
  /** 错误处理函数 */
  public readonly errorHandler: IErrorHandler = (
    statusCode: number,
    message: string
  ) => {
    console.error(message);
  };

  // tslint:disable-next-line:member-ordering
  constructor(
    isProduction: boolean,
    authService: AuthService,
    errorHandler?: IErrorHandler
  ) {
    this.isProduction = isProduction;
    this.authService = authService;
    if (errorHandler) {
      this.errorHandler = errorHandler;
    }
  }

  /**
   * 转义查询参数
   * @deprecated
   * @param queryString 查询参数
   */
  public encodeQueryString(queryString: string): string {
    console.warn(
      "[DEPRECATED]: HttpClient.encodeQueryString() 已弃用，请使用 HttpClient.encode()"
    );

    return this.encode(queryString);
  }

  /**
   * 转义查询参数
   * @param queryString 查询参数
   */
  public encode(queryString?: string | null): string {
    if (!queryString) {
      return "";
    }

    return encodeURIComponent(
      queryString.replace(/[-[\]{}()*+?.,\\/^$|#]/g, "\\$&")
    );
  }

  /**
   *
   * @param url
   * @param requestConfig
   * @returns
   */
  public async get<T>(
    url: string,
    requestConfig: IRequestConfig = {}
  ): Promise<RestResultDTO<T>> {
    const { suppressErrorMessage, ...config } = requestConfig;

    try {
      const response: AxiosResponse<T> = await axios({
        url: this.getUrlWithTimestamp(url),
        method: "GET",
        headers: {
          Authorization: this.authService.getToken()
        },
        ...config
      });
      return this.handleSuccess<T>(response, suppressErrorMessage);
    } catch (e) {
      this.handleError(e, suppressErrorMessage);
      throw e;
    }
  }

  /**
   *
   * @param url
   * @param obj
   * @param requestConfig
   * @returns
   */
  public async post<T>(
    url: string,
    obj?: object | string,
    requestConfig: IRequestConfig = {}
  ): Promise<RestResultDTO<T>> {
    const { suppressErrorMessage, ...config } = requestConfig;

    let data = {};
    if (typeof obj === "string") {
      try {
        data = JSON.parse(obj);
      } catch (e) {
        throw new Error(`请求参数解析失败\n${obj}\n${url}\n${e}`);
      }
    } else if (typeof obj === "object") {
      data = obj;
    }

    try {
      const response: AxiosResponse<T> = await axios({
        url,
        method: "POST",
        headers: {
          Authorization: this.authService.getToken()
        },
        data,
        ...config
      });
      return this.handleSuccess<T>(response, suppressErrorMessage);
    } catch (e) {
      this.handleError(e, suppressErrorMessage);
      throw e;
    }
  }

  /**
   *
   * @param url
   * @param obj
   * @param requestConfig
   * @returns
   */
  public async patch<T>(
    url: string,
    obj?: object | string,
    requestConfig: IRequestConfig = {}
  ): Promise<RestResultDTO<T>> {
    const { suppressErrorMessage, ...config } = requestConfig;

    try {
      const response: AxiosResponse<T> = await axios({
        url,
        method: "PATCH",
        headers: {
          Authorization: this.authService.getToken()
        },
        data: obj ? (typeof obj === "string" ? JSON.parse(obj) : obj) : {},
        ...config
      });
      return this.handleSuccess<T>(response, suppressErrorMessage);
    } catch (e) {
      this.handleError(e, suppressErrorMessage);
      throw e;
    }
  }

  /**
   *
   * @param url
   * @param requestConfig
   * @returns
   */
  public async del<T>(
    url: string,
    requestConfig: IRequestConfig = {}
  ): Promise<RestResultDTO<T>> {
    const { suppressErrorMessage, ...config } = requestConfig;

    try {
      const response: AxiosResponse<T> = await axios({
        url: this.getUrlWithTimestamp(url),
        method: "DELETE",
        headers: {
          Authorization: this.authService.getToken()
        },
        ...config
      });
      return this.handleSuccess<T>(response, suppressErrorMessage);
    } catch (e) {
      this.handleError(e, suppressErrorMessage);
      throw e;
    }
  }

  /**
   * 构造请求地址，添加时间戳参数，在开发环境禁用缓存
   * @param url 请求地址
   */
  private getUrlWithTimestamp(url: string): string {
    return this.isProduction
      ? url
      : `${url}${url.indexOf("?") > -1 ? "&" : "?"}_=${_.now()}`;
  }

  /**
   *
   * @param response
   * @param suppressErrorMessage 是否阻止提示错误消息
   */
  private handleSuccess<T>(
    response: AxiosResponse,
    suppressErrorMessage: boolean = false
  ): RestResultDTO<T> {
    switch (response.status) {
      case 200: {
        const restResultDTO = DTOUtil.from<RestResultDTO<T>>(
          RestResultDTO,
          response.data
        );
        if (restResultDTO.success) {
          return restResultDTO;
        }

        let message = "请求出错";

        if (restResultDTO.error.errorMsg) {
          message = restResultDTO.error.errorMsg;
        } else if (restResultDTO.error.validErrors.length) {
          message = restResultDTO.error.validErrors[0].message;
        } else if (restResultDTO.error.shortStack) {
          message = `后台报错：${restResultDTO.error.shortStack}`;
        } else if (restResultDTO.error.exStack) {
          message = `后台报错：${restResultDTO.error.exStack}`;
        } else if (restResultDTO.data) {
          /* FIXME 错误消息放到 data 属性返回 */
          const errorData: ErrorData = (restResultDTO.data as unknown) as ErrorData;

          if (errorData.errorMsg) {
            message = errorData.errorMsg;
          } else if (errorData.validErrors.length) {
            message = errorData.validErrors[0].message;
          } else if (errorData.shortStack) {
            message = `后台报错：${errorData.shortStack}`;
          } else if (errorData.exStack) {
            message = `后台报错：${errorData.exStack}`;
          }
        }

        if (["session过期", "请传递session"].includes(message)) {
          this.authService.logout();
        } else {
          if (!suppressErrorMessage) {
            /* 调用默认的错误处理方法 */
            this.errorHandler(
              response.status,
              message.length <= 100 ? message : `${message.substr(0, 100)} …`
            );
          }
        }

        throw new Error(message);
      }
      default:
        break;
    }

    throw new Error("非法的状态码");
  }

  /**
   *
   * @param error
   * @param suppressErrorMessage 阻止提示错误消息
   */
  private handleError(
    error: AxiosError,
    suppressErrorMessage: boolean = false
  ): void {
    let status: number = 0;
    let message: string = "请求出错";

    /* 构造错误消息 */
    if (error.response) {
      status = error.response.status;
      if (error.response.data.name) {
        message = error.response.data.name;
      } else if (error.response.data.detail) {
        message = error.response.data.detail;
      } else {
        if (status === 404) {
          message = error.message;
        } else {
          message = error.response.data;
        }
      }
    } else if (error.request) {
      status = error.request.status;
      message = error.request.responseText;
    } else {
      message = error.message;
    }

    if (
      !!_.find(
        HttpClient.authWhitelist,
        i => !i.test(_.get(error, "config.url"))
      ) &&
      [
        "请传递认证TOKEN，或重新登录。",
        "认证TOKEN已经失效，请重新登录。",
        "构建上下文错误"
      ].includes(message)
    ) {
      this.authService.logout();
      throw new Error(message);
    } else {
      if (!suppressErrorMessage) {
        /* 调用默认的错误处理方法 */
        this.errorHandler(
          status,
          message.length <= 100 ? message : `${message.substr(0, 100)} …`
        );
      }
    }
  }
}

export { IRequestConfig, IErrorHandler, HttpClient };
