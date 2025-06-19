import { eslintConfig } from '@mrshmllw/campfire'

const config = [
  ...eslintConfig,
  {
    ignores: ['src/react'],
  },
]

export default config
