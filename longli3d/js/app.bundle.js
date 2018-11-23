! function(t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var a = i[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return t[n].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "/assets/", e(0)
}([function(t, e, i) {
    t.exports = i(1)
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    var a = i(2),
        o = i(10),
        s = n(o),
        r = i(9),
        l = n(r);
    setTimeout(function() {
        (0, a.loadResource)(function() {
            $(".load-page .progress-txt").hide(), (0, s["default"])(), (0, l["default"])()
        })
    }, 500), $(function() {
        $(document).on("touchmove", function() {
            return !1
        }), FastClick.attach(document.body)
    })
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t) {
        for (var e = 0; e < t.length; e++)
            for (var i = t[e].imgs, n = 0; n < i.length; n++) v.add(y + i[n])
    }

    function o(t) {
        b = $(".load-page .progress-txt span"), v.oncomplete = function(i) {
            e.resources = x = i, t && t(i)
        }, v.load()
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.resources = e.loadResource = e.cdnPath = void 0;
    var s = i(3),
        r = n(s),
        l = i(4),
        u = n(l),
        h = i(5),
        d = n(h),
        c = i(6),
        p = n(c),
        f = i(7),
        g = n(f),
        m = i(8),
        _ = n(m),
        v = new r["default"],
        y = e.cdnPath = "/longli/";
    v.add(y + "images/loading/proload_0_png.png"), v.add(y + "images/loading/proload_1_png.png"), v.add(y + "images/loading/proload_2_png.png"), v.add(y + "images/loading/proload_3_png.png"), v.add(y + "images/loading/proload_4_png.png"), v.add(y + "images/loading/proload_5_png.png"), v.add(y + "images/loading/proload_6_png.png"), v.add(y + "images/loading/proload_7_png.png"), v.add(y + "images/loading/proload_8_png.png"), v.add(y + "images/loading/title1.png"), v.add(y + "images/loading/title2.png"), v.add(y + "images/loading/logo.png");
    for (var w = 1; w <= 20; w++) v.add(y + "images/bg/" + w + ".png");
    a(u["default"]), a(d["default"]), a(p["default"]), a(g["default"]), a(_["default"]);
    var b;
    v.onprogress = function(t) {
        b.text(t)
    };
    var x = {};
    e.loadResource = o, e.resources = x
}, function(t, e) {
    "use strict";

    function i() {
        this.queues = [], this.resources = {}, this.urls = {}
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = i, i.prototype.add = function(t, e, i) {
        return 1 == arguments.length ? (e = t, t = "", i = null) : 2 == arguments.length && ("function" == typeof e ? (i = e, e = t, t = "") : "string" == typeof e && (i = null)), e ? this.urls[e] ? this : (this.urls[e] = 1, this.queues.push({
            name: t,
            url: e,
            callback: i
        }), this) : this
    }, i.prototype.load = function() {
        if (!this._started) {
            this._started = !0, this.urls = null;
            for (var t = this, e = this.queues.length, i = 0, n = 0; n < e; n++) {
                var a = this.queues[n],
                    o = a.url,
                    s = a.name;
                a.callback;
                if (o)
                    if (/\.(png|gif|jpg|jpeg|bmp)/.test(o)) {
                        var r = new Image;
                        s && (this.resources[s] = r), r.onerror = r.onload = function() {
                            this.onerror = this.onload = null, i++;
                            var n = Math.ceil(i / e * 100);
                            t.progress(n), i >= e && t.complete()
                        }, r.src = o
                    } else if (/\.mp3/.test(o)) {
                    var l = new Audio;
                    s && (this.resources[s] = l), l.preload = "auto",
                        function(n) {
                            n.oncanplaythrough = n.onerror = n.onload = function() {
                                this.loadTimer && clearTimeout(this.loadTimer), this.oncanplaythrough = this.onerror = this.onload = null, i++;
                                var n = Math.ceil(i / e * 100);
                                t.progress(n), i >= e && t.complete()
                            }, n.loadTimer = setTimeout(function() {
                                n.oncanplaythrough = n.onerror = n.onload = null, i++;
                                var a = Math.ceil(i / e * 100);
                                t.progress(a), i >= e && t.complete()
                            }, 4e3)
                        }(l), l.src = o, l.load()
                } else {
                    if (!/\.mp4/.test(o)) {
                        i++;
                        continue
                    }
                    var u = document.createElement("video");
                    s && (this.resources[s] = u), u.preload = "auto",
                        function(n) {
                            n.oncanplaythrough = n.onerror = n.onload = function() {
                                this.loadTimer && clearTimeout(this.loadTimer), this.oncanplaythrough = this.onerror = this.onload = null, i++;
                                var n = Math.ceil(i / e * 100);
                                t.progress(n), i >= e && t.complete()
                            }, n.loadTimer = setTimeout(function() {
                                n.oncanplaythrough = n.onerror = n.onload = null, i++;
                                var a = Math.ceil(i / e * 100);
                                t.progress(a), i >= e && t.complete()
                            }, 8e3)
                        }(u), u.src = o, u.load()
                } else i++
            }
        }
    }, i.prototype.progress = function(t) {
        "function" == typeof this.onprogress && this.onprogress(t)
    }, i.prototype.complete = function() {
        "function" == typeof this.oncomplete && this.oncomplete(this.resources)
    }
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = [{
        x: 260,
        y: 318,
        w: 1548,
        h: 442,
        url: "images/pano/p1.png",
        imgs: ["images/longwei/longwei_01.png", "images/longwei/longwei_02.png", "images/longwei/longwei_03.png", "images/longwei/longwei_04.png", "images/longwei/longwei_05.png", "images/longwei/longwei_06.png", "images/longwei/longwei_07.png", "images/longwei/longwei_08.png", "images/longwei/longwei_09.png", "images/longwei/longwei_10.png", "images/longwei/longwei_11.png", "images/longwei/longwei_12.png"],
        l: 10
    }, {
        x: 2199,
        y: 482,
        w: 258,
        h: 474,
        url: "images/pano/p1.png",
        imgs: ["images/laowang/wcl_01.png", "images/laowang/wcl_02.png"],
        l: 10
    }, {
        x: 1931,
        y: 53,
        w: 129,
        h: 308,
        url: "images/pano/p1.png",
        imgs: ["images/label/label_zyq.png"],
        l: 10
    }, {
        x: 1931,
        y: 53,
        w: 129,
        h: 100,
        url: "images/pano/p1.png",
        is_tip: 1,
        imgs: ["images/label/press.png"],
        l: 10
    }, {
        x: 2580,
        y: 178,
        w: 129,
        h: 366,
        url: "images/pano/p1.png",
        imgs: ["images/label/label_lbsy.png"],
        l: 10
    }, {
        x: 2580,
        y: 178,
        w: 129,
        h: 100,
        url: "images/pano/p1.png",
        is_tip: 1,
        imgs: ["images/label/press.png"],
        l: 10
    }, {
        x: 674,
        y: 10,
        w: 129,
        h: 421,
        url: "images/pano/p1.png",
        imgs: ["images/label/label_stbwg.png"],
        l: 10
    }, {
        x: 674,
        y: 10,
        w: 129,
        h: 100,
        url: "images/pano/p1.png",
        is_tip: 1,
        imgs: ["images/label/press.png"],
        l: 10
    }]
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = [{
        x: 924,
        y: 38,
        w: 774,
        h: 736,
        url: "images/pano/p1.png",
        imgs: ["images/building1/building1_01.png", "images/building1/building1_02.png", "images/building1/building1_03.png", "images/building1/building1_04.png", "images/building1/building1_05.png", "images/building1/building1_06.png"],
        l: 10
    }, {
        x: 64,
        y: 77,
        w: 387,
        h: 147,
        url: "images/pano/p1.png",
        imgs: ["images/cloud3/cloud3_01.png", "images/cloud3/cloud3_02.png", "images/cloud3/cloud3_03.png"],
        l: 10
    }, {
        x: 2190,
        y: 390,
        w: 129,
        h: 315,
        url: "images/pano/p1.png",
        imgs: ["images/label/label_wcl.png"],
        l: 10
    }, {
        x: 2190,
        y: 390,
        w: 129,
        h: 100,
        url: "images/pano/p1.png",
        is_tip: 1,
        imgs: ["images/label/press.png"],
        l: 10
    }]
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = [{
        x: 530,
        y: 370,
        w: 1677,
        h: 779,
        url: "images/pano/p1.png",
        imgs: ["images/long/long_01.png", "images/long/long_02.png", "images/long/long_03.png", "images/long/long_04.png", "images/long/long_05.png", "images/long/long_06.png", "images/long/long_07.png", "images/long/long_08.png", "images/long/long_09.png", "images/long/long_10.png", "images/long/long_11.png", "images/long/long_12.png", "images/long/long_13.png"],
        fixX: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        l: 10
    }]
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = [{
        x: 851,
        y: 713,
        w: 903,
        h: 482,
        url: "images/pano/p1.png",
        imgs: ["images/guy/guy_01.png", "images/guy/guy_02.png", "images/guy/guy_03.png", "images/guy/guy_04.png", "images/guy/guy_05.png", "images/guy/guy_06.png", "images/guy/guy_07.png"],
        fixX: [0, 0, 0, 0, 0, 0, 0],
        l: 10
    }, {
        x: 1941,
        y: 611,
        w: 1161,
        h: 614,
        url: "images/pano/p1.png",
        imgs: ["images/tree2/tree2_01.png", "images/tree2/tree2_02.png", "images/tree2/tree2_03.png", "images/tree2/tree2_04.png", "images/tree2/tree2_05.png", "images/tree2/tree2_06.png", "images/tree2/tree2_07.png", "images/tree2/tree2_08.png", "images/tree2/tree2_09.png"],
        l: 10
    }, {
        x: 1036,
        y: 144,
        w: 129,
        h: 319,
        url: "images/pano/p1.png",
        imgs: ["images/label/label_qym.png"],
        l: 10
    }, {
        x: 1036,
        y: 144,
        w: 129,
        h: 100,
        url: "images/pano/p1.png",
        is_tip: 1,
        imgs: ["images/label/press.png"],
        l: 10
    }]
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        a || (a = $("#pop-desc")), o || (o = $("#pop-desc .bd")), a.show(), o.css("background-image", "url(" + r.cdnPath + t + ")"), o.show(), o.css("-webkit-animation", "zoomIn .6s both"), e && (s = $("#desc-video")[0], s.src = r.cdnPath + e, s.preload = "auto", s.load())
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a, o, s, r = i(2),
        l = i(9),
        u = "images/transparent.png";
    $(function() {
        $("#pop-desc s").click(function() {
            $("#pop-desc").hide(), $("#pop-desc .bd").hide().css("-webkit-animation", "none"), s && (s.pause(), $(s).hide(), s = null, l.bgAudio.play())
        }), $("#pop-desc .video-play").click(function() {
            s && (l.bgAudio.pause(), $(s).show(), s.play())
        })
    }), e["default"] = [{
        x: 1374,
        y: 95,
        w: 774,
        h: 492,
        url: "images/pano/p1.png",
        imgs: ["images/jingju/jingju_01.png", "images/jingju/jingju_02.png", "images/jingju/jingju_03.png", "images/jingju/jingju_04.png", "images/jingju/jingju_05.png", "images/jingju/jingju_06.png"],
        fixY: [0, 0, 0, 0, 0, 0],
        fixX: [0, 0, 0, 0, 0, 0],
        l: 10
    }, {
        x: 402,
        y: 515,
        w: 129,
        h: 589,
        url: "images/pano/p1.png",
        imgs: ["images/label/label_gjxmt.png"],
        l: 10
    }, {
        x: 402,
        y: 515,
        w: 129,
        h: 100,
        url: "images/pano/p1.png",
        is_tip: 1,
        imgs: ["images/label/press.png"],
        l: 10
    }, {
        x: 1095,
        y: 692,
        w: 129,
        h: 316,
        url: "images/pano/p1.png",
        imgs: ["images/label/label_hll.png"],
        l: 10
    }, {
        x: 1095,
        y: 692,
        w: 129,
        h: 100,
        url: "images/pano/p1.png",
        is_tip: 1,
        imgs: ["images/label/press.png"],
        l: 10
    }, {
        x: 1645,
        y: 414,
        w: 129,
        h: 271,
        url: "images/pano/p1.png",
        imgs: ["images/label/label_hx.png"],
        l: 10
    }, {
        x: 1645,
        y: 414,
        w: 129,
        h: 100,
        url: "images/pano/p1.png",
        is_tip: 1,
        imgs: ["images/label/press.png"],
        l: 10
    }, {
        x: 402,
        y: 515,
        w: 129,
        h: 589,
        imgs: [u],
        l: 10,
        pop: "images/pop/gjxmt.png",
        onClick: function() {
            location = "slide.html"
        }
    }, {
        x: 1095,
        y: 692,
        w: 129,
        h: 316,
        imgs: [u],
        l: 10,
        pop: "images/pop/hll.png",
        onClick: function() {
            n("images/pop/hll.png")
        }
    }, {
        x: 1645,
        y: 414,
        w: 129,
        h: 271,
        imgs: [u],
        l: 10,
        pop: "images/pop/hx.png",
        onClick: function() {
            n("images/pop/hx.png")
        }
    }, {
        x: 1036,
        y: 144,
        w: 129,
        h: 319,
        imgs: [u],
        l: 10,
        pop: "images/pop/qym.png",
        onClick: function() {
            n("images/pop/qym.png")
        }
    }, {
        x: 2190,
        y: 390,
        w: 129,
        h: 315,
        imgs: [u],
        l: 10,
        pop: "images/pop/wcl.png",
        onClick: function() {
            n("images/pop/wcl.png")
        }
    }, {
        x: 1931,
        y: 53,
        w: 129,
        h: 308,
        imgs: [u],
        l: 10,
        pop: "images/pop/zyq.png",
        onClick: function() {
            n("images/pop/zyq.png")
        }
    }, {
        x: 2580,
        y: 178,
        w: 129,
        h: 366,
        imgs: [u],
        l: 10,
        pop: "images/pop/lbsy.png",
        onClick: function() {
            n("images/pop/lbsy.png")
        }
    }, {
        x: 674,
        y: 10,
        w: 129,
        h: 421,
        imgs: [u],
        l: 10,
        pop: "images/pop/stbwg.png",
        onClick: function() {
            n("images/pop/stbwg.png")
        }
    }]
}, function(t, e, i) {
    "use strict";

    function n() {
        e.bgAudio = o = new Audio, o.preload = "auto", o.loop = !0, o.src = a.cdnPath + "images/1.mp3", o.addEventListener("play", function() {
            $("#music-btn").show()
        }), o.addEventListener("play", function() {
            $("#music-btn").show().removeClass("off")
        }), o.addEventListener("pause", function() {
            $("#music-btn").addClass("off")
        }), $("#music-btn").click(function() {
            $(this).hasClass("off") ? o.play() : o.pause()
        }), o.play()
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.bgAudio = void 0, e["default"] = n;
    var a = i(2),
        o = e.bgAudio = {}
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a(t, e) {
        return t + Math.floor(Math.random() * (e - t) * 100) / 100
    }

    function o(t, e) {
        f["default"].to({
            n: 0
        }, 1, {
            n: 3600,
            ease: f["default"].Quad.In,
            onUpdate: function() {
                t.x = Math.floor(Math.sin(this.curVars.n.num / 180 * Math.PI) * this.curVars.n.num / 1800 * 100) / 100, t.y = Math.floor(Math.sin(this.curVars.n.num / 180 * Math.PI / 2) * this.curVars.n.num / 1800 * 100) / 100, t.updateT()
            },
            onEnd: function() {
                e && e()
            }
        })
    }

    function s(t) {
        f["default"].kill(M);
        for (var e = M.children.length, i = 0; i < e; i++) {
            var n = i < 6 ? a(50, 150) * t : a(150, 250) * t,
                o = a(0, 360),
                s = o / 180 * Math.PI,
                r = 1 == t ? a(-10, 10) : a(-80, 80),
                l = r / 180 * Math.PI,
                u = Math.sin(l) * n,
                h = Math.abs(Math.cos(l) * n);
            M.children[i].position(Math.cos(s) * h, u, Math.sin(s) * h).updateT()
        }
        f["default"].to(M, 1, {
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            ease: f["default"].Quad.Out,
            onUpdate: function() {
                this.target.updateT()
            },
            onEnd: function() {
                f["default"].to(this.target, 1, {
                    scaleX: 0,
                    scaleY: 0,
                    scaleZ: 0,
                    ease: f["default"].Quad.In,
                    onUpdate: function() {
                        this.target.updateT()
                    }
                })
            }
        }), f["default"].fromTo(M, 2, {
            rotationY: 0
        }, {
            rotationY: 360,
            onUpdate: function() {
                this.target.updateT()
            }
        }), f["default"].fromTo(M.children, 2, {
            rotationY: 0
        }, {
            rotationY: -360,
            onUpdate: function() {
                this.target.updateT()
            }
        })
    }

    function r(t) {
        f["default"].kill(t);
        for (var e = t.children.length, i = 0, n = 0; n < e; n++) {
            var r = a(0, 1.5),
                l = a(400, 600),
                u = a(0, 360),
                h = u / 180 * Math.PI,
                d = a(-80, 80),
                c = d / 180 * Math.PI,
                p = Math.sin(c) * l,
                g = Math.abs(Math.cos(c) * l);
            f["default"].to(t.children[n], .7, {
                scaleX: r,
                scaleY: 1.5 - r,
                x: Math.cos(h) * g,
                y: p,
                z: Math.sin(h) * g,
                ease: f["default"].Quad.Out,
                onUpdate: function() {
                    this.target.updateT()
                },
                onEnd: function() {
                    f["default"].to(this.target, 1.5, {
                        scaleX: 0,
                        scaleY: 0,
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: f["default"].Quad.In,
                        onUpdate: function() {
                            this.target.updateT()
                        },
                        onEnd: function() {
                            i++, i >= e && o(t)
                        }
                    })
                }
            })
        }
        f["default"].fromTo(t, 3, {
            rotationY: 0
        }, {
            rotationY: 540,
            onUpdate: function() {
                this.target.updateT()
            }
        }), s(2)
    }

    function l(t) {
        w.addChild(t), f["default"].to(t, .2, {
            scaleX: 1,
            scaleY: 1,
            ease: f["default"].Quad.Out,
            onUpdate: function() {
                this.target.updateT()
            },
            onEnd: function() {
                f["default"].to(this.target, 2, {
                    scaleX: .2,
                    scaleY: .2,
                    ease: f["default"].Quad.In,
                    onUpdate: function() {
                        this.target.updateT()
                    }
                })
            }
        }), f["default"].fromTo(t, 4.4, {
            rotationY: -90
        }, {
            rotationY: 920,
            onUpdate: function() {
                this.target.updateT()
            }
        })
    }

    function u(t, e) {
        w.addChild(t), f["default"].to(t, .2, {
            scaleX: 1,
            scaleY: 1,
            ease: f["default"].Quad.Out,
            onUpdate: function() {
                this.target.updateT()
            },
            onEnd: function() {
                f["default"].to(this.target, 2.3, {
                    scaleX: 0,
                    scaleY: 0,
                    ease: f["default"].Quad.In,
                    onUpdate: function() {
                        this.target.updateT()
                    },
                    onEnd: function() {
                        e && e()
                    }
                })
            }
        })
    }

    function h() {
        w.addChild(b), w.addChild(M), w.addChild(S), O.play()
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = h;
    var d = i(11),
        c = n(d),
        p = i(12),
        f = n(p),
        g = i(13),
        m = n(g),
        _ = i(2),
        v = i(14),
        y = new c["default"].Stage({
            el: $("#load-stage")[0]
        });
    y.size(window.innerWidth, window.innerHeight).update();
    var w = new c["default"].Sprite;
    w.position(0, 0, -620).visibility({
        alpha: 1
    }).update(), y.addChild(w);
    var b = new c["default"].Sprite;
    b.position(0, 0, 0).update();
    for (var x = 0; x < 8; x++) {
        var T = new c["default"].Plane;
        T.size(90, 102).rotation(a(-180, 180), a(-180, 180), a(-180, 180)).scale(.01).material({
            image: _.cdnPath + "images/loading/proload_8_png.png"
        }).update(), b.addChild(T)
    }
    var M = new c["default"].Sprite;
    M.position(0, 0, 0).scale(.01).update();
    for (var j = [{
            w: 65,
            h: 55,
            url: _.cdnPath + "images/loading/proload_0_png.png"
        }, {
            w: 93,
            h: 71,
            url: _.cdnPath + "images/loading/proload_1_png.png"
        }, {
            w: 20,
            h: 58,
            url: _.cdnPath + "images/loading/proload_2_png.png"
        }, {
            w: 29,
            h: 43,
            url: _.cdnPath + "images/loading/proload_3_png.png"
        }, {
            w: 31,
            h: 22,
            url: _.cdnPath + "images/loading/proload_4_png.png"
        }, {
            w: 29,
            h: 20,
            url: _.cdnPath + "images/loading/proload_5_png.png"
        }, {
            w: 34,
            h: 92,
            url: _.cdnPath + "images/loading/proload_6_png.png"
        }, {
            w: 203,
            h: 90,
            url: _.cdnPath + "images/loading/proload_7_png.png"
        }], x = 0; x < 15; x++) {
        var P = x < 5 ? x % 3 : (x - 3) % 3 + 3,
            T = new c["default"].Plane;
        T.size(j[P].w, j[P].h).scale(.5).material({
            image: j[P].url
        }).update(), M.addChild(T)
    }
    var k = [{
            w: 200,
            h: 100,
            url: _.cdnPath + "images/loading/proload_cloud1_png.png"
        }, {
            w: 200,
            h: 100,
            url: _.cdnPath + "images/loading/proload_cloud2_png.png"
        }, {
            w: 200,
            h: 100,
            url: _.cdnPath + "images/loading/proload_cloud3_png.png"
        }],
        S = new c["default"].Sprite;
    S.position(0, 0, 0).scale(.01).update();
    for (var x = 0; x < 9; x++) {
        var P = x % 3,
            T = new c["default"].Plane;
        T.size(k[P].w, k[P].h).scale(.5).material({
            image: k[P].url
        }).update(), S.addChild(T)
    }
    var z = c["default"].create({
            type: "sprite",
            scale: [1],
            children: [{
                type: "plane",
                size: [191, 148],
                material: [{
                    image: _.cdnPath + "images/loading/logo.png"
                }]
            }]
        }),
        C = c["default"].create({
            type: "sprite",
            scale: [.1],
            children: [{
                type: "plane",
                size: [470, 203],
                material: [{
                    image: _.cdnPath + "images/loading/title1.png"
                }]
            }]
        }),
        Y = c["default"].create({
            type: "sprite",
            scale: [.1],
            children: [{
                type: "plane",
                size: [460, 179],
                material: [{
                    image: _.cdnPath + "images/loading/title2.png"
                }]
            }]
        });
    w.addChild(z);
    var O = m["default"].create();
    O.add("l1", 0), O.add(function() {
        l(z)
    }, "l1"), O.add(function() {
        z.remove(), r(b), u(C)
    }, "l1+=3"), O.add(function() {
        C.remove(), r(b), u(Y, function() {
            b.remove(), M.remove(), S.remove(), Y.remove(), $("#load-stage").remove(), $(".load-page").remove(), setTimeout(function() {
                (0, v.start)()
            }, 100)
        })
    }, "l1+=6")
}, function(t, e, i) {
    var n, a;
    (function(i) {
        "use strict";
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
        };
        ! function(s) {
            var r = "object" == ("undefined" == typeof self ? "undefined" : o(self)) && self.self == self && self || "object" == ("undefined" == typeof i ? "undefined" : o(i)) && i.global == i && i;
            n = [e], a = function(t) {
                r.C3D = s(r, t)
            }.apply(e, n), !(void 0 !== a && (t.exports = a))
        }(function(t, e) {
            function i(t) {
                return Math.round(t)
            }

            function n(t) {
                return Math.round(100 * t) / 100
            }

            function a(t) {
                return t.replace(/\b(\w)|\s(\w)/g, function(t) {
                    return t.toUpperCase()
                })
            }

            function s(t) {
                var i;
                switch (t.type) {
                    case "sprite":
                        i = new e.Sprite(t.el ? {
                            el: t.el
                        } : void 0);
                        break;
                    case "plane":
                        i = new e.Plane(t.el ? {
                            el: t.el
                        } : void 0);
                        break;
                    case "box":
                        i = new e.Box(t.el ? {
                            el: t.el
                        } : void 0);
                        break;
                    case "skybox":
                        i = new e.Skybox(t.el ? {
                            el: t.el
                        } : void 0)
                }
                if (void 0 != t.size && i.size.apply(i, t.size), void 0 != t.position && i.position.apply(i, t.position), void 0 != t.rotation && i.rotation.apply(i, t.rotation), void 0 != t.scale && i.scale.apply(i, t.scale), void 0 != t.origin && i.origin.apply(i, t.origin), void 0 != t.visibility && i.visibility.apply(i, t.visibility), void 0 != t.material && i.material.apply(i, t.material), void 0 != t.filter && i.filter.apply(i, t.filter), void 0 != t.name && i.name.apply(i, [t.name]), i.update(), t.children)
                    for (var n = 0, a = t.children.length; n < a; n++) {
                        var o = t.children[n],
                            r = s(o);
                        i.addChild(r)
                    }
                return i
            }
            var r = function d(t) {
                    var d = [];
                    for (var e in t) d.push(e);
                    return d
                },
                l = function(t) {
                    var e = arguments.length;
                    if (e < 2 || null == t) return t;
                    for (var i = 1; i < e; i++)
                        for (var n = arguments[i], a = r(n), o = a.length, s = 0; s < o; s++) {
                            var l = a[s];
                            t[l] = n[l]
                        }
                    return t
                },
                u = function(t, e) {
                    var i, n = this;
                    i = t && Object.prototype.hasOwnProperty.call(t, "constructor") ? t.constructor : function() {
                        return n.apply(this, arguments)
                    }, l(i, n, e);
                    var a = function() {
                        this.constructor = i
                    };
                    return a.prototype = n.prototype, i.prototype = new a, t && l(i.prototype, t), i.__super__ = n.prototype, i
                },
                h = "";
            return function() {
                var t = document.createElement("div"),
                    e = ["Webkit", "Moz", "Ms", "O"];
                for (var i in e)
                    if (e[i] + "Transform" in t.style) {
                        h = e[i];
                        break
                    }
            }(), e.getRandomColor = function() {
                return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).slice(-6)
            }, e.rgb2hex = function(t, e, i) {
                return (t << 16 | e << 8 | i).toString(16)
            }, e.hex2rgb = function(t) {
                var e = Math.floor("0x" + t),
                    i = e >> 16 & 255,
                    n = e >> 8 & 255,
                    a = 255 & e;
                return [i, n, a]
            }, e.Object = function() {
                this.initialize.apply(this, arguments)
            }, l(e.Object.prototype, {
                x: 0,
                y: 0,
                z: 0,
                position: function(t, e, i) {
                    switch (arguments.length) {
                        case 1:
                            this.x = t, this.y = t, this.z = t;
                            break;
                        case 2:
                            this.x = t, this.y = e;
                            break;
                        case 3:
                            this.x = t, this.y = e, this.z = i
                    }
                    return this
                },
                move: function(t, e, i) {
                    switch (arguments.length) {
                        case 1:
                            this.x += t, this.y += t, this.z += t;
                            break;
                        case 2:
                            this.x += t, this.y += e;
                            break;
                        case 3:
                            this.x += t, this.y += e, this.z += i
                    }
                    return this
                },
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                rotation: function(t, e, i) {
                    switch (arguments.length) {
                        case 1:
                            this.rotationX = t, this.rotationY = t, this.rotationZ = t;
                            break;
                        case 2:
                            this.rotationX = t, this.rotationY = e;
                            break;
                        case 3:
                            this.rotationX = t, this.rotationY = e, this.rotationZ = i
                    }
                    return this
                },
                rotate: function(t, e, i) {
                    switch (arguments.length) {
                        case 1:
                            this.rotationX += t, this.rotationY += t, this.rotationZ += t;
                            break;
                        case 2:
                            this.rotationX += t, this.rotationY += e;
                            break;
                        case 3:
                            this.rotationX += t, this.rotationY += e, this.rotationZ += i
                    }
                    return this
                },
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
                scale: function(t, e, i) {
                    switch (arguments.length) {
                        case 1:
                            this.scaleX = t, this.scaleY = t, this.scaleZ = t;
                            break;
                        case 2:
                            this.scaleX = t, this.scaleY = e;
                            break;
                        case 3:
                            this.scaleX = t, this.scaleY = e, this.scaleZ = i
                    }
                    return this
                },
                width: 0,
                height: 0,
                depth: 0,
                size: function(t, e, i) {
                    switch (arguments.length) {
                        case 1:
                            this.width = t, this.height = t, this.depth = t;
                            break;
                        case 2:
                            this.width = t, this.height = e;
                            break;
                        case 3:
                            this.width = t, this.height = e, this.depth = i
                    }
                    return this
                },
                originX: 0,
                originY: 0,
                originZ: 0,
                __orgO: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                __orgT: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                __orgF: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                origin: function(t, e, i) {
                    switch (arguments.length) {
                        case 1:
                            this.originX = t, this.originY = t, this.originZ = t;
                            break;
                        case 2:
                            this.originX = t, this.originY = e;
                            break;
                        case 3:
                            this.originX = t, this.originY = e, this.originZ = i
                    }
                    return this
                },
                __name: "",
                name: function(t) {
                    return this.__name = t, "" == t ? delete this.el.dataset.name : this.el.dataset.name = t, this
                },
                __sort: ["X", "Y", "Z"],
                sort: function(t, e, i) {
                    if (arguments.length > 3) throw "sort arguments is wrong!";
                    return this.__sort = [t, e, i], this
                },
                initialize: function() {
                    this.x = 0, this.y = 0, this.z = 0, this.rotationX = 0, this.rotationY = 0, this.rotationZ = 0, this.scaleX = 1, this.scaleY = 1, this.scaleZ = 1, this.width = 0, this.height = 0, this.depth = 0, this.originX = "50%", this.originY = "50%", this.originZ = "0px", this.__orgO = {
                        x: "50%",
                        y: "50%",
                        z: "0px"
                    }, this.__orgT = {
                        x: "-50%",
                        y: "-50%",
                        z: "0px"
                    }, this.__orgF = {
                        x: 0,
                        y: 0,
                        z: 0
                    }, this.children = [], this.__name = ""
                },
                parent: null,
                children: null,
                addChild: function(t) {
                    if (null != t.parent && t.parent.removeChild(t), "" != t.__name) {
                        if (void 0 !== this[t.__name]) throw t.__name + " already exist!";
                        this[t.__name] = t
                    }
                    return this.children.push(t), t.parent = this, this
                },
                removeChild: function(t) {
                    for (var e = this.children.length - 1; e >= 0; e--)
                        if (this.children[e] === t) return "" != t.__name && delete this[t.__name], this.children.splice(e, 1), t.parent = null, this;
                    return this
                },
                removeAllChild: function() {
                    for (var t = this.children.length - 1; t >= 0; t--) {
                        var e = this.children[t];
                        "" != e.__name && delete this[e.__name], e.parent = null
                    }
                    return this.children = [], this
                },
                remove: function() {
                    return null != this.parent && this.parent.removeChild(this), this
                }
            }), e.Object.extend = u, e.Sprite = e.Object.extend({
                el: null,
                alpha: 1,
                visible: !0,
                initialize: function(t) {
                    e.Sprite.__super__.initialize.apply(this, [t]), this.alpha = 1, this.visible = !0;
                    var i;
                    if (t && t.el) switch (o(t.el)) {
                        case "string":
                            i = document.createElement("div"), i.innerHTML = t.el;
                            break;
                        case "object":
                            1 === t.el.nodeType && (i = t.el)
                    }
                    i || (i = document.createElement("div")), i.style.position = "absolute", i.style[h + "Transform"] = "translateZ(0px)", i.style[h + "TransformStyle"] = "preserve-3d", this.el = i, i.le = this
                },
                update: function() {
                    return this.updateS(), this.updateM(), this.updateO(), this.updateT(), this.updateV(), this
                },
                updateS: function() {
                    return this
                },
                updateM: function() {
                    if (!this.__mat) return this;
                    for (var t in this.__mat) switch (t) {
                        case "bothsides":
                            this.el.style[h + "BackfaceVisibility"] = this.__mat[t] ? "visible" : "hidden";
                            break;
                        case "image":
                            this.el.style["background" + a(t)] = "" !== this.__mat[t] ? "url(" + this.__mat[t] + ")" : "";
                            break;
                        default:
                            this.el.style["background" + a(t)] = this.__mat[t]
                    }
                    return this
                },
                updateO: function() {
                    if ("number" == typeof this.originX) {
                        var t = i(this.originX - this.__orgF.x);
                        this.__orgO.x = t + "px", this.__orgT.x = -t + "px"
                    } else this.__orgO.x = this.originX, this.__orgT.x = "-" + this.originX;
                    if ("number" == typeof this.originY) {
                        var e = i(this.originY - this.__orgF.y);
                        this.__orgO.y = e + "px", this.__orgT.y = -e + "px"
                    } else this.__orgO.y = this.originY, this.__orgT.y = "-" + this.originY;
                    if ("number" == typeof this.originZ) {
                        var n = i(this.originZ - this.__orgF.z);
                        this.__orgO.z = n + "px", this.__orgT.z = -n + "px"
                    } else this.__orgO.z = this.__orgT.z = "0px";
                    return this.el.style[h + "TransformOrigin"] = this.__orgO.x + " " + this.__orgO.y + " " + this.__orgO.z, this
                },
                updateT: function() {
                    var t = this.__sort[0],
                        e = this.__sort[1],
                        i = this.__sort[2];
                    return this.el.style[h + "Transform"] = "translate3d(" + this.__orgT.x + ", " + this.__orgT.y + ", " + this.__orgT.z + ") translate3d(" + n(this.x) + "px," + n(this.y) + "px," + n(this.z) + "px) rotate" + t + "(" + n(this["rotation" + t]) % 360 + "deg) rotate" + e + "(" + n(this["rotation" + e]) % 360 + "deg) rotate" + i + "(" + n(this["rotation" + i]) % 360 + "deg) scale3d(" + n(this.scaleX) + ", " + n(this.scaleY) + ", " + n(this.scaleZ) + ") ", this
                },
                updateV: function() {
                    return this.el.style.opacity = this.alpha, this.el.style.display = this.visible ? "block" : "none", this
                },
                addChild: function(t) {
                    return e.Sprite.__super__.addChild.apply(this, [t]), this.el && t.el && this.el.appendChild(t.el), this
                },
                removeChild: function(t) {
                    for (var e = this.children.length - 1; e >= 0; e--)
                        if (this.children[e] === t) return "" != t.__name && delete this[t.__name], this.children.splice(e, 1), t.parent = null, this.el.removeChild(t.el), this;
                    return this
                },
                removeAllChild: function() {
                    for (var t = this.children.length - 1; t >= 0; t--) {
                        var e = this.children[t];
                        "" != e.__name && delete this[e.__name], e.parent = null, this.el.removeChild(e.el)
                    }
                    return this.children = [], this
                },
                on: function(t) {
                    if ("object" === ("undefined" == typeof t ? "undefined" : o(t)))
                        for (var e in t) this.el.addEventListener(e, t[e], !1);
                    else 2 === arguments.length ? this.el.addEventListener(arguments[0], arguments[1], !1) : 3 === arguments.length && this.el.addEventListener(arguments[0], arguments[1], arguments[2]);
                    return this
                },
                off: function(t) {
                    if ("object" === ("undefined" == typeof t ? "undefined" : o(t)))
                        for (var e in t) this.el.removeEventListener(e, t[e], !1);
                    else 2 === arguments.length && this.el.removeEventListener(arguments[0], arguments[1], !1);
                    return this
                },
                buttonMode: function(t) {
                    return t ? this.el.style.cursor = "pointer" : this.el.style.cursor = "auto", this
                },
                __mat: null,
                material: function(t) {
                    return this.__mat = t, this
                },
                visibility: function(t) {
                    return void 0 !== t.visible && (this.visible = t.visible), void 0 !== t.alpha && (this.alpha = t.alpha), this
                }
            }), e.Stage = e.Sprite.extend({
                camera: null,
                fov: null,
                __rfix: null,
                __pfix: null,
                initialize: function(t) {
                    e.Stage.__super__.initialize.apply(this, [t]), t && t.el || (this.el.style.top = "0px", this.el.style.left = "0px", this.el.style.width = "0px", this.el.style.height = "0px"), this.el.style[h + "Perspective"] = "800px", this.el.style[h + "TransformStyle"] = "flat", this.el.style[h + "Transform"] = "", this.el.style.overflow = "hidden", this.__rfix = new e.Sprite, this.el.appendChild(this.__rfix.el), this.__pfix = new e.Sprite, this.__rfix.el.appendChild(this.__pfix.el), this.setCamera(new e.Camera)
                },
                updateS: function() {
                    return this.el.style.width = i(this.width) + "px", this.el.style.height = i(this.height) + "px", this
                },
                updateT: function() {
                    return this.fov = i(.5 / Math.tan(.5 * this.camera.fov / 180 * Math.PI) * this.height), this.el.style[h + "Perspective"] = this.fov + "px", this.__rfix.position(i(this.width / 2), i(this.height / 2), this.fov).rotation(-this.camera.rotationX, -this.camera.rotationY, -this.camera.rotationZ).updateT(), this.__pfix.position(-this.camera.x, -this.camera.y, -this.camera.z).updateT(), this
                },
                addChild: function(t) {
                    return this.__pfix.addChild(t), this
                },
                removeChild: function(t) {
                    return this.__pfix.removeChild(t), this
                },
                setCamera: function(t) {
                    return this.camera && (this.camera.stage = null), this.camera = t, this.camera.stage = this, this
                }
            }), e.Camera = e.Object.extend({
                fov: null,
                stage: null,
                initialize: function(t) {
                    e.Camera.__super__.initialize.apply(this, [t]), this.fov = 75
                },
                update: function() {
                    return this.updateT(), this
                },
                updateS: function() {
                    return this
                },
                updateM: function() {
                    return this
                },
                updateT: function() {
                    return this.stage && this.stage.updateT(), this
                },
                updateV: function() {
                    return this
                }
            }), e.Plane = e.Sprite.extend({
                initialize: function(t) {
                    e.Plane.__super__.initialize.apply(this, [t])
                },
                update: function() {
                    return e.Plane.__super__.update.apply(this), this.updateF(), this
                },
                updateS: function() {
                    return this.el.style.width = i(this.width) + "px", this.el.style.height = i(this.height) + "px", this
                },
                updateF: function() {
                    if (!this.__flt) return this;
                    var t = "";
                    for (var e in this.__flt) t += "" !== this.__flt[e] ? e + "(" + this.__flt[e].join(",") + ")" : "";
                    return "" !== t && (this.el.style[h + "Filter"] = t), this
                },
                __flt: null,
                filter: function(t) {
                    return this.__flt = t, this
                }
            }), e.Box = e.Sprite.extend({
                front: null,
                back: null,
                left: null,
                right: null,
                up: null,
                down: null,
                initialize: function(t) {
                    e.Box.__super__.initialize.apply(this, [t]), this.front = new e.Plane, this.front.name = "front", this.addChild(this.front), this.back = new e.Plane, this.back.name = "back", this.addChild(this.back), this.left = new e.Plane, this.left.name = "left", this.addChild(this.left), this.right = new e.Plane, this.right.name = "right", this.addChild(this.right), this.up = new e.Plane, this.up.name = "up", this.addChild(this.up), this.down = new e.Plane, this.down.name = "down", this.addChild(this.down)
                },
                update: function() {
                    return e.Box.__super__.update.apply(this), this.updateF(), this
                },
                updateS: function() {
                    var t = i(this.width),
                        e = i(this.height),
                        n = i(this.depth);
                    return this.__orgF.x = this.width / 2, this.__orgF.y = this.height / 2, this.__orgF.z = this.depth / 2, this.front.size(t, e, 0).position(0, 0, n / 2).rotation(0, 0, 0).updateS().updateT(), this.back.size(t, e, 0).position(0, 0, -n / 2).rotation(0, 180, 0).updateS().updateT(), this.left.size(n, e, 0).position(-t / 2, 0, 0).rotation(0, -90, 0).updateS().updateT(), this.right.size(n, e, 0).position(t / 2, 0, 0).rotation(0, 90, 0).updateS().updateT(), this.up.size(t, n, 0).position(0, -e / 2, 0).rotation(90, 0, 0).updateS().updateT(), this.down.size(t, n, 0).position(0, e / 2, 0).rotation(-90, 0, 0).updateS().updateT(), this
                },
                updateM: function() {
                    if (!this.__mat) return this;
                    var t = !0;
                    for (var e in this.__mat) switch (e) {
                        case "front":
                        case "back":
                        case "left":
                        case "right":
                        case "up":
                        case "down":
                            void 0 == this.__mat[e].bothsides && (this.__mat[e].bothsides = !1), this[e].material(this.__mat[e]).updateM(), t = !1
                    }
                    return t && (void 0 == this.__mat.bothsides && (this.__mat.bothsides = !1), this.front.material(this.__mat).updateM(), this.back.material(this.__mat).updateM(), this.left.material(this.__mat).updateM(), this.right.material(this.__mat).updateM(), this.up.material(this.__mat).updateM(), this.down.material(this.__mat).updateM()), this
                },
                updateF: function() {
                    return this.__flt ? (this.front.filter(this.__flt).updateF(), this.back.filter(this.__flt).updateF(), this.left.filter(this.__flt).updateF(), this.right.filter(this.__flt).updateF(), this.up.filter(this.__flt).updateF(), this.down.filter(this.__flt).updateF(), this) : this
                },
                __flt: null,
                filter: function(t) {
                    return this.__flt = t, this
                }
            }), e.Skybox = e.Box.extend({
                updateS: function() {
                    var t = i(this.width),
                        e = i(this.height),
                        n = i(this.depth);
                    return this.__orgF.x = this.width / 2, this.__orgF.y = this.height / 2, this.__orgF.z = this.depth / 2, this.front.size(t, e, 0).position(0, 0, -n / 2).rotation(0, 0, 0).updateS().updateT(), this.back.size(t, e, 0).position(0, 0, n / 2).rotation(0, 180, 0).updateS().updateT(), this.left.size(n, e, 0).position(-t / 2, 0, 0).rotation(0, 90, 0).updateS().updateT(), this.right.size(n, e, 0).position(t / 2, 0, 0).rotation(0, -90, 0).updateS().updateT(), this.up.size(t, n, 0).position(0, -e / 2, 0).rotation(-90, 0, 0).updateS().updateT(), this.down.size(t, n, 0).position(0, e / 2, 0).rotation(90, 0, 0).updateS().updateT(), this
                }
            }), e.create = function(t) {
                var e;
                switch ("undefined" == typeof t ? "undefined" : o(t)) {
                    case "array":
                        e = {
                            type: "sprite",
                            children: t
                        };
                        break;
                    case "object":
                        e = t;
                        break;
                    default:
                        return
                }
                return s(e)
            }, e
        })
    }).call(e, function() {
        return this
    }())
}, function(t, e, i) {
    var n, a;
    (function(i) {
        "use strict";
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
        };
        ! function(s) {
            var r = "object" == ("undefined" == typeof self ? "undefined" : o(self)) && self.self == self && self || "object" == ("undefined" == typeof i ? "undefined" : o(i)) && i.global == i && i;
            n = [e], a = function(t) {
                r.JT = s(r, t)
            }.apply(e, n), !(void 0 !== a && (t.exports = a))
        }(function(t, e) {
            function i(t, e) {
                for (var i in e) t[i] = e[i]
            }

            function n(t, e) {
                if ("function" == typeof t) e.call(t, 0, t);
                else if (void 0 === t.length) e.call(t, 0, t);
                else
                    for (var i = 0; i < t.length; i++) e.call(t[i], i, t[i])
            }

            function a(t) {
                return t.replace(/([A-Z])/g, "-$1").toLowerCase()
            }

            function s(t) {
                return t.replace(/\b(\w)|\s(\w)/g, function(t) {
                    return t.toUpperCase()
                })
            }

            function r(t) {
                return Math.round(1e3 * t) / 1e3
            }

            function l(t) {
                return t ? q + s(t) : q
            }

            function u(t) {
                if (!t) throw "target is undefined, can't tween!!!";
                return "string" == typeof t ? "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t) : t
            }

            function h(t, e) {
                return "rotation" == e || "scale" == e ? e : void 0 !== t._jt_obj[e] ? e : void 0 !== t.style[e] ? e : (e = l(e), void 0 !== t.style[e] ? e : void 0)
            }

            function d(t, e, i, n) {
                var a = {};
                if (e instanceof Array) {
                    a.num = [];
                    for (var o in e) {
                        var s = c(t, e[o]);
                        a.num[o] = s.num, a.unit = s.unit
                    }
                    void 0 != i && (n ? a.num.push(i.num) : a.num.unshift(i.num))
                } else a = c(t, e);
                return a
            }

            function c(t, e) {
                var i = f(e);
                "rem" == t.unit && "rem" != i.unit ? (T(), t.num = r(t.num * R), t.unit = "px") : "rem" != t.unit && "rem" == i.unit && (T(), t.num = r(t.num / R), t.unit = "rem");
                var n;
                switch (i.ext) {
                    case "+=":
                        n = t.num + i.num;
                        break;
                    case "-=":
                        n = t.num - i.num;
                        break;
                    default:
                        n = i.num
                }
                return {
                    num: n,
                    unit: i.unit || t.unit
                }
            }

            function p(t) {
                void 0 == t._jt_obj && (t._jt_obj = {
                    perspective: 0,
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: 0,
                    scaleX: 1,
                    scaleY: 1,
                    scaleZ: 1,
                    skewX: 0,
                    skewY: 0
                })
            }

            function f(t) {
                var e = /(\+=|-=|)(-|)(\d+\.\d+|\d+)(e[+-]?[0-9]{0,2}|)(rem|px|%|)/i,
                    i = e.exec(t);
                return i ? {
                    num: r(i[2] + i[3] + i[4]),
                    unit: i[5],
                    ext: i[1]
                } : {
                    num: 0,
                    unit: "px",
                    ext: ""
                }
            }

            function g(t) {
                return /\S\s+\S/g.test(t) || !/\d/g.test(t)
            }

            function m(t, e) {
                switch (e) {
                    case "perspective":
                    case "x":
                    case "y":
                    case "z":
                    case "rotationX":
                    case "rotationY":
                    case "rotationZ":
                    case "scaleX":
                    case "scaleY":
                    case "scaleZ":
                    case "skewX":
                    case "skewY":
                        return t._jt_obj[e];
                    case "rotation":
                        return t._jt_obj.rotationZ;
                    case "scale":
                        return t._jt_obj.scaleX;
                    default:
                        return _(t, e)
                }
            }

            function _(t, e) {
                if (t.style[e]) return t.style[e];
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    var i = a(e),
                        n = document.defaultView.getComputedStyle(t, "");
                    return n && n.getPropertyValue(i)
                }
                return t.currentStyle ? t.currentStyle[e] : null
            }

            function v(t, e, i) {
                switch (e) {
                    case "perspective":
                    case "x":
                    case "y":
                    case "z":
                    case "rotationX":
                    case "rotationY":
                    case "rotationZ":
                    case "scaleX":
                    case "scaleY":
                    case "scaleZ":
                    case "skewX":
                    case "skewY":
                        return t._jt_obj[e] = i, !0;
                    case "rotation":
                        return t._jt_obj.rotationZ = i, !0;
                    case "scale":
                        return t._jt_obj.scaleX = i, t._jt_obj.scaleY = i, !0;
                    default:
                        return y(t, e, i), !1
                }
            }

            function y(t, e, i) {
                t.style[e] = i
            }

            function w(t) {
                return "object" === ("undefined" == typeof t ? "undefined" : o(t)) && 1 === t.nodeType
            }

            function b(t) {
                var e = "";
                t._jt_obj.perspective && (e += "perspective(" + t._jt_obj.perspective + ") "), (t._jt_obj.x || t._jt_obj.y || t._jt_obj.z) && (e += "translate3d(" + x(t._jt_obj.x) + "," + x(t._jt_obj.y) + "," + x(t._jt_obj.z) + ") "), t._jt_obj.rotationX && (e += "rotateX(" + t._jt_obj.rotationX % 360 + "deg) "), t._jt_obj.rotationY && (e += "rotateY(" + t._jt_obj.rotationY % 360 + "deg) "), t._jt_obj.rotationZ && (e += "rotateZ(" + t._jt_obj.rotationZ % 360 + "deg) "), 1 == t._jt_obj.scaleX && 1 == t._jt_obj.scaleY && 1 == t._jt_obj.scaleZ || (e += "scale3d(" + t._jt_obj.scaleX + ", " + t._jt_obj.scaleY + ", " + t._jt_obj.scaleZ + ") "), (t._jt_obj.skewX || t._jt_obj.skewY) && (e += "skew(" + t._jt_obj.skewX + "deg," + t._jt_obj.skewY + "deg) "), t.style[l("transform")] = e
            }

            function x(t) {
                return t + ("number" == typeof t ? "px" : "")
            }

            function T() {
                U || (U = document.createElement("div"), U.style.cssText = "border:0 solid; position:absolute; line-height:0px;"), Z || (Z = document.getElementsByTagName("body")[0]), Z.appendChild(U), U.style.borderLeftWidth = "1rem", R = parseFloat(U.offsetWidth), Z.removeChild(U)
            }

            function M() {
                $ = !0;
                var t = V.length,
                    e = B.length;
                if (0 === t && 0 === e) return void($ = !1);
                var i = F(),
                    n = i - D;
                D = i;
                for (var a = 0; a < t; a++) {
                    var o = V[a];
                    o && !o._update(n) && (o.isActive && (o.isActive = !1, V.splice(a, 1), o.onEnd && o.onEnd.apply(o, o.onEndParams)), a--, t--)
                }
                for (var s = 0; s < e; s++) {
                    var r = B[s];
                    r && !r._update(n) && (B.splice(s, 1), r.onEnd && r.onEnd.apply(r, r.onEndParams), s--, e--)
                }
                L(M)
            }

            function j() {
                this.initialize.apply(this, arguments)
            }

            function P(t, e) {
                var i = u(t),
                    a = V.length;
                n(i, function(t, i) {
                    for (var n = a - 1; n >= 0; n--) {
                        var o = V[n];
                        o.target === i && o[e]()
                    }
                })
            }

            function k(t) {
                for (var e = V.length, i = e - 1; i >= 0; i--) {
                    var n = V[i];
                    n[t]()
                }
            }

            function S() {
                this.initialize.apply(this, arguments)
            }

            function z(t, e) {
                var i = t,
                    a = B.length;
                n(i, function(t, i) {
                    for (var n = a - 1; n >= 0; n--) {
                        var o = B[n];
                        o.onEnd === i && o[e]()
                    }
                })
            }

            function C(t) {
                for (var e = B.length, i = e - 1; i >= 0; i--) {
                    var n = B[i];
                    n[t]()
                }
            }

            function Y(t) {
                t.bezier && (O(t, t.bezier), t.interpolation = E, delete t.bezier), t.through && (O(t, t.through), t.interpolation = A, delete t.through), t.linear && (O(t, t.linear), t.interpolation = X, delete t.linear)
            }

            function O(t, e) {
                for (var i in e)
                    for (var n in e[i]) 0 == i ? t[n] = [e[i][n]] : t[n].push(e[i][n])
            }

            function X(t, e) {
                var i = t.length - 1,
                    n = i * e,
                    a = Math.floor(n),
                    o = Q.Linear;
                return e < 0 ? o(t[0], t[1], n) : e > 1 ? o(t[i], t[i - 1], i - n) : o(t[a], t[a + 1 > i ? i : a + 1], n - a)
            }

            function E(t, e) {
                var i, n = 0,
                    a = t.length - 1,
                    o = Math.pow,
                    s = Q.Bernstein;
                for (i = 0; i <= a; i++) n += o(1 - e, a - i) * o(e, i) * t[i] * s(a, i);
                return n
            }

            function A(t, e) {
                var i = t.length - 1,
                    n = i * e,
                    a = Math.floor(n),
                    o = Q.Through;
                return t[0] === t[i] ? (e < 0 && (a = Math.floor(n = i * (1 + e))), o(t[(a - 1 + i) % i], t[a], t[(a + 1) % i], t[(a + 2) % i], n - a)) : e < 0 ? t[0] - (o(t[0], t[0], t[1], t[1], -n) - t[0]) : e > 1 ? t[i] - (o(t[i], t[i], t[i - 1], t[i - 1], n - i) - t[i]) : o(t[a ? a - 1 : 0], t[a], t[i < a + 1 ? i : a + 1], t[i < a + 2 ? i : a + 2], n - a)
            }
            Date.now = Date.now || function() {
                return (new Date).getTime()
            };
            var I = Date.now(),
                F = function() {
                    return Date.now() - I
                },
                q = "";
            ! function() {
                var t = document.createElement("div"),
                    e = ["Webkit", "Moz", "Ms", "O"];
                for (var i in e)
                    if (e[i] + "Transform" in t.style) {
                        q = e[i];
                        break
                    }
            }();
            var Z, U, R, L = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    window.setTimeout(t, 1e3 / 60)
                },
                V = [],
                $ = !1,
                D = 0;
            i(j.prototype, {
                initialize: function(t, i, n, a, o) {
                    this.fromVars = n, this.curVars = {}, this.toVars = a, this.target = t, this.duration = 1e3 * Math.max(i, 0), this.ease = a.ease || e.Linear.None, this.delay = 1e3 * Math.max(a.delay || 0, 0), this.yoyo = a.yoyo || !1, this.repeat = this.curRepeat = Math.floor(a.repeat || 0), this.repeatDelay = 1e3 * Math.max(a.repeatDelay || 0, 0), this.onStart = a.onStart || null, this.onStartParams = a.onStartParams || [], this.onRepeat = a.onRepeat || null, this.onRepeatParams = a.onRepeatParams || [], this.onEnd = a.onEnd || null, this.onEndParams = a.onEndParams || [], this.onUpdate = a.onUpdate || null, this.onUpdateParams = a.onUpdateParams || [], this.isPlaying = a.isPlaying || !0, this.interpolation = a.interpolation || null, this.isActive = a.isActive || !0, this.isReverse = !1, this.isDom = o, this.curTime = 0, this.isStart = !1, this.startTime = this.delay, this.endTime = this.startTime + this.repeatDelay + this.duration, 0 != this.delay && (this._updateProp(), this.onUpdate && this.onUpdate.apply(this, this.onUpdateParams)), this.isActive && this._addSelf()
                },
                _update: function(t) {
                    if (!this.isPlaying) return !0;
                    if (this.curTime += t, this.curTime < this.startTime) return !0;
                    if (this.isStart || (this.curTime += this.repeatDelay), this.curTime < this.startTime + this.repeatDelay) return !0;
                    if (this.curTime < this.endTime) this._updateProp(), this.onUpdate && this.onUpdate.apply(this, this.onUpdateParams);
                    else {
                        if (0 == this.curRepeat) return this._updateProp(), this.onUpdate && this.onUpdate.apply(this, this.onUpdateParams), this._checkStart(), !1;
                        this.yoyo && (this.isReverse = !this.isReverse);
                        var e = (this.curTime - this.endTime) % (this.duration + this.repeatDelay);
                        0 == this.repeatDelay ? (this.curTime = this.startTime + e, this._updateProp()) : (this._updateProp(), this.curTime = this.startTime + e), this.onUpdate && this.onUpdate.apply(this, this.onUpdateParams), this.onRepeat && this.onRepeat.apply(this, this.onRepeatParams), this.curRepeat > 0 && this.curRepeat--
                    }
                    return this._checkStart(), !0
                },
                _checkStart: function() {
                    this.isStart || (this.isStart = !0, this.onStart && this.onStart.apply(this, this.onStartParams))
                },
                _updateProp: function() {
                    var t = 0 == this.duration ? 1 : (this.curTime - this.startTime - this.repeatDelay) / this.duration;
                    t = Math.max(0, Math.min(1, t)), this.isReverse && (t = 1 - t);
                    var e = this.ease(t),
                        i = !1;
                    for (var n in this.fromVars) {
                        var a, o = this.fromVars[n],
                            s = this.toVars[n];
                        a = s.num instanceof Array ? this.interpolation(s.num, e) : o.num + (s.num - o.num) * e, a = r(a), this.curVars[n] = {
                            num: a,
                            unit: s.unit
                        }, this.isDom ? (Math.abs(s.num - o.num) > 20 && (a = Math.round(a)), v(this.target, n, a + (s.unit || 0)) && (i = !0)) : this.target[n] = a + (s.unit || 0)
                    }
                    i && b(this.target)
                },
                _toEnd: function() {
                    var t = !1;
                    for (var e in this.fromVars) {
                        var i = this.toVars[e],
                            n = r(i.num);
                        this.curVars[e] = {
                            num: n,
                            unit: i.unit
                        }, this.isDom ? v(this.target, e, n + (i.unit || 0)) && (t = !0) : this.target[e] = n + (i.unit || 0)
                    }
                    t && b(this.target)
                },
                _addSelf: function() {
                    this.isActive = !0, V.push(this), $ || (D = e.now(), M())
                },
                _removeSelf: function() {
                    this.isActive = !1;
                    var t = V.indexOf(this);
                    t !== -1 && V.splice(t, 1)
                },
                active: function() {
                    this._addSelf()
                },
                play: function() {
                    this.isPlaying = !0
                },
                pause: function() {
                    this.isPlaying = !1
                },
                kill: function(t) {
                    this._removeSelf(), t && (this._toEnd(), this.onEnd && this.onEnd.apply(this, this.onEndParams))
                }
            }), i(e, {
                get: function(t, e) {
                    var i = u(t);
                    if (void 0 !== i.length && (i = i[0]), w(i)) {
                        p(i);
                        var n = h(i, e);
                        return n ? m(i, n) : null
                    }
                    return i[e]
                },
                set: function(t, e) {
                    var i = u(t);
                    n(i, function(t, i) {
                        if (w(i)) {
                            p(i);
                            var n = !1;
                            for (var a in e) {
                                var o = h(i, a);
                                if (o)
                                    if (g(e[a])) v(i, o, e[a]);
                                    else {
                                        var s = d(f(m(i, o)), e[a]);
                                        v(i, o, s.num + (s.unit || 0)) && (n = !0)
                                    }
                            }
                            n && b(i)
                        } else
                            for (var r in e) {
                                var s = d(f(i[r]), e[r]);
                                i[r] = s.num + (s.unit || 0)
                            }
                    })
                },
                fromTo: function(t, e, i, a) {
                    Y(a);
                    var o = u(t),
                        s = [];
                    return n(o, function(t, n) {
                        var o = {},
                            r = {},
                            l = w(n);
                        if (l) {
                            p(n);
                            for (var u in a) {
                                var c = h(n, u);
                                if (c) {
                                    var g = f(m(n, c));
                                    o[c] = d(g, i[u]), r[c] = d(g, a[u], o[c], !1)
                                } else r[u] = a[u]
                            }
                        } else
                            for (var u in a)
                                if (void 0 !== n[u]) {
                                    var g = f(n[u]);
                                    o[u] = d(g, i[u]), r[u] = d(g, a[u], o[u], !1)
                                } else r[u] = a[u];
                        var _ = new j(n, e, o, r, l);
                        s.push(_)
                    }), 1 == s.length ? s[0] : s
                },
                from: function(t, e, i) {
                    Y(i);
                    var a = u(t),
                        o = [];
                    return n(a, function(t, n) {
                        var a = {},
                            s = {},
                            r = w(n);
                        if (r) {
                            p(n);
                            for (var l in i) {
                                var u = h(n, l);
                                if (u) {
                                    var c = f(m(n, u));
                                    a[u] = d(c, i[l], c, !0), s[u] = c
                                } else s[l] = i[l]
                            }
                        } else
                            for (var l in i)
                                if (void 0 !== n[l]) {
                                    var c = f(n[l]);
                                    a[l] = d(c, i[l], c, !0), s[l] = c
                                } else s[l] = i[l];
                        var g = new j(n, e, a, s, r);
                        o.push(g)
                    }), 1 == o.length ? o[0] : o
                },
                to: function(t, e, i) {
                    Y(i);
                    var a = u(t),
                        o = [];
                    return n(a, function(t, n) {
                        var a = {},
                            s = {},
                            r = w(n);
                        if (r) {
                            p(n);
                            for (var l in i) {
                                var u = h(n, l);
                                if (u) {
                                    var c = f(m(n, u));
                                    a[u] = c, s[u] = d(c, i[l], c, !1)
                                } else s[l] = i[l]
                            }
                        } else
                            for (var l in i)
                                if (void 0 !== n[l]) {
                                    var c = f(n[l]);
                                    a[l] = c, s[l] = d(c, i[l], c, !1)
                                } else s[l] = i[l];
                        var g = new j(n, e, a, s, r);
                        o.push(g)
                    }), 1 == o.length ? o[0] : o
                },
                kill: function(t, e) {
                    var i = u(t);
                    n(i, function(t, i) {
                        for (var n = V.length, a = n - 1; a >= 0; a--) {
                            var o = V[a];
                            o.target === i && o.kill(e)
                        }
                    })
                },
                killAll: function(t) {
                    for (var e = V.length, i = e - 1; i >= 0; i--) {
                        var n = V[i];
                        n.kill(t)
                    }
                },
                play: function(t) {
                    P(t, "play")
                },
                playAll: function() {
                    k("play")
                },
                pause: function(t) {
                    P(t, "pause")
                },
                pauseAll: function() {
                    k("pause")
                },
                isTweening: function(t) {
                    var e = u(t);
                    e = e[0] || e;
                    for (var i = V.length, n = i - 1; n >= 0; n--) {
                        var a = V[n];
                        if (a.target === e) return !0
                    }
                    return !1
                }
            });
            var B = [];
            i(S.prototype, {
                initialize: function(t, e, i, n) {
                    this.delay = 1e3 * t, this.onEnd = e || null, this.onEndParams = i || [], this.curTime = 0, this.endTime = this.delay, this.isPlaying = n || !0, 0 != this.delay ? this._addSelf() : this.onEnd && this.onEnd.apply(this, this.onEndParams)
                },
                _update: function(t) {
                    return !this.isPlaying || (this.curTime += t, this.curTime < this.endTime)
                },
                _addSelf: function() {
                    B.push(this), $ || (D = e.now(), M())
                },
                _removeSelf: function() {
                    var t = B.indexOf(this);
                    t !== -1 && B.splice(t, 1)
                },
                play: function() {
                    this.isPlaying = !0
                },
                pause: function() {
                    this.isPlaying = !1
                },
                kill: function(t) {
                    this._removeSelf(), t && (this._toEnd(), this.onEnd && this.onEnd.apply(this, this.onEndParams))
                }
            }), i(e, {
                call: function(t, e, i, n) {
                    return new S(t, e, i, n)
                },
                killCall: function(t, e) {
                    var i = t,
                        a = B.length;
                    n(i, function(t, i) {
                        for (var n = a - 1; n >= 0; n--) {
                            var o = B[n];
                            o.onEnd === i && o.kill(e)
                        }
                    })
                },
                killAllCalls: function(t) {
                    for (var e = B.length, i = e - 1; i >= 0; i--) {
                        var n = B[i];
                        n.kill(t)
                    }
                },
                playCall: function(t) {
                    z(t, "play")
                },
                playAllCalls: function() {
                    C("play")
                },
                pauseCall: function(t) {
                    z(t, "pause")
                },
                pauseAllCalls: function() {
                    C("pause")
                }
            }), i(e, {
                path: function(t) {
                    Y(t);
                    for (var i, n = t.ease || e.Linear.None, a = t.step || 1, o = [], s = 0; s <= a; s++) {
                        i = n(s / a);
                        var r = {};
                        for (var l in t) t[l] instanceof Array && (r[l] = t.interpolation(t[l], i));
                        o.push(r)
                    }
                    return o
                }
            });
            var Q = {
                Linear: function(t, e, i) {
                    return (e - t) * i + t
                },
                Bernstein: function(t, e) {
                    var i = Q.Factorial;
                    return i(t) / i(e) / i(t - e)
                },
                Factorial: function() {
                    var t = [1];
                    return function(e) {
                        var i, n = 1;
                        if (t[e]) return t[e];
                        for (i = e; i > 1; i--) n *= i;
                        return t[e] = n
                    }
                }(),
                Through: function(t, e, i, n, a) {
                    var o = .5 * (i - t),
                        s = .5 * (n - e),
                        r = a * a,
                        l = a * r;
                    return (2 * e - 2 * i + o + s) * l + (-3 * e + 3 * i - 2 * o - s) * r + o * a + e
                }
            };
            return i(e, {
                Linear: {
                    None: function(t) {
                        return t
                    }
                },
                Quad: {
                    In: function(t) {
                        return t * t
                    },
                    Out: function(t) {
                        return t * (2 - t)
                    },
                    InOut: function(t) {
                        return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
                    }
                },
                Cubic: {
                    In: function(t) {
                        return t * t * t
                    },
                    Out: function(t) {
                        return --t * t * t + 1
                    },
                    InOut: function(t) {
                        return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                    }
                },
                Quart: {
                    In: function(t) {
                        return t * t * t * t
                    },
                    Out: function(t) {
                        return 1 - --t * t * t * t
                    },
                    InOut: function(t) {
                        return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
                    }
                },
                Quint: {
                    In: function(t) {
                        return t * t * t * t * t
                    },
                    Out: function(t) {
                        return --t * t * t * t * t + 1
                    },
                    InOut: function(t) {
                        return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                    }
                },
                Sine: {
                    In: function(t) {
                        return 1 - Math.cos(t * Math.PI / 2)
                    },
                    Out: function(t) {
                        return Math.sin(t * Math.PI / 2)
                    },
                    InOut: function(t) {
                        return .5 * (1 - Math.cos(Math.PI * t))
                    }
                },
                Expo: {
                    In: function(t) {
                        return 0 === t ? 0 : Math.pow(1024, t - 1)
                    },
                    Out: function(t) {
                        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                    },
                    InOut: function(t) {
                        return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
                    }
                },
                Circ: {
                    In: function(t) {
                        return 1 - Math.sqrt(1 - t * t)
                    },
                    Out: function(t) {
                        return Math.sqrt(1 - --t * t)
                    },
                    InOut: function(t) {
                        return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                    }
                },
                Elastic: {
                    In: function(t) {
                        var e, i = .1,
                            n = .4;
                        return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)))
                    },
                    Out: function(t) {
                        var e, i = .1,
                            n = .4;
                        return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / n) + 1)
                    },
                    InOut: function(t) {
                        var e, i = .1,
                            n = .4;
                        return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * (i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * .5 + 1)
                    }
                },
                Back: {
                    In: function(t) {
                        var e = 1.70158;
                        return t * t * ((e + 1) * t - e)
                    },
                    Out: function(t) {
                        var e = 1.70158;
                        return --t * t * ((e + 1) * t + e) + 1
                    },
                    InOut: function(t) {
                        var e = 2.5949095;
                        return (t *= 2) < 1 ? .5 * (t * t * ((e + 1) * t - e)) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
                    }
                },
                Bounce: {
                    In: function(t) {
                        return 1 - e.Bounce.Out(1 - t)
                    },
                    Out: function(t) {
                        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                    },
                    InOut: function(t) {
                        return t < .5 ? .5 * e.Bounce.In(2 * t) : .5 * e.Bounce.Out(2 * t - 1) + .5
                    }
                }
            }), e.now = F, e
        })
    }).call(e, function() {
        return this
    }())
}, function(t, e, i) {
    var n, a;
    (function(o) {
        "use strict";
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
        };
        ! function(r) {
            var l = "object" == ("undefined" == typeof self ? "undefined" : s(self)) && self.self == self && self || "object" == ("undefined" == typeof o ? "undefined" : s(o)) && o.global == o && o;
            n = [i(12), e], a = function(t, e) {
                l.JTL = r(l, e, t)
            }.apply(e, n), !(void 0 !== a && (t.exports = a))
        }(function(t, e, i) {
            function n(t, e) {
                for (var i in e) t[i] = e[i]
            }

            function a(t) {
                var e = /(^[a-zA-Z]\w*|)(\+=|-=|)(\d*\.\d*|\d*)/,
                    i = e.exec(t);
                return {
                    label: i[1],
                    ext: i[2],
                    num: parseFloat(i[3])
                }
            }

            function o() {
                h = !0;
                var t = u.length;
                if (0 === t) return void(h = !1);
                var e = i.now(),
                    n = e - d;
                d = e;
                for (var a = t - 1; a >= 0; a--) u[a]._update(n);
                l(o)
            }

            function r() {
                this.initialize.apply(this, arguments)
            }
            var l = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    window.setTimeout(t, 1e3 / 60)
                },
                u = [],
                h = !1,
                d = 0;
            return n(r.prototype, {
                initialize: function() {
                    this.labels = [], this.labelTime = 0, this.anchors = [], this.anchorId = 0, this.tweens = [], this.isPlaying = !1, this.curTime = 0
                },
                _update: function(t) {
                    this.isPlaying && (this.curTime += t, this._checkHandler())
                },
                _addSelf: function() {
                    u.push(this), h || (d = i.now(), o())
                },
                _removeSelf: function() {
                    var t = u.indexOf(this);
                    t !== -1 && u.splice(t, 1)
                },
                _checkHandler: function() {
                    var t = this.anchors.length;
                    if (this.anchorId >= t) return this._removeSelf(), void(this.isPlaying = !1);
                    var e = this.anchors[this.anchorId];
                    this.curTime >= 1e3 * e.time && (this.anchorId == t - 1 ? (this._removeSelf(), this.isPlaying = !1, e.handler.apply()) : (e.handler.apply(), this.anchorId++, this._checkHandler()))
                },
                _parseTweenTime: function(t, e, i) {
                    var n = Math.max(t, 0),
                        a = Math.max(e.delay || 0, 0),
                        o = Math.max(0, Math.floor(e.repeat || 0)),
                        s = Math.max(e.repeatDelay || 0, 0),
                        r = a + n + (s + n) * o,
                        l = this._parsePosition(i);
                    return this.labelTime = Math.max(this.labelTime, l + r), l
                },
                _parsePosition: function(t) {
                    if (void 0 == t) return this.labelTime;
                    var e = a(t),
                        i = 0;
                    if (e.label) switch (i = this.getLabelTime(e.label), e.ext) {
                        case "+=":
                            i += e.num;
                            break;
                        case "-=":
                            i -= e.num
                    } else i = e.num;
                    return i
                },
                _addAnchor: function(t, e) {
                    var i = this.anchors.length;
                    if (0 == i) return void this.anchors.push({
                        time: e,
                        handler: t
                    });
                    if (i > 0)
                        for (var n = i - 1; n >= 0; n--) {
                            var a = this.anchors[n];
                            if (e >= a.time) return void this.anchors.splice(n + 1, 0, {
                                time: e,
                                handler: t
                            })
                        }
                },
                _addTween: function(t) {
                    if (void 0 != t.length)
                        for (var e in t) this.tweens.push(t[e]);
                    else this.tweens.push(t)
                },
                _removeTween: function(t) {
                    var e = this.tweens.indexOf(t);
                    e !== -1 && this.tweens.splice(e, 1)
                },
                fromTo: function(t, e, n, a, o) {
                    var s = this,
                        r = a.onEnd;
                    a.onEnd = function(t) {
                        s._removeTween(this), r && r.apply(this, t)
                    };
                    var l = function() {
                            var o = i.fromTo(t, e, n, a);
                            s._addTween(o)
                        },
                        u = this._parseTweenTime(e, a, o);
                    return this._addAnchor(l, u), this
                },
                from: function(t, e, n, a) {
                    var o = this,
                        s = n.onEnd;
                    n.onEnd = function(t) {
                        o._removeTween(this), s && s.apply(this, t)
                    };
                    var r = function() {
                            var a = i.from(t, e, n);
                            o._addTween(a)
                        },
                        l = this._parseTweenTime(e, n, a);
                    return this._addAnchor(r, l), this
                },
                to: function(t, e, n, a) {
                    var o = this,
                        s = n.onEnd;
                    n.onEnd = function(t) {
                        o._removeTween(this), s && s.apply(this, t)
                    };
                    var r = function() {
                            var a = i.to(t, e, n);
                            o._addTween(a)
                        },
                        l = this._parseTweenTime(e, n, a);
                    return this._addAnchor(r, l), this
                },
                kill: function(t, e) {
                    var n = function() {
                            i.kill(t, !0)
                        },
                        a = this._parseTweenTime(0, {}, e);
                    return this._addAnchor(n, a), this
                },
                add: function(t, e) {
                    var i = this._parsePosition(e);
                    switch ("undefined" == typeof t ? "undefined" : s(t)) {
                        case "function":
                            this._addAnchor(t, i);
                            break;
                        case "string":
                            this.addLabel(t, i);
                            break;
                        default:
                            throw "add action is wrong!!!"
                    }
                    return this
                },
                addLabel: function(t, e) {
                    this.removeLabel(t);
                    var i = this._parsePosition(e);
                    return this.labels.push({
                        name: t,
                        time: i
                    }), this
                },
                removeLabel: function(t) {
                    for (var e = this.labels.length, i = e - 1; i >= 0; i--) {
                        var n = this.labels[i];
                        if (t == n.name) return this.labels.splice(i, 1), this
                    }
                    return this
                },
                getLabelTime: function(t) {
                    for (var e = this.labels.length, i = e - 1; i >= 0; i--) {
                        var n = this.labels[i];
                        if (t == n.name) return n.time
                    }
                    return this.labelTime
                },
                totalTime: function() {
                    return this.labelTime
                },
                play: function(t) {
                    this.isPlaying && this.pause();
                    for (var e = this.tweens.length, i = e - 1; i >= 0; i--) this.tweens[i].play();
                    this._addSelf(), this.isPlaying = !0, void 0 !== t && this.seek(t)
                },
                pause: function() {
                    if (this.isPlaying) {
                        for (var t = this.tweens.length, e = t - 1; e >= 0; e--) this.tweens[e].pause();
                        this._removeSelf(), this.isPlaying = !1
                    }
                },
                seek: function(t) {
                    var e = this._parsePosition(t);
                    this.curTime = 1e3 * e;
                    for (var i = this.anchors.length, n = 0; n < i; n++) {
                        var a = this.anchors[n];
                        if (1e3 * a.time >= this.curTime) return void(this.anchorId = n)
                    }
                },
                clear: function() {
                    for (var t = this.tweens.length, e = t - 1; e >= 0; e--) this.tweens[e].kill();
                    this.tweens = [], this.curTime = 0, this.labels = [], this.labelTime = 0, this.anchors = [], this.anchorId = 0
                }
            }), n(e, {
                create: function() {
                    return new r
                },
                kill: function(t) {
                    t.clear()
                }
            }), e
        })
    }).call(e, function() {
        return this
    }())
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        h = (0, w["default"])(j["default"], 397), A.addChild(h), d = (0, w["default"])(k["default"], 387), A.addChild(d), c = (0, w["default"])(z["default"], 367), A.addChild(c), p = (0, w["default"])(Y["default"], 357), A.addChild(p), f = (0, w["default"])(X["default"], 347), A.addChild(f), lt(function() {
            (0, x["default"])(A, I, l, h, d, c, p, f);
            var t = new v["default"];
            t.handler = function(t) {
                F.lon = -t.lon, F.lat = t.lat
            }, t.init()
        })
    }

    function o() {
        I.name("panoBg").position(0, 0, 0).update(), A.addChild(I);
        for (var t = [-4, -4, -4], e = 0; e < R; e++) {
            var i = new m["default"].Plane,
                n = -360 / R * e,
                a = n / 180 * Math.PI,
                o = D,
                s = 0;
            t[e] && (s += t[e]), i.size(V, L.h).position(Math.sin(a) * o, s, Math.cos(a) * o).rotation(0, n + 180, 0).visibility({
                alpha: 1
            }).material({
                image: T.cdnPath + "images/bg/" + (e + 1) + ".png",
                bothsides: !1
            }).update(), I.addChild(i)
        }
    }

    function s() {
        K = r(H.x - B.x), tt = r(H.y - B.y), et = r(H.x - Q.x), it = r(H.y - Q.y), nt = (G - J) / 1e3, "" == W && (Math.abs(et) > Math.abs(it) ? W = "x" : Math.abs(et) < Math.abs(it) && (W = "y")), U && (Z.lon = (Z.lon - .2 * et) % 360, Z.lat = Math.max(-90, Math.min(90, Z.lat + .2 * it)))
    }

    function r(t) {
        return Math.floor(100 * t) / 100
    }

    function l() {
        var t = (F.lon + q.lon + Z.lon) % 360,
            e = .35 * (F.lat + q.lat + Z.lat);
        t - I.rotationY > 180 && (I.rotationY += 360), t - I.rotationY < -180 && (I.rotationY -= 360);
        var i = t - I.rotationY,
            n = e - I.rotationX;
        Math.abs(i) < .1 ? I.rotationY = t : I.rotationY += .3 * i, Math.abs(n) < .1 ? I.rotationX = e : I.rotationX += .15 * n, I.updateT(), u(h, t, e), u(d, t, e, .2), u(c, t, e, .15), u(p, t, e, .1), u(f, t, e, .06);
        var a = -350 - 20 * Math.abs(i);
        A.z += .1 * (a - A.z), A.updateT(), ot = lt(l)
    }

    function u(t, e, i, n) {
        n = n || .25, e - t.rotationY > 180 && (t.rotationY += 360), e - t.rotationY < -180 && (t.rotationY -= 360);
        var a = e - t.rotationY,
            o = i - t.rotationX;
        Math.abs(a) < .1 ? t.rotationY = e : t.rotationY += n * a, Math.abs(o) < .1 ? t.rotationX = i : t.rotationX += .15 * o, t.updateT()
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.requestAnimationFrame = void 0, e.start = a;
    var h, d, c, p, f, g = i(11),
        m = n(g),
        _ = i(15),
        v = n(_),
        y = i(16),
        w = n(y),
        b = i(17),
        x = n(b),
        T = i(2),
        M = i(4),
        j = n(M),
        P = i(5),
        k = n(P),
        S = i(6),
        z = n(S),
        C = i(7),
        Y = n(C),
        O = i(8),
        X = n(O),
        E = new m["default"].Stage({
            el: $("#stage")[0]
        });
    E.size(window.innerWidth, window.innerHeight).update();
    var A = new m["default"].Sprite;
    A.position(0, 0, -200).visibility({
        alpha: 0
    }).update(), E.addChild(A);
    var I = new m["default"].Sprite,
        F = {
            lat: 0,
            lon: 0
        },
        q = {
            lon: 0,
            lat: 0
        },
        Z = {
            lon: 25,
            lat: 0
        },
        U = !0,
        R = 20,
        L = {
            w: 2580,
            h: 1170
        },
        V = L.w / R,
        D = 403;
    o();
    var B = {
            x: 0,
            y: 0
        },
        Q = {
            x: 0,
            y: 0
        },
        H = {
            x: 0,
            y: 0
        },
        W = "",
        N = 0,
        J = 0,
        G = 0,
        K = 0,
        tt = 0,
        et = 0,
        it = 0,
        nt = 0,
        at = function(t) {
            W = "", t = t.changedTouches[0], B.x = Q.x = H.x = t.clientX, B.y = Q.y = H.y = t.clientY, N = J = G = Date.now(), K = tt = et = it = 0, E.on("touchmove", st), E.on("touchend", rt)
        };
    E.on("touchstart", at);
    var ot, st = function(t) {
            return t = t.changedTouches[0], H.x = t.clientX, H.y = t.clientY, G = Date.now(), s(), Q.x = H.x, Q.y = H.y, J = G, !1
        },
        rt = function ut() {
            G = Date.now();
            E.off("touchmove", st), E.off("touchend", ut)
        },
        lt = e.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
            setTimeout(t, 1e3 / 60)
        };
    window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
}, function(t, e, i) {
    (function(e) {
        "use strict";
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
        };
        ! function(n) {
            var a = "object" == ("undefined" == typeof self ? "undefined" : i(self)) && self.self == self && self || "object" == ("undefined" == typeof e ? "undefined" : i(e)) && e.global == e && e;
            t.exports = n(a, {})
        }(function(t, e) {
            function i(t, e) {
                for (var i in e) t[i] = e[i]
            }
            return e = function() {
                this.initialize.apply(this, arguments)
            }, i(e.prototype, {
                lon: 0,
                lat: 0,
                direction: 0,
                fix: 0,
                os: "",
                initialize: function() {
                    switch (this.lon = 0, this.lat = 0, this.direction = window.orientation || 0, this.direction) {
                        case 0:
                            this.fix = 0;
                            break;
                        case 90:
                            this.fix = -270;
                            break;
                        case -90:
                            this.fix = -90
                    }
                    navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? this.os = "ios" : this.os = navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") ? "android" : ""
                },
                init: function() {
                    this._orient = this.orientHandler.bind(this), window.addEventListener("deviceorientation", this._orient, !1), this._change = this.changeHandler.bind(this), window.addEventListener("orientationchange", this._change, !1)
                },
                destroy: function() {
                    window.removeEventListener("deviceorientation", this._orient, !1), window.removeEventListener("orientationchange", this._change, !1)
                },
                changeHandler: function(t) {
                    this.direction = window.orientation
                },
                orientHandler: function(t) {
                    switch (this.os) {
                        case "ios":
                            switch (this.direction) {
                                case 0:
                                    this.lon = t.alpha + t.gamma, t.beta > 0 && (this.lat = t.beta - 90);
                                    break;
                                case 90:
                                    t.gamma < 0 ? this.lon = t.alpha - 90 : this.lon = t.alpha - 270, t.gamma > 0 ? this.lat = 90 - t.gamma : this.lat = -90 - t.gamma;
                                    break;
                                case -90:
                                    t.gamma < 0 ? this.lon = t.alpha - 90 : this.lon = t.alpha - 270, t.gamma < 0 ? this.lat = 90 + t.gamma : this.lat = -90 + t.gamma
                            }
                            break;
                        case "android":
                            switch (this.direction) {
                                case 0:
                                    this.lon = t.alpha + t.gamma + 30, t.gamma > 90 ? this.lat = 90 - t.beta : this.lat = t.beta - 90;
                                    break;
                                case 90:
                                    this.lon = t.alpha - 230, t.gamma > 0 ? this.lat = 270 - t.gamma : this.lat = -90 - t.gamma;
                                    break;
                                case -90:
                                    this.lon = t.alpha - 180, this.lat = -90 + t.gamma
                            }
                    }
                    this.lon += this.fix, this.lon %= 360, this.lon < 0 && (this.lon += 360), this.lon = Math.round(this.lon), this.lat = Math.round(this.lat), this.handler && this.handler.apply(this, [{
                        a: Math.round(t.alpha),
                        b: Math.round(t.beta),
                        g: Math.round(t.gamma),
                        lon: this.lon,
                        lat: this.lat,
                        dir: this.direction
                    }])
                }
            }), e
        })
    }).call(e, function() {
        return this
    }())
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = function(t, e) {
        var i = e || d;
        r++;
        var n = new o["default"].Sprite;
        return n.name("panoItems" + r).position(0, 0, 0).update(), $.each(t, function(t, e) {
            var a = e,
                r = Math.floor(a.x / h),
                d = Math.floor((a.x + a.w) / h),
                c = (a.x % h, new o["default"].Sprite);
            c.visibility({
                alpha: 0
            }).updateV();
            for (var p = r; d >= p; p++)
                if ("undefined" != typeof a.imgs[p - r]) {
                    var f = new o["default"].Plane,
                        g = -360 / l * p,
                        m = g / 180 * Math.PI,
                        _ = i,
                        v = (Math.cos(m) * _).toFixed(5) - 0,
                        y = g + 180,
                        w = (Math.sin(m) * _).toFixed(5) - 0,
                        b = a.y + a.h / 2 - u.h / 2;
                    a.fixX && a.fixX[p - r] && (w += a.fixX[p - r]), a.fixY && a.fixY[p - r] && (b += a.fixY[p - r]), f.size(h, a.h).position(w, b, v).rotation(0, y, 0), a.imgs[p - r] && f.material({
                        image: s.cdnPath + a.imgs[p - r],
                        bothsides: !1
                    });
                    var x = .159 * i / 64.3;
                    f.scale(x), f.update(), c.addChild(f)
                }
            var T = -360 / l * (d + r) / 2 + 180,
                M = T / 180 * Math.PI,
                j = a.l;
            c.position(Math.sin(M) * j, 0, Math.cos(M) * j).updateT(), a.onClick && c.on("click", function() {
                a.onClick()
            }), a.is_tip && $(c.el).addClass("click-tip"), n.addChild(c)
        }), n
    };
    var a = i(11),
        o = n(a),
        s = i(2),
        r = 0,
        l = 20,
        u = {
            w: 2580,
            h: 1170
        },
        h = u.w / l,
        d = 406
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }

    function a() {
        for (var t = ["gjxmt", "hll", "hx", "qym", "wcl", "zyq", "lbsy", "stbwg"], e = 0; e < t.length; e++) {
            var i = new Image;
            i.src = u.cdnPath + "images/pop/" + t[e] + ".png"
        }
        i = null
    }

    function o(t, e, i, n, o, r, u, h) {
        l["default"].fromTo(t, 4, {
            z: -2200
        }, {
            z: -300,
            ease: l["default"].Quad.Out,
            onUpdate: function() {
                this.target.updateT()
            },
            onStart: function() {
                this.target.visibility({
                    alpha: 1
                }).updateV()
            },
            onEnd: function() {
                i(), $("#wraper").removeClass("loading"), a()
            }
        }), l["default"].fromTo(e, 4, {
            rotationY: -720
        }, {
            rotationY: 25,
            ease: l["default"].Quad.Out,
            onUpdate: function() {
                this.target.updateT()
            },
            onEnd: function() {}
        });
        for (var d = 0, c = e.children.length; c > d; d++) l["default"].from(e.children[d], .5, {
            x: 0,
            z: 0,
            scaleX: 0,
            scaleY: 0,
            delay: .05 * d,
            ease: l["default"].Quad.Out,
            onUpdate: function() {
                this.target.updateT()
            },
            onStart: function() {
                this.target.visibility({
                    alpha: 1
                }).updateV()
            }
        });
        s(n, 1), s(o, 1.5), s(r, 2), s(u, 2.5), s(h, 3)
    }

    function s(t, e) {
        e = e || 0, l["default"].fromTo(t, 1, {
            scaleX: .01,
            scaleY: .01,
            scaleZ: .01
        }, {
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            delay: e,
            ease: l["default"].Quad.Out,
            onUpdate: function() {
                this.target.updateT()
            },
            onStart: function() {
                if ("panoItems1" == t.__name)
                    for (var e = 0, i = t.children.length; i > e; e++) 0 != e && t.children[e].visibility({
                        alpha: 1
                    }).updateV();
                else
                    for (var e = 0, i = t.children.length; i > e; e++) t.children[e].visibility({
                        alpha: 1
                    }).updateV()
            },
            onEnd: function() {
                "panoItems1" == t.__name && t.children[0].visibility({
                    alpha: 1
                }).updateV()
            }
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = o;
    var r = i(12),
        l = n(r),
        u = i(2)
}]);