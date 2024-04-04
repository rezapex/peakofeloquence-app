import { visit } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unist-util-visit/index.js';
import { toString } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hast-util-to-string/index.js';

function rehypeHighlight$1(opts) {
  const options = opts;
  return async (tree) => {
    const tasks = [];
    const styles = [];
    visit(
      tree,
      (node) => {
        var _a, _b;
        return ["pre", "code"].includes(node.tagName) && !!(((_a = node.properties) == null ? void 0 : _a.language) || ((_b = node.properties) == null ? void 0 : _b.highlights));
      },
      (node) => {
        const _node = node;
        const highlights = typeof _node.properties.highlights === "string" ? _node.properties.highlights.split(/[,\s]+/).map(Number) : Array.isArray(_node.properties.highlights) ? _node.properties.highlights.map(Number) : [];
        const task = options.highlighter(
          toString(node),
          _node.properties.language,
          options.theme,
          {
            highlights: highlights.filter(Boolean),
            meta: _node.properties.meta
          }
        ).then(({ tree: tree2, className, style, inlineStyle }) => {
          var _a;
          _node.properties.className = ((_node.properties.className || "") + " " + className).trim();
          _node.properties.style = ((_node.properties.style || "") + " " + inlineStyle).trim();
          if (((_a = _node.children[0]) == null ? void 0 : _a.tagName) === "code") {
            _node.children[0].children = tree2;
          } else {
            _node.children = tree2[0].children || tree2;
          }
          if (style)
            styles.push(style);
        });
        tasks.push(task);
      }
    );
    if (tasks.length) {
      await Promise.all(tasks);
      tree.children.push({
        type: "element",
        tagName: "style",
        children: [{ type: "text", value: cleanCSS(styles.join("")) }],
        properties: {}
      });
    }
  };
}
const cleanCSS = (css) => {
  const styles = css.split("}").filter((s) => Boolean(s.trim())).map((s) => s.trim() + "}");
  return Array.from(new Set(styles)).join("");
};
const defaults = {
  theme: {},
  async highlighter(code, lang, theme, options) {
    try {
      if (false)
        ;
      return await $fetch("/api/_mdc/highlight", {
        params: {
          code,
          lang,
          theme: JSON.stringify(theme),
          options: JSON.stringify(options)
        }
      });
    } catch (e) {
    }
    return Promise.resolve({ tree: [{ type: "text", value: code }], className: "", style: "" });
  }
};
function rehypeHighlight(opts = {}) {
  const options = { ...defaults, ...opts };
  if (typeof options.highlighter !== "function") {
    options.highlighter = defaults.highlighter;
  }
  return rehypeHighlight$1(options);
}
const remarkPlugins = {};
const rehypePlugins = {
  "highlight": { instance: rehypeHighlight, options: {} }
};
const highlight = { "theme": { "light": "material-theme-lighter", "default": "material-theme", "dark": "material-theme-palenight" } };

export { highlight, rehypePlugins, remarkPlugins };
//# sourceMappingURL=mdc-imports-D-rHrtv2.mjs.map
