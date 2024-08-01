"use strict";(self.webpackChunkluminescent_team=self.webpackChunkluminescent_team||[]).push([[3070],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),u=p(n),f=a,d=u["".concat(c,".").concat(f)]||u[f]||s[f]||i;return n?r.createElement(d,l(l({ref:t},m),{},{components:n})):r.createElement(d,l({ref:t},m))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=f;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[u]="string"==typeof e?e:a,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},87105:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var r=n(87462),a=(n(67294),n(3905));const i={},l="(55) _IF_TR_FLAGOFF_JUMP",o={unversionedId:"scripting/commands/logic/if-tr-flagoff-jump",id:"scripting/commands/logic/if-tr-flagoff-jump",title:"(55) _IF_TR_FLAGOFF_JUMP",description:"Effect",source:"@site/rom-hacking/scripting/commands/logic/055-if-tr-flagoff-jump.md",sourceDirName:"scripting/commands/logic",slug:"/scripting/commands/logic/if-tr-flagoff-jump",permalink:"/rom-hacking/scripting/commands/logic/if-tr-flagoff-jump",draft:!1,tags:[],version:"current",sidebarPosition:55,frontMatter:{},sidebar:"docs",previous:{title:"(54) _IF_TR_FLAGON_JUMP",permalink:"/rom-hacking/scripting/commands/logic/if-tr-flagon-jump"},next:{title:"(56) _IF_TR_FLAGON_CALL",permalink:"/rom-hacking/scripting/commands/logic/if-tr-flagon-call"}},c={},p=[{value:"Effect",id:"effect",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Example",id:"example",level:2}],m={toc:p},u="wrapper";function s(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"55-_if_tr_flagoff_jump"},"(55) _IF_TR_FLAGOFF_JUMP"),(0,a.kt)("h2",{id:"effect"},"Effect"),(0,a.kt)("p",null,"Checks the trainer flag of the given trainer and jumps to a script if the trainer is not defeated."),(0,a.kt)("p",null,"The position of the jump is not saved. Execution does not return to this command once a _RET is executed."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The VS. Seeker does not affect this result.")),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"_IF_TR_FLAGOFF_JUMP(trainer, label)\n")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Argument"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Required"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"td"},"trainer")),(0,a.kt)("td",{parentName:"tr",align:null},"The trainer id, or the name of the value in the TrainerID enum"),(0,a.kt)("td",{parentName:"tr",align:null},"Work, Float, String"),(0,a.kt)("td",{parentName:"tr",align:null},"Required")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"td"},"label")),(0,a.kt)("td",{parentName:"tr",align:null},"The label to jump to"),(0,a.kt)("td",{parentName:"tr",align:null},"String"),(0,a.kt)("td",{parentName:"tr",align:null},"Required")))),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"_LDVAL(@LOCALWORK1, 3)\n_IF_TR_FLAGOFF_JUMP(@LOCALWORK1, 'ev_dummy')\n")),(0,a.kt)("p",null,"The above script will set the work variable @LOCALWORK1 to 3."),(0,a.kt)("p",null,"Then, the trainer id contained in @LOCALWORK1 (in this case 3) is the one that is checked. This corresponds to MINI_01 in the TrainerID enum."),(0,a.kt)("p",null,"The jump to ev_dummy will only occur if MINI_01 has not been defeated."))}s.isMDXComponent=!0}}]);