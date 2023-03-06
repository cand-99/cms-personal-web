import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  rules: [
    ['custom-rule', { color: 'red' }],
  ],
  shortcuts: {
    'custom-shortcut': 'text-lg text-orange hover:text-teal',
    'shadow-soft-xl': 'shadow-xl shadow-neutral-200',
    'shadow-soft-2xl': 'shadow-md shadow-neutral-300',
    'h-sidenav': 'h-[100vh-370px]',
    'gradient-brand': 'from-[#01DC82] to-[#01DC82]',
  },
  theme: {
    // ...
    colors: {
      veryCool: '#0000ff', // class="text-very-cool"
      light: {
        primary: '#F9A30E',
      },
      dark: {
        primary: '#0C0C0D',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        sans: {
          name: 'Poppins',
          weights: ['400', '500', '600', '700'],
        },
      },
    }),
  ],
})
