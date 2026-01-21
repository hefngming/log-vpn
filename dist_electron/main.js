var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/platform/node/globalThis.js
var _globalThis;
var init_globalThis = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/platform/node/globalThis.js"() {
    _globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/platform/node/index.js
var init_node = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/platform/node/index.js"() {
    init_globalThis();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/platform/index.js
var init_platform = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/platform/index.js"() {
    init_node();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/version.js
var VERSION;
var init_version = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/version.js"() {
    VERSION = "1.9.0";
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/internal/semver.js
function _makeCompatibilityCheck(ownVersion) {
  var acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
  var rejectedVersions = /* @__PURE__ */ new Set();
  var myVersionMatch = ownVersion.match(re);
  if (!myVersionMatch) {
    return function() {
      return false;
    };
  }
  var ownVersionParsed = {
    major: +myVersionMatch[1],
    minor: +myVersionMatch[2],
    patch: +myVersionMatch[3],
    prerelease: myVersionMatch[4]
  };
  if (ownVersionParsed.prerelease != null) {
    return function isExactmatch(globalVersion) {
      return globalVersion === ownVersion;
    };
  }
  function _reject(v) {
    rejectedVersions.add(v);
    return false;
  }
  function _accept(v) {
    acceptedVersions.add(v);
    return true;
  }
  return function isCompatible2(globalVersion) {
    if (acceptedVersions.has(globalVersion)) {
      return true;
    }
    if (rejectedVersions.has(globalVersion)) {
      return false;
    }
    var globalVersionMatch = globalVersion.match(re);
    if (!globalVersionMatch) {
      return _reject(globalVersion);
    }
    var globalVersionParsed = {
      major: +globalVersionMatch[1],
      minor: +globalVersionMatch[2],
      patch: +globalVersionMatch[3],
      prerelease: globalVersionMatch[4]
    };
    if (globalVersionParsed.prerelease != null) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major !== globalVersionParsed.major) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major === 0) {
      if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    }
    if (ownVersionParsed.minor <= globalVersionParsed.minor) {
      return _accept(globalVersion);
    }
    return _reject(globalVersion);
  };
}
var re, isCompatible;
var init_semver = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/internal/semver.js"() {
    init_version();
    re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
    isCompatible = _makeCompatibilityCheck(VERSION);
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js
function registerGlobal(type, instance, diag3, allowOverride) {
  var _a;
  if (allowOverride === void 0) {
    allowOverride = false;
  }
  var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
    version: VERSION
  };
  if (!allowOverride && api[type]) {
    var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
    diag3.error(err.stack || err.message);
    return false;
  }
  if (api.version !== VERSION) {
    var err = new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + VERSION);
    diag3.error(err.stack || err.message);
    return false;
  }
  api[type] = instance;
  diag3.debug("@opentelemetry/api: Registered a global for " + type + " v" + VERSION + ".");
  return true;
}
function getGlobal(type) {
  var _a, _b;
  var globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
  if (!globalVersion || !isCompatible(globalVersion)) {
    return;
  }
  return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
function unregisterGlobal(type, diag3) {
  diag3.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + VERSION + ".");
  var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
  if (api) {
    delete api[type];
  }
}
var major, GLOBAL_OPENTELEMETRY_API_KEY, _global;
var init_global_utils = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js"() {
    init_platform();
    init_version();
    init_semver();
    major = VERSION.split(".")[0];
    GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
    _global = _globalThis;
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js
function logProxy(funcName, namespace, args) {
  var logger = getGlobal("diag");
  if (!logger) {
    return;
  }
  args.unshift(namespace);
  return logger[funcName].apply(logger, __spreadArray([], __read(args), false));
}
var __read, __spreadArray, DiagComponentLogger;
var init_ComponentLogger = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js"() {
    init_global_utils();
    __read = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error3) {
        e = { error: error3 };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    __spreadArray = function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    DiagComponentLogger = /** @class */
    (function() {
      function DiagComponentLogger2(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      DiagComponentLogger2.prototype.debug = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("debug", this._namespace, args);
      };
      DiagComponentLogger2.prototype.error = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("error", this._namespace, args);
      };
      DiagComponentLogger2.prototype.info = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("info", this._namespace, args);
      };
      DiagComponentLogger2.prototype.warn = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("warn", this._namespace, args);
      };
      DiagComponentLogger2.prototype.verbose = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("verbose", this._namespace, args);
      };
      return DiagComponentLogger2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/types.js
var DiagLogLevel;
var init_types = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/types.js"() {
    (function(DiagLogLevel2) {
      DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
      DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
      DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
      DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
      DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
      DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
      DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
    })(DiagLogLevel || (DiagLogLevel = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js
function createLogLevelDiagLogger(maxLevel, logger) {
  if (maxLevel < DiagLogLevel.NONE) {
    maxLevel = DiagLogLevel.NONE;
  } else if (maxLevel > DiagLogLevel.ALL) {
    maxLevel = DiagLogLevel.ALL;
  }
  logger = logger || {};
  function _filterFunc(funcName, theLevel) {
    var theFunc = logger[funcName];
    if (typeof theFunc === "function" && maxLevel >= theLevel) {
      return theFunc.bind(logger);
    }
    return function() {
    };
  }
  return {
    error: _filterFunc("error", DiagLogLevel.ERROR),
    warn: _filterFunc("warn", DiagLogLevel.WARN),
    info: _filterFunc("info", DiagLogLevel.INFO),
    debug: _filterFunc("debug", DiagLogLevel.DEBUG),
    verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
  };
}
var init_logLevelLogger = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js"() {
    init_types();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/diag.js
var __read2, __spreadArray2, API_NAME, DiagAPI;
var init_diag = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/diag.js"() {
    init_ComponentLogger();
    init_logLevelLogger();
    init_types();
    init_global_utils();
    __read2 = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error3) {
        e = { error: error3 };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    __spreadArray2 = function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    API_NAME = "diag";
    DiagAPI = /** @class */
    (function() {
      function DiagAPI2() {
        function _logProxy(funcName) {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var logger = getGlobal("diag");
            if (!logger)
              return;
            return logger[funcName].apply(logger, __spreadArray2([], __read2(args), false));
          };
        }
        var self = this;
        var setLogger = function(logger, optionsOrLogLevel) {
          var _a, _b, _c;
          if (optionsOrLogLevel === void 0) {
            optionsOrLogLevel = { logLevel: DiagLogLevel.INFO };
          }
          if (logger === self) {
            var err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
            return false;
          }
          if (typeof optionsOrLogLevel === "number") {
            optionsOrLogLevel = {
              logLevel: optionsOrLogLevel
            };
          }
          var oldLogger = getGlobal("diag");
          var newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : DiagLogLevel.INFO, logger);
          if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
            var stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
            oldLogger.warn("Current logger will be overwritten from " + stack);
            newLogger.warn("Current logger will overwrite one already registered from " + stack);
          }
          return registerGlobal("diag", newLogger, self, true);
        };
        self.setLogger = setLogger;
        self.disable = function() {
          unregisterGlobal(API_NAME, self);
        };
        self.createComponentLogger = function(options) {
          return new DiagComponentLogger(options);
        };
        self.verbose = _logProxy("verbose");
        self.debug = _logProxy("debug");
        self.info = _logProxy("info");
        self.warn = _logProxy("warn");
        self.error = _logProxy("error");
      }
      DiagAPI2.instance = function() {
        if (!this._instance) {
          this._instance = new DiagAPI2();
        }
        return this._instance;
      };
      return DiagAPI2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js
var __read3, __values, BaggageImpl;
var init_baggage_impl = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js"() {
    __read3 = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error3) {
        e = { error: error3 };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    __values = function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    BaggageImpl = /** @class */
    (function() {
      function BaggageImpl2(entries) {
        this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
      }
      BaggageImpl2.prototype.getEntry = function(key) {
        var entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      };
      BaggageImpl2.prototype.getAllEntries = function() {
        return Array.from(this._entries.entries()).map(function(_a) {
          var _b = __read3(_a, 2), k = _b[0], v = _b[1];
          return [k, v];
        });
      };
      BaggageImpl2.prototype.setEntry = function(key, entry) {
        var newBaggage = new BaggageImpl2(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      };
      BaggageImpl2.prototype.removeEntry = function(key) {
        var newBaggage = new BaggageImpl2(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      };
      BaggageImpl2.prototype.removeEntries = function() {
        var e_1, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          keys[_i] = arguments[_i];
        }
        var newBaggage = new BaggageImpl2(this._entries);
        try {
          for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            newBaggage._entries.delete(key);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        return newBaggage;
      };
      BaggageImpl2.prototype.clear = function() {
        return new BaggageImpl2();
      };
      return BaggageImpl2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js
var baggageEntryMetadataSymbol;
var init_symbol = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js"() {
    baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/baggage/utils.js
function createBaggage(entries) {
  if (entries === void 0) {
    entries = {};
  }
  return new BaggageImpl(new Map(Object.entries(entries)));
}
function baggageEntryMetadataFromString(str) {
  if (typeof str !== "string") {
    diag.error("Cannot create baggage metadata from unknown type: " + typeof str);
    str = "";
  }
  return {
    __TYPE__: baggageEntryMetadataSymbol,
    toString: function() {
      return str;
    }
  };
}
var diag;
var init_utils = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/baggage/utils.js"() {
    init_diag();
    init_baggage_impl();
    init_symbol();
    diag = DiagAPI.instance();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/context/context.js
function createContextKey(description) {
  return Symbol.for(description);
}
var BaseContext, ROOT_CONTEXT;
var init_context = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/context/context.js"() {
    BaseContext = /** @class */
    /* @__PURE__ */ (function() {
      function BaseContext2(parentContext) {
        var self = this;
        self._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
        self.getValue = function(key) {
          return self._currentContext.get(key);
        };
        self.setValue = function(key, value) {
          var context2 = new BaseContext2(self._currentContext);
          context2._currentContext.set(key, value);
          return context2;
        };
        self.deleteValue = function(key) {
          var context2 = new BaseContext2(self._currentContext);
          context2._currentContext.delete(key);
          return context2;
        };
      }
      return BaseContext2;
    })();
    ROOT_CONTEXT = new BaseContext();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/consoleLogger.js
var consoleMap, DiagConsoleLogger;
var init_consoleLogger = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/consoleLogger.js"() {
    consoleMap = [
      { n: "error", c: "error" },
      { n: "warn", c: "warn" },
      { n: "info", c: "info" },
      { n: "debug", c: "debug" },
      { n: "verbose", c: "trace" }
    ];
    DiagConsoleLogger = /** @class */
    /* @__PURE__ */ (function() {
      function DiagConsoleLogger2() {
        function _consoleFunc(funcName) {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            if (console) {
              var theFunc = console[funcName];
              if (typeof theFunc !== "function") {
                theFunc = console.log;
              }
              if (typeof theFunc === "function") {
                return theFunc.apply(console, args);
              }
            }
          };
        }
        for (var i = 0; i < consoleMap.length; i++) {
          this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
        }
      }
      return DiagConsoleLogger2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/metrics/NoopMeter.js
function createNoopMeter() {
  return NOOP_METER;
}
var __extends, NoopMeter, NoopMetric, NoopCounterMetric, NoopUpDownCounterMetric, NoopGaugeMetric, NoopHistogramMetric, NoopObservableMetric, NoopObservableCounterMetric, NoopObservableGaugeMetric, NoopObservableUpDownCounterMetric, NOOP_METER, NOOP_COUNTER_METRIC, NOOP_GAUGE_METRIC, NOOP_HISTOGRAM_METRIC, NOOP_UP_DOWN_COUNTER_METRIC, NOOP_OBSERVABLE_COUNTER_METRIC, NOOP_OBSERVABLE_GAUGE_METRIC, NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
var init_NoopMeter = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/metrics/NoopMeter.js"() {
    __extends = /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    NoopMeter = /** @class */
    (function() {
      function NoopMeter2() {
      }
      NoopMeter2.prototype.createGauge = function(_name, _options) {
        return NOOP_GAUGE_METRIC;
      };
      NoopMeter2.prototype.createHistogram = function(_name, _options) {
        return NOOP_HISTOGRAM_METRIC;
      };
      NoopMeter2.prototype.createCounter = function(_name, _options) {
        return NOOP_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createUpDownCounter = function(_name, _options) {
        return NOOP_UP_DOWN_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createObservableGauge = function(_name, _options) {
        return NOOP_OBSERVABLE_GAUGE_METRIC;
      };
      NoopMeter2.prototype.createObservableCounter = function(_name, _options) {
        return NOOP_OBSERVABLE_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createObservableUpDownCounter = function(_name, _options) {
        return NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      };
      NoopMeter2.prototype.addBatchObservableCallback = function(_callback, _observables) {
      };
      NoopMeter2.prototype.removeBatchObservableCallback = function(_callback) {
      };
      return NoopMeter2;
    })();
    NoopMetric = /** @class */
    /* @__PURE__ */ (function() {
      function NoopMetric2() {
      }
      return NoopMetric2;
    })();
    NoopCounterMetric = /** @class */
    (function(_super) {
      __extends(NoopCounterMetric2, _super);
      function NoopCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopCounterMetric2.prototype.add = function(_value, _attributes) {
      };
      return NoopCounterMetric2;
    })(NoopMetric);
    NoopUpDownCounterMetric = /** @class */
    (function(_super) {
      __extends(NoopUpDownCounterMetric2, _super);
      function NoopUpDownCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopUpDownCounterMetric2.prototype.add = function(_value, _attributes) {
      };
      return NoopUpDownCounterMetric2;
    })(NoopMetric);
    NoopGaugeMetric = /** @class */
    (function(_super) {
      __extends(NoopGaugeMetric2, _super);
      function NoopGaugeMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopGaugeMetric2.prototype.record = function(_value, _attributes) {
      };
      return NoopGaugeMetric2;
    })(NoopMetric);
    NoopHistogramMetric = /** @class */
    (function(_super) {
      __extends(NoopHistogramMetric2, _super);
      function NoopHistogramMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopHistogramMetric2.prototype.record = function(_value, _attributes) {
      };
      return NoopHistogramMetric2;
    })(NoopMetric);
    NoopObservableMetric = /** @class */
    (function() {
      function NoopObservableMetric2() {
      }
      NoopObservableMetric2.prototype.addCallback = function(_callback) {
      };
      NoopObservableMetric2.prototype.removeCallback = function(_callback) {
      };
      return NoopObservableMetric2;
    })();
    NoopObservableCounterMetric = /** @class */
    (function(_super) {
      __extends(NoopObservableCounterMetric2, _super);
      function NoopObservableCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableCounterMetric2;
    })(NoopObservableMetric);
    NoopObservableGaugeMetric = /** @class */
    (function(_super) {
      __extends(NoopObservableGaugeMetric2, _super);
      function NoopObservableGaugeMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableGaugeMetric2;
    })(NoopObservableMetric);
    NoopObservableUpDownCounterMetric = /** @class */
    (function(_super) {
      __extends(NoopObservableUpDownCounterMetric2, _super);
      function NoopObservableUpDownCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableUpDownCounterMetric2;
    })(NoopObservableMetric);
    NOOP_METER = new NoopMeter();
    NOOP_COUNTER_METRIC = new NoopCounterMetric();
    NOOP_GAUGE_METRIC = new NoopGaugeMetric();
    NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
    NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
    NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
    NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
    NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/metrics/Metric.js
var ValueType;
var init_Metric = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/metrics/Metric.js"() {
    (function(ValueType2) {
      ValueType2[ValueType2["INT"] = 0] = "INT";
      ValueType2[ValueType2["DOUBLE"] = 1] = "DOUBLE";
    })(ValueType || (ValueType = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js
var defaultTextMapGetter, defaultTextMapSetter;
var init_TextMapPropagator = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js"() {
    defaultTextMapGetter = {
      get: function(carrier, key) {
        if (carrier == null) {
          return void 0;
        }
        return carrier[key];
      },
      keys: function(carrier) {
        if (carrier == null) {
          return [];
        }
        return Object.keys(carrier);
      }
    };
    defaultTextMapSetter = {
      set: function(carrier, key, value) {
        if (carrier == null) {
          return;
        }
        carrier[key] = value;
      }
    };
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js
var __read4, __spreadArray3, NoopContextManager;
var init_NoopContextManager = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js"() {
    init_context();
    __read4 = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error3) {
        e = { error: error3 };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    __spreadArray3 = function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    NoopContextManager = /** @class */
    (function() {
      function NoopContextManager2() {
      }
      NoopContextManager2.prototype.active = function() {
        return ROOT_CONTEXT;
      };
      NoopContextManager2.prototype.with = function(_context, fn, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        return fn.call.apply(fn, __spreadArray3([thisArg], __read4(args), false));
      };
      NoopContextManager2.prototype.bind = function(_context, target) {
        return target;
      };
      NoopContextManager2.prototype.enable = function() {
        return this;
      };
      NoopContextManager2.prototype.disable = function() {
        return this;
      };
      return NoopContextManager2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/context.js
var __read5, __spreadArray4, API_NAME2, NOOP_CONTEXT_MANAGER, ContextAPI;
var init_context2 = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/context.js"() {
    init_NoopContextManager();
    init_global_utils();
    init_diag();
    __read5 = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error3) {
        e = { error: error3 };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    __spreadArray4 = function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    API_NAME2 = "context";
    NOOP_CONTEXT_MANAGER = new NoopContextManager();
    ContextAPI = /** @class */
    (function() {
      function ContextAPI2() {
      }
      ContextAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new ContextAPI2();
        }
        return this._instance;
      };
      ContextAPI2.prototype.setGlobalContextManager = function(contextManager) {
        return registerGlobal(API_NAME2, contextManager, DiagAPI.instance());
      };
      ContextAPI2.prototype.active = function() {
        return this._getContextManager().active();
      };
      ContextAPI2.prototype.with = function(context2, fn, thisArg) {
        var _a;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        return (_a = this._getContextManager()).with.apply(_a, __spreadArray4([context2, fn, thisArg], __read5(args), false));
      };
      ContextAPI2.prototype.bind = function(context2, target) {
        return this._getContextManager().bind(context2, target);
      };
      ContextAPI2.prototype._getContextManager = function() {
        return getGlobal(API_NAME2) || NOOP_CONTEXT_MANAGER;
      };
      ContextAPI2.prototype.disable = function() {
        this._getContextManager().disable();
        unregisterGlobal(API_NAME2, DiagAPI.instance());
      };
      return ContextAPI2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js
var TraceFlags;
var init_trace_flags = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js"() {
    (function(TraceFlags2) {
      TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
      TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
    })(TraceFlags || (TraceFlags = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js
var INVALID_SPANID, INVALID_TRACEID, INVALID_SPAN_CONTEXT;
var init_invalid_span_constants = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js"() {
    init_trace_flags();
    INVALID_SPANID = "0000000000000000";
    INVALID_TRACEID = "00000000000000000000000000000000";
    INVALID_SPAN_CONTEXT = {
      traceId: INVALID_TRACEID,
      spanId: INVALID_SPANID,
      traceFlags: TraceFlags.NONE
    };
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js
var NonRecordingSpan;
var init_NonRecordingSpan = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js"() {
    init_invalid_span_constants();
    NonRecordingSpan = /** @class */
    (function() {
      function NonRecordingSpan2(_spanContext) {
        if (_spanContext === void 0) {
          _spanContext = INVALID_SPAN_CONTEXT;
        }
        this._spanContext = _spanContext;
      }
      NonRecordingSpan2.prototype.spanContext = function() {
        return this._spanContext;
      };
      NonRecordingSpan2.prototype.setAttribute = function(_key, _value) {
        return this;
      };
      NonRecordingSpan2.prototype.setAttributes = function(_attributes) {
        return this;
      };
      NonRecordingSpan2.prototype.addEvent = function(_name, _attributes) {
        return this;
      };
      NonRecordingSpan2.prototype.addLink = function(_link) {
        return this;
      };
      NonRecordingSpan2.prototype.addLinks = function(_links) {
        return this;
      };
      NonRecordingSpan2.prototype.setStatus = function(_status) {
        return this;
      };
      NonRecordingSpan2.prototype.updateName = function(_name) {
        return this;
      };
      NonRecordingSpan2.prototype.end = function(_endTime) {
      };
      NonRecordingSpan2.prototype.isRecording = function() {
        return false;
      };
      NonRecordingSpan2.prototype.recordException = function(_exception, _time) {
      };
      return NonRecordingSpan2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/context-utils.js
function getSpan(context2) {
  return context2.getValue(SPAN_KEY) || void 0;
}
function getActiveSpan() {
  return getSpan(ContextAPI.getInstance().active());
}
function setSpan(context2, span) {
  return context2.setValue(SPAN_KEY, span);
}
function deleteSpan(context2) {
  return context2.deleteValue(SPAN_KEY);
}
function setSpanContext(context2, spanContext) {
  return setSpan(context2, new NonRecordingSpan(spanContext));
}
function getSpanContext(context2) {
  var _a;
  return (_a = getSpan(context2)) === null || _a === void 0 ? void 0 : _a.spanContext();
}
var SPAN_KEY;
var init_context_utils = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/context-utils.js"() {
    init_context();
    init_NonRecordingSpan();
    init_context2();
    SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js
function isValidTraceId(traceId) {
  return VALID_TRACEID_REGEX.test(traceId) && traceId !== INVALID_TRACEID;
}
function isValidSpanId(spanId) {
  return VALID_SPANID_REGEX.test(spanId) && spanId !== INVALID_SPANID;
}
function isSpanContextValid(spanContext) {
  return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
  return new NonRecordingSpan(spanContext);
}
var VALID_TRACEID_REGEX, VALID_SPANID_REGEX;
var init_spancontext_utils = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js"() {
    init_invalid_span_constants();
    init_NonRecordingSpan();
    VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
    VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js
function isSpanContext(spanContext) {
  return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
}
var contextApi, NoopTracer;
var init_NoopTracer = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js"() {
    init_context2();
    init_context_utils();
    init_NonRecordingSpan();
    init_spancontext_utils();
    contextApi = ContextAPI.getInstance();
    NoopTracer = /** @class */
    (function() {
      function NoopTracer2() {
      }
      NoopTracer2.prototype.startSpan = function(name, options, context2) {
        if (context2 === void 0) {
          context2 = contextApi.active();
        }
        var root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
          return new NonRecordingSpan();
        }
        var parentFromContext = context2 && getSpanContext(context2);
        if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
          return new NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan();
        }
      };
      NoopTracer2.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
        var opts;
        var ctx;
        var fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        var parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        var span = this.startSpan(name, opts, parentContext);
        var contextWithSpanSet = setSpan(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, void 0, span);
      };
      return NoopTracer2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js
var NOOP_TRACER, ProxyTracer;
var init_ProxyTracer = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js"() {
    init_NoopTracer();
    NOOP_TRACER = new NoopTracer();
    ProxyTracer = /** @class */
    (function() {
      function ProxyTracer2(_provider, name, version2, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version2;
        this.options = options;
      }
      ProxyTracer2.prototype.startSpan = function(name, options, context2) {
        return this._getTracer().startSpan(name, options, context2);
      };
      ProxyTracer2.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
        var tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
      };
      ProxyTracer2.prototype._getTracer = function() {
        if (this._delegate) {
          return this._delegate;
        }
        var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
          return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
      };
      return ProxyTracer2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js
var NoopTracerProvider;
var init_NoopTracerProvider = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js"() {
    init_NoopTracer();
    NoopTracerProvider = /** @class */
    (function() {
      function NoopTracerProvider2() {
      }
      NoopTracerProvider2.prototype.getTracer = function(_name, _version, _options) {
        return new NoopTracer();
      };
      return NoopTracerProvider2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js
var NOOP_TRACER_PROVIDER, ProxyTracerProvider;
var init_ProxyTracerProvider = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js"() {
    init_ProxyTracer();
    init_NoopTracerProvider();
    NOOP_TRACER_PROVIDER = new NoopTracerProvider();
    ProxyTracerProvider = /** @class */
    (function() {
      function ProxyTracerProvider2() {
      }
      ProxyTracerProvider2.prototype.getTracer = function(name, version2, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version2, options)) !== null && _a !== void 0 ? _a : new ProxyTracer(this, name, version2, options);
      };
      ProxyTracerProvider2.prototype.getDelegate = function() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
      };
      ProxyTracerProvider2.prototype.setDelegate = function(delegate) {
        this._delegate = delegate;
      };
      ProxyTracerProvider2.prototype.getDelegateTracer = function(name, version2, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version2, options);
      };
      return ProxyTracerProvider2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js
var SamplingDecision;
var init_SamplingResult = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js"() {
    (function(SamplingDecision3) {
      SamplingDecision3[SamplingDecision3["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision3[SamplingDecision3["RECORD"] = 1] = "RECORD";
      SamplingDecision3[SamplingDecision3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision || (SamplingDecision = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/span_kind.js
var SpanKind;
var init_span_kind = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/span_kind.js"() {
    (function(SpanKind2) {
      SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
      SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
      SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
      SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
      SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
    })(SpanKind || (SpanKind = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/status.js
var SpanStatusCode;
var init_status = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/status.js"() {
    (function(SpanStatusCode2) {
      SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
      SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
      SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
    })(SpanStatusCode || (SpanStatusCode = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-validators.js
function validateKey(key) {
  return VALID_KEY_REGEX.test(key);
}
function validateValue(value) {
  return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
var VALID_KEY_CHAR_RANGE, VALID_KEY, VALID_VENDOR_KEY, VALID_KEY_REGEX, VALID_VALUE_BASE_REGEX, INVALID_VALUE_COMMA_EQUAL_REGEX;
var init_tracestate_validators = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-validators.js"() {
    VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    VALID_KEY = "[a-z]" + VALID_KEY_CHAR_RANGE + "{0,255}";
    VALID_VENDOR_KEY = "[a-z0-9]" + VALID_KEY_CHAR_RANGE + "{0,240}@[a-z]" + VALID_KEY_CHAR_RANGE + "{0,13}";
    VALID_KEY_REGEX = new RegExp("^(?:" + VALID_KEY + "|" + VALID_VENDOR_KEY + ")$");
    VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-impl.js
var MAX_TRACE_STATE_ITEMS, MAX_TRACE_STATE_LEN, LIST_MEMBERS_SEPARATOR, LIST_MEMBER_KEY_VALUE_SPLITTER, TraceStateImpl;
var init_tracestate_impl = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-impl.js"() {
    init_tracestate_validators();
    MAX_TRACE_STATE_ITEMS = 32;
    MAX_TRACE_STATE_LEN = 512;
    LIST_MEMBERS_SEPARATOR = ",";
    LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    TraceStateImpl = /** @class */
    (function() {
      function TraceStateImpl2(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      TraceStateImpl2.prototype.set = function(key, value) {
        var traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      };
      TraceStateImpl2.prototype.unset = function(key) {
        var traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      };
      TraceStateImpl2.prototype.get = function(key) {
        return this._internalState.get(key);
      };
      TraceStateImpl2.prototype.serialize = function() {
        var _this = this;
        return this._keys().reduce(function(agg, key) {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + _this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      };
      TraceStateImpl2.prototype._parse = function(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce(function(agg, part) {
          var listMember = part.trim();
          var i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            var key = listMember.slice(0, i);
            var value = listMember.slice(i + 1, part.length);
            if (validateKey(key) && validateValue(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      };
      TraceStateImpl2.prototype._keys = function() {
        return Array.from(this._internalState.keys()).reverse();
      };
      TraceStateImpl2.prototype._clone = function() {
        var traceState = new TraceStateImpl2();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      };
      return TraceStateImpl2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/internal/utils.js
function createTraceState(rawTraceState) {
  return new TraceStateImpl(rawTraceState);
}
var init_utils2 = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/internal/utils.js"() {
    init_tracestate_impl();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/context-api.js
var context;
var init_context_api = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/context-api.js"() {
    init_context2();
    context = ContextAPI.getInstance();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag-api.js
var diag2;
var init_diag_api = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag-api.js"() {
    init_diag();
    diag2 = DiagAPI.instance();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/metrics/NoopMeterProvider.js
var NoopMeterProvider, NOOP_METER_PROVIDER;
var init_NoopMeterProvider = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/metrics/NoopMeterProvider.js"() {
    init_NoopMeter();
    NoopMeterProvider = /** @class */
    (function() {
      function NoopMeterProvider2() {
      }
      NoopMeterProvider2.prototype.getMeter = function(_name, _version, _options) {
        return NOOP_METER;
      };
      return NoopMeterProvider2;
    })();
    NOOP_METER_PROVIDER = new NoopMeterProvider();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/metrics.js
var API_NAME3, MetricsAPI;
var init_metrics = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/metrics.js"() {
    init_NoopMeterProvider();
    init_global_utils();
    init_diag();
    API_NAME3 = "metrics";
    MetricsAPI = /** @class */
    (function() {
      function MetricsAPI2() {
      }
      MetricsAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new MetricsAPI2();
        }
        return this._instance;
      };
      MetricsAPI2.prototype.setGlobalMeterProvider = function(provider) {
        return registerGlobal(API_NAME3, provider, DiagAPI.instance());
      };
      MetricsAPI2.prototype.getMeterProvider = function() {
        return getGlobal(API_NAME3) || NOOP_METER_PROVIDER;
      };
      MetricsAPI2.prototype.getMeter = function(name, version2, options) {
        return this.getMeterProvider().getMeter(name, version2, options);
      };
      MetricsAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME3, DiagAPI.instance());
      };
      return MetricsAPI2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/metrics-api.js
var metrics;
var init_metrics_api = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/metrics-api.js"() {
    init_metrics();
    metrics = MetricsAPI.getInstance();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js
var NoopTextMapPropagator;
var init_NoopTextMapPropagator = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js"() {
    NoopTextMapPropagator = /** @class */
    (function() {
      function NoopTextMapPropagator2() {
      }
      NoopTextMapPropagator2.prototype.inject = function(_context, _carrier) {
      };
      NoopTextMapPropagator2.prototype.extract = function(context2, _carrier) {
        return context2;
      };
      NoopTextMapPropagator2.prototype.fields = function() {
        return [];
      };
      return NoopTextMapPropagator2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js
function getBaggage(context2) {
  return context2.getValue(BAGGAGE_KEY) || void 0;
}
function getActiveBaggage() {
  return getBaggage(ContextAPI.getInstance().active());
}
function setBaggage(context2, baggage) {
  return context2.setValue(BAGGAGE_KEY, baggage);
}
function deleteBaggage(context2) {
  return context2.deleteValue(BAGGAGE_KEY);
}
var BAGGAGE_KEY;
var init_context_helpers = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js"() {
    init_context2();
    init_context();
    BAGGAGE_KEY = createContextKey("OpenTelemetry Baggage Key");
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/propagation.js
var API_NAME4, NOOP_TEXT_MAP_PROPAGATOR, PropagationAPI;
var init_propagation = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/propagation.js"() {
    init_global_utils();
    init_NoopTextMapPropagator();
    init_TextMapPropagator();
    init_context_helpers();
    init_utils();
    init_diag();
    API_NAME4 = "propagation";
    NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator();
    PropagationAPI = /** @class */
    (function() {
      function PropagationAPI2() {
        this.createBaggage = createBaggage;
        this.getBaggage = getBaggage;
        this.getActiveBaggage = getActiveBaggage;
        this.setBaggage = setBaggage;
        this.deleteBaggage = deleteBaggage;
      }
      PropagationAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new PropagationAPI2();
        }
        return this._instance;
      };
      PropagationAPI2.prototype.setGlobalPropagator = function(propagator) {
        return registerGlobal(API_NAME4, propagator, DiagAPI.instance());
      };
      PropagationAPI2.prototype.inject = function(context2, carrier, setter) {
        if (setter === void 0) {
          setter = defaultTextMapSetter;
        }
        return this._getGlobalPropagator().inject(context2, carrier, setter);
      };
      PropagationAPI2.prototype.extract = function(context2, carrier, getter) {
        if (getter === void 0) {
          getter = defaultTextMapGetter;
        }
        return this._getGlobalPropagator().extract(context2, carrier, getter);
      };
      PropagationAPI2.prototype.fields = function() {
        return this._getGlobalPropagator().fields();
      };
      PropagationAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME4, DiagAPI.instance());
      };
      PropagationAPI2.prototype._getGlobalPropagator = function() {
        return getGlobal(API_NAME4) || NOOP_TEXT_MAP_PROPAGATOR;
      };
      return PropagationAPI2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/propagation-api.js
var propagation;
var init_propagation_api = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/propagation-api.js"() {
    init_propagation();
    propagation = PropagationAPI.getInstance();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/trace.js
var API_NAME5, TraceAPI;
var init_trace = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/trace.js"() {
    init_global_utils();
    init_ProxyTracerProvider();
    init_spancontext_utils();
    init_context_utils();
    init_diag();
    API_NAME5 = "trace";
    TraceAPI = /** @class */
    (function() {
      function TraceAPI2() {
        this._proxyTracerProvider = new ProxyTracerProvider();
        this.wrapSpanContext = wrapSpanContext;
        this.isSpanContextValid = isSpanContextValid;
        this.deleteSpan = deleteSpan;
        this.getSpan = getSpan;
        this.getActiveSpan = getActiveSpan;
        this.getSpanContext = getSpanContext;
        this.setSpan = setSpan;
        this.setSpanContext = setSpanContext;
      }
      TraceAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new TraceAPI2();
        }
        return this._instance;
      };
      TraceAPI2.prototype.setGlobalTracerProvider = function(provider) {
        var success = registerGlobal(API_NAME5, this._proxyTracerProvider, DiagAPI.instance());
        if (success) {
          this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
      };
      TraceAPI2.prototype.getTracerProvider = function() {
        return getGlobal(API_NAME5) || this._proxyTracerProvider;
      };
      TraceAPI2.prototype.getTracer = function(name, version2) {
        return this.getTracerProvider().getTracer(name, version2);
      };
      TraceAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME5, DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider();
      };
      return TraceAPI2;
    })();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace-api.js
var trace;
var init_trace_api = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace-api.js"() {
    init_trace();
    trace = TraceAPI.getInstance();
  }
});

// node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DiagConsoleLogger: () => DiagConsoleLogger,
  DiagLogLevel: () => DiagLogLevel,
  INVALID_SPANID: () => INVALID_SPANID,
  INVALID_SPAN_CONTEXT: () => INVALID_SPAN_CONTEXT,
  INVALID_TRACEID: () => INVALID_TRACEID,
  ProxyTracer: () => ProxyTracer,
  ProxyTracerProvider: () => ProxyTracerProvider,
  ROOT_CONTEXT: () => ROOT_CONTEXT,
  SamplingDecision: () => SamplingDecision,
  SpanKind: () => SpanKind,
  SpanStatusCode: () => SpanStatusCode,
  TraceFlags: () => TraceFlags,
  ValueType: () => ValueType,
  baggageEntryMetadataFromString: () => baggageEntryMetadataFromString,
  context: () => context,
  createContextKey: () => createContextKey,
  createNoopMeter: () => createNoopMeter,
  createTraceState: () => createTraceState,
  default: () => esm_default,
  defaultTextMapGetter: () => defaultTextMapGetter,
  defaultTextMapSetter: () => defaultTextMapSetter,
  diag: () => diag2,
  isSpanContextValid: () => isSpanContextValid,
  isValidSpanId: () => isValidSpanId,
  isValidTraceId: () => isValidTraceId,
  metrics: () => metrics,
  propagation: () => propagation,
  trace: () => trace
});
var esm_default;
var init_esm = __esm({
  "node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/index.js"() {
    init_utils();
    init_context();
    init_consoleLogger();
    init_types();
    init_NoopMeter();
    init_Metric();
    init_TextMapPropagator();
    init_ProxyTracer();
    init_ProxyTracerProvider();
    init_SamplingResult();
    init_span_kind();
    init_status();
    init_trace_flags();
    init_utils2();
    init_spancontext_utils();
    init_invalid_span_constants();
    init_context_api();
    init_diag_api();
    init_metrics_api();
    init_propagation_api();
    init_trace_api();
    esm_default = {
      context,
      diag: diag2,
      metrics,
      propagation,
      trace
    };
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/types/LogRecord.js
var require_LogRecord = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/types/LogRecord.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SeverityNumber = void 0;
    var SeverityNumber;
    (function(SeverityNumber2) {
      SeverityNumber2[SeverityNumber2["UNSPECIFIED"] = 0] = "UNSPECIFIED";
      SeverityNumber2[SeverityNumber2["TRACE"] = 1] = "TRACE";
      SeverityNumber2[SeverityNumber2["TRACE2"] = 2] = "TRACE2";
      SeverityNumber2[SeverityNumber2["TRACE3"] = 3] = "TRACE3";
      SeverityNumber2[SeverityNumber2["TRACE4"] = 4] = "TRACE4";
      SeverityNumber2[SeverityNumber2["DEBUG"] = 5] = "DEBUG";
      SeverityNumber2[SeverityNumber2["DEBUG2"] = 6] = "DEBUG2";
      SeverityNumber2[SeverityNumber2["DEBUG3"] = 7] = "DEBUG3";
      SeverityNumber2[SeverityNumber2["DEBUG4"] = 8] = "DEBUG4";
      SeverityNumber2[SeverityNumber2["INFO"] = 9] = "INFO";
      SeverityNumber2[SeverityNumber2["INFO2"] = 10] = "INFO2";
      SeverityNumber2[SeverityNumber2["INFO3"] = 11] = "INFO3";
      SeverityNumber2[SeverityNumber2["INFO4"] = 12] = "INFO4";
      SeverityNumber2[SeverityNumber2["WARN"] = 13] = "WARN";
      SeverityNumber2[SeverityNumber2["WARN2"] = 14] = "WARN2";
      SeverityNumber2[SeverityNumber2["WARN3"] = 15] = "WARN3";
      SeverityNumber2[SeverityNumber2["WARN4"] = 16] = "WARN4";
      SeverityNumber2[SeverityNumber2["ERROR"] = 17] = "ERROR";
      SeverityNumber2[SeverityNumber2["ERROR2"] = 18] = "ERROR2";
      SeverityNumber2[SeverityNumber2["ERROR3"] = 19] = "ERROR3";
      SeverityNumber2[SeverityNumber2["ERROR4"] = 20] = "ERROR4";
      SeverityNumber2[SeverityNumber2["FATAL"] = 21] = "FATAL";
      SeverityNumber2[SeverityNumber2["FATAL2"] = 22] = "FATAL2";
      SeverityNumber2[SeverityNumber2["FATAL3"] = 23] = "FATAL3";
      SeverityNumber2[SeverityNumber2["FATAL4"] = 24] = "FATAL4";
    })(SeverityNumber = exports.SeverityNumber || (exports.SeverityNumber = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/NoopLogger.js
var require_NoopLogger = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/NoopLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NOOP_LOGGER = exports.NoopLogger = void 0;
    var NoopLogger = class {
      emit(_logRecord) {
      }
    };
    exports.NoopLogger = NoopLogger;
    exports.NOOP_LOGGER = new NoopLogger();
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/NoopLoggerProvider.js
var require_NoopLoggerProvider = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/NoopLoggerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NOOP_LOGGER_PROVIDER = exports.NoopLoggerProvider = void 0;
    var NoopLogger_1 = require_NoopLogger();
    var NoopLoggerProvider = class {
      getLogger(_name, _version, _options) {
        return new NoopLogger_1.NoopLogger();
      }
    };
    exports.NoopLoggerProvider = NoopLoggerProvider;
    exports.NOOP_LOGGER_PROVIDER = new NoopLoggerProvider();
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/ProxyLogger.js
var require_ProxyLogger = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/ProxyLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyLogger = void 0;
    var NoopLogger_1 = require_NoopLogger();
    var ProxyLogger = class {
      constructor(_provider, name, version2, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version2;
        this.options = options;
      }
      /**
       * Emit a log record. This method should only be used by log appenders.
       *
       * @param logRecord
       */
      emit(logRecord) {
        this._getLogger().emit(logRecord);
      }
      /**
       * Try to get a logger from the proxy logger provider.
       * If the proxy logger provider has no delegate, return a noop logger.
       */
      _getLogger() {
        if (this._delegate) {
          return this._delegate;
        }
        const logger = this._provider._getDelegateLogger(this.name, this.version, this.options);
        if (!logger) {
          return NoopLogger_1.NOOP_LOGGER;
        }
        this._delegate = logger;
        return this._delegate;
      }
    };
    exports.ProxyLogger = ProxyLogger;
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/ProxyLoggerProvider.js
var require_ProxyLoggerProvider = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/ProxyLoggerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyLoggerProvider = void 0;
    var NoopLoggerProvider_1 = require_NoopLoggerProvider();
    var ProxyLogger_1 = require_ProxyLogger();
    var ProxyLoggerProvider = class {
      getLogger(name, version2, options) {
        var _a;
        return (_a = this._getDelegateLogger(name, version2, options)) !== null && _a !== void 0 ? _a : new ProxyLogger_1.ProxyLogger(this, name, version2, options);
      }
      /**
       * Get the delegate logger provider.
       * Used by tests only.
       * @internal
       */
      _getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NoopLoggerProvider_1.NOOP_LOGGER_PROVIDER;
      }
      /**
       * Set the delegate logger provider
       * @internal
       */
      _setDelegate(delegate) {
        this._delegate = delegate;
      }
      /**
       * @internal
       */
      _getDelegateLogger(name, version2, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getLogger(name, version2, options);
      }
    };
    exports.ProxyLoggerProvider = ProxyLoggerProvider;
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/platform/node/globalThis.js
var require_globalThis = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/platform/node/globalThis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/platform/node/index.js
var require_node = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/platform/node/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    var globalThis_1 = require_globalThis();
    Object.defineProperty(exports, "_globalThis", { enumerable: true, get: function() {
      return globalThis_1._globalThis;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/platform/index.js
var require_platform = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/platform/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    var node_1 = require_node();
    Object.defineProperty(exports, "_globalThis", { enumerable: true, get: function() {
      return node_1._globalThis;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/internal/global-utils.js
var require_global_utils = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/internal/global-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.API_BACKWARDS_COMPATIBILITY_VERSION = exports.makeGetter = exports._global = exports.GLOBAL_LOGS_API_KEY = void 0;
    var platform_1 = require_platform();
    exports.GLOBAL_LOGS_API_KEY = Symbol.for("io.opentelemetry.js.api.logs");
    exports._global = platform_1._globalThis;
    function makeGetter(requiredVersion, instance, fallback) {
      return (version2) => version2 === requiredVersion ? instance : fallback;
    }
    exports.makeGetter = makeGetter;
    exports.API_BACKWARDS_COMPATIBILITY_VERSION = 1;
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/api/logs.js
var require_logs = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/api/logs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LogsAPI = void 0;
    var global_utils_1 = require_global_utils();
    var NoopLoggerProvider_1 = require_NoopLoggerProvider();
    var ProxyLoggerProvider_1 = require_ProxyLoggerProvider();
    var LogsAPI = class _LogsAPI {
      constructor() {
        this._proxyLoggerProvider = new ProxyLoggerProvider_1.ProxyLoggerProvider();
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _LogsAPI();
        }
        return this._instance;
      }
      setGlobalLoggerProvider(provider) {
        if (global_utils_1._global[global_utils_1.GLOBAL_LOGS_API_KEY]) {
          return this.getLoggerProvider();
        }
        global_utils_1._global[global_utils_1.GLOBAL_LOGS_API_KEY] = (0, global_utils_1.makeGetter)(global_utils_1.API_BACKWARDS_COMPATIBILITY_VERSION, provider, NoopLoggerProvider_1.NOOP_LOGGER_PROVIDER);
        this._proxyLoggerProvider._setDelegate(provider);
        return provider;
      }
      /**
       * Returns the global logger provider.
       *
       * @returns LoggerProvider
       */
      getLoggerProvider() {
        var _a, _b;
        return (_b = (_a = global_utils_1._global[global_utils_1.GLOBAL_LOGS_API_KEY]) === null || _a === void 0 ? void 0 : _a.call(global_utils_1._global, global_utils_1.API_BACKWARDS_COMPATIBILITY_VERSION)) !== null && _b !== void 0 ? _b : this._proxyLoggerProvider;
      }
      /**
       * Returns a logger from the global logger provider.
       *
       * @returns Logger
       */
      getLogger(name, version2, options) {
        return this.getLoggerProvider().getLogger(name, version2, options);
      }
      /** Remove the global logger provider */
      disable() {
        delete global_utils_1._global[global_utils_1.GLOBAL_LOGS_API_KEY];
        this._proxyLoggerProvider = new ProxyLoggerProvider_1.ProxyLoggerProvider();
      }
    };
    exports.LogsAPI = LogsAPI;
  }
});

// node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/@opentelemetry+api-logs@0.208.0/node_modules/@opentelemetry/api-logs/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logs = exports.ProxyLoggerProvider = exports.NoopLogger = exports.NOOP_LOGGER = exports.SeverityNumber = void 0;
    var LogRecord_1 = require_LogRecord();
    Object.defineProperty(exports, "SeverityNumber", { enumerable: true, get: function() {
      return LogRecord_1.SeverityNumber;
    } });
    var NoopLogger_1 = require_NoopLogger();
    Object.defineProperty(exports, "NOOP_LOGGER", { enumerable: true, get: function() {
      return NoopLogger_1.NOOP_LOGGER;
    } });
    Object.defineProperty(exports, "NoopLogger", { enumerable: true, get: function() {
      return NoopLogger_1.NoopLogger;
    } });
    var ProxyLoggerProvider_1 = require_ProxyLoggerProvider();
    Object.defineProperty(exports, "ProxyLoggerProvider", { enumerable: true, get: function() {
      return ProxyLoggerProvider_1.ProxyLoggerProvider;
    } });
    var logs_1 = require_logs();
    exports.logs = logs_1.LogsAPI.getInstance();
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/autoLoaderUtils.js
var require_autoLoaderUtils = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/autoLoaderUtils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disableInstrumentations = exports.enableInstrumentations = void 0;
    function enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider) {
      for (let i = 0, j = instrumentations.length; i < j; i++) {
        const instrumentation = instrumentations[i];
        if (tracerProvider) {
          instrumentation.setTracerProvider(tracerProvider);
        }
        if (meterProvider) {
          instrumentation.setMeterProvider(meterProvider);
        }
        if (loggerProvider && instrumentation.setLoggerProvider) {
          instrumentation.setLoggerProvider(loggerProvider);
        }
        if (!instrumentation.getConfig().enabled) {
          instrumentation.enable();
        }
      }
    }
    exports.enableInstrumentations = enableInstrumentations;
    function disableInstrumentations(instrumentations) {
      instrumentations.forEach((instrumentation) => instrumentation.disable());
    }
    exports.disableInstrumentations = disableInstrumentations;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/autoLoader.js
var require_autoLoader = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/autoLoader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerInstrumentations = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var api_logs_1 = require_src();
    var autoLoaderUtils_1 = require_autoLoaderUtils();
    function registerInstrumentations3(options) {
      const tracerProvider = options.tracerProvider || api_1.trace.getTracerProvider();
      const meterProvider = options.meterProvider || api_1.metrics.getMeterProvider();
      const loggerProvider = options.loggerProvider || api_logs_1.logs.getLoggerProvider();
      const instrumentations = options.instrumentations?.flat() ?? [];
      (0, autoLoaderUtils_1.enableInstrumentations)(instrumentations, tracerProvider, meterProvider, loggerProvider);
      return () => {
        (0, autoLoaderUtils_1.disableInstrumentations)(instrumentations);
      };
    }
    exports.registerInstrumentations = registerInstrumentations3;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/semver.js
var require_semver = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/semver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.satisfies = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var VERSION_REGEXP = /^(?:v)?(?<version>(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*))(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    var RANGE_REGEXP = /^(?<op><|>|=|==|<=|>=|~|\^|~>)?\s*(?:v)?(?<version>(?<major>x|X|\*|0|[1-9]\d*)(?:\.(?<minor>x|X|\*|0|[1-9]\d*))?(?:\.(?<patch>x|X|\*|0|[1-9]\d*))?)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    var operatorResMap = {
      ">": [1],
      ">=": [0, 1],
      "=": [0],
      "<=": [-1, 0],
      "<": [-1],
      "!=": [-1, 1]
    };
    function satisfies(version2, range, options) {
      if (!_validateVersion(version2)) {
        api_1.diag.error(`Invalid version: ${version2}`);
        return false;
      }
      if (!range) {
        return true;
      }
      range = range.replace(/([<>=~^]+)\s+/g, "$1");
      const parsedVersion = _parseVersion(version2);
      if (!parsedVersion) {
        return false;
      }
      const allParsedRanges = [];
      const checkResult = _doSatisfies(parsedVersion, range, allParsedRanges, options);
      if (checkResult && !options?.includePrerelease) {
        return _doPreleaseCheck(parsedVersion, allParsedRanges);
      }
      return checkResult;
    }
    exports.satisfies = satisfies;
    function _validateVersion(version2) {
      return typeof version2 === "string" && VERSION_REGEXP.test(version2);
    }
    function _doSatisfies(parsedVersion, range, allParsedRanges, options) {
      if (range.includes("||")) {
        const ranges = range.trim().split("||");
        for (const r of ranges) {
          if (_checkRange(parsedVersion, r, allParsedRanges, options)) {
            return true;
          }
        }
        return false;
      } else if (range.includes(" - ")) {
        range = replaceHyphen(range, options);
      } else if (range.includes(" ")) {
        const ranges = range.trim().replace(/\s{2,}/g, " ").split(" ");
        for (const r of ranges) {
          if (!_checkRange(parsedVersion, r, allParsedRanges, options)) {
            return false;
          }
        }
        return true;
      }
      return _checkRange(parsedVersion, range, allParsedRanges, options);
    }
    function _checkRange(parsedVersion, range, allParsedRanges, options) {
      range = _normalizeRange(range, options);
      if (range.includes(" ")) {
        return _doSatisfies(parsedVersion, range, allParsedRanges, options);
      } else {
        const parsedRange = _parseRange(range);
        allParsedRanges.push(parsedRange);
        return _satisfies(parsedVersion, parsedRange);
      }
    }
    function _satisfies(parsedVersion, parsedRange) {
      if (parsedRange.invalid) {
        return false;
      }
      if (!parsedRange.version || _isWildcard(parsedRange.version)) {
        return true;
      }
      let comparisonResult = _compareVersionSegments(parsedVersion.versionSegments || [], parsedRange.versionSegments || []);
      if (comparisonResult === 0) {
        const versionPrereleaseSegments = parsedVersion.prereleaseSegments || [];
        const rangePrereleaseSegments = parsedRange.prereleaseSegments || [];
        if (!versionPrereleaseSegments.length && !rangePrereleaseSegments.length) {
          comparisonResult = 0;
        } else if (!versionPrereleaseSegments.length && rangePrereleaseSegments.length) {
          comparisonResult = 1;
        } else if (versionPrereleaseSegments.length && !rangePrereleaseSegments.length) {
          comparisonResult = -1;
        } else {
          comparisonResult = _compareVersionSegments(versionPrereleaseSegments, rangePrereleaseSegments);
        }
      }
      return operatorResMap[parsedRange.op]?.includes(comparisonResult);
    }
    function _doPreleaseCheck(parsedVersion, allParsedRanges) {
      if (parsedVersion.prerelease) {
        return allParsedRanges.some((r) => r.prerelease && r.version === parsedVersion.version);
      }
      return true;
    }
    function _normalizeRange(range, options) {
      range = range.trim();
      range = replaceCaret(range, options);
      range = replaceTilde(range);
      range = replaceXRange(range, options);
      range = range.trim();
      return range;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function _parseVersion(versionString) {
      const match = versionString.match(VERSION_REGEXP);
      if (!match) {
        api_1.diag.error(`Invalid version: ${versionString}`);
        return void 0;
      }
      const version2 = match.groups.version;
      const prerelease = match.groups.prerelease;
      const build = match.groups.build;
      const versionSegments = version2.split(".");
      const prereleaseSegments = prerelease?.split(".");
      return {
        op: void 0,
        version: version2,
        versionSegments,
        versionSegmentCount: versionSegments.length,
        prerelease,
        prereleaseSegments,
        prereleaseSegmentCount: prereleaseSegments ? prereleaseSegments.length : 0,
        build
      };
    }
    function _parseRange(rangeString) {
      if (!rangeString) {
        return {};
      }
      const match = rangeString.match(RANGE_REGEXP);
      if (!match) {
        api_1.diag.error(`Invalid range: ${rangeString}`);
        return {
          invalid: true
        };
      }
      let op = match.groups.op;
      const version2 = match.groups.version;
      const prerelease = match.groups.prerelease;
      const build = match.groups.build;
      const versionSegments = version2.split(".");
      const prereleaseSegments = prerelease?.split(".");
      if (op === "==") {
        op = "=";
      }
      return {
        op: op || "=",
        version: version2,
        versionSegments,
        versionSegmentCount: versionSegments.length,
        prerelease,
        prereleaseSegments,
        prereleaseSegmentCount: prereleaseSegments ? prereleaseSegments.length : 0,
        build
      };
    }
    function _isWildcard(s) {
      return s === "*" || s === "x" || s === "X";
    }
    function _parseVersionString(v) {
      const n = parseInt(v, 10);
      return isNaN(n) ? v : n;
    }
    function _normalizeVersionType(a, b) {
      if (typeof a === typeof b) {
        if (typeof a === "number") {
          return [a, b];
        } else if (typeof a === "string") {
          return [a, b];
        } else {
          throw new Error("Version segments can only be strings or numbers");
        }
      } else {
        return [String(a), String(b)];
      }
    }
    function _compareVersionStrings(v1, v2) {
      if (_isWildcard(v1) || _isWildcard(v2)) {
        return 0;
      }
      const [parsedV1, parsedV2] = _normalizeVersionType(_parseVersionString(v1), _parseVersionString(v2));
      if (parsedV1 > parsedV2) {
        return 1;
      } else if (parsedV1 < parsedV2) {
        return -1;
      }
      return 0;
    }
    function _compareVersionSegments(v1, v2) {
      for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        const res = _compareVersionStrings(v1[i] || "0", v2[i] || "0");
        if (res !== 0) {
          return res;
        }
      }
      return 0;
    }
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var NUMERICIDENTIFIER = "0|[1-9]\\d*";
    var NONNUMERICIDENTIFIER = `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`;
    var GTLT = "((?:<|>)?=?)";
    var PRERELEASEIDENTIFIER = `(?:${NUMERICIDENTIFIER}|${NONNUMERICIDENTIFIER})`;
    var PRERELEASE = `(?:-(${PRERELEASEIDENTIFIER}(?:\\.${PRERELEASEIDENTIFIER})*))`;
    var BUILDIDENTIFIER = `${LETTERDASHNUMBER}+`;
    var BUILD = `(?:\\+(${BUILDIDENTIFIER}(?:\\.${BUILDIDENTIFIER})*))`;
    var XRANGEIDENTIFIER = `${NUMERICIDENTIFIER}|x|X|\\*`;
    var XRANGEPLAIN = `[v=\\s]*(${XRANGEIDENTIFIER})(?:\\.(${XRANGEIDENTIFIER})(?:\\.(${XRANGEIDENTIFIER})(?:${PRERELEASE})?${BUILD}?)?)?`;
    var XRANGE = `^${GTLT}\\s*${XRANGEPLAIN}$`;
    var XRANGE_REGEXP = new RegExp(XRANGE);
    var HYPHENRANGE = `^\\s*(${XRANGEPLAIN})\\s+-\\s+(${XRANGEPLAIN})\\s*$`;
    var HYPHENRANGE_REGEXP = new RegExp(HYPHENRANGE);
    var LONETILDE = "(?:~>?)";
    var TILDE = `^${LONETILDE}${XRANGEPLAIN}$`;
    var TILDE_REGEXP = new RegExp(TILDE);
    var LONECARET = "(?:\\^)";
    var CARET = `^${LONECARET}${XRANGEPLAIN}$`;
    var CARET_REGEXP = new RegExp(CARET);
    function replaceTilde(comp) {
      const r = TILDE_REGEXP;
      return comp.replace(r, (_, M, m, p, pr) => {
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        return ret;
      });
    }
    function replaceCaret(comp, options) {
      const r = CARET_REGEXP;
      const z = options?.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        return ret;
      });
    }
    function replaceXRange(comp, options) {
      const r = XRANGE_REGEXP;
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options?.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        return ret;
      });
    }
    function replaceHyphen(comp, options) {
      const r = HYPHENRANGE_REGEXP;
      return comp.replace(r, (_, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
        if (isX(fM)) {
          from = "";
        } else if (isX(fm)) {
          from = `>=${fM}.0.0${options?.includePrerelease ? "-0" : ""}`;
        } else if (isX(fp)) {
          from = `>=${fM}.${fm}.0${options?.includePrerelease ? "-0" : ""}`;
        } else if (fpr) {
          from = `>=${from}`;
        } else {
          from = `>=${from}${options?.includePrerelease ? "-0" : ""}`;
        }
        if (isX(tM)) {
          to = "";
        } else if (isX(tm)) {
          to = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp)) {
          to = `<${tM}.${+tm + 1}.0-0`;
        } else if (tpr) {
          to = `<=${tM}.${tm}.${tp}-${tpr}`;
        } else if (options?.includePrerelease) {
          to = `<${tM}.${tm}.${+tp + 1}-0`;
        } else {
          to = `<=${to}`;
        }
        return `${from} ${to}`.trim();
      });
    }
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/shimmer.js
var require_shimmer = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/shimmer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.massUnwrap = exports.unwrap = exports.massWrap = exports.wrap = void 0;
    var logger = console.error.bind(console);
    function defineProperty(obj, name, value) {
      const enumerable = !!obj[name] && Object.prototype.propertyIsEnumerable.call(obj, name);
      Object.defineProperty(obj, name, {
        configurable: true,
        enumerable,
        writable: true,
        value
      });
    }
    var wrap = (nodule, name, wrapper) => {
      if (!nodule || !nodule[name]) {
        logger("no original function " + String(name) + " to wrap");
        return;
      }
      if (!wrapper) {
        logger("no wrapper function");
        logger(new Error().stack);
        return;
      }
      const original = nodule[name];
      if (typeof original !== "function" || typeof wrapper !== "function") {
        logger("original object and wrapper must be functions");
        return;
      }
      const wrapped = wrapper(original, name);
      defineProperty(wrapped, "__original", original);
      defineProperty(wrapped, "__unwrap", () => {
        if (nodule[name] === wrapped) {
          defineProperty(nodule, name, original);
        }
      });
      defineProperty(wrapped, "__wrapped", true);
      defineProperty(nodule, name, wrapped);
      return wrapped;
    };
    exports.wrap = wrap;
    var massWrap = (nodules, names, wrapper) => {
      if (!nodules) {
        logger("must provide one or more modules to patch");
        logger(new Error().stack);
        return;
      } else if (!Array.isArray(nodules)) {
        nodules = [nodules];
      }
      if (!(names && Array.isArray(names))) {
        logger("must provide one or more functions to wrap on modules");
        return;
      }
      nodules.forEach((nodule) => {
        names.forEach((name) => {
          (0, exports.wrap)(nodule, name, wrapper);
        });
      });
    };
    exports.massWrap = massWrap;
    var unwrap = (nodule, name) => {
      if (!nodule || !nodule[name]) {
        logger("no function to unwrap.");
        logger(new Error().stack);
        return;
      }
      const wrapped = nodule[name];
      if (!wrapped.__unwrap) {
        logger("no original to unwrap to -- has " + String(name) + " already been unwrapped?");
      } else {
        wrapped.__unwrap();
        return;
      }
    };
    exports.unwrap = unwrap;
    var massUnwrap = (nodules, names) => {
      if (!nodules) {
        logger("must provide one or more modules to patch");
        logger(new Error().stack);
        return;
      } else if (!Array.isArray(nodules)) {
        nodules = [nodules];
      }
      if (!(names && Array.isArray(names))) {
        logger("must provide one or more functions to unwrap on modules");
        return;
      }
      nodules.forEach((nodule) => {
        names.forEach((name) => {
          (0, exports.unwrap)(nodule, name);
        });
      });
    };
    exports.massUnwrap = massUnwrap;
    function shimmer(options) {
      if (options && options.logger) {
        if (typeof options.logger !== "function") {
          logger("new logger isn't a function, not replacing");
        } else {
          logger = options.logger;
        }
      }
    }
    exports.default = shimmer;
    shimmer.wrap = exports.wrap;
    shimmer.massWrap = exports.massWrap;
    shimmer.unwrap = exports.unwrap;
    shimmer.massUnwrap = exports.massUnwrap;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/instrumentation.js
var require_instrumentation = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/instrumentation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationAbstract = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var api_logs_1 = require_src();
    var shimmer = require_shimmer();
    var InstrumentationAbstract = class {
      instrumentationName;
      instrumentationVersion;
      _config = {};
      _tracer;
      _meter;
      _logger;
      _diag;
      constructor(instrumentationName, instrumentationVersion, config) {
        this.instrumentationName = instrumentationName;
        this.instrumentationVersion = instrumentationVersion;
        this.setConfig(config);
        this._diag = api_1.diag.createComponentLogger({
          namespace: instrumentationName
        });
        this._tracer = api_1.trace.getTracer(instrumentationName, instrumentationVersion);
        this._meter = api_1.metrics.getMeter(instrumentationName, instrumentationVersion);
        this._logger = api_logs_1.logs.getLogger(instrumentationName, instrumentationVersion);
        this._updateMetricInstruments();
      }
      /* Api to wrap instrumented method */
      _wrap = shimmer.wrap;
      /* Api to unwrap instrumented methods */
      _unwrap = shimmer.unwrap;
      /* Api to mass wrap instrumented method */
      _massWrap = shimmer.massWrap;
      /* Api to mass unwrap instrumented methods */
      _massUnwrap = shimmer.massUnwrap;
      /* Returns meter */
      get meter() {
        return this._meter;
      }
      /**
       * Sets MeterProvider to this plugin
       * @param meterProvider
       */
      setMeterProvider(meterProvider) {
        this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
        this._updateMetricInstruments();
      }
      /* Returns logger */
      get logger() {
        return this._logger;
      }
      /**
       * Sets LoggerProvider to this plugin
       * @param loggerProvider
       */
      setLoggerProvider(loggerProvider) {
        this._logger = loggerProvider.getLogger(this.instrumentationName, this.instrumentationVersion);
      }
      /**
       * @experimental
       *
       * Get module definitions defined by {@link init}.
       * This can be used for experimental compile-time instrumentation.
       *
       * @returns an array of {@link InstrumentationModuleDefinition}
       */
      getModuleDefinitions() {
        const initResult = this.init() ?? [];
        if (!Array.isArray(initResult)) {
          return [initResult];
        }
        return initResult;
      }
      /**
       * Sets the new metric instruments with the current Meter.
       */
      _updateMetricInstruments() {
        return;
      }
      /* Returns InstrumentationConfig */
      getConfig() {
        return this._config;
      }
      /**
       * Sets InstrumentationConfig to this plugin
       * @param config
       */
      setConfig(config) {
        this._config = {
          enabled: true,
          ...config
        };
      }
      /**
       * Sets TraceProvider to this plugin
       * @param tracerProvider
       */
      setTracerProvider(tracerProvider) {
        this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
      }
      /* Returns tracer */
      get tracer() {
        return this._tracer;
      }
      /**
       * Execute span customization hook, if configured, and log any errors.
       * Any semantics of the trigger and info are defined by the specific instrumentation.
       * @param hookHandler The optional hook handler which the user has configured via instrumentation config
       * @param triggerName The name of the trigger for executing the hook for logging purposes
       * @param span The span to which the hook should be applied
       * @param info The info object to be passed to the hook, with useful data the hook may use
       */
      _runSpanCustomizationHook(hookHandler, triggerName, span, info2) {
        if (!hookHandler) {
          return;
        }
        try {
          hookHandler(span, info2);
        } catch (e) {
          this._diag.error(`Error running span customization hook due to exception in handler`, { triggerName }, e);
        }
      }
    };
    exports.InstrumentationAbstract = InstrumentationAbstract;
  }
});

// node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable2;
      createDebug.enable = enable2;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug3(...args) {
          if (!debug3.enabled) {
            return;
          }
          const self = debug3;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format3) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format3];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug3.namespace = namespace;
        debug3.useColors = createDebug.useColors();
        debug3.color = createDebug.selectColor(namespace);
        debug3.extend = extend;
        debug3.destroy = createDebug.destroy;
        Object.defineProperty(debug3, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug3);
        }
        return debug3;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable2(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable2() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error3) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error3) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error3) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error3) {
        return "[UnexpectedJSONParseError]: " + error3.message;
      }
    };
  }
});

// node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os3 = __require("os");
    var tty = __require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os3.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version2 = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version2 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js
var require_node2 = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init2;
    exports.log = log5;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error3) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log5(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init2(debug3) {
      debug3.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug3.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js
var require_src2 = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node2();
    }
  }
});

// node_modules/.pnpm/module-details-from-path@1.0.4/node_modules/module-details-from-path/index.js
var require_module_details_from_path = __commonJS({
  "node_modules/.pnpm/module-details-from-path@1.0.4/node_modules/module-details-from-path/index.js"(exports, module) {
    "use strict";
    var sep2 = __require("path").sep;
    module.exports = function(file) {
      var segments = file.split(sep2);
      var index = segments.lastIndexOf("node_modules");
      if (index === -1) return;
      if (!segments[index + 1]) return;
      var scoped = segments[index + 1][0] === "@";
      var name = scoped ? segments[index + 1] + "/" + segments[index + 2] : segments[index + 1];
      var offset = scoped ? 3 : 2;
      var basedir = "";
      var lastBaseDirSegmentIndex = index + offset - 1;
      for (var i = 0; i <= lastBaseDirSegmentIndex; i++) {
        if (i === lastBaseDirSegmentIndex) {
          basedir += segments[i];
        } else {
          basedir += segments[i] + sep2;
        }
      }
      var path2 = "";
      var lastSegmentIndex = segments.length - 1;
      for (var i2 = index + offset; i2 <= lastSegmentIndex; i2++) {
        if (i2 === lastSegmentIndex) {
          path2 += segments[i2];
        } else {
          path2 += segments[i2] + sep2;
        }
      }
      return {
        name,
        basedir,
        path: path2
      };
    };
  }
});

// node_modules/.pnpm/require-in-the-middle@8.0.1/node_modules/require-in-the-middle/index.js
var require_require_in_the_middle = __commonJS({
  "node_modules/.pnpm/require-in-the-middle@8.0.1/node_modules/require-in-the-middle/index.js"(exports, module) {
    "use strict";
    var path2 = __require("path");
    var Module = __require("module");
    var debug3 = require_src2()("require-in-the-middle");
    var moduleDetailsFromPath = require_module_details_from_path();
    module.exports = Hook;
    module.exports.Hook = Hook;
    var builtinModules;
    var isCore;
    if (Module.isBuiltin) {
      isCore = Module.isBuiltin;
    } else if (Module.builtinModules) {
      isCore = (moduleName) => {
        if (moduleName.startsWith("node:")) {
          return true;
        }
        if (builtinModules === void 0) {
          builtinModules = new Set(Module.builtinModules);
        }
        return builtinModules.has(moduleName);
      };
    } else {
      throw new Error("'require-in-the-middle' requires Node.js >=v9.3.0 or >=v8.10.0");
    }
    var normalize2 = /([/\\]index)?(\.js)?$/;
    var ExportsCache = class {
      constructor() {
        this._localCache = /* @__PURE__ */ new Map();
        this._kRitmExports = Symbol("RitmExports");
      }
      has(filename, isBuiltin2) {
        if (this._localCache.has(filename)) {
          return true;
        } else if (!isBuiltin2) {
          const mod = __require.cache[filename];
          return !!(mod && this._kRitmExports in mod);
        } else {
          return false;
        }
      }
      get(filename, isBuiltin2) {
        const cachedExports = this._localCache.get(filename);
        if (cachedExports !== void 0) {
          return cachedExports;
        } else if (!isBuiltin2) {
          const mod = __require.cache[filename];
          return mod && mod[this._kRitmExports];
        }
      }
      set(filename, exports2, isBuiltin2) {
        if (isBuiltin2) {
          this._localCache.set(filename, exports2);
        } else if (filename in __require.cache) {
          __require.cache[filename][this._kRitmExports] = exports2;
        } else {
          debug3('non-core module is unexpectedly not in require.cache: "%s"', filename);
          this._localCache.set(filename, exports2);
        }
      }
    };
    function Hook(modules, options, onrequire) {
      if (this instanceof Hook === false) return new Hook(modules, options, onrequire);
      if (typeof modules === "function") {
        onrequire = modules;
        modules = null;
        options = null;
      } else if (typeof options === "function") {
        onrequire = options;
        options = null;
      }
      if (typeof Module._resolveFilename !== "function") {
        console.error("Error: Expected Module._resolveFilename to be a function (was: %s) - aborting!", typeof Module._resolveFilename);
        console.error("Please report this error as an issue related to Node.js %s at https://github.com/nodejs/require-in-the-middle/issues", process.version);
        return;
      }
      this._cache = new ExportsCache();
      this._unhooked = false;
      this._origRequire = Module.prototype.require;
      const self = this;
      const patching = /* @__PURE__ */ new Set();
      const internals = options ? options.internals === true : false;
      const hasWhitelist = Array.isArray(modules);
      debug3("registering require hook");
      this._require = Module.prototype.require = function(id) {
        if (self._unhooked === true) {
          debug3("ignoring require call - module is soft-unhooked");
          return self._origRequire.apply(this, arguments);
        }
        return patchedRequire.call(this, arguments, false);
      };
      if (typeof process.getBuiltinModule === "function") {
        this._origGetBuiltinModule = process.getBuiltinModule;
        this._getBuiltinModule = process.getBuiltinModule = function(id) {
          if (self._unhooked === true) {
            debug3("ignoring process.getBuiltinModule call - module is soft-unhooked");
            return self._origGetBuiltinModule.apply(this, arguments);
          }
          return patchedRequire.call(this, arguments, true);
        };
      }
      function patchedRequire(args, coreOnly) {
        const id = args[0];
        const core = isCore(id);
        let filename;
        if (core) {
          filename = id;
          if (id.startsWith("node:")) {
            const idWithoutPrefix = id.slice(5);
            if (isCore(idWithoutPrefix)) {
              filename = idWithoutPrefix;
            }
          }
        } else if (coreOnly) {
          debug3("call to process.getBuiltinModule with unknown built-in id");
          return self._origGetBuiltinModule.apply(this, args);
        } else {
          try {
            filename = Module._resolveFilename(id, this);
          } catch (resolveErr) {
            debug3('Module._resolveFilename("%s") threw %j, calling original Module.require', id, resolveErr.message);
            return self._origRequire.apply(this, args);
          }
        }
        let moduleName, basedir;
        debug3("processing %s module require('%s'): %s", core === true ? "core" : "non-core", id, filename);
        if (self._cache.has(filename, core) === true) {
          debug3("returning already patched cached module: %s", filename);
          return self._cache.get(filename, core);
        }
        const isPatching = patching.has(filename);
        if (isPatching === false) {
          patching.add(filename);
        }
        const exports2 = coreOnly ? self._origGetBuiltinModule.apply(this, args) : self._origRequire.apply(this, args);
        if (isPatching === true) {
          debug3("module is in the process of being patched already - ignoring: %s", filename);
          return exports2;
        }
        patching.delete(filename);
        if (core === true) {
          if (hasWhitelist === true && modules.includes(filename) === false) {
            debug3("ignoring core module not on whitelist: %s", filename);
            return exports2;
          }
          moduleName = filename;
        } else if (hasWhitelist === true && modules.includes(filename)) {
          const parsedPath = path2.parse(filename);
          moduleName = parsedPath.name;
          basedir = parsedPath.dir;
        } else {
          const stat = moduleDetailsFromPath(filename);
          if (stat === void 0) {
            debug3("could not parse filename: %s", filename);
            return exports2;
          }
          moduleName = stat.name;
          basedir = stat.basedir;
          const fullModuleName = resolveModuleName(stat);
          debug3("resolved filename to module: %s (id: %s, resolved: %s, basedir: %s)", moduleName, id, fullModuleName, basedir);
          let matchFound = false;
          if (hasWhitelist) {
            if (!id.startsWith(".") && modules.includes(id)) {
              moduleName = id;
              matchFound = true;
            }
            if (!modules.includes(moduleName) && !modules.includes(fullModuleName)) {
              return exports2;
            }
            if (modules.includes(fullModuleName) && fullModuleName !== moduleName) {
              moduleName = fullModuleName;
              matchFound = true;
            }
          }
          if (!matchFound) {
            let res;
            try {
              res = __require.resolve(moduleName, { paths: [basedir] });
            } catch (e) {
              debug3("could not resolve module: %s", moduleName);
              self._cache.set(filename, exports2, core);
              return exports2;
            }
            if (res !== filename) {
              if (internals === true) {
                moduleName = moduleName + path2.sep + path2.relative(basedir, filename);
                debug3("preparing to process require of internal file: %s", moduleName);
              } else {
                debug3("ignoring require of non-main module file: %s", res);
                self._cache.set(filename, exports2, core);
                return exports2;
              }
            }
          }
        }
        self._cache.set(filename, exports2, core);
        debug3("calling require hook: %s", moduleName);
        const patchedExports = onrequire(exports2, moduleName, basedir);
        self._cache.set(filename, patchedExports, core);
        debug3("returning module: %s", moduleName);
        return patchedExports;
      }
    }
    Hook.prototype.unhook = function() {
      this._unhooked = true;
      if (this._require === Module.prototype.require) {
        Module.prototype.require = this._origRequire;
        debug3("require unhook successful");
      } else {
        debug3("require unhook unsuccessful");
      }
      if (process.getBuiltinModule !== void 0) {
        if (this._getBuiltinModule === process.getBuiltinModule) {
          process.getBuiltinModule = this._origGetBuiltinModule;
          debug3("process.getBuiltinModule unhook successful");
        } else {
          debug3("process.getBuiltinModule unhook unsuccessful");
        }
      }
    };
    function resolveModuleName(stat) {
      const normalizedPath = path2.sep !== "/" ? stat.path.split(path2.sep).join("/") : stat.path;
      return path2.posix.join(stat.name, normalizedPath).replace(normalize2, "");
    }
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/ModuleNameTrie.js
var require_ModuleNameTrie = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/ModuleNameTrie.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModuleNameTrie = exports.ModuleNameSeparator = void 0;
    exports.ModuleNameSeparator = "/";
    var ModuleNameTrieNode = class {
      hooks = [];
      children = /* @__PURE__ */ new Map();
    };
    var ModuleNameTrie = class {
      _trie = new ModuleNameTrieNode();
      _counter = 0;
      /**
       * Insert a module hook into the trie
       *
       * @param {Hooked} hook Hook
       */
      insert(hook) {
        let trieNode = this._trie;
        for (const moduleNamePart of hook.moduleName.split(exports.ModuleNameSeparator)) {
          let nextNode = trieNode.children.get(moduleNamePart);
          if (!nextNode) {
            nextNode = new ModuleNameTrieNode();
            trieNode.children.set(moduleNamePart, nextNode);
          }
          trieNode = nextNode;
        }
        trieNode.hooks.push({ hook, insertedId: this._counter++ });
      }
      /**
       * Search for matching hooks in the trie
       *
       * @param {string} moduleName Module name
       * @param {boolean} maintainInsertionOrder Whether to return the results in insertion order
       * @param {boolean} fullOnly Whether to return only full matches
       * @returns {Hooked[]} Matching hooks
       */
      search(moduleName, { maintainInsertionOrder, fullOnly } = {}) {
        let trieNode = this._trie;
        const results = [];
        let foundFull = true;
        for (const moduleNamePart of moduleName.split(exports.ModuleNameSeparator)) {
          const nextNode = trieNode.children.get(moduleNamePart);
          if (!nextNode) {
            foundFull = false;
            break;
          }
          if (!fullOnly) {
            results.push(...nextNode.hooks);
          }
          trieNode = nextNode;
        }
        if (fullOnly && foundFull) {
          results.push(...trieNode.hooks);
        }
        if (results.length === 0) {
          return [];
        }
        if (results.length === 1) {
          return [results[0].hook];
        }
        if (maintainInsertionOrder) {
          results.sort((a, b) => a.insertedId - b.insertedId);
        }
        return results.map(({ hook }) => hook);
      }
    };
    exports.ModuleNameTrie = ModuleNameTrie;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/RequireInTheMiddleSingleton.js
var require_RequireInTheMiddleSingleton = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/RequireInTheMiddleSingleton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RequireInTheMiddleSingleton = void 0;
    var require_in_the_middle_1 = require_require_in_the_middle();
    var path2 = __require("path");
    var ModuleNameTrie_1 = require_ModuleNameTrie();
    var isMocha = [
      "afterEach",
      "after",
      "beforeEach",
      "before",
      "describe",
      "it"
    ].every((fn) => {
      return typeof global[fn] === "function";
    });
    var RequireInTheMiddleSingleton = class _RequireInTheMiddleSingleton {
      _moduleNameTrie = new ModuleNameTrie_1.ModuleNameTrie();
      static _instance;
      constructor() {
        this._initialize();
      }
      _initialize() {
        new require_in_the_middle_1.Hook(
          // Intercept all `require` calls; we will filter the matching ones below
          null,
          { internals: true },
          (exports2, name, basedir) => {
            const normalizedModuleName = normalizePathSeparators(name);
            const matches = this._moduleNameTrie.search(normalizedModuleName, {
              maintainInsertionOrder: true,
              // For core modules (e.g. `fs`), do not match on sub-paths (e.g. `fs/promises').
              // This matches the behavior of `require-in-the-middle`.
              // `basedir` is always `undefined` for core modules.
              fullOnly: basedir === void 0
            });
            for (const { onRequire } of matches) {
              exports2 = onRequire(exports2, name, basedir);
            }
            return exports2;
          }
        );
      }
      /**
       * Register a hook with `require-in-the-middle`
       *
       * @param {string} moduleName Module name
       * @param {OnRequireFn} onRequire Hook function
       * @returns {Hooked} Registered hook
       */
      register(moduleName, onRequire) {
        const hooked = { moduleName, onRequire };
        this._moduleNameTrie.insert(hooked);
        return hooked;
      }
      /**
       * Get the `RequireInTheMiddleSingleton` singleton
       *
       * @returns {RequireInTheMiddleSingleton} Singleton of `RequireInTheMiddleSingleton`
       */
      static getInstance() {
        if (isMocha)
          return new _RequireInTheMiddleSingleton();
        return this._instance = this._instance ?? new _RequireInTheMiddleSingleton();
      }
    };
    exports.RequireInTheMiddleSingleton = RequireInTheMiddleSingleton;
    function normalizePathSeparators(moduleNameOrPath) {
      return path2.sep !== ModuleNameTrie_1.ModuleNameSeparator ? moduleNameOrPath.split(path2.sep).join(ModuleNameTrie_1.ModuleNameSeparator) : moduleNameOrPath;
    }
  }
});

// node_modules/.pnpm/import-in-the-middle@2.0.5/node_modules/import-in-the-middle/lib/register.js
var require_register = __commonJS({
  "node_modules/.pnpm/import-in-the-middle@2.0.5/node_modules/import-in-the-middle/lib/register.js"(exports) {
    var importHooks = [];
    var setters = /* @__PURE__ */ new WeakMap();
    var getters = /* @__PURE__ */ new WeakMap();
    var specifiers = /* @__PURE__ */ new Map();
    var toHook = [];
    var proxyHandler = {
      set(target, name, value) {
        const set = setters.get(target);
        const setter = set && set[name];
        if (typeof setter === "function") {
          return setter(value);
        }
        return true;
      },
      get(target, name) {
        if (name === Symbol.toStringTag) {
          return "Module";
        }
        const getter = getters.get(target)[name];
        if (typeof getter === "function") {
          return getter();
        }
      },
      defineProperty(target, property, descriptor) {
        if (!("value" in descriptor)) {
          throw new Error("Getters/setters are not supported for exports property descriptors.");
        }
        const set = setters.get(target);
        const setter = set && set[property];
        if (typeof setter === "function") {
          return setter(descriptor.value);
        }
        return true;
      }
    };
    function register(name, namespace, set, get, specifier) {
      specifiers.set(name, specifier);
      setters.set(namespace, set);
      getters.set(namespace, get);
      const proxy = new Proxy(namespace, proxyHandler);
      importHooks.forEach((hook) => hook(name, proxy, specifier));
      toHook.push([name, proxy, specifier]);
    }
    var experimentalPatchInternals = false;
    function getExperimentalPatchInternals() {
      return experimentalPatchInternals;
    }
    function setExperimentalPatchInternals(value) {
      experimentalPatchInternals = value;
    }
    exports.register = register;
    exports.importHooks = importHooks;
    exports.specifiers = specifiers;
    exports.toHook = toHook;
    exports.getExperimentalPatchInternals = getExperimentalPatchInternals;
    exports.setExperimentalPatchInternals = setExperimentalPatchInternals;
  }
});

// node_modules/.pnpm/import-in-the-middle@2.0.5/node_modules/import-in-the-middle/index.js
var require_import_in_the_middle = __commonJS({
  "node_modules/.pnpm/import-in-the-middle@2.0.5/node_modules/import-in-the-middle/index.js"(exports, module) {
    var path2 = __require("path");
    var parse2 = require_module_details_from_path();
    var { fileURLToPath: fileURLToPath2 } = __require("url");
    var { MessageChannel } = __require("worker_threads");
    var {
      importHooks,
      specifiers,
      toHook,
      getExperimentalPatchInternals
    } = require_register();
    function addHook(hook) {
      importHooks.push(hook);
      toHook.forEach(([name, namespace, specifier]) => hook(name, namespace, specifier));
    }
    function removeHook(hook) {
      const index = importHooks.indexOf(hook);
      if (index > -1) {
        importHooks.splice(index, 1);
      }
    }
    function callHookFn(hookFn, namespace, name, baseDir) {
      const newDefault = hookFn(namespace, name, baseDir);
      if (newDefault && newDefault !== namespace) {
        if ("default" in namespace) {
          namespace.default = newDefault;
        }
      }
    }
    var sendModulesToLoader;
    function createAddHookMessageChannel() {
      const { port1, port2 } = new MessageChannel();
      let pendingAckCount = 0;
      let resolveFn;
      sendModulesToLoader = (modules) => {
        pendingAckCount++;
        port1.postMessage(modules);
      };
      port1.on("message", () => {
        pendingAckCount--;
        if (resolveFn && pendingAckCount <= 0) {
          resolveFn();
        }
      }).unref();
      function waitForAllMessagesAcknowledged() {
        const timer = setInterval(() => {
        }, 1e3);
        const promise = new Promise((resolve3) => {
          resolveFn = resolve3;
        }).then(() => {
          clearInterval(timer);
        });
        if (pendingAckCount === 0) {
          resolveFn();
        }
        return promise;
      }
      const addHookMessagePort = port2;
      const registerOptions = { data: { addHookMessagePort, include: [] }, transferList: [addHookMessagePort] };
      return { registerOptions, addHookMessagePort, waitForAllMessagesAcknowledged };
    }
    function Hook(modules, options, hookFn) {
      if (this instanceof Hook === false) return new Hook(modules, options, hookFn);
      if (typeof modules === "function") {
        hookFn = modules;
        modules = null;
        options = null;
      } else if (typeof options === "function") {
        hookFn = options;
        options = null;
      }
      const internals = options ? options.internals === true : false;
      if (sendModulesToLoader && Array.isArray(modules)) {
        sendModulesToLoader(modules);
      }
      this._iitmHook = (name, namespace, specifier) => {
        const filename = name;
        const isBuiltin2 = name.startsWith("node:");
        let baseDir;
        if (isBuiltin2) {
          name = name.replace(/^node:/, "");
        } else {
          if (name.startsWith("file://")) {
            const stackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;
            try {
              name = fileURLToPath2(name);
            } catch (e) {
            }
            Error.stackTraceLimit = stackTraceLimit;
          }
          const details = parse2(name);
          if (details) {
            name = details.name;
            baseDir = details.basedir;
          }
        }
        if (modules) {
          for (const moduleName of modules) {
            const nameMatch = moduleName === name;
            const specMatch = moduleName === specifier;
            if (nameMatch || specMatch) {
              if (baseDir) {
                if (internals) {
                  name = name + path2.sep + path2.relative(baseDir, fileURLToPath2(filename));
                } else {
                  if (!getExperimentalPatchInternals() && !specMatch && !baseDir.endsWith(specifiers.get(filename))) {
                    continue;
                  }
                }
              }
              callHookFn(hookFn, namespace, name, baseDir);
            }
          }
        } else {
          callHookFn(hookFn, namespace, name, baseDir);
        }
      };
      addHook(this._iitmHook);
    }
    Hook.prototype.unhook = function() {
      removeHook(this._iitmHook);
    };
    module.exports = Hook;
    module.exports.Hook = Hook;
    module.exports.addHook = addHook;
    module.exports.removeHook = removeHook;
    module.exports.createAddHookMessageChannel = createAddHookMessageChannel;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isWrapped = exports.safeExecuteInTheMiddleAsync = exports.safeExecuteInTheMiddle = void 0;
    function safeExecuteInTheMiddle(execute, onFinish, preventThrowingError) {
      let error3;
      let result;
      try {
        result = execute();
      } catch (e) {
        error3 = e;
      } finally {
        onFinish(error3, result);
        if (error3 && !preventThrowingError) {
          throw error3;
        }
        return result;
      }
    }
    exports.safeExecuteInTheMiddle = safeExecuteInTheMiddle;
    async function safeExecuteInTheMiddleAsync(execute, onFinish, preventThrowingError) {
      let error3;
      let result;
      try {
        result = await execute();
      } catch (e) {
        error3 = e;
      } finally {
        await onFinish(error3, result);
        if (error3 && !preventThrowingError) {
          throw error3;
        }
        return result;
      }
    }
    exports.safeExecuteInTheMiddleAsync = safeExecuteInTheMiddleAsync;
    function isWrapped(func) {
      return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
    }
    exports.isWrapped = isWrapped;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.js
var require_instrumentation2 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationBase = void 0;
    var path2 = __require("path");
    var util_1 = __require("util");
    var semver_1 = require_semver();
    var shimmer_1 = require_shimmer();
    var instrumentation_1 = require_instrumentation();
    var RequireInTheMiddleSingleton_1 = require_RequireInTheMiddleSingleton();
    var import_in_the_middle_1 = require_import_in_the_middle();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var require_in_the_middle_1 = require_require_in_the_middle();
    var fs_1 = __require("fs");
    var utils_1 = require_utils();
    var InstrumentationBase2 = class extends instrumentation_1.InstrumentationAbstract {
      _modules;
      _hooks = [];
      _requireInTheMiddleSingleton = RequireInTheMiddleSingleton_1.RequireInTheMiddleSingleton.getInstance();
      _enabled = false;
      constructor(instrumentationName, instrumentationVersion, config) {
        super(instrumentationName, instrumentationVersion, config);
        let modules = this.init();
        if (modules && !Array.isArray(modules)) {
          modules = [modules];
        }
        this._modules = modules || [];
        if (this._config.enabled) {
          this.enable();
        }
      }
      _wrap = (moduleExports, name, wrapper) => {
        if ((0, utils_1.isWrapped)(moduleExports[name])) {
          this._unwrap(moduleExports, name);
        }
        if (!util_1.types.isProxy(moduleExports)) {
          return (0, shimmer_1.wrap)(moduleExports, name, wrapper);
        } else {
          const wrapped = (0, shimmer_1.wrap)(Object.assign({}, moduleExports), name, wrapper);
          Object.defineProperty(moduleExports, name, {
            value: wrapped
          });
          return wrapped;
        }
      };
      _unwrap = (moduleExports, name) => {
        if (!util_1.types.isProxy(moduleExports)) {
          return (0, shimmer_1.unwrap)(moduleExports, name);
        } else {
          return Object.defineProperty(moduleExports, name, {
            value: moduleExports[name]
          });
        }
      };
      _massWrap = (moduleExportsArray, names, wrapper) => {
        if (!moduleExportsArray) {
          api_1.diag.error("must provide one or more modules to patch");
          return;
        } else if (!Array.isArray(moduleExportsArray)) {
          moduleExportsArray = [moduleExportsArray];
        }
        if (!(names && Array.isArray(names))) {
          api_1.diag.error("must provide one or more functions to wrap on modules");
          return;
        }
        moduleExportsArray.forEach((moduleExports) => {
          names.forEach((name) => {
            this._wrap(moduleExports, name, wrapper);
          });
        });
      };
      _massUnwrap = (moduleExportsArray, names) => {
        if (!moduleExportsArray) {
          api_1.diag.error("must provide one or more modules to patch");
          return;
        } else if (!Array.isArray(moduleExportsArray)) {
          moduleExportsArray = [moduleExportsArray];
        }
        if (!(names && Array.isArray(names))) {
          api_1.diag.error("must provide one or more functions to wrap on modules");
          return;
        }
        moduleExportsArray.forEach((moduleExports) => {
          names.forEach((name) => {
            this._unwrap(moduleExports, name);
          });
        });
      };
      _warnOnPreloadedModules() {
        this._modules.forEach((module2) => {
          const { name } = module2;
          try {
            const resolvedModule = __require.resolve(name);
            if (__require.cache[resolvedModule]) {
              this._diag.warn(`Module ${name} has been loaded before ${this.instrumentationName} so it might not work, please initialize it before requiring ${name}`);
            }
          } catch {
          }
        });
      }
      _extractPackageVersion(baseDir) {
        try {
          const json = (0, fs_1.readFileSync)(path2.join(baseDir, "package.json"), {
            encoding: "utf8"
          });
          const version2 = JSON.parse(json).version;
          return typeof version2 === "string" ? version2 : void 0;
        } catch {
          api_1.diag.warn("Failed extracting version", baseDir);
        }
        return void 0;
      }
      _onRequire(module2, exports2, name, baseDir) {
        if (!baseDir) {
          if (typeof module2.patch === "function") {
            module2.moduleExports = exports2;
            if (this._enabled) {
              this._diag.debug("Applying instrumentation patch for nodejs core module on require hook", {
                module: module2.name
              });
              return module2.patch(exports2);
            }
          }
          return exports2;
        }
        const version2 = this._extractPackageVersion(baseDir);
        module2.moduleVersion = version2;
        if (module2.name === name) {
          if (isSupported(module2.supportedVersions, version2, module2.includePrerelease)) {
            if (typeof module2.patch === "function") {
              module2.moduleExports = exports2;
              if (this._enabled) {
                this._diag.debug("Applying instrumentation patch for module on require hook", {
                  module: module2.name,
                  version: module2.moduleVersion,
                  baseDir
                });
                return module2.patch(exports2, module2.moduleVersion);
              }
            }
          }
          return exports2;
        }
        const files = module2.files ?? [];
        const normalizedName = path2.normalize(name);
        const supportedFileInstrumentations = files.filter((f) => f.name === normalizedName).filter((f) => isSupported(f.supportedVersions, version2, module2.includePrerelease));
        return supportedFileInstrumentations.reduce((patchedExports, file) => {
          file.moduleExports = patchedExports;
          if (this._enabled) {
            this._diag.debug("Applying instrumentation patch for nodejs module file on require hook", {
              module: module2.name,
              version: module2.moduleVersion,
              fileName: file.name,
              baseDir
            });
            return file.patch(patchedExports, module2.moduleVersion);
          }
          return patchedExports;
        }, exports2);
      }
      enable() {
        if (this._enabled) {
          return;
        }
        this._enabled = true;
        if (this._hooks.length > 0) {
          for (const module2 of this._modules) {
            if (typeof module2.patch === "function" && module2.moduleExports) {
              this._diag.debug("Applying instrumentation patch for nodejs module on instrumentation enabled", {
                module: module2.name,
                version: module2.moduleVersion
              });
              module2.patch(module2.moduleExports, module2.moduleVersion);
            }
            for (const file of module2.files) {
              if (file.moduleExports) {
                this._diag.debug("Applying instrumentation patch for nodejs module file on instrumentation enabled", {
                  module: module2.name,
                  version: module2.moduleVersion,
                  fileName: file.name
                });
                file.patch(file.moduleExports, module2.moduleVersion);
              }
            }
          }
          return;
        }
        this._warnOnPreloadedModules();
        for (const module2 of this._modules) {
          const hookFn = (exports2, name, baseDir) => {
            if (!baseDir && path2.isAbsolute(name)) {
              const parsedPath = path2.parse(name);
              name = parsedPath.name;
              baseDir = parsedPath.dir;
            }
            return this._onRequire(module2, exports2, name, baseDir);
          };
          const onRequire = (exports2, name, baseDir) => {
            return this._onRequire(module2, exports2, name, baseDir);
          };
          const hook = path2.isAbsolute(module2.name) ? new require_in_the_middle_1.Hook([module2.name], { internals: true }, onRequire) : this._requireInTheMiddleSingleton.register(module2.name, onRequire);
          this._hooks.push(hook);
          const esmHook = new import_in_the_middle_1.Hook([module2.name], { internals: false }, hookFn);
          this._hooks.push(esmHook);
        }
      }
      disable() {
        if (!this._enabled) {
          return;
        }
        this._enabled = false;
        for (const module2 of this._modules) {
          if (typeof module2.unpatch === "function" && module2.moduleExports) {
            this._diag.debug("Removing instrumentation patch for nodejs module on instrumentation disabled", {
              module: module2.name,
              version: module2.moduleVersion
            });
            module2.unpatch(module2.moduleExports, module2.moduleVersion);
          }
          for (const file of module2.files) {
            if (file.moduleExports) {
              this._diag.debug("Removing instrumentation patch for nodejs module file on instrumentation disabled", {
                module: module2.name,
                version: module2.moduleVersion,
                fileName: file.name
              });
              file.unpatch(file.moduleExports, module2.moduleVersion);
            }
          }
        }
      }
      isEnabled() {
        return this._enabled;
      }
    };
    exports.InstrumentationBase = InstrumentationBase2;
    function isSupported(supportedVersions, version2, includePrerelease) {
      if (typeof version2 === "undefined") {
        return supportedVersions.includes("*");
      }
      return supportedVersions.some((supportedVersion) => {
        return (0, semver_1.satisfies)(version2, supportedVersion, { includePrerelease });
      });
    }
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/normalize.js
var require_normalize = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/normalize.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalize = void 0;
    var path_1 = __require("path");
    Object.defineProperty(exports, "normalize", { enumerable: true, get: function() {
      return path_1.normalize;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.js
var require_node3 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalize = exports.InstrumentationBase = void 0;
    var instrumentation_1 = require_instrumentation2();
    Object.defineProperty(exports, "InstrumentationBase", { enumerable: true, get: function() {
      return instrumentation_1.InstrumentationBase;
    } });
    var normalize_1 = require_normalize();
    Object.defineProperty(exports, "normalize", { enumerable: true, get: function() {
      return normalize_1.normalize;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/index.js
var require_platform2 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/platform/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalize = exports.InstrumentationBase = void 0;
    var node_1 = require_node3();
    Object.defineProperty(exports, "InstrumentationBase", { enumerable: true, get: function() {
      return node_1.InstrumentationBase;
    } });
    Object.defineProperty(exports, "normalize", { enumerable: true, get: function() {
      return node_1.normalize;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleDefinition.js
var require_instrumentationNodeModuleDefinition = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationNodeModuleDefinition = void 0;
    var InstrumentationNodeModuleDefinition = class {
      name;
      supportedVersions;
      patch;
      unpatch;
      files;
      constructor(name, supportedVersions, patch, unpatch, files) {
        this.name = name;
        this.supportedVersions = supportedVersions;
        this.patch = patch;
        this.unpatch = unpatch;
        this.files = files || [];
      }
    };
    exports.InstrumentationNodeModuleDefinition = InstrumentationNodeModuleDefinition;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleFile.js
var require_instrumentationNodeModuleFile = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleFile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationNodeModuleFile = void 0;
    var index_1 = require_platform2();
    var InstrumentationNodeModuleFile = class {
      supportedVersions;
      patch;
      unpatch;
      name;
      constructor(name, supportedVersions, patch, unpatch) {
        this.supportedVersions = supportedVersions;
        this.patch = patch;
        this.unpatch = unpatch;
        this.name = (0, index_1.normalize)(name);
      }
    };
    exports.InstrumentationNodeModuleFile = InstrumentationNodeModuleFile;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/semconvStability.js
var require_semconvStability = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/semconvStability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.semconvStabilityFromStr = exports.SemconvStability = void 0;
    var SemconvStability;
    (function(SemconvStability2) {
      SemconvStability2[SemconvStability2["STABLE"] = 1] = "STABLE";
      SemconvStability2[SemconvStability2["OLD"] = 2] = "OLD";
      SemconvStability2[SemconvStability2["DUPLICATE"] = 3] = "DUPLICATE";
    })(SemconvStability = exports.SemconvStability || (exports.SemconvStability = {}));
    function semconvStabilityFromStr(namespace, str) {
      let semconvStability = SemconvStability.OLD;
      const entries = str?.split(",").map((v) => v.trim()).filter((s) => s !== "");
      for (const entry of entries ?? []) {
        if (entry.toLowerCase() === namespace + "/dup") {
          semconvStability = SemconvStability.DUPLICATE;
          break;
        } else if (entry.toLowerCase() === namespace) {
          semconvStability = SemconvStability.STABLE;
        }
      }
      return semconvStability;
    }
    exports.semconvStabilityFromStr = semconvStabilityFromStr;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/index.js
var require_src3 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation@0.208.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.semconvStabilityFromStr = exports.SemconvStability = exports.safeExecuteInTheMiddleAsync = exports.safeExecuteInTheMiddle = exports.isWrapped = exports.InstrumentationNodeModuleFile = exports.InstrumentationNodeModuleDefinition = exports.InstrumentationBase = exports.registerInstrumentations = void 0;
    var autoLoader_1 = require_autoLoader();
    Object.defineProperty(exports, "registerInstrumentations", { enumerable: true, get: function() {
      return autoLoader_1.registerInstrumentations;
    } });
    var index_1 = require_platform2();
    Object.defineProperty(exports, "InstrumentationBase", { enumerable: true, get: function() {
      return index_1.InstrumentationBase;
    } });
    var instrumentationNodeModuleDefinition_1 = require_instrumentationNodeModuleDefinition();
    Object.defineProperty(exports, "InstrumentationNodeModuleDefinition", { enumerable: true, get: function() {
      return instrumentationNodeModuleDefinition_1.InstrumentationNodeModuleDefinition;
    } });
    var instrumentationNodeModuleFile_1 = require_instrumentationNodeModuleFile();
    Object.defineProperty(exports, "InstrumentationNodeModuleFile", { enumerable: true, get: function() {
      return instrumentationNodeModuleFile_1.InstrumentationNodeModuleFile;
    } });
    var utils_1 = require_utils();
    Object.defineProperty(exports, "isWrapped", { enumerable: true, get: function() {
      return utils_1.isWrapped;
    } });
    Object.defineProperty(exports, "safeExecuteInTheMiddle", { enumerable: true, get: function() {
      return utils_1.safeExecuteInTheMiddle;
    } });
    Object.defineProperty(exports, "safeExecuteInTheMiddleAsync", { enumerable: true, get: function() {
      return utils_1.safeExecuteInTheMiddleAsync;
    } });
    var semconvStability_1 = require_semconvStability();
    Object.defineProperty(exports, "SemconvStability", { enumerable: true, get: function() {
      return semconvStability_1.SemconvStability;
    } });
    Object.defineProperty(exports, "semconvStabilityFromStr", { enumerable: true, get: function() {
      return semconvStability_1.semconvStabilityFromStr;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js
var require_suppress_tracing = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTracingSuppressed = exports.unsuppressTracing = exports.suppressTracing = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var SUPPRESS_TRACING_KEY2 = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    function suppressTracing3(context2) {
      return context2.setValue(SUPPRESS_TRACING_KEY2, true);
    }
    exports.suppressTracing = suppressTracing3;
    function unsuppressTracing(context2) {
      return context2.deleteValue(SUPPRESS_TRACING_KEY2);
    }
    exports.unsuppressTracing = unsuppressTracing;
    function isTracingSuppressed3(context2) {
      return context2.getValue(SUPPRESS_TRACING_KEY2) === true;
    }
    exports.isTracingSuppressed = isTracingSuppressed3;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/baggage/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/baggage/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BAGGAGE_MAX_TOTAL_LENGTH = exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = exports.BAGGAGE_HEADER = exports.BAGGAGE_ITEMS_SEPARATOR = exports.BAGGAGE_PROPERTIES_SEPARATOR = exports.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
    exports.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    exports.BAGGAGE_PROPERTIES_SEPARATOR = ";";
    exports.BAGGAGE_ITEMS_SEPARATOR = ",";
    exports.BAGGAGE_HEADER = "baggage";
    exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    exports.BAGGAGE_MAX_TOTAL_LENGTH = 8192;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/baggage/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/baggage/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseKeyPairsIntoRecord = exports.parsePairKeyValue = exports.getKeyPairs = exports.serializeKeyPairs = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var constants_1 = require_constants();
    function serializeKeyPairs(keyPairs) {
      return keyPairs.reduce((hValue, current) => {
        const value = `${hValue}${hValue !== "" ? constants_1.BAGGAGE_ITEMS_SEPARATOR : ""}${current}`;
        return value.length > constants_1.BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
      }, "");
    }
    exports.serializeKeyPairs = serializeKeyPairs;
    function getKeyPairs(baggage) {
      return baggage.getAllEntries().map(([key, value]) => {
        let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
        if (value.metadata !== void 0) {
          entry += constants_1.BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
        }
        return entry;
      });
    }
    exports.getKeyPairs = getKeyPairs;
    function parsePairKeyValue(entry) {
      if (!entry)
        return;
      const metadataSeparatorIndex = entry.indexOf(constants_1.BAGGAGE_PROPERTIES_SEPARATOR);
      const keyPairPart = metadataSeparatorIndex === -1 ? entry : entry.substring(0, metadataSeparatorIndex);
      const separatorIndex = keyPairPart.indexOf(constants_1.BAGGAGE_KEY_PAIR_SEPARATOR);
      if (separatorIndex <= 0)
        return;
      const rawKey = keyPairPart.substring(0, separatorIndex).trim();
      const rawValue = keyPairPart.substring(separatorIndex + 1).trim();
      if (!rawKey || !rawValue)
        return;
      let key;
      let value;
      try {
        key = decodeURIComponent(rawKey);
        value = decodeURIComponent(rawValue);
      } catch {
        return;
      }
      let metadata;
      if (metadataSeparatorIndex !== -1 && metadataSeparatorIndex < entry.length - 1) {
        const metadataString = entry.substring(metadataSeparatorIndex + 1);
        metadata = (0, api_1.baggageEntryMetadataFromString)(metadataString);
      }
      return { key, value, metadata };
    }
    exports.parsePairKeyValue = parsePairKeyValue;
    function parseKeyPairsIntoRecord(value) {
      const result = {};
      if (typeof value === "string" && value.length > 0) {
        value.split(constants_1.BAGGAGE_ITEMS_SEPARATOR).forEach((entry) => {
          const keyPair = parsePairKeyValue(entry);
          if (keyPair !== void 0 && keyPair.value.length > 0) {
            result[keyPair.key] = keyPair.value;
          }
        });
      }
      return result;
    }
    exports.parseKeyPairsIntoRecord = parseKeyPairsIntoRecord;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js
var require_W3CBaggagePropagator = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.W3CBaggagePropagator = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var suppress_tracing_1 = require_suppress_tracing();
    var constants_1 = require_constants();
    var utils_1 = require_utils2();
    var W3CBaggagePropagator2 = class {
      inject(context2, carrier, setter) {
        const baggage = api_1.propagation.getBaggage(context2);
        if (!baggage || (0, suppress_tracing_1.isTracingSuppressed)(context2))
          return;
        const keyPairs = (0, utils_1.getKeyPairs)(baggage).filter((pair) => {
          return pair.length <= constants_1.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, constants_1.BAGGAGE_MAX_NAME_VALUE_PAIRS);
        const headerValue = (0, utils_1.serializeKeyPairs)(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, constants_1.BAGGAGE_HEADER, headerValue);
        }
      }
      extract(context2, carrier, getter) {
        const headerValue = getter.get(carrier, constants_1.BAGGAGE_HEADER);
        const baggageString = Array.isArray(headerValue) ? headerValue.join(constants_1.BAGGAGE_ITEMS_SEPARATOR) : headerValue;
        if (!baggageString)
          return context2;
        const baggage = {};
        if (baggageString.length === 0) {
          return context2;
        }
        const pairs = baggageString.split(constants_1.BAGGAGE_ITEMS_SEPARATOR);
        pairs.forEach((entry) => {
          const keyPair = (0, utils_1.parsePairKeyValue)(entry);
          if (keyPair) {
            const baggageEntry = { value: keyPair.value };
            if (keyPair.metadata) {
              baggageEntry.metadata = keyPair.metadata;
            }
            baggage[keyPair.key] = baggageEntry;
          }
        });
        if (Object.entries(baggage).length === 0) {
          return context2;
        }
        return api_1.propagation.setBaggage(context2, api_1.propagation.createBaggage(baggage));
      }
      fields() {
        return [constants_1.BAGGAGE_HEADER];
      }
    };
    exports.W3CBaggagePropagator = W3CBaggagePropagator2;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/anchored-clock.js
var require_anchored_clock = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/anchored-clock.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnchoredClock = void 0;
    var AnchoredClock = class {
      _monotonicClock;
      _epochMillis;
      _performanceMillis;
      /**
       * Create a new AnchoredClock anchored to the current time returned by systemClock.
       *
       * @param systemClock should be a clock that returns the number of milliseconds since January 1 1970 such as Date
       * @param monotonicClock should be a clock that counts milliseconds monotonically such as window.performance or perf_hooks.performance
       */
      constructor(systemClock, monotonicClock) {
        this._monotonicClock = monotonicClock;
        this._epochMillis = systemClock.now();
        this._performanceMillis = monotonicClock.now();
      }
      /**
       * Returns the current time by adding the number of milliseconds since the
       * AnchoredClock was created to the creation epoch time
       */
      now() {
        const delta = this._monotonicClock.now() - this._performanceMillis;
        return this._epochMillis + delta;
      }
    };
    exports.AnchoredClock = AnchoredClock;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/attributes.js
var require_attributes = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/attributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAttributeValue = exports.isAttributeKey = exports.sanitizeAttributes = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    function sanitizeAttributes(attributes2) {
      const out = {};
      if (typeof attributes2 !== "object" || attributes2 == null) {
        return out;
      }
      for (const key in attributes2) {
        if (!Object.prototype.hasOwnProperty.call(attributes2, key)) {
          continue;
        }
        if (!isAttributeKey(key)) {
          api_1.diag.warn(`Invalid attribute key: ${key}`);
          continue;
        }
        const val = attributes2[key];
        if (!isAttributeValue(val)) {
          api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
          continue;
        }
        if (Array.isArray(val)) {
          out[key] = val.slice();
        } else {
          out[key] = val;
        }
      }
      return out;
    }
    exports.sanitizeAttributes = sanitizeAttributes;
    function isAttributeKey(key) {
      return typeof key === "string" && key !== "";
    }
    exports.isAttributeKey = isAttributeKey;
    function isAttributeValue(val) {
      if (val == null) {
        return true;
      }
      if (Array.isArray(val)) {
        return isHomogeneousAttributeValueArray(val);
      }
      return isValidPrimitiveAttributeValueType(typeof val);
    }
    exports.isAttributeValue = isAttributeValue;
    function isHomogeneousAttributeValueArray(arr) {
      let type;
      for (const element of arr) {
        if (element == null)
          continue;
        const elementType = typeof element;
        if (elementType === type) {
          continue;
        }
        if (!type) {
          if (isValidPrimitiveAttributeValueType(elementType)) {
            type = elementType;
            continue;
          }
          return false;
        }
        return false;
      }
      return true;
    }
    function isValidPrimitiveAttributeValueType(valType) {
      switch (valType) {
        case "number":
        case "boolean":
        case "string":
          return true;
      }
      return false;
    }
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js
var require_logging_error_handler = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loggingErrorHandler = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    function loggingErrorHandler() {
      return (ex) => {
        api_1.diag.error(stringifyException(ex));
      };
    }
    exports.loggingErrorHandler = loggingErrorHandler;
    function stringifyException(ex) {
      if (typeof ex === "string") {
        return ex;
      } else {
        return JSON.stringify(flattenException(ex));
      }
    }
    function flattenException(ex) {
      const result = {};
      let current = ex;
      while (current !== null) {
        Object.getOwnPropertyNames(current).forEach((propertyName) => {
          if (result[propertyName])
            return;
          const value = current[propertyName];
          if (value) {
            result[propertyName] = String(value);
          }
        });
        current = Object.getPrototypeOf(current);
      }
      return result;
    }
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/global-error-handler.js
var require_global_error_handler = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/global-error-handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.globalErrorHandler = exports.setGlobalErrorHandler = void 0;
    var logging_error_handler_1 = require_logging_error_handler();
    var delegateHandler = (0, logging_error_handler_1.loggingErrorHandler)();
    function setGlobalErrorHandler(handler) {
      delegateHandler = handler;
    }
    exports.setGlobalErrorHandler = setGlobalErrorHandler;
    function globalErrorHandler(ex) {
      try {
        delegateHandler(ex);
      } catch {
      }
    }
    exports.globalErrorHandler = globalErrorHandler;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/platform/node/environment.js
var require_environment = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/platform/node/environment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getStringListFromEnv = exports.getBooleanFromEnv = exports.getStringFromEnv = exports.getNumberFromEnv = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var util_1 = __require("util");
    function getNumberFromEnv(key) {
      const raw = process.env[key];
      if (raw == null || raw.trim() === "") {
        return void 0;
      }
      const value = Number(raw);
      if (isNaN(value)) {
        api_1.diag.warn(`Unknown value ${(0, util_1.inspect)(raw)} for ${key}, expected a number, using defaults`);
        return void 0;
      }
      return value;
    }
    exports.getNumberFromEnv = getNumberFromEnv;
    function getStringFromEnv(key) {
      const raw = process.env[key];
      if (raw == null || raw.trim() === "") {
        return void 0;
      }
      return raw;
    }
    exports.getStringFromEnv = getStringFromEnv;
    function getBooleanFromEnv(key) {
      const raw = process.env[key]?.trim().toLowerCase();
      if (raw == null || raw === "") {
        return false;
      }
      if (raw === "true") {
        return true;
      } else if (raw === "false") {
        return false;
      } else {
        api_1.diag.warn(`Unknown value ${(0, util_1.inspect)(raw)} for ${key}, expected 'true' or 'false', falling back to 'false' (default)`);
        return false;
      }
    }
    exports.getBooleanFromEnv = getBooleanFromEnv;
    function getStringListFromEnv(key) {
      return getStringFromEnv(key)?.split(",").map((v) => v.trim()).filter((s) => s !== "");
    }
    exports.getStringListFromEnv = getStringListFromEnv;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/globalThis.js
var require_globalThis2 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/globalThis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = globalThis;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "2.4.0";
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/internal/utils.js
// @__NO_SIDE_EFFECTS__
function createConstMap(values) {
  let res = {};
  const len = values.length;
  for (let lp = 0; lp < len; lp++) {
    const val = values[lp];
    if (val) {
      res[String(val).toUpperCase().replace(/[-.]/g, "_")] = val;
    }
  }
  return res;
}
var init_utils3 = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/internal/utils.js"() {
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js
var TMP_AWS_LAMBDA_INVOKED_ARN, TMP_DB_SYSTEM, TMP_DB_CONNECTION_STRING, TMP_DB_USER, TMP_DB_JDBC_DRIVER_CLASSNAME, TMP_DB_NAME, TMP_DB_STATEMENT, TMP_DB_OPERATION, TMP_DB_MSSQL_INSTANCE_NAME, TMP_DB_CASSANDRA_KEYSPACE, TMP_DB_CASSANDRA_PAGE_SIZE, TMP_DB_CASSANDRA_CONSISTENCY_LEVEL, TMP_DB_CASSANDRA_TABLE, TMP_DB_CASSANDRA_IDEMPOTENCE, TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT, TMP_DB_CASSANDRA_COORDINATOR_ID, TMP_DB_CASSANDRA_COORDINATOR_DC, TMP_DB_HBASE_NAMESPACE, TMP_DB_REDIS_DATABASE_INDEX, TMP_DB_MONGODB_COLLECTION, TMP_DB_SQL_TABLE, TMP_EXCEPTION_TYPE, TMP_EXCEPTION_MESSAGE, TMP_EXCEPTION_STACKTRACE, TMP_EXCEPTION_ESCAPED, TMP_FAAS_TRIGGER, TMP_FAAS_EXECUTION, TMP_FAAS_DOCUMENT_COLLECTION, TMP_FAAS_DOCUMENT_OPERATION, TMP_FAAS_DOCUMENT_TIME, TMP_FAAS_DOCUMENT_NAME, TMP_FAAS_TIME, TMP_FAAS_CRON, TMP_FAAS_COLDSTART, TMP_FAAS_INVOKED_NAME, TMP_FAAS_INVOKED_PROVIDER, TMP_FAAS_INVOKED_REGION, TMP_NET_TRANSPORT, TMP_NET_PEER_IP, TMP_NET_PEER_PORT, TMP_NET_PEER_NAME, TMP_NET_HOST_IP, TMP_NET_HOST_PORT, TMP_NET_HOST_NAME, TMP_NET_HOST_CONNECTION_TYPE, TMP_NET_HOST_CONNECTION_SUBTYPE, TMP_NET_HOST_CARRIER_NAME, TMP_NET_HOST_CARRIER_MCC, TMP_NET_HOST_CARRIER_MNC, TMP_NET_HOST_CARRIER_ICC, TMP_PEER_SERVICE, TMP_ENDUSER_ID, TMP_ENDUSER_ROLE, TMP_ENDUSER_SCOPE, TMP_THREAD_ID, TMP_THREAD_NAME, TMP_CODE_FUNCTION, TMP_CODE_NAMESPACE, TMP_CODE_FILEPATH, TMP_CODE_LINENO, TMP_HTTP_METHOD, TMP_HTTP_URL, TMP_HTTP_TARGET, TMP_HTTP_HOST, TMP_HTTP_SCHEME, TMP_HTTP_STATUS_CODE, TMP_HTTP_FLAVOR, TMP_HTTP_USER_AGENT, TMP_HTTP_REQUEST_CONTENT_LENGTH, TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED, TMP_HTTP_RESPONSE_CONTENT_LENGTH, TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED, TMP_HTTP_SERVER_NAME, TMP_HTTP_ROUTE, TMP_HTTP_CLIENT_IP, TMP_AWS_DYNAMODB_TABLE_NAMES, TMP_AWS_DYNAMODB_CONSUMED_CAPACITY, TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS, TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY, TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY, TMP_AWS_DYNAMODB_CONSISTENT_READ, TMP_AWS_DYNAMODB_PROJECTION, TMP_AWS_DYNAMODB_LIMIT, TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET, TMP_AWS_DYNAMODB_INDEX_NAME, TMP_AWS_DYNAMODB_SELECT, TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES, TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES, TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE, TMP_AWS_DYNAMODB_TABLE_COUNT, TMP_AWS_DYNAMODB_SCAN_FORWARD, TMP_AWS_DYNAMODB_SEGMENT, TMP_AWS_DYNAMODB_TOTAL_SEGMENTS, TMP_AWS_DYNAMODB_COUNT, TMP_AWS_DYNAMODB_SCANNED_COUNT, TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS, TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES, TMP_MESSAGING_SYSTEM, TMP_MESSAGING_DESTINATION, TMP_MESSAGING_DESTINATION_KIND, TMP_MESSAGING_TEMP_DESTINATION, TMP_MESSAGING_PROTOCOL, TMP_MESSAGING_PROTOCOL_VERSION, TMP_MESSAGING_URL, TMP_MESSAGING_MESSAGE_ID, TMP_MESSAGING_CONVERSATION_ID, TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES, TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES, TMP_MESSAGING_OPERATION, TMP_MESSAGING_CONSUMER_ID, TMP_MESSAGING_RABBITMQ_ROUTING_KEY, TMP_MESSAGING_KAFKA_MESSAGE_KEY, TMP_MESSAGING_KAFKA_CONSUMER_GROUP, TMP_MESSAGING_KAFKA_CLIENT_ID, TMP_MESSAGING_KAFKA_PARTITION, TMP_MESSAGING_KAFKA_TOMBSTONE, TMP_RPC_SYSTEM, TMP_RPC_SERVICE, TMP_RPC_METHOD, TMP_RPC_GRPC_STATUS_CODE, TMP_RPC_JSONRPC_VERSION, TMP_RPC_JSONRPC_REQUEST_ID, TMP_RPC_JSONRPC_ERROR_CODE, TMP_RPC_JSONRPC_ERROR_MESSAGE, TMP_MESSAGE_TYPE, TMP_MESSAGE_ID, TMP_MESSAGE_COMPRESSED_SIZE, TMP_MESSAGE_UNCOMPRESSED_SIZE, SEMATTRS_AWS_LAMBDA_INVOKED_ARN, SEMATTRS_DB_SYSTEM, SEMATTRS_DB_CONNECTION_STRING, SEMATTRS_DB_USER, SEMATTRS_DB_JDBC_DRIVER_CLASSNAME, SEMATTRS_DB_NAME, SEMATTRS_DB_STATEMENT, SEMATTRS_DB_OPERATION, SEMATTRS_DB_MSSQL_INSTANCE_NAME, SEMATTRS_DB_CASSANDRA_KEYSPACE, SEMATTRS_DB_CASSANDRA_PAGE_SIZE, SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL, SEMATTRS_DB_CASSANDRA_TABLE, SEMATTRS_DB_CASSANDRA_IDEMPOTENCE, SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT, SEMATTRS_DB_CASSANDRA_COORDINATOR_ID, SEMATTRS_DB_CASSANDRA_COORDINATOR_DC, SEMATTRS_DB_HBASE_NAMESPACE, SEMATTRS_DB_REDIS_DATABASE_INDEX, SEMATTRS_DB_MONGODB_COLLECTION, SEMATTRS_DB_SQL_TABLE, SEMATTRS_EXCEPTION_TYPE, SEMATTRS_EXCEPTION_MESSAGE, SEMATTRS_EXCEPTION_STACKTRACE, SEMATTRS_EXCEPTION_ESCAPED, SEMATTRS_FAAS_TRIGGER, SEMATTRS_FAAS_EXECUTION, SEMATTRS_FAAS_DOCUMENT_COLLECTION, SEMATTRS_FAAS_DOCUMENT_OPERATION, SEMATTRS_FAAS_DOCUMENT_TIME, SEMATTRS_FAAS_DOCUMENT_NAME, SEMATTRS_FAAS_TIME, SEMATTRS_FAAS_CRON, SEMATTRS_FAAS_COLDSTART, SEMATTRS_FAAS_INVOKED_NAME, SEMATTRS_FAAS_INVOKED_PROVIDER, SEMATTRS_FAAS_INVOKED_REGION, SEMATTRS_NET_TRANSPORT, SEMATTRS_NET_PEER_IP, SEMATTRS_NET_PEER_PORT, SEMATTRS_NET_PEER_NAME, SEMATTRS_NET_HOST_IP, SEMATTRS_NET_HOST_PORT, SEMATTRS_NET_HOST_NAME, SEMATTRS_NET_HOST_CONNECTION_TYPE, SEMATTRS_NET_HOST_CONNECTION_SUBTYPE, SEMATTRS_NET_HOST_CARRIER_NAME, SEMATTRS_NET_HOST_CARRIER_MCC, SEMATTRS_NET_HOST_CARRIER_MNC, SEMATTRS_NET_HOST_CARRIER_ICC, SEMATTRS_PEER_SERVICE, SEMATTRS_ENDUSER_ID, SEMATTRS_ENDUSER_ROLE, SEMATTRS_ENDUSER_SCOPE, SEMATTRS_THREAD_ID, SEMATTRS_THREAD_NAME, SEMATTRS_CODE_FUNCTION, SEMATTRS_CODE_NAMESPACE, SEMATTRS_CODE_FILEPATH, SEMATTRS_CODE_LINENO, SEMATTRS_HTTP_METHOD, SEMATTRS_HTTP_URL, SEMATTRS_HTTP_TARGET, SEMATTRS_HTTP_HOST, SEMATTRS_HTTP_SCHEME, SEMATTRS_HTTP_STATUS_CODE, SEMATTRS_HTTP_FLAVOR, SEMATTRS_HTTP_USER_AGENT, SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH, SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED, SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH, SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED, SEMATTRS_HTTP_SERVER_NAME, SEMATTRS_HTTP_ROUTE, SEMATTRS_HTTP_CLIENT_IP, SEMATTRS_AWS_DYNAMODB_TABLE_NAMES, SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY, SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS, SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY, SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY, SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ, SEMATTRS_AWS_DYNAMODB_PROJECTION, SEMATTRS_AWS_DYNAMODB_LIMIT, SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET, SEMATTRS_AWS_DYNAMODB_INDEX_NAME, SEMATTRS_AWS_DYNAMODB_SELECT, SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES, SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES, SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE, SEMATTRS_AWS_DYNAMODB_TABLE_COUNT, SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD, SEMATTRS_AWS_DYNAMODB_SEGMENT, SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS, SEMATTRS_AWS_DYNAMODB_COUNT, SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT, SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS, SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES, SEMATTRS_MESSAGING_SYSTEM, SEMATTRS_MESSAGING_DESTINATION, SEMATTRS_MESSAGING_DESTINATION_KIND, SEMATTRS_MESSAGING_TEMP_DESTINATION, SEMATTRS_MESSAGING_PROTOCOL, SEMATTRS_MESSAGING_PROTOCOL_VERSION, SEMATTRS_MESSAGING_URL, SEMATTRS_MESSAGING_MESSAGE_ID, SEMATTRS_MESSAGING_CONVERSATION_ID, SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES, SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES, SEMATTRS_MESSAGING_OPERATION, SEMATTRS_MESSAGING_CONSUMER_ID, SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY, SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY, SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP, SEMATTRS_MESSAGING_KAFKA_CLIENT_ID, SEMATTRS_MESSAGING_KAFKA_PARTITION, SEMATTRS_MESSAGING_KAFKA_TOMBSTONE, SEMATTRS_RPC_SYSTEM, SEMATTRS_RPC_SERVICE, SEMATTRS_RPC_METHOD, SEMATTRS_RPC_GRPC_STATUS_CODE, SEMATTRS_RPC_JSONRPC_VERSION, SEMATTRS_RPC_JSONRPC_REQUEST_ID, SEMATTRS_RPC_JSONRPC_ERROR_CODE, SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE, SEMATTRS_MESSAGE_TYPE, SEMATTRS_MESSAGE_ID, SEMATTRS_MESSAGE_COMPRESSED_SIZE, SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE, SemanticAttributes, TMP_DBSYSTEMVALUES_OTHER_SQL, TMP_DBSYSTEMVALUES_MSSQL, TMP_DBSYSTEMVALUES_MYSQL, TMP_DBSYSTEMVALUES_ORACLE, TMP_DBSYSTEMVALUES_DB2, TMP_DBSYSTEMVALUES_POSTGRESQL, TMP_DBSYSTEMVALUES_REDSHIFT, TMP_DBSYSTEMVALUES_HIVE, TMP_DBSYSTEMVALUES_CLOUDSCAPE, TMP_DBSYSTEMVALUES_HSQLDB, TMP_DBSYSTEMVALUES_PROGRESS, TMP_DBSYSTEMVALUES_MAXDB, TMP_DBSYSTEMVALUES_HANADB, TMP_DBSYSTEMVALUES_INGRES, TMP_DBSYSTEMVALUES_FIRSTSQL, TMP_DBSYSTEMVALUES_EDB, TMP_DBSYSTEMVALUES_CACHE, TMP_DBSYSTEMVALUES_ADABAS, TMP_DBSYSTEMVALUES_FIREBIRD, TMP_DBSYSTEMVALUES_DERBY, TMP_DBSYSTEMVALUES_FILEMAKER, TMP_DBSYSTEMVALUES_INFORMIX, TMP_DBSYSTEMVALUES_INSTANTDB, TMP_DBSYSTEMVALUES_INTERBASE, TMP_DBSYSTEMVALUES_MARIADB, TMP_DBSYSTEMVALUES_NETEZZA, TMP_DBSYSTEMVALUES_PERVASIVE, TMP_DBSYSTEMVALUES_POINTBASE, TMP_DBSYSTEMVALUES_SQLITE, TMP_DBSYSTEMVALUES_SYBASE, TMP_DBSYSTEMVALUES_TERADATA, TMP_DBSYSTEMVALUES_VERTICA, TMP_DBSYSTEMVALUES_H2, TMP_DBSYSTEMVALUES_COLDFUSION, TMP_DBSYSTEMVALUES_CASSANDRA, TMP_DBSYSTEMVALUES_HBASE, TMP_DBSYSTEMVALUES_MONGODB, TMP_DBSYSTEMVALUES_REDIS, TMP_DBSYSTEMVALUES_COUCHBASE, TMP_DBSYSTEMVALUES_COUCHDB, TMP_DBSYSTEMVALUES_COSMOSDB, TMP_DBSYSTEMVALUES_DYNAMODB, TMP_DBSYSTEMVALUES_NEO4J, TMP_DBSYSTEMVALUES_GEODE, TMP_DBSYSTEMVALUES_ELASTICSEARCH, TMP_DBSYSTEMVALUES_MEMCACHED, TMP_DBSYSTEMVALUES_COCKROACHDB, DBSYSTEMVALUES_OTHER_SQL, DBSYSTEMVALUES_MSSQL, DBSYSTEMVALUES_MYSQL, DBSYSTEMVALUES_ORACLE, DBSYSTEMVALUES_DB2, DBSYSTEMVALUES_POSTGRESQL, DBSYSTEMVALUES_REDSHIFT, DBSYSTEMVALUES_HIVE, DBSYSTEMVALUES_CLOUDSCAPE, DBSYSTEMVALUES_HSQLDB, DBSYSTEMVALUES_PROGRESS, DBSYSTEMVALUES_MAXDB, DBSYSTEMVALUES_HANADB, DBSYSTEMVALUES_INGRES, DBSYSTEMVALUES_FIRSTSQL, DBSYSTEMVALUES_EDB, DBSYSTEMVALUES_CACHE, DBSYSTEMVALUES_ADABAS, DBSYSTEMVALUES_FIREBIRD, DBSYSTEMVALUES_DERBY, DBSYSTEMVALUES_FILEMAKER, DBSYSTEMVALUES_INFORMIX, DBSYSTEMVALUES_INSTANTDB, DBSYSTEMVALUES_INTERBASE, DBSYSTEMVALUES_MARIADB, DBSYSTEMVALUES_NETEZZA, DBSYSTEMVALUES_PERVASIVE, DBSYSTEMVALUES_POINTBASE, DBSYSTEMVALUES_SQLITE, DBSYSTEMVALUES_SYBASE, DBSYSTEMVALUES_TERADATA, DBSYSTEMVALUES_VERTICA, DBSYSTEMVALUES_H2, DBSYSTEMVALUES_COLDFUSION, DBSYSTEMVALUES_CASSANDRA, DBSYSTEMVALUES_HBASE, DBSYSTEMVALUES_MONGODB, DBSYSTEMVALUES_REDIS, DBSYSTEMVALUES_COUCHBASE, DBSYSTEMVALUES_COUCHDB, DBSYSTEMVALUES_COSMOSDB, DBSYSTEMVALUES_DYNAMODB, DBSYSTEMVALUES_NEO4J, DBSYSTEMVALUES_GEODE, DBSYSTEMVALUES_ELASTICSEARCH, DBSYSTEMVALUES_MEMCACHED, DBSYSTEMVALUES_COCKROACHDB, DbSystemValues, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL, DBCASSANDRACONSISTENCYLEVELVALUES_ALL, DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM, DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM, DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM, DBCASSANDRACONSISTENCYLEVELVALUES_ONE, DBCASSANDRACONSISTENCYLEVELVALUES_TWO, DBCASSANDRACONSISTENCYLEVELVALUES_THREE, DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE, DBCASSANDRACONSISTENCYLEVELVALUES_ANY, DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL, DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL, DbCassandraConsistencyLevelValues, TMP_FAASTRIGGERVALUES_DATASOURCE, TMP_FAASTRIGGERVALUES_HTTP, TMP_FAASTRIGGERVALUES_PUBSUB, TMP_FAASTRIGGERVALUES_TIMER, TMP_FAASTRIGGERVALUES_OTHER, FAASTRIGGERVALUES_DATASOURCE, FAASTRIGGERVALUES_HTTP, FAASTRIGGERVALUES_PUBSUB, FAASTRIGGERVALUES_TIMER, FAASTRIGGERVALUES_OTHER, FaasTriggerValues, TMP_FAASDOCUMENTOPERATIONVALUES_INSERT, TMP_FAASDOCUMENTOPERATIONVALUES_EDIT, TMP_FAASDOCUMENTOPERATIONVALUES_DELETE, FAASDOCUMENTOPERATIONVALUES_INSERT, FAASDOCUMENTOPERATIONVALUES_EDIT, FAASDOCUMENTOPERATIONVALUES_DELETE, FaasDocumentOperationValues, TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD, TMP_FAASINVOKEDPROVIDERVALUES_AWS, TMP_FAASINVOKEDPROVIDERVALUES_AZURE, TMP_FAASINVOKEDPROVIDERVALUES_GCP, FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD, FAASINVOKEDPROVIDERVALUES_AWS, FAASINVOKEDPROVIDERVALUES_AZURE, FAASINVOKEDPROVIDERVALUES_GCP, FaasInvokedProviderValues, TMP_NETTRANSPORTVALUES_IP_TCP, TMP_NETTRANSPORTVALUES_IP_UDP, TMP_NETTRANSPORTVALUES_IP, TMP_NETTRANSPORTVALUES_UNIX, TMP_NETTRANSPORTVALUES_PIPE, TMP_NETTRANSPORTVALUES_INPROC, TMP_NETTRANSPORTVALUES_OTHER, NETTRANSPORTVALUES_IP_TCP, NETTRANSPORTVALUES_IP_UDP, NETTRANSPORTVALUES_IP, NETTRANSPORTVALUES_UNIX, NETTRANSPORTVALUES_PIPE, NETTRANSPORTVALUES_INPROC, NETTRANSPORTVALUES_OTHER, NetTransportValues, TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI, TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED, TMP_NETHOSTCONNECTIONTYPEVALUES_CELL, TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE, TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN, NETHOSTCONNECTIONTYPEVALUES_WIFI, NETHOSTCONNECTIONTYPEVALUES_WIRED, NETHOSTCONNECTIONTYPEVALUES_CELL, NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE, NETHOSTCONNECTIONTYPEVALUES_UNKNOWN, NetHostConnectionTypeValues, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA, NETHOSTCONNECTIONSUBTYPEVALUES_GPRS, NETHOSTCONNECTIONSUBTYPEVALUES_EDGE, NETHOSTCONNECTIONSUBTYPEVALUES_UMTS, NETHOSTCONNECTIONSUBTYPEVALUES_CDMA, NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0, NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A, NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT, NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA, NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA, NETHOSTCONNECTIONSUBTYPEVALUES_HSPA, NETHOSTCONNECTIONSUBTYPEVALUES_IDEN, NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B, NETHOSTCONNECTIONSUBTYPEVALUES_LTE, NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD, NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP, NETHOSTCONNECTIONSUBTYPEVALUES_GSM, NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA, NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN, NETHOSTCONNECTIONSUBTYPEVALUES_NR, NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA, NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA, NetHostConnectionSubtypeValues, TMP_HTTPFLAVORVALUES_HTTP_1_0, TMP_HTTPFLAVORVALUES_HTTP_1_1, TMP_HTTPFLAVORVALUES_HTTP_2_0, TMP_HTTPFLAVORVALUES_SPDY, TMP_HTTPFLAVORVALUES_QUIC, HTTPFLAVORVALUES_HTTP_1_0, HTTPFLAVORVALUES_HTTP_1_1, HTTPFLAVORVALUES_HTTP_2_0, HTTPFLAVORVALUES_SPDY, HTTPFLAVORVALUES_QUIC, HttpFlavorValues, TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE, TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC, MESSAGINGDESTINATIONKINDVALUES_QUEUE, MESSAGINGDESTINATIONKINDVALUES_TOPIC, MessagingDestinationKindValues, TMP_MESSAGINGOPERATIONVALUES_RECEIVE, TMP_MESSAGINGOPERATIONVALUES_PROCESS, MESSAGINGOPERATIONVALUES_RECEIVE, MESSAGINGOPERATIONVALUES_PROCESS, MessagingOperationValues, TMP_RPCGRPCSTATUSCODEVALUES_OK, TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED, TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN, TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT, TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED, TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND, TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS, TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED, TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED, TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION, TMP_RPCGRPCSTATUSCODEVALUES_ABORTED, TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE, TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED, TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL, TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE, TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS, TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED, RPCGRPCSTATUSCODEVALUES_OK, RPCGRPCSTATUSCODEVALUES_CANCELLED, RPCGRPCSTATUSCODEVALUES_UNKNOWN, RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT, RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED, RPCGRPCSTATUSCODEVALUES_NOT_FOUND, RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS, RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED, RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED, RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION, RPCGRPCSTATUSCODEVALUES_ABORTED, RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE, RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED, RPCGRPCSTATUSCODEVALUES_INTERNAL, RPCGRPCSTATUSCODEVALUES_UNAVAILABLE, RPCGRPCSTATUSCODEVALUES_DATA_LOSS, RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED, RpcGrpcStatusCodeValues, TMP_MESSAGETYPEVALUES_SENT, TMP_MESSAGETYPEVALUES_RECEIVED, MESSAGETYPEVALUES_SENT, MESSAGETYPEVALUES_RECEIVED, MessageTypeValues;
var init_SemanticAttributes = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js"() {
    init_utils3();
    TMP_AWS_LAMBDA_INVOKED_ARN = "aws.lambda.invoked_arn";
    TMP_DB_SYSTEM = "db.system";
    TMP_DB_CONNECTION_STRING = "db.connection_string";
    TMP_DB_USER = "db.user";
    TMP_DB_JDBC_DRIVER_CLASSNAME = "db.jdbc.driver_classname";
    TMP_DB_NAME = "db.name";
    TMP_DB_STATEMENT = "db.statement";
    TMP_DB_OPERATION = "db.operation";
    TMP_DB_MSSQL_INSTANCE_NAME = "db.mssql.instance_name";
    TMP_DB_CASSANDRA_KEYSPACE = "db.cassandra.keyspace";
    TMP_DB_CASSANDRA_PAGE_SIZE = "db.cassandra.page_size";
    TMP_DB_CASSANDRA_CONSISTENCY_LEVEL = "db.cassandra.consistency_level";
    TMP_DB_CASSANDRA_TABLE = "db.cassandra.table";
    TMP_DB_CASSANDRA_IDEMPOTENCE = "db.cassandra.idempotence";
    TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = "db.cassandra.speculative_execution_count";
    TMP_DB_CASSANDRA_COORDINATOR_ID = "db.cassandra.coordinator.id";
    TMP_DB_CASSANDRA_COORDINATOR_DC = "db.cassandra.coordinator.dc";
    TMP_DB_HBASE_NAMESPACE = "db.hbase.namespace";
    TMP_DB_REDIS_DATABASE_INDEX = "db.redis.database_index";
    TMP_DB_MONGODB_COLLECTION = "db.mongodb.collection";
    TMP_DB_SQL_TABLE = "db.sql.table";
    TMP_EXCEPTION_TYPE = "exception.type";
    TMP_EXCEPTION_MESSAGE = "exception.message";
    TMP_EXCEPTION_STACKTRACE = "exception.stacktrace";
    TMP_EXCEPTION_ESCAPED = "exception.escaped";
    TMP_FAAS_TRIGGER = "faas.trigger";
    TMP_FAAS_EXECUTION = "faas.execution";
    TMP_FAAS_DOCUMENT_COLLECTION = "faas.document.collection";
    TMP_FAAS_DOCUMENT_OPERATION = "faas.document.operation";
    TMP_FAAS_DOCUMENT_TIME = "faas.document.time";
    TMP_FAAS_DOCUMENT_NAME = "faas.document.name";
    TMP_FAAS_TIME = "faas.time";
    TMP_FAAS_CRON = "faas.cron";
    TMP_FAAS_COLDSTART = "faas.coldstart";
    TMP_FAAS_INVOKED_NAME = "faas.invoked_name";
    TMP_FAAS_INVOKED_PROVIDER = "faas.invoked_provider";
    TMP_FAAS_INVOKED_REGION = "faas.invoked_region";
    TMP_NET_TRANSPORT = "net.transport";
    TMP_NET_PEER_IP = "net.peer.ip";
    TMP_NET_PEER_PORT = "net.peer.port";
    TMP_NET_PEER_NAME = "net.peer.name";
    TMP_NET_HOST_IP = "net.host.ip";
    TMP_NET_HOST_PORT = "net.host.port";
    TMP_NET_HOST_NAME = "net.host.name";
    TMP_NET_HOST_CONNECTION_TYPE = "net.host.connection.type";
    TMP_NET_HOST_CONNECTION_SUBTYPE = "net.host.connection.subtype";
    TMP_NET_HOST_CARRIER_NAME = "net.host.carrier.name";
    TMP_NET_HOST_CARRIER_MCC = "net.host.carrier.mcc";
    TMP_NET_HOST_CARRIER_MNC = "net.host.carrier.mnc";
    TMP_NET_HOST_CARRIER_ICC = "net.host.carrier.icc";
    TMP_PEER_SERVICE = "peer.service";
    TMP_ENDUSER_ID = "enduser.id";
    TMP_ENDUSER_ROLE = "enduser.role";
    TMP_ENDUSER_SCOPE = "enduser.scope";
    TMP_THREAD_ID = "thread.id";
    TMP_THREAD_NAME = "thread.name";
    TMP_CODE_FUNCTION = "code.function";
    TMP_CODE_NAMESPACE = "code.namespace";
    TMP_CODE_FILEPATH = "code.filepath";
    TMP_CODE_LINENO = "code.lineno";
    TMP_HTTP_METHOD = "http.method";
    TMP_HTTP_URL = "http.url";
    TMP_HTTP_TARGET = "http.target";
    TMP_HTTP_HOST = "http.host";
    TMP_HTTP_SCHEME = "http.scheme";
    TMP_HTTP_STATUS_CODE = "http.status_code";
    TMP_HTTP_FLAVOR = "http.flavor";
    TMP_HTTP_USER_AGENT = "http.user_agent";
    TMP_HTTP_REQUEST_CONTENT_LENGTH = "http.request_content_length";
    TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = "http.request_content_length_uncompressed";
    TMP_HTTP_RESPONSE_CONTENT_LENGTH = "http.response_content_length";
    TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = "http.response_content_length_uncompressed";
    TMP_HTTP_SERVER_NAME = "http.server_name";
    TMP_HTTP_ROUTE = "http.route";
    TMP_HTTP_CLIENT_IP = "http.client_ip";
    TMP_AWS_DYNAMODB_TABLE_NAMES = "aws.dynamodb.table_names";
    TMP_AWS_DYNAMODB_CONSUMED_CAPACITY = "aws.dynamodb.consumed_capacity";
    TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = "aws.dynamodb.item_collection_metrics";
    TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = "aws.dynamodb.provisioned_read_capacity";
    TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = "aws.dynamodb.provisioned_write_capacity";
    TMP_AWS_DYNAMODB_CONSISTENT_READ = "aws.dynamodb.consistent_read";
    TMP_AWS_DYNAMODB_PROJECTION = "aws.dynamodb.projection";
    TMP_AWS_DYNAMODB_LIMIT = "aws.dynamodb.limit";
    TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET = "aws.dynamodb.attributes_to_get";
    TMP_AWS_DYNAMODB_INDEX_NAME = "aws.dynamodb.index_name";
    TMP_AWS_DYNAMODB_SELECT = "aws.dynamodb.select";
    TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = "aws.dynamodb.global_secondary_indexes";
    TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = "aws.dynamodb.local_secondary_indexes";
    TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = "aws.dynamodb.exclusive_start_table";
    TMP_AWS_DYNAMODB_TABLE_COUNT = "aws.dynamodb.table_count";
    TMP_AWS_DYNAMODB_SCAN_FORWARD = "aws.dynamodb.scan_forward";
    TMP_AWS_DYNAMODB_SEGMENT = "aws.dynamodb.segment";
    TMP_AWS_DYNAMODB_TOTAL_SEGMENTS = "aws.dynamodb.total_segments";
    TMP_AWS_DYNAMODB_COUNT = "aws.dynamodb.count";
    TMP_AWS_DYNAMODB_SCANNED_COUNT = "aws.dynamodb.scanned_count";
    TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = "aws.dynamodb.attribute_definitions";
    TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = "aws.dynamodb.global_secondary_index_updates";
    TMP_MESSAGING_SYSTEM = "messaging.system";
    TMP_MESSAGING_DESTINATION = "messaging.destination";
    TMP_MESSAGING_DESTINATION_KIND = "messaging.destination_kind";
    TMP_MESSAGING_TEMP_DESTINATION = "messaging.temp_destination";
    TMP_MESSAGING_PROTOCOL = "messaging.protocol";
    TMP_MESSAGING_PROTOCOL_VERSION = "messaging.protocol_version";
    TMP_MESSAGING_URL = "messaging.url";
    TMP_MESSAGING_MESSAGE_ID = "messaging.message_id";
    TMP_MESSAGING_CONVERSATION_ID = "messaging.conversation_id";
    TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = "messaging.message_payload_size_bytes";
    TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = "messaging.message_payload_compressed_size_bytes";
    TMP_MESSAGING_OPERATION = "messaging.operation";
    TMP_MESSAGING_CONSUMER_ID = "messaging.consumer_id";
    TMP_MESSAGING_RABBITMQ_ROUTING_KEY = "messaging.rabbitmq.routing_key";
    TMP_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message_key";
    TMP_MESSAGING_KAFKA_CONSUMER_GROUP = "messaging.kafka.consumer_group";
    TMP_MESSAGING_KAFKA_CLIENT_ID = "messaging.kafka.client_id";
    TMP_MESSAGING_KAFKA_PARTITION = "messaging.kafka.partition";
    TMP_MESSAGING_KAFKA_TOMBSTONE = "messaging.kafka.tombstone";
    TMP_RPC_SYSTEM = "rpc.system";
    TMP_RPC_SERVICE = "rpc.service";
    TMP_RPC_METHOD = "rpc.method";
    TMP_RPC_GRPC_STATUS_CODE = "rpc.grpc.status_code";
    TMP_RPC_JSONRPC_VERSION = "rpc.jsonrpc.version";
    TMP_RPC_JSONRPC_REQUEST_ID = "rpc.jsonrpc.request_id";
    TMP_RPC_JSONRPC_ERROR_CODE = "rpc.jsonrpc.error_code";
    TMP_RPC_JSONRPC_ERROR_MESSAGE = "rpc.jsonrpc.error_message";
    TMP_MESSAGE_TYPE = "message.type";
    TMP_MESSAGE_ID = "message.id";
    TMP_MESSAGE_COMPRESSED_SIZE = "message.compressed_size";
    TMP_MESSAGE_UNCOMPRESSED_SIZE = "message.uncompressed_size";
    SEMATTRS_AWS_LAMBDA_INVOKED_ARN = TMP_AWS_LAMBDA_INVOKED_ARN;
    SEMATTRS_DB_SYSTEM = TMP_DB_SYSTEM;
    SEMATTRS_DB_CONNECTION_STRING = TMP_DB_CONNECTION_STRING;
    SEMATTRS_DB_USER = TMP_DB_USER;
    SEMATTRS_DB_JDBC_DRIVER_CLASSNAME = TMP_DB_JDBC_DRIVER_CLASSNAME;
    SEMATTRS_DB_NAME = TMP_DB_NAME;
    SEMATTRS_DB_STATEMENT = TMP_DB_STATEMENT;
    SEMATTRS_DB_OPERATION = TMP_DB_OPERATION;
    SEMATTRS_DB_MSSQL_INSTANCE_NAME = TMP_DB_MSSQL_INSTANCE_NAME;
    SEMATTRS_DB_CASSANDRA_KEYSPACE = TMP_DB_CASSANDRA_KEYSPACE;
    SEMATTRS_DB_CASSANDRA_PAGE_SIZE = TMP_DB_CASSANDRA_PAGE_SIZE;
    SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL = TMP_DB_CASSANDRA_CONSISTENCY_LEVEL;
    SEMATTRS_DB_CASSANDRA_TABLE = TMP_DB_CASSANDRA_TABLE;
    SEMATTRS_DB_CASSANDRA_IDEMPOTENCE = TMP_DB_CASSANDRA_IDEMPOTENCE;
    SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT;
    SEMATTRS_DB_CASSANDRA_COORDINATOR_ID = TMP_DB_CASSANDRA_COORDINATOR_ID;
    SEMATTRS_DB_CASSANDRA_COORDINATOR_DC = TMP_DB_CASSANDRA_COORDINATOR_DC;
    SEMATTRS_DB_HBASE_NAMESPACE = TMP_DB_HBASE_NAMESPACE;
    SEMATTRS_DB_REDIS_DATABASE_INDEX = TMP_DB_REDIS_DATABASE_INDEX;
    SEMATTRS_DB_MONGODB_COLLECTION = TMP_DB_MONGODB_COLLECTION;
    SEMATTRS_DB_SQL_TABLE = TMP_DB_SQL_TABLE;
    SEMATTRS_EXCEPTION_TYPE = TMP_EXCEPTION_TYPE;
    SEMATTRS_EXCEPTION_MESSAGE = TMP_EXCEPTION_MESSAGE;
    SEMATTRS_EXCEPTION_STACKTRACE = TMP_EXCEPTION_STACKTRACE;
    SEMATTRS_EXCEPTION_ESCAPED = TMP_EXCEPTION_ESCAPED;
    SEMATTRS_FAAS_TRIGGER = TMP_FAAS_TRIGGER;
    SEMATTRS_FAAS_EXECUTION = TMP_FAAS_EXECUTION;
    SEMATTRS_FAAS_DOCUMENT_COLLECTION = TMP_FAAS_DOCUMENT_COLLECTION;
    SEMATTRS_FAAS_DOCUMENT_OPERATION = TMP_FAAS_DOCUMENT_OPERATION;
    SEMATTRS_FAAS_DOCUMENT_TIME = TMP_FAAS_DOCUMENT_TIME;
    SEMATTRS_FAAS_DOCUMENT_NAME = TMP_FAAS_DOCUMENT_NAME;
    SEMATTRS_FAAS_TIME = TMP_FAAS_TIME;
    SEMATTRS_FAAS_CRON = TMP_FAAS_CRON;
    SEMATTRS_FAAS_COLDSTART = TMP_FAAS_COLDSTART;
    SEMATTRS_FAAS_INVOKED_NAME = TMP_FAAS_INVOKED_NAME;
    SEMATTRS_FAAS_INVOKED_PROVIDER = TMP_FAAS_INVOKED_PROVIDER;
    SEMATTRS_FAAS_INVOKED_REGION = TMP_FAAS_INVOKED_REGION;
    SEMATTRS_NET_TRANSPORT = TMP_NET_TRANSPORT;
    SEMATTRS_NET_PEER_IP = TMP_NET_PEER_IP;
    SEMATTRS_NET_PEER_PORT = TMP_NET_PEER_PORT;
    SEMATTRS_NET_PEER_NAME = TMP_NET_PEER_NAME;
    SEMATTRS_NET_HOST_IP = TMP_NET_HOST_IP;
    SEMATTRS_NET_HOST_PORT = TMP_NET_HOST_PORT;
    SEMATTRS_NET_HOST_NAME = TMP_NET_HOST_NAME;
    SEMATTRS_NET_HOST_CONNECTION_TYPE = TMP_NET_HOST_CONNECTION_TYPE;
    SEMATTRS_NET_HOST_CONNECTION_SUBTYPE = TMP_NET_HOST_CONNECTION_SUBTYPE;
    SEMATTRS_NET_HOST_CARRIER_NAME = TMP_NET_HOST_CARRIER_NAME;
    SEMATTRS_NET_HOST_CARRIER_MCC = TMP_NET_HOST_CARRIER_MCC;
    SEMATTRS_NET_HOST_CARRIER_MNC = TMP_NET_HOST_CARRIER_MNC;
    SEMATTRS_NET_HOST_CARRIER_ICC = TMP_NET_HOST_CARRIER_ICC;
    SEMATTRS_PEER_SERVICE = TMP_PEER_SERVICE;
    SEMATTRS_ENDUSER_ID = TMP_ENDUSER_ID;
    SEMATTRS_ENDUSER_ROLE = TMP_ENDUSER_ROLE;
    SEMATTRS_ENDUSER_SCOPE = TMP_ENDUSER_SCOPE;
    SEMATTRS_THREAD_ID = TMP_THREAD_ID;
    SEMATTRS_THREAD_NAME = TMP_THREAD_NAME;
    SEMATTRS_CODE_FUNCTION = TMP_CODE_FUNCTION;
    SEMATTRS_CODE_NAMESPACE = TMP_CODE_NAMESPACE;
    SEMATTRS_CODE_FILEPATH = TMP_CODE_FILEPATH;
    SEMATTRS_CODE_LINENO = TMP_CODE_LINENO;
    SEMATTRS_HTTP_METHOD = TMP_HTTP_METHOD;
    SEMATTRS_HTTP_URL = TMP_HTTP_URL;
    SEMATTRS_HTTP_TARGET = TMP_HTTP_TARGET;
    SEMATTRS_HTTP_HOST = TMP_HTTP_HOST;
    SEMATTRS_HTTP_SCHEME = TMP_HTTP_SCHEME;
    SEMATTRS_HTTP_STATUS_CODE = TMP_HTTP_STATUS_CODE;
    SEMATTRS_HTTP_FLAVOR = TMP_HTTP_FLAVOR;
    SEMATTRS_HTTP_USER_AGENT = TMP_HTTP_USER_AGENT;
    SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH = TMP_HTTP_REQUEST_CONTENT_LENGTH;
    SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED;
    SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH = TMP_HTTP_RESPONSE_CONTENT_LENGTH;
    SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED;
    SEMATTRS_HTTP_SERVER_NAME = TMP_HTTP_SERVER_NAME;
    SEMATTRS_HTTP_ROUTE = TMP_HTTP_ROUTE;
    SEMATTRS_HTTP_CLIENT_IP = TMP_HTTP_CLIENT_IP;
    SEMATTRS_AWS_DYNAMODB_TABLE_NAMES = TMP_AWS_DYNAMODB_TABLE_NAMES;
    SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY = TMP_AWS_DYNAMODB_CONSUMED_CAPACITY;
    SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS;
    SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY;
    SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY;
    SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ = TMP_AWS_DYNAMODB_CONSISTENT_READ;
    SEMATTRS_AWS_DYNAMODB_PROJECTION = TMP_AWS_DYNAMODB_PROJECTION;
    SEMATTRS_AWS_DYNAMODB_LIMIT = TMP_AWS_DYNAMODB_LIMIT;
    SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET = TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET;
    SEMATTRS_AWS_DYNAMODB_INDEX_NAME = TMP_AWS_DYNAMODB_INDEX_NAME;
    SEMATTRS_AWS_DYNAMODB_SELECT = TMP_AWS_DYNAMODB_SELECT;
    SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES;
    SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES;
    SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE;
    SEMATTRS_AWS_DYNAMODB_TABLE_COUNT = TMP_AWS_DYNAMODB_TABLE_COUNT;
    SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD = TMP_AWS_DYNAMODB_SCAN_FORWARD;
    SEMATTRS_AWS_DYNAMODB_SEGMENT = TMP_AWS_DYNAMODB_SEGMENT;
    SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS = TMP_AWS_DYNAMODB_TOTAL_SEGMENTS;
    SEMATTRS_AWS_DYNAMODB_COUNT = TMP_AWS_DYNAMODB_COUNT;
    SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT = TMP_AWS_DYNAMODB_SCANNED_COUNT;
    SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS;
    SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES;
    SEMATTRS_MESSAGING_SYSTEM = TMP_MESSAGING_SYSTEM;
    SEMATTRS_MESSAGING_DESTINATION = TMP_MESSAGING_DESTINATION;
    SEMATTRS_MESSAGING_DESTINATION_KIND = TMP_MESSAGING_DESTINATION_KIND;
    SEMATTRS_MESSAGING_TEMP_DESTINATION = TMP_MESSAGING_TEMP_DESTINATION;
    SEMATTRS_MESSAGING_PROTOCOL = TMP_MESSAGING_PROTOCOL;
    SEMATTRS_MESSAGING_PROTOCOL_VERSION = TMP_MESSAGING_PROTOCOL_VERSION;
    SEMATTRS_MESSAGING_URL = TMP_MESSAGING_URL;
    SEMATTRS_MESSAGING_MESSAGE_ID = TMP_MESSAGING_MESSAGE_ID;
    SEMATTRS_MESSAGING_CONVERSATION_ID = TMP_MESSAGING_CONVERSATION_ID;
    SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES;
    SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES;
    SEMATTRS_MESSAGING_OPERATION = TMP_MESSAGING_OPERATION;
    SEMATTRS_MESSAGING_CONSUMER_ID = TMP_MESSAGING_CONSUMER_ID;
    SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY = TMP_MESSAGING_RABBITMQ_ROUTING_KEY;
    SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY = TMP_MESSAGING_KAFKA_MESSAGE_KEY;
    SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP = TMP_MESSAGING_KAFKA_CONSUMER_GROUP;
    SEMATTRS_MESSAGING_KAFKA_CLIENT_ID = TMP_MESSAGING_KAFKA_CLIENT_ID;
    SEMATTRS_MESSAGING_KAFKA_PARTITION = TMP_MESSAGING_KAFKA_PARTITION;
    SEMATTRS_MESSAGING_KAFKA_TOMBSTONE = TMP_MESSAGING_KAFKA_TOMBSTONE;
    SEMATTRS_RPC_SYSTEM = TMP_RPC_SYSTEM;
    SEMATTRS_RPC_SERVICE = TMP_RPC_SERVICE;
    SEMATTRS_RPC_METHOD = TMP_RPC_METHOD;
    SEMATTRS_RPC_GRPC_STATUS_CODE = TMP_RPC_GRPC_STATUS_CODE;
    SEMATTRS_RPC_JSONRPC_VERSION = TMP_RPC_JSONRPC_VERSION;
    SEMATTRS_RPC_JSONRPC_REQUEST_ID = TMP_RPC_JSONRPC_REQUEST_ID;
    SEMATTRS_RPC_JSONRPC_ERROR_CODE = TMP_RPC_JSONRPC_ERROR_CODE;
    SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE = TMP_RPC_JSONRPC_ERROR_MESSAGE;
    SEMATTRS_MESSAGE_TYPE = TMP_MESSAGE_TYPE;
    SEMATTRS_MESSAGE_ID = TMP_MESSAGE_ID;
    SEMATTRS_MESSAGE_COMPRESSED_SIZE = TMP_MESSAGE_COMPRESSED_SIZE;
    SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE = TMP_MESSAGE_UNCOMPRESSED_SIZE;
    SemanticAttributes = /* @__PURE__ */ createConstMap([
      TMP_AWS_LAMBDA_INVOKED_ARN,
      TMP_DB_SYSTEM,
      TMP_DB_CONNECTION_STRING,
      TMP_DB_USER,
      TMP_DB_JDBC_DRIVER_CLASSNAME,
      TMP_DB_NAME,
      TMP_DB_STATEMENT,
      TMP_DB_OPERATION,
      TMP_DB_MSSQL_INSTANCE_NAME,
      TMP_DB_CASSANDRA_KEYSPACE,
      TMP_DB_CASSANDRA_PAGE_SIZE,
      TMP_DB_CASSANDRA_CONSISTENCY_LEVEL,
      TMP_DB_CASSANDRA_TABLE,
      TMP_DB_CASSANDRA_IDEMPOTENCE,
      TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT,
      TMP_DB_CASSANDRA_COORDINATOR_ID,
      TMP_DB_CASSANDRA_COORDINATOR_DC,
      TMP_DB_HBASE_NAMESPACE,
      TMP_DB_REDIS_DATABASE_INDEX,
      TMP_DB_MONGODB_COLLECTION,
      TMP_DB_SQL_TABLE,
      TMP_EXCEPTION_TYPE,
      TMP_EXCEPTION_MESSAGE,
      TMP_EXCEPTION_STACKTRACE,
      TMP_EXCEPTION_ESCAPED,
      TMP_FAAS_TRIGGER,
      TMP_FAAS_EXECUTION,
      TMP_FAAS_DOCUMENT_COLLECTION,
      TMP_FAAS_DOCUMENT_OPERATION,
      TMP_FAAS_DOCUMENT_TIME,
      TMP_FAAS_DOCUMENT_NAME,
      TMP_FAAS_TIME,
      TMP_FAAS_CRON,
      TMP_FAAS_COLDSTART,
      TMP_FAAS_INVOKED_NAME,
      TMP_FAAS_INVOKED_PROVIDER,
      TMP_FAAS_INVOKED_REGION,
      TMP_NET_TRANSPORT,
      TMP_NET_PEER_IP,
      TMP_NET_PEER_PORT,
      TMP_NET_PEER_NAME,
      TMP_NET_HOST_IP,
      TMP_NET_HOST_PORT,
      TMP_NET_HOST_NAME,
      TMP_NET_HOST_CONNECTION_TYPE,
      TMP_NET_HOST_CONNECTION_SUBTYPE,
      TMP_NET_HOST_CARRIER_NAME,
      TMP_NET_HOST_CARRIER_MCC,
      TMP_NET_HOST_CARRIER_MNC,
      TMP_NET_HOST_CARRIER_ICC,
      TMP_PEER_SERVICE,
      TMP_ENDUSER_ID,
      TMP_ENDUSER_ROLE,
      TMP_ENDUSER_SCOPE,
      TMP_THREAD_ID,
      TMP_THREAD_NAME,
      TMP_CODE_FUNCTION,
      TMP_CODE_NAMESPACE,
      TMP_CODE_FILEPATH,
      TMP_CODE_LINENO,
      TMP_HTTP_METHOD,
      TMP_HTTP_URL,
      TMP_HTTP_TARGET,
      TMP_HTTP_HOST,
      TMP_HTTP_SCHEME,
      TMP_HTTP_STATUS_CODE,
      TMP_HTTP_FLAVOR,
      TMP_HTTP_USER_AGENT,
      TMP_HTTP_REQUEST_CONTENT_LENGTH,
      TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED,
      TMP_HTTP_RESPONSE_CONTENT_LENGTH,
      TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED,
      TMP_HTTP_SERVER_NAME,
      TMP_HTTP_ROUTE,
      TMP_HTTP_CLIENT_IP,
      TMP_AWS_DYNAMODB_TABLE_NAMES,
      TMP_AWS_DYNAMODB_CONSUMED_CAPACITY,
      TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS,
      TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY,
      TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY,
      TMP_AWS_DYNAMODB_CONSISTENT_READ,
      TMP_AWS_DYNAMODB_PROJECTION,
      TMP_AWS_DYNAMODB_LIMIT,
      TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET,
      TMP_AWS_DYNAMODB_INDEX_NAME,
      TMP_AWS_DYNAMODB_SELECT,
      TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES,
      TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES,
      TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE,
      TMP_AWS_DYNAMODB_TABLE_COUNT,
      TMP_AWS_DYNAMODB_SCAN_FORWARD,
      TMP_AWS_DYNAMODB_SEGMENT,
      TMP_AWS_DYNAMODB_TOTAL_SEGMENTS,
      TMP_AWS_DYNAMODB_COUNT,
      TMP_AWS_DYNAMODB_SCANNED_COUNT,
      TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS,
      TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES,
      TMP_MESSAGING_SYSTEM,
      TMP_MESSAGING_DESTINATION,
      TMP_MESSAGING_DESTINATION_KIND,
      TMP_MESSAGING_TEMP_DESTINATION,
      TMP_MESSAGING_PROTOCOL,
      TMP_MESSAGING_PROTOCOL_VERSION,
      TMP_MESSAGING_URL,
      TMP_MESSAGING_MESSAGE_ID,
      TMP_MESSAGING_CONVERSATION_ID,
      TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES,
      TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES,
      TMP_MESSAGING_OPERATION,
      TMP_MESSAGING_CONSUMER_ID,
      TMP_MESSAGING_RABBITMQ_ROUTING_KEY,
      TMP_MESSAGING_KAFKA_MESSAGE_KEY,
      TMP_MESSAGING_KAFKA_CONSUMER_GROUP,
      TMP_MESSAGING_KAFKA_CLIENT_ID,
      TMP_MESSAGING_KAFKA_PARTITION,
      TMP_MESSAGING_KAFKA_TOMBSTONE,
      TMP_RPC_SYSTEM,
      TMP_RPC_SERVICE,
      TMP_RPC_METHOD,
      TMP_RPC_GRPC_STATUS_CODE,
      TMP_RPC_JSONRPC_VERSION,
      TMP_RPC_JSONRPC_REQUEST_ID,
      TMP_RPC_JSONRPC_ERROR_CODE,
      TMP_RPC_JSONRPC_ERROR_MESSAGE,
      TMP_MESSAGE_TYPE,
      TMP_MESSAGE_ID,
      TMP_MESSAGE_COMPRESSED_SIZE,
      TMP_MESSAGE_UNCOMPRESSED_SIZE
    ]);
    TMP_DBSYSTEMVALUES_OTHER_SQL = "other_sql";
    TMP_DBSYSTEMVALUES_MSSQL = "mssql";
    TMP_DBSYSTEMVALUES_MYSQL = "mysql";
    TMP_DBSYSTEMVALUES_ORACLE = "oracle";
    TMP_DBSYSTEMVALUES_DB2 = "db2";
    TMP_DBSYSTEMVALUES_POSTGRESQL = "postgresql";
    TMP_DBSYSTEMVALUES_REDSHIFT = "redshift";
    TMP_DBSYSTEMVALUES_HIVE = "hive";
    TMP_DBSYSTEMVALUES_CLOUDSCAPE = "cloudscape";
    TMP_DBSYSTEMVALUES_HSQLDB = "hsqldb";
    TMP_DBSYSTEMVALUES_PROGRESS = "progress";
    TMP_DBSYSTEMVALUES_MAXDB = "maxdb";
    TMP_DBSYSTEMVALUES_HANADB = "hanadb";
    TMP_DBSYSTEMVALUES_INGRES = "ingres";
    TMP_DBSYSTEMVALUES_FIRSTSQL = "firstsql";
    TMP_DBSYSTEMVALUES_EDB = "edb";
    TMP_DBSYSTEMVALUES_CACHE = "cache";
    TMP_DBSYSTEMVALUES_ADABAS = "adabas";
    TMP_DBSYSTEMVALUES_FIREBIRD = "firebird";
    TMP_DBSYSTEMVALUES_DERBY = "derby";
    TMP_DBSYSTEMVALUES_FILEMAKER = "filemaker";
    TMP_DBSYSTEMVALUES_INFORMIX = "informix";
    TMP_DBSYSTEMVALUES_INSTANTDB = "instantdb";
    TMP_DBSYSTEMVALUES_INTERBASE = "interbase";
    TMP_DBSYSTEMVALUES_MARIADB = "mariadb";
    TMP_DBSYSTEMVALUES_NETEZZA = "netezza";
    TMP_DBSYSTEMVALUES_PERVASIVE = "pervasive";
    TMP_DBSYSTEMVALUES_POINTBASE = "pointbase";
    TMP_DBSYSTEMVALUES_SQLITE = "sqlite";
    TMP_DBSYSTEMVALUES_SYBASE = "sybase";
    TMP_DBSYSTEMVALUES_TERADATA = "teradata";
    TMP_DBSYSTEMVALUES_VERTICA = "vertica";
    TMP_DBSYSTEMVALUES_H2 = "h2";
    TMP_DBSYSTEMVALUES_COLDFUSION = "coldfusion";
    TMP_DBSYSTEMVALUES_CASSANDRA = "cassandra";
    TMP_DBSYSTEMVALUES_HBASE = "hbase";
    TMP_DBSYSTEMVALUES_MONGODB = "mongodb";
    TMP_DBSYSTEMVALUES_REDIS = "redis";
    TMP_DBSYSTEMVALUES_COUCHBASE = "couchbase";
    TMP_DBSYSTEMVALUES_COUCHDB = "couchdb";
    TMP_DBSYSTEMVALUES_COSMOSDB = "cosmosdb";
    TMP_DBSYSTEMVALUES_DYNAMODB = "dynamodb";
    TMP_DBSYSTEMVALUES_NEO4J = "neo4j";
    TMP_DBSYSTEMVALUES_GEODE = "geode";
    TMP_DBSYSTEMVALUES_ELASTICSEARCH = "elasticsearch";
    TMP_DBSYSTEMVALUES_MEMCACHED = "memcached";
    TMP_DBSYSTEMVALUES_COCKROACHDB = "cockroachdb";
    DBSYSTEMVALUES_OTHER_SQL = TMP_DBSYSTEMVALUES_OTHER_SQL;
    DBSYSTEMVALUES_MSSQL = TMP_DBSYSTEMVALUES_MSSQL;
    DBSYSTEMVALUES_MYSQL = TMP_DBSYSTEMVALUES_MYSQL;
    DBSYSTEMVALUES_ORACLE = TMP_DBSYSTEMVALUES_ORACLE;
    DBSYSTEMVALUES_DB2 = TMP_DBSYSTEMVALUES_DB2;
    DBSYSTEMVALUES_POSTGRESQL = TMP_DBSYSTEMVALUES_POSTGRESQL;
    DBSYSTEMVALUES_REDSHIFT = TMP_DBSYSTEMVALUES_REDSHIFT;
    DBSYSTEMVALUES_HIVE = TMP_DBSYSTEMVALUES_HIVE;
    DBSYSTEMVALUES_CLOUDSCAPE = TMP_DBSYSTEMVALUES_CLOUDSCAPE;
    DBSYSTEMVALUES_HSQLDB = TMP_DBSYSTEMVALUES_HSQLDB;
    DBSYSTEMVALUES_PROGRESS = TMP_DBSYSTEMVALUES_PROGRESS;
    DBSYSTEMVALUES_MAXDB = TMP_DBSYSTEMVALUES_MAXDB;
    DBSYSTEMVALUES_HANADB = TMP_DBSYSTEMVALUES_HANADB;
    DBSYSTEMVALUES_INGRES = TMP_DBSYSTEMVALUES_INGRES;
    DBSYSTEMVALUES_FIRSTSQL = TMP_DBSYSTEMVALUES_FIRSTSQL;
    DBSYSTEMVALUES_EDB = TMP_DBSYSTEMVALUES_EDB;
    DBSYSTEMVALUES_CACHE = TMP_DBSYSTEMVALUES_CACHE;
    DBSYSTEMVALUES_ADABAS = TMP_DBSYSTEMVALUES_ADABAS;
    DBSYSTEMVALUES_FIREBIRD = TMP_DBSYSTEMVALUES_FIREBIRD;
    DBSYSTEMVALUES_DERBY = TMP_DBSYSTEMVALUES_DERBY;
    DBSYSTEMVALUES_FILEMAKER = TMP_DBSYSTEMVALUES_FILEMAKER;
    DBSYSTEMVALUES_INFORMIX = TMP_DBSYSTEMVALUES_INFORMIX;
    DBSYSTEMVALUES_INSTANTDB = TMP_DBSYSTEMVALUES_INSTANTDB;
    DBSYSTEMVALUES_INTERBASE = TMP_DBSYSTEMVALUES_INTERBASE;
    DBSYSTEMVALUES_MARIADB = TMP_DBSYSTEMVALUES_MARIADB;
    DBSYSTEMVALUES_NETEZZA = TMP_DBSYSTEMVALUES_NETEZZA;
    DBSYSTEMVALUES_PERVASIVE = TMP_DBSYSTEMVALUES_PERVASIVE;
    DBSYSTEMVALUES_POINTBASE = TMP_DBSYSTEMVALUES_POINTBASE;
    DBSYSTEMVALUES_SQLITE = TMP_DBSYSTEMVALUES_SQLITE;
    DBSYSTEMVALUES_SYBASE = TMP_DBSYSTEMVALUES_SYBASE;
    DBSYSTEMVALUES_TERADATA = TMP_DBSYSTEMVALUES_TERADATA;
    DBSYSTEMVALUES_VERTICA = TMP_DBSYSTEMVALUES_VERTICA;
    DBSYSTEMVALUES_H2 = TMP_DBSYSTEMVALUES_H2;
    DBSYSTEMVALUES_COLDFUSION = TMP_DBSYSTEMVALUES_COLDFUSION;
    DBSYSTEMVALUES_CASSANDRA = TMP_DBSYSTEMVALUES_CASSANDRA;
    DBSYSTEMVALUES_HBASE = TMP_DBSYSTEMVALUES_HBASE;
    DBSYSTEMVALUES_MONGODB = TMP_DBSYSTEMVALUES_MONGODB;
    DBSYSTEMVALUES_REDIS = TMP_DBSYSTEMVALUES_REDIS;
    DBSYSTEMVALUES_COUCHBASE = TMP_DBSYSTEMVALUES_COUCHBASE;
    DBSYSTEMVALUES_COUCHDB = TMP_DBSYSTEMVALUES_COUCHDB;
    DBSYSTEMVALUES_COSMOSDB = TMP_DBSYSTEMVALUES_COSMOSDB;
    DBSYSTEMVALUES_DYNAMODB = TMP_DBSYSTEMVALUES_DYNAMODB;
    DBSYSTEMVALUES_NEO4J = TMP_DBSYSTEMVALUES_NEO4J;
    DBSYSTEMVALUES_GEODE = TMP_DBSYSTEMVALUES_GEODE;
    DBSYSTEMVALUES_ELASTICSEARCH = TMP_DBSYSTEMVALUES_ELASTICSEARCH;
    DBSYSTEMVALUES_MEMCACHED = TMP_DBSYSTEMVALUES_MEMCACHED;
    DBSYSTEMVALUES_COCKROACHDB = TMP_DBSYSTEMVALUES_COCKROACHDB;
    DbSystemValues = /* @__PURE__ */ createConstMap([
      TMP_DBSYSTEMVALUES_OTHER_SQL,
      TMP_DBSYSTEMVALUES_MSSQL,
      TMP_DBSYSTEMVALUES_MYSQL,
      TMP_DBSYSTEMVALUES_ORACLE,
      TMP_DBSYSTEMVALUES_DB2,
      TMP_DBSYSTEMVALUES_POSTGRESQL,
      TMP_DBSYSTEMVALUES_REDSHIFT,
      TMP_DBSYSTEMVALUES_HIVE,
      TMP_DBSYSTEMVALUES_CLOUDSCAPE,
      TMP_DBSYSTEMVALUES_HSQLDB,
      TMP_DBSYSTEMVALUES_PROGRESS,
      TMP_DBSYSTEMVALUES_MAXDB,
      TMP_DBSYSTEMVALUES_HANADB,
      TMP_DBSYSTEMVALUES_INGRES,
      TMP_DBSYSTEMVALUES_FIRSTSQL,
      TMP_DBSYSTEMVALUES_EDB,
      TMP_DBSYSTEMVALUES_CACHE,
      TMP_DBSYSTEMVALUES_ADABAS,
      TMP_DBSYSTEMVALUES_FIREBIRD,
      TMP_DBSYSTEMVALUES_DERBY,
      TMP_DBSYSTEMVALUES_FILEMAKER,
      TMP_DBSYSTEMVALUES_INFORMIX,
      TMP_DBSYSTEMVALUES_INSTANTDB,
      TMP_DBSYSTEMVALUES_INTERBASE,
      TMP_DBSYSTEMVALUES_MARIADB,
      TMP_DBSYSTEMVALUES_NETEZZA,
      TMP_DBSYSTEMVALUES_PERVASIVE,
      TMP_DBSYSTEMVALUES_POINTBASE,
      TMP_DBSYSTEMVALUES_SQLITE,
      TMP_DBSYSTEMVALUES_SYBASE,
      TMP_DBSYSTEMVALUES_TERADATA,
      TMP_DBSYSTEMVALUES_VERTICA,
      TMP_DBSYSTEMVALUES_H2,
      TMP_DBSYSTEMVALUES_COLDFUSION,
      TMP_DBSYSTEMVALUES_CASSANDRA,
      TMP_DBSYSTEMVALUES_HBASE,
      TMP_DBSYSTEMVALUES_MONGODB,
      TMP_DBSYSTEMVALUES_REDIS,
      TMP_DBSYSTEMVALUES_COUCHBASE,
      TMP_DBSYSTEMVALUES_COUCHDB,
      TMP_DBSYSTEMVALUES_COSMOSDB,
      TMP_DBSYSTEMVALUES_DYNAMODB,
      TMP_DBSYSTEMVALUES_NEO4J,
      TMP_DBSYSTEMVALUES_GEODE,
      TMP_DBSYSTEMVALUES_ELASTICSEARCH,
      TMP_DBSYSTEMVALUES_MEMCACHED,
      TMP_DBSYSTEMVALUES_COCKROACHDB
    ]);
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL = "all";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = "each_quorum";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = "quorum";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = "local_quorum";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE = "one";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO = "two";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE = "three";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = "local_one";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY = "any";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = "serial";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = "local_serial";
    DBCASSANDRACONSISTENCYLEVELVALUES_ALL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL;
    DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM;
    DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM;
    DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM;
    DBCASSANDRACONSISTENCYLEVELVALUES_ONE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE;
    DBCASSANDRACONSISTENCYLEVELVALUES_TWO = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO;
    DBCASSANDRACONSISTENCYLEVELVALUES_THREE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE;
    DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE;
    DBCASSANDRACONSISTENCYLEVELVALUES_ANY = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY;
    DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL;
    DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL;
    DbCassandraConsistencyLevelValues = /* @__PURE__ */ createConstMap([
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL
    ]);
    TMP_FAASTRIGGERVALUES_DATASOURCE = "datasource";
    TMP_FAASTRIGGERVALUES_HTTP = "http";
    TMP_FAASTRIGGERVALUES_PUBSUB = "pubsub";
    TMP_FAASTRIGGERVALUES_TIMER = "timer";
    TMP_FAASTRIGGERVALUES_OTHER = "other";
    FAASTRIGGERVALUES_DATASOURCE = TMP_FAASTRIGGERVALUES_DATASOURCE;
    FAASTRIGGERVALUES_HTTP = TMP_FAASTRIGGERVALUES_HTTP;
    FAASTRIGGERVALUES_PUBSUB = TMP_FAASTRIGGERVALUES_PUBSUB;
    FAASTRIGGERVALUES_TIMER = TMP_FAASTRIGGERVALUES_TIMER;
    FAASTRIGGERVALUES_OTHER = TMP_FAASTRIGGERVALUES_OTHER;
    FaasTriggerValues = /* @__PURE__ */ createConstMap([
      TMP_FAASTRIGGERVALUES_DATASOURCE,
      TMP_FAASTRIGGERVALUES_HTTP,
      TMP_FAASTRIGGERVALUES_PUBSUB,
      TMP_FAASTRIGGERVALUES_TIMER,
      TMP_FAASTRIGGERVALUES_OTHER
    ]);
    TMP_FAASDOCUMENTOPERATIONVALUES_INSERT = "insert";
    TMP_FAASDOCUMENTOPERATIONVALUES_EDIT = "edit";
    TMP_FAASDOCUMENTOPERATIONVALUES_DELETE = "delete";
    FAASDOCUMENTOPERATIONVALUES_INSERT = TMP_FAASDOCUMENTOPERATIONVALUES_INSERT;
    FAASDOCUMENTOPERATIONVALUES_EDIT = TMP_FAASDOCUMENTOPERATIONVALUES_EDIT;
    FAASDOCUMENTOPERATIONVALUES_DELETE = TMP_FAASDOCUMENTOPERATIONVALUES_DELETE;
    FaasDocumentOperationValues = /* @__PURE__ */ createConstMap([
      TMP_FAASDOCUMENTOPERATIONVALUES_INSERT,
      TMP_FAASDOCUMENTOPERATIONVALUES_EDIT,
      TMP_FAASDOCUMENTOPERATIONVALUES_DELETE
    ]);
    TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
    TMP_FAASINVOKEDPROVIDERVALUES_AWS = "aws";
    TMP_FAASINVOKEDPROVIDERVALUES_AZURE = "azure";
    TMP_FAASINVOKEDPROVIDERVALUES_GCP = "gcp";
    FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD;
    FAASINVOKEDPROVIDERVALUES_AWS = TMP_FAASINVOKEDPROVIDERVALUES_AWS;
    FAASINVOKEDPROVIDERVALUES_AZURE = TMP_FAASINVOKEDPROVIDERVALUES_AZURE;
    FAASINVOKEDPROVIDERVALUES_GCP = TMP_FAASINVOKEDPROVIDERVALUES_GCP;
    FaasInvokedProviderValues = /* @__PURE__ */ createConstMap([
      TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD,
      TMP_FAASINVOKEDPROVIDERVALUES_AWS,
      TMP_FAASINVOKEDPROVIDERVALUES_AZURE,
      TMP_FAASINVOKEDPROVIDERVALUES_GCP
    ]);
    TMP_NETTRANSPORTVALUES_IP_TCP = "ip_tcp";
    TMP_NETTRANSPORTVALUES_IP_UDP = "ip_udp";
    TMP_NETTRANSPORTVALUES_IP = "ip";
    TMP_NETTRANSPORTVALUES_UNIX = "unix";
    TMP_NETTRANSPORTVALUES_PIPE = "pipe";
    TMP_NETTRANSPORTVALUES_INPROC = "inproc";
    TMP_NETTRANSPORTVALUES_OTHER = "other";
    NETTRANSPORTVALUES_IP_TCP = TMP_NETTRANSPORTVALUES_IP_TCP;
    NETTRANSPORTVALUES_IP_UDP = TMP_NETTRANSPORTVALUES_IP_UDP;
    NETTRANSPORTVALUES_IP = TMP_NETTRANSPORTVALUES_IP;
    NETTRANSPORTVALUES_UNIX = TMP_NETTRANSPORTVALUES_UNIX;
    NETTRANSPORTVALUES_PIPE = TMP_NETTRANSPORTVALUES_PIPE;
    NETTRANSPORTVALUES_INPROC = TMP_NETTRANSPORTVALUES_INPROC;
    NETTRANSPORTVALUES_OTHER = TMP_NETTRANSPORTVALUES_OTHER;
    NetTransportValues = /* @__PURE__ */ createConstMap([
      TMP_NETTRANSPORTVALUES_IP_TCP,
      TMP_NETTRANSPORTVALUES_IP_UDP,
      TMP_NETTRANSPORTVALUES_IP,
      TMP_NETTRANSPORTVALUES_UNIX,
      TMP_NETTRANSPORTVALUES_PIPE,
      TMP_NETTRANSPORTVALUES_INPROC,
      TMP_NETTRANSPORTVALUES_OTHER
    ]);
    TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI = "wifi";
    TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED = "wired";
    TMP_NETHOSTCONNECTIONTYPEVALUES_CELL = "cell";
    TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = "unavailable";
    TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = "unknown";
    NETHOSTCONNECTIONTYPEVALUES_WIFI = TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI;
    NETHOSTCONNECTIONTYPEVALUES_WIRED = TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED;
    NETHOSTCONNECTIONTYPEVALUES_CELL = TMP_NETHOSTCONNECTIONTYPEVALUES_CELL;
    NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE;
    NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN;
    NetHostConnectionTypeValues = /* @__PURE__ */ createConstMap([
      TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI,
      TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED,
      TMP_NETHOSTCONNECTIONTYPEVALUES_CELL,
      TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE,
      TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN
    ]);
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = "gprs";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = "edge";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = "umts";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = "cdma";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = "evdo_0";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = "evdo_a";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = "cdma2000_1xrtt";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = "hsdpa";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = "hsupa";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = "hspa";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = "iden";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = "evdo_b";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE = "lte";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = "ehrpd";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = "hspap";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM = "gsm";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = "td_scdma";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = "iwlan";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR = "nr";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = "nrnsa";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = "lte_ca";
    NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS;
    NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE;
    NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS;
    NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA;
    NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0;
    NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A;
    NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT;
    NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA;
    NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA;
    NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA;
    NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN;
    NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B;
    NETHOSTCONNECTIONSUBTYPEVALUES_LTE = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE;
    NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD;
    NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP;
    NETHOSTCONNECTIONSUBTYPEVALUES_GSM = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM;
    NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA;
    NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN;
    NETHOSTCONNECTIONSUBTYPEVALUES_NR = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR;
    NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA;
    NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA;
    NetHostConnectionSubtypeValues = /* @__PURE__ */ createConstMap([
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA
    ]);
    TMP_HTTPFLAVORVALUES_HTTP_1_0 = "1.0";
    TMP_HTTPFLAVORVALUES_HTTP_1_1 = "1.1";
    TMP_HTTPFLAVORVALUES_HTTP_2_0 = "2.0";
    TMP_HTTPFLAVORVALUES_SPDY = "SPDY";
    TMP_HTTPFLAVORVALUES_QUIC = "QUIC";
    HTTPFLAVORVALUES_HTTP_1_0 = TMP_HTTPFLAVORVALUES_HTTP_1_0;
    HTTPFLAVORVALUES_HTTP_1_1 = TMP_HTTPFLAVORVALUES_HTTP_1_1;
    HTTPFLAVORVALUES_HTTP_2_0 = TMP_HTTPFLAVORVALUES_HTTP_2_0;
    HTTPFLAVORVALUES_SPDY = TMP_HTTPFLAVORVALUES_SPDY;
    HTTPFLAVORVALUES_QUIC = TMP_HTTPFLAVORVALUES_QUIC;
    HttpFlavorValues = {
      HTTP_1_0: TMP_HTTPFLAVORVALUES_HTTP_1_0,
      HTTP_1_1: TMP_HTTPFLAVORVALUES_HTTP_1_1,
      HTTP_2_0: TMP_HTTPFLAVORVALUES_HTTP_2_0,
      SPDY: TMP_HTTPFLAVORVALUES_SPDY,
      QUIC: TMP_HTTPFLAVORVALUES_QUIC
    };
    TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE = "queue";
    TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC = "topic";
    MESSAGINGDESTINATIONKINDVALUES_QUEUE = TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE;
    MESSAGINGDESTINATIONKINDVALUES_TOPIC = TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC;
    MessagingDestinationKindValues = /* @__PURE__ */ createConstMap([
      TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE,
      TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC
    ]);
    TMP_MESSAGINGOPERATIONVALUES_RECEIVE = "receive";
    TMP_MESSAGINGOPERATIONVALUES_PROCESS = "process";
    MESSAGINGOPERATIONVALUES_RECEIVE = TMP_MESSAGINGOPERATIONVALUES_RECEIVE;
    MESSAGINGOPERATIONVALUES_PROCESS = TMP_MESSAGINGOPERATIONVALUES_PROCESS;
    MessagingOperationValues = /* @__PURE__ */ createConstMap([
      TMP_MESSAGINGOPERATIONVALUES_RECEIVE,
      TMP_MESSAGINGOPERATIONVALUES_PROCESS
    ]);
    TMP_RPCGRPCSTATUSCODEVALUES_OK = 0;
    TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED = 1;
    TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN = 2;
    TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = 3;
    TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = 4;
    TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND = 5;
    TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = 6;
    TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = 7;
    TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = 8;
    TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = 9;
    TMP_RPCGRPCSTATUSCODEVALUES_ABORTED = 10;
    TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = 11;
    TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = 12;
    TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL = 13;
    TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = 14;
    TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS = 15;
    TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = 16;
    RPCGRPCSTATUSCODEVALUES_OK = TMP_RPCGRPCSTATUSCODEVALUES_OK;
    RPCGRPCSTATUSCODEVALUES_CANCELLED = TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED;
    RPCGRPCSTATUSCODEVALUES_UNKNOWN = TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN;
    RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT;
    RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED;
    RPCGRPCSTATUSCODEVALUES_NOT_FOUND = TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND;
    RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS;
    RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED;
    RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED;
    RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION;
    RPCGRPCSTATUSCODEVALUES_ABORTED = TMP_RPCGRPCSTATUSCODEVALUES_ABORTED;
    RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE;
    RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED;
    RPCGRPCSTATUSCODEVALUES_INTERNAL = TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL;
    RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE;
    RPCGRPCSTATUSCODEVALUES_DATA_LOSS = TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS;
    RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED;
    RpcGrpcStatusCodeValues = {
      OK: TMP_RPCGRPCSTATUSCODEVALUES_OK,
      CANCELLED: TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED,
      UNKNOWN: TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN,
      INVALID_ARGUMENT: TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT,
      DEADLINE_EXCEEDED: TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED,
      NOT_FOUND: TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND,
      ALREADY_EXISTS: TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS,
      PERMISSION_DENIED: TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED,
      RESOURCE_EXHAUSTED: TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED,
      FAILED_PRECONDITION: TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION,
      ABORTED: TMP_RPCGRPCSTATUSCODEVALUES_ABORTED,
      OUT_OF_RANGE: TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE,
      UNIMPLEMENTED: TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED,
      INTERNAL: TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL,
      UNAVAILABLE: TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE,
      DATA_LOSS: TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS,
      UNAUTHENTICATED: TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED
    };
    TMP_MESSAGETYPEVALUES_SENT = "SENT";
    TMP_MESSAGETYPEVALUES_RECEIVED = "RECEIVED";
    MESSAGETYPEVALUES_SENT = TMP_MESSAGETYPEVALUES_SENT;
    MESSAGETYPEVALUES_RECEIVED = TMP_MESSAGETYPEVALUES_RECEIVED;
    MessageTypeValues = /* @__PURE__ */ createConstMap([
      TMP_MESSAGETYPEVALUES_SENT,
      TMP_MESSAGETYPEVALUES_RECEIVED
    ]);
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/index.js
var init_trace2 = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/index.js"() {
    init_SemanticAttributes();
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/SemanticResourceAttributes.js
var TMP_CLOUD_PROVIDER, TMP_CLOUD_ACCOUNT_ID, TMP_CLOUD_REGION, TMP_CLOUD_AVAILABILITY_ZONE, TMP_CLOUD_PLATFORM, TMP_AWS_ECS_CONTAINER_ARN, TMP_AWS_ECS_CLUSTER_ARN, TMP_AWS_ECS_LAUNCHTYPE, TMP_AWS_ECS_TASK_ARN, TMP_AWS_ECS_TASK_FAMILY, TMP_AWS_ECS_TASK_REVISION, TMP_AWS_EKS_CLUSTER_ARN, TMP_AWS_LOG_GROUP_NAMES, TMP_AWS_LOG_GROUP_ARNS, TMP_AWS_LOG_STREAM_NAMES, TMP_AWS_LOG_STREAM_ARNS, TMP_CONTAINER_NAME, TMP_CONTAINER_ID, TMP_CONTAINER_RUNTIME, TMP_CONTAINER_IMAGE_NAME, TMP_CONTAINER_IMAGE_TAG, TMP_DEPLOYMENT_ENVIRONMENT, TMP_DEVICE_ID, TMP_DEVICE_MODEL_IDENTIFIER, TMP_DEVICE_MODEL_NAME, TMP_FAAS_NAME, TMP_FAAS_ID, TMP_FAAS_VERSION, TMP_FAAS_INSTANCE, TMP_FAAS_MAX_MEMORY, TMP_HOST_ID, TMP_HOST_NAME, TMP_HOST_TYPE, TMP_HOST_ARCH, TMP_HOST_IMAGE_NAME, TMP_HOST_IMAGE_ID, TMP_HOST_IMAGE_VERSION, TMP_K8S_CLUSTER_NAME, TMP_K8S_NODE_NAME, TMP_K8S_NODE_UID, TMP_K8S_NAMESPACE_NAME, TMP_K8S_POD_UID, TMP_K8S_POD_NAME, TMP_K8S_CONTAINER_NAME, TMP_K8S_REPLICASET_UID, TMP_K8S_REPLICASET_NAME, TMP_K8S_DEPLOYMENT_UID, TMP_K8S_DEPLOYMENT_NAME, TMP_K8S_STATEFULSET_UID, TMP_K8S_STATEFULSET_NAME, TMP_K8S_DAEMONSET_UID, TMP_K8S_DAEMONSET_NAME, TMP_K8S_JOB_UID, TMP_K8S_JOB_NAME, TMP_K8S_CRONJOB_UID, TMP_K8S_CRONJOB_NAME, TMP_OS_TYPE, TMP_OS_DESCRIPTION, TMP_OS_NAME, TMP_OS_VERSION, TMP_PROCESS_PID, TMP_PROCESS_EXECUTABLE_NAME, TMP_PROCESS_EXECUTABLE_PATH, TMP_PROCESS_COMMAND, TMP_PROCESS_COMMAND_LINE, TMP_PROCESS_COMMAND_ARGS, TMP_PROCESS_OWNER, TMP_PROCESS_RUNTIME_NAME, TMP_PROCESS_RUNTIME_VERSION, TMP_PROCESS_RUNTIME_DESCRIPTION, TMP_SERVICE_NAME, TMP_SERVICE_NAMESPACE, TMP_SERVICE_INSTANCE_ID, TMP_SERVICE_VERSION, TMP_TELEMETRY_SDK_NAME, TMP_TELEMETRY_SDK_LANGUAGE, TMP_TELEMETRY_SDK_VERSION, TMP_TELEMETRY_AUTO_VERSION, TMP_WEBENGINE_NAME, TMP_WEBENGINE_VERSION, TMP_WEBENGINE_DESCRIPTION, SEMRESATTRS_CLOUD_PROVIDER, SEMRESATTRS_CLOUD_ACCOUNT_ID, SEMRESATTRS_CLOUD_REGION, SEMRESATTRS_CLOUD_AVAILABILITY_ZONE, SEMRESATTRS_CLOUD_PLATFORM, SEMRESATTRS_AWS_ECS_CONTAINER_ARN, SEMRESATTRS_AWS_ECS_CLUSTER_ARN, SEMRESATTRS_AWS_ECS_LAUNCHTYPE, SEMRESATTRS_AWS_ECS_TASK_ARN, SEMRESATTRS_AWS_ECS_TASK_FAMILY, SEMRESATTRS_AWS_ECS_TASK_REVISION, SEMRESATTRS_AWS_EKS_CLUSTER_ARN, SEMRESATTRS_AWS_LOG_GROUP_NAMES, SEMRESATTRS_AWS_LOG_GROUP_ARNS, SEMRESATTRS_AWS_LOG_STREAM_NAMES, SEMRESATTRS_AWS_LOG_STREAM_ARNS, SEMRESATTRS_CONTAINER_NAME, SEMRESATTRS_CONTAINER_ID, SEMRESATTRS_CONTAINER_RUNTIME, SEMRESATTRS_CONTAINER_IMAGE_NAME, SEMRESATTRS_CONTAINER_IMAGE_TAG, SEMRESATTRS_DEPLOYMENT_ENVIRONMENT, SEMRESATTRS_DEVICE_ID, SEMRESATTRS_DEVICE_MODEL_IDENTIFIER, SEMRESATTRS_DEVICE_MODEL_NAME, SEMRESATTRS_FAAS_NAME, SEMRESATTRS_FAAS_ID, SEMRESATTRS_FAAS_VERSION, SEMRESATTRS_FAAS_INSTANCE, SEMRESATTRS_FAAS_MAX_MEMORY, SEMRESATTRS_HOST_ID, SEMRESATTRS_HOST_NAME, SEMRESATTRS_HOST_TYPE, SEMRESATTRS_HOST_ARCH, SEMRESATTRS_HOST_IMAGE_NAME, SEMRESATTRS_HOST_IMAGE_ID, SEMRESATTRS_HOST_IMAGE_VERSION, SEMRESATTRS_K8S_CLUSTER_NAME, SEMRESATTRS_K8S_NODE_NAME, SEMRESATTRS_K8S_NODE_UID, SEMRESATTRS_K8S_NAMESPACE_NAME, SEMRESATTRS_K8S_POD_UID, SEMRESATTRS_K8S_POD_NAME, SEMRESATTRS_K8S_CONTAINER_NAME, SEMRESATTRS_K8S_REPLICASET_UID, SEMRESATTRS_K8S_REPLICASET_NAME, SEMRESATTRS_K8S_DEPLOYMENT_UID, SEMRESATTRS_K8S_DEPLOYMENT_NAME, SEMRESATTRS_K8S_STATEFULSET_UID, SEMRESATTRS_K8S_STATEFULSET_NAME, SEMRESATTRS_K8S_DAEMONSET_UID, SEMRESATTRS_K8S_DAEMONSET_NAME, SEMRESATTRS_K8S_JOB_UID, SEMRESATTRS_K8S_JOB_NAME, SEMRESATTRS_K8S_CRONJOB_UID, SEMRESATTRS_K8S_CRONJOB_NAME, SEMRESATTRS_OS_TYPE, SEMRESATTRS_OS_DESCRIPTION, SEMRESATTRS_OS_NAME, SEMRESATTRS_OS_VERSION, SEMRESATTRS_PROCESS_PID, SEMRESATTRS_PROCESS_EXECUTABLE_NAME, SEMRESATTRS_PROCESS_EXECUTABLE_PATH, SEMRESATTRS_PROCESS_COMMAND, SEMRESATTRS_PROCESS_COMMAND_LINE, SEMRESATTRS_PROCESS_COMMAND_ARGS, SEMRESATTRS_PROCESS_OWNER, SEMRESATTRS_PROCESS_RUNTIME_NAME, SEMRESATTRS_PROCESS_RUNTIME_VERSION, SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION, SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_NAMESPACE, SEMRESATTRS_SERVICE_INSTANCE_ID, SEMRESATTRS_SERVICE_VERSION, SEMRESATTRS_TELEMETRY_SDK_NAME, SEMRESATTRS_TELEMETRY_SDK_LANGUAGE, SEMRESATTRS_TELEMETRY_SDK_VERSION, SEMRESATTRS_TELEMETRY_AUTO_VERSION, SEMRESATTRS_WEBENGINE_NAME, SEMRESATTRS_WEBENGINE_VERSION, SEMRESATTRS_WEBENGINE_DESCRIPTION, SemanticResourceAttributes, TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD, TMP_CLOUDPROVIDERVALUES_AWS, TMP_CLOUDPROVIDERVALUES_AZURE, TMP_CLOUDPROVIDERVALUES_GCP, CLOUDPROVIDERVALUES_ALIBABA_CLOUD, CLOUDPROVIDERVALUES_AWS, CLOUDPROVIDERVALUES_AZURE, CLOUDPROVIDERVALUES_GCP, CloudProviderValues, TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS, TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC, TMP_CLOUDPLATFORMVALUES_AWS_EC2, TMP_CLOUDPLATFORMVALUES_AWS_ECS, TMP_CLOUDPLATFORMVALUES_AWS_EKS, TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA, TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK, TMP_CLOUDPLATFORMVALUES_AZURE_VM, TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES, TMP_CLOUDPLATFORMVALUES_AZURE_AKS, TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS, TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE, TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE, TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN, TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE, TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS, TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE, CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS, CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC, CLOUDPLATFORMVALUES_AWS_EC2, CLOUDPLATFORMVALUES_AWS_ECS, CLOUDPLATFORMVALUES_AWS_EKS, CLOUDPLATFORMVALUES_AWS_LAMBDA, CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK, CLOUDPLATFORMVALUES_AZURE_VM, CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES, CLOUDPLATFORMVALUES_AZURE_AKS, CLOUDPLATFORMVALUES_AZURE_FUNCTIONS, CLOUDPLATFORMVALUES_AZURE_APP_SERVICE, CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE, CLOUDPLATFORMVALUES_GCP_CLOUD_RUN, CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE, CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS, CLOUDPLATFORMVALUES_GCP_APP_ENGINE, CloudPlatformValues, TMP_AWSECSLAUNCHTYPEVALUES_EC2, TMP_AWSECSLAUNCHTYPEVALUES_FARGATE, AWSECSLAUNCHTYPEVALUES_EC2, AWSECSLAUNCHTYPEVALUES_FARGATE, AwsEcsLaunchtypeValues, TMP_HOSTARCHVALUES_AMD64, TMP_HOSTARCHVALUES_ARM32, TMP_HOSTARCHVALUES_ARM64, TMP_HOSTARCHVALUES_IA64, TMP_HOSTARCHVALUES_PPC32, TMP_HOSTARCHVALUES_PPC64, TMP_HOSTARCHVALUES_X86, HOSTARCHVALUES_AMD64, HOSTARCHVALUES_ARM32, HOSTARCHVALUES_ARM64, HOSTARCHVALUES_IA64, HOSTARCHVALUES_PPC32, HOSTARCHVALUES_PPC64, HOSTARCHVALUES_X86, HostArchValues, TMP_OSTYPEVALUES_WINDOWS, TMP_OSTYPEVALUES_LINUX, TMP_OSTYPEVALUES_DARWIN, TMP_OSTYPEVALUES_FREEBSD, TMP_OSTYPEVALUES_NETBSD, TMP_OSTYPEVALUES_OPENBSD, TMP_OSTYPEVALUES_DRAGONFLYBSD, TMP_OSTYPEVALUES_HPUX, TMP_OSTYPEVALUES_AIX, TMP_OSTYPEVALUES_SOLARIS, TMP_OSTYPEVALUES_Z_OS, OSTYPEVALUES_WINDOWS, OSTYPEVALUES_LINUX, OSTYPEVALUES_DARWIN, OSTYPEVALUES_FREEBSD, OSTYPEVALUES_NETBSD, OSTYPEVALUES_OPENBSD, OSTYPEVALUES_DRAGONFLYBSD, OSTYPEVALUES_HPUX, OSTYPEVALUES_AIX, OSTYPEVALUES_SOLARIS, OSTYPEVALUES_Z_OS, OsTypeValues, TMP_TELEMETRYSDKLANGUAGEVALUES_CPP, TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET, TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG, TMP_TELEMETRYSDKLANGUAGEVALUES_GO, TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA, TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS, TMP_TELEMETRYSDKLANGUAGEVALUES_PHP, TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON, TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY, TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS, TELEMETRYSDKLANGUAGEVALUES_CPP, TELEMETRYSDKLANGUAGEVALUES_DOTNET, TELEMETRYSDKLANGUAGEVALUES_ERLANG, TELEMETRYSDKLANGUAGEVALUES_GO, TELEMETRYSDKLANGUAGEVALUES_JAVA, TELEMETRYSDKLANGUAGEVALUES_NODEJS, TELEMETRYSDKLANGUAGEVALUES_PHP, TELEMETRYSDKLANGUAGEVALUES_PYTHON, TELEMETRYSDKLANGUAGEVALUES_RUBY, TELEMETRYSDKLANGUAGEVALUES_WEBJS, TelemetrySdkLanguageValues;
var init_SemanticResourceAttributes = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/SemanticResourceAttributes.js"() {
    init_utils3();
    TMP_CLOUD_PROVIDER = "cloud.provider";
    TMP_CLOUD_ACCOUNT_ID = "cloud.account.id";
    TMP_CLOUD_REGION = "cloud.region";
    TMP_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
    TMP_CLOUD_PLATFORM = "cloud.platform";
    TMP_AWS_ECS_CONTAINER_ARN = "aws.ecs.container.arn";
    TMP_AWS_ECS_CLUSTER_ARN = "aws.ecs.cluster.arn";
    TMP_AWS_ECS_LAUNCHTYPE = "aws.ecs.launchtype";
    TMP_AWS_ECS_TASK_ARN = "aws.ecs.task.arn";
    TMP_AWS_ECS_TASK_FAMILY = "aws.ecs.task.family";
    TMP_AWS_ECS_TASK_REVISION = "aws.ecs.task.revision";
    TMP_AWS_EKS_CLUSTER_ARN = "aws.eks.cluster.arn";
    TMP_AWS_LOG_GROUP_NAMES = "aws.log.group.names";
    TMP_AWS_LOG_GROUP_ARNS = "aws.log.group.arns";
    TMP_AWS_LOG_STREAM_NAMES = "aws.log.stream.names";
    TMP_AWS_LOG_STREAM_ARNS = "aws.log.stream.arns";
    TMP_CONTAINER_NAME = "container.name";
    TMP_CONTAINER_ID = "container.id";
    TMP_CONTAINER_RUNTIME = "container.runtime";
    TMP_CONTAINER_IMAGE_NAME = "container.image.name";
    TMP_CONTAINER_IMAGE_TAG = "container.image.tag";
    TMP_DEPLOYMENT_ENVIRONMENT = "deployment.environment";
    TMP_DEVICE_ID = "device.id";
    TMP_DEVICE_MODEL_IDENTIFIER = "device.model.identifier";
    TMP_DEVICE_MODEL_NAME = "device.model.name";
    TMP_FAAS_NAME = "faas.name";
    TMP_FAAS_ID = "faas.id";
    TMP_FAAS_VERSION = "faas.version";
    TMP_FAAS_INSTANCE = "faas.instance";
    TMP_FAAS_MAX_MEMORY = "faas.max_memory";
    TMP_HOST_ID = "host.id";
    TMP_HOST_NAME = "host.name";
    TMP_HOST_TYPE = "host.type";
    TMP_HOST_ARCH = "host.arch";
    TMP_HOST_IMAGE_NAME = "host.image.name";
    TMP_HOST_IMAGE_ID = "host.image.id";
    TMP_HOST_IMAGE_VERSION = "host.image.version";
    TMP_K8S_CLUSTER_NAME = "k8s.cluster.name";
    TMP_K8S_NODE_NAME = "k8s.node.name";
    TMP_K8S_NODE_UID = "k8s.node.uid";
    TMP_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    TMP_K8S_POD_UID = "k8s.pod.uid";
    TMP_K8S_POD_NAME = "k8s.pod.name";
    TMP_K8S_CONTAINER_NAME = "k8s.container.name";
    TMP_K8S_REPLICASET_UID = "k8s.replicaset.uid";
    TMP_K8S_REPLICASET_NAME = "k8s.replicaset.name";
    TMP_K8S_DEPLOYMENT_UID = "k8s.deployment.uid";
    TMP_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    TMP_K8S_STATEFULSET_UID = "k8s.statefulset.uid";
    TMP_K8S_STATEFULSET_NAME = "k8s.statefulset.name";
    TMP_K8S_DAEMONSET_UID = "k8s.daemonset.uid";
    TMP_K8S_DAEMONSET_NAME = "k8s.daemonset.name";
    TMP_K8S_JOB_UID = "k8s.job.uid";
    TMP_K8S_JOB_NAME = "k8s.job.name";
    TMP_K8S_CRONJOB_UID = "k8s.cronjob.uid";
    TMP_K8S_CRONJOB_NAME = "k8s.cronjob.name";
    TMP_OS_TYPE = "os.type";
    TMP_OS_DESCRIPTION = "os.description";
    TMP_OS_NAME = "os.name";
    TMP_OS_VERSION = "os.version";
    TMP_PROCESS_PID = "process.pid";
    TMP_PROCESS_EXECUTABLE_NAME = "process.executable.name";
    TMP_PROCESS_EXECUTABLE_PATH = "process.executable.path";
    TMP_PROCESS_COMMAND = "process.command";
    TMP_PROCESS_COMMAND_LINE = "process.command_line";
    TMP_PROCESS_COMMAND_ARGS = "process.command_args";
    TMP_PROCESS_OWNER = "process.owner";
    TMP_PROCESS_RUNTIME_NAME = "process.runtime.name";
    TMP_PROCESS_RUNTIME_VERSION = "process.runtime.version";
    TMP_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
    TMP_SERVICE_NAME = "service.name";
    TMP_SERVICE_NAMESPACE = "service.namespace";
    TMP_SERVICE_INSTANCE_ID = "service.instance.id";
    TMP_SERVICE_VERSION = "service.version";
    TMP_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
    TMP_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
    TMP_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
    TMP_TELEMETRY_AUTO_VERSION = "telemetry.auto.version";
    TMP_WEBENGINE_NAME = "webengine.name";
    TMP_WEBENGINE_VERSION = "webengine.version";
    TMP_WEBENGINE_DESCRIPTION = "webengine.description";
    SEMRESATTRS_CLOUD_PROVIDER = TMP_CLOUD_PROVIDER;
    SEMRESATTRS_CLOUD_ACCOUNT_ID = TMP_CLOUD_ACCOUNT_ID;
    SEMRESATTRS_CLOUD_REGION = TMP_CLOUD_REGION;
    SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = TMP_CLOUD_AVAILABILITY_ZONE;
    SEMRESATTRS_CLOUD_PLATFORM = TMP_CLOUD_PLATFORM;
    SEMRESATTRS_AWS_ECS_CONTAINER_ARN = TMP_AWS_ECS_CONTAINER_ARN;
    SEMRESATTRS_AWS_ECS_CLUSTER_ARN = TMP_AWS_ECS_CLUSTER_ARN;
    SEMRESATTRS_AWS_ECS_LAUNCHTYPE = TMP_AWS_ECS_LAUNCHTYPE;
    SEMRESATTRS_AWS_ECS_TASK_ARN = TMP_AWS_ECS_TASK_ARN;
    SEMRESATTRS_AWS_ECS_TASK_FAMILY = TMP_AWS_ECS_TASK_FAMILY;
    SEMRESATTRS_AWS_ECS_TASK_REVISION = TMP_AWS_ECS_TASK_REVISION;
    SEMRESATTRS_AWS_EKS_CLUSTER_ARN = TMP_AWS_EKS_CLUSTER_ARN;
    SEMRESATTRS_AWS_LOG_GROUP_NAMES = TMP_AWS_LOG_GROUP_NAMES;
    SEMRESATTRS_AWS_LOG_GROUP_ARNS = TMP_AWS_LOG_GROUP_ARNS;
    SEMRESATTRS_AWS_LOG_STREAM_NAMES = TMP_AWS_LOG_STREAM_NAMES;
    SEMRESATTRS_AWS_LOG_STREAM_ARNS = TMP_AWS_LOG_STREAM_ARNS;
    SEMRESATTRS_CONTAINER_NAME = TMP_CONTAINER_NAME;
    SEMRESATTRS_CONTAINER_ID = TMP_CONTAINER_ID;
    SEMRESATTRS_CONTAINER_RUNTIME = TMP_CONTAINER_RUNTIME;
    SEMRESATTRS_CONTAINER_IMAGE_NAME = TMP_CONTAINER_IMAGE_NAME;
    SEMRESATTRS_CONTAINER_IMAGE_TAG = TMP_CONTAINER_IMAGE_TAG;
    SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = TMP_DEPLOYMENT_ENVIRONMENT;
    SEMRESATTRS_DEVICE_ID = TMP_DEVICE_ID;
    SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = TMP_DEVICE_MODEL_IDENTIFIER;
    SEMRESATTRS_DEVICE_MODEL_NAME = TMP_DEVICE_MODEL_NAME;
    SEMRESATTRS_FAAS_NAME = TMP_FAAS_NAME;
    SEMRESATTRS_FAAS_ID = TMP_FAAS_ID;
    SEMRESATTRS_FAAS_VERSION = TMP_FAAS_VERSION;
    SEMRESATTRS_FAAS_INSTANCE = TMP_FAAS_INSTANCE;
    SEMRESATTRS_FAAS_MAX_MEMORY = TMP_FAAS_MAX_MEMORY;
    SEMRESATTRS_HOST_ID = TMP_HOST_ID;
    SEMRESATTRS_HOST_NAME = TMP_HOST_NAME;
    SEMRESATTRS_HOST_TYPE = TMP_HOST_TYPE;
    SEMRESATTRS_HOST_ARCH = TMP_HOST_ARCH;
    SEMRESATTRS_HOST_IMAGE_NAME = TMP_HOST_IMAGE_NAME;
    SEMRESATTRS_HOST_IMAGE_ID = TMP_HOST_IMAGE_ID;
    SEMRESATTRS_HOST_IMAGE_VERSION = TMP_HOST_IMAGE_VERSION;
    SEMRESATTRS_K8S_CLUSTER_NAME = TMP_K8S_CLUSTER_NAME;
    SEMRESATTRS_K8S_NODE_NAME = TMP_K8S_NODE_NAME;
    SEMRESATTRS_K8S_NODE_UID = TMP_K8S_NODE_UID;
    SEMRESATTRS_K8S_NAMESPACE_NAME = TMP_K8S_NAMESPACE_NAME;
    SEMRESATTRS_K8S_POD_UID = TMP_K8S_POD_UID;
    SEMRESATTRS_K8S_POD_NAME = TMP_K8S_POD_NAME;
    SEMRESATTRS_K8S_CONTAINER_NAME = TMP_K8S_CONTAINER_NAME;
    SEMRESATTRS_K8S_REPLICASET_UID = TMP_K8S_REPLICASET_UID;
    SEMRESATTRS_K8S_REPLICASET_NAME = TMP_K8S_REPLICASET_NAME;
    SEMRESATTRS_K8S_DEPLOYMENT_UID = TMP_K8S_DEPLOYMENT_UID;
    SEMRESATTRS_K8S_DEPLOYMENT_NAME = TMP_K8S_DEPLOYMENT_NAME;
    SEMRESATTRS_K8S_STATEFULSET_UID = TMP_K8S_STATEFULSET_UID;
    SEMRESATTRS_K8S_STATEFULSET_NAME = TMP_K8S_STATEFULSET_NAME;
    SEMRESATTRS_K8S_DAEMONSET_UID = TMP_K8S_DAEMONSET_UID;
    SEMRESATTRS_K8S_DAEMONSET_NAME = TMP_K8S_DAEMONSET_NAME;
    SEMRESATTRS_K8S_JOB_UID = TMP_K8S_JOB_UID;
    SEMRESATTRS_K8S_JOB_NAME = TMP_K8S_JOB_NAME;
    SEMRESATTRS_K8S_CRONJOB_UID = TMP_K8S_CRONJOB_UID;
    SEMRESATTRS_K8S_CRONJOB_NAME = TMP_K8S_CRONJOB_NAME;
    SEMRESATTRS_OS_TYPE = TMP_OS_TYPE;
    SEMRESATTRS_OS_DESCRIPTION = TMP_OS_DESCRIPTION;
    SEMRESATTRS_OS_NAME = TMP_OS_NAME;
    SEMRESATTRS_OS_VERSION = TMP_OS_VERSION;
    SEMRESATTRS_PROCESS_PID = TMP_PROCESS_PID;
    SEMRESATTRS_PROCESS_EXECUTABLE_NAME = TMP_PROCESS_EXECUTABLE_NAME;
    SEMRESATTRS_PROCESS_EXECUTABLE_PATH = TMP_PROCESS_EXECUTABLE_PATH;
    SEMRESATTRS_PROCESS_COMMAND = TMP_PROCESS_COMMAND;
    SEMRESATTRS_PROCESS_COMMAND_LINE = TMP_PROCESS_COMMAND_LINE;
    SEMRESATTRS_PROCESS_COMMAND_ARGS = TMP_PROCESS_COMMAND_ARGS;
    SEMRESATTRS_PROCESS_OWNER = TMP_PROCESS_OWNER;
    SEMRESATTRS_PROCESS_RUNTIME_NAME = TMP_PROCESS_RUNTIME_NAME;
    SEMRESATTRS_PROCESS_RUNTIME_VERSION = TMP_PROCESS_RUNTIME_VERSION;
    SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = TMP_PROCESS_RUNTIME_DESCRIPTION;
    SEMRESATTRS_SERVICE_NAME = TMP_SERVICE_NAME;
    SEMRESATTRS_SERVICE_NAMESPACE = TMP_SERVICE_NAMESPACE;
    SEMRESATTRS_SERVICE_INSTANCE_ID = TMP_SERVICE_INSTANCE_ID;
    SEMRESATTRS_SERVICE_VERSION = TMP_SERVICE_VERSION;
    SEMRESATTRS_TELEMETRY_SDK_NAME = TMP_TELEMETRY_SDK_NAME;
    SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = TMP_TELEMETRY_SDK_LANGUAGE;
    SEMRESATTRS_TELEMETRY_SDK_VERSION = TMP_TELEMETRY_SDK_VERSION;
    SEMRESATTRS_TELEMETRY_AUTO_VERSION = TMP_TELEMETRY_AUTO_VERSION;
    SEMRESATTRS_WEBENGINE_NAME = TMP_WEBENGINE_NAME;
    SEMRESATTRS_WEBENGINE_VERSION = TMP_WEBENGINE_VERSION;
    SEMRESATTRS_WEBENGINE_DESCRIPTION = TMP_WEBENGINE_DESCRIPTION;
    SemanticResourceAttributes = /* @__PURE__ */ createConstMap([
      TMP_CLOUD_PROVIDER,
      TMP_CLOUD_ACCOUNT_ID,
      TMP_CLOUD_REGION,
      TMP_CLOUD_AVAILABILITY_ZONE,
      TMP_CLOUD_PLATFORM,
      TMP_AWS_ECS_CONTAINER_ARN,
      TMP_AWS_ECS_CLUSTER_ARN,
      TMP_AWS_ECS_LAUNCHTYPE,
      TMP_AWS_ECS_TASK_ARN,
      TMP_AWS_ECS_TASK_FAMILY,
      TMP_AWS_ECS_TASK_REVISION,
      TMP_AWS_EKS_CLUSTER_ARN,
      TMP_AWS_LOG_GROUP_NAMES,
      TMP_AWS_LOG_GROUP_ARNS,
      TMP_AWS_LOG_STREAM_NAMES,
      TMP_AWS_LOG_STREAM_ARNS,
      TMP_CONTAINER_NAME,
      TMP_CONTAINER_ID,
      TMP_CONTAINER_RUNTIME,
      TMP_CONTAINER_IMAGE_NAME,
      TMP_CONTAINER_IMAGE_TAG,
      TMP_DEPLOYMENT_ENVIRONMENT,
      TMP_DEVICE_ID,
      TMP_DEVICE_MODEL_IDENTIFIER,
      TMP_DEVICE_MODEL_NAME,
      TMP_FAAS_NAME,
      TMP_FAAS_ID,
      TMP_FAAS_VERSION,
      TMP_FAAS_INSTANCE,
      TMP_FAAS_MAX_MEMORY,
      TMP_HOST_ID,
      TMP_HOST_NAME,
      TMP_HOST_TYPE,
      TMP_HOST_ARCH,
      TMP_HOST_IMAGE_NAME,
      TMP_HOST_IMAGE_ID,
      TMP_HOST_IMAGE_VERSION,
      TMP_K8S_CLUSTER_NAME,
      TMP_K8S_NODE_NAME,
      TMP_K8S_NODE_UID,
      TMP_K8S_NAMESPACE_NAME,
      TMP_K8S_POD_UID,
      TMP_K8S_POD_NAME,
      TMP_K8S_CONTAINER_NAME,
      TMP_K8S_REPLICASET_UID,
      TMP_K8S_REPLICASET_NAME,
      TMP_K8S_DEPLOYMENT_UID,
      TMP_K8S_DEPLOYMENT_NAME,
      TMP_K8S_STATEFULSET_UID,
      TMP_K8S_STATEFULSET_NAME,
      TMP_K8S_DAEMONSET_UID,
      TMP_K8S_DAEMONSET_NAME,
      TMP_K8S_JOB_UID,
      TMP_K8S_JOB_NAME,
      TMP_K8S_CRONJOB_UID,
      TMP_K8S_CRONJOB_NAME,
      TMP_OS_TYPE,
      TMP_OS_DESCRIPTION,
      TMP_OS_NAME,
      TMP_OS_VERSION,
      TMP_PROCESS_PID,
      TMP_PROCESS_EXECUTABLE_NAME,
      TMP_PROCESS_EXECUTABLE_PATH,
      TMP_PROCESS_COMMAND,
      TMP_PROCESS_COMMAND_LINE,
      TMP_PROCESS_COMMAND_ARGS,
      TMP_PROCESS_OWNER,
      TMP_PROCESS_RUNTIME_NAME,
      TMP_PROCESS_RUNTIME_VERSION,
      TMP_PROCESS_RUNTIME_DESCRIPTION,
      TMP_SERVICE_NAME,
      TMP_SERVICE_NAMESPACE,
      TMP_SERVICE_INSTANCE_ID,
      TMP_SERVICE_VERSION,
      TMP_TELEMETRY_SDK_NAME,
      TMP_TELEMETRY_SDK_LANGUAGE,
      TMP_TELEMETRY_SDK_VERSION,
      TMP_TELEMETRY_AUTO_VERSION,
      TMP_WEBENGINE_NAME,
      TMP_WEBENGINE_VERSION,
      TMP_WEBENGINE_DESCRIPTION
    ]);
    TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
    TMP_CLOUDPROVIDERVALUES_AWS = "aws";
    TMP_CLOUDPROVIDERVALUES_AZURE = "azure";
    TMP_CLOUDPROVIDERVALUES_GCP = "gcp";
    CLOUDPROVIDERVALUES_ALIBABA_CLOUD = TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD;
    CLOUDPROVIDERVALUES_AWS = TMP_CLOUDPROVIDERVALUES_AWS;
    CLOUDPROVIDERVALUES_AZURE = TMP_CLOUDPROVIDERVALUES_AZURE;
    CLOUDPROVIDERVALUES_GCP = TMP_CLOUDPROVIDERVALUES_GCP;
    CloudProviderValues = /* @__PURE__ */ createConstMap([
      TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD,
      TMP_CLOUDPROVIDERVALUES_AWS,
      TMP_CLOUDPROVIDERVALUES_AZURE,
      TMP_CLOUDPROVIDERVALUES_GCP
    ]);
    TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = "alibaba_cloud_ecs";
    TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = "alibaba_cloud_fc";
    TMP_CLOUDPLATFORMVALUES_AWS_EC2 = "aws_ec2";
    TMP_CLOUDPLATFORMVALUES_AWS_ECS = "aws_ecs";
    TMP_CLOUDPLATFORMVALUES_AWS_EKS = "aws_eks";
    TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA = "aws_lambda";
    TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = "aws_elastic_beanstalk";
    TMP_CLOUDPLATFORMVALUES_AZURE_VM = "azure_vm";
    TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = "azure_container_instances";
    TMP_CLOUDPLATFORMVALUES_AZURE_AKS = "azure_aks";
    TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = "azure_functions";
    TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = "azure_app_service";
    TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = "gcp_compute_engine";
    TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = "gcp_cloud_run";
    TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = "gcp_kubernetes_engine";
    TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = "gcp_cloud_functions";
    TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE = "gcp_app_engine";
    CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS;
    CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC;
    CLOUDPLATFORMVALUES_AWS_EC2 = TMP_CLOUDPLATFORMVALUES_AWS_EC2;
    CLOUDPLATFORMVALUES_AWS_ECS = TMP_CLOUDPLATFORMVALUES_AWS_ECS;
    CLOUDPLATFORMVALUES_AWS_EKS = TMP_CLOUDPLATFORMVALUES_AWS_EKS;
    CLOUDPLATFORMVALUES_AWS_LAMBDA = TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA;
    CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK;
    CLOUDPLATFORMVALUES_AZURE_VM = TMP_CLOUDPLATFORMVALUES_AZURE_VM;
    CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES;
    CLOUDPLATFORMVALUES_AZURE_AKS = TMP_CLOUDPLATFORMVALUES_AZURE_AKS;
    CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS;
    CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE;
    CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE;
    CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN;
    CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE;
    CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS;
    CLOUDPLATFORMVALUES_GCP_APP_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE;
    CloudPlatformValues = /* @__PURE__ */ createConstMap([
      TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS,
      TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC,
      TMP_CLOUDPLATFORMVALUES_AWS_EC2,
      TMP_CLOUDPLATFORMVALUES_AWS_ECS,
      TMP_CLOUDPLATFORMVALUES_AWS_EKS,
      TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA,
      TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK,
      TMP_CLOUDPLATFORMVALUES_AZURE_VM,
      TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES,
      TMP_CLOUDPLATFORMVALUES_AZURE_AKS,
      TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS,
      TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE,
      TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE,
      TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN,
      TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE,
      TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS,
      TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE
    ]);
    TMP_AWSECSLAUNCHTYPEVALUES_EC2 = "ec2";
    TMP_AWSECSLAUNCHTYPEVALUES_FARGATE = "fargate";
    AWSECSLAUNCHTYPEVALUES_EC2 = TMP_AWSECSLAUNCHTYPEVALUES_EC2;
    AWSECSLAUNCHTYPEVALUES_FARGATE = TMP_AWSECSLAUNCHTYPEVALUES_FARGATE;
    AwsEcsLaunchtypeValues = /* @__PURE__ */ createConstMap([
      TMP_AWSECSLAUNCHTYPEVALUES_EC2,
      TMP_AWSECSLAUNCHTYPEVALUES_FARGATE
    ]);
    TMP_HOSTARCHVALUES_AMD64 = "amd64";
    TMP_HOSTARCHVALUES_ARM32 = "arm32";
    TMP_HOSTARCHVALUES_ARM64 = "arm64";
    TMP_HOSTARCHVALUES_IA64 = "ia64";
    TMP_HOSTARCHVALUES_PPC32 = "ppc32";
    TMP_HOSTARCHVALUES_PPC64 = "ppc64";
    TMP_HOSTARCHVALUES_X86 = "x86";
    HOSTARCHVALUES_AMD64 = TMP_HOSTARCHVALUES_AMD64;
    HOSTARCHVALUES_ARM32 = TMP_HOSTARCHVALUES_ARM32;
    HOSTARCHVALUES_ARM64 = TMP_HOSTARCHVALUES_ARM64;
    HOSTARCHVALUES_IA64 = TMP_HOSTARCHVALUES_IA64;
    HOSTARCHVALUES_PPC32 = TMP_HOSTARCHVALUES_PPC32;
    HOSTARCHVALUES_PPC64 = TMP_HOSTARCHVALUES_PPC64;
    HOSTARCHVALUES_X86 = TMP_HOSTARCHVALUES_X86;
    HostArchValues = /* @__PURE__ */ createConstMap([
      TMP_HOSTARCHVALUES_AMD64,
      TMP_HOSTARCHVALUES_ARM32,
      TMP_HOSTARCHVALUES_ARM64,
      TMP_HOSTARCHVALUES_IA64,
      TMP_HOSTARCHVALUES_PPC32,
      TMP_HOSTARCHVALUES_PPC64,
      TMP_HOSTARCHVALUES_X86
    ]);
    TMP_OSTYPEVALUES_WINDOWS = "windows";
    TMP_OSTYPEVALUES_LINUX = "linux";
    TMP_OSTYPEVALUES_DARWIN = "darwin";
    TMP_OSTYPEVALUES_FREEBSD = "freebsd";
    TMP_OSTYPEVALUES_NETBSD = "netbsd";
    TMP_OSTYPEVALUES_OPENBSD = "openbsd";
    TMP_OSTYPEVALUES_DRAGONFLYBSD = "dragonflybsd";
    TMP_OSTYPEVALUES_HPUX = "hpux";
    TMP_OSTYPEVALUES_AIX = "aix";
    TMP_OSTYPEVALUES_SOLARIS = "solaris";
    TMP_OSTYPEVALUES_Z_OS = "z_os";
    OSTYPEVALUES_WINDOWS = TMP_OSTYPEVALUES_WINDOWS;
    OSTYPEVALUES_LINUX = TMP_OSTYPEVALUES_LINUX;
    OSTYPEVALUES_DARWIN = TMP_OSTYPEVALUES_DARWIN;
    OSTYPEVALUES_FREEBSD = TMP_OSTYPEVALUES_FREEBSD;
    OSTYPEVALUES_NETBSD = TMP_OSTYPEVALUES_NETBSD;
    OSTYPEVALUES_OPENBSD = TMP_OSTYPEVALUES_OPENBSD;
    OSTYPEVALUES_DRAGONFLYBSD = TMP_OSTYPEVALUES_DRAGONFLYBSD;
    OSTYPEVALUES_HPUX = TMP_OSTYPEVALUES_HPUX;
    OSTYPEVALUES_AIX = TMP_OSTYPEVALUES_AIX;
    OSTYPEVALUES_SOLARIS = TMP_OSTYPEVALUES_SOLARIS;
    OSTYPEVALUES_Z_OS = TMP_OSTYPEVALUES_Z_OS;
    OsTypeValues = /* @__PURE__ */ createConstMap([
      TMP_OSTYPEVALUES_WINDOWS,
      TMP_OSTYPEVALUES_LINUX,
      TMP_OSTYPEVALUES_DARWIN,
      TMP_OSTYPEVALUES_FREEBSD,
      TMP_OSTYPEVALUES_NETBSD,
      TMP_OSTYPEVALUES_OPENBSD,
      TMP_OSTYPEVALUES_DRAGONFLYBSD,
      TMP_OSTYPEVALUES_HPUX,
      TMP_OSTYPEVALUES_AIX,
      TMP_OSTYPEVALUES_SOLARIS,
      TMP_OSTYPEVALUES_Z_OS
    ]);
    TMP_TELEMETRYSDKLANGUAGEVALUES_CPP = "cpp";
    TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET = "dotnet";
    TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG = "erlang";
    TMP_TELEMETRYSDKLANGUAGEVALUES_GO = "go";
    TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA = "java";
    TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS = "nodejs";
    TMP_TELEMETRYSDKLANGUAGEVALUES_PHP = "php";
    TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON = "python";
    TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY = "ruby";
    TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS = "webjs";
    TELEMETRYSDKLANGUAGEVALUES_CPP = TMP_TELEMETRYSDKLANGUAGEVALUES_CPP;
    TELEMETRYSDKLANGUAGEVALUES_DOTNET = TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET;
    TELEMETRYSDKLANGUAGEVALUES_ERLANG = TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG;
    TELEMETRYSDKLANGUAGEVALUES_GO = TMP_TELEMETRYSDKLANGUAGEVALUES_GO;
    TELEMETRYSDKLANGUAGEVALUES_JAVA = TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA;
    TELEMETRYSDKLANGUAGEVALUES_NODEJS = TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS;
    TELEMETRYSDKLANGUAGEVALUES_PHP = TMP_TELEMETRYSDKLANGUAGEVALUES_PHP;
    TELEMETRYSDKLANGUAGEVALUES_PYTHON = TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON;
    TELEMETRYSDKLANGUAGEVALUES_RUBY = TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY;
    TELEMETRYSDKLANGUAGEVALUES_WEBJS = TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS;
    TelemetrySdkLanguageValues = /* @__PURE__ */ createConstMap([
      TMP_TELEMETRYSDKLANGUAGEVALUES_CPP,
      TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET,
      TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG,
      TMP_TELEMETRYSDKLANGUAGEVALUES_GO,
      TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA,
      TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS,
      TMP_TELEMETRYSDKLANGUAGEVALUES_PHP,
      TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON,
      TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY,
      TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS
    ]);
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/index.js
var init_resource = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/index.js"() {
    init_SemanticResourceAttributes();
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js
var ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT, ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED, ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED, ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED, ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED, ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE, ATTR_ASPNETCORE_RATE_LIMITING_POLICY, ATTR_ASPNETCORE_RATE_LIMITING_RESULT, ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED, ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER, ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER, ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED, ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED, ATTR_ASPNETCORE_ROUTING_IS_FALLBACK, ATTR_ASPNETCORE_ROUTING_MATCH_STATUS, ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE, ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS, ATTR_ASPNETCORE_USER_IS_AUTHENTICATED, ATTR_CLIENT_ADDRESS, ATTR_CLIENT_PORT, ATTR_CODE_COLUMN_NUMBER, ATTR_CODE_FILE_PATH, ATTR_CODE_FUNCTION_NAME, ATTR_CODE_LINE_NUMBER, ATTR_CODE_STACKTRACE, ATTR_DB_COLLECTION_NAME, ATTR_DB_NAMESPACE, ATTR_DB_OPERATION_BATCH_SIZE, ATTR_DB_OPERATION_NAME, ATTR_DB_QUERY_SUMMARY, ATTR_DB_QUERY_TEXT, ATTR_DB_RESPONSE_STATUS_CODE, ATTR_DB_STORED_PROCEDURE_NAME, ATTR_DB_SYSTEM_NAME, DB_SYSTEM_NAME_VALUE_MARIADB, DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER, DB_SYSTEM_NAME_VALUE_MYSQL, DB_SYSTEM_NAME_VALUE_POSTGRESQL, ATTR_DOTNET_GC_HEAP_GENERATION, DOTNET_GC_HEAP_GENERATION_VALUE_GEN0, DOTNET_GC_HEAP_GENERATION_VALUE_GEN1, DOTNET_GC_HEAP_GENERATION_VALUE_GEN2, DOTNET_GC_HEAP_GENERATION_VALUE_LOH, DOTNET_GC_HEAP_GENERATION_VALUE_POH, ATTR_ERROR_TYPE, ERROR_TYPE_VALUE_OTHER, ATTR_EXCEPTION_ESCAPED, ATTR_EXCEPTION_MESSAGE, ATTR_EXCEPTION_STACKTRACE, ATTR_EXCEPTION_TYPE, ATTR_HTTP_REQUEST_HEADER, ATTR_HTTP_REQUEST_METHOD, HTTP_REQUEST_METHOD_VALUE_OTHER, HTTP_REQUEST_METHOD_VALUE_CONNECT, HTTP_REQUEST_METHOD_VALUE_DELETE, HTTP_REQUEST_METHOD_VALUE_GET, HTTP_REQUEST_METHOD_VALUE_HEAD, HTTP_REQUEST_METHOD_VALUE_OPTIONS, HTTP_REQUEST_METHOD_VALUE_PATCH, HTTP_REQUEST_METHOD_VALUE_POST, HTTP_REQUEST_METHOD_VALUE_PUT, HTTP_REQUEST_METHOD_VALUE_TRACE, ATTR_HTTP_REQUEST_METHOD_ORIGINAL, ATTR_HTTP_REQUEST_RESEND_COUNT, ATTR_HTTP_RESPONSE_HEADER, ATTR_HTTP_RESPONSE_STATUS_CODE, ATTR_HTTP_ROUTE, ATTR_JVM_GC_ACTION, ATTR_JVM_GC_NAME, ATTR_JVM_MEMORY_POOL_NAME, ATTR_JVM_MEMORY_TYPE, JVM_MEMORY_TYPE_VALUE_HEAP, JVM_MEMORY_TYPE_VALUE_NON_HEAP, ATTR_JVM_THREAD_DAEMON, ATTR_JVM_THREAD_STATE, JVM_THREAD_STATE_VALUE_BLOCKED, JVM_THREAD_STATE_VALUE_NEW, JVM_THREAD_STATE_VALUE_RUNNABLE, JVM_THREAD_STATE_VALUE_TERMINATED, JVM_THREAD_STATE_VALUE_TIMED_WAITING, JVM_THREAD_STATE_VALUE_WAITING, ATTR_NETWORK_LOCAL_ADDRESS, ATTR_NETWORK_LOCAL_PORT, ATTR_NETWORK_PEER_ADDRESS, ATTR_NETWORK_PEER_PORT, ATTR_NETWORK_PROTOCOL_NAME, ATTR_NETWORK_PROTOCOL_VERSION, ATTR_NETWORK_TRANSPORT, NETWORK_TRANSPORT_VALUE_PIPE, NETWORK_TRANSPORT_VALUE_QUIC, NETWORK_TRANSPORT_VALUE_TCP, NETWORK_TRANSPORT_VALUE_UDP, NETWORK_TRANSPORT_VALUE_UNIX, ATTR_NETWORK_TYPE, NETWORK_TYPE_VALUE_IPV4, NETWORK_TYPE_VALUE_IPV6, ATTR_OTEL_SCOPE_NAME, ATTR_OTEL_SCOPE_VERSION, ATTR_OTEL_STATUS_CODE, OTEL_STATUS_CODE_VALUE_ERROR, OTEL_STATUS_CODE_VALUE_OK, ATTR_OTEL_STATUS_DESCRIPTION, ATTR_SERVER_ADDRESS, ATTR_SERVER_PORT, ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION, ATTR_SIGNALR_CONNECTION_STATUS, SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN, SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE, SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT, ATTR_SIGNALR_TRANSPORT, SIGNALR_TRANSPORT_VALUE_LONG_POLLING, SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS, SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS, ATTR_TELEMETRY_SDK_LANGUAGE, TELEMETRY_SDK_LANGUAGE_VALUE_CPP, TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET, TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG, TELEMETRY_SDK_LANGUAGE_VALUE_GO, TELEMETRY_SDK_LANGUAGE_VALUE_JAVA, TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS, TELEMETRY_SDK_LANGUAGE_VALUE_PHP, TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON, TELEMETRY_SDK_LANGUAGE_VALUE_RUBY, TELEMETRY_SDK_LANGUAGE_VALUE_RUST, TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT, TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS, ATTR_TELEMETRY_SDK_NAME, ATTR_TELEMETRY_SDK_VERSION, ATTR_URL_FRAGMENT, ATTR_URL_FULL, ATTR_URL_PATH, ATTR_URL_QUERY, ATTR_URL_SCHEME, ATTR_USER_AGENT_ORIGINAL;
var init_stable_attributes = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js"() {
    ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT = "aspnetcore.diagnostics.exception.result";
    ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED = "aborted";
    ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED = "handled";
    ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED = "skipped";
    ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED = "unhandled";
    ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE = "aspnetcore.diagnostics.handler.type";
    ATTR_ASPNETCORE_RATE_LIMITING_POLICY = "aspnetcore.rate_limiting.policy";
    ATTR_ASPNETCORE_RATE_LIMITING_RESULT = "aspnetcore.rate_limiting.result";
    ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED = "acquired";
    ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER = "endpoint_limiter";
    ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER = "global_limiter";
    ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED = "request_canceled";
    ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED = "aspnetcore.request.is_unhandled";
    ATTR_ASPNETCORE_ROUTING_IS_FALLBACK = "aspnetcore.routing.is_fallback";
    ATTR_ASPNETCORE_ROUTING_MATCH_STATUS = "aspnetcore.routing.match_status";
    ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE = "failure";
    ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS = "success";
    ATTR_ASPNETCORE_USER_IS_AUTHENTICATED = "aspnetcore.user.is_authenticated";
    ATTR_CLIENT_ADDRESS = "client.address";
    ATTR_CLIENT_PORT = "client.port";
    ATTR_CODE_COLUMN_NUMBER = "code.column.number";
    ATTR_CODE_FILE_PATH = "code.file.path";
    ATTR_CODE_FUNCTION_NAME = "code.function.name";
    ATTR_CODE_LINE_NUMBER = "code.line.number";
    ATTR_CODE_STACKTRACE = "code.stacktrace";
    ATTR_DB_COLLECTION_NAME = "db.collection.name";
    ATTR_DB_NAMESPACE = "db.namespace";
    ATTR_DB_OPERATION_BATCH_SIZE = "db.operation.batch.size";
    ATTR_DB_OPERATION_NAME = "db.operation.name";
    ATTR_DB_QUERY_SUMMARY = "db.query.summary";
    ATTR_DB_QUERY_TEXT = "db.query.text";
    ATTR_DB_RESPONSE_STATUS_CODE = "db.response.status_code";
    ATTR_DB_STORED_PROCEDURE_NAME = "db.stored_procedure.name";
    ATTR_DB_SYSTEM_NAME = "db.system.name";
    DB_SYSTEM_NAME_VALUE_MARIADB = "mariadb";
    DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER = "microsoft.sql_server";
    DB_SYSTEM_NAME_VALUE_MYSQL = "mysql";
    DB_SYSTEM_NAME_VALUE_POSTGRESQL = "postgresql";
    ATTR_DOTNET_GC_HEAP_GENERATION = "dotnet.gc.heap.generation";
    DOTNET_GC_HEAP_GENERATION_VALUE_GEN0 = "gen0";
    DOTNET_GC_HEAP_GENERATION_VALUE_GEN1 = "gen1";
    DOTNET_GC_HEAP_GENERATION_VALUE_GEN2 = "gen2";
    DOTNET_GC_HEAP_GENERATION_VALUE_LOH = "loh";
    DOTNET_GC_HEAP_GENERATION_VALUE_POH = "poh";
    ATTR_ERROR_TYPE = "error.type";
    ERROR_TYPE_VALUE_OTHER = "_OTHER";
    ATTR_EXCEPTION_ESCAPED = "exception.escaped";
    ATTR_EXCEPTION_MESSAGE = "exception.message";
    ATTR_EXCEPTION_STACKTRACE = "exception.stacktrace";
    ATTR_EXCEPTION_TYPE = "exception.type";
    ATTR_HTTP_REQUEST_HEADER = (key) => `http.request.header.${key}`;
    ATTR_HTTP_REQUEST_METHOD = "http.request.method";
    HTTP_REQUEST_METHOD_VALUE_OTHER = "_OTHER";
    HTTP_REQUEST_METHOD_VALUE_CONNECT = "CONNECT";
    HTTP_REQUEST_METHOD_VALUE_DELETE = "DELETE";
    HTTP_REQUEST_METHOD_VALUE_GET = "GET";
    HTTP_REQUEST_METHOD_VALUE_HEAD = "HEAD";
    HTTP_REQUEST_METHOD_VALUE_OPTIONS = "OPTIONS";
    HTTP_REQUEST_METHOD_VALUE_PATCH = "PATCH";
    HTTP_REQUEST_METHOD_VALUE_POST = "POST";
    HTTP_REQUEST_METHOD_VALUE_PUT = "PUT";
    HTTP_REQUEST_METHOD_VALUE_TRACE = "TRACE";
    ATTR_HTTP_REQUEST_METHOD_ORIGINAL = "http.request.method_original";
    ATTR_HTTP_REQUEST_RESEND_COUNT = "http.request.resend_count";
    ATTR_HTTP_RESPONSE_HEADER = (key) => `http.response.header.${key}`;
    ATTR_HTTP_RESPONSE_STATUS_CODE = "http.response.status_code";
    ATTR_HTTP_ROUTE = "http.route";
    ATTR_JVM_GC_ACTION = "jvm.gc.action";
    ATTR_JVM_GC_NAME = "jvm.gc.name";
    ATTR_JVM_MEMORY_POOL_NAME = "jvm.memory.pool.name";
    ATTR_JVM_MEMORY_TYPE = "jvm.memory.type";
    JVM_MEMORY_TYPE_VALUE_HEAP = "heap";
    JVM_MEMORY_TYPE_VALUE_NON_HEAP = "non_heap";
    ATTR_JVM_THREAD_DAEMON = "jvm.thread.daemon";
    ATTR_JVM_THREAD_STATE = "jvm.thread.state";
    JVM_THREAD_STATE_VALUE_BLOCKED = "blocked";
    JVM_THREAD_STATE_VALUE_NEW = "new";
    JVM_THREAD_STATE_VALUE_RUNNABLE = "runnable";
    JVM_THREAD_STATE_VALUE_TERMINATED = "terminated";
    JVM_THREAD_STATE_VALUE_TIMED_WAITING = "timed_waiting";
    JVM_THREAD_STATE_VALUE_WAITING = "waiting";
    ATTR_NETWORK_LOCAL_ADDRESS = "network.local.address";
    ATTR_NETWORK_LOCAL_PORT = "network.local.port";
    ATTR_NETWORK_PEER_ADDRESS = "network.peer.address";
    ATTR_NETWORK_PEER_PORT = "network.peer.port";
    ATTR_NETWORK_PROTOCOL_NAME = "network.protocol.name";
    ATTR_NETWORK_PROTOCOL_VERSION = "network.protocol.version";
    ATTR_NETWORK_TRANSPORT = "network.transport";
    NETWORK_TRANSPORT_VALUE_PIPE = "pipe";
    NETWORK_TRANSPORT_VALUE_QUIC = "quic";
    NETWORK_TRANSPORT_VALUE_TCP = "tcp";
    NETWORK_TRANSPORT_VALUE_UDP = "udp";
    NETWORK_TRANSPORT_VALUE_UNIX = "unix";
    ATTR_NETWORK_TYPE = "network.type";
    NETWORK_TYPE_VALUE_IPV4 = "ipv4";
    NETWORK_TYPE_VALUE_IPV6 = "ipv6";
    ATTR_OTEL_SCOPE_NAME = "otel.scope.name";
    ATTR_OTEL_SCOPE_VERSION = "otel.scope.version";
    ATTR_OTEL_STATUS_CODE = "otel.status_code";
    OTEL_STATUS_CODE_VALUE_ERROR = "ERROR";
    OTEL_STATUS_CODE_VALUE_OK = "OK";
    ATTR_OTEL_STATUS_DESCRIPTION = "otel.status_description";
    ATTR_SERVER_ADDRESS = "server.address";
    ATTR_SERVER_PORT = "server.port";
    ATTR_SERVICE_NAME = "service.name";
    ATTR_SERVICE_VERSION = "service.version";
    ATTR_SIGNALR_CONNECTION_STATUS = "signalr.connection.status";
    SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN = "app_shutdown";
    SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE = "normal_closure";
    SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT = "timeout";
    ATTR_SIGNALR_TRANSPORT = "signalr.transport";
    SIGNALR_TRANSPORT_VALUE_LONG_POLLING = "long_polling";
    SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS = "server_sent_events";
    SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS = "web_sockets";
    ATTR_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
    TELEMETRY_SDK_LANGUAGE_VALUE_CPP = "cpp";
    TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = "dotnet";
    TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = "erlang";
    TELEMETRY_SDK_LANGUAGE_VALUE_GO = "go";
    TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = "java";
    TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = "nodejs";
    TELEMETRY_SDK_LANGUAGE_VALUE_PHP = "php";
    TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = "python";
    TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = "ruby";
    TELEMETRY_SDK_LANGUAGE_VALUE_RUST = "rust";
    TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = "swift";
    TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = "webjs";
    ATTR_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
    ATTR_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
    ATTR_URL_FRAGMENT = "url.fragment";
    ATTR_URL_FULL = "url.full";
    ATTR_URL_PATH = "url.path";
    ATTR_URL_QUERY = "url.query";
    ATTR_URL_SCHEME = "url.scheme";
    ATTR_USER_AGENT_ORIGINAL = "user_agent.original";
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_metrics.js
var METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS, METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES, METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS, METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE, METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION, METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS, METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS, METRIC_DB_CLIENT_OPERATION_DURATION, METRIC_DOTNET_ASSEMBLY_COUNT, METRIC_DOTNET_EXCEPTIONS, METRIC_DOTNET_GC_COLLECTIONS, METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED, METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE, METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE, METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE, METRIC_DOTNET_GC_PAUSE_TIME, METRIC_DOTNET_JIT_COMPILATION_TIME, METRIC_DOTNET_JIT_COMPILED_IL_SIZE, METRIC_DOTNET_JIT_COMPILED_METHODS, METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS, METRIC_DOTNET_PROCESS_CPU_COUNT, METRIC_DOTNET_PROCESS_CPU_TIME, METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET, METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH, METRIC_DOTNET_THREAD_POOL_THREAD_COUNT, METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT, METRIC_DOTNET_TIMER_COUNT, METRIC_HTTP_CLIENT_REQUEST_DURATION, METRIC_HTTP_SERVER_REQUEST_DURATION, METRIC_JVM_CLASS_COUNT, METRIC_JVM_CLASS_LOADED, METRIC_JVM_CLASS_UNLOADED, METRIC_JVM_CPU_COUNT, METRIC_JVM_CPU_RECENT_UTILIZATION, METRIC_JVM_CPU_TIME, METRIC_JVM_GC_DURATION, METRIC_JVM_MEMORY_COMMITTED, METRIC_JVM_MEMORY_LIMIT, METRIC_JVM_MEMORY_USED, METRIC_JVM_MEMORY_USED_AFTER_LAST_GC, METRIC_JVM_THREAD_COUNT, METRIC_KESTREL_ACTIVE_CONNECTIONS, METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES, METRIC_KESTREL_CONNECTION_DURATION, METRIC_KESTREL_QUEUED_CONNECTIONS, METRIC_KESTREL_QUEUED_REQUESTS, METRIC_KESTREL_REJECTED_CONNECTIONS, METRIC_KESTREL_TLS_HANDSHAKE_DURATION, METRIC_KESTREL_UPGRADED_CONNECTIONS, METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS, METRIC_SIGNALR_SERVER_CONNECTION_DURATION;
var init_stable_metrics = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_metrics.js"() {
    METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS = "aspnetcore.diagnostics.exceptions";
    METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES = "aspnetcore.rate_limiting.active_request_leases";
    METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS = "aspnetcore.rate_limiting.queued_requests";
    METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE = "aspnetcore.rate_limiting.request.time_in_queue";
    METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION = "aspnetcore.rate_limiting.request_lease.duration";
    METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS = "aspnetcore.rate_limiting.requests";
    METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS = "aspnetcore.routing.match_attempts";
    METRIC_DB_CLIENT_OPERATION_DURATION = "db.client.operation.duration";
    METRIC_DOTNET_ASSEMBLY_COUNT = "dotnet.assembly.count";
    METRIC_DOTNET_EXCEPTIONS = "dotnet.exceptions";
    METRIC_DOTNET_GC_COLLECTIONS = "dotnet.gc.collections";
    METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED = "dotnet.gc.heap.total_allocated";
    METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE = "dotnet.gc.last_collection.heap.fragmentation.size";
    METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE = "dotnet.gc.last_collection.heap.size";
    METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE = "dotnet.gc.last_collection.memory.committed_size";
    METRIC_DOTNET_GC_PAUSE_TIME = "dotnet.gc.pause.time";
    METRIC_DOTNET_JIT_COMPILATION_TIME = "dotnet.jit.compilation.time";
    METRIC_DOTNET_JIT_COMPILED_IL_SIZE = "dotnet.jit.compiled_il.size";
    METRIC_DOTNET_JIT_COMPILED_METHODS = "dotnet.jit.compiled_methods";
    METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS = "dotnet.monitor.lock_contentions";
    METRIC_DOTNET_PROCESS_CPU_COUNT = "dotnet.process.cpu.count";
    METRIC_DOTNET_PROCESS_CPU_TIME = "dotnet.process.cpu.time";
    METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET = "dotnet.process.memory.working_set";
    METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH = "dotnet.thread_pool.queue.length";
    METRIC_DOTNET_THREAD_POOL_THREAD_COUNT = "dotnet.thread_pool.thread.count";
    METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT = "dotnet.thread_pool.work_item.count";
    METRIC_DOTNET_TIMER_COUNT = "dotnet.timer.count";
    METRIC_HTTP_CLIENT_REQUEST_DURATION = "http.client.request.duration";
    METRIC_HTTP_SERVER_REQUEST_DURATION = "http.server.request.duration";
    METRIC_JVM_CLASS_COUNT = "jvm.class.count";
    METRIC_JVM_CLASS_LOADED = "jvm.class.loaded";
    METRIC_JVM_CLASS_UNLOADED = "jvm.class.unloaded";
    METRIC_JVM_CPU_COUNT = "jvm.cpu.count";
    METRIC_JVM_CPU_RECENT_UTILIZATION = "jvm.cpu.recent_utilization";
    METRIC_JVM_CPU_TIME = "jvm.cpu.time";
    METRIC_JVM_GC_DURATION = "jvm.gc.duration";
    METRIC_JVM_MEMORY_COMMITTED = "jvm.memory.committed";
    METRIC_JVM_MEMORY_LIMIT = "jvm.memory.limit";
    METRIC_JVM_MEMORY_USED = "jvm.memory.used";
    METRIC_JVM_MEMORY_USED_AFTER_LAST_GC = "jvm.memory.used_after_last_gc";
    METRIC_JVM_THREAD_COUNT = "jvm.thread.count";
    METRIC_KESTREL_ACTIVE_CONNECTIONS = "kestrel.active_connections";
    METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES = "kestrel.active_tls_handshakes";
    METRIC_KESTREL_CONNECTION_DURATION = "kestrel.connection.duration";
    METRIC_KESTREL_QUEUED_CONNECTIONS = "kestrel.queued_connections";
    METRIC_KESTREL_QUEUED_REQUESTS = "kestrel.queued_requests";
    METRIC_KESTREL_REJECTED_CONNECTIONS = "kestrel.rejected_connections";
    METRIC_KESTREL_TLS_HANDSHAKE_DURATION = "kestrel.tls_handshake.duration";
    METRIC_KESTREL_UPGRADED_CONNECTIONS = "kestrel.upgraded_connections";
    METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS = "signalr.server.active_connections";
    METRIC_SIGNALR_SERVER_CONNECTION_DURATION = "signalr.server.connection.duration";
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_events.js
var EVENT_EXCEPTION;
var init_stable_events = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_events.js"() {
    EVENT_EXCEPTION = "exception";
  }
});

// node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js
var esm_exports2 = {};
__export(esm_exports2, {
  ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED: () => ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED,
  ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED: () => ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED,
  ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED: () => ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED,
  ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED: () => ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED,
  ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED: () => ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED,
  ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER: () => ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER,
  ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER: () => ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER,
  ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED: () => ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED,
  ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE: () => ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE,
  ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS: () => ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS,
  ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT: () => ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT,
  ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE: () => ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE,
  ATTR_ASPNETCORE_RATE_LIMITING_POLICY: () => ATTR_ASPNETCORE_RATE_LIMITING_POLICY,
  ATTR_ASPNETCORE_RATE_LIMITING_RESULT: () => ATTR_ASPNETCORE_RATE_LIMITING_RESULT,
  ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED: () => ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED,
  ATTR_ASPNETCORE_ROUTING_IS_FALLBACK: () => ATTR_ASPNETCORE_ROUTING_IS_FALLBACK,
  ATTR_ASPNETCORE_ROUTING_MATCH_STATUS: () => ATTR_ASPNETCORE_ROUTING_MATCH_STATUS,
  ATTR_ASPNETCORE_USER_IS_AUTHENTICATED: () => ATTR_ASPNETCORE_USER_IS_AUTHENTICATED,
  ATTR_CLIENT_ADDRESS: () => ATTR_CLIENT_ADDRESS,
  ATTR_CLIENT_PORT: () => ATTR_CLIENT_PORT,
  ATTR_CODE_COLUMN_NUMBER: () => ATTR_CODE_COLUMN_NUMBER,
  ATTR_CODE_FILE_PATH: () => ATTR_CODE_FILE_PATH,
  ATTR_CODE_FUNCTION_NAME: () => ATTR_CODE_FUNCTION_NAME,
  ATTR_CODE_LINE_NUMBER: () => ATTR_CODE_LINE_NUMBER,
  ATTR_CODE_STACKTRACE: () => ATTR_CODE_STACKTRACE,
  ATTR_DB_COLLECTION_NAME: () => ATTR_DB_COLLECTION_NAME,
  ATTR_DB_NAMESPACE: () => ATTR_DB_NAMESPACE,
  ATTR_DB_OPERATION_BATCH_SIZE: () => ATTR_DB_OPERATION_BATCH_SIZE,
  ATTR_DB_OPERATION_NAME: () => ATTR_DB_OPERATION_NAME,
  ATTR_DB_QUERY_SUMMARY: () => ATTR_DB_QUERY_SUMMARY,
  ATTR_DB_QUERY_TEXT: () => ATTR_DB_QUERY_TEXT,
  ATTR_DB_RESPONSE_STATUS_CODE: () => ATTR_DB_RESPONSE_STATUS_CODE,
  ATTR_DB_STORED_PROCEDURE_NAME: () => ATTR_DB_STORED_PROCEDURE_NAME,
  ATTR_DB_SYSTEM_NAME: () => ATTR_DB_SYSTEM_NAME,
  ATTR_DOTNET_GC_HEAP_GENERATION: () => ATTR_DOTNET_GC_HEAP_GENERATION,
  ATTR_ERROR_TYPE: () => ATTR_ERROR_TYPE,
  ATTR_EXCEPTION_ESCAPED: () => ATTR_EXCEPTION_ESCAPED,
  ATTR_EXCEPTION_MESSAGE: () => ATTR_EXCEPTION_MESSAGE,
  ATTR_EXCEPTION_STACKTRACE: () => ATTR_EXCEPTION_STACKTRACE,
  ATTR_EXCEPTION_TYPE: () => ATTR_EXCEPTION_TYPE,
  ATTR_HTTP_REQUEST_HEADER: () => ATTR_HTTP_REQUEST_HEADER,
  ATTR_HTTP_REQUEST_METHOD: () => ATTR_HTTP_REQUEST_METHOD,
  ATTR_HTTP_REQUEST_METHOD_ORIGINAL: () => ATTR_HTTP_REQUEST_METHOD_ORIGINAL,
  ATTR_HTTP_REQUEST_RESEND_COUNT: () => ATTR_HTTP_REQUEST_RESEND_COUNT,
  ATTR_HTTP_RESPONSE_HEADER: () => ATTR_HTTP_RESPONSE_HEADER,
  ATTR_HTTP_RESPONSE_STATUS_CODE: () => ATTR_HTTP_RESPONSE_STATUS_CODE,
  ATTR_HTTP_ROUTE: () => ATTR_HTTP_ROUTE,
  ATTR_JVM_GC_ACTION: () => ATTR_JVM_GC_ACTION,
  ATTR_JVM_GC_NAME: () => ATTR_JVM_GC_NAME,
  ATTR_JVM_MEMORY_POOL_NAME: () => ATTR_JVM_MEMORY_POOL_NAME,
  ATTR_JVM_MEMORY_TYPE: () => ATTR_JVM_MEMORY_TYPE,
  ATTR_JVM_THREAD_DAEMON: () => ATTR_JVM_THREAD_DAEMON,
  ATTR_JVM_THREAD_STATE: () => ATTR_JVM_THREAD_STATE,
  ATTR_NETWORK_LOCAL_ADDRESS: () => ATTR_NETWORK_LOCAL_ADDRESS,
  ATTR_NETWORK_LOCAL_PORT: () => ATTR_NETWORK_LOCAL_PORT,
  ATTR_NETWORK_PEER_ADDRESS: () => ATTR_NETWORK_PEER_ADDRESS,
  ATTR_NETWORK_PEER_PORT: () => ATTR_NETWORK_PEER_PORT,
  ATTR_NETWORK_PROTOCOL_NAME: () => ATTR_NETWORK_PROTOCOL_NAME,
  ATTR_NETWORK_PROTOCOL_VERSION: () => ATTR_NETWORK_PROTOCOL_VERSION,
  ATTR_NETWORK_TRANSPORT: () => ATTR_NETWORK_TRANSPORT,
  ATTR_NETWORK_TYPE: () => ATTR_NETWORK_TYPE,
  ATTR_OTEL_SCOPE_NAME: () => ATTR_OTEL_SCOPE_NAME,
  ATTR_OTEL_SCOPE_VERSION: () => ATTR_OTEL_SCOPE_VERSION,
  ATTR_OTEL_STATUS_CODE: () => ATTR_OTEL_STATUS_CODE,
  ATTR_OTEL_STATUS_DESCRIPTION: () => ATTR_OTEL_STATUS_DESCRIPTION,
  ATTR_SERVER_ADDRESS: () => ATTR_SERVER_ADDRESS,
  ATTR_SERVER_PORT: () => ATTR_SERVER_PORT,
  ATTR_SERVICE_NAME: () => ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION: () => ATTR_SERVICE_VERSION,
  ATTR_SIGNALR_CONNECTION_STATUS: () => ATTR_SIGNALR_CONNECTION_STATUS,
  ATTR_SIGNALR_TRANSPORT: () => ATTR_SIGNALR_TRANSPORT,
  ATTR_TELEMETRY_SDK_LANGUAGE: () => ATTR_TELEMETRY_SDK_LANGUAGE,
  ATTR_TELEMETRY_SDK_NAME: () => ATTR_TELEMETRY_SDK_NAME,
  ATTR_TELEMETRY_SDK_VERSION: () => ATTR_TELEMETRY_SDK_VERSION,
  ATTR_URL_FRAGMENT: () => ATTR_URL_FRAGMENT,
  ATTR_URL_FULL: () => ATTR_URL_FULL,
  ATTR_URL_PATH: () => ATTR_URL_PATH,
  ATTR_URL_QUERY: () => ATTR_URL_QUERY,
  ATTR_URL_SCHEME: () => ATTR_URL_SCHEME,
  ATTR_USER_AGENT_ORIGINAL: () => ATTR_USER_AGENT_ORIGINAL,
  AWSECSLAUNCHTYPEVALUES_EC2: () => AWSECSLAUNCHTYPEVALUES_EC2,
  AWSECSLAUNCHTYPEVALUES_FARGATE: () => AWSECSLAUNCHTYPEVALUES_FARGATE,
  AwsEcsLaunchtypeValues: () => AwsEcsLaunchtypeValues,
  CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS: () => CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS,
  CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC: () => CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC,
  CLOUDPLATFORMVALUES_AWS_EC2: () => CLOUDPLATFORMVALUES_AWS_EC2,
  CLOUDPLATFORMVALUES_AWS_ECS: () => CLOUDPLATFORMVALUES_AWS_ECS,
  CLOUDPLATFORMVALUES_AWS_EKS: () => CLOUDPLATFORMVALUES_AWS_EKS,
  CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK: () => CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK,
  CLOUDPLATFORMVALUES_AWS_LAMBDA: () => CLOUDPLATFORMVALUES_AWS_LAMBDA,
  CLOUDPLATFORMVALUES_AZURE_AKS: () => CLOUDPLATFORMVALUES_AZURE_AKS,
  CLOUDPLATFORMVALUES_AZURE_APP_SERVICE: () => CLOUDPLATFORMVALUES_AZURE_APP_SERVICE,
  CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES: () => CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES,
  CLOUDPLATFORMVALUES_AZURE_FUNCTIONS: () => CLOUDPLATFORMVALUES_AZURE_FUNCTIONS,
  CLOUDPLATFORMVALUES_AZURE_VM: () => CLOUDPLATFORMVALUES_AZURE_VM,
  CLOUDPLATFORMVALUES_GCP_APP_ENGINE: () => CLOUDPLATFORMVALUES_GCP_APP_ENGINE,
  CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS: () => CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS,
  CLOUDPLATFORMVALUES_GCP_CLOUD_RUN: () => CLOUDPLATFORMVALUES_GCP_CLOUD_RUN,
  CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE: () => CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE,
  CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE: () => CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE,
  CLOUDPROVIDERVALUES_ALIBABA_CLOUD: () => CLOUDPROVIDERVALUES_ALIBABA_CLOUD,
  CLOUDPROVIDERVALUES_AWS: () => CLOUDPROVIDERVALUES_AWS,
  CLOUDPROVIDERVALUES_AZURE: () => CLOUDPROVIDERVALUES_AZURE,
  CLOUDPROVIDERVALUES_GCP: () => CLOUDPROVIDERVALUES_GCP,
  CloudPlatformValues: () => CloudPlatformValues,
  CloudProviderValues: () => CloudProviderValues,
  DBCASSANDRACONSISTENCYLEVELVALUES_ALL: () => DBCASSANDRACONSISTENCYLEVELVALUES_ALL,
  DBCASSANDRACONSISTENCYLEVELVALUES_ANY: () => DBCASSANDRACONSISTENCYLEVELVALUES_ANY,
  DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM: () => DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM,
  DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE: () => DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE,
  DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM: () => DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM,
  DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL: () => DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL,
  DBCASSANDRACONSISTENCYLEVELVALUES_ONE: () => DBCASSANDRACONSISTENCYLEVELVALUES_ONE,
  DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM: () => DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM,
  DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL: () => DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL,
  DBCASSANDRACONSISTENCYLEVELVALUES_THREE: () => DBCASSANDRACONSISTENCYLEVELVALUES_THREE,
  DBCASSANDRACONSISTENCYLEVELVALUES_TWO: () => DBCASSANDRACONSISTENCYLEVELVALUES_TWO,
  DBSYSTEMVALUES_ADABAS: () => DBSYSTEMVALUES_ADABAS,
  DBSYSTEMVALUES_CACHE: () => DBSYSTEMVALUES_CACHE,
  DBSYSTEMVALUES_CASSANDRA: () => DBSYSTEMVALUES_CASSANDRA,
  DBSYSTEMVALUES_CLOUDSCAPE: () => DBSYSTEMVALUES_CLOUDSCAPE,
  DBSYSTEMVALUES_COCKROACHDB: () => DBSYSTEMVALUES_COCKROACHDB,
  DBSYSTEMVALUES_COLDFUSION: () => DBSYSTEMVALUES_COLDFUSION,
  DBSYSTEMVALUES_COSMOSDB: () => DBSYSTEMVALUES_COSMOSDB,
  DBSYSTEMVALUES_COUCHBASE: () => DBSYSTEMVALUES_COUCHBASE,
  DBSYSTEMVALUES_COUCHDB: () => DBSYSTEMVALUES_COUCHDB,
  DBSYSTEMVALUES_DB2: () => DBSYSTEMVALUES_DB2,
  DBSYSTEMVALUES_DERBY: () => DBSYSTEMVALUES_DERBY,
  DBSYSTEMVALUES_DYNAMODB: () => DBSYSTEMVALUES_DYNAMODB,
  DBSYSTEMVALUES_EDB: () => DBSYSTEMVALUES_EDB,
  DBSYSTEMVALUES_ELASTICSEARCH: () => DBSYSTEMVALUES_ELASTICSEARCH,
  DBSYSTEMVALUES_FILEMAKER: () => DBSYSTEMVALUES_FILEMAKER,
  DBSYSTEMVALUES_FIREBIRD: () => DBSYSTEMVALUES_FIREBIRD,
  DBSYSTEMVALUES_FIRSTSQL: () => DBSYSTEMVALUES_FIRSTSQL,
  DBSYSTEMVALUES_GEODE: () => DBSYSTEMVALUES_GEODE,
  DBSYSTEMVALUES_H2: () => DBSYSTEMVALUES_H2,
  DBSYSTEMVALUES_HANADB: () => DBSYSTEMVALUES_HANADB,
  DBSYSTEMVALUES_HBASE: () => DBSYSTEMVALUES_HBASE,
  DBSYSTEMVALUES_HIVE: () => DBSYSTEMVALUES_HIVE,
  DBSYSTEMVALUES_HSQLDB: () => DBSYSTEMVALUES_HSQLDB,
  DBSYSTEMVALUES_INFORMIX: () => DBSYSTEMVALUES_INFORMIX,
  DBSYSTEMVALUES_INGRES: () => DBSYSTEMVALUES_INGRES,
  DBSYSTEMVALUES_INSTANTDB: () => DBSYSTEMVALUES_INSTANTDB,
  DBSYSTEMVALUES_INTERBASE: () => DBSYSTEMVALUES_INTERBASE,
  DBSYSTEMVALUES_MARIADB: () => DBSYSTEMVALUES_MARIADB,
  DBSYSTEMVALUES_MAXDB: () => DBSYSTEMVALUES_MAXDB,
  DBSYSTEMVALUES_MEMCACHED: () => DBSYSTEMVALUES_MEMCACHED,
  DBSYSTEMVALUES_MONGODB: () => DBSYSTEMVALUES_MONGODB,
  DBSYSTEMVALUES_MSSQL: () => DBSYSTEMVALUES_MSSQL,
  DBSYSTEMVALUES_MYSQL: () => DBSYSTEMVALUES_MYSQL,
  DBSYSTEMVALUES_NEO4J: () => DBSYSTEMVALUES_NEO4J,
  DBSYSTEMVALUES_NETEZZA: () => DBSYSTEMVALUES_NETEZZA,
  DBSYSTEMVALUES_ORACLE: () => DBSYSTEMVALUES_ORACLE,
  DBSYSTEMVALUES_OTHER_SQL: () => DBSYSTEMVALUES_OTHER_SQL,
  DBSYSTEMVALUES_PERVASIVE: () => DBSYSTEMVALUES_PERVASIVE,
  DBSYSTEMVALUES_POINTBASE: () => DBSYSTEMVALUES_POINTBASE,
  DBSYSTEMVALUES_POSTGRESQL: () => DBSYSTEMVALUES_POSTGRESQL,
  DBSYSTEMVALUES_PROGRESS: () => DBSYSTEMVALUES_PROGRESS,
  DBSYSTEMVALUES_REDIS: () => DBSYSTEMVALUES_REDIS,
  DBSYSTEMVALUES_REDSHIFT: () => DBSYSTEMVALUES_REDSHIFT,
  DBSYSTEMVALUES_SQLITE: () => DBSYSTEMVALUES_SQLITE,
  DBSYSTEMVALUES_SYBASE: () => DBSYSTEMVALUES_SYBASE,
  DBSYSTEMVALUES_TERADATA: () => DBSYSTEMVALUES_TERADATA,
  DBSYSTEMVALUES_VERTICA: () => DBSYSTEMVALUES_VERTICA,
  DB_SYSTEM_NAME_VALUE_MARIADB: () => DB_SYSTEM_NAME_VALUE_MARIADB,
  DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER: () => DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER,
  DB_SYSTEM_NAME_VALUE_MYSQL: () => DB_SYSTEM_NAME_VALUE_MYSQL,
  DB_SYSTEM_NAME_VALUE_POSTGRESQL: () => DB_SYSTEM_NAME_VALUE_POSTGRESQL,
  DOTNET_GC_HEAP_GENERATION_VALUE_GEN0: () => DOTNET_GC_HEAP_GENERATION_VALUE_GEN0,
  DOTNET_GC_HEAP_GENERATION_VALUE_GEN1: () => DOTNET_GC_HEAP_GENERATION_VALUE_GEN1,
  DOTNET_GC_HEAP_GENERATION_VALUE_GEN2: () => DOTNET_GC_HEAP_GENERATION_VALUE_GEN2,
  DOTNET_GC_HEAP_GENERATION_VALUE_LOH: () => DOTNET_GC_HEAP_GENERATION_VALUE_LOH,
  DOTNET_GC_HEAP_GENERATION_VALUE_POH: () => DOTNET_GC_HEAP_GENERATION_VALUE_POH,
  DbCassandraConsistencyLevelValues: () => DbCassandraConsistencyLevelValues,
  DbSystemValues: () => DbSystemValues,
  ERROR_TYPE_VALUE_OTHER: () => ERROR_TYPE_VALUE_OTHER,
  EVENT_EXCEPTION: () => EVENT_EXCEPTION,
  FAASDOCUMENTOPERATIONVALUES_DELETE: () => FAASDOCUMENTOPERATIONVALUES_DELETE,
  FAASDOCUMENTOPERATIONVALUES_EDIT: () => FAASDOCUMENTOPERATIONVALUES_EDIT,
  FAASDOCUMENTOPERATIONVALUES_INSERT: () => FAASDOCUMENTOPERATIONVALUES_INSERT,
  FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD: () => FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD,
  FAASINVOKEDPROVIDERVALUES_AWS: () => FAASINVOKEDPROVIDERVALUES_AWS,
  FAASINVOKEDPROVIDERVALUES_AZURE: () => FAASINVOKEDPROVIDERVALUES_AZURE,
  FAASINVOKEDPROVIDERVALUES_GCP: () => FAASINVOKEDPROVIDERVALUES_GCP,
  FAASTRIGGERVALUES_DATASOURCE: () => FAASTRIGGERVALUES_DATASOURCE,
  FAASTRIGGERVALUES_HTTP: () => FAASTRIGGERVALUES_HTTP,
  FAASTRIGGERVALUES_OTHER: () => FAASTRIGGERVALUES_OTHER,
  FAASTRIGGERVALUES_PUBSUB: () => FAASTRIGGERVALUES_PUBSUB,
  FAASTRIGGERVALUES_TIMER: () => FAASTRIGGERVALUES_TIMER,
  FaasDocumentOperationValues: () => FaasDocumentOperationValues,
  FaasInvokedProviderValues: () => FaasInvokedProviderValues,
  FaasTriggerValues: () => FaasTriggerValues,
  HOSTARCHVALUES_AMD64: () => HOSTARCHVALUES_AMD64,
  HOSTARCHVALUES_ARM32: () => HOSTARCHVALUES_ARM32,
  HOSTARCHVALUES_ARM64: () => HOSTARCHVALUES_ARM64,
  HOSTARCHVALUES_IA64: () => HOSTARCHVALUES_IA64,
  HOSTARCHVALUES_PPC32: () => HOSTARCHVALUES_PPC32,
  HOSTARCHVALUES_PPC64: () => HOSTARCHVALUES_PPC64,
  HOSTARCHVALUES_X86: () => HOSTARCHVALUES_X86,
  HTTPFLAVORVALUES_HTTP_1_0: () => HTTPFLAVORVALUES_HTTP_1_0,
  HTTPFLAVORVALUES_HTTP_1_1: () => HTTPFLAVORVALUES_HTTP_1_1,
  HTTPFLAVORVALUES_HTTP_2_0: () => HTTPFLAVORVALUES_HTTP_2_0,
  HTTPFLAVORVALUES_QUIC: () => HTTPFLAVORVALUES_QUIC,
  HTTPFLAVORVALUES_SPDY: () => HTTPFLAVORVALUES_SPDY,
  HTTP_REQUEST_METHOD_VALUE_CONNECT: () => HTTP_REQUEST_METHOD_VALUE_CONNECT,
  HTTP_REQUEST_METHOD_VALUE_DELETE: () => HTTP_REQUEST_METHOD_VALUE_DELETE,
  HTTP_REQUEST_METHOD_VALUE_GET: () => HTTP_REQUEST_METHOD_VALUE_GET,
  HTTP_REQUEST_METHOD_VALUE_HEAD: () => HTTP_REQUEST_METHOD_VALUE_HEAD,
  HTTP_REQUEST_METHOD_VALUE_OPTIONS: () => HTTP_REQUEST_METHOD_VALUE_OPTIONS,
  HTTP_REQUEST_METHOD_VALUE_OTHER: () => HTTP_REQUEST_METHOD_VALUE_OTHER,
  HTTP_REQUEST_METHOD_VALUE_PATCH: () => HTTP_REQUEST_METHOD_VALUE_PATCH,
  HTTP_REQUEST_METHOD_VALUE_POST: () => HTTP_REQUEST_METHOD_VALUE_POST,
  HTTP_REQUEST_METHOD_VALUE_PUT: () => HTTP_REQUEST_METHOD_VALUE_PUT,
  HTTP_REQUEST_METHOD_VALUE_TRACE: () => HTTP_REQUEST_METHOD_VALUE_TRACE,
  HostArchValues: () => HostArchValues,
  HttpFlavorValues: () => HttpFlavorValues,
  JVM_MEMORY_TYPE_VALUE_HEAP: () => JVM_MEMORY_TYPE_VALUE_HEAP,
  JVM_MEMORY_TYPE_VALUE_NON_HEAP: () => JVM_MEMORY_TYPE_VALUE_NON_HEAP,
  JVM_THREAD_STATE_VALUE_BLOCKED: () => JVM_THREAD_STATE_VALUE_BLOCKED,
  JVM_THREAD_STATE_VALUE_NEW: () => JVM_THREAD_STATE_VALUE_NEW,
  JVM_THREAD_STATE_VALUE_RUNNABLE: () => JVM_THREAD_STATE_VALUE_RUNNABLE,
  JVM_THREAD_STATE_VALUE_TERMINATED: () => JVM_THREAD_STATE_VALUE_TERMINATED,
  JVM_THREAD_STATE_VALUE_TIMED_WAITING: () => JVM_THREAD_STATE_VALUE_TIMED_WAITING,
  JVM_THREAD_STATE_VALUE_WAITING: () => JVM_THREAD_STATE_VALUE_WAITING,
  MESSAGETYPEVALUES_RECEIVED: () => MESSAGETYPEVALUES_RECEIVED,
  MESSAGETYPEVALUES_SENT: () => MESSAGETYPEVALUES_SENT,
  MESSAGINGDESTINATIONKINDVALUES_QUEUE: () => MESSAGINGDESTINATIONKINDVALUES_QUEUE,
  MESSAGINGDESTINATIONKINDVALUES_TOPIC: () => MESSAGINGDESTINATIONKINDVALUES_TOPIC,
  MESSAGINGOPERATIONVALUES_PROCESS: () => MESSAGINGOPERATIONVALUES_PROCESS,
  MESSAGINGOPERATIONVALUES_RECEIVE: () => MESSAGINGOPERATIONVALUES_RECEIVE,
  METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS: () => METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS,
  METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES: () => METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES,
  METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS: () => METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS,
  METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS: () => METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS,
  METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION: () => METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION,
  METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE: () => METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE,
  METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS: () => METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS,
  METRIC_DB_CLIENT_OPERATION_DURATION: () => METRIC_DB_CLIENT_OPERATION_DURATION,
  METRIC_DOTNET_ASSEMBLY_COUNT: () => METRIC_DOTNET_ASSEMBLY_COUNT,
  METRIC_DOTNET_EXCEPTIONS: () => METRIC_DOTNET_EXCEPTIONS,
  METRIC_DOTNET_GC_COLLECTIONS: () => METRIC_DOTNET_GC_COLLECTIONS,
  METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED: () => METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED,
  METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE: () => METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE,
  METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE: () => METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE,
  METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE: () => METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE,
  METRIC_DOTNET_GC_PAUSE_TIME: () => METRIC_DOTNET_GC_PAUSE_TIME,
  METRIC_DOTNET_JIT_COMPILATION_TIME: () => METRIC_DOTNET_JIT_COMPILATION_TIME,
  METRIC_DOTNET_JIT_COMPILED_IL_SIZE: () => METRIC_DOTNET_JIT_COMPILED_IL_SIZE,
  METRIC_DOTNET_JIT_COMPILED_METHODS: () => METRIC_DOTNET_JIT_COMPILED_METHODS,
  METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS: () => METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS,
  METRIC_DOTNET_PROCESS_CPU_COUNT: () => METRIC_DOTNET_PROCESS_CPU_COUNT,
  METRIC_DOTNET_PROCESS_CPU_TIME: () => METRIC_DOTNET_PROCESS_CPU_TIME,
  METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET: () => METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET,
  METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH: () => METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH,
  METRIC_DOTNET_THREAD_POOL_THREAD_COUNT: () => METRIC_DOTNET_THREAD_POOL_THREAD_COUNT,
  METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT: () => METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT,
  METRIC_DOTNET_TIMER_COUNT: () => METRIC_DOTNET_TIMER_COUNT,
  METRIC_HTTP_CLIENT_REQUEST_DURATION: () => METRIC_HTTP_CLIENT_REQUEST_DURATION,
  METRIC_HTTP_SERVER_REQUEST_DURATION: () => METRIC_HTTP_SERVER_REQUEST_DURATION,
  METRIC_JVM_CLASS_COUNT: () => METRIC_JVM_CLASS_COUNT,
  METRIC_JVM_CLASS_LOADED: () => METRIC_JVM_CLASS_LOADED,
  METRIC_JVM_CLASS_UNLOADED: () => METRIC_JVM_CLASS_UNLOADED,
  METRIC_JVM_CPU_COUNT: () => METRIC_JVM_CPU_COUNT,
  METRIC_JVM_CPU_RECENT_UTILIZATION: () => METRIC_JVM_CPU_RECENT_UTILIZATION,
  METRIC_JVM_CPU_TIME: () => METRIC_JVM_CPU_TIME,
  METRIC_JVM_GC_DURATION: () => METRIC_JVM_GC_DURATION,
  METRIC_JVM_MEMORY_COMMITTED: () => METRIC_JVM_MEMORY_COMMITTED,
  METRIC_JVM_MEMORY_LIMIT: () => METRIC_JVM_MEMORY_LIMIT,
  METRIC_JVM_MEMORY_USED: () => METRIC_JVM_MEMORY_USED,
  METRIC_JVM_MEMORY_USED_AFTER_LAST_GC: () => METRIC_JVM_MEMORY_USED_AFTER_LAST_GC,
  METRIC_JVM_THREAD_COUNT: () => METRIC_JVM_THREAD_COUNT,
  METRIC_KESTREL_ACTIVE_CONNECTIONS: () => METRIC_KESTREL_ACTIVE_CONNECTIONS,
  METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES: () => METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES,
  METRIC_KESTREL_CONNECTION_DURATION: () => METRIC_KESTREL_CONNECTION_DURATION,
  METRIC_KESTREL_QUEUED_CONNECTIONS: () => METRIC_KESTREL_QUEUED_CONNECTIONS,
  METRIC_KESTREL_QUEUED_REQUESTS: () => METRIC_KESTREL_QUEUED_REQUESTS,
  METRIC_KESTREL_REJECTED_CONNECTIONS: () => METRIC_KESTREL_REJECTED_CONNECTIONS,
  METRIC_KESTREL_TLS_HANDSHAKE_DURATION: () => METRIC_KESTREL_TLS_HANDSHAKE_DURATION,
  METRIC_KESTREL_UPGRADED_CONNECTIONS: () => METRIC_KESTREL_UPGRADED_CONNECTIONS,
  METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS: () => METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS,
  METRIC_SIGNALR_SERVER_CONNECTION_DURATION: () => METRIC_SIGNALR_SERVER_CONNECTION_DURATION,
  MessageTypeValues: () => MessageTypeValues,
  MessagingDestinationKindValues: () => MessagingDestinationKindValues,
  MessagingOperationValues: () => MessagingOperationValues,
  NETHOSTCONNECTIONSUBTYPEVALUES_CDMA: () => NETHOSTCONNECTIONSUBTYPEVALUES_CDMA,
  NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT: () => NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT,
  NETHOSTCONNECTIONSUBTYPEVALUES_EDGE: () => NETHOSTCONNECTIONSUBTYPEVALUES_EDGE,
  NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD: () => NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD,
  NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0: () => NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0,
  NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A: () => NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A,
  NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B: () => NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B,
  NETHOSTCONNECTIONSUBTYPEVALUES_GPRS: () => NETHOSTCONNECTIONSUBTYPEVALUES_GPRS,
  NETHOSTCONNECTIONSUBTYPEVALUES_GSM: () => NETHOSTCONNECTIONSUBTYPEVALUES_GSM,
  NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA: () => NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA,
  NETHOSTCONNECTIONSUBTYPEVALUES_HSPA: () => NETHOSTCONNECTIONSUBTYPEVALUES_HSPA,
  NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP: () => NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP,
  NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA: () => NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA,
  NETHOSTCONNECTIONSUBTYPEVALUES_IDEN: () => NETHOSTCONNECTIONSUBTYPEVALUES_IDEN,
  NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN: () => NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN,
  NETHOSTCONNECTIONSUBTYPEVALUES_LTE: () => NETHOSTCONNECTIONSUBTYPEVALUES_LTE,
  NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA: () => NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA,
  NETHOSTCONNECTIONSUBTYPEVALUES_NR: () => NETHOSTCONNECTIONSUBTYPEVALUES_NR,
  NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA: () => NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA,
  NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA: () => NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA,
  NETHOSTCONNECTIONSUBTYPEVALUES_UMTS: () => NETHOSTCONNECTIONSUBTYPEVALUES_UMTS,
  NETHOSTCONNECTIONTYPEVALUES_CELL: () => NETHOSTCONNECTIONTYPEVALUES_CELL,
  NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE: () => NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE,
  NETHOSTCONNECTIONTYPEVALUES_UNKNOWN: () => NETHOSTCONNECTIONTYPEVALUES_UNKNOWN,
  NETHOSTCONNECTIONTYPEVALUES_WIFI: () => NETHOSTCONNECTIONTYPEVALUES_WIFI,
  NETHOSTCONNECTIONTYPEVALUES_WIRED: () => NETHOSTCONNECTIONTYPEVALUES_WIRED,
  NETTRANSPORTVALUES_INPROC: () => NETTRANSPORTVALUES_INPROC,
  NETTRANSPORTVALUES_IP: () => NETTRANSPORTVALUES_IP,
  NETTRANSPORTVALUES_IP_TCP: () => NETTRANSPORTVALUES_IP_TCP,
  NETTRANSPORTVALUES_IP_UDP: () => NETTRANSPORTVALUES_IP_UDP,
  NETTRANSPORTVALUES_OTHER: () => NETTRANSPORTVALUES_OTHER,
  NETTRANSPORTVALUES_PIPE: () => NETTRANSPORTVALUES_PIPE,
  NETTRANSPORTVALUES_UNIX: () => NETTRANSPORTVALUES_UNIX,
  NETWORK_TRANSPORT_VALUE_PIPE: () => NETWORK_TRANSPORT_VALUE_PIPE,
  NETWORK_TRANSPORT_VALUE_QUIC: () => NETWORK_TRANSPORT_VALUE_QUIC,
  NETWORK_TRANSPORT_VALUE_TCP: () => NETWORK_TRANSPORT_VALUE_TCP,
  NETWORK_TRANSPORT_VALUE_UDP: () => NETWORK_TRANSPORT_VALUE_UDP,
  NETWORK_TRANSPORT_VALUE_UNIX: () => NETWORK_TRANSPORT_VALUE_UNIX,
  NETWORK_TYPE_VALUE_IPV4: () => NETWORK_TYPE_VALUE_IPV4,
  NETWORK_TYPE_VALUE_IPV6: () => NETWORK_TYPE_VALUE_IPV6,
  NetHostConnectionSubtypeValues: () => NetHostConnectionSubtypeValues,
  NetHostConnectionTypeValues: () => NetHostConnectionTypeValues,
  NetTransportValues: () => NetTransportValues,
  OSTYPEVALUES_AIX: () => OSTYPEVALUES_AIX,
  OSTYPEVALUES_DARWIN: () => OSTYPEVALUES_DARWIN,
  OSTYPEVALUES_DRAGONFLYBSD: () => OSTYPEVALUES_DRAGONFLYBSD,
  OSTYPEVALUES_FREEBSD: () => OSTYPEVALUES_FREEBSD,
  OSTYPEVALUES_HPUX: () => OSTYPEVALUES_HPUX,
  OSTYPEVALUES_LINUX: () => OSTYPEVALUES_LINUX,
  OSTYPEVALUES_NETBSD: () => OSTYPEVALUES_NETBSD,
  OSTYPEVALUES_OPENBSD: () => OSTYPEVALUES_OPENBSD,
  OSTYPEVALUES_SOLARIS: () => OSTYPEVALUES_SOLARIS,
  OSTYPEVALUES_WINDOWS: () => OSTYPEVALUES_WINDOWS,
  OSTYPEVALUES_Z_OS: () => OSTYPEVALUES_Z_OS,
  OTEL_STATUS_CODE_VALUE_ERROR: () => OTEL_STATUS_CODE_VALUE_ERROR,
  OTEL_STATUS_CODE_VALUE_OK: () => OTEL_STATUS_CODE_VALUE_OK,
  OsTypeValues: () => OsTypeValues,
  RPCGRPCSTATUSCODEVALUES_ABORTED: () => RPCGRPCSTATUSCODEVALUES_ABORTED,
  RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS: () => RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS,
  RPCGRPCSTATUSCODEVALUES_CANCELLED: () => RPCGRPCSTATUSCODEVALUES_CANCELLED,
  RPCGRPCSTATUSCODEVALUES_DATA_LOSS: () => RPCGRPCSTATUSCODEVALUES_DATA_LOSS,
  RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED: () => RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED,
  RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION: () => RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION,
  RPCGRPCSTATUSCODEVALUES_INTERNAL: () => RPCGRPCSTATUSCODEVALUES_INTERNAL,
  RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT: () => RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT,
  RPCGRPCSTATUSCODEVALUES_NOT_FOUND: () => RPCGRPCSTATUSCODEVALUES_NOT_FOUND,
  RPCGRPCSTATUSCODEVALUES_OK: () => RPCGRPCSTATUSCODEVALUES_OK,
  RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE: () => RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE,
  RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED: () => RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED,
  RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED: () => RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED,
  RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED: () => RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED,
  RPCGRPCSTATUSCODEVALUES_UNAVAILABLE: () => RPCGRPCSTATUSCODEVALUES_UNAVAILABLE,
  RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED: () => RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED,
  RPCGRPCSTATUSCODEVALUES_UNKNOWN: () => RPCGRPCSTATUSCODEVALUES_UNKNOWN,
  RpcGrpcStatusCodeValues: () => RpcGrpcStatusCodeValues,
  SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET: () => SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET,
  SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS: () => SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS,
  SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ: () => SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ,
  SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY: () => SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY,
  SEMATTRS_AWS_DYNAMODB_COUNT: () => SEMATTRS_AWS_DYNAMODB_COUNT,
  SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE: () => SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE,
  SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES: () => SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES,
  SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES: () => SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES,
  SEMATTRS_AWS_DYNAMODB_INDEX_NAME: () => SEMATTRS_AWS_DYNAMODB_INDEX_NAME,
  SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS: () => SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS,
  SEMATTRS_AWS_DYNAMODB_LIMIT: () => SEMATTRS_AWS_DYNAMODB_LIMIT,
  SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES: () => SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES,
  SEMATTRS_AWS_DYNAMODB_PROJECTION: () => SEMATTRS_AWS_DYNAMODB_PROJECTION,
  SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY: () => SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY,
  SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY: () => SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY,
  SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT: () => SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT,
  SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD: () => SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD,
  SEMATTRS_AWS_DYNAMODB_SEGMENT: () => SEMATTRS_AWS_DYNAMODB_SEGMENT,
  SEMATTRS_AWS_DYNAMODB_SELECT: () => SEMATTRS_AWS_DYNAMODB_SELECT,
  SEMATTRS_AWS_DYNAMODB_TABLE_COUNT: () => SEMATTRS_AWS_DYNAMODB_TABLE_COUNT,
  SEMATTRS_AWS_DYNAMODB_TABLE_NAMES: () => SEMATTRS_AWS_DYNAMODB_TABLE_NAMES,
  SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS: () => SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS,
  SEMATTRS_AWS_LAMBDA_INVOKED_ARN: () => SEMATTRS_AWS_LAMBDA_INVOKED_ARN,
  SEMATTRS_CODE_FILEPATH: () => SEMATTRS_CODE_FILEPATH,
  SEMATTRS_CODE_FUNCTION: () => SEMATTRS_CODE_FUNCTION,
  SEMATTRS_CODE_LINENO: () => SEMATTRS_CODE_LINENO,
  SEMATTRS_CODE_NAMESPACE: () => SEMATTRS_CODE_NAMESPACE,
  SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL: () => SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL,
  SEMATTRS_DB_CASSANDRA_COORDINATOR_DC: () => SEMATTRS_DB_CASSANDRA_COORDINATOR_DC,
  SEMATTRS_DB_CASSANDRA_COORDINATOR_ID: () => SEMATTRS_DB_CASSANDRA_COORDINATOR_ID,
  SEMATTRS_DB_CASSANDRA_IDEMPOTENCE: () => SEMATTRS_DB_CASSANDRA_IDEMPOTENCE,
  SEMATTRS_DB_CASSANDRA_KEYSPACE: () => SEMATTRS_DB_CASSANDRA_KEYSPACE,
  SEMATTRS_DB_CASSANDRA_PAGE_SIZE: () => SEMATTRS_DB_CASSANDRA_PAGE_SIZE,
  SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT: () => SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT,
  SEMATTRS_DB_CASSANDRA_TABLE: () => SEMATTRS_DB_CASSANDRA_TABLE,
  SEMATTRS_DB_CONNECTION_STRING: () => SEMATTRS_DB_CONNECTION_STRING,
  SEMATTRS_DB_HBASE_NAMESPACE: () => SEMATTRS_DB_HBASE_NAMESPACE,
  SEMATTRS_DB_JDBC_DRIVER_CLASSNAME: () => SEMATTRS_DB_JDBC_DRIVER_CLASSNAME,
  SEMATTRS_DB_MONGODB_COLLECTION: () => SEMATTRS_DB_MONGODB_COLLECTION,
  SEMATTRS_DB_MSSQL_INSTANCE_NAME: () => SEMATTRS_DB_MSSQL_INSTANCE_NAME,
  SEMATTRS_DB_NAME: () => SEMATTRS_DB_NAME,
  SEMATTRS_DB_OPERATION: () => SEMATTRS_DB_OPERATION,
  SEMATTRS_DB_REDIS_DATABASE_INDEX: () => SEMATTRS_DB_REDIS_DATABASE_INDEX,
  SEMATTRS_DB_SQL_TABLE: () => SEMATTRS_DB_SQL_TABLE,
  SEMATTRS_DB_STATEMENT: () => SEMATTRS_DB_STATEMENT,
  SEMATTRS_DB_SYSTEM: () => SEMATTRS_DB_SYSTEM,
  SEMATTRS_DB_USER: () => SEMATTRS_DB_USER,
  SEMATTRS_ENDUSER_ID: () => SEMATTRS_ENDUSER_ID,
  SEMATTRS_ENDUSER_ROLE: () => SEMATTRS_ENDUSER_ROLE,
  SEMATTRS_ENDUSER_SCOPE: () => SEMATTRS_ENDUSER_SCOPE,
  SEMATTRS_EXCEPTION_ESCAPED: () => SEMATTRS_EXCEPTION_ESCAPED,
  SEMATTRS_EXCEPTION_MESSAGE: () => SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_STACKTRACE: () => SEMATTRS_EXCEPTION_STACKTRACE,
  SEMATTRS_EXCEPTION_TYPE: () => SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_FAAS_COLDSTART: () => SEMATTRS_FAAS_COLDSTART,
  SEMATTRS_FAAS_CRON: () => SEMATTRS_FAAS_CRON,
  SEMATTRS_FAAS_DOCUMENT_COLLECTION: () => SEMATTRS_FAAS_DOCUMENT_COLLECTION,
  SEMATTRS_FAAS_DOCUMENT_NAME: () => SEMATTRS_FAAS_DOCUMENT_NAME,
  SEMATTRS_FAAS_DOCUMENT_OPERATION: () => SEMATTRS_FAAS_DOCUMENT_OPERATION,
  SEMATTRS_FAAS_DOCUMENT_TIME: () => SEMATTRS_FAAS_DOCUMENT_TIME,
  SEMATTRS_FAAS_EXECUTION: () => SEMATTRS_FAAS_EXECUTION,
  SEMATTRS_FAAS_INVOKED_NAME: () => SEMATTRS_FAAS_INVOKED_NAME,
  SEMATTRS_FAAS_INVOKED_PROVIDER: () => SEMATTRS_FAAS_INVOKED_PROVIDER,
  SEMATTRS_FAAS_INVOKED_REGION: () => SEMATTRS_FAAS_INVOKED_REGION,
  SEMATTRS_FAAS_TIME: () => SEMATTRS_FAAS_TIME,
  SEMATTRS_FAAS_TRIGGER: () => SEMATTRS_FAAS_TRIGGER,
  SEMATTRS_HTTP_CLIENT_IP: () => SEMATTRS_HTTP_CLIENT_IP,
  SEMATTRS_HTTP_FLAVOR: () => SEMATTRS_HTTP_FLAVOR,
  SEMATTRS_HTTP_HOST: () => SEMATTRS_HTTP_HOST,
  SEMATTRS_HTTP_METHOD: () => SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH: () => SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH,
  SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED: () => SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED,
  SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH: () => SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH,
  SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED: () => SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED,
  SEMATTRS_HTTP_ROUTE: () => SEMATTRS_HTTP_ROUTE,
  SEMATTRS_HTTP_SCHEME: () => SEMATTRS_HTTP_SCHEME,
  SEMATTRS_HTTP_SERVER_NAME: () => SEMATTRS_HTTP_SERVER_NAME,
  SEMATTRS_HTTP_STATUS_CODE: () => SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_HTTP_TARGET: () => SEMATTRS_HTTP_TARGET,
  SEMATTRS_HTTP_URL: () => SEMATTRS_HTTP_URL,
  SEMATTRS_HTTP_USER_AGENT: () => SEMATTRS_HTTP_USER_AGENT,
  SEMATTRS_MESSAGE_COMPRESSED_SIZE: () => SEMATTRS_MESSAGE_COMPRESSED_SIZE,
  SEMATTRS_MESSAGE_ID: () => SEMATTRS_MESSAGE_ID,
  SEMATTRS_MESSAGE_TYPE: () => SEMATTRS_MESSAGE_TYPE,
  SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE: () => SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE,
  SEMATTRS_MESSAGING_CONSUMER_ID: () => SEMATTRS_MESSAGING_CONSUMER_ID,
  SEMATTRS_MESSAGING_CONVERSATION_ID: () => SEMATTRS_MESSAGING_CONVERSATION_ID,
  SEMATTRS_MESSAGING_DESTINATION: () => SEMATTRS_MESSAGING_DESTINATION,
  SEMATTRS_MESSAGING_DESTINATION_KIND: () => SEMATTRS_MESSAGING_DESTINATION_KIND,
  SEMATTRS_MESSAGING_KAFKA_CLIENT_ID: () => SEMATTRS_MESSAGING_KAFKA_CLIENT_ID,
  SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP: () => SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP,
  SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY: () => SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY,
  SEMATTRS_MESSAGING_KAFKA_PARTITION: () => SEMATTRS_MESSAGING_KAFKA_PARTITION,
  SEMATTRS_MESSAGING_KAFKA_TOMBSTONE: () => SEMATTRS_MESSAGING_KAFKA_TOMBSTONE,
  SEMATTRS_MESSAGING_MESSAGE_ID: () => SEMATTRS_MESSAGING_MESSAGE_ID,
  SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES: () => SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES,
  SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES: () => SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES,
  SEMATTRS_MESSAGING_OPERATION: () => SEMATTRS_MESSAGING_OPERATION,
  SEMATTRS_MESSAGING_PROTOCOL: () => SEMATTRS_MESSAGING_PROTOCOL,
  SEMATTRS_MESSAGING_PROTOCOL_VERSION: () => SEMATTRS_MESSAGING_PROTOCOL_VERSION,
  SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY: () => SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY,
  SEMATTRS_MESSAGING_SYSTEM: () => SEMATTRS_MESSAGING_SYSTEM,
  SEMATTRS_MESSAGING_TEMP_DESTINATION: () => SEMATTRS_MESSAGING_TEMP_DESTINATION,
  SEMATTRS_MESSAGING_URL: () => SEMATTRS_MESSAGING_URL,
  SEMATTRS_NET_HOST_CARRIER_ICC: () => SEMATTRS_NET_HOST_CARRIER_ICC,
  SEMATTRS_NET_HOST_CARRIER_MCC: () => SEMATTRS_NET_HOST_CARRIER_MCC,
  SEMATTRS_NET_HOST_CARRIER_MNC: () => SEMATTRS_NET_HOST_CARRIER_MNC,
  SEMATTRS_NET_HOST_CARRIER_NAME: () => SEMATTRS_NET_HOST_CARRIER_NAME,
  SEMATTRS_NET_HOST_CONNECTION_SUBTYPE: () => SEMATTRS_NET_HOST_CONNECTION_SUBTYPE,
  SEMATTRS_NET_HOST_CONNECTION_TYPE: () => SEMATTRS_NET_HOST_CONNECTION_TYPE,
  SEMATTRS_NET_HOST_IP: () => SEMATTRS_NET_HOST_IP,
  SEMATTRS_NET_HOST_NAME: () => SEMATTRS_NET_HOST_NAME,
  SEMATTRS_NET_HOST_PORT: () => SEMATTRS_NET_HOST_PORT,
  SEMATTRS_NET_PEER_IP: () => SEMATTRS_NET_PEER_IP,
  SEMATTRS_NET_PEER_NAME: () => SEMATTRS_NET_PEER_NAME,
  SEMATTRS_NET_PEER_PORT: () => SEMATTRS_NET_PEER_PORT,
  SEMATTRS_NET_TRANSPORT: () => SEMATTRS_NET_TRANSPORT,
  SEMATTRS_PEER_SERVICE: () => SEMATTRS_PEER_SERVICE,
  SEMATTRS_RPC_GRPC_STATUS_CODE: () => SEMATTRS_RPC_GRPC_STATUS_CODE,
  SEMATTRS_RPC_JSONRPC_ERROR_CODE: () => SEMATTRS_RPC_JSONRPC_ERROR_CODE,
  SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE: () => SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE,
  SEMATTRS_RPC_JSONRPC_REQUEST_ID: () => SEMATTRS_RPC_JSONRPC_REQUEST_ID,
  SEMATTRS_RPC_JSONRPC_VERSION: () => SEMATTRS_RPC_JSONRPC_VERSION,
  SEMATTRS_RPC_METHOD: () => SEMATTRS_RPC_METHOD,
  SEMATTRS_RPC_SERVICE: () => SEMATTRS_RPC_SERVICE,
  SEMATTRS_RPC_SYSTEM: () => SEMATTRS_RPC_SYSTEM,
  SEMATTRS_THREAD_ID: () => SEMATTRS_THREAD_ID,
  SEMATTRS_THREAD_NAME: () => SEMATTRS_THREAD_NAME,
  SEMRESATTRS_AWS_ECS_CLUSTER_ARN: () => SEMRESATTRS_AWS_ECS_CLUSTER_ARN,
  SEMRESATTRS_AWS_ECS_CONTAINER_ARN: () => SEMRESATTRS_AWS_ECS_CONTAINER_ARN,
  SEMRESATTRS_AWS_ECS_LAUNCHTYPE: () => SEMRESATTRS_AWS_ECS_LAUNCHTYPE,
  SEMRESATTRS_AWS_ECS_TASK_ARN: () => SEMRESATTRS_AWS_ECS_TASK_ARN,
  SEMRESATTRS_AWS_ECS_TASK_FAMILY: () => SEMRESATTRS_AWS_ECS_TASK_FAMILY,
  SEMRESATTRS_AWS_ECS_TASK_REVISION: () => SEMRESATTRS_AWS_ECS_TASK_REVISION,
  SEMRESATTRS_AWS_EKS_CLUSTER_ARN: () => SEMRESATTRS_AWS_EKS_CLUSTER_ARN,
  SEMRESATTRS_AWS_LOG_GROUP_ARNS: () => SEMRESATTRS_AWS_LOG_GROUP_ARNS,
  SEMRESATTRS_AWS_LOG_GROUP_NAMES: () => SEMRESATTRS_AWS_LOG_GROUP_NAMES,
  SEMRESATTRS_AWS_LOG_STREAM_ARNS: () => SEMRESATTRS_AWS_LOG_STREAM_ARNS,
  SEMRESATTRS_AWS_LOG_STREAM_NAMES: () => SEMRESATTRS_AWS_LOG_STREAM_NAMES,
  SEMRESATTRS_CLOUD_ACCOUNT_ID: () => SEMRESATTRS_CLOUD_ACCOUNT_ID,
  SEMRESATTRS_CLOUD_AVAILABILITY_ZONE: () => SEMRESATTRS_CLOUD_AVAILABILITY_ZONE,
  SEMRESATTRS_CLOUD_PLATFORM: () => SEMRESATTRS_CLOUD_PLATFORM,
  SEMRESATTRS_CLOUD_PROVIDER: () => SEMRESATTRS_CLOUD_PROVIDER,
  SEMRESATTRS_CLOUD_REGION: () => SEMRESATTRS_CLOUD_REGION,
  SEMRESATTRS_CONTAINER_ID: () => SEMRESATTRS_CONTAINER_ID,
  SEMRESATTRS_CONTAINER_IMAGE_NAME: () => SEMRESATTRS_CONTAINER_IMAGE_NAME,
  SEMRESATTRS_CONTAINER_IMAGE_TAG: () => SEMRESATTRS_CONTAINER_IMAGE_TAG,
  SEMRESATTRS_CONTAINER_NAME: () => SEMRESATTRS_CONTAINER_NAME,
  SEMRESATTRS_CONTAINER_RUNTIME: () => SEMRESATTRS_CONTAINER_RUNTIME,
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT: () => SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
  SEMRESATTRS_DEVICE_ID: () => SEMRESATTRS_DEVICE_ID,
  SEMRESATTRS_DEVICE_MODEL_IDENTIFIER: () => SEMRESATTRS_DEVICE_MODEL_IDENTIFIER,
  SEMRESATTRS_DEVICE_MODEL_NAME: () => SEMRESATTRS_DEVICE_MODEL_NAME,
  SEMRESATTRS_FAAS_ID: () => SEMRESATTRS_FAAS_ID,
  SEMRESATTRS_FAAS_INSTANCE: () => SEMRESATTRS_FAAS_INSTANCE,
  SEMRESATTRS_FAAS_MAX_MEMORY: () => SEMRESATTRS_FAAS_MAX_MEMORY,
  SEMRESATTRS_FAAS_NAME: () => SEMRESATTRS_FAAS_NAME,
  SEMRESATTRS_FAAS_VERSION: () => SEMRESATTRS_FAAS_VERSION,
  SEMRESATTRS_HOST_ARCH: () => SEMRESATTRS_HOST_ARCH,
  SEMRESATTRS_HOST_ID: () => SEMRESATTRS_HOST_ID,
  SEMRESATTRS_HOST_IMAGE_ID: () => SEMRESATTRS_HOST_IMAGE_ID,
  SEMRESATTRS_HOST_IMAGE_NAME: () => SEMRESATTRS_HOST_IMAGE_NAME,
  SEMRESATTRS_HOST_IMAGE_VERSION: () => SEMRESATTRS_HOST_IMAGE_VERSION,
  SEMRESATTRS_HOST_NAME: () => SEMRESATTRS_HOST_NAME,
  SEMRESATTRS_HOST_TYPE: () => SEMRESATTRS_HOST_TYPE,
  SEMRESATTRS_K8S_CLUSTER_NAME: () => SEMRESATTRS_K8S_CLUSTER_NAME,
  SEMRESATTRS_K8S_CONTAINER_NAME: () => SEMRESATTRS_K8S_CONTAINER_NAME,
  SEMRESATTRS_K8S_CRONJOB_NAME: () => SEMRESATTRS_K8S_CRONJOB_NAME,
  SEMRESATTRS_K8S_CRONJOB_UID: () => SEMRESATTRS_K8S_CRONJOB_UID,
  SEMRESATTRS_K8S_DAEMONSET_NAME: () => SEMRESATTRS_K8S_DAEMONSET_NAME,
  SEMRESATTRS_K8S_DAEMONSET_UID: () => SEMRESATTRS_K8S_DAEMONSET_UID,
  SEMRESATTRS_K8S_DEPLOYMENT_NAME: () => SEMRESATTRS_K8S_DEPLOYMENT_NAME,
  SEMRESATTRS_K8S_DEPLOYMENT_UID: () => SEMRESATTRS_K8S_DEPLOYMENT_UID,
  SEMRESATTRS_K8S_JOB_NAME: () => SEMRESATTRS_K8S_JOB_NAME,
  SEMRESATTRS_K8S_JOB_UID: () => SEMRESATTRS_K8S_JOB_UID,
  SEMRESATTRS_K8S_NAMESPACE_NAME: () => SEMRESATTRS_K8S_NAMESPACE_NAME,
  SEMRESATTRS_K8S_NODE_NAME: () => SEMRESATTRS_K8S_NODE_NAME,
  SEMRESATTRS_K8S_NODE_UID: () => SEMRESATTRS_K8S_NODE_UID,
  SEMRESATTRS_K8S_POD_NAME: () => SEMRESATTRS_K8S_POD_NAME,
  SEMRESATTRS_K8S_POD_UID: () => SEMRESATTRS_K8S_POD_UID,
  SEMRESATTRS_K8S_REPLICASET_NAME: () => SEMRESATTRS_K8S_REPLICASET_NAME,
  SEMRESATTRS_K8S_REPLICASET_UID: () => SEMRESATTRS_K8S_REPLICASET_UID,
  SEMRESATTRS_K8S_STATEFULSET_NAME: () => SEMRESATTRS_K8S_STATEFULSET_NAME,
  SEMRESATTRS_K8S_STATEFULSET_UID: () => SEMRESATTRS_K8S_STATEFULSET_UID,
  SEMRESATTRS_OS_DESCRIPTION: () => SEMRESATTRS_OS_DESCRIPTION,
  SEMRESATTRS_OS_NAME: () => SEMRESATTRS_OS_NAME,
  SEMRESATTRS_OS_TYPE: () => SEMRESATTRS_OS_TYPE,
  SEMRESATTRS_OS_VERSION: () => SEMRESATTRS_OS_VERSION,
  SEMRESATTRS_PROCESS_COMMAND: () => SEMRESATTRS_PROCESS_COMMAND,
  SEMRESATTRS_PROCESS_COMMAND_ARGS: () => SEMRESATTRS_PROCESS_COMMAND_ARGS,
  SEMRESATTRS_PROCESS_COMMAND_LINE: () => SEMRESATTRS_PROCESS_COMMAND_LINE,
  SEMRESATTRS_PROCESS_EXECUTABLE_NAME: () => SEMRESATTRS_PROCESS_EXECUTABLE_NAME,
  SEMRESATTRS_PROCESS_EXECUTABLE_PATH: () => SEMRESATTRS_PROCESS_EXECUTABLE_PATH,
  SEMRESATTRS_PROCESS_OWNER: () => SEMRESATTRS_PROCESS_OWNER,
  SEMRESATTRS_PROCESS_PID: () => SEMRESATTRS_PROCESS_PID,
  SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION: () => SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION,
  SEMRESATTRS_PROCESS_RUNTIME_NAME: () => SEMRESATTRS_PROCESS_RUNTIME_NAME,
  SEMRESATTRS_PROCESS_RUNTIME_VERSION: () => SEMRESATTRS_PROCESS_RUNTIME_VERSION,
  SEMRESATTRS_SERVICE_INSTANCE_ID: () => SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME: () => SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE: () => SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_SERVICE_VERSION: () => SEMRESATTRS_SERVICE_VERSION,
  SEMRESATTRS_TELEMETRY_AUTO_VERSION: () => SEMRESATTRS_TELEMETRY_AUTO_VERSION,
  SEMRESATTRS_TELEMETRY_SDK_LANGUAGE: () => SEMRESATTRS_TELEMETRY_SDK_LANGUAGE,
  SEMRESATTRS_TELEMETRY_SDK_NAME: () => SEMRESATTRS_TELEMETRY_SDK_NAME,
  SEMRESATTRS_TELEMETRY_SDK_VERSION: () => SEMRESATTRS_TELEMETRY_SDK_VERSION,
  SEMRESATTRS_WEBENGINE_DESCRIPTION: () => SEMRESATTRS_WEBENGINE_DESCRIPTION,
  SEMRESATTRS_WEBENGINE_NAME: () => SEMRESATTRS_WEBENGINE_NAME,
  SEMRESATTRS_WEBENGINE_VERSION: () => SEMRESATTRS_WEBENGINE_VERSION,
  SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN: () => SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN,
  SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE: () => SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE,
  SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT: () => SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT,
  SIGNALR_TRANSPORT_VALUE_LONG_POLLING: () => SIGNALR_TRANSPORT_VALUE_LONG_POLLING,
  SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS: () => SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS,
  SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS: () => SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS,
  SemanticAttributes: () => SemanticAttributes,
  SemanticResourceAttributes: () => SemanticResourceAttributes,
  TELEMETRYSDKLANGUAGEVALUES_CPP: () => TELEMETRYSDKLANGUAGEVALUES_CPP,
  TELEMETRYSDKLANGUAGEVALUES_DOTNET: () => TELEMETRYSDKLANGUAGEVALUES_DOTNET,
  TELEMETRYSDKLANGUAGEVALUES_ERLANG: () => TELEMETRYSDKLANGUAGEVALUES_ERLANG,
  TELEMETRYSDKLANGUAGEVALUES_GO: () => TELEMETRYSDKLANGUAGEVALUES_GO,
  TELEMETRYSDKLANGUAGEVALUES_JAVA: () => TELEMETRYSDKLANGUAGEVALUES_JAVA,
  TELEMETRYSDKLANGUAGEVALUES_NODEJS: () => TELEMETRYSDKLANGUAGEVALUES_NODEJS,
  TELEMETRYSDKLANGUAGEVALUES_PHP: () => TELEMETRYSDKLANGUAGEVALUES_PHP,
  TELEMETRYSDKLANGUAGEVALUES_PYTHON: () => TELEMETRYSDKLANGUAGEVALUES_PYTHON,
  TELEMETRYSDKLANGUAGEVALUES_RUBY: () => TELEMETRYSDKLANGUAGEVALUES_RUBY,
  TELEMETRYSDKLANGUAGEVALUES_WEBJS: () => TELEMETRYSDKLANGUAGEVALUES_WEBJS,
  TELEMETRY_SDK_LANGUAGE_VALUE_CPP: () => TELEMETRY_SDK_LANGUAGE_VALUE_CPP,
  TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET: () => TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET,
  TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG: () => TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG,
  TELEMETRY_SDK_LANGUAGE_VALUE_GO: () => TELEMETRY_SDK_LANGUAGE_VALUE_GO,
  TELEMETRY_SDK_LANGUAGE_VALUE_JAVA: () => TELEMETRY_SDK_LANGUAGE_VALUE_JAVA,
  TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS: () => TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS,
  TELEMETRY_SDK_LANGUAGE_VALUE_PHP: () => TELEMETRY_SDK_LANGUAGE_VALUE_PHP,
  TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON: () => TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON,
  TELEMETRY_SDK_LANGUAGE_VALUE_RUBY: () => TELEMETRY_SDK_LANGUAGE_VALUE_RUBY,
  TELEMETRY_SDK_LANGUAGE_VALUE_RUST: () => TELEMETRY_SDK_LANGUAGE_VALUE_RUST,
  TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT: () => TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT,
  TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS: () => TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS,
  TelemetrySdkLanguageValues: () => TelemetrySdkLanguageValues
});
var init_esm2 = __esm({
  "node_modules/.pnpm/@opentelemetry+semantic-conventions@1.39.0/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js"() {
    init_trace2();
    init_resource();
    init_stable_attributes();
    init_stable_metrics();
    init_stable_events();
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/semconv.js
var require_semconv = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/semconv.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ATTR_PROCESS_RUNTIME_NAME = void 0;
    exports.ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js
var require_sdk_info = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SDK_INFO = void 0;
    var version_1 = require_version();
    var semantic_conventions_1 = (init_esm2(), __toCommonJS(esm_exports2));
    var semconv_1 = require_semconv();
    exports.SDK_INFO = {
      [semantic_conventions_1.ATTR_TELEMETRY_SDK_NAME]: "opentelemetry",
      [semconv_1.ATTR_PROCESS_RUNTIME_NAME]: "node",
      [semantic_conventions_1.ATTR_TELEMETRY_SDK_LANGUAGE]: semantic_conventions_1.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS,
      [semantic_conventions_1.ATTR_TELEMETRY_SDK_VERSION]: version_1.VERSION
    };
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/platform/node/index.js
var require_node4 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/platform/node/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.otperformance = exports.SDK_INFO = exports._globalThis = exports.getStringListFromEnv = exports.getNumberFromEnv = exports.getBooleanFromEnv = exports.getStringFromEnv = void 0;
    var environment_1 = require_environment();
    Object.defineProperty(exports, "getStringFromEnv", { enumerable: true, get: function() {
      return environment_1.getStringFromEnv;
    } });
    Object.defineProperty(exports, "getBooleanFromEnv", { enumerable: true, get: function() {
      return environment_1.getBooleanFromEnv;
    } });
    Object.defineProperty(exports, "getNumberFromEnv", { enumerable: true, get: function() {
      return environment_1.getNumberFromEnv;
    } });
    Object.defineProperty(exports, "getStringListFromEnv", { enumerable: true, get: function() {
      return environment_1.getStringListFromEnv;
    } });
    var globalThis_1 = require_globalThis2();
    Object.defineProperty(exports, "_globalThis", { enumerable: true, get: function() {
      return globalThis_1._globalThis;
    } });
    var sdk_info_1 = require_sdk_info();
    Object.defineProperty(exports, "SDK_INFO", { enumerable: true, get: function() {
      return sdk_info_1.SDK_INFO;
    } });
    exports.otperformance = performance;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/platform/index.js
var require_platform3 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/platform/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getStringListFromEnv = exports.getNumberFromEnv = exports.getStringFromEnv = exports.getBooleanFromEnv = exports.otperformance = exports._globalThis = exports.SDK_INFO = void 0;
    var node_1 = require_node4();
    Object.defineProperty(exports, "SDK_INFO", { enumerable: true, get: function() {
      return node_1.SDK_INFO;
    } });
    Object.defineProperty(exports, "_globalThis", { enumerable: true, get: function() {
      return node_1._globalThis;
    } });
    Object.defineProperty(exports, "otperformance", { enumerable: true, get: function() {
      return node_1.otperformance;
    } });
    Object.defineProperty(exports, "getBooleanFromEnv", { enumerable: true, get: function() {
      return node_1.getBooleanFromEnv;
    } });
    Object.defineProperty(exports, "getStringFromEnv", { enumerable: true, get: function() {
      return node_1.getStringFromEnv;
    } });
    Object.defineProperty(exports, "getNumberFromEnv", { enumerable: true, get: function() {
      return node_1.getNumberFromEnv;
    } });
    Object.defineProperty(exports, "getStringListFromEnv", { enumerable: true, get: function() {
      return node_1.getStringListFromEnv;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/time.js
var require_time = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addHrTimes = exports.isTimeInput = exports.isTimeInputHrTime = exports.hrTimeToMicroseconds = exports.hrTimeToMilliseconds = exports.hrTimeToNanoseconds = exports.hrTimeToTimeStamp = exports.hrTimeDuration = exports.timeInputToHrTime = exports.hrTime = exports.getTimeOrigin = exports.millisToHrTime = void 0;
    var platform_1 = require_platform3();
    var NANOSECOND_DIGITS = 9;
    var NANOSECOND_DIGITS_IN_MILLIS = 6;
    var MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
    var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
    function millisToHrTime(epochMillis) {
      const epochSeconds = epochMillis / 1e3;
      const seconds = Math.trunc(epochSeconds);
      const nanos = Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS);
      return [seconds, nanos];
    }
    exports.millisToHrTime = millisToHrTime;
    function getTimeOrigin() {
      return platform_1.otperformance.timeOrigin;
    }
    exports.getTimeOrigin = getTimeOrigin;
    function hrTime(performanceNow) {
      const timeOrigin = millisToHrTime(platform_1.otperformance.timeOrigin);
      const now = millisToHrTime(typeof performanceNow === "number" ? performanceNow : platform_1.otperformance.now());
      return addHrTimes(timeOrigin, now);
    }
    exports.hrTime = hrTime;
    function timeInputToHrTime(time) {
      if (isTimeInputHrTime(time)) {
        return time;
      } else if (typeof time === "number") {
        if (time < platform_1.otperformance.timeOrigin) {
          return hrTime(time);
        } else {
          return millisToHrTime(time);
        }
      } else if (time instanceof Date) {
        return millisToHrTime(time.getTime());
      } else {
        throw TypeError("Invalid input type");
      }
    }
    exports.timeInputToHrTime = timeInputToHrTime;
    function hrTimeDuration(startTime, endTime) {
      let seconds = endTime[0] - startTime[0];
      let nanos = endTime[1] - startTime[1];
      if (nanos < 0) {
        seconds -= 1;
        nanos += SECOND_TO_NANOSECONDS;
      }
      return [seconds, nanos];
    }
    exports.hrTimeDuration = hrTimeDuration;
    function hrTimeToTimeStamp(time) {
      const precision = NANOSECOND_DIGITS;
      const tmp = `${"0".repeat(precision)}${time[1]}Z`;
      const nanoString = tmp.substring(tmp.length - precision - 1);
      const date = new Date(time[0] * 1e3).toISOString();
      return date.replace("000Z", nanoString);
    }
    exports.hrTimeToTimeStamp = hrTimeToTimeStamp;
    function hrTimeToNanoseconds(time) {
      return time[0] * SECOND_TO_NANOSECONDS + time[1];
    }
    exports.hrTimeToNanoseconds = hrTimeToNanoseconds;
    function hrTimeToMilliseconds(time) {
      return time[0] * 1e3 + time[1] / 1e6;
    }
    exports.hrTimeToMilliseconds = hrTimeToMilliseconds;
    function hrTimeToMicroseconds(time) {
      return time[0] * 1e6 + time[1] / 1e3;
    }
    exports.hrTimeToMicroseconds = hrTimeToMicroseconds;
    function isTimeInputHrTime(value) {
      return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
    }
    exports.isTimeInputHrTime = isTimeInputHrTime;
    function isTimeInput(value) {
      return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
    }
    exports.isTimeInput = isTimeInput;
    function addHrTimes(time1, time2) {
      const out = [time1[0] + time2[0], time1[1] + time2[1]];
      if (out[1] >= SECOND_TO_NANOSECONDS) {
        out[1] -= SECOND_TO_NANOSECONDS;
        out[0] += 1;
      }
      return out;
    }
    exports.addHrTimes = addHrTimes;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/timer-util.js
var require_timer_util = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/common/timer-util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unrefTimer = void 0;
    function unrefTimer(timer) {
      if (typeof timer !== "number") {
        timer.unref();
      }
    }
    exports.unrefTimer = unrefTimer;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/ExportResult.js
var require_ExportResult = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/ExportResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExportResultCode = void 0;
    var ExportResultCode;
    (function(ExportResultCode2) {
      ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
      ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
    })(ExportResultCode = exports.ExportResultCode || (exports.ExportResultCode = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/propagation/composite.js
var require_composite = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/propagation/composite.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompositePropagator = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var CompositePropagator = class {
      _propagators;
      _fields;
      /**
       * Construct a composite propagator from a list of propagators.
       *
       * @param [config] Configuration object for composite propagator
       */
      constructor(config = {}) {
        this._propagators = config.propagators ?? [];
        this._fields = Array.from(new Set(this._propagators.map((p) => typeof p.fields === "function" ? p.fields() : []).reduce((x, y) => x.concat(y), [])));
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same carrier key, the propagator later in the list
       * will "win".
       *
       * @param context Context to inject
       * @param carrier Carrier into which context will be injected
       */
      inject(context2, carrier, setter) {
        for (const propagator of this._propagators) {
          try {
            propagator.inject(context2, carrier, setter);
          } catch (err) {
            api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
          }
        }
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same context key, the propagator later in the list
       * will "win".
       *
       * @param context Context to add values to
       * @param carrier Carrier from which to extract context
       */
      extract(context2, carrier, getter) {
        return this._propagators.reduce((ctx, propagator) => {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            api_1.diag.warn(`Failed to extract with ${propagator.constructor.name}. Err: ${err.message}`);
          }
          return ctx;
        }, context2);
      }
      fields() {
        return this._fields.slice();
      }
    };
    exports.CompositePropagator = CompositePropagator;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/internal/validators.js
var require_validators = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/internal/validators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateValue = exports.validateKey = void 0;
    var VALID_KEY_CHAR_RANGE2 = "[_0-9a-z-*/]";
    var VALID_KEY2 = `[a-z]${VALID_KEY_CHAR_RANGE2}{0,255}`;
    var VALID_VENDOR_KEY2 = `[a-z0-9]${VALID_KEY_CHAR_RANGE2}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE2}{0,13}`;
    var VALID_KEY_REGEX2 = new RegExp(`^(?:${VALID_KEY2}|${VALID_VENDOR_KEY2})$`);
    var VALID_VALUE_BASE_REGEX2 = /^[ -~]{0,255}[!-~]$/;
    var INVALID_VALUE_COMMA_EQUAL_REGEX2 = /,|=/;
    function validateKey2(key) {
      return VALID_KEY_REGEX2.test(key);
    }
    exports.validateKey = validateKey2;
    function validateValue2(value) {
      return VALID_VALUE_BASE_REGEX2.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX2.test(value);
    }
    exports.validateValue = validateValue2;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/trace/TraceState.js
var require_TraceState = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/trace/TraceState.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceState = void 0;
    var validators_1 = require_validators();
    var MAX_TRACE_STATE_ITEMS2 = 32;
    var MAX_TRACE_STATE_LEN2 = 512;
    var LIST_MEMBERS_SEPARATOR2 = ",";
    var LIST_MEMBER_KEY_VALUE_SPLITTER2 = "=";
    var TraceState2 = class _TraceState {
      _internalState = /* @__PURE__ */ new Map();
      constructor(rawTraceState) {
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return this._keys().reduce((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER2 + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR2);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN2)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR2).reverse().reduce((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER2);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if ((0, validators_1.validateKey)(key) && (0, validators_1.validateValue)(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS2) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS2));
        }
      }
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new _TraceState();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
    exports.TraceState = TraceState2;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js
var require_W3CTraceContextPropagator = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.W3CTraceContextPropagator = exports.parseTraceParent = exports.TRACE_STATE_HEADER = exports.TRACE_PARENT_HEADER = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var suppress_tracing_1 = require_suppress_tracing();
    var TraceState_1 = require_TraceState();
    exports.TRACE_PARENT_HEADER = "traceparent";
    exports.TRACE_STATE_HEADER = "tracestate";
    var VERSION2 = "00";
    var VERSION_PART = "(?!ff)[\\da-f]{2}";
    var TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
    var PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
    var FLAGS_PART = "[\\da-f]{2}";
    var TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
    function parseTraceParent(traceParent) {
      const match = TRACE_PARENT_REGEX.exec(traceParent);
      if (!match)
        return null;
      if (match[1] === "00" && match[5])
        return null;
      return {
        traceId: match[2],
        spanId: match[3],
        traceFlags: parseInt(match[4], 16)
      };
    }
    exports.parseTraceParent = parseTraceParent;
    var W3CTraceContextPropagator = class {
      inject(context2, carrier, setter) {
        const spanContext = api_1.trace.getSpanContext(context2);
        if (!spanContext || (0, suppress_tracing_1.isTracingSuppressed)(context2) || !(0, api_1.isSpanContextValid)(spanContext))
          return;
        const traceParent = `${VERSION2}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || api_1.TraceFlags.NONE).toString(16)}`;
        setter.set(carrier, exports.TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, exports.TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      }
      extract(context2, carrier, getter) {
        const traceParentHeader = getter.get(carrier, exports.TRACE_PARENT_HEADER);
        if (!traceParentHeader)
          return context2;
        const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string")
          return context2;
        const spanContext = parseTraceParent(traceParent);
        if (!spanContext)
          return context2;
        spanContext.isRemote = true;
        const traceStateHeader = getter.get(carrier, exports.TRACE_STATE_HEADER);
        if (traceStateHeader) {
          const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState_1.TraceState(typeof state === "string" ? state : void 0);
        }
        return api_1.trace.setSpanContext(context2, spanContext);
      }
      fields() {
        return [exports.TRACE_PARENT_HEADER, exports.TRACE_STATE_HEADER];
      }
    };
    exports.W3CTraceContextPropagator = W3CTraceContextPropagator;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js
var require_rpc_metadata = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRPCMetadata = exports.deleteRPCMetadata = exports.setRPCMetadata = exports.RPCType = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var RPC_METADATA_KEY = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA");
    var RPCType;
    (function(RPCType2) {
      RPCType2["HTTP"] = "http";
    })(RPCType = exports.RPCType || (exports.RPCType = {}));
    function setRPCMetadata(context2, meta) {
      return context2.setValue(RPC_METADATA_KEY, meta);
    }
    exports.setRPCMetadata = setRPCMetadata;
    function deleteRPCMetadata(context2) {
      return context2.deleteValue(RPC_METADATA_KEY);
    }
    exports.deleteRPCMetadata = deleteRPCMetadata;
    function getRPCMetadata(context2) {
      return context2.getValue(RPC_METADATA_KEY);
    }
    exports.getRPCMetadata = getRPCMetadata;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js
var require_lodash_merge = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPlainObject = void 0;
    var objectTag = "[object Object]";
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    var objectCtorString = funcToString.call(Object);
    var getPrototypeOf = Object.getPrototypeOf;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    var nativeObjectToString = objectProto.toString;
    function isPlainObject2(value) {
      if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
        return false;
      }
      const proto = getPrototypeOf(value);
      if (proto === null) {
        return true;
      }
      const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
    }
    exports.isPlainObject = isPlainObject2;
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString2(value);
    }
    function getRawTag(value) {
      const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      let unmasked = false;
      try {
        value[symToStringTag] = void 0;
        unmasked = true;
      } catch {
      }
      const result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    function objectToString2(value) {
      return nativeObjectToString.call(value);
    }
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/merge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.merge = void 0;
    var lodash_merge_1 = require_lodash_merge();
    var MAX_LEVEL = 20;
    function merge2(...args) {
      let result = args.shift();
      const objects = /* @__PURE__ */ new WeakMap();
      while (args.length > 0) {
        result = mergeTwoObjects(result, args.shift(), 0, objects);
      }
      return result;
    }
    exports.merge = merge2;
    function takeValue(value) {
      if (isArray(value)) {
        return value.slice();
      }
      return value;
    }
    function mergeTwoObjects(one, two, level = 0, objects) {
      let result;
      if (level > MAX_LEVEL) {
        return void 0;
      }
      level++;
      if (isPrimitive2(one) || isPrimitive2(two) || isFunction(two)) {
        result = takeValue(two);
      } else if (isArray(one)) {
        result = one.slice();
        if (isArray(two)) {
          for (let i = 0, j = two.length; i < j; i++) {
            result.push(takeValue(two[i]));
          }
        } else if (isObject(two)) {
          const keys = Object.keys(two);
          for (let i = 0, j = keys.length; i < j; i++) {
            const key = keys[i];
            result[key] = takeValue(two[key]);
          }
        }
      } else if (isObject(one)) {
        if (isObject(two)) {
          if (!shouldMerge(one, two)) {
            return two;
          }
          result = Object.assign({}, one);
          const keys = Object.keys(two);
          for (let i = 0, j = keys.length; i < j; i++) {
            const key = keys[i];
            const twoValue = two[key];
            if (isPrimitive2(twoValue)) {
              if (typeof twoValue === "undefined") {
                delete result[key];
              } else {
                result[key] = twoValue;
              }
            } else {
              const obj1 = result[key];
              const obj2 = twoValue;
              if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
                delete result[key];
              } else {
                if (isObject(obj1) && isObject(obj2)) {
                  const arr1 = objects.get(obj1) || [];
                  const arr2 = objects.get(obj2) || [];
                  arr1.push({ obj: one, key });
                  arr2.push({ obj: two, key });
                  objects.set(obj1, arr1);
                  objects.set(obj2, arr2);
                }
                result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
              }
            }
          }
        } else {
          result = two;
        }
      }
      return result;
    }
    function wasObjectReferenced(obj, key, objects) {
      const arr = objects.get(obj[key]) || [];
      for (let i = 0, j = arr.length; i < j; i++) {
        const info2 = arr[i];
        if (info2.key === key && info2.obj === obj) {
          return true;
        }
      }
      return false;
    }
    function isArray(value) {
      return Array.isArray(value);
    }
    function isFunction(value) {
      return typeof value === "function";
    }
    function isObject(value) {
      return !isPrimitive2(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
    }
    function isPrimitive2(value) {
      return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
    }
    function shouldMerge(one, two) {
      if (!(0, lodash_merge_1.isPlainObject)(one) || !(0, lodash_merge_1.isPlainObject)(two)) {
        return false;
      }
      return true;
    }
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/timeout.js
var require_timeout = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/timeout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callWithTimeout = exports.TimeoutError = void 0;
    var TimeoutError = class _TimeoutError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _TimeoutError.prototype);
      }
    };
    exports.TimeoutError = TimeoutError;
    function callWithTimeout(promise, timeout) {
      let timeoutHandle;
      const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
        timeoutHandle = setTimeout(function timeoutHandler() {
          reject(new TimeoutError("Operation timed out."));
        }, timeout);
      });
      return Promise.race([promise, timeoutPromise]).then((result) => {
        clearTimeout(timeoutHandle);
        return result;
      }, (reason) => {
        clearTimeout(timeoutHandle);
        throw reason;
      });
    }
    exports.callWithTimeout = callWithTimeout;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/url.js
var require_url = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isUrlIgnored = exports.urlMatches = void 0;
    function urlMatches(url, urlToMatch) {
      if (typeof urlToMatch === "string") {
        return url === urlToMatch;
      } else {
        return !!url.match(urlToMatch);
      }
    }
    exports.urlMatches = urlMatches;
    function isUrlIgnored(url, ignoredUrls) {
      if (!ignoredUrls) {
        return false;
      }
      for (const ignoreUrl of ignoredUrls) {
        if (urlMatches(url, ignoreUrl)) {
          return true;
        }
      }
      return false;
    }
    exports.isUrlIgnored = isUrlIgnored;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/promise.js
var require_promise = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Deferred = void 0;
    var Deferred = class {
      _promise;
      _resolve;
      _reject;
      constructor() {
        this._promise = new Promise((resolve3, reject) => {
          this._resolve = resolve3;
          this._reject = reject;
        });
      }
      get promise() {
        return this._promise;
      }
      resolve(val) {
        this._resolve(val);
      }
      reject(err) {
        this._reject(err);
      }
    };
    exports.Deferred = Deferred;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/callback.js
var require_callback = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/callback.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BindOnceFuture = void 0;
    var promise_1 = require_promise();
    var BindOnceFuture = class {
      _isCalled = false;
      _deferred = new promise_1.Deferred();
      _callback;
      _that;
      constructor(callback, that) {
        this._callback = callback;
        this._that = that;
      }
      get isCalled() {
        return this._isCalled;
      }
      get promise() {
        return this._deferred.promise;
      }
      call(...args) {
        if (!this._isCalled) {
          this._isCalled = true;
          try {
            Promise.resolve(this._callback.call(this._that, ...args)).then((val) => this._deferred.resolve(val), (err) => this._deferred.reject(err));
          } catch (err) {
            this._deferred.reject(err);
          }
        }
        return this._deferred.promise;
      }
    };
    exports.BindOnceFuture = BindOnceFuture;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/configuration.js
var require_configuration = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/utils/configuration.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.diagLogLevelFromString = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var logLevelMap = {
      ALL: api_1.DiagLogLevel.ALL,
      VERBOSE: api_1.DiagLogLevel.VERBOSE,
      DEBUG: api_1.DiagLogLevel.DEBUG,
      INFO: api_1.DiagLogLevel.INFO,
      WARN: api_1.DiagLogLevel.WARN,
      ERROR: api_1.DiagLogLevel.ERROR,
      NONE: api_1.DiagLogLevel.NONE
    };
    function diagLogLevelFromString(value) {
      if (value == null) {
        return void 0;
      }
      const resolvedLogLevel = logLevelMap[value.toUpperCase()];
      if (resolvedLogLevel == null) {
        api_1.diag.warn(`Unknown log level "${value}", expected one of ${Object.keys(logLevelMap)}, using default`);
        return api_1.DiagLogLevel.INFO;
      }
      return resolvedLogLevel;
    }
    exports.diagLogLevelFromString = diagLogLevelFromString;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/internal/exporter.js
var require_exporter = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/internal/exporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._export = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var suppress_tracing_1 = require_suppress_tracing();
    function _export(exporter, arg) {
      return new Promise((resolve3) => {
        api_1.context.with((0, suppress_tracing_1.suppressTracing)(api_1.context.active()), () => {
          exporter.export(arg, (result) => {
            resolve3(result);
          });
        });
      });
    }
    exports._export = _export;
  }
});

// node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/index.js
var require_src4 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+core@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.internal = exports.diagLogLevelFromString = exports.BindOnceFuture = exports.urlMatches = exports.isUrlIgnored = exports.callWithTimeout = exports.TimeoutError = exports.merge = exports.TraceState = exports.unsuppressTracing = exports.suppressTracing = exports.isTracingSuppressed = exports.setRPCMetadata = exports.getRPCMetadata = exports.deleteRPCMetadata = exports.RPCType = exports.parseTraceParent = exports.W3CTraceContextPropagator = exports.TRACE_STATE_HEADER = exports.TRACE_PARENT_HEADER = exports.CompositePropagator = exports.otperformance = exports.getStringListFromEnv = exports.getNumberFromEnv = exports.getBooleanFromEnv = exports.getStringFromEnv = exports._globalThis = exports.SDK_INFO = exports.parseKeyPairsIntoRecord = exports.ExportResultCode = exports.unrefTimer = exports.timeInputToHrTime = exports.millisToHrTime = exports.isTimeInputHrTime = exports.isTimeInput = exports.hrTimeToTimeStamp = exports.hrTimeToNanoseconds = exports.hrTimeToMilliseconds = exports.hrTimeToMicroseconds = exports.hrTimeDuration = exports.hrTime = exports.getTimeOrigin = exports.addHrTimes = exports.loggingErrorHandler = exports.setGlobalErrorHandler = exports.globalErrorHandler = exports.sanitizeAttributes = exports.isAttributeValue = exports.AnchoredClock = exports.W3CBaggagePropagator = void 0;
    var W3CBaggagePropagator_1 = require_W3CBaggagePropagator();
    Object.defineProperty(exports, "W3CBaggagePropagator", { enumerable: true, get: function() {
      return W3CBaggagePropagator_1.W3CBaggagePropagator;
    } });
    var anchored_clock_1 = require_anchored_clock();
    Object.defineProperty(exports, "AnchoredClock", { enumerable: true, get: function() {
      return anchored_clock_1.AnchoredClock;
    } });
    var attributes_1 = require_attributes();
    Object.defineProperty(exports, "isAttributeValue", { enumerable: true, get: function() {
      return attributes_1.isAttributeValue;
    } });
    Object.defineProperty(exports, "sanitizeAttributes", { enumerable: true, get: function() {
      return attributes_1.sanitizeAttributes;
    } });
    var global_error_handler_1 = require_global_error_handler();
    Object.defineProperty(exports, "globalErrorHandler", { enumerable: true, get: function() {
      return global_error_handler_1.globalErrorHandler;
    } });
    Object.defineProperty(exports, "setGlobalErrorHandler", { enumerable: true, get: function() {
      return global_error_handler_1.setGlobalErrorHandler;
    } });
    var logging_error_handler_1 = require_logging_error_handler();
    Object.defineProperty(exports, "loggingErrorHandler", { enumerable: true, get: function() {
      return logging_error_handler_1.loggingErrorHandler;
    } });
    var time_1 = require_time();
    Object.defineProperty(exports, "addHrTimes", { enumerable: true, get: function() {
      return time_1.addHrTimes;
    } });
    Object.defineProperty(exports, "getTimeOrigin", { enumerable: true, get: function() {
      return time_1.getTimeOrigin;
    } });
    Object.defineProperty(exports, "hrTime", { enumerable: true, get: function() {
      return time_1.hrTime;
    } });
    Object.defineProperty(exports, "hrTimeDuration", { enumerable: true, get: function() {
      return time_1.hrTimeDuration;
    } });
    Object.defineProperty(exports, "hrTimeToMicroseconds", { enumerable: true, get: function() {
      return time_1.hrTimeToMicroseconds;
    } });
    Object.defineProperty(exports, "hrTimeToMilliseconds", { enumerable: true, get: function() {
      return time_1.hrTimeToMilliseconds;
    } });
    Object.defineProperty(exports, "hrTimeToNanoseconds", { enumerable: true, get: function() {
      return time_1.hrTimeToNanoseconds;
    } });
    Object.defineProperty(exports, "hrTimeToTimeStamp", { enumerable: true, get: function() {
      return time_1.hrTimeToTimeStamp;
    } });
    Object.defineProperty(exports, "isTimeInput", { enumerable: true, get: function() {
      return time_1.isTimeInput;
    } });
    Object.defineProperty(exports, "isTimeInputHrTime", { enumerable: true, get: function() {
      return time_1.isTimeInputHrTime;
    } });
    Object.defineProperty(exports, "millisToHrTime", { enumerable: true, get: function() {
      return time_1.millisToHrTime;
    } });
    Object.defineProperty(exports, "timeInputToHrTime", { enumerable: true, get: function() {
      return time_1.timeInputToHrTime;
    } });
    var timer_util_1 = require_timer_util();
    Object.defineProperty(exports, "unrefTimer", { enumerable: true, get: function() {
      return timer_util_1.unrefTimer;
    } });
    var ExportResult_1 = require_ExportResult();
    Object.defineProperty(exports, "ExportResultCode", { enumerable: true, get: function() {
      return ExportResult_1.ExportResultCode;
    } });
    var utils_1 = require_utils2();
    Object.defineProperty(exports, "parseKeyPairsIntoRecord", { enumerable: true, get: function() {
      return utils_1.parseKeyPairsIntoRecord;
    } });
    var platform_1 = require_platform3();
    Object.defineProperty(exports, "SDK_INFO", { enumerable: true, get: function() {
      return platform_1.SDK_INFO;
    } });
    Object.defineProperty(exports, "_globalThis", { enumerable: true, get: function() {
      return platform_1._globalThis;
    } });
    Object.defineProperty(exports, "getStringFromEnv", { enumerable: true, get: function() {
      return platform_1.getStringFromEnv;
    } });
    Object.defineProperty(exports, "getBooleanFromEnv", { enumerable: true, get: function() {
      return platform_1.getBooleanFromEnv;
    } });
    Object.defineProperty(exports, "getNumberFromEnv", { enumerable: true, get: function() {
      return platform_1.getNumberFromEnv;
    } });
    Object.defineProperty(exports, "getStringListFromEnv", { enumerable: true, get: function() {
      return platform_1.getStringListFromEnv;
    } });
    Object.defineProperty(exports, "otperformance", { enumerable: true, get: function() {
      return platform_1.otperformance;
    } });
    var composite_1 = require_composite();
    Object.defineProperty(exports, "CompositePropagator", { enumerable: true, get: function() {
      return composite_1.CompositePropagator;
    } });
    var W3CTraceContextPropagator_1 = require_W3CTraceContextPropagator();
    Object.defineProperty(exports, "TRACE_PARENT_HEADER", { enumerable: true, get: function() {
      return W3CTraceContextPropagator_1.TRACE_PARENT_HEADER;
    } });
    Object.defineProperty(exports, "TRACE_STATE_HEADER", { enumerable: true, get: function() {
      return W3CTraceContextPropagator_1.TRACE_STATE_HEADER;
    } });
    Object.defineProperty(exports, "W3CTraceContextPropagator", { enumerable: true, get: function() {
      return W3CTraceContextPropagator_1.W3CTraceContextPropagator;
    } });
    Object.defineProperty(exports, "parseTraceParent", { enumerable: true, get: function() {
      return W3CTraceContextPropagator_1.parseTraceParent;
    } });
    var rpc_metadata_1 = require_rpc_metadata();
    Object.defineProperty(exports, "RPCType", { enumerable: true, get: function() {
      return rpc_metadata_1.RPCType;
    } });
    Object.defineProperty(exports, "deleteRPCMetadata", { enumerable: true, get: function() {
      return rpc_metadata_1.deleteRPCMetadata;
    } });
    Object.defineProperty(exports, "getRPCMetadata", { enumerable: true, get: function() {
      return rpc_metadata_1.getRPCMetadata;
    } });
    Object.defineProperty(exports, "setRPCMetadata", { enumerable: true, get: function() {
      return rpc_metadata_1.setRPCMetadata;
    } });
    var suppress_tracing_1 = require_suppress_tracing();
    Object.defineProperty(exports, "isTracingSuppressed", { enumerable: true, get: function() {
      return suppress_tracing_1.isTracingSuppressed;
    } });
    Object.defineProperty(exports, "suppressTracing", { enumerable: true, get: function() {
      return suppress_tracing_1.suppressTracing;
    } });
    Object.defineProperty(exports, "unsuppressTracing", { enumerable: true, get: function() {
      return suppress_tracing_1.unsuppressTracing;
    } });
    var TraceState_1 = require_TraceState();
    Object.defineProperty(exports, "TraceState", { enumerable: true, get: function() {
      return TraceState_1.TraceState;
    } });
    var merge_1 = require_merge();
    Object.defineProperty(exports, "merge", { enumerable: true, get: function() {
      return merge_1.merge;
    } });
    var timeout_1 = require_timeout();
    Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function() {
      return timeout_1.TimeoutError;
    } });
    Object.defineProperty(exports, "callWithTimeout", { enumerable: true, get: function() {
      return timeout_1.callWithTimeout;
    } });
    var url_1 = require_url();
    Object.defineProperty(exports, "isUrlIgnored", { enumerable: true, get: function() {
      return url_1.isUrlIgnored;
    } });
    Object.defineProperty(exports, "urlMatches", { enumerable: true, get: function() {
      return url_1.urlMatches;
    } });
    var callback_1 = require_callback();
    Object.defineProperty(exports, "BindOnceFuture", { enumerable: true, get: function() {
      return callback_1.BindOnceFuture;
    } });
    var configuration_1 = require_configuration();
    Object.defineProperty(exports, "diagLogLevelFromString", { enumerable: true, get: function() {
      return configuration_1.diagLogLevelFromString;
    } });
    var exporter_1 = require_exporter();
    exports.internal = {
      _export: exporter_1._export
    };
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/default-service-name.js
var require_default_service_name = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/default-service-name.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultServiceName = void 0;
    var DEFAULT_SERVICE_NAME = typeof process === "object" && typeof process.argv0 === "string" && process.argv0.length > 0 ? `unknown_service:${process.argv0}` : "unknown_service";
    function defaultServiceName() {
      return DEFAULT_SERVICE_NAME;
    }
    exports.defaultServiceName = defaultServiceName;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/utils.js
var require_utils3 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPromiseLike = void 0;
    var isPromiseLike = (val) => {
      return val !== null && typeof val === "object" && typeof val.then === "function";
    };
    exports.isPromiseLike = isPromiseLike;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/ResourceImpl.js
var require_ResourceImpl = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/ResourceImpl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultResource = exports.emptyResource = exports.resourceFromDetectedResource = exports.resourceFromAttributes = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src4();
    var semantic_conventions_1 = (init_esm2(), __toCommonJS(esm_exports2));
    var default_service_name_1 = require_default_service_name();
    var utils_1 = require_utils3();
    var ResourceImpl = class _ResourceImpl {
      _rawAttributes;
      _asyncAttributesPending = false;
      _schemaUrl;
      _memoizedAttributes;
      static FromAttributeList(attributes2, options) {
        const res = new _ResourceImpl({}, options);
        res._rawAttributes = guardedRawAttributes(attributes2);
        res._asyncAttributesPending = attributes2.filter(([_, val]) => (0, utils_1.isPromiseLike)(val)).length > 0;
        return res;
      }
      constructor(resource, options) {
        const attributes2 = resource.attributes ?? {};
        this._rawAttributes = Object.entries(attributes2).map(([k, v]) => {
          if ((0, utils_1.isPromiseLike)(v)) {
            this._asyncAttributesPending = true;
          }
          return [k, v];
        });
        this._rawAttributes = guardedRawAttributes(this._rawAttributes);
        this._schemaUrl = validateSchemaUrl(options?.schemaUrl);
      }
      get asyncAttributesPending() {
        return this._asyncAttributesPending;
      }
      async waitForAsyncAttributes() {
        if (!this.asyncAttributesPending) {
          return;
        }
        for (let i = 0; i < this._rawAttributes.length; i++) {
          const [k, v] = this._rawAttributes[i];
          this._rawAttributes[i] = [k, (0, utils_1.isPromiseLike)(v) ? await v : v];
        }
        this._asyncAttributesPending = false;
      }
      get attributes() {
        if (this.asyncAttributesPending) {
          api_1.diag.error("Accessing resource attributes before async attributes settled");
        }
        if (this._memoizedAttributes) {
          return this._memoizedAttributes;
        }
        const attrs = {};
        for (const [k, v] of this._rawAttributes) {
          if ((0, utils_1.isPromiseLike)(v)) {
            api_1.diag.debug(`Unsettled resource attribute ${k} skipped`);
            continue;
          }
          if (v != null) {
            attrs[k] ??= v;
          }
        }
        if (!this._asyncAttributesPending) {
          this._memoizedAttributes = attrs;
        }
        return attrs;
      }
      getRawAttributes() {
        return this._rawAttributes;
      }
      get schemaUrl() {
        return this._schemaUrl;
      }
      merge(resource) {
        if (resource == null)
          return this;
        const mergedSchemaUrl = mergeSchemaUrl(this, resource);
        const mergedOptions = mergedSchemaUrl ? { schemaUrl: mergedSchemaUrl } : void 0;
        return _ResourceImpl.FromAttributeList([...resource.getRawAttributes(), ...this.getRawAttributes()], mergedOptions);
      }
    };
    function resourceFromAttributes2(attributes2, options) {
      return ResourceImpl.FromAttributeList(Object.entries(attributes2), options);
    }
    exports.resourceFromAttributes = resourceFromAttributes2;
    function resourceFromDetectedResource(detectedResource, options) {
      return new ResourceImpl(detectedResource, options);
    }
    exports.resourceFromDetectedResource = resourceFromDetectedResource;
    function emptyResource() {
      return resourceFromAttributes2({});
    }
    exports.emptyResource = emptyResource;
    function defaultResource2() {
      return resourceFromAttributes2({
        [semantic_conventions_1.ATTR_SERVICE_NAME]: (0, default_service_name_1.defaultServiceName)(),
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_LANGUAGE]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_LANGUAGE],
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_NAME]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_NAME],
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_VERSION]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_VERSION]
      });
    }
    exports.defaultResource = defaultResource2;
    function guardedRawAttributes(attributes2) {
      return attributes2.map(([k, v]) => {
        if ((0, utils_1.isPromiseLike)(v)) {
          return [
            k,
            v.catch((err) => {
              api_1.diag.debug("promise rejection for resource attribute: %s - %s", k, err);
              return void 0;
            })
          ];
        }
        return [k, v];
      });
    }
    function validateSchemaUrl(schemaUrl) {
      if (typeof schemaUrl === "string" || schemaUrl === void 0) {
        return schemaUrl;
      }
      api_1.diag.warn("Schema URL must be string or undefined, got %s. Schema URL will be ignored.", schemaUrl);
      return void 0;
    }
    function mergeSchemaUrl(old, updating) {
      const oldSchemaUrl = old?.schemaUrl;
      const updatingSchemaUrl = updating?.schemaUrl;
      const isOldEmpty = oldSchemaUrl === void 0 || oldSchemaUrl === "";
      const isUpdatingEmpty = updatingSchemaUrl === void 0 || updatingSchemaUrl === "";
      if (isOldEmpty) {
        return updatingSchemaUrl;
      }
      if (isUpdatingEmpty) {
        return oldSchemaUrl;
      }
      if (oldSchemaUrl === updatingSchemaUrl) {
        return oldSchemaUrl;
      }
      api_1.diag.warn('Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.', oldSchemaUrl, updatingSchemaUrl);
      return void 0;
    }
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detect-resources.js
var require_detect_resources = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detect-resources.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.detectResources = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var ResourceImpl_1 = require_ResourceImpl();
    var detectResources = (config = {}) => {
      const resources = (config.detectors || []).map((d) => {
        try {
          const resource = (0, ResourceImpl_1.resourceFromDetectedResource)(d.detect(config));
          api_1.diag.debug(`${d.constructor.name} found resource.`, resource);
          return resource;
        } catch (e) {
          api_1.diag.debug(`${d.constructor.name} failed: ${e.message}`);
          return (0, ResourceImpl_1.emptyResource)();
        }
      });
      return resources.reduce((acc, resource) => acc.merge(resource), (0, ResourceImpl_1.emptyResource)());
    };
    exports.detectResources = detectResources;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js
var require_EnvDetector = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.envDetector = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var semantic_conventions_1 = (init_esm2(), __toCommonJS(esm_exports2));
    var core_1 = require_src4();
    var EnvDetector = class {
      // Type, attribute keys, and attribute values should not exceed 256 characters.
      _MAX_LENGTH = 255;
      // OTEL_RESOURCE_ATTRIBUTES is a comma-separated list of attributes.
      _COMMA_SEPARATOR = ",";
      // OTEL_RESOURCE_ATTRIBUTES contains key value pair separated by '='.
      _LABEL_KEY_VALUE_SPLITTER = "=";
      _ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.";
      _ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
      /**
       * Returns a {@link Resource} populated with attributes from the
       * OTEL_RESOURCE_ATTRIBUTES environment variable. Note this is an async
       * function to conform to the Detector interface.
       *
       * @param config The resource detection config
       */
      detect(_config) {
        const attributes2 = {};
        const rawAttributes = (0, core_1.getStringFromEnv)("OTEL_RESOURCE_ATTRIBUTES");
        const serviceName = (0, core_1.getStringFromEnv)("OTEL_SERVICE_NAME");
        if (rawAttributes) {
          try {
            const parsedAttributes = this._parseResourceAttributes(rawAttributes);
            Object.assign(attributes2, parsedAttributes);
          } catch (e) {
            api_1.diag.debug(`EnvDetector failed: ${e.message}`);
          }
        }
        if (serviceName) {
          attributes2[semantic_conventions_1.ATTR_SERVICE_NAME] = serviceName;
        }
        return { attributes: attributes2 };
      }
      /**
       * Creates an attribute map from the OTEL_RESOURCE_ATTRIBUTES environment
       * variable.
       *
       * OTEL_RESOURCE_ATTRIBUTES: A comma-separated list of attributes describing
       * the source in more detail, e.g. “key1=val1,key2=val2”. Domain names and
       * paths are accepted as attribute keys. Values may be quoted or unquoted in
       * general. If a value contains whitespace, =, or " characters, it must
       * always be quoted.
       *
       * @param rawEnvAttributes The resource attributes as a comma-separated list
       * of key/value pairs.
       * @returns The sanitized resource attributes.
       */
      _parseResourceAttributes(rawEnvAttributes) {
        if (!rawEnvAttributes)
          return {};
        const attributes2 = {};
        const rawAttributes = rawEnvAttributes.split(this._COMMA_SEPARATOR, -1);
        for (const rawAttribute of rawAttributes) {
          const keyValuePair = rawAttribute.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
          if (keyValuePair.length !== 2) {
            continue;
          }
          let [key, value] = keyValuePair;
          key = key.trim();
          value = value.trim().split(/^"|"$/).join("");
          if (!this._isValidAndNotEmpty(key)) {
            throw new Error(`Attribute key ${this._ERROR_MESSAGE_INVALID_CHARS}`);
          }
          if (!this._isValid(value)) {
            throw new Error(`Attribute value ${this._ERROR_MESSAGE_INVALID_VALUE}`);
          }
          attributes2[key] = decodeURIComponent(value);
        }
        return attributes2;
      }
      /**
       * Determines whether the given String is a valid printable ASCII string with
       * a length not exceed _MAX_LENGTH characters.
       *
       * @param str The String to be validated.
       * @returns Whether the String is valid.
       */
      _isValid(name) {
        return name.length <= this._MAX_LENGTH && this._isBaggageOctetString(name);
      }
      // https://www.w3.org/TR/baggage/#definition
      _isBaggageOctetString(str) {
        for (let i = 0; i < str.length; i++) {
          const ch = str.charCodeAt(i);
          if (ch < 33 || ch === 44 || ch === 59 || ch === 92 || ch > 126) {
            return false;
          }
        }
        return true;
      }
      /**
       * Determines whether the given String is a valid printable ASCII string with
       * a length greater than 0 and not exceed _MAX_LENGTH characters.
       *
       * @param str The String to be validated.
       * @returns Whether the String is valid and not empty.
       */
      _isValidAndNotEmpty(str) {
        return str.length > 0 && this._isValid(str);
      }
    };
    exports.envDetector = new EnvDetector();
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/semconv.js
var require_semconv2 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/semconv.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ATTR_WEBENGINE_VERSION = exports.ATTR_WEBENGINE_NAME = exports.ATTR_WEBENGINE_DESCRIPTION = exports.ATTR_SERVICE_NAMESPACE = exports.ATTR_SERVICE_INSTANCE_ID = exports.ATTR_PROCESS_RUNTIME_VERSION = exports.ATTR_PROCESS_RUNTIME_NAME = exports.ATTR_PROCESS_RUNTIME_DESCRIPTION = exports.ATTR_PROCESS_PID = exports.ATTR_PROCESS_OWNER = exports.ATTR_PROCESS_EXECUTABLE_PATH = exports.ATTR_PROCESS_EXECUTABLE_NAME = exports.ATTR_PROCESS_COMMAND_ARGS = exports.ATTR_PROCESS_COMMAND = exports.ATTR_OS_VERSION = exports.ATTR_OS_TYPE = exports.ATTR_K8S_POD_NAME = exports.ATTR_K8S_NAMESPACE_NAME = exports.ATTR_K8S_DEPLOYMENT_NAME = exports.ATTR_K8S_CLUSTER_NAME = exports.ATTR_HOST_TYPE = exports.ATTR_HOST_NAME = exports.ATTR_HOST_IMAGE_VERSION = exports.ATTR_HOST_IMAGE_NAME = exports.ATTR_HOST_IMAGE_ID = exports.ATTR_HOST_ID = exports.ATTR_HOST_ARCH = exports.ATTR_CONTAINER_NAME = exports.ATTR_CONTAINER_IMAGE_TAGS = exports.ATTR_CONTAINER_IMAGE_NAME = exports.ATTR_CONTAINER_ID = exports.ATTR_CLOUD_REGION = exports.ATTR_CLOUD_PROVIDER = exports.ATTR_CLOUD_AVAILABILITY_ZONE = exports.ATTR_CLOUD_ACCOUNT_ID = void 0;
    exports.ATTR_CLOUD_ACCOUNT_ID = "cloud.account.id";
    exports.ATTR_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
    exports.ATTR_CLOUD_PROVIDER = "cloud.provider";
    exports.ATTR_CLOUD_REGION = "cloud.region";
    exports.ATTR_CONTAINER_ID = "container.id";
    exports.ATTR_CONTAINER_IMAGE_NAME = "container.image.name";
    exports.ATTR_CONTAINER_IMAGE_TAGS = "container.image.tags";
    exports.ATTR_CONTAINER_NAME = "container.name";
    exports.ATTR_HOST_ARCH = "host.arch";
    exports.ATTR_HOST_ID = "host.id";
    exports.ATTR_HOST_IMAGE_ID = "host.image.id";
    exports.ATTR_HOST_IMAGE_NAME = "host.image.name";
    exports.ATTR_HOST_IMAGE_VERSION = "host.image.version";
    exports.ATTR_HOST_NAME = "host.name";
    exports.ATTR_HOST_TYPE = "host.type";
    exports.ATTR_K8S_CLUSTER_NAME = "k8s.cluster.name";
    exports.ATTR_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    exports.ATTR_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    exports.ATTR_K8S_POD_NAME = "k8s.pod.name";
    exports.ATTR_OS_TYPE = "os.type";
    exports.ATTR_OS_VERSION = "os.version";
    exports.ATTR_PROCESS_COMMAND = "process.command";
    exports.ATTR_PROCESS_COMMAND_ARGS = "process.command_args";
    exports.ATTR_PROCESS_EXECUTABLE_NAME = "process.executable.name";
    exports.ATTR_PROCESS_EXECUTABLE_PATH = "process.executable.path";
    exports.ATTR_PROCESS_OWNER = "process.owner";
    exports.ATTR_PROCESS_PID = "process.pid";
    exports.ATTR_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
    exports.ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";
    exports.ATTR_PROCESS_RUNTIME_VERSION = "process.runtime.version";
    exports.ATTR_SERVICE_INSTANCE_ID = "service.instance.id";
    exports.ATTR_SERVICE_NAMESPACE = "service.namespace";
    exports.ATTR_WEBENGINE_DESCRIPTION = "webengine.description";
    exports.ATTR_WEBENGINE_NAME = "webengine.name";
    exports.ATTR_WEBENGINE_VERSION = "webengine.version";
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/execAsync.js
var require_execAsync = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/execAsync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.execAsync = void 0;
    var child_process = __require("child_process");
    var util = __require("util");
    exports.execAsync = util.promisify(child_process.exec);
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-darwin.js
var require_getMachineId_darwin = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-darwin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMachineId = void 0;
    var execAsync_1 = require_execAsync();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      try {
        const result = await (0, execAsync_1.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"');
        const idLine = result.stdout.split("\n").find((line) => line.includes("IOPlatformUUID"));
        if (!idLine) {
          return void 0;
        }
        const parts = idLine.split('" = "');
        if (parts.length === 2) {
          return parts[1].slice(0, -1);
        }
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      return void 0;
    }
    exports.getMachineId = getMachineId;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-linux.js
var require_getMachineId_linux = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-linux.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMachineId = void 0;
    var fs_1 = __require("fs");
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      const paths = ["/etc/machine-id", "/var/lib/dbus/machine-id"];
      for (const path2 of paths) {
        try {
          const result = await fs_1.promises.readFile(path2, { encoding: "utf8" });
          return result.trim();
        } catch (e) {
          api_1.diag.debug(`error reading machine id: ${e}`);
        }
      }
      return void 0;
    }
    exports.getMachineId = getMachineId;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-bsd.js
var require_getMachineId_bsd = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-bsd.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMachineId = void 0;
    var fs_1 = __require("fs");
    var execAsync_1 = require_execAsync();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      try {
        const result = await fs_1.promises.readFile("/etc/hostid", { encoding: "utf8" });
        return result.trim();
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      try {
        const result = await (0, execAsync_1.execAsync)("kenv -q smbios.system.uuid");
        return result.stdout.trim();
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      return void 0;
    }
    exports.getMachineId = getMachineId;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-win.js
var require_getMachineId_win = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-win.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMachineId = void 0;
    var process2 = __require("process");
    var execAsync_1 = require_execAsync();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      const args = "QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid";
      let command = "%windir%\\System32\\REG.exe";
      if (process2.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in process2.env) {
        command = "%windir%\\sysnative\\cmd.exe /c " + command;
      }
      try {
        const result = await (0, execAsync_1.execAsync)(`${command} ${args}`);
        const parts = result.stdout.split("REG_SZ");
        if (parts.length === 2) {
          return parts[1].trim();
        }
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      return void 0;
    }
    exports.getMachineId = getMachineId;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-unsupported.js
var require_getMachineId_unsupported = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-unsupported.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMachineId = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      api_1.diag.debug("could not read machine-id: unsupported platform");
      return void 0;
    }
    exports.getMachineId = getMachineId;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId.js
var require_getMachineId = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMachineId = void 0;
    var process2 = __require("process");
    var getMachineIdImpl;
    async function getMachineId() {
      if (!getMachineIdImpl) {
        switch (process2.platform) {
          case "darwin":
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_darwin()))).getMachineId;
            break;
          case "linux":
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_linux()))).getMachineId;
            break;
          case "freebsd":
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_bsd()))).getMachineId;
            break;
          case "win32":
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_win()))).getMachineId;
            break;
          default:
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_unsupported()))).getMachineId;
            break;
        }
      }
      return getMachineIdImpl();
    }
    exports.getMachineId = getMachineId;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/utils.js
var require_utils4 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalizeType = exports.normalizeArch = void 0;
    var normalizeArch = (nodeArchString) => {
      switch (nodeArchString) {
        case "arm":
          return "arm32";
        case "ppc":
          return "ppc32";
        case "x64":
          return "amd64";
        default:
          return nodeArchString;
      }
    };
    exports.normalizeArch = normalizeArch;
    var normalizeType = (nodePlatform) => {
      switch (nodePlatform) {
        case "sunos":
          return "solaris";
        case "win32":
          return "windows";
        default:
          return nodePlatform;
      }
    };
    exports.normalizeType = normalizeType;
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/HostDetector.js
var require_HostDetector = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/HostDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hostDetector = void 0;
    var semconv_1 = require_semconv2();
    var os_1 = __require("os");
    var getMachineId_1 = require_getMachineId();
    var utils_1 = require_utils4();
    var HostDetector = class {
      detect(_config) {
        const attributes2 = {
          [semconv_1.ATTR_HOST_NAME]: (0, os_1.hostname)(),
          [semconv_1.ATTR_HOST_ARCH]: (0, utils_1.normalizeArch)((0, os_1.arch)()),
          [semconv_1.ATTR_HOST_ID]: (0, getMachineId_1.getMachineId)()
        };
        return { attributes: attributes2 };
      }
    };
    exports.hostDetector = new HostDetector();
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/OSDetector.js
var require_OSDetector = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/OSDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.osDetector = void 0;
    var semconv_1 = require_semconv2();
    var os_1 = __require("os");
    var utils_1 = require_utils4();
    var OSDetector = class {
      detect(_config) {
        const attributes2 = {
          [semconv_1.ATTR_OS_TYPE]: (0, utils_1.normalizeType)((0, os_1.platform)()),
          [semconv_1.ATTR_OS_VERSION]: (0, os_1.release)()
        };
        return { attributes: attributes2 };
      }
    };
    exports.osDetector = new OSDetector();
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ProcessDetector.js
var require_ProcessDetector = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ProcessDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processDetector = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var semconv_1 = require_semconv2();
    var os3 = __require("os");
    var ProcessDetector = class {
      detect(_config) {
        const attributes2 = {
          [semconv_1.ATTR_PROCESS_PID]: process.pid,
          [semconv_1.ATTR_PROCESS_EXECUTABLE_NAME]: process.title,
          [semconv_1.ATTR_PROCESS_EXECUTABLE_PATH]: process.execPath,
          [semconv_1.ATTR_PROCESS_COMMAND_ARGS]: [
            process.argv[0],
            ...process.execArgv,
            ...process.argv.slice(1)
          ],
          [semconv_1.ATTR_PROCESS_RUNTIME_VERSION]: process.versions.node,
          [semconv_1.ATTR_PROCESS_RUNTIME_NAME]: "nodejs",
          [semconv_1.ATTR_PROCESS_RUNTIME_DESCRIPTION]: "Node.js"
        };
        if (process.argv.length > 1) {
          attributes2[semconv_1.ATTR_PROCESS_COMMAND] = process.argv[1];
        }
        try {
          const userInfo = os3.userInfo();
          attributes2[semconv_1.ATTR_PROCESS_OWNER] = userInfo.username;
        } catch (e) {
          api_1.diag.debug(`error obtaining process owner: ${e}`);
        }
        return { attributes: attributes2 };
      }
    };
    exports.processDetector = new ProcessDetector();
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ServiceInstanceIdDetector.js
var require_ServiceInstanceIdDetector = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ServiceInstanceIdDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceInstanceIdDetector = void 0;
    var semconv_1 = require_semconv2();
    var crypto_1 = __require("crypto");
    var ServiceInstanceIdDetector = class {
      detect(_config) {
        return {
          attributes: {
            [semconv_1.ATTR_SERVICE_INSTANCE_ID]: (0, crypto_1.randomUUID)()
          }
        };
      }
    };
    exports.serviceInstanceIdDetector = new ServiceInstanceIdDetector();
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/index.js
var require_node5 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceInstanceIdDetector = exports.processDetector = exports.osDetector = exports.hostDetector = void 0;
    var HostDetector_1 = require_HostDetector();
    Object.defineProperty(exports, "hostDetector", { enumerable: true, get: function() {
      return HostDetector_1.hostDetector;
    } });
    var OSDetector_1 = require_OSDetector();
    Object.defineProperty(exports, "osDetector", { enumerable: true, get: function() {
      return OSDetector_1.osDetector;
    } });
    var ProcessDetector_1 = require_ProcessDetector();
    Object.defineProperty(exports, "processDetector", { enumerable: true, get: function() {
      return ProcessDetector_1.processDetector;
    } });
    var ServiceInstanceIdDetector_1 = require_ServiceInstanceIdDetector();
    Object.defineProperty(exports, "serviceInstanceIdDetector", { enumerable: true, get: function() {
      return ServiceInstanceIdDetector_1.serviceInstanceIdDetector;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/index.js
var require_platform4 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceInstanceIdDetector = exports.processDetector = exports.osDetector = exports.hostDetector = void 0;
    var node_1 = require_node5();
    Object.defineProperty(exports, "hostDetector", { enumerable: true, get: function() {
      return node_1.hostDetector;
    } });
    Object.defineProperty(exports, "osDetector", { enumerable: true, get: function() {
      return node_1.osDetector;
    } });
    Object.defineProperty(exports, "processDetector", { enumerable: true, get: function() {
      return node_1.processDetector;
    } });
    Object.defineProperty(exports, "serviceInstanceIdDetector", { enumerable: true, get: function() {
      return node_1.serviceInstanceIdDetector;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/NoopDetector.js
var require_NoopDetector = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/NoopDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noopDetector = exports.NoopDetector = void 0;
    var NoopDetector = class {
      detect() {
        return {
          attributes: {}
        };
      }
    };
    exports.NoopDetector = NoopDetector;
    exports.noopDetector = new NoopDetector();
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/index.js
var require_detectors = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noopDetector = exports.serviceInstanceIdDetector = exports.processDetector = exports.osDetector = exports.hostDetector = exports.envDetector = void 0;
    var EnvDetector_1 = require_EnvDetector();
    Object.defineProperty(exports, "envDetector", { enumerable: true, get: function() {
      return EnvDetector_1.envDetector;
    } });
    var platform_1 = require_platform4();
    Object.defineProperty(exports, "hostDetector", { enumerable: true, get: function() {
      return platform_1.hostDetector;
    } });
    Object.defineProperty(exports, "osDetector", { enumerable: true, get: function() {
      return platform_1.osDetector;
    } });
    Object.defineProperty(exports, "processDetector", { enumerable: true, get: function() {
      return platform_1.processDetector;
    } });
    Object.defineProperty(exports, "serviceInstanceIdDetector", { enumerable: true, get: function() {
      return platform_1.serviceInstanceIdDetector;
    } });
    var NoopDetector_1 = require_NoopDetector();
    Object.defineProperty(exports, "noopDetector", { enumerable: true, get: function() {
      return NoopDetector_1.noopDetector;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/index.js
var require_src5 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+resources@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultServiceName = exports.emptyResource = exports.defaultResource = exports.resourceFromAttributes = exports.serviceInstanceIdDetector = exports.processDetector = exports.osDetector = exports.hostDetector = exports.envDetector = exports.detectResources = void 0;
    var detect_resources_1 = require_detect_resources();
    Object.defineProperty(exports, "detectResources", { enumerable: true, get: function() {
      return detect_resources_1.detectResources;
    } });
    var detectors_1 = require_detectors();
    Object.defineProperty(exports, "envDetector", { enumerable: true, get: function() {
      return detectors_1.envDetector;
    } });
    Object.defineProperty(exports, "hostDetector", { enumerable: true, get: function() {
      return detectors_1.hostDetector;
    } });
    Object.defineProperty(exports, "osDetector", { enumerable: true, get: function() {
      return detectors_1.osDetector;
    } });
    Object.defineProperty(exports, "processDetector", { enumerable: true, get: function() {
      return detectors_1.processDetector;
    } });
    Object.defineProperty(exports, "serviceInstanceIdDetector", { enumerable: true, get: function() {
      return detectors_1.serviceInstanceIdDetector;
    } });
    var ResourceImpl_1 = require_ResourceImpl();
    Object.defineProperty(exports, "resourceFromAttributes", { enumerable: true, get: function() {
      return ResourceImpl_1.resourceFromAttributes;
    } });
    Object.defineProperty(exports, "defaultResource", { enumerable: true, get: function() {
      return ResourceImpl_1.defaultResource;
    } });
    Object.defineProperty(exports, "emptyResource", { enumerable: true, get: function() {
      return ResourceImpl_1.emptyResource;
    } });
    var default_service_name_1 = require_default_service_name();
    Object.defineProperty(exports, "defaultServiceName", { enumerable: true, get: function() {
      return default_service_name_1.defaultServiceName;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/enums.js
var require_enums = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/enums.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExceptionEventName = void 0;
    exports.ExceptionEventName = "exception";
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/Span.js
var require_Span = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/Span.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanImpl = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src4();
    var semantic_conventions_1 = (init_esm2(), __toCommonJS(esm_exports2));
    var enums_1 = require_enums();
    var SpanImpl = class {
      // Below properties are included to implement ReadableSpan for export
      // purposes but are not intended to be written-to directly.
      _spanContext;
      kind;
      parentSpanContext;
      attributes = {};
      links = [];
      events = [];
      startTime;
      resource;
      instrumentationScope;
      _droppedAttributesCount = 0;
      _droppedEventsCount = 0;
      _droppedLinksCount = 0;
      name;
      status = {
        code: api_1.SpanStatusCode.UNSET
      };
      endTime = [0, 0];
      _ended = false;
      _duration = [-1, -1];
      _spanProcessor;
      _spanLimits;
      _attributeValueLengthLimit;
      _performanceStartTime;
      _performanceOffset;
      _startTimeProvided;
      /**
       * Constructs a new SpanImpl instance.
       */
      constructor(opts) {
        const now = Date.now();
        this._spanContext = opts.spanContext;
        this._performanceStartTime = core_1.otperformance.now();
        this._performanceOffset = now - (this._performanceStartTime + core_1.otperformance.timeOrigin);
        this._startTimeProvided = opts.startTime != null;
        this._spanLimits = opts.spanLimits;
        this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
        this._spanProcessor = opts.spanProcessor;
        this.name = opts.name;
        this.parentSpanContext = opts.parentSpanContext;
        this.kind = opts.kind;
        this.links = opts.links || [];
        this.startTime = this._getTime(opts.startTime ?? now);
        this.resource = opts.resource;
        this.instrumentationScope = opts.scope;
        if (opts.attributes != null) {
          this.setAttributes(opts.attributes);
        }
        this._spanProcessor.onStart(this, opts.context);
      }
      spanContext() {
        return this._spanContext;
      }
      setAttribute(key, value) {
        if (value == null || this._isSpanEnded())
          return this;
        if (key.length === 0) {
          api_1.diag.warn(`Invalid attribute key: ${key}`);
          return this;
        }
        if (!(0, core_1.isAttributeValue)(value)) {
          api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
          return this;
        }
        const { attributeCountLimit } = this._spanLimits;
        if (attributeCountLimit !== void 0 && Object.keys(this.attributes).length >= attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
          this._droppedAttributesCount++;
          return this;
        }
        this.attributes[key] = this._truncateToSize(value);
        return this;
      }
      setAttributes(attributes2) {
        for (const [k, v] of Object.entries(attributes2)) {
          this.setAttribute(k, v);
        }
        return this;
      }
      /**
       *
       * @param name Span Name
       * @param [attributesOrStartTime] Span attributes or start time
       *     if type is {@type TimeInput} and 3rd param is undefined
       * @param [timeStamp] Specified time stamp for the event
       */
      addEvent(name, attributesOrStartTime, timeStamp) {
        if (this._isSpanEnded())
          return this;
        const { eventCountLimit } = this._spanLimits;
        if (eventCountLimit === 0) {
          api_1.diag.warn("No events allowed.");
          this._droppedEventsCount++;
          return this;
        }
        if (eventCountLimit !== void 0 && this.events.length >= eventCountLimit) {
          if (this._droppedEventsCount === 0) {
            api_1.diag.debug("Dropping extra events.");
          }
          this.events.shift();
          this._droppedEventsCount++;
        }
        if ((0, core_1.isTimeInput)(attributesOrStartTime)) {
          if (!(0, core_1.isTimeInput)(timeStamp)) {
            timeStamp = attributesOrStartTime;
          }
          attributesOrStartTime = void 0;
        }
        const attributes2 = (0, core_1.sanitizeAttributes)(attributesOrStartTime);
        this.events.push({
          name,
          attributes: attributes2,
          time: this._getTime(timeStamp),
          droppedAttributesCount: 0
        });
        return this;
      }
      addLink(link) {
        this.links.push(link);
        return this;
      }
      addLinks(links) {
        this.links.push(...links);
        return this;
      }
      setStatus(status) {
        if (this._isSpanEnded())
          return this;
        this.status = { ...status };
        if (this.status.message != null && typeof status.message !== "string") {
          api_1.diag.warn(`Dropping invalid status.message of type '${typeof status.message}', expected 'string'`);
          delete this.status.message;
        }
        return this;
      }
      updateName(name) {
        if (this._isSpanEnded())
          return this;
        this.name = name;
        return this;
      }
      end(endTime) {
        if (this._isSpanEnded()) {
          api_1.diag.error(`${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`);
          return;
        }
        this.endTime = this._getTime(endTime);
        this._duration = (0, core_1.hrTimeDuration)(this.startTime, this.endTime);
        if (this._duration[0] < 0) {
          api_1.diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
          this.endTime = this.startTime.slice();
          this._duration = [0, 0];
        }
        if (this._droppedEventsCount > 0) {
          api_1.diag.warn(`Dropped ${this._droppedEventsCount} events because eventCountLimit reached`);
        }
        if (this._spanProcessor.onEnding) {
          this._spanProcessor.onEnding(this);
        }
        this._ended = true;
        this._spanProcessor.onEnd(this);
      }
      _getTime(inp) {
        if (typeof inp === "number" && inp <= core_1.otperformance.now()) {
          return (0, core_1.hrTime)(inp + this._performanceOffset);
        }
        if (typeof inp === "number") {
          return (0, core_1.millisToHrTime)(inp);
        }
        if (inp instanceof Date) {
          return (0, core_1.millisToHrTime)(inp.getTime());
        }
        if ((0, core_1.isTimeInputHrTime)(inp)) {
          return inp;
        }
        if (this._startTimeProvided) {
          return (0, core_1.millisToHrTime)(Date.now());
        }
        const msDuration = core_1.otperformance.now() - this._performanceStartTime;
        return (0, core_1.addHrTimes)(this.startTime, (0, core_1.millisToHrTime)(msDuration));
      }
      isRecording() {
        return this._ended === false;
      }
      recordException(exception, time) {
        const attributes2 = {};
        if (typeof exception === "string") {
          attributes2[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE] = exception;
        } else if (exception) {
          if (exception.code) {
            attributes2[semantic_conventions_1.ATTR_EXCEPTION_TYPE] = exception.code.toString();
          } else if (exception.name) {
            attributes2[semantic_conventions_1.ATTR_EXCEPTION_TYPE] = exception.name;
          }
          if (exception.message) {
            attributes2[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE] = exception.message;
          }
          if (exception.stack) {
            attributes2[semantic_conventions_1.ATTR_EXCEPTION_STACKTRACE] = exception.stack;
          }
        }
        if (attributes2[semantic_conventions_1.ATTR_EXCEPTION_TYPE] || attributes2[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE]) {
          this.addEvent(enums_1.ExceptionEventName, attributes2, time);
        } else {
          api_1.diag.warn(`Failed to record an exception ${exception}`);
        }
      }
      get duration() {
        return this._duration;
      }
      get ended() {
        return this._ended;
      }
      get droppedAttributesCount() {
        return this._droppedAttributesCount;
      }
      get droppedEventsCount() {
        return this._droppedEventsCount;
      }
      get droppedLinksCount() {
        return this._droppedLinksCount;
      }
      _isSpanEnded() {
        if (this._ended) {
          const error3 = new Error(`Operation attempted on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`);
          api_1.diag.warn(`Cannot execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`, error3);
        }
        return this._ended;
      }
      // Utility function to truncate given value within size
      // for value type of string, will truncate to given limit
      // for type of non-string, will return same value
      _truncateToLimitUtil(value, limit) {
        if (value.length <= limit) {
          return value;
        }
        return value.substring(0, limit);
      }
      /**
       * If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
       * return string with truncated to {@code attributeValueLengthLimit} characters
       *
       * If the given attribute value is array of strings then
       * return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
       *
       * Otherwise return same Attribute {@code value}
       *
       * @param value Attribute value
       * @returns truncated attribute value if required, otherwise same value
       */
      _truncateToSize(value) {
        const limit = this._attributeValueLengthLimit;
        if (limit <= 0) {
          api_1.diag.warn(`Attribute value limit must be positive, got ${limit}`);
          return value;
        }
        if (typeof value === "string") {
          return this._truncateToLimitUtil(value, limit);
        }
        if (Array.isArray(value)) {
          return value.map((val) => typeof val === "string" ? this._truncateToLimitUtil(val, limit) : val);
        }
        return value;
      }
    };
    exports.SpanImpl = SpanImpl;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.js
var require_Sampler = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamplingDecision = void 0;
    var SamplingDecision3;
    (function(SamplingDecision4) {
      SamplingDecision4[SamplingDecision4["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision4[SamplingDecision4["RECORD"] = 1] = "RECORD";
      SamplingDecision4[SamplingDecision4["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision3 = exports.SamplingDecision || (exports.SamplingDecision = {}));
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.js
var require_AlwaysOffSampler = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOffSampler = void 0;
    var Sampler_1 = require_Sampler();
    var AlwaysOffSampler = class {
      shouldSample() {
        return {
          decision: Sampler_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return "AlwaysOffSampler";
      }
    };
    exports.AlwaysOffSampler = AlwaysOffSampler;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.js
var require_AlwaysOnSampler = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOnSampler = void 0;
    var Sampler_1 = require_Sampler();
    var AlwaysOnSampler = class {
      shouldSample() {
        return {
          decision: Sampler_1.SamplingDecision.RECORD_AND_SAMPLED
        };
      }
      toString() {
        return "AlwaysOnSampler";
      }
    };
    exports.AlwaysOnSampler = AlwaysOnSampler;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.js
var require_ParentBasedSampler = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParentBasedSampler = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src4();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    var ParentBasedSampler = class {
      _root;
      _remoteParentSampled;
      _remoteParentNotSampled;
      _localParentSampled;
      _localParentNotSampled;
      constructor(config) {
        this._root = config.root;
        if (!this._root) {
          (0, core_1.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler_1.AlwaysOnSampler();
        }
        this._remoteParentSampled = config.remoteParentSampled ?? new AlwaysOnSampler_1.AlwaysOnSampler();
        this._remoteParentNotSampled = config.remoteParentNotSampled ?? new AlwaysOffSampler_1.AlwaysOffSampler();
        this._localParentSampled = config.localParentSampled ?? new AlwaysOnSampler_1.AlwaysOnSampler();
        this._localParentNotSampled = config.localParentNotSampled ?? new AlwaysOffSampler_1.AlwaysOffSampler();
      }
      shouldSample(context2, traceId, spanName, spanKind, attributes2, links) {
        const parentContext = api_1.trace.getSpanContext(context2);
        if (!parentContext || !(0, api_1.isSpanContextValid)(parentContext)) {
          return this._root.shouldSample(context2, traceId, spanName, spanKind, attributes2, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes2, links);
          }
          return this._remoteParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes2, links);
        }
        if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes2, links);
        }
        return this._localParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes2, links);
      }
      toString() {
        return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
      }
    };
    exports.ParentBasedSampler = ParentBasedSampler;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.js
var require_TraceIdRatioBasedSampler = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceIdRatioBasedSampler = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var Sampler_1 = require_Sampler();
    var TraceIdRatioBasedSampler = class {
      _ratio;
      _upperBound;
      constructor(ratio = 0) {
        this._ratio = this._normalize(ratio);
        this._upperBound = Math.floor(this._ratio * 4294967295);
      }
      shouldSample(context2, traceId) {
        return {
          decision: (0, api_1.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? Sampler_1.SamplingDecision.RECORD_AND_SAMPLED : Sampler_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return `TraceIdRatioBased{${this._ratio}}`;
      }
      _normalize(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio))
          return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      }
      _accumulate(traceId) {
        let accumulation = 0;
        for (let i = 0; i < traceId.length / 8; i++) {
          const pos = i * 8;
          const part = parseInt(traceId.slice(pos, pos + 8), 16);
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      }
    };
    exports.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/config.js
var require_config = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildSamplerFromEnv = exports.loadDefaultConfig = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src4();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    var ParentBasedSampler_1 = require_ParentBasedSampler();
    var TraceIdRatioBasedSampler_1 = require_TraceIdRatioBasedSampler();
    var TracesSamplerValues;
    (function(TracesSamplerValues2) {
      TracesSamplerValues2["AlwaysOff"] = "always_off";
      TracesSamplerValues2["AlwaysOn"] = "always_on";
      TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
      TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
      TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
      TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
    })(TracesSamplerValues || (TracesSamplerValues = {}));
    var DEFAULT_RATIO = 1;
    function loadDefaultConfig() {
      return {
        sampler: buildSamplerFromEnv(),
        forceFlushTimeoutMillis: 3e4,
        generalLimits: {
          attributeValueLengthLimit: (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
          attributeCountLimit: (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128
        },
        spanLimits: {
          attributeValueLengthLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
          attributeCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? 128,
          linkCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_LINK_COUNT_LIMIT") ?? 128,
          eventCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_EVENT_COUNT_LIMIT") ?? 128,
          attributePerEventCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT") ?? 128,
          attributePerLinkCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT") ?? 128
        }
      };
    }
    exports.loadDefaultConfig = loadDefaultConfig;
    function buildSamplerFromEnv() {
      const sampler = (0, core_1.getStringFromEnv)("OTEL_TRACES_SAMPLER") ?? TracesSamplerValues.ParentBasedAlwaysOn;
      switch (sampler) {
        case TracesSamplerValues.AlwaysOn:
          return new AlwaysOnSampler_1.AlwaysOnSampler();
        case TracesSamplerValues.AlwaysOff:
          return new AlwaysOffSampler_1.AlwaysOffSampler();
        case TracesSamplerValues.ParentBasedAlwaysOn:
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOnSampler_1.AlwaysOnSampler()
          });
        case TracesSamplerValues.ParentBasedAlwaysOff:
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOffSampler_1.AlwaysOffSampler()
          });
        case TracesSamplerValues.TraceIdRatio:
          return new TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv());
        case TracesSamplerValues.ParentBasedTraceIdRatio:
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv())
          });
        default:
          api_1.diag.error(`OTEL_TRACES_SAMPLER value "${sampler}" invalid, defaulting to "${TracesSamplerValues.ParentBasedAlwaysOn}".`);
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOnSampler_1.AlwaysOnSampler()
          });
      }
    }
    exports.buildSamplerFromEnv = buildSamplerFromEnv;
    function getSamplerProbabilityFromEnv() {
      const probability = (0, core_1.getNumberFromEnv)("OTEL_TRACES_SAMPLER_ARG");
      if (probability == null) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      if (probability < 0 || probability > 1) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${probability} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      return probability;
    }
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js
var require_utility = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reconfigureLimits = exports.mergeConfig = exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT = void 0;
    var config_1 = require_config();
    var core_1 = require_src4();
    exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
    exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
    function mergeConfig(userConfig) {
      const perInstanceDefaults = {
        sampler: (0, config_1.buildSamplerFromEnv)()
      };
      const DEFAULT_CONFIG = (0, config_1.loadDefaultConfig)();
      const target = Object.assign({}, DEFAULT_CONFIG, perInstanceDefaults, userConfig);
      target.generalLimits = Object.assign({}, DEFAULT_CONFIG.generalLimits, userConfig.generalLimits || {});
      target.spanLimits = Object.assign({}, DEFAULT_CONFIG.spanLimits, userConfig.spanLimits || {});
      return target;
    }
    exports.mergeConfig = mergeConfig;
    function reconfigureLimits(userConfig) {
      const spanLimits = Object.assign({}, userConfig.spanLimits);
      spanLimits.attributeCountLimit = userConfig.spanLimits?.attributeCountLimit ?? userConfig.generalLimits?.attributeCountLimit ?? (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT;
      spanLimits.attributeValueLengthLimit = userConfig.spanLimits?.attributeValueLengthLimit ?? userConfig.generalLimits?.attributeValueLengthLimit ?? (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
      return Object.assign({}, userConfig, { spanLimits });
    }
    exports.reconfigureLimits = reconfigureLimits;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.js
var require_BatchSpanProcessorBase = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchSpanProcessorBase = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src4();
    var BatchSpanProcessorBase = class {
      _maxExportBatchSize;
      _maxQueueSize;
      _scheduledDelayMillis;
      _exportTimeoutMillis;
      _exporter;
      _isExporting = false;
      _finishedSpans = [];
      _timer;
      _shutdownOnce;
      _droppedSpansCount = 0;
      constructor(exporter, config) {
        this._exporter = exporter;
        this._maxExportBatchSize = typeof config?.maxExportBatchSize === "number" ? config.maxExportBatchSize : (0, core_1.getNumberFromEnv)("OTEL_BSP_MAX_EXPORT_BATCH_SIZE") ?? 512;
        this._maxQueueSize = typeof config?.maxQueueSize === "number" ? config.maxQueueSize : (0, core_1.getNumberFromEnv)("OTEL_BSP_MAX_QUEUE_SIZE") ?? 2048;
        this._scheduledDelayMillis = typeof config?.scheduledDelayMillis === "number" ? config.scheduledDelayMillis : (0, core_1.getNumberFromEnv)("OTEL_BSP_SCHEDULE_DELAY") ?? 5e3;
        this._exportTimeoutMillis = typeof config?.exportTimeoutMillis === "number" ? config.exportTimeoutMillis : (0, core_1.getNumberFromEnv)("OTEL_BSP_EXPORT_TIMEOUT") ?? 3e4;
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
        if (this._maxExportBatchSize > this._maxQueueSize) {
          api_1.diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
          this._maxExportBatchSize = this._maxQueueSize;
        }
      }
      forceFlush() {
        if (this._shutdownOnce.isCalled) {
          return this._shutdownOnce.promise;
        }
        return this._flushAll();
      }
      // does nothing.
      onStart(_span, _parentContext) {
      }
      onEnd(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
          return;
        }
        this._addToBuffer(span);
      }
      shutdown() {
        return this._shutdownOnce.call();
      }
      _shutdown() {
        return Promise.resolve().then(() => {
          return this.onShutdown();
        }).then(() => {
          return this._flushAll();
        }).then(() => {
          return this._exporter.shutdown();
        });
      }
      /** Add a span in the buffer. */
      _addToBuffer(span) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
          if (this._droppedSpansCount === 0) {
            api_1.diag.debug("maxQueueSize reached, dropping spans");
          }
          this._droppedSpansCount++;
          return;
        }
        if (this._droppedSpansCount > 0) {
          api_1.diag.warn(`Dropped ${this._droppedSpansCount} spans because maxQueueSize reached`);
          this._droppedSpansCount = 0;
        }
        this._finishedSpans.push(span);
        this._maybeStartTimer();
      }
      /**
       * Send all spans to the exporter respecting the batch size limit
       * This function is used only on forceFlush or shutdown,
       * for all other cases _flush should be used
       * */
      _flushAll() {
        return new Promise((resolve3, reject) => {
          const promises4 = [];
          const count = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
          for (let i = 0, j = count; i < j; i++) {
            promises4.push(this._flushOneBatch());
          }
          Promise.all(promises4).then(() => {
            resolve3();
          }).catch(reject);
        });
      }
      _flushOneBatch() {
        this._clearTimer();
        if (this._finishedSpans.length === 0) {
          return Promise.resolve();
        }
        return new Promise((resolve3, reject) => {
          const timer = setTimeout(() => {
            reject(new Error("Timeout"));
          }, this._exportTimeoutMillis);
          api_1.context.with((0, core_1.suppressTracing)(api_1.context.active()), () => {
            let spans;
            if (this._finishedSpans.length <= this._maxExportBatchSize) {
              spans = this._finishedSpans;
              this._finishedSpans = [];
            } else {
              spans = this._finishedSpans.splice(0, this._maxExportBatchSize);
            }
            const doExport = () => this._exporter.export(spans, (result) => {
              clearTimeout(timer);
              if (result.code === core_1.ExportResultCode.SUCCESS) {
                resolve3();
              } else {
                reject(result.error ?? new Error("BatchSpanProcessor: span export failed"));
              }
            });
            let pendingResources = null;
            for (let i = 0, len = spans.length; i < len; i++) {
              const span = spans[i];
              if (span.resource.asyncAttributesPending && span.resource.waitForAsyncAttributes) {
                pendingResources ??= [];
                pendingResources.push(span.resource.waitForAsyncAttributes());
              }
            }
            if (pendingResources === null) {
              doExport();
            } else {
              Promise.all(pendingResources).then(doExport, (err) => {
                (0, core_1.globalErrorHandler)(err);
                reject(err);
              });
            }
          });
        });
      }
      _maybeStartTimer() {
        if (this._isExporting)
          return;
        const flush2 = () => {
          this._isExporting = true;
          this._flushOneBatch().finally(() => {
            this._isExporting = false;
            if (this._finishedSpans.length > 0) {
              this._clearTimer();
              this._maybeStartTimer();
            }
          }).catch((e) => {
            this._isExporting = false;
            (0, core_1.globalErrorHandler)(e);
          });
        };
        if (this._finishedSpans.length >= this._maxExportBatchSize) {
          return flush2();
        }
        if (this._timer !== void 0)
          return;
        this._timer = setTimeout(() => flush2(), this._scheduledDelayMillis);
        if (typeof this._timer !== "number") {
          this._timer.unref();
        }
      }
      _clearTimer() {
        if (this._timer !== void 0) {
          clearTimeout(this._timer);
          this._timer = void 0;
        }
      }
    };
    exports.BatchSpanProcessorBase = BatchSpanProcessorBase;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.js
var require_BatchSpanProcessor = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchSpanProcessor = void 0;
    var BatchSpanProcessorBase_1 = require_BatchSpanProcessorBase();
    var BatchSpanProcessor = class extends BatchSpanProcessorBase_1.BatchSpanProcessorBase {
      onShutdown() {
      }
    };
    exports.BatchSpanProcessor = BatchSpanProcessor;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.js
var require_RandomIdGenerator = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = void 0;
    var SPAN_ID_BYTES = 8;
    var TRACE_ID_BYTES = 16;
    var RandomIdGenerator = class {
      /**
       * Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
       * characters corresponding to 128 bits.
       */
      generateTraceId = getIdGenerator(TRACE_ID_BYTES);
      /**
       * Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
       * characters corresponding to 64 bits.
       */
      generateSpanId = getIdGenerator(SPAN_ID_BYTES);
    };
    exports.RandomIdGenerator = RandomIdGenerator;
    var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
    function getIdGenerator(bytes) {
      return function generateId() {
        for (let i = 0; i < bytes / 4; i++) {
          SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
        }
        for (let i = 0; i < bytes; i++) {
          if (SHARED_BUFFER[i] > 0) {
            break;
          } else if (i === bytes - 1) {
            SHARED_BUFFER[bytes - 1] = 1;
          }
        }
        return SHARED_BUFFER.toString("hex", 0, bytes);
      };
    }
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.js
var require_node6 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = exports.BatchSpanProcessor = void 0;
    var BatchSpanProcessor_1 = require_BatchSpanProcessor();
    Object.defineProperty(exports, "BatchSpanProcessor", { enumerable: true, get: function() {
      return BatchSpanProcessor_1.BatchSpanProcessor;
    } });
    var RandomIdGenerator_1 = require_RandomIdGenerator();
    Object.defineProperty(exports, "RandomIdGenerator", { enumerable: true, get: function() {
      return RandomIdGenerator_1.RandomIdGenerator;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.js
var require_platform5 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = exports.BatchSpanProcessor = void 0;
    var node_1 = require_node6();
    Object.defineProperty(exports, "BatchSpanProcessor", { enumerable: true, get: function() {
      return node_1.BatchSpanProcessor;
    } });
    Object.defineProperty(exports, "RandomIdGenerator", { enumerable: true, get: function() {
      return node_1.RandomIdGenerator;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.js
var require_Tracer = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tracer = void 0;
    var api = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src4();
    var Span_1 = require_Span();
    var utility_1 = require_utility();
    var platform_1 = require_platform5();
    var Tracer = class {
      _sampler;
      _generalLimits;
      _spanLimits;
      _idGenerator;
      instrumentationScope;
      _resource;
      _spanProcessor;
      /**
       * Constructs a new Tracer instance.
       */
      constructor(instrumentationScope, config, resource, spanProcessor) {
        const localConfig = (0, utility_1.mergeConfig)(config);
        this._sampler = localConfig.sampler;
        this._generalLimits = localConfig.generalLimits;
        this._spanLimits = localConfig.spanLimits;
        this._idGenerator = config.idGenerator || new platform_1.RandomIdGenerator();
        this._resource = resource;
        this._spanProcessor = spanProcessor;
        this.instrumentationScope = instrumentationScope;
      }
      /**
       * Starts a new Span or returns the default NoopSpan based on the sampling
       * decision.
       */
      startSpan(name, options = {}, context2 = api.context.active()) {
        if (options.root) {
          context2 = api.trace.deleteSpan(context2);
        }
        const parentSpan = api.trace.getSpan(context2);
        if ((0, core_1.isTracingSuppressed)(context2)) {
          api.diag.debug("Instrumentation suppressed, returning Noop Span");
          const nonRecordingSpan = api.trace.wrapSpanContext(api.INVALID_SPAN_CONTEXT);
          return nonRecordingSpan;
        }
        const parentSpanContext = parentSpan?.spanContext();
        const spanId = this._idGenerator.generateSpanId();
        let validParentSpanContext;
        let traceId;
        let traceState;
        if (!parentSpanContext || !api.trace.isSpanContextValid(parentSpanContext)) {
          traceId = this._idGenerator.generateTraceId();
        } else {
          traceId = parentSpanContext.traceId;
          traceState = parentSpanContext.traceState;
          validParentSpanContext = parentSpanContext;
        }
        const spanKind = options.kind ?? api.SpanKind.INTERNAL;
        const links = (options.links ?? []).map((link) => {
          return {
            context: link.context,
            attributes: (0, core_1.sanitizeAttributes)(link.attributes)
          };
        });
        const attributes2 = (0, core_1.sanitizeAttributes)(options.attributes);
        const samplingResult = this._sampler.shouldSample(context2, traceId, name, spanKind, attributes2, links);
        traceState = samplingResult.traceState ?? traceState;
        const traceFlags = samplingResult.decision === api.SamplingDecision.RECORD_AND_SAMPLED ? api.TraceFlags.SAMPLED : api.TraceFlags.NONE;
        const spanContext = { traceId, spanId, traceFlags, traceState };
        if (samplingResult.decision === api.SamplingDecision.NOT_RECORD) {
          api.diag.debug("Recording is off, propagating context in a non-recording span");
          const nonRecordingSpan = api.trace.wrapSpanContext(spanContext);
          return nonRecordingSpan;
        }
        const initAttributes = (0, core_1.sanitizeAttributes)(Object.assign(attributes2, samplingResult.attributes));
        const span = new Span_1.SpanImpl({
          resource: this._resource,
          scope: this.instrumentationScope,
          context: context2,
          spanContext,
          name,
          kind: spanKind,
          links,
          parentSpanContext: validParentSpanContext,
          attributes: initAttributes,
          startTime: options.startTime,
          spanProcessor: this._spanProcessor,
          spanLimits: this._spanLimits
        });
        return span;
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx ?? api.context.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = api.trace.setSpan(parentContext, span);
        return api.context.with(contextWithSpanSet, fn, void 0, span);
      }
      /** Returns the active {@link GeneralLimits}. */
      getGeneralLimits() {
        return this._generalLimits;
      }
      /** Returns the active {@link SpanLimits}. */
      getSpanLimits() {
        return this._spanLimits;
      }
    };
    exports.Tracer = Tracer;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/MultiSpanProcessor.js
var require_MultiSpanProcessor = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/MultiSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiSpanProcessor = void 0;
    var core_1 = require_src4();
    var MultiSpanProcessor = class {
      _spanProcessors;
      constructor(spanProcessors) {
        this._spanProcessors = spanProcessors;
      }
      forceFlush() {
        const promises4 = [];
        for (const spanProcessor of this._spanProcessors) {
          promises4.push(spanProcessor.forceFlush());
        }
        return new Promise((resolve3) => {
          Promise.all(promises4).then(() => {
            resolve3();
          }).catch((error3) => {
            (0, core_1.globalErrorHandler)(error3 || new Error("MultiSpanProcessor: forceFlush failed"));
            resolve3();
          });
        });
      }
      onStart(span, context2) {
        for (const spanProcessor of this._spanProcessors) {
          spanProcessor.onStart(span, context2);
        }
      }
      onEnding(span) {
        for (const spanProcessor of this._spanProcessors) {
          if (spanProcessor.onEnding) {
            spanProcessor.onEnding(span);
          }
        }
      }
      onEnd(span) {
        for (const spanProcessor of this._spanProcessors) {
          spanProcessor.onEnd(span);
        }
      }
      shutdown() {
        const promises4 = [];
        for (const spanProcessor of this._spanProcessors) {
          promises4.push(spanProcessor.shutdown());
        }
        return new Promise((resolve3, reject) => {
          Promise.all(promises4).then(() => {
            resolve3();
          }, reject);
        });
      }
    };
    exports.MultiSpanProcessor = MultiSpanProcessor;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.js
var require_BasicTracerProvider = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BasicTracerProvider = exports.ForceFlushState = void 0;
    var core_1 = require_src4();
    var resources_1 = require_src5();
    var Tracer_1 = require_Tracer();
    var config_1 = require_config();
    var MultiSpanProcessor_1 = require_MultiSpanProcessor();
    var utility_1 = require_utility();
    var ForceFlushState;
    (function(ForceFlushState2) {
      ForceFlushState2[ForceFlushState2["resolved"] = 0] = "resolved";
      ForceFlushState2[ForceFlushState2["timeout"] = 1] = "timeout";
      ForceFlushState2[ForceFlushState2["error"] = 2] = "error";
      ForceFlushState2[ForceFlushState2["unresolved"] = 3] = "unresolved";
    })(ForceFlushState = exports.ForceFlushState || (exports.ForceFlushState = {}));
    var BasicTracerProvider2 = class {
      _config;
      _tracers = /* @__PURE__ */ new Map();
      _resource;
      _activeSpanProcessor;
      constructor(config = {}) {
        const mergedConfig = (0, core_1.merge)({}, (0, config_1.loadDefaultConfig)(), (0, utility_1.reconfigureLimits)(config));
        this._resource = mergedConfig.resource ?? (0, resources_1.defaultResource)();
        this._config = Object.assign({}, mergedConfig, {
          resource: this._resource
        });
        const spanProcessors = [];
        if (config.spanProcessors?.length) {
          spanProcessors.push(...config.spanProcessors);
        }
        this._activeSpanProcessor = new MultiSpanProcessor_1.MultiSpanProcessor(spanProcessors);
      }
      getTracer(name, version2, options) {
        const key = `${name}@${version2 || ""}:${options?.schemaUrl || ""}`;
        if (!this._tracers.has(key)) {
          this._tracers.set(key, new Tracer_1.Tracer({ name, version: version2, schemaUrl: options?.schemaUrl }, this._config, this._resource, this._activeSpanProcessor));
        }
        return this._tracers.get(key);
      }
      forceFlush() {
        const timeout = this._config.forceFlushTimeoutMillis;
        const promises4 = this._activeSpanProcessor["_spanProcessors"].map((spanProcessor) => {
          return new Promise((resolve3) => {
            let state;
            const timeoutInterval = setTimeout(() => {
              resolve3(new Error(`Span processor did not completed within timeout period of ${timeout} ms`));
              state = ForceFlushState.timeout;
            }, timeout);
            spanProcessor.forceFlush().then(() => {
              clearTimeout(timeoutInterval);
              if (state !== ForceFlushState.timeout) {
                state = ForceFlushState.resolved;
                resolve3(state);
              }
            }).catch((error3) => {
              clearTimeout(timeoutInterval);
              state = ForceFlushState.error;
              resolve3(error3);
            });
          });
        });
        return new Promise((resolve3, reject) => {
          Promise.all(promises4).then((results) => {
            const errors = results.filter((result) => result !== ForceFlushState.resolved);
            if (errors.length > 0) {
              reject(errors);
            } else {
              resolve3();
            }
          }).catch((error3) => reject([error3]));
        });
      }
      shutdown() {
        return this._activeSpanProcessor.shutdown();
      }
    };
    exports.BasicTracerProvider = BasicTracerProvider2;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.js
var require_ConsoleSpanExporter = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConsoleSpanExporter = void 0;
    var core_1 = require_src4();
    var ConsoleSpanExporter = class {
      /**
       * Export spans.
       * @param spans
       * @param resultCallback
       */
      export(spans, resultCallback) {
        return this._sendSpans(spans, resultCallback);
      }
      /**
       * Shutdown the exporter.
       */
      shutdown() {
        this._sendSpans([]);
        return this.forceFlush();
      }
      /**
       * Exports any pending spans in exporter
       */
      forceFlush() {
        return Promise.resolve();
      }
      /**
       * converts span info into more readable format
       * @param span
       */
      _exportInfo(span) {
        return {
          resource: {
            attributes: span.resource.attributes
          },
          instrumentationScope: span.instrumentationScope,
          traceId: span.spanContext().traceId,
          parentSpanContext: span.parentSpanContext,
          traceState: span.spanContext().traceState?.serialize(),
          name: span.name,
          id: span.spanContext().spanId,
          kind: span.kind,
          timestamp: (0, core_1.hrTimeToMicroseconds)(span.startTime),
          duration: (0, core_1.hrTimeToMicroseconds)(span.duration),
          attributes: span.attributes,
          status: span.status,
          events: span.events,
          links: span.links
        };
      }
      /**
       * Showing spans in console
       * @param spans
       * @param done
       */
      _sendSpans(spans, done) {
        for (const span of spans) {
          console.dir(this._exportInfo(span), { depth: 3 });
        }
        if (done) {
          return done({ code: core_1.ExportResultCode.SUCCESS });
        }
      }
    };
    exports.ConsoleSpanExporter = ConsoleSpanExporter;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.js
var require_InMemorySpanExporter = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InMemorySpanExporter = void 0;
    var core_1 = require_src4();
    var InMemorySpanExporter = class {
      _finishedSpans = [];
      /**
       * Indicates if the exporter has been "shutdown."
       * When false, exported spans will not be stored in-memory.
       */
      _stopped = false;
      export(spans, resultCallback) {
        if (this._stopped)
          return resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Exporter has been stopped")
          });
        this._finishedSpans.push(...spans);
        setTimeout(() => resultCallback({ code: core_1.ExportResultCode.SUCCESS }), 0);
      }
      shutdown() {
        this._stopped = true;
        this._finishedSpans = [];
        return this.forceFlush();
      }
      /**
       * Exports any pending spans in the exporter
       */
      forceFlush() {
        return Promise.resolve();
      }
      reset() {
        this._finishedSpans = [];
      }
      getFinishedSpans() {
        return this._finishedSpans;
      }
    };
    exports.InMemorySpanExporter = InMemorySpanExporter;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.js
var require_SimpleSpanProcessor = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleSpanProcessor = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src4();
    var SimpleSpanProcessor = class {
      _exporter;
      _shutdownOnce;
      _pendingExports;
      constructor(exporter) {
        this._exporter = exporter;
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
        this._pendingExports = /* @__PURE__ */ new Set();
      }
      async forceFlush() {
        await Promise.all(Array.from(this._pendingExports));
        if (this._exporter.forceFlush) {
          await this._exporter.forceFlush();
        }
      }
      onStart(_span, _parentContext) {
      }
      onEnd(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
          return;
        }
        const pendingExport = this._doExport(span).catch((err) => (0, core_1.globalErrorHandler)(err));
        this._pendingExports.add(pendingExport);
        void pendingExport.finally(() => this._pendingExports.delete(pendingExport));
      }
      async _doExport(span) {
        if (span.resource.asyncAttributesPending) {
          await span.resource.waitForAsyncAttributes?.();
        }
        const result = await core_1.internal._export(this._exporter, [span]);
        if (result.code !== core_1.ExportResultCode.SUCCESS) {
          throw result.error ?? new Error(`SimpleSpanProcessor: span export failed (status ${result})`);
        }
      }
      shutdown() {
        return this._shutdownOnce.call();
      }
      _shutdown() {
        return this._exporter.shutdown();
      }
    };
    exports.SimpleSpanProcessor = SimpleSpanProcessor;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.js
var require_NoopSpanProcessor = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopSpanProcessor = void 0;
    var NoopSpanProcessor = class {
      onStart(_span, _context) {
      }
      onEnd(_span) {
      }
      shutdown() {
        return Promise.resolve();
      }
      forceFlush() {
        return Promise.resolve();
      }
    };
    exports.NoopSpanProcessor = NoopSpanProcessor;
  }
});

// node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/index.js
var require_src6 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+sdk-trace-base@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/sdk-trace-base/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamplingDecision = exports.TraceIdRatioBasedSampler = exports.ParentBasedSampler = exports.AlwaysOnSampler = exports.AlwaysOffSampler = exports.NoopSpanProcessor = exports.SimpleSpanProcessor = exports.InMemorySpanExporter = exports.ConsoleSpanExporter = exports.RandomIdGenerator = exports.BatchSpanProcessor = exports.BasicTracerProvider = void 0;
    var BasicTracerProvider_1 = require_BasicTracerProvider();
    Object.defineProperty(exports, "BasicTracerProvider", { enumerable: true, get: function() {
      return BasicTracerProvider_1.BasicTracerProvider;
    } });
    var platform_1 = require_platform5();
    Object.defineProperty(exports, "BatchSpanProcessor", { enumerable: true, get: function() {
      return platform_1.BatchSpanProcessor;
    } });
    Object.defineProperty(exports, "RandomIdGenerator", { enumerable: true, get: function() {
      return platform_1.RandomIdGenerator;
    } });
    var ConsoleSpanExporter_1 = require_ConsoleSpanExporter();
    Object.defineProperty(exports, "ConsoleSpanExporter", { enumerable: true, get: function() {
      return ConsoleSpanExporter_1.ConsoleSpanExporter;
    } });
    var InMemorySpanExporter_1 = require_InMemorySpanExporter();
    Object.defineProperty(exports, "InMemorySpanExporter", { enumerable: true, get: function() {
      return InMemorySpanExporter_1.InMemorySpanExporter;
    } });
    var SimpleSpanProcessor_1 = require_SimpleSpanProcessor();
    Object.defineProperty(exports, "SimpleSpanProcessor", { enumerable: true, get: function() {
      return SimpleSpanProcessor_1.SimpleSpanProcessor;
    } });
    var NoopSpanProcessor_1 = require_NoopSpanProcessor();
    Object.defineProperty(exports, "NoopSpanProcessor", { enumerable: true, get: function() {
      return NoopSpanProcessor_1.NoopSpanProcessor;
    } });
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    Object.defineProperty(exports, "AlwaysOffSampler", { enumerable: true, get: function() {
      return AlwaysOffSampler_1.AlwaysOffSampler;
    } });
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    Object.defineProperty(exports, "AlwaysOnSampler", { enumerable: true, get: function() {
      return AlwaysOnSampler_1.AlwaysOnSampler;
    } });
    var ParentBasedSampler_1 = require_ParentBasedSampler();
    Object.defineProperty(exports, "ParentBasedSampler", { enumerable: true, get: function() {
      return ParentBasedSampler_1.ParentBasedSampler;
    } });
    var TraceIdRatioBasedSampler_1 = require_TraceIdRatioBasedSampler();
    Object.defineProperty(exports, "TraceIdRatioBasedSampler", { enumerable: true, get: function() {
      return TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler;
    } });
    var Sampler_1 = require_Sampler();
    Object.defineProperty(exports, "SamplingDecision", { enumerable: true, get: function() {
      return Sampler_1.SamplingDecision;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+context-async-hooks@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/AbstractAsyncHooksContextManager.js
var require_AbstractAsyncHooksContextManager = __commonJS({
  "node_modules/.pnpm/@opentelemetry+context-async-hooks@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/AbstractAsyncHooksContextManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractAsyncHooksContextManager = void 0;
    var events_1 = __require("events");
    var ADD_LISTENER_METHODS = [
      "addListener",
      "on",
      "once",
      "prependListener",
      "prependOnceListener"
    ];
    var AbstractAsyncHooksContextManager = class {
      /**
       * Binds a the certain context or the active one to the target function and then returns the target
       * @param context A context (span) to be bind to target
       * @param target a function or event emitter. When target or one of its callbacks is called,
       *  the provided context will be used as the active context for the duration of the call.
       */
      bind(context2, target) {
        if (target instanceof events_1.EventEmitter) {
          return this._bindEventEmitter(context2, target);
        }
        if (typeof target === "function") {
          return this._bindFunction(context2, target);
        }
        return target;
      }
      _bindFunction(context2, target) {
        const manager = this;
        const contextWrapper = function(...args) {
          return manager.with(context2, () => target.apply(this, args));
        };
        Object.defineProperty(contextWrapper, "length", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: target.length
        });
        return contextWrapper;
      }
      /**
       * By default, EventEmitter call their callback with their context, which we do
       * not want, instead we will bind a specific context to all callbacks that
       * go through it.
       * @param context the context we want to bind
       * @param ee EventEmitter an instance of EventEmitter to patch
       */
      _bindEventEmitter(context2, ee) {
        const map = this._getPatchMap(ee);
        if (map !== void 0)
          return ee;
        this._createPatchMap(ee);
        ADD_LISTENER_METHODS.forEach((methodName) => {
          if (ee[methodName] === void 0)
            return;
          ee[methodName] = this._patchAddListener(ee, ee[methodName], context2);
        });
        if (typeof ee.removeListener === "function") {
          ee.removeListener = this._patchRemoveListener(ee, ee.removeListener);
        }
        if (typeof ee.off === "function") {
          ee.off = this._patchRemoveListener(ee, ee.off);
        }
        if (typeof ee.removeAllListeners === "function") {
          ee.removeAllListeners = this._patchRemoveAllListeners(ee, ee.removeAllListeners);
        }
        return ee;
      }
      /**
       * Patch methods that remove a given listener so that we match the "patched"
       * version of that listener (the one that propagate context).
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       */
      _patchRemoveListener(ee, original) {
        const contextManager = this;
        return function(event, listener) {
          const events = contextManager._getPatchMap(ee)?.[event];
          if (events === void 0) {
            return original.call(this, event, listener);
          }
          const patchedListener = events.get(listener);
          return original.call(this, event, patchedListener || listener);
        };
      }
      /**
       * Patch methods that remove all listeners so we remove our
       * internal references for a given event.
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       */
      _patchRemoveAllListeners(ee, original) {
        const contextManager = this;
        return function(event) {
          const map = contextManager._getPatchMap(ee);
          if (map !== void 0) {
            if (arguments.length === 0) {
              contextManager._createPatchMap(ee);
            } else if (map[event] !== void 0) {
              delete map[event];
            }
          }
          return original.apply(this, arguments);
        };
      }
      /**
       * Patch methods on an event emitter instance that can add listeners so we
       * can force them to propagate a given context.
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       * @param [context] context to propagate when calling listeners
       */
      _patchAddListener(ee, original, context2) {
        const contextManager = this;
        return function(event, listener) {
          if (contextManager._wrapped) {
            return original.call(this, event, listener);
          }
          let map = contextManager._getPatchMap(ee);
          if (map === void 0) {
            map = contextManager._createPatchMap(ee);
          }
          let listeners = map[event];
          if (listeners === void 0) {
            listeners = /* @__PURE__ */ new WeakMap();
            map[event] = listeners;
          }
          const patchedListener = contextManager.bind(context2, listener);
          listeners.set(listener, patchedListener);
          contextManager._wrapped = true;
          try {
            return original.call(this, event, patchedListener);
          } finally {
            contextManager._wrapped = false;
          }
        };
      }
      _createPatchMap(ee) {
        const map = /* @__PURE__ */ Object.create(null);
        ee[this._kOtListeners] = map;
        return map;
      }
      _getPatchMap(ee) {
        return ee[this._kOtListeners];
      }
      _kOtListeners = Symbol("OtListeners");
      _wrapped = false;
    };
    exports.AbstractAsyncHooksContextManager = AbstractAsyncHooksContextManager;
  }
});

// node_modules/.pnpm/@opentelemetry+context-async-hooks@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/AsyncHooksContextManager.js
var require_AsyncHooksContextManager = __commonJS({
  "node_modules/.pnpm/@opentelemetry+context-async-hooks@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/AsyncHooksContextManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncHooksContextManager = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var asyncHooks = __require("async_hooks");
    var AbstractAsyncHooksContextManager_1 = require_AbstractAsyncHooksContextManager();
    var AsyncHooksContextManager = class extends AbstractAsyncHooksContextManager_1.AbstractAsyncHooksContextManager {
      _asyncHook;
      _contexts = /* @__PURE__ */ new Map();
      _stack = [];
      constructor() {
        super();
        this._asyncHook = asyncHooks.createHook({
          init: this._init.bind(this),
          before: this._before.bind(this),
          after: this._after.bind(this),
          destroy: this._destroy.bind(this),
          promiseResolve: this._destroy.bind(this)
        });
      }
      active() {
        return this._stack[this._stack.length - 1] ?? api_1.ROOT_CONTEXT;
      }
      with(context2, fn, thisArg, ...args) {
        this._enterContext(context2);
        try {
          return fn.call(thisArg, ...args);
        } finally {
          this._exitContext();
        }
      }
      enable() {
        this._asyncHook.enable();
        return this;
      }
      disable() {
        this._asyncHook.disable();
        this._contexts.clear();
        this._stack = [];
        return this;
      }
      /**
       * Init hook will be called when userland create a async context, setting the
       * context as the current one if it exist.
       * @param uid id of the async context
       * @param type the resource type
       */
      _init(uid, type) {
        if (type === "TIMERWRAP")
          return;
        const context2 = this._stack[this._stack.length - 1];
        if (context2 !== void 0) {
          this._contexts.set(uid, context2);
        }
      }
      /**
       * Destroy hook will be called when a given context is no longer used so we can
       * remove its attached context.
       * @param uid uid of the async context
       */
      _destroy(uid) {
        this._contexts.delete(uid);
      }
      /**
       * Before hook is called just before executing a async context.
       * @param uid uid of the async context
       */
      _before(uid) {
        const context2 = this._contexts.get(uid);
        if (context2 !== void 0) {
          this._enterContext(context2);
        }
      }
      /**
       * After hook is called just after completing the execution of a async context.
       */
      _after() {
        this._exitContext();
      }
      /**
       * Set the given context as active
       */
      _enterContext(context2) {
        this._stack.push(context2);
      }
      /**
       * Remove the context at the root of the stack
       */
      _exitContext() {
        this._stack.pop();
      }
    };
    exports.AsyncHooksContextManager = AsyncHooksContextManager;
  }
});

// node_modules/.pnpm/@opentelemetry+context-async-hooks@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/AsyncLocalStorageContextManager.js
var require_AsyncLocalStorageContextManager = __commonJS({
  "node_modules/.pnpm/@opentelemetry+context-async-hooks@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/AsyncLocalStorageContextManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncLocalStorageContextManager = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var async_hooks_1 = __require("async_hooks");
    var AbstractAsyncHooksContextManager_1 = require_AbstractAsyncHooksContextManager();
    var AsyncLocalStorageContextManager2 = class extends AbstractAsyncHooksContextManager_1.AbstractAsyncHooksContextManager {
      _asyncLocalStorage;
      constructor() {
        super();
        this._asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
      }
      active() {
        return this._asyncLocalStorage.getStore() ?? api_1.ROOT_CONTEXT;
      }
      with(context2, fn, thisArg, ...args) {
        const cb = thisArg == null ? fn : fn.bind(thisArg);
        return this._asyncLocalStorage.run(context2, cb, ...args);
      }
      enable() {
        return this;
      }
      disable() {
        this._asyncLocalStorage.disable();
        return this;
      }
    };
    exports.AsyncLocalStorageContextManager = AsyncLocalStorageContextManager2;
  }
});

// node_modules/.pnpm/@opentelemetry+context-async-hooks@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/index.js
var require_src7 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+context-async-hooks@2.4.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncLocalStorageContextManager = exports.AsyncHooksContextManager = void 0;
    var AsyncHooksContextManager_1 = require_AsyncHooksContextManager();
    Object.defineProperty(exports, "AsyncHooksContextManager", { enumerable: true, get: function() {
      return AsyncHooksContextManager_1.AsyncHooksContextManager;
    } });
    var AsyncLocalStorageContextManager_1 = require_AsyncLocalStorageContextManager();
    Object.defineProperty(exports, "AsyncLocalStorageContextManager", { enumerable: true, get: function() {
      return AsyncLocalStorageContextManager_1.AsyncLocalStorageContextManager;
    } });
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation-undici@0.19.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation-undici/build/src/version.js
var require_version2 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation-undici@0.19.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation-undici/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
    exports.PACKAGE_VERSION = "0.19.0";
    exports.PACKAGE_NAME = "@opentelemetry/instrumentation-undici";
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation-undici@0.19.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation-undici/build/src/undici.js
var require_undici = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation-undici@0.19.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation-undici/build/src/undici.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UndiciInstrumentation = void 0;
    var diagch2 = __require("diagnostics_channel");
    var url_1 = __require("url");
    var instrumentation_1 = require_src3();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src4();
    var semantic_conventions_1 = (init_esm2(), __toCommonJS(esm_exports2));
    var version_1 = require_version2();
    var UndiciInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      _recordFromReq = /* @__PURE__ */ new WeakMap();
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
      }
      // No need to instrument files/modules
      init() {
        return void 0;
      }
      disable() {
        super.disable();
        this._channelSubs.forEach((sub) => sub.unsubscribe());
        this._channelSubs.length = 0;
      }
      enable() {
        super.enable();
        this._channelSubs = this._channelSubs || [];
        if (this._channelSubs.length > 0) {
          return;
        }
        this.subscribeToChannel("undici:request:create", this.onRequestCreated.bind(this));
        this.subscribeToChannel("undici:client:sendHeaders", this.onRequestHeaders.bind(this));
        this.subscribeToChannel("undici:request:headers", this.onResponseHeaders.bind(this));
        this.subscribeToChannel("undici:request:trailers", this.onDone.bind(this));
        this.subscribeToChannel("undici:request:error", this.onError.bind(this));
      }
      _updateMetricInstruments() {
        this._httpClientDurationHistogram = this.meter.createHistogram(semantic_conventions_1.METRIC_HTTP_CLIENT_REQUEST_DURATION, {
          description: "Measures the duration of outbound HTTP requests.",
          unit: "s",
          valueType: api_1.ValueType.DOUBLE,
          advice: {
            explicitBucketBoundaries: [
              5e-3,
              0.01,
              0.025,
              0.05,
              0.075,
              0.1,
              0.25,
              0.5,
              0.75,
              1,
              2.5,
              5,
              7.5,
              10
            ]
          }
        });
      }
      subscribeToChannel(diagnosticChannel, onMessage) {
        const [major2, minor] = process.version.replace("v", "").split(".").map((n) => Number(n));
        const useNewSubscribe = major2 > 18 || major2 === 18 && minor >= 19;
        let unsubscribe2;
        if (useNewSubscribe) {
          diagch2.subscribe?.(diagnosticChannel, onMessage);
          unsubscribe2 = () => diagch2.unsubscribe?.(diagnosticChannel, onMessage);
        } else {
          const channel3 = diagch2.channel(diagnosticChannel);
          channel3.subscribe(onMessage);
          unsubscribe2 = () => channel3.unsubscribe(onMessage);
        }
        this._channelSubs.push({
          name: diagnosticChannel,
          unsubscribe: unsubscribe2
        });
      }
      parseRequestHeaders(request) {
        const result = /* @__PURE__ */ new Map();
        if (Array.isArray(request.headers)) {
          for (let i = 0; i < request.headers.length; i += 2) {
            const key = request.headers[i];
            const value = request.headers[i + 1];
            if (typeof key === "string") {
              result.set(key.toLowerCase(), value);
            }
          }
        } else if (typeof request.headers === "string") {
          const headers = request.headers.split("\r\n");
          for (const line of headers) {
            if (!line) {
              continue;
            }
            const colonIndex = line.indexOf(":");
            if (colonIndex === -1) {
              continue;
            }
            const key = line.substring(0, colonIndex).toLowerCase();
            const value = line.substring(colonIndex + 1).trim();
            const allValues = result.get(key);
            if (allValues && Array.isArray(allValues)) {
              allValues.push(value);
            } else if (allValues) {
              result.set(key, [allValues, value]);
            } else {
              result.set(key, value);
            }
          }
        }
        return result;
      }
      // This is the 1st message we receive for each request (fired after request creation). Here we will
      // create the span and populate some atttributes, then link the span to the request for further
      // span processing
      onRequestCreated({ request }) {
        const config = this.getConfig();
        const enabled = config.enabled !== false;
        const shouldIgnoreReq = (0, instrumentation_1.safeExecuteInTheMiddle)(() => !enabled || request.method === "CONNECT" || config.ignoreRequestHook?.(request), (e) => e && this._diag.error("caught ignoreRequestHook error: ", e), true);
        if (shouldIgnoreReq) {
          return;
        }
        const startTime = (0, core_1.hrTime)();
        let requestUrl;
        try {
          requestUrl = new url_1.URL(request.path, request.origin);
        } catch (err) {
          this._diag.warn("could not determine url.full:", err);
          return;
        }
        const urlScheme = requestUrl.protocol.replace(":", "");
        const requestMethod = this.getRequestMethod(request.method);
        const attributes2 = {
          [semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD]: requestMethod,
          [semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD_ORIGINAL]: request.method,
          [semantic_conventions_1.ATTR_URL_FULL]: requestUrl.toString(),
          [semantic_conventions_1.ATTR_URL_PATH]: requestUrl.pathname,
          [semantic_conventions_1.ATTR_URL_QUERY]: requestUrl.search,
          [semantic_conventions_1.ATTR_URL_SCHEME]: urlScheme
        };
        const schemePorts = { https: "443", http: "80" };
        const serverAddress = requestUrl.hostname;
        const serverPort = requestUrl.port || schemePorts[urlScheme];
        attributes2[semantic_conventions_1.ATTR_SERVER_ADDRESS] = serverAddress;
        if (serverPort && !isNaN(Number(serverPort))) {
          attributes2[semantic_conventions_1.ATTR_SERVER_PORT] = Number(serverPort);
        }
        const headersMap = this.parseRequestHeaders(request);
        const userAgentValues = headersMap.get("user-agent");
        if (userAgentValues) {
          const userAgent = Array.isArray(userAgentValues) ? userAgentValues[userAgentValues.length - 1] : userAgentValues;
          attributes2[semantic_conventions_1.ATTR_USER_AGENT_ORIGINAL] = userAgent;
        }
        const hookAttributes = (0, instrumentation_1.safeExecuteInTheMiddle)(() => config.startSpanHook?.(request), (e) => e && this._diag.error("caught startSpanHook error: ", e), true);
        if (hookAttributes) {
          Object.entries(hookAttributes).forEach(([key, val]) => {
            attributes2[key] = val;
          });
        }
        const activeCtx = api_1.context.active();
        const currentSpan = api_1.trace.getSpan(activeCtx);
        let span;
        if (config.requireParentforSpans && (!currentSpan || !api_1.trace.isSpanContextValid(currentSpan.spanContext()))) {
          span = api_1.trace.wrapSpanContext(api_1.INVALID_SPAN_CONTEXT);
        } else {
          span = this.tracer.startSpan(requestMethod === "_OTHER" ? "HTTP" : requestMethod, {
            kind: api_1.SpanKind.CLIENT,
            attributes: attributes2
          }, activeCtx);
        }
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => config.requestHook?.(span, request), (e) => e && this._diag.error("caught requestHook error: ", e), true);
        const requestContext = api_1.trace.setSpan(api_1.context.active(), span);
        const addedHeaders = {};
        api_1.propagation.inject(requestContext, addedHeaders);
        const headerEntries = Object.entries(addedHeaders);
        for (let i = 0; i < headerEntries.length; i++) {
          const [k, v] = headerEntries[i];
          if (typeof request.addHeader === "function") {
            request.addHeader(k, v);
          } else if (typeof request.headers === "string") {
            request.headers += `${k}: ${v}\r
`;
          } else if (Array.isArray(request.headers)) {
            request.headers.push(k, v);
          }
        }
        this._recordFromReq.set(request, { span, attributes: attributes2, startTime });
      }
      // This is the 2nd message we receive for each request. It is fired when connection with
      // the remote is established and about to send the first byte. Here we do have info about the
      // remote address and port so we can populate some `network.*` attributes into the span
      onRequestHeaders({ request, socket }) {
        const record = this._recordFromReq.get(request);
        if (!record) {
          return;
        }
        const config = this.getConfig();
        const { span } = record;
        const { remoteAddress, remotePort } = socket;
        const spanAttributes = {
          [semantic_conventions_1.ATTR_NETWORK_PEER_ADDRESS]: remoteAddress,
          [semantic_conventions_1.ATTR_NETWORK_PEER_PORT]: remotePort
        };
        if (config.headersToSpanAttributes?.requestHeaders) {
          const headersToAttribs = new Set(config.headersToSpanAttributes.requestHeaders.map((n) => n.toLowerCase()));
          const headersMap = this.parseRequestHeaders(request);
          for (const [name, value] of headersMap.entries()) {
            if (headersToAttribs.has(name)) {
              const attrValue = Array.isArray(value) ? value.join(", ") : value;
              spanAttributes[`http.request.header.${name}`] = attrValue;
            }
          }
        }
        span.setAttributes(spanAttributes);
      }
      // This is the 3rd message we get for each request and it's fired when the server
      // headers are received, body may not be accessible yet.
      // From the response headers we can set the status and content length
      onResponseHeaders({ request, response }) {
        const record = this._recordFromReq.get(request);
        if (!record) {
          return;
        }
        const { span, attributes: attributes2 } = record;
        const spanAttributes = {
          [semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE]: response.statusCode
        };
        const config = this.getConfig();
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => config.responseHook?.(span, { request, response }), (e) => e && this._diag.error("caught responseHook error: ", e), true);
        const headersToAttribs = /* @__PURE__ */ new Set();
        if (config.headersToSpanAttributes?.responseHeaders) {
          config.headersToSpanAttributes?.responseHeaders.forEach((name) => headersToAttribs.add(name.toLowerCase()));
        }
        for (let idx = 0; idx < response.headers.length; idx = idx + 2) {
          const name = response.headers[idx].toString().toLowerCase();
          const value = response.headers[idx + 1];
          if (headersToAttribs.has(name)) {
            spanAttributes[`http.response.header.${name}`] = value.toString();
          }
          if (name === "content-length") {
            const contentLength = Number(value.toString());
            if (!isNaN(contentLength)) {
              spanAttributes["http.response.header.content-length"] = contentLength;
            }
          }
        }
        span.setAttributes(spanAttributes);
        span.setStatus({
          code: response.statusCode >= 400 ? api_1.SpanStatusCode.ERROR : api_1.SpanStatusCode.UNSET
        });
        record.attributes = Object.assign(attributes2, spanAttributes);
      }
      // This is the last event we receive if the request went without any errors
      onDone({ request }) {
        const record = this._recordFromReq.get(request);
        if (!record) {
          return;
        }
        const { span, attributes: attributes2, startTime } = record;
        span.end();
        this._recordFromReq.delete(request);
        this.recordRequestDuration(attributes2, startTime);
      }
      // This is the event we get when something is wrong in the request like
      // - invalid options when calling `fetch` global API or any undici method for request
      // - connectivity errors such as unreachable host
      // - requests aborted through an `AbortController.signal`
      // NOTE: server errors are considered valid responses and it's the lib consumer
      // who should deal with that.
      onError({ request, error: error3 }) {
        const record = this._recordFromReq.get(request);
        if (!record) {
          return;
        }
        const { span, attributes: attributes2, startTime } = record;
        span.recordException(error3);
        span.setStatus({
          code: api_1.SpanStatusCode.ERROR,
          message: error3.message
        });
        span.end();
        this._recordFromReq.delete(request);
        attributes2[semantic_conventions_1.ATTR_ERROR_TYPE] = error3.message;
        this.recordRequestDuration(attributes2, startTime);
      }
      recordRequestDuration(attributes2, startTime) {
        const metricsAttributes = {};
        const keysToCopy = [
          semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE,
          semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD,
          semantic_conventions_1.ATTR_SERVER_ADDRESS,
          semantic_conventions_1.ATTR_SERVER_PORT,
          semantic_conventions_1.ATTR_URL_SCHEME,
          semantic_conventions_1.ATTR_ERROR_TYPE
        ];
        keysToCopy.forEach((key) => {
          if (key in attributes2) {
            metricsAttributes[key] = attributes2[key];
          }
        });
        const durationSeconds = (0, core_1.hrTimeToMilliseconds)((0, core_1.hrTimeDuration)(startTime, (0, core_1.hrTime)())) / 1e3;
        this._httpClientDurationHistogram.record(durationSeconds, metricsAttributes);
      }
      getRequestMethod(original) {
        const knownMethods = {
          CONNECT: true,
          OPTIONS: true,
          HEAD: true,
          GET: true,
          POST: true,
          PUT: true,
          PATCH: true,
          DELETE: true,
          TRACE: true
        };
        if (original.toUpperCase() in knownMethods) {
          return original.toUpperCase();
        }
        return "_OTHER";
      }
    };
    exports.UndiciInstrumentation = UndiciInstrumentation2;
  }
});

// node_modules/.pnpm/@opentelemetry+instrumentation-undici@0.19.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation-undici/build/src/index.js
var require_src8 = __commonJS({
  "node_modules/.pnpm/@opentelemetry+instrumentation-undici@0.19.0_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation-undici/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UndiciInstrumentation = void 0;
    var undici_1 = require_undici();
    Object.defineProperty(exports, "UndiciInstrumentation", { enumerable: true, get: function() {
      return undici_1.UndiciInstrumentation;
    } });
  }
});

// client-src/main.ts
import { app as app23, BrowserWindow as BrowserWindow3, ipcMain as ipcMain2 } from "electron";
import * as path from "path";

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/debug-build.js
var DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/worldwide.js
var GLOBAL_OBJ = globalThis;

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/version.js
var SDK_VERSION = "10.34.0";

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/carrier.js
function getMainCarrier() {
  getSentryCarrier(GLOBAL_OBJ);
  return GLOBAL_OBJ;
}
function getSentryCarrier(carrier) {
  const __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
  __SENTRY__.version = __SENTRY__.version || SDK_VERSION;
  return __SENTRY__[SDK_VERSION] = __SENTRY__[SDK_VERSION] || {};
}
function getGlobalSingleton(name, creator, obj = GLOBAL_OBJ) {
  const __SENTRY__ = obj.__SENTRY__ = obj.__SENTRY__ || {};
  const carrier = __SENTRY__[SDK_VERSION] = __SENTRY__[SDK_VERSION] || {};
  return carrier[name] || (carrier[name] = creator());
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js
var CONSOLE_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
  "log",
  "assert",
  "trace"
];
var PREFIX = "Sentry Logger ";
var originalConsoleMethods = {};
function consoleSandbox(callback) {
  if (!("console" in GLOBAL_OBJ)) {
    return callback();
  }
  const console2 = GLOBAL_OBJ.console;
  const wrappedFuncs = {};
  const wrappedLevels = Object.keys(originalConsoleMethods);
  wrappedLevels.forEach((level) => {
    const originalConsoleMethod = originalConsoleMethods[level];
    wrappedFuncs[level] = console2[level];
    console2[level] = originalConsoleMethod;
  });
  try {
    return callback();
  } finally {
    wrappedLevels.forEach((level) => {
      console2[level] = wrappedFuncs[level];
    });
  }
}
function enable() {
  _getLoggerSettings().enabled = true;
}
function disable() {
  _getLoggerSettings().enabled = false;
}
function isEnabled() {
  return _getLoggerSettings().enabled;
}
function log(...args) {
  _maybeLog("log", ...args);
}
function warn(...args) {
  _maybeLog("warn", ...args);
}
function error(...args) {
  _maybeLog("error", ...args);
}
function _maybeLog(level, ...args) {
  if (!DEBUG_BUILD) {
    return;
  }
  if (isEnabled()) {
    consoleSandbox(() => {
      GLOBAL_OBJ.console[level](`${PREFIX}[${level}]:`, ...args);
    });
  }
}
function _getLoggerSettings() {
  if (!DEBUG_BUILD) {
    return { enabled: false };
  }
  return getGlobalSingleton("loggerSettings", () => ({ enabled: false }));
}
var debug = {
  /** Enable logging. */
  enable,
  /** Disable logging. */
  disable,
  /** Check if logging is enabled. */
  isEnabled,
  /** Log a message. */
  log,
  /** Log a warning. */
  warn,
  /** Log an error. */
  error
};

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/stacktrace.js
var STACKTRACE_FRAME_LIMIT = 50;
var UNKNOWN_FUNCTION = "?";
var WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
var STRIP_FRAME_REGEXP = /captureMessage|captureException/;
function createStackParser(...parsers) {
  const sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map((p) => p[1]);
  return (stack, skipFirstLines = 0, framesToPop = 0) => {
    const frames = [];
    const lines = stack.split("\n");
    for (let i = skipFirstLines; i < lines.length; i++) {
      let line = lines[i];
      if (line.length > 1024) {
        line = line.slice(0, 1024);
      }
      const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, "$1") : line;
      if (cleanedLine.match(/\S*Error: /)) {
        continue;
      }
      for (const parser of sortedParsers) {
        const frame = parser(cleanedLine);
        if (frame) {
          frames.push(frame);
          break;
        }
      }
      if (frames.length >= STACKTRACE_FRAME_LIMIT + framesToPop) {
        break;
      }
    }
    return stripSentryFramesAndReverse(frames.slice(framesToPop));
  };
}
function stackParserFromStackParserOptions(stackParser) {
  if (Array.isArray(stackParser)) {
    return createStackParser(...stackParser);
  }
  return stackParser;
}
function stripSentryFramesAndReverse(stack) {
  if (!stack.length) {
    return [];
  }
  const localStack = Array.from(stack);
  if (/sentryWrapped/.test(getLastStackFrame(localStack).function || "")) {
    localStack.pop();
  }
  localStack.reverse();
  if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || "")) {
    localStack.pop();
    if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || "")) {
      localStack.pop();
    }
  }
  return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
    ...frame,
    filename: frame.filename || getLastStackFrame(localStack).filename,
    function: frame.function || UNKNOWN_FUNCTION
  }));
}
function getLastStackFrame(arr) {
  return arr[arr.length - 1] || {};
}
var defaultFunctionName = "<anonymous>";
function getFunctionName(fn) {
  try {
    if (!fn || typeof fn !== "function") {
      return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
  } catch {
    return defaultFunctionName;
  }
}
function getVueInternalName(value) {
  const isVNode = "__v_isVNode" in value && value.__v_isVNode;
  return isVNode ? "[VueVNode]" : "[VueViewModel]";
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/instrument/handlers.js
var handlers = {};
var instrumented = {};
function addHandler(type, handler) {
  handlers[type] = handlers[type] || [];
  handlers[type].push(handler);
}
function maybeInstrument(type, instrumentFn) {
  if (!instrumented[type]) {
    instrumented[type] = true;
    try {
      instrumentFn();
    } catch (e) {
      DEBUG_BUILD && debug.error(`Error while instrumenting ${type}`, e);
    }
  }
}
function triggerHandlers(type, data) {
  const typeHandlers = type && handlers[type];
  if (!typeHandlers) {
    return;
  }
  for (const handler of typeHandlers) {
    try {
      handler(data);
    } catch (e) {
      DEBUG_BUILD && debug.error(
        `Error while triggering instrumentation handler.
Type: ${type}
Name: ${getFunctionName(handler)}
Error:`,
        e
      );
    }
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/instrument/globalError.js
var _oldOnErrorHandler = null;
function addGlobalErrorInstrumentationHandler(handler) {
  const type = "error";
  addHandler(type, handler);
  maybeInstrument(type, instrumentError);
}
function instrumentError() {
  _oldOnErrorHandler = GLOBAL_OBJ.onerror;
  GLOBAL_OBJ.onerror = function(msg, url, line, column, error3) {
    const handlerData = {
      column,
      error: error3,
      line,
      msg,
      url
    };
    triggerHandlers("error", handlerData);
    if (_oldOnErrorHandler) {
      return _oldOnErrorHandler.apply(this, arguments);
    }
    return false;
  };
  GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = true;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js
var _oldOnUnhandledRejectionHandler = null;
function addGlobalUnhandledRejectionInstrumentationHandler(handler) {
  const type = "unhandledrejection";
  addHandler(type, handler);
  maybeInstrument(type, instrumentUnhandledRejection);
}
function instrumentUnhandledRejection() {
  _oldOnUnhandledRejectionHandler = GLOBAL_OBJ.onunhandledrejection;
  GLOBAL_OBJ.onunhandledrejection = function(e) {
    const handlerData = e;
    triggerHandlers("unhandledrejection", handlerData);
    if (_oldOnUnhandledRejectionHandler) {
      return _oldOnUnhandledRejectionHandler.apply(this, arguments);
    }
    return true;
  };
  GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/is.js
var objectToString = Object.prototype.toString;
function isError(wat) {
  switch (objectToString.call(wat)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return true;
    default:
      return isInstanceOf(wat, Error);
  }
}
function isBuiltin(wat, className) {
  return objectToString.call(wat) === `[object ${className}]`;
}
function isErrorEvent(wat) {
  return isBuiltin(wat, "ErrorEvent");
}
function isString(wat) {
  return isBuiltin(wat, "String");
}
function isParameterizedString(wat) {
  return typeof wat === "object" && wat !== null && "__sentry_template_string__" in wat && "__sentry_template_values__" in wat;
}
function isPrimitive(wat) {
  return wat === null || isParameterizedString(wat) || typeof wat !== "object" && typeof wat !== "function";
}
function isPlainObject(wat) {
  return isBuiltin(wat, "Object");
}
function isEvent(wat) {
  return typeof Event !== "undefined" && isInstanceOf(wat, Event);
}
function isElement(wat) {
  return typeof Element !== "undefined" && isInstanceOf(wat, Element);
}
function isRegExp(wat) {
  return isBuiltin(wat, "RegExp");
}
function isThenable(wat) {
  return Boolean(wat?.then && typeof wat.then === "function");
}
function isSyntheticEvent(wat) {
  return isPlainObject(wat) && "nativeEvent" in wat && "preventDefault" in wat && "stopPropagation" in wat;
}
function isInstanceOf(wat, base) {
  try {
    return wat instanceof base;
  } catch {
    return false;
  }
}
function isVueViewModel(wat) {
  return !!(typeof wat === "object" && wat !== null && (wat.__isVue || wat._isVue || wat.__v_isVNode));
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/browser.js
var WINDOW = GLOBAL_OBJ;
var DEFAULT_MAX_STRING_LENGTH = 80;
function htmlTreeAsString(elem, options = {}) {
  if (!elem) {
    return "<unknown>";
  }
  try {
    let currentElem = elem;
    const MAX_TRAVERSE_HEIGHT = 5;
    const out = [];
    let height = 0;
    let len = 0;
    const separator = " > ";
    const sepLength = separator.length;
    let nextStr;
    const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
    const maxStringLength = !Array.isArray(options) && options.maxStringLength || DEFAULT_MAX_STRING_LENGTH;
    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem, keyAttrs);
      if (nextStr === "html" || height > 1 && len + out.length * sepLength + nextStr.length >= maxStringLength) {
        break;
      }
      out.push(nextStr);
      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }
    return out.reverse().join(separator);
  } catch {
    return "<unknown>";
  }
}
function _htmlElementAsString(el, keyAttrs) {
  const elem = el;
  const out = [];
  if (!elem?.tagName) {
    return "";
  }
  if (WINDOW.HTMLElement) {
    if (elem instanceof HTMLElement && elem.dataset) {
      if (elem.dataset["sentryComponent"]) {
        return elem.dataset["sentryComponent"];
      }
      if (elem.dataset["sentryElement"]) {
        return elem.dataset["sentryElement"];
      }
    }
  }
  out.push(elem.tagName.toLowerCase());
  const keyAttrPairs = keyAttrs?.length ? keyAttrs.filter((keyAttr) => elem.getAttribute(keyAttr)).map((keyAttr) => [keyAttr, elem.getAttribute(keyAttr)]) : null;
  if (keyAttrPairs?.length) {
    keyAttrPairs.forEach((keyAttrPair) => {
      out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
    });
  } else {
    if (elem.id) {
      out.push(`#${elem.id}`);
    }
    const className = elem.className;
    if (className && isString(className)) {
      const classes = className.split(/\s+/);
      for (const c of classes) {
        out.push(`.${c}`);
      }
    }
  }
  const allowedAttrs = ["aria-label", "type", "name", "title", "alt"];
  for (const k of allowedAttrs) {
    const attr = elem.getAttribute(k);
    if (attr) {
      out.push(`[${k}="${attr}"]`);
    }
  }
  return out.join("");
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/object.js
function fill(source, name, replacementFactory) {
  if (!(name in source)) {
    return;
  }
  const original = source[name];
  if (typeof original !== "function") {
    return;
  }
  const wrapped = replacementFactory(original);
  if (typeof wrapped === "function") {
    markFunctionWrapped(wrapped, original);
  }
  try {
    source[name] = wrapped;
  } catch {
    DEBUG_BUILD && debug.log(`Failed to replace method "${name}" in object`, source);
  }
}
function addNonEnumerableProperty(obj, name, value) {
  try {
    Object.defineProperty(obj, name, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value,
      writable: true,
      configurable: true
    });
  } catch {
    DEBUG_BUILD && debug.log(`Failed to add non-enumerable property "${name}" to object`, obj);
  }
}
function markFunctionWrapped(wrapped, original) {
  try {
    const proto = original.prototype || {};
    wrapped.prototype = original.prototype = proto;
    addNonEnumerableProperty(wrapped, "__sentry_original__", original);
  } catch {
  }
}
function getOriginalFunction(func) {
  return func.__sentry_original__;
}
function convertToPlainObject(value) {
  if (isError(value)) {
    return {
      message: value.message,
      name: value.name,
      stack: value.stack,
      ...getOwnProperties(value)
    };
  } else if (isEvent(value)) {
    const newObj = {
      type: value.type,
      target: serializeEventTarget(value.target),
      currentTarget: serializeEventTarget(value.currentTarget),
      ...getOwnProperties(value)
    };
    if (typeof CustomEvent !== "undefined" && isInstanceOf(value, CustomEvent)) {
      newObj.detail = value.detail;
    }
    return newObj;
  } else {
    return value;
  }
}
function serializeEventTarget(target) {
  try {
    return isElement(target) ? htmlTreeAsString(target) : Object.prototype.toString.call(target);
  } catch {
    return "<unknown>";
  }
}
function getOwnProperties(obj) {
  if (typeof obj === "object" && obj !== null) {
    const extractedProps = {};
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        extractedProps[property] = obj[property];
      }
    }
    return extractedProps;
  } else {
    return {};
  }
}
function extractExceptionKeysForMessage(exception) {
  const keys = Object.keys(convertToPlainObject(exception));
  keys.sort();
  return !keys[0] ? "[object has no keys]" : keys.join(", ");
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/randomSafeContext.js
var RESOLVED_RUNNER;
function withRandomSafeContext(cb) {
  if (RESOLVED_RUNNER !== void 0) {
    return RESOLVED_RUNNER ? RESOLVED_RUNNER(cb) : cb();
  }
  const sym = Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__");
  const globalWithSymbol = GLOBAL_OBJ;
  if (sym in globalWithSymbol && typeof globalWithSymbol[sym] === "function") {
    RESOLVED_RUNNER = globalWithSymbol[sym];
    return RESOLVED_RUNNER(cb);
  }
  RESOLVED_RUNNER = null;
  return cb();
}
function safeMathRandom() {
  return withRandomSafeContext(() => Math.random());
}
function safeDateNow() {
  return withRandomSafeContext(() => Date.now());
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/string.js
function truncate(str, max = 0) {
  if (typeof str !== "string" || max === 0) {
    return str;
  }
  return str.length <= max ? str : `${str.slice(0, max)}...`;
}
function snipLine(line, colno) {
  let newLine = line;
  const lineLength = newLine.length;
  if (lineLength <= 150) {
    return newLine;
  }
  if (colno > lineLength) {
    colno = lineLength;
  }
  let start = Math.max(colno - 60, 0);
  if (start < 5) {
    start = 0;
  }
  let end = Math.min(start + 140, lineLength);
  if (end > lineLength - 5) {
    end = lineLength;
  }
  if (end === lineLength) {
    start = Math.max(end - 140, 0);
  }
  newLine = newLine.slice(start, end);
  if (start > 0) {
    newLine = `'{snip} ${newLine}`;
  }
  if (end < lineLength) {
    newLine += " {snip}";
  }
  return newLine;
}
function safeJoin(input, delimiter) {
  if (!Array.isArray(input)) {
    return "";
  }
  const output = [];
  for (let i = 0; i < input.length; i++) {
    const value = input[i];
    try {
      if (isVueViewModel(value)) {
        output.push(getVueInternalName(value));
      } else {
        output.push(String(value));
      }
    } catch {
      output.push("[value cannot be serialized]");
    }
  }
  return output.join(delimiter);
}
function isMatchingPattern(value, pattern, requireExactStringMatch = false) {
  if (!isString(value)) {
    return false;
  }
  if (isRegExp(pattern)) {
    return pattern.test(value);
  }
  if (isString(pattern)) {
    return requireExactStringMatch ? value === pattern : value.includes(pattern);
  }
  return false;
}
function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = false) {
  return patterns.some((pattern) => isMatchingPattern(testString, pattern, requireExactStringMatch));
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/misc.js
function getCrypto() {
  const gbl = GLOBAL_OBJ;
  return gbl.crypto || gbl.msCrypto;
}
var emptyUuid;
function getRandomByte() {
  return safeMathRandom() * 16;
}
function uuid4(crypto = getCrypto()) {
  try {
    if (crypto?.randomUUID) {
      return withRandomSafeContext(() => crypto.randomUUID()).replace(/-/g, "");
    }
  } catch {
  }
  if (!emptyUuid) {
    emptyUuid = "10000000100040008000" + 1e11;
  }
  return emptyUuid.replace(
    /[018]/g,
    (c) => (
      // eslint-disable-next-line no-bitwise
      (c ^ (getRandomByte() & 15) >> c / 4).toString(16)
    )
  );
}
function getFirstException(event) {
  return event.exception?.values?.[0];
}
function getEventDescription(event) {
  const { message, event_id: eventId } = event;
  if (message) {
    return message;
  }
  const firstException = getFirstException(event);
  if (firstException) {
    if (firstException.type && firstException.value) {
      return `${firstException.type}: ${firstException.value}`;
    }
    return firstException.type || firstException.value || eventId || "<unknown>";
  }
  return eventId || "<unknown>";
}
function addExceptionTypeValue(event, value, type) {
  const exception = event.exception = event.exception || {};
  const values = exception.values = exception.values || [];
  const firstException = values[0] = values[0] || {};
  if (!firstException.value) {
    firstException.value = value || "";
  }
  if (!firstException.type) {
    firstException.type = type || "Error";
  }
}
function addExceptionMechanism(event, newMechanism) {
  const firstException = getFirstException(event);
  if (!firstException) {
    return;
  }
  const defaultMechanism = { type: "generic", handled: true };
  const currentMechanism = firstException.mechanism;
  firstException.mechanism = { ...defaultMechanism, ...currentMechanism, ...newMechanism };
  if (newMechanism && "data" in newMechanism) {
    const mergedData = { ...currentMechanism?.data, ...newMechanism.data };
    firstException.mechanism.data = mergedData;
  }
}
var SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
function _parseInt(input) {
  return parseInt(input || "", 10);
}
function parseSemver(input) {
  const match = input.match(SEMVER_REGEXP) || [];
  const major2 = _parseInt(match[1]);
  const minor = _parseInt(match[2]);
  const patch = _parseInt(match[3]);
  return {
    buildmetadata: match[5],
    major: isNaN(major2) ? void 0 : major2,
    minor: isNaN(minor) ? void 0 : minor,
    patch: isNaN(patch) ? void 0 : patch,
    prerelease: match[4]
  };
}
function checkOrSetAlreadyCaught(exception) {
  if (isAlreadyCaptured(exception)) {
    return true;
  }
  try {
    addNonEnumerableProperty(exception, "__sentry_captured__", true);
  } catch {
  }
  return false;
}
function isAlreadyCaptured(exception) {
  try {
    return exception.__sentry_captured__;
  } catch {
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/time.js
var ONE_SECOND_IN_MS = 1e3;
function dateTimestampInSeconds() {
  return safeDateNow() / ONE_SECOND_IN_MS;
}
function createUnixTimestampInSecondsFunc() {
  const { performance: performance2 } = GLOBAL_OBJ;
  if (!performance2?.now || !performance2.timeOrigin) {
    return dateTimestampInSeconds;
  }
  const timeOrigin = performance2.timeOrigin;
  return () => {
    return (timeOrigin + withRandomSafeContext(() => performance2.now())) / ONE_SECOND_IN_MS;
  };
}
var _cachedTimestampInSeconds;
function timestampInSeconds() {
  const func = _cachedTimestampInSeconds ?? (_cachedTimestampInSeconds = createUnixTimestampInSecondsFunc());
  return func();
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/session.js
function makeSession(context2) {
  const startingTime = timestampInSeconds();
  const session2 = {
    sid: uuid4(),
    init: true,
    timestamp: startingTime,
    started: startingTime,
    duration: 0,
    status: "ok",
    errors: 0,
    ignoreDuration: false,
    toJSON: () => sessionToJSON(session2)
  };
  if (context2) {
    updateSession(session2, context2);
  }
  return session2;
}
function updateSession(session2, context2 = {}) {
  if (context2.user) {
    if (!session2.ipAddress && context2.user.ip_address) {
      session2.ipAddress = context2.user.ip_address;
    }
    if (!session2.did && !context2.did) {
      session2.did = context2.user.id || context2.user.email || context2.user.username;
    }
  }
  session2.timestamp = context2.timestamp || timestampInSeconds();
  if (context2.abnormal_mechanism) {
    session2.abnormal_mechanism = context2.abnormal_mechanism;
  }
  if (context2.ignoreDuration) {
    session2.ignoreDuration = context2.ignoreDuration;
  }
  if (context2.sid) {
    session2.sid = context2.sid.length === 32 ? context2.sid : uuid4();
  }
  if (context2.init !== void 0) {
    session2.init = context2.init;
  }
  if (!session2.did && context2.did) {
    session2.did = `${context2.did}`;
  }
  if (typeof context2.started === "number") {
    session2.started = context2.started;
  }
  if (session2.ignoreDuration) {
    session2.duration = void 0;
  } else if (typeof context2.duration === "number") {
    session2.duration = context2.duration;
  } else {
    const duration = session2.timestamp - session2.started;
    session2.duration = duration >= 0 ? duration : 0;
  }
  if (context2.release) {
    session2.release = context2.release;
  }
  if (context2.environment) {
    session2.environment = context2.environment;
  }
  if (!session2.ipAddress && context2.ipAddress) {
    session2.ipAddress = context2.ipAddress;
  }
  if (!session2.userAgent && context2.userAgent) {
    session2.userAgent = context2.userAgent;
  }
  if (typeof context2.errors === "number") {
    session2.errors = context2.errors;
  }
  if (context2.status) {
    session2.status = context2.status;
  }
}
function closeSession(session2, status) {
  let context2 = {};
  if (status) {
    context2 = { status };
  } else if (session2.status === "ok") {
    context2 = { status: "exited" };
  }
  updateSession(session2, context2);
}
function sessionToJSON(session2) {
  return {
    sid: `${session2.sid}`,
    init: session2.init,
    // Make sure that sec is converted to ms for date constructor
    started: new Date(session2.started * 1e3).toISOString(),
    timestamp: new Date(session2.timestamp * 1e3).toISOString(),
    status: session2.status,
    errors: session2.errors,
    did: typeof session2.did === "number" || typeof session2.did === "string" ? `${session2.did}` : void 0,
    duration: session2.duration,
    abnormal_mechanism: session2.abnormal_mechanism,
    attrs: {
      release: session2.release,
      environment: session2.environment,
      ip_address: session2.ipAddress,
      user_agent: session2.userAgent
    }
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/merge.js
function merge(initialObj, mergeObj, levels = 2) {
  if (!mergeObj || typeof mergeObj !== "object" || levels <= 0) {
    return mergeObj;
  }
  if (initialObj && Object.keys(mergeObj).length === 0) {
    return initialObj;
  }
  const output = { ...initialObj };
  for (const key in mergeObj) {
    if (Object.prototype.hasOwnProperty.call(mergeObj, key)) {
      output[key] = merge(output[key], mergeObj[key], levels - 1);
    }
  }
  return output;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/propagationContext.js
function generateTraceId() {
  return uuid4();
}
function generateSpanId() {
  return uuid4().substring(16);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/spanOnScope.js
var SCOPE_SPAN_FIELD = "_sentrySpan";
function _setSpanForScope(scope, span) {
  if (span) {
    addNonEnumerableProperty(scope, SCOPE_SPAN_FIELD, span);
  } else {
    delete scope[SCOPE_SPAN_FIELD];
  }
}
function _getSpanForScope(scope) {
  return scope[SCOPE_SPAN_FIELD];
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/scope.js
var DEFAULT_MAX_BREADCRUMBS = 100;
var Scope = class _Scope {
  /** Flag if notifying is happening. */
  /** Callback for client to receive scope changes. */
  /** Callback list that will be called during event processing. */
  /** Array of breadcrumbs. */
  /** User */
  /** Tags */
  /** Attributes */
  /** Extra */
  /** Contexts */
  /** Attachments */
  /** Propagation Context for distributed tracing */
  /**
   * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
   * sent to Sentry
   */
  /** Fingerprint */
  /** Severity */
  /**
   * Transaction Name
   *
   * IMPORTANT: The transaction name on the scope has nothing to do with root spans/transaction objects.
   * It's purpose is to assign a transaction to the scope that's added to non-transaction events.
   */
  /** Session */
  /** The client on this scope */
  /** Contains the last event id of a captured event.  */
  // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.
  constructor() {
    this._notifyingListeners = false;
    this._scopeListeners = [];
    this._eventProcessors = [];
    this._breadcrumbs = [];
    this._attachments = [];
    this._user = {};
    this._tags = {};
    this._attributes = {};
    this._extra = {};
    this._contexts = {};
    this._sdkProcessingMetadata = {};
    this._propagationContext = {
      traceId: generateTraceId(),
      sampleRand: safeMathRandom()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const newScope = new _Scope();
    newScope._breadcrumbs = [...this._breadcrumbs];
    newScope._tags = { ...this._tags };
    newScope._attributes = { ...this._attributes };
    newScope._extra = { ...this._extra };
    newScope._contexts = { ...this._contexts };
    if (this._contexts.flags) {
      newScope._contexts.flags = {
        values: [...this._contexts.flags.values]
      };
    }
    newScope._user = this._user;
    newScope._level = this._level;
    newScope._session = this._session;
    newScope._transactionName = this._transactionName;
    newScope._fingerprint = this._fingerprint;
    newScope._eventProcessors = [...this._eventProcessors];
    newScope._attachments = [...this._attachments];
    newScope._sdkProcessingMetadata = { ...this._sdkProcessingMetadata };
    newScope._propagationContext = { ...this._propagationContext };
    newScope._client = this._client;
    newScope._lastEventId = this._lastEventId;
    _setSpanForScope(newScope, _getSpanForScope(this));
    return newScope;
  }
  /**
   * Update the client assigned to this scope.
   * Note that not every scope will have a client assigned - isolation scopes & the global scope will generally not have a client,
   * as well as manually created scopes.
   */
  setClient(client) {
    this._client = client;
  }
  /**
   * Set the ID of the last captured error event.
   * This is generally only captured on the isolation scope.
   */
  setLastEventId(lastEventId2) {
    this._lastEventId = lastEventId2;
  }
  /**
   * Get the client assigned to this scope.
   */
  getClient() {
    return this._client;
  }
  /**
   * Get the ID of the last captured error event.
   * This is generally only available on the isolation scope.
   */
  lastEventId() {
    return this._lastEventId;
  }
  /**
   * @inheritDoc
   */
  addScopeListener(callback) {
    this._scopeListeners.push(callback);
  }
  /**
   * Add an event processor that will be called before an event is sent.
   */
  addEventProcessor(callback) {
    this._eventProcessors.push(callback);
    return this;
  }
  /**
   * Set the user for this scope.
   * Set to `null` to unset the user.
   */
  setUser(user) {
    this._user = user || {
      email: void 0,
      id: void 0,
      ip_address: void 0,
      username: void 0
    };
    if (this._session) {
      updateSession(this._session, { user });
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Get the user from this scope.
   */
  getUser() {
    return this._user;
  }
  /**
   * Set an object that will be merged into existing tags on the scope,
   * and will be sent as tags data with the event.
   */
  setTags(tags) {
    this._tags = {
      ...this._tags,
      ...tags
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Set a single tag that will be sent as tags data with the event.
   */
  setTag(key, value) {
    return this.setTags({ [key]: value });
  }
  /**
   * Sets attributes onto the scope.
   *
   * These attributes are currently applied to logs and metrics.
   * In the future, they will also be applied to spans.
   *
   * Important: For now, only strings, numbers and boolean attributes are supported, despite types allowing for
   * more complex attribute types. We'll add this support in the future but already specify the wider type to
   * avoid a breaking change in the future.
   *
   * @param newAttributes - The attributes to set on the scope. You can either pass in key-value pairs, or
   * an object with a `value` and an optional `unit` (if applicable to your attribute).
   *
   * @example
   * ```typescript
   * scope.setAttributes({
   *   is_admin: true,
   *   payment_selection: 'credit_card',
   *   render_duration: { value: 'render_duration', unit: 'ms' },
   * });
   * ```
   */
  setAttributes(newAttributes) {
    this._attributes = {
      ...this._attributes,
      ...newAttributes
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets an attribute onto the scope.
   *
   * These attributes are currently applied to logs and metrics.
   * In the future, they will also be applied to spans.
   *
   * Important: For now, only strings, numbers and boolean attributes are supported, despite types allowing for
   * more complex attribute types. We'll add this support in the future but already specify the wider type to
   * avoid a breaking change in the future.
   *
   * @param key - The attribute key.
   * @param value - the attribute value. You can either pass in a raw value, or an attribute
   * object with a `value` and an optional `unit` (if applicable to your attribute).
   *
   * @example
   * ```typescript
   * scope.setAttribute('is_admin', true);
   * scope.setAttribute('render_duration', { value: 'render_duration', unit: 'ms' });
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAttribute(key, value) {
    return this.setAttributes({ [key]: value });
  }
  /**
   * Removes the attribute with the given key from the scope.
   *
   * @param key - The attribute key.
   *
   * @example
   * ```typescript
   * scope.removeAttribute('is_admin');
   * ```
   */
  removeAttribute(key) {
    if (key in this._attributes) {
      delete this._attributes[key];
      this._notifyScopeListeners();
    }
    return this;
  }
  /**
   * Set an object that will be merged into existing extra on the scope,
   * and will be sent as extra data with the event.
   */
  setExtras(extras) {
    this._extra = {
      ...this._extra,
      ...extras
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Set a single key:value extra entry that will be sent as extra data with the event.
   */
  setExtra(key, extra) {
    this._extra = { ...this._extra, [key]: extra };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets the fingerprint on the scope to send with the events.
   * @param {string[]} fingerprint Fingerprint to group events in Sentry.
   */
  setFingerprint(fingerprint) {
    this._fingerprint = fingerprint;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets the level on the scope for future events.
   */
  setLevel(level) {
    this._level = level;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets the transaction name on the scope so that the name of e.g. taken server route or
   * the page location is attached to future events.
   *
   * IMPORTANT: Calling this function does NOT change the name of the currently active
   * root span. If you want to change the name of the active root span, use
   * `Sentry.updateSpanName(rootSpan, 'new name')` instead.
   *
   * By default, the SDK updates the scope's transaction name automatically on sensible
   * occasions, such as a page navigation or when handling a new request on the server.
   */
  setTransactionName(name) {
    this._transactionName = name;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets context data with the given name.
   * Data passed as context will be normalized. You can also pass `null` to unset the context.
   * Note that context data will not be merged - calling `setContext` will overwrite an existing context with the same key.
   */
  setContext(key, context2) {
    if (context2 === null) {
      delete this._contexts[key];
    } else {
      this._contexts[key] = context2;
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Set the session for the scope.
   */
  setSession(session2) {
    if (!session2) {
      delete this._session;
    } else {
      this._session = session2;
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Get the session from the scope.
   */
  getSession() {
    return this._session;
  }
  /**
   * Updates the scope with provided data. Can work in three variations:
   * - plain object containing updatable attributes
   * - Scope instance that'll extract the attributes from
   * - callback function that'll receive the current scope as an argument and allow for modifications
   */
  update(captureContext) {
    if (!captureContext) {
      return this;
    }
    const scopeToMerge = typeof captureContext === "function" ? captureContext(this) : captureContext;
    const scopeInstance = scopeToMerge instanceof _Scope ? scopeToMerge.getScopeData() : isPlainObject(scopeToMerge) ? captureContext : void 0;
    const {
      tags,
      attributes: attributes2,
      extra,
      user,
      contexts,
      level,
      fingerprint = [],
      propagationContext
    } = scopeInstance || {};
    this._tags = { ...this._tags, ...tags };
    this._attributes = { ...this._attributes, ...attributes2 };
    this._extra = { ...this._extra, ...extra };
    this._contexts = { ...this._contexts, ...contexts };
    if (user && Object.keys(user).length) {
      this._user = user;
    }
    if (level) {
      this._level = level;
    }
    if (fingerprint.length) {
      this._fingerprint = fingerprint;
    }
    if (propagationContext) {
      this._propagationContext = propagationContext;
    }
    return this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    this._breadcrumbs = [];
    this._tags = {};
    this._attributes = {};
    this._extra = {};
    this._user = {};
    this._contexts = {};
    this._level = void 0;
    this._transactionName = void 0;
    this._fingerprint = void 0;
    this._session = void 0;
    _setSpanForScope(this, void 0);
    this._attachments = [];
    this.setPropagationContext({
      traceId: generateTraceId(),
      sampleRand: safeMathRandom()
    });
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(breadcrumb, maxBreadcrumbs) {
    const maxCrumbs = typeof maxBreadcrumbs === "number" ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;
    if (maxCrumbs <= 0) {
      return this;
    }
    const mergedBreadcrumb = {
      timestamp: dateTimestampInSeconds(),
      ...breadcrumb,
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: breadcrumb.message ? truncate(breadcrumb.message, 2048) : breadcrumb.message
    };
    this._breadcrumbs.push(mergedBreadcrumb);
    if (this._breadcrumbs.length > maxCrumbs) {
      this._breadcrumbs = this._breadcrumbs.slice(-maxCrumbs);
      this._client?.recordDroppedEvent("buffer_overflow", "log_item");
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Get the last breadcrumb of the scope.
   */
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  /**
   * Clear all breadcrumbs from the scope.
   */
  clearBreadcrumbs() {
    this._breadcrumbs = [];
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Add an attachment to the scope.
   */
  addAttachment(attachment) {
    this._attachments.push(attachment);
    return this;
  }
  /**
   * Clear all attachments from the scope.
   */
  clearAttachments() {
    this._attachments = [];
    return this;
  }
  /**
   * Get the data of this scope, which should be applied to an event during processing.
   */
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      attributes: this._attributes,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: _getSpanForScope(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(newData) {
    this._sdkProcessingMetadata = merge(this._sdkProcessingMetadata, newData, 2);
    return this;
  }
  /**
   * Add propagation context to the scope, used for distributed tracing
   */
  setPropagationContext(context2) {
    this._propagationContext = context2;
    return this;
  }
  /**
   * Get propagation context from the scope, used for distributed tracing
   */
  getPropagationContext() {
    return this._propagationContext;
  }
  /**
   * Capture an exception for this scope.
   *
   * @returns {string} The id of the captured Sentry event.
   */
  captureException(exception, hint) {
    const eventId = hint?.event_id || uuid4();
    if (!this._client) {
      DEBUG_BUILD && debug.warn("No client configured on scope - will not capture exception!");
      return eventId;
    }
    const syntheticException = new Error("Sentry syntheticException");
    this._client.captureException(
      exception,
      {
        originalException: exception,
        syntheticException,
        ...hint,
        event_id: eventId
      },
      this
    );
    return eventId;
  }
  /**
   * Capture a message for this scope.
   *
   * @returns {string} The id of the captured message.
   */
  captureMessage(message, level, hint) {
    const eventId = hint?.event_id || uuid4();
    if (!this._client) {
      DEBUG_BUILD && debug.warn("No client configured on scope - will not capture message!");
      return eventId;
    }
    const syntheticException = hint?.syntheticException ?? new Error(message);
    this._client.captureMessage(
      message,
      level,
      {
        originalException: message,
        syntheticException,
        ...hint,
        event_id: eventId
      },
      this
    );
    return eventId;
  }
  /**
   * Capture a Sentry event for this scope.
   *
   * @returns {string} The id of the captured event.
   */
  captureEvent(event, hint) {
    const eventId = hint?.event_id || uuid4();
    if (!this._client) {
      DEBUG_BUILD && debug.warn("No client configured on scope - will not capture event!");
      return eventId;
    }
    this._client.captureEvent(event, { ...hint, event_id: eventId }, this);
    return eventId;
  }
  /**
   * This will be called on every set call.
   */
  _notifyScopeListeners() {
    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      this._scopeListeners.forEach((callback) => {
        callback(this);
      });
      this._notifyingListeners = false;
    }
  }
};

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/defaultScopes.js
function getDefaultCurrentScope() {
  return getGlobalSingleton("defaultCurrentScope", () => new Scope());
}
function getDefaultIsolationScope() {
  return getGlobalSingleton("defaultIsolationScope", () => new Scope());
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/asyncContext/stackStrategy.js
var AsyncContextStack = class {
  constructor(scope, isolationScope) {
    let assignedScope;
    if (!scope) {
      assignedScope = new Scope();
    } else {
      assignedScope = scope;
    }
    let assignedIsolationScope;
    if (!isolationScope) {
      assignedIsolationScope = new Scope();
    } else {
      assignedIsolationScope = isolationScope;
    }
    this._stack = [{ scope: assignedScope }];
    this._isolationScope = assignedIsolationScope;
  }
  /**
   * Fork a scope for the stack.
   */
  withScope(callback) {
    const scope = this._pushScope();
    let maybePromiseResult;
    try {
      maybePromiseResult = callback(scope);
    } catch (e) {
      this._popScope();
      throw e;
    }
    if (isThenable(maybePromiseResult)) {
      return maybePromiseResult.then(
        (res) => {
          this._popScope();
          return res;
        },
        (e) => {
          this._popScope();
          throw e;
        }
      );
    }
    this._popScope();
    return maybePromiseResult;
  }
  /**
   * Get the client of the stack.
   */
  getClient() {
    return this.getStackTop().client;
  }
  /**
   * Returns the scope of the top stack.
   */
  getScope() {
    return this.getStackTop().scope;
  }
  /**
   * Get the isolation scope for the stack.
   */
  getIsolationScope() {
    return this._isolationScope;
  }
  /**
   * Returns the topmost scope layer in the order domain > local > process.
   */
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  /**
   * Push a scope to the stack.
   */
  _pushScope() {
    const scope = this.getScope().clone();
    this._stack.push({
      client: this.getClient(),
      scope
    });
    return scope;
  }
  /**
   * Pop a scope from the stack.
   */
  _popScope() {
    if (this._stack.length <= 1) return false;
    return !!this._stack.pop();
  }
};
function getAsyncContextStack() {
  const registry = getMainCarrier();
  const sentry = getSentryCarrier(registry);
  return sentry.stack = sentry.stack || new AsyncContextStack(getDefaultCurrentScope(), getDefaultIsolationScope());
}
function withScope(callback) {
  return getAsyncContextStack().withScope(callback);
}
function withSetScope(scope, callback) {
  const stack = getAsyncContextStack();
  return stack.withScope(() => {
    stack.getStackTop().scope = scope;
    return callback(scope);
  });
}
function withIsolationScope(callback) {
  return getAsyncContextStack().withScope(() => {
    return callback(getAsyncContextStack().getIsolationScope());
  });
}
function getStackAsyncContextStrategy() {
  return {
    withIsolationScope,
    withScope,
    withSetScope,
    withSetIsolationScope: (_isolationScope, callback) => {
      return withIsolationScope(callback);
    },
    getCurrentScope: () => getAsyncContextStack().getScope(),
    getIsolationScope: () => getAsyncContextStack().getIsolationScope()
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/asyncContext/index.js
function setAsyncContextStrategy(strategy) {
  const registry = getMainCarrier();
  const sentry = getSentryCarrier(registry);
  sentry.acs = strategy;
}
function getAsyncContextStrategy(carrier) {
  const sentry = getSentryCarrier(carrier);
  if (sentry.acs) {
    return sentry.acs;
  }
  return getStackAsyncContextStrategy();
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/currentScopes.js
function getCurrentScope() {
  const carrier = getMainCarrier();
  const acs = getAsyncContextStrategy(carrier);
  return acs.getCurrentScope();
}
function getIsolationScope() {
  const carrier = getMainCarrier();
  const acs = getAsyncContextStrategy(carrier);
  return acs.getIsolationScope();
}
function getGlobalScope() {
  return getGlobalSingleton("globalScope", () => new Scope());
}
function withScope2(...rest) {
  const carrier = getMainCarrier();
  const acs = getAsyncContextStrategy(carrier);
  if (rest.length === 2) {
    const [scope, callback] = rest;
    if (!scope) {
      return acs.withScope(callback);
    }
    return acs.withSetScope(scope, callback);
  }
  return acs.withScope(rest[0]);
}
function getClient() {
  return getCurrentScope().getClient();
}
function getTraceContextFromScope(scope) {
  const propagationContext = scope.getPropagationContext();
  const { traceId, parentSpanId, propagationSpanId } = propagationContext;
  const traceContext = {
    trace_id: traceId,
    span_id: propagationSpanId || generateSpanId()
  };
  if (parentSpanId) {
    traceContext.parent_span_id = parentSpanId;
  }
  return traceContext;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/semanticAttributes.js
var SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = "sentry.source";
var SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = "sentry.sample_rate";
var SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE = "sentry.previous_trace_sample_rate";
var SEMANTIC_ATTRIBUTE_SENTRY_OP = "sentry.op";
var SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = "sentry.origin";
var SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT = "sentry.measurement_unit";
var SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE = "sentry.measurement_value";
var SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME = "sentry.custom_span_name";
var SEMANTIC_ATTRIBUTE_PROFILE_ID = "sentry.profile_id";
var SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME = "sentry.exclusive_time";

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js
var SPAN_STATUS_UNSET = 0;
var SPAN_STATUS_OK = 1;
var SPAN_STATUS_ERROR = 2;
function getSpanStatusFromHttpCode(httpStatus) {
  if (httpStatus < 400 && httpStatus >= 100) {
    return { code: SPAN_STATUS_OK };
  }
  if (httpStatus >= 400 && httpStatus < 500) {
    switch (httpStatus) {
      case 401:
        return { code: SPAN_STATUS_ERROR, message: "unauthenticated" };
      case 403:
        return { code: SPAN_STATUS_ERROR, message: "permission_denied" };
      case 404:
        return { code: SPAN_STATUS_ERROR, message: "not_found" };
      case 409:
        return { code: SPAN_STATUS_ERROR, message: "already_exists" };
      case 413:
        return { code: SPAN_STATUS_ERROR, message: "failed_precondition" };
      case 429:
        return { code: SPAN_STATUS_ERROR, message: "resource_exhausted" };
      case 499:
        return { code: SPAN_STATUS_ERROR, message: "cancelled" };
      default:
        return { code: SPAN_STATUS_ERROR, message: "invalid_argument" };
    }
  }
  if (httpStatus >= 500 && httpStatus < 600) {
    switch (httpStatus) {
      case 501:
        return { code: SPAN_STATUS_ERROR, message: "unimplemented" };
      case 503:
        return { code: SPAN_STATUS_ERROR, message: "unavailable" };
      case 504:
        return { code: SPAN_STATUS_ERROR, message: "deadline_exceeded" };
      default:
        return { code: SPAN_STATUS_ERROR, message: "internal_error" };
    }
  }
  return { code: SPAN_STATUS_ERROR, message: "internal_error" };
}
function setHttpStatus(span, httpStatus) {
  span.setAttribute("http.response.status_code", httpStatus);
  const spanStatus = getSpanStatusFromHttpCode(httpStatus);
  if (spanStatus.message !== "unknown_error") {
    span.setStatus(spanStatus);
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/utils.js
var SCOPE_ON_START_SPAN_FIELD = "_sentryScope";
var ISOLATION_SCOPE_ON_START_SPAN_FIELD = "_sentryIsolationScope";
function wrapScopeWithWeakRef(scope) {
  try {
    const WeakRefClass = GLOBAL_OBJ.WeakRef;
    if (typeof WeakRefClass === "function") {
      return new WeakRefClass(scope);
    }
  } catch {
  }
  return scope;
}
function unwrapScopeFromWeakRef(scopeRef) {
  if (!scopeRef) {
    return void 0;
  }
  if (typeof scopeRef === "object" && "deref" in scopeRef && typeof scopeRef.deref === "function") {
    try {
      return scopeRef.deref();
    } catch {
      return void 0;
    }
  }
  return scopeRef;
}
function setCapturedScopesOnSpan(span, scope, isolationScope) {
  if (span) {
    addNonEnumerableProperty(span, ISOLATION_SCOPE_ON_START_SPAN_FIELD, wrapScopeWithWeakRef(isolationScope));
    addNonEnumerableProperty(span, SCOPE_ON_START_SPAN_FIELD, scope);
  }
}
function getCapturedScopesOnSpan(span) {
  const spanWithScopes = span;
  return {
    scope: spanWithScopes[SCOPE_ON_START_SPAN_FIELD],
    isolationScope: unwrapScopeFromWeakRef(spanWithScopes[ISOLATION_SCOPE_ON_START_SPAN_FIELD])
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/baggage.js
var SENTRY_BAGGAGE_KEY_PREFIX = "sentry-";
var SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/;
var MAX_BAGGAGE_STRING_LENGTH = 8192;
function baggageHeaderToDynamicSamplingContext(baggageHeader) {
  const baggageObject = parseBaggageHeader(baggageHeader);
  if (!baggageObject) {
    return void 0;
  }
  const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value]) => {
    if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
      const nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
      acc[nonPrefixedKey] = value;
    }
    return acc;
  }, {});
  if (Object.keys(dynamicSamplingContext).length > 0) {
    return dynamicSamplingContext;
  } else {
    return void 0;
  }
}
function dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext) {
  if (!dynamicSamplingContext) {
    return void 0;
  }
  const sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce(
    (acc, [dscKey, dscValue]) => {
      if (dscValue) {
        acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
      }
      return acc;
    },
    {}
  );
  return objectToBaggageHeader(sentryPrefixedDSC);
}
function parseBaggageHeader(baggageHeader) {
  if (!baggageHeader || !isString(baggageHeader) && !Array.isArray(baggageHeader)) {
    return void 0;
  }
  if (Array.isArray(baggageHeader)) {
    return baggageHeader.reduce((acc, curr) => {
      const currBaggageObject = baggageHeaderToObject(curr);
      Object.entries(currBaggageObject).forEach(([key, value]) => {
        acc[key] = value;
      });
      return acc;
    }, {});
  }
  return baggageHeaderToObject(baggageHeader);
}
function baggageHeaderToObject(baggageHeader) {
  return baggageHeader.split(",").map((baggageEntry) => {
    const eqIdx = baggageEntry.indexOf("=");
    if (eqIdx === -1) {
      return [];
    }
    const key = baggageEntry.slice(0, eqIdx);
    const value = baggageEntry.slice(eqIdx + 1);
    return [key, value].map((keyOrValue) => {
      try {
        return decodeURIComponent(keyOrValue.trim());
      } catch {
        return;
      }
    });
  }).reduce((acc, [key, value]) => {
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
function objectToBaggageHeader(object) {
  if (Object.keys(object).length === 0) {
    return void 0;
  }
  return Object.entries(object).reduce((baggageHeader, [objectKey, objectValue], currentIndex) => {
    const baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`;
    const newBaggageHeader = currentIndex === 0 ? baggageEntry : `${baggageHeader},${baggageEntry}`;
    if (newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH) {
      DEBUG_BUILD && debug.warn(
        `Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`
      );
      return baggageHeader;
    } else {
      return newBaggageHeader;
    }
  }, "");
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/dsn.js
var ORG_ID_REGEX = /^o(\d+)\./;
var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;
function isValidProtocol(protocol2) {
  return protocol2 === "http" || protocol2 === "https";
}
function dsnToString(dsn, withPassword = false) {
  const { host, path: path2, pass, port, projectId, protocol: protocol2, publicKey } = dsn;
  return `${protocol2}://${publicKey}${withPassword && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path2 ? `${path2}/` : path2}${projectId}`;
}
function dsnFromString(str) {
  const match = DSN_REGEX.exec(str);
  if (!match) {
    consoleSandbox(() => {
      console.error(`Invalid Sentry Dsn: ${str}`);
    });
    return void 0;
  }
  const [protocol2, publicKey, pass = "", host = "", port = "", lastPath = ""] = match.slice(1);
  let path2 = "";
  let projectId = lastPath;
  const split = projectId.split("/");
  if (split.length > 1) {
    path2 = split.slice(0, -1).join("/");
    projectId = split.pop();
  }
  if (projectId) {
    const projectMatch = projectId.match(/^\d+/);
    if (projectMatch) {
      projectId = projectMatch[0];
    }
  }
  return dsnFromComponents({ host, pass, path: path2, projectId, port, protocol: protocol2, publicKey });
}
function dsnFromComponents(components) {
  return {
    protocol: components.protocol,
    publicKey: components.publicKey || "",
    pass: components.pass || "",
    host: components.host,
    port: components.port || "",
    path: components.path || "",
    projectId: components.projectId
  };
}
function validateDsn(dsn) {
  if (!DEBUG_BUILD) {
    return true;
  }
  const { port, projectId, protocol: protocol2 } = dsn;
  const requiredComponents = ["protocol", "publicKey", "host", "projectId"];
  const hasMissingRequiredComponent = requiredComponents.find((component) => {
    if (!dsn[component]) {
      debug.error(`Invalid Sentry Dsn: ${component} missing`);
      return true;
    }
    return false;
  });
  if (hasMissingRequiredComponent) {
    return false;
  }
  if (!projectId.match(/^\d+$/)) {
    debug.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
    return false;
  }
  if (!isValidProtocol(protocol2)) {
    debug.error(`Invalid Sentry Dsn: Invalid protocol ${protocol2}`);
    return false;
  }
  if (port && isNaN(parseInt(port, 10))) {
    debug.error(`Invalid Sentry Dsn: Invalid port ${port}`);
    return false;
  }
  return true;
}
function extractOrgIdFromDsnHost(host) {
  const match = host.match(ORG_ID_REGEX);
  return match?.[1];
}
function extractOrgIdFromClient(client) {
  const options = client.getOptions();
  const { host } = client.getDsn() || {};
  let org_id;
  if (options.orgId) {
    org_id = String(options.orgId);
  } else if (host) {
    org_id = extractOrgIdFromDsnHost(host);
  }
  return org_id;
}
function makeDsn(from) {
  const components = typeof from === "string" ? dsnFromString(from) : dsnFromComponents(from);
  if (!components || !validateDsn(components)) {
    return void 0;
  }
  return components;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/parseSampleRate.js
function parseSampleRate(sampleRate) {
  if (typeof sampleRate === "boolean") {
    return Number(sampleRate);
  }
  const rate = typeof sampleRate === "string" ? parseFloat(sampleRate) : sampleRate;
  if (typeof rate !== "number" || isNaN(rate) || rate < 0 || rate > 1) {
    return void 0;
  }
  return rate;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/tracing.js
var TRACEPARENT_REGEXP = new RegExp(
  "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$"
  // whitespace
);
function extractTraceparentData(traceparent) {
  if (!traceparent) {
    return void 0;
  }
  const matches = traceparent.match(TRACEPARENT_REGEXP);
  if (!matches) {
    return void 0;
  }
  let parentSampled;
  if (matches[3] === "1") {
    parentSampled = true;
  } else if (matches[3] === "0") {
    parentSampled = false;
  }
  return {
    traceId: matches[1],
    parentSampled,
    parentSpanId: matches[2]
  };
}
function propagationContextFromHeaders(sentryTrace, baggage) {
  const traceparentData = extractTraceparentData(sentryTrace);
  const dynamicSamplingContext = baggageHeaderToDynamicSamplingContext(baggage);
  if (!traceparentData?.traceId) {
    return {
      traceId: generateTraceId(),
      sampleRand: safeMathRandom()
    };
  }
  const sampleRand = getSampleRandFromTraceparentAndDsc(traceparentData, dynamicSamplingContext);
  if (dynamicSamplingContext) {
    dynamicSamplingContext.sample_rand = sampleRand.toString();
  }
  const { traceId, parentSpanId, parentSampled } = traceparentData;
  return {
    traceId,
    parentSpanId,
    sampled: parentSampled,
    dsc: dynamicSamplingContext || {},
    // If we have traceparent data but no DSC it means we are not head of trace and we must freeze it
    sampleRand
  };
}
function generateSentryTraceHeader(traceId = generateTraceId(), spanId = generateSpanId(), sampled) {
  let sampledString = "";
  if (sampled !== void 0) {
    sampledString = sampled ? "-1" : "-0";
  }
  return `${traceId}-${spanId}${sampledString}`;
}
function generateTraceparentHeader(traceId = generateTraceId(), spanId = generateSpanId(), sampled) {
  return `00-${traceId}-${spanId}-${sampled ? "01" : "00"}`;
}
function getSampleRandFromTraceparentAndDsc(traceparentData, dsc) {
  const parsedSampleRand = parseSampleRate(dsc?.sample_rand);
  if (parsedSampleRand !== void 0) {
    return parsedSampleRand;
  }
  const parsedSampleRate = parseSampleRate(dsc?.sample_rate);
  if (parsedSampleRate && traceparentData?.parentSampled !== void 0) {
    return traceparentData.parentSampled ? (
      // Returns a sample rand with positive sampling decision [0, sampleRate)
      safeMathRandom() * parsedSampleRate
    ) : (
      // Returns a sample rand with negative sampling decision [sampleRate, 1)
      parsedSampleRate + safeMathRandom() * (1 - parsedSampleRate)
    );
  } else {
    return safeMathRandom();
  }
}
function shouldContinueTrace(client, baggageOrgId) {
  const clientOrgId = extractOrgIdFromClient(client);
  if (baggageOrgId && clientOrgId && baggageOrgId !== clientOrgId) {
    debug.log(
      `Won't continue trace because org IDs don't match (incoming baggage: ${baggageOrgId}, SDK options: ${clientOrgId})`
    );
    return false;
  }
  const strictTraceContinuation = client.getOptions().strictTraceContinuation || false;
  if (strictTraceContinuation) {
    if (baggageOrgId && !clientOrgId || !baggageOrgId && clientOrgId) {
      debug.log(
        `Starting a new trace because strict trace continuation is enabled but one org ID is missing (incoming baggage: ${baggageOrgId}, Sentry client: ${clientOrgId})`
      );
      return false;
    }
  }
  return true;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js
var TRACE_FLAG_NONE = 0;
var TRACE_FLAG_SAMPLED = 1;
var hasShownSpanDropWarning = false;
function spanToTransactionTraceContext(span) {
  const { spanId: span_id, traceId: trace_id } = span.spanContext();
  const { data, op, parent_span_id, status, origin, links } = spanToJSON(span);
  return {
    parent_span_id,
    span_id,
    trace_id,
    data,
    op,
    status,
    origin,
    links
  };
}
function spanToTraceContext(span) {
  const { spanId, traceId: trace_id, isRemote } = span.spanContext();
  const parent_span_id = isRemote ? spanId : spanToJSON(span).parent_span_id;
  const scope = getCapturedScopesOnSpan(span).scope;
  const span_id = isRemote ? scope?.getPropagationContext().propagationSpanId || generateSpanId() : spanId;
  return {
    parent_span_id,
    span_id,
    trace_id
  };
}
function spanToTraceHeader(span) {
  const { traceId, spanId } = span.spanContext();
  const sampled = spanIsSampled(span);
  return generateSentryTraceHeader(traceId, spanId, sampled);
}
function spanToTraceparentHeader(span) {
  const { traceId, spanId } = span.spanContext();
  const sampled = spanIsSampled(span);
  return generateTraceparentHeader(traceId, spanId, sampled);
}
function convertSpanLinksForEnvelope(links) {
  if (links && links.length > 0) {
    return links.map(({ context: { spanId, traceId, traceFlags, ...restContext }, attributes: attributes2 }) => ({
      span_id: spanId,
      trace_id: traceId,
      sampled: traceFlags === TRACE_FLAG_SAMPLED,
      attributes: attributes2,
      ...restContext
    }));
  } else {
    return void 0;
  }
}
function spanTimeInputToSeconds(input) {
  if (typeof input === "number") {
    return ensureTimestampInSeconds(input);
  }
  if (Array.isArray(input)) {
    return input[0] + input[1] / 1e9;
  }
  if (input instanceof Date) {
    return ensureTimestampInSeconds(input.getTime());
  }
  return timestampInSeconds();
}
function ensureTimestampInSeconds(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp / 1e3 : timestamp;
}
function spanToJSON(span) {
  if (spanIsSentrySpan(span)) {
    return span.getSpanJSON();
  }
  const { spanId: span_id, traceId: trace_id } = span.spanContext();
  if (spanIsOpenTelemetrySdkTraceBaseSpan(span)) {
    const { attributes: attributes2, startTime, name, endTime, status, links } = span;
    const parentSpanId = "parentSpanId" in span ? span.parentSpanId : "parentSpanContext" in span ? span.parentSpanContext?.spanId : void 0;
    return {
      span_id,
      trace_id,
      data: attributes2,
      description: name,
      parent_span_id: parentSpanId,
      start_timestamp: spanTimeInputToSeconds(startTime),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: spanTimeInputToSeconds(endTime) || void 0,
      status: getStatusMessage(status),
      op: attributes2[SEMANTIC_ATTRIBUTE_SENTRY_OP],
      origin: attributes2[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
      links: convertSpanLinksForEnvelope(links)
    };
  }
  return {
    span_id,
    trace_id,
    start_timestamp: 0,
    data: {}
  };
}
function spanIsOpenTelemetrySdkTraceBaseSpan(span) {
  const castSpan = span;
  return !!castSpan.attributes && !!castSpan.startTime && !!castSpan.name && !!castSpan.endTime && !!castSpan.status;
}
function spanIsSentrySpan(span) {
  return typeof span.getSpanJSON === "function";
}
function spanIsSampled(span) {
  const { traceFlags } = span.spanContext();
  return traceFlags === TRACE_FLAG_SAMPLED;
}
function getStatusMessage(status) {
  if (!status || status.code === SPAN_STATUS_UNSET) {
    return void 0;
  }
  if (status.code === SPAN_STATUS_OK) {
    return "ok";
  }
  return status.message || "internal_error";
}
var CHILD_SPANS_FIELD = "_sentryChildSpans";
var ROOT_SPAN_FIELD = "_sentryRootSpan";
function addChildSpanToSpan(span, childSpan) {
  const rootSpan = span[ROOT_SPAN_FIELD] || span;
  addNonEnumerableProperty(childSpan, ROOT_SPAN_FIELD, rootSpan);
  if (span[CHILD_SPANS_FIELD]) {
    span[CHILD_SPANS_FIELD].add(childSpan);
  } else {
    addNonEnumerableProperty(span, CHILD_SPANS_FIELD, /* @__PURE__ */ new Set([childSpan]));
  }
}
function getSpanDescendants(span) {
  const resultSet = /* @__PURE__ */ new Set();
  function addSpanChildren(span2) {
    if (resultSet.has(span2)) {
      return;
    } else if (spanIsSampled(span2)) {
      resultSet.add(span2);
      const childSpans = span2[CHILD_SPANS_FIELD] ? Array.from(span2[CHILD_SPANS_FIELD]) : [];
      for (const childSpan of childSpans) {
        addSpanChildren(childSpan);
      }
    }
  }
  addSpanChildren(span);
  return Array.from(resultSet);
}
function getRootSpan(span) {
  return span[ROOT_SPAN_FIELD] || span;
}
function getActiveSpan2() {
  const carrier = getMainCarrier();
  const acs = getAsyncContextStrategy(carrier);
  if (acs.getActiveSpan) {
    return acs.getActiveSpan();
  }
  return _getSpanForScope(getCurrentScope());
}
function showSpanDropWarning() {
  if (!hasShownSpanDropWarning) {
    consoleSandbox(() => {
      console.warn(
        "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
      );
    });
    hasShownSpanDropWarning = true;
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/errors.js
var errorsInstrumented = false;
function registerSpanErrorInstrumentation() {
  if (errorsInstrumented) {
    return;
  }
  function errorCallback() {
    const activeSpan = getActiveSpan2();
    const rootSpan = activeSpan && getRootSpan(activeSpan);
    if (rootSpan) {
      const message = "internal_error";
      DEBUG_BUILD && debug.log(`[Tracing] Root span: ${message} -> Global error occurred`);
      rootSpan.setStatus({ code: SPAN_STATUS_ERROR, message });
    }
  }
  errorCallback.tag = "sentry_tracingErrorCallback";
  errorsInstrumented = true;
  addGlobalErrorInstrumentationHandler(errorCallback);
  addGlobalUnhandledRejectionInstrumentationHandler(errorCallback);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js
function hasSpansEnabled(maybeOptions) {
  if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) {
    return false;
  }
  const options = maybeOptions || getClient()?.getOptions();
  return !!options && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (options.tracesSampleRate != null || !!options.tracesSampler);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/should-ignore-span.js
function logIgnoredSpan(droppedSpan) {
  debug.log(`Ignoring span ${droppedSpan.op} - ${droppedSpan.description} because it matches \`ignoreSpans\`.`);
}
function shouldIgnoreSpan(span, ignoreSpans) {
  if (!ignoreSpans?.length || !span.description) {
    return false;
  }
  for (const pattern of ignoreSpans) {
    if (isStringOrRegExp(pattern)) {
      if (isMatchingPattern(span.description, pattern)) {
        DEBUG_BUILD && logIgnoredSpan(span);
        return true;
      }
      continue;
    }
    if (!pattern.name && !pattern.op) {
      continue;
    }
    const nameMatches = pattern.name ? isMatchingPattern(span.description, pattern.name) : true;
    const opMatches = pattern.op ? span.op && isMatchingPattern(span.op, pattern.op) : true;
    if (nameMatches && opMatches) {
      DEBUG_BUILD && logIgnoredSpan(span);
      return true;
    }
  }
  return false;
}
function reparentChildSpans(spans, dropSpan) {
  const droppedSpanParentId = dropSpan.parent_span_id;
  const droppedSpanId = dropSpan.span_id;
  if (!droppedSpanParentId) {
    return;
  }
  for (const span of spans) {
    if (span.parent_span_id === droppedSpanId) {
      span.parent_span_id = droppedSpanParentId;
    }
  }
}
function isStringOrRegExp(value) {
  return typeof value === "string" || value instanceof RegExp;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/constants.js
var DEFAULT_ENVIRONMENT = "production";

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js
var FROZEN_DSC_FIELD = "_frozenDsc";
function freezeDscOnSpan(span, dsc) {
  const spanWithMaybeDsc = span;
  addNonEnumerableProperty(spanWithMaybeDsc, FROZEN_DSC_FIELD, dsc);
}
function getDynamicSamplingContextFromClient(trace_id, client) {
  const options = client.getOptions();
  const { publicKey: public_key } = client.getDsn() || {};
  const dsc = {
    environment: options.environment || DEFAULT_ENVIRONMENT,
    release: options.release,
    public_key,
    trace_id,
    org_id: extractOrgIdFromClient(client)
  };
  client.emit("createDsc", dsc);
  return dsc;
}
function getDynamicSamplingContextFromScope(client, scope) {
  const propagationContext = scope.getPropagationContext();
  return propagationContext.dsc || getDynamicSamplingContextFromClient(propagationContext.traceId, client);
}
function getDynamicSamplingContextFromSpan(span) {
  const client = getClient();
  if (!client) {
    return {};
  }
  const rootSpan = getRootSpan(span);
  const rootSpanJson = spanToJSON(rootSpan);
  const rootSpanAttributes = rootSpanJson.data;
  const traceState = rootSpan.spanContext().traceState;
  const rootSpanSampleRate = traceState?.get("sentry.sample_rate") ?? rootSpanAttributes[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE] ?? rootSpanAttributes[SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE];
  function applyLocalSampleRateToDsc(dsc2) {
    if (typeof rootSpanSampleRate === "number" || typeof rootSpanSampleRate === "string") {
      dsc2.sample_rate = `${rootSpanSampleRate}`;
    }
    return dsc2;
  }
  const frozenDsc = rootSpan[FROZEN_DSC_FIELD];
  if (frozenDsc) {
    return applyLocalSampleRateToDsc(frozenDsc);
  }
  const traceStateDsc = traceState?.get("sentry.dsc");
  const dscOnTraceState = traceStateDsc && baggageHeaderToDynamicSamplingContext(traceStateDsc);
  if (dscOnTraceState) {
    return applyLocalSampleRateToDsc(dscOnTraceState);
  }
  const dsc = getDynamicSamplingContextFromClient(span.spanContext().traceId, client);
  const source = rootSpanAttributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
  const name = rootSpanJson.description;
  if (source !== "url" && name) {
    dsc.transaction = name;
  }
  if (hasSpansEnabled()) {
    dsc.sampled = String(spanIsSampled(rootSpan));
    dsc.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
    // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
    traceState?.get("sentry.sample_rand") ?? // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    getCapturedScopesOnSpan(rootSpan).scope?.getPropagationContext().sampleRand.toString();
  }
  applyLocalSampleRateToDsc(dsc);
  client.emit("createDsc", dsc, rootSpan);
  return dsc;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js
var SentryNonRecordingSpan = class {
  constructor(spanContext = {}) {
    this._traceId = spanContext.traceId || generateTraceId();
    this._spanId = spanContext.spanId || generateSpanId();
  }
  /** @inheritdoc */
  spanContext() {
    return {
      spanId: this._spanId,
      traceId: this._traceId,
      traceFlags: TRACE_FLAG_NONE
    };
  }
  /** @inheritdoc */
  end(_timestamp) {
  }
  /** @inheritdoc */
  setAttribute(_key, _value) {
    return this;
  }
  /** @inheritdoc */
  setAttributes(_values) {
    return this;
  }
  /** @inheritdoc */
  setStatus(_status) {
    return this;
  }
  /** @inheritdoc */
  updateName(_name) {
    return this;
  }
  /** @inheritdoc */
  isRecording() {
    return false;
  }
  /** @inheritdoc */
  addEvent(_name, _attributesOrStartTime, _startTime) {
    return this;
  }
  /** @inheritDoc */
  addLink(_link) {
    return this;
  }
  /** @inheritDoc */
  addLinks(_links) {
    return this;
  }
  /**
   * This should generally not be used,
   * but we need it for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */
  recordException(_exception, _time) {
  }
};

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/normalize.js
function normalize(input, depth = 100, maxProperties = Infinity) {
  try {
    return visit("", input, depth, maxProperties);
  } catch (err) {
    return { ERROR: `**non-serializable** (${err})` };
  }
}
function normalizeToSize(object, depth = 3, maxSize = 100 * 1024) {
  const normalized = normalize(object, depth);
  if (jsonSize(normalized) > maxSize) {
    return normalizeToSize(object, depth - 1, maxSize);
  }
  return normalized;
}
function visit(key, value, depth = Infinity, maxProperties = Infinity, memo = memoBuilder()) {
  const [memoize, unmemoize] = memo;
  if (value == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof value) || typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const stringified = stringifyValue(key, value);
  if (!stringified.startsWith("[object ")) {
    return stringified;
  }
  if (value["__sentry_skip_normalization__"]) {
    return value;
  }
  const remainingDepth = typeof value["__sentry_override_normalization_depth__"] === "number" ? value["__sentry_override_normalization_depth__"] : depth;
  if (remainingDepth === 0) {
    return stringified.replace("object ", "");
  }
  if (memoize(value)) {
    return "[Circular ~]";
  }
  const valueWithToJSON = value;
  if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") {
    try {
      const jsonValue = valueWithToJSON.toJSON();
      return visit("", jsonValue, remainingDepth - 1, maxProperties, memo);
    } catch {
    }
  }
  const normalized = Array.isArray(value) ? [] : {};
  let numAdded = 0;
  const visitable = convertToPlainObject(value);
  for (const visitKey in visitable) {
    if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
      continue;
    }
    if (numAdded >= maxProperties) {
      normalized[visitKey] = "[MaxProperties ~]";
      break;
    }
    const visitValue = visitable[visitKey];
    normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo);
    numAdded++;
  }
  unmemoize(value);
  return normalized;
}
function stringifyValue(key, value) {
  try {
    if (key === "domain" && value && typeof value === "object" && value._events) {
      return "[Domain]";
    }
    if (key === "domainEmitter") {
      return "[DomainEmitter]";
    }
    if (typeof global !== "undefined" && value === global) {
      return "[Global]";
    }
    if (typeof window !== "undefined" && value === window) {
      return "[Window]";
    }
    if (typeof document !== "undefined" && value === document) {
      return "[Document]";
    }
    if (isVueViewModel(value)) {
      return getVueInternalName(value);
    }
    if (isSyntheticEvent(value)) {
      return "[SyntheticEvent]";
    }
    if (typeof value === "number" && !Number.isFinite(value)) {
      return `[${value}]`;
    }
    if (typeof value === "function") {
      return `[Function: ${getFunctionName(value)}]`;
    }
    if (typeof value === "symbol") {
      return `[${String(value)}]`;
    }
    if (typeof value === "bigint") {
      return `[BigInt: ${String(value)}]`;
    }
    const objName = getConstructorName(value);
    if (/^HTML(\w*)Element$/.test(objName)) {
      return `[HTMLElement: ${objName}]`;
    }
    return `[object ${objName}]`;
  } catch (err) {
    return `**non-serializable** (${err})`;
  }
}
function getConstructorName(value) {
  const prototype = Object.getPrototypeOf(value);
  return prototype?.constructor ? prototype.constructor.name : "null prototype";
}
function utf8Length(value) {
  return ~-encodeURI(value).split(/%..|./).length;
}
function jsonSize(value) {
  return utf8Length(JSON.stringify(value));
}
function normalizeUrlToBase(url, basePath) {
  const escapedBase = basePath.replace(/\\/g, "/").replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  let newUrl = url;
  try {
    newUrl = decodeURI(url);
  } catch {
  }
  return newUrl.replace(/\\/g, "/").replace(/webpack:\/?/g, "").replace(new RegExp(`(file://)?/*${escapedBase}/*`, "ig"), "app:///");
}
function memoBuilder() {
  const inner = /* @__PURE__ */ new WeakSet();
  function memoize(obj) {
    if (inner.has(obj)) {
      return true;
    }
    inner.add(obj);
    return false;
  }
  function unmemoize(obj) {
    inner.delete(obj);
  }
  return [memoize, unmemoize];
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/envelope.js
function createEnvelope(headers, items = []) {
  return [headers, items];
}
function addItemToEnvelope(envelope, newItem) {
  const [headers, items] = envelope;
  return [headers, [...items, newItem]];
}
function forEachEnvelopeItem(envelope, callback) {
  const envelopeItems = envelope[1];
  for (const envelopeItem of envelopeItems) {
    const envelopeItemType = envelopeItem[0].type;
    const result = callback(envelopeItem, envelopeItemType);
    if (result) {
      return true;
    }
  }
  return false;
}
function envelopeContainsItemType(envelope, types) {
  return forEachEnvelopeItem(envelope, (_, type) => types.includes(type));
}
function encodeUTF8(input) {
  const carrier = getSentryCarrier(GLOBAL_OBJ);
  return carrier.encodePolyfill ? carrier.encodePolyfill(input) : new TextEncoder().encode(input);
}
function decodeUTF8(input) {
  const carrier = getSentryCarrier(GLOBAL_OBJ);
  return carrier.decodePolyfill ? carrier.decodePolyfill(input) : new TextDecoder().decode(input);
}
function serializeEnvelope(envelope) {
  const [envHeaders, items] = envelope;
  let parts = JSON.stringify(envHeaders);
  function append(next) {
    if (typeof parts === "string") {
      parts = typeof next === "string" ? parts + next : [encodeUTF8(parts), next];
    } else {
      parts.push(typeof next === "string" ? encodeUTF8(next) : next);
    }
  }
  for (const item of items) {
    const [itemHeaders, payload] = item;
    append(`
${JSON.stringify(itemHeaders)}
`);
    if (typeof payload === "string" || payload instanceof Uint8Array) {
      append(payload);
    } else {
      let stringifiedPayload;
      try {
        stringifiedPayload = JSON.stringify(payload);
      } catch {
        stringifiedPayload = JSON.stringify(normalize(payload));
      }
      append(stringifiedPayload);
    }
  }
  return typeof parts === "string" ? parts : concatBuffers(parts);
}
function concatBuffers(buffers) {
  const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const buffer of buffers) {
    merged.set(buffer, offset);
    offset += buffer.length;
  }
  return merged;
}
function parseEnvelope(env) {
  let buffer = typeof env === "string" ? encodeUTF8(env) : env;
  function readBinary(length) {
    const bin = buffer.subarray(0, length);
    buffer = buffer.subarray(length + 1);
    return bin;
  }
  function readJson() {
    let i = buffer.indexOf(10);
    if (i < 0) {
      i = buffer.length;
    }
    return JSON.parse(decodeUTF8(readBinary(i)));
  }
  const envelopeHeader = readJson();
  const items = [];
  while (buffer.length) {
    const itemHeader = readJson();
    const binaryLength = typeof itemHeader.length === "number" ? itemHeader.length : void 0;
    items.push([itemHeader, binaryLength ? readBinary(binaryLength) : readJson()]);
  }
  return [envelopeHeader, items];
}
function createSpanEnvelopeItem(spanJson) {
  const spanHeaders = {
    type: "span"
  };
  return [spanHeaders, spanJson];
}
function createAttachmentEnvelopeItem(attachment) {
  const buffer = typeof attachment.data === "string" ? encodeUTF8(attachment.data) : attachment.data;
  return [
    {
      type: "attachment",
      length: buffer.length,
      filename: attachment.filename,
      content_type: attachment.contentType,
      attachment_type: attachment.attachmentType
    },
    buffer
  ];
}
var ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
  session: "session",
  sessions: "session",
  attachment: "attachment",
  transaction: "transaction",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile: "profile",
  profile_chunk: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  feedback: "feedback",
  span: "span",
  raw_security: "security",
  log: "log_item",
  metric: "metric",
  trace_metric: "metric"
};
function envelopeItemTypeToDataCategory(type) {
  return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
}
function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
  if (!metadataOrEvent?.sdk) {
    return;
  }
  const { name, version: version2 } = metadataOrEvent.sdk;
  return { name, version: version2 };
}
function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn) {
  const dynamicSamplingContext = event.sdkProcessingMetadata?.dynamicSamplingContext;
  return {
    event_id: event.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...sdkInfo && { sdk: sdkInfo },
    ...!!tunnel && dsn && { dsn: dsnToString(dsn) },
    ...dynamicSamplingContext && {
      trace: dynamicSamplingContext
    }
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/envelope.js
function _enhanceEventWithSdkInfo(event, newSdkInfo) {
  if (!newSdkInfo) {
    return event;
  }
  const eventSdkInfo = event.sdk || {};
  event.sdk = {
    ...eventSdkInfo,
    name: eventSdkInfo.name || newSdkInfo.name,
    version: eventSdkInfo.version || newSdkInfo.version,
    integrations: [...event.sdk?.integrations || [], ...newSdkInfo.integrations || []],
    packages: [...event.sdk?.packages || [], ...newSdkInfo.packages || []],
    settings: event.sdk?.settings || newSdkInfo.settings ? {
      ...event.sdk?.settings,
      ...newSdkInfo.settings
    } : void 0
  };
  return event;
}
function createSessionEnvelope(session2, dsn, metadata, tunnel) {
  const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
  const envelopeHeaders = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...sdkInfo && { sdk: sdkInfo },
    ...!!tunnel && dsn && { dsn: dsnToString(dsn) }
  };
  const envelopeItem = "aggregates" in session2 ? [{ type: "sessions" }, session2] : [{ type: "session" }, session2.toJSON()];
  return createEnvelope(envelopeHeaders, [envelopeItem]);
}
function createEventEnvelope(event, dsn, metadata, tunnel) {
  const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
  const eventType = event.type && event.type !== "replay_event" ? event.type : "event";
  _enhanceEventWithSdkInfo(event, metadata?.sdk);
  const envelopeHeaders = createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);
  delete event.sdkProcessingMetadata;
  const eventItem = [{ type: eventType }, event];
  return createEnvelope(envelopeHeaders, [eventItem]);
}
function createSpanEnvelope(spans, client) {
  function dscHasRequiredProps(dsc2) {
    return !!dsc2.trace_id && !!dsc2.public_key;
  }
  const dsc = getDynamicSamplingContextFromSpan(spans[0]);
  const dsn = client?.getDsn();
  const tunnel = client?.getOptions().tunnel;
  const headers = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...dscHasRequiredProps(dsc) && { trace: dsc },
    ...!!tunnel && dsn && { dsn: dsnToString(dsn) }
  };
  const { beforeSendSpan, ignoreSpans } = client?.getOptions() || {};
  const filteredSpans = ignoreSpans?.length ? spans.filter((span) => !shouldIgnoreSpan(spanToJSON(span), ignoreSpans)) : spans;
  const droppedSpans = spans.length - filteredSpans.length;
  if (droppedSpans) {
    client?.recordDroppedEvent("before_send", "span", droppedSpans);
  }
  const convertToSpanJSON = beforeSendSpan ? (span) => {
    const spanJson = spanToJSON(span);
    const processedSpan = beforeSendSpan(spanJson);
    if (!processedSpan) {
      showSpanDropWarning();
      return spanJson;
    }
    return processedSpan;
  } : spanToJSON;
  const items = [];
  for (const span of filteredSpans) {
    const spanJson = convertToSpanJSON(span);
    if (spanJson) {
      items.push(createSpanEnvelopeItem(spanJson));
    }
  }
  return createEnvelope(headers, items);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/logSpans.js
function logSpanStart(span) {
  if (!DEBUG_BUILD) return;
  const { description = "< unknown name >", op = "< unknown op >", parent_span_id: parentSpanId } = spanToJSON(span);
  const { spanId } = span.spanContext();
  const sampled = spanIsSampled(span);
  const rootSpan = getRootSpan(span);
  const isRootSpan = rootSpan === span;
  const header = `[Tracing] Starting ${sampled ? "sampled" : "unsampled"} ${isRootSpan ? "root " : ""}span`;
  const infoParts = [`op: ${op}`, `name: ${description}`, `ID: ${spanId}`];
  if (parentSpanId) {
    infoParts.push(`parent ID: ${parentSpanId}`);
  }
  if (!isRootSpan) {
    const { op: op2, description: description2 } = spanToJSON(rootSpan);
    infoParts.push(`root ID: ${rootSpan.spanContext().spanId}`);
    if (op2) {
      infoParts.push(`root op: ${op2}`);
    }
    if (description2) {
      infoParts.push(`root description: ${description2}`);
    }
  }
  debug.log(`${header}
  ${infoParts.join("\n  ")}`);
}
function logSpanEnd(span) {
  if (!DEBUG_BUILD) return;
  const { description = "< unknown name >", op = "< unknown op >" } = spanToJSON(span);
  const { spanId } = span.spanContext();
  const rootSpan = getRootSpan(span);
  const isRootSpan = rootSpan === span;
  const msg = `[Tracing] Finishing "${op}" ${isRootSpan ? "root " : ""}span "${description}" with ID ${spanId}`;
  debug.log(msg);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/measurement.js
function setMeasurement(name, value, unit, activeSpan = getActiveSpan2()) {
  const rootSpan = activeSpan && getRootSpan(activeSpan);
  if (rootSpan) {
    DEBUG_BUILD && debug.log(`[Measurement] Setting measurement on root span: ${name} = ${value} ${unit}`);
    rootSpan.addEvent(name, {
      [SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE]: value,
      [SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT]: unit
    });
  }
}
function timedEventsToMeasurements(events) {
  if (!events || events.length === 0) {
    return void 0;
  }
  const measurements = {};
  events.forEach((event) => {
    const attributes2 = event.attributes || {};
    const unit = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT];
    const value = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE];
    if (typeof unit === "string" && typeof value === "number") {
      measurements[event.name] = { value, unit };
    }
  });
  return measurements;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/sentrySpan.js
var MAX_SPAN_COUNT = 1e3;
var SentrySpan = class {
  /** Epoch timestamp in seconds when the span started. */
  /** Epoch timestamp in seconds when the span ended. */
  /** Internal keeper of the status */
  /** The timed events added to this span. */
  /** if true, treat span as a standalone span (not part of a transaction) */
  /**
   * You should never call the constructor manually, always use `Sentry.startSpan()`
   * or other span methods.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(spanContext = {}) {
    this._traceId = spanContext.traceId || generateTraceId();
    this._spanId = spanContext.spanId || generateSpanId();
    this._startTime = spanContext.startTimestamp || timestampInSeconds();
    this._links = spanContext.links;
    this._attributes = {};
    this.setAttributes({
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "manual",
      [SEMANTIC_ATTRIBUTE_SENTRY_OP]: spanContext.op,
      ...spanContext.attributes
    });
    this._name = spanContext.name;
    if (spanContext.parentSpanId) {
      this._parentSpanId = spanContext.parentSpanId;
    }
    if ("sampled" in spanContext) {
      this._sampled = spanContext.sampled;
    }
    if (spanContext.endTimestamp) {
      this._endTime = spanContext.endTimestamp;
    }
    this._events = [];
    this._isStandaloneSpan = spanContext.isStandalone;
    if (this._endTime) {
      this._onSpanEnded();
    }
  }
  /** @inheritDoc */
  addLink(link) {
    if (this._links) {
      this._links.push(link);
    } else {
      this._links = [link];
    }
    return this;
  }
  /** @inheritDoc */
  addLinks(links) {
    if (this._links) {
      this._links.push(...links);
    } else {
      this._links = links;
    }
    return this;
  }
  /**
   * This should generally not be used,
   * but it is needed for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */
  recordException(_exception, _time) {
  }
  /** @inheritdoc */
  spanContext() {
    const { _spanId: spanId, _traceId: traceId, _sampled: sampled } = this;
    return {
      spanId,
      traceId,
      traceFlags: sampled ? TRACE_FLAG_SAMPLED : TRACE_FLAG_NONE
    };
  }
  /** @inheritdoc */
  setAttribute(key, value) {
    if (value === void 0) {
      delete this._attributes[key];
    } else {
      this._attributes[key] = value;
    }
    return this;
  }
  /** @inheritdoc */
  setAttributes(attributes2) {
    Object.keys(attributes2).forEach((key) => this.setAttribute(key, attributes2[key]));
    return this;
  }
  /**
   * This should generally not be used,
   * but we need it for browser tracing where we want to adjust the start time afterwards.
   * USE THIS WITH CAUTION!
   *
   * @hidden
   * @internal
   */
  updateStartTime(timeInput) {
    this._startTime = spanTimeInputToSeconds(timeInput);
  }
  /**
   * @inheritDoc
   */
  setStatus(value) {
    this._status = value;
    return this;
  }
  /**
   * @inheritDoc
   */
  updateName(name) {
    this._name = name;
    this.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "custom");
    return this;
  }
  /** @inheritdoc */
  end(endTimestamp) {
    if (this._endTime) {
      return;
    }
    this._endTime = spanTimeInputToSeconds(endTimestamp);
    logSpanEnd(this);
    this._onSpanEnded();
  }
  /**
   * Get JSON representation of this span.
   *
   * @hidden
   * @internal This method is purely for internal purposes and should not be used outside
   * of SDK code. If you need to get a JSON representation of a span,
   * use `spanToJSON(span)` instead.
   */
  getSpanJSON() {
    return {
      data: this._attributes,
      description: this._name,
      op: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP],
      parent_span_id: this._parentSpanId,
      span_id: this._spanId,
      start_timestamp: this._startTime,
      status: getStatusMessage(this._status),
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
      profile_id: this._attributes[SEMANTIC_ATTRIBUTE_PROFILE_ID],
      exclusive_time: this._attributes[SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
      measurements: timedEventsToMeasurements(this._events),
      is_segment: this._isStandaloneSpan && getRootSpan(this) === this || void 0,
      segment_id: this._isStandaloneSpan ? getRootSpan(this).spanContext().spanId : void 0,
      links: convertSpanLinksForEnvelope(this._links)
    };
  }
  /** @inheritdoc */
  isRecording() {
    return !this._endTime && !!this._sampled;
  }
  /**
   * @inheritdoc
   */
  addEvent(name, attributesOrStartTime, startTime) {
    DEBUG_BUILD && debug.log("[Tracing] Adding an event to span:", name);
    const time = isSpanTimeInput(attributesOrStartTime) ? attributesOrStartTime : startTime || timestampInSeconds();
    const attributes2 = isSpanTimeInput(attributesOrStartTime) ? {} : attributesOrStartTime || {};
    const event = {
      name,
      time: spanTimeInputToSeconds(time),
      attributes: attributes2
    };
    this._events.push(event);
    return this;
  }
  /**
   * This method should generally not be used,
   * but for now we need a way to publicly check if the `_isStandaloneSpan` flag is set.
   * USE THIS WITH CAUTION!
   * @internal
   * @hidden
   * @experimental
   */
  isStandaloneSpan() {
    return !!this._isStandaloneSpan;
  }
  /** Emit `spanEnd` when the span is ended. */
  _onSpanEnded() {
    const client = getClient();
    if (client) {
      client.emit("spanEnd", this);
    }
    const isSegmentSpan = this._isStandaloneSpan || this === getRootSpan(this);
    if (!isSegmentSpan) {
      return;
    }
    if (this._isStandaloneSpan) {
      if (this._sampled) {
        sendSpanEnvelope(createSpanEnvelope([this], client));
      } else {
        DEBUG_BUILD && debug.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled.");
        if (client) {
          client.recordDroppedEvent("sample_rate", "span");
        }
      }
      return;
    }
    const transactionEvent = this._convertSpanToTransaction();
    if (transactionEvent) {
      const scope = getCapturedScopesOnSpan(this).scope || getCurrentScope();
      scope.captureEvent(transactionEvent);
    }
  }
  /**
   * Finish the transaction & prepare the event to send to Sentry.
   */
  _convertSpanToTransaction() {
    if (!isFullFinishedSpan(spanToJSON(this))) {
      return void 0;
    }
    if (!this._name) {
      DEBUG_BUILD && debug.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
      this._name = "<unlabeled transaction>";
    }
    const { scope: capturedSpanScope, isolationScope: capturedSpanIsolationScope } = getCapturedScopesOnSpan(this);
    const normalizedRequest = capturedSpanScope?.getScopeData().sdkProcessingMetadata?.normalizedRequest;
    if (this._sampled !== true) {
      return void 0;
    }
    const finishedSpans = getSpanDescendants(this).filter((span) => span !== this && !isStandaloneSpan(span));
    const spans = finishedSpans.map((span) => spanToJSON(span)).filter(isFullFinishedSpan);
    const source = this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
    delete this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
    spans.forEach((span) => {
      delete span.data[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
    });
    const transaction = {
      contexts: {
        trace: spanToTransactionTraceContext(this)
      },
      spans: (
        // spans.sort() mutates the array, but `spans` is already a copy so we can safely do this here
        // we do not use spans anymore after this point
        spans.length > MAX_SPAN_COUNT ? spans.sort((a, b) => a.start_timestamp - b.start_timestamp).slice(0, MAX_SPAN_COUNT) : spans
      ),
      start_timestamp: this._startTime,
      timestamp: this._endTime,
      transaction: this._name,
      type: "transaction",
      sdkProcessingMetadata: {
        capturedSpanScope,
        capturedSpanIsolationScope,
        dynamicSamplingContext: getDynamicSamplingContextFromSpan(this)
      },
      request: normalizedRequest,
      ...source && {
        transaction_info: {
          source
        }
      }
    };
    const measurements = timedEventsToMeasurements(this._events);
    const hasMeasurements = measurements && Object.keys(measurements).length;
    if (hasMeasurements) {
      DEBUG_BUILD && debug.log(
        "[Measurements] Adding measurements to transaction event",
        JSON.stringify(measurements, void 0, 2)
      );
      transaction.measurements = measurements;
    }
    return transaction;
  }
};
function isSpanTimeInput(value) {
  return value && typeof value === "number" || value instanceof Date || Array.isArray(value);
}
function isFullFinishedSpan(input) {
  return !!input.start_timestamp && !!input.timestamp && !!input.span_id && !!input.trace_id;
}
function isStandaloneSpan(span) {
  return span instanceof SentrySpan && span.isStandaloneSpan();
}
function sendSpanEnvelope(envelope) {
  const client = getClient();
  if (!client) {
    return;
  }
  const spanItems = envelope[1];
  if (!spanItems || spanItems.length === 0) {
    client.recordDroppedEvent("before_send", "span");
    return;
  }
  client.sendEnvelope(envelope);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js
function handleCallbackErrors(fn, onError, onFinally = () => {
}, onSuccess = () => {
}) {
  let maybePromiseResult;
  try {
    maybePromiseResult = fn();
  } catch (e) {
    onError(e);
    onFinally();
    throw e;
  }
  return maybeHandlePromiseRejection(maybePromiseResult, onError, onFinally, onSuccess);
}
function maybeHandlePromiseRejection(value, onError, onFinally, onSuccess) {
  if (isThenable(value)) {
    return value.then(
      (res) => {
        onFinally();
        onSuccess(res);
        return res;
      },
      (e) => {
        onError(e);
        onFinally();
        throw e;
      }
    );
  }
  onFinally();
  onSuccess(value);
  return value;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/sampling.js
function sampleSpan(options, samplingContext, sampleRand) {
  if (!hasSpansEnabled(options)) {
    return [false];
  }
  let localSampleRateWasApplied = void 0;
  let sampleRate;
  if (typeof options.tracesSampler === "function") {
    sampleRate = options.tracesSampler({
      ...samplingContext,
      inheritOrSampleWith: (fallbackSampleRate) => {
        if (typeof samplingContext.parentSampleRate === "number") {
          return samplingContext.parentSampleRate;
        }
        if (typeof samplingContext.parentSampled === "boolean") {
          return Number(samplingContext.parentSampled);
        }
        return fallbackSampleRate;
      }
    });
    localSampleRateWasApplied = true;
  } else if (samplingContext.parentSampled !== void 0) {
    sampleRate = samplingContext.parentSampled;
  } else if (typeof options.tracesSampleRate !== "undefined") {
    sampleRate = options.tracesSampleRate;
    localSampleRateWasApplied = true;
  }
  const parsedSampleRate = parseSampleRate(sampleRate);
  if (parsedSampleRate === void 0) {
    DEBUG_BUILD && debug.warn(
      `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        sampleRate
      )} of type ${JSON.stringify(typeof sampleRate)}.`
    );
    return [false];
  }
  if (!parsedSampleRate) {
    DEBUG_BUILD && debug.log(
      `[Tracing] Discarding transaction because ${typeof options.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    );
    return [false, parsedSampleRate, localSampleRateWasApplied];
  }
  const shouldSample = sampleRand < parsedSampleRate;
  if (!shouldSample) {
    DEBUG_BUILD && debug.log(
      `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
        sampleRate
      )})`
    );
  }
  return [shouldSample, parsedSampleRate, localSampleRateWasApplied];
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/tracing/trace.js
var SUPPRESS_TRACING_KEY = "__SENTRY_SUPPRESS_TRACING__";
function startSpanManual(options, callback) {
  const acs = getAcs();
  if (acs.startSpanManual) {
    return acs.startSpanManual(options, callback);
  }
  const spanArguments = parseSentrySpanArguments(options);
  const { forceTransaction, parentSpan: customParentSpan, scope: customScope } = options;
  const customForkedScope = customScope?.clone();
  return withScope2(customForkedScope, () => {
    const wrapper = getActiveSpanWrapper(customParentSpan);
    return wrapper(() => {
      const scope = getCurrentScope();
      const parentSpan = getParentSpan(scope, customParentSpan);
      const shouldSkipSpan = options.onlyIfParent && !parentSpan;
      const activeSpan = shouldSkipSpan ? new SentryNonRecordingSpan() : createChildOrRootSpan({
        parentSpan,
        spanArguments,
        forceTransaction,
        scope
      });
      _setSpanForScope(scope, activeSpan);
      return handleCallbackErrors(
        // We pass the `finish` function to the callback, so the user can finish the span manually
        // this is mainly here for historic purposes because previously, we instructed users to call
        // `finish` instead of `span.end()` to also clean up the scope. Nowadays, calling `span.end()`
        // or `finish` has the same effect and we simply leave it here to avoid breaking user code.
        () => callback(activeSpan, () => activeSpan.end()),
        () => {
          const { status } = spanToJSON(activeSpan);
          if (activeSpan.isRecording() && (!status || status === "ok")) {
            activeSpan.setStatus({ code: SPAN_STATUS_ERROR, message: "internal_error" });
          }
        }
      );
    });
  });
}
function startInactiveSpan(options) {
  const acs = getAcs();
  if (acs.startInactiveSpan) {
    return acs.startInactiveSpan(options);
  }
  const spanArguments = parseSentrySpanArguments(options);
  const { forceTransaction, parentSpan: customParentSpan } = options;
  const wrapper = options.scope ? (callback) => withScope2(options.scope, callback) : customParentSpan !== void 0 ? (callback) => withActiveSpan(customParentSpan, callback) : (callback) => callback();
  return wrapper(() => {
    const scope = getCurrentScope();
    const parentSpan = getParentSpan(scope, customParentSpan);
    const shouldSkipSpan = options.onlyIfParent && !parentSpan;
    if (shouldSkipSpan) {
      return new SentryNonRecordingSpan();
    }
    return createChildOrRootSpan({
      parentSpan,
      spanArguments,
      forceTransaction,
      scope
    });
  });
}
function withActiveSpan(span, callback) {
  const acs = getAcs();
  if (acs.withActiveSpan) {
    return acs.withActiveSpan(span, callback);
  }
  return withScope2((scope) => {
    _setSpanForScope(scope, span || void 0);
    return callback(scope);
  });
}
function createChildOrRootSpan({
  parentSpan,
  spanArguments,
  forceTransaction,
  scope
}) {
  if (!hasSpansEnabled()) {
    const span2 = new SentryNonRecordingSpan();
    if (forceTransaction || !parentSpan) {
      const dsc = {
        sampled: "false",
        sample_rate: "0",
        transaction: spanArguments.name,
        ...getDynamicSamplingContextFromSpan(span2)
      };
      freezeDscOnSpan(span2, dsc);
    }
    return span2;
  }
  const isolationScope = getIsolationScope();
  let span;
  if (parentSpan && !forceTransaction) {
    span = _startChildSpan(parentSpan, scope, spanArguments);
    addChildSpanToSpan(parentSpan, span);
  } else if (parentSpan) {
    const dsc = getDynamicSamplingContextFromSpan(parentSpan);
    const { traceId, spanId: parentSpanId } = parentSpan.spanContext();
    const parentSampled = spanIsSampled(parentSpan);
    span = _startRootSpan(
      {
        traceId,
        parentSpanId,
        ...spanArguments
      },
      scope,
      parentSampled
    );
    freezeDscOnSpan(span, dsc);
  } else {
    const {
      traceId,
      dsc,
      parentSpanId,
      sampled: parentSampled
    } = {
      ...isolationScope.getPropagationContext(),
      ...scope.getPropagationContext()
    };
    span = _startRootSpan(
      {
        traceId,
        parentSpanId,
        ...spanArguments
      },
      scope,
      parentSampled
    );
    if (dsc) {
      freezeDscOnSpan(span, dsc);
    }
  }
  logSpanStart(span);
  setCapturedScopesOnSpan(span, scope, isolationScope);
  return span;
}
function parseSentrySpanArguments(options) {
  const exp = options.experimental || {};
  const initialCtx = {
    isStandalone: exp.standalone,
    ...options
  };
  if (options.startTime) {
    const ctx = { ...initialCtx };
    ctx.startTimestamp = spanTimeInputToSeconds(options.startTime);
    delete ctx.startTime;
    return ctx;
  }
  return initialCtx;
}
function getAcs() {
  const carrier = getMainCarrier();
  return getAsyncContextStrategy(carrier);
}
function _startRootSpan(spanArguments, scope, parentSampled) {
  const client = getClient();
  const options = client?.getOptions() || {};
  const { name = "" } = spanArguments;
  const mutableSpanSamplingData = { spanAttributes: { ...spanArguments.attributes }, spanName: name, parentSampled };
  client?.emit("beforeSampling", mutableSpanSamplingData, { decision: false });
  const finalParentSampled = mutableSpanSamplingData.parentSampled ?? parentSampled;
  const finalAttributes = mutableSpanSamplingData.spanAttributes;
  const currentPropagationContext = scope.getPropagationContext();
  const [sampled, sampleRate, localSampleRateWasApplied] = scope.getScopeData().sdkProcessingMetadata[SUPPRESS_TRACING_KEY] ? [false] : sampleSpan(
    options,
    {
      name,
      parentSampled: finalParentSampled,
      attributes: finalAttributes,
      parentSampleRate: parseSampleRate(currentPropagationContext.dsc?.sample_rate)
    },
    currentPropagationContext.sampleRand
  );
  const rootSpan = new SentrySpan({
    ...spanArguments,
    attributes: {
      [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "custom",
      [SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: sampleRate !== void 0 && localSampleRateWasApplied ? sampleRate : void 0,
      ...finalAttributes
    },
    sampled
  });
  if (!sampled && client) {
    DEBUG_BUILD && debug.log("[Tracing] Discarding root span because its trace was not chosen to be sampled.");
    client.recordDroppedEvent("sample_rate", "transaction");
  }
  if (client) {
    client.emit("spanStart", rootSpan);
  }
  return rootSpan;
}
function _startChildSpan(parentSpan, scope, spanArguments) {
  const { spanId, traceId } = parentSpan.spanContext();
  const sampled = scope.getScopeData().sdkProcessingMetadata[SUPPRESS_TRACING_KEY] ? false : spanIsSampled(parentSpan);
  const childSpan = sampled ? new SentrySpan({
    ...spanArguments,
    parentSpanId: spanId,
    traceId,
    sampled
  }) : new SentryNonRecordingSpan({ traceId });
  addChildSpanToSpan(parentSpan, childSpan);
  const client = getClient();
  if (client) {
    client.emit("spanStart", childSpan);
    if (spanArguments.endTimestamp) {
      client.emit("spanEnd", childSpan);
    }
  }
  return childSpan;
}
function getParentSpan(scope, customParentSpan) {
  if (customParentSpan) {
    return customParentSpan;
  }
  if (customParentSpan === null) {
    return void 0;
  }
  const span = _getSpanForScope(scope);
  if (!span) {
    return void 0;
  }
  const client = getClient();
  const options = client ? client.getOptions() : {};
  if (options.parentSpanIsAlwaysRootSpan) {
    return getRootSpan(span);
  }
  return span;
}
function getActiveSpanWrapper(parentSpan) {
  return parentSpan !== void 0 ? (callback) => {
    return withActiveSpan(parentSpan, callback);
  } : (callback) => callback();
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/syncpromise.js
var STATE_PENDING = 0;
var STATE_RESOLVED = 1;
var STATE_REJECTED = 2;
function resolvedSyncPromise(value) {
  return new SyncPromise((resolve3) => {
    resolve3(value);
  });
}
function rejectedSyncPromise(reason) {
  return new SyncPromise((_, reject) => {
    reject(reason);
  });
}
var SyncPromise = class _SyncPromise {
  constructor(executor) {
    this._state = STATE_PENDING;
    this._handlers = [];
    this._runExecutor(executor);
  }
  /** @inheritdoc */
  then(onfulfilled, onrejected) {
    return new _SyncPromise((resolve3, reject) => {
      this._handlers.push([
        false,
        (result) => {
          if (!onfulfilled) {
            resolve3(result);
          } else {
            try {
              resolve3(onfulfilled(result));
            } catch (e) {
              reject(e);
            }
          }
        },
        (reason) => {
          if (!onrejected) {
            reject(reason);
          } else {
            try {
              resolve3(onrejected(reason));
            } catch (e) {
              reject(e);
            }
          }
        }
      ]);
      this._executeHandlers();
    });
  }
  /** @inheritdoc */
  catch(onrejected) {
    return this.then((val) => val, onrejected);
  }
  /** @inheritdoc */
  finally(onfinally) {
    return new _SyncPromise((resolve3, reject) => {
      let val;
      let isRejected;
      return this.then(
        (value) => {
          isRejected = false;
          val = value;
          if (onfinally) {
            onfinally();
          }
        },
        (reason) => {
          isRejected = true;
          val = reason;
          if (onfinally) {
            onfinally();
          }
        }
      ).then(() => {
        if (isRejected) {
          reject(val);
          return;
        }
        resolve3(val);
      });
    });
  }
  /** Excute the resolve/reject handlers. */
  _executeHandlers() {
    if (this._state === STATE_PENDING) {
      return;
    }
    const cachedHandlers = this._handlers.slice();
    this._handlers = [];
    cachedHandlers.forEach((handler) => {
      if (handler[0]) {
        return;
      }
      if (this._state === STATE_RESOLVED) {
        handler[1](this._value);
      }
      if (this._state === STATE_REJECTED) {
        handler[2](this._value);
      }
      handler[0] = true;
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(executor) {
    const setResult = (state, value) => {
      if (this._state !== STATE_PENDING) {
        return;
      }
      if (isThenable(value)) {
        void value.then(resolve3, reject);
        return;
      }
      this._state = state;
      this._value = value;
      this._executeHandlers();
    };
    const resolve3 = (value) => {
      setResult(STATE_RESOLVED, value);
    };
    const reject = (reason) => {
      setResult(STATE_REJECTED, reason);
    };
    try {
      executor(resolve3, reject);
    } catch (e) {
      reject(e);
    }
  }
};

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/eventProcessors.js
function notifyEventProcessors(processors, event, hint, index = 0) {
  try {
    const result = _notifyEventProcessors(event, hint, processors, index);
    return isThenable(result) ? result : resolvedSyncPromise(result);
  } catch (error3) {
    return rejectedSyncPromise(error3);
  }
}
function _notifyEventProcessors(event, hint, processors, index) {
  const processor = processors[index];
  if (!event || !processor) {
    return event;
  }
  const result = processor({ ...event }, hint);
  DEBUG_BUILD && result === null && debug.log(`Event processor "${processor.id || "?"}" dropped event`);
  if (isThenable(result)) {
    return result.then((final) => _notifyEventProcessors(final, hint, processors, index + 1));
  }
  return _notifyEventProcessors(result, hint, processors, index + 1);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/debug-ids.js
var parsedStackResults;
var lastSentryKeysCount;
var lastNativeKeysCount;
var cachedFilenameDebugIds;
function getFilenameToDebugIdMap(stackParser) {
  const sentryDebugIdMap = GLOBAL_OBJ._sentryDebugIds;
  const nativeDebugIdMap = GLOBAL_OBJ._debugIds;
  if (!sentryDebugIdMap && !nativeDebugIdMap) {
    return {};
  }
  const sentryDebugIdKeys = sentryDebugIdMap ? Object.keys(sentryDebugIdMap) : [];
  const nativeDebugIdKeys = nativeDebugIdMap ? Object.keys(nativeDebugIdMap) : [];
  if (cachedFilenameDebugIds && sentryDebugIdKeys.length === lastSentryKeysCount && nativeDebugIdKeys.length === lastNativeKeysCount) {
    return cachedFilenameDebugIds;
  }
  lastSentryKeysCount = sentryDebugIdKeys.length;
  lastNativeKeysCount = nativeDebugIdKeys.length;
  cachedFilenameDebugIds = {};
  if (!parsedStackResults) {
    parsedStackResults = {};
  }
  const processDebugIds = (debugIdKeys, debugIdMap) => {
    for (const key of debugIdKeys) {
      const debugId = debugIdMap[key];
      const result = parsedStackResults?.[key];
      if (result && cachedFilenameDebugIds && debugId) {
        cachedFilenameDebugIds[result[0]] = debugId;
        if (parsedStackResults) {
          parsedStackResults[key] = [result[0], debugId];
        }
      } else if (debugId) {
        const parsedStack = stackParser(key);
        for (let i = parsedStack.length - 1; i >= 0; i--) {
          const stackFrame = parsedStack[i];
          const filename = stackFrame?.filename;
          if (filename && cachedFilenameDebugIds && parsedStackResults) {
            cachedFilenameDebugIds[filename] = debugId;
            parsedStackResults[key] = [filename, debugId];
            break;
          }
        }
      }
    }
  };
  if (sentryDebugIdMap) {
    processDebugIds(sentryDebugIdKeys, sentryDebugIdMap);
  }
  if (nativeDebugIdMap) {
    processDebugIds(nativeDebugIdKeys, nativeDebugIdMap);
  }
  return cachedFilenameDebugIds;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/scopeData.js
function applyScopeDataToEvent(event, data) {
  const { fingerprint, span, breadcrumbs, sdkProcessingMetadata } = data;
  applyDataToEvent(event, data);
  if (span) {
    applySpanToEvent(event, span);
  }
  applyFingerprintToEvent(event, fingerprint);
  applyBreadcrumbsToEvent(event, breadcrumbs);
  applySdkMetadataToEvent(event, sdkProcessingMetadata);
}
function mergeScopeData(data, mergeData) {
  const {
    extra,
    tags,
    attributes: attributes2,
    user,
    contexts,
    level,
    sdkProcessingMetadata,
    breadcrumbs,
    fingerprint,
    eventProcessors,
    attachments,
    propagationContext,
    transactionName,
    span
  } = mergeData;
  mergeAndOverwriteScopeData(data, "extra", extra);
  mergeAndOverwriteScopeData(data, "tags", tags);
  mergeAndOverwriteScopeData(data, "attributes", attributes2);
  mergeAndOverwriteScopeData(data, "user", user);
  mergeAndOverwriteScopeData(data, "contexts", contexts);
  data.sdkProcessingMetadata = merge(data.sdkProcessingMetadata, sdkProcessingMetadata, 2);
  if (level) {
    data.level = level;
  }
  if (transactionName) {
    data.transactionName = transactionName;
  }
  if (span) {
    data.span = span;
  }
  if (breadcrumbs.length) {
    data.breadcrumbs = [...data.breadcrumbs, ...breadcrumbs];
  }
  if (fingerprint.length) {
    data.fingerprint = [...data.fingerprint, ...fingerprint];
  }
  if (eventProcessors.length) {
    data.eventProcessors = [...data.eventProcessors, ...eventProcessors];
  }
  if (attachments.length) {
    data.attachments = [...data.attachments, ...attachments];
  }
  data.propagationContext = { ...data.propagationContext, ...propagationContext };
}
function mergeAndOverwriteScopeData(data, prop, mergeVal) {
  data[prop] = merge(data[prop], mergeVal, 1);
}
function getCombinedScopeData(isolationScope, currentScope) {
  const scopeData = getGlobalScope().getScopeData();
  isolationScope && mergeScopeData(scopeData, isolationScope.getScopeData());
  currentScope && mergeScopeData(scopeData, currentScope.getScopeData());
  return scopeData;
}
function applyDataToEvent(event, data) {
  const { extra, tags, user, contexts, level, transactionName } = data;
  if (Object.keys(extra).length) {
    event.extra = { ...extra, ...event.extra };
  }
  if (Object.keys(tags).length) {
    event.tags = { ...tags, ...event.tags };
  }
  if (Object.keys(user).length) {
    event.user = { ...user, ...event.user };
  }
  if (Object.keys(contexts).length) {
    event.contexts = { ...contexts, ...event.contexts };
  }
  if (level) {
    event.level = level;
  }
  if (transactionName && event.type !== "transaction") {
    event.transaction = transactionName;
  }
}
function applyBreadcrumbsToEvent(event, breadcrumbs) {
  const mergedBreadcrumbs = [...event.breadcrumbs || [], ...breadcrumbs];
  event.breadcrumbs = mergedBreadcrumbs.length ? mergedBreadcrumbs : void 0;
}
function applySdkMetadataToEvent(event, sdkProcessingMetadata) {
  event.sdkProcessingMetadata = {
    ...event.sdkProcessingMetadata,
    ...sdkProcessingMetadata
  };
}
function applySpanToEvent(event, span) {
  event.contexts = {
    trace: spanToTraceContext(span),
    ...event.contexts
  };
  event.sdkProcessingMetadata = {
    dynamicSamplingContext: getDynamicSamplingContextFromSpan(span),
    ...event.sdkProcessingMetadata
  };
  const rootSpan = getRootSpan(span);
  const transactionName = spanToJSON(rootSpan).description;
  if (transactionName && !event.transaction && event.type === "transaction") {
    event.transaction = transactionName;
  }
}
function applyFingerprintToEvent(event, fingerprint) {
  event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [event.fingerprint] : [];
  if (fingerprint) {
    event.fingerprint = event.fingerprint.concat(fingerprint);
  }
  if (!event.fingerprint.length) {
    delete event.fingerprint;
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/prepareEvent.js
function prepareEvent(options, event, hint, scope, client, isolationScope) {
  const { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options;
  const prepared = {
    ...event,
    event_id: event.event_id || hint.event_id || uuid4(),
    timestamp: event.timestamp || dateTimestampInSeconds()
  };
  const integrations = hint.integrations || options.integrations.map((i) => i.name);
  applyClientOptions(prepared, options);
  applyIntegrationsMetadata(prepared, integrations);
  if (client) {
    client.emit("applyFrameMetadata", event);
  }
  if (event.type === void 0) {
    applyDebugIds(prepared, options.stackParser);
  }
  const finalScope = getFinalScope(scope, hint.captureContext);
  if (hint.mechanism) {
    addExceptionMechanism(prepared, hint.mechanism);
  }
  const clientEventProcessors = client ? client.getEventProcessors() : [];
  const data = getCombinedScopeData(isolationScope, finalScope);
  const attachments = [...hint.attachments || [], ...data.attachments];
  if (attachments.length) {
    hint.attachments = attachments;
  }
  applyScopeDataToEvent(prepared, data);
  const eventProcessors = [
    ...clientEventProcessors,
    // Run scope event processors _after_ all other processors
    ...data.eventProcessors
  ];
  const result = notifyEventProcessors(eventProcessors, prepared, hint);
  return result.then((evt) => {
    if (evt) {
      applyDebugMeta(evt);
    }
    if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
      return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
    }
    return evt;
  });
}
function applyClientOptions(event, options) {
  const { environment, release: release2, dist, maxValueLength } = options;
  event.environment = event.environment || environment || DEFAULT_ENVIRONMENT;
  if (!event.release && release2) {
    event.release = release2;
  }
  if (!event.dist && dist) {
    event.dist = dist;
  }
  const request = event.request;
  if (request?.url && maxValueLength) {
    request.url = truncate(request.url, maxValueLength);
  }
  if (maxValueLength) {
    event.exception?.values?.forEach((exception) => {
      if (exception.value) {
        exception.value = truncate(exception.value, maxValueLength);
      }
    });
  }
}
function applyDebugIds(event, stackParser) {
  const filenameDebugIdMap = getFilenameToDebugIdMap(stackParser);
  event.exception?.values?.forEach((exception) => {
    exception.stacktrace?.frames?.forEach((frame) => {
      if (frame.filename) {
        frame.debug_id = filenameDebugIdMap[frame.filename];
      }
    });
  });
}
function applyDebugMeta(event) {
  const filenameDebugIdMap = {};
  event.exception?.values?.forEach((exception) => {
    exception.stacktrace?.frames?.forEach((frame) => {
      if (frame.debug_id) {
        if (frame.abs_path) {
          filenameDebugIdMap[frame.abs_path] = frame.debug_id;
        } else if (frame.filename) {
          filenameDebugIdMap[frame.filename] = frame.debug_id;
        }
        delete frame.debug_id;
      }
    });
  });
  if (Object.keys(filenameDebugIdMap).length === 0) {
    return;
  }
  event.debug_meta = event.debug_meta || {};
  event.debug_meta.images = event.debug_meta.images || [];
  const images = event.debug_meta.images;
  Object.entries(filenameDebugIdMap).forEach(([filename, debug_id]) => {
    images.push({
      type: "sourcemap",
      code_file: filename,
      debug_id
    });
  });
}
function applyIntegrationsMetadata(event, integrationNames) {
  if (integrationNames.length > 0) {
    event.sdk = event.sdk || {};
    event.sdk.integrations = [...event.sdk.integrations || [], ...integrationNames];
  }
}
function normalizeEvent(event, depth, maxBreadth) {
  if (!event) {
    return null;
  }
  const normalized = {
    ...event,
    ...event.breadcrumbs && {
      breadcrumbs: event.breadcrumbs.map((b) => ({
        ...b,
        ...b.data && {
          data: normalize(b.data, depth, maxBreadth)
        }
      }))
    },
    ...event.user && {
      user: normalize(event.user, depth, maxBreadth)
    },
    ...event.contexts && {
      contexts: normalize(event.contexts, depth, maxBreadth)
    },
    ...event.extra && {
      extra: normalize(event.extra, depth, maxBreadth)
    }
  };
  if (event.contexts?.trace && normalized.contexts) {
    normalized.contexts.trace = event.contexts.trace;
    if (event.contexts.trace.data) {
      normalized.contexts.trace.data = normalize(event.contexts.trace.data, depth, maxBreadth);
    }
  }
  if (event.spans) {
    normalized.spans = event.spans.map((span) => {
      return {
        ...span,
        ...span.data && {
          data: normalize(span.data, depth, maxBreadth)
        }
      };
    });
  }
  if (event.contexts?.flags && normalized.contexts) {
    normalized.contexts.flags = normalize(event.contexts.flags, 3, maxBreadth);
  }
  return normalized;
}
function getFinalScope(scope, captureContext) {
  if (!captureContext) {
    return scope;
  }
  const finalScope = scope ? scope.clone() : new Scope();
  finalScope.update(captureContext);
  return finalScope;
}
function parseEventHintOrCaptureContext(hint) {
  if (!hint) {
    return void 0;
  }
  if (hintIsScopeOrFunction(hint)) {
    return { captureContext: hint };
  }
  if (hintIsScopeContext(hint)) {
    return {
      captureContext: hint
    };
  }
  return hint;
}
function hintIsScopeOrFunction(hint) {
  return hint instanceof Scope || typeof hint === "function";
}
var captureContextKeys = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function hintIsScopeContext(hint) {
  return Object.keys(hint).some((key) => captureContextKeys.includes(key));
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/exports.js
function captureException(exception, hint) {
  return getCurrentScope().captureException(exception, parseEventHintOrCaptureContext(hint));
}
function captureMessage(message, captureContext) {
  const level = typeof captureContext === "string" ? captureContext : void 0;
  const hint = typeof captureContext !== "string" ? { captureContext } : void 0;
  return getCurrentScope().captureMessage(message, level, hint);
}
function captureEvent(event, hint) {
  return getCurrentScope().captureEvent(event, hint);
}
async function flush(timeout) {
  const client = getClient();
  if (client) {
    return client.flush(timeout);
  }
  DEBUG_BUILD && debug.warn("Cannot flush events. No client defined.");
  return Promise.resolve(false);
}
function isEnabled2() {
  const client = getClient();
  return client?.getOptions().enabled !== false && !!client?.getTransport();
}
function startSession(context2) {
  const isolationScope = getIsolationScope();
  const currentScope = getCurrentScope();
  const { userAgent } = GLOBAL_OBJ.navigator || {};
  const session2 = makeSession({
    user: currentScope.getUser() || isolationScope.getUser(),
    ...userAgent && { userAgent },
    ...context2
  });
  const currentSession = isolationScope.getSession();
  if (currentSession?.status === "ok") {
    updateSession(currentSession, { status: "exited" });
  }
  endSession();
  isolationScope.setSession(session2);
  return session2;
}
function endSession() {
  const isolationScope = getIsolationScope();
  const currentScope = getCurrentScope();
  const session2 = currentScope.getSession() || isolationScope.getSession();
  if (session2) {
    closeSession(session2);
  }
  _sendSessionUpdate();
  isolationScope.setSession();
}
function _sendSessionUpdate() {
  const isolationScope = getIsolationScope();
  const client = getClient();
  const session2 = isolationScope.getSession();
  if (session2 && client) {
    client.captureSession(session2);
  }
}
function captureSession(end = false) {
  if (end) {
    endSession();
    return;
  }
  _sendSessionUpdate();
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/api.js
var SENTRY_API_VERSION = "7";
function getBaseApiEndpoint(dsn) {
  const protocol2 = dsn.protocol ? `${dsn.protocol}:` : "";
  const port = dsn.port ? `:${dsn.port}` : "";
  return `${protocol2}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ""}/api/`;
}
function _getIngestEndpoint(dsn) {
  return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
}
function _encodedAuth(dsn, sdkInfo) {
  const params = {
    sentry_version: SENTRY_API_VERSION
  };
  if (dsn.publicKey) {
    params.sentry_key = dsn.publicKey;
  }
  if (sdkInfo) {
    params.sentry_client = `${sdkInfo.name}/${sdkInfo.version}`;
  }
  return new URLSearchParams(params).toString();
}
function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnel, sdkInfo) {
  return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/integration.js
var installedIntegrations = [];
function filterDuplicates(integrations) {
  const integrationsByName = {};
  integrations.forEach((currentInstance) => {
    const { name } = currentInstance;
    const existingInstance = integrationsByName[name];
    if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) {
      return;
    }
    integrationsByName[name] = currentInstance;
  });
  return Object.values(integrationsByName);
}
function getIntegrationsToSetup(options) {
  const defaultIntegrations = options.defaultIntegrations || [];
  const userIntegrations = options.integrations;
  defaultIntegrations.forEach((integration) => {
    integration.isDefaultInstance = true;
  });
  let integrations;
  if (Array.isArray(userIntegrations)) {
    integrations = [...defaultIntegrations, ...userIntegrations];
  } else if (typeof userIntegrations === "function") {
    const resolvedUserIntegrations = userIntegrations(defaultIntegrations);
    integrations = Array.isArray(resolvedUserIntegrations) ? resolvedUserIntegrations : [resolvedUserIntegrations];
  } else {
    integrations = defaultIntegrations;
  }
  return filterDuplicates(integrations);
}
function setupIntegrations(client, integrations) {
  const integrationIndex = {};
  integrations.forEach((integration) => {
    if (integration) {
      setupIntegration(client, integration, integrationIndex);
    }
  });
  return integrationIndex;
}
function afterSetupIntegrations(client, integrations) {
  for (const integration of integrations) {
    if (integration?.afterAllSetup) {
      integration.afterAllSetup(client);
    }
  }
}
function setupIntegration(client, integration, integrationIndex) {
  if (integrationIndex[integration.name]) {
    DEBUG_BUILD && debug.log(`Integration skipped because it was already installed: ${integration.name}`);
    return;
  }
  integrationIndex[integration.name] = integration;
  if (!installedIntegrations.includes(integration.name) && typeof integration.setupOnce === "function") {
    integration.setupOnce();
    installedIntegrations.push(integration.name);
  }
  if (integration.setup && typeof integration.setup === "function") {
    integration.setup(client);
  }
  if (typeof integration.preprocessEvent === "function") {
    const callback = integration.preprocessEvent.bind(integration);
    client.on("preprocessEvent", (event, hint) => callback(event, hint, client));
  }
  if (typeof integration.processEvent === "function") {
    const callback = integration.processEvent.bind(integration);
    const processor = Object.assign((event, hint) => callback(event, hint, client), {
      id: integration.name
    });
    client.addEventProcessor(processor);
  }
  DEBUG_BUILD && debug.log(`Integration installed: ${integration.name}`);
}
function defineIntegration(fn) {
  return fn;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/attributes.js
function isAttributeObject(maybeObj) {
  return typeof maybeObj === "object" && maybeObj != null && !Array.isArray(maybeObj) && Object.keys(maybeObj).includes("value");
}
function attributeValueToTypedAttributeValue(rawValue, useFallback) {
  const { value, unit } = isAttributeObject(rawValue) ? rawValue : { value: rawValue, unit: void 0 };
  const attributeValue = getTypedAttributeValue(value);
  const checkedUnit = unit && typeof unit === "string" ? { unit } : {};
  if (attributeValue) {
    return { ...attributeValue, ...checkedUnit };
  }
  if (!useFallback || useFallback === "skip-undefined" && value === void 0) {
    return;
  }
  let stringValue = "";
  try {
    stringValue = JSON.stringify(value) ?? "";
  } catch {
  }
  return {
    value: stringValue,
    type: "string",
    ...checkedUnit
  };
}
function serializeAttributes(attributes2, fallback = false) {
  const serializedAttributes = {};
  for (const [key, value] of Object.entries(attributes2 ?? {})) {
    const typedValue = attributeValueToTypedAttributeValue(value, fallback);
    if (typedValue) {
      serializedAttributes[key] = typedValue;
    }
  }
  return serializedAttributes;
}
function getTypedAttributeValue(value) {
  const primitiveType = typeof value === "string" ? "string" : typeof value === "boolean" ? "boolean" : typeof value === "number" && !Number.isNaN(value) ? Number.isInteger(value) ? "integer" : "double" : null;
  if (primitiveType) {
    return { value, type: primitiveType };
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/trace-info.js
function _getTraceInfoFromScope(client, scope) {
  if (!scope) {
    return [void 0, void 0];
  }
  return withScope2(scope, () => {
    const span = getActiveSpan2();
    const traceContext = span ? spanToTraceContext(span) : getTraceContextFromScope(scope);
    const dynamicSamplingContext = span ? getDynamicSamplingContextFromSpan(span) : getDynamicSamplingContextFromScope(client, scope);
    return [dynamicSamplingContext, traceContext];
  });
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/logs/constants.js
var SEVERITY_TEXT_TO_SEVERITY_NUMBER = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/logs/envelope.js
function createLogContainerEnvelopeItem(items) {
  return [
    {
      type: "log",
      item_count: items.length,
      content_type: "application/vnd.sentry.items.log+json"
    },
    {
      items
    }
  ];
}
function createLogEnvelope(logs, metadata, tunnel, dsn) {
  const headers = {};
  if (metadata?.sdk) {
    headers.sdk = {
      name: metadata.sdk.name,
      version: metadata.sdk.version
    };
  }
  if (!!tunnel && !!dsn) {
    headers.dsn = dsnToString(dsn);
  }
  return createEnvelope(headers, [createLogContainerEnvelopeItem(logs)]);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/logs/internal.js
var MAX_LOG_BUFFER_SIZE = 100;
function setLogAttribute(logAttributes, key, value, setEvenIfPresent = true) {
  if (value && (!logAttributes[key] || setEvenIfPresent)) {
    logAttributes[key] = value;
  }
}
function _INTERNAL_captureSerializedLog(client, serializedLog) {
  const bufferMap = _getBufferMap();
  const logBuffer = _INTERNAL_getLogBuffer(client);
  if (logBuffer === void 0) {
    bufferMap.set(client, [serializedLog]);
  } else {
    if (logBuffer.length >= MAX_LOG_BUFFER_SIZE) {
      _INTERNAL_flushLogsBuffer(client, logBuffer);
      bufferMap.set(client, [serializedLog]);
    } else {
      bufferMap.set(client, [...logBuffer, serializedLog]);
    }
  }
}
function _INTERNAL_captureLog(beforeLog, currentScope = getCurrentScope(), captureSerializedLog = _INTERNAL_captureSerializedLog) {
  const client = currentScope?.getClient() ?? getClient();
  if (!client) {
    DEBUG_BUILD && debug.warn("No client available to capture log.");
    return;
  }
  const { release: release2, environment, enableLogs = false, beforeSendLog } = client.getOptions();
  if (!enableLogs) {
    DEBUG_BUILD && debug.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, traceContext] = _getTraceInfoFromScope(client, currentScope);
  const processedLogAttributes = {
    ...beforeLog.attributes
  };
  const {
    user: { id, email, username },
    attributes: scopeAttributes = {}
  } = getCombinedScopeData(getIsolationScope(), currentScope);
  setLogAttribute(processedLogAttributes, "user.id", id, false);
  setLogAttribute(processedLogAttributes, "user.email", email, false);
  setLogAttribute(processedLogAttributes, "user.name", username, false);
  setLogAttribute(processedLogAttributes, "sentry.release", release2);
  setLogAttribute(processedLogAttributes, "sentry.environment", environment);
  const { name, version: version2 } = client.getSdkMetadata()?.sdk ?? {};
  setLogAttribute(processedLogAttributes, "sentry.sdk.name", name);
  setLogAttribute(processedLogAttributes, "sentry.sdk.version", version2);
  const replay = client.getIntegrationByName("Replay");
  const replayId = replay?.getReplayId(true);
  setLogAttribute(processedLogAttributes, "sentry.replay_id", replayId);
  if (replayId && replay?.getRecordingMode() === "buffer") {
    setLogAttribute(processedLogAttributes, "sentry._internal.replay_is_buffering", true);
  }
  const beforeLogMessage = beforeLog.message;
  if (isParameterizedString(beforeLogMessage)) {
    const { __sentry_template_string__, __sentry_template_values__ = [] } = beforeLogMessage;
    if (__sentry_template_values__?.length) {
      processedLogAttributes["sentry.message.template"] = __sentry_template_string__;
    }
    __sentry_template_values__.forEach((param, index) => {
      processedLogAttributes[`sentry.message.parameter.${index}`] = param;
    });
  }
  const span = _getSpanForScope(currentScope);
  setLogAttribute(processedLogAttributes, "sentry.trace.parent_span_id", span?.spanContext().spanId);
  const processedLog = { ...beforeLog, attributes: processedLogAttributes };
  client.emit("beforeCaptureLog", processedLog);
  const log5 = beforeSendLog ? consoleSandbox(() => beforeSendLog(processedLog)) : processedLog;
  if (!log5) {
    client.recordDroppedEvent("before_send", "log_item", 1);
    DEBUG_BUILD && debug.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level, message, attributes: logAttributes = {}, severityNumber } = log5;
  const serializedLog = {
    timestamp: timestampInSeconds(),
    level,
    body: message,
    trace_id: traceContext?.trace_id,
    severity_number: severityNumber ?? SEVERITY_TEXT_TO_SEVERITY_NUMBER[level],
    attributes: {
      ...serializeAttributes(scopeAttributes),
      ...serializeAttributes(logAttributes, true)
    }
  };
  captureSerializedLog(client, serializedLog);
  client.emit("afterCaptureLog", log5);
}
function _INTERNAL_flushLogsBuffer(client, maybeLogBuffer) {
  const logBuffer = maybeLogBuffer ?? _INTERNAL_getLogBuffer(client) ?? [];
  if (logBuffer.length === 0) {
    return;
  }
  const clientOptions = client.getOptions();
  const envelope = createLogEnvelope(logBuffer, clientOptions._metadata, clientOptions.tunnel, client.getDsn());
  _getBufferMap().set(client, []);
  client.emit("flushLogs");
  client.sendEnvelope(envelope);
}
function _INTERNAL_getLogBuffer(client) {
  return _getBufferMap().get(client);
}
function _getBufferMap() {
  return getGlobalSingleton("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/metrics/envelope.js
function createMetricContainerEnvelopeItem(items) {
  return [
    {
      type: "trace_metric",
      item_count: items.length,
      content_type: "application/vnd.sentry.items.trace-metric+json"
    },
    {
      items
    }
  ];
}
function createMetricEnvelope(metrics2, metadata, tunnel, dsn) {
  const headers = {};
  if (metadata?.sdk) {
    headers.sdk = {
      name: metadata.sdk.name,
      version: metadata.sdk.version
    };
  }
  if (!!tunnel && !!dsn) {
    headers.dsn = dsnToString(dsn);
  }
  return createEnvelope(headers, [createMetricContainerEnvelopeItem(metrics2)]);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/metrics/internal.js
var MAX_METRIC_BUFFER_SIZE = 1e3;
function _INTERNAL_captureSerializedMetric(client, serializedMetric) {
  const bufferMap = _getBufferMap2();
  const metricBuffer = _INTERNAL_getMetricBuffer(client);
  if (metricBuffer === void 0) {
    bufferMap.set(client, [serializedMetric]);
  } else {
    if (metricBuffer.length >= MAX_METRIC_BUFFER_SIZE) {
      _INTERNAL_flushMetricsBuffer(client, metricBuffer);
      bufferMap.set(client, [serializedMetric]);
    } else {
      bufferMap.set(client, [...metricBuffer, serializedMetric]);
    }
  }
}
function _INTERNAL_flushMetricsBuffer(client, maybeMetricBuffer) {
  const metricBuffer = maybeMetricBuffer ?? _INTERNAL_getMetricBuffer(client) ?? [];
  if (metricBuffer.length === 0) {
    return;
  }
  const clientOptions = client.getOptions();
  const envelope = createMetricEnvelope(metricBuffer, clientOptions._metadata, clientOptions.tunnel, client.getDsn());
  _getBufferMap2().set(client, []);
  client.emit("flushMetrics");
  client.sendEnvelope(envelope);
}
function _INTERNAL_getMetricBuffer(client) {
  return _getBufferMap2().get(client);
}
function _getBufferMap2() {
  return getGlobalSingleton("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/promisebuffer.js
var SENTRY_BUFFER_FULL_ERROR = Symbol.for("SentryBufferFullError");
function makePromiseBuffer(limit = 100) {
  const buffer = /* @__PURE__ */ new Set();
  function isReady() {
    return buffer.size < limit;
  }
  function remove(task) {
    buffer.delete(task);
  }
  function add(taskProducer) {
    if (!isReady()) {
      return rejectedSyncPromise(SENTRY_BUFFER_FULL_ERROR);
    }
    const task = taskProducer();
    buffer.add(task);
    void task.then(
      () => remove(task),
      () => remove(task)
    );
    return task;
  }
  function drain(timeout) {
    if (!buffer.size) {
      return resolvedSyncPromise(true);
    }
    const drainPromise = Promise.allSettled(Array.from(buffer)).then(() => true);
    if (!timeout) {
      return drainPromise;
    }
    const promises4 = [drainPromise, new Promise((resolve3) => setTimeout(() => resolve3(false), timeout))];
    return Promise.race(promises4);
  }
  return {
    get $() {
      return Array.from(buffer);
    },
    add,
    drain
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/ratelimit.js
var DEFAULT_RETRY_AFTER = 60 * 1e3;
function parseRetryAfterHeader(header, now = safeDateNow()) {
  const headerDelay = parseInt(`${header}`, 10);
  if (!isNaN(headerDelay)) {
    return headerDelay * 1e3;
  }
  const headerDate = Date.parse(`${header}`);
  if (!isNaN(headerDate)) {
    return headerDate - now;
  }
  return DEFAULT_RETRY_AFTER;
}
function disabledUntil(limits, dataCategory) {
  return limits[dataCategory] || limits.all || 0;
}
function isRateLimited(limits, dataCategory, now = safeDateNow()) {
  return disabledUntil(limits, dataCategory) > now;
}
function updateRateLimits(limits, { statusCode, headers }, now = safeDateNow()) {
  const updatedRateLimits = {
    ...limits
  };
  const rateLimitHeader = headers?.["x-sentry-rate-limits"];
  const retryAfterHeader = headers?.["retry-after"];
  if (rateLimitHeader) {
    for (const limit of rateLimitHeader.trim().split(",")) {
      const [retryAfter, categories, , , namespaces] = limit.split(":", 5);
      const headerDelay = parseInt(retryAfter, 10);
      const delay2 = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
      if (!categories) {
        updatedRateLimits.all = now + delay2;
      } else {
        for (const category of categories.split(";")) {
          if (category === "metric_bucket") {
            if (!namespaces || namespaces.split(";").includes("custom")) {
              updatedRateLimits[category] = now + delay2;
            }
          } else {
            updatedRateLimits[category] = now + delay2;
          }
        }
      }
    }
  } else if (retryAfterHeader) {
    updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
  } else if (statusCode === 429) {
    updatedRateLimits.all = now + 60 * 1e3;
  }
  return updatedRateLimits;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/transports/base.js
var DEFAULT_TRANSPORT_BUFFER_SIZE = 64;
function createTransport(options, makeRequest, buffer = makePromiseBuffer(
  options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE
)) {
  let rateLimits = {};
  const flush2 = (timeout) => buffer.drain(timeout);
  function send(envelope) {
    const filteredEnvelopeItems = [];
    forEachEnvelopeItem(envelope, (item, type) => {
      const dataCategory = envelopeItemTypeToDataCategory(type);
      if (isRateLimited(rateLimits, dataCategory)) {
        options.recordDroppedEvent("ratelimit_backoff", dataCategory);
      } else {
        filteredEnvelopeItems.push(item);
      }
    });
    if (filteredEnvelopeItems.length === 0) {
      return Promise.resolve({});
    }
    const filteredEnvelope = createEnvelope(envelope[0], filteredEnvelopeItems);
    const recordEnvelopeLoss = (reason) => {
      if (envelopeContainsItemType(filteredEnvelope, ["client_report"])) {
        DEBUG_BUILD && debug.warn(`Dropping client report. Will not send outcomes (reason: ${reason}).`);
        return;
      }
      forEachEnvelopeItem(filteredEnvelope, (item, type) => {
        options.recordDroppedEvent(reason, envelopeItemTypeToDataCategory(type));
      });
    };
    const requestTask = () => makeRequest({ body: serializeEnvelope(filteredEnvelope) }).then(
      (response) => {
        if (response.statusCode !== void 0 && (response.statusCode < 200 || response.statusCode >= 300)) {
          DEBUG_BUILD && debug.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
        }
        rateLimits = updateRateLimits(rateLimits, response);
        return response;
      },
      (error3) => {
        recordEnvelopeLoss("network_error");
        DEBUG_BUILD && debug.error("Encountered error running transport request:", error3);
        throw error3;
      }
    );
    return buffer.add(requestTask).then(
      (result) => result,
      (error3) => {
        if (error3 === SENTRY_BUFFER_FULL_ERROR) {
          DEBUG_BUILD && debug.error("Skipped sending event because buffer is full.");
          recordEnvelopeLoss("queue_overflow");
          return Promise.resolve({});
        } else {
          throw error3;
        }
      }
    );
  }
  return {
    send,
    flush: flush2
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/clientreport.js
function createClientReportEnvelope(discarded_events, dsn, timestamp) {
  const clientReportItem = [
    { type: "client_report" },
    {
      timestamp: timestamp || dateTimestampInSeconds(),
      discarded_events
    }
  ];
  return createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/eventUtils.js
function getPossibleEventMessages(event) {
  const possibleMessages = [];
  if (event.message) {
    possibleMessages.push(event.message);
  }
  try {
    const lastException = event.exception.values[event.exception.values.length - 1];
    if (lastException?.value) {
      possibleMessages.push(lastException.value);
      if (lastException.type) {
        possibleMessages.push(`${lastException.type}: ${lastException.value}`);
      }
    }
  } catch {
  }
  return possibleMessages;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/transactionEvent.js
function convertTransactionEventToSpanJson(event) {
  const { trace_id, parent_span_id, span_id, status, origin, data, op } = event.contexts?.trace ?? {};
  return {
    data: data ?? {},
    description: event.transaction,
    op,
    parent_span_id,
    span_id: span_id ?? "",
    start_timestamp: event.start_timestamp ?? 0,
    status,
    timestamp: event.timestamp,
    trace_id: trace_id ?? "",
    origin,
    profile_id: data?.[SEMANTIC_ATTRIBUTE_PROFILE_ID],
    exclusive_time: data?.[SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
    measurements: event.measurements,
    is_segment: true
  };
}
function convertSpanJsonToTransactionEvent(span) {
  return {
    type: "transaction",
    timestamp: span.timestamp,
    start_timestamp: span.start_timestamp,
    transaction: span.description,
    contexts: {
      trace: {
        trace_id: span.trace_id,
        span_id: span.span_id,
        parent_span_id: span.parent_span_id,
        op: span.op,
        status: span.status,
        origin: span.origin,
        data: {
          ...span.data,
          ...span.profile_id && { [SEMANTIC_ATTRIBUTE_PROFILE_ID]: span.profile_id },
          ...span.exclusive_time && { [SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME]: span.exclusive_time }
        }
      }
    },
    measurements: span.measurements
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/client.js
var ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
var MISSING_RELEASE_FOR_SESSION_ERROR = "Discarded session because of missing or non-string release";
var INTERNAL_ERROR_SYMBOL = Symbol.for("SentryInternalError");
var DO_NOT_SEND_EVENT_SYMBOL = Symbol.for("SentryDoNotSendEventError");
var DEFAULT_FLUSH_INTERVAL = 5e3;
function _makeInternalError(message) {
  return {
    message,
    [INTERNAL_ERROR_SYMBOL]: true
  };
}
function _makeDoNotSendEventError(message) {
  return {
    message,
    [DO_NOT_SEND_EVENT_SYMBOL]: true
  };
}
function _isInternalError(error3) {
  return !!error3 && typeof error3 === "object" && INTERNAL_ERROR_SYMBOL in error3;
}
function _isDoNotSendEventError(error3) {
  return !!error3 && typeof error3 === "object" && DO_NOT_SEND_EVENT_SYMBOL in error3;
}
function setupWeightBasedFlushing(client, afterCaptureHook, flushHook, estimateSizeFn, flushFn) {
  let weight = 0;
  let flushTimeout;
  let isTimerActive = false;
  client.on(flushHook, () => {
    weight = 0;
    clearTimeout(flushTimeout);
    isTimerActive = false;
  });
  client.on(afterCaptureHook, (item) => {
    weight += estimateSizeFn(item);
    if (weight >= 8e5) {
      flushFn(client);
    } else if (!isTimerActive) {
      isTimerActive = true;
      flushTimeout = setTimeout(() => {
        flushFn(client);
      }, DEFAULT_FLUSH_INTERVAL);
    }
  });
  client.on("flush", () => {
    flushFn(client);
  });
}
var Client = class {
  /** Options passed to the SDK. */
  /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
  /** Array of set up integrations. */
  /** Number of calls being processed */
  /** Holds flushable  */
  // eslint-disable-next-line @typescript-eslint/ban-types
  /**
   * Initializes this client instance.
   *
   * @param options Options for the client.
   */
  constructor(options) {
    this._options = options;
    this._integrations = {};
    this._numProcessing = 0;
    this._outcomes = {};
    this._hooks = {};
    this._eventProcessors = [];
    this._promiseBuffer = makePromiseBuffer(options.transportOptions?.bufferSize ?? DEFAULT_TRANSPORT_BUFFER_SIZE);
    if (options.dsn) {
      this._dsn = makeDsn(options.dsn);
    } else {
      DEBUG_BUILD && debug.warn("No DSN provided, client will not send events.");
    }
    if (this._dsn) {
      const url = getEnvelopeEndpointWithUrlEncodedAuth(
        this._dsn,
        options.tunnel,
        options._metadata ? options._metadata.sdk : void 0
      );
      this._transport = options.transport({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...options.transportOptions,
        url
      });
    }
    this._options.enableLogs = this._options.enableLogs ?? this._options._experiments?.enableLogs;
    if (this._options.enableLogs) {
      setupWeightBasedFlushing(this, "afterCaptureLog", "flushLogs", estimateLogSizeInBytes, _INTERNAL_flushLogsBuffer);
    }
    const enableMetrics = this._options.enableMetrics ?? this._options._experiments?.enableMetrics ?? true;
    if (enableMetrics) {
      setupWeightBasedFlushing(
        this,
        "afterCaptureMetric",
        "flushMetrics",
        estimateMetricSizeInBytes,
        _INTERNAL_flushMetricsBuffer
      );
    }
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(exception, hint, scope) {
    const eventId = uuid4();
    if (checkOrSetAlreadyCaught(exception)) {
      DEBUG_BUILD && debug.log(ALREADY_SEEN_ERROR);
      return eventId;
    }
    const hintWithEventId = {
      event_id: eventId,
      ...hint
    };
    this._process(
      () => this.eventFromException(exception, hintWithEventId).then((event) => this._captureEvent(event, hintWithEventId, scope)).then((res) => res),
      "error"
    );
    return hintWithEventId.event_id;
  }
  /**
   * Captures a message event and sends it to Sentry.
   *
   * Unlike `captureMessage` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureMessage(message, level, hint, currentScope) {
    const hintWithEventId = {
      event_id: uuid4(),
      ...hint
    };
    const eventMessage = isParameterizedString(message) ? message : String(message);
    const isMessage = isPrimitive(message);
    const promisedEvent = isMessage ? this.eventFromMessage(eventMessage, level, hintWithEventId) : this.eventFromException(message, hintWithEventId);
    this._process(
      () => promisedEvent.then((event) => this._captureEvent(event, hintWithEventId, currentScope)),
      isMessage ? "unknown" : "error"
    );
    return hintWithEventId.event_id;
  }
  /**
   * Captures a manually created event and sends it to Sentry.
   *
   * Unlike `captureEvent` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureEvent(event, hint, currentScope) {
    const eventId = uuid4();
    if (hint?.originalException && checkOrSetAlreadyCaught(hint.originalException)) {
      DEBUG_BUILD && debug.log(ALREADY_SEEN_ERROR);
      return eventId;
    }
    const hintWithEventId = {
      event_id: eventId,
      ...hint
    };
    const sdkProcessingMetadata = event.sdkProcessingMetadata || {};
    const capturedSpanScope = sdkProcessingMetadata.capturedSpanScope;
    const capturedSpanIsolationScope = sdkProcessingMetadata.capturedSpanIsolationScope;
    const dataCategory = getDataCategoryByType(event.type);
    this._process(
      () => this._captureEvent(event, hintWithEventId, capturedSpanScope || currentScope, capturedSpanIsolationScope),
      dataCategory
    );
    return hintWithEventId.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(session2) {
    this.sendSession(session2);
    updateSession(session2, { init: false });
  }
  /**
   * Create a cron monitor check in and send it to Sentry. This method is not available on all clients.
   *
   * @param checkIn An object that describes a check in.
   * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
   * to create a monitor automatically when sending a check in.
   * @param scope An optional scope containing event metadata.
   * @returns A string representing the id of the check in.
   */
  /**
   * Get the current Dsn.
   */
  getDsn() {
    return this._dsn;
  }
  /**
   * Get the current options.
   */
  getOptions() {
    return this._options;
  }
  /**
   * Get the SDK metadata.
   * @see SdkMetadata
   */
  getSdkMetadata() {
    return this._options._metadata;
  }
  /**
   * Returns the transport that is used by the client.
   * Please note that the transport gets lazy initialized so it will only be there once the first event has been sent.
   */
  getTransport() {
    return this._transport;
  }
  /**
   * Wait for all events to be sent or the timeout to expire, whichever comes first.
   *
   * @param timeout Maximum time in ms the client should wait for events to be flushed. Omitting this parameter will
   *   cause the client to wait until all events are sent before resolving the promise.
   * @returns A promise that will resolve with `true` if all events are sent before the timeout, or `false` if there are
   * still events in the queue when the timeout is reached.
   */
  // @ts-expect-error - PromiseLike is a subset of Promise
  async flush(timeout) {
    const transport = this._transport;
    if (!transport) {
      return true;
    }
    this.emit("flush");
    const clientFinished = await this._isClientDoneProcessing(timeout);
    const transportFlushed = await transport.flush(timeout);
    return clientFinished && transportFlushed;
  }
  /**
   * Flush the event queue and set the client to `enabled = false`. See {@link Client.flush}.
   *
   * @param {number} timeout Maximum time in ms the client should wait before shutting down. Omitting this parameter will cause
   *   the client to wait until all events are sent before disabling itself.
   * @returns {Promise<boolean>} A promise which resolves to `true` if the flush completes successfully before the timeout, or `false` if
   * it doesn't.
   */
  // @ts-expect-error - PromiseLike is a subset of Promise
  async close(timeout) {
    const result = await this.flush(timeout);
    this.getOptions().enabled = false;
    this.emit("close");
    return result;
  }
  /**
   * Get all installed event processors.
   */
  getEventProcessors() {
    return this._eventProcessors;
  }
  /**
   * Adds an event processor that applies to any event processed by this client.
   */
  addEventProcessor(eventProcessor) {
    this._eventProcessors.push(eventProcessor);
  }
  /**
   * Initialize this client.
   * Call this after the client was set on a scope.
   */
  init() {
    if (this._isEnabled() || // Force integrations to be setup even if no DSN was set when we have
    // Spotlight enabled. This is particularly important for browser as we
    // don't support the `spotlight` option there and rely on the users
    // adding the `spotlightBrowserIntegration()` to their integrations which
    // wouldn't get initialized with the check below when there's no DSN set.
    this._options.integrations.some(({ name }) => name.startsWith("Spotlight"))) {
      this._setupIntegrations();
    }
  }
  /**
   * Gets an installed integration by its name.
   *
   * @returns {Integration|undefined} The installed integration or `undefined` if no integration with that `name` was installed.
   */
  getIntegrationByName(integrationName) {
    return this._integrations[integrationName];
  }
  /**
   * Add an integration to the client.
   * This can be used to e.g. lazy load integrations.
   * In most cases, this should not be necessary,
   * and you're better off just passing the integrations via `integrations: []` at initialization time.
   * However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
   */
  addIntegration(integration) {
    const isAlreadyInstalled = this._integrations[integration.name];
    setupIntegration(this, integration, this._integrations);
    if (!isAlreadyInstalled) {
      afterSetupIntegrations(this, [integration]);
    }
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(event, hint = {}) {
    this.emit("beforeSendEvent", event, hint);
    let env = createEventEnvelope(event, this._dsn, this._options._metadata, this._options.tunnel);
    for (const attachment of hint.attachments || []) {
      env = addItemToEnvelope(env, createAttachmentEnvelopeItem(attachment));
    }
    this.sendEnvelope(env).then((sendResponse) => this.emit("afterSendEvent", event, sendResponse));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(session2) {
    const { release: clientReleaseOption, environment: clientEnvironmentOption = DEFAULT_ENVIRONMENT } = this._options;
    if ("aggregates" in session2) {
      const sessionAttrs = session2.attrs || {};
      if (!sessionAttrs.release && !clientReleaseOption) {
        DEBUG_BUILD && debug.warn(MISSING_RELEASE_FOR_SESSION_ERROR);
        return;
      }
      sessionAttrs.release = sessionAttrs.release || clientReleaseOption;
      sessionAttrs.environment = sessionAttrs.environment || clientEnvironmentOption;
      session2.attrs = sessionAttrs;
    } else {
      if (!session2.release && !clientReleaseOption) {
        DEBUG_BUILD && debug.warn(MISSING_RELEASE_FOR_SESSION_ERROR);
        return;
      }
      session2.release = session2.release || clientReleaseOption;
      session2.environment = session2.environment || clientEnvironmentOption;
    }
    this.emit("beforeSendSession", session2);
    const env = createSessionEnvelope(session2, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(env);
  }
  /**
   * Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
   */
  recordDroppedEvent(reason, category, count = 1) {
    if (this._options.sendClientReports) {
      const key = `${reason}:${category}`;
      DEBUG_BUILD && debug.log(`Recording outcome: "${key}"${count > 1 ? ` (${count} times)` : ""}`);
      this._outcomes[key] = (this._outcomes[key] || 0) + count;
    }
  }
  /* eslint-disable @typescript-eslint/unified-signatures */
  /**
   * Register a callback for whenever a span is started.
   * Receives the span as argument.
   * @returns {() => void} A function that, when executed, removes the registered callback.
   */
  /**
   * Register a hook on this client.
   */
  on(hook, callback) {
    const hookCallbacks = this._hooks[hook] = this._hooks[hook] || /* @__PURE__ */ new Set();
    const uniqueCallback = (...args) => callback(...args);
    hookCallbacks.add(uniqueCallback);
    return () => {
      hookCallbacks.delete(uniqueCallback);
    };
  }
  /** Fire a hook whenever a span starts. */
  /**
   * Emit a hook that was previously registered via `on()`.
   */
  emit(hook, ...rest) {
    const callbacks = this._hooks[hook];
    if (callbacks) {
      callbacks.forEach((callback) => callback(...rest));
    }
  }
  /**
   * Send an envelope to Sentry.
   */
  // @ts-expect-error - PromiseLike is a subset of Promise
  async sendEnvelope(envelope) {
    this.emit("beforeEnvelope", envelope);
    if (this._isEnabled() && this._transport) {
      try {
        return await this._transport.send(envelope);
      } catch (reason) {
        DEBUG_BUILD && debug.error("Error while sending envelope:", reason);
        return {};
      }
    }
    DEBUG_BUILD && debug.error("Transport disabled");
    return {};
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Setup integrations for this client. */
  _setupIntegrations() {
    const { integrations } = this._options;
    this._integrations = setupIntegrations(this, integrations);
    afterSetupIntegrations(this, integrations);
  }
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(session2, event) {
    let crashed = event.level === "fatal";
    let errored = false;
    const exceptions = event.exception?.values;
    if (exceptions) {
      errored = true;
      crashed = false;
      for (const ex of exceptions) {
        if (ex.mechanism?.handled === false) {
          crashed = true;
          break;
        }
      }
    }
    const sessionNonTerminal = session2.status === "ok";
    const shouldUpdateAndSend = sessionNonTerminal && session2.errors === 0 || sessionNonTerminal && crashed;
    if (shouldUpdateAndSend) {
      updateSession(session2, {
        ...crashed && { status: "crashed" },
        errors: session2.errors || Number(errored || crashed)
      });
      this.captureSession(session2);
    }
  }
  /**
   * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
   * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
   *
   * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
   * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
   * `true`.
   * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
   * `false` otherwise
   */
  async _isClientDoneProcessing(timeout) {
    let ticked = 0;
    while (!timeout || ticked < timeout) {
      await new Promise((resolve3) => setTimeout(resolve3, 1));
      if (!this._numProcessing) {
        return true;
      }
      ticked++;
    }
    return false;
  }
  /** Determines whether this SDK is enabled and a transport is present. */
  _isEnabled() {
    return this.getOptions().enabled !== false && this._transport !== void 0;
  }
  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param currentScope A scope containing event metadata.
   * @returns A new event with more information.
   */
  _prepareEvent(event, hint, currentScope, isolationScope) {
    const options = this.getOptions();
    const integrations = Object.keys(this._integrations);
    if (!hint.integrations && integrations?.length) {
      hint.integrations = integrations;
    }
    this.emit("preprocessEvent", event, hint);
    if (!event.type) {
      isolationScope.setLastEventId(event.event_id || hint.event_id);
    }
    return prepareEvent(options, event, hint, currentScope, this, isolationScope).then((evt) => {
      if (evt === null) {
        return evt;
      }
      this.emit("postprocessEvent", evt, hint);
      evt.contexts = {
        trace: getTraceContextFromScope(currentScope),
        ...evt.contexts
      };
      const dynamicSamplingContext = getDynamicSamplingContextFromScope(this, currentScope);
      evt.sdkProcessingMetadata = {
        dynamicSamplingContext,
        ...evt.sdkProcessingMetadata
      };
      return evt;
    });
  }
  /**
   * Processes the event and logs an error in case of rejection
   * @param event
   * @param hint
   * @param scope
   */
  _captureEvent(event, hint = {}, currentScope = getCurrentScope(), isolationScope = getIsolationScope()) {
    if (DEBUG_BUILD && isErrorEvent2(event)) {
      debug.log(`Captured error event \`${getPossibleEventMessages(event)[0] || "<unknown>"}\``);
    }
    return this._processEvent(event, hint, currentScope, isolationScope).then(
      (finalEvent) => {
        return finalEvent.event_id;
      },
      (reason) => {
        if (DEBUG_BUILD) {
          if (_isDoNotSendEventError(reason)) {
            debug.log(reason.message);
          } else if (_isInternalError(reason)) {
            debug.warn(reason.message);
          } else {
            debug.warn(reason);
          }
        }
        return void 0;
      }
    );
  }
  /**
   * Processes an event (either error or message) and sends it to Sentry.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Sentry.
   * @param hint May contain additional information about the original exception.
   * @param currentScope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */
  _processEvent(event, hint, currentScope, isolationScope) {
    const options = this.getOptions();
    const { sampleRate } = options;
    const isTransaction = isTransactionEvent(event);
    const isError2 = isErrorEvent2(event);
    const eventType = event.type || "error";
    const beforeSendLabel = `before send for type \`${eventType}\``;
    const parsedSampleRate = typeof sampleRate === "undefined" ? void 0 : parseSampleRate(sampleRate);
    if (isError2 && typeof parsedSampleRate === "number" && safeMathRandom() > parsedSampleRate) {
      this.recordDroppedEvent("sample_rate", "error");
      return rejectedSyncPromise(
        _makeDoNotSendEventError(
          `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`
        )
      );
    }
    const dataCategory = getDataCategoryByType(event.type);
    return this._prepareEvent(event, hint, currentScope, isolationScope).then((prepared) => {
      if (prepared === null) {
        this.recordDroppedEvent("event_processor", dataCategory);
        throw _makeDoNotSendEventError("An event processor returned `null`, will not send event.");
      }
      const isInternalException = hint.data && hint.data.__sentry__ === true;
      if (isInternalException) {
        return prepared;
      }
      const result = processBeforeSend(this, options, prepared, hint);
      return _validateBeforeSendResult(result, beforeSendLabel);
    }).then((processedEvent) => {
      if (processedEvent === null) {
        this.recordDroppedEvent("before_send", dataCategory);
        if (isTransaction) {
          const spans = event.spans || [];
          const spanCount = 1 + spans.length;
          this.recordDroppedEvent("before_send", "span", spanCount);
        }
        throw _makeDoNotSendEventError(`${beforeSendLabel} returned \`null\`, will not send event.`);
      }
      const session2 = currentScope.getSession() || isolationScope.getSession();
      if (isError2 && session2) {
        this._updateSessionFromEvent(session2, processedEvent);
      }
      if (isTransaction) {
        const spanCountBefore = processedEvent.sdkProcessingMetadata?.spanCountBeforeProcessing || 0;
        const spanCountAfter = processedEvent.spans ? processedEvent.spans.length : 0;
        const droppedSpanCount = spanCountBefore - spanCountAfter;
        if (droppedSpanCount > 0) {
          this.recordDroppedEvent("before_send", "span", droppedSpanCount);
        }
      }
      const transactionInfo = processedEvent.transaction_info;
      if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
        const source = "custom";
        processedEvent.transaction_info = {
          ...transactionInfo,
          source
        };
      }
      this.sendEvent(processedEvent, hint);
      return processedEvent;
    }).then(null, (reason) => {
      if (_isDoNotSendEventError(reason) || _isInternalError(reason)) {
        throw reason;
      }
      this.captureException(reason, {
        mechanism: {
          handled: false,
          type: "internal"
        },
        data: {
          __sentry__: true
        },
        originalException: reason
      });
      throw _makeInternalError(
        `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`
      );
    });
  }
  /**
   * Occupies the client with processing and event
   */
  _process(taskProducer, dataCategory) {
    this._numProcessing++;
    void this._promiseBuffer.add(taskProducer).then(
      (value) => {
        this._numProcessing--;
        return value;
      },
      (reason) => {
        this._numProcessing--;
        if (reason === SENTRY_BUFFER_FULL_ERROR) {
          this.recordDroppedEvent("queue_overflow", dataCategory);
        }
        return reason;
      }
    );
  }
  /**
   * Clears outcomes on this client and returns them.
   */
  _clearOutcomes() {
    const outcomes = this._outcomes;
    this._outcomes = {};
    return Object.entries(outcomes).map(([key, quantity]) => {
      const [reason, category] = key.split(":");
      return {
        reason,
        category,
        quantity
      };
    });
  }
  /**
   * Sends client reports as an envelope.
   */
  _flushOutcomes() {
    DEBUG_BUILD && debug.log("Flushing outcomes...");
    const outcomes = this._clearOutcomes();
    if (outcomes.length === 0) {
      DEBUG_BUILD && debug.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      DEBUG_BUILD && debug.log("No dsn provided, will not send outcomes");
      return;
    }
    DEBUG_BUILD && debug.log("Sending outcomes:", outcomes);
    const envelope = createClientReportEnvelope(outcomes, this._options.tunnel && dsnToString(this._dsn));
    this.sendEnvelope(envelope);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
};
function getDataCategoryByType(type) {
  return type === "replay_event" ? "replay" : type || "error";
}
function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
  const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
  if (isThenable(beforeSendResult)) {
    return beforeSendResult.then(
      (event) => {
        if (!isPlainObject(event) && event !== null) {
          throw _makeInternalError(invalidValueError);
        }
        return event;
      },
      (e) => {
        throw _makeInternalError(`${beforeSendLabel} rejected with ${e}`);
      }
    );
  } else if (!isPlainObject(beforeSendResult) && beforeSendResult !== null) {
    throw _makeInternalError(invalidValueError);
  }
  return beforeSendResult;
}
function processBeforeSend(client, options, event, hint) {
  const { beforeSend, beforeSendTransaction, beforeSendSpan, ignoreSpans } = options;
  let processedEvent = event;
  if (isErrorEvent2(processedEvent) && beforeSend) {
    return beforeSend(processedEvent, hint);
  }
  if (isTransactionEvent(processedEvent)) {
    if (beforeSendSpan || ignoreSpans) {
      const rootSpanJson = convertTransactionEventToSpanJson(processedEvent);
      if (ignoreSpans?.length && shouldIgnoreSpan(rootSpanJson, ignoreSpans)) {
        return null;
      }
      if (beforeSendSpan) {
        const processedRootSpanJson = beforeSendSpan(rootSpanJson);
        if (!processedRootSpanJson) {
          showSpanDropWarning();
        } else {
          processedEvent = merge(event, convertSpanJsonToTransactionEvent(processedRootSpanJson));
        }
      }
      if (processedEvent.spans) {
        const processedSpans = [];
        const initialSpans = processedEvent.spans;
        for (const span of initialSpans) {
          if (ignoreSpans?.length && shouldIgnoreSpan(span, ignoreSpans)) {
            reparentChildSpans(initialSpans, span);
            continue;
          }
          if (beforeSendSpan) {
            const processedSpan = beforeSendSpan(span);
            if (!processedSpan) {
              showSpanDropWarning();
              processedSpans.push(span);
            } else {
              processedSpans.push(processedSpan);
            }
          } else {
            processedSpans.push(span);
          }
        }
        const droppedSpans = processedEvent.spans.length - processedSpans.length;
        if (droppedSpans) {
          client.recordDroppedEvent("before_send", "span", droppedSpans);
        }
        processedEvent.spans = processedSpans;
      }
    }
    if (beforeSendTransaction) {
      if (processedEvent.spans) {
        const spanCountBefore = processedEvent.spans.length;
        processedEvent.sdkProcessingMetadata = {
          ...event.sdkProcessingMetadata,
          spanCountBeforeProcessing: spanCountBefore
        };
      }
      return beforeSendTransaction(processedEvent, hint);
    }
  }
  return processedEvent;
}
function isErrorEvent2(event) {
  return event.type === void 0;
}
function isTransactionEvent(event) {
  return event.type === "transaction";
}
function estimateMetricSizeInBytes(metric) {
  let weight = 0;
  if (metric.name) {
    weight += metric.name.length * 2;
  }
  weight += 8;
  return weight + estimateAttributesSizeInBytes(metric.attributes);
}
function estimateLogSizeInBytes(log5) {
  let weight = 0;
  if (log5.message) {
    weight += log5.message.length * 2;
  }
  return weight + estimateAttributesSizeInBytes(log5.attributes);
}
function estimateAttributesSizeInBytes(attributes2) {
  if (!attributes2) {
    return 0;
  }
  let weight = 0;
  Object.values(attributes2).forEach((value) => {
    if (Array.isArray(value)) {
      weight += value.length * estimatePrimitiveSizeInBytes(value[0]);
    } else if (isPrimitive(value)) {
      weight += estimatePrimitiveSizeInBytes(value);
    } else {
      weight += 100;
    }
  });
  return weight;
}
function estimatePrimitiveSizeInBytes(value) {
  if (typeof value === "string") {
    return value.length * 2;
  } else if (typeof value === "number") {
    return 8;
  } else if (typeof value === "boolean") {
    return 4;
  }
  return 0;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/checkin.js
function createCheckInEnvelope(checkIn, dynamicSamplingContext, metadata, tunnel, dsn) {
  const headers = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (metadata?.sdk) {
    headers.sdk = {
      name: metadata.sdk.name,
      version: metadata.sdk.version
    };
  }
  if (!!tunnel && !!dsn) {
    headers.dsn = dsnToString(dsn);
  }
  if (dynamicSamplingContext) {
    headers.trace = dynamicSamplingContext;
  }
  const item = createCheckInEnvelopeItem(checkIn);
  return createEnvelope(headers, [item]);
}
function createCheckInEnvelopeItem(checkIn) {
  const checkInHeaders = {
    type: "check_in"
  };
  return [checkInHeaders, checkIn];
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/transports/userAgent.js
function addUserAgentToTransportHeaders(options) {
  const sdkMetadata = options._metadata?.sdk;
  const sdkUserAgent = sdkMetadata?.name && sdkMetadata?.version ? `${sdkMetadata?.name}/${sdkMetadata?.version}` : void 0;
  options.transportOptions = {
    ...options.transportOptions,
    headers: {
      ...sdkUserAgent && { "user-agent": sdkUserAgent },
      ...options.transportOptions?.headers
    }
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/eventbuilder.js
function parseStackFrames(stackParser, error3) {
  return stackParser(error3.stack || "", 1);
}
function hasSentryFetchUrlHost(error3) {
  return isError(error3) && "__sentry_fetch_url_host__" in error3 && typeof error3.__sentry_fetch_url_host__ === "string";
}
function _enhanceErrorWithSentryInfo(error3) {
  if (hasSentryFetchUrlHost(error3)) {
    return `${error3.message} (${error3.__sentry_fetch_url_host__})`;
  }
  return error3.message;
}
function exceptionFromError(stackParser, error3) {
  const exception = {
    type: error3.name || error3.constructor.name,
    value: _enhanceErrorWithSentryInfo(error3)
  };
  const frames = parseStackFrames(stackParser, error3);
  if (frames.length) {
    exception.stacktrace = { frames };
  }
  return exception;
}
function getErrorPropertyFromObject(obj) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      const value = obj[prop];
      if (value instanceof Error) {
        return value;
      }
    }
  }
  return void 0;
}
function getMessageForObject(exception) {
  if ("name" in exception && typeof exception.name === "string") {
    let message = `'${exception.name}' captured as exception`;
    if ("message" in exception && typeof exception.message === "string") {
      message += ` with message '${exception.message}'`;
    }
    return message;
  } else if ("message" in exception && typeof exception.message === "string") {
    return exception.message;
  }
  const keys = extractExceptionKeysForMessage(exception);
  if (isErrorEvent(exception)) {
    return `Event \`ErrorEvent\` captured as exception with message \`${exception.message}\``;
  }
  const className = getObjectClassName(exception);
  return `${className && className !== "Object" ? `'${className}'` : "Object"} captured as exception with keys: ${keys}`;
}
function getObjectClassName(obj) {
  try {
    const prototype = Object.getPrototypeOf(obj);
    return prototype ? prototype.constructor.name : void 0;
  } catch {
  }
}
function getException(client, mechanism, exception, hint) {
  if (isError(exception)) {
    return [exception, void 0];
  }
  mechanism.synthetic = true;
  if (isPlainObject(exception)) {
    const normalizeDepth = client?.getOptions().normalizeDepth;
    const extras = { ["__serialized__"]: normalizeToSize(exception, normalizeDepth) };
    const errorFromProp = getErrorPropertyFromObject(exception);
    if (errorFromProp) {
      return [errorFromProp, extras];
    }
    const message = getMessageForObject(exception);
    const ex2 = hint?.syntheticException || new Error(message);
    ex2.message = message;
    return [ex2, extras];
  }
  const ex = hint?.syntheticException || new Error(exception);
  ex.message = `${exception}`;
  return [ex, void 0];
}
function eventFromUnknownInput(client, stackParser, exception, hint) {
  const providedMechanism = hint?.data && hint.data.mechanism;
  const mechanism = providedMechanism || {
    handled: true,
    type: "generic"
  };
  const [ex, extras] = getException(client, mechanism, exception, hint);
  const event = {
    exception: {
      values: [exceptionFromError(stackParser, ex)]
    }
  };
  if (extras) {
    event.extra = extras;
  }
  addExceptionTypeValue(event, void 0, void 0);
  addExceptionMechanism(event, mechanism);
  return {
    ...event,
    event_id: hint?.event_id
  };
}
function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
  const event = {
    event_id: hint?.event_id,
    level
  };
  if (attachStacktrace && hint?.syntheticException) {
    const frames = parseStackFrames(stackParser, hint.syntheticException);
    if (frames.length) {
      event.exception = {
        values: [
          {
            value: message,
            stacktrace: { frames }
          }
        ]
      };
      addExceptionMechanism(event, { synthetic: true });
    }
  }
  if (isParameterizedString(message)) {
    const { __sentry_template_string__, __sentry_template_values__ } = message;
    event.logentry = {
      message: __sentry_template_string__,
      params: __sentry_template_values__
    };
    return event;
  }
  event.message = message;
  return event;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/server-runtime-client.js
var ServerRuntimeClient = class extends Client {
  /**
   * Creates a new Edge SDK instance.
   * @param options Configuration options for this SDK.
   */
  constructor(options) {
    registerSpanErrorInstrumentation();
    addUserAgentToTransportHeaders(options);
    super(options);
    this._setUpMetricsProcessing();
  }
  /**
   * @inheritDoc
   */
  eventFromException(exception, hint) {
    const event = eventFromUnknownInput(this, this._options.stackParser, exception, hint);
    event.level = "error";
    return resolvedSyncPromise(event);
  }
  /**
   * @inheritDoc
   */
  eventFromMessage(message, level = "info", hint) {
    return resolvedSyncPromise(
      eventFromMessage(this._options.stackParser, message, level, hint, this._options.attachStacktrace)
    );
  }
  /**
   * @inheritDoc
   */
  captureException(exception, hint, scope) {
    setCurrentRequestSessionErroredOrCrashed(hint);
    return super.captureException(exception, hint, scope);
  }
  /**
   * @inheritDoc
   */
  captureEvent(event, hint, scope) {
    const isException = !event.type && event.exception?.values && event.exception.values.length > 0;
    if (isException) {
      setCurrentRequestSessionErroredOrCrashed(hint);
    }
    return super.captureEvent(event, hint, scope);
  }
  /**
   * Create a cron monitor check in and send it to Sentry.
   *
   * @param checkIn An object that describes a check in.
   * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
   * to create a monitor automatically when sending a check in.
   */
  captureCheckIn(checkIn, monitorConfig, scope) {
    const id = "checkInId" in checkIn && checkIn.checkInId ? checkIn.checkInId : uuid4();
    if (!this._isEnabled()) {
      DEBUG_BUILD && debug.warn("SDK not enabled, will not capture check-in.");
      return id;
    }
    const options = this.getOptions();
    const { release: release2, environment, tunnel } = options;
    const serializedCheckIn = {
      check_in_id: id,
      monitor_slug: checkIn.monitorSlug,
      status: checkIn.status,
      release: release2,
      environment
    };
    if ("duration" in checkIn) {
      serializedCheckIn.duration = checkIn.duration;
    }
    if (monitorConfig) {
      serializedCheckIn.monitor_config = {
        schedule: monitorConfig.schedule,
        checkin_margin: monitorConfig.checkinMargin,
        max_runtime: monitorConfig.maxRuntime,
        timezone: monitorConfig.timezone,
        failure_issue_threshold: monitorConfig.failureIssueThreshold,
        recovery_threshold: monitorConfig.recoveryThreshold
      };
    }
    const [dynamicSamplingContext, traceContext] = _getTraceInfoFromScope(this, scope);
    if (traceContext) {
      serializedCheckIn.contexts = {
        trace: traceContext
      };
    }
    const envelope = createCheckInEnvelope(
      serializedCheckIn,
      dynamicSamplingContext,
      this.getSdkMetadata(),
      tunnel,
      this.getDsn()
    );
    DEBUG_BUILD && debug.log("Sending checkin:", checkIn.monitorSlug, checkIn.status);
    this.sendEnvelope(envelope);
    return id;
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(event, hint, currentScope, isolationScope) {
    if (this._options.platform) {
      event.platform = event.platform || this._options.platform;
    }
    if (this._options.runtime) {
      event.contexts = {
        ...event.contexts,
        runtime: event.contexts?.runtime || this._options.runtime
      };
    }
    if (this._options.serverName) {
      event.server_name = event.server_name || this._options.serverName;
    }
    return super._prepareEvent(event, hint, currentScope, isolationScope);
  }
  /**
   * Process a server-side metric before it is captured.
   */
  _setUpMetricsProcessing() {
    this.on("processMetric", (metric) => {
      if (this._options.serverName) {
        metric.attributes = {
          "server.address": this._options.serverName,
          ...metric.attributes
        };
      }
    });
  }
};
function setCurrentRequestSessionErroredOrCrashed(eventHint) {
  const requestSession = getIsolationScope().getScopeData().sdkProcessingMetadata.requestSession;
  if (requestSession) {
    const isHandledException = eventHint?.mechanism?.handled ?? true;
    if (isHandledException && requestSession.status !== "crashed") {
      requestSession.status = "errored";
    } else if (!isHandledException) {
      requestSession.status = "crashed";
    }
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/transports/offline.js
var MIN_DELAY = 100;
var START_DELAY = 5e3;
var MAX_DELAY = 36e5;
function makeOfflineTransport(createTransport2) {
  function log5(...args) {
    DEBUG_BUILD && debug.log("[Offline]:", ...args);
  }
  return (options) => {
    const transport = createTransport2(options);
    if (!options.createStore) {
      throw new Error("No `createStore` function was provided");
    }
    const store = options.createStore(options);
    let retryDelay = START_DELAY;
    let flushTimer;
    function shouldQueue(env, error3, retryDelay2) {
      if (envelopeContainsItemType(env, ["client_report"])) {
        return false;
      }
      if (options.shouldStore) {
        return options.shouldStore(env, error3, retryDelay2);
      }
      return true;
    }
    function flushIn(delay2) {
      if (flushTimer) {
        clearTimeout(flushTimer);
      }
      flushTimer = setTimeout(async () => {
        flushTimer = void 0;
        const found = await store.shift();
        if (found) {
          log5("Attempting to send previously queued event");
          found[0].sent_at = (/* @__PURE__ */ new Date()).toISOString();
          void send(found, true).catch((e) => {
            log5("Failed to retry sending", e);
          });
        }
      }, delay2);
      if (typeof flushTimer !== "number" && flushTimer.unref) {
        flushTimer.unref();
      }
    }
    function flushWithBackOff() {
      if (flushTimer) {
        return;
      }
      flushIn(retryDelay);
      retryDelay = Math.min(retryDelay * 2, MAX_DELAY);
    }
    async function send(envelope, isRetry = false) {
      if (!isRetry && envelopeContainsItemType(envelope, ["replay_event", "replay_recording"])) {
        await store.push(envelope);
        flushIn(MIN_DELAY);
        return {};
      }
      try {
        if (options.shouldSend && await options.shouldSend(envelope) === false) {
          throw new Error("Envelope not sent because `shouldSend` callback returned false");
        }
        const result = await transport.send(envelope);
        let delay2 = MIN_DELAY;
        if (result) {
          if (result.headers?.["retry-after"]) {
            delay2 = parseRetryAfterHeader(result.headers["retry-after"]);
          } else if (result.headers?.["x-sentry-rate-limits"]) {
            delay2 = 6e4;
          } else if ((result.statusCode || 0) >= 400) {
            return result;
          }
        }
        flushIn(delay2);
        retryDelay = START_DELAY;
        return result;
      } catch (e) {
        if (await shouldQueue(envelope, e, retryDelay)) {
          if (isRetry) {
            await store.unshift(envelope);
          } else {
            await store.push(envelope);
          }
          flushWithBackOff();
          log5("Error sending. Event queued.", e);
          return {};
        } else {
          throw e;
        }
      }
    }
    if (options.flushAtStartup) {
      flushWithBackOff();
    }
    return {
      send,
      flush: (timeout) => {
        if (timeout === void 0) {
          retryDelay = START_DELAY;
          flushIn(MIN_DELAY);
        }
        return transport.flush(timeout);
      }
    };
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/ai/providerSkip.js
var SKIPPED_AI_PROVIDERS = /* @__PURE__ */ new Set();
function _INTERNAL_clearAiProviderSkips() {
  SKIPPED_AI_PROVIDERS.clear();
  DEBUG_BUILD && debug.log("Cleared AI provider skip registrations");
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/url.js
function parseUrl(url) {
  if (!url) {
    return {};
  }
  const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!match) {
    return {};
  }
  const query = match[6] || "";
  const fragment = match[8] || "";
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    search: query,
    hash: fragment,
    relative: match[5] + query + fragment
    // everything minus origin
  };
}
function stripUrlQueryAndFragment(urlPath) {
  return urlPath.split(/[?#]/, 1)[0];
}
function getSanitizedUrlString(url) {
  const { protocol: protocol2, host, path: path2 } = url;
  const filteredHost = host?.replace(/^.*@/, "[filtered]:[filtered]@").replace(/(:80)$/, "").replace(/(:443)$/, "") || "";
  return `${protocol2 ? `${protocol2}://` : ""}${filteredHost}${path2}`;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/parameterize.js
function parameterize(strings, ...values) {
  const formatted = new String(String.raw(strings, ...values));
  formatted.__sentry_template_string__ = strings.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s");
  formatted.__sentry_template_values__ = values;
  return formatted;
}
var fmt = parameterize;

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/ipAddress.js
function addAutoIpAddressToSession(session2) {
  if ("aggregates" in session2) {
    if (session2.attrs?.["ip_address"] === void 0) {
      session2.attrs = {
        ...session2.attrs,
        ip_address: "{{auto}}"
      };
    }
  } else {
    if (session2.ipAddress === void 0) {
      session2.ipAddress = "{{auto}}";
    }
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/sdkMetadata.js
function applySdkMetadata(options, name, names = [name], source = "npm") {
  const metadata = options._metadata || {};
  if (!metadata.sdk) {
    metadata.sdk = {
      name: `sentry.javascript.${name}`,
      packages: names.map((name2) => ({
        name: `${source}:@sentry/${name2}`,
        version: SDK_VERSION
      })),
      version: SDK_VERSION
    };
  }
  options._metadata = metadata;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/traceData.js
function getTraceData(options = {}) {
  const client = options.client || getClient();
  if (!isEnabled2() || !client) {
    return {};
  }
  const carrier = getMainCarrier();
  const acs = getAsyncContextStrategy(carrier);
  if (acs.getTraceData) {
    return acs.getTraceData(options);
  }
  const scope = options.scope || getCurrentScope();
  const span = options.span || getActiveSpan2();
  const sentryTrace = span ? spanToTraceHeader(span) : scopeToTraceHeader(scope);
  const dsc = span ? getDynamicSamplingContextFromSpan(span) : getDynamicSamplingContextFromScope(client, scope);
  const baggage = dynamicSamplingContextToSentryBaggageHeader(dsc);
  const isValidSentryTraceHeader = TRACEPARENT_REGEXP.test(sentryTrace);
  if (!isValidSentryTraceHeader) {
    debug.warn("Invalid sentry-trace data. Cannot generate trace data");
    return {};
  }
  const traceData = {
    "sentry-trace": sentryTrace,
    baggage
  };
  if (options.propagateTraceparent) {
    traceData.traceparent = span ? spanToTraceparentHeader(span) : scopeToTraceparentHeader(scope);
  }
  return traceData;
}
function scopeToTraceHeader(scope) {
  const { traceId, sampled, propagationSpanId } = scope.getPropagationContext();
  return generateSentryTraceHeader(traceId, propagationSpanId, sampled);
}
function scopeToTraceparentHeader(scope) {
  const { traceId, sampled, propagationSpanId } = scope.getPropagationContext();
  return generateTraceparentHeader(traceId, propagationSpanId, sampled);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/debounce.js
function debounce(func, wait, options) {
  let callbackReturnValue;
  let timerId;
  let maxTimerId;
  const maxWait = options?.maxWait ? Math.max(options.maxWait, wait) : 0;
  const setTimeoutImpl = options?.setTimeoutImpl || setTimeout;
  function invokeFunc() {
    cancelTimers();
    callbackReturnValue = func();
    return callbackReturnValue;
  }
  function cancelTimers() {
    timerId !== void 0 && clearTimeout(timerId);
    maxTimerId !== void 0 && clearTimeout(maxTimerId);
    timerId = maxTimerId = void 0;
  }
  function flush2() {
    if (timerId !== void 0 || maxTimerId !== void 0) {
      return invokeFunc();
    }
    return callbackReturnValue;
  }
  function debounced() {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeoutImpl(invokeFunc, wait);
    if (maxWait && maxTimerId === void 0) {
      maxTimerId = setTimeoutImpl(invokeFunc, maxWait);
    }
    return callbackReturnValue;
  }
  debounced.cancel = cancelTimers;
  debounced.flush = flush2;
  return debounced;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/breadcrumbs.js
var DEFAULT_BREADCRUMBS = 100;
function addBreadcrumb(breadcrumb, hint) {
  const client = getClient();
  const isolationScope = getIsolationScope();
  if (!client) return;
  const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } = client.getOptions();
  if (maxBreadcrumbs <= 0) return;
  const timestamp = dateTimestampInSeconds();
  const mergedBreadcrumb = { timestamp, ...breadcrumb };
  const finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint)) : mergedBreadcrumb;
  if (finalBreadcrumb === null) return;
  if (client.emit) {
    client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint);
  }
  isolationScope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/integrations/functiontostring.js
var originalFunctionToString;
var INTEGRATION_NAME = "FunctionToString";
var SETUP_CLIENTS = /* @__PURE__ */ new WeakMap();
var _functionToStringIntegration = (() => {
  return {
    name: INTEGRATION_NAME,
    setupOnce() {
      originalFunctionToString = Function.prototype.toString;
      try {
        Function.prototype.toString = function(...args) {
          const originalFunction = getOriginalFunction(this);
          const context2 = SETUP_CLIENTS.has(getClient()) && originalFunction !== void 0 ? originalFunction : this;
          return originalFunctionToString.apply(context2, args);
        };
      } catch {
      }
    },
    setup(client) {
      SETUP_CLIENTS.set(client, true);
    }
  };
});
var functionToStringIntegration = defineIntegration(_functionToStringIntegration);

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/integrations/eventFilters.js
var DEFAULT_IGNORE_ERRORS = [
  /^Script error\.?$/,
  /^Javascript error: Script error\.? on line 0$/,
  /^ResizeObserver loop completed with undelivered notifications.$/,
  // The browser logs this when a ResizeObserver handler takes a bit longer. Usually this is not an actual issue though. It indicates slowness.
  /^Cannot redefine property: googletag$/,
  // This is thrown when google tag manager is used in combination with an ad blocker
  /^Can't find variable: gmo$/,
  // Error from Google Search App https://issuetracker.google.com/issues/396043331
  /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
  // Random error that happens but not actionable or noticeable to end-users.
  `can't redefine non-configurable property "solana"`,
  // Probably a browser extension or custom browser (Brave) throwing this error
  "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)",
  // Error thrown by GTM, seemingly not affecting end-users
  "Can't find variable: _AutofillCallbackHandler",
  // Unactionable error in instagram webview https://developers.facebook.com/community/threads/320013549791141/
  /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,
  // unactionable error from CEFSharp, a .NET library that embeds chromium in .NET apps
  /^Java exception was raised during method invocation$/
  // error from Facebook Mobile browser (https://github.com/getsentry/sentry-javascript/issues/15065)
];
var INTEGRATION_NAME2 = "EventFilters";
var eventFiltersIntegration = defineIntegration((options = {}) => {
  let mergedOptions;
  return {
    name: INTEGRATION_NAME2,
    setup(client) {
      const clientOptions = client.getOptions();
      mergedOptions = _mergeOptions(options, clientOptions);
    },
    processEvent(event, _hint, client) {
      if (!mergedOptions) {
        const clientOptions = client.getOptions();
        mergedOptions = _mergeOptions(options, clientOptions);
      }
      return _shouldDropEvent(event, mergedOptions) ? null : event;
    }
  };
});
var inboundFiltersIntegration = defineIntegration(((options = {}) => {
  return {
    ...eventFiltersIntegration(options),
    name: "InboundFilters"
  };
}));
function _mergeOptions(internalOptions = {}, clientOptions = {}) {
  return {
    allowUrls: [...internalOptions.allowUrls || [], ...clientOptions.allowUrls || []],
    denyUrls: [...internalOptions.denyUrls || [], ...clientOptions.denyUrls || []],
    ignoreErrors: [
      ...internalOptions.ignoreErrors || [],
      ...clientOptions.ignoreErrors || [],
      ...internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS
    ],
    ignoreTransactions: [...internalOptions.ignoreTransactions || [], ...clientOptions.ignoreTransactions || []]
  };
}
function _shouldDropEvent(event, options) {
  if (!event.type) {
    if (_isIgnoredError(event, options.ignoreErrors)) {
      DEBUG_BUILD && debug.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${getEventDescription(event)}`
      );
      return true;
    }
    if (_isUselessError(event)) {
      DEBUG_BUILD && debug.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${getEventDescription(
          event
        )}`
      );
      return true;
    }
    if (_isDeniedUrl(event, options.denyUrls)) {
      DEBUG_BUILD && debug.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${getEventDescription(
          event
        )}.
Url: ${_getEventFilterUrl(event)}`
      );
      return true;
    }
    if (!_isAllowedUrl(event, options.allowUrls)) {
      DEBUG_BUILD && debug.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${getEventDescription(
          event
        )}.
Url: ${_getEventFilterUrl(event)}`
      );
      return true;
    }
  } else if (event.type === "transaction") {
    if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
      DEBUG_BUILD && debug.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${getEventDescription(event)}`
      );
      return true;
    }
  }
  return false;
}
function _isIgnoredError(event, ignoreErrors) {
  if (!ignoreErrors?.length) {
    return false;
  }
  return getPossibleEventMessages(event).some((message) => stringMatchesSomePattern(message, ignoreErrors));
}
function _isIgnoredTransaction(event, ignoreTransactions) {
  if (!ignoreTransactions?.length) {
    return false;
  }
  const name = event.transaction;
  return name ? stringMatchesSomePattern(name, ignoreTransactions) : false;
}
function _isDeniedUrl(event, denyUrls) {
  if (!denyUrls?.length) {
    return false;
  }
  const url = _getEventFilterUrl(event);
  return !url ? false : stringMatchesSomePattern(url, denyUrls);
}
function _isAllowedUrl(event, allowUrls) {
  if (!allowUrls?.length) {
    return true;
  }
  const url = _getEventFilterUrl(event);
  return !url ? true : stringMatchesSomePattern(url, allowUrls);
}
function _getLastValidUrl(frames = []) {
  for (let i = frames.length - 1; i >= 0; i--) {
    const frame = frames[i];
    if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]") {
      return frame.filename || null;
    }
  }
  return null;
}
function _getEventFilterUrl(event) {
  try {
    const rootException = [...event.exception?.values ?? []].reverse().find((value) => value.mechanism?.parent_id === void 0 && value.stacktrace?.frames?.length);
    const frames = rootException?.stacktrace?.frames;
    return frames ? _getLastValidUrl(frames) : null;
  } catch {
    DEBUG_BUILD && debug.error(`Cannot extract url for event ${getEventDescription(event)}`);
    return null;
  }
}
function _isUselessError(event) {
  if (!event.exception?.values?.length) {
    return false;
  }
  return (
    // No top-level message
    !event.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !event.exception.values.some((value) => value.stacktrace || value.type && value.type !== "Error" || value.value)
  );
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/aggregate-errors.js
function applyAggregateErrorsToEvent(exceptionFromErrorImplementation, parser, key, limit, event, hint) {
  if (!event.exception?.values || !hint || !isInstanceOf(hint.originalException, Error)) {
    return;
  }
  const originalException = event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : void 0;
  if (originalException) {
    event.exception.values = aggregateExceptionsFromError(
      exceptionFromErrorImplementation,
      parser,
      limit,
      hint.originalException,
      key,
      event.exception.values,
      originalException,
      0
    );
  }
}
function aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error3, key, prevExceptions, exception, exceptionId) {
  if (prevExceptions.length >= limit + 1) {
    return prevExceptions;
  }
  let newExceptions = [...prevExceptions];
  if (isInstanceOf(error3[key], Error)) {
    applyExceptionGroupFieldsForParentException(exception, exceptionId);
    const newException = exceptionFromErrorImplementation(parser, error3[key]);
    const newExceptionId = newExceptions.length;
    applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
    newExceptions = aggregateExceptionsFromError(
      exceptionFromErrorImplementation,
      parser,
      limit,
      error3[key],
      key,
      [newException, ...newExceptions],
      newException,
      newExceptionId
    );
  }
  if (Array.isArray(error3.errors)) {
    error3.errors.forEach((childError, i) => {
      if (isInstanceOf(childError, Error)) {
        applyExceptionGroupFieldsForParentException(exception, exceptionId);
        const newException = exceptionFromErrorImplementation(parser, childError);
        const newExceptionId = newExceptions.length;
        applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
        newExceptions = aggregateExceptionsFromError(
          exceptionFromErrorImplementation,
          parser,
          limit,
          childError,
          key,
          [newException, ...newExceptions],
          newException,
          newExceptionId
        );
      }
    });
  }
  return newExceptions;
}
function applyExceptionGroupFieldsForParentException(exception, exceptionId) {
  exception.mechanism = {
    handled: true,
    type: "auto.core.linked_errors",
    ...exception.mechanism,
    ...exception.type === "AggregateError" && { is_exception_group: true },
    exception_id: exceptionId
  };
}
function applyExceptionGroupFieldsForChildException(exception, source, exceptionId, parentId) {
  exception.mechanism = {
    handled: true,
    ...exception.mechanism,
    type: "chained",
    source,
    exception_id: exceptionId,
    parent_id: parentId
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/integrations/linkederrors.js
var DEFAULT_KEY = "cause";
var DEFAULT_LIMIT = 5;
var INTEGRATION_NAME3 = "LinkedErrors";
var _linkedErrorsIntegration = ((options = {}) => {
  const limit = options.limit || DEFAULT_LIMIT;
  const key = options.key || DEFAULT_KEY;
  return {
    name: INTEGRATION_NAME3,
    preprocessEvent(event, hint, client) {
      const options2 = client.getOptions();
      applyAggregateErrorsToEvent(exceptionFromError, options2.stackParser, key, limit, event, hint);
    }
  };
});
var linkedErrorsIntegration = defineIntegration(_linkedErrorsIntegration);

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/instrument/console.js
function addConsoleInstrumentationHandler(handler) {
  const type = "console";
  addHandler(type, handler);
  maybeInstrument(type, instrumentConsole);
}
function instrumentConsole() {
  if (!("console" in GLOBAL_OBJ)) {
    return;
  }
  CONSOLE_LEVELS.forEach(function(level) {
    if (!(level in GLOBAL_OBJ.console)) {
      return;
    }
    fill(GLOBAL_OBJ.console, level, function(originalConsoleMethod) {
      originalConsoleMethods[level] = originalConsoleMethod;
      return function(...args) {
        const handlerData = { args, level };
        triggerHandlers("console", handlerData);
        const log5 = originalConsoleMethods[level];
        log5?.apply(GLOBAL_OBJ.console, args);
      };
    });
  });
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/severity.js
function severityLevelFromString(level) {
  return level === "warn" ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(level) ? level : "log";
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/path.js
var splitPathRe = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
function splitPath(filename) {
  const truncated = filename.length > 1024 ? `<truncated>${filename.slice(-1024)}` : filename;
  const parts = splitPathRe.exec(truncated);
  return parts ? parts.slice(1) : [];
}
function dirname(path2) {
  const result = splitPath(path2);
  const root = result[0] || "";
  let dir = result[1];
  if (!root && !dir) {
    return ".";
  }
  if (dir) {
    dir = dir.slice(0, dir.length - 1);
  }
  return root + dir;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/integrations/console.js
var INTEGRATION_NAME4 = "Console";
var consoleIntegration = defineIntegration((options = {}) => {
  const levels = new Set(options.levels || CONSOLE_LEVELS);
  return {
    name: INTEGRATION_NAME4,
    setup(client) {
      addConsoleInstrumentationHandler(({ args, level }) => {
        if (getClient() !== client || !levels.has(level)) {
          return;
        }
        addConsoleBreadcrumb(level, args);
      });
    }
  };
});
function addConsoleBreadcrumb(level, args) {
  const breadcrumb = {
    category: "console",
    data: {
      arguments: args,
      logger: "console"
    },
    level: severityLevelFromString(level),
    message: formatConsoleArgs(args)
  };
  if (level === "assert") {
    if (args[0] === false) {
      const assertionArgs = args.slice(1);
      breadcrumb.message = assertionArgs.length > 0 ? `Assertion failed: ${formatConsoleArgs(assertionArgs)}` : "Assertion failed";
      breadcrumb.data.arguments = assertionArgs;
    } else {
      return;
    }
  }
  addBreadcrumb(breadcrumb, {
    input: args,
    level
  });
}
function formatConsoleArgs(values) {
  return "util" in GLOBAL_OBJ && typeof GLOBAL_OBJ.util.format === "function" ? GLOBAL_OBJ.util.format(...values) : safeJoin(values, " ");
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/breadcrumb-log-level.js
function getBreadcrumbLogLevelFromHttpStatusCode(statusCode) {
  if (statusCode === void 0) {
    return void 0;
  } else if (statusCode >= 400 && statusCode < 500) {
    return "warning";
  } else if (statusCode >= 500) {
    return "error";
  } else {
    return void 0;
  }
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/node-stack-trace.js
function filenameIsInApp(filename, isNative = false) {
  const isInternal = isNative || filename && // It's not internal if it's an absolute linux path
  !filename.startsWith("/") && // It's not internal if it's an absolute windows path
  !filename.match(/^[A-Z]:/) && // It's not internal if the path is starting with a dot
  !filename.startsWith(".") && // It's not internal if the frame has a protocol. In node, this is usually the case if the file got pre-processed with a bundler like webpack
  !filename.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//);
  return !isInternal && filename !== void 0 && !filename.includes("node_modules/");
}
function node(getModule) {
  const FILENAME_MATCH = /^\s*[-]{4,}$/;
  const FULL_MATCH = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
  const DATA_URI_MATCH = /at (?:async )?(.+?) \(data:(.*?),/;
  return (line) => {
    const dataUriMatch = line.match(DATA_URI_MATCH);
    if (dataUriMatch) {
      return {
        filename: `<data:${dataUriMatch[2]}>`,
        function: dataUriMatch[1]
      };
    }
    const lineMatch = line.match(FULL_MATCH);
    if (lineMatch) {
      let object;
      let method;
      let functionName;
      let typeName;
      let methodName;
      if (lineMatch[1]) {
        functionName = lineMatch[1];
        let methodStart = functionName.lastIndexOf(".");
        if (functionName[methodStart - 1] === ".") {
          methodStart--;
        }
        if (methodStart > 0) {
          object = functionName.slice(0, methodStart);
          method = functionName.slice(methodStart + 1);
          const objectEnd = object.indexOf(".Module");
          if (objectEnd > 0) {
            functionName = functionName.slice(objectEnd + 1);
            object = object.slice(0, objectEnd);
          }
        }
        typeName = void 0;
      }
      if (method) {
        typeName = object;
        methodName = method;
      }
      if (method === "<anonymous>") {
        methodName = void 0;
        functionName = void 0;
      }
      if (functionName === void 0) {
        methodName = methodName || UNKNOWN_FUNCTION;
        functionName = typeName ? `${typeName}.${methodName}` : methodName;
      }
      let filename = lineMatch[2]?.startsWith("file://") ? lineMatch[2].slice(7) : lineMatch[2];
      const isNative = lineMatch[5] === "native";
      if (filename?.match(/\/[A-Z]:/)) {
        filename = filename.slice(1);
      }
      if (!filename && lineMatch[5] && !isNative) {
        filename = lineMatch[5];
      }
      return {
        filename: filename ? decodeURI(filename) : void 0,
        module: getModule ? getModule(filename) : void 0,
        function: functionName,
        lineno: _parseIntOrUndefined(lineMatch[3]),
        colno: _parseIntOrUndefined(lineMatch[4]),
        in_app: filenameIsInApp(filename || "", isNative)
      };
    }
    if (line.match(FILENAME_MATCH)) {
      return {
        filename: line
      };
    }
    return void 0;
  };
}
function nodeStackLineParser(getModule) {
  return [90, node(getModule)];
}
function _parseIntOrUndefined(input) {
  return parseInt(input || "", 10) || void 0;
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/anr.js
function watchdogTimer(createTimer, pollInterval, anrThreshold, callback) {
  const timer = createTimer();
  let triggered = false;
  let enabled = true;
  setInterval(() => {
    const diffMs = timer.getTimeMs();
    if (triggered === false && diffMs > pollInterval + anrThreshold) {
      triggered = true;
      if (enabled) {
        callback();
      }
    }
    if (diffMs < pollInterval + anrThreshold) {
      triggered = false;
    }
  }, 20);
  return {
    poll: () => {
      timer.reset();
    },
    enabled: (state) => {
      enabled = state;
    }
  };
}
function callFrameToStackFrame(frame, url, getModuleFromFilename2) {
  const filename = url ? url.replace(/^file:\/\//, "") : void 0;
  const colno = frame.location.columnNumber ? frame.location.columnNumber + 1 : void 0;
  const lineno = frame.location.lineNumber ? frame.location.lineNumber + 1 : void 0;
  return {
    filename,
    module: getModuleFromFilename2(filename),
    function: frame.functionName || UNKNOWN_FUNCTION,
    colno,
    lineno,
    in_app: filename ? filenameIsInApp(filename) : void 0
  };
}

// node_modules/.pnpm/@sentry+core@10.34.0/node_modules/@sentry/core/build/esm/utils/lru.js
var LRUMap = class {
  constructor(_maxSize) {
    this._maxSize = _maxSize;
    this._cache = /* @__PURE__ */ new Map();
  }
  /** Get the current size of the cache */
  get size() {
    return this._cache.size;
  }
  /** Get an entry or undefined if it was not in the cache. Re-inserts to update the recently used order */
  get(key) {
    const value = this._cache.get(key);
    if (value === void 0) {
      return void 0;
    }
    this._cache.delete(key);
    this._cache.set(key, value);
    return value;
  }
  /** Insert an entry and evict an older entry if we've reached maxSize */
  set(key, value) {
    if (this._cache.size >= this._maxSize) {
      const nextKey = this._cache.keys().next().value;
      this._cache.delete(nextKey);
    }
    this._cache.set(key, value);
  }
  /** Remove an entry and return the entry if it was in the cache */
  remove(key) {
    const value = this._cache.get(key);
    if (value) {
      this._cache.delete(key);
    }
    return value;
  }
  /** Clear all entries */
  clear() {
    this._cache.clear();
  }
  /** Get all the keys */
  keys() {
    return Array.from(this._cache.keys());
  }
  /** Get all the values */
  values() {
    const values = [];
    this._cache.forEach((value) => values.push(value));
    return values;
  }
};

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/logs/exports.js
var exports_exports = {};
__export(exports_exports, {
  debug: () => debug2,
  error: () => error2,
  fatal: () => fatal,
  fmt: () => fmt,
  info: () => info,
  trace: () => trace2,
  warn: () => warn2
});

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/logs/capture.js
import { format } from "node:util";
function captureLog(level, ...args) {
  const [messageOrMessageTemplate, paramsOrAttributes, maybeAttributesOrMetadata, maybeMetadata] = args;
  if (Array.isArray(paramsOrAttributes)) {
    const attributes2 = { ...maybeAttributesOrMetadata };
    attributes2["sentry.message.template"] = messageOrMessageTemplate;
    paramsOrAttributes.forEach((param, index) => {
      attributes2[`sentry.message.parameter.${index}`] = param;
    });
    const message = format(messageOrMessageTemplate, ...paramsOrAttributes);
    _INTERNAL_captureLog({ level, message, attributes: attributes2 }, maybeMetadata?.scope);
  } else {
    _INTERNAL_captureLog(
      { level, message: messageOrMessageTemplate, attributes: paramsOrAttributes },
      // type-casting here because from the type definitions we know that `maybeAttributesOrMetadata` is a metadata object (or undefined)
      maybeAttributesOrMetadata?.scope ?? maybeMetadata?.scope
    );
  }
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/logs/exports.js
function trace2(...args) {
  captureLog("trace", ...args);
}
function debug2(...args) {
  captureLog("debug", ...args);
}
function info(...args) {
  captureLog("info", ...args);
}
function warn2(...args) {
  captureLog("warn", ...args);
}
function error2(...args) {
  captureLog("error", ...args);
}
function fatal(...args) {
  captureLog("fatal", ...args);
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/otel/instrument.js
var import_instrumentation = __toESM(require_src3(), 1);
var INSTRUMENTED = {};
function generateInstrumentOnce(name, creatorOrClass, optionsCallback) {
  if (optionsCallback) {
    return _generateInstrumentOnceWithOptions(
      name,
      creatorOrClass,
      optionsCallback
    );
  }
  return _generateInstrumentOnce(name, creatorOrClass);
}
function _generateInstrumentOnce(name, creator) {
  return Object.assign(
    (options) => {
      const instrumented2 = INSTRUMENTED[name];
      if (instrumented2) {
        if (options) {
          instrumented2.setConfig(options);
        }
        return instrumented2;
      }
      const instrumentation = creator(options);
      INSTRUMENTED[name] = instrumentation;
      (0, import_instrumentation.registerInstrumentations)({
        instrumentations: [instrumentation]
      });
      return instrumentation;
    },
    { id: name }
  );
}
function _generateInstrumentOnceWithOptions(name, instrumentationClass, optionsCallback) {
  return Object.assign(
    (_options) => {
      const options = optionsCallback(_options);
      const instrumented2 = INSTRUMENTED[name];
      if (instrumented2) {
        instrumented2.setConfig(options);
        return instrumented2;
      }
      const instrumentation = new instrumentationClass(options);
      INSTRUMENTED[name] = instrumentation;
      (0, import_instrumentation.registerInstrumentations)({
        instrumentations: [instrumentation]
      });
      return instrumentation;
    },
    { id: name }
  );
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/debug-build.js
var DEBUG_BUILD2 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;

// node_modules/.pnpm/@sentry+opentelemetry@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hoo_c8a02f6df4864b59712cd342bca4b758/node_modules/@sentry/opentelemetry/build/esm/index.js
init_esm2();
init_esm();
init_esm();
var import_core4 = __toESM(require_src4(), 1);
var import_sdk_trace_base = __toESM(require_src6(), 1);
var SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE = "sentry.parentIsRemote";
var SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION = "sentry.graphql.operation";
function getParentSpanId(span) {
  if ("parentSpanId" in span) {
    return span.parentSpanId;
  } else if ("parentSpanContext" in span) {
    return span.parentSpanContext?.spanId;
  }
  return void 0;
}
function spanHasAttributes(span) {
  const castSpan = span;
  return !!castSpan.attributes && typeof castSpan.attributes === "object";
}
function spanHasKind(span) {
  const castSpan = span;
  return typeof castSpan.kind === "number";
}
function spanHasStatus(span) {
  const castSpan = span;
  return !!castSpan.status;
}
function spanHasName(span) {
  const castSpan = span;
  return !!castSpan.name;
}
function getRequestSpanData(span) {
  if (!spanHasAttributes(span)) {
    return {};
  }
  const maybeUrlAttribute = span.attributes[ATTR_URL_FULL] || span.attributes[SEMATTRS_HTTP_URL];
  const data = {
    url: maybeUrlAttribute,
    // eslint-disable-next-line deprecation/deprecation
    "http.method": span.attributes[ATTR_HTTP_REQUEST_METHOD] || span.attributes[SEMATTRS_HTTP_METHOD]
  };
  if (!data["http.method"] && data.url) {
    data["http.method"] = "GET";
  }
  try {
    if (typeof maybeUrlAttribute === "string") {
      const url = parseUrl(maybeUrlAttribute);
      data.url = getSanitizedUrlString(url);
      if (url.search) {
        data["http.query"] = url.search;
      }
      if (url.hash) {
        data["http.fragment"] = url.hash;
      }
    }
  } catch {
  }
  return data;
}
function getSpanKind(span) {
  if (spanHasKind(span)) {
    return span.kind;
  }
  return SpanKind.INTERNAL;
}
var SENTRY_TRACE_HEADER = "sentry-trace";
var SENTRY_BAGGAGE_HEADER = "baggage";
var SENTRY_TRACE_STATE_DSC = "sentry.dsc";
var SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING = "sentry.sampled_not_recording";
var SENTRY_TRACE_STATE_URL = "sentry.url";
var SENTRY_TRACE_STATE_SAMPLE_RAND = "sentry.sample_rand";
var SENTRY_TRACE_STATE_SAMPLE_RATE = "sentry.sample_rate";
var SENTRY_SCOPES_CONTEXT_KEY = createContextKey("sentry_scopes");
var SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY = createContextKey("sentry_fork_isolation_scope");
var SENTRY_FORK_SET_SCOPE_CONTEXT_KEY = createContextKey("sentry_fork_set_scope");
var SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY = createContextKey("sentry_fork_set_isolation_scope");
var SCOPE_CONTEXT_FIELD = "_scopeContext";
function getScopesFromContext(context2) {
  return context2.getValue(SENTRY_SCOPES_CONTEXT_KEY);
}
function setScopesOnContext(context2, scopes) {
  return context2.setValue(SENTRY_SCOPES_CONTEXT_KEY, scopes);
}
function setContextOnScope(scope, context2) {
  addNonEnumerableProperty(scope, SCOPE_CONTEXT_FIELD, context2);
}
function getContextFromScope(scope) {
  return scope[SCOPE_CONTEXT_FIELD];
}
function getSamplingDecision(spanContext) {
  const { traceFlags, traceState } = spanContext;
  const sampledNotRecording = traceState ? traceState.get(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING) === "1" : false;
  if (traceFlags === TraceFlags.SAMPLED) {
    return true;
  }
  if (sampledNotRecording) {
    return false;
  }
  const dscString = traceState ? traceState.get(SENTRY_TRACE_STATE_DSC) : void 0;
  const dsc = dscString ? baggageHeaderToDynamicSamplingContext(dscString) : void 0;
  if (dsc?.sampled === "true") {
    return true;
  }
  if (dsc?.sampled === "false") {
    return false;
  }
  return void 0;
}
function inferSpanData(spanName, attributes2, kind) {
  const httpMethod = attributes2[ATTR_HTTP_REQUEST_METHOD] || attributes2[SEMATTRS_HTTP_METHOD];
  if (httpMethod) {
    return descriptionForHttpMethod({ attributes: attributes2, name: spanName, kind }, httpMethod);
  }
  const dbSystem = attributes2[SEMATTRS_DB_SYSTEM];
  const opIsCache = typeof attributes2[SEMANTIC_ATTRIBUTE_SENTRY_OP] === "string" && attributes2[SEMANTIC_ATTRIBUTE_SENTRY_OP].startsWith("cache.");
  if (dbSystem && !opIsCache) {
    return descriptionForDbSystem({ attributes: attributes2, name: spanName });
  }
  const customSourceOrRoute = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] === "custom" ? "custom" : "route";
  const rpcService = attributes2[SEMATTRS_RPC_SERVICE];
  if (rpcService) {
    return {
      ...getUserUpdatedNameAndSource(spanName, attributes2, "route"),
      op: "rpc"
    };
  }
  const messagingSystem = attributes2[SEMATTRS_MESSAGING_SYSTEM];
  if (messagingSystem) {
    return {
      ...getUserUpdatedNameAndSource(spanName, attributes2, customSourceOrRoute),
      op: "message"
    };
  }
  const faasTrigger = attributes2[SEMATTRS_FAAS_TRIGGER];
  if (faasTrigger) {
    return {
      ...getUserUpdatedNameAndSource(spanName, attributes2, customSourceOrRoute),
      op: faasTrigger.toString()
    };
  }
  return { op: void 0, description: spanName, source: "custom" };
}
function parseSpanDescription(span) {
  const attributes2 = spanHasAttributes(span) ? span.attributes : {};
  const name = spanHasName(span) ? span.name : "<unknown>";
  const kind = getSpanKind(span);
  return inferSpanData(name, attributes2, kind);
}
function descriptionForDbSystem({ attributes: attributes2, name }) {
  const userDefinedName = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
  if (typeof userDefinedName === "string") {
    return {
      op: "db",
      description: userDefinedName,
      source: attributes2[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] || "custom"
    };
  }
  if (attributes2[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] === "custom") {
    return { op: "db", description: name, source: "custom" };
  }
  const statement = attributes2[SEMATTRS_DB_STATEMENT];
  const description = statement ? statement.toString() : name;
  return { op: "db", description, source: "task" };
}
function descriptionForHttpMethod({ name, kind, attributes: attributes2 }, httpMethod) {
  const opParts = ["http"];
  switch (kind) {
    case SpanKind.CLIENT:
      opParts.push("client");
      break;
    case SpanKind.SERVER:
      opParts.push("server");
      break;
  }
  if (attributes2["sentry.http.prefetch"]) {
    opParts.push("prefetch");
  }
  const { urlPath, url, query, fragment, hasRoute } = getSanitizedUrl(attributes2, kind);
  if (!urlPath) {
    return { ...getUserUpdatedNameAndSource(name, attributes2), op: opParts.join(".") };
  }
  const graphqlOperationsAttribute = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION];
  const baseDescription = `${httpMethod} ${urlPath}`;
  const inferredDescription = graphqlOperationsAttribute ? `${baseDescription} (${getGraphqlOperationNamesFromAttribute(graphqlOperationsAttribute)})` : baseDescription;
  const inferredSource = hasRoute || urlPath === "/" ? "route" : "url";
  const data = {};
  if (url) {
    data.url = url;
  }
  if (query) {
    data["http.query"] = query;
  }
  if (fragment) {
    data["http.fragment"] = fragment;
  }
  const isClientOrServerKind = kind === SpanKind.CLIENT || kind === SpanKind.SERVER;
  const origin = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN] || "manual";
  const isManualSpan = !`${origin}`.startsWith("auto");
  const alreadyHasCustomSource = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] === "custom";
  const customSpanName = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
  const useInferredDescription = !alreadyHasCustomSource && customSpanName == null && (isClientOrServerKind || !isManualSpan);
  const { description, source } = useInferredDescription ? { description: inferredDescription, source: inferredSource } : getUserUpdatedNameAndSource(name, attributes2);
  return {
    op: opParts.join("."),
    description,
    source,
    data
  };
}
function getGraphqlOperationNamesFromAttribute(attr) {
  if (Array.isArray(attr)) {
    const sorted = attr.slice().sort();
    if (sorted.length <= 5) {
      return sorted.join(", ");
    } else {
      return `${sorted.slice(0, 5).join(", ")}, +${sorted.length - 5}`;
    }
  }
  return `${attr}`;
}
function getSanitizedUrl(attributes2, kind) {
  const httpTarget = attributes2[SEMATTRS_HTTP_TARGET];
  const httpUrl = attributes2[SEMATTRS_HTTP_URL] || attributes2[ATTR_URL_FULL];
  const httpRoute = attributes2[ATTR_HTTP_ROUTE];
  const parsedUrl = typeof httpUrl === "string" ? parseUrl(httpUrl) : void 0;
  const url = parsedUrl ? getSanitizedUrlString(parsedUrl) : void 0;
  const query = parsedUrl?.search || void 0;
  const fragment = parsedUrl?.hash || void 0;
  if (typeof httpRoute === "string") {
    return { urlPath: httpRoute, url, query, fragment, hasRoute: true };
  }
  if (kind === SpanKind.SERVER && typeof httpTarget === "string") {
    return { urlPath: stripUrlQueryAndFragment(httpTarget), url, query, fragment, hasRoute: false };
  }
  if (parsedUrl) {
    return { urlPath: url, url, query, fragment, hasRoute: false };
  }
  if (typeof httpTarget === "string") {
    return { urlPath: stripUrlQueryAndFragment(httpTarget), url, query, fragment, hasRoute: false };
  }
  return { urlPath: void 0, url, query, fragment, hasRoute: false };
}
function getUserUpdatedNameAndSource(originalName, attributes2, fallbackSource = "custom") {
  const source = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] || fallbackSource;
  const description = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
  if (description && typeof description === "string") {
    return {
      description,
      source
    };
  }
  return { description: originalName, source };
}
function getActiveSpan3() {
  return trace.getActiveSpan();
}
var DEBUG_BUILD3 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
function makeTraceState({
  dsc,
  sampled
}) {
  const dscString = dsc ? dynamicSamplingContextToSentryBaggageHeader(dsc) : void 0;
  const traceStateBase = new import_core4.TraceState();
  const traceStateWithDsc = dscString ? traceStateBase.set(SENTRY_TRACE_STATE_DSC, dscString) : traceStateBase;
  return sampled === false ? traceStateWithDsc.set(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING, "1") : traceStateWithDsc;
}
var setupElements = /* @__PURE__ */ new Set();
function setIsSetup(element) {
  setupElements.add(element);
}
var SentryPropagator = class extends import_core4.W3CBaggagePropagator {
  /** A map of URLs that have already been checked for if they match tracePropagationTargets. */
  constructor() {
    super();
    setIsSetup("SentryPropagator");
    this._urlMatchesTargetsMap = new LRUMap(100);
  }
  /**
   * @inheritDoc
   */
  inject(context2, carrier, setter) {
    if ((0, import_core4.isTracingSuppressed)(context2)) {
      DEBUG_BUILD3 && debug.log("[Tracing] Not injecting trace data for url because tracing is suppressed.");
      return;
    }
    const activeSpan = trace.getSpan(context2);
    const url = activeSpan && getCurrentURL(activeSpan);
    const { tracePropagationTargets, propagateTraceparent } = getClient()?.getOptions() || {};
    if (!shouldPropagateTraceForUrl(url, tracePropagationTargets, this._urlMatchesTargetsMap)) {
      DEBUG_BUILD3 && debug.log("[Tracing] Not injecting trace data for url because it does not match tracePropagationTargets:", url);
      return;
    }
    const existingBaggageHeader = getExistingBaggage(carrier);
    let baggage = propagation.getBaggage(context2) || propagation.createBaggage({});
    const { dynamicSamplingContext, traceId, spanId, sampled } = getInjectionData(context2);
    if (existingBaggageHeader) {
      const baggageEntries = parseBaggageHeader(existingBaggageHeader);
      if (baggageEntries) {
        Object.entries(baggageEntries).forEach(([key, value]) => {
          baggage = baggage.setEntry(key, { value });
        });
      }
    }
    if (dynamicSamplingContext) {
      baggage = Object.entries(dynamicSamplingContext).reduce((b, [dscKey, dscValue]) => {
        if (dscValue) {
          return b.setEntry(`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`, { value: dscValue });
        }
        return b;
      }, baggage);
    }
    if (traceId && traceId !== INVALID_TRACEID) {
      setter.set(carrier, SENTRY_TRACE_HEADER, generateSentryTraceHeader(traceId, spanId, sampled));
      if (propagateTraceparent) {
        setter.set(carrier, "traceparent", generateTraceparentHeader(traceId, spanId, sampled));
      }
    }
    super.inject(propagation.setBaggage(context2, baggage), carrier, setter);
  }
  /**
   * @inheritDoc
   */
  extract(context2, carrier, getter) {
    const maybeSentryTraceHeader = getter.get(carrier, SENTRY_TRACE_HEADER);
    const baggage = getter.get(carrier, SENTRY_BAGGAGE_HEADER);
    const sentryTrace = maybeSentryTraceHeader ? Array.isArray(maybeSentryTraceHeader) ? maybeSentryTraceHeader[0] : maybeSentryTraceHeader : void 0;
    return ensureScopesOnContext(getContextWithRemoteActiveSpan(context2, { sentryTrace, baggage }));
  }
  /**
   * @inheritDoc
   */
  fields() {
    return [SENTRY_TRACE_HEADER, SENTRY_BAGGAGE_HEADER, "traceparent"];
  }
};
var NOT_PROPAGATED_MESSAGE = "[Tracing] Not injecting trace data for url because it does not match tracePropagationTargets:";
function shouldPropagateTraceForUrl(url, tracePropagationTargets, decisionMap) {
  if (typeof url !== "string" || !tracePropagationTargets) {
    return true;
  }
  const cachedDecision = decisionMap?.get(url);
  if (cachedDecision !== void 0) {
    DEBUG_BUILD3 && !cachedDecision && debug.log(NOT_PROPAGATED_MESSAGE, url);
    return cachedDecision;
  }
  const decision = stringMatchesSomePattern(url, tracePropagationTargets);
  decisionMap?.set(url, decision);
  DEBUG_BUILD3 && !decision && debug.log(NOT_PROPAGATED_MESSAGE, url);
  return decision;
}
function getInjectionData(context2, options = {}) {
  const span = trace.getSpan(context2);
  if (span?.spanContext().isRemote) {
    const spanContext = span.spanContext();
    const dynamicSamplingContext2 = getDynamicSamplingContextFromSpan(span);
    return {
      dynamicSamplingContext: dynamicSamplingContext2,
      traceId: spanContext.traceId,
      spanId: void 0,
      sampled: getSamplingDecision(spanContext)
      // TODO: Do we need to change something here?
    };
  }
  if (span) {
    const spanContext = span.spanContext();
    const dynamicSamplingContext2 = getDynamicSamplingContextFromSpan(span);
    return {
      dynamicSamplingContext: dynamicSamplingContext2,
      traceId: spanContext.traceId,
      spanId: spanContext.spanId,
      sampled: getSamplingDecision(spanContext)
      // TODO: Do we need to change something here?
    };
  }
  const scope = options.scope || getScopesFromContext(context2)?.scope || getCurrentScope();
  const client = options.client || getClient();
  const propagationContext = scope.getPropagationContext();
  const dynamicSamplingContext = client ? getDynamicSamplingContextFromScope(client, scope) : void 0;
  return {
    dynamicSamplingContext,
    traceId: propagationContext.traceId,
    spanId: propagationContext.propagationSpanId,
    sampled: propagationContext.sampled
  };
}
function getContextWithRemoteActiveSpan(ctx, { sentryTrace, baggage }) {
  const propagationContext = propagationContextFromHeaders(sentryTrace, baggage);
  const { traceId, parentSpanId, sampled, dsc } = propagationContext;
  const client = getClient();
  const incomingDsc = baggageHeaderToDynamicSamplingContext(baggage);
  if (!parentSpanId || client && !shouldContinueTrace(client, incomingDsc?.org_id)) {
    return ctx;
  }
  const spanContext = generateRemoteSpanContext({
    traceId,
    spanId: parentSpanId,
    sampled,
    dsc
  });
  return trace.setSpanContext(ctx, spanContext);
}
function continueTraceAsRemoteSpan(ctx, options, callback) {
  const ctxWithSpanContext = ensureScopesOnContext(getContextWithRemoteActiveSpan(ctx, options));
  return context.with(ctxWithSpanContext, callback);
}
function ensureScopesOnContext(ctx) {
  const scopes = getScopesFromContext(ctx);
  const newScopes = {
    // If we have no scope here, this is most likely either the root context or a context manually derived from it
    // In this case, we want to fork the current scope, to ensure we do not pollute the root scope
    scope: scopes ? scopes.scope : getCurrentScope().clone(),
    isolationScope: scopes ? scopes.isolationScope : getIsolationScope()
  };
  return setScopesOnContext(ctx, newScopes);
}
function getExistingBaggage(carrier) {
  try {
    const baggage = carrier[SENTRY_BAGGAGE_HEADER];
    return Array.isArray(baggage) ? baggage.join(",") : baggage;
  } catch {
    return void 0;
  }
}
function getCurrentURL(span) {
  const spanData = spanToJSON(span).data;
  const urlAttribute = spanData[SEMATTRS_HTTP_URL] || spanData[ATTR_URL_FULL];
  if (typeof urlAttribute === "string") {
    return urlAttribute;
  }
  const urlTraceState = span.spanContext().traceState?.get(SENTRY_TRACE_STATE_URL);
  if (urlTraceState) {
    return urlTraceState;
  }
  return void 0;
}
function generateRemoteSpanContext({
  spanId,
  traceId,
  sampled,
  dsc
}) {
  const traceState = makeTraceState({
    dsc,
    sampled
  });
  const spanContext = {
    traceId,
    spanId,
    isRemote: true,
    traceFlags: sampled ? TraceFlags.SAMPLED : TraceFlags.NONE,
    traceState
  };
  return spanContext;
}
function _startSpan(options, callback, autoEnd) {
  const tracer = getTracer();
  const { name, parentSpan: customParentSpan } = options;
  const wrapper = getActiveSpanWrapper2(customParentSpan);
  return wrapper(() => {
    const activeCtx = getContext(options.scope, options.forceTransaction);
    const shouldSkipSpan = options.onlyIfParent && !trace.getSpan(activeCtx);
    const ctx = shouldSkipSpan ? (0, import_core4.suppressTracing)(activeCtx) : activeCtx;
    const spanOptions = getSpanOptions(options);
    if (!hasSpansEnabled()) {
      const suppressedCtx = (0, import_core4.isTracingSuppressed)(ctx) ? ctx : (0, import_core4.suppressTracing)(ctx);
      return context.with(suppressedCtx, () => {
        return tracer.startActiveSpan(name, spanOptions, suppressedCtx, (span) => {
          return context.with(activeCtx, () => {
            return handleCallbackErrors(
              () => callback(span),
              () => {
                if (spanToJSON(span).status === void 0) {
                  span.setStatus({ code: SpanStatusCode.ERROR });
                }
              },
              autoEnd ? () => span.end() : void 0
            );
          });
        });
      });
    }
    return tracer.startActiveSpan(name, spanOptions, ctx, (span) => {
      return handleCallbackErrors(
        () => callback(span),
        () => {
          if (spanToJSON(span).status === void 0) {
            span.setStatus({ code: SpanStatusCode.ERROR });
          }
        },
        autoEnd ? () => span.end() : void 0
      );
    });
  });
}
function startSpan2(options, callback) {
  return _startSpan(options, callback, true);
}
function startSpanManual2(options, callback) {
  return _startSpan(options, (span) => callback(span, () => span.end()), false);
}
function startInactiveSpan2(options) {
  const tracer = getTracer();
  const { name, parentSpan: customParentSpan } = options;
  const wrapper = getActiveSpanWrapper2(customParentSpan);
  return wrapper(() => {
    const activeCtx = getContext(options.scope, options.forceTransaction);
    const shouldSkipSpan = options.onlyIfParent && !trace.getSpan(activeCtx);
    let ctx = shouldSkipSpan ? (0, import_core4.suppressTracing)(activeCtx) : activeCtx;
    const spanOptions = getSpanOptions(options);
    if (!hasSpansEnabled()) {
      ctx = (0, import_core4.isTracingSuppressed)(ctx) ? ctx : (0, import_core4.suppressTracing)(ctx);
    }
    return tracer.startSpan(name, spanOptions, ctx);
  });
}
function withActiveSpan2(span, callback) {
  const newContextWithActiveSpan = span ? trace.setSpan(context.active(), span) : trace.deleteSpan(context.active());
  return context.with(newContextWithActiveSpan, () => callback(getCurrentScope()));
}
function getTracer() {
  const client = getClient();
  return client?.tracer || trace.getTracer("@sentry/opentelemetry", SDK_VERSION);
}
function getSpanOptions(options) {
  const { startTime, attributes: attributes2, kind, op, links } = options;
  const fixedStartTime = typeof startTime === "number" ? ensureTimestampInMilliseconds(startTime) : startTime;
  return {
    attributes: op ? {
      [SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
      ...attributes2
    } : attributes2,
    kind,
    links,
    startTime: fixedStartTime
  };
}
function ensureTimestampInMilliseconds(timestamp) {
  const isMs = timestamp < 9999999999;
  return isMs ? timestamp * 1e3 : timestamp;
}
function getContext(scope, forceTransaction) {
  const ctx = getContextForScope(scope);
  const parentSpan = trace.getSpan(ctx);
  if (!parentSpan) {
    return ctx;
  }
  if (!forceTransaction) {
    return ctx;
  }
  const ctxWithoutSpan = trace.deleteSpan(ctx);
  const { spanId, traceId } = parentSpan.spanContext();
  const sampled = getSamplingDecision(parentSpan.spanContext());
  const rootSpan = getRootSpan(parentSpan);
  const dsc = getDynamicSamplingContextFromSpan(rootSpan);
  const traceState = makeTraceState({
    dsc,
    sampled
  });
  const spanOptions = {
    traceId,
    spanId,
    isRemote: true,
    traceFlags: sampled ? TraceFlags.SAMPLED : TraceFlags.NONE,
    traceState
  };
  const ctxWithSpanContext = trace.setSpanContext(ctxWithoutSpan, spanOptions);
  return ctxWithSpanContext;
}
function getContextForScope(scope) {
  if (scope) {
    const ctx = getContextFromScope(scope);
    if (ctx) {
      return ctx;
    }
  }
  return context.active();
}
function continueTrace2(options, callback) {
  return continueTraceAsRemoteSpan(context.active(), options, callback);
}
function getTraceContextForScope(client, scope) {
  const ctx = getContextFromScope(scope);
  const span = ctx && trace.getSpan(ctx);
  const traceContext = span ? spanToTraceContext(span) : getTraceContextFromScope(scope);
  const dynamicSamplingContext = span ? getDynamicSamplingContextFromSpan(span) : getDynamicSamplingContextFromScope(client, scope);
  return [dynamicSamplingContext, traceContext];
}
function getActiveSpanWrapper2(parentSpan) {
  return parentSpan !== void 0 ? (callback) => {
    return withActiveSpan2(parentSpan, callback);
  } : (callback) => callback();
}
function suppressTracing2(callback) {
  const ctx = (0, import_core4.suppressTracing)(context.active());
  return context.with(ctx, callback);
}
function getTraceData2({
  span,
  scope,
  client,
  propagateTraceparent
} = {}) {
  let ctx = (scope && getContextFromScope(scope)) ?? context.active();
  if (span) {
    const { scope: scope2 } = getCapturedScopesOnSpan(span);
    ctx = scope2 && getContextFromScope(scope2) || trace.setSpan(context.active(), span);
  }
  const { traceId, spanId, sampled, dynamicSamplingContext } = getInjectionData(ctx, { scope, client });
  const traceData = {
    "sentry-trace": generateSentryTraceHeader(traceId, spanId, sampled),
    baggage: dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext)
  };
  if (propagateTraceparent) {
    traceData.traceparent = generateTraceparentHeader(traceId, spanId, sampled);
  }
  return traceData;
}
function setOpenTelemetryContextAsyncContextStrategy() {
  function getScopes() {
    const ctx = context.active();
    const scopes = getScopesFromContext(ctx);
    if (scopes) {
      return scopes;
    }
    return {
      scope: getDefaultCurrentScope(),
      isolationScope: getDefaultIsolationScope()
    };
  }
  function withScope3(callback) {
    const ctx = context.active();
    return context.with(ctx, () => {
      return callback(getCurrentScope2());
    });
  }
  function withSetScope2(scope, callback) {
    const ctx = getContextFromScope(scope) || context.active();
    return context.with(ctx.setValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY, scope), () => {
      return callback(scope);
    });
  }
  function withIsolationScope3(callback) {
    const ctx = context.active();
    return context.with(ctx.setValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY, true), () => {
      return callback(getIsolationScope2());
    });
  }
  function withSetIsolationScope(isolationScope, callback) {
    const ctx = context.active();
    return context.with(ctx.setValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY, isolationScope), () => {
      return callback(getIsolationScope2());
    });
  }
  function getCurrentScope2() {
    return getScopes().scope;
  }
  function getIsolationScope2() {
    return getScopes().isolationScope;
  }
  setAsyncContextStrategy({
    withScope: withScope3,
    withSetScope: withSetScope2,
    withSetIsolationScope,
    withIsolationScope: withIsolationScope3,
    getCurrentScope: getCurrentScope2,
    getIsolationScope: getIsolationScope2,
    startSpan: startSpan2,
    startSpanManual: startSpanManual2,
    startInactiveSpan: startInactiveSpan2,
    getActiveSpan: getActiveSpan3,
    suppressTracing: suppressTracing2,
    getTraceData: getTraceData2,
    continueTrace: continueTrace2,
    // The types here don't fully align, because our own `Span` type is narrower
    // than the OTEL one - but this is OK for here, as we now we'll only have OTEL spans passed around
    withActiveSpan: withActiveSpan2
  });
}
function wrapContextManagerClass(ContextManagerClass) {
  class SentryContextManager2 extends ContextManagerClass {
    constructor(...args) {
      super(...args);
      setIsSetup("SentryContextManager");
    }
    /**
     * Overwrite with() of the original AsyncLocalStorageContextManager
     * to ensure we also create new scopes per context.
     */
    with(context2, fn, thisArg, ...args) {
      const currentScopes = getScopesFromContext(context2);
      const currentScope = currentScopes?.scope || getCurrentScope();
      const currentIsolationScope = currentScopes?.isolationScope || getIsolationScope();
      const shouldForkIsolationScope = context2.getValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY) === true;
      const scope = context2.getValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY);
      const isolationScope = context2.getValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY);
      const newCurrentScope = scope || currentScope.clone();
      const newIsolationScope = isolationScope || (shouldForkIsolationScope ? currentIsolationScope.clone() : currentIsolationScope);
      const scopes = { scope: newCurrentScope, isolationScope: newIsolationScope };
      const ctx1 = setScopesOnContext(context2, scopes);
      const ctx2 = ctx1.deleteValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY).deleteValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY).deleteValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY);
      setContextOnScope(newCurrentScope, ctx2);
      return super.with(ctx2, fn, thisArg, ...args);
    }
    /**
     * Gets underlying AsyncLocalStorage and symbol to allow lookup of scope.
     */
    getAsyncLocalStorageLookup() {
      return {
        // @ts-expect-error This is on the base class, but not part of the interface
        asyncLocalStorage: this._asyncLocalStorage,
        contextSymbol: SENTRY_SCOPES_CONTEXT_KEY
      };
    }
  }
  return SentryContextManager2;
}
function groupSpansWithParents(spans) {
  const nodeMap = /* @__PURE__ */ new Map();
  for (const span of spans) {
    createOrUpdateSpanNodeAndRefs(nodeMap, span);
  }
  return Array.from(nodeMap, function([_id, spanNode]) {
    return spanNode;
  });
}
function getLocalParentId(span) {
  const parentIsRemote = span.attributes[SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE] === true;
  return !parentIsRemote ? getParentSpanId(span) : void 0;
}
function createOrUpdateSpanNodeAndRefs(nodeMap, span) {
  const id = span.spanContext().spanId;
  const parentId = getLocalParentId(span);
  if (!parentId) {
    createOrUpdateNode(nodeMap, { id, span, children: [] });
    return;
  }
  const parentNode = createOrGetParentNode(nodeMap, parentId);
  const node3 = createOrUpdateNode(nodeMap, { id, span, parentNode, children: [] });
  parentNode.children.push(node3);
}
function createOrGetParentNode(nodeMap, id) {
  const existing = nodeMap.get(id);
  if (existing) {
    return existing;
  }
  return createOrUpdateNode(nodeMap, { id, children: [] });
}
function createOrUpdateNode(nodeMap, spanNode) {
  const existing = nodeMap.get(spanNode.id);
  if (existing?.span) {
    return existing;
  }
  if (existing && !existing.span) {
    existing.span = spanNode.span;
    existing.parentNode = spanNode.parentNode;
    return existing;
  }
  nodeMap.set(spanNode.id, spanNode);
  return spanNode;
}
var canonicalGrpcErrorCodesMap = {
  "1": "cancelled",
  "2": "unknown_error",
  "3": "invalid_argument",
  "4": "deadline_exceeded",
  "5": "not_found",
  "6": "already_exists",
  "7": "permission_denied",
  "8": "resource_exhausted",
  "9": "failed_precondition",
  "10": "aborted",
  "11": "out_of_range",
  "12": "unimplemented",
  "13": "internal_error",
  "14": "unavailable",
  "15": "data_loss",
  "16": "unauthenticated"
};
var isStatusErrorMessageValid = (message) => {
  return Object.values(canonicalGrpcErrorCodesMap).includes(message);
};
function mapStatus(span) {
  const attributes2 = spanHasAttributes(span) ? span.attributes : {};
  const status = spanHasStatus(span) ? span.status : void 0;
  if (status) {
    if (status.code === SpanStatusCode.OK) {
      return { code: SPAN_STATUS_OK };
    } else if (status.code === SpanStatusCode.ERROR) {
      if (typeof status.message === "undefined") {
        const inferredStatus2 = inferStatusFromAttributes(attributes2);
        if (inferredStatus2) {
          return inferredStatus2;
        }
      }
      if (status.message && isStatusErrorMessageValid(status.message)) {
        return { code: SPAN_STATUS_ERROR, message: status.message };
      } else {
        return { code: SPAN_STATUS_ERROR, message: "internal_error" };
      }
    }
  }
  const inferredStatus = inferStatusFromAttributes(attributes2);
  if (inferredStatus) {
    return inferredStatus;
  }
  if (status?.code === SpanStatusCode.UNSET) {
    return { code: SPAN_STATUS_OK };
  } else {
    return { code: SPAN_STATUS_ERROR, message: "unknown_error" };
  }
}
function inferStatusFromAttributes(attributes2) {
  const httpCodeAttribute = attributes2[ATTR_HTTP_RESPONSE_STATUS_CODE] || attributes2[SEMATTRS_HTTP_STATUS_CODE];
  const grpcCodeAttribute = attributes2[SEMATTRS_RPC_GRPC_STATUS_CODE];
  const numberHttpCode = typeof httpCodeAttribute === "number" ? httpCodeAttribute : typeof httpCodeAttribute === "string" ? parseInt(httpCodeAttribute) : void 0;
  if (typeof numberHttpCode === "number") {
    return getSpanStatusFromHttpCode(numberHttpCode);
  }
  if (typeof grpcCodeAttribute === "string") {
    return { code: SPAN_STATUS_ERROR, message: canonicalGrpcErrorCodesMap[grpcCodeAttribute] || "unknown_error" };
  }
  return void 0;
}
var MAX_SPAN_COUNT2 = 1e3;
var DEFAULT_TIMEOUT = 300;
var SentrySpanExporter = class {
  /*
   * A quick explanation on the buckets: We do bucketing of finished spans for efficiency. This span exporter is
   * accumulating spans until a root span is encountered and then it flushes all the spans that are descendants of that
   * root span. Because it is totally in the realm of possibilities that root spans are never finished, and we don't
   * want to accumulate spans indefinitely in memory, we need to periodically evacuate spans. Naively we could simply
   * store the spans in an array and each time a new span comes in we could iterate through the entire array and
   * evacuate all spans that have an end-timestamp that is older than our limit. This could get quite expensive because
   * we would have to iterate a potentially large number of spans every time we evacuate. We want to avoid these large
   * bursts of computation.
   *
   * Instead we go for a bucketing approach and put spans into buckets, based on what second
   * (modulo the time limit) the span was put into the exporter. With buckets, when we decide to evacuate, we can
   * iterate through the bucket entries instead, which have an upper bound of items, making the evacuation much more
   * efficient. Cleaning up also becomes much more efficient since it simply involves de-referencing a bucket within the
   * bucket array, and letting garbage collection take care of the rest.
   */
  // Essentially a a set of span ids that are already sent. The values are expiration
  // times in this cache so we don't hold onto them indefinitely.
  /* Internally, we use a debounced flush to give some wiggle room to the span processor to accumulate more spans. */
  constructor(options) {
    this._finishedSpanBucketSize = options?.timeout || DEFAULT_TIMEOUT;
    this._finishedSpanBuckets = new Array(this._finishedSpanBucketSize).fill(void 0);
    this._lastCleanupTimestampInS = Math.floor(safeDateNow() / 1e3);
    this._spansToBucketEntry = /* @__PURE__ */ new WeakMap();
    this._sentSpans = /* @__PURE__ */ new Map();
    this._debouncedFlush = debounce(this.flush.bind(this), 1, { maxWait: 100 });
  }
  /**
   * Export a single span.
   * This is called by the span processor whenever a span is ended.
   */
  export(span) {
    const currentTimestampInS = Math.floor(safeDateNow() / 1e3);
    if (this._lastCleanupTimestampInS !== currentTimestampInS) {
      let droppedSpanCount = 0;
      this._finishedSpanBuckets.forEach((bucket, i) => {
        if (bucket && bucket.timestampInS <= currentTimestampInS - this._finishedSpanBucketSize) {
          droppedSpanCount += bucket.spans.size;
          this._finishedSpanBuckets[i] = void 0;
        }
      });
      if (droppedSpanCount > 0) {
        DEBUG_BUILD3 && debug.log(
          `SpanExporter dropped ${droppedSpanCount} spans because they were pending for more than ${this._finishedSpanBucketSize} seconds.`
        );
      }
      this._lastCleanupTimestampInS = currentTimestampInS;
    }
    const currentBucketIndex = currentTimestampInS % this._finishedSpanBucketSize;
    const currentBucket = this._finishedSpanBuckets[currentBucketIndex] || {
      timestampInS: currentTimestampInS,
      spans: /* @__PURE__ */ new Set()
    };
    this._finishedSpanBuckets[currentBucketIndex] = currentBucket;
    currentBucket.spans.add(span);
    this._spansToBucketEntry.set(span, currentBucket);
    const localParentId = getLocalParentId(span);
    if (!localParentId || this._sentSpans.has(localParentId)) {
      this._debouncedFlush();
    }
  }
  /**
   * Try to flush any pending spans immediately.
   * This is called internally by the exporter (via _debouncedFlush),
   * but can also be triggered externally if we force-flush.
   */
  flush() {
    const finishedSpans = this._finishedSpanBuckets.flatMap((bucket) => bucket ? Array.from(bucket.spans) : []);
    this._flushSentSpanCache();
    const sentSpans = this._maybeSend(finishedSpans);
    const sentSpanCount = sentSpans.size;
    const remainingOpenSpanCount = finishedSpans.length - sentSpanCount;
    DEBUG_BUILD3 && debug.log(
      `SpanExporter exported ${sentSpanCount} spans, ${remainingOpenSpanCount} spans are waiting for their parent spans to finish`
    );
    const expirationDate = safeDateNow() + DEFAULT_TIMEOUT * 1e3;
    for (const span of sentSpans) {
      this._sentSpans.set(span.spanContext().spanId, expirationDate);
      const bucketEntry = this._spansToBucketEntry.get(span);
      if (bucketEntry) {
        bucketEntry.spans.delete(span);
      }
    }
    this._debouncedFlush.cancel();
  }
  /**
   * Clear the exporter.
   * This is called when the span processor is shut down.
   */
  clear() {
    this._finishedSpanBuckets = this._finishedSpanBuckets.fill(void 0);
    this._sentSpans.clear();
    this._debouncedFlush.cancel();
  }
  /**
   * Send the given spans, but only if they are part of a finished transaction.
   *
   * Returns the sent spans.
   * Spans remain unsent when their parent span is not yet finished.
   * This will happen regularly, as child spans are generally finished before their parents.
   * But it _could_ also happen because, for whatever reason, a parent span was lost.
   * In this case, we'll eventually need to clean this up.
   */
  _maybeSend(spans) {
    const grouped = groupSpansWithParents(spans);
    const sentSpans = /* @__PURE__ */ new Set();
    const rootNodes = this._getCompletedRootNodes(grouped);
    for (const root of rootNodes) {
      const span = root.span;
      sentSpans.add(span);
      const transactionEvent = createTransactionForOtelSpan(span);
      if (root.parentNode && this._sentSpans.has(root.parentNode.id)) {
        const traceData = transactionEvent.contexts?.trace?.data;
        if (traceData) {
          traceData["sentry.parent_span_already_sent"] = true;
        }
      }
      const spans2 = transactionEvent.spans || [];
      for (const child of root.children) {
        createAndFinishSpanForOtelSpan(child, spans2, sentSpans);
      }
      transactionEvent.spans = spans2.length > MAX_SPAN_COUNT2 ? spans2.sort((a, b) => a.start_timestamp - b.start_timestamp).slice(0, MAX_SPAN_COUNT2) : spans2;
      const measurements = timedEventsToMeasurements(span.events);
      if (measurements) {
        transactionEvent.measurements = measurements;
      }
      captureEvent(transactionEvent);
    }
    return sentSpans;
  }
  /** Remove "expired" span id entries from the _sentSpans cache. */
  _flushSentSpanCache() {
    const currentTimestamp = safeDateNow();
    for (const [spanId, expirationTime] of this._sentSpans.entries()) {
      if (expirationTime <= currentTimestamp) {
        this._sentSpans.delete(spanId);
      }
    }
  }
  /** Check if a node is a completed root node or a node whose parent has already been sent */
  _nodeIsCompletedRootNodeOrHasSentParent(node3) {
    return !!node3.span && (!node3.parentNode || this._sentSpans.has(node3.parentNode.id));
  }
  /** Get all completed root nodes from a list of nodes */
  _getCompletedRootNodes(nodes) {
    return nodes.filter((node3) => this._nodeIsCompletedRootNodeOrHasSentParent(node3));
  }
};
function parseSpan(span) {
  const attributes2 = span.attributes;
  const origin = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN];
  const op = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_OP];
  const source = attributes2[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
  return { origin, op, source };
}
function createTransactionForOtelSpan(span) {
  const { op, description, data, origin = "manual", source } = getSpanData(span);
  const capturedSpanScopes = getCapturedScopesOnSpan(span);
  const sampleRate = span.attributes[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE];
  const attributes2 = {
    [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source,
    [SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: sampleRate,
    [SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
    [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin,
    ...data,
    ...removeSentryAttributes(span.attributes)
  };
  const { links } = span;
  const { traceId: trace_id, spanId: span_id } = span.spanContext();
  const parent_span_id = getParentSpanId(span);
  const status = mapStatus(span);
  const traceContext = {
    parent_span_id,
    span_id,
    trace_id,
    data: attributes2,
    origin,
    op,
    status: getStatusMessage(status),
    // As per protocol, span status is allowed to be undefined
    links: convertSpanLinksForEnvelope(links)
  };
  const statusCode = attributes2[ATTR_HTTP_RESPONSE_STATUS_CODE];
  const responseContext = typeof statusCode === "number" ? { response: { status_code: statusCode } } : void 0;
  const transactionEvent = {
    contexts: {
      trace: traceContext,
      otel: {
        resource: span.resource.attributes
      },
      ...responseContext
    },
    spans: [],
    start_timestamp: spanTimeInputToSeconds(span.startTime),
    timestamp: spanTimeInputToSeconds(span.endTime),
    transaction: description,
    type: "transaction",
    sdkProcessingMetadata: {
      capturedSpanScope: capturedSpanScopes.scope,
      capturedSpanIsolationScope: capturedSpanScopes.isolationScope,
      sampleRate,
      dynamicSamplingContext: getDynamicSamplingContextFromSpan(span)
    },
    ...source && {
      transaction_info: {
        source
      }
    }
  };
  return transactionEvent;
}
function createAndFinishSpanForOtelSpan(node3, spans, sentSpans) {
  const span = node3.span;
  if (span) {
    sentSpans.add(span);
  }
  const shouldDrop = !span;
  if (shouldDrop) {
    node3.children.forEach((child) => {
      createAndFinishSpanForOtelSpan(child, spans, sentSpans);
    });
    return;
  }
  const span_id = span.spanContext().spanId;
  const trace_id = span.spanContext().traceId;
  const parentSpanId = getParentSpanId(span);
  const { attributes: attributes2, startTime, endTime, links } = span;
  const { op, description, data, origin = "manual" } = getSpanData(span);
  const allData = {
    [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin,
    [SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
    ...removeSentryAttributes(attributes2),
    ...data
  };
  const status = mapStatus(span);
  const spanJSON = {
    span_id,
    trace_id,
    data: allData,
    description,
    parent_span_id: parentSpanId,
    start_timestamp: spanTimeInputToSeconds(startTime),
    // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
    timestamp: spanTimeInputToSeconds(endTime) || void 0,
    status: getStatusMessage(status),
    // As per protocol, span status is allowed to be undefined
    op,
    origin,
    measurements: timedEventsToMeasurements(span.events),
    links: convertSpanLinksForEnvelope(links)
  };
  spans.push(spanJSON);
  node3.children.forEach((child) => {
    createAndFinishSpanForOtelSpan(child, spans, sentSpans);
  });
}
function getSpanData(span) {
  const { op: definedOp, source: definedSource, origin } = parseSpan(span);
  const { op: inferredOp, description, source: inferredSource, data: inferredData } = parseSpanDescription(span);
  const op = definedOp || inferredOp;
  const source = definedSource || inferredSource;
  const data = { ...inferredData, ...getData(span) };
  return {
    op,
    description,
    source,
    origin,
    data
  };
}
function removeSentryAttributes(data) {
  const cleanedData = { ...data };
  delete cleanedData[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE];
  delete cleanedData[SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE];
  delete cleanedData[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
  return cleanedData;
}
function getData(span) {
  const attributes2 = span.attributes;
  const data = {};
  if (span.kind !== SpanKind.INTERNAL) {
    data["otel.kind"] = SpanKind[span.kind];
  }
  const maybeHttpStatusCodeAttribute = attributes2[SEMATTRS_HTTP_STATUS_CODE];
  if (maybeHttpStatusCodeAttribute) {
    data[ATTR_HTTP_RESPONSE_STATUS_CODE] = maybeHttpStatusCodeAttribute;
  }
  const requestData = getRequestSpanData(span);
  if (requestData.url) {
    data.url = requestData.url;
  }
  if (requestData["http.query"]) {
    data["http.query"] = requestData["http.query"].slice(1);
  }
  if (requestData["http.fragment"]) {
    data["http.fragment"] = requestData["http.fragment"].slice(1);
  }
  return data;
}
function onSpanStart(span, parentContext) {
  const parentSpan = trace.getSpan(parentContext);
  let scopes = getScopesFromContext(parentContext);
  if (parentSpan && !parentSpan.spanContext().isRemote) {
    addChildSpanToSpan(parentSpan, span);
  }
  if (parentSpan?.spanContext().isRemote) {
    span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE, true);
  }
  if (parentContext === ROOT_CONTEXT) {
    scopes = {
      scope: getDefaultCurrentScope(),
      isolationScope: getDefaultIsolationScope()
    };
  }
  if (scopes) {
    setCapturedScopesOnSpan(span, scopes.scope, scopes.isolationScope);
  }
  logSpanStart(span);
  const client = getClient();
  client?.emit("spanStart", span);
}
function onSpanEnd(span) {
  logSpanEnd(span);
  const client = getClient();
  client?.emit("spanEnd", span);
}
var SentrySpanProcessor = class {
  constructor(options) {
    setIsSetup("SentrySpanProcessor");
    this._exporter = new SentrySpanExporter(options);
  }
  /**
   * @inheritDoc
   */
  async forceFlush() {
    this._exporter.flush();
  }
  /**
   * @inheritDoc
   */
  async shutdown() {
    this._exporter.clear();
  }
  /**
   * @inheritDoc
   */
  onStart(span, parentContext) {
    onSpanStart(span, parentContext);
  }
  /** @inheritDoc */
  onEnd(span) {
    onSpanEnd(span);
    this._exporter.export(span);
  }
};
var SentrySampler = class {
  constructor(client) {
    this._client = client;
    setIsSetup("SentrySampler");
  }
  /** @inheritDoc */
  shouldSample(context2, traceId, spanName, spanKind, spanAttributes, _links) {
    const options = this._client.getOptions();
    const parentSpan = getValidSpan(context2);
    const parentContext = parentSpan?.spanContext();
    if (!hasSpansEnabled(options)) {
      return wrapSamplingDecision({ decision: void 0, context: context2, spanAttributes });
    }
    const maybeSpanHttpMethod = spanAttributes[SEMATTRS_HTTP_METHOD] || spanAttributes[ATTR_HTTP_REQUEST_METHOD];
    if (spanKind === SpanKind.CLIENT && maybeSpanHttpMethod && (!parentSpan || parentContext?.isRemote)) {
      return wrapSamplingDecision({ decision: void 0, context: context2, spanAttributes });
    }
    const parentSampled = parentSpan ? getParentSampled(parentSpan, traceId, spanName) : void 0;
    const isRootSpan = !parentSpan || parentContext?.isRemote;
    if (!isRootSpan) {
      return wrapSamplingDecision({
        decision: parentSampled ? import_sdk_trace_base.SamplingDecision.RECORD_AND_SAMPLED : import_sdk_trace_base.SamplingDecision.NOT_RECORD,
        context: context2,
        spanAttributes
      });
    }
    const {
      description: inferredSpanName,
      data: inferredAttributes,
      op
    } = inferSpanData(spanName, spanAttributes, spanKind);
    const mergedAttributes = {
      ...inferredAttributes,
      ...spanAttributes
    };
    if (op) {
      mergedAttributes[SEMANTIC_ATTRIBUTE_SENTRY_OP] = op;
    }
    const mutableSamplingDecision = { decision: true };
    this._client.emit(
      "beforeSampling",
      {
        spanAttributes: mergedAttributes,
        spanName: inferredSpanName,
        parentSampled,
        parentContext
      },
      mutableSamplingDecision
    );
    if (!mutableSamplingDecision.decision) {
      return wrapSamplingDecision({ decision: void 0, context: context2, spanAttributes });
    }
    const { isolationScope } = getScopesFromContext(context2) ?? {};
    const dscString = parentContext?.traceState ? parentContext.traceState.get(SENTRY_TRACE_STATE_DSC) : void 0;
    const dsc = dscString ? baggageHeaderToDynamicSamplingContext(dscString) : void 0;
    const sampleRand = parseSampleRate(dsc?.sample_rand) ?? safeMathRandom();
    const [sampled, sampleRate, localSampleRateWasApplied] = sampleSpan(
      options,
      {
        name: inferredSpanName,
        attributes: mergedAttributes,
        normalizedRequest: isolationScope?.getScopeData().sdkProcessingMetadata.normalizedRequest,
        parentSampled,
        parentSampleRate: parseSampleRate(dsc?.sample_rate)
      },
      sampleRand
    );
    const method = `${maybeSpanHttpMethod}`.toUpperCase();
    if (method === "OPTIONS" || method === "HEAD") {
      DEBUG_BUILD3 && debug.log(`[Tracing] Not sampling span because HTTP method is '${method}' for ${spanName}`);
      return wrapSamplingDecision({
        decision: import_sdk_trace_base.SamplingDecision.NOT_RECORD,
        context: context2,
        spanAttributes,
        sampleRand,
        downstreamTraceSampleRate: 0
        // we don't want to sample anything in the downstream trace either
      });
    }
    if (!sampled && // We check for `parentSampled === undefined` because we only want to record client reports for spans that are trace roots (ie. when there was incoming trace)
    parentSampled === void 0) {
      DEBUG_BUILD3 && debug.log("[Tracing] Discarding root span because its trace was not chosen to be sampled.");
      this._client.recordDroppedEvent("sample_rate", "transaction");
    }
    return {
      ...wrapSamplingDecision({
        decision: sampled ? import_sdk_trace_base.SamplingDecision.RECORD_AND_SAMPLED : import_sdk_trace_base.SamplingDecision.NOT_RECORD,
        context: context2,
        spanAttributes,
        sampleRand,
        downstreamTraceSampleRate: localSampleRateWasApplied ? sampleRate : void 0
      }),
      attributes: {
        // We set the sample rate on the span when a local sample rate was applied to better understand how traces were sampled in Sentry
        [SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: localSampleRateWasApplied ? sampleRate : void 0
      }
    };
  }
  /** Returns the sampler name or short description with the configuration. */
  toString() {
    return "SentrySampler";
  }
};
function getParentSampled(parentSpan, traceId, spanName) {
  const parentContext = parentSpan.spanContext();
  if (isSpanContextValid(parentContext) && parentContext.traceId === traceId) {
    if (parentContext.isRemote) {
      const parentSampled2 = getSamplingDecision(parentSpan.spanContext());
      DEBUG_BUILD3 && debug.log(`[Tracing] Inheriting remote parent's sampled decision for ${spanName}: ${parentSampled2}`);
      return parentSampled2;
    }
    const parentSampled = getSamplingDecision(parentContext);
    DEBUG_BUILD3 && debug.log(`[Tracing] Inheriting parent's sampled decision for ${spanName}: ${parentSampled}`);
    return parentSampled;
  }
  return void 0;
}
function wrapSamplingDecision({
  decision,
  context: context2,
  spanAttributes,
  sampleRand,
  downstreamTraceSampleRate
}) {
  let traceState = getBaseTraceState(context2, spanAttributes);
  if (downstreamTraceSampleRate !== void 0) {
    traceState = traceState.set(SENTRY_TRACE_STATE_SAMPLE_RATE, `${downstreamTraceSampleRate}`);
  }
  if (sampleRand !== void 0) {
    traceState = traceState.set(SENTRY_TRACE_STATE_SAMPLE_RAND, `${sampleRand}`);
  }
  if (decision == void 0) {
    return { decision: import_sdk_trace_base.SamplingDecision.NOT_RECORD, traceState };
  }
  if (decision === import_sdk_trace_base.SamplingDecision.NOT_RECORD) {
    return { decision, traceState: traceState.set(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING, "1") };
  }
  return { decision, traceState };
}
function getBaseTraceState(context2, spanAttributes) {
  const parentSpan = trace.getSpan(context2);
  const parentContext = parentSpan?.spanContext();
  let traceState = parentContext?.traceState || new import_core4.TraceState();
  const url = spanAttributes[SEMATTRS_HTTP_URL] || spanAttributes[ATTR_URL_FULL];
  if (url && typeof url === "string") {
    traceState = traceState.set(SENTRY_TRACE_STATE_URL, url);
  }
  return traceState;
}
function getValidSpan(context2) {
  const span = trace.getSpan(context2);
  return span && isSpanContextValid(span.spanContext()) ? span : void 0;
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/utils/baggage.js
function mergeBaggageHeaders(existing, baggage) {
  if (!existing) {
    return baggage;
  }
  const existingBaggageEntries = parseBaggageHeader(existing);
  const newBaggageEntries = parseBaggageHeader(baggage);
  if (!newBaggageEntries) {
    return existing;
  }
  const mergedBaggageEntries = { ...existingBaggageEntries };
  Object.entries(newBaggageEntries).forEach(([key, value]) => {
    if (!mergedBaggageEntries[key]) {
      mergedBaggageEntries[key] = value;
    }
  });
  return objectToBaggageHeader(mergedBaggageEntries);
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/node-fetch/SentryNodeFetchInstrumentation.js
init_esm();
var import_core7 = __toESM(require_src4(), 1);
var import_instrumentation2 = __toESM(require_src3(), 1);
import * as diagch from "diagnostics_channel";

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/nodeVersion.js
var NODE_VERSION = parseSemver(process.versions.node);
var NODE_MAJOR = NODE_VERSION.major;
var NODE_MINOR = NODE_VERSION.minor;

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/node-fetch/SentryNodeFetchInstrumentation.js
var SENTRY_TRACE_HEADER2 = "sentry-trace";
var SENTRY_BAGGAGE_HEADER2 = "baggage";
var BAGGAGE_HEADER_REGEX = /baggage: (.*)\r\n/;
var SentryNodeFetchInstrumentation = class extends import_instrumentation2.InstrumentationBase {
  // Keep ref to avoid https://github.com/nodejs/node/issues/42170 bug and for
  // unsubscribing.
  constructor(config = {}) {
    super("@sentry/instrumentation-node-fetch", SDK_VERSION, config);
    this._channelSubs = [];
    this._propagationDecisionMap = new LRUMap(100);
    this._ignoreOutgoingRequestsMap = /* @__PURE__ */ new WeakMap();
  }
  /** No need to instrument files/modules. */
  init() {
    return void 0;
  }
  /** Disable the instrumentation. */
  disable() {
    super.disable();
    this._channelSubs.forEach((sub) => sub.unsubscribe());
    this._channelSubs = [];
  }
  /** Enable the instrumentation. */
  enable() {
    super.enable();
    this._channelSubs = this._channelSubs || [];
    if (this._channelSubs.length > 0) {
      return;
    }
    this._subscribeToChannel("undici:request:create", this._onRequestCreated.bind(this));
    this._subscribeToChannel("undici:request:headers", this._onResponseHeaders.bind(this));
  }
  /**
   * This method is called when a request is created.
   * You can still mutate the request here before it is sent.
   */
  // eslint-disable-next-line complexity
  _onRequestCreated({ request }) {
    const config = this.getConfig();
    const enabled = config.enabled !== false;
    if (!enabled) {
      return;
    }
    const shouldIgnore = this._shouldIgnoreOutgoingRequest(request);
    this._ignoreOutgoingRequestsMap.set(request, shouldIgnore);
    if (shouldIgnore) {
      return;
    }
    const url = getAbsoluteUrl(request.origin, request.path);
    const { tracePropagationTargets, propagateTraceparent } = getClient()?.getOptions() || {};
    const addedHeaders = shouldPropagateTraceForUrl(url, tracePropagationTargets, this._propagationDecisionMap) ? getTraceData({ propagateTraceparent }) : void 0;
    if (!addedHeaders) {
      return;
    }
    const { "sentry-trace": sentryTrace, baggage, traceparent } = addedHeaders;
    if (Array.isArray(request.headers)) {
      const requestHeaders = request.headers;
      if (sentryTrace && !requestHeaders.includes(SENTRY_TRACE_HEADER2)) {
        requestHeaders.push(SENTRY_TRACE_HEADER2, sentryTrace);
      }
      if (traceparent && !requestHeaders.includes("traceparent")) {
        requestHeaders.push("traceparent", traceparent);
      }
      const existingBaggagePos = requestHeaders.findIndex((header) => header === SENTRY_BAGGAGE_HEADER2);
      if (baggage && existingBaggagePos === -1) {
        requestHeaders.push(SENTRY_BAGGAGE_HEADER2, baggage);
      } else if (baggage) {
        const existingBaggage = requestHeaders[existingBaggagePos + 1];
        const merged = mergeBaggageHeaders(existingBaggage, baggage);
        if (merged) {
          requestHeaders[existingBaggagePos + 1] = merged;
        }
      }
    } else {
      const requestHeaders = request.headers;
      if (sentryTrace && !requestHeaders.includes(`${SENTRY_TRACE_HEADER2}:`)) {
        request.headers += `${SENTRY_TRACE_HEADER2}: ${sentryTrace}\r
`;
      }
      if (traceparent && !requestHeaders.includes("traceparent:")) {
        request.headers += `traceparent: ${traceparent}\r
`;
      }
      const existingBaggage = request.headers.match(BAGGAGE_HEADER_REGEX)?.[1];
      if (baggage && !existingBaggage) {
        request.headers += `${SENTRY_BAGGAGE_HEADER2}: ${baggage}\r
`;
      } else if (baggage) {
        const merged = mergeBaggageHeaders(existingBaggage, baggage);
        if (merged) {
          request.headers = request.headers.replace(BAGGAGE_HEADER_REGEX, `baggage: ${merged}\r
`);
        }
      }
    }
  }
  /**
   * This method is called when a response is received.
   */
  _onResponseHeaders({ request, response }) {
    const config = this.getConfig();
    const enabled = config.enabled !== false;
    if (!enabled) {
      return;
    }
    const _breadcrumbs = config.breadcrumbs;
    const breadCrumbsEnabled = typeof _breadcrumbs === "undefined" ? true : _breadcrumbs;
    const shouldIgnore = this._ignoreOutgoingRequestsMap.get(request);
    if (breadCrumbsEnabled && !shouldIgnore) {
      addRequestBreadcrumb(request, response);
    }
  }
  /** Subscribe to a diagnostics channel. */
  _subscribeToChannel(diagnosticChannel, onMessage) {
    const useNewSubscribe = NODE_MAJOR > 18 || NODE_MAJOR === 18 && NODE_MINOR >= 19;
    let unsubscribe2;
    if (useNewSubscribe) {
      diagch.subscribe?.(diagnosticChannel, onMessage);
      unsubscribe2 = () => diagch.unsubscribe?.(diagnosticChannel, onMessage);
    } else {
      const channel3 = diagch.channel(diagnosticChannel);
      channel3.subscribe(onMessage);
      unsubscribe2 = () => channel3.unsubscribe(onMessage);
    }
    this._channelSubs.push({
      name: diagnosticChannel,
      unsubscribe: unsubscribe2
    });
  }
  /**
   * Check if the given outgoing request should be ignored.
   */
  _shouldIgnoreOutgoingRequest(request) {
    if ((0, import_core7.isTracingSuppressed)(context.active())) {
      return true;
    }
    const url = getAbsoluteUrl(request.origin, request.path);
    const ignoreOutgoingRequests = this.getConfig().ignoreOutgoingRequests;
    if (typeof ignoreOutgoingRequests !== "function" || !url) {
      return false;
    }
    return ignoreOutgoingRequests(url);
  }
};
function addRequestBreadcrumb(request, response) {
  const data = getBreadcrumbData(request);
  const statusCode = response.statusCode;
  const level = getBreadcrumbLogLevelFromHttpStatusCode(statusCode);
  addBreadcrumb(
    {
      category: "http",
      data: {
        status_code: statusCode,
        ...data
      },
      type: "http",
      level
    },
    {
      event: "response",
      request,
      response
    }
  );
}
function getBreadcrumbData(request) {
  try {
    const url = getAbsoluteUrl(request.origin, request.path);
    const parsedUrl = parseUrl(url);
    const data = {
      url: getSanitizedUrlString(parsedUrl),
      "http.method": request.method || "GET"
    };
    if (parsedUrl.search) {
      data["http.query"] = parsedUrl.search;
    }
    if (parsedUrl.hash) {
      data["http.fragment"] = parsedUrl.hash;
    }
    return data;
  } catch {
    return {};
  }
}
function getAbsoluteUrl(origin, path2 = "/") {
  try {
    const url = new URL(path2, origin);
    return url.toString();
  } catch {
    const url = `${origin}`;
    if (url.endsWith("/") && path2.startsWith("/")) {
      return `${url}${path2.slice(1)}`;
    }
    if (!url.endsWith("/") && !path2.startsWith("/")) {
      return `${url}/${path2.slice(1)}`;
    }
    return `${url}${path2}`;
  }
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/context.js
import { execFile } from "node:child_process";
import { readFile, readdir } from "node:fs";
import * as os from "node:os";
import { join as join2 } from "node:path";
import { promisify } from "node:util";
var readFileAsync = promisify(readFile);
var readDirAsync = promisify(readdir);
var INTEGRATION_NAME5 = "Context";
var _nodeContextIntegration = ((options = {}) => {
  let cachedContext;
  const _options = {
    app: true,
    os: true,
    device: true,
    culture: true,
    cloudResource: true,
    ...options
  };
  async function addContext(event) {
    if (cachedContext === void 0) {
      cachedContext = _getContexts();
    }
    const updatedContext = _updateContext(await cachedContext);
    event.contexts = {
      ...event.contexts,
      app: { ...updatedContext.app, ...event.contexts?.app },
      os: { ...updatedContext.os, ...event.contexts?.os },
      device: { ...updatedContext.device, ...event.contexts?.device },
      culture: { ...updatedContext.culture, ...event.contexts?.culture },
      cloud_resource: { ...updatedContext.cloud_resource, ...event.contexts?.cloud_resource }
    };
    return event;
  }
  async function _getContexts() {
    const contexts = {};
    if (_options.os) {
      contexts.os = await getOsContext();
    }
    if (_options.app) {
      contexts.app = getAppContext();
    }
    if (_options.device) {
      contexts.device = getDeviceContext(_options.device);
    }
    if (_options.culture) {
      const culture = getCultureContext();
      if (culture) {
        contexts.culture = culture;
      }
    }
    if (_options.cloudResource) {
      contexts.cloud_resource = getCloudResourceContext();
    }
    return contexts;
  }
  return {
    name: INTEGRATION_NAME5,
    processEvent(event) {
      return addContext(event);
    }
  };
});
var nodeContextIntegration = defineIntegration(_nodeContextIntegration);
function _updateContext(contexts) {
  if (contexts.app?.app_memory) {
    contexts.app.app_memory = process.memoryUsage().rss;
  }
  if (contexts.app?.free_memory && typeof process.availableMemory === "function") {
    const freeMemory = process.availableMemory?.();
    if (freeMemory != null) {
      contexts.app.free_memory = freeMemory;
    }
  }
  if (contexts.device?.free_memory) {
    contexts.device.free_memory = os.freemem();
  }
  return contexts;
}
async function getOsContext() {
  const platformId = os.platform();
  switch (platformId) {
    case "darwin":
      return getDarwinInfo();
    case "linux":
      return getLinuxInfo();
    default:
      return {
        name: PLATFORM_NAMES[platformId] || platformId,
        version: os.release()
      };
  }
}
function getCultureContext() {
  try {
    if (typeof process.versions.icu !== "string") {
      return;
    }
    const january = /* @__PURE__ */ new Date(9e8);
    const spanish = new Intl.DateTimeFormat("es", { month: "long" });
    if (spanish.format(january) === "enero") {
      const options = Intl.DateTimeFormat().resolvedOptions();
      return {
        locale: options.locale,
        timezone: options.timeZone
      };
    }
  } catch {
  }
  return;
}
function getAppContext() {
  const app_memory = process.memoryUsage().rss;
  const app_start_time = new Date(Date.now() - process.uptime() * 1e3).toISOString();
  const appContext = { app_start_time, app_memory };
  if (typeof process.availableMemory === "function") {
    const freeMemory = process.availableMemory?.();
    if (freeMemory != null) {
      appContext.free_memory = freeMemory;
    }
  }
  return appContext;
}
function getDeviceContext(deviceOpt) {
  const device = {};
  let uptime2;
  try {
    uptime2 = os.uptime();
  } catch {
  }
  if (typeof uptime2 === "number") {
    device.boot_time = new Date(Date.now() - uptime2 * 1e3).toISOString();
  }
  device.arch = os.arch();
  if (deviceOpt === true || deviceOpt.memory) {
    device.memory_size = os.totalmem();
    device.free_memory = os.freemem();
  }
  if (deviceOpt === true || deviceOpt.cpu) {
    const cpuInfo = os.cpus();
    const firstCpu = cpuInfo?.[0];
    if (firstCpu) {
      device.processor_count = cpuInfo.length;
      device.cpu_description = firstCpu.model;
      device.processor_frequency = firstCpu.speed;
    }
  }
  return device;
}
var PLATFORM_NAMES = {
  aix: "IBM AIX",
  freebsd: "FreeBSD",
  openbsd: "OpenBSD",
  sunos: "SunOS",
  win32: "Windows",
  ohos: "OpenHarmony",
  android: "Android"
};
var LINUX_DISTROS = [
  { name: "fedora-release", distros: ["Fedora"] },
  { name: "redhat-release", distros: ["Red Hat Linux", "Centos"] },
  { name: "redhat_version", distros: ["Red Hat Linux"] },
  { name: "SuSE-release", distros: ["SUSE Linux"] },
  { name: "lsb-release", distros: ["Ubuntu Linux", "Arch Linux"] },
  { name: "debian_version", distros: ["Debian"] },
  { name: "debian_release", distros: ["Debian"] },
  { name: "arch-release", distros: ["Arch Linux"] },
  { name: "gentoo-release", distros: ["Gentoo Linux"] },
  { name: "novell-release", distros: ["SUSE Linux"] },
  { name: "alpine-release", distros: ["Alpine Linux"] }
];
var LINUX_VERSIONS = {
  alpine: (content) => content,
  arch: (content) => matchFirst(/distrib_release=(.*)/, content),
  centos: (content) => matchFirst(/release ([^ ]+)/, content),
  debian: (content) => content,
  fedora: (content) => matchFirst(/release (..)/, content),
  mint: (content) => matchFirst(/distrib_release=(.*)/, content),
  red: (content) => matchFirst(/release ([^ ]+)/, content),
  suse: (content) => matchFirst(/VERSION = (.*)\n/, content),
  ubuntu: (content) => matchFirst(/distrib_release=(.*)/, content)
};
function matchFirst(regex, text) {
  const match = regex.exec(text);
  return match ? match[1] : void 0;
}
async function getDarwinInfo() {
  const darwinInfo = {
    kernel_version: os.release(),
    name: "Mac OS X",
    version: `10.${Number(os.release().split(".")[0]) - 4}`
  };
  try {
    const output = await new Promise((resolve3, reject) => {
      execFile("/usr/bin/sw_vers", (error3, stdout) => {
        if (error3) {
          reject(error3);
          return;
        }
        resolve3(stdout);
      });
    });
    darwinInfo.name = matchFirst(/^ProductName:\s+(.*)$/m, output);
    darwinInfo.version = matchFirst(/^ProductVersion:\s+(.*)$/m, output);
    darwinInfo.build = matchFirst(/^BuildVersion:\s+(.*)$/m, output);
  } catch {
  }
  return darwinInfo;
}
function getLinuxDistroId(name) {
  return name.split(" ")[0].toLowerCase();
}
async function getLinuxInfo() {
  const linuxInfo = {
    kernel_version: os.release(),
    name: "Linux"
  };
  try {
    const etcFiles = await readDirAsync("/etc");
    const distroFile = LINUX_DISTROS.find((file) => etcFiles.includes(file.name));
    if (!distroFile) {
      return linuxInfo;
    }
    const distroPath = join2("/etc", distroFile.name);
    const contents = (await readFileAsync(distroPath, { encoding: "utf-8" })).toLowerCase();
    const { distros } = distroFile;
    linuxInfo.name = distros.find((d) => contents.indexOf(getLinuxDistroId(d)) >= 0) || distros[0];
    const id = getLinuxDistroId(linuxInfo.name);
    linuxInfo.version = LINUX_VERSIONS[id]?.(contents);
  } catch {
  }
  return linuxInfo;
}
function getCloudResourceContext() {
  if (process.env.VERCEL) {
    return {
      "cloud.provider": "vercel",
      "cloud.region": process.env.VERCEL_REGION
    };
  } else if (process.env.AWS_REGION) {
    return {
      "cloud.provider": "aws",
      "cloud.region": process.env.AWS_REGION,
      "cloud.platform": process.env.AWS_EXECUTION_ENV
    };
  } else if (process.env.GCP_PROJECT) {
    return {
      "cloud.provider": "gcp"
    };
  } else if (process.env.ALIYUN_REGION_ID) {
    return {
      "cloud.provider": "alibaba_cloud",
      "cloud.region": process.env.ALIYUN_REGION_ID
    };
  } else if (process.env.WEBSITE_SITE_NAME && process.env.REGION_NAME) {
    return {
      "cloud.provider": "azure",
      "cloud.region": process.env.REGION_NAME
    };
  } else if (process.env.IBM_CLOUD_REGION) {
    return {
      "cloud.provider": "ibm_cloud",
      "cloud.region": process.env.IBM_CLOUD_REGION
    };
  } else if (process.env.TENCENTCLOUD_REGION) {
    return {
      "cloud.provider": "tencent_cloud",
      "cloud.region": process.env.TENCENTCLOUD_REGION,
      "cloud.account.id": process.env.TENCENTCLOUD_APPID,
      "cloud.availability_zone": process.env.TENCENTCLOUD_ZONE
    };
  } else if (process.env.NETLIFY) {
    return {
      "cloud.provider": "netlify"
    };
  } else if (process.env.FLY_REGION) {
    return {
      "cloud.provider": "fly.io",
      "cloud.region": process.env.FLY_REGION
    };
  } else if (process.env.DYNO) {
    return {
      "cloud.provider": "heroku"
    };
  } else {
    return void 0;
  }
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/contextlines.js
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
var LRU_FILE_CONTENTS_CACHE = new LRUMap(10);
var LRU_FILE_CONTENTS_FS_READ_FAILED = new LRUMap(20);
var DEFAULT_LINES_OF_CONTEXT = 7;
var INTEGRATION_NAME6 = "ContextLines";
var MAX_CONTEXTLINES_COLNO = 1e3;
var MAX_CONTEXTLINES_LINENO = 1e4;
function emplace(map, key, contents) {
  const value = map.get(key);
  if (value === void 0) {
    map.set(key, contents);
    return contents;
  }
  return value;
}
function shouldSkipContextLinesForFile(path2) {
  if (path2.startsWith("node:")) return true;
  if (path2.endsWith(".min.js")) return true;
  if (path2.endsWith(".min.cjs")) return true;
  if (path2.endsWith(".min.mjs")) return true;
  if (path2.startsWith("data:")) return true;
  return false;
}
function shouldSkipContextLinesForFrame(frame) {
  if (frame.lineno !== void 0 && frame.lineno > MAX_CONTEXTLINES_LINENO) return true;
  if (frame.colno !== void 0 && frame.colno > MAX_CONTEXTLINES_COLNO) return true;
  return false;
}
function rangeExistsInContentCache(file, range) {
  const contents = LRU_FILE_CONTENTS_CACHE.get(file);
  if (contents === void 0) return false;
  for (let i = range[0]; i <= range[1]; i++) {
    if (contents[i] === void 0) {
      return false;
    }
  }
  return true;
}
function makeLineReaderRanges(lines, linecontext) {
  if (!lines.length) {
    return [];
  }
  let i = 0;
  const line = lines[0];
  if (typeof line !== "number") {
    return [];
  }
  let current = makeContextRange(line, linecontext);
  const out = [];
  while (true) {
    if (i === lines.length - 1) {
      out.push(current);
      break;
    }
    const next = lines[i + 1];
    if (typeof next !== "number") {
      break;
    }
    if (next <= current[1]) {
      current[1] = next + linecontext;
    } else {
      out.push(current);
      current = makeContextRange(next, linecontext);
    }
    i++;
  }
  return out;
}
function getContextLinesFromFile(path2, ranges, output) {
  return new Promise((resolve3, _reject) => {
    const stream = createReadStream(path2);
    const lineReaded = createInterface({
      input: stream
    });
    function destroyStreamAndResolve() {
      stream.destroy();
      resolve3();
    }
    let lineNumber = 0;
    let currentRangeIndex = 0;
    const range = ranges[currentRangeIndex];
    if (range === void 0) {
      destroyStreamAndResolve();
      return;
    }
    let rangeStart = range[0];
    let rangeEnd = range[1];
    function onStreamError(e) {
      LRU_FILE_CONTENTS_FS_READ_FAILED.set(path2, 1);
      DEBUG_BUILD2 && debug.error(`Failed to read file: ${path2}. Error: ${e}`);
      lineReaded.close();
      lineReaded.removeAllListeners();
      destroyStreamAndResolve();
    }
    stream.on("error", onStreamError);
    lineReaded.on("error", onStreamError);
    lineReaded.on("close", destroyStreamAndResolve);
    lineReaded.on("line", (line) => {
      lineNumber++;
      if (lineNumber < rangeStart) return;
      output[lineNumber] = snipLine(line, 0);
      if (lineNumber >= rangeEnd) {
        if (currentRangeIndex === ranges.length - 1) {
          lineReaded.close();
          lineReaded.removeAllListeners();
          return;
        }
        currentRangeIndex++;
        const range2 = ranges[currentRangeIndex];
        if (range2 === void 0) {
          lineReaded.close();
          lineReaded.removeAllListeners();
          return;
        }
        rangeStart = range2[0];
        rangeEnd = range2[1];
      }
    });
  });
}
async function addSourceContext(event, contextLines) {
  const filesToLines = {};
  if (contextLines > 0 && event.exception?.values) {
    for (const exception of event.exception.values) {
      if (!exception.stacktrace?.frames?.length) {
        continue;
      }
      for (let i = exception.stacktrace.frames.length - 1; i >= 0; i--) {
        const frame = exception.stacktrace.frames[i];
        const filename = frame?.filename;
        if (!frame || typeof filename !== "string" || typeof frame.lineno !== "number" || shouldSkipContextLinesForFile(filename) || shouldSkipContextLinesForFrame(frame)) {
          continue;
        }
        const filesToLinesOutput = filesToLines[filename];
        if (!filesToLinesOutput) filesToLines[filename] = [];
        filesToLines[filename].push(frame.lineno);
      }
    }
  }
  const files = Object.keys(filesToLines);
  if (files.length == 0) {
    return event;
  }
  const readlinePromises = [];
  for (const file of files) {
    if (LRU_FILE_CONTENTS_FS_READ_FAILED.get(file)) {
      continue;
    }
    const filesToLineRanges = filesToLines[file];
    if (!filesToLineRanges) {
      continue;
    }
    filesToLineRanges.sort((a, b) => a - b);
    const ranges = makeLineReaderRanges(filesToLineRanges, contextLines);
    if (ranges.every((r) => rangeExistsInContentCache(file, r))) {
      continue;
    }
    const cache = emplace(LRU_FILE_CONTENTS_CACHE, file, {});
    readlinePromises.push(getContextLinesFromFile(file, ranges, cache));
  }
  await Promise.all(readlinePromises).catch(() => {
    DEBUG_BUILD2 && debug.log("Failed to read one or more source files and resolve context lines");
  });
  if (contextLines > 0 && event.exception?.values) {
    for (const exception of event.exception.values) {
      if (exception.stacktrace?.frames && exception.stacktrace.frames.length > 0) {
        addSourceContextToFrames(exception.stacktrace.frames, contextLines, LRU_FILE_CONTENTS_CACHE);
      }
    }
  }
  return event;
}
function addSourceContextToFrames(frames, contextLines, cache) {
  for (const frame of frames) {
    if (frame.filename && frame.context_line === void 0 && typeof frame.lineno === "number") {
      const contents = cache.get(frame.filename);
      if (contents === void 0) {
        continue;
      }
      addContextToFrame2(frame.lineno, frame, contextLines, contents);
    }
  }
}
function clearLineContext(frame) {
  delete frame.pre_context;
  delete frame.context_line;
  delete frame.post_context;
}
function addContextToFrame2(lineno, frame, contextLines, contents) {
  if (frame.lineno === void 0 || contents === void 0) {
    DEBUG_BUILD2 && debug.error("Cannot resolve context for frame with no lineno or file contents");
    return;
  }
  frame.pre_context = [];
  for (let i = makeRangeStart(lineno, contextLines); i < lineno; i++) {
    const line = contents[i];
    if (line === void 0) {
      clearLineContext(frame);
      DEBUG_BUILD2 && debug.error(`Could not find line ${i} in file ${frame.filename}`);
      return;
    }
    frame.pre_context.push(line);
  }
  if (contents[lineno] === void 0) {
    clearLineContext(frame);
    DEBUG_BUILD2 && debug.error(`Could not find line ${lineno} in file ${frame.filename}`);
    return;
  }
  frame.context_line = contents[lineno];
  const end = makeRangeEnd(lineno, contextLines);
  frame.post_context = [];
  for (let i = lineno + 1; i <= end; i++) {
    const line = contents[i];
    if (line === void 0) {
      break;
    }
    frame.post_context.push(line);
  }
}
function makeRangeStart(line, linecontext) {
  return Math.max(1, line - linecontext);
}
function makeRangeEnd(line, linecontext) {
  return line + linecontext;
}
function makeContextRange(line, linecontext) {
  return [makeRangeStart(line, linecontext), makeRangeEnd(line, linecontext)];
}
var _contextLinesIntegration = ((options = {}) => {
  const contextLines = options.frameContextLines !== void 0 ? options.frameContextLines : DEFAULT_LINES_OF_CONTEXT;
  return {
    name: INTEGRATION_NAME6,
    processEvent(event) {
      return addSourceContext(event, contextLines);
    }
  };
});
var contextLinesIntegration = defineIntegration(_contextLinesIntegration);

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/local-variables/local-variables-async.js
import { Worker } from "node:worker_threads";

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/utils/debug.js
var cachedDebuggerEnabled;
async function isDebuggerEnabled() {
  if (cachedDebuggerEnabled === void 0) {
    try {
      const inspector = await import("node:inspector");
      cachedDebuggerEnabled = !!inspector.url();
    } catch {
      cachedDebuggerEnabled = false;
    }
  }
  return cachedDebuggerEnabled;
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/local-variables/common.js
var LOCAL_VARIABLES_KEY = "__SENTRY_ERROR_LOCAL_VARIABLES__";
function createRateLimiter(maxPerSecond, enable2, disable2) {
  let count = 0;
  let retrySeconds = 5;
  let disabledTimeout = 0;
  setInterval(() => {
    if (disabledTimeout === 0) {
      if (count > maxPerSecond) {
        retrySeconds *= 2;
        disable2(retrySeconds);
        if (retrySeconds > 86400) {
          retrySeconds = 86400;
        }
        disabledTimeout = retrySeconds;
      }
    } else {
      disabledTimeout -= 1;
      if (disabledTimeout === 0) {
        enable2();
      }
    }
    count = 0;
  }, 1e3).unref();
  return () => {
    count += 1;
  };
}
function isAnonymous(name) {
  return name !== void 0 && (name.length === 0 || name === "?" || name === "<anonymous>");
}
function functionNamesMatch(a, b) {
  return a === b || `Object.${a}` === b || a === `Object.${b}` || isAnonymous(a) && isAnonymous(b);
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/local-variables/local-variables-async.js
var base64WorkerScript = "LyohIEBzZW50cnkvbm9kZS1jb3JlIDEwLjM0LjAgKDlmNjM4OGUpIHwgaHR0cHM6Ly9naXRodWIuY29tL2dldHNlbnRyeS9zZW50cnktamF2YXNjcmlwdCAqLwppbXBvcnR7U2Vzc2lvbiBhcyBlfWZyb20ibm9kZTppbnNwZWN0b3IvcHJvbWlzZXMiO2ltcG9ydHt3b3JrZXJEYXRhIGFzIHR9ZnJvbSJub2RlOndvcmtlcl90aHJlYWRzIjtjb25zdCBuPWdsb2JhbFRoaXMsaT17fTtjb25zdCBvPSJfX1NFTlRSWV9FUlJPUl9MT0NBTF9WQVJJQUJMRVNfXyI7Y29uc3QgYT10O2Z1bmN0aW9uIHMoLi4uZSl7YS5kZWJ1ZyYmZnVuY3Rpb24oZSl7aWYoISgiY29uc29sZSJpbiBuKSlyZXR1cm4gZSgpO2NvbnN0IHQ9bi5jb25zb2xlLG89e30sYT1PYmplY3Qua2V5cyhpKTthLmZvckVhY2goZT0+e2NvbnN0IG49aVtlXTtvW2VdPXRbZV0sdFtlXT1ufSk7dHJ5e3JldHVybiBlKCl9ZmluYWxseXthLmZvckVhY2goZT0+e3RbZV09b1tlXX0pfX0oKCk9PmNvbnNvbGUubG9nKCJbTG9jYWxWYXJpYWJsZXMgV29ya2VyXSIsLi4uZSkpfWFzeW5jIGZ1bmN0aW9uIGMoZSx0LG4saSl7Y29uc3Qgbz1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuZ2V0UHJvcGVydGllcyIse29iamVjdElkOnQsb3duUHJvcGVydGllczohMH0pO2lbbl09by5yZXN1bHQuZmlsdGVyKGU9PiJsZW5ndGgiIT09ZS5uYW1lJiYhaXNOYU4ocGFyc2VJbnQoZS5uYW1lLDEwKSkpLnNvcnQoKGUsdCk9PnBhcnNlSW50KGUubmFtZSwxMCktcGFyc2VJbnQodC5uYW1lLDEwKSkubWFwKGU9PmUudmFsdWU/LnZhbHVlKX1hc3luYyBmdW5jdGlvbiByKGUsdCxuLGkpe2NvbnN0IG89YXdhaXQgZS5wb3N0KCJSdW50aW1lLmdldFByb3BlcnRpZXMiLHtvYmplY3RJZDp0LG93blByb3BlcnRpZXM6ITB9KTtpW25dPW8ucmVzdWx0Lm1hcChlPT5bZS5uYW1lLGUudmFsdWU/LnZhbHVlXSkucmVkdWNlKChlLFt0LG5dKT0+KGVbdF09bixlKSx7fSl9ZnVuY3Rpb24gdShlLHQpe2UudmFsdWUmJigidmFsdWUiaW4gZS52YWx1ZT92b2lkIDA9PT1lLnZhbHVlLnZhbHVlfHxudWxsPT09ZS52YWx1ZS52YWx1ZT90W2UubmFtZV09YDwke2UudmFsdWUudmFsdWV9PmA6dFtlLm5hbWVdPWUudmFsdWUudmFsdWU6ImRlc2NyaXB0aW9uImluIGUudmFsdWUmJiJmdW5jdGlvbiIhPT1lLnZhbHVlLnR5cGU/dFtlLm5hbWVdPWA8JHtlLnZhbHVlLmRlc2NyaXB0aW9ufT5gOiJ1bmRlZmluZWQiPT09ZS52YWx1ZS50eXBlJiYodFtlLm5hbWVdPSI8dW5kZWZpbmVkPiIpKX1hc3luYyBmdW5jdGlvbiBsKGUsdCl7Y29uc3Qgbj1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuZ2V0UHJvcGVydGllcyIse29iamVjdElkOnQsb3duUHJvcGVydGllczohMH0pLGk9e307Zm9yKGNvbnN0IHQgb2Ygbi5yZXN1bHQpaWYodC52YWx1ZT8ub2JqZWN0SWQmJiJBcnJheSI9PT10LnZhbHVlLmNsYXNzTmFtZSl7Y29uc3Qgbj10LnZhbHVlLm9iamVjdElkO2F3YWl0IGMoZSxuLHQubmFtZSxpKX1lbHNlIGlmKHQudmFsdWU/Lm9iamVjdElkJiYiT2JqZWN0Ij09PXQudmFsdWUuY2xhc3NOYW1lKXtjb25zdCBuPXQudmFsdWUub2JqZWN0SWQ7YXdhaXQgcihlLG4sdC5uYW1lLGkpfWVsc2UgdC52YWx1ZSYmdSh0LGkpO3JldHVybiBpfWxldCBmOyhhc3luYyBmdW5jdGlvbigpe2NvbnN0IHQ9bmV3IGU7dC5jb25uZWN0VG9NYWluVGhyZWFkKCkscygiQ29ubmVjdGVkIHRvIG1haW4gdGhyZWFkIik7bGV0IG49ITE7dC5vbigiRGVidWdnZXIucmVzdW1lZCIsKCk9PntuPSExfSksdC5vbigiRGVidWdnZXIucGF1c2VkIixlPT57bj0hMCxhc3luYyBmdW5jdGlvbihlLHtyZWFzb246dCxkYXRhOntvYmplY3RJZDpufSxjYWxsRnJhbWVzOml9KXtpZigiZXhjZXB0aW9uIiE9PXQmJiJwcm9taXNlUmVqZWN0aW9uIiE9PXQpcmV0dXJuO2lmKGY/LigpLG51bGw9PW4pcmV0dXJuO2NvbnN0IGE9W107Zm9yKGxldCB0PTA7dDxpLmxlbmd0aDt0Kyspe2NvbnN0e3Njb3BlQ2hhaW46bixmdW5jdGlvbk5hbWU6byx0aGlzOnN9PWlbdF0sYz1uLmZpbmQoZT0+ImxvY2FsIj09PWUudHlwZSkscj0iZ2xvYmFsIiE9PXMuY2xhc3NOYW1lJiZzLmNsYXNzTmFtZT9gJHtzLmNsYXNzTmFtZX0uJHtvfWA6bztpZih2b2lkIDA9PT1jPy5vYmplY3Qub2JqZWN0SWQpYVt0XT17ZnVuY3Rpb246cn07ZWxzZXtjb25zdCBuPWF3YWl0IGwoZSxjLm9iamVjdC5vYmplY3RJZCk7YVt0XT17ZnVuY3Rpb246cix2YXJzOm59fX1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuY2FsbEZ1bmN0aW9uT24iLHtmdW5jdGlvbkRlY2xhcmF0aW9uOmBmdW5jdGlvbigpIHsgdGhpcy4ke299ID0gdGhpcy4ke299IHx8ICR7SlNPTi5zdHJpbmdpZnkoYSl9OyB9YCxzaWxlbnQ6ITAsb2JqZWN0SWQ6bn0pLGF3YWl0IGUucG9zdCgiUnVudGltZS5yZWxlYXNlT2JqZWN0Iix7b2JqZWN0SWQ6bn0pfSh0LGUucGFyYW1zKS50aGVuKGFzeW5jKCk9PntuJiZhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnJlc3VtZSIpfSxhc3luYyBlPT57biYmYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5yZXN1bWUiKX0pfSksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5lbmFibGUiKTtjb25zdCBpPSExIT09YS5jYXB0dXJlQWxsRXhjZXB0aW9ucztpZihhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnNldFBhdXNlT25FeGNlcHRpb25zIix7c3RhdGU6aT8iYWxsIjoidW5jYXVnaHQifSksaSl7Y29uc3QgZT1hLm1heEV4Y2VwdGlvbnNQZXJTZWNvbmR8fDUwO2Y9ZnVuY3Rpb24oZSx0LG4pe2xldCBpPTAsbz01LGE9MDtyZXR1cm4gc2V0SW50ZXJ2YWwoKCk9PnswPT09YT9pPmUmJihvKj0yLG4obyksbz44NjQwMCYmKG89ODY0MDApLGE9byk6KGEtPTEsMD09PWEmJnQoKSksaT0wfSwxZTMpLnVucmVmKCksKCk9PntpKz0xfX0oZSxhc3luYygpPT57cygiUmF0ZS1saW1pdCBsaWZ0ZWQuIiksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5zZXRQYXVzZU9uRXhjZXB0aW9ucyIse3N0YXRlOiJhbGwifSl9LGFzeW5jIGU9PntzKGBSYXRlLWxpbWl0IGV4Y2VlZGVkLiBEaXNhYmxpbmcgY2FwdHVyaW5nIG9mIGNhdWdodCBleGNlcHRpb25zIGZvciAke2V9IHNlY29uZHMuYCksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5zZXRQYXVzZU9uRXhjZXB0aW9ucyIse3N0YXRlOiJ1bmNhdWdodCJ9KX0pfX0pKCkuY2F0Y2goZT0+e3MoIkZhaWxlZCB0byBzdGFydCBkZWJ1Z2dlciIsZSl9KSxzZXRJbnRlcnZhbCgoKT0+e30sMWU0KTs=";
function log2(...args) {
  debug.log("[LocalVariables]", ...args);
}
var localVariablesAsyncIntegration = defineIntegration(((integrationOptions = {}) => {
  function addLocalVariablesToException(exception, localVariables) {
    const frames = (exception.stacktrace?.frames || []).filter((frame) => frame.function !== "new Promise");
    for (let i = 0; i < frames.length; i++) {
      const frameIndex = frames.length - i - 1;
      const frameLocalVariables = localVariables[i];
      const frame = frames[frameIndex];
      if (!frame || !frameLocalVariables) {
        break;
      }
      if (
        // We need to have vars to add
        frameLocalVariables.vars === void 0 || // Only skip out-of-app frames if includeOutOfAppFrames is not true
        frame.in_app === false && integrationOptions.includeOutOfAppFrames !== true || // The function names need to match
        !functionNamesMatch(frame.function, frameLocalVariables.function)
      ) {
        continue;
      }
      frame.vars = frameLocalVariables.vars;
    }
  }
  function addLocalVariablesToEvent(event, hint) {
    if (hint.originalException && typeof hint.originalException === "object" && LOCAL_VARIABLES_KEY in hint.originalException && Array.isArray(hint.originalException[LOCAL_VARIABLES_KEY])) {
      for (const exception of event.exception?.values || []) {
        addLocalVariablesToException(exception, hint.originalException[LOCAL_VARIABLES_KEY]);
      }
      hint.originalException[LOCAL_VARIABLES_KEY] = void 0;
    }
    return event;
  }
  async function startInspector() {
    const inspector = await import("node:inspector");
    if (!inspector.url()) {
      inspector.open(0);
    }
  }
  function startWorker(options) {
    const worker = new Worker(new URL(`data:application/javascript;base64,${base64WorkerScript}`), {
      workerData: options,
      // We don't want any Node args to be passed to the worker
      execArgv: [],
      env: { ...process.env, NODE_OPTIONS: void 0 }
    });
    process.on("exit", () => {
      worker.terminate();
    });
    worker.once("error", (err) => {
      log2("Worker error", err);
    });
    worker.once("exit", (code) => {
      log2("Worker exit", code);
    });
    worker.unref();
  }
  return {
    name: "LocalVariablesAsync",
    async setup(client) {
      const clientOptions = client.getOptions();
      if (!clientOptions.includeLocalVariables) {
        return;
      }
      if (await isDebuggerEnabled()) {
        debug.warn("Local variables capture has been disabled because the debugger was already enabled");
        return;
      }
      const options = {
        ...integrationOptions,
        debug: debug.isEnabled()
      };
      startInspector().then(
        () => {
          try {
            startWorker(options);
          } catch (e) {
            debug.error("Failed to start worker", e);
          }
        },
        (e) => {
          debug.error("Failed to start inspector", e);
        }
      );
    },
    processEvent(event, hint) {
      return addLocalVariablesToEvent(event, hint);
    }
  };
}));

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/local-variables/local-variables-sync.js
function hashFrames(frames) {
  if (frames === void 0) {
    return;
  }
  return frames.slice(-10).reduce((acc, frame) => `${acc},${frame.function},${frame.lineno},${frame.colno}`, "");
}
function hashFromStack(stackParser, stack) {
  if (stack === void 0) {
    return void 0;
  }
  return hashFrames(stackParser(stack, 1));
}
function createCallbackList(complete) {
  let callbacks = [];
  let completedCalled = false;
  function checkedComplete(result) {
    callbacks = [];
    if (completedCalled) {
      return;
    }
    completedCalled = true;
    complete(result);
  }
  callbacks.push(checkedComplete);
  function add(fn) {
    callbacks.push(fn);
  }
  function next(result) {
    const popped = callbacks.pop() || checkedComplete;
    try {
      popped(result);
    } catch {
      checkedComplete(result);
    }
  }
  return { add, next };
}
var AsyncSession = class _AsyncSession {
  /** Throws if inspector API is not available */
  constructor(_session) {
    this._session = _session;
  }
  static async create(orDefault) {
    if (orDefault) {
      return orDefault;
    }
    const inspector = await import("node:inspector");
    return new _AsyncSession(new inspector.Session());
  }
  /** @inheritdoc */
  configureAndConnect(onPause, captureAll) {
    this._session.connect();
    this._session.on("Debugger.paused", (event) => {
      onPause(event, () => {
        this._session.post("Debugger.resume");
      });
    });
    this._session.post("Debugger.enable");
    this._session.post("Debugger.setPauseOnExceptions", { state: captureAll ? "all" : "uncaught" });
  }
  setPauseOnExceptions(captureAll) {
    this._session.post("Debugger.setPauseOnExceptions", { state: captureAll ? "all" : "uncaught" });
  }
  /** @inheritdoc */
  getLocalVariables(objectId, complete) {
    this._getProperties(objectId, (props) => {
      const { add, next } = createCallbackList(complete);
      for (const prop of props) {
        if (prop.value?.objectId && prop.value.className === "Array") {
          const id = prop.value.objectId;
          add((vars) => this._unrollArray(id, prop.name, vars, next));
        } else if (prop.value?.objectId && prop.value.className === "Object") {
          const id = prop.value.objectId;
          add((vars) => this._unrollObject(id, prop.name, vars, next));
        } else if (prop.value) {
          add((vars) => this._unrollOther(prop, vars, next));
        }
      }
      next({});
    });
  }
  /**
   * Gets all the PropertyDescriptors of an object
   */
  _getProperties(objectId, next) {
    this._session.post(
      "Runtime.getProperties",
      {
        objectId,
        ownProperties: true
      },
      (err, params) => {
        if (err) {
          next([]);
        } else {
          next(params.result);
        }
      }
    );
  }
  /**
   * Unrolls an array property
   */
  _unrollArray(objectId, name, vars, next) {
    this._getProperties(objectId, (props) => {
      vars[name] = props.filter((v) => v.name !== "length" && !isNaN(parseInt(v.name, 10))).sort((a, b) => parseInt(a.name, 10) - parseInt(b.name, 10)).map((v) => v.value?.value);
      next(vars);
    });
  }
  /**
   * Unrolls an object property
   */
  _unrollObject(objectId, name, vars, next) {
    this._getProperties(objectId, (props) => {
      vars[name] = props.map((v) => [v.name, v.value?.value]).reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
      }, {});
      next(vars);
    });
  }
  /**
   * Unrolls other properties
   */
  _unrollOther(prop, vars, next) {
    if (prop.value) {
      if ("value" in prop.value) {
        if (prop.value.value === void 0 || prop.value.value === null) {
          vars[prop.name] = `<${prop.value.value}>`;
        } else {
          vars[prop.name] = prop.value.value;
        }
      } else if ("description" in prop.value && prop.value.type !== "function") {
        vars[prop.name] = `<${prop.value.description}>`;
      } else if (prop.value.type === "undefined") {
        vars[prop.name] = "<undefined>";
      }
    }
    next(vars);
  }
};
var INTEGRATION_NAME7 = "LocalVariables";
var _localVariablesSyncIntegration = ((options = {}, sessionOverride) => {
  const cachedFrames = new LRUMap(20);
  let rateLimiter;
  let shouldProcessEvent = false;
  function addLocalVariablesToException(exception) {
    const hash = hashFrames(exception.stacktrace?.frames);
    if (hash === void 0) {
      return;
    }
    const cachedFrame = cachedFrames.remove(hash);
    if (cachedFrame === void 0) {
      return;
    }
    const frames = (exception.stacktrace?.frames || []).filter((frame) => frame.function !== "new Promise");
    for (let i = 0; i < frames.length; i++) {
      const frameIndex = frames.length - i - 1;
      const cachedFrameVariable = cachedFrame[i];
      const frameVariable = frames[frameIndex];
      if (!frameVariable || !cachedFrameVariable) {
        break;
      }
      if (
        // We need to have vars to add
        cachedFrameVariable.vars === void 0 || // Only skip out-of-app frames if includeOutOfAppFrames is not true
        frameVariable.in_app === false && options.includeOutOfAppFrames !== true || // The function names need to match
        !functionNamesMatch(frameVariable.function, cachedFrameVariable.function)
      ) {
        continue;
      }
      frameVariable.vars = cachedFrameVariable.vars;
    }
  }
  function addLocalVariablesToEvent(event) {
    for (const exception of event.exception?.values || []) {
      addLocalVariablesToException(exception);
    }
    return event;
  }
  let setupPromise;
  async function setup() {
    const client = getClient();
    const clientOptions = client?.getOptions();
    if (!clientOptions?.includeLocalVariables) {
      return;
    }
    const unsupportedNodeVersion = NODE_MAJOR < 18;
    if (unsupportedNodeVersion) {
      debug.log("The `LocalVariables` integration is only supported on Node >= v18.");
      return;
    }
    if (await isDebuggerEnabled()) {
      debug.warn("Local variables capture has been disabled because the debugger was already enabled");
      return;
    }
    try {
      const session2 = await AsyncSession.create(sessionOverride);
      const handlePaused = (stackParser, { params: { reason, data, callFrames } }, complete) => {
        if (reason !== "exception" && reason !== "promiseRejection") {
          complete();
          return;
        }
        rateLimiter?.();
        const exceptionHash = hashFromStack(stackParser, data.description);
        if (exceptionHash == void 0) {
          complete();
          return;
        }
        const { add, next } = createCallbackList((frames) => {
          cachedFrames.set(exceptionHash, frames);
          complete();
        });
        for (let i = 0; i < Math.min(callFrames.length, 5); i++) {
          const { scopeChain, functionName, this: obj } = callFrames[i];
          const localScope = scopeChain.find((scope) => scope.type === "local");
          const fn = obj.className === "global" || !obj.className ? functionName : `${obj.className}.${functionName}`;
          if (localScope?.object.objectId === void 0) {
            add((frames) => {
              frames[i] = { function: fn };
              next(frames);
            });
          } else {
            const id = localScope.object.objectId;
            add(
              (frames) => session2.getLocalVariables(id, (vars) => {
                frames[i] = { function: fn, vars };
                next(frames);
              })
            );
          }
        }
        next([]);
      };
      const captureAll = options.captureAllExceptions !== false;
      session2.configureAndConnect(
        (ev, complete) => handlePaused(clientOptions.stackParser, ev, complete),
        captureAll
      );
      if (captureAll) {
        const max = options.maxExceptionsPerSecond || 50;
        rateLimiter = createRateLimiter(
          max,
          () => {
            debug.log("Local variables rate-limit lifted.");
            session2.setPauseOnExceptions(true);
          },
          (seconds) => {
            debug.log(
              `Local variables rate-limit exceeded. Disabling capturing of caught exceptions for ${seconds} seconds.`
            );
            session2.setPauseOnExceptions(false);
          }
        );
      }
      shouldProcessEvent = true;
    } catch (error3) {
      debug.log("The `LocalVariables` integration failed to start.", error3);
    }
  }
  return {
    name: INTEGRATION_NAME7,
    setupOnce() {
      setupPromise = setup();
    },
    async processEvent(event) {
      await setupPromise;
      if (shouldProcessEvent) {
        return addLocalVariablesToEvent(event);
      }
      return event;
    },
    // These are entirely for testing
    _getCachedFramesCount() {
      return cachedFrames.size;
    },
    _getFirstCachedFrame() {
      return cachedFrames.values()[0];
    }
  };
});
var localVariablesSyncIntegration = defineIntegration(_localVariablesSyncIntegration);

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/local-variables/index.js
var localVariablesIntegration = (options = {}) => {
  return NODE_VERSION.major < 19 ? localVariablesSyncIntegration(options) : localVariablesAsyncIntegration(options);
};

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/utils/errorhandling.js
var DEFAULT_SHUTDOWN_TIMEOUT = 2e3;
function logAndExitProcess(error3) {
  consoleSandbox(() => {
    console.error(error3);
  });
  const client = getClient();
  if (client === void 0) {
    DEBUG_BUILD2 && debug.warn("No NodeClient was defined, we are exiting the process now.");
    global.process.exit(1);
    return;
  }
  const options = client.getOptions();
  const timeout = options?.shutdownTimeout && options.shutdownTimeout > 0 ? options.shutdownTimeout : DEFAULT_SHUTDOWN_TIMEOUT;
  client.close(timeout).then(
    (result) => {
      if (!result) {
        DEBUG_BUILD2 && debug.warn("We reached the timeout for emptying the request buffer, still exiting now!");
      }
      global.process.exit(1);
    },
    (error4) => {
      DEBUG_BUILD2 && debug.error(error4);
    }
  );
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/onunhandledrejection.js
var INTEGRATION_NAME8 = "OnUnhandledRejection";
var DEFAULT_IGNORES = [
  {
    name: "AI_NoOutputGeneratedError"
    // When stream aborts in Vercel AI SDK, Vercel flush() fails with an error
  }
];
var _onUnhandledRejectionIntegration = ((options = {}) => {
  const opts = {
    mode: options.mode ?? "warn",
    ignore: [...DEFAULT_IGNORES, ...options.ignore ?? []]
  };
  return {
    name: INTEGRATION_NAME8,
    setup(client) {
      global.process.on("unhandledRejection", makeUnhandledPromiseHandler(client, opts));
    }
  };
});
var onUnhandledRejectionIntegration = defineIntegration(_onUnhandledRejectionIntegration);
function extractErrorInfo(reason) {
  if (typeof reason !== "object" || reason === null) {
    return { name: "", message: String(reason ?? "") };
  }
  const errorLike = reason;
  const name = typeof errorLike.name === "string" ? errorLike.name : "";
  const message = typeof errorLike.message === "string" ? errorLike.message : String(reason);
  return { name, message };
}
function isMatchingReason(matcher, errorInfo) {
  const nameMatches = matcher.name === void 0 || isMatchingPattern(errorInfo.name, matcher.name, true);
  const messageMatches = matcher.message === void 0 || isMatchingPattern(errorInfo.message, matcher.message);
  return nameMatches && messageMatches;
}
function matchesIgnore(list, reason) {
  const errorInfo = extractErrorInfo(reason);
  return list.some((matcher) => isMatchingReason(matcher, errorInfo));
}
function makeUnhandledPromiseHandler(client, options) {
  return function sendUnhandledPromise(reason, promise) {
    if (getClient() !== client) {
      return;
    }
    if (matchesIgnore(options.ignore ?? [], reason)) {
      return;
    }
    const level = options.mode === "strict" ? "fatal" : "error";
    const activeSpanForError = reason && typeof reason === "object" ? reason._sentry_active_span : void 0;
    const activeSpanWrapper = activeSpanForError ? (fn) => withActiveSpan(activeSpanForError, fn) : (fn) => fn();
    activeSpanWrapper(() => {
      captureException(reason, {
        originalException: promise,
        captureContext: {
          extra: { unhandledPromiseRejection: true },
          level
        },
        mechanism: {
          handled: false,
          type: "auto.node.onunhandledrejection"
        }
      });
    });
    handleRejection(reason, options.mode);
  };
}
function handleRejection(reason, mode) {
  const rejectionWarning = "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason:";
  if (mode === "warn") {
    consoleSandbox(() => {
      console.warn(rejectionWarning);
      console.error(reason && typeof reason === "object" && "stack" in reason ? reason.stack : reason);
    });
  } else if (mode === "strict") {
    consoleSandbox(() => {
      console.warn(rejectionWarning);
    });
    logAndExitProcess(reason);
  }
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/integrations/childProcess.js
import * as diagnosticsChannel from "node:diagnostics_channel";
var INTEGRATION_NAME9 = "ChildProcess";
var childProcessIntegration = defineIntegration((options = {}) => {
  return {
    name: INTEGRATION_NAME9,
    setup() {
      diagnosticsChannel.channel("child_process").subscribe((event) => {
        if (event && typeof event === "object" && "process" in event) {
          captureChildProcessEvents(event.process, options);
        }
      });
      diagnosticsChannel.channel("worker_threads").subscribe((event) => {
        if (event && typeof event === "object" && "worker" in event) {
          captureWorkerThreadEvents(event.worker, options);
        }
      });
    }
  };
});
function captureChildProcessEvents(child, options) {
  let hasExited = false;
  let data;
  child.on("spawn", () => {
    if (child.spawnfile === "/usr/bin/sw_vers") {
      hasExited = true;
      return;
    }
    data = { spawnfile: child.spawnfile };
    if (options.includeChildProcessArgs) {
      data.spawnargs = child.spawnargs;
    }
  }).on("exit", (code) => {
    if (!hasExited) {
      hasExited = true;
      if (code !== null && code !== 0) {
        addBreadcrumb({
          category: "child_process",
          message: `Child process exited with code '${code}'`,
          level: code === 0 ? "info" : "warning",
          data
        });
      }
    }
  }).on("error", (error3) => {
    if (!hasExited) {
      hasExited = true;
      addBreadcrumb({
        category: "child_process",
        message: `Child process errored with '${error3.message}'`,
        level: "error",
        data
      });
    }
  });
}
function captureWorkerThreadEvents(worker, options) {
  let threadId2;
  worker.on("online", () => {
    threadId2 = worker.threadId;
  }).on("error", (error3) => {
    if (options.captureWorkerErrors !== false) {
      captureException(error3, {
        mechanism: { type: "auto.child_process.worker_thread", handled: false, data: { threadId: String(threadId2) } }
      });
    } else {
      addBreadcrumb({
        category: "worker_thread",
        message: `Worker thread errored with '${error3.message}'`,
        level: "error",
        data: { threadId: threadId2 }
      });
    }
  });
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/otel/contextManager.js
var import_context_async_hooks = __toESM(require_src7(), 1);
var SentryContextManager = wrapContextManagerClass(import_context_async_hooks.AsyncLocalStorageContextManager);

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/otel/logger.js
init_esm();
function setupOpenTelemetryLogger() {
  diag2.disable();
  diag2.setLogger(
    {
      error: debug.error,
      warn: debug.warn,
      info: debug.log,
      debug: debug.log,
      verbose: debug.log
    },
    DiagLogLevel.DEBUG
  );
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/utils/module.js
import { posix, sep } from "node:path";
function normalizeWindowsPath(path2) {
  return path2.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
}
function createGetModuleFromFilename(basePath = process.argv[1] ? dirname(process.argv[1]) : process.cwd(), isWindows = sep === "\\") {
  const normalizedBase = isWindows ? normalizeWindowsPath(basePath) : basePath;
  return (filename) => {
    if (!filename) {
      return;
    }
    const normalizedFilename = isWindows ? normalizeWindowsPath(filename) : filename;
    let { dir, base: file, ext } = posix.parse(normalizedFilename);
    if (ext === ".js" || ext === ".mjs" || ext === ".cjs") {
      file = file.slice(0, ext.length * -1);
    }
    const decodedFile = decodeURIComponent(file);
    if (!dir) {
      dir = ".";
    }
    const n = dir.lastIndexOf("/node_modules");
    if (n > -1) {
      return `${dir.slice(n + 14).replace(/\//g, ".")}:${decodedFile}`;
    }
    if (dir.startsWith(normalizedBase)) {
      const moduleName = dir.slice(normalizedBase.length + 1).replace(/\//g, ".");
      return moduleName ? `${moduleName}:${decodedFile}` : decodedFile;
    }
    return decodedFile;
  };
}

// node_modules/.pnpm/@sentry+node-core@10.34.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_d2df3f95715cc521a292b1dd5423767d/node_modules/@sentry/node-core/build/esm/sdk/client.js
init_esm();
var import_instrumentation3 = __toESM(require_src3(), 1);
import * as os2 from "node:os";
import { threadId, isMainThread } from "worker_threads";
var DEFAULT_CLIENT_REPORT_FLUSH_INTERVAL_MS = 6e4;
var NodeClient = class extends ServerRuntimeClient {
  constructor(options) {
    const serverName = options.includeServerName === false ? void 0 : options.serverName || global.process.env.SENTRY_NAME || os2.hostname();
    const clientOptions = {
      ...options,
      platform: "node",
      runtime: { name: "node", version: global.process.version },
      serverName
    };
    if (options.openTelemetryInstrumentations) {
      (0, import_instrumentation3.registerInstrumentations)({
        instrumentations: options.openTelemetryInstrumentations
      });
    }
    applySdkMetadata(clientOptions, "node");
    debug.log(`Initializing Sentry: process: ${process.pid}, thread: ${isMainThread ? "main" : `worker-${threadId}`}.`);
    super(clientOptions);
    if (this.getOptions().enableLogs) {
      this._logOnExitFlushListener = () => {
        _INTERNAL_flushLogsBuffer(this);
      };
      if (serverName) {
        this.on("beforeCaptureLog", (log5) => {
          log5.attributes = {
            ...log5.attributes,
            "server.address": serverName
          };
        });
      }
      process.on("beforeExit", this._logOnExitFlushListener);
    }
  }
  /** Get the OTEL tracer. */
  get tracer() {
    if (this._tracer) {
      return this._tracer;
    }
    const name = "@sentry/node";
    const version2 = SDK_VERSION;
    const tracer = trace.getTracer(name, version2);
    this._tracer = tracer;
    return tracer;
  }
  /** @inheritDoc */
  // @ts-expect-error - PromiseLike is a subset of Promise
  async flush(timeout) {
    await this.traceProvider?.forceFlush();
    if (this.getOptions().sendClientReports) {
      this._flushOutcomes();
    }
    return super.flush(timeout);
  }
  /** @inheritDoc */
  // @ts-expect-error - PromiseLike is a subset of Promise
  async close(timeout) {
    if (this._clientReportInterval) {
      clearInterval(this._clientReportInterval);
    }
    if (this._clientReportOnExitFlushListener) {
      process.off("beforeExit", this._clientReportOnExitFlushListener);
    }
    if (this._logOnExitFlushListener) {
      process.off("beforeExit", this._logOnExitFlushListener);
    }
    const allEventsSent = await super.close(timeout);
    if (this.traceProvider) {
      await this.traceProvider.shutdown();
    }
    return allEventsSent;
  }
  /**
   * Will start tracking client reports for this client.
   *
   * NOTICE: This method will create an interval that is periodically called and attach a `process.on('beforeExit')`
   * hook. To clean up these resources, call `.close()` when you no longer intend to use the client. Not doing so will
   * result in a memory leak.
   */
  // The reason client reports need to be manually activated with this method instead of just enabling them in a
  // constructor, is that if users periodically and unboundedly create new clients, we will create more and more
  // intervals and beforeExit listeners, thus leaking memory. In these situations, users are required to call
  // `client.close()` in order to dispose of the acquired resources.
  // We assume that calling this method in Sentry.init() is a sensible default, because calling Sentry.init() over and
  // over again would also result in memory leaks.
  // Note: We have experimented with using `FinalizationRegisty` to clear the interval when the client is garbage
  // collected, but it did not work, because the cleanup function never got called.
  startClientReportTracking() {
    const clientOptions = this.getOptions();
    if (clientOptions.sendClientReports) {
      this._clientReportOnExitFlushListener = () => {
        this._flushOutcomes();
      };
      this._clientReportInterval = setInterval(() => {
        DEBUG_BUILD2 && debug.log("Flushing client reports based on interval.");
        this._flushOutcomes();
      }, clientOptions.clientReportFlushInterval ?? DEFAULT_CLIENT_REPORT_FLUSH_INTERVAL_MS).unref();
      process.on("beforeExit", this._clientReportOnExitFlushListener);
    }
  }
  /** @inheritDoc */
  _setupIntegrations() {
    _INTERNAL_clearAiProviderSkips();
    super._setupIntegrations();
  }
  /** Custom implementation for OTEL, so we can handle scope-span linking. */
  _getTraceInfoFromScope(scope) {
    if (!scope) {
      return [void 0, void 0];
    }
    return getTraceContextForScope(this, scope);
  }
};

// node_modules/.pnpm/@sentry+node@10.34.0/node_modules/@sentry/node/build/esm/integrations/node-fetch.js
var import_instrumentation_undici = __toESM(require_src8(), 1);
var INTEGRATION_NAME10 = "NodeFetch";
var instrumentOtelNodeFetch = generateInstrumentOnce(
  INTEGRATION_NAME10,
  import_instrumentation_undici.UndiciInstrumentation,
  (options) => {
    return getConfigWithDefaults(options);
  }
);
var instrumentSentryNodeFetch = generateInstrumentOnce(
  `${INTEGRATION_NAME10}.sentry`,
  SentryNodeFetchInstrumentation,
  (options) => {
    return options;
  }
);
var _nativeNodeFetchIntegration = ((options = {}) => {
  return {
    name: "NodeFetch",
    setupOnce() {
      const instrumentSpans = _shouldInstrumentSpans(options, getClient()?.getOptions());
      if (instrumentSpans) {
        instrumentOtelNodeFetch(options);
      }
      instrumentSentryNodeFetch(options);
    }
  };
});
var nativeNodeFetchIntegration = defineIntegration(_nativeNodeFetchIntegration);
function getAbsoluteUrl2(origin, path2 = "/") {
  const url = `${origin}`;
  if (url.endsWith("/") && path2.startsWith("/")) {
    return `${url}${path2.slice(1)}`;
  }
  if (!url.endsWith("/") && !path2.startsWith("/")) {
    return `${url}/${path2.slice(1)}`;
  }
  return `${url}${path2}`;
}
function _shouldInstrumentSpans(options, clientOptions = {}) {
  return typeof options.spans === "boolean" ? options.spans : !clientOptions.skipOpenTelemetrySetup && hasSpansEnabled(clientOptions);
}
function getConfigWithDefaults(options = {}) {
  const instrumentationConfig = {
    requireParentforSpans: false,
    ignoreRequestHook: (request) => {
      const url = getAbsoluteUrl2(request.origin, request.path);
      const _ignoreOutgoingRequests = options.ignoreOutgoingRequests;
      const shouldIgnore = _ignoreOutgoingRequests && url && _ignoreOutgoingRequests(url);
      return !!shouldIgnore;
    },
    startSpanHook: () => {
      return {
        [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.node_fetch"
      };
    },
    requestHook: options.requestHook,
    responseHook: options.responseHook
  };
  return instrumentationConfig;
}

// node_modules/.pnpm/@sentry+node@10.34.0/node_modules/@sentry/node/build/esm/debug-build.js
var DEBUG_BUILD4 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;

// node_modules/.pnpm/@sentry+node@10.34.0/node_modules/@sentry/node/build/esm/sdk/initOtel.js
init_esm();
var import_resources = __toESM(require_src5(), 1);
var import_sdk_trace_base2 = __toESM(require_src6(), 1);
init_esm2();
var MAX_MAX_SPAN_WAIT_DURATION = 1e6;
function initOpenTelemetry(client, options = {}) {
  if (client.getOptions().debug) {
    setupOpenTelemetryLogger();
  }
  const [provider, asyncLocalStorageLookup] = setupOtel(client, options);
  client.traceProvider = provider;
  client.asyncLocalStorageLookup = asyncLocalStorageLookup;
}
function setupOtel(client, options = {}) {
  const provider = new import_sdk_trace_base2.BasicTracerProvider({
    sampler: new SentrySampler(client),
    resource: (0, import_resources.defaultResource)().merge(
      (0, import_resources.resourceFromAttributes)({
        [ATTR_SERVICE_NAME]: "node",
        // eslint-disable-next-line deprecation/deprecation
        [SEMRESATTRS_SERVICE_NAMESPACE]: "sentry",
        [ATTR_SERVICE_VERSION]: SDK_VERSION
      })
    ),
    forceFlushTimeoutMillis: 500,
    spanProcessors: [
      new SentrySpanProcessor({
        timeout: _clampSpanProcessorTimeout(client.getOptions().maxSpanWaitDuration)
      }),
      ...options.spanProcessors || []
    ]
  });
  trace.setGlobalTracerProvider(provider);
  propagation.setGlobalPropagator(new SentryPropagator());
  const ctxManager = new SentryContextManager();
  context.setGlobalContextManager(ctxManager);
  return [provider, ctxManager.getAsyncLocalStorageLookup()];
}
function _clampSpanProcessorTimeout(maxSpanWaitDuration) {
  if (maxSpanWaitDuration == null) {
    return void 0;
  }
  if (maxSpanWaitDuration > MAX_MAX_SPAN_WAIT_DURATION) {
    DEBUG_BUILD4 && debug.warn(`\`maxSpanWaitDuration\` is too high, using the maximum value of ${MAX_MAX_SPAN_WAIT_DURATION}`);
    return MAX_MAX_SPAN_WAIT_DURATION;
  } else if (maxSpanWaitDuration <= 0 || Number.isNaN(maxSpanWaitDuration)) {
    DEBUG_BUILD4 && debug.warn("`maxSpanWaitDuration` must be a positive number, using default value instead.");
    return void 0;
  }
  return maxSpanWaitDuration;
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/electron-breadcrumbs.js
import { app as app2, screen, powerMonitor, autoUpdater } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/renderers.js
import { app } from "electron";
var RENDERERS;
function trackRendererProperties() {
  if (RENDERERS) {
    return;
  }
  const renderers = RENDERERS = /* @__PURE__ */ new Map();
  function updateUrl(id, url) {
    const state = renderers.get(id) || { id };
    state.url = normalizeUrlToBase(url, app.getAppPath());
    renderers.set(id, state);
  }
  function updateTitle(id, title) {
    const state = renderers.get(id) || { id };
    state.title = title;
    renderers.set(id, state);
  }
  app.on("web-contents-created", (_, contents) => {
    const id = contents.id;
    contents.on("did-navigate", (_2, url) => updateUrl(id, url));
    contents.on("did-navigate-in-page", (_2, url) => updateUrl(id, url));
    contents.on("page-title-updated", (_2, title) => updateTitle(id, title));
    contents.on("destroyed", () => {
      setTimeout(() => {
        renderers.delete(id);
      }, 5e3);
    });
  });
}
function getRendererProperties(id) {
  return RENDERERS?.get(id);
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/electron-breadcrumbs.js
var DEFAULT_OPTIONS = {
  // We exclude events starting with remote as they can be quite verbose
  app: (name) => !name.startsWith("remote-"),
  autoUpdater: () => true,
  webContents: (name) => ["dom-ready", "context-menu", "load-url", "destroyed"].includes(name),
  browserWindow: (name) => [
    "closed",
    "close",
    "unresponsive",
    "responsive",
    "show",
    "blur",
    "focus",
    "hide",
    "maximize",
    "minimize",
    "restore",
    "enter-full-screen",
    "leave-full-screen"
  ].includes(name),
  screen: () => true,
  powerMonitor: () => true,
  captureWindowTitles: false
};
function normalizeOptions(options) {
  return Object.keys(options).reduce((obj, k) => {
    if (k === "captureWindowTitles") {
      obj[k] = !!options[k];
    } else {
      const val = options[k];
      if (Array.isArray(val)) {
        obj[k] = (name) => val.includes(name);
      } else if (typeof val === "function" || val === false) {
        obj[k] = val;
      }
    }
    return obj;
  }, {});
}
var electronBreadcrumbsIntegration = defineIntegration((userOptions = {}) => {
  const options = {
    ...DEFAULT_OPTIONS,
    ...normalizeOptions(userOptions)
  };
  return {
    name: "ElectronBreadcrumbs",
    setup(client) {
      const clientOptions = client.getOptions();
      const enableLogs = !!clientOptions?.enableLogs;
      function patchEventEmitter(emitter, category, shouldCapture, id) {
        const emit = emitter.emit.bind(emitter);
        emitter.emit = (event, ...args) => {
          if (shouldCapture && shouldCapture(event)) {
            const breadcrumb = {
              category: "electron",
              message: `${category}.${event}`,
              timestamp: (/* @__PURE__ */ new Date()).getTime() / 1e3,
              type: "ui"
            };
            if (id) {
              breadcrumb.data = { ...getRendererProperties(id) };
              if (!options.captureWindowTitles && breadcrumb.data?.title) {
                delete breadcrumb.data?.title;
              }
            }
            addBreadcrumb(breadcrumb);
            const attributes2 = {
              "sentry.origin": "auto.electron.events"
            };
            if (breadcrumb.data?.id) {
              attributes2.id = breadcrumb.data.id;
            }
            if (breadcrumb.data?.url) {
              attributes2.url = breadcrumb.data.url;
            }
            if (enableLogs) {
              exports_exports.info(exports_exports.fmt`electron.${category}.${event}`, attributes2);
            }
          }
          return emit(event, ...args);
        };
      }
      trackRendererProperties();
      app2.whenReady().then(() => {
        if (options.screen) {
          patchEventEmitter(screen, "screen", options.screen);
        }
        if (options.powerMonitor) {
          patchEventEmitter(powerMonitor, "powerMonitor", options.powerMonitor);
        }
      }, () => {
      });
      if (options.app) {
        patchEventEmitter(app2, "app", options.app);
      }
      if (options.autoUpdater) {
        patchEventEmitter(autoUpdater, "autoUpdater", options.autoUpdater);
      }
      if (options.browserWindow) {
        app2.on("browser-window-created", (_, window2) => {
          const id = window2.webContents.id;
          const windowName = clientOptions?.getRendererName?.(window2.webContents) || "window";
          patchEventEmitter(window2, windowName, options.browserWindow, id);
        });
      }
      if (options.webContents) {
        app2.on("web-contents-created", (_, contents) => {
          const id = contents.id;
          const webContentsName = clientOptions?.getRendererName?.(contents) || "renderer";
          patchEventEmitter(contents, webContentsName, options.webContents, id);
        });
      }
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/onuncaughtexception.js
import { dialog } from "electron";
var onUncaughtExceptionIntegration2 = defineIntegration(() => {
  return {
    name: "OnUncaughtException",
    setup(client) {
      const options = client.getOptions();
      global.process.on("uncaughtException", (error3) => {
        captureException(error3, {
          originalException: error3,
          captureContext: {
            level: "fatal"
          },
          data: {
            mechanism: {
              handled: false,
              type: "generic"
            }
          }
        });
        client.flush(options.shutdownTimeout || 2e3).then(() => {
          if (options?.onFatalError) {
            options.onFatalError(error3);
          } else if (global.process.listenerCount("uncaughtException") <= 2) {
            console.error("Uncaught Exception:");
            console.error(error3);
            const ref = error3.stack;
            const stack = ref !== void 0 ? ref : `${error3.name}: ${error3.message}`;
            const message = `Uncaught Exception:
${stack}`;
            dialog.showErrorBox("A JavaScript error occurred in the main process", message);
          }
        }, () => {
        });
      });
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/sentry-minidump/index.js
import { app as app7, crashReporter } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/common/scope.js
function getScopeData() {
  const globalScope = getGlobalScope().getScopeData();
  const isolationScope = getIsolationScope().getScopeData();
  const currentScope = getCurrentScope().getScopeData();
  mergeScopeData(globalScope, isolationScope);
  mergeScopeData(globalScope, currentScope);
  globalScope.eventProcessors = [];
  return globalScope;
}
function addScopeListener(callback) {
  getIsolationScope().addScopeListener((isolation) => {
    const merged = getScopeData();
    callback(merged, isolation);
  });
  getCurrentScope().addScopeListener((current) => {
    const merged = getScopeData();
    callback(merged, current);
  });
  getGlobalScope().addScopeListener((global2) => {
    const merged = getScopeData();
    callback(merged, global2);
  });
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/context.js
import { app as app3 } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/version.js
var SDK_VERSION2 = "7.6.0";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/context.js
var SDK_NAME = "sentry.javascript.electron";
function getSdkInfo(sendDefaultPii) {
  return {
    name: SDK_NAME,
    packages: [
      {
        name: "npm:@sentry/electron",
        version: SDK_VERSION2
      }
    ],
    version: SDK_VERSION2,
    settings: { infer_ip: sendDefaultPii ? "auto" : "never" }
  };
}
function getDefaultReleaseName() {
  const app_name = app3.name || app3.getName();
  return `${app_name.replace(/\W/g, "-")}@${app3.getVersion()}`;
}
function getDefaultEnvironment() {
  return app3.isPackaged ? "production" : "development";
}
async function getEventDefaults(client) {
  let event = { message: "test" };
  const eventHint = {};
  for (const processor of client.getEventProcessors()) {
    if (event === null)
      break;
    event = await processor(event, eventHint);
  }
  delete event?.message;
  return event || {};
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/electron-normalize.js
import { app as app4 } from "electron";
import { join as join3 } from "path";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/common/ipc.js
var IPCMode;
(function(IPCMode2) {
  IPCMode2[IPCMode2["Classic"] = 1] = "Classic";
  IPCMode2[IPCMode2["Protocol"] = 2] = "Protocol";
  IPCMode2[IPCMode2["Both"] = 3] = "Both";
})(IPCMode || (IPCMode = {}));
function ipcChannelUtils(namespace) {
  return {
    createUrl: (channel3) => {
      return `${namespace}://${channel3}/sentry_key`;
    },
    urlMatches: function(url, channel3) {
      return url.startsWith(this.createUrl(channel3));
    },
    createKey: (channel3) => {
      return `${namespace}.${channel3}`;
    },
    namespace
  };
}
var RENDERER_ID_HEADER = "sentry-electron-renderer-id";
var UTILITY_PROCESS_MAGIC_MESSAGE_KEY = "__sentry_message_port_message__";
function isMagicMessage(msg) {
  return !!(msg && typeof msg === "object" && UTILITY_PROCESS_MAGIC_MESSAGE_KEY in msg);
}
function getMagicMessage() {
  return { [UTILITY_PROCESS_MAGIC_MESSAGE_KEY]: true };
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/electron-normalize.js
var parsed = parseSemver(process.versions.electron);
var version = { major: parsed.major || 0, minor: parsed.minor || 0, patch: parsed.patch || 0 };
var ELECTRON_MAJOR_VERSION = version.major;
var EXIT_REASONS = [
  "clean-exit",
  "abnormal-exit",
  "killed",
  "crashed",
  "oom",
  "launch-failed",
  "integrity-failure"
];
var CRASH_REASONS = ["crashed", "oom"];
function getSentryCachePath() {
  return join3(app4.getPath("userData"), "sentry");
}
function supportsProtocolHandle() {
  return version.major >= 25;
}
function registerProtocol(protocol2, scheme, callback) {
  if (supportsProtocolHandle()) {
    protocol2.handle(scheme, async (request) => {
      callback({
        windowId: request.headers.get(RENDERER_ID_HEADER) || void 0,
        url: request.url,
        body: Buffer.from(await request.arrayBuffer())
      });
      return new Response("");
    });
  } else {
    protocol2.registerStringProtocol(scheme, (request, complete) => {
      callback({
        windowId: request.headers[RENDERER_ID_HEADER],
        url: request.url,
        body: request.uploadData?.[0]?.bytes
      });
      complete("");
    });
  }
}
function setPreload(sesh, path2) {
  if (sesh.registerPreloadScript) {
    sesh.registerPreloadScript({ type: "frame", filePath: path2 });
  } else {
    const existing = sesh.getPreloads();
    sesh.setPreloads([path2, ...existing]);
  }
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/sessions.js
import { app as app5 } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/store.js
import { promises } from "fs";
import { join as join4, dirname as dirname2 } from "path";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/mutex.js
var Mutex = class {
  constructor() {
    this._entries = [];
    this._waiters = [];
    this._value = 1;
  }
  /** Run a task when all pending tasks are complete */
  async runExclusive(task) {
    const release2 = await this._acquire();
    try {
      return await task();
    } finally {
      release2();
    }
  }
  /** Gets a promise that resolves when all pending tasks are complete */
  _acquire() {
    return new Promise((resolve3, reject) => {
      this._entries.push({ resolve: resolve3, reject });
      this._dispatch();
    });
  }
  /** Releases after a task is complete */
  _release() {
    this._value += 1;
    this._dispatch();
  }
  /** Dispatches pending tasks */
  _dispatch() {
    for (let weight = this._value; weight > 0; weight--) {
      const queueEntry = this._entries?.shift();
      if (!queueEntry)
        continue;
      this._value -= weight;
      weight = this._value + 1;
      queueEntry.resolve(this._newReleaser());
    }
    this._drainUnlockWaiters();
  }
  /** Creates a new releaser */
  _newReleaser() {
    let called = false;
    return () => {
      if (called)
        return;
      called = true;
      this._release();
    };
  }
  /** Drain unlock waiters */
  _drainUnlockWaiters() {
    for (let weight = this._value; weight > 0; weight--) {
      if (!this._waiters[weight - 1])
        continue;
      this._waiters.forEach((waiter) => waiter());
      this._waiters = [];
    }
  }
};

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/store.js
var dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.*\d{0,10}Z$/;
function dateReviver(_, value) {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }
  return value;
}
var Store = class {
  /**
   * Creates a new store.
   *
   * @param path A unique filename to store this data.
   * @param id A unique filename to store this data.
   * @param initial An initial value to initialize data with.
   */
  constructor(path2, id, initial) {
    this._lock = new Mutex();
    this._path = join4(path2, `${id}.json`);
    this._initial = initial;
  }
  /**
   * Updates data by replacing it with the given value.
   * @param data New data to replace the previous one.
   */
  async set(data) {
    await this._lock.runExclusive(async () => {
      this._data = data;
      try {
        if (data === void 0) {
          try {
            await promises.unlink(this._path);
          } catch (_) {
          }
        } else {
          await promises.mkdir(dirname2(this._path), { recursive: true });
          await promises.writeFile(this._path, JSON.stringify(data));
        }
      } catch (e) {
        debug.warn("Failed to write to store", e);
      }
    });
  }
  /**
   * Returns the current data.
   *
   * When invoked for the first time, it will try to load previously stored data
   * from disk. If the file does not exist, the initial value provided to the
   * constructor is used.
   */
  async get() {
    return this._lock.runExclusive(async () => {
      if (this._data === void 0) {
        try {
          this._data = JSON.parse(await promises.readFile(this._path, "utf8"), dateReviver);
        } catch (e) {
          this._data = this._initial;
        }
      }
      return this._data;
    });
  }
  /**
   * Updates data by passing it through the given function.
   * @param fn A function receiving the current data and returning new one.
   */
  async update(fn) {
    await this.set(fn(await this.get()));
  }
  /** Returns store to its initial state */
  async clear() {
    await this.set(this._initial);
  }
  /** Gets the Date that the file was last modified */
  async getModifiedDate() {
    try {
      return (await promises.stat(this._path))?.mtime;
    } catch (_) {
      return void 0;
    }
  }
};
var BufferedWriteStore = class extends Store {
  /**
   * Creates a new ThrottledStore.
   *
   * @param path A unique filename to store this data.
   * @param id A unique filename to store this data.
   * @param initial An initial value to initialize data with.
   * @param throttleTime The minimum time between writes
   */
  constructor(path2, id, initial, _throttleTime = 500) {
    super(path2, id, initial);
    this._throttleTime = _throttleTime;
  }
  /** @inheritdoc */
  async set(data) {
    this._data = data;
    this._pendingWrite = {
      // We overwrite the data for the pending write so that the latest data is written in the next flush
      data,
      // If there is already a pending timeout, we keep that rather than starting the timeout again
      timeout: this._pendingWrite?.timeout || setTimeout(() => this._writePending(), this._throttleTime)
    };
  }
  /** Writes the pending write to disk */
  _writePending() {
    if (this._pendingWrite) {
      const data = this._pendingWrite.data;
      this._pendingWrite = void 0;
      super.set(data).catch(() => {
      });
    }
  }
};

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/sessions.js
var PERSIST_INTERVAL_MS = 6e4;
var sessionStore;
var previousSession;
function getSessionStore() {
  if (!sessionStore) {
    sessionStore = new Store(getSentryCachePath(), "session", void 0);
    previousSession = sessionStore.get().then((sesh) => sesh ? makeSession(sesh) : sesh);
  }
  return sessionStore;
}
function makeSessionSafeToSerialize(session2) {
  const copy = { ...session2 };
  delete copy.toJSON;
  return copy;
}
var persistTimer;
function startSession2(sendOnCreate) {
  const session2 = startSession();
  if (sendOnCreate) {
    captureSession();
  }
  getSessionStore().set(makeSessionSafeToSerialize(session2)).catch(() => {
  });
  persistTimer = setInterval(async () => {
    const currentSession = getIsolationScope().getSession();
    if (currentSession && currentSession.status === "ok") {
      await getSessionStore().set(makeSessionSafeToSerialize(currentSession));
    }
  }, PERSIST_INTERVAL_MS);
}
async function endSession2() {
  if (persistTimer) {
    clearInterval(persistTimer);
  }
  const session2 = getIsolationScope().getSession();
  if (session2) {
    if (session2.status === "ok") {
      debug.log("Ending session");
      endSession();
    } else {
      debug.log("Session was already ended");
    }
  } else {
    debug.log("No session");
  }
  await getSessionStore().clear();
  await flush(2e3);
}
async function unreportedDuringLastSession(crashDate) {
  if (!crashDate) {
    return false;
  }
  const previousSessionModified = await getSessionStore().getModifiedDate();
  if (previousSessionModified === void 0) {
    return false;
  }
  const previousSessionModifiedTime = previousSessionModified.getTime();
  const crashTime = crashDate.getTime();
  const prevSessionEnd = previousSessionModifiedTime + PERSIST_INTERVAL_MS;
  const lastPersist = previousSessionModifiedTime - 2e3;
  return crashTime > lastPersist && crashTime < prevSessionEnd;
}
async function setPreviousSessionAsCurrent() {
  const previous = await previousSession;
  const scope = getIsolationScope();
  const currentSession = scope.getSession();
  if (previous) {
    previousSession = void 0;
    if (previous.status === "ok") {
      scope.setSession(makeSession(previous));
    }
  }
  return currentSession;
}
function restorePreviousSession(session2) {
  getIsolationScope().setSession(session2);
}
async function previousSessionWasAbnormal() {
  const client = getClient();
  const previous = await previousSession;
  if (previous && client) {
    if (previous.status !== "ok") {
      previousSession = void 0;
      return;
    }
    debug.log("Found previous abnormal session");
    const sesh = makeSession(previous);
    updateSession(sesh, {
      status: "abnormal",
      errors: (sesh.errors || 0) + 1,
      release: previous.attrs?.release,
      environment: previous.attrs?.environment
    });
    await client.sendSession(sesh);
    previousSession = void 0;
  }
}
async function checkPreviousSession(crashed) {
  const client = getClient();
  const previous = await previousSession;
  if (previous && client) {
    if (previous.status !== "ok") {
      previousSession = void 0;
      return;
    }
    const status = crashed ? "crashed" : "abnormal";
    debug.log(`Found previous ${status} session`);
    const sesh = makeSession(previous);
    updateSession(sesh, {
      status,
      errors: (sesh.errors || 0) + 1,
      release: previous.attrs?.release,
      environment: previous.attrs?.environment
    });
    await client.sendSession(sesh);
    previousSession = void 0;
  }
}
function sessionCrashed() {
  if (persistTimer) {
    clearInterval(persistTimer);
  }
  debug.log("Session Crashed");
  const session2 = getIsolationScope().getSession();
  if (!session2) {
    debug.log("No session to update");
    return;
  }
  if (session2.status === "ok") {
    debug.log("Setting session as crashed");
    const errors = session2.errors + 1;
    updateSession(session2, { status: "crashed", errors });
    captureSession();
  } else {
    debug.log("Session already ended");
  }
}
function sessionAnr() {
  if (persistTimer) {
    clearInterval(persistTimer);
  }
  const session2 = getIsolationScope().getSession();
  if (!session2) {
    return;
  }
  if (session2.status === "ok") {
    debug.log("Setting session as abnormal ANR");
    updateSession(session2, { status: "abnormal", abnormal_mechanism: "anr_foreground" });
    captureSession();
  }
}
function endSessionOnExit() {
  app5.on("before-quit", () => {
    app5.removeListener("will-quit", exitHandler);
    app5.on("will-quit", exitHandler);
  });
}
var exitHandler = async (event) => {
  if (event.defaultPrevented) {
    return;
  }
  debug.log("[Session] Exit Handler");
  event.preventDefault();
  try {
    await endSession2();
  } catch (e) {
    debug.warn("[Session] Error ending session:", e);
  }
  app5.exit();
};

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/sentry-minidump/minidump-loader.js
import { app as app6 } from "electron";
import { promises as promises2 } from "fs";
import { join as join5, basename as basename2 } from "path";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/sentry-minidump/minidump-parser.js
var MINIDUMP_MAGIC_SIGNATURE = "MDMP";
function readHeader(buf) {
  return {
    //   pub signature: u32,
    signature: buf.subarray(0, 4).toString(),
    //   pub version: u32,
    version: buf.readUInt32LE(4),
    //   pub stream_count: u32,
    streamCount: buf.readUInt32LE(8),
    //   pub stream_directory_rva: u32,
    streamDirectoryRva: buf.readUInt32LE(12),
    //   pub checksum: u32,
    checksum: buf.readUInt32LE(16),
    //   pub time_date_stamp: u32,
    timeDateStamp: new Date(buf.readUInt32LE(20) * 1e3),
    //   pub flags: u64,
    flags: buf.readBigUInt64LE(24)
  };
}
function readLocationDescriptor(buf, base) {
  return {
    //   pub data_size: u32,
    dataSize: buf.readUInt32LE(base),
    //   pub rva: u32,
    rva: buf.readUInt32LE(base + 4)
  };
}
function readDirectoryStream(buf, rva) {
  return {
    //   pub stream_type: u32,
    streamType: buf.readUInt32LE(rva),
    //   pub location: [u32, u32],
    location: readLocationDescriptor(buf, rva + 4)
  };
}
function readCrashpadInfoBuffer(buf, location) {
  return buf.subarray(location.rva, location.rva + location.dataSize);
}
function readCrashpadModuleInfoAnnotationObjectsLocation(buf, base) {
  const annotation_objects = readLocationDescriptor(buf, base + 20);
  return annotation_objects;
}
function readStringUtf8Unterminated(buf, rva) {
  const length = buf.readUInt32LE(rva);
  return buf.toString("utf8", rva + 4, rva + 4 + length);
}
function readAnnotationObject(buf, all, offset) {
  const name = buf.readUInt32LE(offset);
  const ty = buf.readUInt16LE(offset + 4);
  const value = buf.readUInt32LE(offset + 8);
  if (ty === 1) {
    return { name: readStringUtf8Unterminated(all, name), value: readStringUtf8Unterminated(all, value) };
  }
  return void 0;
}
function readAnnotationObjects(buf, location) {
  const data = buf.subarray(location.rva, location.rva + location.dataSize);
  if (data.length === 0) {
    return {};
  }
  const annotationObjectsLocation = readCrashpadModuleInfoAnnotationObjectsLocation(data, 0);
  const annotationObjectsData = buf.subarray(annotationObjectsLocation.rva, annotationObjectsLocation.rva + annotationObjectsLocation.dataSize);
  const count = annotationObjectsData.readUInt32LE(0);
  let offset = 4;
  const annotationObjects = {};
  for (let i = 0; i < count; i++) {
    const annotation = readAnnotationObject(annotationObjectsData, buf, offset);
    if (annotation) {
      const { name, value } = annotation;
      annotationObjects[name] = value;
    }
    offset += 12;
  }
  return annotationObjects;
}
function readCrashpadModuleLinks(buf, location) {
  const data = buf.subarray(location.rva, location.rva + location.dataSize);
  if (data.length === 0) {
    return {};
  }
  const count = data.readUInt32LE(0);
  let offset = 4;
  let annotationObjects = {};
  for (let i = 0; i < count; i++) {
    const annotationObjectsLocation = readLocationDescriptor(data, offset + 4);
    annotationObjects = { ...annotationObjects, ...readAnnotationObjects(buf, annotationObjectsLocation) };
    offset += 12;
  }
  return annotationObjects;
}
function parseCrashpadInfo(buf, info2) {
  const module_list = readLocationDescriptor(info2, 44);
  return readCrashpadModuleLinks(buf, module_list);
}
function parseMinidump(buf) {
  if (buf.length < 1e4) {
    throw new Error("Minidump was less than 10KB so likely incomplete.");
  }
  let header;
  try {
    header = readHeader(buf);
  } catch (_) {
    throw new Error("Failed to parse minidump header");
  }
  if (header.signature !== MINIDUMP_MAGIC_SIGNATURE) {
    throw new Error(`Minidump signature was not '${MINIDUMP_MAGIC_SIGNATURE}'`);
  }
  try {
    for (let i = 0; i < header.streamCount; i++) {
      const stream = readDirectoryStream(buf, header.streamDirectoryRva + i * 12);
      if (stream.streamType === 1129316353) {
        const crashpadInfo = readCrashpadInfoBuffer(buf, stream.location);
        const crashpadAnnotations = parseCrashpadInfo(buf, crashpadInfo);
        return {
          header,
          crashpadAnnotations
        };
      }
    }
  } catch (_) {
  }
  return { header };
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/sentry-minidump/minidump-loader.js
var MAX_AGE_DAYS = 30;
var MS_PER_DAY = 24 * 3600 * 1e3;
var NOT_MODIFIED_MS = 1e3;
var MAX_RETRY_MS = 5e3;
var RETRY_DELAY_MS = 500;
var MAX_RETRIES = MAX_RETRY_MS / RETRY_DELAY_MS;
function delay(ms) {
  return new Promise((resolve3) => setTimeout(resolve3, ms));
}
function createMinidumpLoader(getMinidumpPaths) {
  const mutex = new Mutex();
  return async (deleteAll, callback) => {
    await mutex.runExclusive(async () => {
      for (const path2 of await getMinidumpPaths()) {
        try {
          if (deleteAll) {
            continue;
          }
          debug.log("Found minidump", path2);
          let stats = await promises2.stat(path2);
          const thirtyDaysAgo = (/* @__PURE__ */ new Date()).getTime() - MAX_AGE_DAYS * MS_PER_DAY;
          if (stats.mtimeMs < thirtyDaysAgo) {
            debug.log(`Ignoring minidump as it is over ${MAX_AGE_DAYS} days old`);
            continue;
          }
          let retries = 0;
          while (retries <= MAX_RETRIES) {
            const twoSecondsAgo = (/* @__PURE__ */ new Date()).getTime() - NOT_MODIFIED_MS;
            if (stats.mtimeMs < twoSecondsAgo) {
              const data = await promises2.readFile(path2);
              try {
                const parsedMinidump = parseMinidump(data);
                debug.log("Sending minidump");
                await callback(parsedMinidump, {
                  attachmentType: "event.minidump",
                  filename: basename2(path2),
                  data
                });
              } catch (e) {
                const message = e instanceof Error ? e.toString() : "Unknown error";
                debug.warn(`Dropping minidump:
${message}`);
                break;
              }
              break;
            }
            debug.log(`Waiting. Minidump has been modified in the last ${NOT_MODIFIED_MS} milliseconds.`);
            retries += 1;
            await delay(RETRY_DELAY_MS);
            stats = await promises2.stat(path2);
          }
          if (retries >= MAX_RETRIES) {
            debug.warn("Timed out waiting for minidump to stop being modified");
          }
        } catch (e) {
          debug.error("Failed to load minidump", e);
        } finally {
          try {
            await promises2.unlink(path2);
          } catch (e) {
            debug.warn("Could not delete minidump", path2);
          }
        }
      }
    });
  };
}
async function deleteCrashpadMetadataFile(crashesDirectory, waitMs = 100) {
  if (waitMs > 2e3) {
    return;
  }
  const metadataPath = join5(crashesDirectory, "metadata");
  try {
    await promises2.unlink(metadataPath);
    debug.log("Deleted Crashpad metadata file", metadataPath);
  } catch (e) {
    if (e.code && e.code == "EBUSY") {
      setTimeout(async () => {
        await deleteCrashpadMetadataFile(crashesDirectory, waitMs * 2);
      }, waitMs);
    }
  }
}
async function readDirsAsync(paths) {
  const found = [];
  for (const path2 of paths) {
    try {
      const files = await promises2.readdir(path2);
      found.push(...files.map((file) => join5(path2, file)));
    } catch (_) {
    }
  }
  return found;
}
function getMinidumpLoader() {
  const crashesDirectory = app6.getPath("crashDumps");
  const crashpadSubDirectory = process.platform === "win32" ? "reports" : "completed";
  const dumpDirectories = [join5(crashesDirectory, crashpadSubDirectory)];
  if (process.platform === "darwin") {
    dumpDirectories.push(join5(crashesDirectory, "pending"));
  }
  return createMinidumpLoader(async () => {
    await deleteCrashpadMetadataFile(crashesDirectory).catch((error3) => debug.error(error3));
    const files = await readDirsAsync(dumpDirectories);
    return files.filter((file) => file.endsWith(".dmp"));
  });
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/sentry-minidump/index.js
var sentryMinidumpIntegration = defineIntegration((options = {}) => {
  let minidumpsRemaining = options.maxMinidumpsPerSession || 10;
  let scopeStore;
  let scopeLastRun;
  let minidumpLoader;
  function startCrashReporter() {
    debug.log("Starting Electron crashReporter");
    crashReporter.start({
      companyName: "",
      ignoreSystemCrashHandler: true,
      productName: app7.name || app7.getName(),
      // Empty string doesn't work for Linux Crashpad and no submitURL doesn't work for older versions of Electron
      submitURL: "https://f.a.k/e",
      uploadToServer: false,
      compress: true
    });
  }
  function setupScopeListener(client) {
    function scopeChanged(scope) {
      setImmediate(async () => scopeStore?.set({
        scope,
        event: await getEventDefaults(client)
      }));
    }
    addScopeListener((scope) => {
      scopeChanged(scope);
    });
    scopeChanged(getScopeData());
  }
  async function sendNativeCrashes(client, getEvent) {
    if (minidumpsRemaining <= 0) {
      debug.log("Not sending minidumps because the limit has been reached");
    }
    const deleteAll = client.getOptions().enabled === false || minidumpsRemaining <= 0;
    let minidumpFound = false;
    await minidumpLoader?.(deleteAll, async (minidumpResult, attachment) => {
      minidumpFound = true;
      const minidumpProcess = minidumpResult.crashpadAnnotations?.process_type?.replace("-process", "");
      const event = await getEvent(minidumpProcess);
      if (minidumpResult.crashpadAnnotations) {
        const prependedAnnotations = Object.entries(minidumpResult.crashpadAnnotations).reduce((acc, [key, val]) => (acc[`crashpad.${key}`] = val, acc), {});
        event.contexts = {
          ...event.contexts,
          electron: {
            ...event.contexts?.electron,
            ...prependedAnnotations
          }
        };
      }
      if (minidumpsRemaining > 0) {
        minidumpsRemaining -= 1;
        captureEvent(event, { attachments: [attachment] });
      }
    });
    return minidumpFound;
  }
  async function sendRendererCrash(client, options2, contents, details) {
    const { getRendererName } = options2;
    await sendNativeCrashes(client, (minidumpProcess) => {
      const crashedProcess = (minidumpProcess === "renderer" && getRendererName ? getRendererName(contents) : minidumpProcess) || "unknown";
      debug.log(`'${crashedProcess}' process '${details.reason}'`);
      return {
        contexts: {
          electron: {
            crashed_url: getRendererProperties(contents.id)?.url || "unknown",
            details
          }
        },
        level: "fatal",
        // The default is javascript
        platform: "native",
        tags: {
          "event.environment": "native",
          "event.process": crashedProcess,
          "exit.reason": details.reason
        }
      };
    });
  }
  async function sendChildProcessCrash(client, details) {
    debug.log(`${details.type} process has ${details.reason}`);
    await sendNativeCrashes(client, (minidumpProcess) => ({
      contexts: {
        electron: { details }
      },
      level: "fatal",
      // The default is javascript
      platform: "native",
      tags: {
        "event.environment": "native",
        "event.process": minidumpProcess || details.type,
        "exit.reason": details.reason
      }
    }));
  }
  return {
    name: "SentryMinidump",
    setup(client) {
      if (process.mas) {
        return;
      }
      startCrashReporter();
      scopeStore = new BufferedWriteStore(getSentryCachePath(), "scope_v3", {
        scope: new Scope().getScopeData()
      });
      scopeLastRun = scopeStore.get();
      try {
        minidumpLoader = getMinidumpLoader();
      } catch (error3) {
        debug.error("Failed to create minidump loader", error3);
      }
      const options2 = client.getOptions();
      setupScopeListener(client);
      if (!options2?.dsn) {
        throw new Error("Attempted to enable Electron native crash reporter but no DSN was supplied");
      }
      trackRendererProperties();
      app7.on("render-process-gone", async (_, contents, details) => {
        if (EXIT_REASONS.includes(details.reason)) {
          await sendRendererCrash(client, options2, contents, details);
        }
      });
      app7.on("child-process-gone", async (_, details) => {
        if (EXIT_REASONS.includes(details.reason)) {
          await sendChildProcessCrash(client, details);
        }
      });
      let sessionToRestore;
      sendNativeCrashes(client, async (minidumpProcess) => {
        const event = {
          level: "fatal",
          platform: "native",
          tags: {
            "event.environment": "native",
            "event.process": minidumpProcess || "unknown"
          }
        };
        const previousRun = await scopeLastRun;
        if (previousRun) {
          if (previousRun.scope) {
            applyScopeDataToEvent(event, previousRun.scope);
          }
          event.release = previousRun.event?.release;
          event.environment = previousRun.event?.environment;
          event.contexts = previousRun.event?.contexts;
          event.sdkProcessingMetadata = {
            dynamicSamplingContext: {
              trace_id: previousRun.scope.propagationContext.traceId,
              release: previousRun.event?.release,
              environment: previousRun.event?.environment,
              public_key: client.getDsn()?.publicKey
            }
          };
        }
        sessionToRestore = await setPreviousSessionAsCurrent();
        return event;
      }).then(async (minidumpsFound) => {
        if (!minidumpsFound) {
          await previousSessionWasAbnormal();
        } else if (sessionToRestore) {
          restorePreviousSession(sessionToRestore);
        }
      }).catch((error3) => debug.error(error3));
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/electron-minidump.js
import { app as app9, crashReporter as crashReporter2 } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/merge.js
function removePrivateProperties(event) {
  delete event.sdkProcessingMetadata?.capturedSpanScope;
  delete event.sdkProcessingMetadata?.capturedSpanIsolationScope;
  for (const span of event.spans || []) {
    delete span.spanRecorder;
  }
}
function mergeEvents(defaults, event) {
  removePrivateProperties(event);
  const newEvent = {
    ...defaults,
    ...event,
    contexts: {
      ...defaults.contexts,
      ...event.contexts,
      app: {
        ...defaults.contexts?.app,
        ...event.contexts?.app
      },
      device: {
        ...defaults.contexts?.device,
        ...event.contexts?.device
      }
    },
    tags: {
      ...defaults.tags,
      ...event.tags
    },
    sdk: {
      ...defaults.sdk,
      ...event.sdk
    }
  };
  if (defaults.extra || event.extra) {
    newEvent.extra = {
      ...defaults.extra,
      ...event.extra
    };
  }
  return newEvent;
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/normalize.js
import { app as app8 } from "electron";
var getModuleFromFilename = createGetModuleFromFilename(app8.getAppPath());
function normalizePaths(event, basePath) {
  for (const exception of event.exception?.values || []) {
    for (const frame of exception.stacktrace?.frames || []) {
      if (frame.filename) {
        frame.filename = normalizeUrlToBase(frame.filename, basePath);
      }
    }
  }
  for (const debugImage of event.debug_meta?.images || []) {
    if (debugImage.type === "sourcemap") {
      debugImage.code_file = normalizeUrlToBase(debugImage.code_file, basePath);
    }
  }
  if (event.transaction) {
    event.transaction = normalizeUrlToBase(event.transaction, basePath);
  }
  const { request = {} } = event;
  if (request.url) {
    request.url = normalizeUrlToBase(request.url, basePath);
  }
  if (event.contexts?.feedback?.url && typeof event.contexts.feedback.url === "string") {
    event.contexts.feedback.url = normalizeUrlToBase(event.contexts.feedback.url, basePath);
  }
  if (event.spans) {
    for (const span of event.spans) {
      if (span.description) {
        span.description = normalizeUrlToBase(span.description, basePath);
      }
    }
  }
  return event;
}
function normalizeReplayEnvelope(options, envelope, basePath) {
  let modifiedEnvelope = createEnvelope(envelope[0]);
  let isReplay = false;
  forEachEnvelopeItem(envelope, (item, type) => {
    if (type === "replay_event") {
      isReplay = true;
      const [headers, event] = item;
      const currentScope = getCurrentScope().getScopeData();
      event.breadcrumbs = currentScope.breadcrumbs;
      event.tags = currentScope.tags;
      event.user = currentScope.user;
      event.environment = options.environment;
      if (Array.isArray(event.urls)) {
        event.urls = event.urls.map((url) => normalizeUrlToBase(url, basePath));
      }
      if (event?.request?.url) {
        event.request.url = normalizeUrlToBase(event.request.url, basePath);
      }
      modifiedEnvelope = addItemToEnvelope(modifiedEnvelope, [headers, event]);
    } else if (type === "replay_recording") {
      modifiedEnvelope = addItemToEnvelope(modifiedEnvelope, item);
    }
  });
  return isReplay ? modifiedEnvelope : envelope;
}
function normaliseProfile(profile, basePath) {
  for (const frame of profile.profile.frames) {
    if (frame.abs_path) {
      frame.abs_path = normalizeUrlToBase(frame.abs_path, basePath);
    }
    if ("filename" in frame && typeof frame.filename === "string") {
      frame.filename = normalizeUrlToBase(frame.filename, basePath);
    }
    if (frame.module) {
      frame.module = getModuleFromFilename(frame.abs_path);
    }
  }
}
function normaliseProfileChunk(profileChunk, basePath, options) {
  if (options.release) {
    profileChunk.release = options.release;
  }
  if (options.environment) {
    profileChunk.environment = options.environment;
  }
  const profile = profileChunk.profile;
  if (profile?.frames) {
    for (const frame of profile.frames) {
      if (frame.abs_path) {
        frame.abs_path = normalizeUrlToBase(frame.abs_path, basePath);
      }
      if (frame.filename) {
        frame.filename = normalizeUrlToBase(frame.filename, basePath);
      }
      if (frame.module) {
        frame.module = getModuleFromFilename(frame.abs_path);
      }
    }
  }
}
function normalizeProfileChunkEnvelope(options, envelope, basePath) {
  const [originalHeader] = envelope;
  const modifiedHeader = {
    ...originalHeader,
    sdk: { name: "sentry.javascript.electron", version: SDK_VERSION2 }
  };
  let modifiedEnvelope = createEnvelope(modifiedHeader);
  let isProfileChunk = false;
  forEachEnvelopeItem(envelope, (item, type) => {
    if (type === "profile_chunk") {
      isProfileChunk = true;
      const [headers, chunk] = item;
      normaliseProfileChunk(chunk, basePath, options);
      modifiedEnvelope = addItemToEnvelope(modifiedEnvelope, [headers, chunk]);
    }
  });
  return isProfileChunk ? modifiedEnvelope : envelope;
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/electron-minidump.js
function hasKeys(obj) {
  return obj !== void 0 && Object.keys(obj).length > 0;
}
function getScope(options) {
  const scope = getScopeData();
  if (!scope) {
    return {};
  }
  return {
    release: options.release,
    environment: options.environment,
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    ...hasKeys(scope.user) && { user: scope.user },
    ...hasKeys(scope.tags) && { tags: scope.tags },
    ...hasKeys(scope.extra) && { extra: scope.extra }
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  };
}
function getNativeUploaderExtraParams(event) {
  const maxBytes = 20300;
  let buf = Buffer.from(JSON.stringify(event));
  const chunks = [];
  while (buf.length) {
    let i = buf.lastIndexOf(34, maxBytes + 1);
    if (i < 0)
      i = buf.lastIndexOf(32, maxBytes + 1);
    if (i < 0)
      i = buf.indexOf(34, maxBytes);
    if (i < 0)
      i = buf.indexOf(32, maxBytes);
    if (i < 0)
      i = maxBytes;
    chunks.push(buf.subarray(0, i + 1).toString());
    buf = buf.subarray(i + 1);
  }
  return chunks.reduce((acc, cur, i) => {
    acc[`sentry__${i + 1}`] = cur;
    return acc;
  }, {});
}
function minidumpUrlFromDsn(dsn) {
  const dsnComponents = makeDsn(dsn);
  if (!dsnComponents) {
    return void 0;
  }
  const { host, path: path2, projectId, port, protocol: protocol2, publicKey } = dsnComponents;
  return `${protocol2}://${host}${port !== "" ? `:${port}` : ""}${path2 !== "" ? `/${path2}` : ""}/api/${projectId}/minidump/?sentry_key=${publicKey}`;
}
var electronMinidumpIntegration = defineIntegration(() => {
  let updateEpoch = 0;
  async function getNativeUploaderEvent(client, scope) {
    const { sendDefaultPii = false } = client.getOptions();
    const event = mergeEvents(await getEventDefaults(client), {
      sdk: getSdkInfo(sendDefaultPii),
      event_id: uuid4(),
      level: "fatal",
      platform: "native",
      tags: { "event.environment": "native" }
    });
    applyScopeDataToEvent(event, scope);
    delete event.sdkProcessingMetadata;
    return normalizePaths(event, app9.getAppPath());
  }
  function updateExtraParams(client, scope) {
    updateEpoch += 1;
    const currentEpoch = updateEpoch;
    getNativeUploaderEvent(client, scope).then((event) => {
      if (currentEpoch !== updateEpoch) {
        return;
      }
      const mainParams = getNativeUploaderExtraParams(event);
      for (const [key, value] of Object.entries(mainParams)) {
        crashReporter2.addExtraParameter(key, value);
      }
    }).catch((error3) => debug.error(error3));
  }
  function startCrashReporter(options) {
    const submitURL = minidumpUrlFromDsn(options.dsn || "");
    if (!submitURL) {
      debug.log("Invalid DSN. Cannot start Electron crashReporter");
      return;
    }
    const globalExtra = { sentry___initialScope: JSON.stringify(getScope(options)) };
    debug.log("Starting Electron crashReporter");
    crashReporter2.start({
      companyName: "",
      ignoreSystemCrashHandler: true,
      productName: app9.name || app9.getName(),
      submitURL,
      uploadToServer: true,
      compress: true,
      globalExtra
    });
  }
  function setupScopeListener(client) {
    addScopeListener((scope) => {
      updateExtraParams(client, scope);
    });
  }
  return {
    name: "ElectronMinidump",
    setup(client) {
      if (process.mas) {
        return;
      }
      const clientOptions = client.getOptions();
      if (!clientOptions?.dsn) {
        throw new Error("Attempted to enable Electron native crash reporter but no DSN was supplied");
      }
      startCrashReporter(clientOptions);
      app9.on("render-process-gone", (_, __, details) => {
        if (CRASH_REASONS.includes(details.reason)) {
          sessionCrashed();
        }
      });
      setupScopeListener(client);
      unreportedDuringLastSession(crashReporter2.getLastCrashReport()?.date).then((crashed) => {
        return checkPreviousSession(crashed);
      }, debug.error);
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/preload-injection.js
import { app as app10 } from "electron";
import { existsSync } from "fs";
import { isAbsolute as isAbsolute2, resolve as resolve2 } from "path";
import { fileURLToPath } from "url";
function getPreloadPath() {
  try {
    return __require.resolve("../../preload/default.js");
  } catch (_) {
    try {
      const currentDir = fileURLToPath(import.meta.url);
      return resolve2(currentDir, "..", "..", "..", "..", "preload", "default.js");
    } catch (_2) {
    }
  }
  return void 0;
}
var preloadInjectionIntegration = defineIntegration(() => {
  return {
    name: "PreloadInjection",
    setup(client) {
      const options = client.getOptions();
      if ((options.ipcMode & IPCMode.Classic) === 0) {
        return;
      }
      app10.once("ready", () => {
        const path2 = getPreloadPath();
        if (path2 && typeof path2 === "string" && isAbsolute2(path2) && existsSync(path2)) {
          for (const sesh of options.getSessions()) {
            setPreload(sesh, path2);
          }
        } else {
          debug.log("The preload script could not be injected automatically. This is most likely caused by bundling of the main process");
        }
      });
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/main-process-session.js
var mainProcessSessionIntegration = defineIntegration((options = {}) => {
  return {
    name: "MainProcessSession",
    setup() {
      startSession2(!!options.sendOnCreate);
      endSessionOnExit();
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/browser-window-session.js
import { app as app11, BrowserWindow } from "electron";
function focusedWindow() {
  for (const window2 of BrowserWindow.getAllWindows()) {
    if (!window2.isDestroyed() && window2.webContents && !window2.webContents.isDestroyed()) {
      if (window2.isFocused() && window2.isVisible()) {
        return true;
      }
    }
  }
  return false;
}
var browserWindowSessionIntegration = defineIntegration((options = {}) => {
  let _state = { name: "inactive" };
  function windowStateChanged() {
    const hasFocusedWindow = focusedWindow();
    if (hasFocusedWindow) {
      if (_state.name === "inactive") {
        startSession2(true);
      } else if (_state.name === "timeout") {
        clearTimeout(_state.timer);
      }
      _state = { name: "active" };
    } else {
      if (_state.name === "active") {
        const timeout = (options.backgroundTimeoutSeconds ?? 30) * 1e3;
        const timer = setTimeout(() => {
          if (_state.name === "timeout") {
            _state = { name: "inactive" };
            endSession2().catch(() => {
            });
          }
        }, timeout).unref();
        _state = { name: "timeout", timer };
      }
    }
  }
  return {
    name: "BrowserWindowSession",
    setup() {
      app11.on("browser-window-created", (_event, window2) => {
        window2.on("focus", windowStateChanged);
        window2.on("blur", windowStateChanged);
        window2.on("show", windowStateChanged);
        window2.on("hide", windowStateChanged);
        window2.once("closed", () => {
          window2.removeListener("focus", windowStateChanged);
          window2.removeListener("blur", windowStateChanged);
          window2.removeListener("show", windowStateChanged);
          window2.removeListener("hide", windowStateChanged);
        });
      });
      endSessionOnExit();
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/additional-context.js
import { exec } from "node:child_process";
import { app as app12, screen as screen2 } from "electron";
var DEFAULT_OPTIONS2 = {
  screen: true,
  deviceModelManufacturer: false
};
function getWindowsDeviceModelManufacturer() {
  return new Promise((resolve3) => {
    try {
      exec('powershell -NoProfile "Get-CimInstance -ClassName Win32_ComputerSystem | ConvertTo-Json"', (error3, stdout) => {
        if (error3) {
          resolve3({});
        }
        try {
          const details = JSON.parse(stdout);
          if (details.Manufacturer || details.Model) {
            resolve3({
              manufacturer: details.Manufacturer,
              model: details.Model
            });
            return;
          }
        } catch (_) {
        }
        resolve3({});
      });
    } catch (_) {
      resolve3({});
    }
  });
}
function getMacOSDeviceModelManufacturer() {
  return new Promise((resolve3) => {
    try {
      exec("system_profiler SPHardwareDataType -json", (error3, stdout) => {
        if (error3) {
          resolve3({});
        }
        try {
          const details = JSON.parse(stdout.trim());
          if (details.SPHardwareDataType?.[0]?.machine_model) {
            resolve3({
              manufacturer: "Apple",
              model: details.SPHardwareDataType[0].machine_model
            });
            return;
          }
        } catch (_) {
        }
        resolve3({});
      });
    } catch (_) {
      resolve3({});
    }
  });
}
function getDeviceModelManufacturer() {
  if (process.platform === "win32") {
    return getWindowsDeviceModelManufacturer();
  } else if (process.platform === "darwin") {
    return getMacOSDeviceModelManufacturer();
  }
  return Promise.resolve({});
}
var additionalContextIntegration = defineIntegration((userOptions = {}) => {
  const _lazyDeviceContext = {};
  let captureDeviceModelManufacturer = userOptions.deviceModelManufacturer;
  const options = {
    ...DEFAULT_OPTIONS2,
    ...userOptions
  };
  function setPrimaryDisplayInfo() {
    const display = screen2.getPrimaryDisplay();
    const width = Math.floor(display.size.width * display.scaleFactor);
    const height = Math.floor(display.size.height * display.scaleFactor);
    _lazyDeviceContext.screen_density = display.scaleFactor;
    _lazyDeviceContext.screen_resolution = `${width}x${height}`;
  }
  async function setDeviceModelManufacturer() {
    const { manufacturer, model } = await getDeviceModelManufacturer();
    if (manufacturer || model) {
      _lazyDeviceContext.manufacturer = manufacturer;
      _lazyDeviceContext.model = model;
    }
  }
  return {
    name: "AdditionalContext",
    setup() {
      if (!options.screen) {
        return;
      }
      app12.whenReady().then(() => {
        setPrimaryDisplayInfo();
        screen2.on("display-metrics-changed", () => {
          setPrimaryDisplayInfo();
        });
      }, () => {
      });
    },
    processEvent: async (event) => {
      if (captureDeviceModelManufacturer) {
        captureDeviceModelManufacturer = false;
        await setDeviceModelManufacturer();
      }
      return mergeEvents(event, { contexts: { device: _lazyDeviceContext } });
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/net-breadcrumbs.js
import { net } from "electron";
import * as urlModule from "url";
function parseOptions(optionsIn) {
  const { method, options } = typeof optionsIn === "string" ? (
    // eslint-disable-next-line deprecation/deprecation
    { method: "GET", options: urlModule.parse(optionsIn) }
  ) : { method: (optionsIn.method || "GET").toUpperCase(), options: optionsIn };
  let url = "url" in options ? options.url : void 0;
  if (!url) {
    const urlObj = {};
    urlObj.protocol = options.protocol || "http:";
    if (options.host) {
      urlObj.host = options.host;
    } else {
      if (options.hostname) {
        urlObj.hostname = options.hostname;
      } else {
        urlObj.hostname = "localhost";
      }
      if (options.port) {
        urlObj.port = options.port;
      }
    }
    const pathObj = urlModule.parse(options.path || "/");
    urlObj.pathname = pathObj.pathname;
    urlObj.search = pathObj.search;
    urlObj.hash = pathObj.hash;
    url = urlModule.format(urlObj);
  }
  return {
    method,
    url
  };
}
function createWrappedRequestFactory({ tracing, breadcrumbs }, { enableLogs, tracePropagationTargets, propagateTraceparent }) {
  const createSpanUrlMap = new LRUMap(100);
  const headersUrlMap = new LRUMap(100);
  const shouldCreateSpan = (method, url) => {
    if (tracing === void 0) {
      return true;
    }
    if (tracing === false) {
      return false;
    }
    const key = `${method}:${url}`;
    const cachedDecision = createSpanUrlMap.get(key);
    if (cachedDecision !== void 0) {
      return cachedDecision;
    }
    const decision = tracing === true || tracing(method, url);
    createSpanUrlMap.set(key, decision);
    return decision;
  };
  const shouldAttachTraceData = (method, url) => {
    const key = `${method}:${url}`;
    const cachedDecision = headersUrlMap.get(key);
    if (cachedDecision !== void 0) {
      return cachedDecision;
    }
    if (tracePropagationTargets) {
      const decision = stringMatchesSomePattern(url, tracePropagationTargets);
      headersUrlMap.set(key, decision);
      return decision;
    }
    return true;
  };
  const addRequestBreadcrumb2 = (event, method, url, req, res) => {
    const level = getBreadcrumbLogLevelFromHttpStatusCode(res?.statusCode);
    addBreadcrumb({
      type: "http",
      category: "electron.net",
      data: {
        url,
        method,
        status_code: res?.statusCode
      },
      level
    }, {
      event,
      request: req,
      response: res
    });
    if (!enableLogs) {
      return;
    }
    const attributes2 = {
      "sentry.origin": "auto.electron.net",
      statusCode: res?.statusCode
    };
    switch (level) {
      case "error":
        exports_exports.error(exports_exports.fmt`Electron.net request failed: ${method} ${url}`, attributes2);
        break;
      case "warning":
        exports_exports.warn(exports_exports.fmt`Electron.net request warning: ${method} ${url}`, attributes2);
        break;
      default:
        exports_exports.info(exports_exports.fmt`Electron.net request succeeded: ${method} ${url}`, attributes2);
    }
  };
  return function wrappedRequestMethodFactory(originalRequestMethod) {
    return function requestMethod(reqOptions) {
      const { url, method } = parseOptions(reqOptions);
      const request = originalRequestMethod.apply(this, [reqOptions]);
      if (url.match(/sentry_key/) || request.getHeader("x-sentry-auth")) {
        return request;
      }
      const span = shouldCreateSpan(method, url) ? startInactiveSpan({
        name: `${method} ${url}`,
        onlyIfParent: true,
        attributes: {
          url,
          type: "net.request",
          "http.method": method
        },
        op: "http.client"
      }) : new SentryNonRecordingSpan();
      span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, "auto.http.electron.net");
      if (shouldAttachTraceData(method, url)) {
        for (const [key, value] of Object.entries(getTraceData({ span, propagateTraceparent }))) {
          debug.log(`[Tracing] Adding ${key} header ${value} to outgoing request to "${url}": `);
          request.setHeader(key, value);
        }
      }
      return request.once("response", function(res) {
        if (breadcrumbs !== false) {
          addRequestBreadcrumb2("response", method, url, this, res);
        }
        if (res.statusCode) {
          setHttpStatus(span, res.statusCode);
        }
        span.end();
      }).once("error", function(_error) {
        if (breadcrumbs !== false) {
          addRequestBreadcrumb2("error", method, url, this, void 0);
        }
        setHttpStatus(span, 500);
        span.end();
      });
    };
  };
}
var electronNetIntegration = defineIntegration((options = {}) => {
  return {
    name: "ElectronNet",
    setup(client) {
      if (options.breadcrumbs === false && options.tracing === false) {
        return;
      }
      fill(net, "request", createWrappedRequestFactory(options, client.getOptions()));
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/child-process.js
import { app as app13 } from "electron";
var DEFAULT_OPTIONS3 = {
  breadcrumbs: EXIT_REASONS,
  events: ["abnormal-exit", "launch-failed", "integrity-failure"]
};
function getMessageAndSeverity(reason, process2) {
  const message = `'${process2}' process exited with '${reason}'`;
  const messageFmt = exports_exports.fmt`'${process2}' process exited with '${reason}'`;
  switch (reason) {
    case "abnormal-exit":
    case "killed":
      return { message, level: "warning", log: exports_exports.warn, messageFmt };
    case "crashed":
    case "oom":
    case "launch-failed":
    case "integrity-failure":
      return { message, level: "fatal", log: exports_exports.error, messageFmt };
    default:
      return { message, level: "debug", log: exports_exports.info, messageFmt };
  }
}
var childProcessIntegration2 = defineIntegration((userOptions = {}) => {
  const { breadcrumbs, events } = userOptions;
  const nodeIntegration = childProcessIntegration(userOptions);
  const options = {
    breadcrumbs: Array.isArray(breadcrumbs) ? breadcrumbs : breadcrumbs === false ? [] : DEFAULT_OPTIONS3.breadcrumbs,
    events: Array.isArray(events) ? events : events === false ? [] : DEFAULT_OPTIONS3.events
  };
  return {
    name: "ChildProcess",
    setup(client) {
      nodeIntegration.setup?.(client);
      const { breadcrumbs: breadcrumbs2, events: events2 } = options;
      const allReasons = Array.from(/* @__PURE__ */ new Set([...breadcrumbs2, ...events2]));
      if (allReasons.length > 0) {
        const clientOptions = client.getOptions();
        const enableLogs = !!clientOptions?.enableLogs;
        app13.on("child-process-gone", (_, details) => {
          const { reason } = details;
          const { message, level, log: log5, messageFmt } = getMessageAndSeverity(details.reason, details.type);
          if (events2.includes(reason)) {
            captureMessage(message, { level, tags: { "event.process": details.type } });
          }
          if (breadcrumbs2.includes(reason)) {
            addBreadcrumb({
              type: "process",
              category: "child-process",
              message,
              level,
              data: details
            });
            if (enableLogs) {
              log5(messageFmt, {
                "sentry.origin": "auto.electron.child-process",
                exitCode: details.exitCode,
                name: details.name,
                serviceName: details.serviceName
              });
            }
          }
        });
        app13.on("render-process-gone", (_, contents, details) => {
          const { reason } = details;
          const name = clientOptions?.getRendererName?.(contents) || "renderer";
          const { message, level, log: log5, messageFmt } = getMessageAndSeverity(details.reason, name);
          if (events2.includes(reason)) {
            captureMessage(message, level);
          }
          if (breadcrumbs2.includes(reason)) {
            addBreadcrumb({
              type: "process",
              category: "child-process",
              message,
              level,
              data: details
            });
            if (enableLogs) {
              log5(messageFmt, {
                "sentry.origin": "auto.electron.child-process",
                exitCode: details.exitCode
              });
            }
          }
        });
      }
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/screenshots.js
import { BrowserWindow as BrowserWindow2 } from "electron";
var screenshotsIntegration = defineIntegration(() => {
  return {
    name: "Screenshots",
    async processEvent(event, hint, client) {
      const attachScreenshot = !!client.getOptions().attachScreenshot;
      if (!attachScreenshot) {
        return event;
      }
      if (!event.transaction && event.platform !== "native") {
        let count = 1;
        for (const window2 of BrowserWindow2.getAllWindows()) {
          if (!hint.attachments) {
            hint.attachments = [];
          }
          try {
            if (!window2.isDestroyed() && window2.isVisible()) {
              const filename = count === 1 ? "screenshot.png" : `screenshot-${count}.png`;
              const image = await window2.capturePage();
              hint.attachments.push({ filename, data: image.toPNG(), contentType: "image/png" });
              count += 1;
            }
          } catch (e) {
            debug.error("Error capturing screenshot", e);
          }
        }
      }
      return event;
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/renderer-profiling.js
import { app as app14 } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/header-injection.js
function addHeader(responseHeaders = {}, name, value) {
  if (responseHeaders[name]) {
    const existing = responseHeaders[name];
    if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      responseHeaders[name] = [existing, value];
    }
  } else {
    responseHeaders[name] = value;
  }
  return { responseHeaders };
}
function addHeaderToSession(sesh, header, value) {
  sesh.webRequest.onHeadersReceived((details, callback) => {
    callback(addHeader(details.responseHeaders, header, value));
  });
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/renderer-profiling.js
var RENDERER_PROFILES;
function rendererProfileFromIpc(event, profile) {
  if (!RENDERER_PROFILES) {
    return;
  }
  const profile_id = profile.event_id;
  RENDERER_PROFILES.set(profile_id, profile);
  if (event) {
    event.contexts = {
      ...event.contexts,
      // Re-add the profile context which we can later use to find the correct profile
      profile: {
        profile_id
      }
    };
  }
}
var rendererProfilingIntegration = defineIntegration(() => {
  return {
    name: "RendererProfiling",
    setup(client) {
      const options = client.getOptions();
      if (!options.enableRendererProfiling) {
        return;
      }
      RENDERER_PROFILES = new LRUMap(10);
      app14.on("ready", () => {
        options.getSessions().forEach((sesh) => addHeaderToSession(sesh, "Document-Policy", "js-profiling"));
      });
      client.on?.("beforeEnvelope", (envelope) => {
        let profile_id;
        forEachEnvelopeItem(envelope, (item, type) => {
          if (type !== "transaction") {
            return;
          }
          for (let j = 1; j < item.length; j++) {
            const event = item[j];
            if (event?.contexts?.profile?.profile_id) {
              profile_id = event.contexts.profile.profile_id;
              delete event.contexts.profile;
            }
          }
        });
        if (!profile_id) {
          return;
        }
        const profile = RENDERER_PROFILES?.remove(profile_id);
        if (!profile) {
          return;
        }
        normaliseProfile(profile, app14.getAppPath());
        profile.release = options.release || getDefaultReleaseName();
        profile.environment = options.environment || getDefaultEnvironment();
        envelope[1].push([{ type: "profile" }, profile]);
      });
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/normalize-paths.js
import { app as app15 } from "electron";
var normalizePathsIntegration = defineIntegration(() => {
  return {
    name: "NormalizePaths",
    setup: (client) => {
      setImmediate(() => {
        client.on("beforeEnvelope", (envelope) => {
          forEachEnvelopeItem(envelope, (item, type) => {
            if (type === "profile") {
              normaliseProfile(item[1], app15.getAppPath());
            }
          });
        });
      });
    },
    processEvent(event) {
      return normalizePaths(event, app15.getAppPath());
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/electron-context.js
import { app as app16 } from "electron";
function getAppMemory() {
  return app16.getAppMetrics().reduce((acc, metric) => acc + metric.memory.workingSetSize * 1024, 0);
}
var electronContextIntegration = defineIntegration(() => {
  return {
    name: "ElectronContext",
    processEvent(event, _, client) {
      delete event.contexts?.runtime;
      delete event.contexts?.app?.app_memory;
      if (event.request?.headers) {
        delete event.request.headers["User-Agent"];
      }
      const { release: release2 = getDefaultReleaseName(), environment = getDefaultEnvironment() } = client.getOptions();
      return mergeEvents({
        contexts: {
          app: {
            app_name: app16.name || app16.getName(),
            app_version: app16.getVersion(),
            build_type: process.mas ? "app-store" : process.windowsStore ? "windows-store" : void 0,
            app_memory: getAppMemory(),
            app_arch: process.arch
          },
          browser: {
            name: "Chrome"
          },
          chrome: {
            name: "Chrome",
            type: "runtime",
            version: process.versions.chrome
          },
          device: {
            family: "Desktop"
          },
          node: {
            name: "Node",
            type: "runtime",
            version: process.versions.node
          },
          runtime: {
            name: "Electron",
            version: process.versions.electron
          }
        },
        environment,
        release: release2,
        tags: {
          "event.origin": "electron",
          "event.environment": "javascript",
          "event.process": "browser"
        }
      }, event);
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/gpu-context.js
import { app as app17 } from "electron";
function gpuDeviceToGpuContext(device) {
  return {
    name: device.deviceString || "GPU",
    active: device.active,
    id: `0x${device.deviceId.toString(16).padStart(4, "0")}`,
    vendor_id: `0x${device.vendorId.toString(16).padStart(4, "0")}`,
    vendor_name: device.vendorString,
    driver_version: device.driverVersion
  };
}
var gpuContextIntegration = defineIntegration((options = { infoLevel: "basic" }) => {
  let gpuContexts;
  return {
    name: "GpuContext",
    processEvent: async (event) => {
      if (gpuContexts === void 0) {
        const result = await app17.getGPUInfo(options.infoLevel);
        gpuContexts = result.gpuDevice.map(gpuDeviceToGpuContext);
      }
      if (gpuContexts.length === 1) {
        event.contexts = { ...event.contexts, gpu: gpuContexts[0] };
      } else if (gpuContexts.length > 1) {
        event.contexts = { ...event.contexts };
        for (let i = 0; i < gpuContexts.length; i++) {
          const gpuContext = gpuContexts[i];
          gpuContext.type = "gpu";
          event.contexts[`gpu_${i + 1}`] = gpuContext;
        }
      }
      return event;
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/renderer-anr.js
import { powerMonitor as powerMonitor2, app as app19 } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/stack-parse.js
import { app as app18 } from "electron";

// node_modules/.pnpm/@sentry+browser@10.34.0/node_modules/@sentry/browser/build/npm/esm/prod/stack-parsers.js
var CHROME_PRIORITY = 30;
var GECKO_PRIORITY = 50;
function createFrame(filename, func, lineno, colno) {
  const frame = {
    filename,
    function: func === "<anonymous>" ? UNKNOWN_FUNCTION : func,
    in_app: true
    // All browser frames are considered in_app
  };
  if (lineno !== void 0) {
    frame.lineno = lineno;
  }
  if (colno !== void 0) {
    frame.colno = colno;
  }
  return frame;
}
var chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
var chromeRegex = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var chromeDataUriRegex = /at (.+?) ?\(data:(.+?),/;
var chromeStackParserFn = (line) => {
  const dataUriMatch = line.match(chromeDataUriRegex);
  if (dataUriMatch) {
    return {
      filename: `<data:${dataUriMatch[2]}>`,
      function: dataUriMatch[1]
    };
  }
  const noFnParts = chromeRegexNoFnName.exec(line);
  if (noFnParts) {
    const [, filename, line2, col] = noFnParts;
    return createFrame(filename, UNKNOWN_FUNCTION, +line2, +col);
  }
  const parts = chromeRegex.exec(line);
  if (parts) {
    const isEval = parts[2] && parts[2].indexOf("eval") === 0;
    if (isEval) {
      const subMatch = chromeEvalRegex.exec(parts[2]);
      if (subMatch) {
        parts[2] = subMatch[1];
        parts[3] = subMatch[2];
        parts[4] = subMatch[3];
      }
    }
    const [func, filename] = extractSafariExtensionDetails(parts[1] || UNKNOWN_FUNCTION, parts[2]);
    return createFrame(filename, func, parts[3] ? +parts[3] : void 0, parts[4] ? +parts[4] : void 0);
  }
  return;
};
var chromeStackLineParser = [CHROME_PRIORITY, chromeStackParserFn];
var geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var gecko = (line) => {
  const parts = geckoREgex.exec(line);
  if (parts) {
    const isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
    if (isEval) {
      const subMatch = geckoEvalRegex.exec(parts[3]);
      if (subMatch) {
        parts[1] = parts[1] || "eval";
        parts[3] = subMatch[1];
        parts[4] = subMatch[2];
        parts[5] = "";
      }
    }
    let filename = parts[3];
    let func = parts[1] || UNKNOWN_FUNCTION;
    [func, filename] = extractSafariExtensionDetails(func, filename);
    return createFrame(filename, func, parts[4] ? +parts[4] : void 0, parts[5] ? +parts[5] : void 0);
  }
  return;
};
var geckoStackLineParser = [GECKO_PRIORITY, gecko];
var defaultStackLineParsers = [chromeStackLineParser, geckoStackLineParser];
var defaultStackParser2 = createStackParser(...defaultStackLineParsers);
var extractSafariExtensionDetails = (func, filename) => {
  const isSafariExtension = func.indexOf("safari-extension") !== -1;
  const isSafariWebExtension = func.indexOf("safari-web-extension") !== -1;
  return isSafariExtension || isSafariWebExtension ? [
    func.indexOf("@") !== -1 ? func.split("@")[0] : UNKNOWN_FUNCTION,
    isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`
  ] : [func, filename];
};

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/renderer/stack-parse.js
var STACKTRACE_FRAME_LIMIT2 = 50;
var [, chrome] = chromeStackLineParser;
var [, node2] = nodeStackLineParser();
var electronRendererStackParser = (stack, skipFirst = 0) => {
  const frames = [];
  for (const line of stack.split("\n").slice(skipFirst)) {
    const chromeFrame = chrome(line);
    const nodeFrame = node2(line);
    if (chromeFrame && nodeFrame?.in_app !== false) {
      frames.push(chromeFrame);
    } else if (nodeFrame) {
      if (nodeFrame.module === void 0) {
        delete nodeFrame.module;
      }
      frames.push(nodeFrame);
    }
    if (frames.length >= STACKTRACE_FRAME_LIMIT2) {
      break;
    }
  }
  return stripSentryFramesAndReverse(frames);
};

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/stack-parse.js
var defaultStackParser3 = createStackParser(nodeStackLineParser(createGetModuleFromFilename(app18.getAppPath())));
async function captureRendererStackFrames(webContents2) {
  if (ELECTRON_MAJOR_VERSION < 34) {
    throw new Error("Electron >= 34 required to capture stack frames via `frame.collectJavaScriptCallStack()`");
  }
  if (webContents2.isDestroyed()) {
    return void 0;
  }
  const frame = webContents2.mainFrame;
  const stack = await frame.collectJavaScriptCallStack();
  if (!stack) {
    return void 0;
  }
  if (stack.includes("Website owner has not opted in")) {
    debug.warn("Could not collect renderer stack frames.\nA 'Document-Policy' header of 'include-js-call-stacks-in-crash-reports' must be set");
    return void 0;
  }
  return electronRendererStackParser(stack);
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/renderer-anr.js
function log3(message, ...args) {
  debug.log(`[Renderer Event Loop Block] ${message}`, ...args);
}
function nativeStackTraceCapture(contents, pausedStack) {
  return () => {
    captureRendererStackFrames(contents).then((frames) => {
      if (frames) {
        pausedStack(frames);
      }
    }).catch(() => {
    });
  };
}
function debuggerStackTraceCapture(contents, pausedStack) {
  log3("Connecting to debugger");
  contents.debugger.attach("1.3");
  const scripts = /* @__PURE__ */ new Map();
  const getModuleFromFilename2 = createGetModuleFromFilename(app19.getAppPath());
  contents.debugger.on("message", (_, method, params) => {
    if (method === "Debugger.scriptParsed") {
      const param = params;
      scripts.set(param.scriptId, param.url);
    } else if (method === "Debugger.paused") {
      const param = params;
      if (param.reason !== "other") {
        return;
      }
      const callFrames = [...param.callFrames];
      contents.debugger.sendCommand("Debugger.resume").then(null, () => {
      });
      const stackFrames = stripSentryFramesAndReverse(callFrames.map((frame) => callFrameToStackFrame(frame, scripts.get(frame.location.scriptId), getModuleFromFilename2)));
      pausedStack(stackFrames);
    }
  });
  contents.debugger.sendCommand("Debugger.enable").catch(() => {
  });
  return () => {
    if (contents.isDestroyed()) {
      return;
    }
    log3("Pausing debugger to capture stack trace");
    return contents.debugger.sendCommand("Debugger.pause");
  };
}
function createHrTimer() {
  let lastPoll = process.hrtime();
  return {
    getTimeMs: () => {
      const [seconds, nanoSeconds] = process.hrtime(lastPoll);
      return Math.floor(seconds * 1e3 + nanoSeconds / 1e6);
    },
    reset: () => {
      lastPoll = process.hrtime();
    }
  };
}
var INTEGRATION_NAME11 = "RendererEventLoopBlock";
var rendererEventLoopBlockIntegration = defineIntegration((options = {}) => {
  const rendererWatchdogTimers = /* @__PURE__ */ new Map();
  let clientOptions;
  function getRendererName(contents) {
    return clientOptions?.getRendererName?.(contents);
  }
  function sendRendererEventLoopBlockEvent(contents, blockedMs, frames) {
    sessionAnr();
    const rendererName = getRendererName(contents) || "renderer";
    const event = {
      level: "error",
      exception: {
        values: [
          {
            type: "ApplicationNotResponding",
            value: `Application Not Responding for at least ${blockedMs} ms`,
            stacktrace: { frames },
            mechanism: {
              // This ensures the UI doesn't say 'Crashed in' for the stack trace
              type: "ANR"
            }
          }
        ]
      },
      tags: {
        "event.process": rendererName
      }
    };
    captureEvent(event);
  }
  return {
    name: INTEGRATION_NAME11,
    setup: (client) => {
      clientOptions = client.getOptions();
      if (ELECTRON_MAJOR_VERSION >= 34) {
        app19.commandLine.appendSwitch("enable-features", "DocumentPolicyIncludeJSCallStacksInCrashReports");
        if (options.captureNativeStacktrace) {
          app19.on("ready", () => {
            clientOptions?.getSessions().forEach((sesh) => addHeaderToSession(sesh, "Document-Policy", "include-js-call-stacks-in-crash-reports"));
          });
        }
      }
    },
    createRendererEventLoopBlockStatusHandler: () => {
      return (message, contents) => {
        let watchdog = rendererWatchdogTimers.get(contents);
        function disable2() {
          watchdog?.enabled(false);
        }
        function enable2() {
          watchdog?.enabled(true);
        }
        if (watchdog === void 0) {
          log3("Renderer sent first status message", message.config);
          let pauseAndCapture;
          if (message.config.captureStackTrace) {
            const stackCaptureImpl = options.captureNativeStacktrace && ELECTRON_MAJOR_VERSION >= 34 ? nativeStackTraceCapture : debuggerStackTraceCapture;
            pauseAndCapture = stackCaptureImpl(contents, (frames) => {
              log3("Event captured with stack frames");
              sendRendererEventLoopBlockEvent(contents, message.config.anrThreshold, frames);
            });
          }
          watchdog = watchdogTimer(createHrTimer, 100, message.config.anrThreshold, async () => {
            log3("Watchdog timeout");
            if (pauseAndCapture) {
              pauseAndCapture();
            } else {
              log3("Capturing event");
              sendRendererEventLoopBlockEvent(contents, message.config.anrThreshold);
            }
          });
          contents.once("destroyed", () => {
            rendererWatchdogTimers?.delete(contents);
            powerMonitor2.off("suspend", disable2);
            powerMonitor2.off("resume", enable2);
            powerMonitor2.off("lock-screen", disable2);
            powerMonitor2.off("unlock-screen", enable2);
          });
          contents.once("blur", disable2);
          contents.once("focus", enable2);
          powerMonitor2.on("suspend", disable2);
          powerMonitor2.on("resume", enable2);
          powerMonitor2.on("lock-screen", disable2);
          powerMonitor2.on("unlock-screen", enable2);
          rendererWatchdogTimers.set(contents, watchdog);
        }
        watchdog.poll();
        if (message.status !== "alive") {
          log3(`Renderer visibility changed '${message.status}'`);
          watchdog.enabled(message.status === "visible");
        }
      };
    }
  };
});
function createRendererEventLoopBlockStatusHandler(client) {
  const integration = client.getIntegrationByName(INTEGRATION_NAME11);
  return integration?.createRendererEventLoopBlockStatusHandler();
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/startup-tracing.js
import { app as app21 } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/ipc.js
import { EventEmitter } from "node:events";
import { app as app20, protocol, ipcMain, webContents } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/common/envelope.js
function eventFromEnvelope(envelope) {
  let event;
  const attachments = [];
  let profile;
  forEachEnvelopeItem(envelope, (item, type) => {
    if (type === "event" || type === "transaction" || type === "feedback") {
      event = Array.isArray(item) ? item[1] : void 0;
    } else if (type === "attachment") {
      const [headers, data] = item;
      attachments.push({
        filename: headers.filename,
        attachmentType: headers.attachment_type,
        contentType: headers.content_type,
        data
      });
    } else if (type === "profile") {
      profile = item[1];
    }
  });
  return event ? [event, attachments, profile] : void 0;
}
function profileChunkFromEnvelope(envelope) {
  let profileChunk;
  forEachEnvelopeItem(envelope, (item, type) => {
    if (type === "profile_chunk") {
      profileChunk = item[1];
    }
  });
  return profileChunk;
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/log.js
async function getAttributes(client) {
  const contextIntegration = client.getIntegrationByName("Context");
  const additionalContextIntegration2 = client.getIntegrationByName("AdditionalContext");
  let event = {};
  const hint = {};
  event = await contextIntegration?.processEvent?.(event, hint, client) || event;
  event = await additionalContextIntegration2?.processEvent?.(event, hint, client) || event;
  const attrs = {};
  if (event.contexts?.os?.name) {
    attrs["os.name"] = event.contexts.os.name;
  }
  if (event.contexts?.os?.version) {
    attrs["os.version"] = event.contexts.os.version;
  }
  if (event.contexts?.device?.brand) {
    attrs["device.brand"] = event.contexts.device.brand;
  }
  if (event.contexts?.device?.model) {
    attrs["device.model"] = event.contexts.device.model;
  }
  if (event.contexts?.device?.family) {
    attrs["device.family"] = event.contexts.device.family;
  }
  return attrs;
}
var attributes;
function getOsDeviceLogAttributes(client) {
  if (attributes === void 0) {
    attributes = {};
    getAttributes(client).then((attrs) => {
      attributes = attrs;
    }).catch(() => {
    });
  }
  return attributes || {};
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/ipc.js
var ipcMainHooks = new EventEmitter();
var KNOWN_RENDERERS;
var WINDOW_ID_TO_WEB_CONTENTS;
function newProtocolRenderer() {
  KNOWN_RENDERERS = KNOWN_RENDERERS || /* @__PURE__ */ new Set();
  WINDOW_ID_TO_WEB_CONTENTS = WINDOW_ID_TO_WEB_CONTENTS || /* @__PURE__ */ new Map();
  for (const wc of webContents.getAllWebContents()) {
    const wcId = wc.id;
    if (KNOWN_RENDERERS.has(wcId)) {
      continue;
    }
    if (!wc.isDestroyed()) {
      wc.executeJavaScript("window.__SENTRY_RENDERER_ID__").then((windowId) => {
        if (windowId && KNOWN_RENDERERS && WINDOW_ID_TO_WEB_CONTENTS) {
          KNOWN_RENDERERS.add(wcId);
          WINDOW_ID_TO_WEB_CONTENTS.set(windowId, wcId);
          wc.once("destroyed", () => {
            KNOWN_RENDERERS?.delete(wcId);
            WINDOW_ID_TO_WEB_CONTENTS?.delete(windowId);
          });
        }
      }, debug.error);
    }
  }
}
function captureEventFromRenderer(options, event, dynamicSamplingContext, attachments, contents) {
  const process2 = contents ? options?.getRendererName?.(contents) || "renderer" : "renderer";
  event.breadcrumbs = event.breadcrumbs || [];
  delete event.environment;
  delete event.sdk?.name;
  delete event.sdk?.version;
  delete event.sdk?.packages;
  if (dynamicSamplingContext) {
    event.sdkProcessingMetadata = { ...event.sdkProcessingMetadata, dynamicSamplingContext };
  }
  captureEvent(mergeEvents(event, { tags: { "event.process": process2 } }), { attachments });
}
var cached_public_key;
function handleEnvelope(client, options, env, contents) {
  const envelope = parseEnvelope(env);
  const [envelopeHeader] = envelope;
  const dynamicSamplingContext = envelopeHeader.trace;
  if (dynamicSamplingContext) {
    if (!cached_public_key) {
      const dsn = client.getDsn();
      cached_public_key = dsn?.publicKey;
    }
    dynamicSamplingContext.release = options.release;
    dynamicSamplingContext.environment = options.environment;
    dynamicSamplingContext.public_key = cached_public_key;
  }
  const eventAndAttachments = eventFromEnvelope(envelope);
  if (eventAndAttachments) {
    const [event, attachments, profile] = eventAndAttachments;
    if (profile) {
      rendererProfileFromIpc(event, profile);
    }
    if (ipcMainHooks.listenerCount("pageload-transaction") > 0 && event.type === "transaction" && event.contexts?.trace?.origin === "auto.pageload.browser") {
      ipcMainHooks.emit("pageload-transaction", event, contents);
      return;
    }
    captureEventFromRenderer(options, event, dynamicSamplingContext, attachments, contents);
  } else {
    const profileChunk = profileChunkFromEnvelope(envelope);
    if (profileChunk) {
      const normalizedEnvelope = normalizeProfileChunkEnvelope(options, envelope, app20.getAppPath());
      void getClient()?.getTransport()?.send(normalizedEnvelope);
    } else {
      const normalizedEnvelope = normalizeReplayEnvelope(options, envelope, app20.getAppPath());
      void getClient()?.getTransport()?.send(normalizedEnvelope);
    }
  }
}
function hasKeys2(obj) {
  return obj != void 0 && Object.keys(obj).length > 0;
}
function handleScope(options, jsonScope) {
  let sentScope;
  try {
    sentScope = JSON.parse(jsonScope);
  } catch {
    debug.warn("sentry-electron received an invalid scope message");
    return;
  }
  const scope = getCurrentScope();
  if (hasKeys2(sentScope.user)) {
    scope.setUser(sentScope.user);
  }
  if (hasKeys2(sentScope.tags)) {
    scope.setTags(sentScope.tags);
  }
  if (hasKeys2(sentScope.extra)) {
    scope.setExtras(sentScope.extra);
  }
  for (const attachment of sentScope.attachments || []) {
    scope.addAttachment(attachment);
  }
  const breadcrumb = sentScope.breadcrumbs.pop();
  if (breadcrumb) {
    scope.addBreadcrumb(breadcrumb, options?.maxBreadcrumbs || 100);
  }
}
function handleAttributes(client, options, contents, maybeAttributes) {
  const process2 = contents ? options?.getRendererName?.(contents) || "renderer" : "renderer";
  const attributes2 = maybeAttributes || {};
  if (options.release) {
    attributes2["sentry.release"] = { value: options.release, type: "string" };
  }
  if (options.environment) {
    attributes2["sentry.environment"] = { value: options.environment, type: "string" };
  }
  attributes2["sentry.sdk.name"] = { value: "sentry.javascript.electron", type: "string" };
  attributes2["sentry.sdk.version"] = { value: SDK_VERSION2, type: "string" };
  attributes2["electron.process"] = { value: process2, type: "string" };
  const osDeviceAttributes = getOsDeviceLogAttributes(client);
  if (osDeviceAttributes["os.name"]) {
    attributes2["os.name"] = { value: osDeviceAttributes["os.name"], type: "string" };
  }
  if (osDeviceAttributes["os.version"]) {
    attributes2["os.version"] = { value: osDeviceAttributes["os.version"], type: "string" };
  }
  if (osDeviceAttributes["device.brand"]) {
    attributes2["device.brand"] = { value: osDeviceAttributes["device.brand"], type: "string" };
  }
  if (osDeviceAttributes["device.model"]) {
    attributes2["device.model"] = { value: osDeviceAttributes["device.model"], type: "string" };
  }
  if (osDeviceAttributes["device.family"]) {
    attributes2["device.family"] = { value: osDeviceAttributes["device.family"], type: "string" };
  }
  return attributes2;
}
function handleLogFromRenderer(client, options, log5, contents) {
  log5.attributes = handleAttributes(client, options, contents, log5.attributes);
  _INTERNAL_captureSerializedLog(client, log5);
}
function handleMetricFromRenderer(client, options, metric, contents) {
  metric.attributes = handleAttributes(client, options, contents, metric.attributes);
  _INTERNAL_captureSerializedMetric(client, metric);
}
function configureProtocol(client, ipcUtil, options) {
  if (app20.isReady()) {
    throw new Error("Sentry SDK should be initialized before the Electron app 'ready' event is fired");
  }
  const scheme = {
    scheme: ipcUtil.namespace,
    privileges: { bypassCSP: true, corsEnabled: true, supportFetchAPI: true, secure: true }
  };
  protocol.registerSchemesAsPrivileged([scheme]);
  protocol.registerSchemesAsPrivileged = new Proxy(protocol.registerSchemesAsPrivileged, {
    apply: (target, __, args) => {
      target([...args[0], scheme]);
    }
  });
  const rendererStatusChanged = createRendererEventLoopBlockStatusHandler(client);
  app20.whenReady().then(() => {
    for (const sesh of options.getSessions()) {
      registerProtocol(sesh.protocol, ipcUtil.namespace, (request) => {
        const getWebContents = () => {
          const webContentsId = request.windowId ? WINDOW_ID_TO_WEB_CONTENTS?.get(request.windowId) : void 0;
          return webContentsId ? webContents.fromId(webContentsId) : void 0;
        };
        const data = request.body;
        if (ipcUtil.urlMatches(request.url, "start")) {
          newProtocolRenderer();
        } else if (ipcUtil.urlMatches(request.url, "scope") && data) {
          handleScope(options, data.toString());
        } else if (ipcUtil.urlMatches(request.url, "envelope") && data) {
          handleEnvelope(client, options, data, getWebContents());
        } else if (ipcUtil.urlMatches(request.url, "structured-log") && data) {
          handleLogFromRenderer(client, options, JSON.parse(data.toString()), getWebContents());
        } else if (ipcUtil.urlMatches(request.url, "metric") && data) {
          handleMetricFromRenderer(client, options, JSON.parse(data.toString()), getWebContents());
        } else if (rendererStatusChanged && ipcUtil.urlMatches(request.url, "status") && data) {
          const contents = getWebContents();
          if (contents) {
            const status = JSON.parse(data.toString()).status;
            rendererStatusChanged(status, contents);
          }
        }
      });
    }
  }).catch((error3) => debug.error(error3));
}
function configureClassic(client, ipcUtil, options) {
  ipcMain.on(ipcUtil.createKey("start"), ({ sender }) => {
    const id = sender.id;
    KNOWN_RENDERERS = KNOWN_RENDERERS || /* @__PURE__ */ new Set();
    if (KNOWN_RENDERERS.has(id)) {
      return;
    }
    if (!sender.isDestroyed()) {
      KNOWN_RENDERERS.add(id);
      sender.once("destroyed", () => {
        KNOWN_RENDERERS?.delete(id);
      });
    }
  });
  ipcMain.on(ipcUtil.createKey("scope"), (_, jsonScope) => handleScope(options, jsonScope));
  ipcMain.on(ipcUtil.createKey("envelope"), ({ sender }, env) => handleEnvelope(client, options, env, sender));
  ipcMain.on(ipcUtil.createKey("structured-log"), ({ sender }, log5) => handleLogFromRenderer(client, options, log5, sender));
  ipcMain.on(ipcUtil.createKey("metric"), ({ sender }, metric) => handleMetricFromRenderer(client, options, metric, sender));
  const rendererStatusChanged = createRendererEventLoopBlockStatusHandler(client);
  if (rendererStatusChanged) {
    ipcMain.on(ipcUtil.createKey("status"), ({ sender }, status) => rendererStatusChanged(status, sender));
  }
}
function configureIPC(client, options) {
  const ipcUtil = ipcChannelUtils(options.ipcNamespace);
  if ((options.ipcMode & IPCMode.Protocol) > 0) {
    configureProtocol(client, ipcUtil, options);
  }
  if ((options.ipcMode & IPCMode.Classic) > 0) {
    configureClassic(client, ipcUtil, options);
  }
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/integrations/startup-tracing.js
var cachedRootTransaction;
function rootTransaction() {
  if (!cachedRootTransaction) {
    const uptimeMs = process.uptime() * 1e3;
    const startTime = (Date.now() - uptimeMs) / 1e3;
    startSpanManual({
      name: "Startup",
      op: "app.start",
      startTime,
      attributes: {
        [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.electron.startup"
      },
      forceTransaction: true
    }, (root) => {
      cachedRootTransaction = root;
    });
  }
  return cachedRootTransaction;
}
function zeroLengthSpan(options) {
  const startTime = timestampInSeconds();
  startSpanManual({
    ...options,
    attributes: {
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.electron.startup",
      ...options.attributes
    },
    parentSpan: options.parentSpan || rootTransaction(),
    startTime
  }, (span) => {
    span.end(startTime * 1e3);
  });
}
function waitForRendererPageload(timeout) {
  return new Promise((resolve3) => {
    const timer = setTimeout(() => {
      resolve3(void 0);
    }, timeout);
    ipcMainHooks.once("pageload-transaction", (event, _contents) => {
      clearTimeout(timer);
      resolve3(event);
    });
  });
}
function parseStatus(status) {
  if (status === "ok") {
    return { code: 1 };
  }
  return { code: 2, message: status };
}
function applyRendererSpansAndMeasurements(parentSpan, event, endTimestamp) {
  let lastEndTimestamp = endTimestamp;
  if (!event) {
    return lastEndTimestamp;
  }
  const rendererStartTime = event.start_timestamp || event.timestamp;
  parentSpan.setAttribute("performance.timeOrigin", rendererStartTime);
  startSpanManual({
    name: event.transaction || "electron.renderer",
    op: "electron.renderer",
    startTime: rendererStartTime,
    parentSpan,
    attributes: {
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.electron.startup"
    }
  }, (rendererSpan) => {
    if (event?.spans?.length) {
      for (const spanJson of event.spans) {
        const startTime = spanJson.start_timestamp;
        const endTime = spanJson.timestamp;
        if (endTime) {
          lastEndTimestamp = Math.max(lastEndTimestamp, endTime);
        }
        startSpanManual({
          name: spanJson.description || "electron.renderer",
          op: spanJson.op,
          startTime,
          attributes: spanJson.data,
          parentSpan: rendererSpan
        }, (span) => {
          if (spanJson.status) {
            span.setStatus(parseStatus(spanJson.status));
          }
          span.end((endTime || startTime) * 1e3);
        });
      }
    }
    rendererSpan.end(lastEndTimestamp * 1e3);
  });
  if (event.measurements) {
    for (const [name, measurement] of Object.entries(event.measurements)) {
      setMeasurement(name, measurement.value, measurement.unit, parentSpan);
    }
  }
  if (event.contexts?.trace?.data) {
    for (const [key, value] of Object.entries(event.contexts.trace.data)) {
      if (!["sentry.op", "sentry.origin", "performance.timeOrigin"].includes(key)) {
        parentSpan.setAttribute(key, value);
      }
    }
  }
  return lastEndTimestamp;
}
var startupTracingIntegration = defineIntegration((options = {}) => {
  return {
    name: "StartupTracing",
    setup() {
      const fallbackTimeout = setTimeout(() => {
        const transaction = rootTransaction();
        transaction.setStatus({ code: 2, message: "Timeout exceeded" });
        transaction.end();
      }, (options.timeoutSeconds || 10) * 1e3);
      app21.once("will-finish-launching", () => {
        zeroLengthSpan({
          name: "will-finish-launching",
          op: "electron.will-finish-launching"
        });
      });
      app21.once("ready", () => {
        zeroLengthSpan({
          name: "ready",
          op: "electron.ready"
        });
      });
      app21.once("web-contents-created", (_, webContents2) => {
        zeroLengthSpan({
          name: "web-contents-created",
          op: "electron.web-contents.created"
        });
        webContents2.once("dom-ready", async () => {
          clearTimeout(fallbackTimeout);
          const parentSpan = rootTransaction();
          zeroLengthSpan({
            name: "dom-ready",
            op: "electron.web-contents.dom-ready"
          });
          let lastEndTimestamp = timestampInSeconds();
          const event = await waitForRendererPageload((options.timeoutSeconds || 10) * 1e3);
          lastEndTimestamp = applyRendererSpansAndMeasurements(parentSpan, event, lastEndTimestamp);
          parentSpan.end(lastEndTimestamp * 1e3);
        });
      });
    }
  };
});

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/transports/electron-net.js
import { app as app22, net as net2 } from "electron";
import { Readable } from "stream";
import { URL as URL2 } from "url";
import { createGzip } from "zlib";
var GZIP_THRESHOLD = 1024 * 32;
function streamFromBody(body) {
  return new Readable({
    read() {
      this.push(body);
      this.push(null);
    }
  });
}
function getRequestOptions(url) {
  const { hostname: hostname2, pathname, port, protocol: protocol2, search } = new URL2(url);
  return {
    method: "POST",
    hostname: hostname2,
    path: `${pathname}${search}`,
    port: parseInt(port, 10),
    protocol: protocol2
  };
}
function makeElectronTransport(options) {
  return createTransport(options, createElectronNetRequestExecutor(options.url, options.headers || {}));
}
function createElectronNetRequestExecutor(url, baseHeaders) {
  baseHeaders["Content-Type"] = "application/x-sentry-envelope";
  return function makeRequest(request) {
    return app22.whenReady().then(() => new Promise((resolve3, reject) => {
      let bodyStream = streamFromBody(request.body);
      const headers = { ...baseHeaders };
      if (request.body.length > GZIP_THRESHOLD) {
        headers["content-encoding"] = "gzip";
        bodyStream = bodyStream.pipe(createGzip());
      }
      const req = net2.request(getRequestOptions(url));
      for (const [header, value] of Object.entries(headers)) {
        req.setHeader(header, value);
      }
      req.on("response", (res) => {
        res.on("error", reject);
        res.on("data", () => {
        });
        res.on("end", () => {
        });
        const retryAfterHeader = res.headers["retry-after"] ?? null;
        const rateLimitsHeader = res.headers["x-sentry-rate-limits"] ?? null;
        resolve3({
          statusCode: res.statusCode,
          headers: {
            "retry-after": Array.isArray(retryAfterHeader) ? retryAfterHeader[0] || null : retryAfterHeader,
            "x-sentry-rate-limits": Array.isArray(rateLimitsHeader) ? rateLimitsHeader[0] || null : rateLimitsHeader
          }
        });
      });
      req.on("error", reject);
      bodyStream.pipe(req);
    }));
  };
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/transports/offline-store.js
import { promises as promises3 } from "fs";
import { join as join6 } from "path";
var MILLISECONDS_PER_DAY = 864e5;
function isOutdated(request, maxAgeDays) {
  const cutOff = Date.now() - MILLISECONDS_PER_DAY * maxAgeDays;
  return (request?.date?.getTime() || 0) < cutOff;
}
function getSentAtFromEnvelope(envelope) {
  const header = envelope[0];
  if (typeof header.sent_at === "string") {
    return new Date(header.sent_at);
  }
  return void 0;
}
function createOfflineStore(userOptions) {
  function log5(...args) {
    debug.log("[Offline Store]:", ...args);
  }
  const options = {
    maxAgeDays: userOptions.maxAgeDays || 30,
    maxQueueSize: userOptions.maxQueueSize || 30,
    queuePath: userOptions.queuePath || join6(getSentryCachePath(), "queue")
  };
  const queue = new Store(options.queuePath, "queue-v2", []);
  function removeBody(id) {
    promises3.unlink(join6(options.queuePath, id)).catch(() => {
    });
  }
  function removeStaleRequests(queue2) {
    while (queue2[0] && isOutdated(queue2[0], options.maxAgeDays)) {
      const removed = queue2.shift();
      log5("Removing stale envelope", removed);
      removeBody(removed.id);
    }
  }
  async function insert(env, which, previousDate) {
    log5(`${which}ing envelope into offline storage`);
    const id = uuid4();
    try {
      const data = serializeEnvelope(env);
      await promises3.mkdir(options.queuePath, { recursive: true });
      await promises3.writeFile(join6(options.queuePath, id), data);
    } catch (e) {
      log5("Failed to save", e);
    }
    await queue.update((queue2) => {
      if (which === "push") {
        removeStaleRequests(queue2);
        if (queue2.length >= options.maxQueueSize) {
          removeBody(id);
          return queue2;
        }
      }
      queue2[which]({ id, date: previousDate || getSentAtFromEnvelope(env) || /* @__PURE__ */ new Date() });
      return queue2;
    });
  }
  let lastShiftedDate;
  return {
    push: async (env) => {
      await insert(env, "push");
    },
    unshift: async (env) => {
      await insert(env, "unshift", lastShiftedDate);
    },
    shift: async () => {
      log5("Popping envelope from offline storage");
      let request;
      await queue.update((queue2) => {
        removeStaleRequests(queue2);
        request = queue2.shift();
        return queue2;
      });
      if (request) {
        try {
          const data = await promises3.readFile(join6(options.queuePath, request.id));
          removeBody(request.id);
          lastShiftedDate = request.date;
          return parseEnvelope(data);
        } catch (e) {
          log5("Failed to read", e);
        }
      }
      return void 0;
    }
  };
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/transports/electron-offline-net.js
function makeElectronOfflineTransport(baseTransport = makeElectronTransport) {
  return (userOptions) => {
    return makeOfflineTransport(baseTransport)({
      flushAtStartup: true,
      createStore: createOfflineStore,
      ...userOptions
    });
  };
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/sdk.js
import { session } from "electron";

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/utility-processes.js
import * as electron from "electron";
function log4(message) {
  debug.log(`[Utility Process] ${message}`);
}
function configureUtilityProcessIPC() {
  if (!electron.utilityProcess?.fork) {
    return;
  }
  electron.utilityProcess.fork = new Proxy(electron.utilityProcess.fork, {
    apply: (target, thisArg, args) => {
      const child = target.apply(thisArg, args);
      function getProcessName() {
        const [, , options] = args;
        return options?.serviceName || `pid:${child.pid}`;
      }
      child.on("message", (msg) => {
        if (isMagicMessage(msg)) {
          log4(`SDK started in utility process '${getProcessName()}'`);
          const { port1, port2 } = new electron.MessageChannelMain();
          port2.on("message", (msg2) => {
            if (msg2.data instanceof Uint8Array || typeof msg2.data === "string") {
              handleEnvelopeFromUtility(msg2.data);
            }
          });
          port2.start();
          child.postMessage(getMagicMessage(), [port1]);
        }
      });
      child.on = new Proxy(child.on, {
        apply: (target2, thisArg2, [event, listener]) => {
          if (event === "message") {
            return target2.apply(thisArg2, [
              "message",
              (msg) => {
                if (isMagicMessage(msg)) {
                  return;
                }
                return listener(msg);
              }
            ]);
          }
          return target2.apply(thisArg2, [event, listener]);
        }
      });
      return child;
    }
  });
}
function handleEnvelopeFromUtility(env) {
  const envelope = parseEnvelope(env);
  const eventAndAttachments = eventFromEnvelope(envelope);
  if (eventAndAttachments) {
    const [event, attachments] = eventAndAttachments;
    captureEventFromUtility(event, attachments);
  } else {
    void getClient()?.getTransport()?.send(envelope);
  }
}
function captureEventFromUtility(event, attachments) {
  delete event.environment;
  delete event.release;
  delete event.sdk?.name;
  delete event.sdk?.version;
  delete event.sdk?.packages;
  captureEvent(mergeEvents(event, { tags: { "event.process": "utility" } }), { attachments });
}

// node_modules/.pnpm/@sentry+electron@7.6.0/node_modules/@sentry/electron/esm/main/sdk.js
function getDefaultIntegrations(options) {
  const integrations = [
    // Electron integrations
    sentryMinidumpIntegration(),
    electronBreadcrumbsIntegration(),
    electronNetIntegration(),
    electronContextIntegration(),
    childProcessIntegration2(),
    onUncaughtExceptionIntegration2(),
    preloadInjectionIntegration(),
    additionalContextIntegration(),
    screenshotsIntegration(),
    gpuContextIntegration(),
    rendererEventLoopBlockIntegration(),
    // Main process sessions
    mainProcessSessionIntegration(),
    // Node integrations
    eventFiltersIntegration(),
    functionToStringIntegration(),
    linkedErrorsIntegration(),
    consoleIntegration(),
    nativeNodeFetchIntegration(),
    onUnhandledRejectionIntegration(),
    contextLinesIntegration(),
    localVariablesIntegration(),
    nodeContextIntegration({ cloudResource: false }),
    // We want paths to be normailzed after we've captured context
    normalizePathsIntegration()
  ];
  if (options.attachScreenshot) {
    integrations.push(screenshotsIntegration());
  }
  if (options.enableRendererProfiling) {
    integrations.push(rendererProfilingIntegration());
  }
  return integrations;
}
function init(userOptions) {
  const [major2 = 0] = process.versions.electron.split(".").map(Number);
  if (major2 < 23) {
    throw new Error("Sentry Electron SDK requires Electron 23 or higher");
  }
  const optionsWithDefaults = {
    _metadata: { sdk: getSdkInfo(!!userOptions.sendDefaultPii) },
    ipcMode: IPCMode.Both,
    ipcNamespace: "sentry-ipc",
    release: getDefaultReleaseName(),
    environment: getDefaultEnvironment(),
    defaultIntegrations: getDefaultIntegrations(userOptions),
    transport: makeElectronOfflineTransport(),
    transportOptions: {},
    getSessions: () => [session.defaultSession],
    ...userOptions,
    stackParser: stackParserFromStackParserOptions(userOptions.stackParser || defaultStackParser3),
    includeServerName: false
  };
  const options = {
    ...optionsWithDefaults,
    integrations: getIntegrationsToSetup(optionsWithDefaults)
  };
  if (options.debug) {
    debug.enable();
  }
  removeRedundantIntegrations(options);
  configureUtilityProcessIPC();
  setOpenTelemetryContextAsyncContextStrategy();
  const scope = getCurrentScope();
  scope.update(options.initialScope);
  const client = new NodeClient(options);
  if (options.sendDefaultPii === true) {
    client.on("beforeSendSession", addAutoIpAddressToSession);
  }
  client.on("beforeCaptureLog", (log5) => {
    log5.attributes = {
      ...log5.attributes,
      "electron.process": "browser",
      ...getOsDeviceLogAttributes(client)
    };
  });
  scope.setClient(client);
  client.init();
  configureIPC(client, options);
  if (!options.skipOpenTelemetrySetup) {
    initOpenTelemetry(client);
  }
}
var INTEGRATION_OVERRIDES = [
  { userAdded: "ElectronMinidump", toRemove: "SentryMinidump" },
  { userAdded: "BrowserWindowSession", toRemove: "MainProcessSession" }
];
function removeRedundantIntegrations(options) {
  for (const { userAdded, toRemove } of INTEGRATION_OVERRIDES) {
    if (options.integrations.some((i) => i.name === userAdded)) {
      options.integrations = options.integrations.filter((i) => i.name !== toRemove);
    }
  }
}

// client-src/main.ts
init({
  dsn: process.env.SENTRY_DSN || "",
  // 从环境变量读取 DSN
  environment: process.env.NODE_ENV || "production",
  enabled: !!process.env.SENTRY_DSN,
  // 只在配置了 DSN 时启用
  tracesSampleRate: 1,
  // 性能监控采样率
  beforeSend(event) {
    if (process.env.NODE_ENV === "development") {
      console.log("[Sentry] Event:", event);
      return null;
    }
    return event;
  }
});
var mainWindow = null;
async function createWindow() {
  console.log("[Main] Creating window...");
  mainWindow = new BrowserWindow3({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    show: true,
    // 立即显示窗口
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
      // 如果需要 preload 脚本
    },
    title: "LogVPN",
    icon: path.join(__dirname, "..", "resources", "icon-1024.png")
    // 应用图标
  });
  console.log("[Main] Window created successfully");
  if (process.env.NODE_ENV === "development") {
    console.log("[Main] Loading development server...");
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, "..", "dist", "public", "index.html");
    console.log("[Main] Loading production HTML from:", indexPath);
    console.log("[Main] __dirname:", __dirname);
    const fs = __require("fs");
    console.log("[Main] Checking paths:");
    console.log("[Main] - indexPath:", indexPath);
    console.log("[Main] - process.resourcesPath:", process.resourcesPath);
    console.log("[Main] - __dirname:", __dirname);
    const possiblePaths = [
      indexPath,
      path.join(process.resourcesPath, "app.asar", "dist", "public", "index.html"),
      path.join(process.resourcesPath, "app", "dist", "public", "index.html"),
      path.join(__dirname, "..", "..", "dist", "public", "index.html")
    ];
    let loaded = false;
    for (const tryPath of possiblePaths) {
      console.log("[Main] Trying path:", tryPath);
      if (fs.existsSync(tryPath)) {
        console.log("[Main] \u2713 Found! Loading:", tryPath);
        try {
          await mainWindow.loadFile(tryPath);
          loaded = true;
          console.log("[Main] \u2713 Successfully loaded");
          break;
        } catch (err) {
          console.error("[Main] \u2717 Failed to load:", err);
        }
      } else {
        console.log("[Main] \u2717 Not found:", tryPath);
      }
    }
    if (!loaded) {
      console.error("[Main] \u2717 FATAL: Could not find index.html in any location");
      console.error("[Main] Please check the build configuration");
    }
  }
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("[Main] Page loaded successfully");
  });
  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.error("[Main] Page failed to load:", errorCode, errorDescription);
  });
  mainWindow.on("closed", () => {
    console.log("[Main] Window closed");
    mainWindow = null;
  });
}
app23.whenReady().then(() => {
  createWindow();
  app23.on("activate", () => {
    if (BrowserWindow3.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app23.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app23.quit();
  }
});
ipcMain2.handle("get-app-version", () => {
  return app23.getVersion();
});
ipcMain2.handle("get-app-path", () => {
  return app23.getPath("userData");
});
var gotTheLock = app23.requestSingleInstanceLock();
if (!gotTheLock) {
  app23.quit();
} else {
  app23.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
process.on("uncaughtException", (error3) => {
  console.error("Uncaught Exception:", error3);
  captureException(error3);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  captureException(reason);
});
