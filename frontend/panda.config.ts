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
    color: {
      primary: {
        value: {
          _osLight: 'rgb(179, 146, 240)',
          _osDark: 'rgb(179, 146, 240)'
        }
      }
    },
    bg: {
      primary: {
        value: {
          _osLight: hsl(100),
          _osDark: hsl(4)
        }
      },
      secondary: {
        value: {
          _osLight: hsl(97),
          _osDark: hsl(12)
        }
      },
      code: {
        value: {
          _osLight: hsl(97),
          _osDark: hsl(0)
        }
      }
    },
    border: {
      primary: {
        value: {
          _osLight: hsl(80),
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
  html: {
    backgroundColor: 'bg.primary',
    textRendering: 'optimizeLegibility',
    color: 'text.default',
    fontSize: '14px',
    lineHeight: 'relaxed',
    smDown: {
      // lineHeight: 'sm',
      // fontSize: '12px'
    }
  },
  a: {
    color: 'rgb(0, 138, 230)',
    textDecoration: 'underline',
    textDecorationThickness: 1,
    textUnderlineOffset: 2,
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: 'text.dimmed'
    }
  },
  hr: {
    borderColor: 'border.secondary',
    borderStyle: 'solid'
  },
  ul: {
    listStyle: 'square',
    paddingInlineStart: 8,
    marginTop: 6
  },
  li: {
    marginBottom: 4
  },
  p: {
    marginTop: 6
  },
  code: {
    display: 'inline-block',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    bg: 'bg.code',
    borderRadius: 'md',
    border: 'primary'
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
