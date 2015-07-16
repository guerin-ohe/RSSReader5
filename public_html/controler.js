/* 
 * MVC Pattern 
 * Controler object
 */

// Controler constructor
function Controler() {
    console.log("create Controler !");
}

// Controler methods
// 

// on IntroPage show
Controler.prototype.onIntroPageShow = function(e) {
    view.displayFeeds(model.getFeeds());
};

// on add feed click
Controler.prototype.onAddFeedClick = function(e) {
    console.log("add feed click !");
    this.addFeed();
};

// on AddFeedPage show
Controler.prototype.onAddFeedPageShow = function(e) {
    console.log("add feed page show fired !");
    view.clearAddFeedForm();
};

// on FeedPage show
Controler.prototype.onFeedPageShow = function(e) {
    // get current feed
    query = model.currentFeed;
            
    //assume it's a valid ID, since this is a mobile app folks won't be messing with the urls, but keep
    //in mind normally this would be a concern
    var feeds = model.getFeeds();
    var thisFeed = feeds[query];
    view.setFeedTitle(thisFeed.name);
    if (!model.feedCache[thisFeed.url]) {
        view.displayFecthingDataMsg();
        
        //now use Google Feeds API
        var feedServiceUrl = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=" + encodeURI(thisFeed.url) + "&callback=?";
        
        // on feed service return
        var onFeedServiceReturn = function (res, code) {
            //see if the response was good...
            if (res.responseStatus == 200) {
                model.feedCache[thisFeed.url] = res.responseData.feed.entries;
                view.displayFeed(thisFeed.url);
            } else {
                var error = "<p>Sorry, but this feed could not be loaded: < /p><p>" + res.responseDetails + "</p >";
                view.displayErrorOnFeedContent(error);
            }
        }
        
        $.get(feedServiceUrl, {}, onFeedServiceReturn, "json");
    } else {
        view.displayFeed(thisFeed.url);
    }
};

// on entry page show
Controler.prototype.onEntryPageShow = function(e) {
    
    // get current entry index
    var entryIndex = model.currentEntry;
    console.log("onEntryPageShow entry index: " + entryIndex);
    
    // get current feed
    var currentFeed = model.currentFeed;
    var feeds = model.getFeeds();
    var feed = feeds[currentFeed];
    var entryUrl = feed.url;
    console.log("onEntryPageShow entry url: " + entryUrl);
    
    // get current entry
    var entry = feedCache[entryUrl][entryIndex];
    console.log("onEntryPageShow entry title: " + entry.title);
    console.log("onEntryPageShow entry content: " + entry.content);
    console.log("onEntryPageShow entry link: " + entry.link);
    view.displayEntry(entry.title, entry.content, entry.link);
};

// set current feed in #intropage
Controler.prototype.onFeedClick = function(e) {
    model.currentFeed = getPositionInActionsList(e);
};

// set cuurent entry and url in #intropage
Controler.prototype.onEntryClick = function(e) {
    
    var entry = getPositionInActionsList(e);
    console.log("onEntryClick entry index: " + entry);
    
    Model.currentEntry = entry;
};

// handle add feed
Controler.prototype.addFeed = function() {
    console.log("add feed !");
    var feedname = view.getFeedName();
    console.log("feedname: " + feedname);
    var feedurl = view.getFeedUrl();
    console.log("feedurl: " + feedurl);
    
    // basic error handling
    var errors = "";
    if (feedname == "")
        errors += "Feed name is required.\n";
    if (feedurl == "")
        errors += "Feed url is required.\n";
    if (errors != "") {
        view.alert(errors);
    } else {
        addFeed(feedname, feedurl);
        view.changeToIntroPage();
    }
};

// handle delete feed in feed list
Controler.prototype.onDelFeed = function(e)
{
    model.removeFeed(getPositionInActionsList(e));
};

