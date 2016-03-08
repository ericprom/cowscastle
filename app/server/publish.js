var collection = {
    'Teams': Teams,
    'Staffs': Staffs,
    'Venues': Venues,
    'Spaces': Spaces,
    'Bookings': Bookings,
    'Payments': Payments,
    'Logos': Logos,
    'Posters': Posters,
    'Galleries': Galleries,
    'Users': Meteor.users
}
Meteor.publish('To', function(data) {
    if(data.collection == 'Users'){
        return Meteor.users.find({},
        {
            fields: {
                'profile': true,
            }
        });
    }
    else{
        return collection[data.collection].find();
    }
});
Meteor.publish('currentUser', function(data) {
	return Meteor.users.find({
		_id: this.userId
	}, {
		fields: {
			'profile': true,
			'services.twitter.profile_image_url_https': true,
			'services.facebook.id': true,
			'services.google.picture': true,
			'services.github.username': true,
			'services.instagram.profile_picture': true,
			'services.linkedin.pictureUrl': true
		}
	});
});
// Server
// Meteor.publishComposite('Spaces', function(venueId) {
//     return {
//         find: function() {
//             return Spaces.find({ venue_id: venueId});
//         },
//         children: [
//             {
//                 find: function(space) {
//                     return Venues.find({ _id: space.venue_id });
//                 }
//             },
//         ]
//     }
// });
