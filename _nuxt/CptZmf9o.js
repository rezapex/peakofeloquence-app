import{_ as $,a as x}from"./D9Len4xq.js";import P from"./D-OzNSTq.js";import{_ as S,a as U}from"./CzLgCKe1.js";import{d as b,v as B,ak as d,al as M,am as N,G as T,aa as t,b as r,N as m,a1 as A,w as c,f as l,an as p,aj as D,g as i,c as E,s as f,ao as H}from"./BbSRIczt.js";import{a as R}from"./CE46u1-S.js";import"./3hi_jmFZ.js";import"./BIURV-Yl.js";const V={key:1},L=b({__name:"[...slug]",async setup(j){let a,o;const s=B(),{data:e}=([a,o]=d(()=>p(s.path,()=>f(s.path).findOne(),"$muXn53wxM3")),a=await a,o(),a);if(!e.value)throw M({statusCode:404,statusMessage:"Page not found",fatal:!0});const{data:u}=([a,o]=d(()=>p(`${s.path}-surround`,()=>f("/about").where({_extension:"md",navigation:{$ne:!1}}).only(["title","description","_path"]).findSurround(H(s.path)),{default:()=>[]})),a=await a,o(),a);N({title:e.value.title,ogTitle:e.value.title,description:e.value.description,ogDescription:e.value.description});const h=T(()=>R(e.value));return(q,G)=>{const g=$,k=P,y=S,v=x,w=U,C=D;return t(e)?(r(),m(C,{key:0},A({default:c(()=>[i(g,{title:t(e).title,description:t(e).description,links:t(e).links,headline:t(h)},null,8,["title","description","links","headline"]),i(v,{prose:""},{default:c(()=>{var n;return[t(e).body?(r(),m(k,{key:0,value:t(e)},null,8,["value"])):l("",!0),(n=t(u))!=null&&n.length?(r(),E("hr",V)):l("",!0),i(y,{surround:t(u)},null,8,["surround"])]}),_:1})]),_:2},[t(e).toc!==!1?{name:"right",fn:c(()=>{var n,_;return[i(w,{links:(_=(n=t(e).body)==null?void 0:n.toc)==null?void 0:_.links},null,8,["links"])]}),key:"0"}:void 0]),1024)):l("",!0)}}});export{L as default};