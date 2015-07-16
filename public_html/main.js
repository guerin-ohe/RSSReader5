/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





// app init
var init = function() {
    //handle getting and displaying the intro or feeds
    $(document).on("pageshow", "#intropage", controler.onIntroPageShow);
    
    //Listen for the addFeed Page so we can support adding feeds
    $(document).on("pageshow", "#addfeedpage", controler.onAddFeedPageShow);
    
    //Listen for the Feed Page so we can displaying entries
    $(document).on("pageshow", "#feedpage", controler.onFeedPageShow);
    
    //Listen for the Entry Page 
    $(document).on("pageshow", "#entrypage", controler.onEntryPageShow);
}
