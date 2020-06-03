/**
 * @author arvin 2017-12-08
 */

/**
 * 用来定义实例属性和方法
 */
interface _IDTO {}

/**
 * 用来定义静态属性和方法；
 * 支持泛型
 */
interface IDTO {
  /**
   * DTO 的类名；
   * 在将后端返回的数据转换为前端 DTO 时，需要前端 DTO 在它的构造方法里面正确实现转换逻辑；
   * 同时将该静态属性设置为 DTO 的类名 ，表示已经实现了转换逻辑，否则将报错；
   */
  readonly className: string;

  new (): _IDTO;
}

export { _IDTO, IDTO };
