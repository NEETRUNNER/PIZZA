import{v as N,r as l,S as g,n as e,L as w,U as v,V as S,z as k}from"./index-C_tdEGbz.js";import{u as L}from"./index.esm-CHSdvU0d.js";const E=t=>{try{const o=t;localStorage.setItem("token",o)}catch(o){console.error("Ошибка сохранения в localStorage",o)}},z=()=>{var u,d;const t=N(),[o,i]=l.useState(""),[p,c]=l.useState(""),{getLoginToken:h}=S.actions,{openLoginNotification:f,openbadLoginNotification:b}=k.actions,{loginToken:m}=g(),{register:x,handleSubmit:j,formState:{errors:a}}=L();l.useEffect(()=>{console.log(m)},[m]);const y=async s=>{console.log(s),i(""),c("");try{const n=await v.post("http://localhost:5000/auth/login",{username:s.email,password:s.number}),r=n.data.token;return r&&(t(h(r)),t(f()),E(r)),n}catch(n){t(b()),console.log(n)}};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"md:w-[400px] xs:w-[300px] max-w-md md:p-8 xs:p-4 bg-white shadow-lg rounded-lg",children:[e.jsx("h1",{className:"text-orange-500 md:text-3xl xs:text-2xl font-bold mb-8 text-center uppercase font-nunito",children:"Увійти до кабінету"}),e.jsxs("form",{onSubmit:j(y),className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-semibold text-gray-700",children:"Email"}),e.jsx("input",{id:"email",type:"email",...x("email",{required:"Email обов'язковий",pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message:"Введіть корректний email"}}),value:o,onChange:s=>i(s.target.value),placeholder:"Введіть email",className:"w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}),a.email&&e.jsx("p",{className:"text-red-500 text-xs mt-2 font-nunito text-center",children:(u=a.root)==null?void 0:u.message})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"phone",className:"block text-sm font-semibold text-gray-700",children:"Номер телефону"}),e.jsx("input",{id:"phone",type:"text",...x("number",{required:"Номер телефону обов'язковий",pattern:{value:/^\d{12}$/,message:"Введіть корректний номер (12 цифр)"}}),value:p,onChange:s=>c(s.target.value),placeholder:"380*********",className:"w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}),a.number&&e.jsx("p",{className:"text-red-500 text-xs mt-2 font-nunito text-center",children:(d=a.root)==null?void 0:d.message})]}),e.jsx(w,{className:"w-max block mx-auto !mt-0",to:"/registration",children:e.jsx("h1",{className:"md:text-base xs:text-xs text-sky-400 font-nunito text-center	font-semibold my-2",children:"Зареєструватися якщо не маєте аккаунт"})}),e.jsx("button",{type:"submit",className:"w-full bg-orange-500 text-white py-2 px-4 font-semibold md:text-lg xs:text-xm tracking-wider hover:bg-orange-600 !mt-0",children:"Увійти"})]})]})})},A=()=>{const{loginToken:t}=g();return e.jsx("section",{className:"registration flex items-center justify-center",children:e.jsx("div",{className:"registration-container w-11/12 flex flex-wrap justify-center gap-x-24 my-[10%]",children:t?e.jsx("div",{className:"text-black",children:"Успешная авторизация"}):e.jsx(z,{})})})};export{A as default};
