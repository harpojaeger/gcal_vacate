//Functions for manipulating various parts of the UI.  Pretty self-explanatory.

function containerController() {
  containerDiv = $('#container');
  this.div = {
    show: function() {
      $(containerDiv).show();
    }
  }
}

function authController() {
  authDiv = $('#authorize_div');
  this.div = {
    show: function() {
      $(authDiv).show();
    },
    hide: function() {
      $(authDiv).hide();
    }
  }
}

function eventsController() {
  eventsTitle = $("#events_title");
  eventsUl = $("#events_ul");
  eventsDiv = $('#events-div');
  eventsMsg = $('#events_msg');
  this.title = {
    show: function() {
      $(eventsTitle).show();
    },
    hide: function() {
      $(eventsTitle).hide();
    }
  }
  this.ul = {
    clear: function() {
      $(eventsUl).empty();
    }
  }
  this.div = {
    show: function() {
      $(eventsDiv).show();
    },
    hide: function() {
      $(eventsDiv).hide();
    },
    clear: function() {
      $(eventsDiv).empty();
    }
  }
  this.msg = {
    clear: function() {
      $(eventsMsg).empty();
    },
    set: function(text) {
      $(eventsMsg).text(text);
    },
    hide: function() {
      $(eventsMsg).hide();
    },
    show: function() {
      $(eventsMsg).show();
    }
  }
}
function searchController() {
  var searchDiv = $("#search_div");
  this.div = {
    show: function() {
      $(searchDiv).show();
    },
    hide: function() {
      $(searchDiv).hide();
    }
  }
}