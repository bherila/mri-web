(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{152:function(t,e,n){"use strict";n.r(e),n(200),n(202),n(77);var r=n(12),o=n.n(r),a=n(0),i=n(205),u=n(161),s=n(167),c=function(t){function e(e,n){var r;return(r=t.call(this,e,n)||this).state={fname:"",lname:"",scan:"",times:null,err:null,offset:0,total:0},r}o()(e,t);var n=e.prototype;return n.componentDidMount=function(){var t=this;if("undefined"!=typeof sessionStorage){var e=sessionStorage.getItem("fname")||"",n=sessionStorage.getItem("lname")||"",r=JSON.parse(sessionStorage.getItem("scan")||"{}"),o="true"===sessionStorage.getItem("haveOrder");this.setState({fname:e,lname:n,haveOrder:o,scan:r})}(new i.b).timeSlotsGET({contrast:"false",locationId:""}).then(function(e){t.setState({times:e,total:e.length})},function(e){return t.setState({err:e})})},n.renderSlotAvailabilityDate=function(t){return a.createElement("div",{className:"timeslotcolumn"},a.createElement("h3",null,t.friendlyBegin),t.times?t.times.map(function(t){return a.createElement("a",{key:t.time,href:"/addl-info",className:"buttontimeslot "+(t.isAvailable?"":"unavailable ")+"w-button"},t.time)}):a.createElement("div",null,"dt.times is ",typeof t.times))},n.render=function(){var t=this,e=this.state,n=e.offset,r=e.total,o=e.err,i=e.times;return a.createElement(u.a,null,a.createElement("section",{id:"Q2",className:"vspace80 w-container"},a.createElement("div",null,a.createElement(s.a,{num:2}),a.createElement("div",{className:"breadcrumb-stack"},a.createElement(s.b,{value:this.state.scan}))),a.createElement("div",{className:"w-row"},a.createElement("div",{className:"centered w-col w-col-3"},a.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg",width:150,height:150})),a.createElement("div",{className:"w-col w-col-9"},a.createElement("h2",null,"Almost done!"),a.createElement("h3",null,"Choose an available time slot to book your appointment."),o&&a.createElement("p",null,"Oops! ",o.toString()))),a.createElement("div",{className:"w-row"},a.createElement("div",{className:"w-col w-col-2"},a.createElement("div",{className:"timeslotcolumn"},n>0&&a.createElement("a",{href:"#",onClick:function(){return t.setState({offset:n-1})},className:"buttontimeslot w-button"},"Later Dates >>"))),i&&i.map(function(e,r){return r>=n&&r-n<4&&a.createElement("div",{className:"w-col w-col-2"},t.renderSlotAvailabilityDate(e))}),n+4<r&&a.createElement("div",{className:"w-col w-col-2"},a.createElement("div",{className:"timeslotcolumn"},a.createElement("a",{href:"#",onClick:function(){return t.setState({offset:n+1})},className:"buttontimeslot w-button"},"Later Dates >>"))))))},e}(a.Component);e.default=c},162:function(t,e,n){var r=n(25).f,o=Function.prototype,a=/^\s*function ([^ (]*)/;"name"in o||n(15)&&r(o,"name",{configurable:!0,get:function(){try{return(""+this).match(a)[1]}catch(t){return""}}})},167:function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n.d(e,"c",function(){return i}),n.d(e,"b",function(){return u}),n.d(e,"d",function(){return s}),n(162);var r=n(0),o=function(t){return r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5be12c8e888fb5963088dc64_chevron-right-blue-2.svg",width:"38",height:"38",alt:"Chevron right",className:t.translucent?"translucent":""})},a=function(t){return r.createElement("div",null,r.createElement("div",{className:"breadcrumb-row"},r.createElement("div",{className:"circled "+(t.num<1?"translucent":"")},"1"),r.createElement(o,{translucent:t.num<2}),r.createElement("div",{className:"circled "+(t.num<2?"translucent":"")},"2"),r.createElement(o,{translucent:t.num<3}),r.createElement("div",{className:"circled "+(t.num<3?"translucent":"")},"3")),r.createElement("div",{className:"breadcrumb-row"},1===t.num&&r.createElement("h3",null,r.createElement("strong",null,"Step 1.")," Your details"),2===t.num&&r.createElement("h3",null,r.createElement("strong",null,"Step 2.")," Choose your scan"),3===t.num&&r.createElement("h3",null,r.createElement("strong",null,"Step 3.")," Health & Safety Information")))},i=function(t){var e=t.value;return r.createElement("a",{href:"/have-order",className:"breadcrumb w-button",style:{display:"none"}},e?"Have Doctor's Order":"No Order"," ✓")},u=function(t){var e=t.value;return"string"==typeof e?r.createElement("a",{href:"/mri-type",className:"breadcrumb w-button"},"Scan type: ",e):r.createElement("a",{href:"/mri-type",className:"breadcrumb w-button"},"Scan type: ",e.name||"e!name"," ",e.contrast||"e!contrast")},s=function(t){var e=t.value;return r.createElement("a",{href:"/pick-time",className:"breadcrumb w-button"},e," ",r.createElement("br",null),r.createElement("small",null,"(not yet reserved)"))}},169:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},170:function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},171:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},172:function(t,e,n){t.exports=!n(173)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},173:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},190:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},191:function(t,e,n){var r=n(192),o=n(193);t.exports=function(t){return r(o(t))}},192:function(t,e,n){var r=n(222);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},193:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},194:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},200:function(t,e,n){"use strict";n(245);var r=n(9),o=n(201),a=n(15),i=/./.toString,u=function(t){n(16)(RegExp.prototype,"toString",t,!0)};n(19)(function(){return"/a/b"!=i.call({source:"a",flags:"b"})})?u(function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!a&&t instanceof RegExp?o.call(t):void 0)}):"toString"!=i.name&&u(function(){return i.call(this)})},201:function(t,e,n){"use strict";var r=n(9);t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},202:function(t,e,n){var r=Date.prototype,o=r.toString,a=r.getTime;new Date(NaN)+""!="Invalid Date"&&n(16)(r,"toString",function(){var t=a.call(this);return t==t?o.call(this):"Invalid Date"})},205:function(t,e,n){"use strict";n.d(e,"a",function(){return f}),n.d(e,"b",function(){return w}),n(37);var r=n(12),o=n.n(r),a=(n(17),n(236)),i=n(206),u=n(207),s="http://mrisched.azurewebsites.net".replace(/\/+$/,""),c=function(t,e){void 0===t&&(t=i),void 0===e&&(e=s),this.basePath=void 0,this.fetch=void 0,this.basePath=e,this.fetch=t},l=function(t){var e=function(t){var e=a.parse("/api/question",!0),n=u({},{method:"GET"},t),r={};return r&&(n.headers=u({},r,n.headers)),{url:a.format(e),options:n}}(t);return function(t,n){return void 0===t&&(t=i),void 0===n&&(n=s),t(n+e.url,e.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},f=function(t){function e(){return t.apply(this,arguments)||this}return o()(e,t),e.prototype.getQuestions=function(t){return l(t)(this.fetch,this.basePath)},e}(c),h=function(t,e){var n=function(t,e){var n=a.parse("/api/timeslot/rules",!0);n.query=u({},n.query,{contrast:t.contrast,locationId:t.locationId});var r,o=u({},{method:"DELETE"},e);return r={"Content-Type":"application/json"},t.req&&(o.body=JSON.stringify(t.req||{})),r&&(o.headers=u({},r,o.headers)),{url:a.format(n),options:o}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},p=function(t,e){var n=function(t,e){var n=a.parse("/api/timeslot/rules",!0);n.query=u({},n.query,{contrast:t.contrast,locationId:t.locationId});var r=u({},{method:"GET"},e),o={};return o&&(r.headers=u({},o,r.headers)),{url:a.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},m=function(t,e){var n=function(t,e){var n=a.parse("/api/timeslot/rules",!0);n.query=u({},n.query,{contrast:t.contrast,locationId:t.locationId});var r,o=u({},{method:"POST"},e);return r={"Content-Type":"application/json"},t.req&&(o.body=JSON.stringify(t.req||{})),r&&(o.headers=u({},r,o.headers)),{url:a.format(n),options:o}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},d=function(t,e){var n=function(t,e){var n=a.parse("/api/timeslot/rules",!0);n.query=u({},n.query,{contrast:t.contrast,locationId:t.locationId});var r,o=u({},{method:"PUT"},e);return r={"Content-Type":"application/json"},t.req&&(o.body=JSON.stringify(t.req||{})),r&&(o.headers=u({},r,o.headers)),{url:a.format(n),options:o}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},v=function(t,e){var n=function(t,e){var n=a.parse("/api/timeslots",!0);n.query=u({},n.query,{contrast:t.contrast,locationId:t.locationId});var r=u({},{method:"GET"},e),o={};return o&&(r.headers=u({},o,r.headers)),{url:a.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},y=function(t,e){var n=function(t,e){var n=a.parse("/api/appointment",!0);n.query=u({},n.query,{authToken:t.authToken,search:t.search});var r,o=u({},{method:"DELETE"},e);return r={"Content-Type":"application/json"},t.req&&(o.body=JSON.stringify(t.req||{})),r&&(o.headers=u({},r,o.headers)),{url:a.format(n),options:o}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},b=function(t,e){var n=function(t,e){var n=a.parse("/api/appointment",!0);n.query=u({},n.query,{authToken:t.authToken,search:t.search});var r=u({},{method:"GET"},e),o={};return o&&(r.headers=u({},o,r.headers)),{url:a.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},E=function(t,e){var n=function(t,e){var n=a.parse("/api/appointment",!0);n.query=u({},n.query,{authToken:t.authToken,search:t.search});var r,o=u({},{method:"POST"},e);return r={"Content-Type":"application/json"},t.req&&(o.body=JSON.stringify(t.req||{})),r&&(o.headers=u({},r,o.headers)),{url:a.format(n),options:o}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},g=function(t,e){var n=function(t,e){var n=a.parse("/api/appointment",!0);n.query=u({},n.query,{authToken:t.authToken,search:t.search});var r,o=u({},{method:"PUT"},e);return r={"Content-Type":"application/json"},t.req&&(o.body=JSON.stringify(t.req||{})),r&&(o.headers=u({},r,o.headers)),{url:a.format(n),options:o}}(t,e);return function(t,e){return void 0===t&&(t=i),void 0===e&&(e=s),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},w=function(t){function e(){return t.apply(this,arguments)||this}o()(e,t);var n=e.prototype;return n.adminRulesDELETE=function(t,e){return h(t,e)(this.fetch,this.basePath)},n.adminRulesGET=function(t,e){return p(t,e)(this.fetch,this.basePath)},n.adminRulesPOST=function(t,e){return m(t,e)(this.fetch,this.basePath)},n.adminRulesPUT=function(t,e){return d(t,e)(this.fetch,this.basePath)},n.timeSlotsGET=function(t,e){return v(t,e)(this.fetch,this.basePath)},n.userScheduleDELETE=function(t,e){return y(t,e)(this.fetch,this.basePath)},n.userScheduleGET=function(t,e){return b(t,e)(this.fetch,this.basePath)},n.userSchedulePOST=function(t,e){return E(t,e)(this.fetch,this.basePath)},n.userSchedulePUT=function(t,e){return g(t,e)(this.fetch,this.basePath)},e}(c)},206:function(t,e,n){n(237),t.exports=self.fetch.bind(self)},207:function(t,e,n){n(208),t.exports=n(170).Object.assign},208:function(t,e,n){var r=n(209);r(r.S+r.F,"Object",{assign:n(219)})},209:function(t,e,n){var r=n(169),o=n(170),a=n(210),i=n(212),u=n(190),s=function(t,e,n){var c,l,f,h=t&s.F,p=t&s.G,m=t&s.S,d=t&s.P,v=t&s.B,y=t&s.W,b=p?o:o[e]||(o[e]={}),E=b.prototype,g=p?r:m?r[e]:(r[e]||{}).prototype;for(c in p&&(n=e),n)(l=!h&&g&&void 0!==g[c])&&u(b,c)||(f=l?g[c]:n[c],b[c]=p&&"function"!=typeof g[c]?n[c]:v&&l?a(f,r):y&&g[c]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):d&&"function"==typeof f?a(Function.call,f):f,d&&((b.virtual||(b.virtual={}))[c]=f,t&s.R&&E&&!E[c]&&i(E,c,f)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},210:function(t,e,n){var r=n(211);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},211:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},212:function(t,e,n){var r=n(213),o=n(218);t.exports=n(172)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},213:function(t,e,n){var r=n(214),o=n(215),a=n(217),i=Object.defineProperty;e.f=n(172)?Object.defineProperty:function(t,e,n){if(r(t),e=a(e,!0),r(n),o)try{return i(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},214:function(t,e,n){var r=n(171);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},215:function(t,e,n){t.exports=!n(172)&&!n(173)(function(){return 7!=Object.defineProperty(n(216)("div"),"a",{get:function(){return 7}}).a})},216:function(t,e,n){var r=n(171),o=n(169).document,a=r(o)&&r(o.createElement);t.exports=function(t){return a?o.createElement(t):{}}},217:function(t,e,n){var r=n(171);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},218:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},219:function(t,e,n){"use strict";var r=n(220),o=n(231),a=n(232),i=n(233),u=n(192),s=Object.assign;t.exports=!s||n(173)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=s({},t)[n]||Object.keys(s({},e)).join("")!=r})?function(t,e){for(var n=i(t),s=arguments.length,c=1,l=o.f,f=a.f;s>c;)for(var h,p=u(arguments[c++]),m=l?r(p).concat(l(p)):r(p),d=m.length,v=0;d>v;)f.call(p,h=m[v++])&&(n[h]=p[h]);return n}:s},220:function(t,e,n){var r=n(221),o=n(230);t.exports=Object.keys||function(t){return r(t,o)}},221:function(t,e,n){var r=n(190),o=n(191),a=n(223)(!1),i=n(226)("IE_PROTO");t.exports=function(t,e){var n,u=o(t),s=0,c=[];for(n in u)n!=i&&r(u,n)&&c.push(n);for(;e.length>s;)r(u,n=e[s++])&&(~a(c,n)||c.push(n));return c}},222:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},223:function(t,e,n){var r=n(191),o=n(224),a=n(225);t.exports=function(t){return function(e,n,i){var u,s=r(e),c=o(s.length),l=a(i,c);if(t&&n!=n){for(;c>l;)if((u=s[l++])!=u)return!0}else for(;c>l;l++)if((t||l in s)&&s[l]===n)return t||l||0;return!t&&-1}}},224:function(t,e,n){var r=n(194),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},225:function(t,e,n){var r=n(194),o=Math.max,a=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):a(t,e)}},226:function(t,e,n){var r=n(227)("keys"),o=n(229);t.exports=function(t){return r[t]||(r[t]=o(t))}},227:function(t,e,n){var r=n(170),o=n(169),a=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return a[t]||(a[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(228)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},228:function(t,e){t.exports=!0},229:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},230:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},231:function(t,e){e.f=Object.getOwnPropertySymbols},232:function(t,e){e.f={}.propertyIsEnumerable},233:function(t,e,n){var r=n(193);t.exports=function(t){return Object(r(t))}},245:function(t,e,n){n(15)&&"g"!=/./g.flags&&n(25).f(RegExp.prototype,"flags",{configurable:!0,get:n(201)})}}]);
//# sourceMappingURL=component---src-pages-pick-time-tsx-70ec03a58c6d5831c257.js.map