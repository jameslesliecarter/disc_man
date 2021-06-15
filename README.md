### Welcome to DiscMan!

This app is designed to help you find similar discs from other manufacturers based on a chosen disc. Pick a manufacturer, then pick a disc from this maker, and you'll be presented with an array of discs with the same flight numbers.

### Before you start!
Before running the app at all, you will need to create and populate the DB that the app connects to. To do so, clone down this repo, `cd` into the home directory, then check out public/assets/schema.sql. Here you should find directions for populating your local DB. Double check your pathing on line 42 of that file.

### To Run This App
Now that you have your DB running, make sure to cd into the home directory, and run `npm install`, once that's finished, run `npx webpack` to babel-ify and minify the code into your bundle.js. Once this has completed, you can run `node server/start.js` and open your browser to localhost:8080.

### But there is another way
If you're fancy, and you have docker installed, and don't mind building and running it locally, you can run `docker build . -t ${your preferred image name}` and once your docker image has built, run `docker run -p 8080:8080 ${whatever you named the image}`, then head to localhost:8080 in your browser.

Have fun finding some new discs, maybe even from manufacturers you haven't heard of!