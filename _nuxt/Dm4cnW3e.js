import{d,y as m,G as b,V as f,J as g,b as x,N as y,w as n,g as s,ab as e,bA as v,n as o,e as _,t as c,bB as h,bC as C,K as w,H as S}from"./Dny3plqr.js";import"./BvGbM6F1.js";import{r as k}from"./DPOrSD-7.js";const T=d({__name:"Collapsible",props:{name:{type:String,default:"properties"},openText:{type:String,default:"Show"},closeText:{type:String,default:"Hide"}},setup(a){const i=m(),l=b(()=>({button:{base:"flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",icon:{name:i.ui.icons.chevron,base:"w-4 h-4 transform transition-transform duration-200",active:"",inactive:"-rotate-90"}},panel:"mt-4 ml-2 py-2.5 pl-4 border-l border-gray-200 dark:border-gray-800 [&>div]:!mt-0"})),{ui:t}=f("content.collapsible",void 0,l,void 0,!0);return g(()=>w("$yVfLwIQecb")),(u,V)=>{const p=S;return x(),y(e(C),{as:"div"},{default:n(({open:r})=>[s(e(v),{class:o(e(t).button.base)},{default:n(()=>[s(p,{name:e(t).button.icon.name,class:o([e(t).button.icon.base,r?e(t).button.icon.active:e(t).button.icon.inactive])},null,8,["name","class"]),_("span",null,c(r?a.closeText:a.openText)+" "+c(a.name),1)]),_:2},1032,["class"]),s(e(h),{class:o(e(t).panel)},{default:n(()=>[k(u.$slots,"default",{unwrap:"p"})]),_:3},8,["class"])]),_:3})}}});export{T as default};