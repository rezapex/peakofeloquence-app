import{_ as w,a as U}from"./D9Len4xq.js";import x from"./D-OzNSTq.js";import{_ as P,a as S}from"./CzLgCKe1.js";import{d as B,v as b,ak as d,al as A,am as E,G as N,aa as t,b as i,N as p,a1 as T,w as c,f as l,an as m,aj as D,g as r,c as H,s as f,ao as M}from"./BbSRIczt.js";import{a as R}from"./CE46u1-S.js";import"./3hi_jmFZ.js";import"./BIURV-Yl.js";const V={key:1},L=B({__name:"[...slug]",async setup(j){let a,o;const s=b(),{data:e}=([a,o]=d(()=>m(s.path,()=>f(s.path).findOne(),"$Ea4Un4CAQ4")),a=await a,o(),a);if(!e.value)throw A({statusCode:404,statusMessage:"Page not found",fatal:!0});const{data:u}=([a,o]=d(()=>m(`${s.path}-surround`,()=>f("/resources").where({_extension:"md",navigation:{$ne:!1}}).only(["title","description","_path"]).findSurround(M(s.path)),{default:()=>[]})),a=await a,o(),a);E({title:e.value.title,ogTitle:e.value.title,description:e.value.description,ogDescription:e.value.description});const h=N(()=>R(e.value));return(q,G)=>{const g=w,k=x,y=P,v=U,C=S,$=D;return t(e)?(i(),p($,{key:0},T({default:c(()=>[r(g,{title:t(e).title,description:t(e).description,links:t(e).links,headline:t(h)},null,8,["title","description","links","headline"]),r(v,{prose:""},{default:c(()=>{var n;return[t(e).body?(i(),p(k,{key:0,value:t(e)},null,8,["value"])):l("",!0),(n=t(u))!=null&&n.length?(i(),H("hr",V)):l("",!0),r(y,{surround:t(u)},null,8,["surround"])]}),_:1})]),_:2},[t(e).toc!==!1?{name:"right",fn:c(()=>{var n,_;return[r(C,{links:(_=(n=t(e).body)==null?void 0:n.toc)==null?void 0:_.links},null,8,["links"])]}),key:"0"}:void 0]),1024)):l("",!0)}}});export{L as default};