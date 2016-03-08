/*****************************************************************************/
/* Profile: Event Handlers */
/*****************************************************************************/
Template.Profile.events({
    'click .update-profile-btn': function(event, template){
        event.preventDefault();
        var name = $('input[name=user-name]').val();
        var location = $('input[name=user-location]').val();
        var position = $('input[name=user-position]').val();
        var company = $('input[name=user-company]').val();
        var bio = $('textarea[name=user-bio]').val();
        if(name != ''){
            var user = {
                name: name,
                location: location || '',
                position: position || '',
                company: company || '',
                bio: bio || '',
            }
            Meteor.call('update/user/profile',user,function(err,resp){
                if(resp){
                    toastr.success('Profile updated!', 'Success');
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
        else{
            toastr.warning('กรุณากรอกชื่อก่อนทำการบันทึก', 'Warning!');
        }
        return false;
    },
});

/*****************************************************************************/
/* Profile: Helpers */
/*****************************************************************************/
Template.Profile.helpers({
    User: function(){
        return Meteor.user().profile;
    }
    // Verified: function(){
    //     var user = Meteor.user();
    //     var emails = user.emails;
    //     var data = {}
    //     if(emails.length>0){
    //         data.email=emails[0].verified;
    //     }
    //     if(user.profile.phone){
    //         data.phone = true;
    //     }
    //     else{
    //         data.phone = false;
    //     }
    //     return data;
    // },
    // Hosted: function(){
    //     var staffs = Staffs.find({staff_id: Meteor.userId()}).fetch();
    //     var team_ids = _.map(staffs,function(item){return item.team_id});
    //     if(team_ids.length>0){
    //         var teams = Teams.find({_id: {$in: team_ids}}).fetch();
    //         var venue_ids = _.map(teams,function(item){return item.venue_id});
    //         if(venue_ids.length>0){
    //             return (venue_ids.length>=2)?venue_ids.length+" Castles": venue_ids.length+" Castle";
    //         }
    //         else{
    //             return "0 Castle";
    //         }
    //     }
    //     else{
    //         return "0 Castle";
    //     }
    // },
});

/*****************************************************************************/
/* Profile: Lifecycle Hooks */
/*****************************************************************************/
Template.Profile.onCreated(function () {
});

Template.Profile.onRendered(function () {
});

Template.Profile.onDestroyed(function () {
});
