createCastle = new ReactiveVar(false);
/*****************************************************************************/
/* Castle: Event Handlers */
/*****************************************************************************/
Template.Castle.events({
    'click #createCastleButton': function(event, template){
        event.preventDefault();
        createCastle.set(true);
    },
    'click #cancelButton': function(event, template){
        event.preventDefault();
        createCastle.set(false);
    },
    'click #saveAndContinueButton': function(event, template){
        event.preventDefault();
        var venue_name = $('input[name=venue-name]').val();
        var venue_province = $('select[name=venue-province]').val();
        if(venue_name !=''){
            var venue = {
                name : venue_name,
                province : venue_province
            }
            Meteor.call('create/castle',venue,function(err,resp){
                if(resp){
                    Router.go('castle',{section:'edit', _id:resp});
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
        else{
            toastr.warning('กรุณากรอกชื่อสถานที่', 'Warning!');
            $('input[name=venue-name]').focus();
        }
    },
    'click .castle-list': function(event, template){
        event.preventDefault();
        var venue_id =  $(event.currentTarget).attr("venue-id");
        Router.go('castle',{section:'edit', _id:venue_id});
    }
});

/*****************************************************************************/
/* Castle: Helpers */
/*****************************************************************************/
Template.Castle.helpers({
    isNewCastle : function(){
        return createCastle.get();
    },
    castleList: function(){
        var staffs = Staffs.find({staff_id: Meteor.userId()}).fetch();
        var team_ids = _.map(staffs,function(item){return item.team_id});
        if(team_ids.length>0){
            var teams = Teams.find({_id: {$in: team_ids}}).fetch();
            var venue_ids = _.map(teams,function(item){return item.venue_id});
            if(venue_ids.length>0){
                var castle =  Venues.find({_id: {$in: venue_ids}}).fetch();
                return castle;
            }
        }
        else{
            return;
        }
    }
});

/*****************************************************************************/
/* Castle: Lifecycle Hooks */
/*****************************************************************************/
Template.Castle.onCreated(function () {
});

Template.Castle.onRendered(function () {
});

Template.Castle.onDestroyed(function () {
    createCastle.set(false);
});
