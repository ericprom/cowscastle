(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/routes.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
_subscriber = new SubsManager();                                       // 1
                                                                       //
Router.configure({                                                     // 3
  onBeforeAction: function () {                                        // 4
    _subscriber.subscribe('currentUser');                              // 5
    this.next();                                                       // 6
  }                                                                    //
});                                                                    //
                                                                       //
var mustBeSignedIn = function (pause) {                                // 10
  if (!(Meteor.user() || Meteor.loggingIn())) {                        // 11
    Router.go('home');                                                 // 12
  } else {                                                             //
    this.next();                                                       // 14
  }                                                                    //
};                                                                     //
                                                                       //
var goToDashboard = function (pause) {                                 // 18
  if (!Meteor.user()) {                                                // 19
    Router.go('home');                                                 // 20
  } else {                                                             //
    this.next();                                                       // 22
  }                                                                    //
};                                                                     //
                                                                       //
Router.onBeforeAction(mustBeSignedIn, { except: ['home', 'privacy', 'terms', 'search'] });
// Router.onBeforeAction(goToDashboard, {only: ['profile','dashboard']});
                                                                       //
Router.route('/', {                                                    // 29
  name: 'home',                                                        // 30
  controller: 'HomeController',                                        // 31
  where: 'client',                                                     // 32
  layoutTemplate: 'MasterLayout'                                       // 33
});                                                                    //
                                                                       //
Router.route('profile/:_id?/:section?/', {                             // 36
  name: 'profile',                                                     // 37
  controller: 'ProfileController',                                     // 38
  where: 'client',                                                     // 39
  layoutTemplate: 'MasterLayout'                                       // 40
});                                                                    //
                                                                       //
Router.route('venue/:_id?/:section?/', {                               // 43
  name: 'venue',                                                       // 44
  controller: 'VenueController',                                       // 45
  where: 'client',                                                     // 46
  layoutTemplate: 'MasterLayout'                                       // 47
});                                                                    //
                                                                       //
Router.route('search/:keyword?/', {                                    // 50
  name: 'search',                                                      // 51
  controller: 'SearchController',                                      // 52
  where: 'client',                                                     // 53
  layoutTemplate: 'MasterLayout'                                       // 54
});                                                                    //
                                                                       //
Router.route('space/:_id?/:section?/', {                               // 58
  name: 'space',                                                       // 59
  controller: 'SpaceController',                                       // 60
  where: 'client',                                                     // 61
  layoutTemplate: 'MasterLayout'                                       // 62
});                                                                    //
                                                                       //
Router.route('booking/:_id?/:section?/', {                             // 66
  name: 'booking',                                                     // 67
  controller: 'BookingController',                                     // 68
  where: 'client',                                                     // 69
  layoutTemplate: 'MasterLayout'                                       // 70
});                                                                    //
                                                                       //
Router.route('dashboard', {                                            // 74
  name: 'dashboard',                                                   // 75
  controller: 'DashboardController',                                   // 76
  where: 'client',                                                     // 77
  layoutTemplate: 'MasterLayout'                                       // 78
});                                                                    //
                                                                       //
Router.route('privacy', {                                              // 83
  name: 'privacy',                                                     // 84
  controller: 'PrivacyController',                                     // 85
  where: 'client',                                                     // 86
  layoutTemplate: 'MasterLayout'                                       // 87
});                                                                    //
                                                                       //
Router.route('terms', {                                                // 90
  name: 'terms',                                                       // 91
  controller: 'TermsController',                                       // 92
  where: 'client',                                                     // 93
  layoutTemplate: 'MasterLayout'                                       // 94
});                                                                    //
                                                                       //
Router.route('castle/:_id?/:section?/', {                              // 97
  name: 'castle',                                                      // 98
  controller: 'CastleController',                                      // 99
  where: 'client',                                                     // 100
  layoutTemplate: 'MasterLayout'                                       // 101
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=routes.js.map
