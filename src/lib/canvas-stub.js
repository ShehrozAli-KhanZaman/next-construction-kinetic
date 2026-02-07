/**
 * Stub for Node "canvas" module. Used so pdfjs-dist doesn't bundle the native
 * canvas.node binary. In the browser, only browser canvas APIs are used.
 */
module.exports = {
  createCanvas: () => ({}),
}
