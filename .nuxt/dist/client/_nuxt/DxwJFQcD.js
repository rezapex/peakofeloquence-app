import{k as M,aU as O,d as z,v as F,aO as k,aP as I,aQ as v,aV as w,E as e,b as c,ah as _,w as o,g as i,aj as C,e as d,t as b,c as U,ag as Q,F as q,f as u,aR as $,aW as H,aL as W,aM as G,j as J,s as S,aT as K,ac as X,an as Y}from"./DVjlGSOL.js";import{_ as Z,a as tt}from"./DLYsZGzR.js";import et from"./Di3OMgVh.js";import{_ as at,a as nt}from"./DgjedOvT.js";import"./hQlUnJBc.js";function ot(m){let a;return a=M().$nuxtSiteConfig.get(m),Object.entries(a).forEach(([s,r])=>{a[s]=O(r)}),a}const st=d("span",{class:"text-gray-500 dark:text-gray-400"},"·",-1),rt={class:"text-gray-500 dark:text-gray-400"},ct={class:"flex flex-wrap items-center gap-3 mt-4"},it={key:1},gt=z({__name:"[slug]",async setup(m){var h,y,x;let a,s;const r=F(),{data:t}=([a,s]=k(()=>$(r.path,()=>S(r.path).findOne(),"$LEmP2wQsop")),a=await a,s(),a);if(!t.value)throw I({statusCode:404,statusMessage:"Post not found",fatal:!0});const{data:p}=([a,s]=k(()=>$(`${r.path}-surround`,()=>S("/blog").where({_extension:"md"}).without(["body","excerpt"]).sort({date:-1}).findSurround(K(r.path)),{default:()=>[]})),a=await a,s(),a),g=((h=t.value.head)==null?void 0:h.title)||t.value.title,f=((y=t.value.head)==null?void 0:y.description)||t.value.description;if(v({title:g,ogTitle:g,description:f,ogDescription:f}),(x=t.value.image)!=null&&x.src){const l=ot();v({ogImage:w(l.url,t.value.image.src),twitterImage:w(l.url,t.value.image.src)})}return(l,_t)=>{const B=H,P=X,V=Y,D=Z,E=et,L=at,N=tt,R=nt,T=W,j=G;return e(t)?(c(),_(j,{key:0},{default:o(()=>[i(D,{title:e(t).title,description:e(t).description},{headline:o(()=>[i(B,C(e(t).badge,{variant:"subtle"}),null,16),st,d("time",rt,b(new Date(e(t).date).toLocaleDateString("en",{year:"numeric",month:"short",day:"numeric"})),1)]),default:o(()=>[d("div",ct,[(c(!0),U(q,null,Q(e(t).authors,(n,A)=>(c(),_(V,{key:A,to:n.to,color:"white",target:"_blank",size:"sm"},{default:o(()=>[i(P,C(n.avatar,{alt:n.name,size:"2xs"}),null,16,["alt"]),J(" "+b(n.name),1)]),_:2},1032,["to"]))),128))])]),_:1},8,["title","description"]),i(T,null,{right:o(()=>[e(t).body&&e(t).body.toc?(c(),_(R,{key:0,links:e(t).body.toc.links},null,8,["links"])):u("",!0)]),default:o(()=>[i(N,{prose:""},{default:o(()=>{var n;return[e(t)&&e(t).body?(c(),_(E,{key:0,value:e(t)},null,8,["value"])):u("",!0),(n=e(p))!=null&&n.length?(c(),U("hr",it)):u("",!0),i(L,{surround:e(p)},null,8,["surround"])]}),_:1})]),_:1})]),_:1})):u("",!0)}}});export{gt as default};