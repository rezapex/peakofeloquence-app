import{_ as w,a as x}from"./D7igYmKc.js";import B from"./Bty6Ok_w.js";import{_ as P,a as S}from"./CNqz8n1Z.js";import{d as U,aA as R,aB as _,aC as b,aD as A,c as D,u as t,R as i,Z as p,af as E,$ as c,ad as r,W as l,S as H,aE as m,aF as T,ax as M,aG as f,aH as N}from"./D8UErqBy.js";import"./vuyRI7SM.js";const V={key:1},z=U({__name:"[...slug]",async setup(Z){let a,o;const s=R(),{data:e}=([a,o]=_(()=>m(s.path,()=>f(s.path).findOne(),"$P5dhnBsQvZ")),a=await a,o(),a);if(!e.value)throw b({statusCode:404,statusMessage:"Page not found",fatal:!0});const{data:u}=([a,o]=_(()=>m(`${s.path}-surround`,()=>f("/about").where({_extension:"md",navigation:{$ne:!1}}).only(["title","description","_path"]).findSurround(N(s.path)),{default:()=>[]})),a=await a,o(),a);A({title:e.value.title,ogTitle:e.value.title,description:e.value.description,ogDescription:e.value.description});const h=D(()=>T(e.value));return(q,F)=>{const g=w,k=B,y=P,v=x,C=S,$=M;return t(e)?(i(),p($,{key:0},E({default:c(()=>[r(g,{title:t(e).title,description:t(e).description,links:t(e).links,headline:t(h)},null,8,["title","description","links","headline"]),r(v,{prose:""},{default:c(()=>{var n;return[t(e).body?(i(),p(k,{key:0,value:t(e)},null,8,["value"])):l("",!0),(n=t(u))!=null&&n.length?(i(),H("hr",V)):l("",!0),r(y,{surround:t(u)},null,8,["surround"])]}),_:1})]),_:2},[t(e).toc!==!1?{name:"right",fn:c(()=>{var n,d;return[r(C,{links:(d=(n=t(e).body)==null?void 0:n.toc)==null?void 0:d.links},null,8,["links"])]}),key:"0"}:void 0]),1024)):l("",!0)}}});export{z as default};
