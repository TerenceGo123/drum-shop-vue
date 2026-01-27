// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'xxs': '360px',    // Очень маленькие телефоны
        'xs': '480px',     // Маленькие телефоны
        '3xl': '1920px',   // Очень большие мониторы
        'tall': { 'raw': '(min-height: 800px)' }, // По высоте
        'portrait': { 'raw': '(orientation: portrait)' },
      }
    }
  }
}