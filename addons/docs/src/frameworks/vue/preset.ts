export function webpackFinal(webpackConfig: any = {}, options: any = {}) {
  let vueDocgenOptions = {};

  options.presetsList.forEach((preset: any) => {
    if (preset.name.includes('addon-docs') && preset.options.vueDocgenOptions) {
      const appendableOptions = preset.options.vueDocgenOptions;
      vueDocgenOptions = {
        ...vueDocgenOptions,
        ...appendableOptions,
      };
    }
  });

  webpackConfig.module.rules.push({
    test: /\.vue$/,
    loader: require.resolve('vue-docgen-loader', { paths: [require.resolve('@storybook/vue')] }),
    enforce: 'post',
    options: {
      docgenOptions: {
        alias: webpackConfig.resolve.alias,
        ...vueDocgenOptions,
      },
    },
  });
  return webpackConfig;
}
