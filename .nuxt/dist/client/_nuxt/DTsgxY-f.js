import{l as G,d as C,ae as Y,o as q,a as D,r as B,Q as U,b as c,c as h,ai as v,bg as L,bm as M,D as Z,as as H,ao as T,ap as z,N as Q,n as g,E as u,g as S,f as k,j as E,t as I,e as K,F as P,ag as R,ah as _,aj as A,w as p,av as W,bn as X,ab as ee,an as te,bo as ae,bp as ne,aR as se,b1 as oe}from"./9BiHR6_y.js";import{_ as re}from"./B6IRR5mu.js";import{_ as ie}from"./Do9wRA3Z.js";class O extends Error{constructor(r){super(r),this.message=r,Object.setPrototypeOf(this,O.prototype)}}const le=C({props:{schema:{type:Object,default:void 0},state:{type:Object,required:!0},validate:{type:Function,default:()=>[]},validateOn:{type:Array,default:()=>["blur","input","change","submit"]}},emits:["submit","error"],setup(e,{expose:r,emit:s}){const i=Y("$Z55GngiEgp"),m=M(`form-${i}`);q(()=>{m.on(async a=>{var l;a.type!=="submit"&&((l=e.validateOn)!=null&&l.includes(a.type))&&await n(a.path,{silent:!0})})}),D(()=>{m.reset()});const t=B([]);U("form-errors",t),U("form-events",m);const d=B({});U("form-inputs",d);async function y(){let a=await e.validate(e.state);if(e.schema)if(de(e.schema))a=a.concat(await fe(e.state,e.schema));else if(ue(e.schema))a=a.concat(await me(e.state,e.schema));else if(pe(e.schema))a=a.concat(await he(e.state,e.schema));else if(ve(e.schema))a=a.concat(await be(e.state,e.schema));else throw new Error("Form validation failed: Unsupported form schema");return a}async function n(a,l={silent:!1}){let f=a;if(a&&!Array.isArray(a)&&(f=[a]),f){const w=t.value.filter($=>!f.includes($.path)),x=(await y()).filter($=>f.includes($.path));t.value=w.concat(x)}else t.value=await y();if(t.value.length>0){if(l.silent)return!1;throw new O(`Form validation failed: ${JSON.stringify(t.value,null,2)}`)}return e.state}async function b(a){var f;const l=a;try{(f=e.validateOn)!=null&&f.includes("submit")&&await n();const w={...l,data:e.state};s("submit",w)}catch(w){if(!(w instanceof O))throw w;const x={...l,errors:t.value.map($=>({...$,id:d.value[$.path]}))};s("error",x)}}return r({validate:n,errors:t,setErrors(a,l){t.value=a,l?t.value=t.value.filter(f=>f.path!==l).concat(a):t.value=a},async submit(){await b(new Event("submit"))},getErrors(a){return a?t.value.filter(l=>l.path===a):t.value},clear(a){a?t.value=t.value.filter(l=>l.path!==a):t.value=[]}}),{onSubmit:b}}});function ue(e){return e.validate&&e.__isYupSchema__}function ce(e){return e.inner!==void 0}async function me(e,r){try{return await r.validate(e,{abortEarly:!1}),[]}catch(s){if(ce(s))return s.inner.map(i=>({path:i.path??"",message:i.message}));throw s}}function de(e){return e.parse!==void 0}async function fe(e,r){const s=await r.safeParseAsync(e);return s.success===!1?s.error.issues.map(i=>({path:i.path.join("."),message:i.message})):[]}function pe(e){return e.validateAsync!==void 0&&e.id!==void 0}function ye(e){return e.isJoi===!0}async function he(e,r){try{return await r.validateAsync(e,{abortEarly:!1}),[]}catch(s){if(ye(s))return s.details.map(i=>({path:i.path.join("."),message:i.message}));throw s}}function ve(e){return e._parse!==void 0}async function be(e,r){const s=await r._parse(e);return s.issues?s.issues.map(i=>{var m;return{path:((m=i.path)==null?void 0:m.map(t=>t.key).join("."))||"",message:i.message}}):[]}function ge(e,r,s,i,m,t){return c(),h("form",{onSubmit:r[0]||(r[0]=L((...d)=>e.onSubmit&&e.onSubmit(...d),["prevent"]))},[v(e.$slots,"default")],32)}const we=G(le,[["render",ge]]),$e=C({inheritAttrs:!1,__name:"AuthForm",props:{title:{type:String,default:void 0},description:{type:String,default:void 0},icon:{type:String,default:void 0},align:{type:String,default:"bottom"},loading:{type:Boolean,default:!1},fields:{type:Array,default:()=>[]},providers:{type:Array,default:()=>[]},submitButton:{type:Object,default:()=>({})},schema:{type:Object,default:void 0},validate:{type:[Function,Array],default:void 0},validateOn:{type:Array,default:()=>["submit"]},divider:{type:String,default:"or"},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},emits:["submit"],setup(e,{expose:r}){const s=e,i=Z(()=>({wrapper:"w-full max-w-sm space-y-6",base:"",container:H("gap-y-6 flex flex-col",s.align==="top"&&"flex-col-reverse"),title:"text-2xl text-gray-900 dark:text-white font-bold",description:"text-gray-500 dark:text-gray-400 mt-1",icon:{wrapper:"mb-2 pointer-events-none",base:"w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"},providers:"space-y-3",form:"space-y-6",footer:"text-sm text-gray-500 dark:text-gray-400 mt-2",default:{submitButton:{label:"Continue"}}})),m=B(),{ui:t,attrs:d}=T("auth.form",z(s,"ui"),i,z(s,"class"),!0),y=Q(Object.values(s.fields).reduce((n,{name:b,value:a})=>(n[b]=a,n),{}));return r({formRef:m,state:y}),(n,b)=>{var F,V,N,J;const a=ee,l=te,f=re,w=ae,x=ne,$=we;return c(),h("div",A({class:u(t).wrapper},u(d)),[e.icon||n.$slots.icon||e.title||n.$slots.title||e.description||n.$slots.description?(c(),h("div",{key:0,class:g(u(t).base)},[e.icon||n.$slots.icon?(c(),h("div",{key:0,class:g(u(t).icon.wrapper)},[v(n.$slots,"icon",{},()=>[S(a,{name:e.icon,class:g(u(t).icon.base)},null,8,["name","class"])])],2)):k("",!0),e.title||n.$slots.title?(c(),h("p",{key:1,class:g(u(t).title)},[v(n.$slots,"title",{},()=>[E(I(e.title),1)])],2)):k("",!0),e.description||n.$slots.description?(c(),h("p",{key:2,class:g(u(t).description)},[v(n.$slots,"description",{},()=>[E(I(e.description),1)])],2)):k("",!0)],2)):k("",!0),K("div",{class:g(u(t).container)},[(F=e.providers)!=null&&F.length?(c(),h("div",{key:0,class:g(u(t).providers)},[(c(!0),h(P,null,R(e.providers,(o,j)=>(c(),_(l,A({key:j},o,{block:"",onClick:o.click}),null,16,["onClick"]))),128))],2)):k("",!0),(V=e.providers)!=null&&V.length&&((N=e.fields)!=null&&N.length)?(c(),_(f,{key:1,label:e.divider},null,8,["label"])):k("",!0),(J=e.fields)!=null&&J.length?(c(),_($,{key:2,ref_key:"formRef",ref:m,state:u(y),schema:e.schema,validate:e.validate,"validate-on":e.validateOn,class:g(u(t).form),onSubmit:b[0]||(b[0]=o=>n.$emit("submit",o.data))},{default:p(()=>[(c(!0),h(P,null,R(e.fields,o=>(c(),_(x,{key:o.name,label:o.label,description:o.description,help:o.help,hint:o.hint,name:o.name,size:o.size},W({default:p(()=>[S(w,A({modelValue:u(y)[o.name],"onUpdate:modelValue":j=>u(y)[o.name]=j},u(X)(o,["label","description","help","hint","size"])),null,16,["modelValue","onUpdate:modelValue"])]),_:2},[n.$slots[`${o.name}-label`]?{name:"label",fn:p(()=>[v(n.$slots,`${o.name}-label`)]),key:"0"}:void 0,n.$slots[`${o.name}-description`]?{name:"description",fn:p(()=>[v(n.$slots,`${o.name}-description`)]),key:"1"}:void 0,n.$slots[`${o.name}-hint`]?{name:"hint",fn:p(()=>[v(n.$slots,`${o.name}-hint`)]),key:"2"}:void 0,n.$slots[`${o.name}-help`]?{name:"help",fn:p(()=>[v(n.$slots,`${o.name}-help`)]),key:"3"}:void 0]),1032,["label","description","help","hint","name","size"]))),128)),v(n.$slots,"validation"),S(l,A({type:"submit",block:"",loading:e.loading},{...u(t).default.submitButton,...e.submitButton}),null,16,["loading"])]),_:3},8,["state","schema","validate","validate-on","class"])):k("",!0)],2),n.$slots.footer?(c(),h("p",{key:1,class:g(u(t).footer)},[v(n.$slots,"footer")],2)):k("",!0)],16)}}}),xe=C({__name:"signup",setup(e){se({title:"Sign up"});const r=[{name:"name",type:"text",label:"Name",placeholder:"Enter your name"},{name:"email",type:"text",label:"Email",placeholder:"Enter your email"},{name:"password",label:"Password",type:"password",placeholder:"Enter your password"}],s=t=>{const d=[];return t.email||d.push({path:"email",message:"Email is required"}),t.password||d.push({path:"password",message:"Password is required"}),d},i=[{label:"Continue with GitHub",icon:"i-simple-icons-github",color:"gray",click:()=>{console.log("Redirect to GitHub")}}];function m(t){console.log("Submitted",t)}return(t,d)=>{const y=oe,n=$e,b=ie;return c(),_(b,{class:"max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur"},{default:p(()=>[S(n,{fields:r,validate:s,providers:i,align:"top",title:"Create an account",ui:{base:"text-center",footer:"text-center"},"submit-button":{label:"Create account"},onSubmit:m},{description:p(()=>[E(" Already have an account? "),S(y,{to:"/login",class:"text-primary font-medium"},{default:p(()=>[E("Login")]),_:1}),E(". ")]),footer:p(()=>[E(" By signing up, you agree to our "),S(y,{to:"/",class:"text-primary font-medium"},{default:p(()=>[E("Terms of Service")]),_:1}),E(". ")]),_:1})]),_:1})}}});export{xe as default};
