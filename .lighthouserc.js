module.exports = {
  ci: {
    assert: {
      preset: "lighthouse:recommended",
    },
  },

  settings: {
    additionalTraceCategories:
      "disabled-by-default-blink.features.timeline,disabled-by-default-devtools.timeline",
  },
};
