import{_ as $,a as P}from"./OzCsYVLV.js";import S from"./DztmoR53.js";import{_ as U,a as x}from"./Dlnn0pS2.js";import{d as B,v as E,aO as _,aP as R,aQ as T,D as b,E as t,b as i,ah as p,av as A,w as c,g as r,f as l,c as D,aR as m,aS as H,aL as M,s as f,aT as N}from"./BxBOaLbe.js";import"./3pfDMsKC.js";const O={key:1},I=B({__name:"[...slug]",async setup(Q){let a,o;const s=E(),{data:e}=([a,o]=_(()=>m(s.path,()=>f(s.path).findOne(),"$Ea4Un4CAQ4")),a=await a,o(),a);if(!e.value)throw R({statusCode:404,statusMessage:"Page not found",fatal:!0});const{data:u}=([a,o]=_(()=>m(`${s.path}-surround`,()=>f("/resources").where({_extension:"md",navigation:{$ne:!1}}).only(["title","description","_path"]).findSurround(N(s.path)),{default:()=>[]})),a=await a,o(),a);T({title:e.value.title,ogTitle:e.value.title,description:e.value.description,ogDescription:e.value.description});const h=b(()=>H(e.value));return(V,q)=>{const g=$,k=S,v=U,y=P,C=x,w=M;return t(e)?(i(),p(w,{key:0},A({default:c(()=>[r(g,{title:t(e).title,description:t(e).description,links:t(e).links,headline:t(h)},null,8,["title","description","links","headline"]),r(y,{prose:""},{default:c(()=>{var n;return[t(e).body?(i(),p(k,{key:0,value:t(e)},null,8,["value"])):l("",!0),(n=t(u))!=null&&n.length?(i(),D("hr",O)):l("",!0),r(v,{surround:t(u)},null,8,["surround"])]}),_:1})]),_:2},[t(e).toc!==!1?{name:"right",fn:c(()=>{var n,d;return[r(C,{links:(d=(n=t(e).body)==null?void 0:n.toc)==null?void 0:d.links},null,8,["links"])]}),key:"0"}:void 0]),1024)):l("",!0)}}});export{I as default};
