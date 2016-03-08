(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/controllers/castle_controller.js                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
CastleController = RouteController.extend({                            // 1
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
  },                                                                   //
                                                                       //
  waitOn: function () {},                                              // 21
                                                                       //
  // A data function that can be used to automatically set the data context for
  // our layout. This function can also be used by hooks and plugins. For
  // example, the "dataNotFound" plugin calls this function to see if it
  // returns a null value, and if so, renders the not found template.  //
  // return Posts.findOne({_id: this.params._id});                     //
                                                                       //
  data: function () {                                                  // 30
    return {                                                           // 31
      id: this.params._id,                                             // 32
      params: this.params,                                             // 33
      query: this.params.query,                                        // 34
      hash: this.params.hash                                           // 35
    };                                                                 //
  },                                                                   //
                                                                       //
  // You can provide any of the hook options                           //
                                                                       //
  onRun: function () {                                                 // 41
    this.next();                                                       // 42
  },                                                                   //
  onRerun: function () {                                               // 44
    this.next();                                                       // 45
  },                                                                   //
  onBeforeAction: function () {                                        // 47
    this.next();                                                       // 48
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
  action: function () {                                                // 59
    var section = {                                                    // 60
      'edit': 'Editcastle'                                             // 61
    };                                                                 //
    if (this.params.section === undefined) {                           // 63
      this.render();                                                   // 64
    } else {                                                           //
      this.render(section[this.params.section]);                       // 67
    }                                                                  //
  },                                                                   //
  onAfterAction: function () {},                                       // 70
  onStop: function () {}                                               // 72
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=castle_controller.js.map
