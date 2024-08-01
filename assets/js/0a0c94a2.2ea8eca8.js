"use strict";(self.webpackChunkluminescent_team=self.webpackChunkluminescent_team||[]).push([[47993],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),m=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=m(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=m(n),d=a,f=u["".concat(c,".").concat(d)]||u[d]||s[d]||i;return n?r.createElement(f,l(l({ref:t},p),{},{components:n})):r.createElement(f,l({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[u]="string"==typeof e?e:a,l[1]=o;for(var m=2;m<i;m++)l[m]=n[m];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},48193:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>m});var r=n(87462),a=(n(67294),n(3905));const i={},l="(775) _AC_DIR_D",o={unversionedId:"scripting/animation-commands/ac-dir-d",id:"scripting/animation-commands/ac-dir-d",title:"(775) _AC_DIR_D",description:"Effect",source:"@site/rom-hacking/scripting/animation-commands/775-ac-dir-d.md",sourceDirName:"scripting/animation-commands",slug:"/scripting/animation-commands/ac-dir-d",permalink:"/rom-hacking/scripting/animation-commands/ac-dir-d",draft:!1,tags:[],version:"current",sidebarPosition:775,frontMatter:{},sidebar:"docs",previous:{title:"(774) _AC_DIR_R",permalink:"/rom-hacking/scripting/animation-commands/ac-dir-r"},next:{title:"(776) _AC_DIR_L",permalink:"/rom-hacking/scripting/animation-commands/ac-dir-l"}},c={},m=[{value:"Effect",id:"effect",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Example",id:"example",level:2}],p={toc:m},u="wrapper";function s(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"775-_ac_dir_d"},"(775) _AC_DIR_D"),(0,a.kt)("h2",{id:"effect"},"Effect"),(0,a.kt)("p",null,"Turns the entity of the animation down over a given amount of frames."),(0,a.kt)("p",null,"The entity always makes the smallest turn possible. If the ",(0,a.kt)("strong",{parentName:"p"},"invert")," argument is provided, the entity will turn the longer way around."),(0,a.kt)("p",null,"Starts the stepping sound effect."),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"_AC_DIR_D(time, invert?)\n")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Argument"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Required"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"td"},"time")),(0,a.kt)("td",{parentName:"tr",align:null},"The amount of time to turn, in frames"),(0,a.kt)("td",{parentName:"tr",align:null},"Float"),(0,a.kt)("td",{parentName:"tr",align:null},"Required")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"td"},"invert")),(0,a.kt)("td",{parentName:"tr",align:null},"Whether to invert the turn"),(0,a.kt)("td",{parentName:"tr",align:null},"Any"),(0,a.kt)("td",{parentName:"tr",align:null},"Optional")))),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"anm_dummy:\n_AC_DIR_D(8)\n_ACMD_END()\n")),(0,a.kt)("p",null,"The above script will turn the entity down over 8 frames."))}s.isMDXComponent=!0}}]);