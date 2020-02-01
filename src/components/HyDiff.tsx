import { jsdifflib, jsdiffview } from "../lib/jsdifflib/jsdifflib";
import { RadioButton, RadioGroup } from "element-ui";
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue, { CreateElement } from "vue";
import { DiffFile } from "../vms";
import _ from "lodash";

/**
 * 文本比较
 */
@Component<HyDiff>({})
export class HyDiff extends Vue {
  /** 文件A */
  @Prop({
    type: [DiffFile, Object],
    default() {
      return new DiffFile("", "");
    }
  })
  fileA: DiffFile;

  /** 文件B */
  @Prop({
    type: [DiffFile, Object],
    default() {
      return new DiffFile("", "");
    }
  })
  fileB: DiffFile;

  id: string = _.uniqueId("hy-diff");
  viewType: "并排" | "单列" = "并排";

  get viewTypeNumber() {
    return this.viewType === "单列" ? 1 : 0;
  }

  @Watch("fileA.content")
  onFileAChanged() {
    this.renderDiff();
  }

  @Watch("fileB.content")
  onFileBChanged() {
    this.renderDiff();
  }

  @Watch("viewTypeNumber")
  onViewTypeChanged() {
    this.renderDiff();
  }

  mounted() {
    this.renderDiff();
  }

  renderDiff() {
    const vm = this;

    const contentA = jsdifflib.stringAsLines(vm.fileA.content);
    const contentB = jsdifflib.stringAsLines(vm.fileB.content);

    const diffOutputEl = document!.getElementById(vm.id);

    if (diffOutputEl) {
      diffOutputEl.innerHTML = "";

      diffOutputEl.appendChild(
        jsdiffview.buildView({
          baseTextLines: contentA,
          newTextLines: contentB,
          opcodes: new jsdifflib.SequenceMatcher(
            contentA,
            contentB
          ).get_opcodes(),
          baseTextName: vm.fileA.name,
          newTextName: vm.fileB.name,
          viewType: vm.viewTypeNumber
        })
      );
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <section class="hy-diff">
        <header class="hy-diff__header">
          {vm.$slots.header}
          <RadioGroup vModel={vm.viewType}>
            <RadioButton label="单列" />
            <RadioButton label="并排" />
          </RadioGroup>
        </header>
        <div id={vm.id} class="hy-diff__output" />
      </section>
    );
  }
}
