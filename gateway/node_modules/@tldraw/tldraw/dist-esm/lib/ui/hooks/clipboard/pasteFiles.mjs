async function pasteFiles(editor, urls, point, sources) {
  const blobs = await Promise.all(urls.map(async (url) => await (await fetch(url)).blob()));
  const files = blobs.map((blob) => new File([blob], "tldrawFile", { type: blob.type }));
  editor.mark("paste");
  await editor.putExternalContent({
    type: "files",
    files,
    point,
    ignoreParent: false,
    sources
  });
  urls.forEach((url) => URL.revokeObjectURL(url));
}
export {
  pasteFiles
};
//# sourceMappingURL=pasteFiles.mjs.map
