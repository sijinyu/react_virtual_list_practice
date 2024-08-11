/** @type {import('tailwindcss').Config} */

import scrollbarHide from 'tailwind-scrollbar-hide';

const pxToRem = (px) => `${px / 16}rem`;

const generateSpacing = (min, max) => {
  const spacing = {};
  for (let i = min; i <= max; i++) {
    spacing[i] = pxToRem(i);
  }
  return spacing;
};
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: generateSpacing(1, 200),
      width: generateSpacing(1, 800),
      height: generateSpacing(1, 800),
      borderRadius: generateSpacing(1, 100),
      lineClamp: {
        2: 'line-clamp-2',
      },
    },
  },
  plugins: [scrollbarHide],
};
