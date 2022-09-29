export default {
  npmClient: "npm",
  extraBabelPlugins:
    process.env.NODE_ENV === "production"
      ? ["babel-plugin-dynamic-import-node"]
      : [],
};
