(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/controllers/booking_controller.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
BookingController = RouteController.extend({                           // 1
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
    this.subscribe('To', { 'collection': 'Bookings' }).wait();         // 14
    this.subscribe('To', { 'collection': 'Payments' }).wait();         // 15
    this.subscribe('To', { 'collection': 'Logos' }).wait();            // 16
    this.subscribe('To', { 'collection': 'Posters' }).wait();          // 17
    this.subscribe('To', { 'collection': 'Galleries' }).wait();        // 18
    this.subscribe('To', { 'collection': 'Users' }).wait();            // 19
  },                                                                   //
                                                                       //
  // Subscriptions or other things we want to "wait" on. This also     //
  // automatically uses the loading hook. That's the only difference between
  // this option and the subscriptions option above.                   //
  // return Meteor.subscribe('post', this.params._id);                 //
                                                                       //
  waitOn: function () {},                                              // 27
                                                                       //
  // A data function that can be used to automatically set the data context for
  // our layout. This function can also be used by hooks and plugins. For
  // example, the "dataNotFound" plugin calls this function to see if it
  // returns a null value, and if so, renders the not found template.  //
  // return Posts.findOne({_id: this.params._id});                     //
                                                                       //
  data: function () {                                                  // 36
    return {                                                           // 37
      id: this.params._id,                                             // 38
      params: this.params,                                             // 39
      query: this.params.query,                                        // 40
      hash: this.params.hash                                           // 41
    };                                                                 //
  },                                                                   //
                                                                       //
  // You can provide any of the hook options                           //
                                                                       //
  onRun: function () {                                                 // 47
    this.next();                                                       // 48
  },                                                                   //
  onRerun: function () {                                               // 50
    this.next();                                                       // 51
  },                                                                   //
  onBeforeAction: function () {                                        // 53
    this.next();                                                       // 54
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
  action: function () {                                                // 65
    var section = {                                                    // 66
      'edit': 'Editcastle'                                             // 67
    };                                                                 //
    if (this.params.section === undefined) {                           // 69
      this.render();                                                   // 70
    } else {                                                           //
      this.render(section[this.params.section]);                       // 73
    }                                                                  //
  },                                                                   //
  onAfterAction: function () {},                                       // 76
  onStop: function () {}                                               // 78
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=booking_controller.js.map
