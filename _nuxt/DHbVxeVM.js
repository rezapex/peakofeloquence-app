import{d as I,y as L,G as M,Z as A,V as P,W as B,b as n,c as l,O as c,g,w as z,n as r,aa as t,j as h,t as d,f as o,F as m,M as y,e as N,N as U,P as p,at as D,H as E,U as G,ag as H}from"./DZs4cLmW.js";const J={key:0},R={key:2},T={key:0},Z=I({inheritAttrs:!1,__name:"LandingSection",props:{icon:{type:String,default:void 0},headline:{type:String,default:void 0},title:{type:String,default:void 0},description:{type:String,default:void 0},features:{type:Array,default:()=>[]},links:{type:Array,default:()=>[]},slot:{type:String,default:void 0},align:{type:String,default:"center"},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(e){const V=L(),u=e,j=M(()=>{const a=A("gap-16 sm:gap-y-24",u.align==="center"?"flex flex-col":"grid lg:grid-cols-2 lg:items-center"),b=A("",u.align==="center"&&"text-center flex flex-col items-center",u.align==="right"&&"lg:order-last");return{wrapper:"py-24 sm:py-32",container:a,base:b,icon:{wrapper:"flex mb-6",base:"w-10 h-10 flex-shrink-0 text-primary"},headline:"mb-2 text-base/7 font-semibold text-primary",title:"text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl",description:"mt-6 text-lg/8 text-gray-600 dark:text-gray-300",links:"mt-8 flex flex-wrap gap-x-3 gap-y-1.5",features:{wrapper:{base:"mt-6 leading-7",list:"space-y-4",grid:"grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"},base:"relative pl-8",name:"font-semibold text-gray-900 dark:text-white",description:"text-gray-500 dark:text-gray-400 leading-6",icon:{base:"absolute left-0 top-1 h-5 w-5 text-primary",name:V.ui.icons.check}}}}),{ui:s,attrs:O}=P("landing.section",B(u,"ui"),j,B(u,"class"),!0);return(a,b)=>{const f=E,$=G,F=H;return n(),l("div",p({class:t(s).wrapper},t(O)),[c(a.$slots,"top"),g(F,{class:r(t(s).container)},{default:z(()=>{var w,x,v,C,S;return[e.icon||a.$slots.icon||e.headline||a.$slots.headline||e.title||a.$slots.title||e.description||a.$slots.description||(w=e.links)!=null&&w.length||a.$slots.links?(n(),l("div",{key:0,class:r(t(s).base)},[e.icon||a.$slots.icon?(n(),l("div",{key:0,class:r(t(s).icon.wrapper)},[c(a.$slots,"icon",{},()=>[g(f,{name:e.icon,class:r(t(s).icon.base)},null,8,["name","class"])])],2)):e.headline||a.$slots.headline?(n(),l("div",{key:1,class:r(t(s).headline)},[c(a.$slots,"headline",{},()=>[h(d(e.headline),1)])],2)):o("",!0),e.title||a.$slots.title?(n(),l("h2",{key:2,class:r(t(s).title)},[c(a.$slots,"title",{},()=>[h(d(e.title),1)])],2)):o("",!0),e.description||a.$slots.description?(n(),l("p",{key:3,class:r(t(s).description)},[c(a.$slots,"description",{},()=>[h(d(e.description),1)])],2)):o("",!0),e.align!=="center"&&((x=e.features)!=null&&x.length)?(n(),l("dl",{key:4,class:r([t(s).features.wrapper.base,t(s).features.wrapper.list])},[(n(!0),l(m,null,y(e.features,i=>(n(),l("div",{key:i.name,class:r(t(s).features.base)},[N("dt",{class:r(t(s).features.name)},[g(f,{name:i.icon||t(s).features.icon.name,class:r(t(s).features.icon.base),"aria-hidden":"true"},null,8,["name","class"]),i.name?(n(),l("span",J,d(i.name),1)):o("",!0)],2),i.description?(n(),l("dd",{key:0,class:r(t(s).features.description)},d(i.description),3)):o("",!0)],2))),128))],2)):o("",!0),e.align!=="center"&&((v=e.links)!=null&&v.length||a.$slots.links)?(n(),l("div",{key:5,class:r(t(s).links)},[c(a.$slots,"links",{},()=>[(n(!0),l(m,null,y(e.links,(i,k)=>(n(),U($,p({key:k,ref_for:!0},i,{onClick:i.click}),null,16,["onClick"]))),128))])],2)):o("",!0)],2)):o("",!0),a.$slots[e.slot||"default"]?c(a.$slots,e.slot||"default",{key:1}):e.align==="right"?(n(),l("div",R)):o("",!0),e.align==="center"&&((C=e.features)!=null&&C.length)?(n(),l("dl",{key:3,class:r([t(s).features.wrapper.base,t(s).features.wrapper.grid])},[(n(!0),l(m,null,y(e.features,i=>(n(),l("div",{key:i.name,class:r(t(s).features.base)},[N("dt",{class:r(t(s).features.name)},[g(f,{name:i.icon||t(s).features.icon.name,class:r(t(s).features.icon.base),"aria-hidden":"true"},null,8,["name","class"]),i.name?(n(),l("span",T,d(i.name),1)):o("",!0)],2),i.description?(n(),l("dd",{key:0,class:r(t(s).features.description)},d(i.description),3)):o("",!0)],2))),128))],2)):o("",!0),e.align==="center"&&((S=e.links)!=null&&S.length||a.$slots.links)?(n(),l("div",{key:4,class:r(t(D)(t(s).links,"mt-0 justify-center"))},[c(a.$slots,"links",{},()=>[(n(!0),l(m,null,y(e.links,(i,k)=>(n(),U($,p({key:k,ref_for:!0},i,{onClick:i.click}),null,16,["onClick"]))),128))])],2)):o("",!0)]}),_:3},8,["class"]),c(a.$slots,"bottom")],16)}}});export{Z as _};
