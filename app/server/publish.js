Meteor.publish('getTeams', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Teams.find(query, option);
});
Meteor.publish('getStaffs', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Staffs.find(query, option);
});
Meteor.publish('getVenues', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Venues.find(query, option);
});
Meteor.publish('getSpaces', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Spaces.find(query, option);
});
Meteor.publish('getBookings', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Bookings.find(query, option);
});
Meteor.publish('getPayments', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Payments.find(query, option);
});
Meteor.publish('getLogos', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Logos.find(query, option);
});
Meteor.publish('getPosters', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Posters.find(query, option);
});
Meteor.publish('getGalleries', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Galleries.find(query, option);
});
Meteor.publish('getUsers', function(section) {
    var query = section.query || {}
    var option = section.option || {}
    return Users.find(query, option);
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
