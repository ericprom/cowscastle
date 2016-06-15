CastleController = RouteController.extend({

  // A place to put your subscriptions
  // this.subscribe('items');
  // // add the subscription to the waitlist
  // this.subscribe('item', this.params._id).wait();

  subscriptions: function() {
    var params = this.params;
    this.subscribe('getStaffs',{'action':'Staffs'}).wait();
    this.subscribe('getTeams',{'action':'Teams'}).wait();
    this.subscribe('getVenues',{'action':'Venues'}).wait();
    this.subscribe('getSpaces',{'action':'Spaces'}).wait();
    this.subscribe('getPayments',{'action':'Payments'}).wait();
    this.subscribe('getLogos',{'action':'Logos'}).wait();
    this.subscribe('getPosters',{'action':'Posters'}).wait();
    this.subscribe('getGalleries',{'action':'Galleries'}).wait();
    this.subscribe('getUsers',{'action':'Users'}).wait();
  },

  waitOn: function () {
  },

  // A data function that can be used to automatically set the data context for
  // our layout. This function can also be used by hooks and plugins. For
  // example, the "dataNotFound" plugin calls this function to see if it
  // returns a null value, and if so, renders the not found template.
  // return Posts.findOne({_id: this.params._id});

  data: function () {
    return {
      id: this.params._id,
      params: this.params,
      query: this.params.query,
      hash: this.params.hash
    }
  },

  // You can provide any of the hook options

  onRun: function () {
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: function () {
    this.next();
  },

  // The same thing as providing a function as the second parameter. You can
  // also provide a string action name here which will be looked up on a Controller
  // when the route runs. More on Controllers later. Note, the action function
  // is optional. By default a route will render its template, layout and
  // regions automatically.
  // Example:
  //  action: 'myActionFunction'

  action: function () {
    var section = {
      'edit' : 'Editcastle'
    }
    if(this.params.section === undefined){
      this.render();
    }
    else{
      this.render(section[this.params.section]);
    }
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});
