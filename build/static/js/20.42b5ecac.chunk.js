"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[20],{48902:function(e,t,r){r.r(t);var a=r(29439),s=r(1413),n=r(72791),o=r(51860),i=r(16030),c=r(30577),l=r(6187),u=r(16871),d=r(47527),h=r(80184);t.default=function(){var e=(0,i.v9)((function(e){return(0,s.Z)({},e)})).user,t=(0,n.useState)(""),r=(0,a.Z)(t,2),g=r[0],m=r[1],p=(0,n.useState)(!1),v=(0,a.Z)(p,2),f=v[0],C=v[1],x=(0,n.useState)(!1),b=(0,a.Z)(x,2),j=b[0],O=(b[1],(0,n.useState)([])),N=(0,a.Z)(O,2),S=N[0],k=N[1],A=(0,n.useState)(""),R=(0,a.Z)(A,2),E=R[0],H=R[1],Z=(0,u.UO)().slug,w=(0,u.s0)(),y=(0,n.useState)(""),B=(0,a.Z)(y,2);B[0],B[1];(0,n.useEffect)((function(){P(),T()}),[]);var P=function(){(0,l.CP)().then((function(e){k(e.data)})).catch((function(e){c.Am.error("FETCHING CATEGORY ERROR")}))},T=function(){(0,d.Aw)(Z).then((function(e){m(e.data.subCategory.name),H(e.data.subCategory.parent)})).catch((function(e){c.Am.error("FETCHING CATEGORY ERROR")}))};return(0,h.jsx)(h.Fragment,{children:j?(0,h.jsx)("h4",{className:"text-white text-center ",children:"Loading..."}):(0,h.jsx)("div",{className:"container-fluid",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsx)("div",{className:"col-md-2",children:(0,h.jsx)(o.TL,{})}),(0,h.jsx)("div",{className:"col",children:(0,h.jsxs)(o.Yb,{children:[(0,h.jsx)(o.CB,{submitHandler:function(t){return t.preventDefault(),!g||g.length<2?c.Am.error("Name must be atleast 2 characters",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):E?(C(!0),void(0,d.Sv)(Z,{name:g,parent:E},e.token).then((function(e){C(!1),c.Am.success("".concat(e.data.name," is created"),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),w(-1)})).catch((function(e){C(!1),c.Am.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))):c.Am.error("Select the Category",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},name:g,setName:m,buttonloading:f,title:"Update Sub Category"}),(0,h.jsxs)("div",{className:"form-group mb-2",children:[(0,h.jsx)("label",{children:(0,h.jsx)("strong",{className:"text-white",children:"Select Category"})}),(0,h.jsx)("select",{required:!0,name:"category",className:"form-control",onChange:function(e){return H(e.target.value)},value:E._id,children:S&&S.length>0&&(null===S||void 0===S?void 0:S.map((function(e){return(0,h.jsx)("option",{value:e._id,selected:e._id===E,children:e.name},e._id)})))})]})]})})]})})})}}}]);
//# sourceMappingURL=20.42b5ecac.chunk.js.map