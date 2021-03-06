const e = require('pdfjs-dist/build/pdf.js');
import t, {
    useRef as r,
    useEffect as o,
    useState as a,
    useMemo as c
} from "react";
const n = ({
    file: e,
    onDocumentComplete: a,
    page: c,
    scale: n,
    rotate: s,
    cMapUrl: i,
    cMapPacked: d,
    workerSrc: p,
    withCredentials: h
}) => {
    const u = r(null),
        [, w] = l({
            canvasEl: u,
            file: e,
            page: c,
            scale: n,
            rotate: s,
            cMapUrl: i,
            cMapPacked: d,
            workerSrc: p,
            withCredentials: h
        });
    return o(() => {
        a(w)
    }, [w]), t.createElement("canvas", {
        ref: u
    })
};
n.defaultProps = {
    onDocumentComplete: () => {}
};
const l = ({
    canvasEl: t,
    file: r,
    scale: n = 1,
    rotate: l = 0,
    page: s = 1,
    cMapUrl: i,
    cMapPacked: d,
    workerSrc: p = require('./pdf.worker.js'),
    withCredentials: h = !1
}) => {
    const [u, w] = a();
    o(() => {
        e.GlobalWorkerOptions.workerSrc = p
    }, []), o(() => {
        const t = {
            url: r,
            withCredentials: h
        };
        i && (t.cMapUrl = i, t.cMapPacked = d), e.getDocument(t).promise.then(w)
    }, [r, h]), o(() => {
        u && u.getPage(s).then(e => f(e))
    }, [u, s, n, l, t]);
    const f = e => {
            const r = 0 === l ? e.rotate : e.rotate + l;
            let o = 1;
            o = window.devicePixelRatio;
            const a = n * o,
                c = e.getViewport({
                    scale: a,
                    rotation: r
                }),
                s = t.current;
            if (!s) return;
            const i = s.getContext("2d");
            s.style.width = `${c.width/o}px`, s.style.height = `${c.height/o}px`, s.height = c.height, s.width = c.width;
            const d = {
                canvasContext: i,
                viewport: c
            };
            e.render(d)
        },
        m = c(() => !u, [u]),
        g = c(() => u ? u._pdfInfo.numPages : null, [u]);
    return [m, g]
};
export default n;
export {
    l as usePdf
};
//# sourceMappingURL=react-pdf-js.es.production.js.map