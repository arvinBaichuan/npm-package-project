/**
 * 杆塔
 * @backend hy.fiber.tool.model;
 * @author lbc 2019-12-12
 */

import _ from "lodash";
import { DTO } from "./DTO";

class FiberToolPoleDTO extends DTO {
  public id: string = "";
  public name: string = "";
  public geom: string = "";
  public line: string = "";
  public index: string = "";
  public resNodeId: string = "";
  public resNodeName: string = "";
  public resNodeType: string = "";

  /**
   *
   * @param fiberToolPoleBDTO
   * @return {FiberToolPoleDTO}
   */
  static from(fiberToolPoleBDTO: any) {
    const fiberToolPoleDTO: FiberToolPoleDTO = new FiberToolPoleDTO();

    if (fiberToolPoleBDTO) {
      fiberToolPoleDTO.id = fiberToolPoleBDTO.id;
      fiberToolPoleDTO.name = fiberToolPoleBDTO.name;
      fiberToolPoleDTO.geom = fiberToolPoleBDTO.geom;
      fiberToolPoleDTO.line = fiberToolPoleBDTO.line;
      fiberToolPoleDTO.index = fiberToolPoleBDTO.index;
      fiberToolPoleDTO.resNodeId = fiberToolPoleBDTO.resNodeId;
      fiberToolPoleDTO.resNodeName = fiberToolPoleBDTO.resNodeName;
      fiberToolPoleDTO.resNodeType = fiberToolPoleBDTO.resNodeType;
    }

    return fiberToolPoleDTO;
  }

  /**
   *
   * @param fiberToolPoleBDTOs
   * @return {Array<FiberToolPoleDTO>}
   */
  static fromArray(fiberToolPoleBDTOs: any[]) {
    const fiberToolPoleDTOs: Array<FiberToolPoleDTO> = [];
    _.forEach(fiberToolPoleBDTOs, fiberToolPoleBDTO => {
      if (fiberToolPoleBDTO) {
        fiberToolPoleDTOs.push(FiberToolPoleDTO.from(fiberToolPoleBDTO));
      }
    });
    return fiberToolPoleDTOs;
  }
}

export { FiberToolPoleDTO };
