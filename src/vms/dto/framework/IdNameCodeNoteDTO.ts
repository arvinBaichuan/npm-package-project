/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IDTO } from "../IDTO";
import { implementStatic } from "../../decorator/index";
import { IdNameCodeDTO } from "./IdNameCodeDTO";

/**
 * @backend hy.framework.dto.IdNameCodeNoteDto
 */
@implementStatic<IDTO>()
class IdNameCodeNoteDTO extends IdNameCodeDTO {
  public static readonly className: string = IdNameCodeNoteDTO.name;

  /** 备注 */
  public note: string = "";

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      code?: string | null;
      note?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { note } = dto;
      if (!_.isNil(note)) {
        this.note = note;
      }
    }
  }
}

export { IdNameCodeNoteDTO };
