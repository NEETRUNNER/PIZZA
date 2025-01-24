import{s as Ne,r as l,a as Me,b as ke,c as q,o as Ke,j as s,q as Qe,L as et,m as tt,R as h,f as at,u as rt,G as nt,d as it}from"./index-zFIwJh61.js";import{R as st}from"./rating.esm-CCmzpKTk.js";const ot=()=>{const{pizzaData:p,tipPizzas:t}=Ne(),[u]=l.useState(!0),[r,c]=l.useState([]),{pizzaTitle:d}=Me(),v=ke(),a=p.find(f=>q(f.pizza_title,{lower:!0,locale:"ru"})===d),m=Math.floor(Math.random()*(p.length-4)),x=t.filter(f=>f.pizza_title!==(a==null?void 0:a.pizza_title)).slice(m,m+4),z=Ke(u,{from:{transform:"rotateY(90deg)",opacity:0},enter:{transform:"rotateY(0deg)",opacity:1},leave:{transform:"rotateY(90deg)",opacity:0},config:{duration:300}});return l.useEffect(()=>{c(x)},[t,v.pathname]),z((f,b)=>b&&s.jsx("div",{className:"tips-pizza",children:s.jsxs("div",{className:"md:w-3/4 xs:w-full mx-auto px-4 py-8",children:[s.jsx("h2",{className:"md:text-3xl xs:text-2xl font-bold mb-6 text-black font-nunito",children:"Інші піцци"}),s.jsx("div",{className:"flex flex-wrap justify-center gap-x-24 gap-y-8",children:r.map(w=>s.jsxs(Qe.div,{style:f,className:"pizza-block__item md:max-w-[600px] xs:w-full my-4 relative md:flex-nowrap xs:flex-wrap",children:[s.jsxs("div",{className:"flex justify-between items-center w-full md:absolute xs:relative",children:[s.jsx("h1",{className:"text-white whitespace-nowrap bg-black md:text-2xl xs:text-sm w-max font-nunito uppercase font-extrabold px-2",children:w.pizza_title}),s.jsx(st,{value:w.rating,cancel:!1,className:"custom-rating px-2 h-12",style:{color:"#FFA500"}})]}),s.jsx(et,{to:`/pizza-product/${q(w.pizza_title,{lower:!0,locale:"ru"})}`,children:s.jsx("img",{alt:"pizza_img",src:w.pizza_img,className:"w-max"})})]},w.id))})]})}))};var A={exports:{}},B,Ee;function lt(){if(Ee)return B;Ee=1;var p="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return B=p,B}var W,De;function ct(){if(De)return W;De=1;var p=lt();function t(){}function u(){}return u.resetWarningCache=t,W=function(){function r(v,a,m,x,z,f){if(f!==p){var b=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw b.name="Invariant Violation",b}}r.isRequired=r;function c(){return r}var d={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:c,element:r,elementType:r,instanceOf:c,node:r,objectOf:c,oneOf:c,oneOfType:c,shape:c,exact:c,checkPropTypes:u,resetWarningCache:t};return d.PropTypes=d,d},W}var Pe;function ut(){return Pe||(Pe=1,A.exports=ct()()),A.exports}var pt=ut();const dt=tt(pt);function R(){return R=Object.assign||function(p){for(var t=1;t<arguments.length;t++){var u=arguments[t];for(var r in u)Object.prototype.hasOwnProperty.call(u,r)&&(p[r]=u[r])}return p},R.apply(this,arguments)}var Ce=function(t){var u=t.src,r=t.sources,c=t.width,d=t.height,v=t.hasSpacer,a=t.imgAttributes,m=t.isZoomed,x=t.fadeDuration,z=c&&d&&v;return h.createElement("div",{style:{paddingTop:z?d/c*100+"%":null}},r&&r.length>0?h.createElement("picture",null,r.map(function(f,b){return h.createElement(l.Fragment,{key:b},f.srcSet&&h.createElement("source",f))}),h.createElement("img",R({},a,{className:"iiz__img "+(a.className||"")+" "+(m?"iiz__img--hidden":"")+" "+(z?"iiz__img--abs":""),style:{transition:"opacity 0ms linear "+(m?x:0)+"ms, visibility 0ms linear "+(m?x:0)+"ms"},src:u,width:c,height:d}))):h.createElement("img",R({},a,{className:"iiz__img "+(a.className||"")+" "+(m?"iiz__img--hidden":"")+" "+(z?"iiz__img--abs":""),style:{transition:"opacity 0ms linear "+(m?x:0)+"ms, visibility 0ms linear "+(m?x:0)+"ms"},src:u,width:c,height:d})))};Ce.propTypes={};var $=function(t){var u=t.src,r=t.fadeDuration,c=t.top,d=t.left,v=t.isZoomed,a=t.onLoad,m=t.onDragStart,x=t.onDragEnd,z=t.onClose,f=t.onFadeOut;return h.createElement(l.Fragment,null,h.createElement("img",{className:"iiz__zoom-img "+(v?"iiz__zoom-img--visible":""),style:{top:c,left:d,transition:"opacity "+r+"ms linear, visibility "+r+"ms linear"},src:u,onLoad:a,onTouchStart:m,onTouchEnd:x,onMouseDown:m,onMouseUp:x,onTransitionEnd:f,draggable:"false",alt:""}),z&&h.createElement("button",{className:"iiz__btn iiz__close "+(v?"iiz__close--visible":""),style:{transition:"opacity "+r+"ms linear, visibility "+r+"ms linear"},onClick:z,"aria-label":"Zoom Out"}))};$.propTypes={};var Oe=function(t){var u=t.children,r=l.useState(function(){var d=document.createElement("div");return d.classList.add("iiz__zoom-portal"),d}),c=r[0];return l.useEffect(function(){return document.body.appendChild(c),function(){return document.body.removeChild(c)}},[c]),at.createPortal(u,c)};Oe.propTypes={children:dt.element};var mt=void 0,Fe=function(t){var u=t.moveType,r=u===void 0?"pan":u,c=t.zoomType,d=c===void 0?"click":c,v=t.src,a=t.sources,m=t.width,x=t.height,z=t.hasSpacer,f=t.imgAttributes,b=f===void 0?{}:f,w=t.zoomSrc,E=t.zoomScale,L=E===void 0?1:E,P=t.zoomPreload,k=t.fadeDuration,N=k===void 0?150:k,M=t.fullscreenOnMobile,H=t.mobileBreakpoint,I=H===void 0?640:H,U=t.hideCloseButton,Re=t.hideHint,V=t.className,G=t.afterZoomIn,J=t.afterZoomOut,C=l.useRef(null),y=l.useRef(null),n=l.useRef({}),K=l.useState(P),Le=K[0],O=K[1],Q=l.useState(!1),_=Q[0],ee=Q[1],te=l.useState(!1),S=te[0],ae=te[1],re=l.useState(!1),D=re[0],ne=re[1],ie=l.useState(!1),se=ie[0],oe=ie[1],le=l.useState(!1),Ie=le[0],Ye=le[1],ce=l.useState(!1),Xe=ce[0],Y=ce[1],ue=l.useState(r),j=ue[0],pe=ue[1],de=l.useState(0),Ze=de[0],me=de[1],fe=l.useState(0),Ae=fe[0],ge=fe[1],Be=function(e){O(!0),Y(!1),d==="hover"&&!S&&he(e)},We=function(){ee(!0),ne(Te(M,I)),pe("drag")},he=function(e){if(S){_?U&&X(e):!Ie&&_e();return}_&&O(!0),y.current?(xe({target:y.current}),be(e.pageX,e.pageY)):n.current.onLoadCallback=be.bind(mt,e.pageX,e.pageY)},xe=function(e){var i=Ge(e.target,L);y.current=e.target,y.current.setAttribute("width",i.width),y.current.setAttribute("height",i.height),n.current.scaledDimensions=i,n.current.bounds=Se(C.current,!1),n.current.ratios=Ve(n.current.bounds,i),n.current.onLoadCallback&&(n.current.onLoadCallback(),n.current.onLoadCallback=null)},ze=function(e){var i=e.pageX-n.current.offsets.x,g=e.pageY-n.current.offsets.y;i=Math.max(Math.min(i,n.current.bounds.width),0),g=Math.max(Math.min(g,n.current.bounds.height),0),me(i*-n.current.ratios.x),ge(g*-n.current.ratios.y)},qe=function(e){var i=typeof e.pageX=="number"?e.pageX:e.changedTouches[0].pageX,g=typeof e.pageY=="number"?e.pageY:e.changedTouches[0].pageY;n.current.offsets=Z(i,g,y.current.offsetLeft,y.current.offsetTop),oe(!0),_||(n.current.eventPosition={x:e.pageX,y:e.pageY})},F=l.useCallback(function(o){o.stopPropagation();var e=typeof o.pageX=="number"?o.pageX:o.changedTouches[0].pageX,i=typeof o.pageY=="number"?o.pageY:o.changedTouches[0].pageY,g=e-n.current.offsets.x,T=i-n.current.offsets.y;g=Math.max(Math.min(g,0),(n.current.scaledDimensions.width-n.current.bounds.width)*-1),T=Math.max(Math.min(T,0),(n.current.scaledDimensions.height-n.current.bounds.height)*-1),me(g),ge(T)},[]),ve=function(e){if(oe(!1),!_){var i=Math.abs(e.pageX-n.current.eventPosition.x),g=Math.abs(e.pageY-n.current.eventPosition.y);Ye(i>5||g>5)}},$e=function(e){j==="drag"&&S?ve(e):X(e)},X=function(e){!_&&e.target.classList.contains("iiz__close")||(!S||D||!N?ye({},!0):Y(!0)),_e()},ye=function(e,i){(i||e.propertyName==="opacity"&&C.current.contains(e.target))&&((P&&_||!P)&&(y.current=null,n.current=we(),O(!1)),ee(!1),ne(!1),pe(r),Y(!1))},He=function(e,i){n.current.offsets=Z(window.pageXOffset,window.pageYOffset,-n.current.bounds.left,-n.current.bounds.top),ze({pageX:e,pageY:i})},Ue=function(e,i){var g=(e-(window.pageXOffset+n.current.bounds.left))*-n.current.ratios.x,T=(i-(window.pageYOffset+n.current.bounds.top))*-n.current.ratios.y;g=g+(D?(window.innerWidth-n.current.bounds.width)/2:0),T=T+(D?(window.innerHeight-n.current.bounds.height)/2:0),n.current.bounds=Se(C.current,D),n.current.offsets=Z(0,0,0,0),F({changedTouches:[{pageX:g,pageY:T}],preventDefault:function(){},stopPropagation:function(){}})},be=function(e,i){ae(!0),j==="drag"?Ue(e,i):He(e,i),G&&G()},_e=function(){ae(!1),J&&J()},we=function(){return{onLoadCallback:null,bounds:{},offsets:{},ratios:{},eventPosition:{},scaledDimensions:{}}},Se=function(e,i){return i?{width:window.innerWidth,height:window.innerHeight,left:0,top:0}:e.getBoundingClientRect()},Z=function(e,i,g,T){return{x:e-g,y:i-T}},Ve=function(e,i){return{x:(i.width-e.width)/e.width,y:(i.height-e.height)/e.height}},Te=function(e,i){return e&&window.matchMedia&&window.matchMedia("(max-width: "+i+"px)").matches},Ge=function(e,i){return{width:e.naturalWidth*i,height:e.naturalHeight*i}},je={src:w||v,fadeDuration:D?0:N,top:Ae,left:Ze,isZoomed:S,onLoad:xe,onDragStart:j==="drag"?qe:null,onDragEnd:j==="drag"?ve:null,onClose:!U&&j==="drag"?X:null,onFadeOut:Xe?ye:null};return l.useEffect(function(){n.current=we()},[]),l.useEffect(function(){Te(M,I)&&O(!1)},[M,I]),l.useEffect(function(){if(y.current){var o=_?"touchmove":"mousemove";se?y.current.addEventListener(o,F,{passive:!0}):y.current.removeEventListener(o,F)}},[se,_,F]),h.createElement("figure",{className:"iiz "+(j==="drag"?"iiz--drag":"")+" "+(V||""),style:{width:m},ref:C,onTouchStart:S?null:We,onClick:he,onMouseEnter:_?null:Be,onMouseMove:j==="drag"||!S?null:ze,onMouseLeave:_?null:$e},h.createElement(Ce,{src:v,sources:a,width:m,height:x,hasSpacer:z,imgAttributes:b,fadeDuration:N,isZoomed:S}),Le&&h.createElement(l.Fragment,null,D?h.createElement(Oe,null,h.createElement($,je)):h.createElement($,je)),!Re&&!S&&h.createElement("span",{className:"iiz__btn iiz__hint"}))};Fe.propTypes={};const ht=()=>{const p=rt(),{pizzaPrice:t,pizzasForDelivery:u,selectedPizza:r,pizzaData:c}=Ne(),{pizzaTitle:d}=Me(),v=ke(),a=c.find(E=>q(E.pizza_title,{lower:!0,locale:"ru"})===d),{addPizza:m,deletePizza:x,addToBasketCart:z,changePizzaPrice:f,resetPizzaCounter:b}=it.actions,w=(E,L,P,k,N,M)=>{p(z({pizza_title:E,pizza_counter:L,pizza_id:P,pizza_price:k,pizza_img:N,pizza_descr:M}))};return l.useEffect(()=>{p(b())},[v.pathname]),l.useEffect(()=>{a!=null&&a.pizza_price&&p(f({pizza_price:a.pizza_price,pizza_counter:a.pizza_counter}))},[a]),l.useEffect(()=>{console.log("Выбранные пиццы",r),console.log("Пиццы для заказа(уже в массиве корзины)",u)},[u,r]),s.jsxs("section",{className:"pizza-item",children:[s.jsx("div",{className:"pizza-item__container md:my-12 xs:my-0 md:w-3/4 xs:w-11/12 mx-auto flex justify-center",children:a&&s.jsx(s.Fragment,{children:s.jsxs("div",{className:"pizza-item__wrap flex justify-center gap-x-8 lg:flex-nowrap xm:flex-wrap xs:flex-wrap",children:[s.jsx(Fe,{src:a.pizza_img,className:"image-zoom",zoomType:"hover"}),s.jsxs("div",{className:"flex-col flex",children:[s.jsx("h1",{className:"pizza-item__wrap pizza-item__title text-black font-extrabold md:text-3xl xs:text-2xl mt-2 font-nunito uppercase",children:a.pizza_title}),s.jsxs("p",{className:"pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4",children:["Традиційне тісто 40 см, ",a.pizza_weight," г"]}),s.jsxs("p",{className:"pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4",children:["Кількість в порції: ",a==null?void 0:a.amount]}),s.jsxs("p",{className:"pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4",children:["Склад: ",a.pizza_descr]}),s.jsxs("div",{className:"flex md:justify-start xm:justify-center xs:justify-around flex-wrap py-8 xs:gap-x-5 xs:gap-y-5 w-full",children:[s.jsxs("div",{className:"flex justify-center items-center gap-x-4",children:[s.jsx("button",{onClick:()=>p(x({pizza_title:a.pizza_title,pizza_counter:a.pizza_counter,pizza_id:a.id,pizza_price:a.pizza_price})),disabled:a.pizza_counter===1,className:"text-black md:text-xl xs:text-lg f font-bold bg-gray-200 rounded-full md:w-10 md:h-10 xs:w-7 xs:h-7 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition duration-200",children:"-"}),s.jsx("span",{className:"md:text-2xl xs:text-xl font-nunito font-extrabold text-gray-800",children:a.pizza_counter}),s.jsx("button",{onClick:()=>p(m({pizza_title:a.pizza_title,pizza_counter:a.pizza_counter,pizza_id:a.id,pizza_price:a.pizza_price})),className:"text-black temd:xt-xl f xs:text-lg font-bold bg-orange-400 rounded-full md:w-10 md:h-10 xs:w-7 xs:h-7 flex items-center justify-center hover:bg-orange-500 shadow-md transition duration-200",children:"+"})]}),s.jsxs("div",{className:"text-orange-500 px-2 md:py-2 xs:py-3 tracking-widest uppercase font-black md:text-2xl xs:text-xl flex justify-center items-center font-nunito",children:[t," грн"]}),s.jsxs("button",{onClick:()=>w(a.pizza_title,a.pizza_counter,a.id,a.pizza_price,a.pizza_img,a.pizza_descr),disabled:a.pizza_counter<=0,className:`px-4 py-4 md:w-max xs:w-full tracking-widest uppercase font-bold text-xs flex justify-center items-center font-nunito transition duration-300 ${a.pizza_counter<=0?"bg-transparent text-black border-[1px] border-neutral-500 shadow-[inset_0_0_0_2px_#616467] hover:bg-neutral-200 hover:text-black":"bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg hover:from-red-500 hover:to-red-700"}`,children:["Додати до кошику ",s.jsx(nt,{className:"ml-2",size:"2em"})]})]})]})]})})}),s.jsx("div",{className:"pizza-item__recommendations",children:s.jsx(ot,{})})]})};export{ht as default};
