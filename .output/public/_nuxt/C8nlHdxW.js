import{d as z,I as _,x as ee,c as V,r as N,b8 as te,f as ae,l as ne,w as le,m as M,n as ie,E as se,q as re,A as oe,T as ce,F as B,B as G,a7 as E,a8 as C,M as ue,R as n,Z as O,$ as b,S as o,U as i,u as t,a0 as p,a3 as D,V as y,W as u,X as w,a1 as U,at as Y,P as de,ab as T,ad as k,Y as q,K as R,a6 as F,an as H,af as ge,ag as K,aK as fe,ah as Q,b9 as me,aB as pe,aC as ye,aD as he,aE as xe,ay as ve,aG as ke}from"./BFOempIy.js";import{d as be,p as $e}from"./CnrRyh0j.js";import{_ as we}from"./BzKJFxZN.js";import{_ as Se}from"./BIW_z9m5.js";import{_ as Ce}from"./CyQdQWsM.js";let Ae=Symbol("GroupContext"),Ue=z({name:"Switch",emits:{"update:modelValue":e=>!0},props:{as:{type:[Object,String],default:"button"},modelValue:{type:Boolean,default:void 0},defaultChecked:{type:Boolean,optional:!0},form:{type:String,optional:!0},name:{type:String,optional:!0},value:{type:String,optional:!0},id:{type:String,default:null}},inheritAttrs:!1,setup(e,{emit:c,attrs:g,slots:s,expose:a}){var r;let l=(r=e.id)!=null?r:`headlessui-switch-${_()}`,m=ee(Ae,null),[d,h]=be(V(()=>e.modelValue),f=>c("update:modelValue",f),V(()=>e.defaultChecked));function x(){h(!d.value)}let S=N(null),$=m===null?S:m.switchRef,L=te(V(()=>({as:e.as,type:g.type})),$);a({el:$,$el:$});function P(f){f.preventDefault(),x()}function j(f){f.key===G.Space?(f.preventDefault(),x()):f.key===G.Enter&&$e(f.currentTarget)}function v(f){f.preventDefault()}let A=V(()=>{var f,I;return(I=(f=ae($))==null?void 0:f.closest)==null?void 0:I.call(f,"form")});return ne(()=>{le([A],()=>{if(!A.value||e.defaultChecked===void 0)return;function f(){h(e.defaultChecked)}return A.value.addEventListener("reset",f),()=>{var I;(I=A.value)==null||I.removeEventListener("reset",f)}},{immediate:!0})}),()=>{let{name:f,value:I,form:J,...W}=e,X={checked:d.value},Z={id:l,ref:$,role:"switch",type:L.value,tabIndex:0,"aria-checked":d.value,"aria-labelledby":m==null?void 0:m.labelledby.value,"aria-describedby":m==null?void 0:m.describedby.value,onClick:P,onKeyup:j,onKeypress:v};return M(B,[f!=null&&d.value!=null?M(ie,se({features:re.Hidden,as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:d.value,form:J,name:f,value:I})):null,oe({ourProps:Z,theirProps:{...g,...ce(W,["modelValue","defaultChecked"])},slot:X,attrs:g,slots:s,name:"Switch"})])}}});const je=z({inheritAttrs:!1,__name:"PricingToggle",props:{modelValue:{type:Boolean,default:!1},left:{type:String,default:"Monthly"},right:{type:String,default:"Yearly"},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},emits:["update:modelValue"],setup(e,{emit:c}){const g=e,s=c,a={wrapper:"ring-1 ring-gray-300 dark:ring-gray-700 flex items-center relative h-8 w-auto flex-shrink-0 cursor-pointer rounded-full p-1 w-full focus:outline-none",marker:"w-1/2 text-white dark:text-gray-900 pointer-events-none inline-block h-6 transform rounded-full bg-gray-900 dark:bg-white shadow transition duration-200 ease-in-out z-0 relative",active:"text-white dark:text-gray-900",inactive:"text-gray-500 dark:text-gray-400",base:"absolute inset-y-0 w-1/2 flex items-center justify-center pointer-events-none z-[1] transition-colors duration-200 select-none text-xs font-semibold flex-shrink-0",left:"left-0",right:"right-0"},r=V({get(){return g.modelValue},set(d){s("update:modelValue",d)}}),{ui:l,attrs:m}=E("pricing.toggle",C(g,"ui"),a,C(g,"class"),!0);return ue(()=>de("$qibiFAg981")),(d,h)=>(n(),O(t(Ue),U({modelValue:t(r),"onUpdate:modelValue":h[0]||(h[0]=x=>Y(r)?r.value=x:null),"aria-label":"pricing toggle",class:t(l).wrapper},t(m)),{default:b(()=>[e.left||d.$slots.left?(n(),o("span",{key:0,"aria-hidden":"true",class:i([t(l).base,t(l).left,t(r)?t(l).inactive:t(l).active])},[p(d.$slots,"left",{},()=>[D(y(e.left),1)])],2)):u("",!0),e.right||d.$slots.right?(n(),o("span",{key:1,"aria-hidden":"true",class:i([t(l).base,t(l).right,t(r)?t(l).active:t(l).inactive])},[p(d.$slots,"right",{},()=>[D(y(e.right),1)])],2)):u("",!0),w("span",{"aria-hidden":"true",class:i([t(r)?"translate-x-full":"translate-x-0",t(l).marker])},null,2)]),_:3},16,["modelValue","class"]))}}),Ve={key:2},Be=z({inheritAttrs:!1,__name:"PageHero",props:{title:{type:String,default:void 0},description:{type:String,default:void 0},icon:{type:String,default:void 0},links:{type:Array,default:()=>[]},align:{type:String,default:"left"},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(e){const c=e,g=V(()=>{const r=T("gap-8 sm:gap-y-16",c.align==="center"?"flex flex-col":"grid lg:grid-cols-2 lg:items-center"),l=T("",c.align==="center"&&"text-center flex flex-col items-center",c.align==="right"&&"lg:order-last"),m=T("mt-8 flex flex-wrap gap-x-3 gap-y-1.5",c.align==="center"&&"justify-center");return{wrapper:"py-8 sm:py-16",container:r,base:l,icon:{wrapper:"flex mb-4",base:"w-10 h-10 flex-shrink-0 text-primary"},title:"text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl",description:"mt-4 text-lg text-gray-500 dark:text-gray-400",links:m}}),{ui:s,attrs:a}=E("page.hero",C(c,"ui"),g,C(c,"class"),!0);return(r,l)=>{var h,x;const m=R,d=F;return n(),o("div",U({class:t(s).wrapper},t(a)),[w("div",{class:i(t(s).container)},[e.icon||r.$slots.icon||e.title||r.$slots.title||e.description||r.$slots.description||(h=e.links)!=null&&h.length||r.$slots.links?(n(),o("div",{key:0,class:i(t(s).base)},[e.icon||r.$slots.icon?(n(),o("div",{key:0,class:i(t(s).icon.wrapper)},[p(r.$slots,"icon",{},()=>[k(m,{name:e.icon,class:i(t(s).icon.base)},null,8,["name","class"])])],2)):u("",!0),w("h1",{class:i(t(s).title)},[p(r.$slots,"title",{},()=>[D(y(e.title),1)])],2),e.description||r.$slots.description?(n(),o("p",{key:1,class:i(t(s).description)},[p(r.$slots,"description",{},()=>[D(y(e.description),1)])],2)):u("",!0),(x=e.links)!=null&&x.length||r.$slots.links?(n(),o("div",{key:2,class:i(t(s).links)},[p(r.$slots,"links",{},()=>[(n(!0),o(B,null,q(e.links,(S,$)=>(n(),O(d,U({key:$},S,{onClick:S.click}),null,16,["onClick"]))),128))])],2)):u("",!0)],2)):u("",!0),r.$slots.default?p(r.$slots,"default",{key:1}):e.align==="right"?(n(),o("div",Ve)):u("",!0)],2)],16)}}}),Oe={key:0,class:"flex-1"},ze=z({inheritAttrs:!1,__name:"PricingCard",props:{title:{type:String,default:void 0},description:{type:String,default:void 0},orientation:{type:String,default:"vertical"},align:{type:String,default:"bottom"},highlight:{type:Boolean,default:!1},scale:{type:Boolean,default:!1},features:{type:Array,default:()=>[]},badge:{type:Object,default:void 0},button:{type:Object,default:void 0},price:{type:String,default:void 0},discount:{type:String,default:void 0},cycle:{type:String,default:void 0},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(e){const c=e,g=H(),s=V(()=>{const l=T("flex-1 gap-6 lg:gap-x-8 xl:gap-x-10 flex flex-col",c.orientation==="horizontal"?"lg:grid lg:grid-cols-10":""),m=c.orientation==="horizontal"?"lg:col-span-7":"",d=c.orientation==="horizontal"?"flex flex-col lg:items-center justify-center gap-y-6 lg:col-span-3 border-t lg:border-l lg:border-t-0 border-gray-200 dark:border-gray-800 pt-6 lg:pt-0 lg:pl-8 xl:pl-10":"";return{wrapper:"relative flex flex-col self-stretch w-full",highlight:"ring-2 ring-primary dark:ring-primary",scale:"lg:scale-[1.1] lg:z-10",rounded:"rounded-xl",header:{padding:"p-6 lg:px-8 xl:px-10"},body:{base:l,padding:"p-6 lg:p-8 xl:p-10"},footer:{padding:"p-6 lg:px-8 xl:px-10"},inner:"flex items-center gap-3",title:"text-2xl text-gray-900 dark:text-white sm:text-3xl font-semibold truncate",description:"text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2",amount:{base:"flex flex-row items-baseline gap-x-1",discount:"text-gray-500 dark:text-gray-400 line-through text-xl sm:text-2xl font-medium",price:"text-gray-900 dark:text-white text-2xl sm:text-4xl font-semibold",cycle:"text-gray-500 dark:text-gray-400 text-sm/6 font-medium truncate"},features:{vertical:"space-y-3 text-sm",horizontal:"grid lg:grid-cols-2 text-sm gap-3",item:{base:"flex items-center gap-x-3 min-w-0",label:"text-gray-600 dark:text-gray-400 truncate",icon:{base:"w-5 h-5 flex-shrink-0 text-primary",name:g.ui.icons.check}}},divider:"my-6 lg:my-8",left:m,right:d}}),{ui:a,attrs:r}=E("pricing.card",C(c,"ui"),s,C(c,"class"),!0);return(l,m)=>{const d=fe,h=we,x=R,S=F,$=Se;return n(),O($,U({class:[t(a).wrapper,e.highlight&&t(a).highlight,e.scale&&t(a).scale]},t(r),{ui:t(a)}),ge({default:b(()=>{var L,P;return[w("div",{class:i(t(a).left)},[w("div",{class:i(t(a).inner)},[e.title||l.$slots.title?(n(),o("p",{key:0,class:i(t(a).title)},[p(l.$slots,"title",{},()=>[D(y(e.title),1)])],2)):u("",!0),e.badge?(n(),O(d,K(U({key:1},{variant:"subtle",...e.badge})),null,16)):u("",!0)],2),e.description||l.$slots.description?(n(),o("p",{key:0,class:i(t(a).description)},[p(l.$slots,"description",{},()=>[D(y(e.description),1)])],2)):u("",!0),e.orientation==="horizontal"?(n(),o(B,{key:1},[k(h,{class:i(t(a).divider)},null,8,["class"]),(L=e.features)!=null&&L.length||l.$slots.features?(n(),o("div",Oe,[p(l.$slots,"features",{},()=>{var j;return[(j=e.features)!=null&&j.length?(n(),o("ul",{key:0,class:i(t(a).features.horizontal)},[(n(!0),o(B,null,q(e.features,(v,A)=>(n(),o("li",{key:A,class:i(t(a).features.item.base)},[k(x,{name:t(a).features.item.icon.name,class:i(t(a).features.item.icon.base)},null,8,["name","class"]),w("span",{class:i(t(a).features.item.label)},y(v),3)],2))),128))],2)):u("",!0)]})])):u("",!0)],64)):u("",!0)],2),e.orientation==="vertical"?(n(),o(B,{key:0},[w("div",{class:i(t(a).amount.base)},[e.discount&&e.price?(n(),o("p",{key:0,class:i(t(a).amount.discount)},y(e.price),3)):u("",!0),w("p",{class:i(t(a).amount.price)},y(e.discount||e.price||" "),3),e.cycle?(n(),o("p",{key:1,class:i(t(a).amount.cycle)},y(e.cycle),3)):u("",!0)],2),(P=e.features)!=null&&P.length||l.$slots.features?(n(),o("div",{key:0,class:i([e.align==="top"&&"order-last","flex-1"])},[p(l.$slots,"features",{},()=>{var j;return[(j=e.features)!=null&&j.length?(n(),o("ul",{key:0,class:i(t(a).features.vertical)},[(n(!0),o(B,null,q(e.features,(v,A)=>(n(),o("li",{key:A,class:i(t(a).features.item.base)},[k(x,{name:t(a).features.item.icon.name,class:i(t(a).features.item.icon.base)},null,8,["name","class"]),w("span",{class:i(t(a).features.item.label)},y(v),3)],2))),128))],2)):u("",!0)]})],2)):u("",!0)],64)):u("",!0),w("div",{class:i(t(a).right)},[e.orientation==="horizontal"?(n(),o("div",{key:0,class:i([t(a).amount.base,e.align==="top"&&"order-last"])},[e.discount&&e.price?(n(),o("p",{key:0,class:i(t(a).amount.discount)},y(e.price),3)):u("",!0),w("p",{class:i(t(a).amount.price)},y(e.discount||e.price||" "),3),e.cycle?(n(),o("p",{key:1,class:i(t(a).amount.cycle)},y(e.cycle),3)):u("",!0)],2)):u("",!0),e.button?(n(),O(S,U({key:1},{block:!0,size:"lg",...e.button},{onClick:e.button.click}),null,16,["onClick"])):u("",!0),e.orientation==="horizontal"?p(l.$slots,"bottom",{key:2}):u("",!0)],2),e.orientation==="vertical"?p(l.$slots,"bottom",{key:1}):u("",!0)]}),_:2},[l.$slots.header?{name:"header",fn:b(()=>[p(l.$slots,"header")]),key:"0"}:void 0,l.$slots.footer?{name:"footer",fn:b(()=>[p(l.$slots,"footer")]),key:"1"}:void 0]),1040,["class","ui"])}}}),Pe=z({inheritAttrs:!1,__name:"PricingGrid",props:{compact:{type:Boolean,default:!1},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(e){const c=e,g={wrapper:"flex flex-col lg:grid lg:grid-cols-3 w-full justify-center items-center gap-8"},{ui:s,attrs:a}=E("pricing.grid",C(c,"ui"),g,C(c,"class"),!0);return(r,l)=>(n(),o("div",U({class:[t(s).wrapper,e.compact&&"gap-x-0"]},t(a)),[p(r.$slots,"default")],16))}}),Ie=z({inheritAttrs:!1,__name:"LandingLogos",props:{title:{type:String,default:void 0},align:{type:String,default:"center"},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(e){const c=e,g=V(()=>({wrapper:{center:"text-center",right:"text-right",left:"text-left"}[c.align],title:"text-lg font-semibold leading-8 text-gray-900 dark:text-white",images:"mx-auto mt-10 flex flex-wrap items-center justify-between gap-8"})),{ui:s,attrs:a}=E("landing.logos",C(c,"ui"),g,C(c,"class"),!0);return(r,l)=>(n(),o("div",U({class:t(s).wrapper},t(a)),[e.title?(n(),o("h2",{key:0,class:i(t(s).title)},y(e.title),3)):u("",!0),w("div",{class:i(t(s).images)},[p(r.$slots,"default")],2)],16))}}),Le=z({inheritAttrs:!1,__name:"LandingFAQ",props:{items:{type:Array,default:()=>[]},multiple:{type:Boolean,default:!1},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(e){const c=H(),g=V(()=>({wrapper:"divide-y divide-gray-200 dark:divide-gray-800 -mt-6",container:"divide-y divide-gray-200 dark:divide-gray-800",item:{size:"text-base",padding:"py-6"},button:{base:"text-left text-lg py-6 w-full",label:"text-gray-900 dark:text-white",trailingIcon:{name:c.ui.icons.chevron,base:"w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5",active:"",inactive:"-rotate-90"}}})),s=e,{ui:a,attrs:r}=E("landing.faq",C(s,"ui"),g,C(s,"class"),!0);return(l,m)=>{const d=R,h=F,x=me;return n(),O(x,U({class:t(a).wrapper,items:e.items,multiple:e.multiple},t(r),{ui:{item:t(a).item,container:t(a).container}}),{default:b(({item:S,open:$})=>[k(h,{color:"gray",variant:"link",ui:{rounded:"rounded-none",color:{gray:{link:"hover:no-underline"}}},padded:!1,class:i(t(a).button.base)},{trailing:b(()=>[k(d,{name:t(a).button.trailingIcon.name,class:i([t(a).button.trailingIcon.base,$?t(a).button.trailingIcon.active:t(a).button.trailingIcon.inactive])},null,8,["name","class"])]),default:b(()=>[w("span",{class:i(t(a).button.label)},y(S.label),3)]),_:2},1032,["class"])]),item:b(S=>[p(l.$slots,"item",K(Q(S)))]),_:3},16,["class","items","multiple","ui"])}}}),De={key:0},Ke=z({__name:"pricing",async setup(e){let c,g;const{data:s}=([c,g]=pe(()=>xe("pricing",()=>ke("/pricing").findOne())),c=await c,g(),c);if(!s.value)throw ye({statusCode:404,statusMessage:"Page not found",fatal:!0});he({title:s.value.title,ogTitle:s.value.title,description:s.value.description,ogDescription:s.value.description});const a=N(!1);return(r,l)=>{const m=je,d=Be,h=ze,x=Pe,S=ve,$=R,L=Ie,P=Ce,j=Le;return t(s)?(n(),o("div",De,[k(d,K(Q(t(s).hero)),{links:b(()=>[k(m,{modelValue:t(a),"onUpdate:modelValue":l[0]||(l[0]=v=>Y(a)?a.value=v:null),class:"w-48"},null,8,["modelValue"])]),_:1},16),k(S,null,{default:b(()=>[k(x,null,{default:b(()=>[(n(!0),o(B,null,q(t(s).plans,(v,A)=>(n(),O(h,U({key:A},v,{price:t(a)?v.price.year:v.price.month,cycle:t(a)?"/year":"/month"}),null,16,["price","cycle"]))),128))]),_:1})]),_:1}),k(P,null,{default:b(()=>[k(L,null,{default:b(()=>[(n(!0),o(B,null,q(t(s).logos.icons,v=>(n(),O($,{key:v,name:v,class:"w-12 h-12 flex-shrink-0 text-gray-500 dark:text-gray-400"},null,8,["name"]))),128))]),_:1})]),_:1}),k(P,{title:t(s).faq.title,description:t(s).faq.description},{default:b(()=>[k(j,{items:t(s).faq.items,multiple:"","default-open":"",class:"max-w-4xl mx-auto"},null,8,["items"])]),_:1},8,["title","description"])])):u("",!0)}}});export{Ke as default};