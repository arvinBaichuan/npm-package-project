/**
 * @author arvin 2017-12-08
 */

/**
 * 实现接口的静态方法
 * @returns {(ctor: T) => any}
 */
function implementStatic<T>() {
  return (ctor: T) => {};
}

export { implementStatic };
