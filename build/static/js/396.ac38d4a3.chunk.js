"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[396],{93660:function(e,t,s){s.r(t),s.d(t,{default:function(){return Z}});var n=s(4942),a=s(93433),r=s(1413),c=s(29439),i=s(72791),l=s(37539),d=s(6187),o=s(16030),u=s(51860),x=s(40743),h=s(4587),f=s(14676),m=s(1428),p=s(47527),j=s(45736),y=s(43360),g=s(89743),N=s(16871),v=(s(30577),s(80184)),S=x.Z.SubMenu,Z=(x.Z.ItemGroup,function(){var e,t=(0,i.useState)([]),s=(0,c.Z)(t,2),Z=s[0],b=s[1],C=(0,i.useState)([0,0]),E=(0,c.Z)(C,2),w=E[0],_=E[1],k=(0,i.useState)(!1),R=(0,c.Z)(k,2),P=R[0],I=R[1],A=(0,i.useState)(!1),F=(0,c.Z)(A,2),T=F[0],U=F[1],O=(0,i.useState)([]),L=(0,c.Z)(O,2),H=L[0],z=L[1],Q=(0,i.useState)([]),Y=(0,c.Z)(Q,2),q=Y[0],D=Y[1],G=(0,i.useState)([]),M=(0,c.Z)(G,2),K=M[0],V=M[1],B=(0,i.useState)([]),J=(0,c.Z)(B,2),W=(J[0],J[1]),X=(0,i.useState)(""),$=(0,c.Z)(X,2),ee=($[0],$[1]),te=(0,i.useState)(1),se=(0,c.Z)(te,2),ne=se[0],ae=se[1],re=(0,i.useState)(0),ce=(0,c.Z)(re,2),ie=ce[0],le=ce[1],de=(0,o.I0)(),oe=(0,N.s0)(),ue=(0,N.TH)(),xe=(0,o.v9)((function(e){return(0,r.Z)({},e)})),he=xe.search,fe=xe.filterApplied,me=he.text;(0,i.useEffect)((function(){de({type:"FILTER_APPLIED",payload:!1})}),[ue]),(0,i.useEffect)((function(){pe(),(0,d.CP)().then((function(e){z(e.data)})),(0,p.zj)().then((function(e){V(e.data)}))}),[]),(0,i.useEffect)((function(){(0,l.qU)().then((function(e){le(e.data)}))}),[]);var pe=function(){I(!0),(0,l.rO)("createdAt","desc",ne,6).then((function(e){I(!1),b(e.data),de({type:"FILTER_APPLIED",payload:!1})})).catch((function(e){I(!1),console.log(e)}))};(0,i.useEffect)((function(){pe()}),[ne]);var je=function(e){I(!0),(0,l.yG)(e).then((function(e){de({type:"FILTER_APPLIED",payload:!0}),b(e.data),I(!1)}))};(0,i.useEffect)((function(){var e=setTimeout((function(){je({query:me}),me||pe()}),300);return function(){return clearTimeout(e)}}),[me]),(0,i.useEffect)((function(){je({price:w})}),[T]);var ye=function(e){de({type:"SEARCH_QUERY",payload:{text:""}}),_([0,0]),ee(""),W([]);var t=(0,a.Z)(q),s=e.target.value,n=t.indexOf(s);-1===n?t.push(s):t.splice(n,1),D(t),je({category:t})},ge=function(e){de({type:"SEARCH_QUERY",payload:{text:""}}),_([0,0]),D([]),W([]),ee(e),je({stars:e})},Ne=function(e){de({type:"SEARCH_QUERY",payload:{text:""}}),_([0,0]),D([]),ee(""),W(e),je({subcategory:e})};return(0,v.jsx)("div",{className:"container-fluid",style:{position:"relative",zIndex:1},children:(0,v.jsxs)("div",{className:"row",children:[(0,v.jsxs)("div",{className:"col-md-3 pt-2",children:[(0,v.jsx)("h4",{style:{color:"white"},children:"Search/Filter"}),(0,v.jsx)("hr",{style:{color:"white"}}),fe&&(0,v.jsx)(y.Z,(e={className:"clearbtn btn-sm",style:{marginTop:"-10px"},onClick:function(){de({type:"SEARCH_QUERY",payload:{text:""}}),_([0,0]),D([]),ee(""),W(""),b([]),pe(),oe("/shop")}},(0,n.Z)(e,"style",{position:"fixed",bottom:150,right:20,zIndex:2}),(0,n.Z)(e,"children","Clear"),e)),(0,v.jsxs)(x.Z,{mode:"inline",defaultOpenKeys:["1","2","3","4","5","6","7"],children:[" ",(0,v.jsx)(S,{title:(0,v.jsx)("span",{className:"h6",children:"(\u20b9) Price "}),children:(0,v.jsx)("div",{children:(0,v.jsx)(f.Z,{className:"ml-4 mr-4",tipFormatter:function(e){return"\u20b9".concat(e)},range:!0,value:w,onChange:function(e){de({type:"SEARCH_QUERY",payload:{text:""}}),D([]),ee(""),W([]),_(e),setTimeout((function(){U(!T)}),300)},max:"49999"})})},"1"),(0,v.jsx)(S,{title:(0,v.jsxs)("span",{className:"h6",children:[(0,v.jsx)("i",{className:"far fa-caret-square-down"})," Categories"]}),children:(0,v.jsx)("div",{style:{marginTop:"-10px"},children:H.map((function(e){return(0,v.jsxs)("div",{children:[(0,v.jsx)(h.Z,{onChange:ye,className:"pb-2 pl-4 pr-4",value:e._id,name:"category",checked:q.includes(e._id),children:e.name}),(0,v.jsx)("br",{})]},e._id)}))})},"2"),(0,v.jsx)(S,{title:(0,v.jsxs)("span",{className:"h6",children:[(0,v.jsx)("i",{className:"far fa-star"})," Ratings"]}),children:(0,v.jsx)("div",{style:{marginTop:"-10px"},children:(0,v.jsxs)("div",{className:"pr-4 pl-4 pb-2",children:[(0,v.jsx)(u.Ux,{starClick:ge,numberOfStars:5}),(0,v.jsx)(u.Ux,{starClick:ge,numberOfStars:4}),(0,v.jsx)(u.Ux,{starClick:ge,numberOfStars:3}),(0,v.jsx)(u.Ux,{starClick:ge,numberOfStars:2}),(0,v.jsx)(u.Ux,{starClick:ge,numberOfStars:1})]})})},"3"),(0,v.jsx)(S,{title:(0,v.jsxs)("span",{className:"h6",children:[(0,v.jsx)("i",{className:"far fa-caret-square-down"})," Sub Categories"]}),children:(0,v.jsx)("div",{className:"pl-4 pr-4",style:{marginTop:"-10px"},children:K.map((function(e){return(0,v.jsx)("h6",{className:"p-1 m-1 badge badge-primary",style:{cursor:"pointer",color:"black",fontSize:18},onClick:function(){return Ne(e._id)},children:(0,v.jsx)(j.Z,{style:{background:"linear-gradient(to right, #0f0c29, #302b63, #24243e)"},children:e.name})},e._id)}))})},"4")]})]}),(0,v.jsxs)("div",{className:"col-md-9 pt-2",children:[P?(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("h4",{className:"text-white",children:"Loading..."})}):(0,v.jsx)(v.Fragment,{children:fe?(0,v.jsxs)("span",{children:[(0,v.jsx)("h4",{className:"text-white",children:"Filtered-Products"}),(0,v.jsx)("p",{className:"text-muted",children:"Press Clear Filter to View All Products"})]}):(0,v.jsx)("h4",{className:"text-white",children:"Products"})}),Z.length<1&&(0,v.jsx)("h2",{className:"text-center text-white",children:"No Products Found"}),fe?(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"row pb-5",children:Z.map((function(e){return(0,v.jsx)("div",{className:"col-md-4 mt-3",children:(0,v.jsx)(u.Il,{product:e})},e._id)}))})}):(0,v.jsxs)("div",{className:"row pb-5",children:[(0,v.jsx)(g.Z,{children:Z.map((function(e){return(0,v.jsx)("div",{className:"col-md-4 mt-3",children:(0,v.jsx)(u.Il,{product:e})},e._id)}))}),(0,v.jsx)("nav",{className:"col-md-4 offset-md-4 text-center pt-2 p-3",children:(0,v.jsx)(m.Z,{current:ne,total:10*Math.ceil(ie/6),onChange:function(e){return function(e){ae(e)}(e)},showSizeChanger:!1})})]})]})]})})})}}]);
//# sourceMappingURL=396.ac38d4a3.chunk.js.map