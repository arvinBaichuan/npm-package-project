declare module "mavon-editor" {
  import Vue from "vue";

  /**
   * https://github.com/hinesboy/mavonEditor
   */
  export class mavonEditor extends Vue {
    /**
     * 将相对路径值替换为url
     * (如./0 -> http://path/to/png/some.png)
     * @param {string} filename
     * @param {string} url
     */
    $imgUpdateByUrl(filename: string, url: string): void;

    /**
     * 将图片文件名替换为url
     * (如![h](./0) -> ![h](http://path/to/png/some.png))
     * @param {string} filename
     * @param {string} url
     */
    $img2Url(filename: string, url: string): void;
  }
}
