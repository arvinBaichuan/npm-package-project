/*
 * @author arvin 2018-03-14
 */

import invert from "invert-color";
import _ from "lodash";
import axios from "axios";

/**
 * 工具
 */
class Util {
  /**
   * 反转颜色
   * @param color
   */
  public static invertColor(color: string): string {
    return invert(color || "#000000", true);
  }

  /**
   * 将 Base64 字符串转换为文件对象
   * @param base64Str Base64字符串
   * @param fileName 文件名
   * @param sliceSize 分割尺寸
   * @returns
   */
  public static base64ToFile(
    base64Str: string,
    fileName: string,
    sliceSize: number = 512
  ) {
    const blocks = base64Str.split(";");

    if (blocks.length !== 2) {
      throw new Error("非法的 Base64 字符串");
    }

    const contentType = blocks[0].split(":")[1];
    const data = blocks[1].split(",")[1];

    const byteCharacters: string = atob(data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice: string = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers: Array<number> = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray: Uint8Array = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new File(byteArrays, fileName, { type: contentType });
  }

  /**
   * 加载文件
   * @param fileId 文件ID
   */
  public static async getFile(fileId: string): Promise<string> {
    try {
      const { data } = await axios({
        method: "get",
        url: `/docs/${fileId}`,
        timeout: 60000
      });
      return data;
    } catch (e) {
      throw new Error(`文件加载失败 ${fileId}`);
    }
  }

  /**
   * 加载CANVAS图标文件；
   * @param Q
   * @param fileId 文件ID
   * @returns
   */
  public static async getQuneeCanvasIcon(
    Q: any,
    fileId: string
  ): Promise<Util.IQuneeIcon> {
    if (_.isEmpty(_.trim(fileId))) {
      throw new Error("图标文件ID为空");
    }

    try {
      const { data: scriptStr } = await axios({
        method: "get",
        url: `/docs/${fileId}`,
        timeout: 60000
      });

      /*
       * 解析绘制方法
       */
      const drawMatch = scriptStr.match(/(?=\(ctx\){)(.*?)(?=},"?width)/g);

      /*
       * 解析宽度
       */
      let widthMatch = scriptStr.match(/(?=,width:')(.*?)(?=',height)/g);
      if (!widthMatch) {
        widthMatch = scriptStr.match(/(?=width":")(.*?)(?=","height)/g);
      }

      /*
       * 解析高度
       */
      let heightMatch = scriptStr.match(/(?=,height:')(.*?)(?='[}|,])/g);
      if (!heightMatch) {
        heightMatch = scriptStr.match(/(?=height":")(.*?)(?="[}|,])/g);
      }

      if (
        drawMatch.length !== 1 ||
        widthMatch.length !== 1 ||
        heightMatch.length !== 1
      ) {
        throw new Error("解析失败");
      }

      const iconObj: Util.IQuneeIcon = {
        id: fileId,
        draw: new Function("ctx", drawMatch[0].substr(6)), // tslint:disable-line:function-constructor
        width: Number(widthMatch[0].substr(8)),
        height: Number(heightMatch[0].substr(9))
      };

      if (Number.isNaN(iconObj.width) || Number.isNaN(iconObj.height)) {
        throw new Error("解析失败");
      }

      if (!Q.hasImage(fileId)) {
        Q.registerImage(fileId, iconObj);
      }

      return iconObj;
    } catch (e) {
      throw new Error(`图标文件加载失败 ${fileId}\n${e.message}`);
    }
  }

  public static async appGetQuneeCanvasIcon(
    Q: any,
    fileId: string,
    root: string
  ): Promise<Util.IQuneeIcon> {
    if (_.isEmpty(_.trim(fileId))) {
      throw new Error("图标文件ID为空");
    }

    try {
      const { data: scriptStr } = await axios({
        method: "get",
        url: `/${root}/docs/${fileId}`,
        timeout: 60000
      });

      /*
       * 解析绘制方法
       */
      const drawMatch = scriptStr.match(/(?=\(ctx\){)(.*?)(?=},"?width)/g);

      /*
       * 解析宽度
       */
      let widthMatch = scriptStr.match(/(?=,width:')(.*?)(?=',height)/g);
      if (!widthMatch) {
        widthMatch = scriptStr.match(/(?=width":")(.*?)(?=","height)/g);
      }

      /*
       * 解析高度
       */
      let heightMatch = scriptStr.match(/(?=,height:')(.*?)(?='[}|,])/g);
      if (!heightMatch) {
        heightMatch = scriptStr.match(/(?=height":")(.*?)(?="[}|,])/g);
      }

      if (
        drawMatch.length !== 1 ||
        widthMatch.length !== 1 ||
        heightMatch.length !== 1
      ) {
        throw new Error("解析失败");
      }

      const iconObj: Util.IQuneeIcon = {
        id: fileId,
        draw: new Function("ctx", drawMatch[0].substr(6)), // tslint:disable-line:function-constructor
        width: Number(widthMatch[0].substr(8)),
        height: Number(heightMatch[0].substr(9))
      };

      if (Number.isNaN(iconObj.width) || Number.isNaN(iconObj.height)) {
        throw new Error("解析失败");
      }

      if (!Q.hasImage(fileId)) {
        Q.registerImage(fileId, iconObj);
      }

      return iconObj;
    } catch (e) {
      throw new Error(`图标文件加载失败 ${fileId}\n${e.message}`);
    }
  }

  /**
   * 打开文件保存弹窗
   * @param fileId 文件ID
   */
  public static openSaveFileDialog(fileId: string): void {
    const a = window.document.createElement("a");
    a.href = `${window.location.origin}/docs/${fileId}`;
    a.download = "";
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
  }
}

namespace Util {
  /**
   * 酷利图标对象
   */
  export interface IQuneeIcon {
    /** 图标文件ID */
    id: string;
    draw: Function; // tslint:disable-line:ban-types
    width: number;
    height: number;
  }
}

export { Util };
