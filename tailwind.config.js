/** @type {import('tailwindcss').Config} */
const t = require("./design-tokens");

module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    screens: t.breakpoints,
    extend: {
      colors: {
        brand: t.color.brand,
        accent: t.color.accent,
        neutral: t.color.neutral,
        success: t.color.success,
        warning: t.color.warning,
        danger: t.color.danger,
      },
      fontFamily: {
        display: t.typography.fontFamily.display,
        sans: t.typography.fontFamily.sans,
        mono: t.typography.fontFamily.mono,
      },
      fontSize: t.typography.fontSize,
      spacing: t.spacing,
      borderRadius: {
        ...t.radius,
        clay: "28px",
      },
      boxShadow: {
        xs: t.shadow.xs,
        sm: t.shadow.sm,
        md: t.shadow.md,
        lg: t.shadow.lg,
        xl: t.shadow.xl,
        clay: t.shadow.clay,
        "clay-btn": t.shadow.clayBtn,
        "clay-pressed": t.shadow.clayPressed,
        "brand-glow": t.shadow.brandGlow,
      },
      zIndex: Object.fromEntries(
        Object.entries(t.zIndex).map(([k, v]) => [k, String(v)])
      ),
      transitionTimingFunction: {
        spring: t.motion.easing.spring,
        out: t.motion.easing.out,
      },
      keyframes: {
        "clay-breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(16px, -12px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "clay-breathe": "clay-breathe 4s ease-in-out infinite",
        "blob-drift": "blob-drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
