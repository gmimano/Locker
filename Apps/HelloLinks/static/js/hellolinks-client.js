/* Generic log function for debugging. */
var log = function(msg) { if (console && console.log) console.debug(msg); }

/**
 * Reload the display (get links, render them)
 * @property offset {Integer} Optional Where in the links collection you want to start.
 * @property limit {Integer} Optional The number of links you want returned.
 * @property useJSON {Boolean} Optional Display raw JSON instead of the link's name.
 */
function reload(offset, limit, useJSON) {
    // set the params if not specified
    var offset = offset || 0; 
    var limit = limit || 100;
    var useJSON = useJSON || false;

    var getLinksCB = function(links) {
	// find the unordered list in our document to append to
        var linksList = $("#main ul");

	// clear the list
	linksList.html('');
	
	// populate the list with our links
        for (var i in links) {
	    link = links[i];
	    
	    log(link);
	    if (useJSON) {
		linkHTML = JSON.stringify(link);
	    } else {
		// get the link name, but use the first email address if no name exists
		linkHTML = link.name || link.emails[0].value;
	    }
	    liHTML = '<li id="' + link._id + '" class="link"><span class="basic-data">'+linkHTML+'</span></div>';
	    linksList.append(liHTML);
	}
    };

    $.getJSON(
	'http://localhost:8042/query/getLink', 
	{'offset':offset, 'limit':limit}, 
	getLinksCB
    );
}

/* jQuery syntactic sugar for onDomReady */
$(function() {
    reload(0, 9000, true);
});