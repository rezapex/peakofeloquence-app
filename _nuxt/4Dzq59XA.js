import{_ as $,a as U}from"./DL9mOBGf.js";import x from"./Cf7l5UsR.js";import{_ as P,a as S}from"./BqO4Lc40.js";import{d as b,v as B,am as d,an as M,ao as N,G as R,ab as t,b as r,N as p,a1 as T,w as c,f as l,ap as m,aq as q,al as A,g as i,c as D,s as f,ar as E}from"./Dny3plqr.js";import"./EZKriVj8.js";const H={key:1},K=b({__name:"[...slug]",async setup(O){let a,o;const s=B(),{data:e}=([a,o]=d(()=>m(s.path,()=>f(s.path).findOne(),"$UMOUItaw9R")),a=await a,o(),a);if(!e.value)throw M({statusCode:404,statusMessage:"Page not found",fatal:!0});const{data:u}=([a,o]=d(()=>m(`${s.path}-surround`,()=>f("/docs").where({_extension:"md",navigation:{$ne:!1}}).only(["title","description","_path"]).findSurround(E(s.path)),{default:()=>[]})),a=await a,o(),a);N({title:e.value.title,ogTitle:e.value.title,description:e.value.description,ogDescription:e.value.description});const h=R(()=>q(e.value));return(V,G)=>{const g=$,k=x,y=P,v=U,w=S,C=A;return t(e)?(r(),p(C,{key:0},T({default:c(()=>[i(g,{title:t(e).title,description:t(e).description,links:t(e).links,headline:t(h)},null,8,["title","description","links","headline"]),i(v,{prose:""},{default:c(()=>{var n;return[t(e).body?(r(),p(k,{key:0,value:t(e)},null,8,["value"])):l("",!0),(n=t(u))!=null&&n.length?(r(),D("hr",H)):l("",!0),i(y,{surround:t(u)},null,8,["surround"])]}),_:1})]),_:2},[t(e).toc!==!1?{name:"right",fn:c(()=>{var n,_;return[i(w,{links:(_=(n=t(e).body)==null?void 0:n.toc)==null?void 0:_.links},null,8,["links"])]}),key:"0"}:void 0]),1024)):l("",!0)}}});export{K as default};