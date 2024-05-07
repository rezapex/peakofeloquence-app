import{d as x,a7 as b,a8 as u,R as r,S as l,U as n,u as s,a0 as o,a3 as g,V as y,W as d,X as p,ad as B,F as j,Y as A,Z as C,a1 as k,K as V,a6 as N}from"./D8UErqBy.js";const O={class:"flex flex-col lg:flex-row items-start gap-6"},U={class:"flex-1"},F=x({inheritAttrs:!1,__name:"PageHeader",props:{headline:{type:String,default:void 0},title:{type:String,default:void 0},description:{type:String,default:void 0},icon:{type:String,default:void 0},links:{type:Array,default:()=>[]},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(e){const f={wrapper:"relative border-b border-gray-200 dark:border-gray-800 py-8",container:"flex flex-col lg:flex-row lg:items-center lg:justify-between",headline:"mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5",title:"text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight",description:"mt-4 text-lg text-gray-500 dark:text-gray-400",icon:{wrapper:"flex",base:"w-10 h-10 flex-shrink-0 text-primary"},links:"flex flex-wrap items-center gap-1.5 mt-4 lg:mt-0"},i=e,{ui:a,attrs:m}=b("page.header",u(i,"ui"),f,u(i,"class"),!0);return(t,v)=>{var h;const w=V,$=N;return r(),l("div",k({class:s(a).wrapper},s(m)),[e.headline||t.$slots.headline?(r(),l("div",{key:0,class:n(s(a).headline)},[o(t.$slots,"headline",{},()=>[g(y(e.headline),1)])],2)):d("",!0),p("div",O,[e.icon||t.$slots.icon?(r(),l("div",{key:0,class:n(s(a).icon.wrapper)},[o(t.$slots,"icon",{},()=>[B(w,{name:e.icon,class:n(s(a).icon.base)},null,8,["name","class"])])],2)):d("",!0),p("div",U,[p("div",{class:n(s(a).container)},[p("h1",{class:n(s(a).title)},[o(t.$slots,"title",{},()=>[g(y(e.title),1)])],2),(h=e.links)!=null&&h.length||t.$slots.links?(r(),l("div",{key:0,class:n(s(a).links)},[o(t.$slots,"links",{},()=>[(r(!0),l(j,null,A(e.links,(c,S)=>(r(),C($,k({key:S},{...c,target:c.target||"_blank",color:c.color||"white"},{onClick:c.click}),null,16,["onClick"]))),128))])],2)):d("",!0)],2),e.description||t.$slots.description?(r(),l("p",{key:0,class:n(s(a).description)},[o(t.$slots,"description",{},()=>[g(y(e.description),1)])],2)):d("",!0),o(t.$slots,"default")])])],16)}}}),I=x({inheritAttrs:!1,__name:"PageBody",props:{prose:{type:Boolean,default:!1},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(e){const f={wrapper:"mt-8 pb-24",prose:"prose prose-primary dark:prose-invert max-w-none"},i=e,{ui:a,attrs:m}=b("page.body",u(i,"ui"),f,u(i,"class"),!0);return(t,v)=>(r(),l("div",k({class:[s(a).wrapper,e.prose&&s(a).prose]},s(m)),[o(t.$slots,"default")],16))}});export{F as _,I as a};
