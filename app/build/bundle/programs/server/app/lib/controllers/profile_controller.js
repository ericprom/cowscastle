(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/controllers/profile_controller.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
ProfileController = RouteController.extend({                           // 1
                                                                       //
  // A place to put your subscriptions                                 //
  // this.subscribe('items');                                          //
  // // add the subscription to the waitlist                           //
  // this.subscribe('item', this.params._id).wait();                   //
                                                                       //
  subscriptions: function () {                                         // 8
    this.subscribe('To', { 'collection': 'Users' }).wait();            // 9
    //   this.subscribe('To', {'collection':'Staffs'}).wait();         //
    //   this.subscribe('To', {'collection':'Teams'}).wait();          //
  },                                                                   //
                                                                       //
  // Subscriptions or other things we want to "wait" on. This also     //
  // automatically uses the loading hook. That's the only difference between
  // this option and the subscriptions option above.                   //
  // return Meteor.subscribe('post', this.params._id);                 //
                                                                       //
  waitOn: function () {},                                              // 19
                                                                       //
  // A data function that can be used to automatically set the data context for
  // our layout. This function can also be used by hooks and plugins. For
  // example, the "dataNotFound" plugin calls this function to see if it
  // returns a null value, and if so, renders the not found template.  //
  // return Posts.findOne({_id: this.params._id});                     //
                                                                       //
  data: function () {},                                                // 28
                                                                       //
  // You can provide any of the hook options                           //
                                                                       //
  onRun: function () {                                                 // 33
    this.next();                                                       // 34
  },                                                                   //
  onRerun: function () {                                               // 36
    this.next();                                                       // 37
  },                                                                   //
  onBeforeAction: function () {                                        // 39
    this.next();                                                       // 40
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
  action: function () {                                                // 51
    var section = {                                                    // 52
      'edit': 'Profileedit'                                            // 53
    };                                                                 //
                                                                       //
    if (this.params.section === undefined) {                           // 56
      this.render();                                                   // 57
    } else {                                                           //
      this.render(section[this.params.section]);                       // 60
    }                                                                  //
  },                                                                   //
  onAfterAction: function () {},                                       // 63
  onStop: function () {}                                               // 65
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=profile_controller.js.map
