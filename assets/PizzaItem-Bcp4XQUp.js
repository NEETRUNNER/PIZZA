import{S as De,r as c,a as Pe,b as Ne,n as Ke,j as o,o as Qe,L as et,s as Me,l as tt,R as h,e as at,u as nt,c as it}from"./index-DinG4RgJ.js";import{R as rt}from"./rating.esm-B3OI6Nj5.js";const st=()=>{const{pizzaData:p,tipPizzas:t}=De(),[u]=c.useState(!0),[n,l]=c.useState([]),{pizzaTitle:d}=Pe(),y=Ne(),z=p.find(f=>f.pizza_title===d),m=Math.floor(Math.random()*(p.length-4)),x=t.filter(f=>f.pizza_title!==(z==null?void 0:z.pizza_title)).slice(m,m+4),v=Ke(u,{from:{transform:"rotateY(90deg)",opacity:0},enter:{transform:"rotateY(0deg)",opacity:1},leave:{transform:"rotateY(90deg)",opacity:0},config:{duration:300}});return c.useEffect(()=>{l(x)},[t,y.pathname]),v((f,a)=>a&&o.jsx("div",{className:"tips-pizza",children:o.jsxs("div",{className:"md:w-3/4 xs:w-full mx-auto px-4 py-8",children:[o.jsx("h2",{className:"md:text-4xl xs:text-2xl font-bold text-black font-nunito border-b-2 w-max",children:"Інші піцци"}),o.jsx("div",{className:"flex flex-wrap justify-between gap-y-8 md:mt-12 xs:mt-6",children:n.map(w=>o.jsxs(Qe.div,{style:f,className:"pizza-block__item md:max-w-[600px] xs:w-full my-4 relative",children:[o.jsxs("div",{className:"flex justify-between items-center w-full md:absolute xs:relative",children:[o.jsx("h1",{className:"text-black md:text-2xl xs:text-md w-max font-nunito uppercase font-extrabold p-1",children:w.pizza_title}),o.jsx(rt,{value:w.rating,cancel:!1,className:"custom-rating px-2 h-12",style:{color:"#FFA500"}})]}),o.jsx(et,{to:`/pizza-product/${Me(w.pizza_title,{lower:!0,locale:"ru"})}`,children:o.jsx("img",{alt:"pizza_img",src:w.pizza_img,className:"w-max"})})]},w.id))})]})}))};var Y={exports:{}},X,Te;function ot(){if(Te)return X;Te=1;var p="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return X=p,X}var Z,je;function ct(){if(je)return Z;je=1;var p=ot();function t(){}function u(){}return u.resetWarningCache=t,Z=function(){function n(y,z,m,x,v,f){if(f!==p){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}n.isRequired=n;function l(){return n}var d={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:l,element:n,elementType:n,instanceOf:l,node:n,objectOf:l,oneOf:l,oneOfType:l,shape:l,exact:l,checkPropTypes:u,resetWarningCache:t};return d.PropTypes=d,d},Z}var Ee;function lt(){return Ee||(Ee=1,Y.exports=ct()()),Y.exports}var ut=lt();const pt=tt(ut);function M(){return M=Object.assign||function(p){for(var t=1;t<arguments.length;t++){var u=arguments[t];for(var n in u)Object.prototype.hasOwnProperty.call(u,n)&&(p[n]=u[n])}return p},M.apply(this,arguments)}var ke=function(t){var u=t.src,n=t.sources,l=t.width,d=t.height,y=t.hasSpacer,z=t.imgAttributes,m=t.isZoomed,x=t.fadeDuration,v=l&&d&&y;return h.createElement("div",{style:{paddingTop:v?d/l*100+"%":null}},n&&n.length>0?h.createElement("picture",null,n.map(function(f,a){return h.createElement(c.Fragment,{key:a},f.srcSet&&h.createElement("source",f))}),h.createElement("img",M({},z,{className:"iiz__img "+(z.className||"")+" "+(m?"iiz__img--hidden":"")+" "+(v?"iiz__img--abs":""),style:{transition:"opacity 0ms linear "+(m?x:0)+"ms, visibility 0ms linear "+(m?x:0)+"ms"},src:u,width:l,height:d}))):h.createElement("img",M({},z,{className:"iiz__img "+(z.className||"")+" "+(m?"iiz__img--hidden":"")+" "+(v?"iiz__img--abs":""),style:{transition:"opacity 0ms linear "+(m?x:0)+"ms, visibility 0ms linear "+(m?x:0)+"ms"},src:u,width:l,height:d})))};ke.propTypes={};var A=function(t){var u=t.src,n=t.fadeDuration,l=t.top,d=t.left,y=t.isZoomed,z=t.onLoad,m=t.onDragStart,x=t.onDragEnd,v=t.onClose,f=t.onFadeOut;return h.createElement(c.Fragment,null,h.createElement("img",{className:"iiz__zoom-img "+(y?"iiz__zoom-img--visible":""),style:{top:l,left:d,transition:"opacity "+n+"ms linear, visibility "+n+"ms linear"},src:u,onLoad:z,onTouchStart:m,onTouchEnd:x,onMouseDown:m,onMouseUp:x,onTransitionEnd:f,draggable:"false",alt:""}),v&&h.createElement("button",{className:"iiz__btn iiz__close "+(y?"iiz__close--visible":""),style:{transition:"opacity "+n+"ms linear, visibility "+n+"ms linear"},onClick:v,"aria-label":"Zoom Out"}))};A.propTypes={};var Ce=function(t){var u=t.children,n=c.useState(function(){var d=document.createElement("div");return d.classList.add("iiz__zoom-portal"),d}),l=n[0];return c.useEffect(function(){return document.body.appendChild(l),function(){return document.body.removeChild(l)}},[l]),at.createPortal(u,l)};Ce.propTypes={children:pt.element};var dt=void 0,Oe=function(t){var u=t.moveType,n=u===void 0?"pan":u,l=t.zoomType,d=l===void 0?"click":l,y=t.src,z=t.sources,m=t.width,x=t.height,v=t.hasSpacer,f=t.imgAttributes,a=f===void 0?{}:f,w=t.zoomSrc,B=t.zoomScale,Fe=B===void 0?1:B,k=t.zoomPreload,W=t.fadeDuration,C=W===void 0?150:W,O=t.fullscreenOnMobile,q=t.mobileBreakpoint,F=q===void 0?640:q,$=t.hideCloseButton,Re=t.hideHint,H=t.className,U=t.afterZoomIn,V=t.afterZoomOut,D=c.useRef(null),b=c.useRef(null),i=c.useRef({}),G=c.useState(k),Le=G[0],P=G[1],J=c.useState(!1),_=J[0],K=J[1],Q=c.useState(!1),S=Q[0],ee=Q[1],te=c.useState(!1),E=te[0],ae=te[1],ne=c.useState(!1),ie=ne[0],re=ne[1],se=c.useState(!1),Ie=se[0],Ye=se[1],oe=c.useState(!1),Xe=oe[0],R=oe[1],ce=c.useState(n),j=ce[0],le=ce[1],ue=c.useState(0),Ze=ue[0],pe=ue[1],de=c.useState(0),Ae=de[0],me=de[1],Be=function(e){P(!0),R(!1),d==="hover"&&!S&&fe(e)},We=function(){K(!0),ae(we(O,F)),le("drag")},fe=function(e){if(S){_?$&&L(e):!Ie&&ye();return}_&&P(!0),b.current?(ge({target:b.current}),ve(e.pageX,e.pageY)):i.current.onLoadCallback=ve.bind(dt,e.pageX,e.pageY)},ge=function(e){var r=Ge(e.target,Fe);b.current=e.target,b.current.setAttribute("width",r.width),b.current.setAttribute("height",r.height),i.current.scaledDimensions=r,i.current.bounds=_e(D.current,!1),i.current.ratios=Ve(i.current.bounds,r),i.current.onLoadCallback&&(i.current.onLoadCallback(),i.current.onLoadCallback=null)},he=function(e){var r=e.pageX-i.current.offsets.x,g=e.pageY-i.current.offsets.y;r=Math.max(Math.min(r,i.current.bounds.width),0),g=Math.max(Math.min(g,i.current.bounds.height),0),pe(r*-i.current.ratios.x),me(g*-i.current.ratios.y)},qe=function(e){var r=typeof e.pageX=="number"?e.pageX:e.changedTouches[0].pageX,g=typeof e.pageY=="number"?e.pageY:e.changedTouches[0].pageY;i.current.offsets=I(r,g,b.current.offsetLeft,b.current.offsetTop),re(!0),_||(i.current.eventPosition={x:e.pageX,y:e.pageY})},N=c.useCallback(function(s){s.stopPropagation();var e=typeof s.pageX=="number"?s.pageX:s.changedTouches[0].pageX,r=typeof s.pageY=="number"?s.pageY:s.changedTouches[0].pageY,g=e-i.current.offsets.x,T=r-i.current.offsets.y;g=Math.max(Math.min(g,0),(i.current.scaledDimensions.width-i.current.bounds.width)*-1),T=Math.max(Math.min(T,0),(i.current.scaledDimensions.height-i.current.bounds.height)*-1),pe(g),me(T)},[]),ze=function(e){if(re(!1),!_){var r=Math.abs(e.pageX-i.current.eventPosition.x),g=Math.abs(e.pageY-i.current.eventPosition.y);Ye(r>5||g>5)}},$e=function(e){j==="drag"&&S?ze(e):L(e)},L=function(e){!_&&e.target.classList.contains("iiz__close")||(!S||E||!C?xe({},!0):R(!0)),ye()},xe=function(e,r){(r||e.propertyName==="opacity"&&D.current.contains(e.target))&&((k&&_||!k)&&(b.current=null,i.current=be(),P(!1)),K(!1),ae(!1),le(n),R(!1))},He=function(e,r){i.current.offsets=I(window.pageXOffset,window.pageYOffset,-i.current.bounds.left,-i.current.bounds.top),he({pageX:e,pageY:r})},Ue=function(e,r){var g=(e-(window.pageXOffset+i.current.bounds.left))*-i.current.ratios.x,T=(r-(window.pageYOffset+i.current.bounds.top))*-i.current.ratios.y;g=g+(E?(window.innerWidth-i.current.bounds.width)/2:0),T=T+(E?(window.innerHeight-i.current.bounds.height)/2:0),i.current.bounds=_e(D.current,E),i.current.offsets=I(0,0,0,0),N({changedTouches:[{pageX:g,pageY:T}],preventDefault:function(){},stopPropagation:function(){}})},ve=function(e,r){ee(!0),j==="drag"?Ue(e,r):He(e,r),U&&U()},ye=function(){ee(!1),V&&V()},be=function(){return{onLoadCallback:null,bounds:{},offsets:{},ratios:{},eventPosition:{},scaledDimensions:{}}},_e=function(e,r){return r?{width:window.innerWidth,height:window.innerHeight,left:0,top:0}:e.getBoundingClientRect()},I=function(e,r,g,T){return{x:e-g,y:r-T}},Ve=function(e,r){return{x:(r.width-e.width)/e.width,y:(r.height-e.height)/e.height}},we=function(e,r){return e&&window.matchMedia&&window.matchMedia("(max-width: "+r+"px)").matches},Ge=function(e,r){return{width:e.naturalWidth*r,height:e.naturalHeight*r}},Se={src:w||y,fadeDuration:E?0:C,top:Ae,left:Ze,isZoomed:S,onLoad:ge,onDragStart:j==="drag"?qe:null,onDragEnd:j==="drag"?ze:null,onClose:!$&&j==="drag"?L:null,onFadeOut:Xe?xe:null};return c.useEffect(function(){i.current=be()},[]),c.useEffect(function(){we(O,F)&&P(!1)},[O,F]),c.useEffect(function(){if(b.current){var s=_?"touchmove":"mousemove";ie?b.current.addEventListener(s,N,{passive:!0}):b.current.removeEventListener(s,N)}},[ie,_,N]),h.createElement("figure",{className:"iiz "+(j==="drag"?"iiz--drag":"")+" "+(H||""),style:{width:m},ref:D,onTouchStart:S?null:We,onClick:fe,onMouseEnter:_?null:Be,onMouseMove:j==="drag"||!S?null:he,onMouseLeave:_?null:$e},h.createElement(ke,{src:y,sources:z,width:m,height:x,hasSpacer:v,imgAttributes:a,fadeDuration:C,isZoomed:S}),Le&&h.createElement(c.Fragment,null,E?h.createElement(Ce,null,h.createElement(A,Se)):h.createElement(A,Se)),!Re&&!S&&h.createElement("span",{className:"iiz__btn iiz__hint"}))};Oe.propTypes={};const gt=()=>{const p=nt(),{pizzaPrice:t,pizzasForDelivery:u,selectedPizza:n,pizzaData:l}=De(),{pizzaTitle:d}=Pe(),y=Ne(),{addPizza:z,deletePizza:m,addToBasketCart:x,changePizzaPrice:v,resetPizzaCounter:f}=it.actions,a=l.find(w=>Me(w.pizza_title,{lower:!0,locale:"ru"})===d);return c.useEffect(()=>{p(f())},[y.pathname]),c.useEffect(()=>{a!=null&&a.pizza_price&&p(v({pizza_price:a.pizza_price,pizza_counter:a.pizza_counter}))},[a]),c.useEffect(()=>{console.log("Выбранные пиццы",n),console.log("Пиццы для заказа(уже в массиве корзины)",u)},[u,n]),o.jsxs("section",{className:"pizza-item",children:[o.jsx("div",{className:"pizza-item__container md:my-12 xs:my-0 md:w-3/4 xs:w-11/12 mx-auto flex justify-center",children:a&&o.jsx(o.Fragment,{children:o.jsxs("div",{className:"pizza-item__wrap flex justify-center gap-x-8 lg:flex-nowrap xm:flex-wrap xs:flex-wrap",children:[o.jsx(Oe,{src:a.pizza_img,className:"image-zoom",zoomType:"hover"}),o.jsxs("div",{className:"flex-col flex",children:[o.jsx("h1",{className:"pizza-item__wrap pizza-item__title text-black font-extrabold md:text-3xl xs:text-2xl mt-2 font-nunito uppercase",children:a.pizza_title}),o.jsxs("p",{className:"pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4",children:["Традиційне тісто 40 см, ",a.pizza_weight," г"]}),o.jsxs("p",{className:"pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4",children:["Кількість в порції: ",a==null?void 0:a.amount]}),o.jsxs("p",{className:"pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4",children:["Склад: ",a.pizza_descr]}),o.jsxs("div",{className:"flex md:justify-start xm:justify-center xs:justify-around flex-wrap py-8 xs:gap-x-5 w-full",children:[o.jsxs("div",{className:"flex justify-center items-center gap-x-4",children:[o.jsx("button",{onClick:()=>p(m({pizza_title:a.pizza_title,pizza_counter:a.pizza_counter,pizza_id:a.id,pizza_price:a.pizza_price})),disabled:a.pizza_counter===1,className:"text-black md:text-xl xs:text-lg f font-bold bg-gray-200 rounded-full md:w-10 md:h-10 xs:w-7 xs:h-7 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition duration-200",children:"-"}),o.jsx("span",{className:"md:text-2xl xs:text-xl font-nunito font-extrabold text-gray-800",children:a.pizza_counter}),o.jsx("button",{onClick:()=>p(z({pizza_title:a.pizza_title,pizza_counter:a.pizza_counter,pizza_id:a.id,pizza_price:a.pizza_price})),className:"text-black temd:xt-xl f xs:text-lg font-bold bg-orange-400 rounded-full md:w-10 md:h-10 xs:w-7 xs:h-7 flex items-center justify-center hover:bg-orange-500 shadow-md transition duration-200",children:"+"})]}),o.jsxs("div",{className:"text-orange-500 px-2 md:py-2 xs:py-3 tracking-widest uppercase font-black md:text-2xl xs:text-xl flex justify-center items-center font-nunito",children:[t," грн"]}),o.jsx("button",{onClick:()=>p(x({pizza_title:a.pizza_title,pizza_counter:a.pizza_counter,pizza_id:a.pizza_id,pizza_price:a.pizza_price,pizza_img:a.pizza_img,pizza_descr:a.pizza_descr})),disabled:a.pizza_counter<=0,className:`md:w-48 xs:w-full text-white md:mt-0 xs:mt-4 px-1 justify-center py-2 tracking-widest bg-orange-500 uppercase font-bold md:text-base
                                 xs:text-xm flex items-center font-nunito transition duration-300'}`,children:"Замовити"})]})]})]})})}),o.jsx("div",{className:"pizza-item__recommendations",children:o.jsx(st,{})})]})};export{gt as default};
