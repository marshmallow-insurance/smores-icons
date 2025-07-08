import { eslintConfig } from '@mrshmllw/campfire'

const config = [
  ...eslintConfig,
  {
    ignores: ['src/react'],
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
]

export default config
