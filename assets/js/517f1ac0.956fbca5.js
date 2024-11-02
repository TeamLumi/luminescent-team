"use strict";(self.webpackChunkluminescent_team=self.webpackChunkluminescent_team||[]).push([[606569],{603905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var r=n(667294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,f=u["".concat(c,".").concat(d)]||u[d]||s[d]||l;return n?r.createElement(f,o(o({ref:t},m),{},{components:n})):r.createElement(f,o({ref:t},m))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},292349:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>s,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var r=n(487462),a=(n(667294),n(603905));const l={},o="(30) _IF_JUMP",i={unversionedId:"scripting/commands/logic/if-jump",id:"scripting/commands/logic/if-jump",title:"(30) _IF_JUMP",description:"Effect",source:"@site/rom-hacking/scripting/commands/logic/030-if-jump.md",sourceDirName:"scripting/commands/logic",slug:"/scripting/commands/logic/if-jump",permalink:"/rom-hacking/scripting/commands/logic/if-jump",draft:!1,tags:[],version:"current",sidebarPosition:30,frontMatter:{},sidebar:"docs",previous:{title:"(29) _RET",permalink:"/rom-hacking/scripting/commands/logic/ret"},next:{title:"(31) _IF_CALL",permalink:"/rom-hacking/scripting/commands/logic/if-call"}},c={},p=[{value:"Effect",id:"effect",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Example",id:"example",level:2}],m={toc:p},u="wrapper";function s(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"30-_if_jump"},"(30) _IF_JUMP"),(0,a.kt)("h2",{id:"effect"},"Effect"),(0,a.kt)("p",null,"Checks the result of the previous comparison command, then jumps to a script if the result matches the given comparison operator."),(0,a.kt)("p",null,"The position of the jump is not saved. Execution does not return to this command once a _RET is executed."),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"_IF_JUMP(comparison, label)\n")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Argument"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Required"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"td"},"comparison")),(0,a.kt)("td",{parentName:"tr",align:null},"The comparison operator to use"),(0,a.kt)("td",{parentName:"tr",align:null},"String"),(0,a.kt)("td",{parentName:"tr",align:null},"Required")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"td"},"label")),(0,a.kt)("td",{parentName:"tr",align:null},"The label to jump to"),(0,a.kt)("td",{parentName:"tr",align:null},"String"),(0,a.kt)("td",{parentName:"tr",align:null},"Required")))),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"_LDVAL(@LOCALWORK4, 9)\n_LDVAL(@LOCALWORK8, 13)\n_LDVAL(@LOCALWORK1, 4)\n_CMPWK(@LOCALWORK1, 8)\n_IF_JUMP('GT', 'ev_dummy')\n")),(0,a.kt)("p",null,"The above script will set:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Work variable @LOCALWORK4 to 9;"),(0,a.kt)("li",{parentName:"ul"},"Work variable @LOCALWORK8 to 13;"),(0,a.kt)("li",{parentName:"ul"},"Work variable @LOCALWORK1 to 4.")),(0,a.kt)("p",null,"Then, the values of work 4 (@LOCALWORK4) and work 8 (@LOCALWORK8) are compared. Due to a bug, no matter their values, @LOCALWORK4 is determined to be greater."),(0,a.kt)("p",null,'Next, the result of the comparison is checked. Since the result is "greater", ev_dummy is jumped to.'))}s.isMDXComponent=!0}}]);