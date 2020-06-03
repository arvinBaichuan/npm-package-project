/**
 * @author arvin 2017-10-19
 */

import _ from "lodash";
import { NamedRO } from "./NamedRO";
import { RO } from "./RO";

/**
 * @backend hy.fiber.tool.model.FiberBindParam
 */
class FiberBindRO extends RO {
  public lineId: string; //输电线路ID
  public lineName: string; //输电线路名称
  public flagAz: string; //AZ段标识   a端："A";z端："Z"
  public resType: string; //资源类型， 1:站点 2：机房 3：接头
  public resId: string; //资源ID
  public resName: string; //资源名称
  public poleId: string; //杆塔ID
  public fiberSegmentId: string; //光缆段ID
  public fiberSegmentName: string; //光缆段名称
  public geomJson: string;
  public fiberAZFlag: string; //判断结果资源是结果光缆段的起端还是止端
  //用于两端匹配
  public fiberSegmentId2: string; //光缆段ID
  public fiberSegmentName2: string; //光缆段名称
  public geomJson2: string;
  public fiberAZFlag2: string; //判断结果资源是结果光缆段的起端还是止端

  public poleName: string; //杆塔名称
  //中间杆塔关联，选取预定光缆起止端
  public aSite: NamedRO; //起端信息
  public zSite: NamedRO; //止端信息
  //输电线某端绑定
  public site: NamedRO; //某端信息

  public index: string; //杆塔序号
  public resNodeId: string; //杆塔绑定资源id
  public latlngArr: Array<any> = []; //杆塔绑定资源id

  /**
   *
   * @param fiberBindBDTO
   * @return {FiberBindRO}
   */
  static from(fiberBindBDTO: any) {
    const fiberBind: FiberBindRO = new FiberBindRO();

    if (fiberBindBDTO) {
      fiberBind.lineId = fiberBindBDTO.lineId;
      fiberBind.lineName = fiberBindBDTO.lineName;
      fiberBind.flagAz = fiberBindBDTO.flagAz;
      fiberBind.resType = fiberBindBDTO.resType;
      fiberBind.resId = fiberBindBDTO.resId;
      fiberBind.resName = fiberBindBDTO.resName;
      fiberBind.poleId = fiberBindBDTO.poleId;
      fiberBind.fiberSegmentId = fiberBindBDTO.fiberSegmentId;
      fiberBind.fiberSegmentName = fiberBindBDTO.fiberSegmentName;
      fiberBind.geomJson = fiberBindBDTO.geomJson;
      fiberBind.fiberAZFlag = fiberBindBDTO.fiberAZFlag;
      fiberBind.fiberSegmentId2 = fiberBindBDTO.fiberSegmentId2;
      fiberBind.fiberSegmentName2 = fiberBindBDTO.fiberSegmentName2;
      fiberBind.geomJson2 = fiberBindBDTO.geomJson2;
      fiberBind.fiberAZFlag2 = fiberBindBDTO.fiberAZFlag2;
      fiberBind.index = fiberBindBDTO.index;
      fiberBind.resNodeId = fiberBindBDTO.resNodeId;
    }

    return fiberBind;
  }

  /**
   *
   * @param fiberBindBDTOs
   * @returns {FiberCore[]}
   */
  static fromArray(fiberBindBDTOs: any[]) {
    const fiberBindRos: FiberBindRO[] = [];
    _.forEach(fiberBindBDTOs, fiberBindBDTO => {
      if (fiberBindBDTO) {
        fiberBindRos.push(FiberBindRO.from(fiberBindBDTO));
      }
    });
    return fiberBindRos;
  }
}

export { FiberBindRO };
