"use strict";(self.webpackChunkluminescent_team=self.webpackChunkluminescent_team||[]).push([[479967],{603905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var a=n(667294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),m=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=m(e.components);return a.createElement(c.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=m(n),d=r,f=s["".concat(c,".").concat(d)]||s[d]||u[d]||i;return n?a.createElement(f,o(o({ref:t},p),{},{components:n})):a.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:r,o[1]=l;for(var m=2;m<i;m++)o[m]=n[m];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},33671:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>m});var a=n(487462),r=(n(667294),n(603905));const i={},o="(900) _AC_MARK_EMO",l={unversionedId:"scripting/animation-commands/ac-mark-emo",id:"scripting/animation-commands/ac-mark-emo",title:"(900) _AC_MARK_EMO",description:"Effect",source:"@site/rom-hacking/scripting/animation-commands/900-ac-mark-emo.md",sourceDirName:"scripting/animation-commands",slug:"/scripting/animation-commands/ac-mark-emo",permalink:"/rom-hacking/scripting/animation-commands/ac-mark-emo",draft:!1,tags:[],version:"current",sidebarPosition:900,frontMatter:{},sidebar:"docs",previous:{title:"(871) _AC_INDEX_ANIME_WAIT",permalink:"/rom-hacking/scripting/animation-commands/ac-index-anime-wait"},next:{title:"ExeFS Editing",permalink:"/rom-hacking/category/exefs"}},c={},m=[{value:"Effect",id:"effect",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Example",id:"example",level:2}],p={toc:m},s="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(s,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"900-_ac_mark_emo"},"(900) _AC_MARK_EMO"),(0,r.kt)("h2",{id:"effect"},"Effect"),(0,r.kt)("p",null,"Displays an emotion bubble above the entity's head. The list of emotions can be found at the bottom of this page."),(0,r.kt)("p",null,"The bubble lasts for 1.5 seconds."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Passing an invalid emotion displays a heart and softlocks the game.")),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"_AC_MARK_EMO(emotion)\n")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Argument"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"emotion")),(0,r.kt)("td",{parentName:"tr",align:null},"The emotion to display"),(0,r.kt)("td",{parentName:"tr",align:null},"Float"),(0,r.kt)("td",{parentName:"tr",align:null},"Required")))),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"anm_dummy:\n_AC_MARK_EMO(2)\n_ACMD_END()\n")),(0,r.kt)("p",null,"The above script will display a heart above the entity's head."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"A list of animations can be found ",(0,r.kt)("a",{parentName:"p",href:"/rom-hacking/dictionary/chibi-emotions"},"here"),".")))}u.isMDXComponent=!0}}]);