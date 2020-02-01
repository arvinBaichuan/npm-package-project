/**
 * 输电线末端站点、电房
 * @backend ytd.fiber.tool.model;
 * @author lbc 2019-12-10
 */

import _ from "lodash";
import { DTO } from "./DTO";

class FiberToolStationDTO extends DTO {
  public id: string = "";
  public name: string = "";
  public code: string = "";
  public geom: string = "";
  public longtitude: string = "";
  public latitude: string = "";
  public areaId: string = "";
  public type: string = "";
  public vol: string = "";
  public property: string = "";
  public status: string = "";

  /**
   *
   * @param fiberToolStationBDTO
   * @return {FiberToolStationDTO}
   */
  static from(fiberToolStationBDTO: any) {
    const fiberToolStationDTO: FiberToolStationDTO = new FiberToolStationDTO();

    if (fiberToolStationBDTO) {
      fiberToolStationDTO.id = fiberToolStationBDTO.id;
      fiberToolStationDTO.name = fiberToolStationBDTO.name;
      fiberToolStationDTO.code = fiberToolStationBDTO.code;
      fiberToolStationDTO.geom = fiberToolStationBDTO.geom;
      fiberToolStationDTO.longtitude = fiberToolStationBDTO.longtitude;
      fiberToolStationDTO.latitude = fiberToolStationBDTO.latitude;
      fiberToolStationDTO.areaId = fiberToolStationBDTO.areaId;
      fiberToolStationDTO.type = fiberToolStationBDTO.type;
      fiberToolStationDTO.vol = fiberToolStationBDTO.vol;
      fiberToolStationDTO.property = fiberToolStationBDTO.property;
      fiberToolStationDTO.status = fiberToolStationBDTO.status;
    }

    return fiberToolStationDTO;
  }

  /**
   *
   * @param fiberToolStationBDTOs
   * @return {Array<FiberToolStationDTO>}
   */
  static fromArray(fiberToolStationBDTOs: any[]) {
    const fiberToolStationDTOs: Array<FiberToolStationDTO> = [];
    _.forEach(fiberToolStationBDTOs, fiberToolStationBDTO => {
      if (fiberToolStationBDTO) {
        fiberToolStationDTOs.push(
          FiberToolStationDTO.from(fiberToolStationBDTO)
        );
      }
    });
    return fiberToolStationDTOs;
  }
}

export { FiberToolStationDTO };
