/*****************************************************************************/
/* deleteSpaceModal: Event Handlers */
/*****************************************************************************/
Template.deleteSpaceModal.events({
     'click #removeSpaceButton': function(event, template){
        event.preventDefault();
        var space_id = $('input[name=space_id]').val();
        $('#deleteSpaceModal').modal("hide");
        if(space_id != '' ){
          var data = {
                id : space_id
            }
            Meteor.call('delete/throne',data,function(err,resp){
              if(resp){
                toastr.success('This throne has been deleted', 'Cows Castle');
                updateSpace.set(false);
                enableButton.set(false);
                spaceData.set('')
              }
              else{
                toastr.warning('Something went wrong!', 'Cows Castle');
              }
            });
        }
        else{
            toastr.warning('No throne selected!', 'Cows Castle');
        }
    }
});

/*****************************************************************************/
/* deleteSpaceModal: Helpers */
/*****************************************************************************/
Template.deleteSpaceModal.helpers({});

/*****************************************************************************/
/* deleteSpaceModal: Lifecycle Hooks */
/*****************************************************************************/
Template.deleteSpaceModal.onCreated(function () {});

Template.deleteSpaceModal.onRendered(function () {});

Template.deleteSpaceModal.onDestroyed(function () {});
