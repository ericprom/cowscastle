
Template.MasterLayout.helpers({
});

Template.MasterLayout.events({

});


Template.MasterLayout.onRendered(function () {
  Tracker.autorun(function(){
    if (Meteor.userId()){
      $('#Login').modal('hide');
    }
  })
});
