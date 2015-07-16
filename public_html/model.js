/* 
 * MVC Pattern 
 * Model object
 */

// Model constructor 
function Model() {
    this.feeds = {}; // hash feed id, url
    this.feedCache = {}; // cache url, result stream
    this.currentFeed = -1; // current select feed
    this.currentEntry = -1; 
    console.log("create Model !");
}

// get feeds list
Model.prototype.getFeeds = function() {
    return this.feeds;
};

// add new feed
Model.prototype.addFeed = function(name, url) {
    this.feeds.push({name: name, url: url});
};

// delete feed by id
Model.prototype.removeFeed = function(id) {
    this.feeds.splice(id, 1);
};
