(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{145:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a.n(n),s=a(0),m=a(161),l=a(167),i=function(e){function t(t,a){var n;return(n=e.call(this,t,a)||this).state={haveOrder:!1,fname:"",lname:"",phone:"",email:"",dob:"",scan:""},n}r()(t,e);var a=t.prototype;return a.componentDidMount=function(){if("undefined"!=typeof sessionStorage){var e=sessionStorage.getItem("fname")||"",t=sessionStorage.getItem("lname")||"",a=JSON.parse(sessionStorage.getItem("scan")||"{}"),n="true"===sessionStorage.getItem("haveOrder");this.setState({fname:e,lname:t,haveOrder:n,scan:a})}"undefined"!=typeof sessionStorage&&this.setState({fname:sessionStorage.getItem("fname")||"",lname:sessionStorage.getItem("lname")||"",email:sessionStorage.getItem("email")||"",phone:sessionStorage.getItem("phone")||"",dob:sessionStorage.getItem("dob")||""})},a.updateStorage=function(){"undefined"!=typeof sessionStorage&&(sessionStorage.setItem("fname",this.state.fname),sessionStorage.setItem("lname",this.state.lname),sessionStorage.setItem("email",this.state.email),sessionStorage.setItem("phone",this.state.phone),sessionStorage.setItem("dob",this.state.dob))},a.formError=function(){return""===this.state.fname?"First name is required":""===this.state.lname?"Last name is required":""===this.state.email?"Email is required":null},a.render=function(){var e=this,t=this.formError();return s.createElement(m.a,null,s.createElement("section",{id:"Contact",className:"vspace80 w-container"},s.createElement("div",{className:"vspace80 centered w-row"},s.createElement("div",{className:"w-hidden-small w-hidden-tiny w-col w-col-3"}),s.createElement("div",{className:"w-col w-col-6"},s.createElement("div",null,s.createElement(l.a,{num:3}),s.createElement("div",{className:"breadcrumb-stack"},s.createElement(l.b,{value:this.state.scan}))),s.createElement("h3",null,"Contact Information"),s.createElement("form",{id:"email-form",name:"email-form","data-name":"Email Form",action:"/have-order/",method:"get"},s.createElement("label",{htmlFor:"fname"},"First name"),s.createElement("input",{type:"text",className:"w-input centered",maxLength:256,name:"fname","data-name":"First Name",id:"fname",value:this.state.fname,onChange:function(t){return e.setState({fname:t.currentTarget.value},function(){return e.updateStorage()})}}),s.createElement("label",{htmlFor:"lname"},"Last name"),s.createElement("input",{type:"text",className:"w-input centered",maxLength:256,name:"lname","data-name":"Last Name",id:"lname",value:this.state.lname,onChange:function(t){return e.setState({lname:t.currentTarget.value},function(){return e.updateStorage()})}}),s.createElement("label",{htmlFor:"email"},"Email Address"),s.createElement("input",{type:"text",className:"w-input centered",maxLength:256,name:"email","data-name":"Email",id:"email",required:!0,value:this.state.email,onChange:function(t){return e.setState({email:t.currentTarget.value},function(){return e.updateStorage()})}}),s.createElement("label",{htmlFor:"email"},"Phone"),s.createElement("input",{type:"text",className:"w-input centered",maxLength:256,name:"phone","data-name":"Phone",id:"phone",required:!0,value:this.state.phone,onChange:function(t){return e.setState({phone:t.currentTarget.value},function(){return e.updateStorage()})}}),s.createElement("label",{htmlFor:"email"},"Date of Birth"),s.createElement("input",{type:"text",className:"w-input centered",maxLength:256,name:"dob","data-name":"Date of Birth",id:"dob",required:!0,value:this.state.dob,onChange:function(t){return e.setState({dob:t.currentTarget.value},function(){return e.updateStorage()})}}),s.createElement("input",{type:"submit",defaultValue:"Let's begin!","data-wait":"Please wait...",className:(t?"disabled ":"")+"w-button",disabled:!!t}))),s.createElement("div",{className:"w-hidden-small w-hidden-tiny w-col w-col-3"}))))},t}(s.Component);t.default=i},162:function(e,t,a){var n=a(25).f,r=Function.prototype,s=/^\s*function ([^ (]*)/;"name"in r||a(15)&&n(r,"name",{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})},167:function(e,t,a){"use strict";a.d(t,"a",function(){return s}),a.d(t,"c",function(){return m}),a.d(t,"b",function(){return l}),a.d(t,"d",function(){return i}),a(162);var n=a(0),r=function(e){return n.createElement("img",{src:"https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5be12c8e888fb5963088dc64_chevron-right-blue-2.svg",width:"38",height:"38",alt:"Chevron right",className:e.translucent?"translucent":""})},s=function(e){return n.createElement("div",null,n.createElement("div",{className:"breadcrumb-row"},n.createElement("div",{className:"circled "+(e.num<1?"translucent":"")},"1"),n.createElement(r,{translucent:e.num<2}),n.createElement("div",{className:"circled "+(e.num<2?"translucent":"")},"2"),n.createElement(r,{translucent:e.num<3}),n.createElement("div",{className:"circled "+(e.num<3?"translucent":"")},"3")),n.createElement("div",{className:"breadcrumb-row"},1===e.num&&n.createElement("h3",null,n.createElement("strong",null,"Step 1.")," Your details"),2===e.num&&n.createElement("h3",null,n.createElement("strong",null,"Step 2.")," Choose your scan"),3===e.num&&n.createElement("h3",null,n.createElement("strong",null,"Step 3.")," Health & Safety Information")))},m=function(e){var t=e.value;return n.createElement("a",{href:"/have-order",className:"breadcrumb w-button",style:{display:"none"}},t?"Have Doctor's Order":"No Order"," ✓")},l=function(e){var t=e.value;return"string"==typeof t?n.createElement("a",{href:"/mri-type",className:"breadcrumb w-button"},"Scan type: ",t):n.createElement("a",{href:"/mri-type",className:"breadcrumb w-button"},"Scan type: ",t.name||"e!name"," ",t.contrast||"e!contrast")},i=function(e){var t=e.value;return n.createElement("a",{href:"/pick-time",className:"breadcrumb w-button"},t," ",n.createElement("br",null),n.createElement("small",null,"(not yet reserved)"))}}}]);
//# sourceMappingURL=component---src-pages-contact-info-tsx-0a7643e125e9f83a02a2.js.map