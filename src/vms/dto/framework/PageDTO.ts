/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { IDTO } from "../IDTO";

/**
 * 分页
 * @backend hy.framework.dto.PageDto
 */
@implementStatic<IDTO>()
class PageDTO<T> {
  public static readonly className: string = PageDTO.name;

  /** 当前页码 */
  public pageIndex: number = 0;
  /** 每页数据条数 */
  public pageSize: number = 0;
  /** 总的页数 */
  public totalPageCount: number = 0;
  /** 总的数据条数 */
  public totalRowCount: number = 0;
  /** 该页数据列表 */
  public data: Array<T> = [];

  constructor(
    dto: {
      pageIndex?: number | null;
      pageSize?: number | null;
      totalPageCount?: number | null;
      totalRowCount?: number | null;
      data?: Array<T> | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { data, pageIndex, pageSize, totalPageCount, totalRowCount } = dto;

      if (!_.isNil(pageIndex)) {
        this.pageIndex = pageIndex;
      }
      if (!_.isNil(pageSize)) {
        this.pageSize = pageSize;
      }
      if (!_.isNil(totalPageCount)) {
        this.totalPageCount = totalPageCount;
      }
      if (!_.isNil(totalRowCount)) {
        this.totalRowCount = totalRowCount;
      }
      if (!_.isNil(data)) {
        this.data = data;
      }
    }
  }
}

export { PageDTO };
