(this.webpackJsonpmanager=this.webpackJsonpmanager||[]).push([[0],{23:function(e,t,n){e.exports=n(38)},28:function(e,t,n){},29:function(e,t,n){},31:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(21),r=n.n(l),o=(n(28),n(9)),i=n(1),u=(n(29),n(3)),m=n.n(u),s=n(8),d=(n(31),n(4)),p=function(e){var t=Object(i.f)();function n(){return(n=Object(s.a)(m.a.mark((function e(){var n,a,c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.getElementById("accountId").value,a=document.getElementById("password").value,e.prev=2,e.next=5,fetch("".concat(d.domain,"admin/login"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:a})}).then((function(e){return e.json()}));case 5:c=e.sent,console.log(c),"succeed"==c.status&&t.push("/admin/home"),e.next=13;break;case 10:throw e.prev=10,e.t0=e.catch(2),e.t0;case 13:case"end":return e.stop()}}),e,null,[[2,10]])})))).apply(this,arguments)}return c.a.createElement("div",{id:"loginContainer"},c.a.createElement("div",null,"Asahi Admin Login"),c.a.createElement("form",{name:"loginForm"},c.a.createElement("label",null,"USERNAME"),c.a.createElement("input",{type:"text",id:"accountId",name:"accountId",required:!0,onFocus:function(){return console.log("clicked")},onBlur:function(){return console.log("out")}}),c.a.createElement("label",null,"PASSWORD"),c.a.createElement("input",{type:"password",id:"password",name:"password",required:!0,onFocus:function(){return console.log("clicked")},onBlur:function(){return console.log("out")}}),c.a.createElement("input",{type:"button",value:"Login",onClick:function(){return function(){return n.apply(this,arguments)}()}})))},E=(n(37),function(){return c.a.createElement("div",null,"Home Page")}),h=n(11),g=n(10),f=function(){var e=Object(a.useState)([]),t=Object(g.a)(e,2),n=t[0],l=t[1],r=Object(a.useState)(),o=Object(g.a)(r,2),i=o[0],u=o[1],m=0;function s(e){var t=e.target.getAttribute("akey");console.log("indexOfEvent = ".concat(t));var a=n[t];console.log("currentObject = ".concat(a));var c=e.target.name;a[c]=e.target.value,l((function(e){return console.log("1",e),e.splice(t,1,a),Object(h.a)(e)}))}return Object(a.useEffect)((function(){console.log("useEffect"),l((function(e){return m++,[].concat(Object(h.a)(e),[{count:m,id:35,category:3,name:"salmon roll",description:"good!",price:35,order:1,active:!1},{count:2,id:36,category:3,name:"egg roll",description:"good!",price:20,order:2,active:!0}])})),u(c.a.createElement(c.a.Fragment,null,c.a.createElement("option",{value:"roll"},"roll"),c.a.createElement("option",{value:"roll"},"drink")))}),[]),c.a.createElement("div",null,c.a.createElement("div",null,"Menu Page"),c.a.createElement("div",null,c.a.createElement("form",null,c.a.createElement("table",{style:{width:"100%"}},c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("th",null,"No."),c.a.createElement("th",null,"Category"),c.a.createElement("th",null,"Name"),c.a.createElement("th",null,"Description"),c.a.createElement("th",null,"Price"),c.a.createElement("th",null,"Order"),c.a.createElement("th",null,"Image"),c.a.createElement("th",null,"Active"),c.a.createElement("th",null),c.a.createElement("th",null)),n.map((function(e){return e.active?c.a.createElement("select",{akey:e.count-1,name:"active",onChange:s},c.a.createElement("option",{value:"true"},"yes"),c.a.createElement("option",{value:"false"},"No")):c.a.createElement("select",{akey:e.count-1,name:"active",onChange:s},c.a.createElement("option",{value:"true"},"yes"),c.a.createElement("option",{selected:!0,value:"false"},"No")),c.a.createElement("tr",{key:e.id},c.a.createElement("td",null,e.count),c.a.createElement("td",null,c.a.createElement("select",{akey:e.count-1,name:"category",onChange:s,value:e.category},i)),c.a.createElement("td",null,c.a.createElement("input",{akey:e.count-1,type:"text",name:"name",required:!0,value:e.name,onChange:s})),c.a.createElement("td",null,c.a.createElement("input",{akey:e.count-1,type:"text",name:"description",required:!0,value:e.description,onChange:s})),c.a.createElement("td",null,c.a.createElement("input",{akey:e.count-1,type:"text",name:"price",required:!0,value:e.price,onChange:s})),c.a.createElement("td",null,c.a.createElement("input",{akey:e.count-1,type:"text",name:"order",required:!0,value:e.order,onChange:s})),c.a.createElement("td",null,c.a.createElement("input",{akey:e.count-1,type:"file",name:"image",onChange:function(e){console.log(e.target.files[0].name)}})),c.a.createElement("td",null,c.a.createElement("select",{akey:e.count-1,name:"active",onChange:s,value:e.active},c.a.createElement("option",{value:"true"},"yes"),c.a.createElement("option",{value:"false"},"No"))),c.a.createElement("td",null,"Update"),c.a.createElement("td",null,"Delete"))})))))))},v=function(){var e=Object(a.useState)([]),t=Object(g.a)(e,2),n=t[0],l=t[1],r=Object(a.useState)(),o=Object(g.a)(r,2),i=(o[0],o[1],Object(a.useState)([])),u=Object(g.a)(i,2),p=u[0],E=u[1],f=0;function v(e){var t=e.target.getAttribute("akey");console.log("indexOfEvent = ".concat(t));var a=n[t];console.log("currentObject = ".concat(a));var c=e.target.name;a[c]=e.target.value,l((function(e){return console.log("1",e),e.splice(t,1,a),Object(h.a)(e)}))}function y(e){console.log(e.target.name),console.log(e.target.value)}function b(e){return k.apply(this,arguments)}function k(){return(k=Object(s.a)(m.a.mark((function e(t){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target.getAttribute("akey"),console.log(n[a]),e.next=4,fetch("".concat(d.domain,"admin/category/update"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(n[a])});case 4:e.sent,window.location.reload();case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){return j.apply(this,arguments)}function j(){return(j=Object(s.a)(m.a.mark((function e(t){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target.getAttribute("akey"),console.log(n[a]),e.next=4,fetch("".concat(d.domain,"admin/category/delete"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(n[a])});case 4:e.sent,window.location.reload();case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){return(C=Object(s.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,fetch("".concat(d.domain,"admin/category/add"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.target.name.value,sort:t.target.sort.value})});case 3:e.sent,window.location.reload(),console.log(t.target.name.value);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){for(var e=function(e){E((function(t){return[].concat(Object(h.a)(t),[c.a.createElement("option",{key:e,value:e},e)])}))},t=1;t<21;t++)e(t);fetch("".concat(d.domain,"admin/category/get"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){l(e)}))}),[]),c.a.createElement("div",null,c.a.createElement("div",{style:{fontSize:"20px",textAlign:"left"}},"Category Page"),c.a.createElement("div",null,c.a.createElement("form",null,c.a.createElement("table",{style:{width:"100%"}},c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("th",null,"No."),c.a.createElement("th",null,"Name"),c.a.createElement("th",null,"Sort"),c.a.createElement("th",null),c.a.createElement("th",null)),n.map((function(e){return f++,c.a.createElement("tr",{key:e.id},c.a.createElement("td",null,e.id),c.a.createElement("td",null,c.a.createElement("input",{type:"text",akey:f-1,name:"name",value:e.name,required:!0,onChange:v})),c.a.createElement("td",null,c.a.createElement("select",{akey:f-1,name:"sort",value:e.sort,required:!0,onChange:v},p)),c.a.createElement("td",null,c.a.createElement("input",{type:"button",akey:f-1,value:"Update",onClick:b})),c.a.createElement("td",null,c.a.createElement("input",{type:"button",akey:f-1,value:"Delete",onClick:O})))}))))),c.a.createElement("div",{style:{fontSize:"20px",textAlign:"left",marginTop:"20px"}},"Add"),c.a.createElement("form",{onSubmit:function(e){return C.apply(this,arguments)}},c.a.createElement("table",null,c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Name"),c.a.createElement("th",null,"Sort"),c.a.createElement("th",null)),c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("input",{type:"text",name:"name",onChange:y})),c.a.createElement("td",null,c.a.createElement("select",{name:"sort",onChange:y},p)),c.a.createElement("td",null,c.a.createElement("button",{type:"submit"},"ADD"))))))))},y=function(){return c.a.createElement("div",null,"Reservation Page")},b=function(){var e=Object(a.useState)([]),t=Object(g.a)(e,2),n=t[0],l=t[1],r=0;function o(e){var t=e.target.getAttribute("akey"),a=n[t];a[e.target.name]=e.target.value,l((function(e){return console.log("1",e),e.splice(t,1,a),Object(h.a)(e)}))}function i(){return(i=Object(s.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(d.domain,"admin/hours/update"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 2:e.sent,window.location.reload();case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){fetch("".concat(d.domain,"admin/hours/get"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e),l(e)})),console.log(n)}),[]),c.a.createElement("div",null,c.a.createElement("div",null,"Category Page"),c.a.createElement("div",null,c.a.createElement("form",null,c.a.createElement("table",{style:{width:"100%"}},c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("th",null),c.a.createElement("th",null,"Open time"),c.a.createElement("th",null,"Close time")),n.map((function(e){return r++,c.a.createElement("tr",{key:e.id},c.a.createElement("td",null,e.date),c.a.createElement("td",null,c.a.createElement("input",{akey:r-1,type:"text",name:"open",value:e.openhour,onChange:o})),c.a.createElement("td",null,c.a.createElement("input",{akey:r-1,type:"text",name:"close",value:e.closehour,onChange:o})),c.a.createElement("td",null,c.a.createElement("select",{akey:r-1,name:"status",value:e.status,onChange:o},c.a.createElement("option",{value:1},"Open"),c.a.createElement("option",{value:0},"Closed"))))})))),c.a.createElement("div",null,c.a.createElement("input",{type:"button",value:"UPDATE",onClick:function(){return i.apply(this,arguments)}})))))},k=function(){var e=Object(i.f)();function t(){return(t=Object(s.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("".concat(d.domain,"admin/logout"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()}));case 3:"succeed"==t.sent.status&&e.push("/admin"),t.next=10;break;case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}return c.a.createElement("div",{id:"navigationContainer"},c.a.createElement("div",{id:"linkContainer"},c.a.createElement(o.b,{className:"links",to:"/admin/home"},"Home"),c.a.createElement(o.b,{className:"links",to:"/admin/menu"},"Menu"),c.a.createElement(o.b,{className:"links",to:"/admin/category"},"Category"),c.a.createElement(o.b,{className:"links",to:"/admin/reservation"},"Reservation"),c.a.createElement(o.b,{className:"links",to:"/admin/hours"},"Hours")),c.a.createElement("div",{id:"mainContainer"},c.a.createElement("div",{id:"topNavigation"},c.a.createElement("button",{type:"button",onClick:function(){!function(){t.apply(this,arguments)}()}},"logout")),c.a.createElement(i.c,null,c.a.createElement(i.a,{path:"/admin/home",component:E}),c.a.createElement(i.a,{path:"/admin/menu",component:f}),c.a.createElement(i.a,{path:"/admin/category",component:v}),c.a.createElement(i.a,{path:"/admin/reservation",component:y}),c.a.createElement(i.a,{path:"/admin/hours",component:b}))))};var O=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(o.a,null,c.a.createElement(i.c,null,c.a.createElement(i.a,{exact:!0,path:"/admin",component:p}),c.a.createElement(i.a,{path:"/admin"},c.a.createElement(k,null))),c.a.createElement("div",{id:"footerDistance"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},4:function(e,t){t.domain="http://localhost:3001/"}},[[23,1,2]]]);
//# sourceMappingURL=main.c2d80af9.chunk.js.map