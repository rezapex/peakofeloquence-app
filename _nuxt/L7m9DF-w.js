import{u as C,_ as $}from"./q6UUqTLp.js";import{d as x,y as w,a7 as A,b as m,N as B,a1 as U,w as d,e as o,g as f,j as k,t as N,ab as e,P as S,U as V,V as j,W as y,c as v,n as r,O as c,f as O,b0 as z}from"./Dny3plqr.js";const I={class:"hidden lg:flex items-center gap-0.5 ml-auto -my-1 flex-shrink-0"},E=x({__name:"ContentSearchButton",props:{label:{type:String,default:"Search..."}},setup(t){const i=w(),{toggleContentSearch:n}=A(),{metaSymbol:a}=C();return(l,s)=>{var b,g,h,_;const u=$,p=V;return m(),B(p,S({icon:e(i).ui.icons.search,label:t.label,truncate:""},t.label?(g=(b=l.$ui)==null?void 0:b.button)==null?void 0:g.input:(_=(h=l.$ui)==null?void 0:h.button)==null?void 0:_.secondary,{"aria-label":"Search",class:[!!t.label&&"flex-1"],onClick:e(n)}),U({_:2},[t.label?{name:"trailing",fn:d(()=>[o("div",I,[f(u,null,{default:d(()=>[k(N(e(a)),1)]),_:1}),f(u,null,{default:d(()=>[k(" K ")]),_:1})])]),key:"0"}:void 0]),1040,["icon","label","class","onClick"])}}}),K={class:"relative"},L=x({inheritAttrs:!1,__name:"Aside",props:{links:{type:Array,default:()=>[]},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(t){const i={wrapper:"hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:sticky lg:top-[--header-height] py-8 lg:px-4 lg:-mx-4",top:{wrapper:"sticky -top-8 -mt-8 pointer-events-none z-[1]",header:"h-8 bg-background -mx-4 px-4",body:"bg-background relative pointer-events-auto flex -mx-4 px-4",footer:"h-8 bg-gradient-to-b from-background -mx-4 px-4"}},n=t,{ui:a,attrs:l}=j("aside",y(n,"ui"),i,y(n,"class"),!0);return(s,u)=>{const p=z;return m(),v("aside",S({class:e(a).wrapper},e(l)),[o("div",K,[s.$slots.top?(m(),v("div",{key:0,class:r(e(a).top.wrapper)},[o("div",{class:r(e(a).top.header)},null,2),o("div",{class:r(e(a).top.body)},[c(s.$slots,"top")],2),o("div",{class:r(e(a).top.footer)},null,2)],2)):O("",!0),c(s.$slots,"links",{},()=>[f(p,{links:t.links},null,8,["links"])]),c(s.$slots,"default"),c(s.$slots,"bottom")])],16)}}});export{E as _,L as a};