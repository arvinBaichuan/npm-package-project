/**
 * 输电线对端查询结果
 * @backend hy.fiber.tool.model;
 * @author lbc 2019-12-17
 */

import _ from "lodash";
import { DTO } from "./DTO";
import { FiberToolStationDTO } from "./FiberToolStationDTO";

class FiberStationMinDTO extends DTO {
  public fiberSegmentId: string = "";
  public fiberSegmentName: string = "";
  public fiberAZFlag: string = "";
  public station: FiberToolStationDTO = new FiberToolStationDTO();

  /**
   *
   * @param fiberStationMinBDTO
   * @return {FiberStationMinDTO}
   */
  static from(fiberStationMinBDTO: any) {
    const fiberStationMinDTO: FiberStationMinDTO = new FiberStationMinDTO();

    if (fiberStationMinBDTO) {
      fiberStationMinDTO.fiberSegmentId = fiberStationMinBDTO.fiberSegmentId;
      fiberStationMinDTO.fiberSegmentName =
        fiberStationMinBDTO.fiberSegmentName;
      fiberStationMinDTO.fiberAZFlag = fiberStationMinBDTO.fiberAZFlag;
      fiberStationMinDTO.station = FiberToolStationDTO.from(
        fiberStationMinBDTO.station
      );
    }

    return fiberStationMinDTO;
  }

  /**
   *
   * @param fiberStationMinBDTOs
   * @return {Array<FiberStationMinDTO>}
   */
  static fromArray(fiberStationMinBDTOs: any[]) {
    const fiberStationMinDTOs: Array<FiberStationMinDTO> = [];
    _.forEach(fiberStationMinBDTOs, fiberStationMinBDTO => {
      if (fiberStationMinBDTO) {
        fiberStationMinDTOs.push(FiberStationMinDTO.from(fiberStationMinBDTO));
      }
    });
    return fiberStationMinDTOs;
  }
}

export { FiberStationMinDTO };
