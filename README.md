###Welcome to DiscMan!

This app is designed to help you find similar discs from other manufacturers based on a chosen disc. Pick a manufacturer, then pick a disc from this maker, and you'll be presented with an array of discs with the same flight numbers.

###To Run This App
Clone down this repo, and change directories into the folder you've cloned down. Run `npm install`, once that's finished, run `npx webpack` to babel-ify and minify the code into your bundle.js. Once this has completed, you can run `node server/start.js` and open your browser to localhost:8080.

###But there is another way
If you're fancy, and you have docker installed, and don't mind building and running it locally, you can run `docker build . -t ${your preferred image name}` and once your docker image has built, run `docker run -p 8080:8080 ${whatever you named the image}`, then head to localhost:8080 in your browser.

Have fun finding some new discs, maybe even from manufacturers you haven't heard of!