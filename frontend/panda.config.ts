import {
  defineConfig,
  defineGlobalStyles,
  definePreset,
  defineSemanticTokens,
  defineTokens
} from '@pandacss/dev'

const hsl = (n: number) => `hsl(0 0% ${n}%)`

const tokens = defineTokens({
  gradients: {
    base: {
      value: 'linear-gradient(90deg, #76d9e6, #53b8d9)'
    }
  }
})

const semanticTokens = defineSemanticTokens({
  borders: {
    primary: {
      value: '1px solid {colors.border.primary}'
    },
    secondary: {
      value: '1px solid {colors.border.secondary}'
    }
  },
  colors: {
    bg: {
      primary: {
        value: {
          _osLight: hsl(100),
          _osDark: hsl(10)
        }
      },
      secondary: {
        value: {
          _osLight: hsl(97),
          _osDark: hsl(14)
        }
      }
    },
    border: {
      primary: {
        value: {
          _osLight: hsl(92),
          _osDark: hsl(15)
        }
      },
      secondary: {
        value: {
          _osLight: 'hsl(0 0% 90%)',
          _osDark: 'hsl(0 0% 10%)'
        }
      }
    },
    text: {
      default: {
        value: { _osLight: hsl(20), _osDark: hsl(100) }
      },
      dimmed: {
        value: { _osLight: hsl(70), _osDark: hsl(35) }
      }
    }
  }
})

const globalCss = defineGlobalStyles({
  body: {
    backgroundColor: 'bg.primary',
    textRendering: 'optimizeLegibility',
    color: 'text.default',
    fontSize: '14px',
    lineHeight: 'relaxed'
  },
  input: {
    bg: 'none',
    borderBottom: 'primary',
    width: '100%',
    fontSize: 'larger',
    padding: 8,
    borderRadius: 4,
    _focus: {
      outline: 'none'
    }
  },
  '::selection': {
    color: 'black',
    background: 'color.primary'
  }
})

const customPreset = definePreset({
  theme: {
    tokens,
    semanticTokens
  }
})

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  globalCss,
  presets: ['@pandacss/preset-panda', customPreset],
  conditions: {
    light: '[data-theme-mode=light] &',
    dark: '[data-theme-mode=dark] &'
  },
  jsxFramework: 'react'
})
