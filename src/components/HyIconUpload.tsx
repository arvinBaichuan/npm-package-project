import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CreateElement } from "vue";
import { Button, Upload } from "element-ui";
import _ from "lodash";
import { DOMUtil, Util } from "../vms/util/index";
import { Q } from "../lib/qunee";

enum EVENTS {
  DONE = "done"
}

/**
 * 图标上传
 */
@Component<HyIconUpload>({})
export class HyIconUpload extends Vue {
  /** 图标文件ID */
  @Prop({ type: String, required: true, default: "" })
  public value!: string;

  /** 描述文字 */
  @Prop({ type: String, default: "点击上传" })
  public text!: string;

  /** 类型 */
  @Prop({ type: String, default: "picture" })
  public type!: "picture" | "canvas";

  /** 简单模式，只有上传按钮，没有预览 */
  @Prop({
    type: Boolean,
    default: false
  })
  public simple!: boolean;

  /** 宽度 */
  @Prop({
    type: Number,
    default: 100,
    validator(value: number): boolean {
      return typeof value === "number" && value >= 50;
    }
  })
  public width!: number;

  /** 高度 */
  @Prop({
    type: Number,
    default: 100,
    validator(value: number): boolean {
      return typeof value === "number" && value >= 50;
    }
  })
  public height!: number;

  private id: string = _.uniqueId("hy-icon-upload");
  private loading: boolean = false;

  @Watch("type")
  public onTypeChanged() {
    const vm = this;

    if (vm.type === "canvas") {
      vm.initCanvas();
    }
  }

  @Watch("value")
  public onValueChanged() {
    const vm = this;

    if (vm.type === "canvas") {
      vm.initCanvas();
    }
  }

  public mounted() {
    const vm = this;

    if (vm.type === "canvas") {
      vm.initCanvas();
    }
  }

  /**
   * 加载CANVAS
   */
  private async initCanvas() {
    const vm = this;
    const canvasEl = $(`#${vm.id}`)[0] as HTMLCanvasElement;
    if (!canvasEl) {
      throw new Error("画布元素没有找到");
    }

    DOMUtil.clearCanvas(canvasEl, vm.width, vm.height);

    if (vm.value) {
      vm.loading = true;
      if (!Q.hasImage(vm.value)) {
        try {
          await Util.getQuneeCanvasIcon(Q, vm.value);
          DOMUtil.drawCanvas(
            Q.drawImage,
            vm.value,
            canvasEl,
            vm.width,
            vm.height,
            {}
          );
        } catch (e) {
          console.error(e.message);
        } finally {
          vm.loading = false;
        }
      } else {
        DOMUtil.drawCanvas(
          Q.drawImage,
          vm.value,
          canvasEl,
          vm.width,
          vm.height,
          {}
        );
        vm.loading = false;
      }
    }
  }

  /**
   * 图标文件上传成功
   * @param result
   * @param file
   */
  private async onPictureUpload(result: any, file: File) {
    const vm = this;
    const {
      data: { id }
    } = result;

    vm.$emit("input", id);

    if (vm.type === "canvas") {
      vm.loading = true;
      try {
        const quneeIcon = await Util.getQuneeCanvasIcon(Q, id);

        DOMUtil.clearCanvas(
          $(`#${vm.id}`)[0] as HTMLCanvasElement,
          vm.width,
          vm.height
        );
        DOMUtil.drawCanvas(
          Q.drawImage,
          id,
          $(`#${vm.id}`)[0] as HTMLCanvasElement,
          vm.width,
          vm.height,
          {}
        );

        vm.$emit(
          EVENTS.DONE,
          _.merge(quneeIcon, {
            name: file.name
          })
        );
      } catch (e) {
        console.error(e.message);
      } finally {
        vm.loading = false;
      }
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <div
        class={["hy-icon-upload", vm.simple ? "hy-icon-upload--simple" : ""]}
      >
        <Upload
          class={vm.simple ? "" : "container"}
          style={
            vm.simple
              ? {}
              : { width: `${vm.width}px`, height: `${vm.height}px` }
          }
          action="/docs/upload"
          showFileList={false}
          v-loading={vm.loading}
          {...{
            props: {
              onSuccess: vm.onPictureUpload
            }
          }}
        >
          <div
            class="desc"
            style={{
              display: vm.simple ? "none" : "inline-block",
              width: `${vm.width}px`
            }}
          >
            {vm.text}
          </div>
          {vm.type === "picture" && vm.value && !vm.simple && (
            <img src={`/docs/${vm.value}`} />
          )}
          <canvas
            id={vm.id}
            width={vm.width}
            height={vm.height}
            style={{
              display:
                vm.type === "canvas" && !vm.simple ? "inline-block" : "none",
              width: vm.simple ? "0px" : `${vm.width}px`,
              height: vm.simple ? "0px" : `${vm.height}px`
            }}
          />
          <Button
            type="primary"
            style={{
              display: vm.simple ? "inline-block" : "none"
            }}
          >
            <i class="fa fa-cloud-upload fa-fw" />
          </Button>
        </Upload>
      </div>
    );
  }
}
