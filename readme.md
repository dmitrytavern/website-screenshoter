<h1 align="center"> Website Screenshoter </h1>

<p align="center"> Makes web screenshots and mobile emulations from the command line. </p>

<p align="center"> Fork of <a href="https://github.com/vladocar/screenshoteer"> vladocar/screenshoteer</a></p>

<p align="center"><img src="carbon-shot.png" /></p>
<hr/>

<p>Tool based on <a href="https://github.com/GoogleChrome/puppeteer">puppeteer</a>. </p>

<h4>Installation </h4>

```shell
npm i -g @dmitrytavern/website-screenshoter
```

<p>You can use  screenshoter like this:</p>

```shell
website-screenshoter  --url https://www.example.com

or .html localy copy the url path from the browser

website-screenshoter --url file:///Users/../index.html

website-screenshoter --url file:///C:/Users/../Random-HTML-file.html
```

<p>And with the help of puppeteer(Headless Chrome) it will generate screenshot of the entire web page.</p>

<p>
Parameters:

-h help  
--url web page url  
--emulate - emulate web device example: --emulate "iPhone 6"  
--fullpage - can be true or false. It will take screenshot of entire web page if is true. True is the default parameter.  
--pdf - generate additional pdf  
--w - width of the Web Page in px  
--h - height of the Web Page in px  
--waitfor - wait time for the page load in milliseconds  
--waitforselector - wait for the selector to appear in page
--el - css selector document.querySelector  
--auth - basic http authentication  
--no - exclude "image", "stylesheet", "script", "font"  
--click - example: ".selector>a" excellent way to close popups or to click some buttons on the page.  
--file - output file name (optional, otherwise based on page title and timestamp)  
--theme - switch to dark or light color theme  
--vd - Emulate vision deficiency 'achromatopsia', 'deuteranopia', 'protanopia', 'tritanopia', 'blurredVision', and 'none'

<p>

<h4>Example: </h4>

```shell
website-screenshoter  --url https://news.ycombinator.com --fullpage false

website-screenshoter  --url https://www.reddit.com/r/nodejs --emulate "iPhone 7"

website-screenshoter  --url https://www.nytimes.com  --emulate "Nexus 4"

website-screenshoter --url https://www.reddit.com/r/javascript/ --w 600 --h 800 --fullpage false

website-screenshoter --url https://www.reddit.com/r/javascript/ --w 600 --h 0 --fullpage false

website-screenshoter --url https://lobste.rs --pdf

website-screenshoter --url https://lobste.rs --w 500

website-screenshoter --url  https://news.ycombinator.com/item?id=18598672 --el ".fatitem"

website-screenshoter --url  https://site.com --auth "username;password"

website-screenshoter --url https://www.nytimes.com --no "image"

website-screenshoter --url https://www.nytimes.com --no "script"

website-screenshoter --url https://www.economist.com/ --click ".ribbon__close-button"

website-screenshoter --url file:///Users/../index.html

website-screenshoter --url https://www.slashdot.org --file /tmp/slashdot.png

website-screenshoter --url https://mxb.dev/blog/color-theme-switcher/ --theme dark

website-screenshoter --url https://news.ycombinator.com --vd blurredVision
```

<p> List of of supported mobile devices: https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
</p>

<h3>License</h3>

MIT - check repo files

Copyright (c) 2023-present, Dmitry Tavern
