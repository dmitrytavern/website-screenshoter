#!/usr/bin/env node

const puppeteer = require("puppeteer");
const program = require("commander");

program
  .option("--url, [url]", "The url")
  .option("--emulate, [emulate]", "emulate device")
  .option("--fullpage, [fullpage]", "Full Page")
  .option("--pdf, [pdf]", "Generate PDF")
  .option("--w, [w]", "width")
  .option("--h, [h]", "height")
  .option("--waitfor, [waitfor]", "Wait time in milliseconds")
  .option("--waitforselector, [waitforselector]", "Wait for the selector to appear in page")
  .option("--el, [el]", "element css selector")
  .option("--auth, [auth]", "Basic HTTP authentication")
  .option("--no, [no]", "Exclude")
  .option("--click, [click]", "Click")
  .option("--file, [file]", "Output file")
  .option("--theme, [theme]", "Color Theme light or dark")
  .option("--vd, [vd]", "Emulate vision deficiency")
  .parse(process.argv);

const opts = program.opts();

if (!opts.url) {
  console.log(
    "Please add --url parameter.\n" +
      "Something like this: $ screenshoteer --url http://www.example.com"
  );
  process.exit();
}

!opts.fullpage ? (opts.fullPage = true) : (opts.fullPage = JSON.parse(opts.fullpage));

console.log("Creating screenshot of ", opts.url);
console.log("Fullpage flag: ", opts.fullPage);

const deviceName = puppeteer.KnownDevices[opts.emulate];

(async () => {
  try {
    await execute();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  async function execute() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (opts.no) {
      await page.setRequestInterception(true);

      page.on("request", (request) => {
        if (request.resourceType() === opts.no) request.abort();
        else request.continue();
      });
    }

    const timestamp = new Date().getTime();

    if (opts.w || opts.h) {
      const newWidth = !opts.w ? 600 : opts.w;
      const newHeight = !opts.h ? "0" : opts.h;

      if (opts.h && !opts.fullpage) opts.fullPage = false;

      await page.setViewport({ width: Number(newWidth), height: Number(newHeight) });
    }

    if (opts.theme) {
      await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: opts.theme }]);
    }

    if (opts.vd) {
      await page.emulateVisionDeficiency(opts.vd);
    }

    if (opts.emulate) {
      await page.emulate(deviceName);
    } else {
      opts.emulate = "";
    }

    if (opts.auth) {
      const [username, password] = opts.auth.split(";");
      await page.authenticate({ username, password });
    }

    await page.goto(opts.url);

    const title = (await page.title()).replace(/[/\\?%*:|"<>]/g, "-");

    if (opts.waitfor) {
      await page.waitFor(Number(opts.waitfor));
    }

    if (opts.waitforselector) {
      await page.waitForSelector(opts.waitforselector);
    }

    if (opts.click) {
      await page.click(opts.click);
    }

    const file = opts.file ? opts.file : `${title} ${opts.emulate} ${opts.el} ${timestamp}.png`;

    if (opts.el) {
      const el = await page.$(opts.el);
      await el.screenshot({ path: file });
    } else {
      await page.screenshot({ path: file, fullPage: opts.fullPage });
    }

    await page.emulateMediaType("screen");

    if (opts.pdf) {
      await page.pdf({ path: `${title} ${opts.emulate} ${timestamp}.pdf` });
    }

    console.log(title);

    await browser.close();
  }
})();
