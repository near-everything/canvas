!(function () {
  "use strict";
  var e,
    n,
    t,
    r = {},
    o = {};
  function u(e) {
    var n = o[e];
    if (void 0 !== n) return n.exports;
    var t = (o[e] = { id: e, loaded: !1, exports: {} });
    return r[e].call(t.exports, t, t.exports, u), (t.loaded = !0), t.exports;
  }
  (u.m = r),
    (u.amdO = {}),
    (e = []),
    (u.O = function (n, t, r, o) {
      if (!t) {
        var i = 1 / 0;
        for (l = 0; l < e.length; l++) {
          (t = e[l][0]), (r = e[l][1]), (o = e[l][2]);
          for (var f = !0, c = 0; c < t.length; c++)
            (!1 & o || i >= o) &&
            Object.keys(u.O).every(function (e) {
              return u.O[e](t[c]);
            })
              ? t.splice(c--, 1)
              : ((f = !1), o < i && (i = o));
          if (f) {
            e.splice(l--, 1);
            var a = r();
            void 0 !== a && (n = a);
          }
        }
        return n;
      }
      o = o || 0;
      for (var l = e.length; l > 0 && e[l - 1][2] > o; l--) e[l] = e[l - 1];
      e[l] = [t, r, o];
    }),
    (u.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return u.d(n, { a: n }), n;
    }),
    (t = Object.getPrototypeOf
      ? function (e) {
          return Object.getPrototypeOf(e);
        }
      : function (e) {
          return e.__proto__;
        }),
    (u.t = function (e, r) {
      if ((1 & r && (e = this(e)), 8 & r)) return e;
      if ("object" == typeof e && e) {
        if (4 & r && e.__esModule) return e;
        if (16 & r && "function" == typeof e.then) return e;
      }
      var o = Object.create(null);
      u.r(o);
      var i = {};
      n = n || [null, t({}), t([]), t(t)];
      for (var f = 2 & r && e; "object" == typeof f && !~n.indexOf(f); f = t(f))
        Object.getOwnPropertyNames(f).forEach(function (n) {
          i[n] = function () {
            return e[n];
          };
        });
      return (
        (i.default = function () {
          return e;
        }),
        u.d(o, i),
        o
      );
    }),
    (u.d = function (e, n) {
      for (var t in n)
        u.o(n, t) &&
          !u.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: n[t] });
    }),
    (u.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (u.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (u.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (u.nmd = function (e) {
      return (e.paths = []), e.children || (e.children = []), e;
    }),
    (function () {
      u.b = document.baseURI || self.location.href;
      var e = { 666: 0 };
      u.O.j = function (n) {
        return 0 === e[n];
      };
      var n = function (n, t) {
          var r,
            o,
            i = t[0],
            f = t[1],
            c = t[2],
            a = 0;
          if (
            i.some(function (n) {
              return 0 !== e[n];
            })
          ) {
            for (r in f) u.o(f, r) && (u.m[r] = f[r]);
            if (c) var l = c(u);
          }
          for (n && n(t); a < i.length; a++)
            (o = i[a]), u.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return u.O(l);
        },
        t = (self.webpackChunknear_bos_webcomponent =
          self.webpackChunknear_bos_webcomponent || []);
      t.forEach(n.bind(null, 0)), (t.push = n.bind(null, t.push.bind(t)));
    })(),
    (u.nc = void 0);
})();
