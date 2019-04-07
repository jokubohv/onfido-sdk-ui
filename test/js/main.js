//require("@babel/register");
const {Builder} = require('selenium-webdriver');
const remote = require('selenium-webdriver/remote');
const config = require('./config.json');
const Mocha = require('mocha');
import {createBrowserStackLocal,stopBrowserstackLocal} from './utils/browserstack'
import {eachP,asyncForEach} from './utils/async'

// Input capabilities
const bsCapabilitiesDefault = {
  'acceptSslCerts' : 'true',
  'browserstack.debug': "true",
   project: 'JS SDK',
  'browserstack.user' : process.env.BROWSERSTACK_USERNAME,
  'browserstack.key' : process.env.BROWSERSTACK_ACCESS_KEY,
  'browserstack.local' : 'true'
}

// replace <browserstack-accesskey> with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
const browserstackLocalDefault = {
  'key': bsCapabilitiesDefault['browserstack.key']
};

const currentDate = Date.now().toString();
const random = () => Math.random().toString(36).substring(7)

const createDriver = ({name,localIdentifier}) => browser =>
	browser.remote ?
		new Builder()
			.usingServer('http://hub-cloud.browserstack.com/wd/hub')
			.withCapabilities({
					...bsCapabilitiesDefault,
					...browser,
					name,
					build: currentDate,
					'browserstack.localIdentifier' : localIdentifier
			}) :
		new Builder()
	    .forBrowser(browser.browserName)


const createBrowser = async (browser, testCase) => {
  const localIdentifier = random();

  const bsLocal = browser.remote ? await createBrowserStackLocal({
		...browserstackLocalDefault,
    localIdentifier
  }) : null

  const driver = await createDriver({name:testCase.file,localIdentifier})(browser)
    .build();
  driver.manage().setTimeouts({
    implicit: 3000
  })
  if (browser.remote) driver.setFileDetector(new remote.FileDetector);

  driver.finish = async () => {
    console.log("finishing browser")
    await driver.quit()
		if (bsLocal) await stopBrowserstackLocal(bsLocal)
    console.log("finished browser")
  };

  return driver;
}

const createMocha = (driver, testCase) => {
  // Create our Mocha instance
  const mocha = new Mocha({
      timeout: testCase.timeout
  });
  // By default `require` caches files, making it impossible to require the same file multiple times.
  // Since we want to execute the same tests against many browsers we need to prevent this behaviour by
  // clearing the require cache.
  mocha.suite.on('require', (global, file) => {
      delete require.cache[file];
  });

  mocha.addFile(`${testCase.file}`);
  mocha.suite.ctx.driver = driver

  mocha.runP = () => new Promise(async (resolve) => {
    mocha.run()
        // When the test is over the Promise can be resolved.
        .on('end', resolve);
  })

  return mocha
}

const printTestInfo = (browser, testCase) => {
	console.log(! browser.device
			? `Running ${testCase.file} against ${browser.browserName} (${browser.browser_version}) on ${browser.os} (${browser.os_version})`
			: `Running ${testCase.file} on ${browser.device}`
	);
}

const runner = async () => {
    // Iterate over all browsers.
    await eachP(config.browsers, async (browser) => {
        // Iterate over all tests.
        console.log("Browser:", browser.browserName)
        await asyncForEach(config.tests, async testCase => {
          try {
            const driver = await createBrowser(browser, testCase)
            const mocha = createMocha(driver, testCase)

            printTestInfo(browser, testCase)

            await mocha.runP()
            await driver.finish()
          }
          catch (e){
            console.log(e)
          }
        });
    });
}

runner()


//ref: https://nehalist.io/selenium-tests-with-mocha-and-chai-in-javascript/
//ref: https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically