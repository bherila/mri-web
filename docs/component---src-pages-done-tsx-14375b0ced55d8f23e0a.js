(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{147:function(e,t,s){"use strict";s.r(t);var i=s(12),a=s.n(i),n=s(0),r=s(170),o=function(e){function t(t,s){return e.call(this,t,s)||this}a()(t,e);var s=t.prototype;return s.componentDidMount=function(){e.prototype.componentDidMount.call(this)},s.render=function(){return n.createElement(r.a,null,n.createElement("section",{id:"Q2",className:"vspace80 w-container"},n.createElement("div",{className:"vspace80 centered w-row"},n.createElement("div",{className:"w-hidden-small w-hidden-tiny w-col w-col-3"}),n.createElement("div",{className:"w-col w-col-6"},n.createElement("h2",null,"All Done"),n.createElement("p",null,"We'll email you a confirmation of your appointment. And if there's anything else we need, we'll get in touch.")),n.createElement("div",{className:"w-hidden-small w-hidden-tiny w-col w-col-3"})),n.createElement("aside",{id:"FurtherResources",className:"centered"},n.createElement("h3",null,"Further Resources Below"),n.createElement("div",{className:"cta-subitem distributed"},n.createElement("a",{href:"/why-ideal-mri",className:"cta-link w-inline-block"},n.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead31fb9e09c21b36b101_Why.svg",alt:"",className:"image"}),n.createElement("div",null,"Why idealMRI?")),n.createElement("a",{href:"/what-to-expect",className:"cta-link w-inline-block"},n.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f69d670128b342c0a_Expect.svg",alt:"",className:"image"}),n.createElement("div",null,"What to Expect")),n.createElement("a",{href:"/pricing-and-insurance",className:"cta-link w-inline-block"},n.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7547b76eee0_Pricing.svg",alt:"",className:"image"}),n.createElement("div",null,"Pricing & Insurance"))),n.createElement("div",{className:"cta-subitem distributed"},n.createElement("a",{href:"/come-see-us",className:"cta-link w-inline-block"},n.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f08470e4beefa3f54_Find%20Us.svg",alt:"",className:"image"}),n.createElement("div",null,"Find us")),n.createElement("a",{href:"/meet-our-team",className:"cta-link w-inline-block"},n.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg",alt:"",className:"image"}),n.createElement("div",null,"Meet our Team")),n.createElement("a",{href:"/for-providers",className:"cta-link w-inline-block"},n.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7266876eedf_Providers.svg",alt:"",className:"image"}),n.createElement("div",null,"Providers"))))))},t}(s(169).a);t.default=o},161:function(e,t,s){"use strict";s.d(t,"a",function(){return i}),s(51);var i=function(){function e(){this.fname=void 0,this.lname=void 0,this.email=void 0,this.phone=void 0,this.answers=void 0,this.implants=void 0,this.currentImplant=void 0,this.haveOrder=void 0,this.scan=void 0,this.overrideSafetyWarning=void 0,this.height=void 0,this.weight=void 0,this.doctorName=void 0,this.doctorContact=void 0,this.insFront=void 0,this.insBack=void 0,this.mriOrder=void 0,this.carrierNumber=void 0,this.groupNumber=void 0,this.policyNumber=void 0,this.timeSlot=void 0,this.err=void 0,this.dob=void 0,this.address1=void 0,this.address2=void 0,this.city=void 0,this.state=void 0,this.zip=void 0,this.optedIn=void 0,this.fname="",this.lname="",this.answers={},this.implants=[],this.currentImplant="",this.scan=null,this.haveOrder=!1,this.overrideSafetyWarning=!1,this.email="",this.phone="",this.height="",this.weight="",this.doctorName="",this.doctorContact="",this.insFront="",this.insBack="",this.mriOrder="","undefined"!=typeof sessionStorage?this.timeSlot=JSON.parse(sessionStorage.getItem("timeSlot")||"{}"):this.timeSlot=null,this.err="",this.dob="",this.carrierNumber="",this.groupNumber="",this.policyNumber="",this.address1="",this.address2="",this.city="",this.state="",this.zip="",this.optedIn=!0}return e.loadState=function(){if("undefined"!=typeof sessionStorage){var t=JSON.parse(sessionStorage.getItem("wizard")||"{}"),s={scan:JSON.parse(sessionStorage.getItem("scan")||"{}"),haveOrder:"true"===sessionStorage.getItem("haveOrder")};return Object.assign(new e,t,s)}return new e},e}()},162:function(e,t){e.exports=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}},169:function(e,t,s){"use strict";s.d(t,"a",function(){return o}),s(51);var i=s(12),a=s.n(i),n=s(0),r=s(161),o=function(e){function t(t,s){var i;return(i=e.call(this,t,s)||this).state=r.a.loadState(),i}a()(t,e);var s=t.prototype;return s.getAns=function(e){return this.state.answers[e]},s.componentDidMount=function(){var e=r.a.loadState();this.setState(e)},s.ans=function(e,t){var s=this,i=Object.assign(new r.a,this.state.answers);i[e]=t,console.log(e,t,i),this.setState({answers:i},function(){return s.saveState()})},s.saveState=function(){"undefined"!=typeof sessionStorage&&sessionStorage.setItem("wizard",JSON.stringify({answers:this.state.answers,implants:this.state.implants,currentImplant:this.state.currentImplant,fname:this.state.fname,lname:this.state.lname,email:this.state.email,phone:this.state.phone,height:this.state.height,weight:this.state.weight,doctorName:this.state.doctorName,doctorContact:this.state.doctorContact,insFront:this.state.insFront,insBack:this.state.insBack,mriOrder:this.state.mriOrder,scan:this.state.scan||null,haveOrder:this.state.haveOrder,dob:this.state.dob}))},t}(n.Component)}}]);
//# sourceMappingURL=component---src-pages-done-tsx-14375b0ced55d8f23e0a.js.map