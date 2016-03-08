(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/controllers/venue_controller.js                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
VenueController = RouteController.extend({                             // 1
                                                                       //
  // A place to put your subscriptions                                 //
  // this.subscribe('items');                                          //
  // // add the subscription to the waitlist                           //
  // this.subscribe('item', this.params._id).wait();                   //
                                                                       //
  subscriptions: function () {                                         // 8
    var params = this.params;                                          // 9
    this.subscribe('To', { 'collection': 'Staffs' }).wait();           // 10
    this.subscribe('To', { 'collection': 'Teams' }).wait();            // 11
    this.subscribe('To', { 'collection': 'Venues' }).wait();           // 12
    this.subscribe('To', { 'collection': 'Spaces' }).wait();           // 13
    this.subscribe('To', { 'collection': 'Payments' }).wait();         // 14
    this.subscribe('To', { 'collection': 'Logos' }).wait();            // 15
    this.subscribe('To', { 'collection': 'Posters' }).wait();          // 16
    this.subscribe('To', { 'collection': 'Galleries' }).wait();        // 17
    this.subscribe('To', { 'collection': 'Users' }).wait();            // 18
                                                                       //
    // this.subscribe('Spaces', params.id);                            //
  },                                                                   //
                                                                       //
  // Subscriptions or other things we want to "wait" on. This also     //
  // automatically uses the loading hook. That's the only difference between
  // this option and the subscriptions option above.                   //
  // return Meteor.subscribe('post', this.params._id);                 //
                                                                       //
  waitOn: function () {},                                              // 28
                                                                       //
  // A data function that can be used to automatically set the data context for
  // our layout. This function can also be used by hooks and plugins. For
  // example, the "dataNotFound" plugin calls this function to see if it
  // returns a null value, and if so, renders the not found template.  //
  // return Posts.findOne({_id: this.params._id});                     //
                                                                       //
  data: function () {                                                  // 37
    return {                                                           // 38
      id: this.params._id,                                             // 39
      params: this.params,                                             // 40
      query: this.params.query,                                        // 41
      hash: this.params.hash                                           // 42
    };                                                                 //
  },                                                                   //
                                                                       //
  // You can provide any of the hook options                           //
                                                                       //
  onRun: function () {                                                 // 48
    this.next();                                                       // 49
  },                                                                   //
  onRerun: function () {                                               // 51
    this.next();                                                       // 52
  },                                                                   //
  onBeforeAction: function () {                                        // 54
    this.next();                                                       // 55
  },                                                                   //
                                                                       //
  // The same thing as providing a function as the second parameter. You can
  // also provide a string action name here which will be looked up on a Controller
  // when the route runs. More on Controllers later. Note, the action function
  // is optional. By default a route will render its template, layout and
  // regions automatically.                                            //
  // Example:                                                          //
  //  action: 'myActionFunction'                                       //
                                                                       //
  action: function () {                                                // 66
    var section = {                                                    // 67
      'edit': 'Editcastle'                                             // 68
    };                                                                 //
    if (this.params.section === undefined) {                           // 70
      this.render();                                                   // 71
    } else {                                                           //
      this.render(section[this.params.section]);                       // 74
    }                                                                  //
  },                                                                   //
  onAfterAction: function () {},                                       // 77
  onStop: function () {}                                               // 79
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=venue_controller.js.map
