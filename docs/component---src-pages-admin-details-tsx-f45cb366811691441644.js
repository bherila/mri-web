(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{143:function(t,e,n){"use strict";n.r(e);var a=n(12),r=n.n(a),i=n(0),o=n(182),s=n(191),u=n(221),c=n(183),m=n.n(c),l=function(t){function e(e,n){var a;return(a=t.call(this,e,n)||this).state={url:"undefined"!=typeof location?m.a.parse(location.href||"",!0):void 0},a}r()(e,t);var n=e.prototype;return n.componentDidMount=function(){if(this.state.url&&this.state.url.query){var t=this.state.url.query.appt,e=JSON.parse(t);this.setState({item:e})}},n.render=function(){return i.createElement(s.a,null,i.createElement(o.a,null,this.renderInner()))},n.renderInner=function(){var t=this,e=this.state.item;return e?i.createElement(u.a,{selectedSlotAvailabilityTime:e,onConfirm:function(){return t.closeModal()},onCancel:function(){return t.closeModal()}}):i.createElement("div",null,"no item selected")},n.closeModal=function(){"undefined"!=typeof window&&window.close()},e}(i.Component);e.default=l},161:function(t,e,n){"use strict";n.r(e),n.d(e,"graphql",function(){return f}),n.d(e,"StaticQueryContext",function(){return d}),n.d(e,"StaticQuery",function(){return p});var a=n(0),r=n.n(a),i=n(8),o=n.n(i),s=n(160),u=n.n(s);n.d(e,"Link",function(){return u.a}),n.d(e,"withPrefix",function(){return s.withPrefix}),n.d(e,"navigate",function(){return s.navigate}),n.d(e,"push",function(){return s.push}),n.d(e,"replace",function(){return s.replace}),n.d(e,"navigateTo",function(){return s.navigateTo});var c=n(34);n.d(e,"waitForRouteChange",function(){return c.c});var m=n(164),l=n.n(m);n.d(e,"PageRenderer",function(){return l.a});var h=n(35);n.d(e,"parsePath",function(){return h.a});var d=r.a.createContext({}),p=function(t){return r.a.createElement(d.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function f(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},162:function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n(50);var a=function(){function t(){this.fname=void 0,this.lname=void 0,this.email=void 0,this.phone=void 0,this.answers=void 0,this.implants=void 0,this.currentImplant=void 0,this.haveOrder=void 0,this.scan=void 0,this.overrideSafetyWarning=void 0,this.height=void 0,this.weight=void 0,this.doctorName=void 0,this.doctorContact=void 0,this.insFront=void 0,this.insBack=void 0,this.mriOrder=void 0,this.carrierNumber=void 0,this.groupNumber=void 0,this.policyNumber=void 0,this.timeSlot=void 0,this.err=void 0,this.dob=void 0,this.address1=void 0,this.address2=void 0,this.city=void 0,this.state=void 0,this.zip=void 0,this.optedIn=void 0,this.validationResult=void 0,this.fname="",this.lname="",this.answers={},this.implants=[],this.currentImplant="",this.scan=null,this.haveOrder=!1,this.overrideSafetyWarning=!1,this.email="",this.phone="",this.height="",this.weight="",this.doctorName="",this.doctorContact="",this.insFront="",this.insBack="",this.mriOrder="","undefined"!=typeof sessionStorage?this.timeSlot=JSON.parse(sessionStorage.getItem("timeSlot")||"{}"):this.timeSlot=null,this.err="",this.dob="",this.carrierNumber="",this.groupNumber="",this.policyNumber="",this.address1="",this.address2="",this.city="",this.state="",this.zip="",this.optedIn=!0,this.validationResult=[]}return t.loadState=function(){if("undefined"!=typeof sessionStorage){var e=JSON.parse(sessionStorage.getItem("wizard")||"{}"),n={scan:JSON.parse(sessionStorage.getItem("scan")||"{}"),haveOrder:"true"===sessionStorage.getItem("haveOrder")};return Object.assign(new t,e,n)}return new t},t}()},163:function(t,e,n){"use strict";n.d(e,"b",function(){return u}),n.d(e,"a",function(){return l}),n.d(e,"c",function(){return p}),n.d(e,"d",function(){return v}),n.d(e,"e",function(){return T}),n.d(e,"f",function(){return C}),n(36);var a=n(12),r=n.n(a),i=(n(15),n(183)),o=n(189),s=n(190),u="https://mrisched.azurewebsites.net".replace(/\/+$/,""),c=function(t,e){void 0===t&&(t=o),void 0===e&&(e=u),this.basePath=void 0,this.fetch=void 0,this.basePath=e,this.fetch=t},m=function(t,e){var n=function(t,e){var n=i.parse("/api/auth",!0);n.query=s({},n.query,{authToken:t.authToken});var a,r=s({},{method:"POST"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},l=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.auth=function(t,e){return m(t,e)(this.fetch,this.basePath)},e}(c),h=function(t,e){var n=function(t,e){var n=i.parse("/api/leadGen",!0);n.query=s({},n.query,{authToken:t.authToken});var a,r=s({},{method:"GET"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},d=function(t,e){var n=function(t,e){var n=i.parse("/api/leadGen",!0);n.query=s({},n.query,{authToken:t.authToken});var a,r=s({},{method:"POST"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},p=function(t){function e(){return t.apply(this,arguments)||this}r()(e,t);var n=e.prototype;return n.runGET=function(t,e){return h(t,e)(this.fetch,this.basePath)},n.runPOST=function(t,e){return d(t,e)(this.fetch,this.basePath)},e}(c),f=function(t){var e=function(t){var e=i.parse("/api/question",!0),n=s({},{method:"GET"},t),a={};return a&&(n.headers=s({},a,n.headers)),{url:i.format(e),options:n}}(t);return function(t,n){return void 0===t&&(t=o),void 0===n&&(n=u),t(n+e.url,e.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},v=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.getQuestions=function(t){return f(t)(this.fetch,this.basePath)},e}(c),y=function(t,e){var n=function(t,e){var n=i.parse("/api/timeslot/rules",!0);n.query=s({},n.query,{authToken:t.authToken});var a,r=s({},{method:"DELETE"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},w=function(t,e){var n=function(t,e){var n=i.parse("/api/timeslot/rules",!0);n.query=s({},n.query,{authToken:t.authToken});var a=s({},{method:"GET"},e),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},b=function(t,e){var n=function(t,e){var n=i.parse("/api/timeslot/rules",!0);n.query=s({},n.query,{authToken:t.authToken});var a,r=s({},{method:"POST"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},g=function(t,e){var n=function(t,e){var n=i.parse("/api/timeslot/rules",!0);n.query=s({},n.query,{authToken:t.authToken});var a,r=s({},{method:"PUT"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},S=function(t,e){var n=function(t,e){var n=i.parse("/api/locations",!0);n.query=s({},n.query,{locationId:t.locationId,authToken:t.authToken});var a=s({},{method:"GET"},e),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},E=function(t,e){var n=function(t,e){var n=i.parse("/api/locations",!0);n.query=s({},n.query,{locationId:t.locationId,authToken:t.authToken});var a=s({},{method:"POST"},e),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},T=function(t){function e(){return t.apply(this,arguments)||this}r()(e,t);var n=e.prototype;return n.availabilityRulesDELETE=function(t,e){return y(t,e)(this.fetch,this.basePath)},n.availabilityRulesGET=function(t,e){return w(t,e)(this.fetch,this.basePath)},n.availabilityRulesPOST=function(t,e){return b(t,e)(this.fetch,this.basePath)},n.availabilityRulesPUT=function(t,e){return g(t,e)(this.fetch,this.basePath)},n.locationsGET=function(t,e){return S(t,e)(this.fetch,this.basePath)},n.locationsPOST=function(t,e){return E(t,e)(this.fetch,this.basePath)},e}(c),I=function(t,e){var n=function(t,e){var n=i.parse("/api/appointment",!0);n.query=s({},n.query,{authToken:t.authToken,withContrast:t.withContrast,locationId:t.locationId,search:t.search});var a,r=s({},{method:"DELETE"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},N=function(t,e){var n=function(t,e){var n=i.parse("/api/appointment",!0);n.query=s({},n.query,{authToken:t.authToken,withContrast:t.withContrast,locationId:t.locationId,search:t.search});var a=s({},{method:"GET"},e),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},R=function(t,e){var n=function(t,e){var n=i.parse("/api/appointment",!0);n.query=s({},n.query,{authToken:t.authToken,withContrast:t.withContrast,locationId:t.locationId,search:t.search});var a,r=s({},{method:"POST"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},M=function(t,e){var n=function(t,e){var n=i.parse("/api/appointment",!0);n.query=s({},n.query,{authToken:t.authToken,withContrast:t.withContrast,locationId:t.locationId,search:t.search});var a,r=s({},{method:"PUT"},e);return a={"Content-Type":"application/json"},t.req&&(r.body=JSON.stringify(t.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},k=function(t,e){var n=function(t,e){var n=i.parse("/api/timeslots",!0);n.query=s({},n.query,{authToken:t.authToken,withContrast:t.withContrast,length:t.length,locationId:t.locationId,skip:t.skip});var a=s({},{method:"GET"},e),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(t,e);return function(t,e){return void 0===t&&(t=o),void 0===e&&(e=u),t(e+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},C=function(t){function e(){return t.apply(this,arguments)||this}r()(e,t);var n=e.prototype;return n.appointmentHandlerDELETE=function(t,e){return I(t,e)(this.fetch,this.basePath)},n.appointmentHandlerGET=function(t,e){return N(t,e)(this.fetch,this.basePath)},n.appointmentHandlerPOST=function(t,e){return R(t,e)(this.fetch,this.basePath)},n.appointmentHandlerPUT=function(t,e){return M(t,e)(this.fetch,this.basePath)},n.timeSlotsGET=function(t,e){return k(t,e)(this.fetch,this.basePath)},e}(c)},164:function(t,e,n){var a;t.exports=(a=n(170))&&a.default||a},170:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(8),o=n.n(i),s=n(37),u=n(1),c=function(t){var e=t.location,n=u.default.getResourcesForPathname(e.pathname);return r.a.createElement(s.a,{location:e,pageResources:n})};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},e.default=c},171:function(t,e,n){},173:function(t,e,n){},175:function(t,e,n){},177:function(t,e,n){},179:function(t,e,n){"use strict";var a=n(0),r=n(166),i=Object(r.a)("div",{target:"e199us7p0"})("display:flex;flex-direction:column;min-height:100vh;");e.a=function(t){var e=t.children,n=t.className;return a.createElement(i,{className:n},e)}},180:function(t,e,n){"use strict";var a=n(0);e.a=function(t){var e=t.children,n=t.className;return a.createElement("main",{className:n||"white-section"},a.createElement("div",{className:"vspace80 w-container"},e))}},182:function(t,e,n){"use strict";var a=n(0),r=n(166),i=Object(r.a)("div",{target:"efqy5ay0"})("display:block;flex:1;position:relative;");e.a=function(t){var e=t.children,n=t.className;return a.createElement(i,{className:n},e)}},186:function(t,e,n){"use strict";n(198);var a=n(9),r=n(187),i=n(16),o=/./.toString,s=function(t){n(17)(RegExp.prototype,"toString",t,!0)};n(18)(function(){return"/a/b"!=o.call({source:"a",flags:"b"})})?s(function(){var t=a(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?r.call(t):void 0)}):"toString"!=o.name&&s(function(){return o.call(this)})},187:function(t,e,n){"use strict";var a=n(9);t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},188:function(t,e,n){var a=Date.prototype,r=a.toString,i=a.getTime;new Date(NaN)+""!="Invalid Date"&&n(17)(a,"toString",function(){var t=i.call(this);return t==t?r.call(this):"Invalid Date"})},191:function(t,e,n){"use strict";var a=n(192),r=n(0),i=n(184),o=n.n(i),s=n(161),u=(n(171),n(173),n(175),n(177),n(179)),c=n(180);e.a=function(t){var e=t.children;return r.createElement(s.StaticQuery,{query:"2945440950",render:function(t){return r.createElement(u.a,null,r.createElement(o.a,{title:t.site.siteMetadata.title,meta:[{name:"description",content:t.site.siteMetadata.description},{name:"keywords",content:"gatsbyjs, gatsby, javascript, sample, something"}]}),r.createElement(c.a,null,e))},data:a})}},192:function(t){t.exports={data:{site:{siteMetadata:{title:"MRI Scheduler",description:"TBD"}}}}},193:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return i});var a=n(161);function r(){var t=sessionStorage.getItem("sessionId")||"";return 0==t.length&&i(),t}function i(){sessionStorage.removeItem("sessionId"),Object(a.navigate)("/admin")}},194:function(t,e,n){"use strict";e.a=function(t){if(!t.partitionKey)throw"No partitionKey";if(!t.rowKey)throw"No rowKey";return{resourceId:t.resourceId,serviceType:t.serviceType,serviceLength:t.serviceLength,firstName:t.firstName,lastName:t.lastName,phone:t.phone,email:t.email,address1:t.address1,city:t.city,state:t.state,zip:t.zip,height:t.height,weight:t.weight,reminder:t.reminder,doctorName:t.doctorName,doctorPhone:t.doctorPhone,insuranceCarrier:t.insuranceCarrier,insuranceGroupNumber:t.insuranceGroupNumber,insurancePolicyNumber:t.insurancePolicyNumber,insuranceVerified:t.insuranceVerified,priorAuthObtained:t.priorAuthObtained,orderEnteredToRIS:t.orderEnteredToRIS,patientWasCalled:t.patientWasCalled,confirmed:t.confirmed,orderImageUrl:t.orderImageUrl,insuranceFrontUrl:t.insuranceFrontUrl,insuranceBackUrl:t.insuranceBackUrl,surveyDataJson:t.surveyDataJson,approvedDate:t.approvedDate,submittedDate:t.submittedDate,confirmedDate:t.confirmedDate,birthday:t.birthday,partitionKey:t.partitionKey,rowKey:t.rowKey,timestamp:t.timestamp,safetyWarnings:t.safetyWarnings,eTag:"*"}}},198:function(t,e,n){n(16)&&"g"!=/./g.flags&&n(25).f(RegExp.prototype,"flags",{configurable:!0,get:n(187)})},208:function(t,e,n){"use strict";n.d(e,"a",function(){return m}),n(77);var a=n(12),r=n.n(a),i=n(0),o=n(163),s=n(162),u=n(196),c=n.n(u),m=function(t){function e(e,n){var a;return(a=t.call(this,e,n)||this).state={err:"",offset:0,total:14,qna:s.a.loadState(),times:[],showModal:!1},a}r()(e,t);var n=e.prototype;return n.componentDidMount=function(){var t=this;(new o.f).timeSlotsGET({withContrast:"with and without contrast"===this.props.scan.contrast,locationId:""}).then(function(e){e.value?t.setState({times:e.value||[],total:e.value.length||0,qna:s.a.loadState()}):t.setState({err:e.message||"Error",qna:s.a.loadState()})},function(e){return t.setState({err:e,qna:s.a.loadState()})})},n.renderSlotAvailabilityDate=function(t,e){var n=this;return i.createElement("div",{className:"timeslotcolumn"},i.createElement("h3",{style:{whiteSpace:"nowrap"}},t.friendlyBegin),t.times?t.times.map(function(t){return i.createElement("a",{key:t.time,href:"#",className:"buttontimeslot "+(t.isAvailable?"":"unavailable ")+"w-button",onClick:function(){return n.pickTime(t,e)}},t.time)}):i.createElement("div",null,"dt.times is ",typeof t.times))},n.renderModal=function(){var t=this;return i.createElement(c.a,{isOpen:this.state.showModal,className:"modal-content animated fadeInUp",overlayClassName:"modal-wrapper"},i.createElement("p",null,i.createElement("b",null,"The time you selected is tomorrow.")),i.createElement("p",null,"We won't have time to obtain prior authorization from your insurance carrier. If you aren't using insurance, this won't be a problem."),i.createElement("p",null,"Are you sure you want to select this time?"),i.createElement("p",null,i.createElement("button",{type:"button",className:"button w-button",onClick:function(){return t.props.onPick(t.state.selectedTime)}},"Yes, continue"),i.createElement("button",{type:"button",className:"button w-button",onClick:function(){return t.setState({showModal:!1})}},"No, change time")))},n.render=function(){var t=this,e=this.state,n=e.offset,a=e.total,r=(e.err,e.times);return i.createElement(i.Fragment,null,i.createElement("div",{className:"w-row"},i.createElement("div",{className:"w-col w-col-2"},i.createElement("div",{className:"timeslotcolumn"},n>0&&i.createElement("a",{href:"#",onClick:function(){return t.setState({offset:n-1})},className:"buttontimeslot w-button"},"« Earlier Dates"))),r&&r.map(function(e,a){return a>=n&&a-n<4&&i.createElement("div",{key:JSON.stringify(e||a),className:"w-col w-col-2"},t.renderSlotAvailabilityDate(e,a<1))}),n+4<a&&i.createElement("div",{className:"w-col w-col-2"},i.createElement("div",{className:"timeslotcolumn"},i.createElement("a",{href:"#",onClick:function(){return t.setState({offset:n+1})},className:"buttontimeslot w-button"},"Later Dates >>")))),this.renderModal())},n.pickTime=function(t,e){t.isAvailable&&(e?this.setState({showModal:!0}):this.props.onPick(t))},e}(i.Component)},209:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var a=[{name:"Hip MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Hip MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Knee MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Knee MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Ankle MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Ankle MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Calf MRI",contrast:"without contrast",time:"30 min",name2:"Tib-Fib MRI",name3:"Tibia Fibula MRI",name4:""},{name:"Calf MRI",contrast:"with and without contrast",time:"30 min",name2:"Tib-Fib MRI",name3:"Tibia Fibula MRI",name4:""},{name:"Foot MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Foot MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Thigh MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Thigh MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Hand MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Hand MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Wrist MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Wrist MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Forearm MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Forearm MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Elbow MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Elbow MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Humerus MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Humerus MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Shoulder MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Shoulder MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Cervical spine MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Cervical spine MRI",contrast:"with and without contrast",time:"30 min",name2:"Multiple sclerosis protocol",name3:"",name4:""},{name:"Thoracic spine MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Thoracic spine MRI",contrast:"with and without contrast",time:"30 min",name2:"Multiple sclerosis protocol",name3:"",name4:""},{name:"Lumbar spine MRI",contrast:"without contrast",time:"30 min",name2:"Low back pain MRI",name3:"",name4:""},{name:"Lumbar spine MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Brain MRI",contrast:"without contrast",time:"30 min",name2:"Memory loss MRI",name3:"Concussion evaluation MRI",name4:""},{name:"Brain MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Pituitary (Brain MRI)",contrast:"with and without contrast",time:"30 min",name2:"Pituitary protocol MRI",name3:"",name4:""},{name:"Brain MRA",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Neck MRA",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Neck (soft tissues) MRI",contrast:"with and without contrast",time:"30 min",name2:"Soft tissue neck MRI",name3:"Neck mass MRI",name4:""},{name:"Chest MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Chest MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Abdomen MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Abdomen MRI",contrast:"with and without contrast",time:"30 min",name2:"Liver lesion MRI",name3:"Kidney lesion MRI",name4:"Adrenal lesion MRI"},{name:"MRCP",contrast:"without contrast",time:"30 min",name2:"Biliary MRI",name3:"MR Cholangiogram",name4:""},{name:"Breast implant MRI",contrast:"without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Pelvic (bony) MRI",contrast:"without contrast",time:"30 min",name2:"Sacrum MRI",name3:"SI joint MRI",name4:""},{name:"Pelvic (bony) MRI",contrast:"with and without contrast",time:"30 min",name2:"",name3:"",name4:""},{name:"Pelvic (prostate) MRI",contrast:"with and without contrast",time:"30 min",name2:"Prostate MRI",name3:"",name4:""},{name:"Pelvic (rectum) MRI",contrast:"with and without contrast",time:"30 min",name2:"Rectal MRI",name3:"",name4:""},{name:"Pelvic (female) MRI",contrast:"with and without contrast",time:"30 min",name2:"Female pelvis MRI",name3:"Uterus MRI",name4:""},{name:"MR Enterography",contrast:"with and without contrast",time:"90 min",name2:"Crohns protocol MRI",name3:"",name4:""}]},221:function(t,e,n){"use strict";n.d(e,"a",function(){return p}),n(186),n(188),n(78),n(79),n(167),n(77),n(83),n(51),n(222);var a=n(12),r=n.n(a),i=n(0),o=n(163),s=n(193),u=n(194),c=n(185),m=n(196),l=n.n(m),h=n(208),d=n(209),p=function(t){function e(e,n){var a,r=(a=t.call(this,e,n)||this).props.selectedSlotAvailabilityTime.linkedAppointment;return r&&(r.serviceType=JSON.stringify(JSON.parse(r.serviceType||"{}"))),a.state=r||{},a}r()(e,t);var n=e.prototype;return n.componentWillReceiveProps=function(t){var e=t.selectedSlotAvailabilityTime;e!==this.props.selectedSlotAvailabilityTime&&this.setState(e.linkedAppointment||{})},n.renderSafetyAnswers=function(){if(!this.props.selectedSlotAvailabilityTime)return console.log("!this.props.selectedSlotAvailabilityTime"),!1;if(!this.props.selectedSlotAvailabilityTime.linkedAppointment)return console.log("!this.props.selectedSlotAvailabilityTime.linkedAppointment"),!1;var t=this.props.selectedSlotAvailabilityTime.linkedAppointment.surveyDataJson,e=!Object(c.isEmpty)(t),n=JSON.parse(t||"{}"),a={"Cardiac pacer":n.pacemaker?"yes":"no",Stimulator:n.spinalStimulator?"yes":"no","Brain implant":!!n.neurostimulator,"Loop recorder":!!n.loopRecorder,"Defibrillator implant":!!n.defibrillatorImplant,"Other implants":n.implants?"yes:"+n.currentImplant||"no detail":"no","Metal in eye":n.eye?"yes":"no","Metal removed":n.eye?n.e1?"yes":"no":"N/A","claustrophobic?":!!n.p1,"Contrast allergy":n.AllergicToContrast?"yes":"no","kidney disease?":!!n.p2,"diabetes?":!!n.p3},r=Object.keys(a);return i.createElement(i.Fragment,null,i.createElement("div",{style:{color:e?"black":"red"}},"Safety form completed: ",e?"yes":"no"),i.createElement("div",{className:"qa-container",style:{opacity:e?1:.5}},r.map(function(t){return i.createElement("div",{key:t,className:"qa-item"},i.createElement("div",{className:"qa-label"},t),i.createElement("div",{className:"qa-answer"},"boolean"==typeof a[t]?!0===a[t]?"yes":"no":a[t]))})))},n.field=function(t,e,n,a){return i.createElement(i.Fragment,null,i.createElement("label",{htmlFor:t,className:"flexlabel",style:{textAlign:"right"}},e," "),i.createElement("input",{type:"text",className:"flexinput w-input",maxLength:256,name:t,"data-name":t,id:t,value:n||"",onChange:function(t){return a(t.currentTarget.value)}}))},n.render=function(){var t=this;return i.createElement("div",null,i.createElement("div",{className:"centered"},i.createElement("select",{onChange:function(e){return t.setState({serviceType:e.currentTarget.value})},value:this.state.serviceType},d.a.map(function(t){var e=JSON.stringify(t);return i.createElement("option",{key:e,value:e},t.name," ",t.contrast," (",t.time,")")}))),i.createElement("button",{onClick:function(e){return t.pickNewTime(e)},className:"link centered"},this.state.rowKey),i.createElement("div",{className:"inputrow"},this.field("first","First",this.state.firstName,function(e){return t.setState({firstName:e})}),this.field("last","Last",this.state.lastName,function(e){return t.setState({lastName:e})}),this.field("dob","DOB",this.state.birthday,function(e){return t.setState({birthday:e})})),i.createElement("div",{className:"inputrow"},this.field("phone","Phone",this.state.phone,function(e){return t.setState({phone:e})}),this.field("Email","Email",this.state.email,function(e){return t.setState({email:e})}),this.field("Weight","Weight",this.state.weight,function(e){return t.setState({weight:e})})),i.createElement("div",{className:"inputrow"},this.field("Address1","Address1",this.state.address1,function(e){return t.setState({address1:e})}),this.field("Address2","Address2",this.state.address2,function(e){return t.setState({address2:e})}),this.field("City","City",this.state.city,function(e){return t.setState({city:e})}),this.field("State","State",this.state.state,function(e){return t.setState({state:e})}),this.field("Zip","Zip",this.state.zip,function(e){return t.setState({zip:e})})),i.createElement("hr",null),i.createElement("div",{className:"inputrow"},this.field("doctorName","doctorName",this.state.doctorName,function(e){return t.setState({doctorName:e})}),this.field("doctorPhone","doctorPhone",this.state.doctorPhone,function(e){return t.setState({doctorPhone:e})}),"View order image below"),i.createElement("hr",null),i.createElement("div",{className:"inputrow"},this.field("insuranceCarrier","insuranceCarrier",this.state.insuranceCarrier,function(e){return t.setState({insuranceCarrier:e})}),this.field("insuranceGroupNumber","insuranceGroupNumber",this.state.insuranceGroupNumber,function(e){return t.setState({insuranceGroupNumber:e})}),this.field("insurancePolicyNumber","insurancePolicyNumber",this.state.insurancePolicyNumber,function(e){return t.setState({insurancePolicyNumber:e})})),i.createElement("hr",null),this.renderSafetyAnswers(),i.createElement("hr",null),i.createElement("div",{className:"centered"},i.createElement("button",{type:"button",onClick:function(e){return t.doUpdate(e)}},"Update"),i.createElement("button",{type:"button",onClick:function(e){return t.doPrint(e)}},"Print Data"),i.createElement("button",{type:"button",onClick:function(e){return t.doCancel(e)}},"Nevermind")),this.renderTimePickModal(),i.createElement("hr",null),i.createElement("div",{className:"inputrow"},i.createElement("img",{style:{maxWidth:"700px",maxHeight:"500px"},src:"https://mrischedba06.blob.core.windows.net/uploads/"+this.state.orderImageUrl})),i.createElement("div",{className:"inputrow"},i.createElement("img",{style:{maxWidth:"700px",maxHeight:"500px"},src:"https://mrischedba06.blob.core.windows.net/uploads/"+this.state.insuranceFrontUrl})),i.createElement("div",{className:"inputrow"},i.createElement("img",{style:{maxWidth:"700px",maxHeight:"500px"},src:"https://mrischedba06.blob.core.windows.net/uploads/"+this.state.insuranceBackUrl})),i.createElement("hr",null),i.createElement("h3",null,"Extended Safety Form Data"),this.renderSafetyFormTable())},n.doUpdate=function(t){var e=this;t.preventDefault(),(new o.f).appointmentHandlerPOST({authToken:Object(s.a)(),locationId:"",req:Object(u.a)(this.state),search:"",withContrast:!1}).then(function(t){t.success?e.props.onConfirm instanceof Function&&e.props.onConfirm():alert(t.message||"Error")})},n.doPrint=function(t){t.preventDefault(),window.print()},n.doCancel=function(t){t.preventDefault(),this.props.onCancel instanceof Function&&this.props.onCancel()},n.renderTimePickModal=function(){var t=this;return this.state.isPickTime&&i.createElement(l.a,{isOpen:!0,onRequestClose:function(){return t.setState({isPickTime:!1})},className:"modal-content-full animated fadeInUp",overlayClassName:"modal-wrapper"},i.createElement("div",{className:"centered white-box"},i.createElement(h.a,{scan:{contrast:this.state.serviceType||"",name:this.state.serviceType||"Unknown",name2:"",name3:"",name4:"",time:"30"},onPick:function(e){return t.setTime(e)}})))},n.setTime=function(t){"string"==typeof t.slotId?this.setState({partitionKey:t.slotId.split(" ")[1],rowKey:t.slotId}):alert("No slotId was specified!")},n.pickNewTime=function(t){t&&t.preventDefault(),this.setState({isPickTime:!0})},n.renderSafetyFormTable=function(){var t=JSON.parse(this.state.surveyDataJson||"{}");return i.createElement("table",null,i.createElement("tbody",null,Object.keys(t).map(function(e){return!(f.indexOf(e)>-1)&&i.createElement("tr",{key:e},i.createElement("td",null,e),i.createElement("td",null,"boolean"==typeof t[e]?!0===t[e]?i.createElement("span",{style:{color:"red",fontWeight:"bold"}},"Yes"):"No":t[e].toString()))})))},e}(i.Component),f=["fname","lname","email","phone","answers","implants","currentImplant","haveOrder","scan","overrideSafetyWarning","height","weight","doctorName","doctorContact","insFront","insBack","mriOrder","carrierNumber","groupNumber","policyNumber","timeSlot","err","dob","address1","address2","city","state","zip","optedIn","validationResult"]},222:function(t,e,n){var a=n(26),r=n(38);n(223)("keys",function(){return function(t){return r(a(t))}})},223:function(t,e,n){var a=n(6),r=n(19),i=n(18);t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],o={};o[t]=e(n),a(a.S+a.F*i(function(){n(1)}),"Object",o)}}}]);
//# sourceMappingURL=component---src-pages-admin-details-tsx-f45cb366811691441644.js.map