(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{161:function(e,t,n){"use strict";n.r(t),n(77),n(168),n(78),n(82),n(295),n(16);var a=n(12),r=n.n(a),i=n(0),s=n(174),o=n(170),c=Object(o.a)("div",{target:"e1wunskl0"})("padding:5px;border-radius:5px;background-color:#d32f2f;color:#fff;"),l=function(e){var t=e.children;return i.createElement(c,null,t)},u=n(164),m=n(172),d=n(204),h=n(165),f=function(e){function t(t,n){var a;return(a=e.call(this,t,n)||this).state={mriName:"",matches:d.a,oops:null,haveOrder:!0,safetyState:h.a.loadState()},a}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof sessionStorage&&this.setState({safetyState:h.a.loadState(),mriName:"",matches:d.a,oops:null})},n.setMriName=function(e){var t=(e||"").toUpperCase(),n=t.replace("MRI","");n=(n=n.replace(" OF","")).trim();var a=d.a.filter(function(e){return(e.name||"").toUpperCase().indexOf(n)>-1||(e.name2||"").toUpperCase().indexOf(n)>-1||(e.name3||"").toUpperCase().indexOf(n)>-1});a.length>0?this.setState({mriName:t,matches:a,oops:null}):this.setState({oops:t})},n.select=function(e){"undefined"!=typeof sessionStorage&&(sessionStorage.setItem("scan",e),Object(u.navigate)("/pick-time"))},n.render=function(){var e=this;return i.createElement(s.a,null,i.createElement("section",{id:"Q3",className:"vspace80 w-container"},i.createElement("div",{className:"vspace40 centered w-row animated zoomIn"},i.createElement("div",null,i.createElement(m.a,{num:2}))),i.createElement("div",{className:"vspace40 centered w-row"},i.createElement("div",{className:"w-col w-col-3"}),i.createElement("div",{className:"w-col w-col-6"},i.createElement("form",{action:"#",onSubmit:function(e){return e.preventDefault()}},i.createElement("h3",null,i.createElement("b",null,"Ok,")," what type of scan do you need?"),i.createElement("div",{className:"cta-subitem"},i.createElement("input",{type:"text",placeholder:"Type scan name to search",className:"text-field w-input",maxLength:256,name:"name-3","data-name":"Name 3",id:"name-3",value:this.state.mriName,onChange:function(t){return e.setMriName(t.currentTarget.value)}}),i.createElement("div",{className:"text-block-3"}," OR "),i.createElement(u.Link,{to:"/no-type",className:"button w-button"},"I don't know")))),i.createElement("div",{className:"w-col w-col-3"})),this.state.oops&&i.createElement(l,null,"Oops! We didn't find any matches for '",this.state.oops,"'. Please enter fewer characters. If we don't have the scan type listed, click \"I don't know\" above, and we will work with you personally to schedule your appointment."),(this.state.mriName||"").length>0&&i.createElement("table",{className:"vspace80 w-row",style:{width:"100%",marginBottom:"80px"},cellPadding:3,cellSpacing:3},i.createElement("thead",null,i.createElement("tr",null,i.createElement("th",{style:{textAlign:"left"}},"Type of Scan"),i.createElement("th",{style:{textAlign:"left",width:"20%"}},"Length"))),i.createElement("tbody",null,this.state.matches.map(function(t){return i.createElement("tr",{key:JSON.stringify(t)},i.createElement("td",{style:{textAlign:"left"}},t.name,(t.name2||"").length>0&&"/"+t.name2,(t.name3||"").length>0&&"/"+t.name3," ",t.contrast),i.createElement("td",{style:{textAlign:"left"}},t.time),i.createElement("td",{style:{textAlign:"left"}},i.createElement("button",{onClick:function(){return e.select(JSON.stringify(t))},style:{color:"navy",textDecoration:"underline"}},"Select")))}))),i.createElement("div",{className:"vspace40 centered w-row"},i.createElement("div",{className:"w-col w-col-3"}),i.createElement("div",{className:"w-col w-col-6"},i.createElement("p",null,i.createElement("b",null,"P.S.")," this is Beta software. If you run into any issues, please give us a call at 833-IDEAL-MR.")),i.createElement("div",{className:"w-col w-col-3"}))))},t}(i.Component);t.default=f},165:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n(50);var a=function(){function e(){this.fname=void 0,this.lname=void 0,this.email=void 0,this.phone=void 0,this.answers=void 0,this.implants=void 0,this.currentImplant=void 0,this.haveOrder=void 0,this.scan=void 0,this.overrideSafetyWarning=void 0,this.height=void 0,this.weight=void 0,this.doctorName=void 0,this.doctorContact=void 0,this.insFront=void 0,this.insBack=void 0,this.mriOrder=void 0,this.carrierNumber=void 0,this.groupNumber=void 0,this.policyNumber=void 0,this.timeSlot=void 0,this.err=void 0,this.dob=void 0,this.address1=void 0,this.address2=void 0,this.city=void 0,this.state=void 0,this.zip=void 0,this.optedIn=void 0,this.validationResult=void 0,this.fname="",this.lname="",this.answers={},this.implants=[],this.currentImplant="",this.scan=null,this.haveOrder=!1,this.overrideSafetyWarning=!1,this.email="",this.phone="",this.height="",this.weight="",this.doctorName="",this.doctorContact="",this.insFront="",this.insBack="",this.mriOrder="","undefined"!=typeof sessionStorage?this.timeSlot=JSON.parse(sessionStorage.getItem("timeSlot")||"{}"):this.timeSlot=null,this.err="",this.dob="",this.carrierNumber="",this.groupNumber="",this.policyNumber="",this.address1="",this.address2="",this.city="",this.state="",this.zip="",this.optedIn=!0,this.validationResult=[]}return e.loadState=function(){if("undefined"!=typeof sessionStorage){var t=JSON.parse(sessionStorage.getItem("wizard")||"{}"),n={scan:JSON.parse(sessionStorage.getItem("scan")||"{}"),haveOrder:"true"===sessionStorage.getItem("haveOrder")};return Object.assign(new e,t,n)}return new e},e}()},167:function(e,t){e.exports=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}},168:function(e,t,n){var a=n(25).f,r=Function.prototype,i=/^\s*function ([^ (]*)/;"name"in r||n(15)&&a(r,"name",{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(e){return""}}})},172:function(e,t,n){"use strict";n.d(t,"a",function(){return s}),n.d(t,"c",function(){return o}),n.d(t,"b",function(){return c}),n.d(t,"d",function(){return l}),n(16),n(168);var a=n(0),r=n(164),i=function(e){return a.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5be12c8e888fb5963088dc64_chevron-right-blue-2.svg",width:"38",height:"38",alt:"Chevron right",className:e.translucent?"translucent":""})},s=function(e){return a.createElement("div",null,a.createElement("div",{className:"breadcrumb-row"},a.createElement("div",{className:"circled "+(e.num<1?"translucent":"")},"1"),a.createElement(i,{translucent:e.num<2}),a.createElement("div",{className:"circled "+(e.num<2?"translucent":"")},"2"),a.createElement(i,{translucent:e.num<3}),a.createElement("div",{className:"circled "+(e.num<3?"translucent":"")},"3")),a.createElement("div",{className:"breadcrumb-row"},1===e.num&&a.createElement("h3",null,a.createElement("strong",null,"Step 1.")," Your details"),2===e.num&&a.createElement("h3",null,a.createElement("strong",null,"Step 2.")," Choose your scan"),3===e.num&&a.createElement("h3",null,a.createElement("strong",null,"Step 3.")," Health & Safety Information")))},o=function(e){return a.createElement(r.Link,{to:"/have-order",className:"breadcrumb w-button",style:{display:"none"}},e.value?"Have Doctor's Order":"No Order"," ✓")},c=function(e){var t=e.value;return t?"string"==typeof t?a.createElement(r.Link,{to:"/mri-type",className:"breadcrumb w-button"},"Scan type: ",t," ×"):a.createElement(r.Link,{to:"/mri-type",className:"breadcrumb w-button"},"Scan type: ",t.name||"e!name"," ",t.contrast||"e!contrast"," ×"):a.createElement(r.Link,{to:"/mri-type",className:"breadcrumb w-button"},"Click here to select MRI type")},l=function(e){return e.slot?a.createElement(r.Link,{to:"/pick-time",className:"breadcrumb w-button"},(e.slot.slotId||"no time selected").replace(/(\d{4})-(\d{2})-(\d{2})T([^\s]{5}).*/g,"$2/$3/$1 at $4")," ×",a.createElement("br",null),a.createElement("small",null,"(",e.reserved?"reserved":"not yet reserved",")")):a.createElement("div",null)}},204:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a=[];(new(n(166).f)).serviceTypesGET({locationId:""}).then(function(e){return a=e.value||[]})},295:function(e,t,n){"use strict";n(296)("trim",function(e){return function(){return e(this,3)}})},296:function(e,t,n){var a=n(6),r=n(27),i=n(18),s=n(297),o="["+s+"]",c=RegExp("^"+o+o+"*"),l=RegExp(o+o+"*$"),u=function(e,t,n){var r={},o=i(function(){return!!s[e]()||"​"!="​"[e]()}),c=r[e]=o?t(m):s[e];n&&(r[n]=c),a(a.P+a.F*o,"String",r)},m=u.trim=function(e,t){return e=String(r(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(l,"")),e};e.exports=u},297:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=component---src-pages-mri-type-tsx-81ab2890fff2fa5f7b06.js.map