module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@modules': './src/modules',
          '@shared': './src/shared',
          '@sharedInfra': './src/shared/infra',
          '@sharedProviders': './src/shared/providers',
          '@utils': './src/shared/utils'
        }
      }]
    ],
    ignore: [
      '**/*.test.ts'
    ]
  };
