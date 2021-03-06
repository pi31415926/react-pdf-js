"use strict";

function e(e) {
    return e && "object" == typeof e && "default" in e ? e.default : e
}
var t = e(require("pdfjs-dist/build/pdf.js")),
    r = require("react"),
    a = e(r);
const c = ({
    file: e,
    onDocumentComplete: t,
    page: c,
    scale: s,
    rotate: n,
    cMapUrl: l,
    cMapPacked: i,
    workerSrc: d,
    withCredentials: u
}) => {
    const f = r.useRef(null),
        [, p] = o({
            canvasEl: f,
            file: e,
            page: c,
            scale: s,
            rotate: n,
            cMapUrl: l,
            cMapPacked: i,
            workerSrc: d,
            withCredentials: u
        });
    return r.useEffect(() => {
        t(p)
    }, [p]), a.createElement("canvas", {
        ref: f
    })
};
c.defaultProps = {
    onDocumentComplete: () => {}
};
const o = ({
    canvasEl: e,
    file: a,
    scale: c = 1,
    rotate: o = 0,
    page: s = 1,
    cMapUrl: n,
    cMapPacked: l,
    workerSrc: i = require('./pdf.worker.js'),
    withCredentials: d = !1
}) => {
    const [u, f] = r.useState();
    r.useEffect(() => {
        t.GlobalWorkerOptions.workerSrc = i
    }, []), r.useEffect(() => {
        const e = {
            url: a,
            withCredentials: d
        };
        n && (e.cMapUrl = n, e.cMapPacked = l), t.getDocument(e).promise.then(f)
    }, [a, d]), r.useEffect(() => {
        u && u.getPage(s).then(e => p(e))
    }, [u, s, c, o, e]);
    const p = t => {
            const r = 0 === o ? t.rotate : t.rotate + o;
            let a = 1;
            a = window.devicePixelRatio;
            const s = c * a,
                n = t.getViewport({
                    scale: s,
                    rotation: r
                }),
                l = e.current;
            if (!l) return;
            const i = l.getContext("2d");
            l.style.width = `${n.width/a}px`, l.style.height = `${n.height/a}px`, l.height = n.height, l.width = n.width;
            const d = {
                canvasContext: i,
                viewport: n
            };
            t.render(d)
        },
        h = r.useMemo(() => !u, [u]),
        w = r.useMemo(() => u ? u._pdfInfo.numPages : null, [u]);
    return [h, w]
};
exports.default = c, exports.usePdf = o;
//# sourceMappingURL=react-pdf-js.cjs.production.js.map