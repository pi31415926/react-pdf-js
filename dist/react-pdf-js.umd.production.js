! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("pdfjs-dist/build/pdf.js"), require("react")) : "function" == typeof define && define.amd ? define(["exports", "pdfjs-dist/build/pdf.js", "react"], t) : (e = e || self, t(e["react-pdf-js"] = {}, e.pdfjs, e.React))
}(this, function (e, t, r) {
    "use strict";
    t = t && t.hasOwnProperty("default") ? t.default : t;
    var a = "default" in r ? r.default : r;
    const o = ({
        file: e,
        onDocumentComplete: t,
        page: o,
        scale: c,
        rotate: n,
        cMapUrl: d,
        cMapPacked: l,
        workerSrc: i,
        withCredentials: f
    }) => {
        const u = r.useRef(null),
            [, p] = s({
                canvasEl: u,
                file: e,
                page: o,
                scale: c,
                rotate: n,
                cMapUrl: d,
                cMapPacked: l,
                workerSrc: i,
                withCredentials: f
            });
        return r.useEffect(() => {
            t(p)
        }, [p]), a.createElement("canvas", {
            ref: u
        })
    };
    o.defaultProps = {
        onDocumentComplete: () => {}
    };
    const s = ({
        canvasEl: e,
        file: a,
        scale: o = 1,
        rotate: s = 0,
        page: c = 1,
        cMapUrl: n,
        cMapPacked: d,
        workerSrc: l = require('./pdf.worker.js'),
        withCredentials: i = !1
    }) => {
        const [f, u] = r.useState();
        r.useEffect(() => {
            t.GlobalWorkerOptions.workerSrc = l
        }, []), r.useEffect(() => {
            const e = {
                url: a,
                withCredentials: i
            };
            n && (e.cMapUrl = n, e.cMapPacked = d), t.getDocument(e).promise.then(u)
        }, [a, i]), r.useEffect(() => {
            f && f.getPage(c).then(e => p(e))
        }, [f, c, o, s, e]);
        const p = t => {
                const r = 0 === s ? t.rotate : t.rotate + s;
                let a = 1;
                a = window.devicePixelRatio;
                const c = o * a,
                    n = t.getViewport({
                        scale: c,
                        rotation: r
                    }),
                    d = e.current;
                if (!d) return;
                const l = d.getContext("2d");
                d.style.width = `${n.width/a}px`, d.style.height = `${n.height/a}px`, d.height = n.height, d.width = n.width;
                const i = {
                    canvasContext: l,
                    viewport: n
                };
                t.render(i)
            },
            h = r.useMemo(() => !f, [f]),
            w = r.useMemo(() => f ? f._pdfInfo.numPages : null, [f]);
        return [h, w]
    };
    e.default = o, e.usePdf = s
});
//# sourceMappingURL=react-pdf-js.umd.production.js.map