import{r as E,aU as D,d as Q,G as h,aV as ze,aW as Z,B as z,aX as Te,aY as He,aZ as Ne,a_ as ne,a$ as We,b0 as ie,o as oe,D as me,av as $e,b1 as Ge,b2 as Je,b3 as Ye,b4 as Qe,b5 as de,b6 as Ze,F as ue,b7 as ge,b8 as Ke,b9 as Xe,ba as we,a as Ae,bb as xe,bc as X,af as _e,bd as et,be as L,l as ye,R as he,S as W,V as re,W as x,bf as Ve,K as Oe,at as Le,Z as K,b as f,c as k,e as U,$ as tt,bg as at,P as T,n as m,O as A,j as H,t as J,f as V,bh as lt,bi as nt,H as ke,I as Be,X as it,bj as ot,bk as ut,Y as rt,bl as st,bm as dt,J as ct,L as pt,N as R,w as B,bn as _,g as Y,T as vt,M as be,Q as ft,aO as bt,bo as mt,bp as gt,aa as C,a1 as yt,bq as ae,U as ht,br as Ot,bs as kt,am as St,aA as $t}from"./DQgX5MGc.js";import{_ as wt}from"./DksAcULI.js";import{f as Ct,c as j,a as Mt,l as It,n as At,u as Vt,r as Lt,i as Bt}from"./i_yIaq72.js";import{_ as Et}from"./9eC0oxxo.js";const Rt={wrapper:"relative flex items-start",container:"flex items-center h-5",base:"h-4 w-4 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent",form:"form-checkbox",rounded:"rounded",color:"text-{color}-500 dark:text-{color}-400",background:"bg-white dark:bg-gray-900",border:"border border-gray-300 dark:border-gray-700",ring:"focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",inner:"ms-3 flex flex-col",label:"text-sm font-medium text-gray-700 dark:text-gray-200",required:"text-sm text-red-500 dark:text-red-400",help:"text-sm text-gray-500 dark:text-gray-400",default:{color:"primary"}};let Ce=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function Me(e){var s,d;let o=(s=e.innerText)!=null?s:"",p=e.cloneNode(!0);if(!(p instanceof HTMLElement))return o;let a=!1;for(let b of p.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))b.remove(),a=!0;let t=a?(d=p.innerText)!=null?d:"":o;return Ce.test(t)&&(t=t.replace(Ce,"")),t}function Dt(e){let s=e.getAttribute("aria-label");if(typeof s=="string")return s.trim();let d=e.getAttribute("aria-labelledby");if(d){let o=d.split(" ").map(p=>{let a=document.getElementById(p);if(a){let t=a.getAttribute("aria-label");return typeof t=="string"?t.trim():Me(a).trim()}return null}).filter(Boolean);if(o.length>0)return o.join(", ")}return Me(e).trim()}function jt(e){let s=E(""),d=E("");return()=>{let o=D(e);if(!o)return"";let p=o.innerText;if(s.value===p)return d.value;let a=Dt(o).trim().toLowerCase();return s.value=p,d.value=a,a}}function Ft(e,s){return e===s}var Pt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Pt||{}),Ut=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(Ut||{}),qt=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(qt||{});function zt(e){requestAnimationFrame(()=>requestAnimationFrame(e))}let Ee=Symbol("ListboxContext");function ce(e){let s=_e(Ee,null);if(s===null){let d=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(d,ce),d}return s}let Tt=Q({name:"Listbox",emits:{"update:modelValue":e=>!0},props:{as:{type:[Object,String],default:"template"},disabled:{type:[Boolean],default:!1},by:{type:[String,Function],default:()=>Ft},horizontal:{type:[Boolean],default:!1},modelValue:{type:[Object,String,Number,Boolean],default:void 0},defaultValue:{type:[Object,String,Number,Boolean],default:void 0},form:{type:String,optional:!0},name:{type:String,optional:!0},multiple:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(e,{slots:s,attrs:d,emit:o}){let p=E(1),a=E(null),t=E(null),b=E(null),c=E([]),g=E(""),r=E(null),n=E(1);function i(l=v=>v){let v=r.value!==null?c.value[r.value]:null,y=et(l(c.value.slice()),$=>D($.dataRef.domRef)),u=v?y.indexOf(v):null;return u===-1&&(u=null),{options:y,activeOptionIndex:u}}let w=h(()=>e.multiple?1:0),[O,S]=ze(h(()=>e.modelValue),l=>o("update:modelValue",l),h(()=>e.defaultValue)),F=h(()=>O.value===void 0?Z(w.value,{1:[],0:void 0}):O.value),I={listboxState:p,value:F,mode:w,compare(l,v){if(typeof e.by=="string"){let y=e.by;return(l==null?void 0:l[y])===(v==null?void 0:v[y])}return e.by(l,v)},orientation:h(()=>e.horizontal?"horizontal":"vertical"),labelRef:a,buttonRef:t,optionsRef:b,disabled:h(()=>e.disabled),options:c,searchQuery:g,activeOptionIndex:r,activationTrigger:n,closeListbox(){e.disabled||p.value!==1&&(p.value=1,r.value=null)},openListbox(){e.disabled||p.value!==0&&(p.value=0)},goToOption(l,v,y){if(e.disabled||p.value===1)return;let u=i(),$=Ct(l===j.Specific?{focus:j.Specific,id:v}:{focus:l},{resolveItems:()=>u.options,resolveActiveIndex:()=>u.activeOptionIndex,resolveId:G=>G.id,resolveDisabled:G=>G.dataRef.disabled});g.value="",r.value=$,n.value=y??1,c.value=u.options},search(l){if(e.disabled||p.value===1)return;let v=g.value!==""?0:1;g.value+=l.toLowerCase();let y=(r.value!==null?c.value.slice(r.value+v).concat(c.value.slice(0,r.value+v)):c.value).find($=>$.dataRef.textValue.startsWith(g.value)&&!$.dataRef.disabled),u=y?c.value.indexOf(y):-1;u===-1||u===r.value||(r.value=u,n.value=1)},clearSearch(){e.disabled||p.value!==1&&g.value!==""&&(g.value="")},registerOption(l,v){let y=i(u=>[...u,{id:l,dataRef:v}]);c.value=y.options,r.value=y.activeOptionIndex},unregisterOption(l){let v=i(y=>{let u=y.findIndex($=>$.id===l);return u!==-1&&y.splice(u,1),y});c.value=v.options,r.value=v.activeOptionIndex,n.value=1},theirOnChange(l){e.disabled||S(l)},select(l){e.disabled||S(Z(w.value,{0:()=>l,1:()=>{let v=z(I.value.value).slice(),y=z(l),u=v.findIndex($=>I.compare(y,z($)));return u===-1?v.push(y):v.splice(u,1),v}}))}};Te([t,b],(l,v)=>{var y;I.closeListbox(),He(v,Ne.Loose)||(l.preventDefault(),(y=D(t))==null||y.focus())},h(()=>p.value===0)),ne(Ee,I),We(h(()=>Z(p.value,{0:ie.Open,1:ie.Closed})));let P=h(()=>{var l;return(l=D(t))==null?void 0:l.closest("form")});return oe(()=>{me([P],()=>{if(!P.value||e.defaultValue===void 0)return;function l(){I.theirOnChange(e.defaultValue)}return P.value.addEventListener("reset",l),()=>{var v;(v=P.value)==null||v.removeEventListener("reset",l)}},{immediate:!0})}),()=>{let{name:l,modelValue:v,disabled:y,form:u,...$}=e,G={open:p.value===0,disabled:y,value:F.value};return $e(ue,[...l!=null&&F.value!=null?Ge({[l]:F.value}).map(([ee,pe])=>$e(Je,Ye({features:Qe.Hidden,key:ee,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:u,disabled:y,name:ee,value:pe}))):[],de({ourProps:{},theirProps:{...d,...Ze($,["defaultValue","onUpdate:modelValue","horizontal","multiple","by"])},slot:G,slots:s,attrs:d,name:"Listbox"})])}}}),Ht=Q({name:"ListboxButton",props:{as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(e,{attrs:s,slots:d,expose:o}){var p;let a=(p=e.id)!=null?p:`headlessui-listbox-button-${ge()}`,t=ce("ListboxButton");o({el:t.buttonRef,$el:t.buttonRef});function b(n){switch(n.key){case L.Space:case L.Enter:case L.ArrowDown:n.preventDefault(),t.openListbox(),X(()=>{var i;(i=D(t.optionsRef))==null||i.focus({preventScroll:!0}),t.value.value||t.goToOption(j.First)});break;case L.ArrowUp:n.preventDefault(),t.openListbox(),X(()=>{var i;(i=D(t.optionsRef))==null||i.focus({preventScroll:!0}),t.value.value||t.goToOption(j.Last)});break}}function c(n){switch(n.key){case L.Space:n.preventDefault();break}}function g(n){t.disabled.value||(t.listboxState.value===0?(t.closeListbox(),X(()=>{var i;return(i=D(t.buttonRef))==null?void 0:i.focus({preventScroll:!0})})):(n.preventDefault(),t.openListbox(),zt(()=>{var i;return(i=D(t.optionsRef))==null?void 0:i.focus({preventScroll:!0})})))}let r=Ke(h(()=>({as:e.as,type:s.type})),t.buttonRef);return()=>{var n,i;let w={open:t.listboxState.value===0,disabled:t.disabled.value,value:t.value.value},{...O}=e,S={ref:t.buttonRef,id:a,type:r.value,"aria-haspopup":"listbox","aria-controls":(n=D(t.optionsRef))==null?void 0:n.id,"aria-expanded":t.listboxState.value===0,"aria-labelledby":t.labelRef.value?[(i=D(t.labelRef))==null?void 0:i.id,a].join(" "):void 0,disabled:t.disabled.value===!0?!0:void 0,onKeydown:b,onKeyup:c,onClick:g};return de({ourProps:S,theirProps:O,slot:w,attrs:s,slots:d,name:"ListboxButton"})}}}),Nt=Q({name:"ListboxOptions",props:{as:{type:[Object,String],default:"ul"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(e,{attrs:s,slots:d,expose:o}){var p;let a=(p=e.id)!=null?p:`headlessui-listbox-options-${ge()}`,t=ce("ListboxOptions"),b=E(null);o({el:t.optionsRef,$el:t.optionsRef});function c(n){switch(b.value&&clearTimeout(b.value),n.key){case L.Space:if(t.searchQuery.value!=="")return n.preventDefault(),n.stopPropagation(),t.search(n.key);case L.Enter:if(n.preventDefault(),n.stopPropagation(),t.activeOptionIndex.value!==null){let i=t.options.value[t.activeOptionIndex.value];t.select(i.dataRef.value)}t.mode.value===0&&(t.closeListbox(),X(()=>{var i;return(i=D(t.buttonRef))==null?void 0:i.focus({preventScroll:!0})}));break;case Z(t.orientation.value,{vertical:L.ArrowDown,horizontal:L.ArrowRight}):return n.preventDefault(),n.stopPropagation(),t.goToOption(j.Next);case Z(t.orientation.value,{vertical:L.ArrowUp,horizontal:L.ArrowLeft}):return n.preventDefault(),n.stopPropagation(),t.goToOption(j.Previous);case L.Home:case L.PageUp:return n.preventDefault(),n.stopPropagation(),t.goToOption(j.First);case L.End:case L.PageDown:return n.preventDefault(),n.stopPropagation(),t.goToOption(j.Last);case L.Escape:n.preventDefault(),n.stopPropagation(),t.closeListbox(),X(()=>{var i;return(i=D(t.buttonRef))==null?void 0:i.focus({preventScroll:!0})});break;case L.Tab:n.preventDefault(),n.stopPropagation();break;default:n.key.length===1&&(t.search(n.key),b.value=setTimeout(()=>t.clearSearch(),350));break}}let g=Xe(),r=h(()=>g!==null?(g.value&ie.Open)===ie.Open:t.listboxState.value===0);return()=>{var n,i;let w={open:t.listboxState.value===0},{...O}=e,S={"aria-activedescendant":t.activeOptionIndex.value===null||(n=t.options.value[t.activeOptionIndex.value])==null?void 0:n.id,"aria-multiselectable":t.mode.value===1?!0:void 0,"aria-labelledby":(i=D(t.buttonRef))==null?void 0:i.id,"aria-orientation":t.orientation.value,id:a,onKeydown:c,role:"listbox",tabIndex:0,ref:t.optionsRef};return de({ourProps:S,theirProps:O,slot:w,attrs:s,slots:d,features:we.RenderStrategy|we.Static,visible:r.value,name:"ListboxOptions"})}}}),Wt=Q({name:"ListboxOption",props:{as:{type:[Object,String],default:"li"},value:{type:[Object,String,Number,Boolean]},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(e,{slots:s,attrs:d,expose:o}){var p;let a=(p=e.id)!=null?p:`headlessui-listbox-option-${ge()}`,t=ce("ListboxOption"),b=E(null);o({el:b,$el:b});let c=h(()=>t.activeOptionIndex.value!==null?t.options.value[t.activeOptionIndex.value].id===a:!1),g=h(()=>Z(t.mode.value,{0:()=>t.compare(z(t.value.value),z(e.value)),1:()=>z(t.value.value).some(l=>t.compare(z(l),z(e.value)))})),r=h(()=>Z(t.mode.value,{1:()=>{var l;let v=z(t.value.value);return((l=t.options.value.find(y=>v.some(u=>t.compare(z(u),z(y.dataRef.value)))))==null?void 0:l.id)===a},0:()=>g.value})),n=jt(b),i=h(()=>({disabled:e.disabled,value:e.value,get textValue(){return n()},domRef:b}));oe(()=>t.registerOption(a,i)),Ae(()=>t.unregisterOption(a)),oe(()=>{me([t.listboxState,g],()=>{t.listboxState.value===0&&g.value&&Z(t.mode.value,{1:()=>{r.value&&t.goToOption(j.Specific,a)},0:()=>{t.goToOption(j.Specific,a)}})},{immediate:!0})}),xe(()=>{t.listboxState.value===0&&c.value&&t.activationTrigger.value!==0&&X(()=>{var l,v;return(v=(l=D(b))==null?void 0:l.scrollIntoView)==null?void 0:v.call(l,{block:"nearest"})})});function w(l){if(e.disabled)return l.preventDefault();t.select(e.value),t.mode.value===0&&(t.closeListbox(),X(()=>{var v;return(v=D(t.buttonRef))==null?void 0:v.focus({preventScroll:!0})}))}function O(){if(e.disabled)return t.goToOption(j.Nothing);t.goToOption(j.Specific,a)}let S=Mt();function F(l){S.update(l)}function I(l){S.wasMoved(l)&&(e.disabled||c.value||t.goToOption(j.Specific,a,0))}function P(l){S.wasMoved(l)&&(e.disabled||c.value&&t.goToOption(j.Nothing))}return()=>{let{disabled:l}=e,v={active:c.value,selected:g.value,disabled:l},{value:y,disabled:u,...$}=e,G={id:a,ref:b,role:"option",tabIndex:l===!0?void 0:-1,"aria-disabled":l===!0?!0:void 0,"aria-selected":g.value,disabled:void 0,onClick:w,onFocus:O,onPointerenter:F,onMouseenter:F,onPointermove:I,onMousemove:I,onPointerleave:P,onMouseleave:P};return de({ourProps:G,theirProps:$,slot:v,attrs:d,slots:s,name:"ListboxOption"})}}});const Ie=he(W.ui.strategy,W.ui.checkbox,Rt),Gt=Q({inheritAttrs:!1,props:{id:{type:String,default:()=>null},value:{type:[String,Number,Boolean,Object],default:null},modelValue:{type:[Boolean,Array],default:null},name:{type:String,default:null},disabled:{type:Boolean,default:!1},indeterminate:{type:Boolean,default:void 0},help:{type:String,default:null},label:{type:String,default:null},required:{type:Boolean,default:!1},color:{type:String,default:()=>Ie.default.color,validator(e){return W.ui.colors.includes(e)}},inputClass:{type:String,default:""},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},emits:["update:modelValue","change"],setup(e,{emit:s}){const{ui:d,attrs:o}=re("checkbox",x(e,"ui"),Ie,x(e,"class")),{emitFormChange:p,color:a,name:t,inputId:b}=Ve(e),c=b.value??Oe("$YWrWuPJ69t"),g=h({get(){return e.modelValue},set(i){s("update:modelValue",i)}}),r=i=>{s("change",i.target.checked),p()},n=h(()=>Le(K(d.value.base,d.value.form,d.value.rounded,d.value.background,d.value.border,a.value&&d.value.ring.replaceAll("{color}",a.value),a.value&&d.value.color.replaceAll("{color}",a.value)),e.inputClass));return{ui:d,attrs:o,toggle:g,inputId:c,name:t,inputClass:n,onChange:r}}}),Jt=["data-n-ids"],Yt=["id","name","required","value","disabled","indeterminate"],Qt=["for"];function Zt(e,s,d,o,p,a){return f(),k("div",{class:m(e.ui.wrapper),"data-n-ids":e.attrs["data-n-ids"]},[U("div",{class:m(e.ui.container)},[tt(U("input",T({id:e.inputId,"onUpdate:modelValue":s[0]||(s[0]=t=>e.toggle=t),name:e.name,required:e.required,value:e.value,disabled:e.disabled,indeterminate:e.indeterminate,type:"checkbox",class:e.inputClass},e.attrs,{onChange:s[1]||(s[1]=(...t)=>e.onChange&&e.onChange(...t))}),null,16,Yt),[[at,e.toggle]])],2),e.label||e.$slots.label?(f(),k("div",{key:0,class:m(e.ui.inner)},[U("label",{for:e.inputId,class:m(e.ui.label)},[A(e.$slots,"label",{},()=>[H(J(e.label),1)]),e.required?(f(),k("span",{key:0,class:m(e.ui.required)},"*",2)):V("",!0)],10,Qt),e.help?(f(),k("p",{key:0,class:m(e.ui.help)},J(e.help),3)):V("",!0)],2)):V("",!0)],10,Jt)}const Kt=ye(Gt,[["render",Zt]]),N=he(W.ui.strategy,W.ui.select,lt),le=he(W.ui.strategy,W.ui.selectMenu,nt),Xt=Q({components:{HCombobox:It,HComboboxButton:At,HComboboxOptions:Vt,HComboboxOption:Lt,HComboboxInput:Bt,HListbox:Tt,HListboxButton:Ht,HListboxOptions:Nt,HListboxOption:Wt,UIcon:ke,UAvatar:Be},inheritAttrs:!1,props:{modelValue:{type:[String,Number,Object,Array,Boolean],default:""},query:{type:String,default:null},by:{type:String,default:void 0},options:{type:Array,default:()=>[]},id:{type:String,default:null},name:{type:String,default:null},required:{type:Boolean,default:!1},icon:{type:String,default:null},loadingIcon:{type:String,default:()=>N.default.loadingIcon},leadingIcon:{type:String,default:null},trailingIcon:{type:String,default:()=>N.default.trailingIcon},trailing:{type:Boolean,default:!1},leading:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},selectedIcon:{type:String,default:()=>le.default.selectedIcon},disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},searchable:{type:[Boolean,Function],default:!1},searchablePlaceholder:{type:String,default:"Search..."},searchableLazy:{type:Boolean,default:!1},clearSearchOnClose:{type:Boolean,default:()=>le.default.clearSearchOnClose},debounce:{type:Number,default:200},creatable:{type:Boolean,default:!1},showCreateOptionWhen:{type:String,default:()=>le.default.showCreateOptionWhen},placeholder:{type:String,default:null},padded:{type:Boolean,default:!0},size:{type:String,default:null,validator(e){return Object.keys(N.size).includes(e)}},color:{type:String,default:()=>N.default.color,validator(e){return[...W.ui.colors,...Object.keys(N.color)].includes(e)}},variant:{type:String,default:()=>N.default.variant,validator(e){return[...Object.keys(N.variant),...Object.values(N.color).flatMap(s=>Object.keys(s))].includes(e)}},optionAttribute:{type:String,default:"label"},valueAttribute:{type:String,default:null},searchAttributes:{type:Array,default:null},popper:{type:Object,default:()=>({})},selectClass:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},uiMenu:{type:Object,default:()=>({})}},emits:["update:modelValue","update:query","open","close","change"],setup(e,{emit:s,slots:d}){const{ui:o,attrs:p}=re("select",x(e,"ui"),N,x(e,"class")),{ui:a}=re("selectMenu",x(e,"uiMenu"),le),t=h(()=>it({},e.popper,a.value.popper)),[b,c]=ot(t.value),{size:g,rounded:r}=ut({ui:o,props:e}),{emitFormBlur:n,emitFormChange:i,inputId:w,color:O,size:S,name:F}=Ve(e,N),I=h(()=>g.value||S.value),P=E(""),l=h({get(){return e.query??P.value},set(M){P.value=M,s("update:query",M)}}),v=h(()=>{if(e.multiple)return Array.isArray(e.modelValue)&&e.modelValue.length?`${e.modelValue.length} selected`:null;if(e.modelValue!==void 0&&e.modelValue!==null)if(e.valueAttribute){const M=e.options.find(q=>q[e.valueAttribute]===e.modelValue);return M?M[e.optionAttribute]:null}else return["string","number"].includes(typeof e.modelValue)?e.modelValue:e.modelValue[e.optionAttribute];return null}),y=h(()=>{var q,te;const M=((te=(q=o.value.color)==null?void 0:q[O.value])==null?void 0:te[e.variant])||o.value.variant[e.variant];return Le(K(o.value.base,a.value.select,r.value,o.value.size[I.value],o.value.gap[I.value],e.padded?o.value.padding[I.value]:"p-0",M==null?void 0:M.replaceAll("{color}",O.value),(u.value||d.leading)&&o.value.leading.padding[I.value],($.value||d.trailing)&&o.value.trailing.padding[I.value]),e.placeholder&&e.modelValue===void 0&&e.modelValue===null&&o.value.placeholder,e.selectClass)}),u=h(()=>e.icon&&e.leading||e.icon&&!e.trailing||e.loading&&!e.trailing||e.leadingIcon),$=h(()=>e.icon&&e.trailing||e.loading&&e.trailing||e.trailingIcon),G=h(()=>e.loading?e.loadingIcon:e.leadingIcon||e.icon),ee=h(()=>e.loading&&!u.value?e.loadingIcon:e.trailingIcon||e.icon),pe=h(()=>K(o.value.icon.leading.wrapper,o.value.icon.leading.pointer,o.value.icon.leading.padding[I.value])),Re=h(()=>K(o.value.icon.base,O.value&&W.ui.colors.includes(O.value)&&o.value.icon.color.replaceAll("{color}",O.value),o.value.icon.size[I.value],e.loading&&o.value.icon.loading)),De=h(()=>K(o.value.icon.trailing.wrapper,o.value.icon.trailing.pointer,o.value.icon.trailing.padding[I.value])),je=h(()=>K(o.value.icon.base,O.value&&W.ui.colors.includes(O.value)&&o.value.icon.color.replaceAll("{color}",O.value),o.value.icon.size[I.value],e.loading&&!u.value&&o.value.icon.loading)),Se=typeof e.searchable=="function"?rt(e.searchable,e.debounce):void 0,ve=st(async()=>e.searchable&&Se?await Se(l.value):l.value===""?e.options:e.options.filter(M=>{var q;return((q=e.searchAttributes)!=null&&q.length?e.searchAttributes:[e.optionAttribute]).some(te=>{if(["string","number"].includes(typeof M))return String(M).search(new RegExp(l.value,"i"))!==-1;const fe=dt(M,te);return fe!=null&&String(fe).search(new RegExp(l.value,"i"))!==-1})}),[],{lazy:e.searchableLazy}),Fe=h(()=>l.value===""||e.showCreateOptionWhen==="empty"&&ve.value.length||e.showCreateOptionWhen==="always"&&ve.value.find(q=>["string","number"].includes(typeof q)?q===l.value:q[e.optionAttribute]===l.value)?null:["string","number"].includes(typeof e.modelValue)?l.value:{[e.optionAttribute]:l.value});function Pe(){e.clearSearchOnClose&&(l.value="")}me(c,M=>{M?s("open"):(Pe(),s("close"),n())});function Ue(M){s("update:modelValue",M),s("change",M),i()}function qe(M){l.value=M.target.value}return ct(()=>Oe("$YMH7mn4R4k")),{ui:o,uiMenu:a,attrs:p,name:F,inputId:w,popper:t,trigger:b,container:c,label:v,isLeading:u,isTrailing:$,selectClass:y,leadingIconName:G,leadingIconClass:Re,leadingWrapperIconClass:pe,trailingIconName:ee,trailingIconClass:je,trailingWrapperIconClass:De,filteredOptions:ve,createOption:Fe,query:l,onUpdate:Ue,onQueryChange:qe}}}),xt=["value","required"],_t=["id","disabled"],ea={class:"truncate"};function ta(e,s,d,o,p,a){const t=ke,b=pt("HComboboxInput"),c=Be;return f(),R(_(e.searchable?"HCombobox":"HListbox"),{by:e.by,name:e.name,"model-value":e.modelValue,multiple:e.multiple,disabled:e.disabled,as:"div",class:m(e.ui.wrapper),"onUpdate:modelValue":e.onUpdate},{default:B(({open:g})=>[e.required?(f(),k("input",{key:0,value:e.modelValue,required:e.required,class:m(e.uiMenu.required),tabindex:"-1","aria-hidden":"true"},null,10,xt)):V("",!0),(f(),R(_(e.searchable?"HComboboxButton":"HListboxButton"),{ref:"trigger",as:"div",role:"button",class:m(e.uiMenu.trigger)},{default:B(()=>[A(e.$slots,"default",{open:g,disabled:e.disabled,loading:e.loading},()=>[U("button",T({id:e.inputId,class:e.selectClass,disabled:e.disabled,type:"button"},e.attrs),[e.isLeading&&e.leadingIconName||e.$slots.leading?(f(),k("span",{key:0,class:m(e.leadingWrapperIconClass)},[A(e.$slots,"leading",{disabled:e.disabled,loading:e.loading},()=>[Y(t,{name:e.leadingIconName,class:m(e.leadingIconClass)},null,8,["name","class"])])],2)):V("",!0),A(e.$slots,"label",{},()=>[e.label?(f(),k("span",{key:0,class:m(e.uiMenu.label)},J(e.label),3)):(f(),k("span",{key:1,class:m(e.uiMenu.label)},J(e.placeholder||" "),3))]),e.isTrailing&&e.trailingIconName||e.$slots.trailing?(f(),k("span",{key:1,class:m(e.trailingWrapperIconClass)},[A(e.$slots,"trailing",{disabled:e.disabled,loading:e.loading},()=>[Y(t,{name:e.trailingIconName,class:m(e.trailingIconClass),"aria-hidden":"true"},null,8,["name","class"])])],2)):V("",!0)],16,_t)])]),_:2},1032,["class"])),g?(f(),k("div",{key:1,ref:"container",class:m([e.uiMenu.container,e.uiMenu.width])},[Y(vt,T({appear:""},e.uiMenu.transition),{default:B(()=>[U("div",null,[e.popper.arrow?(f(),k("div",{key:0,"data-popper-arrow":"",class:m(Object.values(e.uiMenu.arrow))},null,2)):V("",!0),(f(),R(_(e.searchable?"HComboboxOptions":"HListboxOptions"),{static:"",class:m([e.uiMenu.base,e.uiMenu.ring,e.uiMenu.rounded,e.uiMenu.shadow,e.uiMenu.background,e.uiMenu.padding,e.uiMenu.height])},{default:B(()=>{var r,n;return[e.searchable?(f(),R(b,{key:0,"display-value":()=>e.query,name:"q",placeholder:e.searchablePlaceholder,autofocus:"",autocomplete:"off",class:m(e.uiMenu.input),onChange:e.onQueryChange},null,8,["display-value","placeholder","class","onChange"])):V("",!0),(f(!0),k(ue,null,be(e.filteredOptions,(i,w)=>(f(),R(_(e.searchable?"HComboboxOption":"HListboxOption"),{key:w,as:"template",value:e.valueAttribute?i[e.valueAttribute]:i,disabled:i.disabled},{default:B(({active:O,selected:S,disabled:F})=>[U("li",{class:m([e.uiMenu.option.base,e.uiMenu.option.rounded,e.uiMenu.option.padding,e.uiMenu.option.size,e.uiMenu.option.color,O?e.uiMenu.option.active:e.uiMenu.option.inactive,S&&e.uiMenu.option.selected,F&&e.uiMenu.option.disabled])},[U("div",{class:m(e.uiMenu.option.container)},[A(e.$slots,"option",{option:i,active:O,selected:S},()=>[i.icon?(f(),R(t,{key:0,name:i.icon,class:m([e.uiMenu.option.icon.base,O?e.uiMenu.option.icon.active:e.uiMenu.option.icon.inactive,i.iconClass]),"aria-hidden":"true"},null,8,["name","class"])):i.avatar?(f(),R(c,T({key:1,ref_for:!0},{size:e.uiMenu.option.avatar.size,...i.avatar},{class:e.uiMenu.option.avatar.base,"aria-hidden":"true"}),null,16,["class"])):i.chip?(f(),k("span",{key:2,class:m(e.uiMenu.option.chip.base),style:ft({background:`#${i.chip}`})},null,6)):V("",!0),U("span",ea,J(["string","number"].includes(typeof i)?i:i[e.optionAttribute]),1)])],2),S?(f(),k("span",{key:0,class:m([e.uiMenu.option.selectedIcon.wrapper,e.uiMenu.option.selectedIcon.padding])},[Y(t,{name:e.selectedIcon,class:m(e.uiMenu.option.selectedIcon.base),"aria-hidden":"true"},null,8,["name","class"])],2)):V("",!0)],2)]),_:2},1032,["value","disabled"]))),128)),e.creatable&&e.createOption?(f(),R(_(e.searchable?"HComboboxOption":"HListboxOption"),{key:1,value:e.createOption,as:"template"},{default:B(({active:i,selected:w})=>[U("li",{class:m([e.uiMenu.option.base,e.uiMenu.option.rounded,e.uiMenu.option.padding,e.uiMenu.option.size,e.uiMenu.option.color,i?e.uiMenu.option.active:e.uiMenu.option.inactive])},[U("div",{class:m(e.uiMenu.option.container)},[A(e.$slots,"option-create",{option:e.createOption,active:i,selected:w},()=>[U("span",{class:m(e.uiMenu.option.create)},'Create "'+J(e.createOption[e.optionAttribute])+'"',3)])],2)],2)]),_:3},8,["value"])):e.searchable&&e.query&&!((r=e.filteredOptions)!=null&&r.length)?(f(),k("p",{key:2,class:m(e.uiMenu.option.empty)},[A(e.$slots,"option-empty",{query:e.query},()=>[H(' No results for "'+J(e.query)+'". ',1)])],2)):(n=e.filteredOptions)!=null&&n.length?V("",!0):(f(),k("p",{key:3,class:m(e.uiMenu.empty)},[A(e.$slots,"empty",{query:e.query},()=>[H(" No options. ")])],2))]}),_:3},8,["class"]))])]),_:3},16)],2)):V("",!0)]),_:3},8,["by","name","model-value","multiple","disabled","class","onUpdate:modelValue"])}const aa=ye(Xt,[["render",ta]]);class se extends Error{constructor(s){super(s),this.message=s,Object.setPrototypeOf(this,se.prototype)}}const la=Q({props:{schema:{type:Object,default:void 0},state:{type:Object,required:!0},validate:{type:Function,default:()=>[]},validateOn:{type:Array,default:()=>["blur","input","change","submit"]}},emits:["submit","error"],setup(e,{expose:s,emit:d}){const o=Oe("$Z55GngiEgp"),p=mt(`form-${o}`);oe(()=>{p.on(async r=>{var n;r.type!=="submit"&&((n=e.validateOn)!=null&&n.includes(r.type))&&await c(r.path,{silent:!0})})}),Ae(()=>{p.reset()});const a=E([]);ne("form-errors",a),ne("form-events",p);const t=E({});ne("form-inputs",t);async function b(){let r=await e.validate(e.state);if(e.schema)if(ua(e.schema))r=r.concat(await ra(e.state,e.schema));else if(na(e.schema))r=r.concat(await oa(e.state,e.schema));else if(sa(e.schema))r=r.concat(await ca(e.state,e.schema));else if(pa(e.schema))r=r.concat(await va(e.state,e.schema));else throw new Error("Form validation failed: Unsupported form schema");return r}async function c(r,n={silent:!1}){let i=r;if(r&&!Array.isArray(r)&&(i=[r]),i){const w=a.value.filter(S=>!i.includes(S.path)),O=(await b()).filter(S=>i.includes(S.path));a.value=w.concat(O)}else a.value=await b();if(a.value.length>0){if(n.silent)return!1;throw new se(`Form validation failed: ${JSON.stringify(a.value,null,2)}`)}return e.state}async function g(r){var i;const n=r;try{(i=e.validateOn)!=null&&i.includes("submit")&&await c();const w={...n,data:e.state};d("submit",w)}catch(w){if(!(w instanceof se))throw w;const O={...n,errors:a.value.map(S=>({...S,id:t.value[S.path]}))};d("error",O)}}return s({validate:c,errors:a,setErrors(r,n){a.value=r,n?a.value=a.value.filter(i=>i.path!==n).concat(r):a.value=r},async submit(){await g(new Event("submit"))},getErrors(r){return r?a.value.filter(n=>n.path===r):a.value},clear(r){r?a.value=a.value.filter(n=>n.path!==r):a.value=[]}}),{onSubmit:g}}});function na(e){return e.validate&&e.__isYupSchema__}function ia(e){return e.inner!==void 0}async function oa(e,s){try{return await s.validate(e,{abortEarly:!1}),[]}catch(d){if(ia(d))return d.inner.map(o=>({path:o.path??"",message:o.message}));throw d}}function ua(e){return e.parse!==void 0}async function ra(e,s){const d=await s.safeParseAsync(e);return d.success===!1?d.error.issues.map(o=>({path:o.path.join("."),message:o.message})):[]}function sa(e){return e.validateAsync!==void 0&&e.id!==void 0}function da(e){return e.isJoi===!0}async function ca(e,s){try{return await s.validateAsync(e,{abortEarly:!1}),[]}catch(d){if(da(d))return d.details.map(o=>({path:o.path.join("."),message:o.message}));throw d}}function pa(e){return e._parse!==void 0}async function va(e,s){const d=await s._parse(e);return d.issues?d.issues.map(o=>{var p;return{path:((p=o.path)==null?void 0:p.map(a=>a.key).join("."))||"",message:o.message}}):[]}function fa(e,s,d,o,p,a){return f(),k("form",{onSubmit:s[0]||(s[0]=bt((...t)=>e.onSubmit&&e.onSubmit(...t),["prevent"]))},[A(e.$slots,"default")],32)}const ba=ye(la,[["render",fa]]),ma=Q({inheritAttrs:!1,__name:"AuthForm",props:{title:{type:String,default:void 0},description:{type:String,default:void 0},icon:{type:String,default:void 0},align:{type:String,default:"bottom"},loading:{type:Boolean,default:!1},fields:{type:Array,default:()=>[]},providers:{type:Array,default:()=>[]},submitButton:{type:Object,default:()=>({})},schema:{type:Object,default:void 0},validate:{type:[Function,Array],default:void 0},validateOn:{type:Array,default:()=>["submit"]},divider:{type:String,default:"or"},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},emits:["submit"],setup(e,{expose:s}){const d=e,o=h(()=>({wrapper:"w-full max-w-sm space-y-6",base:"",container:K("gap-y-6 flex flex-col",d.align==="top"&&"flex-col-reverse"),title:"text-2xl text-gray-900 dark:text-white font-bold",description:"text-gray-500 dark:text-gray-400 mt-1",icon:{wrapper:"mb-2 pointer-events-none",base:"w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"},providers:"space-y-3",form:"space-y-6",footer:"text-sm text-gray-500 dark:text-gray-400 mt-2",default:{submitButton:{label:"Continue"}}})),p=E(),{ui:a,attrs:t}=re("auth.form",x(d,"ui"),o,x(d,"class"),!0),b=gt(Object.values(d.fields).reduce((c,{name:g,value:r})=>(c[g]=r,c),{}));return s({formRef:p,state:b}),(c,g)=>{var P,l,v,y;const r=ke,n=ht,i=wt,w=Kt,O=aa,S=Ot,F=kt,I=ba;return f(),k("div",T({class:C(a).wrapper},C(t)),[e.icon||c.$slots.icon||e.title||c.$slots.title||e.description||c.$slots.description?(f(),k("div",{key:0,class:m(C(a).base)},[e.icon||c.$slots.icon?(f(),k("div",{key:0,class:m(C(a).icon.wrapper)},[A(c.$slots,"icon",{},()=>[Y(r,{name:e.icon,class:m(C(a).icon.base)},null,8,["name","class"])])],2)):V("",!0),e.title||c.$slots.title?(f(),k("p",{key:1,class:m(C(a).title)},[A(c.$slots,"title",{},()=>[H(J(e.title),1)])],2)):V("",!0),e.description||c.$slots.description?(f(),k("p",{key:2,class:m(C(a).description)},[A(c.$slots,"description",{},()=>[H(J(e.description),1)])],2)):V("",!0)],2)):V("",!0),U("div",{class:m(C(a).container)},[(P=e.providers)!=null&&P.length?(f(),k("div",{key:0,class:m(C(a).providers)},[(f(!0),k(ue,null,be(e.providers,(u,$)=>(f(),R(n,T({key:$,ref_for:!0},u,{block:"",onClick:u.click}),null,16,["onClick"]))),128))],2)):V("",!0),(l=e.providers)!=null&&l.length&&((v=e.fields)!=null&&v.length)?(f(),R(i,{key:1,label:e.divider},null,8,["label"])):V("",!0),(y=e.fields)!=null&&y.length?(f(),R(I,{key:2,ref_key:"formRef",ref:p,state:C(b),schema:e.schema,validate:e.validate,"validate-on":e.validateOn,class:m(C(a).form),onSubmit:g[0]||(g[0]=u=>c.$emit("submit",u.data))},{default:B(()=>[(f(!0),k(ue,null,be(e.fields,u=>(f(),R(F,{key:u.name,label:u.type==="checkbox"?"":u.label??"",description:u.description,help:u.help,hint:u.hint,name:u.name,size:u.size},yt({default:B(()=>[A(c.$slots,`${u.name}-field`,T({ref_for:!0},{state:C(b),field:C(ae)(u,["description","help","hint","size"])}),()=>[u.type==="checkbox"?(f(),R(w,T({key:0,modelValue:C(b)[u.name],"onUpdate:modelValue":$=>C(b)[u.name]=$,ref_for:!0},C(ae)(u,["description","help","hint","size"])),null,16,["modelValue","onUpdate:modelValue"])):u.type==="select"?(f(),R(O,T({key:1,modelValue:C(b)[u.name],"onUpdate:modelValue":$=>C(b)[u.name]=$,ref_for:!0},C(ae)(u,["description","help","hint","size"])),null,16,["modelValue","onUpdate:modelValue"])):(f(),R(S,T({key:2,modelValue:C(b)[u.name],"onUpdate:modelValue":$=>C(b)[u.name]=$,ref_for:!0},C(ae)(u,["label","description","help","hint","size"])),null,16,["modelValue","onUpdate:modelValue"]))])]),_:2},[c.$slots[`${u.name}-label`]?{name:"label",fn:B(()=>[A(c.$slots,`${u.name}-label`)]),key:"0"}:void 0,c.$slots[`${u.name}-description`]?{name:"description",fn:B(()=>[A(c.$slots,`${u.name}-description`)]),key:"1"}:void 0,c.$slots[`${u.name}-hint`]?{name:"hint",fn:B(()=>[A(c.$slots,`${u.name}-hint`)]),key:"2"}:void 0,c.$slots[`${u.name}-help`]?{name:"help",fn:B(()=>[A(c.$slots,`${u.name}-help`)]),key:"3"}:void 0]),1032,["label","description","help","hint","name","size"]))),128)),A(c.$slots,"validation"),Y(n,T({type:"submit",block:"",loading:e.loading},{...C(a).default.submitButton,...e.submitButton}),null,16,["loading"])]),_:3},8,["state","schema","validate","validate-on","class"])):V("",!0)],2),c.$slots.footer?(f(),k("p",{key:1,class:m(C(a).footer)},[A(c.$slots,"footer")],2)):V("",!0)],16)}}}),ka=Q({__name:"signup",setup(e){St({title:"Sign up"});const s=[{name:"name",type:"text",label:"Name",placeholder:"Enter your name"},{name:"email",type:"text",label:"Email",placeholder:"Enter your email"},{name:"password",label:"Password",type:"password",placeholder:"Enter your password"}],d=a=>{const t=[];return a.email||t.push({path:"email",message:"Email is required"}),a.password||t.push({path:"password",message:"Password is required"}),t},o=[{label:"Continue with GitHub",icon:"i-simple-icons-github",color:"gray",click:()=>{console.log("Redirect to GitHub")}}];function p(a){console.log("Submitted",a)}return(a,t)=>{const b=$t,c=ma,g=Et;return f(),R(g,{class:"max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur"},{default:B(()=>[Y(c,{fields:s,validate:d,providers:o,align:"top",title:"Create an account",ui:{base:"text-center",footer:"text-center"},"submit-button":{label:"Create account"},onSubmit:p},{description:B(()=>[H(" Already have an account? "),Y(b,{to:"/login",class:"text-primary font-medium"},{default:B(()=>[H("Login")]),_:1}),H(". ")]),footer:B(()=>[H(" By signing up, you agree to our "),Y(b,{to:"/",class:"text-primary font-medium"},{default:B(()=>[H("Terms of Service")]),_:1}),H(". ")]),_:1})]),_:1})}}});export{ka as default};
