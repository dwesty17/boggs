module.exports = ({ config }) => {
  config.module.rules.push({
    test: /.tsx?$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    query: {
      presets: ["@babel/react", "@babel/env"],
    },
  });

  return config;
};
