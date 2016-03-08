/*****************************************************************************/
/* deleteCastleModal: Event Handlers */
/*****************************************************************************/
Template.deleteCastleModal.events({
     'click #removeCastleButton': function(event, template){
        event.preventDefault();
        var castle_id = $('input[name=castle_id]').val();
        $('#deleteCastleModal').modal("hide");
        if(castle_id != '' ){
          var data = {
                id : castle_id
            }
            Meteor.call('delete/castle',data,function(err,resp){
              if(resp){
                toastr.success('This castle has been deleted', 'Cows Castle');
                Router.go('castle');
              }
              else{
                toastr.warning('Something went wrong!', 'Cows Castle');
              }
            });
        }
        else{
            toastr.warning('No castle selected!', 'Cows Castle');
        }
    }
});

/*****************************************************************************/
/* deleteCastleModal: Helpers */
/*****************************************************************************/
Template.deleteCastleModal.helpers({});

/*****************************************************************************/
/* deleteCastleModal: Lifecycle Hooks */
/*****************************************************************************/
Template.deleteCastleModal.onCreated(function () {});

Template.deleteCastleModal.onRendered(function () {});

Template.deleteCastleModal.onDestroyed(function () {});
