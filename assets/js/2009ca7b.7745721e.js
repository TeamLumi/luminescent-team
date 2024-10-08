"use strict";(self.webpackChunkluminescent_team=self.webpackChunkluminescent_team||[]).push([[566705],{603905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var r=n(667294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),s=p(n),d=a,f=s["".concat(c,".").concat(d)]||s[d]||u[d]||i;return n?r.createElement(f,l(l({ref:t},m),{},{components:n})):r.createElement(f,l({ref:t},m))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[s]="string"==typeof e?e:a,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},506850:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var r=n(487462),a=(n(667294),n(603905));const i={},l="(147) _OBJ_DEL",o={unversionedId:"scripting/commands/interface/obj-del",id:"scripting/commands/interface/obj-del",title:"(147) _OBJ_DEL",description:"Effect",source:"@site/rom-hacking/scripting/commands/interface/147-obj-del.md",sourceDirName:"scripting/commands/interface",slug:"/scripting/commands/interface/obj-del",permalink:"/rom-hacking/scripting/commands/interface/obj-del",draft:!1,tags:[],version:"current",sidebarPosition:147,frontMatter:{},sidebar:"docs",previous:{title:"(146) _OBJ_ADD",permalink:"/rom-hacking/scripting/commands/interface/obj-add"},next:{title:"(306) _PLAYER_NAME",permalink:"/rom-hacking/scripting/commands/interface/player-name"}},c={},p=[{value:"Effect",id:"effect",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Example",id:"example",level:2}],m={toc:p},s="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"147-_obj_del"},"(147) _OBJ_DEL"),(0,a.kt)("h2",{id:"effect"},"Effect"),(0,a.kt)("p",null,"Permanently hides a PlaceData and sets its visibility flag."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The visibility flag is touched, unlike ",(0,a.kt)("a",{parentName:"p",href:"/rom-hacking/scripting/commands/interface/obj-add"},"_OBJ_ADD")," which doesn't touch it.")),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"_OBJ_DEL(id)\n")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Argument"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Required"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"td"},"id")),(0,a.kt)("td",{parentName:"tr",align:null},"The ID of the PlaceData"),(0,a.kt)("td",{parentName:"tr",align:null},"Float"),(0,a.kt)("td",{parentName:"tr",align:null},"Required")))),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"ev_dummy:\n_OBJ_DEL('T01_WOMAN1')\n_END()\n")),(0,a.kt)("p",null,"The above script will hide the PlaceData with the ID 'T01_WOMAN1' at its position defined in the corresponding PlaceData file."),(0,a.kt)("p",null,"The above PlaceData should also be found in Vanilla BDSP in the file 'PlaceData_A01.json'."))}u.isMDXComponent=!0}}]);