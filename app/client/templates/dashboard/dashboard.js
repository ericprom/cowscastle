/*****************************************************************************/
/* Dashboard: Event Handlers */
/*****************************************************************************/
Template.Dashboard.events({
});

/*****************************************************************************/
/* Dashboard: Helpers */
/*****************************************************************************/
Template.Dashboard.helpers({
    Booking: function(){
        var booking = Bookings.find().fetch();
        return booking;
    },
    ConfirmMessage: function(data){
        var status = 'ไม่ยืนยัน';
        if(data){
            status = 'ยืนยัน';
        }
        return status;
    },
    theSpaceData: function(data){
        var space = Spaces.findOne(data);
        var venue = Venues.findOne(space.venue_id);
        return space.type+" @ "+venue.name;
        
    },
    Verified: function(){
        var user = Meteor.user();
        var emails = user.emails;
        var data = {}
        if(emails.length>0){
            data.email=emails[0].verified;
        }
        if(user.profile.phone){
            data.phone = true;
        }
        else{
            data.phone = false;
        }
        return data;
    },
    Hosted: function(){
        var staffs = Staffs.find({staff_id: Meteor.userId()}).fetch();
        var team_ids = _.map(staffs,function(item){return item.team_id});
        if(team_ids.length>0){
            var teams = Teams.find({_id: {$in: team_ids}}).fetch();
            var venue_ids = _.map(teams,function(item){return item.venue_id});
            if(venue_ids.length>0){
                return (venue_ids.length>=2)?venue_ids.length+" Castles": venue_ids.length+" Castle";
            }
            else{
                return "0 Castle";
            }
        }
        else{
            return "0 Castle";
        }
    },
});

/*****************************************************************************/
/* Dashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.Dashboard.onCreated(function () {
});

Template.Dashboard.onRendered(function () {
});

Template.Dashboard.onDestroyed(function () {
});
