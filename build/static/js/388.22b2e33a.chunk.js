"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[388],{67581:function(e,n,t){t.r(n);var c=t(1413),s=t(29439),o=t(72791),r=t(51860),l=t(37539),a=t(47022),i=t(89743),u=t(2677),d=t(30577),h=t(16030),f=t(80184);n.default=function(){var e=(0,o.useState)([]),n=(0,s.Z)(e,2),t=n[0],m=n[1],x=(0,o.useState)(!1),j=(0,s.Z)(x,2),w=j[0],g=j[1],p=(0,h.v9)((function(e){return(0,c.Z)({},e)})).user;(0,o.useEffect)((function(){v()}),[]);var v=function(){g(!0),(0,l.su)().then((function(e){g(!1),m(e.data)})).catch((function(e){g(!1),console.log(e)}))},Z=function(e){window.confirm("are you sure wanna delete ".concat(e,"?"))&&(console.log(e),(0,l.Ir)(e,p.token).then((function(e){v(),d.Am.error("".concat(e.data.title," is deleted"))})).catch((function(e){console.log(e),d.Am.error(e.response.data)})))};return(0,f.jsx)(a.Z,{className:"container-fluid",children:(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)(r.TL,{}),(0,f.jsx)(r.Yb,{}),w?(0,f.jsx)("h4",{className:"text-white text-center",children:"loading"}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("h1",{className:"text-center",style:{color:"white"},children:"All Products"}),(0,f.jsx)(i.Z,{children:t.map((function(e){return(0,f.jsx)(u.Z,{className:"mb-3",sm:12,md:6,lg:4,xl:3,children:(0,f.jsx)(r.DP,{handleRemove:Z,product:e,loadAllProducts:v})},e._id)}))})]})]})})}}}]);
//# sourceMappingURL=388.22b2e33a.chunk.js.map