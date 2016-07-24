function Event(event) {
    this.id = event.id;
    this.recurringEventId = event.recurringEventId;
    this.summary = event.summary;
    this.start = event.start;
    this.end = event.end;
    this.recurrence = event.recurrence;

    /** Create the list item  with summary**/
    var event_list_item = document.createElement("li");
    var summary = $("<span>")
    .text(this.summary)
    .addClass('action-link')
    .click(listInstances)
    .appendTo(event_list_item);
    $("#events_ul").append(event_list_item);
    $(event_list_item).data({
        "id": this.id,
        "recurringEventId": this.recurringEventId,
        "calendarId": calendar_ID
    });

	/**Create the info button **/
	var info_button = $('<span>')
	.addClass('ui-icon-info ui-icon event-action-button action-link')
	.appendTo(event_list_item);
	
	  /**Create the instances button 
    var instance_link = $('<span>')
    .addClass('ui-icon ui-icon-arrow-1-e event-action-button')
    .click(listInstances);
    $(event_list_item).append(instance_link);
	**/
	
    /**Create the "further info" div**/
    var RRule = rrulestr(this.recurrence[0]);
    var repeat_desc = RRule.toText();
    var info_div = $('<div>')
    .addClass('info')
    .text(repeat_desc);
    $(event_list_item).append(info_div);
    
    $(info_button).click(function() {
    	$('div.info').not($(this).siblings('div.info')).slideUp();
        $(info_div).slideToggle();

    });
    
    function listInstances() {
        var event_li = this.parentNode
        var event = $(event_li).data()
        var instances_request = gapi.client.calendar.events.instances({
            "calendarId": event.calendarId,
            "eventId": event.id,
            "timeMin": $("#start").val() + "T00:00:00Z",
            "timeMax": $("#end").val() + "T00:00:00Z",
        });
        
        instances_request.execute(function(resp) {
            var code = resp.code;
            if (resp.code) {
                debug("Error " + resp.code + ": " + resp.message);
                debug(resp);
            } else {
                var events = resp.items;
                if (events.length > 0) {
                    var n = 0;
                    instancesController.clear();
                    for (i = 0; i < events.length; i++) {
                        var event = events[i];
                        v = new Instance(event)
                    }
                    console.log("Retrieved " + events.length + " instances");
                    $("#deleteall").unbind("click").click(delete_all_instances);
                    instancesController.deleteAllLink.show();
                    instancesController.title.show();
                    instancesController.div.show();
                    $('#events-div ul li').removeClass('event-active');
                    $(event_li).addClass('event-active');
                } else {
                    debug('No instances found (this is weird).');
                }
            }
        });
    }
}
