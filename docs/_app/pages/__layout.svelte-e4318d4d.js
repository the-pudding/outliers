import{S as K,i as x,s as Q,e as w,k as A,t as L,c as $,a as E,m as N,h as O,d,F as z,b as f,g as C,G as h,j as X,D,H as U,v as Y,I as Z,w as ee,x as te,y as se,J as le,K as ae,L as ne,q as G,o as H,B as oe}from"../chunks/index-96365d27.js";import{w as re}from"../chunks/wordmark-0849a013.js";function R(c,e,s){const l=c.slice();return l[5]=e[s],l}function V(c,e,s){const l=c.slice();return l[8]=e[s].hed,l[2]=e[s].url,l[9]=e[s].image,l}function B(c){let e,s,l,o,u,r,t=c[8]+"",i,p,k;return{c(){e=w("div"),s=w("a"),l=w("img"),u=A(),r=w("span"),i=L(t),k=A(),this.h()},l(_){e=$(_,"DIV",{class:!0});var m=E(e);s=$(m,"A",{href:!0,class:!0});var y=E(s);l=$(y,"IMG",{src:!0,alt:!0}),u=N(y),r=$(y,"SPAN",{class:!0});var S=E(r);i=O(S,t),S.forEach(d),y.forEach(d),k=N(m),m.forEach(d),this.h()},h(){z(l.src,o="https://pudding.cool/common/assets/thumbnails/640/"+c[9]+".jpg")||f(l,"src",o),f(l,"alt","thumbnail"),f(r,"class","svelte-1rwhon8"),f(s,"href",p="https://pudding.cool/"+c[2]),f(s,"class","svelte-1rwhon8"),f(e,"class","story svelte-1rwhon8")},m(_,m){C(_,e,m),h(e,s),h(s,l),h(s,u),h(s,r),h(r,i),h(e,k)},p(_,m){m&1&&!z(l.src,o="https://pudding.cool/common/assets/thumbnails/640/"+_[9]+".jpg")&&f(l,"src",o),m&1&&t!==(t=_[8]+"")&&X(i,t),m&1&&p!==(p="https://pudding.cool/"+_[2])&&f(s,"href",p)},d(_){_&&d(e)}}}function J(c){let e,s,l,o=c[5].name.toUpperCase()+"",u,r,t;return{c(){e=w("li"),s=w("a"),l=w("span"),u=L(o),t=A(),this.h()},l(i){e=$(i,"LI",{class:!0});var p=E(e);s=$(p,"A",{href:!0,class:!0});var k=E(s);l=$(k,"SPAN",{class:!0});var _=E(l);u=O(_,o),_.forEach(d),k.forEach(d),t=N(p),p.forEach(d),this.h()},h(){f(l,"class","svelte-1rwhon8"),f(s,"href",r=c[5].url),f(s,"class","svelte-1rwhon8"),f(e,"class","svelte-1rwhon8")},m(i,p){C(i,e,p),h(e,s),h(s,l),h(l,u),h(e,t)},p:D,d(i){i&&d(e)}}}function ie(c){let e,s,l,o,u,r,t,i,p,k,_,m,y,S=c[0],v=[];for(let n=0;n<S.length;n+=1)v[n]=B(V(c,S,n));let j=c[1],g=[];for(let n=0;n<j.length;n+=1)g[n]=J(R(c,j,n));return{c(){e=w("footer"),s=w("section");for(let n=0;n<v.length;n+=1)v[n].c();l=A(),o=w("section"),u=w("div"),r=A(),t=w("p"),i=w("a"),p=L("The Pudding"),k=L(`
      is a digital publication that explains ideas debated in culture with visual essays.`),_=A(),m=w("section"),y=w("ul");for(let n=0;n<g.length;n+=1)g[n].c();this.h()},l(n){e=$(n,"FOOTER",{class:!0});var b=E(e);s=$(b,"SECTION",{class:!0});var a=E(s);for(let T=0;T<v.length;T+=1)v[T].l(a);a.forEach(d),l=N(b),o=$(b,"SECTION",{class:!0});var I=E(o);u=$(I,"DIV",{class:!0});var W=E(u);W.forEach(d),r=N(I),t=$(I,"P",{});var P=E(t);i=$(P,"A",{href:!0,class:!0});var F=E(i);p=O(F,"The Pudding"),F.forEach(d),k=O(P,`
      is a digital publication that explains ideas debated in culture with visual essays.`),P.forEach(d),I.forEach(d),_=N(b),m=$(b,"SECTION",{class:!0});var M=E(m);y=$(M,"UL",{class:!0});var q=E(y);for(let T=0;T<g.length;T+=1)g[T].l(q);q.forEach(d),M.forEach(d),b.forEach(d),this.h()},h(){f(s,"class","stories svelte-1rwhon8"),f(u,"class","wordmark svelte-1rwhon8"),f(i,"href","https://pudding.cool"),f(i,"class","svelte-1rwhon8"),f(o,"class","about svelte-1rwhon8"),f(y,"class","svelte-1rwhon8"),f(m,"class","links svelte-1rwhon8"),f(e,"class","svelte-1rwhon8")},m(n,b){C(n,e,b),h(e,s);for(let a=0;a<v.length;a+=1)v[a].m(s,null);h(e,l),h(e,o),h(o,u),u.innerHTML=re,h(o,r),h(o,t),h(t,i),h(i,p),h(t,k),h(e,_),h(e,m),h(m,y);for(let a=0;a<g.length;a+=1)g[a].m(y,null)},p(n,[b]){if(b&1){S=n[0];let a;for(a=0;a<S.length;a+=1){const I=V(n,S,a);v[a]?v[a].p(I,b):(v[a]=B(I),v[a].c(),v[a].m(s,null))}for(;a<v.length;a+=1)v[a].d(1);v.length=S.length}if(b&2){j=n[1];let a;for(a=0;a<j.length;a+=1){const I=R(n,j,a);g[a]?g[a].p(I,b):(g[a]=J(I),g[a].c(),g[a].m(y,null))}for(;a<g.length;a+=1)g[a].d(1);g.length=j.length}},i:D,o:D,d(n){n&&d(e),U(v,n),U(g,n)}}}function ce(c,e,s){let l,o=[];const r=`https://pudding.cool/assets/data/stories.json?v=${Date.now()}`,t=[{name:"about",url:"https://pudding.cool/about"},{name:"facebook",url:"https://facebook.com/pudding.viz/"},{name:"twitter",url:"https://twitter.com/puddingviz/"},{name:"instagram",url:"https://www.instagram.com/the.pudding"},{name:"patreon",url:"https://patreon.com/thepudding/"},{name:"privacy",url:"https://pudding.cool/privacy/"},{name:"newsletter",url:"http://eepurl.com/czym6f"},{name:"rss",url:"https://pudding.cool/feed/index.xml"}];return Y(async()=>{l=window.location.href;const p=await(await fetch(r)).json();s(0,o=p.filter(k=>!l.includes(k.url)).slice(0,4))}),[o,t,r]}class ue extends K{constructor(e){super(),x(this,e,ce,ie,Q,{})}}function he(c){let e,s,l,o;const u=c[1].default,r=Z(u,c,c[0],null);return l=new ue({}),{c(){e=w("main"),r&&r.c(),s=A(),ee(l.$$.fragment),this.h()},l(t){e=$(t,"MAIN",{id:!0});var i=E(e);r&&r.l(i),i.forEach(d),s=N(t),te(l.$$.fragment,t),this.h()},h(){f(e,"id","content")},m(t,i){C(t,e,i),r&&r.m(e,null),C(t,s,i),se(l,t,i),o=!0},p(t,[i]){r&&r.p&&(!o||i&1)&&le(r,u,t,t[0],o?ne(u,t[0],i,null):ae(t[0]),null)},i(t){o||(G(r,t),G(l.$$.fragment,t),o=!0)},o(t){H(r,t),H(l.$$.fragment,t),o=!1},d(t){t&&d(e),r&&r.d(t),t&&d(s),oe(l,t)}}}function fe(c,e,s){let{$$slots:l={},$$scope:o}=e;return c.$$set=u=>{"$$scope"in u&&s(0,o=u.$$scope)},[o,l]}class _e extends K{constructor(e){super(),x(this,e,fe,he,Q,{})}}export{_e as default};
