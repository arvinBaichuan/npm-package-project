/**
 * @author arvin 2017-12-11
 */

import _ from "lodash";
import { implementStatic } from "../../../decorator/index";
import { DTOUtil } from "../../../util/index";
import { IDTO } from "../../IDTO";
import { AppAccountDTO } from "./AppAccountDTO";

/**
 * 应用启动
 * @backend hy.iam.admin.dto.StartupDto
 */
@implementStatic<IDTO>()
class StartupDTO {
  public static readonly className: string = StartupDTO.name;

  session: string = "";

  appAccount: AppAccountDTO = new AppAccountDTO();

  constructor(
    dto: {
      session?: string | null;
      appAccount?: AppAccountDTO | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { appAccount, session } = dto;

      if (!_.isNil(appAccount)) {
        this.appAccount = DTOUtil.from(AppAccountDTO, appAccount);
      }
      if (!_.isNil(session)) {
        this.session = session;
      }
    }
  }
}

export { StartupDTO };
