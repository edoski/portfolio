import nextPlugin from 'eslint-config-next'

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
      '.vercel/**',
    ],
  },
  ...nextPlugin,
]

export default eslintConfig
