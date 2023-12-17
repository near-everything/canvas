class FileHelpers {
  /**
   * @param dataURL - The file as a string.
   * @internal
   *
   * from https://stackoverflow.com/a/53817185
   */
  static async base64ToFile(dataURL) {
    return fetch(dataURL).then(function(result) {
      return result.arrayBuffer();
    });
  }
  /**
   * Convert a file to base64.
   *
   * @example
   *
   * ```ts
   * const A = fileToBase64('./test.png')
   * ```
   *
   * @param value - The file as a blob.
   * @public
   */
  static async fileToBase64(file) {
    return await new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.onabort = (error) => reject(error);
      }
    });
  }
}
export {
  FileHelpers
};
//# sourceMappingURL=file.mjs.map
