Template.cows_account_name.helpers({
	username: function(){
        try {
    		return Meteor.user() && Meteor.user().profile && Meteor.user().profile.name || Meteor.user().services.github.username
        } catch(ex){
            return '...'
        }
	}
})
