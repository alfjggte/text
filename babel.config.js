module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // devServer: {
  //   proxy: 'http://localhost:5000'
  // }
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: 'css' }
    ]
  ]
}
