import vue from 'rollup-plugin-vue';
import del from 'rollup-plugin-delete';
import multiInput from 'rollup-plugin-multi-input';

const globals = {
  vue: 'Vue',
};

const config = {
  input: 'src/**/*.vue',
  output: {
    dir: 'dist',
    format: 'esm',
    globals,
  },
  plugins: [
    del({ targets: 'dist/*' }),
    multiInput(),
    vue(),
  ],
};

export default config;
