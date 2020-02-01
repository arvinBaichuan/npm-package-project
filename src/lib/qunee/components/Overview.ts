/**
 * 预览
 */

import { Q } from "../Q";

class Overview {
  private graph: Q.Graph;
  private readonly html: HTMLDivElement;
  private readonly canvas: HTMLCanvasElement | null = null;
  private visible: boolean = true;
  private imageInfo: any;
  private bounds: any;
  private scale: number | null;

  private _dragInfo: any;
  private _invalidateFlag: boolean = false;
  private _invalidateGraphFlag: boolean = false;
  private _onPropertyChanged: (e: any) => void;
  private _onDataChanged: (e: any) => void;

  constructor(html: HTMLDivElement, graph: Q.Graph) {
    this.html = html;
    this.canvas = Q.createCanvas(true);
    if (this.canvas) {
      this.html.appendChild(this.canvas);
    }
    new Q.DragSupport(this.canvas, this);
    this.setGraph(graph);
  }

  setGraph(graph: Q.Graph) {
    if (this.graph === graph) {
      return;
    }

    this._uninstall();
    this.graph = graph;
    this._install();
  }

  /**
   *
   * @private
   */
  private _install() {
    if (!this.graph) {
      return;
    }
    if (!this._onPropertyChanged) {
      this._onPropertyChanged = function(this: Overview, evt: any) {
        const kind = evt.kind;
        if (kind == "element.bounds") {
          this._invalidateGraph();
          return;
        }
        if (kind == "transform" || kind == "viewport") {
          this.invalidate();
        }
      }.bind(this);
      this._onDataChanged = function(this: any) {
        this._invalidateGraph();
      }.bind(this);
    }
    this.graph.propertyChangeDispatcher.addListener(this._onPropertyChanged);
    this.graph.dataPropertyChangeDispatcher.addListener(this._onDataChanged);
    this.graph.listChangeDispatcher.addListener(this._onDataChanged);
    this._invalidateGraph(true);
  }

  /**
   *
   * @private
   */
  private _uninstall() {
    if (!this.graph || !this._onPropertyChanged) {
      return;
    }
    this.graph.propertyChangeDispatcher.removeListener(this._onPropertyChanged);
    this.graph.dataPropertyChangeDispatcher.removeListener(this._onDataChanged);
    this.graph.listChangeDispatcher.removeListener(this._onDataChanged);
    this.imageInfo = null;
    this.bounds = null;
    this.scale = null;
  }

  private _toCanvas(x: number, y: number) {
    x = this.scale! * (x - this.bounds.x);
    y = this.scale! * (y - this.bounds.y);
    return [x, y];
  }

  private _toGraph(evt: any): [number, number] {
    const xy = globalToLocal(evt, this.html!);
    const x = xy[0] / this.scale! + this.bounds.x;
    const y = xy[1] / this.scale! + this.bounds.y;
    return [x, y];
  }

  private _validateGraph() {
    this._invalidateGraphFlag = false;
    if (!this.visible) {
      return;
    }
    const width = this.html!.clientWidth,
      height = this.html!.clientHeight;
    const bounds = new Q.Rect();
    bounds.add(this.graph!.bounds);
    const imageScale =
      Math.min(width / bounds.width, height / bounds.height) *
      (this.canvas! as any).ratio;
    this.imageInfo = this.graph!.exportImage(imageScale, bounds);
    this.imageInfo.scale = imageScale;
    this.imageInfo.bounds = bounds;

    this.invalidate();
  }

  private _invalidateGraph(force?: boolean) {
    if (!this.graph || (!force && this._invalidateGraphFlag)) {
      return;
    }
    this._invalidateGraphFlag = true;
    this.graph.callLater(this._validateGraph, this, force ? 0 : 100);
  }

  invalidate(force?: boolean) {
    if (!force && this._invalidateFlag) {
      return;
    }
    this._invalidateFlag = true;
    setTimeout(this.validate.bind(this));
  }

  /**
   *
   */
  validate() {
    this._invalidateFlag = false;
    let imageInfo = this.imageInfo;
    if (!imageInfo) {
      return;
    }
    const viewportBounds = this.graph!.viewportBounds;
    if (!viewportBounds.height || !viewportBounds.width) {
      return;
    }

    if (!this.canvas || !this.html) {
      return;
    }

    const ratio = (this.canvas as any).ratio;
    const ctx = this.canvas.getContext("2d");

    if (ctx) {
      let width = this.html.clientWidth,
        height = this.html.clientHeight;
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;
      ctx.scale(ratio, ratio);

      const bounds = new Q.Rect(imageInfo.bounds);
      bounds.add(viewportBounds);
      const scale = Math.min(width / bounds.width, height / bounds.height);
      this.scale = scale;

      const offsetX = (width / scale - bounds.width) / 2;
      const offsetY = (height / scale - bounds.height) / 2;
      bounds.x -= offsetX;
      bounds.y -= offsetY;
      bounds.width = width / scale;
      bounds.height = height / scale;
      this.bounds = bounds;

      ctx.save();
      let xy = this._toCanvas(imageInfo.bounds.x, imageInfo.bounds.y);
      ctx.translate(xy[0], xy[1]);
      ctx.scale(scale / imageInfo.scale, scale / imageInfo.scale);
      ctx.drawImage(this.imageInfo.canvas, 0, 0);
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(this.canvas.width, 0);
      ctx.lineTo(this.canvas.width, this.canvas.height);
      ctx.lineTo(0, this.canvas.height);
      ctx.lineTo(0, 0);

      xy = this._toCanvas(viewportBounds.x, viewportBounds.y);
      const x = xy[0];
      const y = xy[1];
      width = viewportBounds.width * scale;
      height = viewportBounds.height * scale;

      ctx.moveTo(x, y);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x + width, y);
      ctx.closePath();
      ctx.fillStyle = "rgba(132, 146, 166, 0.4)";
      ctx.fill();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#EDF2FC";
      ctx.strokeRect(x, y, width, height);
    }
  }

  accept() {
    return this.graph != null;
  }

  startdrag(evt: DragEvent) {
    this.enddrag();
    if (!this.scale) {
      return;
    }
    const xy = this._toGraph(evt);
    const viewport = this.graph.viewportBounds;
    if (viewport.contains(xy[0], xy[1])) {
      this._dragInfo = {
        scale: this.scale / this.graph.scale,
        point: xy
      };
      this.graph.stopAnimation();
    }
  }

  ondrag(evt: any) {
    if (!this._dragInfo) {
      return;
    }
    const scale = this._dragInfo.scale;
    let dx = evt.dx;
    let dy = evt.dy;
    dx /= scale;
    dy /= scale;
    this.graph.translate(-dx, -dy, false);
  }

  enddrag() {
    this._dragInfo = null;
  }

  onstart(evt: any) {
    Q.stopEvent(evt);
    const xy = this._toGraph(evt);
    this.graph.centerTo(xy[0], xy[1]);
  }

  onmousewheel(evt: any) {
    Q.stopEvent(evt);
    let xy: Q.Point | [number, number] = this._toGraph(evt);
    xy = this.graph.toCanvas(xy[0], xy[1]);
    this.graph.zoomAt(Math.pow(this.graph.scaleStep, evt.delta), xy.x, xy.y);
  }

  ondblclick() {
    if (!this.graph) {
      return;
    }

    if (this.graph.enableDoubleClickToOverview) {
      const resetScale = (this.graph as any).resetScale || 1;
      if (Math.abs(this.graph.scale - resetScale) < 0.001) {
        this.graph.zoomToOverview(false);
      } else {
        this.graph.moveToCenter(resetScale);
      }
    }
  }

  /**
   *
   * @param visible
   */
  setVisible(visible: boolean) {
    this.visible = visible;
    if (visible) {
      this.html!.style.display = "block";
    } else {
      this.html!.style.display = "none";
    }
    this._invalidateGraph();
  }
}

function globalToLocal(e: any, div: HTMLDivElement) {
  if (e.touches) {
    if (e.changedTouches && e.changedTouches.length) {
      e = e.changedTouches[0];
    } else {
      e = e.touches[0];
    }
  }
  const clientRect = div.getBoundingClientRect();
  let x = e.clientX || 0;
  let y = e.clientY || 0;
  if (Q.isTouchSupport && Q.isSafari) {
    if (window.pageXOffset && x === e.pageX) {
      x -= window.pageXOffset;
    }
    if (window.pageYOffset && y === e.pageY) {
      y -= window.pageYOffset;
    }
  }
  return [x - clientRect.left, y - clientRect.top];
}

Object.defineProperties(Q, {
  Overview: {
    value: Overview
  }
});
