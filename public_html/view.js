/* 
 * MVC Pattern 
 * View object
 */

// View constructor
function View() {
    console.log("create view !");
}

// View methods
//

// display feeds
View.prototype.displayFeeds = function(feeds) { 
    if (feeds.length == 0) {
        //in case we had one form before...
        $("#feedList").html("");
        $("#introContentNoFeeds").show();
    } else {
        $("#introContentNoFeeds").hide();
        var s = "";
        for (var i = 0; i < feeds.length; i++) {
            s += "<li data-icon='delete'><a href='#feedpage' onclick='controler.onFeedClick(this)'>" + feeds[i].name + "</a><a href='#' onclick='controler.onDelFeed(this)'>Delete</a></li>";
        }
        $("#feedList").html(s);
        $("#feedList").listview("refresh");
    }
};

// display an feed
/*View.prototype.displayFeed = function(url) { // UPDATE
    var entries = feedCache[url];*/
View.prototype.displayFeed = function(entries) {
    var s = "<ul data-role='listview' data-inset='true' id='entrylist'>";
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        s += "<li><a href='#entrypage' onclick='controler.onEntryClick(this)'>" + entry.title + "</a></li>";
    }
    s += "</ul>";
    $("#feedcontents").html(s);
    $("#entrylist").listview();
};

// return input feed name value 
View.prototype.getFeedName = function() {
    return $.trim($("#feedname").val());
};

// return input fedd url value
View.prototype.getFeedUrl = function() {
    return $.trim($("#feedurl").val());
};

// alerte notification
View.prototype.alert = function(errors) {
    //Create a PhoneGap notification for the error
    navigator.notification.alert(errors, function () {});
};

// change to intro page
View.prototype.changeToIntroPage = function() {
    $.mobile.changePage($("#intropage"));
};

// clear add feed form
View.prototype.clearAddFeedForm = function() {
    $("#addFeedForm").clearForm();
};

// set feed title
View.prototype.setFeedTitle = function(name) {
    $("h1", this).text(name);
};

// display message fetching data ...
View.prototype.displayFecthingDataMsg = function() {
    $("#feedcontents").html("<p>Fetching data...</p>");
};

// display error in feed content 
View.prototype.displayErrorOnFeedContent = function(error) {
    $("#feedcontents").html(error);
};

// display entry 
View.prototype.displayEntry = function(title, content, link) {
    $("h1", this).text(title);
    $("#entrycontents", this).html(content);
    $("#entrylink", this).attr("href", link);
};
