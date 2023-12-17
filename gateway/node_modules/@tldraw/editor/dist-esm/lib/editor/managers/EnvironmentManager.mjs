class EnvironmentManager {
  constructor(editor) {
    this.editor = editor;
    if (typeof window !== "undefined" && "navigator" in window) {
      this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      this.isIos = !!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i);
      this.isChromeForIos = /crios.*safari/i.test(navigator.userAgent);
      this.isFirefox = /firefox/i.test(navigator.userAgent);
      this.isAndroid = /android/i.test(navigator.userAgent);
    } else {
      this.isSafari = false;
      this.isIos = false;
      this.isChromeForIos = false;
      this.isFirefox = false;
      this.isAndroid = false;
    }
  }
  /**
   * Whether the editor is running in Safari.
   *
   * @public
   */
  isSafari;
  /**
   * Whether the editor is running on iOS.
   *
   * @public
   */
  isIos;
  /**
   * Whether the editor is running on iOS.
   *
   * @public
   */
  isChromeForIos;
  /**
   * Whether the editor is running on Firefox.
   *
   * @public
   */
  isFirefox;
  /**
   * Whether the editor is running on Android.
   *
   * @public
   */
  isAndroid;
}
export {
  EnvironmentManager
};
//# sourceMappingURL=EnvironmentManager.mjs.map
