/*
 * @author arvin 2018-03-14
 */

/**
 * DOM工具
 */
class DOMUtil {
  /**
   * 获取 FullScreenChange 事件名称
   * @returns 事件名称
   */
  public static getFullScreenChangeEventName(): string {
    let fullScreenChangeEventName: string = "fullscreenchange";

    if ("onfullscreenchange" in document) {
      fullScreenChangeEventName = "fullscreenchange";
    } else if ("onmozfullscreenchange" in document) {
      fullScreenChangeEventName = "mozfullscreenchange";
    } else if ("onwebkitfullscreenchange" in document) {
      fullScreenChangeEventName = "webkitfullscreenchange";
    } else if ("onmsfullscreenchange" in document) {
      fullScreenChangeEventName = "MSFullscreenChange";
    }

    return fullScreenChangeEventName;
  }

  /**
   * 使用 {@link Q.drawImage} 渲染 canvas
   *
   * @param drawImageFn Q.drawImage
   * @param key 图片注册名称、图片链接或者图片绘制对象
   * @param element canvas 画布，图片将绘制在此对象上
   * @param width canvas 元素宽度
   * @param height canvas 元素高度
   * @param style 绘制样式参数，包括填充色，阴影效果等
   */
  public static drawCanvas(
    drawImageFn: Function,
    key: string | object,
    element: HTMLCanvasElement,
    width: number,
    height: number,
    style: object = {}
  ) {
    if (!element || width === 0 || height === 0) {
      return;
    }

    element.width = width;
    element.height = height;
    const ctx: CanvasRenderingContext2D | null = element.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      drawImageFn.call(null, key, element, style);
    }
  }

  /**
   * 清除 canvas 画布内容
   * @param element 画布
   * @param width canvas 元素宽度
   * @param height canvas 元素高度
   */
  public static clearCanvas(
    element: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    if (element) {
      element.width = width;
      element.height = height;

      const ctx: CanvasRenderingContext2D | null = element.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    }
  }
}

export { DOMUtil };
