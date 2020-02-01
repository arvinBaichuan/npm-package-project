import axios from "axios";
import { mavonEditor as MavonEditor } from "mavon-editor";
import { Component, Prop, Vue } from "vue-property-decorator";
import { CreateElement } from "vue";
import { IHyMarkdownToolbar } from "./vms/IHyMarkdownToolbar";

/**
 * markdown 编辑器
 */
@Component<HyMarkdown>({})
export class HyMarkdown extends Vue {
  /** 内容 */
  @Prop({ type: String, default: "" })
  public value!: string;

  /** 图片上传接口地址 */
  @Prop({
    type: String,
    default: "/docs/upload"
  })
  public action!: string;

  /** 占位符号 */
  @Prop({
    type: String,
    default: ""
  })
  public placeholder!: string;

  /** 是否可以编辑 */
  @Prop({
    type: Boolean,
    default: true
  })
  public editable!: boolean;

  /** 工具按钮 */
  @Prop({
    type: Object,
    default() {
      return {
        bold: true,
        italic: true,
        header: false,
        underline: true,
        strikethrough: true,
        mark: false,
        superscript: false,
        subscript: false,
        quote: false,
        ol: true,
        ul: true,
        link: true,
        imagelink: false,
        code: false,
        table: true,
        fullscreen: false,
        readmodel: false,
        htmlcode: false,
        help: false,
        undo: true,
        redo: true,
        trash: false,
        save: false,
        navigation: false,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: false,
        preview: true
      };
    }
  })
  public toolbars!: IHyMarkdownToolbar;

  public $refs!: {
    mavonEditorRef: MavonEditor;
  };

  /**
   * 内容发生变更
   * @param value 当前内容
   */
  private handleMavonEditorChange(value: string) {
    const vm = this;

    if (vm.editable) {
      vm.$emit("input", value);
    }
  }

  /**
   * 插入图片
   * @param index 索引
   * @param file 图片文件
   */
  private async handleMavonEditorImgAdd(index: string, file: Blob) {
    const vm = this;

    /* 构造表单数据 */
    const formdata = new FormData();
    formdata.append(index, file);

    const result = await axios({
      url: vm.action,
      method: "post",
      data: formdata,
      headers: { "content-type": "multipart/form-data" }
    });
    if (result && result.data && result.data.data && result.data.data.id) {
      const url = `/docs/${result.data.data.id}`;
      if (vm.$refs.mavonEditorRef) {
        vm.$refs.mavonEditorRef.$imgUpdateByUrl(index, url);
        vm.$refs.mavonEditorRef.$img2Url(index, url);
      }
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    const { value, editable, placeholder, toolbars, ...props } = vm.$props;

    return (
      <section class={["hy-markdown"]}>
        <MavonEditor
          ref="mavonEditorRef"
          value={value}
          placeholder={placeholder}
          editable={editable}
          subfield={editable}
          defaultOpen={editable ? "edit" : "preview"}
          toolbars={editable ? toolbars : { readmodel: true }}
          onChange={vm.handleMavonEditorChange}
          onImgAdd={vm.handleMavonEditorImgAdd}
          {...{ props }}
          boxShadow={false}
        />
      </section>
    );
  }
}
