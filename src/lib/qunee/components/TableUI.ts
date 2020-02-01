/**
 * 表格
 */

import _ from "lodash";
import { Q } from "../Q";

const TableUI = function(this: any, ...args: Array<string>) {
  Q.doSuperConstructor(this, TableUI, args);
};

TableUI.prototype = {
  cellWidth: 120,
  cellHeight: 30,
  measure: function() {
    if (!this.data) {
      this.setMeasuredBounds(0, 0);
      return;
    }
    let width = 0;
    let height = 0;

    if (this.data.header) {
      height += this.cellHeight;
      width = this.data.header.length * this.cellWidth;
    }
    if (this.data.data && this.data.data.length) {
      const rows = this.data.data.length;
      height += rows * this.cellHeight;
      const bodyWidth = this.data.data[0].length * this.cellWidth;
      if (width < bodyWidth) {
        width = bodyWidth;
      }
    }
    this.setMeasuredBounds(width, height);
  },
  /**
   *
   * @param ctx
   * @param x
   * @param y
   * @param background
   * @param align
   * @param color
   * @param content
   */
  drawCell: function(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    background: string,
    align: CanvasTextAlign,
    color: string,
    content: any
  ) {
    let text;
    let span;
    let font = "500 12px sans-serif";
    if (content instanceof Object && !_.isString(content)) {
      text = "" + content.text;
      color = content.color || color;
      align = content.align || align;
      span = content.span || 1;
      font = content.font || "500 12px sans-serif";
    } else {
      text = "" + content;
      span = content.span || 1;
    }

    const cellWidth = this.cellWidth * span;
    const cellHeight = this.cellHeight;

    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(x, y, cellWidth, cellHeight);
      ctx.strokeStyle = "#333333";
      ctx.strokeRect(x, y, cellWidth, cellHeight);
    }

    if (align) {
      if (align === "center") {
        x += cellWidth / 2;
      } else if (align === "right") {
        x += cellWidth;
      }
      ctx.textAlign = align;
    }

    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y + cellHeight / 2);
  },
  draw: function(ctx: CanvasRenderingContext2D) {
    const vm = this;

    if (!vm.data) {
      return;
    }

    ctx.fillStyle = "#EEE";
    ctx.fillRect(0, 0, vm.originalBounds.width, vm.originalBounds.height);

    const header = vm.data.header;
    const data = vm.data.data;

    let x = 0;
    let y = 0;
    const cellWidth = vm.cellWidth;
    const cellHeight = vm.cellHeight;

    if (header) {
      header.forEach(
        function(name: string) {
          vm.drawCell(ctx, x, y, "#FFFFFF", "center", "#333333", name);
          x += cellWidth;
        }.bind(vm)
      );
      y += cellHeight;
    }

    if (data) {
      data.forEach(
        function(row: Array<any>) {
          x = 0;
          row.forEach(
            function(name: string) {
              vm.drawCell(ctx, x, y, "#FFFFFF", "center", "#333333", name);
              x += cellWidth;
            }.bind(vm)
          );
          y += cellHeight;
        }.bind(vm)
      );
    }
  }
};

Q.extend(TableUI, Q.BaseUI);

Object.defineProperties(Q, {
  TableUI: {
    value: TableUI
  }
});
