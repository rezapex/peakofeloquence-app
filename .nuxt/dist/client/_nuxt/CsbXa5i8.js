import{_ as $,a as P}from"./B5JQl_HF.js";import x from"./rNuL9M2H.js";import{_ as B,a as S}from"./DKEzeeCF.js";import{d as U,v as b,aP as _,aQ as R,aR as T,D,E as t,b as i,ah as p,av as E,w as c,g as r,f as l,c as V,aT as m,b2 as A,aL as H,s as f,aV as M}from"./9BiHR6_y.js";import"./CP6626X0.js";const N={key:1},G=U({__name:"[...slug]",async setup(Q){let n,o;const s=b(),{data:e}=([n,o]=_(()=>m(s.path,()=>f(s.path).findOne(),"$P5dhnBsQvZ")),n=await n,o(),n);if(!e.value)throw R({statusCode:404,statusMessage:"Page not found",fatal:!0});const{data:u}=([n,o]=_(()=>m(`${s.path}-surround`,()=>f("/docs").where({_extension:"md",navigation:{$ne:!1}}).only(["title","description","_path"]).findSurround(M(s.path)),{default:()=>[]})),n=await n,o(),n);T({title:e.value.title,ogTitle:e.value.title,description:e.value.description,ogDescription:e.value.description});const h=D(()=>A(e.value));return(q,L)=>{const g=$,k=x,v=B,y=P,C=S,w=H;return t(e)?(i(),p(w,{key:0},E({default:c(()=>[r(g,{title:t(e).title,description:t(e).description,links:t(e).links,headline:t(h)},null,8,["title","description","links","headline"]),r(y,{prose:""},{default:c(()=>{var a;return[t(e).body?(i(),p(k,{key:0,value:t(e)},null,8,["value"])):l("",!0),(a=t(u))!=null&&a.length?(i(),V("hr",N)):l("",!0),r(v,{surround:t(u)},null,8,["surround"])]}),_:1})]),_:2},[t(e).toc!==!1?{name:"right",fn:c(()=>{var a,d;return[r(C,{links:(d=(a=t(e).body)==null?void 0:a.toc)==null?void 0:d.links},null,8,["links"])]}),key:"0"}:void 0]),1024)):l("",!0)}}});export{G as default};
