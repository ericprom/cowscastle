_subscriber = new SubsManager();

Router.configure({
  onBeforeAction: function(){
    _subscriber.subscribe('currentUser');
    this.next();
  }
})

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('home');
  } else {
    this.next();
  }
};

var goToDashboard = function(pause) {
  if (!Meteor.user()) {
    Router.go('home');
  } else {
    this.next();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['home', 'privacy', 'terms', 'search']});
// Router.onBeforeAction(goToDashboard, {only: ['profile','dashboard']});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});

Router.route('profile/:_id?/:section?/', {
  name: 'profile',
  controller: 'ProfileController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});

Router.route('venue/:_id?/:section?/', {
  name: 'venue',
  controller: 'VenueController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});

Router.route('search/:keyword?/', {
  name: 'search',
  controller: 'SearchController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});


Router.route('space/:_id?/:section?/', {
  name: 'space',
  controller: 'SpaceController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});


Router.route('booking/:_id?/:section?/', {
  name: 'booking',
  controller: 'BookingController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});


Router.route('dashboard', {
  name: 'dashboard',
  controller: 'DashboardController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});



Router.route('privacy', {
  name: 'privacy',
  controller: 'PrivacyController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});

Router.route('terms', {
  name: 'terms',
  controller: 'TermsController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});

Router.route('castle/:_id?/:section?/', {
  name: 'castle',
  controller: 'CastleController',
  where: 'client',
  layoutTemplate: 'MasterLayout'
});

