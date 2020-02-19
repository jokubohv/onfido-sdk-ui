

const Config = module.exports = {
  data: {
    safeToClearWorkspace: false,
    versionRC: null,
    isFirstReleaseIteration: false,
    s3Flags: '--exclude "*.html" --profile Public',
  },
  write(key, value) {
    Config.data[key] = value;
  }
}
