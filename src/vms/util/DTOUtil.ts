/*
 * @author arvin 2017-12-08
 */
import _ from "lodash";

/**
 * DTO 工具
 */
class DTOUtil {
  /**
   * 将后端返回的数据转换为前端 DTO
   * @param Ctor 要转换为的前端 DTO 类
   * @param obj 后端返回的数据对象
   * @returns 转换后的前端 DTO 对象
   */
  public static from<T>(
    Ctor: { new (...args: Array<any>): T },
    obj?: any | null
  ): T {
    if ((Ctor as any).className !== Ctor.name) {
      throw new Error(`${Ctor.name} 未在构造方法内实现转换逻辑`);
    }

    return new Ctor(obj);
  }

  /**
   * 将后端返回的数据转换为前端 DTO 数组
   * @param Ctor 要转换为的前端 DTO 类
   * @param objs 后端返回的数据对象数组
   * @returns 转换后的前端 DTO 对象数组
   */
  public static fromArray<T>(
    Ctor: { new (...args: Array<any>): T },
    objs?: Array<any> | null
  ): Array<T> {
    if ((Ctor as any).className !== Ctor.name) {
      throw new Error(`${Ctor.name} 未在构造方法内实现转换逻辑`);
    }

    return _.map(objs, item => DTOUtil.from<T>(Ctor, item));
  }
}

export { DTOUtil };
