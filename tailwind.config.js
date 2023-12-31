/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        bubbleMoveOne: {
          "0%": { transform: "translateX(0px) translateY(0px)" },
          "20%": { transform: "translateX(20px) translateY(-20px)" },
          "40%": { transform: "translateX(40px) translateY(-40px)" },
          "80%": { transform: "translateX(20px) translateY(-20px)" },
          "100%": { transform: "translateX(0px) translateY(0px)" },
        },
        bubbleMoveTwo: {
          "0%": { transform: "scale(1) translateX(0px) translateY(0px)" },
          "20%": { transform: "scale(1.1) translateX(20px) translateY(20px)" },
          "40%": { transform: "scale(1.2) translateX(40px) translateY(40px)" },
          "80%": { transform: "scale(1.1) translateX(20px) translateY(20px)" },
          "100%": { transform: "scale(1) translateX(0px) translateY(0px)" },
        },
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        waving: "wave 5s linear infinite",
        "bubbling-two": "bubbleMoveTwo 8s linear infinite",
        "bubbling-one": "bubbleMoveOne 4s linear infinite",
      },
      colors: {
        primary: {
          DEFAULT: "#36C7B6",
          50: "#FBFEFE",
          100: "#E5F8F6",
          200: "#B9ECE6",
          300: "#8DE0D6",
          400: "#61D4C7",
          500: "#36C7B6",
          600: "#2CA395",
          700: "#227F74",
          800: "#195B53",
          900: "#0F3732",
          950: "#0A2521",
        },
        // primary: {
        //   DEFAULT: '#408EC7',
        //   50: '#FFFFFF',
        //   100: '#EEF5FA',
        //   200: '#C2DBED',
        //   300: '#97C1E0',
        //   400: '#6BA8D4',
        //   500: '#408EC7',
        //   600: '#3176A8',
        //   700: '#275D84',
        //   800: '#1C4461',
        //   900: '#122B3D',
        //   950: '#0D1F2C'
        // },
        warning: {
          DEFAULT: "#C78422",
          50: "#FBF4EA",
          100: "#F7E8D2",
          200: "#EFD0A2",
          300: "#E7B872",
          400: "#DF9F42",
          500: "#C78422",
          600: "#A06A1B",
          700: "#795015",
          800: "#51360E",
          900: "#2A1C07",
          950: "#170F04",
        },

        info: {
          DEFAULT: "#408EC7",
          50: "#FFFFFF",
          100: "#EEF5FA",
          200: "#C2DBED",
          300: "#97C1E0",
          400: "#6BA8D4",
          500: "#408EC7",
          600: "#3176A8",
          700: "#275D84",
          800: "#1C4461",
          900: "#122B3D",
          950: "#0D1F2C",
        },
        danger: {
          DEFAULT: "#C74C4A",
          50: "#FFFFFF",
          100: "#FCF5F5",
          200: "#EFCBCB",
          300: "#E2A1A0",
          400: "#D47675",
          500: "#C74C4A",
          600: "#AD3836",
          700: "#8A2C2B",
          800: "#672120",
          900: "#441615",
          950: "#331010",
        },
        success: {
          DEFAULT: "#2CC75D",
          50: "#F3FCF6",
          100: "#DCF7E5",
          200: "#AEEDC2",
          300: "#80E39F",
          400: "#52D97D",
          500: "#2CC75D",
          600: "#24A14B",
          700: "#1B7C3A",
          800: "#135628",
          900: "#0B3117",
          950: "#071E0E",
        },
        // bluemate: {
        //   DEFAULT: '#096BDE',
        //   50: '#E5F1FE',
        //   100: '#CBE2FD',
        //   200: '#95C4FB',
        //   300: '#5FA5F9',
        //   400: '#2987F6',
        //   500: '#096BDE',
        //   600: '#0756B2',
        //   700: '#054086',
        //   800: '#042B5A',
        //   900: '#02162E',
        //   950: '#010B17'
        // }
      },

      backgroundImage: {
        pattern: "url('/v1/assets/images/pattern-1.jpg')",
      },
      container: {
        screens: {
          sm: "576px",
          md: "768px",
          lg: "992px",
          xl: "1200px",
        },
        padding: "15px",
        center: true,
      },
    },
  },
  plugins: [],
};
