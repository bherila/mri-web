(window.webpackJsonp=window.webpackJsonp||[]).push([[26,1,6],{156:function(e,t,n){"use strict";n.r(t),n(50),n(77);var a=n(12),r=n.n(a),i=n(0),o=n(172),s=n(191),c=n(225),u=n(170),l=n(199),d=n.n(l),m=n(169),h=n(162),f=n(164),p=n(197),v=n(189),y="This may affect your ability to receive IV contrast. If you need a scan with contrast, please give us a call.",b=[{id:"pacemaker",q:"a cardiac pacemaker?",r:!1,e:"You have a cardiac pacemaker."},{id:"defibrillatorImplant",q:"implanted defibrillator (also called ICD or AICD)?",r:!1,e:"You have an implanted defibrillator."},{id:"spinalStimulator",q:"a spinal stimulator?",r:!1,e:"You have a spinal stimulator"},{id:"loopRecorder",q:"a loop recorder?",r:!1,e:"You have a loop recorder."},{id:"neurostimulator",q:"a brain neurostimulator?",r:!1,e:"You have a brain neurostimulator."}],g=[{id:"e1",q:"Was it completely removed?",r:!0,e:"Metal in your eye may not be completely removed."},{id:"e2",q:"Have you had an x-ray of your eyes showing no metal?",r:!0,e:"Metal in your eye may not be completely removed."},{id:"e3",q:"Have you had an MRI since the injury?",r:!0,e:"You have not had a MRI since getting metal in your eye."}],w=[{id:"p1",q:"Are you claustrophobic?",r:!1,inlineMessage:"We recommend having your doctor prescribe a medicine for anxiety. We recommend 1mg of Xanax."},{id:"p2",q:"Do you have any kidney disease?",r:!1,inlineMessage:y},{id:"p3",q:"Do you have diabetes?",r:!1,inlineMessage:y},{id:"AllergicToContrast",q:"Are you allergic to IV contrast or MRI contrast?",r:!1,inlineMessage:"If your MRI requires contrast, you will need to be premedicated with steriods."}],E=function(e){function t(t,n){return e.call(this,t,n)||this}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){e.prototype.componentDidMount.call(this)},n.addImplant=function(){var e=this.state.implants.slice(0);e.push(this.state.currentImplant),this.setState({implants:e})},n.removeImplant=function(){console.log("TODO")},n.validate=function(e){for(var t=[],n=0;n<e.length;n+=1){var a=e[n],r=this.state.answers[a.q];void 0!==r&&(r===a.r||a.inlineMessage||t.push(a.e||a.q))}return{problems:t,isValid:0===t.length}},n.isComplete=function(e){for(var t=0;t<e.length;t+=1)if(void 0===this.state.answers[e[t].q])return!1;return void 0!==this.getAns("MetalInEye")&&void 0!==this.getAns("implants")},n.renderQuestionSet=function(e){var t=this;return e.map(function(e){if("string"==typeof e.q)return i.createElement(c.b,{key:e.q,id:e.id,val:t.getAns(e.q),onChange:function(n){return t.ans(e.q,n)},text:e.q},e.inlineMessage?i.createElement("div",{className:"alert"},e.inlineMessage):void 0)})},n.validateAll=function(){var e=this.validate(b),t=this.validate(w),n=e.problems.concat(t.problems);return this.setState({validationResult:n}),n},n.renderValidationError=function(){var e=this,t=this.state.validationResult||[];return i.createElement(d.a,{isOpen:t.length>0&&!this.state.overrideSafetyWarning,className:"modal-content animated fadeInUp",overlayClassName:"modal-wrapper"},i.createElement("p",null,"Due to your medical history, we are unable to safely perform an MRI. If you feel that you are still a candidate for an MRI, you may submit the form anyway and we will contact you for further information."),i.createElement("ul",null,t.map(function(e){return i.createElement("li",{key:e},e)})),i.createElement("p",null,i.createElement("button",{type:"button",className:"button w-button",onClick:function(){return e.setState({overrideSafetyWarning:!0},function(){return e.doSubmit()})}},"Continue Anyway"),i.createElement("button",{type:"button",className:"button w-button",onClick:function(){return e.setState({overrideSafetyWarning:!1,validationResult:[]})}},"Cancel")))},n.render=function(){return i.createElement(o.a,null,i.createElement("section",{id:"Q2",className:"vspace80 w-container"},i.createElement("div",null,i.createElement(u.a,{num:3}),i.createElement("div",{className:"breadcrumb-stack"},i.createElement(u.c,{value:this.state.haveOrder}),i.createElement(u.b,{value:this.state.scan}),i.createElement(u.d,{slot:this.state.timeSlot,reserved:!0}))),i.createElement("div",{className:"w-col w-col-3"}),i.createElement("div",{className:"w-col w-col-6"},this.renderInner(),this.renderValidationError())))},n.renderInner=function(){var e=this;return i.createElement(i.Fragment,null,i.createElement("h3",null,"We need to ask some safety questions before we can finish scheduling you."),i.createElement("div",{className:"inputrow",style:{paddingTop:"1em"}},i.createElement("label",{htmlFor:"DoctorName",className:"flexlabel"},"Do you have...")),this.renderQuestionSet(b),i.createElement(c.b,{id:"implants",text:"any other implants?",onChange:function(t){return e.ans("implants",t)},val:this.getAns("implants")},i.createElement(c.a,{id:"implants",onChange:function(t){return e.ans("implantDetails",t)},val:this.getAns("implantDetails"),text:"Tell us as much as you can about them.",required:!0})),i.createElement("div",{style:{paddingTop:"1em"}},i.createElement(c.b,{id:"eye",text:"Have you ever had injury to your eye with metal, or metal in your eye?",onChange:function(t){return e.ans("MetalInEye",t)},val:this.getAns("MetalInEye")},this.renderQuestionSet(g),i.createElement(c.a,{id:"eyeDetails",val:this.getAns("eyeDetails"),onChange:function(t){return e.ans("eyeDetails",t)},text:"Additional details",required:!1})),this.renderQuestionSet(w)),this.isComplete(b)?i.createElement("div",{className:"cta-subitem distributed"},i.createElement(s.b,{onClick:function(){return e.doSubmit()},img:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg",text:"Continue",wide:!0})):i.createElement("div",{className:"cta-subitem distributed",style:{opacity:.5}},i.createElement(s.a,{href:"/safety-questions",img:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg",text:"All questions are required",wide:!0})))},n.doSubmit=function(){var e=this.validateAll();(this.state.overrideSafetyWarning||0===e.length)&&this.isComplete(b)&&(new f.f).appointmentHandlerPUT({req:Object.assign({},Object(p.a)(m.a.getAppointment()),{surveyDataJson:JSON.stringify(this.state.answers),safetyWarnings:Object(v.isEmpty)(this.state.validationResult)?null:JSON.stringify(this.state.validationResult)})}).then(function(){Object(h.navigate)("/questions-2")},function(e){return alert(e)})},t}(m.a);t.default=E},162:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return p}),n.d(t,"StaticQueryContext",function(){return h}),n.d(t,"StaticQuery",function(){return f});var a=n(0),r=n.n(a),i=n(8),o=n.n(i),s=n(161),c=n.n(s);n.d(t,"Link",function(){return c.a}),n.d(t,"withPrefix",function(){return s.withPrefix}),n.d(t,"navigate",function(){return s.navigate}),n.d(t,"push",function(){return s.push}),n.d(t,"replace",function(){return s.replace}),n.d(t,"navigateTo",function(){return s.navigateTo});var u=n(34);n.d(t,"waitForRouteChange",function(){return u.c});var l=n(167),d=n.n(l);n.d(t,"PageRenderer",function(){return d.a});var m=n(35);n.d(t,"parsePath",function(){return m.a});var h=r.a.createContext({}),f=function(e){return r.a.createElement(h.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function p(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},163:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n(50);var a=function(){function e(){this.fname=void 0,this.lname=void 0,this.email=void 0,this.phone=void 0,this.answers=void 0,this.implants=void 0,this.currentImplant=void 0,this.haveOrder=void 0,this.scan=void 0,this.overrideSafetyWarning=void 0,this.height=void 0,this.weight=void 0,this.doctorName=void 0,this.doctorContact=void 0,this.insFront=void 0,this.insBack=void 0,this.mriOrder=void 0,this.carrierNumber=void 0,this.groupNumber=void 0,this.policyNumber=void 0,this.timeSlot=void 0,this.err=void 0,this.dob=void 0,this.address1=void 0,this.address2=void 0,this.city=void 0,this.state=void 0,this.zip=void 0,this.optedIn=void 0,this.validationResult=void 0,this.fname="",this.lname="",this.answers={},this.implants=[],this.currentImplant="",this.scan=null,this.haveOrder=!1,this.overrideSafetyWarning=!1,this.email="",this.phone="",this.height="",this.weight="",this.doctorName="",this.doctorContact="",this.insFront="",this.insBack="",this.mriOrder="","undefined"!=typeof sessionStorage?this.timeSlot=JSON.parse(sessionStorage.getItem("timeSlot")||"{}"):this.timeSlot=null,this.err="",this.dob="",this.carrierNumber="",this.groupNumber="",this.policyNumber="",this.address1="",this.address2="",this.city="",this.state="",this.zip="",this.optedIn=!0,this.validationResult=[]}return e.loadState=function(){if("undefined"!=typeof sessionStorage){var t=JSON.parse(sessionStorage.getItem("wizard")||"{}"),n={scan:JSON.parse(sessionStorage.getItem("scan")||"{}"),haveOrder:"true"===sessionStorage.getItem("haveOrder")};return Object.assign(new e,t,n)}return new e},e}()},164:function(e,t,n){"use strict";n.d(t,"b",function(){return c}),n.d(t,"a",function(){return d}),n.d(t,"c",function(){return f}),n.d(t,"d",function(){return v}),n.d(t,"e",function(){return T}),n.d(t,"f",function(){return R}),n(36);var a=n(12),r=n.n(a),i=(n(16),n(187)),o=n(192),s=n(193),c="https://mrisched.azurewebsites.net".replace(/\/+$/,""),u=function(e,t){void 0===e&&(e=o),void 0===t&&(t=c),this.basePath=void 0,this.fetch=void 0,this.basePath=t,this.fetch=e},l=function(e,t){var n=function(e,t){var n=i.parse("/api/auth",!0);n.query=s({},n.query,{authToken:e.authToken});var a,r=s({},{method:"POST"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},d=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.auth=function(e,t){return l(e,t)(this.fetch,this.basePath)},t}(u),m=function(e,t){var n=function(e,t){var n=i.parse("/api/leadGen",!0);n.query=s({},n.query,{authToken:e.authToken});var a,r=s({},{method:"GET"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},h=function(e,t){var n=function(e,t){var n=i.parse("/api/leadGen",!0);n.query=s({},n.query,{authToken:e.authToken});var a,r=s({},{method:"POST"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},f=function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var n=t.prototype;return n.runGET=function(e,t){return m(e,t)(this.fetch,this.basePath)},n.runPOST=function(e,t){return h(e,t)(this.fetch,this.basePath)},t}(u),p=function(e){var t=function(e){var t=i.parse("/api/question",!0),n=s({},{method:"GET"},e),a={};return a&&(n.headers=s({},a,n.headers)),{url:i.format(t),options:n}}(e);return function(e,n){return void 0===e&&(e=o),void 0===n&&(n=c),e(n+t.url,t.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},v=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.getQuestions=function(e){return p(e)(this.fetch,this.basePath)},t}(u),y=function(e,t){var n=function(e,t){var n=i.parse("/api/timeslot/rules",!0);n.query=s({},n.query,{authToken:e.authToken});var a,r=s({},{method:"DELETE"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},b=function(e,t){var n=function(e,t){var n=i.parse("/api/timeslot/rules",!0);n.query=s({},n.query,{authToken:e.authToken});var a=s({},{method:"GET"},t),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},g=function(e,t){var n=function(e,t){var n=i.parse("/api/timeslot/rules",!0);n.query=s({},n.query,{authToken:e.authToken});var a,r=s({},{method:"POST"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},w=function(e,t){var n=function(e,t){var n=i.parse("/api/timeslot/rules",!0);n.query=s({},n.query,{authToken:e.authToken});var a,r=s({},{method:"PUT"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},E=function(e,t){var n=function(e,t){var n=i.parse("/api/locations",!0);n.query=s({},n.query,{locationId:e.locationId,authToken:e.authToken});var a=s({},{method:"GET"},t),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},N=function(e,t){var n=function(e,t){var n=i.parse("/api/locations",!0);n.query=s({},n.query,{locationId:e.locationId,authToken:e.authToken});var a=s({},{method:"POST"},t),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},T=function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var n=t.prototype;return n.availabilityRulesDELETE=function(e,t){return y(e,t)(this.fetch,this.basePath)},n.availabilityRulesGET=function(e,t){return b(e,t)(this.fetch,this.basePath)},n.availabilityRulesPOST=function(e,t){return g(e,t)(this.fetch,this.basePath)},n.availabilityRulesPUT=function(e,t){return w(e,t)(this.fetch,this.basePath)},n.locationsGET=function(e,t){return E(e,t)(this.fetch,this.basePath)},n.locationsPOST=function(e,t){return N(e,t)(this.fetch,this.basePath)},t}(u),k=function(e,t){var n=function(e,t){var n=i.parse("/api/appointment",!0);n.query=s({},n.query,{authToken:e.authToken,withContrast:e.withContrast,locationId:e.locationId,search:e.search});var a,r=s({},{method:"DELETE"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},q=function(e,t){var n=function(e,t){var n=i.parse("/api/appointment",!0);n.query=s({},n.query,{authToken:e.authToken,withContrast:e.withContrast,locationId:e.locationId,search:e.search});var a=s({},{method:"GET"},t),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},S=function(e,t){var n=function(e,t){var n=i.parse("/api/appointment",!0);n.query=s({},n.query,{authToken:e.authToken,withContrast:e.withContrast,locationId:e.locationId,search:e.search});var a,r=s({},{method:"POST"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},I=function(e,t){var n=function(e,t){var n=i.parse("/api/appointment",!0);n.query=s({},n.query,{authToken:e.authToken,withContrast:e.withContrast,locationId:e.locationId,search:e.search});var a,r=s({},{method:"PUT"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},C=function(e,t){var n=function(e,t){var n=i.parse("/api/appointmentByRef",!0);n.query=s({},n.query,{authToken:e.authToken,search:e.search});var a=s({},{method:"DELETE"},t),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},O=function(e,t){var n=function(e,t){var n=i.parse("/api/appointmentByRef",!0);n.query=s({},n.query,{authToken:e.authToken,search:e.search});var a=s({},{method:"GET"},t),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},j=function(e,t){var n=function(e,t){var n=i.parse("/api/sendemail",!0);n.query=s({},n.query,{authToken:e.authToken,notifyAdmin:e.notifyAdmin});var a,r=s({},{method:"POST"},t);return a={"Content-Type":"application/json"},e.req&&(r.body=JSON.stringify(e.req||{})),a&&(r.headers=s({},a,r.headers)),{url:i.format(n),options:r}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},P=function(e,t){var n=function(e,t){var n=i.parse("/api/serviceType",!0);n.query=s({},n.query,{locationId:e.locationId});var a=s({},{method:"GET"},t),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},x=function(e,t){var n=function(e,t){var n=i.parse("/api/timeslots",!0);n.query=s({},n.query,{authToken:e.authToken,withContrast:e.withContrast,length:e.length,locationId:e.locationId,skip:e.skip});var a=s({},{method:"GET"},t),r={};return r&&(a.headers=s({},r,a.headers)),{url:i.format(n),options:a}}(e,t);return function(e,t){return void 0===e&&(e=o),void 0===t&&(t=c),e(t+n.url,n.options).then(function(e){if(e.status>=200&&e.status<300)return e.json();throw e})}},R=function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var n=t.prototype;return n.appointmentHandlerDELETE=function(e,t){return k(e,t)(this.fetch,this.basePath)},n.appointmentHandlerGET=function(e,t){return q(e,t)(this.fetch,this.basePath)},n.appointmentHandlerPOST=function(e,t){return S(e,t)(this.fetch,this.basePath)},n.appointmentHandlerPUT=function(e,t){return I(e,t)(this.fetch,this.basePath)},n.appointmentRefDELETE=function(e,t){return C(e,t)(this.fetch,this.basePath)},n.appointmentRefGET=function(e,t){return O(e,t)(this.fetch,this.basePath)},n.sendConfirmationEmailPOST=function(e,t){return j(e,t)(this.fetch,this.basePath)},n.serviceTypesGET=function(e,t){return P(e,t)(this.fetch,this.basePath)},n.timeSlotsGET=function(e,t){return x(e,t)(this.fetch,this.basePath)},t}(u)},165:function(e,t){e.exports=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}},166:function(e,t,n){var a=n(25).f,r=Function.prototype,i=/^\s*function ([^ (]*)/;"name"in r||n(15)&&a(r,"name",{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(e){return""}}})},167:function(e,t,n){var a;e.exports=(a=n(173))&&a.default||a},169:function(e,t,n){"use strict";n.d(t,"a",function(){return s}),n(50);var a=n(12),r=n.n(a),i=n(0),o=n(163),s=function(e){function t(t,n){var a;return(a=e.call(this,t,n)||this).state=o.a.loadState(),a}r()(t,e),t.setAppointment=function(e){"undefined"!=typeof sessionStorage&&sessionStorage.setItem("appointmentEntity",JSON.stringify(e||null))},t.getAppointment=function(){if("undefined"!=typeof sessionStorage){var e=sessionStorage.getItem("appointmentEntity")||"{}";return JSON.parse(e)}return{}};var n=t.prototype;return n.getAns=function(e){return this.state.answers[e]},n.componentDidMount=function(){var e=o.a.loadState();this.setState(e),console.log("Loaded SafetyState",e)},n.ans=function(e,t){var n=this,a=Object.assign({},this.state.answers);a[e]=t,console.log(e,t,a),this.setState({answers:a},function(){return n.saveState()})},n.saveState=function(){"undefined"!=typeof sessionStorage&&sessionStorage.setItem("wizard",JSON.stringify({answers:this.state.answers,implants:this.state.implants,currentImplant:this.state.currentImplant,fname:this.state.fname,lname:this.state.lname,email:this.state.email,phone:this.state.phone,height:this.state.height,weight:this.state.weight,doctorName:this.state.doctorName,doctorContact:this.state.doctorContact,insFront:this.state.insFront,insBack:this.state.insBack,carrierNumber:this.state.carrierNumber,policyNumber:this.state.policyNumber,groupNumber:this.state.groupNumber,mriOrder:this.state.mriOrder,scan:this.state.scan||null,haveOrder:this.state.haveOrder,dob:this.state.dob}))},t}(i.Component)},170:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"c",function(){return s}),n.d(t,"b",function(){return c}),n.d(t,"d",function(){return u}),n(16),n(166);var a=n(0),r=n(162),i=function(e){return a.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5be12c8e888fb5963088dc64_chevron-right-blue-2.svg",width:"38",height:"38",alt:"Chevron right",className:e.translucent?"translucent":""})},o=function(e){return a.createElement("div",null,a.createElement("div",{className:"breadcrumb-row"},a.createElement("div",{className:"circled "+(e.num<1?"translucent":"")},"1"),a.createElement(i,{translucent:e.num<2}),a.createElement("div",{className:"circled "+(e.num<2?"translucent":"")},"2"),a.createElement(i,{translucent:e.num<3}),a.createElement("div",{className:"circled "+(e.num<3?"translucent":"")},"3")),a.createElement("div",{className:"breadcrumb-row"},1===e.num&&a.createElement("h3",null,a.createElement("strong",null,"Step 1.")," Your details"),2===e.num&&a.createElement("h3",null,a.createElement("strong",null,"Step 2.")," Choose your scan"),3===e.num&&a.createElement("h3",null,a.createElement("strong",null,"Step 3.")," Health & Safety Information")))},s=function(e){return a.createElement(r.Link,{to:"/have-order",className:"breadcrumb w-button",style:{display:"none"}},e.value?"Have Doctor's Order":"No Order"," ✓")},c=function(e){var t=e.value;return t?"string"==typeof t?a.createElement(r.Link,{to:"/mri-type",className:"breadcrumb w-button"},"Scan type: ",t," ×"):a.createElement(r.Link,{to:"/mri-type",className:"breadcrumb w-button"},"Scan type: ",t.name||"e!name"," ",t.contrast||"e!contrast"," ×"):a.createElement(r.Link,{to:"/mri-type",className:"breadcrumb w-button"},"Click here to select MRI type")},u=function(e){return e.slot?a.createElement(r.Link,{to:"/pick-time",className:"breadcrumb w-button"},(e.slot.slotId||"no time selected").replace(/(\d{4})-(\d{2})-(\d{2})T([^\s]{5}).*/g,"$2/$3/$1 at $4")," ×",a.createElement("br",null),a.createElement("small",null,"(",e.reserved?"reserved":"not yet reserved",")")):a.createElement("div",null)}},171:function(e,t,n){"use strict";var a=n(9);e.exports=function(){var e=a(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},172:function(e,t,n){"use strict";var a=n(207),r=n(0),i=n(188),o=n.n(i),s=n(162),c=(n(174),n(208),n(176),n(178),n(180),n(165)),u=n.n(c),l=(n(168),function(e){return u()(e),r.createElement("header",null,r.createElement("div",{className:"nav-grid"},r.createElement("div",{id:"w-node-82dfbff5e208-14f3913a",className:"header-cta-top"},r.createElement("div",{className:"header-inline-block"},r.createElement("div",{className:"cta-heading inline-block blue"},"Call : "),r.createElement("div",{className:"cta-heading inline-block"},r.createElement("a",{href:"tel:+18334332567",className:"white"},"833-IDEAL-MR"))),r.createElement("a",{href:"https://schedule.idealmri.com",className:"button-3"},"Schedule Online")),r.createElement("a",{href:"https://www.idealmri.com/",id:"w-node-82dfbff5e20f-14f3913a",className:"brand w-nav-brand w--current"},r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba3081aff7d475f9a6fa6d1_Logo%20Dark.svg",alt:"",className:"image-3"})),r.createElement("div",{"data-collapse":"medium","data-animation":"default","data-duration":"400",id:"w-node-82dfbff5e211-14f3913a",className:"navbar w-nav"},r.createElement("nav",{role:"navigation",className:"navigation-menu w-nav-menu"},r.createElement("a",{href:"https://www.idealmri.com/why-ideal-mri",className:"navigation-link-2 white w-nav-link"},"Why ideal MRI"),r.createElement("a",{href:"https://www.idealmri.com/for-clinicians",className:"navigation-link-2 white w-nav-link"},"Meet Our Team"),r.createElement("a",{href:"https://www.idealmri.com/what-to-expect",className:"navigation-link-2 white w-nav-link"},"What to Expect"),r.createElement("a",{href:"https://www.idealmri.com/pricing-and-insurance",className:"navigation-link-2 white w-nav-link"},"Pricing & Insurance"),r.createElement("a",{href:"https://www.idealmri.com/for-clinicians",className:"navigation-link-2 white w-nav-link"},"For Clinicians"),r.createElement("a",{href:"https://www.idealmri.com/come-see-us",className:"navigation-link-2 white w-nav-link"},"Find Us")),r.createElement("div",{className:"hamburger-button-2 white w-nav-button"},r.createElement("div",{className:"w-icon-nav-menu"})))),r.createElement("div",{className:"nav-spacer"}," "))}),d=n(182),m=n(183),h=function(e){return u()(e),r.createElement("footer",{className:"cta-section centered-accented"},r.createElement("div",{className:"cta-footer"},r.createElement("div",{className:"footer-inline-block"},r.createElement("h2",{className:"cta-heading inline-block blue"},r.createElement("a",{href:"tel:+18334332567"},"Call")," : "),r.createElement("h2",{className:"cta-heading inline-block"},r.createElement("a",{href:"tel:+18334332567",className:"white"},"833-IDEAL-MR"))),r.createElement("a",{href:"https://schedule.idealmri.com",className:"button large"},"Schedule Online")),r.createElement("div",{className:"cta-footer"},r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba3081aff7d475f9a6fa6d1_Logo%20Dark.svg",height:"60",alt:"",className:"cta-branding"}),r.createElement("a",{href:"https://www.idealmri.com/policies-and-hipaa-notice"},"Policies and Information")),r.createElement(o.a,null,r.createElement("script",{src:"https://code.jquery.com/jquery-3.3.1.min.js",type:"text/javascript",integrity:"sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=",crossOrigin:"anonymous"}),r.createElement("script",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/js/ideal-mri.71c22ec14.js",type:"text/javascript"})))},f=function(e){return u()(e),r.createElement("section",{className:"cta-section"},r.createElement("div",{className:"w-container"},r.createElement("div",{className:"w-layout-grid grid-2"},r.createElement("a",{href:"https://www.idealmri.com/why-ideal-mri",id:"w-node-774288a9e25a-774089fe",className:"cta-grid-item w-inline-block"},r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead31fb9e09c21b36b101_Why.svg",alt:"",className:"cta-button-image"}),r.createElement("div",{id:"w-node-774288a9e25c-774089fe"},"Why ideal MRI")),r.createElement("a",{href:"https://www.idealmri.com/what-to-expect",id:"w-node-774288a9e25e-774089fe",className:"cta-grid-item w-inline-block"},r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f69d670128b342c0a_Expect.svg",alt:"",className:"cta-button-image"}),r.createElement("div",null,"What to Expect")),r.createElement("a",{href:"https://www.idealmri.com/meet-our-team",id:"w-node-774288a9e262-774089fe",className:"cta-grid-item w-inline-block"},r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg",alt:"",className:"cta-button-image"}),r.createElement("div",null,"Meet Our Team")),r.createElement("a",{href:"https://www.idealmri.com/for-clinicians",id:"w-node-774288a9e266-774089fe",className:"cta-grid-item w-inline-block"},r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7266876eedf_Providers.svg",alt:"",className:"cta-button-image"}),r.createElement("div",null,"For Clinicians")),r.createElement("a",{href:"https://www.idealmri.com/pricing-and-insurance",id:"w-node-774288a9e26a-774089fe",className:"cta-grid-item w-inline-block"},r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7547b76eee0_Pricing.svg",alt:"",className:"cta-button-image"}),r.createElement("div",null,"Pricing & Insurance")),r.createElement("a",{href:"https://www.idealmri.com/come-see-us",id:"w-node-774288a9e26e-774089fe",className:"cta-grid-item w-inline-block"},r.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f08470e4beefa3f54_Find%20Us.svg",alt:"",className:"cta-button-image"}),r.createElement("div",null,"Find Us")))))};t.a=function(e){var t=e.children;return r.createElement(s.StaticQuery,{query:"991718019",render:function(e){return r.createElement(d.a,null,r.createElement(o.a,{title:e.site.siteMetadata.title,meta:[{name:"description",content:e.site.siteMetadata.description},{name:"keywords",content:"gatsbyjs, gatsby, javascript, sample, something"}]}),r.createElement(l,null),r.createElement(m.a,null,t),r.createElement(f,null),r.createElement(h,null))},data:a})}},173:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),o=n.n(i),s=n(37),c=n(1),u=function(e){var t=e.location,n=c.default.getResourcesForPathname(t.pathname);return r.a.createElement(s.a,{location:t,pageResources:n})};u.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=u},174:function(e,t,n){},176:function(e,t,n){},178:function(e,t,n){},180:function(e,t,n){},182:function(e,t,n){"use strict";var a=n(0),r=n(168),i=Object(r.a)("div",{target:"e199us7p0"})("display:flex;flex-direction:column;min-height:100vh;");t.a=function(e){var t=e.children,n=e.className;return a.createElement(i,{className:n},t)}},183:function(e,t,n){"use strict";var a=n(0);t.a=function(e){var t=e.children,n=e.className;return a.createElement("main",{className:n||"white-section"},a.createElement("div",{className:"vspace80 w-container"},t))}},185:function(e,t,n){"use strict";n(190);var a=n(9),r=n(171),i=n(15),o=/./.toString,s=function(e){n(17)(RegExp.prototype,"toString",e,!0)};n(18)(function(){return"/a/b"!=o.call({source:"a",flags:"b"})})?s(function(){var e=a(this);return"/".concat(e.source,"/","flags"in e?e.flags:!i&&e instanceof RegExp?r.call(e):void 0)}):"toString"!=o.name&&s(function(){return o.call(this)})},186:function(e,t,n){var a=Date.prototype,r=a.toString,i=a.getTime;new Date(NaN)+""!="Invalid Date"&&n(17)(a,"toString",function(){var e=i.call(this);return e==e?r.call(this):"Invalid Date"})},190:function(e,t,n){n(15)&&"g"!=/./g.flags&&n(25).f(RegExp.prototype,"flags",{configurable:!0,get:n(171)})},191:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return o});var a=n(0),r=n(162),i=function(e){var t=e.href,n=e.img,i=e.wide,o=e.text;return a.createElement(r.Link,{to:t,className:"cta-link "+(i?"wider":"")+" w-inline-block"},a.createElement("img",{src:n,className:"image",style:{marginRight:"8px"}}),a.createElement("div",null,o))},o=function(e){var t=e.onClick,n=e.img,r=e.wide,i=e.text;return a.createElement("a",{href:"javascript:void(0)",onClick:t,className:"cta-link "+(r?"wider":"")+" w-inline-block"},a.createElement("img",{src:n,className:"image",style:{marginRight:"8px"}}),a.createElement("div",null,i))}},197:function(e,t,n){"use strict";t.a=function(e){if(!e.partitionKey)throw"No partitionKey";if(!e.rowKey)throw"No rowKey";return{resourceId:e.resourceId,serviceType:e.serviceType,serviceLength:e.serviceLength,firstName:e.firstName,lastName:e.lastName,phone:e.phone,email:e.email,address1:e.address1,city:e.city,state:e.state,zip:e.zip,height:e.height,weight:e.weight,reminder:e.reminder,doctorName:e.doctorName,doctorPhone:e.doctorPhone,insuranceCarrier:e.insuranceCarrier,insuranceGroupNumber:e.insuranceGroupNumber,insurancePolicyNumber:e.insurancePolicyNumber,insuranceVerified:e.insuranceVerified,priorAuthObtained:e.priorAuthObtained,orderEnteredToRIS:e.orderEnteredToRIS,patientWasCalled:e.patientWasCalled,confirmed:e.confirmed,orderImageUrl:e.orderImageUrl,insuranceFrontUrl:e.insuranceFrontUrl,insuranceBackUrl:e.insuranceBackUrl,surveyDataJson:e.surveyDataJson,approvedDate:e.approvedDate,submittedDate:e.submittedDate,confirmedDate:e.confirmedDate,birthday:e.birthday,partitionKey:e.partitionKey,rowKey:e.rowKey,timestamp:e.timestamp,safetyWarnings:e.safetyWarnings,eTag:"*"}}},207:function(e){e.exports={data:{site:{siteMetadata:{title:"MRI Scheduler",description:"TBD"}}}}},208:function(e,t,n){},225:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return i}),n(185),n(186);var a=n(0),r=function(e){return a.createElement("div",null,a.createElement("div",{className:"inputrow"},a.createElement("label",{htmlFor:e.id,className:"flexlabel"},e.text,a.createElement("br",null)),a.createElement("div",{className:"flexinput"},a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.onChange(!0)},className:"button green small "+(!0===e.val&&"selected")+" w-button"},"Yes"),a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.onChange(!1)},className:"button green small "+(!1===e.val&&"selected")+" w-button"},"No"))),!0===e.val&&void 0!==e.children&&a.createElement("div",{className:"inputrow"},a.createElement("span",{className:"flexmargin"}," "),a.createElement("div",{className:"flexsubitem"},e.children)))},i=function(e){var t=e.text,n=e.val,r=e.onChange,i=e.id,o=e.required;return a.createElement("div",{className:"inputrow"},a.createElement("label",{htmlFor:i,className:"flexlabel"},t,a.createElement("br",null)),a.createElement("input",{type:"text",className:"flexinput w-input",maxLength:256,name:i,required:o,onChange:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){return r(e.currentTarget.value)}),value:n||"","data-name":i,id:i}))}}}]);
//# sourceMappingURL=component---src-pages-safety-questions-tsx-28048b2f7167d14e6a65.js.map