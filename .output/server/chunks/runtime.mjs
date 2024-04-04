import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join as join$1 } from 'path';
import { toValue } from 'vue';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { isSpecialLang, isSpecialTheme, addClassToHast, getHighlighterCore } from 'shiki/core';
import { transformerNotationDiff, transformerNotationFocus, transformerNotationHighlight, transformerNotationErrorLevel } from '@shikijs/transformers';
import { unified } from 'unified';
import { toString as toString$1 } from 'mdast-util-to-string';
import { postprocess, preprocess } from 'micromark';
import { stringifyPosition } from 'unist-util-stringify-position';
import { markdownLineEnding, markdownSpace } from 'micromark-util-character';
import { push, splice } from 'micromark-util-chunked';
import { resolveAll } from 'micromark-util-resolve-all';
import { normalizeUri } from 'micromark-util-sanitize-uri';
import slugify from 'slugify';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import remarkMDC, { parseFrontMatter } from 'remark-mdc';
import { toString } from 'hast-util-to-string';
import Slugger from 'github-slugger';
import { detab } from 'detab';
import remarkEmoji from 'remark-emoji';
import remarkGFM from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';
import rehypeRaw from 'rehype-raw';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode$1(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode$1(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function isRelative(inputString) {
  return ["./", "../"].some((string_) => inputString.startsWith(string_));
}
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withoutLeadingSlash(input = "") {
  return (hasLeadingSlash(input) ? input.slice(1) : input) || "/";
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  const match = input.match(PROTOCOL_REGEX);
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}

const defaults$1 = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults$1, ...options };
  } else {
    options = defaults$1;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (allowHead && event.method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse$1(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
const appendHeader = appendResponseHeader;
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ignoreResponseError: true,
    // make $ofetch.raw transparent
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const { pathname } = parseURL(info.url || "/");
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      await sendError(event, error, !!app.options.debug);
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = separators ?? STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function pascalCase(str, opts) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst(opts?.normalize ? p.toLowerCase() : p)).join("") : "";
}
function camelCase(str, opts) {
  return lowerFirst(pascalCase(str || "", opts));
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ?? "-") : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv$1(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv$1(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  ui: {
    primary: "green",
    gray: "slate",
    footer: {
      bottom: {
        left: "text-sm text-gray-500 dark:text-gray-400",
        wrapper: "border-t border-gray-200 dark:border-gray-800"
      }
    }
  },
  seo: {
    siteName: "Nuxt UI Pro - Docs template"
  },
  header: {
    logo: {
      alt: "",
      light: "",
      dark: ""
    },
    search: true,
    colorMode: true,
    links: [{
      icon: "i-simple-icons-github",
      to: "https://github.com/nuxt-ui-pro/docs",
      target: "_blank",
      "aria-label": "Docs template on GitHub"
    }]
  },
  footer: {
    credits: "Copyright \xA9 2023",
    colorMode: false,
    links: [{
      icon: "i-simple-icons-nuxtdotjs",
      to: "https://nuxt.com",
      target: "_blank",
      "aria-label": "Nuxt Website"
    }, {
      icon: "i-simple-icons-discord",
      to: "https://discord.com/invite/ps2h6QT",
      target: "_blank",
      "aria-label": "Nuxt UI on Discord"
    }, {
      icon: "i-simple-icons-x",
      to: "https://x.com/nuxt_js",
      target: "_blank",
      "aria-label": "Nuxt on X"
    }, {
      icon: "i-simple-icons-github",
      to: "https://github.com/nuxt/ui",
      target: "_blank",
      "aria-label": "Nuxt UI on GitHub"
    }]
  },
  toc: {
    title: "Table of Contents",
    bottom: {
      title: "Community",
      edit: "https://github.com/nuxt-ui-pro/docs/edit/main/content",
      links: [{
        icon: "i-heroicons-star",
        label: "Star on GitHub",
        to: "https://github.com/nuxt/ui",
        target: "_blank"
      }, {
        icon: "i-heroicons-book-open",
        label: "Nuxt UI Pro docs",
        to: "https://ui.nuxt.com/pro/guide",
        target: "_blank"
      }, {
        icon: "i-simple-icons-nuxtdotjs",
        label: "Purchase a license",
        to: "https://ui.nuxt.com/pro/purchase",
        target: "_blank"
      }]
    }
  }
});

const appConfig1 = defineAppConfig({
  ui: {
    variables: {
      light: {
        background: "255 255 255",
        foreground: "var(--color-gray-700)"
      },
      dark: {
        background: "var(--color-gray-900)",
        foreground: "var(--color-gray-200)"
      },
      header: {
        height: "4rem"
      }
    },
    icons: {
      dark: "i-heroicons-moon-20-solid",
      light: "i-heroicons-sun-20-solid",
      system: "i-heroicons-computer-desktop-20-solid",
      search: "i-heroicons-magnifying-glass-20-solid",
      external: "i-heroicons-arrow-up-right-20-solid",
      chevron: "i-heroicons-chevron-down-20-solid",
      hash: "i-heroicons-hashtag-20-solid",
      menu: "i-heroicons-bars-3-20-solid",
      close: "i-heroicons-x-mark-20-solid",
      check: "i-heroicons-check-circle-20-solid"
    },
    presets: {
      button: {
        primary: {
          color: "white",
          variant: "solid"
        },
        secondary: {
          color: "gray",
          variant: "ghost"
        },
        input: {
          color: "white",
          variant: "outline",
          ui: {
            font: "",
            color: {
              white: {
                outline: "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
              }
            }
          }
        }
      }
    }
  }
});

const inlineAppConfig = {
  "nuxt": {
    "buildId": "ac309457-8feb-4b4b-9cf4-b7e2df2bf8a0"
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
};

const appConfig = defuFn(appConfig0, appConfig1, inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/api/search.json": {
        "prerender": true
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "mdc": {
      "components": {
        "prose": true,
        "map": {
          "p": "prose-p",
          "a": "prose-a",
          "blockquote": "prose-blockquote",
          "code-inline": "prose-code-inline",
          "code": "ProseCodeInline",
          "em": "prose-em",
          "h1": "prose-h1",
          "h2": "prose-h2",
          "h3": "prose-h3",
          "h4": "prose-h4",
          "h5": "prose-h5",
          "h6": "prose-h6",
          "hr": "prose-hr",
          "img": "prose-img",
          "ul": "prose-ul",
          "ol": "prose-ol",
          "li": "prose-li",
          "strong": "prose-strong",
          "table": "prose-table",
          "thead": "prose-thead",
          "tbody": "prose-tbody",
          "td": "prose-td",
          "th": "prose-th",
          "tr": "prose-tr"
        }
      },
      "headings": {
        "anchorLinks": {
          "h1": false,
          "h2": true,
          "h3": true,
          "h4": true,
          "h5": false,
          "h6": false
        }
      }
    },
    "content": {
      "locales": [],
      "defaultLocale": "",
      "integrity": 1712268118902,
      "experimental": {
        "stripQueryParameters": false,
        "advanceQuery": false,
        "clientDB": false
      },
      "respectPathCase": false,
      "api": {
        "baseURL": "/api/_content"
      },
      "navigation": {
        "fields": [
          "icon",
          "to",
          "target"
        ]
      },
      "tags": {
        "p": "prose-p",
        "a": "prose-a",
        "blockquote": "prose-blockquote",
        "code-inline": "prose-code-inline",
        "code": "ProseCodeInline",
        "em": "prose-em",
        "h1": "prose-h1",
        "h2": "prose-h2",
        "h3": "prose-h3",
        "h4": "prose-h4",
        "h5": "prose-h5",
        "h6": "prose-h6",
        "hr": "prose-hr",
        "img": "prose-img",
        "ul": "prose-ul",
        "ol": "prose-ol",
        "li": "prose-li",
        "strong": "prose-strong",
        "table": "prose-table",
        "thead": "prose-thead",
        "tbody": "prose-tbody",
        "td": "prose-td",
        "th": "prose-th",
        "tr": "prose-tr"
      },
      "highlight": {
        "theme": {
          "light": "material-theme-lighter",
          "default": "material-theme",
          "dark": "material-theme-palenight"
        },
        "preload": [
          "json",
          "js",
          "ts",
          "html",
          "css",
          "vue",
          "diff",
          "shell",
          "markdown",
          "yaml",
          "bash",
          "ini"
        ],
        "highlighter": "shiki",
        "langs": [
          "js",
          "jsx",
          "json",
          "ts",
          "tsx",
          "vue",
          "css",
          "html",
          "vue",
          "bash",
          "md",
          "mdc",
          "yaml",
          "json",
          "js",
          "ts",
          "html",
          "css",
          "vue",
          "diff",
          "shell",
          "markdown",
          "yaml",
          "bash",
          "ini"
        ]
      },
      "wsUrl": "",
      "documentDriven": false,
      "host": "",
      "trailingSlash": false,
      "search": "",
      "contentHead": true,
      "anchorLinks": {
        "depth": 4,
        "exclude": [
          1
        ]
      }
    },
    "studio": {
      "apiURL": "https://api.nuxt.studio",
      "iframeMessagingAllowedOrigins": ""
    }
  },
  "content": {
    "cacheVersion": 2,
    "cacheIntegrity": "42LCwcizp5",
    "transformers": [],
    "base": "",
    "api": {
      "baseURL": "/api/_content"
    },
    "watch": {
      "ws": {
        "port": {
          "port": 4000,
          "portRange": [
            4000,
            4040
          ]
        },
        "hostname": "localhost",
        "showURL": false
      }
    },
    "sources": {},
    "ignores": [],
    "locales": [],
    "defaultLocale": "",
    "highlight": {
      "theme": {
        "light": "material-theme-lighter",
        "default": "material-theme",
        "dark": "material-theme-palenight"
      },
      "preload": [
        "json",
        "js",
        "ts",
        "html",
        "css",
        "vue",
        "diff",
        "shell",
        "markdown",
        "yaml",
        "bash",
        "ini"
      ],
      "highlighter": "shiki",
      "langs": [
        "js",
        "jsx",
        "json",
        "ts",
        "tsx",
        "vue",
        "css",
        "html",
        "vue",
        "bash",
        "md",
        "mdc",
        "yaml",
        "json",
        "js",
        "ts",
        "html",
        "css",
        "vue",
        "diff",
        "shell",
        "markdown",
        "yaml",
        "bash",
        "ini"
      ]
    },
    "markdown": {
      "tags": {
        "p": "prose-p",
        "a": "prose-a",
        "blockquote": "prose-blockquote",
        "code-inline": "prose-code-inline",
        "code": "ProseCodeInline",
        "em": "prose-em",
        "h1": "prose-h1",
        "h2": "prose-h2",
        "h3": "prose-h3",
        "h4": "prose-h4",
        "h5": "prose-h5",
        "h6": "prose-h6",
        "hr": "prose-hr",
        "img": "prose-img",
        "ul": "prose-ul",
        "ol": "prose-ol",
        "li": "prose-li",
        "strong": "prose-strong",
        "table": "prose-table",
        "thead": "prose-thead",
        "tbody": "prose-tbody",
        "td": "prose-td",
        "th": "prose-th",
        "tr": "prose-tr"
      },
      "anchorLinks": {
        "depth": 4,
        "exclude": [
          1
        ]
      },
      "remarkPlugins": {},
      "rehypePlugins": {}
    },
    "yaml": {},
    "csv": {
      "delimeter": ",",
      "json": true
    },
    "navigation": {
      "fields": [
        "icon",
        "to",
        "target"
      ]
    },
    "contentHead": true,
    "documentDriven": false,
    "respectPathCase": false,
    "experimental": {
      "clientDB": false,
      "cacheContents": true,
      "stripQueryParameters": false,
      "advanceQuery": false,
      "search": ""
    }
  },
  "studio": {
    "version": "1.0.13",
    "publicToken": "",
    "project": "",
    "gitInfo": {
      "name": "peakofeloquence.org",
      "owner": "rezapex",
      "url": "https://github.com/rezapex/peakofeloquence.org"
    }
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_priority": -20,
        "_context": "defaults",
        "defaultLocale": "en",
        "trailingSlash": false
      },
      {
        "_context": "system",
        "_priority": -15,
        "name": "peakofeloquence-site",
        "env": "production"
      },
      {
        "_context": "package.json",
        "_priority": -10,
        "name": "nuxt-ui-pro-template-docs"
      }
    ],
    "version": "1.6.7",
    "debug": false
  },
  "nuxt-og-image": {
    "version": "2.2.4",
    "satoriOptions": {},
    "runtimeSatori": true,
    "runtimeBrowser": false,
    "defaults": {
      "provider": "satori",
      "component": "OgImageTemplateFallback",
      "width": 1200,
      "height": 630,
      "cache": true,
      "cacheTtl": 86400000
    },
    "runtimeCacheStorage": "default",
    "fonts": [
      {
        "name": "Inter",
        "weight": "400"
      },
      {
        "name": "Inter",
        "weight": "700"
      }
    ],
    "assetDirs": [
      "/Users/rezajafar/peakofeloquence-site/public",
      "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-og-image/dist/runtime/public-assets",
      "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-og-image/dist/runtime/public-assets-optional/inter-font",
      "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-og-image/dist/runtime/public-assets-optional/inter-font",
      "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-og-image/dist/runtime/public-assets-optional/resvg",
      "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-og-image/dist/runtime/public-assets-optional/yoga",
      "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-og-image/dist/runtime/public-assets-optional/svg2png"
    ]
  },
  "appConfigSchema": {
    "properties": {
      "id": "#appConfig",
      "properties": {
        "nuxtIcon": {
          "title": "Nuxt Icon",
          "description": "Configure Nuxt Icon module preferences.",
          "id": "#appConfig/nuxtIcon",
          "properties": {
            "size": {
              "title": "Icon Size",
              "description": "Set the default icon size. Set to false to disable the sizing of icon in style.",
              "tags": [
                "@studioIcon material-symbols:format-size-rounded"
              ],
              "tsType": "string | false",
              "id": "#appConfig/nuxtIcon/size",
              "default": "1em",
              "type": "string"
            },
            "class": {
              "title": "CSS Class",
              "description": "Set the default CSS class.",
              "tags": [
                "@studioIcon material-symbols:css"
              ],
              "id": "#appConfig/nuxtIcon/class",
              "default": "",
              "type": "string"
            },
            "aliases": {
              "title": "Icon aliases",
              "description": "Define Icon aliases to update them easily without code changes.",
              "tags": [
                "@studioIcon material-symbols:star-rounded"
              ],
              "tsType": "{ [alias: string]: string }",
              "id": "#appConfig/nuxtIcon/aliases",
              "default": {},
              "type": "object"
            },
            "iconifyApiOptions": {
              "title": "Iconify API Options",
              "description": "Define preferences for Iconify API fetch.",
              "tags": [
                "@studioIcon material-symbols:tv-options-input-settings"
              ],
              "id": "#appConfig/nuxtIcon/iconifyApiOptions",
              "properties": {
                "url": {
                  "title": "Iconify API URL",
                  "description": "Define a custom Iconify API URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api.",
                  "tags": [
                    "@studioIcon material-symbols:api"
                  ],
                  "id": "#appConfig/nuxtIcon/iconifyApiOptions/url",
                  "default": "https://api.iconify.design",
                  "type": "string"
                },
                "publicApiFallback": {
                  "title": "Public Iconify API fallback",
                  "description": "Define if the public Iconify API should be used as fallback.",
                  "tags": [
                    "@studioIcon material-symbols:public"
                  ],
                  "id": "#appConfig/nuxtIcon/iconifyApiOptions/publicApiFallback",
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object",
              "default": {
                "url": "https://api.iconify.design",
                "publicApiFallback": false
              }
            }
          },
          "type": "object",
          "default": {
            "size": "1em",
            "class": "",
            "aliases": {},
            "iconifyApiOptions": {
              "url": "https://api.iconify.design",
              "publicApiFallback": false
            }
          }
        },
        "ui": {
          "title": "UI",
          "description": "UI Customization.",
          "tags": [
            "@studioIcon i-mdi-palette-outline"
          ],
          "id": "#appConfig/ui",
          "properties": {
            "icons": {
              "title": "Icons",
              "description": "Manage icons used in UI Pro.",
              "tags": [
                "@studioIcon i-mdi-application-settings-outline"
              ],
              "id": "#appConfig/ui/icons",
              "properties": {
                "search": {
                  "type": "string",
                  "title": "Search Bar",
                  "description": "Icon to display in the search bar.",
                  "default": "i-heroicons-magnifying-glass-20-solid",
                  "tags": [
                    "@studioInput icon",
                    "@studioIcon i-mdi-magnify"
                  ],
                  "id": "#appConfig/ui/icons/search"
                },
                "dark": {
                  "type": "string",
                  "title": "Dark mode",
                  "description": "Icon of color mode button for dark mode.",
                  "default": "i-heroicons-moon-20-solid",
                  "tags": [
                    "@studioInput icon",
                    "@studioIcon i-mdi-moon-waning-crescent"
                  ],
                  "id": "#appConfig/ui/icons/dark"
                },
                "light": {
                  "type": "string",
                  "title": "Light mode",
                  "description": "Icon of color mode button for light mode.",
                  "default": "i-heroicons-sun-20-solid",
                  "tags": [
                    "@studioInput icon",
                    "@studioIcon i-mdi-white-balance-sunny"
                  ],
                  "id": "#appConfig/ui/icons/light"
                },
                "external": {
                  "type": "string",
                  "title": "External Link",
                  "description": "Icon for external link.",
                  "default": "i-heroicons-arrow-up-right-20-solid",
                  "tags": [
                    "@studioInput icon",
                    "@studioIcon i-mdi-arrow-top-right"
                  ],
                  "id": "#appConfig/ui/icons/external"
                },
                "chevron": {
                  "type": "string",
                  "title": "Chevron",
                  "description": "Icon for chevron.",
                  "default": "i-heroicons-chevron-down-20-solid",
                  "tags": [
                    "@studioInput icon",
                    "@studioIcon i-mdi-chevron-down"
                  ],
                  "id": "#appConfig/ui/icons/chevron"
                },
                "hash": {
                  "type": "string",
                  "title": "Hash",
                  "description": "Icon for hash anchors.",
                  "default": "i-heroicons-hashtag-20-solid",
                  "tags": [
                    "@studioInput icon",
                    "@studioIcon i-ph-hash"
                  ],
                  "id": "#appConfig/ui/icons/hash"
                }
              },
              "type": "object",
              "default": {
                "search": "i-heroicons-magnifying-glass-20-solid",
                "dark": "i-heroicons-moon-20-solid",
                "light": "i-heroicons-sun-20-solid",
                "external": "i-heroicons-arrow-up-right-20-solid",
                "chevron": "i-heroicons-chevron-down-20-solid",
                "hash": "i-heroicons-hashtag-20-solid"
              }
            },
            "primary": {
              "type": "string",
              "title": "Primary",
              "description": "Primary color of your UI.",
              "default": "green",
              "required": [
                "sky",
                "mint",
                "rose",
                "amber",
                "violet",
                "emerald",
                "fuchsia",
                "indigo",
                "lime",
                "orange",
                "pink",
                "purple",
                "red",
                "teal",
                "yellow",
                "green",
                "blue",
                "cyan",
                "gray",
                "white",
                "black"
              ],
              "tags": [
                "@studioInput string",
                "@studioIcon i-mdi-palette-outline"
              ],
              "id": "#appConfig/ui/primary"
            },
            "gray": {
              "type": "string",
              "title": "Gray",
              "description": "Gray color of your UI.",
              "default": "slate",
              "required": [
                "slate",
                "cool",
                "zinc",
                "neutral",
                "stone"
              ],
              "tags": [
                "@studioInput string",
                "@studioIcon i-mdi-palette-outline"
              ],
              "id": "#appConfig/ui/gray"
            }
          },
          "type": "object",
          "default": {
            "icons": {
              "search": "i-heroicons-magnifying-glass-20-solid",
              "dark": "i-heroicons-moon-20-solid",
              "light": "i-heroicons-sun-20-solid",
              "external": "i-heroicons-arrow-up-right-20-solid",
              "chevron": "i-heroicons-chevron-down-20-solid",
              "hash": "i-heroicons-hashtag-20-solid"
            },
            "primary": "green",
            "gray": "slate"
          }
        },
        "seo": {
          "title": "SEO",
          "description": "SEO configuration.",
          "tags": [
            "@studioIcon i-ph-app-window"
          ],
          "id": "#appConfig/seo",
          "properties": {
            "siteName": {
              "type": "string",
              "title": "Site Name",
              "description": "Name used in ogSiteName and used as second part of your page title (My page title - Nuxt UI Pro).",
              "default": [],
              "tags": [
                "@studioInput string",
                "@studioIcon i-mdi-web"
              ],
              "id": "#appConfig/seo/siteName"
            }
          },
          "type": "object",
          "default": {
            "siteName": []
          }
        },
        "header": {
          "title": "Header",
          "description": "Header configuration.",
          "tags": [
            "@studioIcon i-mdi-page-layout-header"
          ],
          "id": "#appConfig/header",
          "properties": {
            "logo": {
              "title": "Logo",
              "description": "Header logo configuration.",
              "tags": [
                "@studioIcon i-mdi-image-filter-center-focus-strong-outline"
              ],
              "id": "#appConfig/header/logo",
              "properties": {
                "light": {
                  "type": "string",
                  "title": "Light Mode Logo",
                  "description": "Pick an image from your gallery.",
                  "default": "",
                  "tags": [
                    "@studioInput media",
                    "@studioIcon i-mdi-white-balance-sunny"
                  ],
                  "id": "#appConfig/header/logo/light"
                },
                "dark": {
                  "type": "string",
                  "title": "Dark Mode Logo",
                  "description": "Pick an image from your gallery.",
                  "default": "",
                  "tags": [
                    "@studioInput media",
                    "@studioIcon i-mdi-moon-waning-crescent"
                  ],
                  "id": "#appConfig/header/logo/dark"
                },
                "alt": {
                  "type": "string",
                  "title": "Alt",
                  "description": "Alt to display for accessibility.",
                  "default": "",
                  "tags": [
                    "@studioInput string",
                    "@studioIcon i-mdi-alphabet-latin"
                  ],
                  "id": "#appConfig/header/logo/alt"
                }
              },
              "type": "object",
              "default": {
                "light": "",
                "dark": "",
                "alt": ""
              }
            },
            "search": {
              "type": "boolean",
              "title": "Search Bar",
              "description": "Hide or display the search bar.",
              "default": true,
              "tags": [
                "@studioInput boolean",
                "@studioIcon i-mdi-magnify"
              ],
              "id": "#appConfig/header/search"
            },
            "colorMode": {
              "type": "boolean",
              "title": "Color Mode",
              "description": "Hide or display the color mode button in your header.",
              "default": true,
              "tags": [
                "@studioInput boolean",
                "@studioIcon i-mdi-moon-waning-crescent"
              ],
              "id": "#appConfig/header/colorMode"
            },
            "links": {
              "type": "array",
              "title": "Links",
              "description": "Array of link object displayed in header.",
              "default": [],
              "tags": [
                "@studioInput array",
                "@studioIcon i-mdi-link-variant"
              ],
              "id": "#appConfig/header/links",
              "items": {
                "type": "any"
              }
            }
          },
          "type": "object",
          "default": {
            "logo": {
              "light": "",
              "dark": "",
              "alt": ""
            },
            "search": true,
            "colorMode": true,
            "links": []
          }
        },
        "footer": {
          "title": "Footer",
          "description": "Footer configuration.",
          "tags": [
            "@studioIcon i-mdi-page-layout-footer"
          ],
          "id": "#appConfig/footer",
          "properties": {
            "credits": {
              "type": "string",
              "title": "Footer credits section",
              "description": "Text to display as credits in the footer.",
              "default": "",
              "tags": [
                "@studioInput string",
                "@studioIcon i-mdi-circle-edit-outline"
              ],
              "id": "#appConfig/footer/credits"
            },
            "colorMode": {
              "type": "boolean",
              "title": "Color Mode",
              "description": "Hide or display the color mode button in the footer.",
              "default": false,
              "tags": [
                "@studioInput boolean",
                "@studioIcon i-mdi-moon-waning-crescent"
              ],
              "id": "#appConfig/footer/colorMode"
            },
            "links": {
              "type": "array",
              "title": "Links",
              "description": "Array of link object displayed in footer.",
              "default": [],
              "tags": [
                "@studioInput array",
                "@studioIcon i-mdi-link-variant"
              ],
              "id": "#appConfig/footer/links",
              "items": {
                "type": "any"
              }
            }
          },
          "type": "object",
          "default": {
            "credits": "",
            "colorMode": false,
            "links": []
          }
        },
        "toc": {
          "title": "Table of contents",
          "description": "TOC configuration.",
          "tags": [
            "@studioIcon i-mdi-table-of-contents"
          ],
          "id": "#appConfig/toc",
          "properties": {
            "title": {
              "type": "string",
              "title": "Title",
              "description": "Text to display as title of the main toc.",
              "default": "",
              "tags": [
                "@studioInput string",
                "@studioIcon i-mdi-format-title"
              ],
              "id": "#appConfig/toc/title"
            },
            "bottom": {
              "title": "Bottom",
              "description": "Bottom TOC configuration.",
              "tags": [
                "@studioIcon i-mdi-table-of-contents"
              ],
              "id": "#appConfig/toc/bottom",
              "properties": {
                "title": {
                  "type": "string",
                  "title": "Title",
                  "description": "Text to display as title of the bottom toc.",
                  "default": "",
                  "tags": [
                    "@studioInput string",
                    "@studioIcon i-mdi-format-title"
                  ],
                  "id": "#appConfig/toc/bottom/title"
                },
                "edit": {
                  "type": "string",
                  "title": "Edit Page Link",
                  "description": "URL of your repository content folder.",
                  "default": "",
                  "tags": [
                    "@studioInput string",
                    "@studioIcon i-ph-note-pencil"
                  ],
                  "id": "#appConfig/toc/bottom/edit"
                },
                "links": {
                  "type": "array",
                  "title": "Links",
                  "description": "Array of link object displayed in bottom toc.",
                  "default": [],
                  "tags": [
                    "@studioInput array",
                    "@studioIcon i-mdi-link-variant"
                  ],
                  "id": "#appConfig/toc/bottom/links",
                  "items": {
                    "type": "any"
                  }
                }
              },
              "type": "object",
              "default": {
                "title": "",
                "edit": "",
                "links": []
              }
            }
          },
          "type": "object",
          "default": {
            "title": "",
            "bottom": {
              "title": "",
              "edit": "",
              "links": []
            }
          }
        }
      },
      "type": "object",
      "default": {
        "nuxtIcon": {
          "size": "1em",
          "class": "",
          "aliases": {},
          "iconifyApiOptions": {
            "url": "https://api.iconify.design",
            "publicApiFallback": false
          }
        },
        "ui": {
          "icons": {
            "search": "i-heroicons-magnifying-glass-20-solid",
            "dark": "i-heroicons-moon-20-solid",
            "light": "i-heroicons-sun-20-solid",
            "external": "i-heroicons-arrow-up-right-20-solid",
            "chevron": "i-heroicons-chevron-down-20-solid",
            "hash": "i-heroicons-hashtag-20-solid"
          },
          "primary": "green",
          "gray": "slate"
        },
        "seo": {
          "siteName": []
        },
        "header": {
          "logo": {
            "light": "",
            "dark": "",
            "alt": ""
          },
          "search": true,
          "colorMode": true,
          "links": []
        },
        "footer": {
          "credits": "",
          "colorMode": false,
          "links": []
        },
        "toc": {
          "title": "",
          "bottom": {
            "title": "",
            "edit": "",
            "links": []
          }
        }
      }
    },
    "default": {
      "nuxtIcon": {
        "size": "1em",
        "class": "",
        "aliases": {},
        "iconifyApiOptions": {
          "url": "https://api.iconify.design",
          "publicApiFallback": false
        }
      },
      "ui": {
        "icons": {
          "search": "i-heroicons-magnifying-glass-20-solid",
          "dark": "i-heroicons-moon-20-solid",
          "light": "i-heroicons-sun-20-solid",
          "external": "i-heroicons-arrow-up-right-20-solid",
          "chevron": "i-heroicons-chevron-down-20-solid",
          "hash": "i-heroicons-hashtag-20-solid"
        },
        "primary": "green",
        "gray": "slate"
      },
      "seo": {
        "siteName": []
      },
      "header": {
        "logo": {
          "light": "",
          "dark": "",
          "alt": ""
        },
        "search": true,
        "colorMode": true,
        "links": []
      },
      "footer": {
        "credits": "",
        "colorMode": false,
        "links": []
      },
      "toc": {
        "title": "",
        "bottom": {
          "title": "",
          "edit": "",
          "links": []
        }
      }
    }
  },
  "contentSchema": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  if (!event) {
    return _sharedAppConfig;
  }
  if (event.context.nitro.appConfig) {
    return event.context.nitro.appConfig;
  }
  const appConfig$1 = klona(appConfig);
  event.context.nitro.appConfig = appConfig$1;
  return appConfig$1;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive$1(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive$1(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$2(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$2(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$2(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$3 = "memory";
const memory$1 = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$3,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory$1() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$2(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$2(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$2(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$2(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$2(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {
  ["nitro:bundled:cache:content:content-index.json"]: {
    import: () => import('./raw/content-index.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"2af-1SFxgM4WmOfV29uHM2xgbvCD/yo\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:content-navigation.json"]: {
    import: () => import('./raw/content-navigation.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"2e1-Vc+VZuCmf58R3La3gmaOnlNNSAU\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:index.yml"]: {
    import: () => import('./raw/index.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"a0e-C3gn9c0i3gY9FNfS3atFmG+w5RQ\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1. Sermons:0.Intro.md"]: {
    import: () => import('./raw/0.Intro.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"b82-/3Rh56m6vVfkOeT8gXeKB0zf/Ec\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1. Sermons:1.index.md"]: {
    import: () => import('./raw/1.index.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"33a9-WWxjwQ5z7omETY2REbpWxvT2z4g\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1. Sermons:2.sermon2.md"]: {
    import: () => import('./raw/2.sermon2.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"12d6-1LLSxqWlXXQSO3UJS6kWdEoCCwI\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1. Sermons:3.sermon3.md"]: {
    import: () => import('./raw/3.sermon3.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"17c-iTCa9E0b5Tn0IejTu7B/Kf5PNrA\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1. Sermons:_dir.yml"]: {
    import: () => import('./raw/_dir.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"ff-sXhECtgaBNHiP5PlxMIAK5OMuTs\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2. Letters:1.index.md"]: {
    import: () => import('./raw/1.index2.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1df-YKgc8MR9LzGSfOmtreXQXnCiEXo\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2. Letters:2.sermon2.md"]: {
    import: () => import('./raw/2.sermon22.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"14ff-dpkN4DIy/QleIgu0M4iFY8Id8xA\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2. Letters:3.sermon3.md"]: {
    import: () => import('./raw/3.sermon32.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"12b18-K/0L/Al/b8LBEnIqS+lG4KOzI3E\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2. Letters:_dir.yml"]: {
    import: () => import('./raw/_dir2.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"ff-wRpvD7CvdSUMIxqr1dp6rSdvouM\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3. Sayings:1.index.md"]: {
    import: () => import('./raw/1.index3.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"16e-8ivvCaDHeY3ppzT028dVng/UHsU\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3. Sayings:2.sermon2.md"]: {
    import: () => import('./raw/2.sermon23.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"14ff-G3y9rgt4OObCYjgHxee4/+T7pnY\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3. Sayings:3.sermon3.md"]: {
    import: () => import('./raw/3.sermon33.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"12b1b-gjRrC9F7tXquACpczYd2ByJcIpc\"","mtime":"2024-04-04T22:02:17.699Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3. Sayings:_dir.yml"]: {
    import: () => import('./raw/_dir3.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"ff-gGvokLa+0oLB34DcDaEC4wh47lU\"","mtime":"2024-04-04T22:02:17.699Z"}
  }
};

const normalizeKey$1 = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey$1(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey$1(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey$1(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/^:|:$/g, "");
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME$2 = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME$2, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME$2,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join$1(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME$2,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const OVERLAY_REMOVED = "__OVERLAY_REMOVED__";
const DRIVER_NAME$1 = "overlay";
const overlay = defineDriver((options) => {
  return {
    name: DRIVER_NAME$1,
    options,
    async hasItem(key, opts) {
      for (const layer of options.layers) {
        if (await layer.hasItem(key, opts)) {
          if (layer === options.layers[0]) {
            if (await options.layers[0]?.getItem(key) === OVERLAY_REMOVED) {
              return false;
            }
          }
          return true;
        }
      }
      return false;
    },
    async getItem(key) {
      for (const layer of options.layers) {
        const value = await layer.getItem(key);
        if (value === OVERLAY_REMOVED) {
          return null;
        }
        if (value !== null) {
          return value;
        }
      }
      return null;
    },
    // TODO: Support native meta
    // async getMeta (key) {},
    async setItem(key, value, opts) {
      await options.layers[0]?.setItem?.(key, value, opts);
    },
    async removeItem(key, opts) {
      await options.layers[0]?.setItem?.(key, OVERLAY_REMOVED, opts);
    },
    async getKeys(base, opts) {
      const allKeys = await Promise.all(
        options.layers.map(async (layer) => {
          const keys = await layer.getKeys(base, opts);
          return keys.map((key) => normalizeKey(key));
        })
      );
      const uniqueKeys = Array.from(new Set(allKeys.flat()));
      const existingKeys = await Promise.all(
        uniqueKeys.map(async (key) => {
          if (await options.layers[0]?.getItem(key) === OVERLAY_REMOVED) {
            return false;
          }
          return key;
        })
      );
      return existingKeys.filter(Boolean);
    },
    async dispose() {
      await Promise.all(
        options.layers.map(async (layer) => {
          if (layer.dispose) {
            await layer.dispose();
          }
        })
      );
    }
  };
});

const DRIVER_NAME = "memory";
const memoryDriver = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/Users/rezajafar/peakofeloquence-site/.data/kv"}));

const bundledStorage = ["/cache/content"];
for (const base of bundledStorage) {
  storage.mount(base, overlay({
    layers: [
      memoryDriver(),
      // TODO
      // prefixStorage(storage, base),
      prefixStorage(storage, 'assets:nitro:bundled:' + base)
    ]
  }));
}

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0)
      return;
    if (!input._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2].split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      input._context = lastFunctionName;
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = val;
    }
    if (Object.keys(entry).filter((k) => !k.startsWith("_")).length > 0)
      stack.push(entry);
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = stack[o][k];
        if (!k.startsWith("_")) {
          siteConfig[k] = val;
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  if (typeof config.trailingSlash !== "undefined")
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(config.url, { acceptRelative: true, strict: false }))
    config.url = withHttps(config.url);
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}

const useProcessorPlugins = async (processor, plugins = {}) => {
  const toUse = Object.entries(plugins).filter((p) => p[1] !== false);
  for (const plugin of toUse) {
    const instance = plugin[1].instance || await import(
      /* @vite-ignore */
      plugin[0]
    ).then((m) => m.default || m);
    processor.use(instance, plugin[1].options);
  }
};

const unsafeLinkPrefix = [
  "javascript:",
  "data:text/html",
  "vbscript:",
  "data:text/javascript",
  "data:text/vbscript",
  "data:text/css",
  "data:text/plain",
  "data:text/xml"
];
const validateProp = (attribute, value) => {
  if (attribute.startsWith("on")) {
    return false;
  }
  if (attribute === "href" || attribute === "src") {
    return !unsafeLinkPrefix.some((prefix) => value.toLowerCase().startsWith(prefix));
  }
  return true;
};
const validateProps = (type, props) => {
  if (!props) {
    return {};
  }
  props = Object.fromEntries(
    Object.entries(props).filter(([name, value]) => {
      const isValid = validateProp(name, value);
      if (!isValid) {
        console.warn(`[@nuxtjs/mdc] removing unsafe attribute: ${name}="${value}"`);
      }
      return isValid;
    })
  );
  if (type === "pre") {
    if (typeof props.highlights === "string") {
      props.highlights = props.highlights.split(" ").map((i) => parseInt(i));
    }
  }
  return props;
};

function compileHast(options = {}) {
  const slugs = new Slugger();
  function compileToJSON(node, parent) {
    if (node.type === "root") {
      return {
        type: "root",
        children: node.children.map((child) => compileToJSON(child, node)).filter(Boolean)
      };
    }
    if (node.type === "element") {
      if (node.tagName === "p" && node.children.every((child) => child.type === "text" && /^\s*$/.test(child.value))) {
        return null;
      }
      if (node.tagName === "li") {
        let hasPreviousParagraph = false;
        node.children = node.children?.flatMap((child) => {
          if (child.type === "element" && child.tagName === "p") {
            if (hasPreviousParagraph) {
              child.children.unshift({
                type: "element",
                tagName: "br",
                properties: {},
                children: []
              });
            }
            hasPreviousParagraph = true;
            return child.children;
          }
          return child;
        });
      }
      if (node.tagName?.match(/^h\d$/)) {
        node.properties = node.properties || {};
        node.properties.id = String(node.properties?.id || slugs.slug(toString(node))).replace(/-+/g, "-").replace(/^-|-$/g, "").replace(/^(\d)/, "_$1");
      }
      if (node.tagName === "component-slot") {
        node.tagName = "template";
      }
      const children = (node.tagName === "template" && node.content?.children.length ? node.content.children : node.children).map((child) => compileToJSON(child, node)).filter(Boolean);
      return {
        type: "element",
        tag: node.tagName,
        props: validateProps(node.tagName, node.properties),
        children
      };
    }
    if (node.type === "text") {
      if (node.value !== "\n" || parent?.properties?.emptyLinePlaceholder) {
        return {
          type: "text",
          value: node.value
        };
      }
    }
    if (options.keepComments && node.type === "comment") {
      return {
        type: "comment",
        value: node.value
      };
    }
    return null;
  }
  this.Compiler = (tree) => {
    const body = compileToJSON(tree);
    let excerpt = void 0;
    const excerptIndex = tree.children.findIndex((node) => node.type === "comment" && node.value?.trim() === "more");
    if (excerptIndex !== -1) {
      excerpt = compileToJSON({
        type: "root",
        children: tree.children.slice(0, excerptIndex)
      });
      if (excerpt.children.find((node) => node.type === "element" && node.tag === "pre")) {
        const lastChild = body.children[body.children.length - 1];
        if (lastChild.type === "element" && lastChild.tag === "style") {
          excerpt.children.push(lastChild);
        }
      }
    }
    return {
      body,
      excerpt
    };
  };
}

function emphasis(state, node) {
  const result = {
    type: "element",
    tagName: "em",
    properties: node.attributes || {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

function parseThematicBlock(lang) {
  if (!lang?.trim()) {
    return {
      language: void 0,
      highlights: void 0,
      filename: void 0,
      meta: void 0
    };
  }
  const languageMatches = lang.replace(/[{|[](.+)/, "").match(/^[^ \t]+(?=[ \t]|$)/);
  const highlightTokensMatches = lang.match(/{([^}]*)}/);
  const filenameMatches = lang.match(/\[((\\]|[^\]])*)\]/);
  const meta = lang.replace(languageMatches?.[0] ?? "", "").replace(highlightTokensMatches?.[0] ?? "", "").replace(filenameMatches?.[0] ?? "", "").trim();
  return {
    language: languageMatches?.[0] || void 0,
    highlights: parseHighlightedLines(highlightTokensMatches?.[1] || void 0),
    // https://github.com/nuxt/content/pull/2169
    filename: filenameMatches?.[1].replace(/\\]/g, "]") || void 0,
    meta
  };
}
function parseHighlightedLines(lines) {
  const lineArray = String(lines || "").split(",").filter(Boolean).flatMap((line) => {
    const [start, end] = line.trim().split("-").map((a) => Number(a.trim()));
    return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i);
  });
  return lineArray.length ? lineArray : void 0;
}
const TAG_NAME_REGEXP = /^<\/?([A-Za-z0-9-_]+) ?[^>]*>/;
function getTagName(value) {
  const result = String(value).match(TAG_NAME_REGEXP);
  return result && result[1];
}

const code = (state, node) => {
  const lang = (node.lang || "") + " " + (node.meta || "");
  const { language, highlights, filename, meta } = parseThematicBlock(lang);
  const value = node.value ? detab(node.value + "\n") : "";
  let result = {
    type: "element",
    tagName: "code",
    properties: { __ignoreMap: "" },
    children: [{ type: "text", value }]
  };
  if (meta) {
    result.data = {
      // @ts-ignore
      meta
    };
  }
  state.patch(node, result);
  result = state.applyData(node, result);
  const properties = {
    language,
    filename,
    highlights,
    meta,
    code: value
  };
  if (language) {
    properties.className = ["language-" + language];
  }
  result = { type: "element", tagName: "pre", properties, children: [result] };
  state.patch(node, result);
  return result;
};

function html(state, node) {
  const tagName = getTagName(node.value);
  if (tagName && /[A-Z]/.test(tagName)) {
    node.value = node.value.replace(tagName, kebabCase(tagName));
  }
  if (state.dangerous || state.options?.allowDangerousHtml) {
    const result = { type: "raw", value: node.value };
    state.patch(node, result);
    return state.applyData(node, result);
  }
  return void 0;
}

function link$1(state, node) {
  const properties = {
    ...node.attributes || {},
    href: normalizeUri(node.url)
  };
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = {
    type: "element",
    tagName: "a",
    properties,
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

function list(state, node) {
  const properties = {};
  const results = state.all(node);
  let index = -1;
  if (typeof node.start === "number" && node.start !== 1) {
    properties.start = node.start;
  }
  while (++index < results.length) {
    const child = results[index];
    if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
      properties.className = ["contains-task-list"];
      break;
    }
  }
  if ((node.children || []).some((child) => typeof child.checked === "boolean")) {
    properties.className = ["contains-task-list"];
  }
  const result = {
    type: "element",
    tagName: node.ordered ? "ol" : "ul",
    properties,
    children: state.wrap(results, true)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

const htmlTags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
];

function paragraph(state, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return state.all(node);
    }
  }
  const result = {
    type: "element",
    tagName: "p",
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

function image(state, node) {
  const properties = { ...node.attributes, src: normalizeUri(node.url) };
  if (node.alt !== null && node.alt !== void 0) {
    properties.alt = node.alt;
  }
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = { type: "element", tagName: "img", properties, children: [] };
  state.patch(node, result);
  return state.applyData(node, result);
}

function strong(state, node) {
  const result = {
    type: "element",
    tagName: "strong",
    properties: node.attributes || {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

function inlineCode(state, node) {
  const language = node.attributes?.language || node.attributes?.lang;
  const text = { type: "text", value: node.value.replace(/\r?\n|\r/g, " ") };
  state.patch(node, text);
  const result = {
    type: "element",
    tagName: "code",
    properties: node.attributes || {},
    children: [text]
  };
  const classes = (result.properties.class || "").split(" ");
  delete result.properties.class;
  if (language) {
    result.properties.language = language;
    delete result.properties.lang;
    classes.push("language-" + language);
  }
  result.properties.className = classes.join(" ");
  state.patch(node, result);
  return state.applyData(node, result);
}

function containerComponent(state, node) {
  const result = {
    type: "element",
    tagName: node.name,
    properties: {
      ...node.attributes,
      ...node.data?.hProperties
    },
    children: state.all(node)
  };
  state.patch(node, result);
  result.attributes = node.attributes;
  result.fmAttributes = node.fmAttributes;
  return result;
}

const handlers$1 = {
  emphasis,
  code,
  link: link$1,
  paragraph,
  html,
  list,
  image,
  strong,
  inlineCode,
  containerComponent
};

const defaults = {
  remark: {
    plugins: {
      "remark-mdc": {
        instance: remarkMDC
      },
      "remark-emoji": {
        instance: remarkEmoji
      },
      "remark-gfm": {
        instance: remarkGFM
      }
    }
  },
  rehype: {
    options: {
      // @ts-ignore
      handlers: handlers$1,
      allowDangerousHtml: true
    },
    plugins: {
      "rehype-external-links": {
        instance: rehypeExternalLinks
      },
      "rehype-sort-attribute-values": {
        instance: rehypeSortAttributeValues
      },
      "rehype-sort-attributes": {
        instance: rehypeSortAttributes
      },
      "rehype-raw": {
        instance: rehypeRaw,
        options: {
          passThrough: ["element"]
        }
      }
    }
  },
  highlight: false,
  toc: {
    searchDepth: 2,
    depth: 2
  }
};

function flattenNodeText(node) {
  if (node.type === "comment") {
    return "";
  }
  if (node.type === "text") {
    return node.value || "";
  } else {
    return (node.children || []).reduce((text, child) => {
      return text.concat(flattenNodeText(child));
    }, "");
  }
}
function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node];
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ];
}

const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const TOC_TAGS_DEPTH = TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const getHeaderDepth = (node) => TOC_TAGS_DEPTH[node.tag];
const getTocTags = (depth) => {
  if (depth < 1 || depth > 5) {
    console.log(`\`toc.depth\` is set to ${depth}. It should be a number between 1 and 5. `);
    depth = 1;
  }
  return TOC_TAGS.slice(0, depth);
};
function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers;
  }
  const toc = [];
  let parent;
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = [];
      parent = header;
      toc.push(header);
    } else {
      parent.children.push(header);
    }
  });
  toc.forEach((header) => {
    if (header.children?.length) {
      header.children = nestHeaders(header.children);
    } else {
      delete header.children;
    }
  });
  return toc;
}
function generateFlatToc(body, options) {
  const { searchDepth, depth, title = "" } = options;
  const tags = getTocTags(depth);
  const headers = flattenNode(body, searchDepth).filter((node) => tags.includes(node.tag || ""));
  const links = headers.map((node) => ({
    id: node.props?.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }));
  return {
    title,
    searchDepth,
    depth,
    links
  };
}
function generateToc(body, options) {
  const toc = generateFlatToc(body, options);
  toc.links = nestHeaders(toc.links);
  return toc;
}

function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || isTag(vnode, Symbol.for("v-txt"));
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children?.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value || "";
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).filter(Boolean).join("");
  }
  return "";
}

let moduleOptions;
let generatedMdcConfigs;
const createMarkdownParser = async (inlineOptions = {}) => {
  if (!moduleOptions) {
    moduleOptions = await import(
      './build/mdc-imports.mjs'
      /* @vite-ignore */
    ).catch(() => ({}));
  }
  if (!generatedMdcConfigs) {
    generatedMdcConfigs = await Promise.resolve().then(function () { return mdcConfigs; }).then((r) => r.getMdcConfigs()).catch(() => []);
  }
  const mdcConfigs$1 = [
    ...generatedMdcConfigs || [],
    ...inlineOptions.configs || []
  ];
  if (inlineOptions.highlight != null && inlineOptions.highlight != false && inlineOptions.highlight.highlighter !== void 0 && typeof inlineOptions.highlight.highlighter !== "function") {
    inlineOptions = {
      ...inlineOptions,
      highlight: {
        ...inlineOptions.highlight
      }
    };
    delete inlineOptions.highlight.highlighter;
  }
  const options = defu(inlineOptions, {
    remark: { plugins: moduleOptions?.remarkPlugins },
    rehype: { plugins: moduleOptions?.rehypePlugins },
    highlight: moduleOptions?.highlight
  }, defaults);
  if (options.rehype?.plugins?.highlight) {
    options.rehype.plugins.highlight.options = {
      ...options.rehype.plugins.highlight.options || {},
      ...options.highlight || {}
    };
  }
  let processor = unified();
  for (const config of mdcConfigs$1) {
    processor = await config.unified?.pre?.(processor) || processor;
  }
  processor.use(remarkParse);
  for (const config of mdcConfigs$1) {
    processor = await config.unified?.remark?.(processor) || processor;
  }
  await useProcessorPlugins(processor, options.remark?.plugins);
  processor.use(remark2rehype, options.rehype?.options);
  for (const config of mdcConfigs$1) {
    processor = await config.unified?.rehype?.(processor) || processor;
  }
  await useProcessorPlugins(processor, options.rehype?.plugins);
  processor.use(compileHast, options);
  for (const config of mdcConfigs$1) {
    processor = await config.unified?.post?.(processor) || processor;
  }
  return async (md) => {
    const { content, data: frontmatter } = await parseFrontMatter(md);
    const processedFile = await processor.process({ value: content, data: frontmatter });
    const result = processedFile.result;
    const data = Object.assign(
      contentHeading(result.body),
      frontmatter,
      processedFile?.data || {}
    );
    let toc;
    if (data.toc !== false) {
      const tocOption = defu(data.toc || {}, options.toc);
      toc = generateToc(result.body, tocOption);
    }
    return {
      data,
      body: result.body,
      excerpt: result.excerpt,
      toc
    };
  };
};
const parseMarkdown = async (md, inlineOptions = {}) => {
  const parser = await createMarkdownParser(inlineOptions);
  return parser(md);
};
function contentHeading(body) {
  let title = "";
  let description = "";
  const children = body.children.filter((node) => node.type === "element" && node.tag !== "hr");
  if (children.length && children[0].tag === "h1") {
    const node = children.shift();
    title = nodeTextContent(node);
  }
  if (children.length && children[0].tag === "p") {
    const node = children.shift();
    description = nodeTextContent(node);
  }
  return {
    title,
    description
  };
}

function useSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu(_options, useRuntimeConfig()["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

function useNitroOrigin(e) {
  const cert = process.env.NITRO_SSL_CERT;
  const key = process.env.NITRO_SSL_KEY;
  let host = process.env.NITRO_HOST || process.env.HOST || false;
  let port;
  let protocol = cert && key || !false ? "https" : "http";
  if (!e) ; else {
    host = getRequestHost(e, { xForwardedHost: true }) || host;
    protocol = getRequestProtocol(e, { xForwardedProto: true }) || protocol;
  }
  if (typeof host === "string" && host.includes(":")) {
    port = host.split(":").pop();
    host = host.split(":")[0];
  }
  port = port ? `:${port}` : "";
  return `${protocol}://${host}${port}/`;
}

const InjectStatePlugin = async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(useSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
};
const _orCZfp48UW = InjectStatePlugin;

const OgImagePrenderNitroPlugin = async (nitroApp) => {
  return;
};
const _XnhSswNu98 = OgImagePrenderNitroPlugin;

const script = "\"use strict\";(()=>{const a=window,e=document.documentElement,c=window.localStorage,d=[\"dark\",\"light\"],n=c&&c.getItem&&c.getItem(\"nuxt-color-mode\")||\"system\";let l=n===\"system\"?f():n;const i=e.getAttribute(\"data-color-mode-forced\");i&&(l=i),r(l),a[\"__NUXT_COLOR_MODE__\"]={preference:n,value:l,getColorScheme:f,addColorScheme:r,removeColorScheme:u};function r(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.add(t):e.className+=\" \"+t,s&&e.setAttribute(\"data-\"+s,o)}function u(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp(t,\"g\"),\"\"),s&&e.removeAttribute(\"data-\"+s)}function m(o){return a.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function f(){if(a.matchMedia&&m(\"\").media!==\"not all\"){for(const o of d)if(m(\":\"+o).matches)return o}return\"light\"}})();\n";

const _YqFzejKwrm = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _orCZfp48UW,
_XnhSswNu98,
_YqFzejKwrm
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/__studio.json": {
    "type": "application/json",
    "etag": "\"ca16-tHw7LGiQPoiw/79J5b0bptI0mCU\"",
    "mtime": "2024-04-04T22:02:17.429Z",
    "size": 51734,
    "path": "../public/__studio.json"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2024-04-04T22:02:17.684Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/inter-latin-ext-400-normal.woff": {
    "type": "font/woff",
    "etag": "\"abcc-ScgUlgU6NMSchk9cXQMUZeQG8fc\"",
    "mtime": "2024-04-04T22:02:17.691Z",
    "size": 43980,
    "path": "../public/inter-latin-ext-400-normal.woff"
  },
  "/inter-latin-ext-700-normal.woff": {
    "type": "font/woff",
    "etag": "\"bb34-btkmYi1MS9GkMFR4+gGPWRFxwKU\"",
    "mtime": "2024-04-04T22:02:17.691Z",
    "size": 47924,
    "path": "../public/inter-latin-ext-700-normal.woff"
  },
  "/social-card.png": {
    "type": "image/png",
    "etag": "\"8c28e-+ItjkAPQhw9BpPRZytU3G7fPQOE\"",
    "mtime": "2024-04-04T22:02:17.685Z",
    "size": 574094,
    "path": "../public/social-card.png"
  },
  "/__nuxt_og_image__/browser-provider-not-supported.png": {
    "type": "image/png",
    "etag": "\"d15f-AEZ7IAUVAPep6OcQIDh6DGEbiYY\"",
    "mtime": "2024-04-04T22:02:17.686Z",
    "size": 53599,
    "path": "../public/__nuxt_og_image__/browser-provider-not-supported.png"
  },
  "/api/search.json": {
    "type": "application/json",
    "etag": "\"2d5d0-F4bt/m1nJy7Zd6BoYqgaXIVoWjk\"",
    "mtime": "2024-04-04T22:02:17.645Z",
    "size": 185808,
    "path": "../public/api/search.json"
  },
  "/_fonts/rP2Wp2ywxg089UriCZaSExd86J3t9jz86MvyyKK58UfivUw4aw-SK92LTmKP0.woff2": {
    "type": "font/woff2",
    "etag": "\"5020-GlU9H1UnLjBBIkowyMkEamLddSE\"",
    "mtime": "2024-04-04T22:02:17.664Z",
    "size": 20512,
    "path": "../public/_fonts/rP2Wp2ywxg089UriCZaSExd86J3t9jz86MvyyKK58UfivUw4aw-SK92LTmKP0.woff2"
  },
  "/_fonts/rP2Wp2ywxg089UriCZaSExd86J3t9jz86MvyyKy58UfivUw-9uYm8d48E4.woff2": {
    "type": "font/woff2",
    "etag": "\"9ad0-PeYOnBH8Lahga1mR5N9/17ickiw\"",
    "mtime": "2024-04-04T22:02:17.664Z",
    "size": 39632,
    "path": "../public/_fonts/rP2Wp2ywxg089UriCZaSExd86J3t9jz86MvyyKy58UfivUw-9uYm8d48E4.woff2"
  },
  "/_fonts/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K6z9mXg-VNw7NHvqnp.woff2": {
    "type": "font/woff2",
    "etag": "\"8fa4-zRgoC/o3pMRNVTCJn+EKJJMQ5us\"",
    "mtime": "2024-04-04T22:02:17.664Z",
    "size": 36772,
    "path": "../public/_fonts/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K6z9mXg-VNw7NHvqnp.woff2"
  },
  "/_fonts/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu6-K6z9mXgjU0-EkYdMs3MAX.woff2": {
    "type": "font/woff2",
    "etag": "\"469c-UpvnmaufPNw4CenOkFQW1oEvTQo\"",
    "mtime": "2024-04-04T22:02:17.664Z",
    "size": 18076,
    "path": "../public/_fonts/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu6-K6z9mXgjU0-EkYdMs3MAX.woff2"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-7DW3w-R7n06NbhGy.woff": {
    "type": "font/woff",
    "etag": "\"6ab0-nMmNkBNw2Ji6ebYsWMVcHZnVNcs\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 27312,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-7DW3w-R7n06NbhGy.woff"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDG3w-leGNfkTmsj.woff": {
    "type": "font/woff",
    "etag": "\"6678-iL6jjTGT4lvMKsRO2baZLwwJay8\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 26232,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDG3w-leGNfkTmsj.woff"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW3w-ciElMF03ku.woff": {
    "type": "font/woff",
    "etag": "\"6984-tRwSrt5VSJuJRY6VK9gves0B0aM\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 27012,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW3w-ciElMF03ku.woff"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JCm3w-sB722Uoa0f.woff": {
    "type": "font/woff",
    "etag": "\"6ac8-UFc8BnDBOUAbuPqmWU/5BIl4fAI\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 27336,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JCm3w-sB722Uoa0f.woff"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JDW3w-PBDI1JDjwV.woff": {
    "type": "font/woff",
    "etag": "\"6764-pweo7l8YZK4VyRRxpuuLJ4ZjNAI\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 26468,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JDW3w-PBDI1JDjwV.woff"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8gCm3w-0q1hqVn09O.woff": {
    "type": "font/woff",
    "etag": "\"6a60-BIeqywk0x1s+I1PltEH/ip0KWjA\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 27232,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8gCm3w-0q1hqVn09O.woff"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9XCm3w-ByvzuLy2fa.woff": {
    "type": "font/woff",
    "etag": "\"69f0-Rz3sfhcP26fmAx775fkq9y1sSLQ\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 27120,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9XCm3w-ByvzuLy2fa.woff"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm3w-5TKCIs6EEw.woff": {
    "type": "font/woff",
    "etag": "\"6a7c-NulHJvf7z9wEHJoC2rc3iNGT+MY\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 27260,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm3w-5TKCIs6EEw.woff"
  },
  "/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat_XDW3w-r2swRDGfn2.woff": {
    "type": "font/woff",
    "etag": "\"66f4-fbrp4+1rDkxUhlZzR56UZCYb5sQ\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 26356,
    "path": "../public/_fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat_XDW3w-r2swRDGfn2.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAC5thTQ-ldB60l5U8r.woff": {
    "type": "font/woff",
    "etag": "\"6080-Lmtc5tQESeJwNKB/TOQ5vCPX+L8\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 24704,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAC5thTQ-ldB60l5U8r.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpthTQ-wbFKGFDrgo.woff": {
    "type": "font/woff",
    "etag": "\"5ffc-niMSMwwJctMKjTst+1hbCliiN0o\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 24572,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpthTQ-wbFKGFDrgo.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpxhTQ-LLUBv5jskj.woff": {
    "type": "font/woff",
    "etag": "\"6134-zN8xhgryjIg9o1iVqQnpoO0qe7A\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 24884,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpxhTQ-LLUBv5jskj.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTQ-F71RdTRbNg.woff": {
    "type": "font/woff",
    "etag": "\"6058-7kot3tigXTepse3wwKH836SiRd4\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 24664,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTQ-F71RdTRbNg.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwA_JxhTQ-6nh65gZkc0.woff": {
    "type": "font/woff",
    "etag": "\"5c44-wrX8wfzxdV3QYRR2l8zlsfajUUs\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 23620,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwA_JxhTQ-6nh65gZkc0.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTQ-aMoWEJLmTt.woff": {
    "type": "font/woff",
    "etag": "\"5f74-SP62C697zAkDsACEA/AWIfB85Y0\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 24436,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTQ-aMoWEJLmTt.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTQ-WMBvmLOgKm.woff": {
    "type": "font/woff",
    "etag": "\"60cc-/pXU6Xb97Mtf7w9ieytAXjvr1FI\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 24780,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTQ-WMBvmLOgKm.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAop1hTQ-utGC2hnWq2.woff": {
    "type": "font/woff",
    "etag": "\"5fbc-pbtTxnIejBUpMZJm8i3qNzh/W34\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 24508,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAop1hTQ-utGC2hnWq2.woff"
  },
  "/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTQ-YpyTieVa5B.woff": {
    "type": "font/woff",
    "etag": "\"5f8c-Rgo02koI0X0Wsr7k658/NqdRssU\"",
    "mtime": "2024-04-04T22:02:17.665Z",
    "size": 24460,
    "path": "../public/_fonts/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTQ-YpyTieVa5B.woff"
  },
  "/_nuxt/5Z6UcyGi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-3voXaVJtzv7K796Tto9uzdoRlzk\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 181,
    "path": "../public/_nuxt/5Z6UcyGi.js"
  },
  "/_nuxt/6dB8NBbH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"97e-Fj+AR+TAcg+rfR+OzxBFZwNL2VI\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 2430,
    "path": "../public/_nuxt/6dB8NBbH.js"
  },
  "/_nuxt/8X5J2VD1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4fb-wbT4vzcpe3uLy8KQxkfDQPqTPWU\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 1275,
    "path": "../public/_nuxt/8X5J2VD1.js"
  },
  "/_nuxt/AWEfebsp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4bd-aJOo+5d/Nv7pPJBZZXcuQyetQj4\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 1213,
    "path": "../public/_nuxt/AWEfebsp.js"
  },
  "/_nuxt/B0TPYd9k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b7-om0BlJONEa57hkXmKXiPJBx0+UI\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 183,
    "path": "../public/_nuxt/B0TPYd9k.js"
  },
  "/_nuxt/B1Dlzxgp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-wca5MV+1Pt++5ANK+KEuFxdk5fI\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 181,
    "path": "../public/_nuxt/B1Dlzxgp.js"
  },
  "/_nuxt/B1dlEw58.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-xW7b5LPSUwOHLCeq+LiEyo9/AV8\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 100,
    "path": "../public/_nuxt/B1dlEw58.js"
  },
  "/_nuxt/B2BuIiKK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"469d-SNqtF7vSmuyYm0hJjUJ7zF/XMrc\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 18077,
    "path": "../public/_nuxt/B2BuIiKK.js"
  },
  "/_nuxt/BBKeMSa3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f3-gGF2jioHBDoguDOykf5ILdYF1U8\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 1267,
    "path": "../public/_nuxt/BBKeMSa3.js"
  },
  "/_nuxt/BHwvMChq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bb-pjp9l7ypLf3rJ6kG6B5lUPpZWSM\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 187,
    "path": "../public/_nuxt/BHwvMChq.js"
  },
  "/_nuxt/BO3FpnhN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b35-drwbPtLEP5KYzBo/uEtXWgMsjzU\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 11061,
    "path": "../public/_nuxt/BO3FpnhN.js"
  },
  "/_nuxt/BOHSGaWA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b8-DZ0ubyX2+Z35qqcQlKAEgtoY33Q\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 184,
    "path": "../public/_nuxt/BOHSGaWA.js"
  },
  "/_nuxt/BPLJJonF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4ae-yYqEWsGHXrNuJ1IgsaBx85WmtQU\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 1198,
    "path": "../public/_nuxt/BPLJJonF.js"
  },
  "/_nuxt/BPYvDPNR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6db-K41zxlMzHzsN9/y3Kxoa9/Is+Bg\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 1755,
    "path": "../public/_nuxt/BPYvDPNR.js"
  },
  "/_nuxt/BPinlWw8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"327-LwcWVATCqLZ1ntDN4MlV70HotJY\"",
    "mtime": "2024-04-04T22:02:17.672Z",
    "size": 807,
    "path": "../public/_nuxt/BPinlWw8.js"
  },
  "/_nuxt/BVZ7Taxl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"346-VdEdTE+8DRWgZJdDANqNUF5vfkQ\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 838,
    "path": "../public/_nuxt/BVZ7Taxl.js"
  },
  "/_nuxt/BYp_Vwll.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-M+oi8GMabv25/DKNA/2xkRv+vRw\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 181,
    "path": "../public/_nuxt/BYp_Vwll.js"
  },
  "/_nuxt/Bbvmo8gL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"244-v01mHT2gmazHd46KIMxa0Y9lkHM\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 580,
    "path": "../public/_nuxt/Bbvmo8gL.js"
  },
  "/_nuxt/Bg1vVtvc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"332-eRwaSfcrtWRD9xXDUJaxUOGBm2E\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 818,
    "path": "../public/_nuxt/Bg1vVtvc.js"
  },
  "/_nuxt/BlxWTfDV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29286-exFaIbtSYYyEFqVJnOg29npWyVQ\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 168582,
    "path": "../public/_nuxt/BlxWTfDV.js"
  },
  "/_nuxt/BneCoJRQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"456-EG3SpcWdeV5DegGw/MaQ1t8IgLM\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 1110,
    "path": "../public/_nuxt/BneCoJRQ.js"
  },
  "/_nuxt/Bqu-wOy2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4aaf-avHxWFnwPB/H9Dla2CUtOcCZPKU\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 19119,
    "path": "../public/_nuxt/Bqu-wOy2.js"
  },
  "/_nuxt/Br46L6ZY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6042f-irxCfO22RMP/c2hUoiYpthA+PRs\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 394287,
    "path": "../public/_nuxt/Br46L6ZY.js"
  },
  "/_nuxt/BxCPkzpw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"633-wcsJD7tWcR4o7lxIj/TnuwO/a8A\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 1587,
    "path": "../public/_nuxt/BxCPkzpw.js"
  },
  "/_nuxt/BxQ0-Lap.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"544a-EIUmWWw6m5tFpRU7Q/TyPHHB4+I\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 21578,
    "path": "../public/_nuxt/BxQ0-Lap.js"
  },
  "/_nuxt/ByH_V8px.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"269-evmvcQ80Er4qeWipwiJMLOgStMI\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 617,
    "path": "../public/_nuxt/ByH_V8px.js"
  },
  "/_nuxt/C0mtzMvm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"368-eB0Ls7SszoFxjMpuzryzPf3p3no\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 872,
    "path": "../public/_nuxt/C0mtzMvm.js"
  },
  "/_nuxt/C4KxSfZO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"87-3hkBTkiXgM8GlSos8dlo+vWt3uk\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 135,
    "path": "../public/_nuxt/C4KxSfZO.js"
  },
  "/_nuxt/C5DzBVyS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"83-y7ygXuaUhnRhf7lObPFw8im2uEQ\"",
    "mtime": "2024-04-04T22:02:17.673Z",
    "size": 131,
    "path": "../public/_nuxt/C5DzBVyS.js"
  },
  "/_nuxt/C5gCGmDW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"275f-zW53c0Vyh5x3zow5ofhYMLMe/OY\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 10079,
    "path": "../public/_nuxt/C5gCGmDW.js"
  },
  "/_nuxt/C6VUEyXF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9a4-odCbY9WTClCfb8WRADxh1gFYlac\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 2468,
    "path": "../public/_nuxt/C6VUEyXF.js"
  },
  "/_nuxt/C7ZFZr6_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9b33d-nok8wqKrCMz30T251t4MDaZiKR0\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 635709,
    "path": "../public/_nuxt/C7ZFZr6_.js"
  },
  "/_nuxt/CBTWMwpk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"84-rbgnWPDfsueCGr8DAjJU46F2hgc\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 132,
    "path": "../public/_nuxt/CBTWMwpk.js"
  },
  "/_nuxt/CF3NOiUn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9d28-KMUVGMabn+HMNY7u7jtzYjghhSY\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 40232,
    "path": "../public/_nuxt/CF3NOiUn.js"
  },
  "/_nuxt/CJYO97t0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"936-e2OsaQcvL2CRqnAn2NIAwB22w+E\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 2358,
    "path": "../public/_nuxt/CJYO97t0.js"
  },
  "/_nuxt/CLUtvZBM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14f-5tmZ7UWu6zIzsBNYW1r+S/80Mjk\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 335,
    "path": "../public/_nuxt/CLUtvZBM.js"
  },
  "/_nuxt/CYbpmQk-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11a-k7ifee0Ec0jTTLMQZqdh3cv+oA4\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 282,
    "path": "../public/_nuxt/CYbpmQk-.js"
  },
  "/_nuxt/CYxmr_lW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10d4d-2FG/XEoPGfh+UwzNg9sIwr8x8tI\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 68941,
    "path": "../public/_nuxt/CYxmr_lW.js"
  },
  "/_nuxt/CbViG2Xw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d751-8Gh0x340ychcn/mu7dK0WCM7Ppg\"",
    "mtime": "2024-04-04T22:02:17.674Z",
    "size": 55121,
    "path": "../public/_nuxt/CbViG2Xw.js"
  },
  "/_nuxt/CbYhyuC0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b909-ylgn/YwS3bF3/2IpucHbNFbkdj4\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 47369,
    "path": "../public/_nuxt/CbYhyuC0.js"
  },
  "/_nuxt/CdzkhfoJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e-ajZX1niXLaNub2tbXagZB3vQfbk\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 78,
    "path": "../public/_nuxt/CdzkhfoJ.js"
  },
  "/_nuxt/CfWEpFSV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"83-xLyjFYXglR1+5cuyulX3w7OrC5Y\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 131,
    "path": "../public/_nuxt/CfWEpFSV.js"
  },
  "/_nuxt/Cfq-1gWu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d1-SXmLGkVOKiN4Dqc/pSpKkjD33Ic\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 465,
    "path": "../public/_nuxt/Cfq-1gWu.js"
  },
  "/_nuxt/CgIK85b_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bb-GbXeBltl/KZ56uSjE7Tmnpyya9E\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 443,
    "path": "../public/_nuxt/CgIK85b_.js"
  },
  "/_nuxt/ChBhxaph.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"90d-PPXMlcKMloGjSZpkbSzHaJVL4MA\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 2317,
    "path": "../public/_nuxt/ChBhxaph.js"
  },
  "/_nuxt/CiCeeg4p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7a-KGGMLxv2SIgm2HB/GP8bkvv9/KU\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 122,
    "path": "../public/_nuxt/CiCeeg4p.js"
  },
  "/_nuxt/ContentSearch.Df7FdNLH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8d-k+EeMvN9mPY9B4hNdNcXz8RMv3w\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 141,
    "path": "../public/_nuxt/ContentSearch.Df7FdNLH.css"
  },
  "/_nuxt/Cpj98o6Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-QtY1KaLA8vnMK3l2IvajpxyuPmY\"",
    "mtime": "2024-04-04T22:02:17.676Z",
    "size": 236,
    "path": "../public/_nuxt/Cpj98o6Y.js"
  },
  "/_nuxt/Cr3gNFHn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"368-XSXCzTwcb/K61efsfaf1DUf9REo\"",
    "mtime": "2024-04-04T22:02:17.675Z",
    "size": 872,
    "path": "../public/_nuxt/Cr3gNFHn.js"
  },
  "/_nuxt/CsTmP73Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"97edb-xZ5DdCaR0OwFfXDX0W9BJTQhQCo\"",
    "mtime": "2024-04-04T22:02:17.679Z",
    "size": 622299,
    "path": "../public/_nuxt/CsTmP73Z.js"
  },
  "/_nuxt/CsyrCbsw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29b4d-dOeS6YOSSQlkF77RVlWNl0KxMS0\"",
    "mtime": "2024-04-04T22:02:17.678Z",
    "size": 170829,
    "path": "../public/_nuxt/CsyrCbsw.js"
  },
  "/_nuxt/CupVZNk8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a52-H2ZiqdeSxkDPlTmOByHzLXnszT4\"",
    "mtime": "2024-04-04T22:02:17.676Z",
    "size": 2642,
    "path": "../public/_nuxt/CupVZNk8.js"
  },
  "/_nuxt/CwH1eNKo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b8-H614EtZ39wndeegqnf644i7KlRs\"",
    "mtime": "2024-04-04T22:02:17.676Z",
    "size": 184,
    "path": "../public/_nuxt/CwH1eNKo.js"
  },
  "/_nuxt/CxNFa-5f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a6-y7MBcCj33DClej+JNKAFlbuT3qc\"",
    "mtime": "2024-04-04T22:02:17.676Z",
    "size": 934,
    "path": "../public/_nuxt/CxNFa-5f.js"
  },
  "/_nuxt/Cyevnpdq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-VEIQhM6Rn2kcl0CEDPyoe8xdlzg\"",
    "mtime": "2024-04-04T22:02:17.676Z",
    "size": 181,
    "path": "../public/_nuxt/Cyevnpdq.js"
  },
  "/_nuxt/CykdJ08p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7d-xqa1bfeaBvbCLmzAdi6BCNBSv3I\"",
    "mtime": "2024-04-04T22:02:17.677Z",
    "size": 125,
    "path": "../public/_nuxt/CykdJ08p.js"
  },
  "/_nuxt/D4JoF6Wk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a6-OBN53oB06iGMhwaBh89P/YsWV5E\"",
    "mtime": "2024-04-04T22:02:17.677Z",
    "size": 422,
    "path": "../public/_nuxt/D4JoF6Wk.js"
  },
  "/_nuxt/D4foGV7l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bb-oQgqEUQVj05kz0kbz7XN/8tLdOk\"",
    "mtime": "2024-04-04T22:02:17.677Z",
    "size": 443,
    "path": "../public/_nuxt/D4foGV7l.js"
  },
  "/_nuxt/D4k753MY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"917e-HfgHjOAMnxcKSRWELnVweoANQDo\"",
    "mtime": "2024-04-04T22:02:17.677Z",
    "size": 37246,
    "path": "../public/_nuxt/D4k753MY.js"
  },
  "/_nuxt/D7gg1Usp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"46b1-D1DNXWuC9OH8oER86xPp5T+yjCs\"",
    "mtime": "2024-04-04T22:02:17.677Z",
    "size": 18097,
    "path": "../public/_nuxt/D7gg1Usp.js"
  },
  "/_nuxt/D8E1bqqe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3901-9cXQOTLeetvOTOK9tTq+KIlHHPk\"",
    "mtime": "2024-04-04T22:02:17.677Z",
    "size": 14593,
    "path": "../public/_nuxt/D8E1bqqe.js"
  },
  "/_nuxt/DC8MraHL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ab80-+ieycPDoNJ5VfX4ZLxdEuHwkwWM\"",
    "mtime": "2024-04-04T22:02:17.680Z",
    "size": 174976,
    "path": "../public/_nuxt/DC8MraHL.js"
  },
  "/_nuxt/DCaZkfUa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36df2-ZEUNzo1cs8/7RoQHgdwSJILCX00\"",
    "mtime": "2024-04-04T22:02:17.679Z",
    "size": 224754,
    "path": "../public/_nuxt/DCaZkfUa.js"
  },
  "/_nuxt/DCk2z-Tu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c673-YyFXL05S9NFx9c1WAjAZ1uvOicE\"",
    "mtime": "2024-04-04T22:02:17.679Z",
    "size": 50803,
    "path": "../public/_nuxt/DCk2z-Tu.js"
  },
  "/_nuxt/DDHgSqT7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"407-N4v70N2R3+hQg90Y9eod8Q1ATqE\"",
    "mtime": "2024-04-04T22:02:17.679Z",
    "size": 1031,
    "path": "../public/_nuxt/DDHgSqT7.js"
  },
  "/_nuxt/DDRuGeQH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"46b0-TPI8cPGD2mpM2Jw7OA4bODSdy6I\"",
    "mtime": "2024-04-04T22:02:17.680Z",
    "size": 18096,
    "path": "../public/_nuxt/DDRuGeQH.js"
  },
  "/_nuxt/DJZQj9_g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"205-bPHovp61i5rG4Pyo20f9j5QyLes\"",
    "mtime": "2024-04-04T22:02:17.679Z",
    "size": 517,
    "path": "../public/_nuxt/DJZQj9_g.js"
  },
  "/_nuxt/DUMAJzen.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"163-aXsFspFCZM72x7x2IfkPhPUdCfY\"",
    "mtime": "2024-04-04T22:02:17.680Z",
    "size": 355,
    "path": "../public/_nuxt/DUMAJzen.js"
  },
  "/_nuxt/DWQjChpK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5a84-XlK19PqJ5fCJQPUMCGTtqs8u8xI\"",
    "mtime": "2024-04-04T22:02:17.680Z",
    "size": 23172,
    "path": "../public/_nuxt/DWQjChpK.js"
  },
  "/_nuxt/DYtbBipN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b-J0/RjuyKuZ8YGUcsS9OfzjrLiVg\"",
    "mtime": "2024-04-04T22:02:17.680Z",
    "size": 139,
    "path": "../public/_nuxt/DYtbBipN.js"
  },
  "/_nuxt/Dch3xQiY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28fb6-MYl/vSJ8ynpjnu1j385J/paT6W0\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 167862,
    "path": "../public/_nuxt/Dch3xQiY.js"
  },
  "/_nuxt/DdAOroIu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"89-5E888tuozoktuqWapjCMnr5iOPM\"",
    "mtime": "2024-04-04T22:02:17.680Z",
    "size": 137,
    "path": "../public/_nuxt/DdAOroIu.js"
  },
  "/_nuxt/DeVv6D4_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"553-cRCMwW2+fZeSe6NY5NbQRfy3r7Y\"",
    "mtime": "2024-04-04T22:02:17.680Z",
    "size": 1363,
    "path": "../public/_nuxt/DeVv6D4_.js"
  },
  "/_nuxt/DgMeF0z2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5ea-bKfYOgXqFObbbcVtXzbRmxG7vd8\"",
    "mtime": "2024-04-04T22:02:17.680Z",
    "size": 1514,
    "path": "../public/_nuxt/DgMeF0z2.js"
  },
  "/_nuxt/DtWVKHdF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-lheWjY6EedwhXQ32DE8umxjptc0\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 181,
    "path": "../public/_nuxt/DtWVKHdF.js"
  },
  "/_nuxt/DvmsnqaY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"300-AsMG04LFFEYOTDQ6Yp8YUCJUwqA\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 768,
    "path": "../public/_nuxt/DvmsnqaY.js"
  },
  "/_nuxt/DvyTQcux.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"94d-uhEhWzf76yH0vNb6wgIWg6csAEI\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 2381,
    "path": "../public/_nuxt/DvyTQcux.js"
  },
  "/_nuxt/DxzgGsj5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"368-0PHsGaVkYOBFw6ELC2UbNR6zJUg\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 872,
    "path": "../public/_nuxt/DxzgGsj5.js"
  },
  "/_nuxt/DypWFdop.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"368-gA81BtIHFqSUaYzhhLoJnC0PN6k\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 872,
    "path": "../public/_nuxt/DypWFdop.js"
  },
  "/_nuxt/DzrBdF6p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-D0golyxBl/t/R24kCWyuqPoJobo\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 181,
    "path": "../public/_nuxt/DzrBdF6p.js"
  },
  "/_nuxt/FwsymHsu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"795-1hH2Ci+f9nX3faEbIXDOUA6Aa3U\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 1941,
    "path": "../public/_nuxt/FwsymHsu.js"
  },
  "/_nuxt/IconCSS.Z2BAHt_z.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102-h9Iv/oJ6/LJjNheNG92kJMblk/8\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 258,
    "path": "../public/_nuxt/IconCSS.Z2BAHt_z.css"
  },
  "/_nuxt/MFEDNENx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"99-k47HBqF/XSHSMdQtqjmfTN4GZZI\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 153,
    "path": "../public/_nuxt/MFEDNENx.js"
  },
  "/_nuxt/ProseCode.CchFRBtv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e-GbvrqT5j9gSWlpa8e36U/Kv6Zx0\"",
    "mtime": "2024-04-04T22:02:17.681Z",
    "size": 46,
    "path": "../public/_nuxt/ProseCode.CchFRBtv.css"
  },
  "/_nuxt/SJSdtO9d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b9-rPeKX0tkl1qq+DDF4AdcQxqADx8\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 185,
    "path": "../public/_nuxt/SJSdtO9d.js"
  },
  "/_nuxt/YB0I65w6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"373-Cq0NFfaMnVt30gr/KLALMZzAXZ4\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 883,
    "path": "../public/_nuxt/YB0I65w6.js"
  },
  "/_nuxt/ZPoFG-vM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e-BArHeM+z5DTMqbRiFb6x9pHuW1U\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 78,
    "path": "../public/_nuxt/ZPoFG-vM.js"
  },
  "/_nuxt/_2_1NRxM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6fa-c9EA44yZzQXug0ddbRF/bMf90Zk\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 1786,
    "path": "../public/_nuxt/_2_1NRxM.js"
  },
  "/_nuxt/aJ-RZS6j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bbb4-Si/8TdCyj3P7xYDVWZ0kCTV39qA\"",
    "mtime": "2024-04-04T22:02:17.683Z",
    "size": 113588,
    "path": "../public/_nuxt/aJ-RZS6j.js"
  },
  "/_nuxt/bNaE6FFb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f-q42BFfiRogfcH1Y60YZFuPDwE5Q\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 79,
    "path": "../public/_nuxt/bNaE6FFb.js"
  },
  "/_nuxt/dSUCbPdh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"334-fALBi11iVfR3GjDmF0c+zRLEsh4\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 820,
    "path": "../public/_nuxt/dSUCbPdh.js"
  },
  "/_nuxt/eF3Z69fx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b8-m/KE1hS83WGKiIuTAxnQaSXSNSI\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 184,
    "path": "../public/_nuxt/eF3Z69fx.js"
  },
  "/_nuxt/entry.8lQfE3Ql.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-94megyLdO4/viLdnL2Kxt/gfOjM\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 67,
    "path": "../public/_nuxt/entry.8lQfE3Ql.css"
  },
  "/_nuxt/index.Ph6wid6Y.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13a-MRylLUHMm9RQriGg3Fagc0BWFWc\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 314,
    "path": "../public/_nuxt/index.Ph6wid6Y.css"
  },
  "/_nuxt/jE4NKWeb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5-obBt16Tlx/vPpX0x1eR066JkfRo\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 181,
    "path": "../public/_nuxt/jE4NKWeb.js"
  },
  "/_nuxt/nKMspuqT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"977-zz+1UnPyA2yZCcwaL9+J88f/5Jk\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 2423,
    "path": "../public/_nuxt/nKMspuqT.js"
  },
  "/_nuxt/umIuUOUS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-X/b1v981OUU9ygcUXn+zteFSAeY\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 180,
    "path": "../public/_nuxt/umIuUOUS.js"
  },
  "/_nuxt/useStudio.BmQjeGZL.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d9a-C1c2pxRusAoxHPBQXr6bd1fKSgE\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 3482,
    "path": "../public/_nuxt/useStudio.BmQjeGZL.css"
  },
  "/_nuxt/yGv9HJ6j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b8-X+DjsaHx6fZAcpfjlDNMyxoZVFM\"",
    "mtime": "2024-04-04T22:02:17.682Z",
    "size": 184,
    "path": "../public/_nuxt/yGv9HJ6j.js"
  },
  "/api/_content/cache.1712268118902.json": {
    "type": "application/json",
    "etag": "\"2e58e-bhHP+tIsNIVmTWYlnkFJQvvd0w4\"",
    "mtime": "2024-04-04T22:02:17.648Z",
    "size": 189838,
    "path": "../public/api/_content/cache.1712268118902.json"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-aeRzk3XkGFi8wY2HkqopawJLh0Q\"",
    "mtime": "2024-04-04T22:02:17.662Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/ac309457-8feb-4b4b-9cf4-b7e2df2bf8a0.json": {
    "type": "application/json",
    "etag": "\"b0-uYXBI0xVSrkNkE2ZopcQ22TgE38\"",
    "mtime": "2024-04-04T22:02:17.661Z",
    "size": 176,
    "path": "../public/_nuxt/builds/meta/ac309457-8feb-4b4b-9cf4-b7e2df2bf8a0.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}

const _UNC_REGEX = /^[/\\]{2}/;
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const normalize = function(path) {
  if (path.length === 0) {
    return ".";
  }
  path = normalizeWindowsPath(path);
  const isUNCPath = path.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path);
  const trailingSeparator = path[path.length - 1] === "/";
  path = normalizeString(path, !isPathAbsolute);
  if (path.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path += "/";
  }
  if (_DRIVE_LETTER_RE.test(path)) {
    path += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path}`;
    }
    return `//${path}`;
  }
  return isPathAbsolute && !isAbsolute(path) ? `/${path}` : path;
};
const join = function(...arguments_) {
  if (arguments_.length === 0) {
    return ".";
  }
  let joined;
  for (const argument of arguments_) {
    if (argument && argument.length > 0) {
      if (joined === void 0) {
        joined = argument;
      } else {
        joined += `/${argument}`;
      }
    }
  }
  if (joined === void 0) {
    return ".";
  }
  return normalize(joined.replace(/\/\/+/g, "/"));
};
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const _EXTNAME_RE = /.(\.[^./]+)$/;
const extname = function(p) {
  const match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
  return match && match[1] || "";
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta":{"maxAge":31536000},"/_nuxt/builds":{"maxAge":1},"/_fonts":{"maxAge":31536000},"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

let configs;
function getMdcConfigs () {
if (!configs) {
  configs = Promise.all([
  ]);
}
return configs
}

const mdcConfigs = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getMdcConfigs: getMdcConfigs
});

function createShikiHighlighter({
  langs = [],
  themes = [],
  bundledLangs = {},
  bundledThemes = {},
  getMdcConfigs,
  options: shikiOptions
} = {}) {
  let shiki;
  let configs;
  async function _getShiki() {
    const shiki2 = await getHighlighterCore({
      langs,
      themes,
      loadWasm: () => import('shiki/wasm')
    });
    for await (const config of await getConfigs()) {
      await config.shiki?.setup?.(shiki2);
    }
    return shiki2;
  }
  async function getShiki() {
    if (!shiki) {
      shiki = _getShiki();
    }
    return shiki;
  }
  async function getConfigs() {
    if (!configs) {
      configs = Promise.resolve(getMdcConfigs?.() || []);
    }
    return configs;
  }
  const baseTransformers = [
    transformerNotationDiff(),
    transformerNotationFocus(),
    transformerNotationHighlight(),
    transformerNotationErrorLevel()
  ];
  const highlighter = async (code, lang, theme, options = {}) => {
    const shiki2 = await getShiki();
    const themesObject = typeof theme === "string" ? { default: theme } : theme || {};
    const loadedThemes = shiki2.getLoadedThemes();
    const loadedLanguages = shiki2.getLoadedLanguages();
    if (typeof lang === "string" && !loadedLanguages.includes(lang) && !isSpecialLang(lang)) {
      if (bundledLangs[lang]) {
        await shiki2.loadLanguage(bundledLangs[lang]);
      } else {
        lang = "text";
      }
    }
    for (const [color, theme2] of Object.entries(themesObject)) {
      if (typeof theme2 === "string" && !loadedThemes.includes(theme2) && !isSpecialTheme(theme2)) {
        if (bundledThemes[theme2]) {
          await shiki2.loadTheme(bundledThemes[theme2]);
        } else {
          themesObject[color] = "none";
        }
      }
    }
    const transformers = [
      ...baseTransformers
    ];
    for (const config of await getConfigs()) {
      const newTransformers = typeof config.shiki?.transformers === "function" ? await config.shiki?.transformers(code, lang, theme, options) : config.shiki?.transformers || [];
      transformers.push(...newTransformers);
    }
    const root = shiki2.codeToHast(code.trimEnd(), {
      lang,
      themes: themesObject,
      defaultColor: false,
      meta: {
        __raw: options.meta
      },
      transformers: [
        ...transformers,
        {
          name: "mdc:highlight",
          line(node, line) {
            if (options.highlights?.includes(line))
              addClassToHast(node, "highlight");
            node.properties.line = line;
          }
        },
        {
          name: "mdc:newline",
          line(node) {
            if (code?.includes("\n")) {
              if (node.children.length === 0 || node.children.length === 1 && node.children[0].type === "element" && node.children[0].children.length === 1 && node.children[0].children[0].type === "text" && node.children[0].children[0].value === "") {
                node.children = [{
                  type: "element",
                  tagName: "span",
                  properties: {
                    emptyLinePlaceholder: true
                  },
                  children: [{ type: "text", value: "\n" }]
                }];
                return;
              }
              const last = node.children.at(-1);
              if (last?.type === "element" && last.tagName === "span") {
                const text = last.children.at(-1);
                if (text?.type === "text")
                  text.value += "\n";
              }
            }
          }
        }
      ]
    });
    const preEl = root.children[0];
    const codeEl = preEl.children[0];
    const wrapperStyle = shikiOptions?.wrapperStyle;
    preEl.properties.style = wrapperStyle ? typeof wrapperStyle === "string" ? wrapperStyle : preEl.properties.style : "";
    const styles = [];
    Object.keys(themesObject).forEach((color) => {
      const colorScheme = color !== "default" ? `.${color}` : "";
      styles.push(
        wrapperStyle ? `${colorScheme} .shiki,` : "",
        `html .${color} .shiki span {`,
        `color: var(--shiki-${color});`,
        `background: var(--shiki-${color}-bg);`,
        `font-style: var(--shiki-${color}-font-style);`,
        `font-weight: var(--shiki-${color}-font-weight);`,
        `text-decoration: var(--shiki-${color}-text-decoration);`,
        "}"
      );
      styles.push(
        `html${colorScheme} .shiki span {`,
        `color: var(--shiki-${color});`,
        `background: var(--shiki-${color}-bg);`,
        `font-style: var(--shiki-${color}-font-style);`,
        `font-weight: var(--shiki-${color}-font-weight);`,
        `text-decoration: var(--shiki-${color}-text-decoration);`,
        "}"
      );
    });
    return {
      tree: codeEl.children,
      className: Array.isArray(preEl.properties.class) ? preEl.properties.class.join(" ") : preEl.properties.class,
      inlineStyle: preEl.properties.style,
      style: styles.join("")
    };
  };
  return highlighter;
}

const bundledLangs = {
"javascript": () => import('shiki/langs/javascript.mjs'),
"js": () => import('shiki/langs/javascript.mjs'),
"jsx": () => import('shiki/langs/jsx.mjs'),
"json": () => import('shiki/langs/json.mjs'),
"typescript": () => import('shiki/langs/typescript.mjs'),
"ts": () => import('shiki/langs/typescript.mjs'),
"tsx": () => import('shiki/langs/tsx.mjs'),
"vue": () => import('shiki/langs/vue.mjs'),
"css": () => import('shiki/langs/css.mjs'),
"html": () => import('shiki/langs/html.mjs'),
"shellscript": () => import('shiki/langs/shellscript.mjs'),
"bash": () => import('shiki/langs/shellscript.mjs'),
"sh": () => import('shiki/langs/shellscript.mjs'),
"shell": () => import('shiki/langs/shellscript.mjs'),
"zsh": () => import('shiki/langs/shellscript.mjs'),
"markdown": () => import('shiki/langs/markdown.mjs'),
"md": () => import('shiki/langs/markdown.mjs'),
"mdc": () => import('shiki/langs/mdc.mjs'),
"yaml": () => import('shiki/langs/yaml.mjs'),
"yml": () => import('shiki/langs/yaml.mjs'),
"diff": () => import('shiki/langs/diff.mjs'),
"ini": () => import('shiki/langs/ini.mjs'),
"properties": () => import('shiki/langs/ini.mjs'),
};
const bundledThemes = {
"material-theme-lighter": () => import('shiki/themes/material-theme-lighter.mjs').then(r => r.default),
"material-theme": () => import('shiki/themes/material-theme.mjs').then(r => r.default),
"material-theme-palenight": () => import('shiki/themes/material-theme-palenight.mjs').then(r => r.default),
};
const options = {"theme":{"light":"material-theme-lighter","default":"material-theme","dark":"material-theme-palenight"}};
const highlighter = createShikiHighlighter({ bundledLangs, bundledThemes, options, getMdcConfigs });

const mdcHighlighter = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createShikiHighlighter: createShikiHighlighter,
  default: highlighter
});

const _ss6av3 = eventHandler(async (event) => {
  const { code, lang, theme: themeString, options: optionsStr } = getQuery(event);
  const theme = JSON.parse(themeString);
  const options = optionsStr ? JSON.parse(optionsStr) : {};
  return await highlighter(code, lang, theme, options);
});

const components = {
  "Callout": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
    "pascalName": "Callout",
    "kebabName": "callout",
    "chunkName": "components/callout",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1600,
                1652
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "color",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1656,
                1746
              ]
            }
          ],
          "schema": "string",
          "default": "\"primary\""
        },
        {
          "name": "to",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1750,
                1800
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "target",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1804,
                1858
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "ui",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1953,
                2046
              ]
            }
          ],
          "schema": "any",
          "default": "{}"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{ unwrap: string; }",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{ unwrap: string; }",
            "schema": {
              "unwrap": {
                "name": "unwrap",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "string",
                "declarations": [],
                "schema": "string"
              }
            }
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: { unwrap: string; }): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: { unwrap: string; }): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: { unwrap: string; }) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: { unwrap: string; }): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "icon",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1600,
                1652
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "color",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1656,
                1746
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "to",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1750,
                1800
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "target",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1804,
                1858
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1862,
                1949
              ]
            }
          ],
          "schema": "any"
        },
        {
          "name": "ui",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Callout.vue",
              "range": [
                1953,
                2046
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "Card": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
    "pascalName": "Card",
    "kebabName": "card",
    "chunkName": "components/card",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1663,
                1715
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "color",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1719,
                1809
              ]
            }
          ],
          "schema": "string",
          "default": "\"primary\""
        },
        {
          "name": "to",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1813,
                1863
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "target",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1867,
                1921
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1925,
                1978
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "ui",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                2073,
                2166
              ]
            }
          ],
          "schema": "any",
          "default": "{}"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{ unwrap: string; }",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{ unwrap: string; }",
            "schema": {
              "unwrap": {
                "name": "unwrap",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "string",
                "declarations": [],
                "schema": "string"
              }
            }
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: { unwrap: string; }): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: { unwrap: string; }): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: { unwrap: string; }) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: { unwrap: string; }): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "icon",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1663,
                1715
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "color",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1719,
                1809
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "to",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1813,
                1863
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "target",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1867,
                1921
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "title",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1925,
                1978
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                1982,
                2069
              ]
            }
          ],
          "schema": "any"
        },
        {
          "name": "ui",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue",
              "range": [
                2073,
                2166
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "CardGroup": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CardGroup.vue",
    "pascalName": "CardGroup",
    "kebabName": "card-group",
    "chunkName": "components/card-group",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CardGroup.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CardGroup.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CardGroup.vue",
              "range": [
                282,
                369
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "CodeGroup": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CodeGroup.vue",
    "pascalName": "CodeGroup",
    "kebabName": "code-group",
    "chunkName": "components/code-group",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CodeGroup.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CodeGroup.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CodeGroup.vue",
              "range": [
                1228,
                1315
              ]
            }
          ],
          "schema": "any"
        },
        {
          "name": "selectedIndex",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/CodeGroup.vue",
              "range": [
                1487,
                1500
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "Collapsible": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Collapsible.vue",
    "pascalName": "Collapsible",
    "kebabName": "collapsible",
    "chunkName": "components/collapsible",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Collapsible.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Collapsible.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Collapsible.vue",
              "range": [
                1080,
                1135
              ]
            }
          ],
          "schema": "string",
          "default": "\"properties\""
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{ unwrap: string; }",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{ unwrap: string; }",
            "schema": {
              "unwrap": {
                "name": "unwrap",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "string",
                "declarations": [],
                "schema": "string"
              }
            }
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: { unwrap: string; }): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: { unwrap: string; }): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: { unwrap: string; }) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: { unwrap: string; }): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "name",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Collapsible.vue",
              "range": [
                1080,
                1135
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "Field": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
    "pascalName": "Field",
    "kebabName": "field",
    "chunkName": "components/field",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                953,
                1001
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                953,
                1001
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "default",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1181,
                1236
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "description",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1005,
                1064
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1068,
                1120
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "required",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1124,
                1177
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "default",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1181,
                1236
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "description",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1005,
                1064
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "name",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                953,
                1001
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "type",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1068,
                1120
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "required",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1124,
                1177
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue",
              "range": [
                1240,
                1327
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "FieldGroup": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/FieldGroup.vue",
    "pascalName": "FieldGroup",
    "kebabName": "field-group",
    "chunkName": "components/field-group",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/FieldGroup.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/FieldGroup.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/FieldGroup.vue",
              "range": [
                380,
                467
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "Shortcut": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Shortcut.vue",
    "pascalName": "Shortcut",
    "kebabName": "shortcut",
    "chunkName": "components/shortcut",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Shortcut.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Shortcut.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "value",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Shortcut.vue",
              "range": [
                285,
                334
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Shortcut.vue",
              "range": [
                285,
                334
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "value",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Shortcut.vue",
              "range": [
                285,
                334
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Shortcut.vue",
              "range": [
                338,
                425
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "Tabs": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Tabs.vue",
    "pascalName": "Tabs",
    "kebabName": "tabs",
    "chunkName": "components/tabs",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Tabs.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Tabs.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "selectedIndex",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Tabs.vue",
              "range": [
                1382,
                1435
              ]
            }
          ],
          "schema": "number",
          "default": "0"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "selectedIndex",
          "type": "number",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Tabs.vue",
              "range": [
                1382,
                1435
              ]
            }
          ],
          "schema": "number"
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Tabs.vue",
              "range": [
                1439,
                1526
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "ProseCode": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
    "pascalName": "ProseCode",
    "kebabName": "prose-code",
    "chunkName": "components/prose-code",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "code",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                78,
                126
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                78,
                126
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                130,
                182
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "language",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                186,
                242
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "filename",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                305,
                361
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "highlights",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number[]",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                365,
                444
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "number[]",
            "schema": [
              "number"
            ]
          },
          "default": "undefined"
        },
        {
          "name": "meta",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                448,
                500
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "hideHeader",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                246,
                301
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "code",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                78,
                126
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "icon",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                130,
                182
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "language",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                186,
                242
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "hideHeader",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                246,
                301
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "filename",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                305,
                361
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "highlights",
          "type": "number[]",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                365,
                444
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "number[]",
            "schema": [
              "number"
            ]
          }
        },
        {
          "name": "meta",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCode.vue",
              "range": [
                448,
                500
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseCodeButton": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeButton.vue",
    "pascalName": "ProseCodeButton",
    "kebabName": "prose-code-button",
    "chunkName": "components/prose-code-button",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeButton.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeButton.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "code",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeButton.vue",
              "range": [
                55,
                103
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeButton.vue",
              "range": [
                55,
                103
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "code",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeButton.vue",
              "range": [
                55,
                103
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseCodeIcon": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeIcon.vue",
    "pascalName": "ProseCodeIcon",
    "kebabName": "prose-code-icon",
    "chunkName": "components/prose-code-icon",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeIcon.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeIcon.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeIcon.vue",
              "range": [
                55,
                107
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        },
        {
          "name": "filename",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeIcon.vue",
              "range": [
                111,
                167
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "icon",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeIcon.vue",
              "range": [
                55,
                107
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "filename",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeIcon.vue",
              "range": [
                111,
                167
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseH1": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH1.vue",
    "pascalName": "ProseH1",
    "kebabName": "prose-h1",
    "chunkName": "components/prose-h1",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH1.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH1.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH1.vue",
              "range": [
                414,
                460
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH1.vue",
              "range": [
                414,
                460
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "id",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH1.vue",
              "range": [
                414,
                460
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseH2": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH2.vue",
    "pascalName": "ProseH2",
    "kebabName": "prose-h2",
    "chunkName": "components/prose-h2",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH2.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH2.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH2.vue",
              "range": [
                414,
                460
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH2.vue",
              "range": [
                414,
                460
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "id",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH2.vue",
              "range": [
                414,
                460
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseH3": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH3.vue",
    "pascalName": "ProseH3",
    "kebabName": "prose-h3",
    "chunkName": "components/prose-h3",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH3.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH3.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH3.vue",
              "range": [
                414,
                460
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH3.vue",
              "range": [
                414,
                460
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "id",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH3.vue",
              "range": [
                414,
                460
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseH4": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH4.vue",
    "pascalName": "ProseH4",
    "kebabName": "prose-h4",
    "chunkName": "components/prose-h4",
    "shortPath": "node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH4.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH4.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH4.vue",
              "range": [
                414,
                460
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH4.vue",
              "range": [
                414,
                460
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "id",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH4.vue",
              "range": [
                414,
                460
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ContentDoc": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "pascalName": "ContentDoc",
    "kebabName": "content-doc",
    "chunkName": "components/content-doc",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "tag",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                4632,
                4644
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "path",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                4653,
                4666
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "query",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "QueryBuilderParams",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                4675,
                4701
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "QueryBuilderParams",
            "schema": {
              "first": {
                "name": "first",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9173,
                      9189
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "boolean",
                  "schema": [
                    "false",
                    "true"
                  ]
                }
              },
              "skip": {
                "name": "skip",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "number",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9194,
                      9208
                    ]
                  }
                ],
                "schema": "number"
              },
              "limit": {
                "name": "limit",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "number",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9213,
                      9228
                    ]
                  }
                ],
                "schema": "number"
              },
              "only": {
                "name": "only",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "string[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9233,
                      9249
                    ]
                  }
                ],
                "schema": {
                  "kind": "array",
                  "type": "string[]",
                  "schema": [
                    "string"
                  ]
                }
              },
              "without": {
                "name": "without",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "string[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9254,
                      9273
                    ]
                  }
                ],
                "schema": "string[]"
              },
              "sort": {
                "name": "sort",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "SortOptions[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9278,
                      9299
                    ]
                  }
                ],
                "schema": {
                  "kind": "array",
                  "type": "SortOptions[]",
                  "schema": [
                    {
                      "kind": "enum",
                      "type": "SortOptions",
                      "schema": [
                        {
                          "kind": "object",
                          "type": "SortParams",
                          "schema": {
                            "$locale": {
                              "name": "$locale",
                              "global": false,
                              "description": "Locale specifier for sorting\nA string with a BCP 47 language tag",
                              "tags": [
                                {
                                  "name": "default",
                                  "text": "undefined"
                                }
                              ],
                              "required": false,
                              "type": "string",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    3558,
                                    3575
                                  ]
                                }
                              ],
                              "schema": "string"
                            },
                            "$numeric": {
                              "name": "$numeric",
                              "global": false,
                              "description": "Whether numeric collation should be used, such that \"1\" < \"2\" < \"10\".\nPossible values are `true` and `false`;",
                              "tags": [
                                {
                                  "name": "default",
                                  "text": "false"
                                }
                              ],
                              "required": false,
                              "type": "boolean",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    3749,
                                    3768
                                  ]
                                }
                              ],
                              "schema": "boolean"
                            },
                            "$caseFirst": {
                              "name": "$caseFirst",
                              "global": false,
                              "description": "Whether upper case or lower case should sort first.\nPossible values are `\"upper\"`, `\"lower\"`, or `\"false\"`",
                              "tags": [
                                {
                                  "name": "default",
                                  "text": "\"depends on locale\""
                                }
                              ],
                              "required": false,
                              "type": "\"upper\" | \"lower\" | \"false\"",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    3953,
                                    3994
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "\"upper\" | \"lower\" | \"false\"",
                                "schema": [
                                  "\"upper\"",
                                  "\"lower\"",
                                  "\"false\""
                                ]
                              }
                            },
                            "$sensitivity": {
                              "name": "$sensitivity",
                              "global": false,
                              "description": "Which differences in the strings should lead to non-zero result values. Possible values are:\n - \"base\": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.\n - \"accent\": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.\n - \"case\": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.\n - \"variant\": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.",
                              "tags": [
                                {
                                  "name": "default",
                                  "text": "\"variant\""
                                }
                              ],
                              "required": false,
                              "type": "\"base\" | \"accent\" | \"case\" | \"variant\"",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    4733,
                                    4787
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "\"base\" | \"accent\" | \"case\" | \"variant\"",
                                "schema": [
                                  "\"base\"",
                                  "\"accent\"",
                                  "\"case\"",
                                  "\"variant\""
                                ]
                              }
                            }
                          }
                        },
                        {
                          "kind": "object",
                          "type": "SortFields",
                          "schema": {}
                        }
                      ]
                    }
                  ]
                }
              },
              "where": {
                "name": "where",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "QueryBuilderWhere[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9304,
                      9332
                    ]
                  }
                ],
                "schema": {
                  "kind": "array",
                  "type": "QueryBuilderWhere[]",
                  "schema": [
                    {
                      "kind": "object",
                      "type": "QueryBuilderWhere",
                      "schema": {
                        "$and": {
                          "name": "$and",
                          "global": false,
                          "description": "Match only if all of nested conditions are true",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n $and: [\n   { score: { $gte: 5 } },\n   { score: { $lte: 10 } }\n ]\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "QueryBuilderWhere[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                5305,
                                5332
                              ]
                            }
                          ],
                          "schema": "QueryBuilderWhere[]"
                        },
                        "$or": {
                          "name": "$or",
                          "global": false,
                          "description": "Match if any of nested conditions is true",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n $or: [\n   { score: { $gt: 5 } },\n   { score: { $lt: 3 } }\n ]\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "QueryBuilderWhere[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                5576,
                                5602
                              ]
                            }
                          ],
                          "schema": "QueryBuilderWhere[]"
                        },
                        "$not": {
                          "name": "$not",
                          "global": false,
                          "description": "Match is condition is false",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $not: 'Hello World'\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                5799,
                                5861
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                            "schema": [
                              "string",
                              "number",
                              "false",
                              "true",
                              {
                                "kind": "object",
                                "type": "RegExp",
                                "schema": {
                                  "exec": {
                                    "name": "exec",
                                    "global": false,
                                    "description": "Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string The String object or string literal on which to perform the search."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string) => RegExpExecArray",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          40960,
                                          41005
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string): RegExpExecArray",
                                      "schema": []
                                    }
                                  },
                                  "test": {
                                    "name": "test",
                                    "global": false,
                                    "description": "Returns a Boolean value that indicates whether or not a pattern exists in a searched string.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string String on which to perform the search."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string) => boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41187,
                                          41217
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string): boolean",
                                      "schema": []
                                    }
                                  },
                                  "source": {
                                    "name": "source",
                                    "global": false,
                                    "description": "Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal.",
                                    "tags": [],
                                    "required": true,
                                    "type": "string",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41399,
                                          41423
                                        ]
                                      }
                                    ],
                                    "schema": "string"
                                  },
                                  "global": {
                                    "name": "global",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41569,
                                          41594
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "ignoreCase": {
                                    "name": "ignoreCase",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41744,
                                          41773
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "multiline": {
                                    "name": "multiline",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41922,
                                          41950
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "lastIndex": {
                                    "name": "lastIndex",
                                    "global": false,
                                    "description": "",
                                    "tags": [],
                                    "required": true,
                                    "type": "number",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41956,
                                          41974
                                        ]
                                      }
                                    ],
                                    "schema": "number"
                                  },
                                  "compile": {
                                    "name": "compile",
                                    "global": false,
                                    "description": "",
                                    "tags": [
                                      {
                                        "name": "deprecated",
                                        "text": "A legacy feature for browser compatibility"
                                      }
                                    ],
                                    "required": true,
                                    "type": "(pattern: string, flags?: string) => RegExp",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          42077,
                                          42124
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(pattern: string, flags?: string): RegExp",
                                      "schema": []
                                    }
                                  },
                                  "flags": {
                                    "name": "flags",
                                    "global": false,
                                    "description": "Returns a string indicating the flags of the regular expression in question. This field is read-only.\nThe characters in this string are sequenced and concatenated in the following order:\n\n   - \"g\" for global\n   - \"i\" for ignoreCase\n   - \"m\" for multiline\n   - \"u\" for unicode\n   - \"y\" for sticky\n\nIf no flags are set, the value is the empty string.",
                                    "tags": [],
                                    "required": true,
                                    "type": "string",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.core.d.ts",
                                        "range": [
                                          14897,
                                          14920
                                        ]
                                      }
                                    ],
                                    "schema": "string"
                                  },
                                  "sticky": {
                                    "name": "sticky",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the sticky flag (y) used with a regular\nexpression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.core.d.ts",
                                        "range": [
                                          15085,
                                          15110
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "unicode": {
                                    "name": "unicode",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular\nexpression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.core.d.ts",
                                        "range": [
                                          15276,
                                          15302
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "dotAll": {
                                    "name": "dotAll",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression.\nDefault is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2018.regexp.d.ts",
                                        "range": [
                                          1204,
                                          1229
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "hasIndices": {
                                    "name": "hasIndices",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the hasIndices flag (d) used with with a regular expression.\nDefault is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2022.regexp.d.ts",
                                        "range": [
                                          1304,
                                          1333
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "__@match@5830": {
                                    "name": "__@match@5830",
                                    "global": false,
                                    "description": "Matches a string with this regular expression, and returns an array containing the results of\nthat search.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string A string to search within."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string) => RegExpMatchArray",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          5644,
                                          5700
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string): RegExpMatchArray",
                                      "schema": []
                                    }
                                  },
                                  "__@replace@5832": {
                                    "name": "__@replace@5832",
                                    "global": false,
                                    "description": "Replaces text in a string, using this regular expression.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                      },
                                      {
                                        "name": "param",
                                        "text": "replaceValue A String object or string literal containing the text to replace for every\nsuccessful match of this regular expression."
                                      },
                                      {
                                        "name": "param",
                                        "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                      },
                                      {
                                        "name": "param",
                                        "text": "replacer A function that returns the replacement text."
                                      }
                                    ],
                                    "required": true,
                                    "type": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          6110,
                                          6173
                                        ]
                                      },
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          6478,
                                          6576
                                        ]
                                      }
                                    ],
                                    "schema": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }"
                                  },
                                  "__@search@5835": {
                                    "name": "__@search@5835",
                                    "global": false,
                                    "description": "Finds the position beginning first substring match in a regular expression search\nusing this regular expression.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string The string to search within."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string) => number",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          6782,
                                          6822
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string): number",
                                      "schema": []
                                    }
                                  },
                                  "__@split@5837": {
                                    "name": "__@split@5837",
                                    "global": false,
                                    "description": "Returns an array of substrings that were delimited by strings in the original input that\nmatch against this regular expression.\n\nIf the regular expression contains capturing parentheses, then each time this\nregular expression matches, the results (including any undefined results) of the\ncapturing parentheses are spliced.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string string value to split"
                                      },
                                      {
                                        "name": "param",
                                        "text": "limit if not undefined, the output array is truncated so that it contains no more\nthan 'limit' elements."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string, limit?: number) => string[]",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          7384,
                                          7441
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string, limit?: number): string[]",
                                      "schema": []
                                    }
                                  },
                                  "__@matchAll@5839": {
                                    "name": "__@matchAll@5839",
                                    "global": false,
                                    "description": "Matches a string with this regular expression, and returns an iterable of matches\ncontaining the results of that search.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string A string to search within."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(str: string) => IterableIterator<RegExpMatchArray>",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2020.symbol.wellknown.d.ts",
                                        "range": [
                                          1385,
                                          1452
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(str: string): IterableIterator<RegExpMatchArray>",
                                      "schema": []
                                    }
                                  }
                                }
                              },
                              "QueryBuilderWhere"
                            ]
                          }
                        },
                        "$eq": {
                          "name": "$eq",
                          "global": false,
                          "description": "Match if item equals condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $eq: 'Hello World'\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | number | boolean | RegExp",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6060,
                                6101
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | number | boolean | RegExp",
                            "schema": [
                              "string",
                              "number",
                              "false",
                              "true",
                              "RegExp"
                            ]
                          }
                        },
                        "$ne": {
                          "name": "$ne",
                          "global": false,
                          "description": "Match if item not equals condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $ne: 100\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | number | boolean | RegExp",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6294,
                                6335
                              ]
                            }
                          ],
                          "schema": "string | number | boolean | RegExp"
                        },
                        "$gt": {
                          "name": "$gt",
                          "global": false,
                          "description": "Check if item is greater than condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $gt: 99.5\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6533,
                                6546
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "$gte": {
                          "name": "$gte",
                          "global": false,
                          "description": "Check if item is greater than or equal to condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $gte: 99.5\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6757,
                                6771
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "$lt": {
                          "name": "$lt",
                          "global": false,
                          "description": "Check if item is less than condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $lt: 99.5\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6966,
                                6979
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "$lte": {
                          "name": "$lte",
                          "global": false,
                          "description": "Check if item is less than or equal to condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $lte: 99.5\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                7187,
                                7201
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "$regex": {
                          "name": "$regex",
                          "global": false,
                          "description": "Provides regular expression capabilities for pattern matching strings.",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $regex: /^foo/\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | RegExp",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                7435,
                                7460
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | RegExp",
                            "schema": [
                              "string",
                              "RegExp"
                            ]
                          }
                        },
                        "$type": {
                          "name": "$type",
                          "global": false,
                          "description": "Match if type of item equals condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n field: {\n   $type: 'boolean'\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                7664,
                                7679
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "$exists": {
                          "name": "$exists",
                          "global": false,
                          "description": "Check key existence",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n tag: {\n   $exists: false\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "boolean",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                7860,
                                7878
                              ]
                            }
                          ],
                          "schema": "boolean"
                        },
                        "$contains": {
                          "name": "$contains",
                          "global": false,
                          "description": "Match if item contains every condition or match every rule in condition array",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $contains: ['Hello', 'World']\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | number | boolean | (string | number | boolean)[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                8135,
                                8208
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | number | boolean | (string | number | boolean)[]",
                            "schema": [
                              "string",
                              "number",
                              "false",
                              "true",
                              {
                                "kind": "array",
                                "type": "(string | number | boolean)[]",
                                "schema": [
                                  {
                                    "kind": "enum",
                                    "type": "string | number | boolean",
                                    "schema": [
                                      "string",
                                      "number",
                                      "false",
                                      "true"
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        },
                        "$containsAny": {
                          "name": "$containsAny",
                          "global": false,
                          "description": "Match if item contains at least one rule from condition array",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $containsAny: ['Hello', 'World']\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "(string | number | boolean)[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                8451,
                                8499
                              ]
                            }
                          ],
                          "schema": "(string | number | boolean)[]"
                        },
                        "$icontains": {
                          "name": "$icontains",
                          "global": false,
                          "description": "Ignore case contains",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $icontains: 'hello world'\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                8695,
                                8715
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "$in": {
                          "name": "$in",
                          "global": false,
                          "description": "Match if item is in condition array",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n category: {\n   $in: ['sport', 'nature', 'travel']\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | (string | number | boolean)[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                8938,
                                8986
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | (string | number | boolean)[]",
                            "schema": [
                              "string",
                              "(string | number | boolean)[]"
                            ]
                          }
                        },
                        "_id": {
                          "name": "_id",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_source": {
                          "name": "_source",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_path": {
                          "name": "_path",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "title": {
                          "name": "title",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_draft": {
                          "name": "_draft",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_partial": {
                          "name": "_partial",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_locale": {
                          "name": "_locale",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_type": {
                          "name": "_type",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_file": {
                          "name": "_file",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_extension": {
                          "name": "_extension",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        }
                      }
                    }
                  ]
                }
              },
              "surround": {
                "name": "surround",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "{ query: string | QueryBuilderWhere; before?: number; after?: number; }",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9337,
                      9448
                    ]
                  }
                ],
                "schema": {
                  "kind": "object",
                  "type": "{ query: string | QueryBuilderWhere; before?: number; after?: number; }",
                  "schema": {
                    "query": {
                      "name": "query",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": true,
                      "type": "string | QueryBuilderWhere",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            9358,
                            9392
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "enum",
                        "type": "string | QueryBuilderWhere",
                        "schema": [
                          "string",
                          "QueryBuilderWhere"
                        ]
                      }
                    },
                    "before": {
                      "name": "before",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": false,
                      "type": "number",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            9401,
                            9417
                          ]
                        }
                      ],
                      "schema": "number"
                    },
                    "after": {
                      "name": "after",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": false,
                      "type": "number",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            9426,
                            9441
                          ]
                        }
                      ],
                      "schema": "number"
                    }
                  }
                }
              }
            }
          }
        },
        {
          "name": "excerpt",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                4606,
                4623
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "head",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                4710,
                4724
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{ doc: ParsedContent; refresh: () => Promise<void>; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                6347,
                6476
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "{ doc: ParsedContent; refresh: () => Promise<void>; }",
            "schema": {
              "doc": {
                "name": "doc",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "ParsedContent",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
                    "range": [
                      6380,
                      6399
                    ]
                  }
                ],
                "schema": {
                  "kind": "object",
                  "type": "ParsedContent",
                  "schema": {
                    "excerpt": {
                      "name": "excerpt",
                      "global": false,
                      "description": "Excerpt",
                      "tags": [],
                      "required": false,
                      "type": "MarkdownRoot",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            2459,
                            2482
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "object",
                        "type": "MarkdownRoot",
                        "schema": {
                          "type": {
                            "name": "type",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "\"root\"",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1465,
                                  1478
                                ]
                              }
                            ],
                            "schema": "\"root\""
                          },
                          "children": {
                            "name": "children",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "MarkdownNode[]",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1483,
                                  1508
                                ]
                              }
                            ],
                            "schema": {
                              "kind": "array",
                              "type": "MarkdownNode[]",
                              "schema": [
                                {
                                  "kind": "object",
                                  "type": "MarkdownNode",
                                  "schema": {
                                    "type": {
                                      "name": "type",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1214,
                                            1227
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "tag": {
                                      "name": "tag",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1232,
                                            1245
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "value": {
                                      "name": "value",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1250,
                                            1265
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "props": {
                                      "name": "props",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "Record<string, any>",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1270,
                                            1298
                                          ]
                                        }
                                      ],
                                      "schema": "Record<string, any>"
                                    },
                                    "content": {
                                      "name": "content",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "any",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1303,
                                            1317
                                          ]
                                        }
                                      ],
                                      "schema": "any"
                                    },
                                    "children": {
                                      "name": "children",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "MarkdownNode[]",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1322,
                                            1348
                                          ]
                                        }
                                      ],
                                      "schema": "MarkdownNode[]"
                                    },
                                    "attributes": {
                                      "name": "attributes",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "Record<string, any>",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1353,
                                            1386
                                          ]
                                        }
                                      ],
                                      "schema": "Record<string, any>"
                                    },
                                    "fmAttributes": {
                                      "name": "fmAttributes",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "Record<string, any>",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1391,
                                            1426
                                          ]
                                        }
                                      ],
                                      "schema": "Record<string, any>"
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          "props": {
                            "name": "props",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": false,
                            "type": "Record<string, any>",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1513,
                                  1541
                                ]
                              }
                            ],
                            "schema": "Record<string, any>"
                          },
                          "toc": {
                            "name": "toc",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": false,
                            "type": "Toc",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1546,
                                  1556
                                ]
                              }
                            ],
                            "schema": {
                              "kind": "object",
                              "type": "Toc",
                              "schema": {
                                "title": {
                                  "name": "title",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": true,
                                  "type": "string",
                                  "declarations": [
                                    {
                                      "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                      "range": [
                                        1095,
                                        1109
                                      ]
                                    }
                                  ],
                                  "schema": "string"
                                },
                                "depth": {
                                  "name": "depth",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": true,
                                  "type": "number",
                                  "declarations": [
                                    {
                                      "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                      "range": [
                                        1114,
                                        1128
                                      ]
                                    }
                                  ],
                                  "schema": "number"
                                },
                                "searchDepth": {
                                  "name": "searchDepth",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": true,
                                  "type": "number",
                                  "declarations": [
                                    {
                                      "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                      "range": [
                                        1133,
                                        1153
                                      ]
                                    }
                                  ],
                                  "schema": "number"
                                },
                                "links": {
                                  "name": "links",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": true,
                                  "type": "TocLink[]",
                                  "declarations": [
                                    {
                                      "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                      "range": [
                                        1158,
                                        1175
                                      ]
                                    }
                                  ],
                                  "schema": {
                                    "kind": "array",
                                    "type": "TocLink[]",
                                    "schema": [
                                      {
                                        "kind": "object",
                                        "type": "TocLink",
                                        "schema": {
                                          "id": {
                                            "name": "id",
                                            "global": false,
                                            "description": "",
                                            "tags": [],
                                            "required": true,
                                            "type": "string",
                                            "declarations": [
                                              {
                                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                "range": [
                                                  991,
                                                  1002
                                                ]
                                              }
                                            ],
                                            "schema": "string"
                                          },
                                          "text": {
                                            "name": "text",
                                            "global": false,
                                            "description": "",
                                            "tags": [],
                                            "required": true,
                                            "type": "string",
                                            "declarations": [
                                              {
                                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                "range": [
                                                  1007,
                                                  1020
                                                ]
                                              }
                                            ],
                                            "schema": "string"
                                          },
                                          "depth": {
                                            "name": "depth",
                                            "global": false,
                                            "description": "",
                                            "tags": [],
                                            "required": true,
                                            "type": "number",
                                            "declarations": [
                                              {
                                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                "range": [
                                                  1025,
                                                  1039
                                                ]
                                              }
                                            ],
                                            "schema": "number"
                                          },
                                          "children": {
                                            "name": "children",
                                            "global": false,
                                            "description": "",
                                            "tags": [],
                                            "required": false,
                                            "type": "TocLink[]",
                                            "declarations": [
                                              {
                                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                "range": [
                                                  1044,
                                                  1065
                                                ]
                                              }
                                            ],
                                            "schema": "TocLink[]"
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "body": {
                      "name": "body",
                      "global": false,
                      "description": "Content body",
                      "tags": [],
                      "required": true,
                      "type": "MarkdownRoot",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            2523,
                            2549
                          ]
                        }
                      ],
                      "schema": "MarkdownRoot"
                    },
                    "layout": {
                      "name": "layout",
                      "global": false,
                      "description": "Layout",
                      "tags": [],
                      "required": false,
                      "type": "\"docs\"",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            2319,
                            2338
                          ]
                        }
                      ],
                      "schema": "\"docs\""
                    },
                    "_id": {
                      "name": "_id",
                      "global": false,
                      "description": "Content id",
                      "tags": [],
                      "required": true,
                      "type": "string",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            185,
                            197
                          ]
                        }
                      ],
                      "schema": "string"
                    },
                    "_source": {
                      "name": "_source",
                      "global": false,
                      "description": "Content source",
                      "tags": [],
                      "required": false,
                      "type": "string",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            240,
                            257
                          ]
                        }
                      ],
                      "schema": "string"
                    },
                    "_path": {
                      "name": "_path",
                      "global": false,
                      "description": "Content path, this path is source agnostic and it the content my live in any source",
                      "tags": [],
                      "required": false,
                      "type": "string",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            369,
                            384
                          ]
                        }
                      ],
                      "schema": "string"
                    },
                    "title": {
                      "name": "title",
                      "global": false,
                      "description": "Content title",
                      "tags": [],
                      "required": false,
                      "type": "string",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            426,
                            441
                          ]
                        }
                      ],
                      "schema": "string"
                    },
                    "_draft": {
                      "name": "_draft",
                      "global": false,
                      "description": "Content draft status",
                      "tags": [],
                      "required": false,
                      "type": "boolean",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            490,
                            507
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "enum",
                        "type": "boolean",
                        "schema": [
                          "false",
                          "true"
                        ]
                      }
                    },
                    "_partial": {
                      "name": "_partial",
                      "global": false,
                      "description": "Content partial status",
                      "tags": [],
                      "required": false,
                      "type": "boolean",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            558,
                            577
                          ]
                        }
                      ],
                      "schema": "boolean"
                    },
                    "_locale": {
                      "name": "_locale",
                      "global": false,
                      "description": "Content locale",
                      "tags": [],
                      "required": false,
                      "type": "string",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            620,
                            637
                          ]
                        }
                      ],
                      "schema": "string"
                    },
                    "_type": {
                      "name": "_type",
                      "global": false,
                      "description": "File type of the content, i.e `markdown`",
                      "tags": [],
                      "required": false,
                      "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            706,
                            751
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "enum",
                        "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                        "schema": [
                          "\"markdown\"",
                          "\"yaml\"",
                          "\"json\"",
                          "\"csv\""
                        ]
                      }
                    },
                    "_file": {
                      "name": "_file",
                      "global": false,
                      "description": "Path to the file relative to the content directory",
                      "tags": [],
                      "required": false,
                      "type": "string",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            830,
                            845
                          ]
                        }
                      ],
                      "schema": "string"
                    },
                    "_extension": {
                      "name": "_extension",
                      "global": false,
                      "description": "Extension of the file",
                      "tags": [],
                      "required": false,
                      "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            895,
                            957
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "enum",
                        "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                        "schema": [
                          "\"yaml\"",
                          "\"json\"",
                          "\"csv\"",
                          "\"md\"",
                          "\"yml\"",
                          "\"json5\""
                        ]
                      }
                    }
                  }
                }
              },
              "refresh": {
                "name": "refresh",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "() => Promise<void>",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
                    "range": [
                      6412,
                      6441
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(): Promise<void>"
                }
              }
            }
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default: (context: { doc: ParsedContent; refresh: () => Promise<void>; }) => VNode<RendererNode, RendererElement, { ...; }>[]; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                6329,
                6483
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default: (context: { doc: ParsedContent; refresh: () => Promise<void>; }) => VNode<RendererNode, RendererElement, { ...; }>[]; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "(context: { doc: ParsedContent; refresh: () => Promise<void>; }) => VNode<RendererNode, RendererElement, { [key: string]: any; }>[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
                    "range": [
                      6347,
                      6476
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(context: { doc: ParsedContent; refresh: () => Promise<void>; }): VNode<RendererNode, RendererElement, { [key: string]: any; }>[]",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "tag",
          "type": "string",
          "description": "The tag to use for the renderer element if it is used.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                3494,
                3606
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "excerpt",
          "type": "boolean",
          "description": "Whether or not to render the excerpt.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                3714,
                3803
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "path",
          "type": "string",
          "description": "The path of the content to load from content source.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                3983,
                4099
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "query",
          "type": "undefined",
          "description": "A query builder params object to be passed to <ContentQuery /> component.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                4217,
                4345
              ]
            }
          ],
          "schema": "undefined"
        },
        {
          "name": "head",
          "type": "boolean",
          "description": "Whether or not to map the document data to the `head` property.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue.d.ts",
              "range": [
                4453,
                4570
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "ContentList": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "pascalName": "ContentList",
    "kebabName": "content-list",
    "chunkName": "components/content-list",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "path",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
              "range": [
                2373,
                2386
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "query",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "QueryBuilderParams",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
              "range": [
                2395,
                2421
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "QueryBuilderParams",
            "schema": {
              "first": {
                "name": "first",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9173,
                      9189
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "boolean",
                  "schema": [
                    "false",
                    "true"
                  ]
                }
              },
              "skip": {
                "name": "skip",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "number",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9194,
                      9208
                    ]
                  }
                ],
                "schema": "number"
              },
              "limit": {
                "name": "limit",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "number",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9213,
                      9228
                    ]
                  }
                ],
                "schema": "number"
              },
              "only": {
                "name": "only",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "string[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9233,
                      9249
                    ]
                  }
                ],
                "schema": {
                  "kind": "array",
                  "type": "string[]",
                  "schema": [
                    "string"
                  ]
                }
              },
              "without": {
                "name": "without",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "string[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9254,
                      9273
                    ]
                  }
                ],
                "schema": "string[]"
              },
              "sort": {
                "name": "sort",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "SortOptions[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9278,
                      9299
                    ]
                  }
                ],
                "schema": {
                  "kind": "array",
                  "type": "SortOptions[]",
                  "schema": [
                    {
                      "kind": "enum",
                      "type": "SortOptions",
                      "schema": [
                        {
                          "kind": "object",
                          "type": "SortParams",
                          "schema": {
                            "$locale": {
                              "name": "$locale",
                              "global": false,
                              "description": "Locale specifier for sorting\nA string with a BCP 47 language tag",
                              "tags": [
                                {
                                  "name": "default",
                                  "text": "undefined"
                                }
                              ],
                              "required": false,
                              "type": "string",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    3558,
                                    3575
                                  ]
                                }
                              ],
                              "schema": "string"
                            },
                            "$numeric": {
                              "name": "$numeric",
                              "global": false,
                              "description": "Whether numeric collation should be used, such that \"1\" < \"2\" < \"10\".\nPossible values are `true` and `false`;",
                              "tags": [
                                {
                                  "name": "default",
                                  "text": "false"
                                }
                              ],
                              "required": false,
                              "type": "boolean",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    3749,
                                    3768
                                  ]
                                }
                              ],
                              "schema": "boolean"
                            },
                            "$caseFirst": {
                              "name": "$caseFirst",
                              "global": false,
                              "description": "Whether upper case or lower case should sort first.\nPossible values are `\"upper\"`, `\"lower\"`, or `\"false\"`",
                              "tags": [
                                {
                                  "name": "default",
                                  "text": "\"depends on locale\""
                                }
                              ],
                              "required": false,
                              "type": "\"upper\" | \"lower\" | \"false\"",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    3953,
                                    3994
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "\"upper\" | \"lower\" | \"false\"",
                                "schema": [
                                  "\"upper\"",
                                  "\"lower\"",
                                  "\"false\""
                                ]
                              }
                            },
                            "$sensitivity": {
                              "name": "$sensitivity",
                              "global": false,
                              "description": "Which differences in the strings should lead to non-zero result values. Possible values are:\n - \"base\": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.\n - \"accent\": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.\n - \"case\": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.\n - \"variant\": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.",
                              "tags": [
                                {
                                  "name": "default",
                                  "text": "\"variant\""
                                }
                              ],
                              "required": false,
                              "type": "\"base\" | \"accent\" | \"case\" | \"variant\"",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    4733,
                                    4787
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "\"base\" | \"accent\" | \"case\" | \"variant\"",
                                "schema": [
                                  "\"base\"",
                                  "\"accent\"",
                                  "\"case\"",
                                  "\"variant\""
                                ]
                              }
                            }
                          }
                        },
                        {
                          "kind": "object",
                          "type": "SortFields",
                          "schema": {}
                        }
                      ]
                    }
                  ]
                }
              },
              "where": {
                "name": "where",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "QueryBuilderWhere[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9304,
                      9332
                    ]
                  }
                ],
                "schema": {
                  "kind": "array",
                  "type": "QueryBuilderWhere[]",
                  "schema": [
                    {
                      "kind": "object",
                      "type": "QueryBuilderWhere",
                      "schema": {
                        "$and": {
                          "name": "$and",
                          "global": false,
                          "description": "Match only if all of nested conditions are true",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n $and: [\n   { score: { $gte: 5 } },\n   { score: { $lte: 10 } }\n ]\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "QueryBuilderWhere[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                5305,
                                5332
                              ]
                            }
                          ],
                          "schema": "QueryBuilderWhere[]"
                        },
                        "$or": {
                          "name": "$or",
                          "global": false,
                          "description": "Match if any of nested conditions is true",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n $or: [\n   { score: { $gt: 5 } },\n   { score: { $lt: 3 } }\n ]\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "QueryBuilderWhere[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                5576,
                                5602
                              ]
                            }
                          ],
                          "schema": "QueryBuilderWhere[]"
                        },
                        "$not": {
                          "name": "$not",
                          "global": false,
                          "description": "Match is condition is false",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $not: 'Hello World'\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                5799,
                                5861
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                            "schema": [
                              "string",
                              "number",
                              "false",
                              "true",
                              {
                                "kind": "object",
                                "type": "RegExp",
                                "schema": {
                                  "exec": {
                                    "name": "exec",
                                    "global": false,
                                    "description": "Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string The String object or string literal on which to perform the search."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string) => RegExpExecArray",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          40960,
                                          41005
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string): RegExpExecArray",
                                      "schema": []
                                    }
                                  },
                                  "test": {
                                    "name": "test",
                                    "global": false,
                                    "description": "Returns a Boolean value that indicates whether or not a pattern exists in a searched string.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string String on which to perform the search."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string) => boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41187,
                                          41217
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string): boolean",
                                      "schema": []
                                    }
                                  },
                                  "source": {
                                    "name": "source",
                                    "global": false,
                                    "description": "Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal.",
                                    "tags": [],
                                    "required": true,
                                    "type": "string",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41399,
                                          41423
                                        ]
                                      }
                                    ],
                                    "schema": "string"
                                  },
                                  "global": {
                                    "name": "global",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41569,
                                          41594
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "ignoreCase": {
                                    "name": "ignoreCase",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41744,
                                          41773
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "multiline": {
                                    "name": "multiline",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41922,
                                          41950
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "lastIndex": {
                                    "name": "lastIndex",
                                    "global": false,
                                    "description": "",
                                    "tags": [],
                                    "required": true,
                                    "type": "number",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          41956,
                                          41974
                                        ]
                                      }
                                    ],
                                    "schema": "number"
                                  },
                                  "compile": {
                                    "name": "compile",
                                    "global": false,
                                    "description": "",
                                    "tags": [
                                      {
                                        "name": "deprecated",
                                        "text": "A legacy feature for browser compatibility"
                                      }
                                    ],
                                    "required": true,
                                    "type": "(pattern: string, flags?: string) => RegExp",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                                        "range": [
                                          42077,
                                          42124
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(pattern: string, flags?: string): RegExp",
                                      "schema": []
                                    }
                                  },
                                  "flags": {
                                    "name": "flags",
                                    "global": false,
                                    "description": "Returns a string indicating the flags of the regular expression in question. This field is read-only.\nThe characters in this string are sequenced and concatenated in the following order:\n\n   - \"g\" for global\n   - \"i\" for ignoreCase\n   - \"m\" for multiline\n   - \"u\" for unicode\n   - \"y\" for sticky\n\nIf no flags are set, the value is the empty string.",
                                    "tags": [],
                                    "required": true,
                                    "type": "string",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.core.d.ts",
                                        "range": [
                                          14897,
                                          14920
                                        ]
                                      }
                                    ],
                                    "schema": "string"
                                  },
                                  "sticky": {
                                    "name": "sticky",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the sticky flag (y) used with a regular\nexpression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.core.d.ts",
                                        "range": [
                                          15085,
                                          15110
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "unicode": {
                                    "name": "unicode",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular\nexpression. Default is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.core.d.ts",
                                        "range": [
                                          15276,
                                          15302
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "dotAll": {
                                    "name": "dotAll",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression.\nDefault is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2018.regexp.d.ts",
                                        "range": [
                                          1204,
                                          1229
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "hasIndices": {
                                    "name": "hasIndices",
                                    "global": false,
                                    "description": "Returns a Boolean value indicating the state of the hasIndices flag (d) used with with a regular expression.\nDefault is false. Read-only.",
                                    "tags": [],
                                    "required": true,
                                    "type": "boolean",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2022.regexp.d.ts",
                                        "range": [
                                          1304,
                                          1333
                                        ]
                                      }
                                    ],
                                    "schema": "boolean"
                                  },
                                  "__@match@5830": {
                                    "name": "__@match@5830",
                                    "global": false,
                                    "description": "Matches a string with this regular expression, and returns an array containing the results of\nthat search.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string A string to search within."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string) => RegExpMatchArray",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          5644,
                                          5700
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string): RegExpMatchArray",
                                      "schema": []
                                    }
                                  },
                                  "__@replace@5832": {
                                    "name": "__@replace@5832",
                                    "global": false,
                                    "description": "Replaces text in a string, using this regular expression.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                      },
                                      {
                                        "name": "param",
                                        "text": "replaceValue A String object or string literal containing the text to replace for every\nsuccessful match of this regular expression."
                                      },
                                      {
                                        "name": "param",
                                        "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                      },
                                      {
                                        "name": "param",
                                        "text": "replacer A function that returns the replacement text."
                                      }
                                    ],
                                    "required": true,
                                    "type": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          6110,
                                          6173
                                        ]
                                      },
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          6478,
                                          6576
                                        ]
                                      }
                                    ],
                                    "schema": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }"
                                  },
                                  "__@search@5835": {
                                    "name": "__@search@5835",
                                    "global": false,
                                    "description": "Finds the position beginning first substring match in a regular expression search\nusing this regular expression.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string The string to search within."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string) => number",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          6782,
                                          6822
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string): number",
                                      "schema": []
                                    }
                                  },
                                  "__@split@5837": {
                                    "name": "__@split@5837",
                                    "global": false,
                                    "description": "Returns an array of substrings that were delimited by strings in the original input that\nmatch against this regular expression.\n\nIf the regular expression contains capturing parentheses, then each time this\nregular expression matches, the results (including any undefined results) of the\ncapturing parentheses are spliced.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string string value to split"
                                      },
                                      {
                                        "name": "param",
                                        "text": "limit if not undefined, the output array is truncated so that it contains no more\nthan 'limit' elements."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(string: string, limit?: number) => string[]",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                                        "range": [
                                          7384,
                                          7441
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(string: string, limit?: number): string[]",
                                      "schema": []
                                    }
                                  },
                                  "__@matchAll@5839": {
                                    "name": "__@matchAll@5839",
                                    "global": false,
                                    "description": "Matches a string with this regular expression, and returns an iterable of matches\ncontaining the results of that search.",
                                    "tags": [
                                      {
                                        "name": "param",
                                        "text": "string A string to search within."
                                      }
                                    ],
                                    "required": true,
                                    "type": "(str: string) => IterableIterator<RegExpMatchArray>",
                                    "declarations": [
                                      {
                                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2020.symbol.wellknown.d.ts",
                                        "range": [
                                          1385,
                                          1452
                                        ]
                                      }
                                    ],
                                    "schema": {
                                      "kind": "event",
                                      "type": "(str: string): IterableIterator<RegExpMatchArray>",
                                      "schema": []
                                    }
                                  }
                                }
                              },
                              "QueryBuilderWhere"
                            ]
                          }
                        },
                        "$eq": {
                          "name": "$eq",
                          "global": false,
                          "description": "Match if item equals condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $eq: 'Hello World'\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | number | boolean | RegExp",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6060,
                                6101
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | number | boolean | RegExp",
                            "schema": [
                              "string",
                              "number",
                              "false",
                              "true",
                              "RegExp"
                            ]
                          }
                        },
                        "$ne": {
                          "name": "$ne",
                          "global": false,
                          "description": "Match if item not equals condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $ne: 100\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | number | boolean | RegExp",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6294,
                                6335
                              ]
                            }
                          ],
                          "schema": "string | number | boolean | RegExp"
                        },
                        "$gt": {
                          "name": "$gt",
                          "global": false,
                          "description": "Check if item is greater than condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $gt: 99.5\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6533,
                                6546
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "$gte": {
                          "name": "$gte",
                          "global": false,
                          "description": "Check if item is greater than or equal to condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $gte: 99.5\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6757,
                                6771
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "$lt": {
                          "name": "$lt",
                          "global": false,
                          "description": "Check if item is less than condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $lt: 99.5\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                6966,
                                6979
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "$lte": {
                          "name": "$lte",
                          "global": false,
                          "description": "Check if item is less than or equal to condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n score: {\n   $lte: 99.5\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                7187,
                                7201
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "$regex": {
                          "name": "$regex",
                          "global": false,
                          "description": "Provides regular expression capabilities for pattern matching strings.",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $regex: /^foo/\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | RegExp",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                7435,
                                7460
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | RegExp",
                            "schema": [
                              "string",
                              "RegExp"
                            ]
                          }
                        },
                        "$type": {
                          "name": "$type",
                          "global": false,
                          "description": "Match if type of item equals condition",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n field: {\n   $type: 'boolean'\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                7664,
                                7679
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "$exists": {
                          "name": "$exists",
                          "global": false,
                          "description": "Check key existence",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n tag: {\n   $exists: false\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "boolean",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                7860,
                                7878
                              ]
                            }
                          ],
                          "schema": "boolean"
                        },
                        "$contains": {
                          "name": "$contains",
                          "global": false,
                          "description": "Match if item contains every condition or match every rule in condition array",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $contains: ['Hello', 'World']\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | number | boolean | (string | number | boolean)[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                8135,
                                8208
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | number | boolean | (string | number | boolean)[]",
                            "schema": [
                              "string",
                              "number",
                              "false",
                              "true",
                              {
                                "kind": "array",
                                "type": "(string | number | boolean)[]",
                                "schema": [
                                  {
                                    "kind": "enum",
                                    "type": "string | number | boolean",
                                    "schema": [
                                      "string",
                                      "number",
                                      "false",
                                      "true"
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        },
                        "$containsAny": {
                          "name": "$containsAny",
                          "global": false,
                          "description": "Match if item contains at least one rule from condition array",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $containsAny: ['Hello', 'World']\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "(string | number | boolean)[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                8451,
                                8499
                              ]
                            }
                          ],
                          "schema": "(string | number | boolean)[]"
                        },
                        "$icontains": {
                          "name": "$icontains",
                          "global": false,
                          "description": "Ignore case contains",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n title: {\n   $icontains: 'hello world'\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                8695,
                                8715
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "$in": {
                          "name": "$in",
                          "global": false,
                          "description": "Match if item is in condition array",
                          "tags": [
                            {
                              "name": "example",
                              "text": "```ts\nqueryContent().where({\n category: {\n   $in: ['sport', 'nature', 'travel']\n }\n})\n```"
                            }
                          ],
                          "required": false,
                          "type": "string | (string | number | boolean)[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                8938,
                                8986
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | (string | number | boolean)[]",
                            "schema": [
                              "string",
                              "(string | number | boolean)[]"
                            ]
                          }
                        },
                        "_id": {
                          "name": "_id",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_source": {
                          "name": "_source",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_path": {
                          "name": "_path",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "title": {
                          "name": "title",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_draft": {
                          "name": "_draft",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_partial": {
                          "name": "_partial",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_locale": {
                          "name": "_locale",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_type": {
                          "name": "_type",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_file": {
                          "name": "_file",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        },
                        "_extension": {
                          "name": "_extension",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                          "declarations": [],
                          "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                        }
                      }
                    }
                  ]
                }
              },
              "surround": {
                "name": "surround",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "{ query: string | QueryBuilderWhere; before?: number; after?: number; }",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      9337,
                      9448
                    ]
                  }
                ],
                "schema": {
                  "kind": "object",
                  "type": "{ query: string | QueryBuilderWhere; before?: number; after?: number; }",
                  "schema": {
                    "query": {
                      "name": "query",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": true,
                      "type": "string | QueryBuilderWhere",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            9358,
                            9392
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "enum",
                        "type": "string | QueryBuilderWhere",
                        "schema": [
                          "string",
                          "QueryBuilderWhere"
                        ]
                      }
                    },
                    "before": {
                      "name": "before",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": false,
                      "type": "number",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            9401,
                            9417
                          ]
                        }
                      ],
                      "schema": "number"
                    },
                    "after": {
                      "name": "after",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": false,
                      "type": "number",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            9426,
                            9441
                          ]
                        }
                      ],
                      "schema": "number"
                    }
                  }
                }
              }
            }
          }
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{ list: ParsedContent[]; refresh: () => Promise<void>; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
              "range": [
                3377,
                3509
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "{ list: ParsedContent[]; refresh: () => Promise<void>; }",
            "schema": {
              "list": {
                "name": "list",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "ParsedContent[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
                    "range": [
                      3410,
                      3432
                    ]
                  }
                ],
                "schema": {
                  "kind": "array",
                  "type": "ParsedContent[]",
                  "schema": [
                    {
                      "kind": "object",
                      "type": "ParsedContent",
                      "schema": {
                        "excerpt": {
                          "name": "excerpt",
                          "global": false,
                          "description": "Excerpt",
                          "tags": [],
                          "required": false,
                          "type": "MarkdownRoot",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                2459,
                                2482
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "object",
                            "type": "MarkdownRoot",
                            "schema": {
                              "type": {
                                "name": "type",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": true,
                                "type": "\"root\"",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1465,
                                      1478
                                    ]
                                  }
                                ],
                                "schema": "\"root\""
                              },
                              "children": {
                                "name": "children",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": true,
                                "type": "MarkdownNode[]",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1483,
                                      1508
                                    ]
                                  }
                                ],
                                "schema": {
                                  "kind": "array",
                                  "type": "MarkdownNode[]",
                                  "schema": [
                                    {
                                      "kind": "object",
                                      "type": "MarkdownNode",
                                      "schema": {
                                        "type": {
                                          "name": "type",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": true,
                                          "type": "string",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1214,
                                                1227
                                              ]
                                            }
                                          ],
                                          "schema": "string"
                                        },
                                        "tag": {
                                          "name": "tag",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "string",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1232,
                                                1245
                                              ]
                                            }
                                          ],
                                          "schema": "string"
                                        },
                                        "value": {
                                          "name": "value",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "string",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1250,
                                                1265
                                              ]
                                            }
                                          ],
                                          "schema": "string"
                                        },
                                        "props": {
                                          "name": "props",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "Record<string, any>",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1270,
                                                1298
                                              ]
                                            }
                                          ],
                                          "schema": "Record<string, any>"
                                        },
                                        "content": {
                                          "name": "content",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "any",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1303,
                                                1317
                                              ]
                                            }
                                          ],
                                          "schema": "any"
                                        },
                                        "children": {
                                          "name": "children",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "MarkdownNode[]",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1322,
                                                1348
                                              ]
                                            }
                                          ],
                                          "schema": "MarkdownNode[]"
                                        },
                                        "attributes": {
                                          "name": "attributes",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "Record<string, any>",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1353,
                                                1386
                                              ]
                                            }
                                          ],
                                          "schema": "Record<string, any>"
                                        },
                                        "fmAttributes": {
                                          "name": "fmAttributes",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "Record<string, any>",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1391,
                                                1426
                                              ]
                                            }
                                          ],
                                          "schema": "Record<string, any>"
                                        }
                                      }
                                    }
                                  ]
                                }
                              },
                              "props": {
                                "name": "props",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Record<string, any>",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1513,
                                      1541
                                    ]
                                  }
                                ],
                                "schema": "Record<string, any>"
                              },
                              "toc": {
                                "name": "toc",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Toc",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1546,
                                      1556
                                    ]
                                  }
                                ],
                                "schema": {
                                  "kind": "object",
                                  "type": "Toc",
                                  "schema": {
                                    "title": {
                                      "name": "title",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1095,
                                            1109
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "depth": {
                                      "name": "depth",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "number",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1114,
                                            1128
                                          ]
                                        }
                                      ],
                                      "schema": "number"
                                    },
                                    "searchDepth": {
                                      "name": "searchDepth",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "number",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1133,
                                            1153
                                          ]
                                        }
                                      ],
                                      "schema": "number"
                                    },
                                    "links": {
                                      "name": "links",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "TocLink[]",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1158,
                                            1175
                                          ]
                                        }
                                      ],
                                      "schema": {
                                        "kind": "array",
                                        "type": "TocLink[]",
                                        "schema": [
                                          {
                                            "kind": "object",
                                            "type": "TocLink",
                                            "schema": {
                                              "id": {
                                                "name": "id",
                                                "global": false,
                                                "description": "",
                                                "tags": [],
                                                "required": true,
                                                "type": "string",
                                                "declarations": [
                                                  {
                                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                    "range": [
                                                      991,
                                                      1002
                                                    ]
                                                  }
                                                ],
                                                "schema": "string"
                                              },
                                              "text": {
                                                "name": "text",
                                                "global": false,
                                                "description": "",
                                                "tags": [],
                                                "required": true,
                                                "type": "string",
                                                "declarations": [
                                                  {
                                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                    "range": [
                                                      1007,
                                                      1020
                                                    ]
                                                  }
                                                ],
                                                "schema": "string"
                                              },
                                              "depth": {
                                                "name": "depth",
                                                "global": false,
                                                "description": "",
                                                "tags": [],
                                                "required": true,
                                                "type": "number",
                                                "declarations": [
                                                  {
                                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                    "range": [
                                                      1025,
                                                      1039
                                                    ]
                                                  }
                                                ],
                                                "schema": "number"
                                              },
                                              "children": {
                                                "name": "children",
                                                "global": false,
                                                "description": "",
                                                "tags": [],
                                                "required": false,
                                                "type": "TocLink[]",
                                                "declarations": [
                                                  {
                                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                    "range": [
                                                      1044,
                                                      1065
                                                    ]
                                                  }
                                                ],
                                                "schema": "TocLink[]"
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "body": {
                          "name": "body",
                          "global": false,
                          "description": "Content body",
                          "tags": [],
                          "required": true,
                          "type": "MarkdownRoot",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                2523,
                                2549
                              ]
                            }
                          ],
                          "schema": "MarkdownRoot"
                        },
                        "layout": {
                          "name": "layout",
                          "global": false,
                          "description": "Layout",
                          "tags": [],
                          "required": false,
                          "type": "\"docs\"",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                2319,
                                2338
                              ]
                            }
                          ],
                          "schema": "\"docs\""
                        },
                        "_id": {
                          "name": "_id",
                          "global": false,
                          "description": "Content id",
                          "tags": [],
                          "required": true,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                185,
                                197
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_source": {
                          "name": "_source",
                          "global": false,
                          "description": "Content source",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                240,
                                257
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_path": {
                          "name": "_path",
                          "global": false,
                          "description": "Content path, this path is source agnostic and it the content my live in any source",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                369,
                                384
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "title": {
                          "name": "title",
                          "global": false,
                          "description": "Content title",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                426,
                                441
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_draft": {
                          "name": "_draft",
                          "global": false,
                          "description": "Content draft status",
                          "tags": [],
                          "required": false,
                          "type": "boolean",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                490,
                                507
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "boolean",
                            "schema": [
                              "false",
                              "true"
                            ]
                          }
                        },
                        "_partial": {
                          "name": "_partial",
                          "global": false,
                          "description": "Content partial status",
                          "tags": [],
                          "required": false,
                          "type": "boolean",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                558,
                                577
                              ]
                            }
                          ],
                          "schema": "boolean"
                        },
                        "_locale": {
                          "name": "_locale",
                          "global": false,
                          "description": "Content locale",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                620,
                                637
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_type": {
                          "name": "_type",
                          "global": false,
                          "description": "File type of the content, i.e `markdown`",
                          "tags": [],
                          "required": false,
                          "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                706,
                                751
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                            "schema": [
                              "\"markdown\"",
                              "\"yaml\"",
                              "\"json\"",
                              "\"csv\""
                            ]
                          }
                        },
                        "_file": {
                          "name": "_file",
                          "global": false,
                          "description": "Path to the file relative to the content directory",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                830,
                                845
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_extension": {
                          "name": "_extension",
                          "global": false,
                          "description": "Extension of the file",
                          "tags": [],
                          "required": false,
                          "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                895,
                                957
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                            "schema": [
                              "\"yaml\"",
                              "\"json\"",
                              "\"csv\"",
                              "\"md\"",
                              "\"yml\"",
                              "\"json5\""
                            ]
                          }
                        }
                      }
                    }
                  ]
                }
              },
              "refresh": {
                "name": "refresh",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "() => Promise<void>",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
                    "range": [
                      3445,
                      3474
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(): Promise<void>"
                }
              }
            }
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default: (context: { list: ParsedContent[]; refresh: () => Promise<void>; }) => VNode<RendererNode, RendererElement, { ...; }>[]; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
              "range": [
                3359,
                3516
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default: (context: { list: ParsedContent[]; refresh: () => Promise<void>; }) => VNode<RendererNode, RendererElement, { ...; }>[]; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "(context: { list: ParsedContent[]; refresh: () => Promise<void>; }) => VNode<RendererNode, RendererElement, { [key: string]: any; }>[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
                    "range": [
                      3377,
                      3509
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(context: { list: ParsedContent[]; refresh: () => Promise<void>; }): VNode<RendererNode, RendererElement, { [key: string]: any; }>[]",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "path",
          "type": "string",
          "description": "The path of the content to load from content source.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
              "range": [
                1975,
                2091
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "query",
          "type": "undefined",
          "description": "A query builder params object to be passed to <ContentQuery /> component.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue.d.ts",
              "range": [
                2209,
                2337
              ]
            }
          ],
          "schema": "undefined"
        }
      ]
    }
  },
  "ContentNavigation": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "pascalName": "ContentNavigation",
    "kebabName": "content-navigation",
    "chunkName": "components/content-navigation",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "query",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "QueryBuilderParams | QueryBuilder<ParsedContentMeta>",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue.d.ts",
              "range": [
                1708,
                1787
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "QueryBuilderParams | QueryBuilder<ParsedContentMeta>",
            "schema": [
              {
                "kind": "object",
                "type": "QueryBuilderParams",
                "schema": {
                  "first": {
                    "name": "first",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "boolean",
                    "declarations": [
                      {
                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                        "range": [
                          9173,
                          9189
                        ]
                      }
                    ],
                    "schema": {
                      "kind": "enum",
                      "type": "boolean",
                      "schema": [
                        "false",
                        "true"
                      ]
                    }
                  },
                  "skip": {
                    "name": "skip",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "number",
                    "declarations": [
                      {
                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                        "range": [
                          9194,
                          9208
                        ]
                      }
                    ],
                    "schema": "number"
                  },
                  "limit": {
                    "name": "limit",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "number",
                    "declarations": [
                      {
                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                        "range": [
                          9213,
                          9228
                        ]
                      }
                    ],
                    "schema": "number"
                  },
                  "only": {
                    "name": "only",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string[]",
                    "declarations": [
                      {
                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                        "range": [
                          9233,
                          9249
                        ]
                      }
                    ],
                    "schema": {
                      "kind": "array",
                      "type": "string[]",
                      "schema": [
                        "string"
                      ]
                    }
                  },
                  "without": {
                    "name": "without",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string[]",
                    "declarations": [
                      {
                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                        "range": [
                          9254,
                          9273
                        ]
                      }
                    ],
                    "schema": "string[]"
                  },
                  "sort": {
                    "name": "sort",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "SortOptions[]",
                    "declarations": [
                      {
                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                        "range": [
                          9278,
                          9299
                        ]
                      }
                    ],
                    "schema": {
                      "kind": "array",
                      "type": "SortOptions[]",
                      "schema": [
                        {
                          "kind": "enum",
                          "type": "SortOptions",
                          "schema": [
                            {
                              "kind": "object",
                              "type": "SortParams",
                              "schema": {
                                "$locale": {
                                  "name": "$locale",
                                  "global": false,
                                  "description": "Locale specifier for sorting\nA string with a BCP 47 language tag",
                                  "tags": [
                                    {
                                      "name": "default",
                                      "text": "undefined"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string",
                                  "declarations": [
                                    {
                                      "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                      "range": [
                                        3558,
                                        3575
                                      ]
                                    }
                                  ],
                                  "schema": "string"
                                },
                                "$numeric": {
                                  "name": "$numeric",
                                  "global": false,
                                  "description": "Whether numeric collation should be used, such that \"1\" < \"2\" < \"10\".\nPossible values are `true` and `false`;",
                                  "tags": [
                                    {
                                      "name": "default",
                                      "text": "false"
                                    }
                                  ],
                                  "required": false,
                                  "type": "boolean",
                                  "declarations": [
                                    {
                                      "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                      "range": [
                                        3749,
                                        3768
                                      ]
                                    }
                                  ],
                                  "schema": "boolean"
                                },
                                "$caseFirst": {
                                  "name": "$caseFirst",
                                  "global": false,
                                  "description": "Whether upper case or lower case should sort first.\nPossible values are `\"upper\"`, `\"lower\"`, or `\"false\"`",
                                  "tags": [
                                    {
                                      "name": "default",
                                      "text": "\"depends on locale\""
                                    }
                                  ],
                                  "required": false,
                                  "type": "\"upper\" | \"lower\" | \"false\"",
                                  "declarations": [
                                    {
                                      "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                      "range": [
                                        3953,
                                        3994
                                      ]
                                    }
                                  ],
                                  "schema": {
                                    "kind": "enum",
                                    "type": "\"upper\" | \"lower\" | \"false\"",
                                    "schema": [
                                      "\"upper\"",
                                      "\"lower\"",
                                      "\"false\""
                                    ]
                                  }
                                },
                                "$sensitivity": {
                                  "name": "$sensitivity",
                                  "global": false,
                                  "description": "Which differences in the strings should lead to non-zero result values. Possible values are:\n - \"base\": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.\n - \"accent\": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.\n - \"case\": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.\n - \"variant\": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.",
                                  "tags": [
                                    {
                                      "name": "default",
                                      "text": "\"variant\""
                                    }
                                  ],
                                  "required": false,
                                  "type": "\"base\" | \"accent\" | \"case\" | \"variant\"",
                                  "declarations": [
                                    {
                                      "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                      "range": [
                                        4733,
                                        4787
                                      ]
                                    }
                                  ],
                                  "schema": {
                                    "kind": "enum",
                                    "type": "\"base\" | \"accent\" | \"case\" | \"variant\"",
                                    "schema": [
                                      "\"base\"",
                                      "\"accent\"",
                                      "\"case\"",
                                      "\"variant\""
                                    ]
                                  }
                                }
                              }
                            },
                            {
                              "kind": "object",
                              "type": "SortFields",
                              "schema": {}
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "where": {
                    "name": "where",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "QueryBuilderWhere[]",
                    "declarations": [
                      {
                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                        "range": [
                          9304,
                          9332
                        ]
                      }
                    ],
                    "schema": {
                      "kind": "array",
                      "type": "QueryBuilderWhere[]",
                      "schema": [
                        {
                          "kind": "object",
                          "type": "QueryBuilderWhere",
                          "schema": {
                            "$and": {
                              "name": "$and",
                              "global": false,
                              "description": "Match only if all of nested conditions are true",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n $and: [\n   { score: { $gte: 5 } },\n   { score: { $lte: 10 } }\n ]\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "QueryBuilderWhere[]",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    5305,
                                    5332
                                  ]
                                }
                              ],
                              "schema": "QueryBuilderWhere[]"
                            },
                            "$or": {
                              "name": "$or",
                              "global": false,
                              "description": "Match if any of nested conditions is true",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n $or: [\n   { score: { $gt: 5 } },\n   { score: { $lt: 3 } }\n ]\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "QueryBuilderWhere[]",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    5576,
                                    5602
                                  ]
                                }
                              ],
                              "schema": "QueryBuilderWhere[]"
                            },
                            "$not": {
                              "name": "$not",
                              "global": false,
                              "description": "Match is condition is false",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n title: {\n   $not: 'Hello World'\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    5799,
                                    5861
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                                "schema": [
                                  "string",
                                  "number",
                                  "false",
                                  "true",
                                  {
                                    "kind": "object",
                                    "type": "RegExp",
                                    "schema": {}
                                  },
                                  "QueryBuilderWhere"
                                ]
                              }
                            },
                            "$eq": {
                              "name": "$eq",
                              "global": false,
                              "description": "Match if item equals condition",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n title: {\n   $eq: 'Hello World'\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "string | number | boolean | RegExp",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    6060,
                                    6101
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "string | number | boolean | RegExp",
                                "schema": [
                                  "string",
                                  "number",
                                  "false",
                                  "true",
                                  "RegExp"
                                ]
                              }
                            },
                            "$ne": {
                              "name": "$ne",
                              "global": false,
                              "description": "Match if item not equals condition",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n score: {\n   $ne: 100\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "string | number | boolean | RegExp",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    6294,
                                    6335
                                  ]
                                }
                              ],
                              "schema": "string | number | boolean | RegExp"
                            },
                            "$gt": {
                              "name": "$gt",
                              "global": false,
                              "description": "Check if item is greater than condition",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n score: {\n   $gt: 99.5\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "number",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    6533,
                                    6546
                                  ]
                                }
                              ],
                              "schema": "number"
                            },
                            "$gte": {
                              "name": "$gte",
                              "global": false,
                              "description": "Check if item is greater than or equal to condition",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n score: {\n   $gte: 99.5\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "number",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    6757,
                                    6771
                                  ]
                                }
                              ],
                              "schema": "number"
                            },
                            "$lt": {
                              "name": "$lt",
                              "global": false,
                              "description": "Check if item is less than condition",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n score: {\n   $lt: 99.5\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "number",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    6966,
                                    6979
                                  ]
                                }
                              ],
                              "schema": "number"
                            },
                            "$lte": {
                              "name": "$lte",
                              "global": false,
                              "description": "Check if item is less than or equal to condition",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n score: {\n   $lte: 99.5\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "number",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    7187,
                                    7201
                                  ]
                                }
                              ],
                              "schema": "number"
                            },
                            "$regex": {
                              "name": "$regex",
                              "global": false,
                              "description": "Provides regular expression capabilities for pattern matching strings.",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n title: {\n   $regex: /^foo/\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "string | RegExp",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    7435,
                                    7460
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "string | RegExp",
                                "schema": [
                                  "string",
                                  "RegExp"
                                ]
                              }
                            },
                            "$type": {
                              "name": "$type",
                              "global": false,
                              "description": "Match if type of item equals condition",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n field: {\n   $type: 'boolean'\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "string",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    7664,
                                    7679
                                  ]
                                }
                              ],
                              "schema": "string"
                            },
                            "$exists": {
                              "name": "$exists",
                              "global": false,
                              "description": "Check key existence",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n tag: {\n   $exists: false\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "boolean",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    7860,
                                    7878
                                  ]
                                }
                              ],
                              "schema": "boolean"
                            },
                            "$contains": {
                              "name": "$contains",
                              "global": false,
                              "description": "Match if item contains every condition or match every rule in condition array",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n title: {\n   $contains: ['Hello', 'World']\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "string | number | boolean | (string | number | boolean)[]",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    8135,
                                    8208
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "string | number | boolean | (string | number | boolean)[]",
                                "schema": [
                                  "string",
                                  "number",
                                  "false",
                                  "true",
                                  {
                                    "kind": "array",
                                    "type": "(string | number | boolean)[]",
                                    "schema": [
                                      {
                                        "kind": "enum",
                                        "type": "string | number | boolean",
                                        "schema": [
                                          "string",
                                          "number",
                                          "false",
                                          "true"
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            },
                            "$containsAny": {
                              "name": "$containsAny",
                              "global": false,
                              "description": "Match if item contains at least one rule from condition array",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n title: {\n   $containsAny: ['Hello', 'World']\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "(string | number | boolean)[]",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    8451,
                                    8499
                                  ]
                                }
                              ],
                              "schema": "(string | number | boolean)[]"
                            },
                            "$icontains": {
                              "name": "$icontains",
                              "global": false,
                              "description": "Ignore case contains",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n title: {\n   $icontains: 'hello world'\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "string",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    8695,
                                    8715
                                  ]
                                }
                              ],
                              "schema": "string"
                            },
                            "$in": {
                              "name": "$in",
                              "global": false,
                              "description": "Match if item is in condition array",
                              "tags": [
                                {
                                  "name": "example",
                                  "text": "```ts\nqueryContent().where({\n category: {\n   $in: ['sport', 'nature', 'travel']\n }\n})\n```"
                                }
                              ],
                              "required": false,
                              "type": "string | (string | number | boolean)[]",
                              "declarations": [
                                {
                                  "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                  "range": [
                                    8938,
                                    8986
                                  ]
                                }
                              ],
                              "schema": {
                                "kind": "enum",
                                "type": "string | (string | number | boolean)[]",
                                "schema": [
                                  "string",
                                  "(string | number | boolean)[]"
                                ]
                              }
                            },
                            "_id": {
                              "name": "_id",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "_source": {
                              "name": "_source",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "_path": {
                              "name": "_path",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "title": {
                              "name": "title",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "_draft": {
                              "name": "_draft",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "_partial": {
                              "name": "_partial",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "_locale": {
                              "name": "_locale",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "_type": {
                              "name": "_type",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "_file": {
                              "name": "_file",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            },
                            "_extension": {
                              "name": "_extension",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "string | number | boolean | RegExp | QueryBuilderWhere",
                              "declarations": [],
                              "schema": "string | number | boolean | RegExp | QueryBuilderWhere"
                            }
                          }
                        }
                      ]
                    }
                  },
                  "surround": {
                    "name": "surround",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "{ query: string | QueryBuilderWhere; before?: number; after?: number; }",
                    "declarations": [
                      {
                        "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                        "range": [
                          9337,
                          9448
                        ]
                      }
                    ],
                    "schema": {
                      "kind": "object",
                      "type": "{ query: string | QueryBuilderWhere; before?: number; after?: number; }",
                      "schema": {
                        "query": {
                          "name": "query",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": true,
                          "type": "string | QueryBuilderWhere",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                9358,
                                9392
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "string | QueryBuilderWhere",
                            "schema": [
                              "string",
                              "QueryBuilderWhere"
                            ]
                          }
                        },
                        "before": {
                          "name": "before",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                9401,
                                9417
                              ]
                            }
                          ],
                          "schema": "number"
                        },
                        "after": {
                          "name": "after",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "number",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                9426,
                                9441
                              ]
                            }
                          ],
                          "schema": "number"
                        }
                      }
                    }
                  }
                }
              },
              "QueryBuilder<ParsedContentMeta>"
            ]
          }
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{ navigation: NavItem[]; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue.d.ts",
              "range": [
                2590,
                2687
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "{ navigation: NavItem[]; }",
            "schema": {
              "navigation": {
                "name": "navigation",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "NavItem[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue.d.ts",
                    "range": [
                      2630,
                      2652
                    ]
                  }
                ],
                "schema": {
                  "kind": "array",
                  "type": "NavItem[]",
                  "schema": [
                    {
                      "kind": "object",
                      "type": "NavItem",
                      "schema": {
                        "title": {
                          "name": "title",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": true,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                11231,
                                11245
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_path": {
                          "name": "_path",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": true,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                11250,
                                11264
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_id": {
                          "name": "_id",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                11269,
                                11282
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_draft": {
                          "name": "_draft",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "boolean",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                11287,
                                11304
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "boolean",
                            "schema": [
                              "false",
                              "true"
                            ]
                          }
                        },
                        "children": {
                          "name": "children",
                          "global": false,
                          "description": "",
                          "tags": [],
                          "required": false,
                          "type": "NavItem[]",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                11309,
                                11330
                              ]
                            }
                          ],
                          "schema": "NavItem[]"
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default: ({ navigation }: { navigation: NavItem[]; }) => VNode<RendererNode, RendererElement, { ...; }>[]; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue.d.ts",
              "range": [
                2572,
                2694
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default: ({ navigation }: { navigation: NavItem[]; }) => VNode<RendererNode, RendererElement, { ...; }>[]; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "({ navigation }: { navigation: NavItem[]; }) => VNode<RendererNode, RendererElement, { [key: string]: any; }>[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue.d.ts",
                    "range": [
                      2590,
                      2687
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "({ navigation }: { navigation: NavItem[]; }): VNode<RendererNode, RendererElement, { [key: string]: any; }>[]",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "query",
          "type": "undefined",
          "description": "A query to be passed to `fetchContentNavigation()`.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue.d.ts",
              "range": [
                1461,
                1642
              ]
            }
          ],
          "schema": "undefined"
        },
        {
          "name": "navigation",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue.d.ts",
              "range": [
                1662,
                1678
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "ContentQuery": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "pascalName": "ContentQuery",
    "kebabName": "content-query",
    "chunkName": "components/content-query",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "skip",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6505,
                6518
              ]
            }
          ],
          "schema": "number"
        },
        {
          "name": "limit",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6527,
                6541
              ]
            }
          ],
          "schema": "number"
        },
        {
          "name": "only",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[]",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6550,
                6565
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "string[]",
            "schema": [
              "string"
            ]
          }
        },
        {
          "name": "without",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[]",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6574,
                6592
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "string[]",
            "schema": [
              "string"
            ]
          }
        },
        {
          "name": "sort",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "SortParams",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6601,
                6618
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "SortParams",
            "schema": {
              "$locale": {
                "name": "$locale",
                "global": false,
                "description": "Locale specifier for sorting\nA string with a BCP 47 language tag",
                "tags": [
                  {
                    "name": "default",
                    "text": "undefined"
                  }
                ],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      3558,
                      3575
                    ]
                  }
                ],
                "schema": "string"
              },
              "$numeric": {
                "name": "$numeric",
                "global": false,
                "description": "Whether numeric collation should be used, such that \"1\" < \"2\" < \"10\".\nPossible values are `true` and `false`;",
                "tags": [
                  {
                    "name": "default",
                    "text": "false"
                  }
                ],
                "required": false,
                "type": "boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      3749,
                      3768
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "boolean",
                  "schema": [
                    "false",
                    "true"
                  ]
                }
              },
              "$caseFirst": {
                "name": "$caseFirst",
                "global": false,
                "description": "Whether upper case or lower case should sort first.\nPossible values are `\"upper\"`, `\"lower\"`, or `\"false\"`",
                "tags": [
                  {
                    "name": "default",
                    "text": "\"depends on locale\""
                  }
                ],
                "required": false,
                "type": "\"upper\" | \"lower\" | \"false\"",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      3953,
                      3994
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "\"upper\" | \"lower\" | \"false\"",
                  "schema": [
                    "\"upper\"",
                    "\"lower\"",
                    "\"false\""
                  ]
                }
              },
              "$sensitivity": {
                "name": "$sensitivity",
                "global": false,
                "description": "Which differences in the strings should lead to non-zero result values. Possible values are:\n - \"base\": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.\n - \"accent\": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.\n - \"case\": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.\n - \"variant\": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.",
                "tags": [
                  {
                    "name": "default",
                    "text": "\"variant\""
                  }
                ],
                "required": false,
                "type": "\"base\" | \"accent\" | \"case\" | \"variant\"",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      4733,
                      4787
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "\"base\" | \"accent\" | \"case\" | \"variant\"",
                  "schema": [
                    "\"base\"",
                    "\"accent\"",
                    "\"case\"",
                    "\"variant\""
                  ]
                }
              }
            }
          }
        },
        {
          "name": "where",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "{ [key: string]: any; }",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6627,
                6678
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "{ [key: string]: any; }",
            "schema": {}
          }
        },
        {
          "name": "find",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "\"surround\" | \"one\"",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6687,
                6712
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "\"surround\" | \"one\"",
            "schema": [
              "\"surround\"",
              "\"one\""
            ]
          }
        },
        {
          "name": "path",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6721,
                6734
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "locale",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6743,
                6758
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "ContentQueryDefaultSlotContext",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                8930,
                9004
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "ContentQueryDefaultSlotContext",
            "schema": {
              "data": {
                "name": "data",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "ParsedContent | ParsedContent[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
                    "range": [
                      162,
                      205
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "ParsedContent | ParsedContent[]",
                  "schema": [
                    {
                      "kind": "object",
                      "type": "ParsedContent",
                      "schema": {
                        "excerpt": {
                          "name": "excerpt",
                          "global": false,
                          "description": "Excerpt",
                          "tags": [],
                          "required": false,
                          "type": "MarkdownRoot",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                2459,
                                2482
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "object",
                            "type": "MarkdownRoot",
                            "schema": {
                              "type": {
                                "name": "type",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": true,
                                "type": "\"root\"",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1465,
                                      1478
                                    ]
                                  }
                                ],
                                "schema": "\"root\""
                              },
                              "children": {
                                "name": "children",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": true,
                                "type": "MarkdownNode[]",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1483,
                                      1508
                                    ]
                                  }
                                ],
                                "schema": {
                                  "kind": "array",
                                  "type": "MarkdownNode[]",
                                  "schema": [
                                    {
                                      "kind": "object",
                                      "type": "MarkdownNode",
                                      "schema": {
                                        "type": {
                                          "name": "type",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": true,
                                          "type": "string",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1214,
                                                1227
                                              ]
                                            }
                                          ],
                                          "schema": "string"
                                        },
                                        "tag": {
                                          "name": "tag",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "string",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1232,
                                                1245
                                              ]
                                            }
                                          ],
                                          "schema": "string"
                                        },
                                        "value": {
                                          "name": "value",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "string",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1250,
                                                1265
                                              ]
                                            }
                                          ],
                                          "schema": "string"
                                        },
                                        "props": {
                                          "name": "props",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "Record<string, any>",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1270,
                                                1298
                                              ]
                                            }
                                          ],
                                          "schema": "Record<string, any>"
                                        },
                                        "content": {
                                          "name": "content",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "any",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1303,
                                                1317
                                              ]
                                            }
                                          ],
                                          "schema": "any"
                                        },
                                        "children": {
                                          "name": "children",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "MarkdownNode[]",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1322,
                                                1348
                                              ]
                                            }
                                          ],
                                          "schema": "MarkdownNode[]"
                                        },
                                        "attributes": {
                                          "name": "attributes",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "Record<string, any>",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1353,
                                                1386
                                              ]
                                            }
                                          ],
                                          "schema": "Record<string, any>"
                                        },
                                        "fmAttributes": {
                                          "name": "fmAttributes",
                                          "global": false,
                                          "description": "",
                                          "tags": [],
                                          "required": false,
                                          "type": "Record<string, any>",
                                          "declarations": [
                                            {
                                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                              "range": [
                                                1391,
                                                1426
                                              ]
                                            }
                                          ],
                                          "schema": "Record<string, any>"
                                        }
                                      }
                                    }
                                  ]
                                }
                              },
                              "props": {
                                "name": "props",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Record<string, any>",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1513,
                                      1541
                                    ]
                                  }
                                ],
                                "schema": "Record<string, any>"
                              },
                              "toc": {
                                "name": "toc",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Toc",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1546,
                                      1556
                                    ]
                                  }
                                ],
                                "schema": {
                                  "kind": "object",
                                  "type": "Toc",
                                  "schema": {
                                    "title": {
                                      "name": "title",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1095,
                                            1109
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "depth": {
                                      "name": "depth",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "number",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1114,
                                            1128
                                          ]
                                        }
                                      ],
                                      "schema": "number"
                                    },
                                    "searchDepth": {
                                      "name": "searchDepth",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "number",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1133,
                                            1153
                                          ]
                                        }
                                      ],
                                      "schema": "number"
                                    },
                                    "links": {
                                      "name": "links",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "TocLink[]",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1158,
                                            1175
                                          ]
                                        }
                                      ],
                                      "schema": {
                                        "kind": "array",
                                        "type": "TocLink[]",
                                        "schema": [
                                          {
                                            "kind": "object",
                                            "type": "TocLink",
                                            "schema": {
                                              "id": {
                                                "name": "id",
                                                "global": false,
                                                "description": "",
                                                "tags": [],
                                                "required": true,
                                                "type": "string",
                                                "declarations": [
                                                  {
                                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                    "range": [
                                                      991,
                                                      1002
                                                    ]
                                                  }
                                                ],
                                                "schema": "string"
                                              },
                                              "text": {
                                                "name": "text",
                                                "global": false,
                                                "description": "",
                                                "tags": [],
                                                "required": true,
                                                "type": "string",
                                                "declarations": [
                                                  {
                                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                    "range": [
                                                      1007,
                                                      1020
                                                    ]
                                                  }
                                                ],
                                                "schema": "string"
                                              },
                                              "depth": {
                                                "name": "depth",
                                                "global": false,
                                                "description": "",
                                                "tags": [],
                                                "required": true,
                                                "type": "number",
                                                "declarations": [
                                                  {
                                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                    "range": [
                                                      1025,
                                                      1039
                                                    ]
                                                  }
                                                ],
                                                "schema": "number"
                                              },
                                              "children": {
                                                "name": "children",
                                                "global": false,
                                                "description": "",
                                                "tags": [],
                                                "required": false,
                                                "type": "TocLink[]",
                                                "declarations": [
                                                  {
                                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                                    "range": [
                                                      1044,
                                                      1065
                                                    ]
                                                  }
                                                ],
                                                "schema": "TocLink[]"
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "body": {
                          "name": "body",
                          "global": false,
                          "description": "Content body",
                          "tags": [],
                          "required": true,
                          "type": "MarkdownRoot",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                2523,
                                2549
                              ]
                            }
                          ],
                          "schema": "MarkdownRoot"
                        },
                        "layout": {
                          "name": "layout",
                          "global": false,
                          "description": "Layout",
                          "tags": [],
                          "required": false,
                          "type": "\"docs\"",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                2319,
                                2338
                              ]
                            }
                          ],
                          "schema": "\"docs\""
                        },
                        "_id": {
                          "name": "_id",
                          "global": false,
                          "description": "Content id",
                          "tags": [],
                          "required": true,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                185,
                                197
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_source": {
                          "name": "_source",
                          "global": false,
                          "description": "Content source",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                240,
                                257
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_path": {
                          "name": "_path",
                          "global": false,
                          "description": "Content path, this path is source agnostic and it the content my live in any source",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                369,
                                384
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "title": {
                          "name": "title",
                          "global": false,
                          "description": "Content title",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                426,
                                441
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_draft": {
                          "name": "_draft",
                          "global": false,
                          "description": "Content draft status",
                          "tags": [],
                          "required": false,
                          "type": "boolean",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                490,
                                507
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "boolean",
                            "schema": [
                              "false",
                              "true"
                            ]
                          }
                        },
                        "_partial": {
                          "name": "_partial",
                          "global": false,
                          "description": "Content partial status",
                          "tags": [],
                          "required": false,
                          "type": "boolean",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                558,
                                577
                              ]
                            }
                          ],
                          "schema": "boolean"
                        },
                        "_locale": {
                          "name": "_locale",
                          "global": false,
                          "description": "Content locale",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                620,
                                637
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_type": {
                          "name": "_type",
                          "global": false,
                          "description": "File type of the content, i.e `markdown`",
                          "tags": [],
                          "required": false,
                          "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                706,
                                751
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                            "schema": [
                              "\"markdown\"",
                              "\"yaml\"",
                              "\"json\"",
                              "\"csv\""
                            ]
                          }
                        },
                        "_file": {
                          "name": "_file",
                          "global": false,
                          "description": "Path to the file relative to the content directory",
                          "tags": [],
                          "required": false,
                          "type": "string",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                830,
                                845
                              ]
                            }
                          ],
                          "schema": "string"
                        },
                        "_extension": {
                          "name": "_extension",
                          "global": false,
                          "description": "Extension of the file",
                          "tags": [],
                          "required": false,
                          "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                          "declarations": [
                            {
                              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                              "range": [
                                895,
                                957
                              ]
                            }
                          ],
                          "schema": {
                            "kind": "enum",
                            "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                            "schema": [
                              "\"yaml\"",
                              "\"json\"",
                              "\"csv\"",
                              "\"md\"",
                              "\"yml\"",
                              "\"json5\""
                            ]
                          }
                        }
                      }
                    },
                    {
                      "kind": "array",
                      "type": "ParsedContent[]",
                      "schema": [
                        "ParsedContent"
                      ]
                    }
                  ]
                }
              },
              "refresh": {
                "name": "refresh",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "() => Promise<void>",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
                    "range": [
                      210,
                      239
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(): Promise<void>"
                }
              },
              "isPartial": {
                "name": "isPartial",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
                    "range": [
                      244,
                      263
                    ]
                  }
                ],
                "schema": "boolean"
              }
            }
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default: (context: ContentQueryDefaultSlotContext) => VNode<RendererNode, RendererElement, { ...; }>[]; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                8912,
                9011
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default: (context: ContentQueryDefaultSlotContext) => VNode<RendererNode, RendererElement, { ...; }>[]; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "(context: ContentQueryDefaultSlotContext) => VNode<RendererNode, RendererElement, { [key: string]: any; }>[]",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
                    "range": [
                      8930,
                      9004
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(context: ContentQueryDefaultSlotContext): VNode<RendererNode, RendererElement, { [key: string]: any; }>[]",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "find",
          "type": "\"surround\" | \"one\"",
          "description": "A type of query to be made.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6272,
                6399
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "\"surround\" | \"one\"",
            "schema": [
              "\"surround\"",
              "\"one\""
            ]
          }
        },
        {
          "name": "sort",
          "type": "undefined",
          "description": "Sort results",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                5522,
                5641
              ]
            }
          ],
          "schema": "undefined"
        },
        {
          "name": "path",
          "type": "string",
          "description": "The path of the content to load from content source.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                4752,
                4868
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "only",
          "type": "string[]",
          "description": "Select a subset of fields",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                4938,
                5055
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "string[]",
            "schema": [
              "string"
            ]
          }
        },
        {
          "name": "without",
          "type": "string[]",
          "description": "Remove a subset of fields",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                5125,
                5245
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "string[]",
            "schema": [
              "string"
            ]
          }
        },
        {
          "name": "where",
          "type": "undefined",
          "description": "Filter results",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                5304,
                5465
              ]
            }
          ],
          "schema": "undefined"
        },
        {
          "name": "limit",
          "type": "number",
          "description": "Limit number of results",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                5709,
                5825
              ]
            }
          ],
          "schema": "number"
        },
        {
          "name": "skip",
          "type": "number",
          "description": "Skip number of results",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                5892,
                6007
              ]
            }
          ],
          "schema": "number"
        },
        {
          "name": "locale",
          "type": "string",
          "description": "Filter contents based on locale",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6083,
                6200
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "isPartial",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6419,
                6434
              ]
            }
          ],
          "schema": "any"
        },
        {
          "name": "data",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6443,
                6453
              ]
            }
          ],
          "schema": "any"
        },
        {
          "name": "refresh",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue.d.ts",
              "range": [
                6462,
                6475
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "ContentRenderer": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "pascalName": "ContentRenderer",
    "kebabName": "content-renderer",
    "chunkName": "components/content-renderer",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "tag",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue.d.ts",
              "range": [
                1256,
                1268
              ]
            }
          ],
          "schema": "string",
          "default": "\"div\""
        },
        {
          "name": "value",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any>",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue.d.ts",
              "range": [
                1273,
                1300
              ]
            }
          ],
          "schema": "Record<string, any>",
          "default": "{}"
        },
        {
          "name": "excerpt",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue.d.ts",
              "range": [
                1234,
                1251
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "value",
          "type": "Record<string, any>",
          "description": "The document to render.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue.d.ts",
              "range": [
                781,
                881
              ]
            }
          ],
          "schema": "Record<string, any>"
        },
        {
          "name": "tag",
          "type": "string",
          "description": "The tag to use for the renderer element if it is used.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue.d.ts",
              "range": [
                1151,
                1222
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "excerpt",
          "type": "boolean",
          "description": "Whether or not to render the excerpt.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue.d.ts",
              "range": [
                969,
                1046
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "ContentRendererMarkdown": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "pascalName": "ContentRendererMarkdown",
    "kebabName": "content-renderer-markdown",
    "chunkName": "components/content-renderer-markdown",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "value",
          "global": false,
          "description": "Content to render",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                359,
                408
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                359,
                408
              ]
            }
          ],
          "schema": "Record<string, any>"
        },
        {
          "name": "components",
          "global": false,
          "description": "The map of custom components to use for rendering.",
          "tags": [],
          "required": false,
          "type": "Record<string, any>",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                675,
                734
              ]
            }
          ],
          "schema": "Record<string, any>",
          "default": "{}"
        },
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any>",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                739,
                792
              ]
            }
          ],
          "schema": "Record<string, any>",
          "default": "{}"
        },
        {
          "name": "tag",
          "global": false,
          "description": "Root tag to use for rendering",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                556,
                603
              ]
            }
          ],
          "schema": "string",
          "default": "\"div\""
        },
        {
          "name": "excerpt",
          "global": false,
          "description": "Render only the excerpt",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                453,
                505
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "value",
          "type": "Record<string, any>",
          "description": "Content to render",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                359,
                408
              ]
            }
          ],
          "schema": "Record<string, any>"
        },
        {
          "name": "components",
          "type": "Record<string, any>",
          "description": "The map of custom components to use for rendering.",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                675,
                734
              ]
            }
          ],
          "schema": "Record<string, any>"
        },
        {
          "name": "data",
          "type": "Record<string, any>",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                739,
                792
              ]
            }
          ],
          "schema": "Record<string, any>"
        },
        {
          "name": "tag",
          "type": "string",
          "description": "Root tag to use for rendering",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                556,
                603
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "excerpt",
          "type": "boolean",
          "description": "Render only the excerpt",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
              "range": [
                453,
                505
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "ContentSlot": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "pascalName": "ContentSlot",
    "kebabName": "content-slot",
    "chunkName": "components/content-slot",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "use",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Function",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue.d.ts",
              "range": [
                881,
                895
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Function",
            "schema": {
              "apply": {
                "name": "apply",
                "global": false,
                "description": "Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the this object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A set of arguments to be passed to the function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, argArray?: any) => any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      10258,
                      10315
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, argArray?: any): any",
                  "schema": []
                }
              },
              "call": {
                "name": "call",
                "global": false,
                "description": "Calls a method of an object, substituting another object for the current object.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the current object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the method."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      10563,
                      10623
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "bind": {
                "name": "bind",
                "global": false,
                "description": "For a given function, creates a bound function that has the same body as the original function.\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg An object to which the this keyword can refer inside the new function."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the new function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11046,
                      11106
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "toString": {
                "name": "toString",
                "global": false,
                "description": "Returns a string representation of a function.",
                "tags": [],
                "required": true,
                "type": "() => string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11170,
                      11189
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(): string"
                }
              },
              "prototype": {
                "name": "prototype",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11195,
                      11210
                    ]
                  }
                ],
                "schema": "any"
              },
              "length": {
                "name": "length",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "number",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11215,
                      11239
                    ]
                  }
                ],
                "schema": "number"
              },
              "arguments": {
                "name": "arguments",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11276,
                      11291
                    ]
                  }
                ],
                "schema": "any"
              },
              "caller": {
                "name": "caller",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "Function",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11296,
                      11313
                    ]
                  }
                ],
                "schema": "Function"
              },
              "name": {
                "name": "name",
                "global": false,
                "description": "Returns the name of the function. Function names are read-only and can not be changed.",
                "tags": [],
                "required": true,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.core.d.ts",
                    "range": [
                      4364,
                      4386
                    ]
                  }
                ],
                "schema": "string"
              },
              "__@hasInstance@328": {
                "name": "__@hasInstance@328",
                "global": false,
                "description": "Determines whether the given value inherits from this function if this function was used\nas a constructor function.\n\nA constructor function can control which objects are recognized as its instances by\n'instanceof' by overriding this method.",
                "tags": [],
                "required": true,
                "type": "(value: any) => boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                    "range": [
                      5097,
                      5139
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(value: any): boolean",
                  "schema": []
                }
              },
              "__@metadata@330": {
                "name": "__@metadata@330",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "DecoratorMetadataObject",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.esnext.decorators.d.ts",
                    "range": [
                      1023,
                      1067
                    ]
                  }
                ],
                "schema": {
                  "kind": "object",
                  "type": "DecoratorMetadataObject",
                  "schema": {}
                }
              }
            }
          },
          "default": "void 0"
        },
        {
          "name": "unwrap",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue.d.ts",
              "range": [
                900,
                925
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | boolean",
            "schema": [
              "string",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "use",
          "type": "Function",
          "description": "A slot name or function",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue.d.ts",
              "range": [
                606,
                682
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Function",
            "schema": {
              "apply": {
                "name": "apply",
                "global": false,
                "description": "Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the this object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A set of arguments to be passed to the function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, argArray?: any) => any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      10258,
                      10315
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, argArray?: any): any",
                  "schema": []
                }
              },
              "call": {
                "name": "call",
                "global": false,
                "description": "Calls a method of an object, substituting another object for the current object.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the current object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the method."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      10563,
                      10623
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "bind": {
                "name": "bind",
                "global": false,
                "description": "For a given function, creates a bound function that has the same body as the original function.\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg An object to which the this keyword can refer inside the new function."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the new function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11046,
                      11106
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "toString": {
                "name": "toString",
                "global": false,
                "description": "Returns a string representation of a function.",
                "tags": [],
                "required": true,
                "type": "() => string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11170,
                      11189
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(): string"
                }
              },
              "prototype": {
                "name": "prototype",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11195,
                      11210
                    ]
                  }
                ],
                "schema": "any"
              },
              "length": {
                "name": "length",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "number",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11215,
                      11239
                    ]
                  }
                ],
                "schema": "number"
              },
              "arguments": {
                "name": "arguments",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11276,
                      11291
                    ]
                  }
                ],
                "schema": "any"
              },
              "caller": {
                "name": "caller",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "Function",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es5.d.ts",
                    "range": [
                      11296,
                      11313
                    ]
                  }
                ],
                "schema": "Function"
              },
              "name": {
                "name": "name",
                "global": false,
                "description": "Returns the name of the function. Function names are read-only and can not be changed.",
                "tags": [],
                "required": true,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.core.d.ts",
                    "range": [
                      4364,
                      4386
                    ]
                  }
                ],
                "schema": "string"
              },
              "__@hasInstance@328": {
                "name": "__@hasInstance@328",
                "global": false,
                "description": "Determines whether the given value inherits from this function if this function was used\nas a constructor function.\n\nA constructor function can control which objects are recognized as its instances by\n'instanceof' by overriding this method.",
                "tags": [],
                "required": true,
                "type": "(value: any) => boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts",
                    "range": [
                      5097,
                      5139
                    ]
                  }
                ],
                "schema": {
                  "kind": "event",
                  "type": "(value: any): boolean",
                  "schema": []
                }
              },
              "__@metadata@330": {
                "name": "__@metadata@330",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "DecoratorMetadataObject",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/typescript/lib/lib.esnext.decorators.d.ts",
                    "range": [
                      1023,
                      1067
                    ]
                  }
                ],
                "schema": {
                  "kind": "object",
                  "type": "DecoratorMetadataObject",
                  "schema": {}
                }
              }
            }
          }
        },
        {
          "name": "unwrap",
          "type": "string | boolean",
          "description": "Tags to unwrap separated by spaces\nExample: 'ul li'",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue.d.ts",
              "range": [
                769,
                869
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | boolean",
            "schema": [
              "string",
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "DocumentDrivenEmpty": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue",
    "pascalName": "DocumentDrivenEmpty",
    "kebabName": "document-driven-empty",
    "chunkName": "components/document-driven-empty",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "value",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "ParsedContent",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue.d.ts",
              "range": [
                470,
                548
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue.d.ts",
              "range": [
                470,
                548
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "ParsedContent",
            "schema": {
              "excerpt": {
                "name": "excerpt",
                "global": false,
                "description": "Excerpt",
                "tags": [],
                "required": false,
                "type": "MarkdownRoot",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      2459,
                      2482
                    ]
                  }
                ],
                "schema": {
                  "kind": "object",
                  "type": "MarkdownRoot",
                  "schema": {
                    "type": {
                      "name": "type",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": true,
                      "type": "\"root\"",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            1465,
                            1478
                          ]
                        }
                      ],
                      "schema": "\"root\""
                    },
                    "children": {
                      "name": "children",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": true,
                      "type": "MarkdownNode[]",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            1483,
                            1508
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "array",
                        "type": "MarkdownNode[]",
                        "schema": [
                          {
                            "kind": "object",
                            "type": "MarkdownNode",
                            "schema": {
                              "type": {
                                "name": "type",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": true,
                                "type": "string",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1214,
                                      1227
                                    ]
                                  }
                                ],
                                "schema": "string"
                              },
                              "tag": {
                                "name": "tag",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "string",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1232,
                                      1245
                                    ]
                                  }
                                ],
                                "schema": "string"
                              },
                              "value": {
                                "name": "value",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "string",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1250,
                                      1265
                                    ]
                                  }
                                ],
                                "schema": "string"
                              },
                              "props": {
                                "name": "props",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Record<string, any>",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1270,
                                      1298
                                    ]
                                  }
                                ],
                                "schema": "Record<string, any>"
                              },
                              "content": {
                                "name": "content",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "any",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1303,
                                      1317
                                    ]
                                  }
                                ],
                                "schema": "any"
                              },
                              "children": {
                                "name": "children",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "MarkdownNode[]",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1322,
                                      1348
                                    ]
                                  }
                                ],
                                "schema": "MarkdownNode[]"
                              },
                              "attributes": {
                                "name": "attributes",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Record<string, any>",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1353,
                                      1386
                                    ]
                                  }
                                ],
                                "schema": "Record<string, any>"
                              },
                              "fmAttributes": {
                                "name": "fmAttributes",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Record<string, any>",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1391,
                                      1426
                                    ]
                                  }
                                ],
                                "schema": "Record<string, any>"
                              }
                            }
                          }
                        ]
                      }
                    },
                    "props": {
                      "name": "props",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": false,
                      "type": "Record<string, any>",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            1513,
                            1541
                          ]
                        }
                      ],
                      "schema": "Record<string, any>"
                    },
                    "toc": {
                      "name": "toc",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": false,
                      "type": "Toc",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            1546,
                            1556
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "object",
                        "type": "Toc",
                        "schema": {
                          "title": {
                            "name": "title",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "string",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1095,
                                  1109
                                ]
                              }
                            ],
                            "schema": "string"
                          },
                          "depth": {
                            "name": "depth",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "number",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1114,
                                  1128
                                ]
                              }
                            ],
                            "schema": "number"
                          },
                          "searchDepth": {
                            "name": "searchDepth",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "number",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1133,
                                  1153
                                ]
                              }
                            ],
                            "schema": "number"
                          },
                          "links": {
                            "name": "links",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "TocLink[]",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1158,
                                  1175
                                ]
                              }
                            ],
                            "schema": {
                              "kind": "array",
                              "type": "TocLink[]",
                              "schema": [
                                {
                                  "kind": "object",
                                  "type": "TocLink",
                                  "schema": {
                                    "id": {
                                      "name": "id",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            991,
                                            1002
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "text": {
                                      "name": "text",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1007,
                                            1020
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "depth": {
                                      "name": "depth",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "number",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1025,
                                            1039
                                          ]
                                        }
                                      ],
                                      "schema": "number"
                                    },
                                    "children": {
                                      "name": "children",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "TocLink[]",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1044,
                                            1065
                                          ]
                                        }
                                      ],
                                      "schema": "TocLink[]"
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "body": {
                "name": "body",
                "global": false,
                "description": "Content body",
                "tags": [],
                "required": true,
                "type": "MarkdownRoot",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      2523,
                      2549
                    ]
                  }
                ],
                "schema": "MarkdownRoot"
              },
              "layout": {
                "name": "layout",
                "global": false,
                "description": "Layout",
                "tags": [],
                "required": false,
                "type": "\"docs\"",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      2319,
                      2338
                    ]
                  }
                ],
                "schema": "\"docs\""
              },
              "_id": {
                "name": "_id",
                "global": false,
                "description": "Content id",
                "tags": [],
                "required": true,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      185,
                      197
                    ]
                  }
                ],
                "schema": "string"
              },
              "_source": {
                "name": "_source",
                "global": false,
                "description": "Content source",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      240,
                      257
                    ]
                  }
                ],
                "schema": "string"
              },
              "_path": {
                "name": "_path",
                "global": false,
                "description": "Content path, this path is source agnostic and it the content my live in any source",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      369,
                      384
                    ]
                  }
                ],
                "schema": "string"
              },
              "title": {
                "name": "title",
                "global": false,
                "description": "Content title",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      426,
                      441
                    ]
                  }
                ],
                "schema": "string"
              },
              "_draft": {
                "name": "_draft",
                "global": false,
                "description": "Content draft status",
                "tags": [],
                "required": false,
                "type": "boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      490,
                      507
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "boolean",
                  "schema": [
                    "false",
                    "true"
                  ]
                }
              },
              "_partial": {
                "name": "_partial",
                "global": false,
                "description": "Content partial status",
                "tags": [],
                "required": false,
                "type": "boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      558,
                      577
                    ]
                  }
                ],
                "schema": "boolean"
              },
              "_locale": {
                "name": "_locale",
                "global": false,
                "description": "Content locale",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      620,
                      637
                    ]
                  }
                ],
                "schema": "string"
              },
              "_type": {
                "name": "_type",
                "global": false,
                "description": "File type of the content, i.e `markdown`",
                "tags": [],
                "required": false,
                "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      706,
                      751
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                  "schema": [
                    "\"markdown\"",
                    "\"yaml\"",
                    "\"json\"",
                    "\"csv\""
                  ]
                }
              },
              "_file": {
                "name": "_file",
                "global": false,
                "description": "Path to the file relative to the content directory",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      830,
                      845
                    ]
                  }
                ],
                "schema": "string"
              },
              "_extension": {
                "name": "_extension",
                "global": false,
                "description": "Extension of the file",
                "tags": [],
                "required": false,
                "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      895,
                      957
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                  "schema": [
                    "\"yaml\"",
                    "\"json\"",
                    "\"csv\"",
                    "\"md\"",
                    "\"yml\"",
                    "\"json5\""
                  ]
                }
              }
            }
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "value",
          "type": "ParsedContent",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue.d.ts",
              "range": [
                470,
                548
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "ParsedContent",
            "schema": {
              "excerpt": {
                "name": "excerpt",
                "global": false,
                "description": "Excerpt",
                "tags": [],
                "required": false,
                "type": "MarkdownRoot",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      2459,
                      2482
                    ]
                  }
                ],
                "schema": {
                  "kind": "object",
                  "type": "MarkdownRoot",
                  "schema": {
                    "type": {
                      "name": "type",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": true,
                      "type": "\"root\"",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            1465,
                            1478
                          ]
                        }
                      ],
                      "schema": "\"root\""
                    },
                    "children": {
                      "name": "children",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": true,
                      "type": "MarkdownNode[]",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            1483,
                            1508
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "array",
                        "type": "MarkdownNode[]",
                        "schema": [
                          {
                            "kind": "object",
                            "type": "MarkdownNode",
                            "schema": {
                              "type": {
                                "name": "type",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": true,
                                "type": "string",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1214,
                                      1227
                                    ]
                                  }
                                ],
                                "schema": "string"
                              },
                              "tag": {
                                "name": "tag",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "string",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1232,
                                      1245
                                    ]
                                  }
                                ],
                                "schema": "string"
                              },
                              "value": {
                                "name": "value",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "string",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1250,
                                      1265
                                    ]
                                  }
                                ],
                                "schema": "string"
                              },
                              "props": {
                                "name": "props",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Record<string, any>",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1270,
                                      1298
                                    ]
                                  }
                                ],
                                "schema": "Record<string, any>"
                              },
                              "content": {
                                "name": "content",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "any",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1303,
                                      1317
                                    ]
                                  }
                                ],
                                "schema": "any"
                              },
                              "children": {
                                "name": "children",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "MarkdownNode[]",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1322,
                                      1348
                                    ]
                                  }
                                ],
                                "schema": "MarkdownNode[]"
                              },
                              "attributes": {
                                "name": "attributes",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Record<string, any>",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1353,
                                      1386
                                    ]
                                  }
                                ],
                                "schema": "Record<string, any>"
                              },
                              "fmAttributes": {
                                "name": "fmAttributes",
                                "global": false,
                                "description": "",
                                "tags": [],
                                "required": false,
                                "type": "Record<string, any>",
                                "declarations": [
                                  {
                                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                    "range": [
                                      1391,
                                      1426
                                    ]
                                  }
                                ],
                                "schema": "Record<string, any>"
                              }
                            }
                          }
                        ]
                      }
                    },
                    "props": {
                      "name": "props",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": false,
                      "type": "Record<string, any>",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            1513,
                            1541
                          ]
                        }
                      ],
                      "schema": "Record<string, any>"
                    },
                    "toc": {
                      "name": "toc",
                      "global": false,
                      "description": "",
                      "tags": [],
                      "required": false,
                      "type": "Toc",
                      "declarations": [
                        {
                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                          "range": [
                            1546,
                            1556
                          ]
                        }
                      ],
                      "schema": {
                        "kind": "object",
                        "type": "Toc",
                        "schema": {
                          "title": {
                            "name": "title",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "string",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1095,
                                  1109
                                ]
                              }
                            ],
                            "schema": "string"
                          },
                          "depth": {
                            "name": "depth",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "number",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1114,
                                  1128
                                ]
                              }
                            ],
                            "schema": "number"
                          },
                          "searchDepth": {
                            "name": "searchDepth",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "number",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1133,
                                  1153
                                ]
                              }
                            ],
                            "schema": "number"
                          },
                          "links": {
                            "name": "links",
                            "global": false,
                            "description": "",
                            "tags": [],
                            "required": true,
                            "type": "TocLink[]",
                            "declarations": [
                              {
                                "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                "range": [
                                  1158,
                                  1175
                                ]
                              }
                            ],
                            "schema": {
                              "kind": "array",
                              "type": "TocLink[]",
                              "schema": [
                                {
                                  "kind": "object",
                                  "type": "TocLink",
                                  "schema": {
                                    "id": {
                                      "name": "id",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            991,
                                            1002
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "text": {
                                      "name": "text",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "string",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1007,
                                            1020
                                          ]
                                        }
                                      ],
                                      "schema": "string"
                                    },
                                    "depth": {
                                      "name": "depth",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": true,
                                      "type": "number",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1025,
                                            1039
                                          ]
                                        }
                                      ],
                                      "schema": "number"
                                    },
                                    "children": {
                                      "name": "children",
                                      "global": false,
                                      "description": "",
                                      "tags": [],
                                      "required": false,
                                      "type": "TocLink[]",
                                      "declarations": [
                                        {
                                          "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                                          "range": [
                                            1044,
                                            1065
                                          ]
                                        }
                                      ],
                                      "schema": "TocLink[]"
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "body": {
                "name": "body",
                "global": false,
                "description": "Content body",
                "tags": [],
                "required": true,
                "type": "MarkdownRoot",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      2523,
                      2549
                    ]
                  }
                ],
                "schema": "MarkdownRoot"
              },
              "layout": {
                "name": "layout",
                "global": false,
                "description": "Layout",
                "tags": [],
                "required": false,
                "type": "\"docs\"",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      2319,
                      2338
                    ]
                  }
                ],
                "schema": "\"docs\""
              },
              "_id": {
                "name": "_id",
                "global": false,
                "description": "Content id",
                "tags": [],
                "required": true,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      185,
                      197
                    ]
                  }
                ],
                "schema": "string"
              },
              "_source": {
                "name": "_source",
                "global": false,
                "description": "Content source",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      240,
                      257
                    ]
                  }
                ],
                "schema": "string"
              },
              "_path": {
                "name": "_path",
                "global": false,
                "description": "Content path, this path is source agnostic and it the content my live in any source",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      369,
                      384
                    ]
                  }
                ],
                "schema": "string"
              },
              "title": {
                "name": "title",
                "global": false,
                "description": "Content title",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      426,
                      441
                    ]
                  }
                ],
                "schema": "string"
              },
              "_draft": {
                "name": "_draft",
                "global": false,
                "description": "Content draft status",
                "tags": [],
                "required": false,
                "type": "boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      490,
                      507
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "boolean",
                  "schema": [
                    "false",
                    "true"
                  ]
                }
              },
              "_partial": {
                "name": "_partial",
                "global": false,
                "description": "Content partial status",
                "tags": [],
                "required": false,
                "type": "boolean",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      558,
                      577
                    ]
                  }
                ],
                "schema": "boolean"
              },
              "_locale": {
                "name": "_locale",
                "global": false,
                "description": "Content locale",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      620,
                      637
                    ]
                  }
                ],
                "schema": "string"
              },
              "_type": {
                "name": "_type",
                "global": false,
                "description": "File type of the content, i.e `markdown`",
                "tags": [],
                "required": false,
                "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      706,
                      751
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "\"markdown\" | \"yaml\" | \"json\" | \"csv\"",
                  "schema": [
                    "\"markdown\"",
                    "\"yaml\"",
                    "\"json\"",
                    "\"csv\""
                  ]
                }
              },
              "_file": {
                "name": "_file",
                "global": false,
                "description": "Path to the file relative to the content directory",
                "tags": [],
                "required": false,
                "type": "string",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      830,
                      845
                    ]
                  }
                ],
                "schema": "string"
              },
              "_extension": {
                "name": "_extension",
                "global": false,
                "description": "Extension of the file",
                "tags": [],
                "required": false,
                "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                "declarations": [
                  {
                    "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/types/index.d.ts",
                    "range": [
                      895,
                      957
                    ]
                  }
                ],
                "schema": {
                  "kind": "enum",
                  "type": "\"yaml\" | \"json\" | \"csv\" | \"md\" | \"yml\" | \"json5\"",
                  "schema": [
                    "\"yaml\"",
                    "\"json\"",
                    "\"csv\"",
                    "\"md\"",
                    "\"yml\"",
                    "\"json5\""
                  ]
                }
              }
            }
          }
        }
      ]
    }
  },
  "DocumentDrivenNotFound": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue",
    "pascalName": "DocumentDrivenNotFound",
    "kebabName": "document-driven-not-found",
    "chunkName": "components/document-driven-not-found",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Markdown": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "pascalName": "Markdown",
    "kebabName": "markdown",
    "chunkName": "components/markdown",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "meta": {
      "type": null,
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ProseCodeInline": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue",
    "pascalName": "ProseCodeInline",
    "kebabName": "prose-code-inline",
    "chunkName": "components/prose-code-inline",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProsePre": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
    "pascalName": "ProsePre",
    "kebabName": "prose-pre",
    "chunkName": "components/prose-pre",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "code",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                248,
                293
              ]
            }
          ],
          "schema": "string",
          "default": "\"\""
        },
        {
          "name": "language",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                297,
                348
              ]
            }
          ],
          "schema": "string",
          "default": "null"
        },
        {
          "name": "filename",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                352,
                403
              ]
            }
          ],
          "schema": "string",
          "default": "null"
        },
        {
          "name": "highlights",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number[]",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                407,
                481
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "number[]",
            "schema": [
              "number"
            ]
          },
          "default": "[]"
        },
        {
          "name": "meta",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                485,
                532
              ]
            }
          ],
          "schema": "string",
          "default": "null"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "class",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                536,
                584
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "style",
          "type": "string | Record<string, any>",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                588,
                646
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | Record<string, any>",
            "schema": [
              "string",
              "Record<string, any>"
            ]
          }
        },
        {
          "name": "code",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                248,
                293
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "language",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                297,
                348
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "filename",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                352,
                403
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "highlights",
          "type": "number[]",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                407,
                481
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "number[]",
            "schema": [
              "number"
            ]
          }
        },
        {
          "name": "meta",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue",
              "range": [
                485,
                532
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseA": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue",
    "pascalName": "ProseA",
    "kebabName": "prose-a",
    "chunkName": "components/prose-a",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "href",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue",
              "range": [
                146,
                191
              ]
            }
          ],
          "schema": "string",
          "default": "\"\""
        },
        {
          "name": "target",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue",
              "range": [
                195,
                270
              ]
            }
          ],
          "schema": "string",
          "default": "undefined"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "href",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue",
              "range": [
                146,
                191
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "target",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue",
              "range": [
                195,
                270
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseBlockquote": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue",
    "pascalName": "ProseBlockquote",
    "kebabName": "prose-blockquote",
    "chunkName": "components/prose-blockquote",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseEm": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue",
    "pascalName": "ProseEm",
    "kebabName": "prose-em",
    "chunkName": "components/prose-em",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseH5": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue",
    "pascalName": "ProseH5",
    "kebabName": "prose-h5",
    "chunkName": "components/prose-h5",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue",
              "range": [
                264,
                275
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue",
              "range": [
                264,
                275
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "id",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue",
              "range": [
                264,
                275
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseH6": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue",
    "pascalName": "ProseH6",
    "kebabName": "prose-h6",
    "chunkName": "components/prose-h6",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue",
              "range": [
                264,
                275
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue",
              "range": [
                264,
                275
              ]
            }
          ],
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "id",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue",
              "range": [
                264,
                275
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseHr": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue",
    "pascalName": "ProseHr",
    "kebabName": "prose-hr",
    "chunkName": "components/prose-hr",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ProseImg": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
    "pascalName": "ProseImg",
    "kebabName": "prose-img",
    "chunkName": "components/prose-img",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
              "range": [
                289,
                333
              ]
            }
          ],
          "schema": "string",
          "default": "\"\""
        },
        {
          "name": "alt",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
              "range": [
                337,
                381
              ]
            }
          ],
          "schema": "string",
          "default": "\"\""
        },
        {
          "name": "width",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | number",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
              "range": [
                385,
                448
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | number",
            "schema": [
              "string",
              "number"
            ]
          },
          "default": "undefined"
        },
        {
          "name": "height",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | number",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
              "range": [
                452,
                516
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | number",
            "schema": [
              "string",
              "number"
            ]
          },
          "default": "undefined"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "src",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
              "range": [
                289,
                333
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "alt",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
              "range": [
                337,
                381
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "width",
          "type": "string | number",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
              "range": [
                385,
                448
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | number",
            "schema": [
              "string",
              "number"
            ]
          }
        },
        {
          "name": "height",
          "type": "string | number",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue",
              "range": [
                452,
                516
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | number",
            "schema": [
              "string",
              "number"
            ]
          }
        }
      ]
    }
  },
  "ProseLi": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue",
    "pascalName": "ProseLi",
    "kebabName": "prose-li",
    "chunkName": "components/prose-li",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseOl": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue",
    "pascalName": "ProseOl",
    "kebabName": "prose-ol",
    "chunkName": "components/prose-ol",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseP": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue",
    "pascalName": "ProseP",
    "kebabName": "prose-p",
    "chunkName": "components/prose-p",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseScript": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue",
    "pascalName": "ProseScript",
    "kebabName": "prose-script",
    "chunkName": "components/prose-script",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue",
              "range": [
                285,
                329
              ]
            }
          ],
          "schema": "string",
          "default": "\"\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "src",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue",
              "range": [
                285,
                329
              ]
            }
          ],
          "schema": "string"
        }
      ]
    }
  },
  "ProseStrong": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue",
    "pascalName": "ProseStrong",
    "kebabName": "prose-strong",
    "chunkName": "components/prose-strong",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseTable": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue",
    "pascalName": "ProseTable",
    "kebabName": "prose-table",
    "chunkName": "components/prose-table",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseTbody": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue",
    "pascalName": "ProseTbody",
    "kebabName": "prose-tbody",
    "chunkName": "components/prose-tbody",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseTd": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue",
    "pascalName": "ProseTd",
    "kebabName": "prose-td",
    "chunkName": "components/prose-td",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseTh": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue",
    "pascalName": "ProseTh",
    "kebabName": "prose-th",
    "chunkName": "components/prose-th",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseThead": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue",
    "pascalName": "ProseThead",
    "kebabName": "prose-thead",
    "chunkName": "components/prose-thead",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseTr": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue",
    "pascalName": "ProseTr",
    "kebabName": "prose-tr",
    "chunkName": "components/prose-tr",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ProseUl": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue",
    "pascalName": "ProseUl",
    "kebabName": "prose-ul",
    "chunkName": "components/prose-ul",
    "shortPath": "node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue",
    "meta": {
      "type": 1,
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "UButton": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue",
    "pascalName": "UButton",
    "kebabName": "u-button",
    "chunkName": "components/u-button",
    "shortPath": "node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "size",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "ButtonSize",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8034,
                8051
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "ButtonSize",
            "schema": [
              "\"2xs\"",
              "\"xs\"",
              "\"sm\"",
              "\"md\"",
              "\"lg\"",
              "\"xl\""
            ]
          },
          "default": "config.default.size"
        },
        {
          "name": "ui",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8056,
                8064
              ]
            }
          ],
          "schema": "any",
          "default": "{}"
        },
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8092,
                8105
              ]
            }
          ],
          "schema": "string",
          "default": "null"
        },
        {
          "name": "color",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8110,
                8121
              ]
            }
          ],
          "schema": "any",
          "default": "config.default.color"
        },
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8126,
                8139
              ]
            }
          ],
          "schema": "string",
          "default": "\"button\""
        },
        {
          "name": "target",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8160,
                8182
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "rel",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8187,
                8206
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "noRel",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8211,
                8232
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "prefetch",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8237,
                8261
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "noPrefetch",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8266,
                8292
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "activeClass",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8297,
                8324
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "exactActiveClass",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8329,
                8361
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "prefetchedClass",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8366,
                8397
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "replace",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8402,
                8425
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "ariaCurrentValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8430,
                8462
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "external",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "NuxtLinkProps",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8467,
                8491
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "variant",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "ButtonVariant",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8518,
                8541
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "ButtonVariant",
            "schema": [
              "\"link\"",
              "\"solid\"",
              "\"outline\"",
              "\"soft\"",
              "\"ghost\""
            ]
          },
          "default": "config.default.variant"
        },
        {
          "name": "label",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8546,
                8560
              ]
            }
          ],
          "schema": "string",
          "default": "null"
        },
        {
          "name": "loadingIcon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8651,
                8671
              ]
            }
          ],
          "schema": "string",
          "default": "config.default.loadingIcon"
        },
        {
          "name": "leadingIcon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8676,
                8696
              ]
            }
          ],
          "schema": "string",
          "default": "null"
        },
        {
          "name": "trailingIcon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8701,
                8722
              ]
            }
          ],
          "schema": "string",
          "default": "null"
        },
        {
          "name": "to",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "RouteLocationRaw",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8771,
                8792
              ]
            }
          ],
          "schema": "RouteLocationRaw"
        },
        {
          "name": "href",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "RouteLocationRaw",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8797,
                8820
              ]
            }
          ],
          "schema": "RouteLocationRaw"
        },
        {
          "name": "truncate",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8069,
                8087
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "leading",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8496,
                8513
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "loading",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8565,
                8582
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "disabled",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8587,
                8605
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "block",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8610,
                8625
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "padded",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8630,
                8646
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "true"
        },
        {
          "name": "trailing",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8727,
                8745
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "square",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                8750,
                8766
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "replace",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                7594,
                7730
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "size",
          "type": "ButtonSize",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4985,
                5106
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "ButtonSize",
            "schema": [
              "\"2xs\"",
              "\"xs\"",
              "\"sm\"",
              "\"md\"",
              "\"lg\"",
              "\"xl\""
            ]
          }
        },
        {
          "name": "class",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                6019,
                6090
              ]
            }
          ],
          "schema": "any"
        },
        {
          "name": "type",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4506,
                4578
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "href",
          "type": "RouteLocationRaw",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                6307,
                6443
              ]
            }
          ],
          "schema": "RouteLocationRaw"
        },
        {
          "name": "target",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                6448,
                6583
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "block",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4583,
                4658
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "label",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4663,
                4734
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "loading",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4739,
                4816
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "disabled",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4821,
                4899
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "padded",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4904,
                4980
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "color",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5111,
                5226
              ]
            }
          ],
          "schema": "any"
        },
        {
          "name": "variant",
          "type": "ButtonVariant",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5231,
                5358
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "ButtonVariant",
            "schema": [
              "\"link\"",
              "\"solid\"",
              "\"outline\"",
              "\"soft\"",
              "\"ghost\""
            ]
          }
        },
        {
          "name": "icon",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5363,
                5433
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "loadingIcon",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5438,
                5520
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "leadingIcon",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5525,
                5602
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "trailingIcon",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5607,
                5685
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "trailing",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5690,
                5768
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "leading",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5773,
                5850
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "square",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5855,
                5931
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "truncate",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                5936,
                6014
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "to",
          "type": "RouteLocationRaw",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                6168,
                6302
              ]
            }
          ],
          "schema": "RouteLocationRaw"
        },
        {
          "name": "rel",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                6588,
                6720
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "noRel",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                6725,
                6859
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "prefetch",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                6864,
                7001
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "noPrefetch",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                7006,
                7145
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "activeClass",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                7150,
                7290
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "exactActiveClass",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                7295,
                7440
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "prefetchedClass",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                7445,
                7589
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "ariaCurrentValue",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                7735,
                7880
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "external",
          "type": "NuxtLinkProps",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                7885,
                8022
              ]
            }
          ],
          "schema": {
            "kind": "array",
            "type": "NuxtLinkProps",
            "schema": []
          }
        },
        {
          "name": "ui",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                3685,
                3720
              ]
            }
          ],
          "schema": "any"
        },
        {
          "name": "attrs",
          "type": "Pick<{ [x: string]: unknown; }, string>",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                3725,
                3811
              ]
            }
          ],
          "schema": "Pick<{ [x: string]: unknown; }, string>"
        },
        {
          "name": "isLeading",
          "type": "string | true",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                3816,
                3868
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | true",
            "schema": [
              "string",
              "true"
            ]
          }
        },
        {
          "name": "isTrailing",
          "type": "string | true",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                3873,
                3926
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "string | true",
            "schema": [
              "string",
              "true"
            ]
          }
        },
        {
          "name": "isSquare",
          "type": "boolean",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                3931,
                3976
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "buttonClass",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                3981,
                4028
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "leadingIconName",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4033,
                4096
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "trailingIconName",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4101,
                4165
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "leadingIconClass",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4170,
                4222
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "trailingIconClass",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4227,
                4280
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "linkProps",
          "type": "{}",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue.d.ts",
              "range": [
                4285,
                4326
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ]
    }
  },
  "UIcon": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue",
    "pascalName": "UIcon",
    "kebabName": "u-icon",
    "chunkName": "components/u-icon",
    "shortPath": "node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue",
    "export": "default",
    "priority": 0,
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue",
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue.d.ts",
              "range": [
                443,
                514
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue.d.ts",
              "range": [
                443,
                514
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "dynamic",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue.d.ts",
              "range": [
                608,
                625
              ]
            }
          ],
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "name",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue.d.ts",
              "range": [
                443,
                514
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "dynamic",
          "type": "any",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue.d.ts",
              "range": [
                223,
                263
              ]
            }
          ],
          "schema": "any"
        }
      ]
    }
  },
  "Icon": {
    "export": "default",
    "chunkName": "components/icon",
    "global": true,
    "kebabName": "icon",
    "pascalName": "Icon",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/Icon.vue",
    "priority": 0,
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/Icon.vue",
              "range": [
                669,
                717
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/Icon.vue",
              "range": [
                669,
                717
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "size",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/Icon.vue",
              "range": [
                721,
                766
              ]
            }
          ],
          "schema": "string",
          "default": "\"\""
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "declarations": [],
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "$slots",
          "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/@vue/runtime-core/dist/runtime-core.d.ts",
              "range": [
                8475,
                8502
              ]
            }
          ],
          "schema": {
            "kind": "object",
            "type": "Readonly<InternalSlots> & { default?(_: {}): any; }",
            "schema": {
              "default": {
                "name": "default",
                "global": false,
                "description": "",
                "tags": [],
                "required": false,
                "type": "(_: {}) => any",
                "declarations": [],
                "schema": {
                  "kind": "event",
                  "type": "(_: {}): any",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "size",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/Icon.vue",
              "range": [
                721,
                766
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "name",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/Icon.vue",
              "range": [
                669,
                717
              ]
            }
          ],
          "schema": "string"
        }
      ]
    },
    "name": "Icon",
    "filePath": "node_modules/nuxt-icon/dist/runtime/Icon.vue",
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/Icon.vue"
  },
  "IconCSS": {
    "export": "default",
    "chunkName": "components/icon-css",
    "global": true,
    "kebabName": "icon-css",
    "pascalName": "IconCSS",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/IconCSS.vue",
    "priority": 0,
    "meta": {
      "type": 1,
      "props": [
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/IconCSS.vue",
              "range": [
                387,
                435
              ]
            },
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/IconCSS.vue",
              "range": [
                387,
                435
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "size",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/IconCSS.vue",
              "range": [
                439,
                484
              ]
            }
          ],
          "schema": "string",
          "default": "\"\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "size",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/IconCSS.vue",
              "range": [
                439,
                484
              ]
            }
          ],
          "schema": "string"
        },
        {
          "name": "name",
          "type": "string",
          "description": "",
          "declarations": [
            {
              "file": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/IconCSS.vue",
              "range": [
                387,
                435
              ]
            }
          ],
          "schema": "string"
        }
      ]
    },
    "name": "IconCSS",
    "filePath": "node_modules/nuxt-icon/dist/runtime/IconCSS.vue",
    "fullPath": "/Users/rezajafar/peakofeloquence-site/node_modules/nuxt-icon/dist/runtime/IconCSS.vue"
  }
};

const _tO16Fk = eventHandler(async () => {
  const componentsIgnoredPrefix = ["Content", "DocumentDriven", "Markdown"];
  const filteredComponents = Object.values(components).filter((c) => c.global && !componentsIgnoredPrefix.some((prefix) => c.pascalName.startsWith(prefix))).map(({ pascalName, filePath, meta }) => {
    return {
      name: pascalName,
      path: filePath,
      meta: {
        props: meta.props,
        slots: meta.slots,
        events: meta.events
      }
    };
  });
  const appConfig = useAppConfig();
  const runtimeConfig = useRuntimeConfig();
  const { app, contentSchema, appConfigSchema, studio, content: { sources, ignores, locales, defaultLocale, highlight, navigation, documentDriven, experimental } } = runtimeConfig;
  const safeSources = {};
  Object.keys(sources).forEach((name) => {
    const { driver, prefix, base, repo, branch, dir } = sources[name] || {};
    safeSources[name] = {
      driver,
      prefix,
      base,
      repo,
      branch,
      dir
    };
  });
  const hasPinceau = runtimeConfig?.pinceau?.studio;
  let tokensConfig;
  let tokensConfigSchema;
  if (hasPinceau) {
    tokensConfig = await $fetch.native(joinURL(app.baseURL, "/__pinceau_tokens_config.json")).then((r) => r.json());
    tokensConfigSchema = await $fetch.native(joinURL(app.baseURL, "/__pinceau_tokens_schema.json")).then((r) => r.json());
  }
  return {
    // Studio version
    version: studio.version,
    project: studio?.project,
    tokens: studio?.publicToken,
    gitInfo: studio?.gitInfo || {},
    // nuxt.schema for Nuxt Content frontmatter
    contentSchema: contentSchema || {},
    // app.config
    appConfigSchema: appConfigSchema || {},
    appConfig,
    // tokens.config
    tokensConfigSchema,
    tokensConfig,
    // @nuxt/content
    content: { sources: safeSources, ignores, locales, defaultLocale, highlight, navigation, documentDriven, experimental },
    // nuxt-component-meta
    components: filteredComponents
  };
});

const _zXBWZy = defineEventHandler((event) => {
  appendHeader(event, "Access-Control-Allow-Origin", "*");
  const componentName = (event.context.params["component?"] || "").replace(/\.json$/, "");
  if (componentName) {
    const meta = components[pascalCase(componentName)];
    if (!meta) {
      throw createError$1({
        statusMessage: "Components not found!",
        statusCode: 404,
        data: {
          description: "Please make sure you are looking for correct component"
        }
      });
    }
    return meta;
  }
  return components;
});

function getEnv(config) {
  const key = config.toUpperCase();
  const env = globalThis._importMeta_.env || {};
  const privateKey = `NUXT_SITE_${key}`;
  const publicKey = `NUXT_PUBLIC_SITE_${key}`;
  if (privateKey in env)
    return env[privateKey];
  if (publicKey in env)
    return env[publicKey];
}
const _58d3RD = defineEventHandler((e) => {
  const config = useRuntimeConfig()["nuxt-site-config"];
  const siteConfig = e.context.siteConfig || createSiteConfigStack({
    debug: config.debug
  });
  if (siteConfig) {
    const appConfig = useAppConfig();
    const nitroOrigin = useNitroOrigin(e);
    e.context.siteConfigNitroOrigin = nitroOrigin;
    siteConfig.push({
      _context: "nitro:init",
      _priority: -4,
      url: nitroOrigin
    });
    siteConfig.push({
      _context: "runtimeEnv",
      _priority: 0,
      env: getEnv("Env"),
      url: getEnv("Url"),
      name: getEnv("Name"),
      description: getEnv("Description"),
      logo: getEnv("Image"),
      defaultLocale: getEnv("Language"),
      indexable: getEnv("Indexable")
    });
    const buildStack = config.stack || [];
    buildStack.forEach((c) => siteConfig.push(c));
    if (appConfig.site) {
      siteConfig.push({
        _priority: -2,
        _context: "app:config",
        ...appConfig.site
      });
    }
    if (e.context._nitro.routeRules.site) {
      siteConfig.push({
        _context: "route-rules",
        ...e.context._nitro.routeRules.site
      });
    }
    const curStack = siteConfig.get();
    if (typeof curStack.indexable === "undefined") {
      siteConfig.push({
        _context: "computed-env",
        _priority: -4,
        // allow overriding from the module
        indexable: curStack.env === "production"
      });
    }
  }
  e.context.siteConfig = siteConfig;
});

const get = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
const _pick = (obj, condition) => Object.keys(obj).filter(condition).reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
const omit = (keys) => (obj) => keys && keys.length ? _pick(obj, (key) => !keys.includes(key)) : obj;
const apply = (fn) => (data) => Array.isArray(data) ? data.map((item) => fn(item)) : fn(data);
const detectProperties = (keys) => {
  const prefixes = [];
  const properties = [];
  for (const key of keys) {
    if (["$", "_"].includes(key)) {
      prefixes.push(key);
    } else {
      properties.push(key);
    }
  }
  return { prefixes, properties };
};
const withoutKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => !properties.includes(key) && !prefixes.includes(key[0]));
};
const withKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => properties.includes(key) || prefixes.includes(key[0]));
};
const sortList = (data, params) => {
  const comperable = new Intl.Collator(params.$locale, {
    numeric: params.$numeric,
    caseFirst: params.$caseFirst,
    sensitivity: params.$sensitivity
  });
  const keys = Object.keys(params).filter((key) => !key.startsWith("$"));
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)].map((value) => {
        if (value === null) {
          return void 0;
        }
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      if (params[key] === -1) {
        values.reverse();
      }
      return comperable.compare(values[0], values[1]);
    });
  }
  return data;
};
const assertArray = (value, message = "Expected an array") => {
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
};
const ensureArray = (value) => {
  return Array.isArray(value) ? value : [void 0, null].includes(value) ? [] : [value];
};

const arrayParams = ["sort", "where", "only", "without"];
function createQuery(fetcher, opts = {}) {
  const queryParams = {};
  for (const key of Object.keys(opts.initialParams || {})) {
    queryParams[key] = arrayParams.includes(key) ? ensureArray(opts.initialParams[key]) : opts.initialParams[key];
  }
  const $set = (key, fn = (v) => v) => {
    return (...values) => {
      queryParams[key] = fn(...values);
      return query;
    };
  };
  const resolveResult = (result) => {
    if (opts.legacy) {
      if (result?.surround) {
        return result.surround;
      }
      if (!result) {
        return result;
      }
      if (result?.dirConfig) {
        result.result = {
          _path: result.dirConfig?._path,
          ...result.result,
          _dir: result.dirConfig
        };
      }
      return result?._path || Array.isArray(result) || !Object.prototype.hasOwnProperty.call(result, "result") ? result : result?.result;
    }
    return result;
  };
  const query = {
    params: () => ({
      ...queryParams,
      ...queryParams.where ? { where: [...ensureArray(queryParams.where)] } : {},
      ...queryParams.sort ? { sort: [...ensureArray(queryParams.sort)] } : {}
    }),
    only: $set("only", ensureArray),
    without: $set("without", ensureArray),
    where: $set("where", (q) => [...ensureArray(queryParams.where), ...ensureArray(q)]),
    sort: $set("sort", (sort) => [...ensureArray(queryParams.sort), ...ensureArray(sort)]),
    limit: $set("limit", (v) => parseInt(String(v), 10)),
    skip: $set("skip", (v) => parseInt(String(v), 10)),
    // find
    find: () => fetcher(query).then(resolveResult),
    findOne: () => fetcher($set("first")(true)).then(resolveResult),
    count: () => fetcher($set("count")(true)).then(resolveResult),
    // locale
    locale: (_locale) => query.where({ _locale }),
    withSurround: $set("surround", (surroundQuery, options) => ({ query: surroundQuery, ...options })),
    withDirConfig: () => $set("dirConfig")(true)
  };
  if (opts.legacy) {
    query.findSurround = (surroundQuery, options) => {
      return query.withSurround(surroundQuery, options).find().then(resolveResult);
    };
    return query;
  }
  return query;
}

const defineTransformer = (transformer) => {
  return transformer;
};

function createTokenizer(parser, initialize, from) {
  let point = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  const effects = {
    consume,
    enter,
    exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    return Object.assign({}, point);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    while (point._index < chunks.length) {
      const chunk = chunks[point._index];
      if (typeof chunk === "string") {
        chunkIndex = point._index;
        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }
        while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code) {
    state = state(code);
  }
  function consume(code) {
    if (markdownLineEnding(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    }
    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++;
      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    }
    context.previous = code;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs) ? (
        /* c8 ignore next 1 */
        handleListOfConstructs(constructs)
      ) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
      function handleMapOfConstructs(map) {
        return start;
        function start(code) {
          const def = code !== null && map[code];
          const all = code !== null && map.null;
          const list = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all) ? all : all ? [all] : []
          ];
          return handleListOfConstructs(list)(code);
        }
      }
      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        if (list.length === 0) {
          return bogusState;
        }
        return handleConstruct(list[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok,
            nok
          )(code);
        }
      }
      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index = -1;
  const result = [];
  let atTab;
  while (++index < chunks.length) {
    const chunk = chunks[index];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}

function initializeDocument(effects) {
  const self = this;
  const delimiter = (this.parser.delimiter || ",").charCodeAt(0);
  return enterRow;
  function enterRow(code) {
    return effects.attempt(
      { tokenize: attemptLastLine },
      (code2) => {
        effects.consume(code2);
        return enterRow;
      },
      (code2) => {
        effects.enter("row");
        return enterColumn(code2);
      }
    )(code);
  }
  function enterColumn(code) {
    effects.enter("column");
    return content(code);
  }
  function content(code) {
    if (code === null) {
      effects.exit("column");
      effects.exit("row");
      effects.consume(code);
      return content;
    }
    if (code === 34) {
      return quotedData(code);
    }
    if (code === delimiter) {
      if (self.previous === delimiter || markdownLineEnding(self.previous) || self.previous === null) {
        effects.enter("data");
        effects.exit("data");
      }
      effects.exit("column");
      effects.enter("columnSeparator");
      effects.consume(code);
      effects.exit("columnSeparator");
      effects.enter("column");
      return content;
    }
    if (markdownLineEnding(code)) {
      effects.exit("column");
      effects.enter("newline");
      effects.consume(code);
      effects.exit("newline");
      effects.exit("row");
      return enterRow;
    }
    return data(code);
  }
  function data(code) {
    effects.enter("data");
    return dataChunk(code);
  }
  function dataChunk(code) {
    if (code === null || markdownLineEnding(code) || code === delimiter) {
      effects.exit("data");
      return content(code);
    }
    if (code === 92) {
      return escapeCharacter(code);
    }
    effects.consume(code);
    return dataChunk;
  }
  function escapeCharacter(code) {
    effects.consume(code);
    return function(code2) {
      effects.consume(code2);
      return content;
    };
  }
  function quotedData(code) {
    effects.enter("quotedData");
    effects.enter("quotedDataChunk");
    effects.consume(code);
    return quotedDataChunk;
  }
  function quotedDataChunk(code) {
    if (code === 92) {
      return escapeCharacter(code);
    }
    if (code === 34) {
      return effects.attempt(
        { tokenize: attemptDoubleQuote },
        (code2) => {
          effects.exit("quotedDataChunk");
          effects.enter("quotedDataChunk");
          return quotedDataChunk(code2);
        },
        (code2) => {
          effects.consume(code2);
          effects.exit("quotedDataChunk");
          effects.exit("quotedData");
          return content;
        }
      )(code);
    }
    effects.consume(code);
    return quotedDataChunk;
  }
}
function attemptDoubleQuote(effects, ok, nok) {
  return startSequence;
  function startSequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.enter("quoteFence");
    effects.consume(code);
    return sequence;
  }
  function sequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.consume(code);
    effects.exit("quoteFence");
    return (code2) => ok(code2);
  }
}
function attemptLastLine(effects, ok, nok) {
  return enterLine;
  function enterLine(code) {
    if (!markdownSpace(code) && code !== null) {
      return nok(code);
    }
    effects.enter("emptyLine");
    return continueLine(code);
  }
  function continueLine(code) {
    if (markdownSpace(code)) {
      effects.consume(code);
      return continueLine;
    }
    if (code === null) {
      effects.exit("emptyLine");
      return ok(code);
    }
    return nok(code);
  }
}
const parse = (options) => {
  return createTokenizer(
    { ...options },
    { tokenize: initializeDocument },
    void 0
  );
};

const own = {}.hasOwnProperty;
const initialPoint = {
  line: 1,
  column: 1,
  offset: 0
};
const fromCSV = function(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler()(
    postprocess(
      parse(options).write(preprocess()(value, encoding, true))
    )
  );
};
function compiler() {
  const config = {
    enter: {
      column: opener(openColumn),
      row: opener(openRow),
      data: onenterdata,
      quotedData: onenterdata
    },
    exit: {
      row: closer(),
      column: closer(),
      data: onexitdata,
      quotedData: onexitQuotedData
    }
  };
  return compile;
  function compile(events) {
    const tree = {
      type: "root",
      children: []
    };
    const stack = [tree];
    const tokenStack = [];
    const context = {
      stack,
      tokenStack,
      config,
      enter,
      exit,
      resume
    };
    let index = -1;
    while (++index < events.length) {
      const handler = config[events[index][0]];
      if (own.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index][2].sliceSerialize
            },
            context
          ),
          events[index][1]
        );
      }
    }
    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point(
        events.length > 0 ? events[0][1].start : initialPoint
      ),
      end: point(
        events.length > 0 ? events[events.length - 2][1].end : initialPoint
      )
    };
    return tree;
  }
  function point(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }
  function opener(create, and) {
    return open;
    function open(token) {
      enter.call(this, create(token), token);
      if (and) {
        and.call(this, token);
      }
    }
  }
  function enter(node, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node);
    this.stack.push(node);
    this.tokenStack.push([token, errorHandler]);
    node.position = {
      start: point(token.start)
    };
    return node;
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and) {
        and.call(this, token);
      }
      exit.call(this, token);
    }
  }
  function exit(token, onExitError) {
    const node = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node.position.end = point(token.end);
    return node;
  }
  function resume() {
    return toString$1(this.stack.pop());
  }
  function onenterdata(token) {
    const parent = this.stack[this.stack.length - 1];
    let tail = parent.children[parent.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text();
      tail.position = {
        start: point(token.start)
      };
      parent.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token).trim().replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function onexitQuotedData(token) {
    const tail = this.stack.pop();
    const value = this.sliceSerialize(token);
    tail.value += this.sliceSerialize(token).trim().substring(1, value.length - 1).replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function text() {
    return {
      type: "text",
      value: ""
    };
  }
  function openColumn() {
    return {
      type: "column",
      children: []
    };
  }
  function openRow() {
    return {
      type: "row",
      children: []
    };
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      "Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open"
    );
  }
}

function csvParse(options) {
  const parser = (doc) => {
    return fromCSV(doc, options);
  };
  Object.assign(this, { Parser: parser });
  const toJsonObject = (tree) => {
    const [header, ...rows] = tree.children;
    const columns = header.children.map((col) => col.children[0].value);
    const data = rows.map((row) => {
      return row.children.reduce((acc, col, i) => {
        acc[String(columns[i])] = col.children[0]?.value;
        return acc;
      }, {});
    });
    return data;
  };
  const toJsonArray = (tree) => {
    const data = tree.children.map((row) => {
      return row.children.map((col) => col.children[0]?.value);
    });
    return data;
  };
  const compiler = (doc) => {
    if (options.json) {
      return toJsonObject(doc);
    }
    return toJsonArray(doc);
  };
  Object.assign(this, { Compiler: compiler });
}
const csv = defineTransformer({
  name: "csv",
  extensions: [".csv"],
  parse: async (_id, content, options = {}) => {
    const stream = unified().use(csvParse, {
      delimiter: ",",
      json: true,
      ...options
    });
    const { result } = await stream.process(content);
    return {
      _id,
      _type: "csv",
      body: result
    };
  }
});

const SEMVER_REGEX = /^(\d+)(\.\d+)*(\.x)?$/;
const describeId = (id) => {
  const [_source, ...parts] = id.split(":");
  const [, filename, _extension] = parts[parts.length - 1]?.match(/(.*)\.([^.]+)$/) || [];
  if (filename) {
    parts[parts.length - 1] = filename;
  }
  const _path = (parts || []).join("/");
  return {
    _source,
    _path,
    _extension,
    _file: _extension ? `${_path}.${_extension}` : _path
  };
};
const pathMeta = defineTransformer({
  name: "path-meta",
  extensions: [".*"],
  transform(content, options = {}) {
    const { locales = [], defaultLocale = "en", respectPathCase = false } = options;
    const { _source, _file, _path, _extension } = describeId(content._id);
    const parts = _path.split("/");
    const _locale = locales.includes(parts[0]) ? parts.shift() : defaultLocale;
    const filePath = generatePath(parts.join("/"), { respectPathCase });
    return {
      _path: filePath,
      _dir: filePath.split("/").slice(-2)[0],
      _draft: content._draft ?? isDraft(_path),
      _partial: isPartial(_path),
      _locale,
      ...content,
      // TODO: move title to Markdown parser
      title: content.title || generateTitle(refineUrlPart(parts[parts.length - 1])),
      _source,
      _file,
      _extension
    };
  }
});
const isDraft = (path) => !!path.match(/\.draft(\/|\.|$)/);
const isPartial = (path) => path.split(/[:/]/).some((part) => part.match(/^_.*/));
const generatePath = (path, { forceLeadingSlash = true, respectPathCase = false } = {}) => {
  path = path.split("/").map((part) => slugify(refineUrlPart(part), { lower: !respectPathCase })).join("/");
  return forceLeadingSlash ? withLeadingSlash(withoutTrailingSlash(path)) : path;
};
const generateTitle = (path) => path.split(/[\s-]/g).map(pascalCase).join(" ");
function refineUrlPart(name) {
  name = name.split(/[/:]/).pop();
  if (SEMVER_REGEX.test(name)) {
    return name;
  }
  return name.replace(/(\d+\.)?(.*)/, "$2").replace(/^index(\.draft)?$/, "").replace(/\.draft$/, "");
}

const markdown = defineTransformer({
  name: "markdown",
  extensions: [".md"],
  parse: async (_id, content, options = {}) => {
    const config = { ...options };
    config.rehypePlugins = await importPlugins(config.rehypePlugins);
    config.remarkPlugins = await importPlugins(config.remarkPlugins);
    const highlightOptions = options.highlight ? {
      ...options.highlight,
      // Pass only when it's an function. String values are handled by `@nuxtjs/mdc`
      highlighter: typeof options.highlight?.highlighter === "function" ? options.highlight.highlighter : void 0
    } : void 0;
    const parsed = await parseMarkdown(content, {
      ...config,
      highlight: highlightOptions,
      remark: {
        plugins: config.remarkPlugins
      },
      rehype: {
        options: {
          handlers: {
            link
          }
        },
        plugins: config.rehypePlugins
      },
      toc: config.toc
    });
    return {
      ...parsed.data,
      excerpt: parsed.excerpt,
      body: {
        ...parsed.body,
        toc: parsed.toc
      },
      _type: "markdown",
      _id
    };
  }
});
async function importPlugins(plugins = {}) {
  const resolvedPlugins = {};
  for (const [name, plugin] of Object.entries(plugins)) {
    if (plugin) {
      resolvedPlugins[name] = {
        instance: plugin.instance || await import(
          /* @vite-ignore */
          name
        ).then((m) => m.default || m),
        options: plugin
      };
    } else {
      resolvedPlugins[name] = false;
    }
  }
  return resolvedPlugins;
}
function link(state, node) {
  const properties = {
    ...node.attributes || {},
    href: normalizeUri(normalizeLink(node.url))
  };
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = {
    type: "element",
    tagName: "a",
    properties,
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}
function normalizeLink(link2) {
  const match = link2.match(/#.+$/);
  const hash = match ? match[0] : "";
  if (link2.replace(/#.+$/, "").endsWith(".md") && (isRelative(link2) || !/^https?/.test(link2) && !link2.startsWith("/"))) {
    return generatePath(link2.replace(".md" + hash, ""), { forceLeadingSlash: false }) + hash;
  } else {
    return link2;
  }
}

const yaml = defineTransformer({
  name: "Yaml",
  extensions: [".yml", ".yaml"],
  parse: (_id, content) => {
    const { data } = parseFrontMatter(`---
${content}
---`);
    let parsed = data;
    if (Array.isArray(data)) {
      console.warn(`YAML array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = { body: data };
    }
    return {
      ...parsed,
      _id,
      _type: "yaml"
    };
  }
});

const json = defineTransformer({
  name: "Json",
  extensions: [".json", ".json5"],
  parse: async (_id, content) => {
    let parsed;
    if (typeof content === "string") {
      if (_id.endsWith("json5")) {
        parsed = (await import('json5').then((m) => m.default || m)).parse(content);
      } else if (_id.endsWith("json")) {
        parsed = destr(content);
      }
    } else {
      parsed = content;
    }
    if (Array.isArray(parsed)) {
      console.warn(`JSON array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = {
        body: parsed
      };
    }
    return {
      ...parsed,
      _id,
      _type: "json"
    };
  }
});

const TRANSFORMERS = [
  csv,
  markdown,
  json,
  yaml,
  pathMeta
];
function getParser(ext, additionalTransformers = []) {
  let parser = additionalTransformers.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  if (!parser) {
    parser = TRANSFORMERS.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  }
  return parser;
}
function getTransformers(ext, additionalTransformers = []) {
  return [
    ...additionalTransformers.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform),
    ...TRANSFORMERS.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform)
  ];
}
async function transformContent(id, content, options = {}) {
  const { transformers = [] } = options;
  const file = { _id: id, body: content };
  const ext = extname(id);
  const parser = getParser(ext, transformers);
  if (!parser) {
    console.warn(`${ext} files are not supported, "${id}" falling back to raw content`);
    return file;
  }
  const parserOptions = options[camelCase(parser.name)] || {};
  const parsed = await parser.parse(file._id, file.body, parserOptions);
  const matchedTransformers = getTransformers(ext, transformers);
  const result = await matchedTransformers.reduce(async (prev, cur) => {
    const next = await prev || parsed;
    const transformOptions = options[camelCase(cur.name)];
    if (transformOptions === false) {
      return next;
    }
    return cur.transform(next, transformOptions || {});
  }, Promise.resolve(parsed));
  return result;
}

function makeIgnored(ignores) {
  const rxAll = ["/\\.", "/-", ...ignores.filter((p) => p)].map((p) => new RegExp(p));
  return function isIgnored(key) {
    const path = "/" + key.replace(/:/g, "/");
    return rxAll.some((rx) => rx.test(path));
  };
}

function createMatch(opts = {}) {
  const operators = createOperators(match, opts.operators);
  function match(item, conditions) {
    if (typeof conditions !== "object" || conditions instanceof RegExp) {
      return operators.$eq(item, conditions);
    }
    return Object.keys(conditions || {}).every((key) => {
      const condition = conditions[key];
      if (key.startsWith("$") && operators[key]) {
        const fn = operators[key];
        return typeof fn === "function" ? fn(item, condition) : false;
      }
      return match(get(item, key), condition);
    });
  }
  return match;
}
function createOperators(match, operators = {}) {
  return {
    $match: (item, condition) => match(item, condition),
    /**
     * Match if item equals condition
     **/
    $eq: (item, condition) => condition instanceof RegExp ? condition.test(item) : item === condition,
    /**
     * Match if item not equals condition
     **/
    $ne: (item, condition) => condition instanceof RegExp ? !condition.test(item) : item !== condition,
    /**
     * Match is condition is false
     **/
    $not: (item, condition) => !match(item, condition),
    /**
     * Match only if all of nested conditions are true
     **/
    $and: (item, condition) => {
      assertArray(condition, "$and requires an array as condition");
      return condition.every((cond) => match(item, cond));
    },
    /**
     * Match if any of nested conditions is true
     **/
    $or: (item, condition) => {
      assertArray(condition, "$or requires an array as condition");
      return condition.some((cond) => match(item, cond));
    },
    /**
     * Match if item is in condition array
     **/
    $in: (item, condition) => ensureArray(condition).some(
      (cond) => Array.isArray(item) ? match(item, { $contains: cond }) : match(item, cond)
    ),
    /**
     * Match if item contains every condition or match every rule in condition array
     **/
    $contains: (item, condition) => {
      item = Array.isArray(item) ? item : String(item);
      return ensureArray(condition).every((i) => item.includes(i));
    },
    /**
     * Ignore case contains
     **/
    $icontains: (item, condition) => {
      if (typeof condition !== "string") {
        throw new TypeError("$icontains requires a string, use $contains instead");
      }
      item = String(item).toLocaleLowerCase();
      return ensureArray(condition).every((i) => item.includes(i.toLocaleLowerCase()));
    },
    /**
     * Match if item contains at least one rule from condition array
     */
    $containsAny: (item, condition) => {
      assertArray(condition, "$containsAny requires an array as condition");
      item = Array.isArray(item) ? item : String(item);
      return condition.some((i) => item.includes(i));
    },
    /**
     * Check key existence
     */
    $exists: (item, condition) => condition ? typeof item !== "undefined" : typeof item === "undefined",
    /**
     * Match if type of item equals condition
     */
    $type: (item, condition) => typeof item === String(condition),
    /**
     * Provides regular expression capabilities for pattern matching strings.
     */
    $regex: (item, condition) => {
      if (!(condition instanceof RegExp)) {
        const matched = String(condition).match(/\/(.*)\/([dgimsuy]*)$/);
        condition = matched ? new RegExp(matched[1], matched[2] || "") : new RegExp(condition);
      }
      return condition.test(String(item || ""));
    },
    /**
     * Check if item is less than condition
     */
    $lt: (item, condition) => {
      return item < condition;
    },
    /**
     * Check if item is less than or equal to condition
     */
    $lte: (item, condition) => {
      return item <= condition;
    },
    /**
     * Check if item is greater than condition
     */
    $gt: (item, condition) => {
      return item > condition;
    },
    /**
     * Check if item is greater than or equal to condition
     */
    $gte: (item, condition) => {
      return item >= condition;
    },
    ...operators || {}
  };
}

function createPipelineFetcher(getContentsList) {
  const match = createMatch();
  const surround = (data, { query, before, after }) => {
    const matchQuery = typeof query === "string" ? { _path: query } : query;
    const index = data.findIndex((item) => match(item, matchQuery));
    before = before ?? 1;
    after = after ?? 1;
    const slice = new Array(before + after).fill(null, 0);
    return index === -1 ? slice : slice.map((_, i) => data[index - before + i + Number(i >= before)] || null);
  };
  const matchingPipelines = [
    // Conditions
    (state, params) => {
      const filtered = state.result.filter((item) => ensureArray(params.where).every((matchQuery) => match(item, matchQuery)));
      return {
        ...state,
        result: filtered,
        total: filtered.length
      };
    },
    // Sort data
    (state, params) => ensureArray(params.sort).forEach((options) => sortList(state.result, options)),
    function fetchSurround(state, params, db) {
      if (params.surround) {
        let _surround = surround(state.result?.length === 1 ? db : state.result, params.surround);
        _surround = apply(withoutKeys(params.without))(_surround);
        _surround = apply(withKeys(params.only))(_surround);
        state.surround = _surround;
      }
      return state;
    }
  ];
  const transformingPiples = [
    // Skip first items
    (state, params) => {
      if (params.skip) {
        return {
          ...state,
          result: state.result.slice(params.skip),
          skip: params.skip
        };
      }
    },
    // Pick first items
    (state, params) => {
      if (params.limit) {
        return {
          ...state,
          result: state.result.slice(0, params.limit),
          limit: params.limit
        };
      }
    },
    function fetchDirConfig(state, params, db) {
      if (params.dirConfig) {
        const path = state.result[0]?._path || params.where?.find((w) => w._path)?._path;
        if (typeof path === "string") {
          const dirConfig = db.find((item) => item._path === joinURL(path, "_dir"));
          if (dirConfig) {
            state.dirConfig = { _path: dirConfig._path, ...withoutKeys(["_"])(dirConfig) };
          }
        }
      }
      return state;
    },
    // Remove unwanted fields
    (state, params) => ({
      ...state,
      result: apply(withoutKeys(params.without))(state.result)
    }),
    // Select only wanted fields
    (state, params) => ({
      ...state,
      result: apply(withKeys(params.only))(state.result)
    })
  ];
  return async (query) => {
    const db = await getContentsList();
    const params = query.params();
    const result1 = {
      result: db,
      limit: 0,
      skip: 0,
      total: db.length
    };
    const matchedData = matchingPipelines.reduce(($data, pipe) => pipe($data, params, db) || $data, result1);
    if (params.count) {
      return {
        result: matchedData.result.length
      };
    }
    const result = transformingPiples.reduce(($data, pipe) => pipe($data, params, db) || $data, matchedData);
    if (params.first) {
      return {
        ...omit(["skip", "limit", "total"])(result),
        result: result.result[0]
      };
    }
    return result;
  };
}

const isPreview = (event) => {
  const previewToken = getQuery(event).previewToken || getCookie(event, "previewToken");
  return !!previewToken;
};
const getPreview = (event) => {
  const key = getQuery(event).previewToken || getCookie(event, "previewToken");
  return { key };
};

async function getContentIndex(event) {
  const defaultLocale = useRuntimeConfig().content.defaultLocale;
  let contentIndex = await cacheStorage.getItem("content-index.json");
  if (!contentIndex) {
    const data = await getContentsList(event);
    contentIndex = data.reduce((acc, item) => {
      acc[item._path] = acc[item._path] || [];
      if (item._locale === defaultLocale) {
        acc[item._path].unshift(item._id);
      } else {
        acc[item._path].push(item._id);
      }
      return acc;
    }, {});
    await cacheStorage.setItem("content-index.json", contentIndex);
  }
  return contentIndex;
}
async function getIndexedContentsList(event, query) {
  const params = query.params();
  const path = params?.where?.find((wh) => wh._path)?._path;
  if (!isPreview(event) && !params.surround && !params.dirConfig && (typeof path === "string" || path instanceof RegExp)) {
    const index = await getContentIndex(event);
    const keys = Object.keys(index).filter((key) => path.test ? path.test(key) : key === String(path)).flatMap((key) => index[key]);
    const keyChunks = [...chunksFromArray(keys, 10)];
    const contents = [];
    for await (const chunk of keyChunks) {
      const result = await Promise.all(chunk.map((key) => getContent(event, key)));
      contents.push(...result);
    }
    return contents;
  }
  return getContentsList(event);
}

const transformers = [];

const sourceStorage = prefixStorage(useStorage(), "content:source");
const cacheStorage = prefixStorage(useStorage(), "cache:content");
const cacheParsedStorage = prefixStorage(useStorage(), "cache:content:parsed");
const contentConfig = useRuntimeConfig().content;
const isIgnored = makeIgnored(contentConfig.ignores);
const invalidKeyCharacters = `'"?#/`.split("");
const contentIgnorePredicate = (key) => {
  if (key.startsWith("preview:") || isIgnored(key)) {
    return false;
  }
  if (invalidKeyCharacters.some((ik) => key.includes(ik))) {
    console.warn(`Ignoring [${key}]. File name should not contain any of the following characters: ${invalidKeyCharacters.join(", ")}`);
    return false;
  }
  return true;
};
const getContentsIds = async (event, prefix) => {
  let keys = [];
  {
    keys = await cacheParsedStorage.getKeys(prefix);
  }
  if (keys.length === 0) {
    keys = await sourceStorage.getKeys(prefix);
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewPrefix = `preview:${key}:${prefix || ""}`;
    const previewKeys = await sourceStorage.getKeys(previewPrefix);
    if (previewKeys.length) {
      const keysSet = new Set(keys);
      await Promise.all(
        previewKeys.map(async (key2) => {
          const meta = await sourceStorage.getMeta(key2);
          if (meta?.__deleted) {
            keysSet.delete(key2.substring(previewPrefix.length));
          } else {
            keysSet.add(key2.substring(previewPrefix.length));
          }
        })
      );
      keys = Array.from(keysSet);
    }
  }
  return keys.filter(contentIgnorePredicate);
};
function* chunksFromArray(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
const getContentsList = /* @__PURE__ */ (() => {
  let pendingContentsListPromise = null;
  const _getContentsList = async (event, prefix) => {
    const keys = await getContentsIds(event, prefix);
    const keyChunks = [...chunksFromArray(keys, 10)];
    const contents = [];
    for (const chunk of keyChunks) {
      const result = await Promise.all(chunk.map((key) => getContent(event, key)));
      contents.push(...result);
    }
    return contents;
  };
  return (event, prefix) => {
    if (event.context.__contentList) {
      return event.context.__contentList;
    }
    if (!pendingContentsListPromise) {
      pendingContentsListPromise = _getContentsList(event, prefix);
      pendingContentsListPromise.then((result) => {
        event.context.__contentList = result;
        pendingContentsListPromise = null;
      });
    }
    return pendingContentsListPromise;
  };
})();
const pendingPromises = {};
const getContent = async (event, id) => {
  const contentId = id;
  if (!contentIgnorePredicate(id)) {
    return { _id: contentId, body: null };
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewId = `preview:${key}:${id}`;
    const draft = await sourceStorage.getItem(previewId);
    if (draft) {
      id = previewId;
    }
  }
  const cached = await cacheParsedStorage.getItem(id);
  if (cached) {
    return cached.parsed;
  }
  const meta = await sourceStorage.getMeta(id);
  const mtime = meta.mtime;
  const size = meta.size || 0;
  const hash$1 = hash({
    // Last modified time
    mtime,
    // File size
    size,
    // Add Content version to the hash, to revalidate the cache on content update
    version: contentConfig.cacheVersion,
    integrity: contentConfig.cacheIntegrity
  });
  if (cached?.hash === hash$1) {
    return cached.parsed;
  }
  if (!pendingPromises[id + hash$1]) {
    pendingPromises[id + hash$1] = new Promise(async (resolve) => {
      const body = await sourceStorage.getItem(id);
      if (body === null) {
        return resolve({ _id: contentId, body: null });
      }
      const parsed = await parseContent(contentId, body);
      await cacheParsedStorage.setItem(id, { parsed, hash: hash$1 }).catch(() => {
      });
      resolve(parsed);
      delete pendingPromises[id + hash$1];
    });
  }
  return pendingPromises[id + hash$1];
};
const parseContent = async (id, content, opts = {}) => {
  const nitroApp = useNitroApp();
  const options = defu(
    opts,
    {
      markdown: {
        ...contentConfig.markdown,
        highlight: contentConfig.highlight
      },
      csv: contentConfig.csv,
      yaml: contentConfig.yaml,
      transformers: transformers,
      pathMeta: {
        defaultLocale: contentConfig.defaultLocale,
        locales: contentConfig.locales,
        respectPathCase: contentConfig.respectPathCase
      }
    }
  );
  const file = { _id: id, body: typeof content === "string" ? content.replace(/\r\n|\r/g, "\n") : content };
  await nitroApp.hooks.callHook("content:file:beforeParse", file);
  const result = await transformContent(id, file.body, options);
  await nitroApp.hooks.callHook("content:file:afterParse", result);
  return result;
};
const createServerQueryFetch = (event) => (query) => {
  return createPipelineFetcher(() => getIndexedContentsList(event, query))(query);
};
function serverQueryContent(event, query, ...pathParts) {
  const { advanceQuery } = useRuntimeConfig().public.content.experimental;
  const queryBuilder = advanceQuery ? createQuery(createServerQueryFetch(event), { initialParams: typeof query !== "string" ? query || {} : {}, legacy: false }) : createQuery(createServerQueryFetch(event), { initialParams: typeof query !== "string" ? query || {} : {}, legacy: true });
  let path;
  if (typeof query === "string") {
    path = withLeadingSlash(joinURL(query, ...pathParts));
  }
  const originalParamsFn = queryBuilder.params;
  queryBuilder.params = () => {
    const params = originalParamsFn();
    if (path) {
      params.where = params.where || [];
      if (params.first && (params.where || []).length === 0) {
        params.where.push({ _path: withoutTrailingSlash(path) });
      } else {
        params.where.push({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
      }
    }
    if (!params.sort?.length) {
      params.sort = [{ _file: 1, $numeric: true }];
    }
    if (contentConfig.locales.length) {
      const queryLocale = params.where?.find((w) => w._locale)?._locale;
      if (!queryLocale) {
        params.where = params.where || [];
        params.where.push({ _locale: contentConfig.defaultLocale });
      }
    }
    return params;
  };
  return queryBuilder;
}

function jsonParse(value) {
  return JSON.parse(value, regExpReviver);
}
function regExpReviver(_key, value) {
  const withOperator = typeof value === "string" && value.match(/^--([A-Z]+) (.+)$/) || [];
  if (withOperator[1] === "REGEX") {
    const regex = withOperator[2].match(/\/(.*)\/([dgimsuy]*)$/);
    return regex ? new RegExp(regex[1], regex[2] || "") : value;
  }
  return value;
}

const parseJSONQueryParams = (body) => {
  try {
    return jsonParse(body);
  } catch (e) {
    throw createError$1({ statusCode: 400, message: "Invalid _params query" });
  }
};
const decodeQueryParams = (encoded) => {
  encoded = encoded.replace(/\//g, "");
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  encoded = encoded.padEnd(encoded.length + (4 - encoded.length % 4) % 4, "=");
  return parseJSONQueryParams(typeof Buffer !== "undefined" ? Buffer.from(encoded, "base64").toString() : atob(encoded));
};
const memory = {};
const getContentQuery = (event) => {
  const { params } = event.context.params || {};
  if (params) {
    return decodeQueryParams(params.replace(/.json$/, ""));
  }
  const qid = event.context.params?.qid?.replace(/.json$/, "");
  const query = getQuery(event) || {};
  if (qid && query._params) {
    memory[qid] = parseJSONQueryParams(decodeURIComponent(query._params));
    if (memory[qid].where && !Array.isArray(memory[qid].where)) {
      memory[qid].where = [memory[qid].where];
    }
    return memory[qid];
  }
  if (qid && memory[qid]) {
    return memory[qid];
  }
  if (query._params) {
    return parseJSONQueryParams(decodeURIComponent(query._params));
  }
  if (typeof query.only === "string" && query.only.includes(",")) {
    query.only = query.only.split(",").map((s) => s.trim());
  }
  if (typeof query.without === "string" && query.without.includes(",")) {
    query.without = query.without.split(",").map((s) => s.trim());
  }
  const where = query.where || {};
  for (const key of ["draft", "partial", "empty"]) {
    if (query[key] && ["true", "false"].includes(query[key])) {
      where[key] = query[key] === "true";
      delete query[key];
    }
  }
  if (query.sort) {
    query.sort = String(query.sort).split(",").map((s) => {
      const [key, order] = s.split(":");
      return [key, +order];
    });
  }
  const reservedKeys = ["partial", "draft", "only", "without", "where", "sort", "limit", "skip"];
  for (const key of Object.keys(query)) {
    if (reservedKeys.includes(key)) {
      continue;
    }
    query.where = query.where || {};
    query.where[key] = query[key];
  }
  if (Object.keys(where).length > 0) {
    query.where = [where];
  } else {
    delete query.where;
  }
  return query;
};

const _ZXRMov = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  const { advanceQuery } = useRuntimeConfig().public.content.experimental;
  if (query.first) {
    let contentQuery = serverQueryContent(event, query);
    if (!advanceQuery) {
      contentQuery = contentQuery.withDirConfig();
    }
    const content = await contentQuery.findOne();
    const _result = advanceQuery ? content?.result : content;
    const missing = !_result && !content?.dirConfig?.navigation?.redirect && !content?._dir?.navigation?.redirect;
    if (missing) {
      throw createError$1({
        statusMessage: "Document not found!",
        statusCode: 404,
        data: {
          description: "Could not find document for the given query.",
          query
        }
      });
    }
    return content;
  }
  if (query.count) {
    return serverQueryContent(event, query).count();
  }
  return serverQueryContent(event, query).find();
});

const _p9hXkR = defineEventHandler(async (event) => {
  const { content } = useRuntimeConfig();
  const now = Date.now();
  const contents = await serverQueryContent(event).find();
  await getContentIndex(event);
  const navigation = await $fetch(`${content.api.baseURL}/navigation`);
  await cacheStorage.setItem("content-navigation.json", navigation);
  return {
    generatedAt: now,
    generateTime: Date.now() - now,
    contents: content.experimental.cacheContents ? contents : [],
    navigation
  };
});

function createNav(contents, configs) {
  const { navigation } = useRuntimeConfig().public.content;
  if (navigation === false) {
    return [];
  }
  const pickNavigationFields = (content) => ({
    ...pick(["title", ...navigation.fields])(content),
    ...isObject(content?.navigation) ? content.navigation : {}
  });
  const nav = contents.sort((a, b) => a._path.localeCompare(b._path)).reduce((nav2, content) => {
    const parts = content._path.substring(1).split("/");
    const idParts = content._id.split(":").slice(1);
    const isIndex = !!idParts[idParts.length - 1].match(/([1-9][0-9]*\.)?index.md/g);
    const getNavItem = (content2) => ({
      title: content2.title,
      _path: content2._path,
      _file: content2._file,
      children: [],
      ...pickNavigationFields(content2),
      ...content2._draft ? { _draft: true } : {}
    });
    const navItem = getNavItem(content);
    if (isIndex) {
      const dirConfig = configs[navItem._path];
      if (typeof dirConfig?.navigation !== "undefined" && !dirConfig?.navigation) {
        return nav2;
      }
      if (content._path !== "/") {
        const indexItem = getNavItem(content);
        navItem.children.push(indexItem);
      }
      Object.assign(
        navItem,
        pickNavigationFields(dirConfig)
      );
    }
    if (parts.length === 1) {
      nav2.push(navItem);
      return nav2;
    }
    const siblings = parts.slice(0, -1).reduce((nodes, part, i) => {
      const currentPathPart = "/" + parts.slice(0, i + 1).join("/");
      const conf = configs[currentPathPart];
      if (typeof conf?.navigation !== "undefined" && !conf.navigation) {
        return [];
      }
      let parent = nodes.find((n) => n._path === currentPathPart);
      if (!parent) {
        parent = {
          title: generateTitle(part),
          _path: currentPathPart,
          _file: content._file,
          children: [],
          ...pickNavigationFields(conf)
        };
        nodes.push(parent);
      }
      return parent.children;
    }, nav2);
    siblings.push(navItem);
    return nav2;
  }, []);
  return sortAndClear(nav);
}
const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function sortAndClear(nav) {
  nav.forEach((item) => {
    item._file = item._file.split(".").slice(0, -1).join(".");
  });
  const sorted = nav.sort((a, b) => collator.compare(a._file, b._file));
  for (const item of sorted) {
    if (item.children?.length) {
      sortAndClear(item.children);
    } else {
      delete item.children;
    }
    delete item._file;
  }
  return nav;
}
function pick(keys) {
  return (obj) => {
    obj = obj || {};
    if (keys && keys.length) {
      return keys.filter((key) => typeof obj[key] !== "undefined").reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
    }
    return obj;
  };
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

const _CJpbjT = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (!isPreview(event) && Object.keys(query).length === 0) {
    const cache = await cacheStorage.getItem("content-navigation.json");
    if (cache) {
      return cache;
    }
  }
  const contents = await serverQueryContent(event, query).where({
    /**
     * Partial contents are not included in the navigation
     * A partial content is a content that has `_` prefix in its path
     */
    _partial: false,
    /**
     * Exclude any pages which have opted out of navigation via frontmatter.
     */
    navigation: {
      $ne: false
    }
  }).find();
  const dirConfigs = await serverQueryContent(event).where({ _path: /\/_dir$/i, _partial: true }).find();
  const configs = (dirConfigs?.result || dirConfigs).reduce((configs2, conf) => {
    if (conf.title?.toLowerCase() === "dir") {
      conf.title = void 0;
    }
    const key = conf._path.split("/").slice(0, -1).join("/") || "/";
    configs2[key] = {
      ...conf,
      // Extract meta from body. (non MD files)
      ...conf.body
    };
    return configs2;
  }, {});
  return createNav(contents?.result || contents, configs);
});

const _lazy_YSIU9N = () => import('./routes/api/search.json.get.mjs');
const _lazy_bCPCLS = () => import('./routes/renderer.mjs');
const _lazy_SQkcaz = () => import('./_/og.png.mjs');
const _lazy_6bGjpg = () => import('./routes/api/html.mjs');
const _lazy_hPLZCu = () => import('./routes/api/options.mjs');
const _lazy_UgFrG6 = () => import('./routes/api/svg.mjs');
const _lazy_Fc6FvT = () => import('./routes/api/vnode.mjs');
const _lazy_ARJB0j = () => import('./routes/api/font.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/search.json', handler: _lazy_YSIU9N, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_bCPCLS, lazy: true, middleware: false, method: undefined },
  { route: '/api/_mdc/highlight', handler: _ss6av3, lazy: false, middleware: false, method: undefined },
  { route: '/__studio.json', handler: _tO16Fk, lazy: false, middleware: false, method: "get" },
  { route: '/api/component-meta', handler: _zXBWZy, lazy: false, middleware: false, method: "get" },
  { route: '/api/component-meta.json', handler: _zXBWZy, lazy: false, middleware: false, method: "get" },
  { route: '/api/component-meta/:component?', handler: _zXBWZy, lazy: false, middleware: false, method: "get" },
  { route: '', handler: _58d3RD, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _lazy_SQkcaz, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-html', handler: _lazy_6bGjpg, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-options', handler: _lazy_hPLZCu, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-svg', handler: _lazy_UgFrG6, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-vnode', handler: _lazy_Fc6FvT, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-font', handler: _lazy_ARJB0j, lazy: true, middleware: false, method: undefined },
  { route: '/api/_content/query/:qid/**:params', handler: _ZXRMov, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query/:qid', handler: _ZXRMov, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query', handler: _ZXRMov, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/cache.1712268118902.json', handler: _p9hXkR, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid/**:params', handler: _CJpbjT, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid', handler: _CJpbjT, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation', handler: _CJpbjT, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_bCPCLS, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch$1 as $, withoutBase as A, useStorage as B, prefixStorage as C, defu as D, join as E, cachedEventHandler as F, defuFn as G, klona as H, hasProtocol as I, withLeadingSlash as J, withTrailingSlash as K, splitByCase as L, upperFirst as M, parseQuery as N, isEqual as O, createHooks as P, parse$1 as Q, getRequestHeader as R, withQuery as S, isScriptProtocol as T, setCookie as U, getCookie as V, deleteCookie as W, sanitizeStatusCode as X, toRouteMatcher as Y, createRouter$1 as Z, withHttps as _, setResponseHeader as a, getRequestHost as a0, getRequestProtocol as a1, pascalCase as a2, kebabCase as a3, createStorage as a4, memoryDriver as a5, nodeServer as a6, mdcHighlighter as a7, send as b, setResponseStatus as c, setResponseHeaders as d, eventHandler as e, useRuntimeConfig as f, getResponseStatus as g, getQuery as h, createError$1 as i, joinURL as j, getRouteRules as k, hash as l, getResponseStatusText as m, destr as n, defineEventHandler as o, parseURL as p, sendRedirect as q, readBody as r, serverQueryContent as s, useNitroOrigin as t, useNitroApp as u, withoutLeadingSlash as v, withoutTrailingSlash as w, setHeader as x, withBase as y, createDefu as z };
//# sourceMappingURL=runtime.mjs.map
