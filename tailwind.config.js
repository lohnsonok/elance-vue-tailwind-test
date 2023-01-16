module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  jit: true,
  theme: {
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
  ],
};
