module.exports = {
  entryPoints: ['app/javascript/application.jsx'],
  bundle: true,
  outdir: 'app/javascript/builds/application.js',
  plugins: [require('esbuild-plugin-postcss2')()],
  loader: {
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.svg': 'dataurl'
  }
};