(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publish.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var collection = {                                                     // 1
    'Teams': Teams,                                                    // 2
    'Staffs': Staffs,                                                  // 3
    'Venues': Venues,                                                  // 4
    'Spaces': Spaces,                                                  // 5
    'Bookings': Bookings,                                              // 6
    'Payments': Payments,                                              // 7
    'Logos': Logos,                                                    // 8
    'Posters': Posters,                                                // 9
    'Galleries': Galleries,                                            // 10
    'Users': Meteor.users                                              // 11
};                                                                     //
Meteor.publish('To', function (data) {                                 // 13
    if (data.collection == 'Users') {                                  // 14
        return Meteor.users.find({}, {                                 // 15
            fields: {                                                  // 17
                'profile': true                                        // 18
            }                                                          //
        });                                                            //
    } else {                                                           //
        return collection[data.collection].find();                     // 23
    }                                                                  //
});                                                                    //
Meteor.publish('currentUser', function (data) {                        // 26
    return Meteor.users.find({                                         // 27
        _id: this.userId                                               // 28
    }, {                                                               //
        fields: {                                                      // 30
            'profile': true,                                           // 31
            'services.twitter.profile_image_url_https': true,          // 32
            'services.facebook.id': true,                              // 33
            'services.google.picture': true,                           // 34
            'services.github.username': true,                          // 35
            'services.instagram.profile_picture': true,                // 36
            'services.linkedin.pictureUrl': true                       // 37
        }                                                              //
    });                                                                //
});                                                                    //
// Server                                                              //
// Meteor.publishComposite('Spaces', function(venueId) {               //
//     return {                                                        //
//         find: function() {                                          //
//             return Spaces.find({ venue_id: venueId});               //
//         },                                                          //
//         children: [                                                 //
//             {                                                       //
//                 find: function(space) {                             //
//                     return Venues.find({ _id: space.venue_id });    //
//                 }                                                   //
//             },                                                      //
//         ]                                                           //
//     }                                                               //
// });                                                                 //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=publish.js.map
