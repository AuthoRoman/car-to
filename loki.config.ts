module.exports = {
  chromeSelector: ".wrapper > *, #root > *, .story-decorator > *",
  diffingEngine: "pixelmatch",
  configurations: {
    "chrome.laptop": {
      target: "chrome.docker",
      width: 1920,
      height: 1080,
    },
  },
};
