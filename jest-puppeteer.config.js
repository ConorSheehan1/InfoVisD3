module.exports = {
  launch: {
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      '--window-size=1920,1080',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--proxy-server="direct://"',
      '--proxy-bypass-list=*',
      '--debugging-port=9222',
      '--mute-audio',
    ],
    devtools: process.env.DEVTOOLS !== 'true',
    headless: process.env.HEADLESS !== 'false',
    dumpio: true,
  },
  server: {
    command: 'PORT=4444 node app/index.js',
    protocol: 'http',
    host: 'localhost',
    port: 4444,
    launchTimeout: 500000,
    usedPortAction: 'ignore',
    debug: true,
  },
}
