/*****************************************************************************/
/* Dashboard: Event Handlers */
/*****************************************************************************/
Template.Dashboard.events({
    'click .edit-booking': function(event, template){
        event.preventDefault();
        Router.go('booking',{_id:this._id});
    },
});

/*****************************************************************************/
/* Dashboard: Helpers */
/*****************************************************************************/
Template.Dashboard.helpers({
    MyBooking: function(){
        var booking = Bookings.find({createdBy:Meteor.userId()}).fetch();
        return booking;
    },
    BookingActivity: function(){
        var staffs = Staffs.find({staff_id: Meteor.userId()}).fetch();
        var team_ids = _.map(staffs,function(item){return item.team_id});
        console.log("team ids::"+team_ids);
        if(team_ids.length>0){
            var teams = Teams.find({_id: {$in: team_ids}}).fetch();
            var venue_ids = _.map(teams,function(item){return item.venue_id});
             console.log("venue ids::"+venue_ids);
            if(venue_ids.length>0){
                var spaces = Space.find({venue_id: {$in: venue_ids}}).fetch();
                var space_ids = _.map(spaces,function(item){return item.space_id});
                console.log("space ids::"+space_ids);
                if(space_ids.length>0){
                    var booking =  Bookings.find({space_id: {$in: space_ids}}).fetch();
                    console.log("booking::"+booking);
                    return booking;
                }
                else{
                    return;
                }
            }
            else{
                return;
            }
        }
        else{
            return;
        }
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
    theBookingData:function(data){
        var space = Spaces.findOne(data);
        return "Booking "+space.type;
    },
    unixToDate: function(value){
        return moment.unix(value).format("M/D/YYYY");
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
