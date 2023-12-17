function pasteTldrawContent(editor, clipboard, point) {
  const p = point ?? (editor.inputs.shiftKey ? editor.inputs.currentPagePoint : void 0);
  editor.mark("paste");
  editor.putContentOntoCurrentPage(clipboard, {
    point: p,
    select: true
  });
}
export {
  pasteTldrawContent
};
//# sourceMappingURL=pasteTldrawContent.mjs.map
