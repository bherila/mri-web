(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{170:function(t,n,r){"use strict";r.d(n,"a",function(){return f}),r.d(n,"b",function(){return l}),r.d(n,"c",function(){return y}),r.d(n,"d",function(){return P}),r.d(n,"e",function(){return I}),r(37);var o=r(12),e=r.n(o),i=(r(15),r(188)),u=r(196),a=r(197),s="https://mrisched.azurewebsites.net".replace(/\/+$/,""),h=function(t,n){void 0===t&&(t=u),void 0===n&&(n=s),this.basePath=void 0,this.fetch=void 0,this.basePath=n,this.fetch=t},c=function(t,n){var r=function(t,n){var r=i.parse("/api/auth",!0);r.query=a({},r.query,{authToken:t.authToken});var o,e=a({},{method:"POST"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},f=function(t){function n(){return t.apply(this,arguments)||this}return e()(n,t),n.prototype.auth=function(t,n){return c(t,n)(this.fetch,this.basePath)},n}(h),p=function(t,n){var r=function(t,n){var r=i.parse("/api/leadGen",!0);r.query=a({},r.query,{authToken:t.authToken});var o,e=a({},{method:"GET"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},d=function(t,n){var r=function(t,n){var r=i.parse("/api/leadGen",!0);r.query=a({},r.query,{authToken:t.authToken});var o,e=a({},{method:"POST"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},l=function(t){function n(){return t.apply(this,arguments)||this}e()(n,t);var r=n.prototype;return r.runGET=function(t,n){return p(t,n)(this.fetch,this.basePath)},r.runPOST=function(t,n){return d(t,n)(this.fetch,this.basePath)},n}(h),v=function(t){var n=function(t){var n=i.parse("/api/question",!0),r=a({},{method:"GET"},t),o={};return o&&(r.headers=a({},o,r.headers)),{url:i.format(n),options:r}}(t);return function(t,r){return void 0===t&&(t=u),void 0===r&&(r=s),t(r+n.url,n.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},y=function(t){function n(){return t.apply(this,arguments)||this}return e()(n,t),n.prototype.getQuestions=function(t){return v(t)(this.fetch,this.basePath)},n}(h),T=function(t,n){var r=function(t,n){var r=i.parse("/api/timeslot/rules",!0);r.query=a({},r.query,{authToken:t.authToken});var o,e=a({},{method:"DELETE"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},q=function(t,n){var r=function(t,n){var r=i.parse("/api/timeslot/rules",!0);r.query=a({},r.query,{authToken:t.authToken});var o=a({},{method:"GET"},n),e={};return e&&(o.headers=a({},e,o.headers)),{url:i.format(r),options:o}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},m=function(t,n){var r=function(t,n){var r=i.parse("/api/timeslot/rules",!0);r.query=a({},r.query,{authToken:t.authToken});var o,e=a({},{method:"POST"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},b=function(t,n){var r=function(t,n){var r=i.parse("/api/timeslot/rules",!0);r.query=a({},r.query,{authToken:t.authToken});var o,e=a({},{method:"PUT"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},w=function(t,n){var r=function(t,n){var r=i.parse("/api/locations",!0);r.query=a({},r.query,{locationId:t.locationId,authToken:t.authToken});var o=a({},{method:"GET"},n),e={};return e&&(o.headers=a({},e,o.headers)),{url:i.format(r),options:o}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},k=function(t,n){var r=function(t,n){var r=i.parse("/api/locations",!0);r.query=a({},r.query,{locationId:t.locationId,authToken:t.authToken});var o=a({},{method:"POST"},n),e={};return e&&(o.headers=a({},e,o.headers)),{url:i.format(r),options:o}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},P=function(t){function n(){return t.apply(this,arguments)||this}e()(n,t);var r=n.prototype;return r.availabilityRulesDELETE=function(t,n){return T(t,n)(this.fetch,this.basePath)},r.availabilityRulesGET=function(t,n){return q(t,n)(this.fetch,this.basePath)},r.availabilityRulesPOST=function(t,n){return m(t,n)(this.fetch,this.basePath)},r.availabilityRulesPUT=function(t,n){return b(t,n)(this.fetch,this.basePath)},r.locationsGET=function(t,n){return w(t,n)(this.fetch,this.basePath)},r.locationsPOST=function(t,n){return k(t,n)(this.fetch,this.basePath)},n}(h),j=function(t,n){var r=function(t,n){var r=i.parse("/api/appointment",!0);r.query=a({},r.query,{authToken:t.authToken,withContrast:t.withContrast,locationId:t.locationId,search:t.search});var o,e=a({},{method:"DELETE"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},E=function(t,n){var r=function(t,n){var r=i.parse("/api/appointment",!0);r.query=a({},r.query,{authToken:t.authToken,withContrast:t.withContrast,locationId:t.locationId,search:t.search});var o=a({},{method:"GET"},n),e={};return e&&(o.headers=a({},e,o.headers)),{url:i.format(r),options:o}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},C=function(t,n){var r=function(t,n){var r=i.parse("/api/appointment",!0);r.query=a({},r.query,{authToken:t.authToken,withContrast:t.withContrast,locationId:t.locationId,search:t.search});var o,e=a({},{method:"POST"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},S=function(t,n){var r=function(t,n){var r=i.parse("/api/appointment",!0);r.query=a({},r.query,{authToken:t.authToken,withContrast:t.withContrast,locationId:t.locationId,search:t.search});var o,e=a({},{method:"PUT"},n);return o={"Content-Type":"application/json"},t.req&&(e.body=JSON.stringify(t.req||{})),o&&(e.headers=a({},o,e.headers)),{url:i.format(r),options:e}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},O=function(t,n){var r=function(t,n){var r=i.parse("/api/timeslots",!0);r.query=a({},r.query,{authToken:t.authToken,withContrast:t.withContrast,length:t.length,locationId:t.locationId});var o=a({},{method:"GET"},n),e={};return e&&(o.headers=a({},e,o.headers)),{url:i.format(r),options:o}}(t,n);return function(t,n){return void 0===t&&(t=u),void 0===n&&(n=s),t(n+r.url,r.options).then(function(t){if(t.status>=200&&t.status<300)return t.json();throw t})}},I=function(t){function n(){return t.apply(this,arguments)||this}e()(n,t);var r=n.prototype;return r.appointmentHandlerDELETE=function(t,n){return j(t,n)(this.fetch,this.basePath)},r.appointmentHandlerGET=function(t,n){return E(t,n)(this.fetch,this.basePath)},r.appointmentHandlerPOST=function(t,n){return C(t,n)(this.fetch,this.basePath)},r.appointmentHandlerPUT=function(t,n){return S(t,n)(this.fetch,this.basePath)},r.timeSlotsGET=function(t,n){return O(t,n)(this.fetch,this.basePath)},n}(h)}}]);
//# sourceMappingURL=5-15e0d0325f353c7ac82e.js.map