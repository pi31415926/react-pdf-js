'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var pdfjs = require('pdfjs-dist/build/pdf.js');
var React = require('react');
var React__default = _interopDefault(React);

const Pdf = ({
  file,
  onDocumentComplete,
  page,
  scale,
  rotate,
  cMapUrl,
  cMapPacked,
  workerSrc,
  withCredentials
}) => {
  const canvasEl = React.useRef(null);
  const [, numPages] = usePdf({
    canvasEl,
    file,
    page,
    scale,
    rotate,
    cMapUrl,
    cMapPacked,
    workerSrc,
    withCredentials
  });
  React.useEffect(() => {
    onDocumentComplete(numPages);
  }, [numPages]);
  return React__default.createElement("canvas", {
    ref: canvasEl
  });
};

Pdf.defaultProps = {
  onDocumentComplete: () => {}
};
const usePdf = ({
  canvasEl,
  file,
  scale = 1,
  rotate = 0,
  page = 1,
  cMapUrl,
  cMapPacked,
  workerSrc = require('./pdf.worker.js'),
  withCredentials = false
}) => {
  const [pdf, setPdf] = React.useState();
  React.useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  }, []);
  React.useEffect(() => {
    const config = {
      url: file,
      withCredentials
    };

    if (cMapUrl) {
      config.cMapUrl = cMapUrl;
      config.cMapPacked = cMapPacked;
    }

    pdfjs.getDocument(config).promise.then(setPdf);
  }, [file, withCredentials]); // handle changes

  React.useEffect(() => {
    if (pdf) {
      pdf.getPage(page).then(p => drawPDF(p));
    }
  }, [pdf, page, scale, rotate, canvasEl]); // draw a page of the pdf

  const drawPDF = page => {
    // Because this page's rotation option overwrites pdf default rotation value,
    // calculating page rotation option value from pdf default and this component prop rotate.
    const rotation = rotate === 0 ? page.rotate : page.rotate + rotate;
    let dpRatio = 1;
    dpRatio = window.devicePixelRatio;
    const adjustedScale = scale * dpRatio;
    const viewport = page.getViewport({
      scale: adjustedScale,
      rotation
    });
    const canvas = canvasEl.current;

    if (!canvas) {
      return;
    }

    const canvasContext = canvas.getContext('2d');
    canvas.style.width = `${viewport.width / dpRatio}px`;
    canvas.style.height = `${viewport.height / dpRatio}px`;
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext,
      viewport
    };
    page.render(renderContext);
  };

  const loading = React.useMemo(() => !pdf, [pdf]);
  const numPages = React.useMemo(() => pdf ? pdf._pdfInfo.numPages : null, [pdf]);
  return [loading, numPages];
};

exports.default = Pdf;
exports.usePdf = usePdf;
//# sourceMappingURL=react-pdf-js.cjs.development.js.map
