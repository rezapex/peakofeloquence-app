function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./CFaeBTaY.js","./D8UErqBy.js","./entry.8lQfE3Ql.css","./DWL4WaSy.js","./C78gyA8e.js","./ContentSearch.Df7FdNLH.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{d as f,aB as m,bD as v,p as b,R as h,S as y,ad as a,$ as s,a0 as C,u as _,aE as g,bE as $,bF as x,bG as E,bH as A,bI as B,bJ as D,bB as w}from"./D8UErqBy.js";const z=B(()=>D(()=>import("./CFaeBTaY.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url).then(t=>t.default||t)),S=f({__name:"default",async setup(t){let n,e;const{data:o}=([n,e]=m(()=>g("navigation",()=>w(),{default:()=>[]})),n=await n,e(),n),{data:i}=v("/api/search.json",{default:()=>[],server:!1},"$i9bCpVDU6M");return b("navigation",o),(c,F)=>{const l=$,r=x,u=E,p=z,d=A;return h(),y("div",null,[a(l),a(r,null,{default:s(()=>[C(c.$slots,"default")]),_:3}),a(u),a(d,null,{default:s(()=>[a(p,{files:_(i),navigation:_(o)},null,8,["files","navigation"])]),_:1})])}}});export{S as default};
