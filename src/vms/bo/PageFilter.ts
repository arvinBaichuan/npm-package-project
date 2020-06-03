/**
 * @author arvin 2017-12-15
 */

import { IBO } from "./IBO";

/**
 * 分页过滤参数
 */
class PageFilter implements IBO {
  /**
   * 页码
   */
  pageIndex: number = 1;

  /**
   * 每页数
   */
  pageSize: number = 10;

  /**
   * 总条数
   */
  totalElements: number = 0;

  /**
   * 总页数
   */
  totalPages: number = 0;

  constructor(
    pageIndex: number = 1,
    pageSize: number = 10,
    totalElements: number = 0,
    totalPages: number = 0
  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }
}

export { PageFilter };
