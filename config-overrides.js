module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback,
         {"querystring": require.resolve("querystring-es3") }
    )
  };