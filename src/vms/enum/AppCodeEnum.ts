/**
 * @author arvin 2017-12-08
 */

/**
 * 应用编码
 * @deprecated 根据接口自动获取应用编码，不再写死
 */
enum AppCodeEnum {
  /** IAM */
  ADMIN = "admin",
  /** 东莞配网 */
  PDNMS = "pdnms",
  /** 配网综合网管系统（Ⅰ区） */
  PDNMS_1 = "pdnms-1",
  /** 东莞配网：改造 */
  PDNMS_2 = "pdnms2",
  /** 配网：海南 */
  PDNMS_HN = "hn-pdnms",
  /** 工程 */
  PDNMS_PROJECT = "project",
  /** 无线公网 */
  GPRS = "gprs",
  /** 无线公网：海南 */
  GPRS_HN = "gprs-hn",
  /** 贵州风险 */
  RISK_GZ = "risk-gz",
  /** 广东风险 */
  RISK_GD = "risk-gd",
  /** 汕头数据 */
  ST_DATA = "data-net",
  /** 数据融合管理 */
  DP_ADMIN = "dpAdmin",
  /** 流量探针装置管理系统 */
  PACK_DUMP = "pack-dump",
  /** 电网通信指标统计系统 */
  PCRMS_INDEX = "pcrms-index",
  /** 保底通信 */
  RISK_GUARANTEE = "risk-guarantee",
  /** 智能管控 */
  PCRMS_IC = "pcrms-ic"
}

export { AppCodeEnum };
