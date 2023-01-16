import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import del from 'rollup-plugin-delete';
import multiInput from 'rollup-plugin-multi-input';

const globals = {
  vue: 'Vue',
};

const config = [
  {
    input: 'src/index.js', // Path relative to package.json
    output: {
      sourcemap: true,
      dir: 'dist',
      entryFileNames: 'vue-tailwind.js',
      format: 'umd',
      name: 'VueTailwind',
      exports: 'named',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      del({ targets: 'dist/*' }),
      vue(),
    ],
  },
];

export default config;
