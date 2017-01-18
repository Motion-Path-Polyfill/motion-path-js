The following steps work on a fresh install.

**Install node**  
Download the current version of node and npm from [nodejs.org](https://nodejs.org/en/)  
Add the directory containing node and npm to your path.

**Clone motion-path-js**  
$ git clone https://github.com/Motion-Path-Polyfill/motion-path-js.git  
$ cd motion-path-js  

**Get dependencies and build tools**  
$ git submodule update --init --recursive  
$ npm install  
$ npm install -g grunt grunt-cli  

**Build and run tests**  
$ npm test  
To watch for file changes and automatically retest, use:  
$ npm run watchTests  

**Use the polyfill**  
Add third_party/web-animations-js/web-animations.dev.js and motion-path-polyfill.min.js to your web page.  
Include offset-position, offset-path, offset-distance, offset-rotate and offset-anchor in your keyframes when calling element.animate. [Example.](examples/offsetAnchorPosition.html)
