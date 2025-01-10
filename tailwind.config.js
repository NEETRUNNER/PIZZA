const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'nunito': ['Nunito'] // Скачиваем из fonts и помещаем в index.html
    },
    extend: {
      screens: {
        'xs': '320px', // добавление кастомного брейкпоинта
        'xm': '480px',
        'md': '768px', // Средние экраны
        'lg': '1024px', // Большие экраны
        'xl': '1280px', // Очень большие экраны
        '2xl': '1536px', // Экстра большие экраны
      },
    },
  },
  plugins: [nextui()],
}