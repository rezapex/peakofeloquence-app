import{_ as C}from"./Bie2vWxZ.js";import{d as B,aP as S,a7 as w,a8 as I,r as P,c as f,R as l,S as p,X as y,F as V,Y as $,U as m,u as a,ad as A,V as D,Z as F,bh as G,a1 as N}from"./BFOempIy.js";const R=["onClick"],E=B({inheritAttrs:!1,__name:"CodeGroup",props:{class:{type:[String,Object,Array],default:void 0}},setup(g,{expose:v}){const h={wrapper:"relative [&>div:last-child]:!my-0 [&>div:last-child]:!static my-5",header:"flex items-center gap-1 border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md overflow-hidden p-2",tab:{base:"px-2 py-1.5 focus:outline-none text-gray-700 dark:text-gray-200 text-sm rounded-md flex items-center gap-1.5",active:"bg-gray-100 dark:bg-gray-800",inactive:"hover:bg-gray-50 dark:hover:bg-gray-800/50",icon:{base:""}}},_=g,d=S(),{ui:t,attrs:k}=w("content.codeGroup",void 0,h,I(_,"class"),!0),n=P(0);v({selectedIndex:n});function u(e,r){var i,c,o,s;return typeof e.type=="symbol"?(i=e.children)==null?void 0:i.map(u):{label:((c=e.props)==null?void 0:c.filename)||((o=e.props)==null?void 0:o.label)||`${r}`,icon:(s=e.props)==null?void 0:s.icon,component:e}}const b=f(()=>{var e,r;return((r=(e=d.default)==null?void 0:e.call(d))==null?void 0:r.flatMap(u).filter(Boolean))||[]}),x=f(()=>b.value.find((e,r)=>r===n.value));return(e,r)=>{var c;const i=C;return l(),p("div",N({class:a(t).wrapper},a(k)),[y("div",{class:m(a(t).header)},[(l(!0),p(V,null,$(a(b),(o,s)=>(l(),p("button",{key:s,tabindex:"-1",class:m([a(t).tab.base,a(n)===s?a(t).tab.active:a(t).tab.inactive]),onClick:U=>n.value=s},[A(i,{icon:o.icon,filename:o.label,class:m(a(t).tab.icon.base)},null,8,["icon","filename","class"]),y("span",null,D(o.label),1)],10,R))),128))],2),(l(),F(G((c=a(x))==null?void 0:c.component),{key:a(n),"hide-header":""}))],16)}}});export{E as default};