import { _ as __nuxt_component_0 } from './Card-DfnufoHP.mjs';
import { O as useId, f as useSeoMeta, o as useUI, a3 as omit$1, i as __nuxt_component_0$6, j as __nuxt_component_1$2, l as __nuxt_component_0$4, a4 as __nuxt_component_4, a5 as __nuxt_component_5, k as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_2 } from './Divider-DH-kAsv2.mjs';
import { defineComponent, onUnmounted, ref, provide, useSSRContext, mergeProps, withCtx, createTextVNode, createVNode, computed, toRef, reactive, unref, createSlots, renderSlot, openBlock, createBlock, Fragment, renderList } from 'vue';
import { b as useEventBus } from './index-D1eMPiNF.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { twJoin } from 'tailwind-merge';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'shiki/core';
import '@shikijs/transformers';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'hast-util-to-string';
import 'github-slugger';
import 'detab';
import 'remark-emoji';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

class FormException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, FormException.prototype);
  }
}
const _sfc_main$2 = defineComponent({
  props: {
    schema: {
      type: Object,
      default: void 0
    },
    state: {
      type: Object,
      required: true
    },
    validate: {
      type: Function,
      default: () => []
    },
    validateOn: {
      type: Array,
      default: () => ["blur", "input", "change", "submit"]
    }
  },
  emits: ["submit", "error"],
  setup(props, { expose, emit }) {
    const formId = useId("$Z55GngiEgp");
    const bus = useEventBus(`form-${formId}`);
    onUnmounted(() => {
      bus.reset();
    });
    const errors = ref([]);
    provide("form-errors", errors);
    provide("form-events", bus);
    const inputs = ref({});
    provide("form-inputs", inputs);
    async function getErrors() {
      let errs = await props.validate(props.state);
      if (props.schema) {
        if (isZodSchema(props.schema)) {
          errs = errs.concat(await getZodErrors(props.state, props.schema));
        } else if (isYupSchema(props.schema)) {
          errs = errs.concat(await getYupErrors(props.state, props.schema));
        } else if (isJoiSchema(props.schema)) {
          errs = errs.concat(await getJoiErrors(props.state, props.schema));
        } else if (isValibotSchema(props.schema)) {
          errs = errs.concat(await getValibotError(props.state, props.schema));
        } else {
          throw new Error("Form validation failed: Unsupported form schema");
        }
      }
      return errs;
    }
    async function validate(path, opts = { silent: false }) {
      let paths = path;
      if (path && !Array.isArray(path)) {
        paths = [path];
      }
      if (paths) {
        const otherErrors = errors.value.filter(
          (error) => !paths.includes(error.path)
        );
        const pathErrors = (await getErrors()).filter(
          (error) => paths.includes(error.path)
        );
        errors.value = otherErrors.concat(pathErrors);
      } else {
        errors.value = await getErrors();
      }
      if (errors.value.length > 0) {
        if (opts.silent)
          return false;
        throw new FormException(
          `Form validation failed: ${JSON.stringify(errors.value, null, 2)}`
        );
      }
      return props.state;
    }
    async function onSubmit(payload) {
      var _a;
      const event = payload;
      try {
        if ((_a = props.validateOn) == null ? void 0 : _a.includes("submit")) {
          await validate();
        }
        const submitEvent = {
          ...event,
          data: props.state
        };
        emit("submit", submitEvent);
      } catch (error) {
        if (!(error instanceof FormException)) {
          throw error;
        }
        const errorEvent = {
          ...event,
          errors: errors.value.map((err) => ({
            ...err,
            id: inputs.value[err.path]
          }))
        };
        emit("error", errorEvent);
      }
    }
    expose({
      validate,
      errors,
      setErrors(errs, path) {
        errors.value = errs;
        if (path) {
          errors.value = errors.value.filter(
            (error) => error.path !== path
          ).concat(errs);
        } else {
          errors.value = errs;
        }
      },
      async submit() {
        await onSubmit(new Event("submit"));
      },
      getErrors(path) {
        if (path) {
          return errors.value.filter((err) => err.path === path);
        }
        return errors.value;
      },
      clear(path) {
        if (path) {
          errors.value = errors.value.filter((err) => err.path !== path);
        } else {
          errors.value = [];
        }
      }
    });
    return {
      onSubmit
    };
  }
});
function isYupSchema(schema) {
  return schema.validate && schema.__isYupSchema__;
}
function isYupError(error) {
  return error.inner !== void 0;
}
async function getYupErrors(state, schema) {
  try {
    await schema.validate(state, { abortEarly: false });
    return [];
  } catch (error) {
    if (isYupError(error)) {
      return error.inner.map((issue) => {
        var _a;
        return {
          path: (_a = issue.path) != null ? _a : "",
          message: issue.message
        };
      });
    } else {
      throw error;
    }
  }
}
function isZodSchema(schema) {
  return schema.parse !== void 0;
}
async function getZodErrors(state, schema) {
  const result = await schema.safeParseAsync(state);
  if (result.success === false) {
    return result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message
    }));
  }
  return [];
}
function isJoiSchema(schema) {
  return schema.validateAsync !== void 0 && schema.id !== void 0;
}
function isJoiError(error) {
  return error.isJoi === true;
}
async function getJoiErrors(state, schema) {
  try {
    await schema.validateAsync(state, { abortEarly: false });
    return [];
  } catch (error) {
    if (isJoiError(error)) {
      return error.details.map((detail) => ({
        path: detail.path.join("."),
        message: detail.message
      }));
    } else {
      throw error;
    }
  }
}
function isValibotSchema(schema) {
  return schema._parse !== void 0;
}
async function getValibotError(state, schema) {
  const result = await schema._parse(state);
  if (result.issues) {
    return result.issues.map((issue) => {
      var _a;
      return {
        path: ((_a = issue.path) == null ? void 0 : _a.map((p) => p.key).join(".")) || "",
        message: issue.message
      };
    });
  }
  return [];
}
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<form${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</form>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Form.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "AuthForm",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: void 0
    },
    description: {
      type: String,
      default: void 0
    },
    icon: {
      type: String,
      default: void 0
    },
    align: {
      type: String,
      default: "bottom"
    },
    loading: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array,
      default: () => []
    },
    providers: {
      type: Array,
      default: () => []
    },
    submitButton: {
      type: Object,
      default: () => ({})
    },
    schema: {
      type: Object,
      default: void 0
    },
    validate: {
      type: [Function, Array],
      default: void 0
    },
    validateOn: {
      type: Array,
      default: () => ["submit"]
    },
    divider: {
      type: String,
      default: "or"
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["submit"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    const config = computed(() => {
      const container = twJoin(
        "gap-y-6 flex flex-col",
        props.align === "top" && "flex-col-reverse"
      );
      return {
        wrapper: "w-full max-w-sm space-y-6",
        base: "",
        container,
        title: "text-2xl text-gray-900 dark:text-white font-bold",
        description: "text-gray-500 dark:text-gray-400 mt-1",
        icon: {
          wrapper: "mb-2 pointer-events-none",
          base: "w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"
        },
        providers: "space-y-3",
        form: "space-y-6",
        footer: "text-sm text-gray-500 dark:text-gray-400 mt-2",
        default: {
          submitButton: {
            label: "Continue"
          }
        }
      };
    });
    const formRef = ref();
    const { ui, attrs } = useUI("auth.form", toRef(props, "ui"), config, toRef(props, "class"), true);
    const state = reactive(Object.values(props.fields).reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {}));
    __expose({
      formRef,
      state
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_UButton = __nuxt_component_0$4;
      const _component_UDivider = __nuxt_component_2;
      const _component_UForm = __nuxt_component_3;
      const _component_UFormGroup = __nuxt_component_4;
      const _component_UInput = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      if (__props.icon || _ctx.$slots.icon || (__props.title || _ctx.$slots.title) || (__props.description || _ctx.$slots.description)) {
        _push(`<div class="${ssrRenderClass(unref(ui).base)}">`);
        if (__props.icon || _ctx.$slots.icon) {
          _push(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}">`);
          ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
            _push(ssrRenderComponent(_component_UIcon, {
              name: __props.icon,
              class: unref(ui).icon.base
            }, null, _parent));
          }, _push, _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.title || _ctx.$slots.title) {
          _push(`<p class="${ssrRenderClass(unref(ui).title)}">`);
          ssrRenderSlot(_ctx.$slots, "title", {}, () => {
            _push(`${ssrInterpolate(__props.title)}`);
          }, _push, _parent);
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.description || _ctx.$slots.description) {
          _push(`<p class="${ssrRenderClass(unref(ui).description)}">`);
          ssrRenderSlot(_ctx.$slots, "description", {}, () => {
            _push(`${ssrInterpolate(__props.description)}`);
          }, _push, _parent);
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(unref(ui).container)}">`);
      if ((_a = __props.providers) == null ? void 0 : _a.length) {
        _push(`<div class="${ssrRenderClass(unref(ui).providers)}"><!--[-->`);
        ssrRenderList(__props.providers, (provider, index) => {
          _push(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, provider, {
            block: "",
            onClick: provider.click
          }), null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_b = __props.providers) == null ? void 0 : _b.length) && ((_c = __props.fields) == null ? void 0 : _c.length)) {
        _push(ssrRenderComponent(_component_UDivider, { label: __props.divider }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_d = __props.fields) == null ? void 0 : _d.length) {
        _push(ssrRenderComponent(_component_UForm, {
          ref_key: "formRef",
          ref: formRef,
          state: unref(state),
          schema: __props.schema,
          validate: __props.validate,
          "validate-on": __props.validateOn,
          class: unref(ui).form,
          onSubmit: ($event) => _ctx.$emit("submit", $event.data)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.fields, (field) => {
                _push2(ssrRenderComponent(_component_UFormGroup, {
                  key: field.name,
                  label: field.label,
                  description: field.description,
                  help: field.help,
                  hint: field.hint,
                  name: field.name,
                  size: field.size
                }, createSlots({
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UInput, mergeProps({
                        modelValue: unref(state)[field.name],
                        "onUpdate:modelValue": ($event) => unref(state)[field.name] = $event
                      }, unref(omit$1)(field, ["label", "description", "help", "hint", "size"])), null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UInput, mergeProps({
                          modelValue: unref(state)[field.name],
                          "onUpdate:modelValue": ($event) => unref(state)[field.name] = $event
                        }, unref(omit$1)(field, ["label", "description", "help", "hint", "size"])), null, 16, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 2
                }, [
                  _ctx.$slots[`${field.name}-label`] ? {
                    name: "label",
                    fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        ssrRenderSlot(_ctx.$slots, `${field.name}-label`, {}, null, _push3, _parent3, _scopeId2);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, `${field.name}-label`)
                        ];
                      }
                    }),
                    key: "0"
                  } : void 0,
                  _ctx.$slots[`${field.name}-description`] ? {
                    name: "description",
                    fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        ssrRenderSlot(_ctx.$slots, `${field.name}-description`, {}, null, _push3, _parent3, _scopeId2);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, `${field.name}-description`)
                        ];
                      }
                    }),
                    key: "1"
                  } : void 0,
                  _ctx.$slots[`${field.name}-hint`] ? {
                    name: "hint",
                    fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        ssrRenderSlot(_ctx.$slots, `${field.name}-hint`, {}, null, _push3, _parent3, _scopeId2);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, `${field.name}-hint`)
                        ];
                      }
                    }),
                    key: "2"
                  } : void 0,
                  _ctx.$slots[`${field.name}-help`] ? {
                    name: "help",
                    fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        ssrRenderSlot(_ctx.$slots, `${field.name}-help`, {}, null, _push3, _parent3, _scopeId2);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, `${field.name}-help`)
                        ];
                      }
                    }),
                    key: "3"
                  } : void 0
                ]), _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              ssrRenderSlot(_ctx.$slots, "validation", {}, null, _push2, _parent2, _scopeId);
              _push2(ssrRenderComponent(_component_UButton, mergeProps({
                type: "submit",
                block: "",
                loading: __props.loading
              }, { ...unref(ui).default.submitButton, ...__props.submitButton }), null, _parent2, _scopeId));
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.fields, (field) => {
                  return openBlock(), createBlock(_component_UFormGroup, {
                    key: field.name,
                    label: field.label,
                    description: field.description,
                    help: field.help,
                    hint: field.hint,
                    name: field.name,
                    size: field.size
                  }, createSlots({
                    default: withCtx(() => [
                      createVNode(_component_UInput, mergeProps({
                        modelValue: unref(state)[field.name],
                        "onUpdate:modelValue": ($event) => unref(state)[field.name] = $event
                      }, unref(omit$1)(field, ["label", "description", "help", "hint", "size"])), null, 16, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, [
                    _ctx.$slots[`${field.name}-label`] ? {
                      name: "label",
                      fn: withCtx(() => [
                        renderSlot(_ctx.$slots, `${field.name}-label`)
                      ]),
                      key: "0"
                    } : void 0,
                    _ctx.$slots[`${field.name}-description`] ? {
                      name: "description",
                      fn: withCtx(() => [
                        renderSlot(_ctx.$slots, `${field.name}-description`)
                      ]),
                      key: "1"
                    } : void 0,
                    _ctx.$slots[`${field.name}-hint`] ? {
                      name: "hint",
                      fn: withCtx(() => [
                        renderSlot(_ctx.$slots, `${field.name}-hint`)
                      ]),
                      key: "2"
                    } : void 0,
                    _ctx.$slots[`${field.name}-help`] ? {
                      name: "help",
                      fn: withCtx(() => [
                        renderSlot(_ctx.$slots, `${field.name}-help`)
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1032, ["label", "description", "help", "hint", "name", "size"]);
                }), 128)),
                renderSlot(_ctx.$slots, "validation"),
                createVNode(_component_UButton, mergeProps({
                  type: "submit",
                  block: "",
                  loading: __props.loading
                }, { ...unref(ui).default.submitButton, ...__props.submitButton }), null, 16, ["loading"])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (_ctx.$slots.footer) {
        _push(`<p class="${ssrRenderClass(unref(ui).footer)}">`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/auth/AuthForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Sign up"
    });
    const fields = [{
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter your name"
    }, {
      name: "email",
      type: "text",
      label: "Email",
      placeholder: "Enter your email"
    }, {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password"
    }];
    const validate = (state) => {
      const errors = [];
      if (!state.email)
        errors.push({ path: "email", message: "Email is required" });
      if (!state.password)
        errors.push({ path: "password", message: "Password is required" });
      return errors;
    };
    const providers = [{
      label: "Continue with GitHub",
      icon: "i-simple-icons-github",
      color: "gray",
      click: () => {
        console.log("Redirect to GitHub");
      }
    }];
    function onSubmit(data) {
      console.log("Submitted", data);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_UAuthForm = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$6;
      _push(ssrRenderComponent(_component_UCard, mergeProps({ class: "max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UAuthForm, {
              fields,
              validate,
              providers,
              align: "top",
              title: "Create an account",
              ui: { base: "text-center", footer: "text-center" },
              "submit-button": { label: "Create account" },
              onSubmit
            }, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Already have an account? `);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/login",
                    class: "text-primary font-medium"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Login`);
                      } else {
                        return [
                          createTextVNode("Login")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`. `);
                } else {
                  return [
                    createTextVNode(" Already have an account? "),
                    createVNode(_component_NuxtLink, {
                      to: "/login",
                      class: "text-primary font-medium"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Login")
                      ]),
                      _: 1
                    }),
                    createTextVNode(". ")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` By signing up, you agree to our `);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/",
                    class: "text-primary font-medium"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terms of Service`);
                      } else {
                        return [
                          createTextVNode("Terms of Service")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`. `);
                } else {
                  return [
                    createTextVNode(" By signing up, you agree to our "),
                    createVNode(_component_NuxtLink, {
                      to: "/",
                      class: "text-primary font-medium"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Terms of Service")
                      ]),
                      _: 1
                    }),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UAuthForm, {
                fields,
                validate,
                providers,
                align: "top",
                title: "Create an account",
                ui: { base: "text-center", footer: "text-center" },
                "submit-button": { label: "Create account" },
                onSubmit
              }, {
                description: withCtx(() => [
                  createTextVNode(" Already have an account? "),
                  createVNode(_component_NuxtLink, {
                    to: "/login",
                    class: "text-primary font-medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Login")
                    ]),
                    _: 1
                  }),
                  createTextVNode(". ")
                ]),
                footer: withCtx(() => [
                  createTextVNode(" By signing up, you agree to our "),
                  createVNode(_component_NuxtLink, {
                    to: "/",
                    class: "text-primary font-medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Terms of Service")
                    ]),
                    _: 1
                  }),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signup-BABlHigC.mjs.map
