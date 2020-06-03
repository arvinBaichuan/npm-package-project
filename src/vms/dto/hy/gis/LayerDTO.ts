/**
 * @author arvin 2018-06-13
 */

import _ from "lodash";
import { IdNameDTO } from "../../index";
import { implementStatic } from "../../../decorator/index";
import { IDTO } from "../../IDTO";

/**
 * @backend hy.pdnms.gis.dto.Layer
 */
@implementStatic<IDTO>()
class LayerDTO extends IdNameDTO {
  public static readonly className: string = LayerDTO.name;

  /**
   * 使用一直显示
   */
  allZoom: boolean = false;

  /**
   * 最小比例
   */
  minZoom: number = 0;

  /**
   * 最大比例
   */
  maxZoom: number = 0;

  /**
   * 是否是背景图层
   */
  background: boolean = false;

  /**
   * 图层类型；
   *     1. 点
   *     2. 线
   *     3. 面
   * background = false 时生效；
   */
  geomType: number = 1;

  /**
   * 显示叠加顺序；
   * 值越大显示在越上层；
   */
  sequence: number = 0;

  /**
   * 标签
   */
  tag: string = "";

  /**
   * 背景图层填写地址（url），业务图层填写表名；
   */
  key: string = "";

  /**
   * 一级分组
   */
  group1: string = "";

  /**
   * 二级分组
   */
  group2: string = "";

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      allZoom?: boolean | null;
      minZoom?: number | null;
      maxZoom?: number | null;
      background?: boolean | null;
      geomType?: number | null;
      sequence?: number | null;
      tag?: string | null;
      key?: string | null;
      group1?: string | null;
      group2?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const {
        key,
        allZoom,
        background,
        geomType,
        group1,
        group2,
        maxZoom,
        minZoom,
        sequence,
        tag
      } = dto;

      if (!_.isNil(key)) {
        this.key = key;
      }
      if (!_.isNil(allZoom)) {
        this.allZoom = allZoom;
      }
      if (!_.isNil(background)) {
        this.background = background;
      }
      if (!_.isNil(geomType)) {
        this.geomType = geomType;
      }
      if (!_.isNil(group1)) {
        this.group1 = group1;
      }
      if (!_.isNil(group2)) {
        this.group2 = group2;
      }
      if (!_.isNil(maxZoom)) {
        this.maxZoom = maxZoom;
      }
      if (!_.isNil(minZoom)) {
        this.minZoom = minZoom;
      }
      if (!_.isNil(sequence)) {
        this.sequence = sequence;
      }
      if (!_.isNil(tag)) {
        this.tag = tag;
      }
    }
  }
}

export { LayerDTO };
