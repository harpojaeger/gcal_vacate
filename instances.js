function Instance(event, eventInstancesUl) {
  this.id = event.id
  this.recurringEventId = event.recurringEventId;
  this.summary = event.summary;
  this.start = event.start;
  this.end = event.end;
  var when = event.start.dateTime;
  if (!when) {
    when = event.start.date;
    parsedDate = Date.parse(when);
    when = parsedDate.toString('ddd MMM dd');
  } else {
    parsedDate = Date.parse(when);
    when = parsedDate.toString('ddd MMM dd, h:mm tt');
  }

  var instance_list_item = $('<li>');
  var checkbox = $('<input type="checkbox" class="deleteThisInstanceCheckbox" checked>')
    .change(function() {
      $(instance_list_item).data('shouldDelete', $(this).prop('checked'));
      debug($(instance_list_item).data('id') + ' has delete value: ' + $(instance_list_item).data('shouldDelete'));
    })
    .attr('id', this.id);

  var checkbox_label = $('<label>')
    .attr('for', this.id)
    .click(function() {
      $(this).children('span.instance-deletion-checkbox-label')
        .toggleClass('ui-icon-check ui-icon-minus');
    })
    .text(event.summary + ' (' + when + ')')
    .prepend($('<span>')
      .addClass('instance-deletion-checkbox-label ui-icon ui-icon-check'));

  $(instance_list_item)
    .append(checkbox, checkbox_label)
    .addClass("instance")
    .appendTo(eventInstancesUl)
    .data({
      "id": this.id,
      "recurringEventId": this.recurringEventId,
      "calendarId": calendar_ID,
      'shouldDelete': true
    });



  /**$(instance_list_item).on("click",function(){
		delete_instance(this)
    });**/
  $(instance_list_item).on("instance:delete", function() {
    return delete_instance(this);
  });

  function delete_instance(instance) {
    event = $(instance).data();
    var delete_request = gapi.client.calendar.events.delete({
      'calendarId': event.calendarId,
      'eventId': event.id
    });
    delete_func = function() {
      delete_request.execute(function(resp) {
        if (resp.code) {
          debug("Error " + resp.code + ": " + resp.message);
        } else {
          debug("Deleted " + event.id + " successfully.")
          $(instance).slideUp(function() {
            $(instance).remove();
          });
        }
      });
    }
    return delete_func;
  }

}

function delete_all_instances(event_li) {
  $('#alert_div')
    .attr("title", "Delete all instances?")
    .text("Are you sure you want to delete all selected instances of this event?  This cannot be undone.")
    .dialog({
      modal: true,
      draggable: false,
      resizable: false,
      position: {
        my: "top",
        at: "center",
        of: window
      },
      buttons: [{
        text: "No",
        icon: 'ui-icon-circle-close',
        click: function() {
          $(this).dialog('close');
          debug("Clicked no.");
        }
      }, {
        text: "Yes",
        icon: 'ui-icon-circle-check',
        click: function() {
          $(this).dialog('close');
          debug("Clicked yes");
          debug("Delete all shown instances.")
          var allInstancesDeleted = true;
          $(event_li).find("li.instance").each(function(index) {
            var data = $(this).data();
            if (data.shouldDelete) {
              f = $(this).triggerHandler("instance:delete");
              f();
            } else {
              debug('Skipping ' + data.id);
              allInstancesDeleted = false;
            }
          });
          if (allInstancesDeleted) {
            $(event_li).slideUp(function() {
              $(this).remove();
            });
          }
        }
      }]
    });

}