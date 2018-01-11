const TypeHelper = require('fuse-box-typechecker').TypeHelper;
const testSync = TypeHelper({
  basePath: './src',
  name: 'Typecker',
  throwOnGlobal: true,
  throwOnSemantic: true,
  throwOnSyntactic: true,
  tsConfig: '../tsconfig.json',
  tsLint: '../tslint.json',
});
const { FuseBox, QuantumPlugin } = require('fuse-box');
testSync.runSync();
const fuse = new FuseBox({
  debug: true,
  experimentalFeatures: true,
  hash: false,
  homeDir: 'src',
  output: 'dist/$name.js',
  plugins: [
    QuantumPlugin({
      bakeApiIntoBundle: 'index',
      treeshake: true,
      uglify: true,
    }),
  ],
  showErrors: true,
  showErrorsInBrowser: true,
  sourceMaps: false,
  target: 'universal',
  useTypescriptCompiler: true,
});

fuse.bundle('index').instructions('> index.ts');
fuse.run();
