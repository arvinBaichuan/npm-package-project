declare module "vue-context" {
  import Vue from "vue";

  export class VueContext extends Vue {
    /**
     * 打开右键菜单
     * @param e 鼠标事件
     * @param data 数据
     */
    public open(e: MouseEvent, data?: {}): void;

    /**
     * 关闭右键菜单
     */
    public close(): void;
  }
}
