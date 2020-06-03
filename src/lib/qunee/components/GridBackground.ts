import { DOMUtil } from "../../../vms/util/index";
import { Q } from "../Q";

class GridBackground {
  private graph: Q.Graph;
  private readonly canvas: HTMLCanvasElement;
  private readonly scaleCanvas: HTMLCanvasElement;
  private currentCell: number;

  constructor(graph: Q.Graph) {
    this.graph = graph;

    graph.onPropertyChange("viewport", this.update.bind(this));
    graph.onPropertyChange("transform", this.update.bind(this));

    this.canvas = Q.createCanvas(graph.width, graph.height, true);
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0px";
    this.canvas.style["-webkit-user-select"] = "none";
    this.canvas.style["-webkit-tap-highlight-color"] = "rgba(0, 0, 0, 0)";

    this.scaleCanvas = Q.createCanvas(graph.width, graph.height, true);
    this.scaleCanvas.style.position = "absolute";
    this.scaleCanvas.style.top = "0px";
    this.scaleCanvas.style["-webkit-user-select"] = "none";
    this.scaleCanvas.style["-webkit-tap-highlight-color"] = "rgba(0, 0, 0, 0)";

    graph.canvasPanel.insertBefore(this.canvas, graph.canvasPanel.firstChild);
    graph.canvasPanel.appendChild(this.scaleCanvas);

    this.update();
  }

  /**
   *
   */
  update() {
    const vm = this;

    const graph = vm.graph;
    const canvas = vm.canvas;
    const scaleCanvas = vm.scaleCanvas;
    graph.callLater(function() {
      (canvas as any).setSize(graph.width, graph.height);
      DOMUtil.clearCanvas(canvas, canvas.width, canvas.height);
      (scaleCanvas as any).setSize(graph.width, graph.height);
      DOMUtil.clearCanvas(scaleCanvas, canvas.width, canvas.height);

      let scale = graph.scale;
      const gap = 50 / scale;
      vm.currentCell = 10 * (Math.round(gap / 10) || 1);

      scale = graph.scale * (canvas as any).ratio;
      const bounds = graph.viewportBounds;
      const g: CanvasRenderingContext2D = (canvas as any).g;

      g.save();
      vm.doTransform(g, scale, bounds);

      g.beginPath();
      let x = bounds.x,
        y = bounds.y,
        right = bounds.right,
        bottom = bounds.bottom;
      if (x % vm.currentCell !== 0) {
        x -= x % vm.currentCell;
      }
      if (y % vm.currentCell !== 0) {
        y -= y % vm.currentCell;
      }
      while (x < right) {
        g.moveTo(x, bounds.y);
        g.lineTo(x, bottom);
        x += vm.currentCell;
      }
      while (y < bottom) {
        g.moveTo(bounds.x, y);
        g.lineTo(right, y);
        y += vm.currentCell;
      }

      g.lineWidth = 1 / scale;
      g.strokeStyle = "#cccccc";
      g.stroke();

      (scaleCanvas as any).g.save();
      vm.doTransform((scaleCanvas as any).g, scale, bounds);
      vm.drawScales(
        (scaleCanvas as any).g,
        bounds,
        scale,
        (scaleCanvas as any).ratio
      );
      (scaleCanvas as any).g.restore();

      g.restore();
    }, this);
  }

  /**
   *
   * @param g
   * @param scale
   * @param bounds
   * @private
   */
  doTransform(g: CanvasRenderingContext2D, scale: number, bounds: Q.Rect) {
    g.translate(-scale * bounds.x, -scale * bounds.y);
    g.scale(scale, scale);
  }

  /**
   *
   * @param g
   * @param text
   * @param x
   * @param y
   * @param fontSize
   * @param textAlign
   * @param textBaseline
   * @param rotate
   */
  drawText(
    g: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    textAlign?: CanvasTextAlign,
    textBaseline?: CanvasTextBaseline,
    rotate?: number
  ) {
    fontSize = fontSize || 7;
    g.save();
    const fontScale = 3;
    fontSize *= fontScale;
    g.font = "normal " + fontSize + 'px "微软雅黑", "Microsoft YaHei", "宋体"';
    g.fillStyle = "#555";
    g.textAlign = textAlign || "center";
    g.textBaseline = textBaseline || "top";
    g.translate(x, y);
    if (rotate) {
      g.rotate(rotate);
    }
    g.scale(1 / fontScale, 1 / fontScale);
    g.fillText(text, 0, 0);
    g.restore();
  }

  /**
   *
   * @param g
   * @param bounds
   * @param scale
   * @param ratio
   */
  drawScales(
    g: CanvasRenderingContext2D,
    bounds: Q.Rect,
    scale: number,
    ratio: number
  ) {
    g.beginPath();

    const scaleLength = (5 * ratio) / scale;
    const fontSize = (11 * ratio) / scale;

    g.beginPath();
    let x = bounds.x;
    x = this.currentCell * Math.ceil(x / this.currentCell);
    while (x < bounds.right) {
      g.moveTo(x, bounds.y);
      g.lineTo(x, bounds.y + scaleLength + scaleLength);
      this.drawText(
        g,
        ("" + x) as any | 0,
        x,
        bounds.y + scaleLength + scaleLength,
        fontSize
      );
      x += this.currentCell;
    }
    let y = bounds.y;
    y = this.currentCell * Math.ceil(y / this.currentCell);
    while (y < bounds.bottom) {
      g.moveTo(bounds.x, y);
      g.lineTo(bounds.x + scaleLength + scaleLength, y);
      this.drawText(
        g,
        ("" + y) as any | 0,
        bounds.x + scaleLength + scaleLength,
        y,
        fontSize,
        "center",
        "top",
        -Math.PI / 6
      );
      y += this.currentCell;
    }
    g.lineWidth = 1 / scale;
    g.strokeStyle = "#000";
    g.stroke();
  }
}

Object.defineProperties(Q, {
  GridBackground: {
    value: GridBackground
  }
});
